# Version 0.6 – Testablauf

**Neues Spiel nötig:** Die Firmen bestehen jetzt aus 4 Anteilen à 50, und ihre Schlüssel haben sich geändert.

## Neu

### Anteile à 50 Arbeitskraft
- **Stadtfirmen und Labore:** 200 Arbeitskraft, höchstens 150 von einem Produkt. Eine reine 200er-Variante gibt es nicht.
  - Aufteilungen: 150/50 (z. B. Stahlwerk mit Handelssparte), 100/100 (Stahl- und Handelsunternehmen), 100/50/50 (Stahlwerk mit Konsumgüter- und Handelssparte), 50/50/50/50 (Mischkonzern).
  - Labore genauso: Physiklabor mit Biologiesparte, Physik- und Ingenieurslabor usw.
- **Landfirmen:** 200 der eigenen Ressource, oder 150 plus 50 Sparte.
- 61 Varianten × 3 Stufen.
- **Housing:** pro 100 Arbeitskraft wie eine Zone. Unterhaltung +200, alles andere −200.
- **Abnehmender Wert** wiederholter 50er-Anteile: 1 / 0,9 / 0,8. Mischungen gewinnen, wenn Ressourcen ähnlich gebraucht werden.

### Defizit-Sperre
- Ist eine Ressource im Defizit (künftige Produktion von Baustellen eingerechnet), werden **keine Firmen gegründet oder umgebaut, die sie verbrauchen.**
  - Beispiele: Mineralien im Minus → keine Stahl- oder Konsumgütersparten. Konsumgüter im Minus → keine Händler und Labore.
  - Mit katalytischer Verarbeitung gilt das für Nahrung statt Mineralien.
- **Bestehende Firmen** mit solchem Verbrauch zählen als wertlos. Sie werden zuerst umgebaut (bei Platz auch in eine Mine) und bei einer Verstaatlichung zuerst zurückgekauft.
- **Umbau** ist jetzt immer möglich, wenn auf dem Planeten in diesem Quartal nichts anderes begonnen wurde. Bisher ging das nur bei vollem Planeten oder erreichtem Ziel.

### Zufall
- **Bisher wirkungslos:** Der Zufallsfaktor (0,8–1,2) bei der Firmenwahl hatte keine Wirkung, weil die Engine innerhalb eines Tages denselben Wert liefert. Bei Gleichstand gewann so immer die erste Variante der Liste, z. B. „Physik mit Biologie“, nie Ingenieure.
- **Jetzt:** Eine kleine Pseudo-Zufallsfolge liefert für jeden Kandidaten einen anderen Faktor.

### Behoben
- „Variable pe_after is not set“ beim Aufkauf des letzten Distrikts eines Typs.

## Konsole

| Befehl | Wirkung |
|---|---|
| `event pe.1` | Stahlwerk mit Handelssparte auf der Hauptstadt |
| `event pe.2` | Physiklabor mit Biologiesparte auf der Hauptstadt |
| `event pe.6` / `pe.7` / `pe.8` | Diagnose / Quartal sofort / Baustellen fertig |

## Prüfen

1. **Jobs:** Nach `pe.1` und `pe.8` hat die Firma 150 Metallurgen und 50 Händler. Housing: Grundwert eines Stadtdistrikts (1000) minus 400.
2. **Mineralien im Minus:** Es werden keine Firmen mit Stahl- oder Konsumgüteranteil mehr gegründet. Bestehende Stahlwerke werden nach und nach umgebaut, bei freiem Bergbauplatz zur Mine.
3. **Abwechslung:** Labore aller drei Richtungen kommen vor, ebenso verschiedene Mischungen.
4. **Stufen:** Firmen wachsen weiterhin unabhängig von Neugründungen (Firmenkapital gegenüber Investorenpool).
5. **Logs:** error.log nach `pe_`, `modulo_variable` und `pe_ok_` durchsuchen.
