# Tests 0.47.0

Statisch geprüft (Validator). Im Spiel noch nicht getestet. Ein laufendes Spiel übernimmt die Regeln im nächsten Quartal.

## Ausgangslage (Save 2269.05.14)

- Reich 16777222: Mineralien -371 im Monat, 1664 im Lager, Schattenpreis 5,59; Konsumgüter +251 im Monat, Schattenpreis 0,46.
- 31 Firmen ohne Gewinn, darunter 13 Konsumgüterfabriken und 8 Stahlwerke. Gewinn aller Firmen pro Quartal: 38 (ein Jahr zuvor 1691).

## Rettungsumbau

- `pe_rt_resc = 1`: `pe_val < 0` oder `pe_firm_acute`. Dann genügt ein Alter von 4 Quartalen, Gründungsschulden sind erlaubt, und der Liefervertrag bremst bei akutem Mangel nicht.
- Fehlt Kapital (`pe_fcap < pe_cost`), zahlt der Pool `pe_rt_need`, die Firma bekommt es als `pe_debt` (geht auf den Bauplatz und die neue Firma über). `pe_paid = 3`; bei fehlendem Landdistrikt wird alles zurückgebucht.
- Nur bezahlbare Kandidaten konkurrieren um den Umbau des Planeten.
- **Prüfen im game.log:** Zeilen `restructuring on <Planet>: variant <alt> to <neu>, pool loan <n>`, auch für KI-Reiche.
- **Prüfen im Spielstand:** Bei 16777222 sinkt die Zahl der Konsumgüterfabriken, das Mineraliendefizit wird kleiner.

## Kein Überbrückungskredit für Wertvernichter

- `pe_negq`: Quartale in Folge mit `pe_val < 0`. Ab 2 kein Überbrückungskredit; bei negativem Kapital schrumpft die Firma.
- **Prüfen:** Firmen mit Status 15 (Überbrückungskredit) werden weniger.

## Akuter Mangel

- `pe_acute_<res> = 1`, wenn `pe_net < 0` und das Lager kleiner als 12 × Defizit ist.

## Fehlerbehebung

- `pe_pirate_system`, `pe_monster_system`: `exists = owner`. **Prüfen:** kein „Invalid context switch [owner] from … [fleet]“ im error.log.

## 0.47.1: das Lager zählt

- `pe_safe_month` speichert `pe_safe_stock_<res>`. Liegt `Netto + Reservierung + Firma` unter `pe_safe_margin_<res>`, ist das Wachstum erlaubt, wenn `pe_safe_stock_<res> >= 240 × (Marge − Wert)`.
- Gilt für Wachstum, Gründung, Kauf von Distrikten und die Prüfung beim Umbau.
- Statisch geprüft: `node tools/test-supply-safety.mjs` (Grenzfall, zweite Nutzung desselben Lagers, Defizit mit großem Lager).
- **Prüfen im Spielstand:** Die Zahl der Firmen mit Status 9 („Versorgungsschutz“) sinkt bei KI-Reichen mit vollem Lager deutlich (Save 2276: 48). Reiche mit echtem Mangel und leerem Lager (16777224: Energie −10, Lager 3.500) bleiben gesperrt.
