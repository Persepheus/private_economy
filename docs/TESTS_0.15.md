# Version 0.15 – Testablauf

Ein laufendes Spiel kann weiterlaufen.

## Werte
- **Freie Pops für Gründung und Wachstum:** Zivilisten **minus offene Jobs** auf dem Planeten, mindestens **50**. Bisher genügte 1 Zivilist, auch wenn noch Jobs frei waren, die er zuerst genommen hätte.
- **Für die Firmen 50 % teurer:**

  | | vorher | jetzt |
  |---|---|---|
  | Umbau | 250 / 150 × Stufengröße | 375 / 225 × Stufengröße |
  | Wachstumsstufe | 250 / 150 | 375 / 225 |
  | Aufkauf, Preis an den Staat | 500 + 100 / 300 + 60 | 750 + 150 / 450 + 90 |

  Die Verstaatlichung kostet entsprechend mehr.
- **Dafür 50 % mehr Kapital:**
  - Die Rücklage der Firmen wächst mit (sie richtet sich nach Umbau- und Wachstumskosten).
  - Die Ersparnisse stoppen erst ab **4500** im Pool (vorher 3000).
  - Mäzen-Events ab 4500, Arbeitskräfte-Events ab 1500.
- Die Gründung kostet weiterhin genau so viel wie ein Distrikt für dich.

## Korrekturen
- **Umbau wie Umzug:** Eine Firma, deren Hauptprodukt zur Spezialisierung ihres Planeten passt, baut nur in eine Variante um, die ebenfalls passt.
- **Verstaatlichung:** Der Stadtdistrikt konnte nicht gebaut werden („Failed to add district“ im error.log), weil der Platz der Firma im selben Moment noch belegt war. Jetzt mit `ignore_cap`.
- **Private Kolonisten:** Die Kolonie entsteht jetzt wie bei Vanilla (`species = root`). Vorher war die Spezies-Referenz ungültig.
- **Prototyp:** Das Ergebnis nennt die Forschungspunkte bzw. den Schaden.
- **Kunst:** „Lasst die Kunst frei.“
- **Feindliche Übernahme:**
  - Nur die kleinste Firma des Planeten wird geschluckt, und zwar von einer mindestens gleich großen.
  - Der Tooltip ist Klartext.
  - Behoben: „pe_to_fcap is not set“.
- **Klartext-Tooltips** statt Variablen: Prospektion, Aktien, Anleihen, Monopol, Abschied, Rally, Streik, Sonderschichten.

## Prüfen
1. Planet mit 60 Zivilisten und 30 offenen Jobs: keine Gründung (30 < 50). Mit 100 Zivilisten und 30 offenen Jobs: Gründung möglich.
2. Ein Stahlwerk auf einer Schmiedewelt baut nicht in ein Labor um.
3. Verstaatlichung eines Stadtfirmen-Platzes: Der Stadtdistrikt erscheint.
4. `pe.10` bis zu den Kolonisten: Die Kolonie entsteht.
5. Logs: keine „Failed to add district“- oder „pe_to_fcap“-Meldungen mehr.
