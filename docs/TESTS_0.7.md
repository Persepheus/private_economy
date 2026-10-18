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
