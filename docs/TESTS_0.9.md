# Version 0.9 – Testablauf

**Neues Spiel nötig:** Es gibt neue Firmenvarianten.

## Neu: Legierungen, Forschung und Einheit im Gleichgewicht

### Einheit als Sektor
- Neuer Job **Private Medienschaffende**, kopiert vom Vanilla-Bürokraten: 3 Einheit für 2 Konsumgüter.
- Er gehört zur **Laborklasse**, wie die Vanilla-Zone „Forschung und Einheit“. Beispiele: Privates Medienhaus, Physiklabor mit Mediensparte, Physik- und Medieninstitut, Forschungs- und Medieninstitut. Damit gibt es 80 Varianten × 3 Stufen.
- Bürokratische Zentren (Spezialisierung) bevorzugen Medienhäuser.
- Beim Wert eines Stadtdistrikts (Aufkauf) zählen Einheitszonen jetzt als Bürokraten-Jobs.

### Faire Grundwerte
- **Legierungen** gehen von ihrem Grundwert 4 aus, nicht mehr vom Marktkaufpreis mit Gebühr (5,36). Mit Bioschiffen gilt das ebenso für Nahrung (1).
- **Forschung** bleibt bei 3,5 pro Punkt.
- **Einheit:** 3 statt 2.

### Investitions-Dreieck
Legierungen, Forschung und Einheit haben einen Zielanteil am Investitions-Output des Reichs (bewertet mit 4 / 3,5 / 3 pro Einheit):

| | Legierungen | Forschung | Einheit |
|---|---|---|---|
| Grundziel | 35 % | 45 % | 20 % |
| Militarist / im Krieg (je) | +10 | −5 | −5 |
| Pazifist | −10 | +5 | +5 |
| Materialist | −5 | +10 | −5 |
| Spiritualist | −5 | −5 | +10 |

- Mindestens 10 % pro Gut.
- **Ausgleich:** Liegt ein Gut unter seinem Ziel, steigt sein Wert, darüber sinkt er.
  - Faktor = 0,5 + 0,5 × Ziel / Ist, zwischen 0,5 und 2.
  - Beispiel: Einheit bei 10 % statt 20 % → ×1,5. Legierungen bei 60 % statt 35 % → ×0,8.

## Prüfen
1. `pe.6` zeigt den Abschnitt „Investitionsmix“ mit Anteil, Ziel und Faktor. Die Anteile ergeben zusammen 100 %.
2. Ohne Einheitsproduktion steht ihr Faktor bei 2, und es entstehen Medienhäuser oder Mediensparten.
3. Über die Jahre nähern sich die Anteile den Zielen. Legierungen stellen nicht mehr den Großteil der Firmen.
4. Ein Militarist baut mehr Stahl, ein Materialist mehr Labore, ein Spiritualist mehr Medien.
5. Logs: error.log nach `pe_tri`, `bureaucrat` und `is_militarist` durchsuchen.
