// Static checks of Private Economy against the installed game and its script docs.
// Not an engine test. Usage: node tools/validate.mjs [gameDir] [userDir]
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const game = process.argv[2] || 'D:/SteamLibrary/steamapps/common/Stellaris';
const docs = path.join(process.argv[3] || path.resolve(root, '../..'), 'logs/script_documentation');
const files = d => fs.existsSync(d) ? fs.readdirSync(d, {withFileTypes: true}).flatMap(e => e.isDirectory() ? files(path.join(d, e.name)) : [path.join(d, e.name)]) : [];
const rel = f => path.relative(root, f).replaceAll('\\', '/');
const strip = t => t.replace(/"(?:[^"\\]|\\.)*"/g, '""').replace(/#[^\n]*/g, '');
const scripts = [...files(path.join(root, 'common')), ...files(path.join(root, 'events'))].filter(f => f.endsWith('.txt'));
const topLevel = text => [...strip(text).matchAll(/^(\w+) = \{/gm)].map(m => m[1]);

// 1. Plug and play: no file replaces a vanilla file.
for (const f of [...scripts, ...files(path.join(root, 'localisation')), ...files(path.join(root, 'interface'))])
  assert(!fs.existsSync(path.join(game, rel(f))), `${rel(f)} overrides a vanilla file`);

// 2. Braces balanced.
for (const f of scripts) {
  let depth = 0;
  for (const c of strip(fs.readFileSync(f, 'utf8'))) {
    if (c === '{') depth++;
    else if (c === '}') assert(--depth >= 0, `${rel(f)}: closing brace without opener`);
  }
  assert.equal(depth, 0, `${rel(f)}: unbalanced braces`);
}

// 3. Definitions of this mod.
const defs = dir => files(path.join(root, dir)).filter(f => f.endsWith('.txt')).flatMap(f => topLevel(fs.readFileSync(f, 'utf8')));
const jobs = defs('common/pop_jobs'), deposits = defs('common/deposits'), buildings = defs('common/buildings');
const policies = defs('common/policies'), categories = defs('common/deposit_categories');
for (const [kind, list] of [['job', jobs], ['deposit', deposits], ['building', buildings], ['policy', policies]])
  for (const k of list) assert(k.startsWith(kind === 'deposit' ? 'd_pe_' : 'pe_'), `${kind} ${k} lacks the pe_ prefix`);

// 4. Modifier keys exist (engine list, or job_<own job>_add).
const modifiers = new Set([...fs.readFileSync(path.join(docs, 'modifiers.log'), 'utf8').matchAll(/^- (\w+),/gm)].map(m => m[1]));
for (const j of jobs) modifiers.add(`job_${j}_add`);
for (const f of scripts) {
  const text = strip(fs.readFileSync(f, 'utf8'));
  for (const m of text.matchAll(/\b(?:planet_modifier|country_modifier|modifier) = \{([^{}]*)\}/g))
    for (const [, key] of m[1].matchAll(/(\w+) = -?[\d.@]/g))
      if (!['factor', 'add', 'weight', 'mult'].includes(key)) assert(modifiers.has(key), `${rel(f)}: unknown modifier ${key}`);
}

// 5. Effects/triggers referencing our objects point at existing definitions.
for (const f of scripts) {
  const text = strip(fs.readFileSync(f, 'utf8'));
  for (const [, k] of text.matchAll(/(?:add_deposit|remove_deposit|has_deposit) = (\w+)/g)) assert(deposits.includes(k) || !k.startsWith('d_pe_'), `${rel(f)}: unknown deposit ${k}`);
  for (const [, k] of text.matchAll(/(?:add_building|remove_building|has_building) = (\w+)/g)) assert(buildings.includes(k) || !k.startsWith('pe_'), `${rel(f)}: unknown building ${k}`);
  for (const [, k] of text.matchAll(/category = (pe_\w+)/g)) assert(categories.includes(k), `${rel(f)}: unknown deposit category ${k}`);
}

// 6. @variables defined globally or locally.
{
  const globals = new Set();
  for (const f of files(path.join(game, 'common/scripted_variables')).filter(f => f.endsWith('.txt')))
    for (const [, k] of fs.readFileSync(f, 'utf8').matchAll(/^(@\w+)\s*=/gm)) globals.add(k);
  for (const f of scripts) {
    const text = strip(fs.readFileSync(f, 'utf8'));
    const locals = new Set([...text.matchAll(/^(@\w+)\s*=/gm)].map(m => m[1]));
    for (const [, v] of text.matchAll(/(?:^|[\s={])(@\w+)/gm)) assert(globals.has(v) || locals.has(v), `${rel(f)}: undefined ${v}`);
  }
}

// 7. Event calls use the type of the called event (4.0 turned planet into colony events).
{
  const types = new Map();
  for (const f of [...files(path.join(game, 'events')), ...files(path.join(root, 'events'))].filter(f => f.endsWith('.txt')))
    for (const [, type, id] of strip(fs.readFileSync(f, 'utf8')).matchAll(/^(\w+_event) = \{\s*id = ([\w.]+)/gm)) types.set(id, type);
  for (const f of scripts)
    for (const [, type, id] of strip(fs.readFileSync(f, 'utf8')).matchAll(/[^\n]\s*(\w+_event) = \{\s*id = ([\w.]+)/g))
      if (types.has(id)) assert.equal(type, types.get(id), `${rel(f)}: ${id} is a ${types.get(id)}, called as ${type}`);
}

// 8. Localisation: BOM, header, line format, parity, and texts for every object.
const languages = fs.readdirSync(path.join(root, 'localisation'));
const loc = {};
for (const lang of languages) {
  loc[lang] = new Set();
  for (const f of files(path.join(root, 'localisation', lang)).filter(f => f.endsWith(`_l_${lang}.yml`))) {
    const data = fs.readFileSync(f);
    assert.equal(data.subarray(0, 3).toString('hex'), 'efbbbf', `${rel(f)}: missing UTF-8 BOM`);
    const lines = data.toString('utf8').replace(/^\ufeff/, '').split(/\r?\n/);
    assert.equal(lines[0].trim(), `l_${lang}:`, `${rel(f)}: header`);
    lines.slice(1).forEach((l, i) => assert(!l.trim() || /^\s*#/.test(l) || /^ [\w.]+:\d* ".*"\s*$/.test(l), `${rel(f)}:${i + 2}: malformed line`));
    for (const l of lines) { const m = l.match(/^ ([\w.]+):/); if (m) loc[lang].add(m[1]); }
  }
}
assert.deepEqual([...loc.english].sort(), [...loc.german].sort(), 'english and german keys differ');
const need = [
  ...jobs.flatMap(j => [`job_${j}`, `job_${j}_plural`, `job_${j}_desc`, `mod_job_${j}_add`]),
  ...deposits.flatMap(d => [d, `${d}_desc`]), ...categories,
  ...buildings.flatMap(b => [b, `${b}_desc`]),
  ...policies.flatMap(p => [`policy_${p}`, `policy_${p}_desc`]),
];
for (const f of files(path.join(root, 'common/policies')))
  for (const [, o] of fs.readFileSync(f, 'utf8').matchAll(/name = "(\w+)"/g)) need.push(o, `${o}_name`, `${o}_desc`);
for (const k of need) for (const lang of languages) assert(loc[lang].has(k), `missing ${lang} localisation ${k}`);

// 9. Icons: jobs and buildings are looked up by file name.
for (const j of jobs) assert(fs.existsSync(path.join(root, `gfx/interface/icons/jobs/job_${j}.dds`)), `missing icon for job ${j}`);
for (const j of jobs) assert(fs.existsSync(path.join(root, `gfx/interface/icons/modifiers/mod_job_${j}_add.dds`)), `missing modifier icon for job ${j}`);
for (const b of buildings) assert(fs.existsSync(path.join(root, `gfx/interface/icons/buildings/${b}.dds`)), `missing icon for building ${b}`);

console.log(`PASS: ${scripts.length} script files; no vanilla overrides; ${jobs.length} jobs, ${deposits.length} firm deposits, ${buildings.length} buildings, ${policies.length} policy; modifiers, references, variables, event types, localisation and icons checked.`);
console.log('NOT TESTED: engine load, job filling, district slot blocking, AI behaviour.');
