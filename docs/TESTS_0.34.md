# Version 0.34 – Testablauf: Rüstungsvertrag

Ein laufendes Spiel kann weiterlaufen.

## Was neu ist
- **Angebot (pe.306):**
  - Ein Industriekonzern mit mindestens 5000 Kasse, der reichste, bietet uns einen Rüstungsvertrag an. Das geschieht mit 15 % je Quartal, wenn keiner läuft; danach fünf Jahre Pause.
  - Menschliche Reiche bekommen das Angebot, KI-Reiche unterschreiben ohne Fenster.
- **Leistung:**
  - Der Konzern trägt 10 % unseres Flottenunterhalts, solange er sehr reich ist (ab 15.000 Kasse) 20 %.
  - Wir bekommen dafür den Modifikator „Rüstungsvertrag“ (Schiffsunterhalt −10 bzw. −20 %).
  - Der Konzern zahlt jedes Quartal den eingesparten Wert aus seiner Kasse, zu Grundpreisen: Energie 1, Legierungen 4, Handel 1.
  - Es tauchen keine Schiffe auf. Die Flotte bleibt unsere, wir können nur mehr davon unterhalten.
- **Für den Konzern:**
  - **Rüstungsaufträge:** +10 % Arbeitskraft der privaten Metallurgen auf jedem Planeten mit einem seiner Stahlwerke. Mehr Legierungen für uns, mehr Gewinn für ihn.
  - **Rüstungszentrum** am Hauptsitz: +2 Stabilität, +10 % Metallurgen.
  - **Kriegsleasing:** Das Angebot kommt zuerst von ihm.
- **Ende:**
  - Fällt seine Kasse unter 1000 oder gibt es ihn nicht mehr, endet der Vertrag. Es gibt eine Nachricht und drei Jahre Pause.
  - Die Modifikatoren verschwinden; Schiffe verschwinden nie.
- **Firmenregister:** Unter den Konzernen steht „Rüstungsvertrag mit …: x % des Flottenunterhalts, letztes Quartal y £trade£“.

## 0.34.1: Private Automatisierung im Haushalt
- **Bisher:** Die Energie für automatisierte Privatjobs stand voll in deiner Haushaltszeile „Automatisierte Arbeitskraft“. Die Firmen erstatteten sie einmal im Quartal unsichtbar ins Lager, als Schätzung von 4 Energie je automatisiertem Job.
- **Jetzt:**
  - Der Reichsmodifikator **„Private Automatisierung“** senkt diese Zeile um den privaten Anteil. Die Haushaltsanzeige stimmt also.
  - Die Firmen zahlen die Energie weiter aus ihrem Kapital (beim Maschinen-Leasing der Investorenpool); das Geld verlässt die Wirtschaft.
  - Die verdeckten Energiegutschriften entfallen.
- **Wie der Anteil entsteht:**
  - Jedes Quartal schätzt die Mod die privaten Kosten, also automatisierte Privatjobs × 4 Energie.
  - Daraus und aus der beobachteten Haushaltszeile ergibt sich der Anteil.
  - Bis 100 %, solange keine Kolonie Vanilla-Automatisierung des Staats hat; sonst höchstens 95 %, damit staatliche Kosten sichtbar bleiben.
- **Prüfen:**
  1. Nach dem nächsten Quartal: Modifikator „Private Automatisierung“ beim Reich, Zeile „Automatisierte Arbeitskraft“ nahe 0 (im Save etwa 268 vorher).
  2. Im game.log jedes Quartal: „automation cover: private P of E energy a month observed, cover now M %“. Bleibt eine Restzeile, liegt die Schätzung daneben; die Zahlen aus dem Log helfen beim Nachjustieren.

## Konsole
- `event pe.307`: sofort ein Angebot (wenn keiner läuft). Der reichste Industriekonzern bekommt dafür mindestens 5000 Kasse.

## Prüfen
1. `event pe.307`: Kommt das Angebot pe.306 mit Konzernname und Anteil?
2. Unterzeichnen:
   - Sofort: Reichsmodifikator „Rüstungsvertrag“, Schiffsunterhalt im Haushalt um 10 % niedriger.
   - Am nächsten Quartal: „Rüstungsaufträge“ auf Planeten mit seinen Stahlwerken, „Rüstungszentrum“ am Hauptsitz. Im Firmenregister die Zeile mit der Zahlung.
   - Die Konzernkasse sinkt um diese Zahlung.
3. Im Krieg: Das Kriegsleasing-Angebot kommt von diesem Konzern.
4. Logs: keine Fehler aus pe_corp_effects_generated.txt (pe_dc_step) oder pe_contract_events.txt; die Zeile „pe.307 defence contract …“ im game.log.
