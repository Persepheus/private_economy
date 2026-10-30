// Shared by the firm generator and static checks. Filters only message effects,
// in their original recipient scope; surrounding simulation effects keep running.
export const messageCategories = [
  ['firms', 'Firmenentwicklung', 'Firm development',
    'Gründungen, Distriktkäufe, Wachstum, Schrumpfung und Verstaatlichungen.',
    'Founding, district purchases, growth, downsizing and nationalisation.'],
  ['restructuring', 'Umbau und Umzüge', 'Restructuring and relocation',
    'Produktionswechsel und Firmenumzüge, auch wegen Versorgungsproblemen.',
    'Production changes and firm relocations, including moves caused by shortages.'],
  ['automation', 'Automatisierung', 'Automation',
    'Automatisierung durch Firmen oder Konzerne und deren Rückbau.',
    'Automation by firms or corporations and its removal.'],
  ['crises', 'Firmenkrisen und Schäden', 'Firm crises and damage',
    'Insolvenzen, zerstörte Firmen, abgebrochene Baustellen und Konzern-Liquiditätskrisen.',
    'Bankruptcies, destroyed firms, cancelled construction and corporate liquidity crises.'],
  ['corporations', 'Konzernentwicklung', 'Corporate development',
    'Konzerngründungen, Beitritte, Übernahmen, Auflösungen und Wiederaufbau. Fusionsentscheidungen bleiben sichtbar.',
    'Corporate founding, firms joining, acquisitions, dissolution and reconstruction. Merger decisions remain visible.'],
  ['supply', 'Lieferketten', 'Supply chains',
    'Neue und beendete Lieferverträge zwischen Firmen.',
    'New and ended supply contracts between firms.'],
  ['stations', 'Orbitalstationen', 'Orbital stations',
    'Bau und Kauf von Konzernstationen. Angebote, die deine Zustimmung benötigen, bleiben sichtbar.',
    'Construction and purchase of corporate stations. Offers requiring your consent remain visible.'],
  ['megastructures', 'Dyson-Schwärme und Arc Furnaces', 'Dyson swarms and arc furnaces',
    'Baubeginn, Fertigstellung und Ausbau privater Dyson-Schwärme und Arc Furnaces.',
    'Construction starts, completion and upgrades of private Dyson swarms and arc furnaces.'],
  ['habitats', 'Konzern-Habitate', 'Corporate habitats',
    'Habitatbau, Besiedlung, Hauptsitzverlegung, Erstattungen und Ende der Konzernrechte.',
    'Habitat construction, settlement, headquarters relocation, refunds and termination of corporate rights.'],
  ['military', 'Flotten, Schutz und Zitadellen', 'Fleets, protection and citadels',
    'Ergebnisse und Ende von Flottenaufträgen, Werkschutz, Schutzflotten, Rüstungsverträgen und Konzern-Zitadellen.',
    'Results and termination of fleet contracts, corporate guards, defence fleets, defence contracts and corporate citadels.'],
  ['ownership', 'Eroberung und Besatzung', 'Conquest and occupation',
    'Konzern- und Hauptsitzwechsel durch Eroberung oder Besatzung sowie Kontributionen.',
    'Corporate and headquarters transfers due to conquest or occupation, and occupation levies.'],
  ['patrons', 'Mäzene und private Initiativen', 'Patrons and private initiatives',
    'Prototyp-Ergebnisse, Touristenunglücke, aufgedeckte Spionage und Ende privater Lieferzusagen. Folgen gelten auch ohne Meldung.',
    'Prototype results, tourist accidents, exposed espionage and ended private supply pledges. Consequences apply even without a notification.'],
];

export function messageCategory(key) {
  const rules = [
    [/^pe_msg_(found_|buy_|up_|down_|nat_|merge$)/, 'firms'],
    [/^pe_msg_(relocate|retool_)/, 'restructuring'],
    [/^pe_msg_(auto_|autodown_|corp_auto_)/, 'automation'],
    [/^pe_msg_(bankrupt_|firm_ruined$|site_cancel$|corp_crisis$)/, 'crises'],
    [/^pe_msg_corp_(gone|join|acq|rebuild)$/, 'corporations'],
    [/^pe_msg_spb_/, 'corporations'],
    [/^pe_msg_supply_/, 'supply'],
    [/^pe_msg_corp_st_/, 'stations'],
    [/^pe_msg_(corp_swarm|corp_furnace|swarm_done)/, 'megastructures'],
    [/^pe_msg_chab_/, 'habitats'],
    [/^pe_msg_(cit_|charter_|defence_|guard|fleet_nodesign|arms_nodesign)/, 'military'],
    [/^pe_msg_(conq_|occ_)/, 'ownership'],
    [/^pe_msg_deal_/, 'patrons'],
  ];
  const category = rules.find(([pattern]) => pattern.test(key))?.[1];
  if (!category) throw new Error(`Unclassified Private Economy message: ${key}`);
  return category;
}

// Inclusive opening brace, exclusive closing position. Ignore strings/comments.
export function blockEnd(text, open) {
  let depth = 0, quote = false, comment = false;
  for (let i = open; i < text.length; i++) {
    const c = text[i];
    if (comment) { if (c === '\n') comment = false; continue; }
    if (quote) { if (c === '\\') i++; else if (c === '"') quote = false; continue; }
    if (c === '#') { comment = true; continue; }
    if (c === '"') { quote = true; continue; }
    if (c === '{') depth++;
    else if (c === '}' && --depth === 0) return i + 1;
  }
  throw new Error('Unbalanced script block');
}

export function filterMessageCalls(text) {
  // Work backwards so offsets remain valid. The generic pe_corp_msg definition
  // uses $KEY$: its concrete callers are gated instead, without another effect
  // call layer (Stellaris has a small scripted-effect nesting limit).
  const changes = [];
  for (const m of text.matchAll(/\b(create_message|pe_corp_msg)\s*=\s*\{/g)) {
    const end = blockEnd(text, text.indexOf('{', m.index));
    const call = text.slice(m.index, end);
    let key;
    if (m[1] === 'pe_corp_msg') {
      key = call.match(/^pe_corp_msg\s*=\s*\{\s*KEY\s*=\s*(pe_msg_[^\s}]+)/)?.[1];
      if (!key) continue; // Effect definition, not a call.
    } else {
      if (!/\btype\s*=\s*pe_private_economy\b/.test(call)) continue;
      key = call.match(/\blocalization\s*=\s*([^\s}]+)/)?.[1];
      if (key === '$KEY$') continue;
    }
    const category = messageCategory(key);
    changes.push([m.index, end, `if = { limit = { NOT = { has_country_flag = pe_mute_${category} } } ${call} }`]);
  }
  for (const [start, end, replacement] of changes.reverse()) text = text.slice(0, start) + replacement + text.slice(end);
  return categorizeMessageTypes(text);
}

// Also usable once on existing, already gated handwritten scripts. This changes
// presentation only, and is idempotent. Corporate helpers receive the category
// explicitly because their localisation key is a scripted-effect parameter.
export function categorizeMessageTypes(text) {
  const changes = [];
  for (const m of text.matchAll(/\b(create_message|pe_corp_msg)\s*=\s*\{/g)) {
    const end = blockEnd(text, text.indexOf('{', m.index));
    const call = text.slice(m.index, end);
    let replacement;
    if (m[1] === 'pe_corp_msg') {
      const key = call.match(/^pe_corp_msg\s*=\s*\{\s*KEY\s*=\s*(pe_msg_[^\s}]+)/)?.[1];
      if (!key || /\bCATEGORY\s*=/.test(call)) continue;
      replacement = call.replace(/\s*\}$/, ` CATEGORY = ${messageCategory(key)} }`);
    } else {
      if (!/\btype\s*=\s*pe_private_economy\s/.test(call)) continue;
      const key = call.match(/\blocalization\s*=\s*([^\s}]+)/)?.[1];
      const category = key === '$KEY$' ? '$CATEGORY$' : messageCategory(key);
      replacement = call.replace(/\btype\s*=\s*pe_private_economy\b/, `type = pe_private_economy_${category}`);
    }
    changes.push([m.index, end, replacement]);
  }
  for (const [start, end, replacement] of changes.reverse()) text = text.slice(0, start) + replacement + text.slice(end);
  return text;
}

export const settingsFiles = [
  'common/decisions/pe_message_settings_generated.txt',
  'events/pe_message_settings_generated.txt',
  'localisation/german/pe_message_settings_l_german.yml',
  'localisation/english/pe_message_settings_l_english.yml',
  'common/message_types/pe_messages.txt',
  'interface/pe_message_icons.gfx',
];

export function generateMessageSettings(write) {
  const header = '# Generated by tools/generate-firms.mjs via message-settings.mjs - do not edit by hand.\n';
  write(settingsFiles[0], `${header}decision_pe_message_settings = {
  owned_planets_only = yes
  sound = event_administrative_work
  icon = decision_politics
  resources = { category = decisions }
  potential = {
    is_capital = yes
    owner = { is_ai = no }
  }
  effect = { hidden_effect = { owner = { country_event = { id = pe_settings.1 } } } }
  ai_weight = { weight = 0 }
}
`);
  let events = `${header}namespace = pe_settings\n`;
  for (const page of [1, 2]) {
    const reopen = `country_event = { id = pe_settings.${page} }`;
    events += `
country_event = {
  id = pe_settings.${page}
  title = pe_settings.${page}.name
  desc = pe_settings.desc
  picture = GFX_evt_city_planet
  is_triggered_only = yes
  trigger = { is_ai = no }
`;
    for (const [category] of messageCategories.slice((page - 1) * 6, page * 6)) {
      for (const enabled of [true, false]) {
        events += `  option = {
    name = pe_settings_${category}_${enabled ? 'on' : 'off'}
    trigger = { ${enabled ? `NOT = { has_country_flag = pe_mute_${category} }` : `has_country_flag = pe_mute_${category}`} }
    custom_tooltip = pe_settings_${category}_tip
    hidden_effect = {
      ${enabled ? 'set' : 'remove'}_country_flag = pe_mute_${category}
      ${reopen}
    }
  }
`;
      }
    }
    for (const enabled of [true, false]) {
      events += `  option = {
    name = pe_settings_all_${enabled ? 'on' : 'off'}
    custom_tooltip = pe_settings_all_tip
    hidden_effect = {
${messageCategories.map(([c]) => `      ${enabled ? 'remove' : 'set'}_country_flag = pe_mute_${c}`).join('\n')}
      ${reopen}
    }
  }
`;
    }
    events += `  option = {
    name = pe_settings_page_${page === 1 ? 2 : 1}
    hidden_effect = { country_event = { id = pe_settings.${page === 1 ? 2 : 1} } }
  }
  # X must use this inert option, never the first category toggle.
  option = { name = pe_settings_close default_hide_option = yes }
}
`;
  }
  write(settingsFiles[1], events);
  // Retain the old type for notifications already present in a saved game.
  let types = `${header}message_type = {
  key = "pe_private_economy"
  name = "pe_private_economy_title"
  icon = "GFX_message_trade_deal"
  icon_frame = 1
  sound = "notification"
  ping = "ping_notification_green"
  category = economy
  default_toast = yes
}
`;
  let sprites = `${header}spriteTypes = {\n`;
  for (const [c] of messageCategories) {
    types += `message_type = {
  key = "pe_private_economy_${c}"
  name = "pe_message_${c}_title"
  icon = "GFX_pe_message_${c}"
  icon_frame = 1
  sound = "notification"
  ping = "ping_notification_green"
  category = ${c === 'military' || c === 'ownership' ? 'military' : 'economy'}
  default_toast = yes
}
`;
    for (const inline of [false, true]) sprites += `  spriteType = {
    name = "GFX_${inline ? 'text_' : ''}pe_message_${c}"
    texturefile = "gfx/interface/icons/message/pe_message_${c}${inline ? '_text' : ''}.dds"
    noOfFrames = 1
  }
`;
  }
  write(settingsFiles[4], types);
  write(settingsFiles[5], sprites + '}\n');
  for (const [lang, de] of [['german', true], ['english', false]]) {
    const lines = [];
    const add = (key, german, english) => lines.push(` ${key}:0 "${de ? german : english}"`);
    add('decision_pe_message_settings', 'Privatwirtschaft: Nachrichten einstellen', 'Private Economy: Message settings');
    add('decision_pe_message_settings_desc', 'Wähle, welche Meldungen und Informationsfenster der Privatwirtschaft du erhalten möchtest. Gilt für dein gesamtes Reich; jederzeit kostenlos änderbar.', 'Choose which Private Economy notifications and information windows you want to receive. Applies throughout your empire; change settings freely at any time.');
    add('pe_settings.1.name', 'Nachrichten: Firmen und Wirtschaft (1/2)', 'Messages: Firms and economy (1/2)');
    add('pe_settings.2.name', 'Nachrichten: Projekte und Reich (2/2)', 'Messages: Projects and empire (2/2)');
    add('pe_settings.desc', '§GAktiv§! / §RStumm§! zeigt den aktuellen Zustand. Klicke auf eine Kategorie, um sie umzuschalten. Die Änderung gilt sofort für zukünftige Meldungen im gesamten Reich und wird im Spielstand gespeichert.\\n\\n§YEchte Entscheidungen und Angebote bleiben sichtbar.§! Wirtschaftsabläufe, Kosten, Belohnungen und negative Folgen laufen auch bei stummen Meldungen weiter. Bereits angezeigte Meldungen werden nicht entfernt.\\n\\nStandard: alles aktiv. Die allgemeinen Stellaris-Nachrichteneinstellungen gelten zusätzlich.', '§GOn§! / §RMuted§! shows the current state. Click a category to toggle it. Changes apply immediately to future notifications throughout your empire and are saved with the game.\\n\\n§YActual decisions and offers remain visible.§! Economic activity, costs, rewards and negative consequences continue even when messages are muted. Existing notifications are not removed.\\n\\nDefault: everything on. General Stellaris message settings still apply.');
    add('pe_settings_all_on', 'Alle Meldungen aktivieren (Standard)', 'Enable all messages (default)');
    add('pe_settings_all_off', 'Alle Meldungen stummschalten', 'Mute all messages');
    add('pe_settings_all_tip', 'Gilt für alle Kategorien auf beiden Seiten. Ereignisse mit Entscheidungen bleiben sichtbar.', 'Applies to all categories on both pages. Events with choices remain visible.');
    add('pe_settings_page_1', 'Zurück: Firmen und Wirtschaft (1/2)', 'Back: Firms and economy (1/2)');
    add('pe_settings_page_2', 'Weiter: Projekte und Reich (2/2)', 'Next: Projects and empire (2/2)');
    add('pe_settings_close', 'Schließen', 'Close');
    for (const [c, german, english, tipDe, tipEn] of messageCategories) {
      add(`pe_settings_${c}_on`, `£pe_message_${c}£ §GAktiv§!: ${german}`, `£pe_message_${c}£ §GOn§!: ${english}`);
      add(`pe_settings_${c}_off`, `£pe_message_${c}£ §RStumm§!: ${german}`, `£pe_message_${c}£ §RMuted§!: ${english}`);
      add(`pe_message_${c}_title`, `Privatwirtschaft: ${german}`, `Private Economy: ${english}`);
      add(`pe_settings_${c}_tip`, tipDe, tipEn);
    }
    for (const [id, c] of [[206, 'patrons'], [228, 'patrons'], [252, 'patrons'], [270, 'corporations'], [285, 'military'], [288, 'military'], [308, 'military']])
      add(`pe_notice_${id}_title`, `£pe_message_${c}£ $pe.${id}.name$`, `£pe_message_${c}£ $pe.${id}.name$`);
    write(`localisation/${lang}/pe_message_settings_l_${lang}.yml`, `\ufeffl_${lang}:\n${lines.join('\n')}\n`);
  }
}
