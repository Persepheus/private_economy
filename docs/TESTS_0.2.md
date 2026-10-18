# Version 0.2 – Testablauf

**Neues Spiel nötig:** Die Firmen aus 0.1 (Stahlwerk, Mischkonzern usw.) gibt es unter diesen Schlüsseln nicht mehr.

## Neu

### Firmenvarianten (28, erzeugt von `tools/generate-firms.mjs`)

Jede Firma hat 3 Anteile.

- **Stadtfirmen** (ein Distriktplatz): beliebige Mischung aus Legierungen, Konsumgütern und Handel, je 40 Arbeitskraft. Das ergibt 10 Varianten, z. B. Privates Stahlwerk, Stahlwerk mit Handelssparte, Privater Mischkonzern.
- **Landfirmen** (ein Platz plus ein Distrikt ihres Typs): 2 Anteile der Hauptressource (je 80), der dritte Anteil ist frei. Das ergibt 18 Varianten, z. B. Private Mine mit Stahlsparte. Eine ländliche Nebensparte braucht den passenden Distrikttyp auf dem Planeten.
- **Unterhalt:** Energie wie der entsprechende Distrikt (Stadt 2, Land 1).

### Bewertung

Dringlichkeit je Ressource:

| Lage | Punkte |
|---|---|
| Defizit | 50 + Defizit in % der Produktion; +30, wenn das Lager keine 12 Monate reicht |
| Überschuss | 25 − 0,75 × Überschuss in %. Ein kleiner Überschuss lohnt also noch, bei 33 % Überschuss ist der Wert 0. |
| Lager ≥ 90 % voll | −50 (nicht für Legierungen) |
| Legierungen | +40, werden immer gebraucht |
| Marktpreis | +1 je 1 % über dem ersten gesehenen Preis |

Wert einer Variante = Summe ihrer Anteile, mit abnehmendem Ertrag: erster Anteil einer Ressource ×1, zweiter ×0,75, dritter ×0,5. Gegründet wird nur, wenn der Wert über 0 liegt.

### Privatkapital

- Startwert: 1000.
- Einnahmen: Jeder Privatjob zahlt 0,5 Energie Unterhalt pro Monat als Gewinn, der ins Kapital fließt.
- Ausgaben:
  - Gründung: 500 (Stadt) bzw. 300 (Land).
  - Aufkauf: 600 bzw. 360. Das Reich erhält 500/300 Mineralien und 100/60 Handel.
  - Umbau: 250 bzw. 150.
- Verstaatlichung zahlt den Kaufpreis ins Kapital zurück.

### Umbau

Ist kein Platz frei oder das Firmenziel erreicht, und gab es dieses Jahr auf dem Planeten noch keine Aktion, wechselt die Firma mit dem größten Vorteil zur besten Variante ihrer Klasse:
- Die Klasse bleibt gleich: Stadt bleibt Stadt, Mine bleibt Mine.
- Der Vorteil muss mindestens 40 Punkte betragen.
- Das Kapital muss den Umbau decken.

## Konsole

| Befehl | Wirkung |
|---|---|
| `event pe.6` | Diagnose: Privatanteil, Kapital und Quartalsgewinn, Dringlichkeit, Zahlen der Hauptstadt, beste Firma mit Wert |
| `event pe.7` | Quartalslogik sofort ausführen (ohne Abklingzeiten). Achtung: bucht auch den Quartalsgewinn. |
| `event pe.1` / `pe.2` | Privates Stahlwerk bzw. Mischkonzern auf der Hauptstadt |
| `event pe.4` | alle Firmen und die Börse von der Hauptstadt entfernen |

## Prüfen

1. **Diagnose:** Kapital 1000, Gewinn 0. Legierungen liegen deutlich über den anderen Ressourcen. Die beste Firma hat einen lesbaren Namen.
2. **Mischung:** Zwei Ressourcen ähnlich dringend machen, z. B. Konsumgüter-Defizit bei hohem Legierungsbedarf. Die beste Firma sollte eine Mischung sein (Stahlwerk mit Konsumgütersparte). Bei einer klar dominierenden Ressource sollte es eine reine Firma sein.
3. **Kosten:** Nach einer Gründung sinkt das Kapital um 500 bzw. 300. Mit wenig Kapital entsteht nichts. Der Firmen-Unterhalt erscheint im Energie-Tooltip.
4. **Gewinn:** Sobald Privatjobs besetzt sind, zeigt `pe.6` einen Quartalsgewinn. Bei 1 Firma mit 120 Arbeitskraft etwa 1,8 pro Quartal.
5. **Aufkauf:** Freie Marktwirtschaft, volle Hauptstadt. Das Angebot nennt Firma und Distrikt. Annehmen kostet 600 Kapital.
6. **Umbau:** Volle Hauptstadt mit einer Firma, dann die Dringlichkeit stark verschieben (z. B. großes Nahrungsdefizit bei einer Mine mit Stahlsparte und Landwirtschaftsdistrikten auf dem Planeten), dann `pe.7`. Erwartet: Nachricht „umstrukturiert“ und die neue Variante.
7. **KI:** Nach einigen Jahren entstehen weniger und vielfältigere Firmen als in 0.1, begrenzt durch das Kapital.
8. **Logs:** error.log nach `pe_`, `defined_text`, `scripted_loc` und `recursive depth` durchsuchen.

## Zum späteren Review

- Kapitalwachstum: Bei 0,5 Energie pro Job bringt eine voll besetzte Stadtfirma etwa 7 pro Jahr. Nach dem Startkapital wächst die Privatwirtschaft daher sehr langsam.
- Legierungsbonus +40: Bei freien Plätzen gewinnen fast immer Stahlwerke.
