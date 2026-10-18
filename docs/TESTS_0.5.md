# Version 0.5 – Testablauf

**Neues Spiel nötig:** Die Firmen haben jetzt 2 Anteile, und ihre Schlüssel haben sich geändert.

## Neu

### Firmen wie Distrikte mit zwei Spezialisierungen
- **2 Anteile à 100 Arbeitskraft:** Ein Stadtdistrikt hat zwei Spezialisierungen, jede gibt 100 Jobs pro Distrikt. Ein Landdistrikt gibt 200.
  - Stadt: Kombinationen aus Stahl, Konsumgütern, Handel und Unterhaltung, z. B. „Stahlwerk mit Handelssparte“.
  - Labore: Physik, Biologie, Ingenieurwesen, rein oder gemischt.
  - Land: Hauptressource ×2 oder Hauptressource plus eine Sparte.
  - Zusammen 34 Varianten × 3 Stufen.
- **Housing pro Anteil wie eine Zone:** Unterhaltung +200, alles andere −200, ausgehend vom Grundwert eines Stadtdistrikts (1000).
  - Industrie, Handel und Labore: 600
  - Industrie mit Unterhaltung: 1000
  - reines Unterhaltungsunternehmen: 1400
- **Umbau zwischen Stadtfirmen und Laboren:** Stadtfirmen und Labore können ineinander umgebaut werden, z. B. Stahlwerk zu Labor, wenn Mineralien knapp sind.

### Bewertung
- **Legierungen sättigen über das Lager:**
  - Bis zu einem Viertel des Lagerlimits gilt der Kaufpreis.
  - Bis drei Viertel sinkt der Wert auf den Verkaufspreis.
  - Ab 95 % ist es ein Drittel davon.
  - Bei Bioschiffen gilt dasselbe für Nahrung.
- **Forschung 3,5** pro Punkt (vorher 2,5), **Einheit 2** (vorher 1,5).
- **Stärkerer Defizit-Aufschlag:**
  - Jedes Defizit +25 %.
  - Pro 1 % fehlender Produktion +4 %, zusammen höchstens +200 %.
  - Reicht das Lager kein Jahr: +50 %, und es gilt als Notfall.
  - Mineralien im Minus machen Stahlwerke damit schnell unrentabel.

### Aufkauf
- **Nur bei echtem Mehrwert:** Die neue Firma muss deutlich mehr wert sein als der Distrikt, den sie ersetzt.
  - Der Wert eines Stadtdistrikts ergibt sich aus den Spezialisierungen des Planeten.
  - Ein Landdistrikt zählt 2 Jobs seines Typs.
  - Eine staatliche Mine wird also nicht mehr gekauft, nur um eine private Mine daraus zu machen.
- **Behoben:** Der verkaufte Distrikt blieb manchmal stehen. Jetzt wird geprüft, ob er wirklich weg ist; sonst passiert gar nichts, auch keine Zahlung.
- **Behoben:** Ein offenes Angebot konnte von einem neuen überschrieben werden, wodurch eine andere Firma gebaut wurde. Bis du antwortest, kommt kein neues Angebot.

### Pops und Kolonien
- **Jobs zuerst neu verteilen:** Vor jeder Entscheidung läuft `check_planet_employment`. Zivilisten, die nur noch nicht verteilt waren, lösen keine Gründung mehr aus.
- **Kolonien im Aufbau:** Keine Firmen auf Kolonien, die noch kolonisiert werden oder jünger als 6 Monate sind.

## Konsole

| Befehl | Wirkung |
|---|---|
| `event pe.1` | Privates Stahlwerk auf der Hauptstadt |
| `event pe.2` | Privates Physiklabor auf der Hauptstadt |
| `event pe.6` | Diagnose |
| `event pe.7` | Quartal sofort |
| `event pe.8` | Baustellen sofort fertig |

## Prüfen

1. **Jobzahlen:** Nach `pe.2` und `pe.8` hat das Physiklabor 200 Private Physiker. Housing +600 plus Tech-Boni.
2. **Legierungen:** Mit großem Legierungslager (über drei Viertel des Limits) zeigt `pe.6` für Legierungen etwa den Verkaufspreis (~2,8), nicht mehr 5,36.
3. **Mineralien im Minus:** Der Schattenpreis der Mineralien steigt deutlich, die Wertschöpfung der Metallurgen fällt. Bestehende Stahlwerke werden mit der Zeit zu Laboren oder anderem umgebaut.
4. **Kein Unsinns-Aufkauf:** Bei knappen Mineralien keine Angebote mehr, eine Mine in eine Mine mit Stahlsparte zu verwandeln oder einen Stadtdistrikt für ein Stahlwerk zu kaufen.
5. **Angebot annehmen:** Der Distrikt verschwindet, die Baustelle erscheint, und nach Fertigstellung ist es genau die angebotene Firma.
6. **Neue Kolonie:** Beim Kolonisieren entsteht keine Firma.
7. **Abwechslung:** Labore entstehen neben Industrie, besonders mit vollem Legierungslager.
8. **Logs:** error.log nach `pe_`, `num_zones`, `is_under_colonization` und `check_planet_employment` durchsuchen.

## 0.5.1 – Werte

Die Privatwirtschaft zahlt jetzt, was ein Distrikt dich kostet. Dadurch wird alles deutlich langsamer.

| | vorher | jetzt |
|---|---|---|
| Startkapital Investorenpool | 1000 | **500** |
| Gründung Stadt / Land | 200 / 120, halber Preis bei freien Zivilisten | **500 / 300**, kein Rabatt |
| Stufenaufstieg (+100 Arbeitskraft, ein halber Distrikt) | 150 / 100 × Stufe | **250 / 150** |
| Umbau | 100 / 60 × Stufe | **250 / 150 × Stufengröße** (1 / 1,5 / 2) |

Planeten mit freien Zivilisten kommen weiterhin zuerst dran.

**Umbau über Klassengrenzen:**
- Jede Firma kann in die beste Variante wechseln, die auf dem Planeten möglich ist, also auch ein Stahlwerk in eine Mine.
- Für eine Landfirma muss nach dem Abbau der alten Firma ein Distrikt ihres Typs frei sein.
- Ist das nicht der Fall, wird die alte Firma wiederhergestellt und die Kosten erstattet. Dieser Landtyp wird auf dem Planeten dann ein Jahr nicht mehr versucht.

**Aufkauf:** Eine Mine mit Stahlsparte statt einer staatlichen Mine ist erlaubt, wenn sie mehr wert ist. Bei genug Mineralien ist das der Fall.

Ein laufendes 0.5-Spiel kann weiterlaufen. Das Startkapital gilt nur für Reiche, die noch keins haben.

**Prüfen:**
1. Hauptstadt voller Stahlwerke, Mineralien im Minus, noch Platz für Bergbaudistrikte: Ein Stahlwerk wird über eine Baustelle zur Mine. Mit `pe.7` und `pe.8` lässt sich das beschleunigen.
2. Wie oben, aber ohne freien Bergbauplatz: Das Stahlwerk bleibt, ohne Kosten und ohne Fehler im error.log.
