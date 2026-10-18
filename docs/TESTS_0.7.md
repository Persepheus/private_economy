# Version 0.7 – Testablauf

Ein laufendes 0.6-Spiel kann weiterlaufen. Bestehende Firmen haben einfach keine Schulden.

## Neu: Woher das Kapital kommt

### Private Ersparnisse
Jedes Quartal fließt ein Anteil deines **Brutto-Handelseinkommens** aus deinem Lager in den Investorenpool, sofern das Lager ihn decken kann:

| Ordnung | Ersparnisquote |
|---|---|
| Planwirtschaft | 0 % |
| Gelenkt | 5 % |
| Gemischt | 10 % |
| Frei | 15 % |
| Laissez-faire | 20 % |

Mehr Markt kostet dich also Handel und bringt dafür schnelleres privates Wachstum. Die Ersparnis wächst mit deinem Reich: früh langsam, später schneller.

### Kredit
- **Gründung und Aufkauf** zahlt der Pool nur zu **40 %** an: Stadt 200 statt 500, Land 120 statt 300, Aufkauf 240 bzw. 144. Den Rest schuldet die Firma.
- Beim Aufkauf bekommst du weiterhin den vollen Preis.
- **Rückzahlung:** Eine Firma mit Schulden zahlt ihren **ganzen Gewinn** zurück. Bis sie schuldenfrei ist, schüttet sie nichts aus und wächst nicht.
- **Pleite:** Macht sie Verluste, sinkt ihr Kapital, und es droht die Pleite. Die Restschuld verfällt dann.
- **Bei Umbau und Stufenwechsel** bleiben die Schulden erhalten.
- **Bei Verstaatlichung** bekommen die Investoren den Kaufpreis plus Firmenkapital minus Restschuld.

### Richtwert
Früh (ein Planet, Gemischt, etwa 40 Handel brutto im Monat) kommen über Ersparnisse rund 50 pro Jahr in den Pool. Eine Stadtfirma (200 Anzahlung) entsteht damit etwa alle 3–4 Jahre, eine Landfirma (120) etwa alle 2–3 Jahre. Mit mehr Handel geht es schneller.

## Prüfen
1. `pe.6` zeigt beim Pool „davon … private Ersparnisse“. Dein Handelslager sinkt pro Quartal um genau diesen Betrag.
2. Bei Planwirtschaft sind die Ersparnisse 0.
3. Nach einer Gründung sinkt der Pool nur um die Anzahlung (200 bzw. 120).
4. Eine neue Firma schüttet erst nach Jahren aus. Der Pool wächst bis dahin vor allem aus Ersparnissen.
5. Logs: error.log nach `pe_`, `pe_debt` und `add_resource` durchsuchen.

## 0.7.1 – Korrekturen nach dem Test

- **Dauernotfall behoben:** Forschung hat kein Lager. Die Defizitlogik meldete deshalb ständig „Lager reicht kein Jahr“, also einen Notfall, und Forschung kostete 10,5 statt 3,5. Forschung (3,5) und Einheit (2) haben jetzt feste Werte. Der Notfall hatte Gründungen ohne Arbeiter erlaubt, etwa die Farm und das Kraftwerk auf dem zweiten Planeten.
- **Gründung:** nur noch mit freien Zivilisten **und** wenn die Privatjobs des Planeten zu mindestens 80 % besetzt sind. Keine Notfall-Ausnahme mehr.
- **Defizit-Sperre:** gilt nur noch für neue Firmen und Umbau-Ziele. Bisher bekamen auch gesunde bestehende Firmen den Wert −1000, etwa alle Labore bei Konsumgüter-Defizit. Das war die Ursache der Umbau-Welle.
- **Umbau:**
  - Nur aus eigenem Firmenkapital, nie auf Kredit oder aus dem Pool. Firmen mit Schulden bauen nicht um.
  - Das Ziel muss mindestens 30 % besser sein (mindestens +3).
  - Nur wenn die Privatjobs des Planeten zu mindestens 80 % besetzt sind.
  - Danach 2 Jahre Pause auf diesem Planeten.
- **Aufkauf:** nie den letzten Distrikt eines Typs, sonst gingen dessen Gebäude verloren.
- **Annehmlichkeiten:** Bei Mangel ist ein Unterhalter-Job 30 wert (vorher 12), bei knappen Annehmlichkeiten 8 (vorher 4).

**Prüfen:**
1. `pe.6` zeigt Forschung 3,5 und Notfall 0.
2. Auf einem Planeten mit Arbeitermangel entstehen keine Gründungen und keine Umbauten.
3. Auf der Hauptwelt mit Annehmlichkeiten im Minus enthalten neue Firmen Unterhaltung.
4. Es gibt deutlich weniger Umbauten, und jeder ist ein klarer Gewinn.
