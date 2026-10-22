# Prototyp: Private Holdings (Hilfsreich)

Ziel: Prüfen, ob ein Hilfsreich Stationen, Kilostrukturen und Flotten in unserem Raum besitzen kann und ob das Leasing von Flotten funktioniert. Erst danach bauen wir daraus Mechaniken. Alles läuft per Konsole, ohne Einfluss auf das normale Spiel.

## Schritte
1. `event pe.15`: Das Hilfsreich „Private Holdings“ entsteht (eigener Länder-Typ, ohne KI, ohne Grenzen). Es bekommt 1000 Energie, 500 Mineralien und 200 Legierungen.
   - Prüfen: Erscheint es in der Kontaktliste? Hat es eine Flagge? Gibt es Fehler im error.log?
2. `event pe.16`: Eine Bergbaustation der Holdings auf einem freien Orbitalvorkommen in deinem Raum.
   - Prüfen: Ist die Station auf der Karte sichtbar und gehört sie den Holdings (Farbe, Tooltip)? Wird sie nach einem Monat noch angezeigt?
3. `event pe.17`: Ein Dyson-Schwarm (Stufe I) der Holdings an einem Stern in deinem Raum, mit dem Schwarm-Modifier auf dem Stern.
   - Prüfen: Ist der Schwarm sichtbar? Wem gehört er? Erscheint er in der Megastruktur-Liste von dir oder von niemandem?
4. `event pe.18`: Drei Korvetten deines neuesten Entwurfs, Eigentum der Holdings, an dich verleast (`set_controller`).
   - Prüfen: Kannst du die Flotte steuern? Was zeigt der Flotten-Tooltip (Eigentümer, Vertrag)? Wer zahlt den Unterhalt? Kämpft sie, und zählt sie zu deiner Flottenkapazität?
5. Ein paar Monate laufen lassen, dann `event pe.19`: Bericht mit Lager und Monatseinkommen der Holdings sowie ihren Stationen, Megastrukturen und Flotten.
   - Prüfen: Steigen ihre Mineralien bzw. ihre Energie (Station, Schwarm)? Wenn nicht, produzieren fremde Stationen nichts für ihren Eigentümer.
6. `event pe.20`: Die Holdings verkaufen dir ihre Mineralien und Energie zum halben Grundpreis. Der Handel geht in den Pool.
   - Prüfen: Kommen die Rohstoffe bei dir an? Ist der Handel abgezogen?
7. Speichern und laden, dann `event pe.19` erneut: Ist alles noch da?
8. Optional ein Krieg: Greifen Feinde die Station der Holdings an? Wird der Leasingvertrag gebrochen (Vanilla bricht Söldnerverträge bei Kriegsbeginn)?
9. `event pe.21`: Holdings mit allem entfernen.

## Was ich danach wissen will
- error.log und game.log (lese ich selbst).
- Kurz: Was war sichtbar und wem gehörte es (Station, Schwarm, Flotte)? Kannst du die Flotte steuern? Hat sich das Lager der Holdings verändert?

## Ergebnis Test 1 (2232–2235)
- **Station (pe.16):** Sie ist sichtbar, bleibt über den Monatswechsel und hat die richtige Flagge. Sie zeigte aber das Enklaven-Symbol statt des Stationssymbols.
- **Dyson-Schwarm (pe.17):** Sichtbar und dauerhaft. Er gehört den Holdings und steht nicht in deiner Liste.
- **Flotte (pe.18):** Steuerbar und kampffähig, aber nicht veränderbar. Tooltip: „wird in 0 Tagen zurückgegeben“, sie bleibt aber. Unterhalt und Flottenkapazität hast du gezahlt.
- **Bericht (pe.19):** Die Holdings bekommen die Erträge von Station und Schwarm.
- **Verkauf (pe.20):** Hat funktioniert (game.log: 500 Mineralien und 964 Energie für 732 Handel). Das Event lief aber unsichtbar.
- **Speichern/Laden und Kriegserklärung:** Alles blieb erhalten, auch die Flotte.
- **Entfernen (pe.21):** Alles weg, nur der Schwarm-Modifier blieb am Stern.
- **error.log:** „Failed to randomize ethics / find government configuration“ beim Erstellen der Holdings.

## Änderungen für Test 2
- **Länder-Typ:** ohne `is_enclave` (vermutlich die Ursache des Enklaven-Symbols).
- **Erstellung:** Die Holdings bekommen Autorität (Oligarchie), Ethik, Civics und Origin, wie Vanilla-Enklaven.
- **Geleaste Flotte:**
  - Modifier „Geleast von den Private Holdings“: kein Unterhalt, keine Flottenkapazität, wie bei Vanilla-Söldnern.
  - Zusätzlich `uses_naval_capacity = no`.
- **pe.20:** zeigt ein Fenster mit Mengen und Preis.
- **pe.21:** entfernt den Schwarm-Modifier über den gespeicherten Stern.

## Prüfen in Test 2
1. pe.15 ohne „Failed to randomize ethics“ im error.log.
2. pe.16: Hat die Station jetzt das normale Stationssymbol?
3. pe.18: kein Unterhalt und keine Flottenkapazität für dich, Modifier sichtbar.
4. pe.20 zeigt das Fenster. pe.21 lässt keinen Modifier am Stern zurück.
