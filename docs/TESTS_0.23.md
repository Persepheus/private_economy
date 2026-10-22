# Version 0.23 – Testablauf

Ein laufendes Spiel kann weiterlaufen.

## Neue Konzern-Angebote
Alle Schiffe gehören dem Konzern (Holdings), werden dir verleast (10 % Unterhalt, keine Flottenkapazität) und haben einen Kommandanten bzw. Wissenschaftler der Holdings.

- **Erkundungscharta (pe.286):**
  - Wann: Unvermessene Planeten in Systemen neben deinen Grenzen, ein Konzern mit mindestens 400 Kasse. 20 % pro Quartal, dann 5 Jahre Pause.
  - Was: Ein Forschungsschiff deines Entwurfs mit einem Wissenschaftler des Konzerns, 5 Jahre. Der Konzern zahlt 300.
  - Danach: Der Konzern bekommt die Schürfrechte. Seine Stationspause endet, und er darf eine Station über die Grenze (40 / 25 / 15 %) hinaus nehmen. Dazu kommt eine Nachricht.
  - **Zu prüfen:** Werden Vermessungen des geleasten Schiffs dir gutgeschrieben?
- **Konvoischutz (pe.287 / pe.288):**
  - Wann: Piraten oder Plünderer in einem System innerhalb deiner Grenzen, ein Konzern mit 600 Kasse. 35 % pro Quartal, dann 3 Jahre Pause.
  - Was: Eine Patrouille mit 1,5-facher Stärke der Piraten, höchstens 3 Jahre.
  - Danach: Ist das System frei, kehrt sie zurück; der Konzern bekommt Beute.
- **Bergung (pe.289):**
  - Wann: Trümmerfelder aus Schlachten (Bergungsprojekte), ein Konzern mit 300 Kasse. 30 % pro Quartal, dann 2 Jahre Pause.
  - Was: Du bekommst sofort 80 Legierungen und 40 Ingenieursforschung pro Feld, der Konzern 200 Kasse pro Feld. Die Projekte gehen an die Holdings.
- **Dyson-Schwarm (pe.292):**
  - Wann: Mit der Technik Dyson-Schwarm, ein Energie- oder Rohstoffkonzern mit 3000 Kasse, ein einzelner Stern ohne Megastruktur in deinem Gebiet. 20 % pro Quartal, dann 4 Jahre Pause, höchstens einer pro Konzern.
  - Ablauf je Wirtschaftsordnung: unter Laissez-faire ohne Fragen, unter Freier Markt und Gemischt als Angebot.
  - Was: Der Schwarm (Stufe I) gehört dem Konzern. Sein Effekt auf die Station am Stern wirkt wie bei Vanilla. Der Konzern zählt ihn wie eine Station mit 20 Wert im Monat und produziert 40 in seinem Produkt.
- **Schiffsspende eines Mäzens (pe.291):**
  - Wann: im Mäzen-Topf, sobald du ein Forschungs- oder Bauschiff verloren hast (zwei Jahre lang) oder nur noch eines oder keines davon besitzt.
  - Was: Ein neues Schiff deines Entwurfs, das dir gehört. Ein Forschungsschiff hat Vorrang.

## Korrektur
- Beim Einbau hätte ich beinahe den Monatsimpuls `pe.100` überschrieben, also die ganze Privatwirtschaft. Er ist wiederhergestellt, und der Validator prüft ihn jetzt.

## Korrekturen 0.23.1 (nach dem ersten Test)
- **Keine Anführer** (error.log: „assign_leader effect failed“): Der Anführer der Holdings wurde zugewiesen, als die Flotte schon an dich verleast war. Jetzt läuft es wie bei Vanilla:
  - Die Holdings werden Eigentümer.
  - Ihr Anführer (als Event-Target gemerkt) wird zugewiesen.
  - Erst danach wird die Flotte an dich verleast.
  - Bleibt eine Flotte trotzdem ohne Anführer, steht im game.log „corporate fleet without a leader“.
- **`pe.277` hat laufende Verträge weitergezählt:** Dein Kriegsleasing stand nach mehreren Aufrufen von 17 auf 9 Quartalen, die Charta lief vorzeitig ab. Jetzt löst `pe.277` nur Angebote aus und lässt laufende Verträge in Ruhe.
- **Angebote mischten ihre Daten:** Alle Angebote nutzten dieselben Zwischenwerte (Konzern, Stärke, Budget, Ort). Kamen zwei in einem Quartal, überschrieb das zweite das erste, bevor du antworten konntest. So begann eine Charta ohne Konzern. Jetzt hat jede Art eigene Werte (`pe_wl_`, `pe_cl_`, `pe_cv_`, `pe_ch_`, `pe_sv_`, `pe_sw_`), und jedes Event setzt seinen Konzernnamen selbst.
- **Dyson-Schwarm:** Er wurde gebaut (unter Laissez-faire ohne Angebot), nur ohne Hinweis. Jetzt kommt eine Nachricht. In der Galaxis gab es 10 Schwärme, also bauen auch KI-Konzerne.
- **Log-Fehler „Failed to get leader from scope“** beim Zurückgeben einer Flotte ohne Anführer: behoben.
- `pe.277` schreibt ins Log, welcher Konzern für welches Angebot in Frage kam (0 = keiner oder Bedingung fehlt).

## Debug
- `event pe.277`: alle Konzern-Angebote sofort, jeweils nur, wo die Bedingung erfüllt ist: Kriegsleasing auch im Frieden, Säuberung, Charta, Konvoischutz, Bergung, Schwarm.

## Prüfen
1. `event pe.277` früh im Spiel: Charta-Angebot. Das Schiff ist steuerbar und hat einen Wissenschaftler. Prüfen, ob seine Vermessungen bei dir ankommen.
2. Nach einer Schlacht mit Trümmern: Bergungsangebot, danach Legierungen und Forschung bei dir.
3. Ein Forschungsschiff verlieren: Später kommt eine Mäzen-Spende (oder `event pe.10` mehrmals).
4. Mit Dyson-Schwarm-Technik und einem Energiekonzern mit 3000 Kasse: Schwarm-Angebot, danach Schwarm der Holdings am Stern.
5. Logs: keine Fehler aus pe_fleet_effects.txt, pe_fleet_events.txt oder pe_on_actions.txt.
