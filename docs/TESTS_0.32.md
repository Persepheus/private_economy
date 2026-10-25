# Version 0.32 – Testablauf: Betriebliche Sozialleistungen und Forschungsinstitute

Ein laufendes Spiel kann weiterlaufen. Beides wirkt ab dem nächsten Quartal.

## Betriebliche Sozialleistungen („Konzern-Beamte“)
- **Wer:** Konzerne mit mindestens 3000 Kasse.
- **Was:** Auf jedem Planet mit ihren Firmen leben ihre Beschäftigten auf dem höchsten Lebensstandard (Utopischer Überfluss).
  - Gezählt wird ihr Anteil an den besetzten Privatjobs dort, nach Firmengröße, dazu ihr Institut.
- **Kosten:** Der Konzern kauft die zusätzlichen Konsumgüter zum Marktpreis aus seiner Kasse. Dein Lager bleibt unberührt.
  - Lücke je 100 Pops und Monat: von Normal 0,75, von Gut 0,5, von Geschichtet 0,9.
  - Bei Utopischem Überfluss oder Dekadenz gibt es nichts anzuheben.
- **Wirkung:** Der Planet bekommt den Modifikator „Betriebliche Sozialleistungen“: die Zufriedenheit dieses Standards für den Anteil der Pops, die der Konzern beschäftigt.
  - Von Normal +20 %, von Gut +15 %, von Geschichtet +30 %, je anteilig.
  - Beispiel: 40 % der Pops arbeiten für Konzerne, von Normal → +8 % Zufriedenheit.
- **Firmenregister:** In der Konzernzeile steht „Sozialleistungen … £trade£/Quartal“.

## Konzern-Forschungsinstitut
- **Wo:** Am Hauptsitz eines reichen Konzerns ein Vorkommen „Konzern-Forschungsinstitut (Fach, Stufe)“.
- **Stufen:** 100 Forscherstellen je Stufe, bis Stufe III.
- **Fach:**
  - Physik: Energie und Physik.
  - Biologie: Handel, Unterhaltung, Gesellschaft, Medien, Landwirtschaft.
  - Ingenieurwesen: Industrie, Konsumgüter, Bergbau, Ingenieurwesen.
- **Beste Ausstattung:** +25 % Arbeitskraft der privaten Forscher dieses Fachs auf dem Planeten.
- **Löhne:** Die Beschäftigten sind Konzern-Beamte; sie zählen zu den Sozialleistungen.
- **Ausbau:** Stufe I ab 4000 Kasse, II ab 8000, III ab 12000.
  - Je 25 % im Quartal, 800 für die Ausstattung.
- **Betrieb:** 30 je Stufe und Quartal. Mit Kasse unter 0 eine Stufe zurück.
- **Umzug:** Zieht der Hauptsitz um, zieht das Institut mit.
- **Ende:** Löst sich der Konzern auf, verschwindet es.
- **Firmenregister:** „Institut Stufe …“.

## Prüfen (Save Hesukaran, Stormgate Utilities mit 114 Tsd. Kasse)
1. Nach einem Quartal: Hat das Konzern-Habitat (Hauptsitz von Stormgate) ein Institut? Stormgate ist ein Bergbaukonzern, also Ingenieurwesen. Über die Quartale steigt es bis Stufe III.
2. Planetenansicht der Planeten mit Konzernfirmen: Modifikator „Betriebliche Sozialleistungen“ mit Zufriedenheit.
3. Firmenregister: Sozialleistungen je Konzern; die Kasse von Stormgate sinkt bzw. wächst langsamer.
4. Logs: keine Fehler aus pe_corp_effects_generated.txt (pe_corp_social) oder pe_corp_lab_deposits_generated.txt.
