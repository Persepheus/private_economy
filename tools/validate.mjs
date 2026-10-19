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
const policies = defs('common/policies'), categories = defs('common/deposit_categories'), econCats = defs('common/economic_categories');
for (const [kind, list] of [['job', jobs], ['deposit', deposits], ['building', buildings], ['policy', policies]])
  for (const k of list) assert(k.startsWith(kind === 'deposit' ? 'd_pe_' : 'pe_'), `${kind} ${k} lacks the pe_ prefix`);

// 4. Modifier keys exist (engine list, or job_<own job>_add).
const modifiers = new Set([...fs.readFileSync(path.join(docs, 'modifiers.log'), 'utf8').matchAll(/^- (\w+),/gm)].map(m => m[1]));
for (const j of jobs) modifiers.add(`job_${j}_add`);
for (const c of econCats) for (const k of ['produces', 'upkeep']) modifiers.add(`${c}_${k}_mult`);
for (const f of scripts) {
  const text = strip(fs.readFileSync(f, 'utf8'));
  for (const m of text.matchAll(/\b(?:planet_modifier|country_modifier|modifier) = \{([^{}]*)\}/g))
    for (const [, key] of m[1].matchAll(/(\w+) = -?[\d.@]/g))
      if (!['factor', 'add', 'weight', 'mult'].includes(key)) assert(modifiers.has(key), `${rel(f)}: unknown modifier ${key}`);
}

// 5. Effects/triggers referencing our objects point at existing definitions.
for (const f of scripts) {
  const text = strip(fs.readFileSync(f, 'utf8'));
  for (const [, k] of text.matchAll(/(?:add_deposit|remove_deposit|has_deposit) = (\w+)(?![\w$])/g)) assert(deposits.includes(k) || !k.startsWith('d_pe_'), `${rel(f)}: unknown deposit ${k}`);
  for (const [, k] of text.matchAll(/(?:add_building|remove_building|has_building) = (\w+)/g)) assert(buildings.includes(k) || !k.startsWith('pe_'), `${rel(f)}: unknown building ${k}`);
  for (const [, k] of text.matchAll(/category = (pe_\w+)/g)) assert(categories.includes(k) || econCats.includes(k), `${rel(f)}: unknown category ${k}`);
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

// 7b. Scripted effects and triggers: own calls exist, call depth stays at 4 or less
//     (the engine initialises only 5 nested levels: "Max effects post init recursive
//     depth of 5"), and messages carry a target (without one they are not shown).
const blocksOf = text => {
  const out = [];
  for (const m of text.matchAll(/^(\w+) = \{/gm)) {
    let depth = 0;
    const i = text.indexOf('{', m.index);
    for (let j = i; j < text.length; j++) { if (text[j] === '{') depth++; else if (text[j] === '}' && --depth === 0) { out.push([m[1], text.slice(i, j + 1)]); break; } }
  }
  return out;
};
const effectBodies = new Map(), ownEffects = new Set(), ownTriggers = new Set();
for (const f of files(path.join(game, 'common/scripted_effects')).filter(f => f.endsWith('.txt')))
  for (const [k, b] of blocksOf(strip(fs.readFileSync(f, 'utf8')))) effectBodies.set(k, b);
for (const f of files(path.join(root, 'common/scripted_effects')).filter(f => f.endsWith('.txt')))
  for (const [k, b] of blocksOf(strip(fs.readFileSync(f, 'utf8')))) { effectBodies.set(k, b); ownEffects.add(k); }
for (const f of files(path.join(root, 'common/scripted_triggers')).filter(f => f.endsWith('.txt')))
  for (const k of topLevel(fs.readFileSync(f, 'utf8'))) ownTriggers.add(k);
{
  const memo = new Map();
  const depthOf = (k, seen = new Set()) => {
    if (memo.has(k)) return memo.get(k);
    if (seen.has(k)) return 1;
    seen.add(k);
    let d = 1;
    for (const [, callee] of effectBodies.get(k).matchAll(/(\w+) = (?:yes|\{)/g))
      if (callee !== k && effectBodies.has(callee)) d = Math.max(d, 1 + depthOf(callee, seen));
    memo.set(k, d);
    return d;
  };
  for (const k of ownEffects) assert(depthOf(k) <= 4, `scripted effect ${k} nests ${depthOf(k)} levels (engine limit 5)`);
  for (const f of scripts) {
    const text = strip(fs.readFileSync(f, 'utf8'));
    for (const [, k] of text.matchAll(/(?<![:.\w])(pe_[a-z_]+) = (?:yes|\{)/g))
      if (!/_$/.test(k)) assert(ownEffects.has(k) || ownTriggers.has(k) || /^pe_(order|economic|deposit|building|private|firm)/.test(k) || topLevel(text).includes(k), `${rel(f)}: unknown scripted effect/trigger ${k}`);
    for (const [, sector] of text.matchAll(/pe_consider = \{ SECTOR = (\w+)/g))
      for (const mode of ['found', 'buy']) assert(ownTriggers.has(`pe_can_${mode}_${sector}`), `missing trigger pe_can_${mode}_${sector}`);
    for (const m of text.matchAll(/create_message = \{/g)) {
      const [[, call]] = blocksOf('x' + text.slice(m.index + 'create_message'.length));
      assert.match(call, /\btarget = /, `${rel(f)}: create_message without target`);
    }
  }
}

// 7c. Typos the engine only reports at runtime: glued keys ("ownerif = {"), job tags
//     that do not exist, and scripted effect calls whose parameters do not match the
//     effect (missing $ARG$, or an argument the effect does not use).
{
  for (const f of scripts)
    for (const m of strip(fs.readFileSync(f, 'utf8')).matchAll(/\b([a-z]+if) = \{/g))
      assert(m[1] === 'else_if', `${rel(f)}: glued key ${m[1]}`);
  // Effects inside a limit (a trigger block) are ignored or break the trigger.
  for (const f of scripts) {
    const text = strip(fs.readFileSync(f, 'utf8'));
    for (const m of text.matchAll(/\blimit = \{/g)) {
      let d = 0, j = text.indexOf('{', m.index);
      const start = j;
      for (; j < text.length; j++) { if (text[j] === '{') d++; else if (text[j] === '}' && --d === 0) break; }
      const block = text.slice(start, j);
      const e = block.match(/\b((?:set|change|multiply|subtract|divide|modulo|floor)_variable|add_resource|add_deposit|remove_deposit|remove_district|add_district)\b/);
      assert(!e, `${rel(f)}: effect ${e && e[1]} inside a limit`);
    }
  }
  const vanillaTags = new Set();
  for (const f of files(path.join(game, 'common/pop_jobs')).filter(f => f.endsWith('.txt')))
    for (const [, t] of fs.readFileSync(f, 'utf8').matchAll(/tags = \{([^}]*)\}/g)) for (const x of t.trim().split(/\s+/)) vanillaTags.add(x);
  for (const f of files(path.join(root, 'common/pop_jobs')))
    for (const [, t] of strip(fs.readFileSync(f, 'utf8')).matchAll(/tags = \{([^}]*)\}/g))
      for (const x of t.trim().split(/\s+/)) assert(vanillaTags.has(x), `${rel(f)}: unknown job tag ${x}`);
  const params = new Map();
  for (const k of ownEffects) {
    const body = effectBodies.get(k);
    const optional = new Set([...body.matchAll(/\[\[!?(\w+)\]/g)].map(m => m[1]));
    const required = new Set([...body.replace(/\[\[!?\w+\][\s\S]*?\n\s*\]/g, '').matchAll(/\$(\w+)\$/g)].map(m => m[1]));
    const all = new Set([...body.matchAll(/\$(\w+)\$/g)].map(m => m[1]));
    params.set(k, {required, known: new Set([...all, ...optional])});
  }
  for (const f of scripts) {
    const text = strip(fs.readFileSync(f, 'utf8'));
    for (const [, k, args] of text.matchAll(/\b(pe_\w+) = \{ ((?:[A-Z_]+ = \S+ ?)+)\}/g)) {
      if (!params.has(k)) continue;
      const passed = new Set([...args.matchAll(/([A-Z_]+) = /g)].map(m => m[1]));
      for (const r of params.get(k).required) assert(passed.has(r), `${rel(f)}: ${k} called without ${r}`);
      for (const p of passed) assert(params.get(k).known.has(p), `${rel(f)}: ${k} does not use ${p}`);
    }
  }
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
need.push(...econCats);
for (const f of scripts) {
  const text = strip(fs.readFileSync(f, 'utf8'));
  for (const [, k] of text.matchAll(/localization = (pe_msg_\w+)/g)) if (!k.endsWith('_')) need.push(k);
  for (const [, k] of text.matchAll(/pe_found_firm = \{ FIRM = (\w+)/g)) need.push(`pe_msg_found_${k}`);
  for (const [, k] of text.matchAll(/pe_buyout_execute = \{ FIRM = (\w+)/g)) need.push(`pe_msg_buy_${k}`);
}
for (const f of files(path.join(root, 'common/pop_jobs'))) for (const [, n] of strip(fs.readFileSync(f, 'utf8')).matchAll(/\bname = (pe_private_\w+)/g)) need.push(`job_${n}`, `job_${n}_plural`, `job_${n}_desc`);
need.push(...defs('common/static_modifiers').flatMap(m => [m, `${m}_desc`]));
for (const f of files(path.join(root, 'common/message_types')))
  for (const [, n] of fs.readFileSync(f, 'utf8').matchAll(/name = "(\w+)"/g)) need.push(n);
for (const f of files(path.join(root, 'events')).filter(f => f.endsWith('.txt')))
  for (const [, k] of strip(fs.readFileSync(f, 'utf8')).matchAll(/\b(?:title|desc|text|name) = ([\w.]+)/g)) need.push(k);
const definedTexts = new Set();
for (const f of files(path.join(root, 'common/scripted_loc')).filter(f => f.endsWith('.txt'))) {
  const text = strip(fs.readFileSync(f, 'utf8'));
  for (const [, n] of text.matchAll(/^\tname = (\w+)/gm)) definedTexts.add(n);
  for (const [, k] of text.matchAll(/(?:localization_key|default) = (\w+)/g)) need.push(k);
}
for (const k of need) for (const lang of languages) assert(loc[lang].has(k), `missing ${lang} localisation ${k}`);
for (const lang of languages)
  for (const f of files(path.join(root, 'localisation', lang)))
    for (const [, n] of fs.readFileSync(f, 'utf8').matchAll(/\[Root\.(GetPe\w+)\]/g)) assert(definedTexts.has(n), `${rel(f)}: unknown scripted loc ${n}`);
// Generated files are up to date with the generator.
{
  const {execFileSync} = await import('node:child_process');
  const gen = ['common/deposits/pe_firm_deposits.txt', 'common/deposits/pe_ledger_deposits.txt', 'common/economic_categories/pe_ledger_categories.txt', 'common/deposits/pe_automation_deposits.txt', 'common/deposits/pe_site_deposits.txt', 'common/scripted_triggers/pe_firm_triggers_generated.txt', 'common/scripted_effects/pe_firm_effects_generated.txt',
    'common/pop_jobs/pe_private_jobs.txt', 'common/scripted_loc/pe_scripted_loc_generated.txt'];
  const before = gen.map(g => fs.readFileSync(path.join(root, g), 'utf8'));
  execFileSync(process.execPath, [path.join(root, 'tools/generate-firms.mjs'), game]);
  gen.forEach((g, i) => assert.equal(fs.readFileSync(path.join(root, g), 'utf8'), before[i], `${g} is stale: run tools/generate-firms.mjs`));
}

// 9. Icons: jobs and buildings are looked up by file name.
for (const j of jobs) assert(fs.existsSync(path.join(root, `gfx/interface/icons/jobs/job_${j}.dds`)), `missing icon for job ${j}`);
for (const j of jobs) assert(fs.existsSync(path.join(root, `gfx/interface/icons/modifiers/mod_job_${j}_add.dds`)), `missing modifier icon for job ${j}`);
for (const b of buildings) assert(fs.existsSync(path.join(root, `gfx/interface/icons/buildings/${b}.dds`)), `missing icon for building ${b}`);
for (const f of files(path.join(root, 'common/deposits')).filter(f => f.endsWith('.txt')))
  for (const [, icon] of strip(fs.readFileSync(f, 'utf8')).matchAll(/\bicon = (\w+)/g))
    assert([root, game].some(d => fs.existsSync(path.join(d, `gfx/interface/icons/deposits/${icon}.dds`))), `${rel(f)}: missing deposit icon ${icon}`);

console.log(`PASS: ${scripts.length} script files; no vanilla overrides; ${jobs.length} jobs, ${deposits.length} firm deposits, ${buildings.length} buildings, ${policies.length} policy; modifiers, references, variables, event types, localisation and icons checked.`);
console.log('NOT TESTED: engine load, job filling, district slot blocking, AI behaviour.');
