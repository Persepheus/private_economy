# Tests 0.43.0

Statisch geprüft: Validator und Codex-Tests, dazu neue Tests der Firmengröße je Stufe, Planet, Habitat und Void Dweller. Im Spiel noch nicht getestet.

## Firmenstufen

| Arbeitskraft | klein | normal | mittel | groß |
|---|---|---|---|---|
| Landfirma (Mine, Kraftwerk, Farm) | 200 | 300 | 400 | 500 |
| Stadtfirma und Labor | 130 | 200 | 300 | 400 |
| Habitat ohne Void Dweller, alle Firmen | 130 | 200 | 300 | 400 |
| Habitat mit Void Dweller (Ursprung oder Voidborn), alle Firmen | 200 | 300 | 400 | 500 |

- **Ohne Spezialisierung:** Eine Landfirma hat dieselben Jobs, ob der Planet die Spezialisierung ihres Distrikttyps hat oder nicht. Es gibt keine zusätzlichen Spezialisierungsjobs mehr in Firmen.
- **Neue Firmen:** Gründungen starten als „(Kleinbetrieb)“. Kosten: Stadt 325, Land 200, Habitat 390 Privatkapital (vorher 500 / 300 / 600 für die damals kleinste Stufe).
- **Distriktkauf:** Der gekaufte Distrikt wird eine normale Firma (Name ohne Zusatz), wie bisher.
- **Wachstum:** klein → normal in der Stadt 263 Kapital, sonst Stadt 375 und Land 150 pro Stufe.
- **Schrumpfen und Pleite:** Eine normale Firma mit Verlusten schrumpft jetzt zum Kleinbetrieb. Erst ein Kleinbetrieb geht pleite. Bei Bombardement wird erst ein Kleinbetrieb zur Ruine. Ruinen werden als Kleinbetrieb wieder aufgebaut.
- **Größe in Kosten:** Unterhalt, Räumungskosten, Verstaatlichungspreis, Umbaukosten, Umzugskosten, Konzernbeitritt, Gewinn und Fixkosten skalieren mit der Größe relativ zu „normal“ (Stadt 0,65 / 1 / 1,5 / 2, Land 0,67 / 1 / 1,33 / 1,67).

## Bestehende Spielstände

- Firmen behalten ihren Typ und ihre Stufe. Die bisherige Stufe „klein“ heißt jetzt „normal“, „mittel“ und „groß“ bleiben.
- **Stadtfirmen** bleiben gleich groß (200 / 300 / 400).
- **Landfirmen:** normal 300 (vorher 200, mit Spezialisierung 300), mittel 400 statt 450, groß 500 statt 600. Auf Planeten mit vielen großen Minen gibt es also etwas weniger Jobs, auf Planeten ohne Spezialisierung mehr.
- **Habitate:** Minen und Kraftwerke haben normal 200 (vorher 100, mit Spezialisierung 200). Labore haben immer ihre vollen Jobs, auch ohne Forschungsspezialisierung.
- Laufende Baustellen werden in der Stufe fertig, die sie hatten.

## Prüfen

- Planet mit Privatfirmen: Die Jobzahlen passen zur Tabelle. Prüfe eine Mine auf einem Planeten mit und einem ohne Bergbau-Spezialisierung; beide sollten gleich viele Jobs haben.
- Eine neue Gründung erscheint als „(Kleinbetrieb)“ mit 130 bzw. 200 Jobs und wächst später zur normalen Firma.
- Das Firmenregister zeigt die Stufen „klein / normal / mittel / groß“.
- Habitat ohne Void Dweller: Mine normal 200 Jobs. Habitat eines Void-Dweller-Reichs: 300.
- error.log: keine neuen Fehler zu `d_pe_firm_*_0`, `pe_sz`, `pe_szd`, `pe_wfall`.
