// Read-only regression checks. No game launch and no files written.
// Usage: node tools/test-message-settings.mjs
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {messageCategories, messageCategory, generateMessageSettings} from './message-settings.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = f => fs.readFileSync(path.join(root, f), 'utf8');
const compact = s => s.replace(/\s+/g, ' ').trim();
const files = d => fs.readdirSync(path.join(root, d), {withFileTypes: true}).flatMap(e => e.isDirectory() ? files(`${d}/${e.name}`) : [`${d}/${e.name}`]);

// Independently walk the script hierarchy, rather than trusting the generator's
// transformation. Preserve offsets while hiding strings and comments.
function parse(text) {
  const masked = text.replace(/"(?:[^"\\]|\\.)*"|#[^\n]*/g, s => ' '.repeat(s.length));
  const stack = [], nodes = [];
  for (const m of masked.matchAll(/([\w.:$]+)\s*=\s*\{|[{}]/g)) {
    if (m[1] || m[0] === '{') {
      const node = {key: m[1], start: m.index, parent: stack.at(-1), children: []};
      node.parent?.children.push(node);
      nodes.push(node);
      stack.push(node);
    } else {
      const node = stack.pop();
      assert(node, 'Unbalanced closing brace');
      node.text = text.slice(node.start, m.index + 1);
    }
  }
  assert.equal(stack.length, 0);
  return nodes;
}
const all = [...files('common'), ...files('events')].filter(f => f.endsWith('.txt')).flatMap(file => parse(read(file)).map(n => ({...n, file})));
const counts = Object.fromEntries(messageCategories.map(([c]) => [c, 0]));
let generic = 0;
for (const node of all) {
  let key;
  if (node.key === 'create_message' && /type = pe_private_economy(?:_|\b)/.test(node.text)) {
    key = node.text.match(/localization = (\S+)/)?.[1];
    if (key === '$KEY$') {
      let ancestor = node;
      while (ancestor.parent) ancestor = ancestor.parent;
      assert.equal(ancestor.key, 'pe_corp_msg', 'Only the generic corporate message helper may bypass a direct gate');
      assert(node.text.includes('type = pe_private_economy_$CATEGORY$'), 'Corporate messages must use their caller category icon');
      generic++;
      continue;
    }
  } else if (node.key === 'pe_corp_msg' && node.parent) {
    key = node.text.match(/KEY = (\S+)/)?.[1];
  } else continue;
  const category = messageCategory(key);
  if (node.key === 'pe_corp_msg') assert(node.text.includes(`CATEGORY = ${category} }`), `${key}: wrong corporate icon category`);
  else assert(compact(node.text).includes(`type = pe_private_economy_${category} `), `${key}: wrong message type/icon`);
  counts[category]++;
  const gate = node.parent;
  assert.equal(gate?.key, 'if', `${node.file}: ${key} lacks a direct message gate`);
  assert.equal(gate.children.length, 2, `${key}: gate also wraps unrelated effects`);
  assert.equal(compact(gate.children[0].text), `limit = { NOT = { has_country_flag = pe_mute_${category} } }`, `${key}: wrong category or recipient scope`);
  assert.equal(compact(gate.text), `if = { limit = { NOT = { has_country_flag = pe_mute_${category} } } ${compact(node.text)} }`, `${key}: extra state changes in message gate`);
}
assert(generic > 0);
for (const [category, count] of Object.entries(counts)) assert(count > 0, `Unused category ${category}`);
assert.throws(() => messageCategory('pe_msg_unclassified_future_message'), /Unclassified/);

// Generated menu/localisation must be current; generation here is in memory only.
generateMessageSettings((file, expected) => assert.equal(read(file), expected, `${file} is stale`));
const menu = parse(read('events/pe_message_settings_generated.txt'));
// Closing with X must never choose a category toggle or reopen the menu.
const pages = menu.filter(n => n.key === 'country_event' && !n.parent);
assert.equal(pages.length, 2);
for (const page of pages) {
  const defaults = page.children.filter(n => n.key === 'option' && /default_hide_option\s*=\s*yes/.test(n.text));
  assert.equal(defaults.length, 1, 'Each menu page needs exactly one X-button default');
  assert.equal(compact(defaults[0].text), 'option = { name = pe_settings_close default_hide_option = yes }', 'X must close without effects, conditions or another event');
}
for (const [i, [category]] of messageCategories.entries()) {
  for (const enabled of [true, false]) {
    const opt = menu.find(n => n.key === 'option' && n.text.includes(`name = pe_settings_${category}_${enabled ? 'on' : 'off'}\n`));
    assert(opt, `Missing toggle for ${category}`);
    assert.equal(compact(opt.children.find(n => n.key === 'trigger').text), `trigger = { ${enabled ? `NOT = { has_country_flag = pe_mute_${category} }` : `has_country_flag = pe_mute_${category}`} }`);
    const action = opt.children.find(n => n.key === 'hidden_effect').text;
    assert(action.includes(`${enabled ? 'set' : 'remove'}_country_flag = pe_mute_${category}`));
    assert(action.includes(`country_event = { id = pe_settings.${Math.floor(i / 6) + 1} }`));
  }
}
for (const opt of menu.filter(n => n.key === 'option' && /name = pe_settings_all_(on|off)/.test(n.text))) {
  const verb = opt.text.includes('name = pe_settings_all_on') ? 'remove' : 'set';
  for (const [c] of messageCategories) assert(opt.text.includes(`${verb}_country_flag = pe_mute_${c}`));
}
const decision = read('common/decisions/pe_message_settings_generated.txt');
assert.match(decision, /owned_planets_only = yes/);
assert.match(decision, /potential = \{\s*is_capital = yes\s*owner = \{ is_ai = no \}/);
assert.match(decision, /owner = \{ country_event = \{ id = pe_settings\.1 \} \}/);
assert(!/\bcost\s*=|enactment_time/.test(decision));

const events = all.filter(n => !n.parent && n.key === 'country_event');
const event = id => {
  const found = events.filter(n => new RegExp(`\\bid = ${id.replace('.', '\\.')}\\s`).test(n.text.split('\n').slice(0, 4).join('\n')));
  assert.equal(found.length, 1, `Missing/duplicate event ${id}`);
  return found[0];
};
for (const [id, category] of [['pe.270', 'corporations'], ['pe.285', 'military'], ['pe.288', 'military'], ['pe.308', 'military'], ['pe.252', 'patrons']]) {
  assert.equal(compact(event(id).children.find(n => n.key === 'trigger').text), `trigger = { NOT = { has_country_flag = pe_mute_${category} } }`);
}
for (const e of events.filter(e => e.children.filter(n => n.key === 'option').length > 1 && !e.text.includes('id = pe_settings.'))) {
  assert(!e.children.filter(n => n.key === 'trigger').some(n => n.text.includes('pe_mute_')), `${e.file}: an actual choice event was disabled`);
}
for (const id of ['pe.206', 'pe.228']) {
  assert(event(id).text.includes('hide_window = yes'));
  assert(!event(id).children.some(n => n.key === 'trigger'), `${id}: gameplay would be skipped when muted`);
}
const prototype = event('pe.206');
const resolution = prototype.children.find(n => n.key === 'immediate');
assert(resolution.children.slice(0, 3).every(n => !n.text.includes('pe_mute_')));
assert.match(resolution.text, /engineering_research = 1 mult = pe_pat_proto_full/);
assert.match(resolution.text, /engineering_research = 1 mult = pe_pat_proto_part/);
assert.match(resolution.text, /modifier = pe_prototype_accident days = 720/);
assert(!event('pe_notice.206').children.some(n => n.key === 'immediate'), 'Prototype result would apply twice');
assert.match(event('pe.228').text, /if = \{\s*limit = \{ has_country_flag = pe_mute_patrons \}\s*pe_tourism_accident_apply = yes\s*\}\s*else = \{ country_event = \{ id = pe_notice\.228 \} \}/);
assert.match(event('pe_notice.228').text, /pe_tourism_accident_apply = yes/);
assert.match(read('common/scripted_effects/pe_notification_effects.txt'), /modifier = pe_tourism_accident days = 360/);
assert.match(read('common/scripted_effects/pe_notification_effects.txt'), /which = pe_mag_rep value = -1/);

// Every theme has its own message type, message sprite and inline sprite. DDS
// header/layout checks use the same legacy BGRA format as vanilla's 36px icons.
const types = parse(read('common/message_types/pe_messages.txt'));
const sprites = parse(read('interface/pe_message_icons.gfx'));
const hashes = new Set();
for (const [category] of messageCategories) {
  const type = types.find(n => n.text.includes(`key = "pe_private_economy_${category}"`));
  assert(type?.text.includes(`icon = "GFX_pe_message_${category}"`));
  for (const size of [36, 20]) {
    const spriteName = `GFX_${size === 20 ? 'text_' : ''}pe_message_${category}`;
    const texture = `gfx/interface/icons/message/pe_message_${category}${size === 20 ? '_text' : ''}.dds`;
    const sprite = sprites.find(n => n.key === 'spriteType' && n.text.includes(`name = "${spriteName}"`));
    assert(sprite?.text.includes(`texturefile = "${texture}"`));
    const b = fs.readFileSync(path.join(root, texture));
    assert.equal(b.toString('ascii', 0, 4), 'DDS ');
    assert.equal(b.readUInt32LE(4), 124);
    assert.equal(b.readUInt32LE(12), size);
    assert.equal(b.readUInt32LE(16), size);
    assert.equal(b.readUInt32LE(80), 0x41);
    assert.equal(b.readUInt32LE(88), 32);
    assert.equal(b.readUInt32LE(92), 0xff0000);
    assert.equal(b.readUInt32LE(104), 0xff000000);
    assert.equal(b.length, 128 + size * size * 4);
    const alpha = [...b.subarray(128)].filter((_, i) => i % 4 === 3);
    assert(alpha.some(v => v > 128) && alpha.some(v => v === 0) && alpha.reduce((sum, v) => sum + v, 0) > size * size * 255 * 0.05, `${texture}: blank or opaque background`);
    const hash = createHash('sha256').update(b).digest('hex');
    assert(!hashes.has(hash), `${texture}: duplicate icon`);
    hashes.add(hash);
  }
  for (const lang of ['german', 'english']) {
    const text = read(`localisation/${lang}/pe_message_settings_l_${lang}.yml`);
    assert(text.includes(`£pe_message_${category}£`));
    assert(text.includes(`pe_message_${category}_title:0`));
  }
}

console.log(`PASS: ${Object.values(counts).reduce((a, b) => a + b, 0)} gated message calls; ${generic} generic corporate name branches; 12 categories, 24 toggles, capital access and 7 information events checked.`);
console.log(JSON.stringify(counts));
console.log('PASS: 12 category message types and 24 distinct transparent DDS textures, including their message/inline sprite assignments.');
console.log('NOT TESTED: Stellaris UI, save/load persistence or runtime event execution.');
