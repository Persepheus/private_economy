// Generate the common supply guard. No engine calls are added below depth four.
export const safetyResources = ['energy', 'minerals', 'food', 'consumer_goods', 'trade'];
export const safetyFile = 'common/scripted_effects/pe_supply_safety_generated.txt';
// The stockpile may carry a gap below the margin for this long (0.47.1).
export const STOCK_MONTHS = 120;
export const costVar =(job, r) => `pe_cost_${job.replace('pe_private_', '')}_${r}`;

export function supplySafety({variants, JOBS, RES, outVar, HAB, NOT_HAB, VOID, HAB_DISTRICT,
  ZONE_JOBS, ZONES, UPKEEP, HAB_UPKEEP, CITY_F, RURAL_F, szCalc, zoneVar, ifChain, write, header}) {
  const S = safetyResources;
  const jobs = Object.fromEntries(JOBS.map(j => [j.key, j]));
  const set = (a, b) => `set_variable = { which = ${a} value = ${b} }`;
  const add = (a, b) => `change_variable = { which = ${a} value = ${b} }`;
  const sub = (a, b) => `subtract_variable = { which = ${a} value = ${b} }`;
  const mul = (a, b) => `multiply_variable = { which = ${a} value = ${b} }`;
  // All vectors are country variables; execution scope is the candidate's planet.
  const job = (key, count, factor = 'pe_ss_base') => [...jobs[key].touches].map(r =>
    [ ['pe_sd', outVar(key, r)], ['pe_sc', costVar(key, r)] ].map(([dst, src]) =>
      `${set('pe_ss_tmp', src)} ${mul('pe_ss_tmp', +count.toFixed(4))} ${mul('pe_ss_tmp', factor)} ${mul('pe_ss_tmp', 'pe_ss_scale')} ${add(`${dst}_${r}`, 'pe_ss_tmp')}`).join(' ')).join(' ');
  const zone = (district) => (ZONE_JOBS[district] || []).map(([z, js]) =>
    `if = { limit = { num_zones = { type = ${z} value > 0 } } root = { ${Object.entries(js).map(([j,n]) => job(`pe_private_${j}`, n / 100, 'pe_ss_void')).join(' ')} } }`).join('\n');
  const upkeep = (values, sign = 1) => `root = { ${Object.entries(values).map(([r,n]) =>
    `${set('pe_ss_tmp', n * sign)} ${mul('pe_ss_tmp', 'pe_ss_scale')} ${sub(`pe_sd_${r}`, 'pe_ss_tmp')} ${add(`pe_sc_${r}`, 'pe_ss_tmp')}`).join(' ')} }`;
  // A firm at stage "normal" here (workforce per 200: city firms and labs CITY_F, rural firms
  // RURAL_F, on a habitat CITY_F, void dwellers RURAL_F), times pe_ss_scale (its size).
  const vector = v => `
    root = { ${set('pe_ss_base', v.cityLike ? CITY_F[1] : RURAL_F[1])} }
    if = { limit = { ${HAB} } root = { ${set('pe_ss_base', CITY_F[1])} }
      if = { limit = { ${VOID} } root = { ${set('pe_ss_base', RURAL_F[1])} } } }
    root = { ${Object.entries(v.workforce).map(([j,w]) => job(j,w/100)).join(' ')} }
    if = { limit = { ${HAB} } ${upkeep(HAB_UPKEEP)} }
    else = { ${upkeep({energy: UPKEEP[v.k]})} }
  `;
  const zero = () => `root = { ${RES.flatMap(r => [set(`pe_sd_${r}`,0),set(`pe_sc_${r}`,0)]).join(' ')} }`;
  const dispatch = () => zero() + ifChain(variants, v => `root = { check_variable = { which = pe_ss_code value = ${v.code} } }`, vector);
  // The state district's replaced workforce; rural specialisation jobs match the firm.
  const state = v => `
    ${zero()}
    root = { ${set('pe_ss_base',1)} ${set('pe_ss_void',1)} }
    if = { limit = { ${HAB} } root = { ${set('pe_ss_base', v.cityLike ? 1 : 0.5)} }
      if = { limit = { ${VOID} } root = { ${mul('pe_ss_base',1.5)} ${set('pe_ss_void',1.5)} } } }
    ${v.cityLike ? ZONES.map(([z, js]) => `if = { limit = { ${v.cls === 'l' ? NOT_HAB : ''} num_zones = { type = ${z} value > 0 } } root = { ${js.map(([j,n]) => job(j,n)).join(' ')} } }`).join('\n') :
      (v.cls === 'f' ? `if = { limit = { ${HAB} } root = { ${job('pe_private_technician',2)} } } else = { root = { ${job('pe_private_farmer',2)} } }` :
        `root = { ${job(v.cls === 'm' ? 'pe_private_miner' : 'pe_private_technician',2)} }`)}
    if = { limit = { ${HAB} }
      ${v.cityLike ? (v.cls === 'l' ? `root = { ${['physicist','biologist','engineer'].map(j => job('pe_private_'+j,zoneVar('habitat_research_district_jobs')/100)).join(' ')} }
        if = { limit = { num_zones = { type = zone_habitat_research value > 0 } } root = { ${['physicist','biologist','engineer'].map(j => job('pe_private_'+j,zoneVar('habitat_zone_district_3_jobs')/100)).join(' ')} } }
        if = { limit = { num_zones = { type = zone_habitat_research_unity value > 0 } } root = { ${['physicist','biologist','engineer'].map(j => job('pe_private_'+j,zoneVar('habitat_zone_district_researchers_4_jobs')/100)).join(' ')} ${job('pe_private_bureaucrat',zoneVar('habitat_zone_district_unity_4_jobs')/100)} } }
        ${[['zone_research_physics','physicist'],['zone_research_society','biologist'],['zone_research_engineering','engineer']].map(([z,j]) => `if = { limit = { num_zones = { type = ${z} value > 0 } } root = { ${job('pe_private_'+j,zoneVar('scaling_district_1_job')/100)} } }`).join('\n        ')}` : '') : zone(HAB_DISTRICT[v.cls])}
      ${upkeep(HAB_UPKEEP)}
    } else = { ${v.cityLike ? '' : zone(v.district)} ${upkeep({energy: UPKEEP[v.k]})} }
  `;
  // Negative net changes only. Construction reserves gross consumption, not its output.
  // Below the margin, the stockpile may carry the gap (0.47.1): allowed while it covers the
  // gap to the margin for STOCK_MONTHS. A full store no longer stops all growth over a few
  // units of monthly income (17,000 energy, net 72 against a margin of 76).
  const check = (delta='pe_sd', test=delta, ok='pe_safe_ok') => `root = { ${set(ok,1)}
    if = { limit = { NOT = { has_country_flag = pe_safe_ready } } ${set(ok,0)} }
    ${S.map(r => `if = { limit = { check_variable = { which = ${delta}_${r} value < 0 } }
      ${set('pe_ss_test', `pe_safe_net_${r}`)} ${add('pe_ss_test',`pe_safe_reserved_${r}`)} ${add('pe_ss_test',`${test}_${r}`)}
      if = { limit = { check_variable = { which = pe_ss_test value < pe_safe_margin_${r} } }
        ${set('pe_ss_gap', `pe_safe_margin_${r}`)} ${sub('pe_ss_gap', 'pe_ss_test')} ${mul('pe_ss_gap', STOCK_MONTHS)}
        if = { limit = { check_variable = { which = pe_safe_stock_${r} value < pe_ss_gap } } ${set(ok,0)} }
      }
    }`).join('\n')} }`;
  const reserve = (delta='pe_sd') => `root = { ${S.map(r=>add(`pe_safe_reserved_${r}`,`${delta}_${r}`)).join(' ')} }`;
  // Per variant its own vector (pe_safe_vec_<code>, pe_safe_buy_<code>): the engine copies every
  // scripted effect call while loading, and a call of the full dispatch (all 80 variants) per
  // candidate made 0.36.8-0.40.0 crash before the main menu (0.40.2).
  // A new firm starts small (city ${CITY_F[0]}, rural ${RURAL_F[0]}/${RURAL_F[1]} of "normal"; the larger).
  const founding = code => `root = { ${set('pe_ss_code',code)} ${set('pe_ss_scale',+Math.max(CITY_F[0], RURAL_F[0] / RURAL_F[1]).toFixed(2))} } pe_safe_vec_${code} = yes
    root = { ${S.map(r => `${set(`pe_safe_build_${r}`,`pe_sc_${r}`)} ${mul(`pe_safe_build_${r}`,-1)}`).join(' ')} }
    ${check('pe_sd','pe_safe_build')}`;
  const buy = code => `root = { ${set('pe_ss_code',code)} ${set('pe_ss_scale',1)} } pe_safe_buy_${code} = yes ${check()}`;
  const growth = `root = { ${set('pe_ss_code','prev.pe_code')} ${set('pe_ss_scale','prev.pe_szd')} }
    planet = { ${dispatch()} ${check()} }`;
  const retool = `root = { ${set('pe_ss_code','prev.pe_code')} ${set('pe_ss_target','prev.pe_to_c')} ${set('pe_ss_scale','prev.pe_sz')} }
    planet = { ${dispatch()}
      root = { ${RES.map(r=>set(`pe_safe_old_${r}`,`pe_sd_${r}`)).join(' ')} ${set('pe_ss_code','pe_ss_target')} }
      ${dispatch()}
      root = { ${RES.map(r=> `${sub(`pe_sd_${r}`,`pe_safe_old_${r}`)} ${set(`pe_gd_${r}`,`pe_sd_${r}`)}`).join(' ')}
        ${S.map(r=>`${set(`pe_safe_out_${r}`,`pe_safe_old_${r}`)} ${mul(`pe_safe_out_${r}`,-1)} ${sub(`pe_safe_out_${r}`,`pe_sc_${r}`)}`).join(' ')} }
      ${check('pe_sd','pe_sd','pe_guard_ok')}
      ${check('pe_safe_out','pe_safe_out','pe_safe_out_ok')}
      root = { if = { limit = { check_variable = { which = pe_safe_out_ok value = 0 } } ${set('pe_guard_ok',0)} } }
    }`;
  const monthly = `pe_safe_month = {
    # Reset at the monthly budget boundary, BEFORE any site completion or investment.
    # No expected construction production enters this separate safety ledger.
    pe_job_values = yes
    ${S.map(r=>`export_resource_income_to_variable = { resource = ${r} variable = pe_safe_net_${r} }
      export_resource_stockpile_to_variable = { resource = ${r} variable = pe_safe_stock_${r} }
      export_trigger_value_to_variable = { trigger = resource_expenses_compare parameters = { resource = ${r} } variable = pe_safe_margin_${r} }
      ${mul(`pe_safe_margin_${r}`,0.05)}
      if = { limit = { check_variable = { which = pe_safe_margin_${r} value < 10 } } ${set(`pe_safe_margin_${r}`,10)} }
      if = { limit = { check_variable = { which = pe_safe_margin_${r} value > 250 } } ${set(`pe_safe_margin_${r}`,250)} }
      ${set(`pe_safe_reserved_${r}`,0)}`).join('\n')}
    every_owned_colony = { every_deposit = { limit = { has_deposit_category = pe_deposit_cat_sites }
      ${szCalc('pe_ss_sz', 'pe_tstage', 'pe_target')}
      root = { ${set('pe_ss_code','prev.pe_target')} ${set('pe_ss_scale','prev.pe_ss_sz')} }
      planet = { pe_safe_vector = yes root = { ${S.map(r=>sub(`pe_safe_reserved_${r}`,`pe_sc_${r}`)).join(' ')} } }
    } }
    set_country_flag = pe_safe_ready
  }`;
  write(safetyFile, header + `# Supply safety: monthly cached budget plus an empire-wide commitment ledger.
# Full staffing, observed job rates, stage/habitat jobs (the state's districts also their
# specialisation jobs), direct base upkeep.
# Population maintenance is already in the budget; no population is created by a job.
# Dispatchers by root.pe_ss_code (monthly reconciliation); candidates call their own variant.
pe_safe_vector = { ${zero()} ${ifChain(variants, v => `root = { check_variable = { which = pe_ss_code value = ${v.code} } }`, v => `pe_safe_vec_${v.code} = yes`)} }
pe_safe_buy_vector = { ${zero()} ${ifChain(variants, v => `root = { check_variable = { which = pe_ss_code value = ${v.code} } }`, v => `pe_safe_buy_${v.code} = yes`)} }
pe_safe_growth = { ${growth} }
${variants.map(v => `pe_safe_vec_${v.code} = { ${zero()} ${vector(v)} }
pe_safe_buy_${v.code} = {
    ${zero()} ${vector(v)}
    root = { ${RES.map(r=>set(`pe_safe_new_${r}`,`pe_sd_${r}`)).join(' ')} }
    ${state(v)}
    root = { ${RES.map(r=>`${mul(`pe_sd_${r}`,-1)} ${add(`pe_sd_${r}`,`pe_safe_new_${r}`)}`).join(' ')} }
}`).join('\n')}
${monthly}
`);
  return {check, reserve, founding, buy, retool};
}
