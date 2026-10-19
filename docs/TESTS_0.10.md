# Version 0.10 – Testablauf

Ein laufendes 0.9-Spiel kann weiterlaufen. Für saubere Zahlen empfehle ich ein neues Spiel.

## Neu

### Privatjobs = vollständige Vanilla-Jobs
- **Kopie aller elf Jobs:** Jeder Privatjob ist jetzt eine komplette Kopie seines Vanilla-Jobs: alle Swaps, Tags, Bedingungen, Modifikatoren und Gewichte, in der **Vanilla-Wirtschaftskategorie**.
- **Fixe Zusatzerträge:** Bisher fehlten den Privatjobs alle `_add`-Boni (rund 630 Stellen in Vanilla), weil sie nicht an Unterkategorien vererbt werden. Beispiele: Techs mit +Legierungen pro Metallurg, das Chemiewerk mit +Motes für Metallurgen und Kunsthandwerker, Zonen, Ziviken, Traditionen. Jetzt gelten sie alle.
- **Swaps:** 55 Varianten, z. B. Angler statt Bauer, Perlentaucher statt Kunsthandwerker, Priester statt Bürokrat bei Spiritualisten, katalytische Techniker. Sie heißen „Privater …“ bzw. „… (privat)“ und tragen die Vanilla-Icons.

### Gewinn als Handelszahlung
- **Bisher:** Der Gewinnanteil wurde als −X % Ertrag der Privatjobs abgezogen. Das geht mit der Vanilla-Kategorie nicht mehr.
- **Jetzt:** Privatjobs produzieren wie Staatsjobs. Den Gewinn der Firmen (Gewinnanteil × Wertschöpfung, nach Ordnung 0/15/20/25/35 %) **zahlst du jedes Quartal in Handel**, soweit dein Lager reicht. `pe.6` zeigt „Von dir gezahlte Gewinne letztes Quartal“.
- Die frühere „+15 % Effizienz“ entfällt.

### Aufkauf ohne Bauzeit
- Aus dem gekauften Distrikt wird sofort die Firma, ohne Baustelle.
- Danach hat der Planet ein Jahr Pause.

### Automatisierung
- **Energie:** Den Energieunterhalt, den die Engine für automatisierte Jobs verlangt (4 pro automatisiertem Arbeiterjob), **erstatten dir die Firmen jedes Quartal**. Die eigene Wartungspauschale (8/10) entfällt.
- **Nur für unbesetzte Jobs:** Automatisiert wird nur, wenn Privatjobs dieses Typs auf dem Planeten unbesetzt sind.
- **Rückbau:** Gibt es zwei Quartale lang freie Zivilisten auf dem Planeten, wird die Automatisierung um eine Stufe zurückgebaut. Damit verdrängt sie keine Pops, die arbeiten könnten.

### Ersparnisse gedeckelt
- **Ab 3000 Kapital** im Pool fließen keine Ersparnisse mehr ab.
- Im letzten Spielstand hatten Pools bis zu 173.000 angehäuft, weil sie ohne Pops nichts ausgeben konnten.

## Prüfen
1. **Swaps:** Mit der Zivik Angler erscheinen „Private Angler“ statt Privater Bauern. Spiritualisten bekommen Priester-Varianten.
2. **Zusatzerträge:** Mit einem Chemiewerk produzieren private Metallurgen auch Motes, und Tech-Boni erscheinen im Job-Tooltip.
3. **Gewinn:** `pe.6` zeigt die gezahlten Gewinne. Dein Handel sinkt pro Quartal um diesen Betrag plus die Ersparnisse.
4. **Aufkauf:** Distrikt weg, Firma sofort da, Jobs sofort besetzbar.
5. **Automatisierung:** Der Energie-Unterhalt im Tooltip bleibt, wird aber pro Quartal als Gutschrift erstattet. Bei freien Zivilisten wird nach zwei Quartalen zurückgebaut.
6. **Logs:** error.log nach `pe_private_`, `swap`, `pe_auto` und `pe_profit` durchsuchen.
