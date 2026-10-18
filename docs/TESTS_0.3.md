# Version 0.3 – Testablauf

**Neues Spiel nötig:** Firmen tragen jetzt Variablen (Typ, Stufe, Kapital), und die Firmenschlüssel haben sich geändert.

## Der Kreislauf

Schattenpreis → Wertschöpfung pro Job → Gewinnanteil → Firmenkapital und Investorenpool → Wachstum, Gründung, Aufkauf → mehr Angebot → Preis sinkt → weniger Gewinn → Umbau oder Pleite.

### Schattenpreise (in Handel pro Einheit)

- **Grundlage:** Marktpreis, d. h. Kauf- und Verkaufspreis inklusive Gebühr. Ohne Markt gilt der Basiswert ±30 %: Energie, Mineralien und Nahrung 1, Konsumgüter 2, Legierungen 4. Handel ist 1.
- **Fluss-Güter** (Mineralien, Energie, Konsumgüter, Nahrung):
  - Im Defizit gilt der Kaufpreis.
  - Mit wachsendem Überschuss sinkt der Wert bis zum Verkaufspreis, erreicht bei 33 % Überschuss.
  - Volles Lager: Verkaufspreis.
- **Investitionsgüter:** Legierungen gelten immer zum Kaufpreis, ebenso **Nahrung bei Reichen mit Bioschiffen**.
- **Defizitprämie:** + Defizit in % der Produktion (höchstens +200 %). Reicht das Lager kein Jahr, kommen +30 % dazu.

### Wertschöpfung pro Job

- Sie wird aus den **echten** Einnahmen und Ausgaben der Privatkategorien gemessen, also mit allen Tech-Boni und Job-Swaps (z. B. katalytische Verarbeitung: Nahrung statt Mineralien).
- Solange kein Job einer Art besetzt ist, gilt der Vanilla-Grundwert.
- Die Privatjobs kopieren jetzt die Vanilla-Jobs. Sie haben eigene Wirtschaftskategorien mit der Vanilla-Kategorie als Eltern, sodass alle Boni greifen.

### Gewinnanteil, gekoppelt an die Wirtschaftsordnung

| Ordnung | Gewinnanteil der Firmen | Ertragsmodifikator der Privatjobs | Der Staat erhält etwa |
|---|---|---|---|
| Planwirtschaft | 0 % | – | 100 % |
| Gelenkt | 15 % | ±0 % | 100 % |
| Gemischt | 20 % | −5 % | 95 % |
| Frei | 25 % | −10 % | 90 % |
| Laissez-faire | 35 % | −20 % | 80 % |

Der Modifikator ist +15 % Effizienz minus Gewinnanteil. Er steht im Tooltip der Richtlinie.

### Firmen

- **28 Varianten in 3 Stufen** (Klein, Mittelstand, Konzern): Arbeitskraft und Unterhalt ×1 / ×1,5 / ×2 auf demselben Platz.
- **Quartalsgewinn** = Wertschöpfung × Stufe × Besetzungsquote × Gewinnanteil − 0,3 pro Stufe und Monat.
  - Hälfte an die Firma, Hälfte an den Pool. Ein Konzern schüttet alles aus.
  - Verluste trägt die Firma.
- **Wachstum:** Hat die Firma genug Kapital (Stadt 150, Land 100, × Stufe) und sind mindestens 90 % ihrer Jobs besetzt, wächst sie eine Stufe.
- **Verluste:** Ist das Kapital aufgebraucht, schrumpft sie eine Stufe. Auf Stufe 1 geht sie pleite, und der Platz wird frei.
- Pro Planet gibt es höchstens eine Stufenänderung pro Quartal, mit Nachricht.
- Neue Firmen starten mit 10 Kapital und halten damit etwa 3 Jahre ohne Arbeiter durch.

### Investorenpool

- Startwert 1000.
- **Gründung:** 200 (Stadt) bzw. 120 (Land). Auf Planeten mit Arbeitslosen kostet sie die Hälfte, und diese Planeten kommen zuerst dran.
- **Aufkauf:** 600 bzw. 360.
- **Umbau:** 100 bzw. 60 × Stufe. Bezahlt die Firma, sonst der Pool.
- **Verstaatlichung:**
  - Ausgewählt wird die am wenigsten wertvolle Firma.
  - Der Staat zahlt 500/100 bzw. 300/60 × Stufe.
  - Kaufpreis und Firmenkapital gehen an den Pool.

## Konsole

| Befehl | Wirkung |
|---|---|
| `event pe.6` | Diagnose: Anteile, Pool und Quartalseinnahmen, Schattenpreise, Wertschöpfung pro Job, Hauptstadt (Plätze, Firmen, Besetzung), beste neue Firma |
| `event pe.7` | Quartal sofort ausführen (Buchhaltung, Gründung usw.; Abklingzeiten werden gelöscht) |
| `event pe.1` / `pe.2` | Stahlwerk bzw. Mischkonzern auf der Hauptstadt |
| `event pe.4` | alle Firmen und die Börse von der Hauptstadt entfernen |

## Prüfen

1. **Diagnose ohne Firmen:** Die Schattenpreise sind plausibel: Legierungen etwa 5, Mineralien 0,7 bis 1,3. Die Wertschöpfung kommt aus den Defaults, ein Metallurg etwa 3 × 5 − 6 × 1 ≈ 9.
2. **Richtlinie:** Der Tooltip zeigt bei Gemischt −5 % Ertrag für die Privatjobs. `pe.6` zeigt Gewinnanteil 20 %.
3. **Echte Messung:** Nach `pe.2` und einigen Monaten mit besetzten Jobs ändert sich die Wertschöpfung pro Job in `pe.6` gegenüber dem Default. Liegt sie bei 0 oder ist absurd, funktioniert die Kategorie-Abfrage nicht.
4. **Besetzung:** „Privatjobs besetzt“ steht zwischen 0 und 1. Steht dort 0,01 oder 100, passen die Einheiten von `free_jobs_of_type` nicht.
5. **Gewinn:** Mit `pe.7` mehrmals hintereinander steigt „+… letztes Quartal“ im Pool, sobald Firmen besetzt sind.
6. **Bioschiffe** (Biogenesis): Nahrung hat einen Schattenpreis um 1,3 statt um 0,7, auch im Überschuss.
7. **Katalytisch** (Zivik Katalytische Verarbeitung): Private Metallurgen verbrauchen Nahrung statt Mineralien.
8. **Wachstum und Pleite:** Über einige Jahre sollten Nachrichten „gewachsen“ erscheinen. Eine Firma ohne Arbeiter geht nach etwa 3 Jahren pleite.
9. **Arbeitslosigkeit:** Ein Planet mit Arbeitslosen bekommt bevorzugt und zum halben Preis eine Firma.
10. **KI:** Nach 10 bis 20 Jahren auf KI-Planeten nachsehen, ob es Firmen verschiedener Stufen gibt und kein Spam.
11. **Logs:** error.log nach `pe_`, `economic_categor`, `last_added_deposit`, `random_deposit` und `recursive depth` durchsuchen.

## Unsicher

- Ob `resource_revenue_compare` und `resource_expenses_compare` mit eigenen Kategorien messen (Punkt 3).
- Die Einheiten von `free_jobs_of_type` gegenüber `num_assigned_jobs` (Punkt 4).
- Ob `prev` in den Kapitalbuchungen richtig auflöst. Falls Pool oder Firmenkapital nie steigen, liegt es daran.
- Die Kalibrierung: Eine kleine Stadtfirma bringt beim Gewinnanteil 20 % etwa 1–2 Handel pro Monat. Nach dem Startkapital entstehen neue Firmen also langsam.
