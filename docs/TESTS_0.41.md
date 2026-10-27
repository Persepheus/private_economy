# Tests 0.41.0

Statisch geprüft (Validator einschließlich der Codex-Tests). Im Spiel noch nicht getestet. Anlass ist die Save-Reihe Queptilium 2296–2301.

## Firmenlager als Vorkommen

- **Befund im Save 2301:**
  - Die Lager-Gebäude standen in Spezialisierungs-Slots, die sich die Engine selbst ausgesucht hat.
  - Auf Leaf's Haven standen zwei Lager (Legierungs- und Handelsvertrag) in einer Energie-Spezialisierung eines Habitat-Energiedistrikts, die es vorher nach deiner Beobachtung nicht gab.
  - Ein drittes stand in einer Mineralien-Spezialisierung.
- **Jetzt:**
  - Das Lager ist ein Vorkommen „Firmenlager: <Ressource>“ auf dem Planeten der Firma. Es belegt keinen Bauplatz und keinen Distrikt.
  - Laufende Verträge aus alten Saves: Beim nächsten Monatswechsel verschwinden die Gebäude, und die Vorkommen erscheinen.
  - Eine Spezialisierung, die das Gebäude angelegt hat, bleibt bestehen. Sie lässt sich von Hand ändern.
- **Text:** Das Angebot nennt das Firmenlager jetzt schon in der Beschreibung.
- **Prüfen:** Auf Leaf's Haven und dem Mineralien-Habitat sind die Gebäude weg und die Vorkommen da. Bei einem neuen Vertrag erscheint nur das Vorkommen.

## Rüstungsauftrag: Preis nach Technik

- Grundpreis pro Schiff wie bisher: Korvette 150, Zerstörer 300, Kreuzer 600, Schlachtschiff 1.200 Legierungen.
- Neu: +30 % für jede erforschte von zehn Techs:
  - Panzerung 3–5;
  - Schilde 3–5;
  - Fusions-, Kaltfusions-, Antimaterie- und Nullpunktreaktor.
- Dein Stand 2301 (neun davon) ergibt das 3,7-Fache, also ein Schlachtschiff für etwa 4.440.
- Es gibt weiter höchstens die Hälfte des Lagers. Bei gleichem Lager sind es also weniger Schiffe, und die Gebühr in Handel bleibt die Hälfte der Legierungsmenge.
- Das Angebot zeigt jetzt den Stückpreis.

## Logs

- Die Kauf-Zeile `buyout of a district for firm variant N on <Planet>: …` und die Zeile `firm beyond the share …` zeigen jetzt ihre Werte. Planetenvariablen und `$Parameter$` erscheinen in Logs leer oder verstümmelt.
