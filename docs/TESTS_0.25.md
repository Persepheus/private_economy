# Version 0.25 – Testablauf

Ein laufendes Spiel kann weiterlaufen. Alles stellt sich beim nächsten Quartal um.

## Standortvorteile
- **Neues Vorkommen „Standortvorteile“** (Kategorie Privatwirtschaft) statt der Planeten-Modifikatoren „…-Cluster (n Firmen)“ und „Lieferverträge: …“.
  - Im Vorkommen stehen die Boni als bedingte Modifikatoren, zum Beispiel Metallurgen-Ertrag +6 % bei 3 Stahlwerken.
  - Cluster: 2 / 3 / 4+ Firmen mit demselben Hauptprodukt ergeben +3 / 6 / 9 %.
  - Liefervertrag: +5 % für die Branche.
  - Gleiche Werte wie bisher.
- Die alten Modifikatoren verschwinden im nächsten Quartal.
- Das Vorkommen erscheint nur, wenn es auf dem Planeten mindestens einen Cluster oder Liefervertrag gibt.

### Prüfen
1. Nach einem Quartal: In der Modifikatorliste der Planeten sind keine Cluster- und Liefervertrags-Modifikatoren mehr.
2. Stattdessen gibt es oben bei den Vorkommen „Standortvorteile“.
   - Zeigt der Tooltip nur die aktiven Boni?
   - Oder alle, auch die inaktiven? Das wäre ein Darstellungsproblem, das ich dann löse.
3. Der Ertrag der Branche (Tooltip der Jobs) enthält den Bonus weiterhin.

## Konzernproduktion im Hauptsitz
- Die Konzernproduktion ist jetzt Teil des Vorkommens **„Hauptsitz: Konzernname“**. Die eigenen Vorkommen „Konzernproduktion: …“ verschwinden.
- Die Beschreibung erklärt, woher die Produktion kommt:
  - Stationen und Schwärme des Konzerns, verwaltet von den Holdings.
  - Davon das Anderthalbfache des Werts in seinem Produkt.
- Mehrere Konzerne auf einem Planeten haben jeweils ihre eigene Zeile.
- Bis 2047 im Monat pro Konzern, vorher 511. Ein großer Schwarm wird also nicht mehr abgeschnitten.

### Prüfen
1. Nach einem Quartal steht im Hauptsitz-Vorkommen die Energie, bei dir etwa 272.
2. Haushalt „Konzernproduktion“ unverändert.
3. „Konzernproduktion: Energie“ ist weg.

## Gewinnauszahlung und Ersparnisse
- **„Private Gewinne“ heißt jetzt „Gewinnauszahlung an Privatfirmen“**, die Haushaltszeile ebenso.
- Die Beschreibung erklärt, dass das eine Ausgabe ist und wofür:
  - Die Firmen liefern alles ans Reich.
  - Der Staat zahlt dafür ihren Gewinnanteil nach Wirtschaftsordnung.
- „Private Ersparnisse“ hat ebenfalls eine klarere Beschreibung.

## Konzerne bezahlen Automatisierung
- Fehlen Arbeiter für private Minen, Kraftwerke oder Farmen, investiert die Privatwirtschaft in „Private Automatisierung“.
  - Die Bedingungen sind dieselben wie bisher: freie Jobs, keine untätigen Zivilisten, mindestens 600 Jobs der Art, Technologie, und der Ertrag muss den Energieunterhalt um 25 % übersteigen.
- **Neu:**
  - Gehört dort eine dieser Firmen zu einem Konzern, bezahlt der Konzern die ganze Investition aus seiner Kasse: Stufe I 600, Stufe II 800. Er behält 300 Reserve.
  - Die Firmen und der Pool zahlen dann nichts.
  - Ein Konzern kann die Automatisierung auch dann bezahlen, wenn Firmen und Pool es nicht könnten.
- Nachricht: „Konzern X hat auf Y die Private Automatisierung (Bergbau) aus eigener Kasse bezahlt.“
- Ausbau und Neugründungen bezahlt der Konzern weiterhin nicht.

### Prüfen
1. Dein Rohstoffkonzern hat viel Kasse. Auf einem Planeten mit seinen Minen oder Kraftwerken und fehlenden Arbeitern sollte die Nachricht kommen. Die Kasse im Firmenregister sinkt um 600 bzw. 800.
2. Logs: keine Fehler aus pe_economy_effects.txt (pe_auto_invest) oder pe_corp_effects_generated.txt (pe_corp_auto_msg, pe_hq_bits, pe_cluster_apply).
