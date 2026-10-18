# Version 0.4 – Testablauf

**Neues Spiel nötig:** Firmenschlüssel, Codes und Baustellen sind neu.

## Neu

### Bauzeit
- **Baustelle zuerst:** Jede Gründung beginnt als **Private Baustelle**. Sie belegt den Platz (bei Landfirmen auch den Distrikt), hat aber keine Jobs und kein Housing.
- **Bauzeit wie Vanilla:** Stadt 16 Monate, Land 8 Monate. Aufkauf und Umstrukturierung dauern halb so lang, und die Jobs ruhen in dieser Zeit.
- **Eine Baustelle pro Planet.** Die feste Jahressperre gibt es nur noch nach einer Verstaatlichung (180 Tage) und nach einem Angebot.
- **Baustellen zählen als künftiges Angebot:** Ihre erwartete Produktion fließt schon in die Schattenpreise ein, damit kein Schweinezyklus entsteht.
- Wachstum (Stufen) bleibt sofort.

### Pops und Jobs
- **Gründung:** nur auf Planeten mit freien Zivilisten. Ausnahme ist ein **Notfall**: Eine Ressource ist im Defizit und das Lager reicht kein Jahr mehr.
- **Ohne freie Zivilisten:** Aufkauf staatlicher Distrikte, wie bisher nur bei Freier Marktwirtschaft und Laissez-faire.
- **Stufenaufstieg:** braucht jetzt auch freie Zivilisten auf dem Planeten, sonst würden Pops von anderen Jobs abgezogen.
- **Neue Pop-Zuordnung:** Nach jeder Änderung an Jobs (Eröffnung, Umbau, Aufkauf, Stufe, Pleite, Verstaatlichung) läuft `check_planet_employment`.
- **Housing:** Firmen bieten Housing wie der ersetzte Distrikt, inklusive der Tech- und Zivik-Boni.

### Neue Sektoren
- **Unterhaltung** (Stadtanteil): Private Unterhalter, kopiert vom Vanilla-Entertainer mit Annehmlichkeiten und Einheit.
  - Ihr Wert hängt vom Planeten ab: Fehlen Annehmlichkeiten, ist sie viel wert, sind sie knapp, mittel, sonst fast nichts.
  - Beispiele: reines Unterhaltungsunternehmen, Handelshaus mit Unterhaltungssparte, Mischkonzerne mit Unterhaltung.
- **Labore** (eigene Stadtklasse): Physik-, Biologie- und Ingenieurslabor sowie ein Forschungsinstitut mit allen drei.
  - Labore stellen nur in Labore um.
  - Forschung zählt als Investitionsgut mit 2,5 Handel pro Punkt, Einheit mit 1,5.
- Damit gibt es 42 Varianten × 3 Stufen.

### Bewertung
- **Handel ist Geld:** 1 bei Bedarf, ein Überschuss nur noch 0,7 (Marktgebühr).
- **Zielüberschuss je Gut:** Darüber fällt der Wert auf ein Drittel des Verkaufspreises, bei vollem Lager noch tiefer.

  | Gut | Zielüberschuss |
  |---|---|
  | Nahrung | 5 %, mit katalytischer Verarbeitung 20 %; mit Bioschiffen Investitionsgut |
  | Mineralien, Energie, Handel | 20 % |
  | Konsumgüter | 15 % |

- **Abwechslung:**
  - Jede bestehende Firma mit demselben Hauptprodukt im Reich senkt den Wert um 5 %, höchstens auf die Hälfte.
  - Unternehmergeist: Jede Entscheidung bekommt einen Zufallsfaktor zwischen 0,8 und 1,2.
  - Passende Planetenspezialisierung: +25 % (z. B. Schmiedewelt → Stahl, Forschungswelt → Labore).
  - Die letzten freien Plätze brauchen einen deutlich höheren Wert: 1 freier Platz ≥ 8, 2 freie Plätze ≥ 4.

### Sonstiges
- Arkships der Nomaden sind vorerst ausgenommen.
- Behoben: „pe_val is not set“ und die Warnung zu ungenutzten Unterhalts-Modifikatoren.

## Konsole

| Befehl | Wirkung |
|---|---|
| `event pe.6` | Diagnose, jetzt mit Einheit, Forschung, Notfall und Annehmlichkeitswert der Hauptstadt |
| `event pe.7` | Quartal sofort ausführen; Baustellen rücken dabei einen Monat vor |
| `event pe.8` | alle Baustellen sofort fertigstellen |
| `event pe.4` | alle Firmen, Baustellen und die Börse von der Hauptstadt entfernen |

## Prüfen

1. **Baustelle:** Gemischte Wirtschaft, Hauptstadt mit freiem Platz und Zivilisten, dann `pe.7`. Eine **Private Baustelle** erscheint, ohne Nachricht. Nach `pe.8` wird daraus eine Firma, mit Nachricht. Die Jobs werden sofort besetzt.
2. **Eine pro Planet:** Ein zweites `pe.7` bei laufender Baustelle startet auf diesem Planeten nichts Neues.
3. **Keine freien Zivilisten:** Hauptstadt ohne freie Zivilisten, kein Notfall, dann `pe.7`. Es entsteht keine Baustelle. Bei Freier Marktwirtschaft kommt stattdessen ein Aufkaufangebot.
4. **Housing:** Eine fertige Stadtfirma hebt das Housing des Planeten wie ein Stadtdistrikt.
5. **Unterhaltung:** Planet mit Annehmlichkeitsmangel. In `pe.6` steht +12, und die beste Firma enthält Unterhaltung.
6. **Labore:** Bei Forschungswelten oder wenig anderem Bedarf entstehen Labore. Ihre Forschung erscheint im Forschungs-Tooltip.
7. **Nahrung (KI):** Nach 10 bis 20 Jahren ohne Bioschiffe und ohne katalytische Verarbeitung gibt es kaum noch Agrarfirmen, und Nahrung bleibt knapp über 0.
8. **Abwechslung:** Nach einigen Jahren gibt es verschiedene Firmentypen und nicht siebenmal dieselbe.
9. **Handel:** Mit Handelsüberschuss liegt der Schattenpreis von Handel bei etwa 0,7, und Händler sind weniger attraktiv.
10. **Arkship-Start:** keine Firmen auf dem Arkship.
11. **Logs:** error.log nach `pe_`, `check_planet_employment`, `carrier_is_type`, `has_designation` und `free_amenities` durchsuchen.

## Unsicher

- Die Einheit von `free_amenities` (Schwellen 0 und 1000).
- Ob `planet_housing_add` in `triggered_planet_modifier` auf Deposits greift; Punkt 4 zeigt es.
- Ob die Baustellen-Deposits beim Entfernen und neuen Hinzufügen im selben Monat sauber Plätze freigeben.

## 0.4.1

- **Zivilisten statt Arbeitslose:** 4.x kennt keine Arbeitslosen mehr; jobfreie Pops arbeiten als Zivilisten. „Freie Pops“ heißt jetzt: mindestens 100 Zivilisten auf dem Planeten (`num_assigned_jobs = { job = civilian }`).
- **Behoben:** Gründungen schlugen fehl („missing args: FIRM“), deshalb wurde nur aufgekauft.
- **Behoben:** Ein angenommenes Aufkaufangebot tat seit 0.3 nichts („ownerif“).
- **Behoben:** Forscher-Jobs nutzen den gültigen Tag `research`.
- **Neu:** Die Ordnungs-Modifikatoren gelten auch für Unterhalter und Labore.
- **Validator:** prüft jetzt verklebte Schlüssel, Job-Tags und die Parameter von Scripted Effects.

## 0.4.2

- **Housing von Stadtfirmen** wie ein Stadtdistrikt mit zwei Spezialisierungen. Vanilla gibt jedem Stadtdistrikt pro Urban-Zone +200 und pro anderer Zone −200.
  - Industrie, Handel und Labore zählen als Nicht-Urban-Zonen: 600.
  - Unterhaltungsanteile zählen anteilig als Urban-Zone: Ein reines Unterhaltungsunternehmen hat 1400, „Unterhaltung, Unterhaltung, Handel“ 1133.
  - Dazu kommen wie bisher die Tech- und Zivik-Boni des Stadtdistrikts. Landfirmen sind unverändert.
