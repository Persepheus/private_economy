# Version 0.21 – Testablauf

Ein laufendes Spiel kann weiterlaufen. Hauptsitz-Modifier werden im nächsten Quartal zu Hauptsitz-Vorkommen, Niederlassungs-Modifier verschwinden.

## Private Holdings
- **Entstehung:** Jedes Reich mit mindestens einem Konzern bekommt eine Holding. Sie trägt die Flagge des Reichs, steht nicht in der Kontaktliste und ist über ein Relation-Flag mit dem Reich verbunden. Die KI bekommt ebenfalls eine.
- **Wofür:** Sie hält die Stationen der Konzerne. Jede Station trägt ein Flag ihres Konzerns.

## Konzern-Stationen
- **Rohstoffe:** nur Orbitalvorkommen gewöhnlicher Rohstoffe (Mineralien, Energie, Forschung, Handel …). Strategische Rohstoffe bleiben außen vor.
- **Was eine Branchengruppe nutzt:**
  - Industrie: Mineralien, Energie, Legierungen.
  - Handel und Freizeit: Handel, Energie, Konsumgüter.
  - Wissenschaft und Medien: die drei Forschungen, Einheit.
  - Rohstoffe: Mineralien, Energie, Nahrung.
- **Erwerb:** Zuerst ein freies Vorkommen (der Konzern baut), sonst eine Station von dir (er kauft).

| | Freies Vorkommen | Deine Station |
|---|---|---|
| Laissez-faire (ohne Fragen) | du bekommst nichts | du bekommst 100 Mineralien (Baukosten) |
| Freier Markt / Gemischt (Event pe.280) | 100 Mineralien Konzession, jährlich ein Fünftel des Stationswerts | 200 Mineralien, jährlich ein Fünftel des Stationswerts |
| Gelenkt / Planwirtschaft | – | – |

- **Grenzen:**
  - Höchstens ein Erwerb pro Reich und Quartal (25 % Chance).
  - Pro Konzern alle 5 Jahre einer.
  - Private Stationen höchstens 40 % (Laissez-faire), 25 % (Freier Markt) oder 15 % (Gemischt) deiner Stationen gewöhnlicher Rohstoffe.
  - Der Konzern braucht Kasse; er zahlt Bau und Preis selbst.
- **Nutzen für dich:** Der Ertrag der Station geht an die Holding und wird verbraucht. Dafür produziert der Konzern **doppelt so viel Wert** (zu Grundpreisen) zusätzlich in seinem eigenen Produkt. Beispiele:
  - Physikstation +7 (Wert 24,5) bei einem Stahlkonzern: +12 Legierungen.
  - Bei einem Physik-Konzern: +14 Physik.
- **Anzeige:**
  - Vorkommen „Konzernproduktion: Legierungen“ usw. auf dem Hauptsitz.
  - Eigene Haushaltszeile „Konzernproduktion“.
- **Konzernkasse:** Der Konzern verbucht pro Quartal die Hälfte des Stationswerts als Einnahme.
- **Auflösung:** Löst sich ein Konzern auf, gehen seine Stationen an dich zurück. Bei einer Fusion übernimmt der Stärkere die Stationen.
- **Planwirtschaft:** Die Konzernproduktion verschwindet, die Stationen gehen an dich.
- **Rest im Lager der Holding:** Einmal im Jahr. Fehlt dir der Rohstoff, kommt ein Angebot für 60 % des Marktpreises (Event pe.281). Sonst wird exportiert, und der Pool bekommt die Hälfte des Grundwerts.

## Hauptsitz als Vorkommen
- „Hauptsitz: Name“ ist jetzt ein Vorkommen mit denselben Effekten (+1 Stabilität, +2 % Jobertrag).
- Niederlassungs-Modifier gibt es nicht mehr. Das Register `event pe.273` zeigt Firmen, Stationen und Kasse.

## Korrekturen 0.21.1 (nach dem ersten Test)
- **Erstkontakt mit den eigenen Holdings:** Die Holdings entstehen jetzt mit `released_by_country` (sofortiger Kontakt) und `contact_rule = never` (niemand sonst trifft sie). Bestehende Holdings bekommen jedes Quartal den Kontakt, falls er fehlt.
- **Station über einem Planeten mit Anomalie:** Konzerne nehmen nur Vorkommen auf Planeten, die du vermessen hast und die keine Anomalie haben. Die Anomalie hatte ein Energievorkommen versteckt und später in Mineralien umgewandelt.
  - Der Konzern hat die Umwandlung mitbekommen. Im Save rechnete er mit „Mineralien 6“ (Wert 6), produzierte also 12 Energie.
  - Die Zuordnung liest die Vorkommen jedes Quartal neu aus.
- **Nur echte Vorkommen:** Mineralien, Energie, Legierungen, Nahrung, Physik, Gesellschaft, Ingenieurwesen, Handel, jeweils mit Stufe. Sonderfälle wie Arc Furnace, Drachenhort, Kristallriss, Protostern, Roter Riese, Einheit und Maschinen-Direktive bleiben draußen. Legierungen waren schon dabei.
- **Versuch: Konzern im Firmen-Tooltip.** Jede Firma hat eine Tooltip-Zeile „Gehört zum Konzern X“ oder „Unabhängiges Unternehmen“. Ob das Spiel die Zeile im Vorkommen-Tooltip auswertet (Scope der Firma), muss der Test zeigen. Sonst steht dort nur „Unabhängiges Unternehmen“ oder ein Platzhalter.

## Firmenregister (0.21.2)
- **Ergebnis des Tooltip-Versuchs:** Bei jeder Firma stand „Unabhängiges Unternehmen“. Der Tooltip eines Vorkommens wird also nicht im Kontext der einzelnen Firma ausgewertet.
- **Coop und Branch Office Planner geprüft:**
  - Die Branch-Office-Mod zeigt Zustände über austauschbare Gebäudetypen und eigene Knöpfe (überschriebene Oberfläche).
  - Coop nutzt ein eigenes Event-Fenster.
  - Für einzelne Vorkommen hilft beides nicht. Gebäudetypen tauschen ginge nur mit 389 × 9 Firmen-Vorkommen.
- **Lösung:** Planeten-Entscheidung **Firmenregister**.
  - Kostenlos, die KI nutzt sie nie.
  - Sie öffnet ein Fenster mit allen Privatfirmen des Planeten: Name, Größe (klein, mittel, groß) und Konzern bzw. „unabhängig“.
  - Bis zu 20 Firmen, darüber „… und N weitere“.
  - Der Tooltip jeder Firma verweist darauf.

## Debug
- `event pe.274`: Der erste aktive Konzern holt sich sofort eine Station (Holdings werden bei Bedarf erstellt; Grenze und Pause gelten nicht). Unter Freier Markt oder Gemischt kommt das Angebot.

## Prüfen
1. Ein Quartal laufen lassen: Hauptsitze sind Vorkommen, keine Niederlassungs-Modifier mehr.
2. `event pe.274`: Station über dem Planeten, im Besitz der Holdings (deine Flagge). Dazu Nachricht oder Angebot.
3. Ein Quartal später: Vorkommen „Konzernproduktion“ auf dem Hauptsitz, Haushaltszeile „Konzernproduktion“ in der Höhe des doppelten Stationswerts.
4. `event pe.273`: Der Konzern zeigt 1 Station.
5. Die Holdings tauchen nicht in der Kontaktliste auf.
6. Logs: keine Fehler aus pe_corp_effects_generated.txt, pe_corp_triggers_generated.txt oder pe_corp_deposits_generated.txt.
