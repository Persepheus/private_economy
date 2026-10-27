# Tests 0.40.0

Statisch geprüft (Validator einschließlich der Codex-Tests). Im Spiel noch nicht getestet.

## Gewinnauszahlung und Deckel

- **Deckel neu:**
  - Grundlage ist der Netto-Handel im Monat, den das Reich ohne die Ledger der Privatwirtschaft hätte. Das sind Einnahmen minus Ausgaben, plus die Gewinn- und Sparzeilen des letzten Quartals.
  - Erlaubt sind 40 % der ersten 100, 70 % der nächsten 200 und 85 % von allem über 300.
  - Beispiele: Bei 50 netto sind es 20, bei 200 netto 110, bei 1.000 netto 775 Handel im Monat.
  - Ohne Netto-Handel zahlt der Staat nichts. Dann verdienen Firmen nichts und sparen nicht.
- **Monopol und Katastrophenhilfe:** Die Faktoren 1,25 und 0,5 wirken vor dem Deckel. Unter Monopol kann die Auszahlungsquote also über 100 % liegen, der Deckel gilt trotzdem.
- **Kein Zeitversatz mehr:**
  - Firmen buchen ihren Gewinn zur Quote des Vorquartals (`pe_lpay`). Am Quartalsende wird die Differenz zur neuen Quote mal Gewinnanspruch mit dem Investorenpool verrechnet (`pe_lcorr`, kann negativ sein). Der Pool kann dadurch kurz ins Minus gehen.
  - Ersparnisse bekommt der Pool erst am Quartalsende, zur Quote, die der Staat zahlt (vorher sofort zur Vorquartalsquote).
- **Preiskampf:** Die 30 % weniger Gewinn wirken jetzt vor dem Anspruch an den Staat. Bisher zahlte der Staat den vollen Betrag, und die Differenz verschwand.
- **Log** (nur dein Reich, jedes Quartal): `ledgers: net trade without them N, cap C, due D a month, profits paid P%, pool settlement S`.
- **Prüfen:**
  - Sinkt die Handelsbilanz nicht mehr ins Minus, wenn der Handel klein ist?
  - Sind die Zeilen „Gewinnauszahlung“ und „Private Ersparnisse“ im Budget zusammen höchstens so groß wie der Deckel im Log?
  - KI-Reiche: Haben sie genug Netto-Handel, damit ihre Firmen noch verdienen? Das ist der wichtigste Kalibrierungspunkt.

## Holdings im zweiten Krieg

- Jeden Monat gilt: Ist einer unserer Kriege ohne die Holdings mit Zitadelle, treten sie unseren Kriegen bei. Bisher blieben sie draußen, sobald sie schon in einem Krieg waren.
- **Log:** `the holdings with the citadel join our wars`.

## Kaufangebot (pe.110)

- Die Optionen „verkaufen“ und „bleibt in Staatshand“ erscheinen nur, wenn das Angebot noch gilt:
  - Der Planet gehört uns und ist nicht besetzt.
  - Die Wirtschaftsordnung erlaubt Käufe (Freie Marktwirtschaft oder Laissez-faire).
  - Dem Staat bleibt mindestens ein Distrikt des Typs, auf Habitaten mit Forschungszone für Labore.
- Sonst gibt es nur „Das Angebot ist hinfällig.“, ohne die Strafe für eine Ablehnung.
- Die Versorgungsprüfung läuft bei der Annahme wie bisher erneut.
- **Log:** `buyout offer on <Planet> no longer holds`, wenn sich die Lage zwischen Fensteröffnung und Klick ändert.

## Firmenregister

- **Lage des Planeten:** Warum die Investoren im letzten Quartal gegründet haben oder nicht, zum Beispiel:
  - Baustelle läuft, Pause nach Gründung, Kriegsgebiet;
  - Anteil der Wirtschaftsordnung ausgeschöpft, kein freier Platz, Stellen unter 80 % besetzt, keine Arbeitslosen;
  - keine lohnende Firma, Kapital reicht nicht, Versorgungsprüfung;
  - gegründet, gekauft, Anfrage über der Quote, Verstaatlichung.
- **Jede Firma:** Gewinn des letzten Quartals (nach Auszahlungsquote und Preiskampf) und was sie tut:
  - baut aus (auch mit Konzernkredit), schrumpft, schließt, größte Stufe;
  - zahlt Gründungsschuld oder Konzernkredit ab, Verluste (auch überbrückt), Sanierungsfall;
  - Ausbau wartet auf Arbeiter, auf Arbeitslose oder auf eine andere Firma hier; Ausbau gestoppt durch knappe Rohstoffe; spart, weil kein Konzern leiht.
- **Gewinnauszahlung:** aktuelle Quote in %, Deckel im Monat und der Netto-Handel ohne Privatwirtschaft.
- Werte erscheinen erst nach dem nächsten Quartal. Bis dahin steht „noch keine Quartalsbilanz“ bzw. „noch nicht ausgewertet“.
