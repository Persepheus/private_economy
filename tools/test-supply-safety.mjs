// Read-only tests of the emitted arithmetic/branches using a deliberately small
// Clausewitz-script interpreter. This is not a Stellaris engine or staffing test.
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
import {safetyResources as S, safetyFile} from './supply-safety.mjs';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = f => fs.readFileSync(path.join(root, f), 'utf8');
function parse(text) {
  const t = text.replace(/#[^\n]*/g,'').replace(/\[\[[^\]]+\]/g,'').replace(/^\s*\]/gm,'').match(/"[^"]*"|>=|<=|!=|[{}=<>]|[^\s{}=<>!]+/g) || [];
  let i=0;
  function block(nested=false) {
    const a=[];
    while(i<t.length && t[i]!=='}') {
      const k=t[i++], op=t[i++];
      assert(['=','<','>','<=','>=','!='].includes(op),`unexpected ${k} ${op}`);
      const v=t[i++]; a.push([k,op,v==='{'?block(true):v]);
    }
    if(nested) assert.equal(t[i++],'}');
    return a;
  }
  return block();
}
const definitions = new Map();
for(const f of [safetyFile,'common/scripted_effects/pe_firm_effects_generated.txt','common/scripted_effects/pe_economy_effects.txt'])
  for(const [k,,v] of parse(read(f))) definitions.set(k,v);
const field = (b,k) => b.find(x=>x[0]===k)?.[2];
const cmp = (a,op,b) => ({'=':a===b,'!=':a!==b,'<':a<b,'>':a>b,'<=':a<=b,'>=':a>=b})[op];
const scope = (o,ctx) => o==='root'?ctx.root:o==='prev'?ctx.prev:o==='owner'?ctx.root:o==='planet'?ctx.planet:undefined;
function value(v,c) {
  if(!Number.isNaN(Number(v))) return Number(v);
  const m=v.match(/^(root|prev|owner|planet)\.(.+)$/);
  return m ? (scope(m[1],c)?.vars[m[2]] || 0) : (c.self.vars[v] || 0);
}
const enter = (c,self) => ({...c,prev:c.self,self});
function condition(b,c) {
  return b.every(([k,op,v])=>{
    if(k==='AND') return condition(v,c);
    if(k==='OR') return v.some(e=>condition([e],c));
    if(k==='NOT') return !condition(v,c);
    if(scope(k,c)) return condition(v,enter(c,scope(k,c)));
    if(k==='check_variable') {const x=v.find(e=>e[0]==='value');return cmp(value(field(v,'which'),c),x[1],value(x[2],c));}
    if(k==='has_country_flag') return c.self.flags.has(v);
    if(k==='is_variable_set') return Object.hasOwn(c.self.vars,v);
    if(k==='uses_district_set') return c.planet.hab === (v==='habitat');
    if(k==='is_void_dweller_empire') return c.root.void === (v==='yes');
    if(k==='exists') return !!scope(v,c);
    if(k==='num_zones') {const x=v.find(e=>e[0]==='value');return cmp(c.planet.zones[field(v,'type')]||0,x[1],Number(x[2]));}
    if(k==='has_deposit_category') return c.self.category===v;
    if(k==='always') return v==='yes';
    throw new Error(`Unsupported test condition ${k}`);
  });
}
function run(b,c) {
  let taken=false;
  for(const [k,,v] of b) {
    if(k==='limit') continue;
    if(k==='if'||k==='else_if'||k==='else') {
      if(k==='if') taken=false;
      if(!taken && (k==='else'||condition(field(v,'limit')||[],c))) {run(v,c);taken=true;}
      continue;
    }
    if(scope(k,c)) {run(v,enter(c,scope(k,c)));continue;}
    if(['set_variable','change_variable','subtract_variable','multiply_variable','divide_variable'].includes(k)) {
      const name=field(v,'which'), n=value(field(v,'value'),c), old=c.self.vars[name]||0;
      c.self.vars[name]=k==='set_variable'?n:k==='change_variable'?old+n:k==='subtract_variable'?old-n:k==='multiply_variable'?old*n:old/n;
    } else if(k==='set_country_flag') c.self.flags.add(v);
    else if(k==='set_planet_flag') c.planet.flags.add(v);
    else if(k==='add_deposit') {
      c.planet.last={vars:{},flags:new Set(),category:'pe_deposit_cat_sites'};
      c.planet.deposits.push(c.planet.last);
    } else if(k==='last_added_deposit') run(v,enter(c,c.planet.last));
    else if(k==='export_resource_income_to_variable') c.self.vars[field(v,'variable')]=c.root.net[field(v,'resource')]||0;
    else if(k==='export_trigger_value_to_variable') {
      assert.equal(field(v,'trigger'),'resource_expenses_compare');
      c.self.vars[field(v,'variable')]=c.root.expenses[field(field(v,'parameters'),'resource')]||0;
    } else if(k==='every_owned_colony') {
      for(const p of c.root.planets) run(v,{...enter(c,p),planet:p});
    } else if(k==='every_deposit') {
      for(const d of c.planet.deposits) {const cc=enter(c,d);if(condition(field(v,'limit')||[],cc))run(v,cc);}
    } else if(k==='pe_job_values') { /* fixture supplies measured per-job rates */ }
    else if(definitions.has(k) && v==='yes') run(definitions.get(k),c);
    else throw new Error(`Unsupported test effect ${k}`);
  }
}
function fixture({hab=false,voidDweller=false,zones={}}={}) {
  const country={vars:{},flags:new Set(['pe_safe_ready']),void:voidDweller,net:{},expenses:{},planets:[]};
  const planet={vars:{},flags:new Set(),hab,zones,deposits:[]}; country.planets.push(planet);
  const ctx={self:planet,root:country,planet,prev:country};
  for(const r of S) Object.assign(country.vars,{[`pe_safe_net_${r}`]:100,[`pe_safe_margin_${r}`]:10,[`pe_safe_reserved_${r}`]:0});
  for(const [j,rs] of Object.entries({metallurgist:{alloys:3,minerals:-6},artisan:{consumer_goods:6,minerals:-6},trader:{trade:8,consumer_goods:-1},miner:{minerals:4},technician:{energy:6},farmer:{food:6},physicist:{physics_research:3,consumer_goods:-1.5},biologist:{society_research:3,consumer_goods:-1.5},engineer:{engineering_research:3,consumer_goods:-1.5},bureaucrat:{unity:3,consumer_goods:-2},entertainer:{unity:.5}}))
    for(const [r,n] of Object.entries(rs)) Object.assign(country.vars,{[`pe_o_${j}_${r}`]:n,[`pe_cost_${j}_${r}`]:Math.max(0,-n)});
  return ctx;
}
// Read variant IDs from actual generated founding dispatch, not a duplicate ordering.
const firmSource=read('common/scripted_effects/pe_firm_effects_generated.txt');
function code(key) {
  const re=new RegExp(`pe_buyout_execute = \\{ FIRM = d_pe_firm_${key} CODE = (\\d+)`);
  const m=firmSource.match(re); assert(m,`missing variant ${key}`); return Number(m[1]);
}
function vector(c,key,scale=1,kind='pe_safe_vector') {
  Object.assign(c.root.vars,{pe_ss_code:code(key),pe_ss_scale:scale});run(definitions.get(kind),c);return c.root.vars;
}
// pe_szd: what the next stage adds to the size (pe_deposit_fetch_scale): city 0.5, rural 1/3.
function grow(c,key,szd=0.5) {
  const firm={vars:{pe_code:code(key),pe_szd:szd},flags:new Set()};
  run(definitions.get('pe_safe_growth'),enter(c,firm));return c.root.vars;
}
const near=(a,b)=>assert(Math.abs(a-b)<.001,`${a} != ${b}`);
let c=fixture(); let v=vector(c,'aaac');near(v.pe_sd_minerals,-12);near(v.pe_sc_minerals,12);near(v.pe_sd_energy,-2);
v=grow(c,'aaac');near(v.pe_sd_minerals,-6);near(v.pe_sd_energy,-1);assert.equal(v.pe_safe_ok,1);
c.root.vars.pe_safe_net_minerals=15;v=grow(c,'aaac');assert.equal(v.pe_safe_ok,0);
c.root.vars.pe_safe_net_minerals=16;v=grow(c,'aaac');assert.equal(v.pe_safe_ok,1); // exact boundary
c.root.vars.pe_safe_reserved_minerals=-6;v=grow(c,'aaac');assert.equal(v.pe_safe_ok,0); // no second use of surplus
c=fixture();c.root.vars.pe_safe_net_minerals=-100;v=grow(c,'mmma',1/3);near(v.pe_sd_minerals,1.5);assert.equal(v.pe_safe_ok,1); // mixed mine improves shortage
c.root.vars.pe_safe_net_energy=9;assert.equal(grow(c,'mmma',1/3).pe_safe_ok,0); // other input still matters
c=fixture();Object.assign(c.root.vars,{pe_o_metallurgist_minerals:0,pe_cost_metallurgist_minerals:0,pe_o_metallurgist_food:-9,pe_cost_metallurgist_food:9});
c.root.vars.pe_safe_net_food=12;assert.equal(grow(c,'aaac').pe_safe_ok,0); // catalytic input
c=fixture({hab:true,voidDweller:true,zones:{zone_minerals:1}});v=vector(c,'mmmm');near(v.pe_sd_minerals,12);near(v.pe_sd_energy,-2); // void dwellers: 300 workforce like a rural firm
c=fixture({zones:{zone_foundry:1,zone_factory:1}});v=vector(c,'aaac',1,'pe_safe_buy_vector');near(v.pe_sd_minerals,0);near(v.pe_sd_energy,0); // subtract replaced district
c=fixture({hab:true,zones:{zone_habitat_hydroponics:1}});v=vector(c,'ffff',1,'pe_safe_buy_vector');near(v.pe_sd_energy,-6);near(v.pe_sd_food,6); // farming replaces energy district
c=fixture({hab:true,zones:{zone_habitat_research:1}});v=vector(c,'xxxy',1,'pe_safe_buy_vector');near(v.pe_sd_consumer_goods,-.3); // 180 replaced vs 200 new research workforce
// Firm size by stage (pe_deposit_fetch_scale): city 130/200/300/400, rural 200/300/400/500;
// a habitat counts like a city, void dwellers like rural firms.
for(const [key,stage,opt,sz,wf,szd] of [['aaac',0,{},.65,130,.35],['aaac',1,{},1,200,.5],['aaac',3,{},2,400,.5],
  ['mmmm',0,{},2/3,200,.33],['mmmm',1,{},1,300,.33],['mmmm',3,{},5/3,500,.33],
  ['mmmm',2,{hab:true},1.5,300,.5],['aaac',3,{hab:true,voidDweller:true},5/3,500,.33],['xxxy',0,{hab:true,voidDweller:true},2/3,200,.33]]) {
  c=fixture(opt);const d={vars:{pe_code:code(key),pe_stage:stage},flags:new Set()};
  run(definitions.get('pe_deposit_fetch_scale'),enter(c,d));near(d.vars.pe_sz,sz);near(d.vars.pe_wfall,wf);near(d.vars.pe_szd,szd);
}
// Actual emitted restructuring guard: reject a profitable destination if the outage
// would remove too much of the old supply, independently of final output.
c=fixture();c.root.vars.pe_safe_net_minerals=20;
let firm={vars:{pe_code:code('mmmm'),pe_to_c:code('mmma'),pe_stage:2,pe_sz:4/3},flags:new Set()};
run(definitions.get('pe_retool_guard'),enter(c,firm));assert.equal(c.root.vars.pe_guard_ok,0);near(c.root.vars.pe_safe_out_minerals,-22);
// Monthly reconciliation: drop last month's instantaneous reservations, retain the
// full consumption of still unfinished sites; do not count their future production.
c=fixture();Object.assign(c.root.net,{energy:100,minerals:100,food:100,consumer_goods:100,trade:100});
Object.assign(c.root.expenses,{energy:100,minerals:1000,food:20000});
c.root.vars.pe_safe_reserved_minerals=-500;
const site={category:'pe_deposit_cat_sites',vars:{pe_target:code('mmma'),pe_tstage:2},flags:new Set()};c.planet.deposits.push(site);
run(definitions.get('pe_safe_month'),enter(c,c.root));
near(c.root.vars.pe_safe_margin_energy,10);near(c.root.vars.pe_safe_margin_minerals,50);near(c.root.vars.pe_safe_margin_food,250);
near(c.root.vars.pe_safe_reserved_minerals,-6);near(c.root.vars.pe_safe_reserved_energy,-4/3); // rural mid-size: 400 workforce
// Once the site is a firm and the budget contains it, no old construction debt remains.
c.planet.deposits=[];c.root.net.minerals=106;run(definitions.get('pe_safe_month'),enter(c,c.root));
near(c.root.vars.pe_safe_reserved_minerals,0);near(c.root.vars.pe_safe_net_minerals,106);
c=fixture();c.root.flags.clear();assert.equal(grow(c,'aaac').pe_safe_ok,0); // old saves wait for first snapshot
// Real founding debit branches, with only parameter substitution simulated.
const foundBody=JSON.parse(JSON.stringify(definitions.get('pe_found_firm')).replace(/\$(CODE|COST|SITE|MONTHS)\$/g,(_,k)=>({CODE:'1',COST:'500',SITE:'d_pe_site_city',MONTHS:'16'})[k]));
for(const corporate of [false,true]) {
  c=fixture();Object.assign(c.root.vars,{pe_safe_ok:0,pe_capital:1000,pe_chab_pk:corporate?1:0,pe_chab_cash:1000});
  run(foundBody,c);assert.equal(c.planet.deposits.length,0);near(c.root.vars.pe_capital,1000);near(c.root.vars.pe_chab_cash,1000);
  c.root.vars.pe_safe_ok=1;c.root.vars.pe_safe_build_minerals=-12;
  run(foundBody,c);assert.equal(c.planet.deposits.length,1);near(c.root.vars.pe_safe_reserved_minerals,-12);
  near(c.root.vars.pe_capital,corporate?1000:800);near(c.root.vars.pe_chab_cash,corporate?625:1000);
}
c=fixture();c.root.vars.pe_safe_net_consumer_goods=10.1;assert.equal(grow(c,'ttta').pe_safe_ok,0);
c=fixture();c.root.vars.pe_o_trader_trade=-2;c.root.vars.pe_safe_net_trade=10.1;assert.equal(grow(c,'ttta').pe_safe_ok,0);
// Structural guards protect every actual debit path; bridge lending remains independent.
const eco=read('common/scripted_effects/pe_economy_effects.txt'),corp=read('common/scripted_effects/pe_corp_effects_generated.txt');
assert.match(eco,/pe_safe_growth = yes\s+pe_firm_book = yes/);
assert.match(eco,/pe_stage value < 3[\s\S]{0,200}pe_safe_ok value = 1/);
const found=JSON.stringify(definitions.get('pe_found_firm'));
assert.equal((found.match(/pe_safe_ok/g)||[]).length,2);
assert.equal((found.match(/pe_safe_reserved_minerals/g)||[]).length,2);
assert.match(corp,/pe_safe_growth = yes[\s\S]{0,220}pe_want_loan value = 0/);
assert.match(corp,/pe_want_loan value > 0[\s\S]{0,900}pe_safe_reserved_minerals/);
assert.match(eco,/has_district = \$DISTRICT\$\s+root = \{ check_variable = \{ which = pe_safe_ok value = 1/);
const events=read('events/pe_economy_events.txt');assert(events.indexOf('pe_safe_month = yes')<events.indexOf('pe_monthly_sites = yes'));
console.log('PASS: supply arithmetic/branches: boundaries, five-resource guard, mixed/catalytic jobs, shared reservations, habitats/zones, buyout differences, restructuring outage, monthly reconciliation and funding-path integration.');
console.log('NOT TESTED: engine budget refresh timing, actual job staffing or AI economic outcomes.');
