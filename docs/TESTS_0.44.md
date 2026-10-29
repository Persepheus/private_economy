# Tests 0.44.0

Statisch geprüft (Validator einschließlich der Codex-Tests). Im Spiel noch nicht getestet. Zusammen mit 0.43 (Firmenstufen, [TESTS_0.43.md](TESTS_0.43.md)) testen.

## Produktivität und Löhne der Privatjobs

- Jeder Privatjob (alle elf, auch ihre Swap-Varianten) erzeugt zusätzlich **+0,5 Handel** und hat **0,1 Konsumgüter** mehr Unterhalt.
- Beides steht im Ressourcenblock des Jobs, in seiner Kategorie (z. B. `planet_miners`). Boni der Kategorie wirken also auch auf diesen Handel.
- Die Lohn-Konsumgüter zählen nicht für die Defizit-Sperre (`pe_ok_<Firma>`) und nicht für die Versorgungsprüfung vor Gründung, Wachstum und Kauf. Ein Konsumgüter-Defizit stoppt also keine Bergbau- oder Agrarfirmen.
- **Prüfen:** Tooltip eines privaten Bergarbeiters zeigt +0,5 Handel und −0,1 Konsumgüter. Die Budgetübersicht zeigt mehr Handel aus den Job-Kategorien.

## Gewinnauszahlung aus dem Handelslager (nur KI)

- Wenn der Deckel einer KI kleiner ist als das, was im Quartal fällig ist, wird er um den Teil des Handelslagers erhöht, der über zwölf Monatszahlungen liegt (höchstens bis zum vollen Betrag).
- Die Zahlung läuft wie bisher als monatlicher Unterhalt in Handel; das Lager der KI sinkt entsprechend.
- Für den Spieler ändert sich nichts.
- **Prüfen im Save:** Bei KI-Reichen mit großem Handelslager sollte `pe_lpay` (Auszahlungsquote) jetzt deutlich höher sein als die bisherigen 21–39 %, und `pe_lstock` zeigt, wie viel das Lager im letzten Quartal beigetragen hat.

## 0.44.1: früher Deckel und Startwarnung

- Deckel der Gewinnauszahlung: 60 % der ersten 100 Netto-Handel im Monat (vorher 40 %), dann wie bisher 70 % der nächsten 200 und 85 % darüber. Bei 65 Netto-Handel steigt der Deckel von 26 auf 39 im Monat.
- **Prüfen:** game.log, Zeile `ledgers: … cap …`: Bei unter 100 Netto-Handel ist der Deckel 60 % davon.
- Neues Spiel: error.log enthält keine Meldungen `Variable pe_s_… is not set` mehr.

## 0.44.2: Verlängerung des Lagervertrags

- Sechs Monate vor Ende bietet die Firma die Verlängerung an, wenn der Bestand mindestens 85 % des eigenen Lagers ohne Vertrag erreicht (vorher 85 % des verdoppelten Lagers).
- Beispiel aus dem Save 2235.08.15: eigenes Lager 15.000 Mineralien, mit Vertrag 30.000. Bisher brauchte die Verlängerung 25.500, jetzt 12.750.
- **Prüfen:** Ein laufender Vertrag mit vollem eigenem Lager meldet sich sechs Monate vor Ende mit dem Verlängerungsangebot (pe.325). Der Tooltip der Lagergrenze zeigt „Speicherkapazität (Mineralien)“ statt des Modifikator-Schlüssels, error.log meldet ihn nicht mehr.

## 0.44.3: Flotte ohne Schiffsentwurf

- Kriegspacht, Räumung, Konvoischutz und Schutzflotte: Kann keine Schiffsklasse gebaut werden (kein einziger passender Entwurf), wird die leere Flotte entfernt, der Vertrag startet nicht, der Konzern zahlt nichts. Bei der Schutzflotte kommen bezahlte Legierungen (voll oder halb) bzw. 150 Einfluss zurück.
- Rüstungsauftrag: Bei der Lieferung ohne Entwurf kommen die Legierungen und die Handelsgebühr zurück, der Konzern gibt die Gebühr ab.
- Nachrichten `pe_msg_fleet_nodesign` und `pe_msg_arms_nodesign` (Kategorie Flotten), game.log: `corporate fleet without any ship design` bzw. `arms order without any ship design`.
- **Prüfen (nur per Konsole sinnvoll):** Alle Kriegsschiff-Entwürfe löschen, dann einen Flottenvertrag annehmen: keine leere Flotte, Nachricht, Erstattung.
