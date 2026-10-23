# Prototyp Arc Furnace der Holdings – Testablauf

Ein Arc Furnace, der den **echten Private Holdings** deines Reichs gehört. Die Holdings gibt es erst mit dem ersten Konzern. Ziel des Tests: herausfinden, was ein Konzern-Ofen im System anrichtet, bevor er ins Konzernangebot kommt.

## Was Vanilla macht
- **Fertigstellung des Ofens:**
  - Der Ofen kommt über einen Lavaplaneten.
  - Eine Station über diesem Planeten wird abgebaut.
  - Danach bekommt **jeder Planet im System** ein Ofen-Vorkommen (Mineralien), wenn er
    - kein Forschungsvorkommen hat,
    - kein Stern ist,
    - nicht besiedelbar ist.
  - Dazu kommt der Modifikator „Arc Furnace“ (+25 / 50 / 75 / 100 % Stationsertrag je Stufe). Handelsvorkommen auf diesen Planeten verschwinden.
- **Die Stationen im System übernimmt er nicht.**
  - Wem eine Station gehört, dem gehört sie weiter.
  - Wer eine Station auf einem dieser Planeten hat, fördert das Ofen-Vorkommen mit und bekommt den Bonus.
  - Bei einem Konzern-Ofen würden also **auch unsere Stationen** im System profitieren.
- **Ertrag des Ofens selbst:**
  - Er erntet wie der Dyson-Schwarm das Vorkommen seines Planeten (`use_planet_resource`).
  - Dieser Ertrag geht an den Besitzer, hier die Holdings.
- **Ab Stufe III** liefert das Ofen-Vorkommen nur mit einem Overclock:
  - Mineralien, ausgewogen (Mineralien und Legierungen) oder Legierungen.
  - Mit der Obsessional Directive: Konsumgüter.
  - Der Besitzer stellt den Overclock ein. Die KI der Holdings wählt selbst, das Skript kann ihn setzen.

## Konsole (Scope: dein Reich)
- **`event pe.22`:** Ofen Stufe I für die Holdings bauen.
  - Er kommt über einen Lavaplaneten in deinem Gebiet, und zwar im System mit den meisten Planeten für das Ofen-Vorkommen.
  - Die Fertigstellung läuft wie in Vanilla ab.
  - Die Holdings bekommen 1000 Energie für den Unterhalt (20 im Monat).
  - Danach kommt der Bericht.
- **`event pe.23`:** Vanilla-Ausbau auf die nächste Stufe.
  - Die Bauzeit beträgt 3 Jahre.
  - Danach sollte Vanilla die Vorkommen selbst umstellen.
  - Das ist der eigentliche Test, ob der Ausbau für die Holdings funktioniert.
- **`event pe.24`:** Nächste Stufe sofort.
  - Der Ofen wird ersetzt und die Vorkommen umgestellt.
  - Danach kommt der Bericht.
- **`event pe.25`:** Bericht.
  - Stufe, Ausbau, Overclock.
  - Planeten mit Ofen-Vorkommen.
  - Stationen im System, getrennt nach unseren, denen der Holdings und anderen.
  - Lager, Monatseinkommen und Veränderung der Holdings seit pe.22.
  - Unser Mineral- und Legierungseinkommen.
- **`event pe.26`:** Nächster Overclock, nur ab Stufe III. Die Reihenfolge ist Mineralien → ausgewogen → Legierungen.
- **`event pe.27`:** Ofen entfernen.
  - Vorkommen und Boni verschwinden.
  - Der Planet sieht wieder aus wie ein Lavaplanet.

## Ablauf
1. Speichern. `event pe.25` zuerst ohne Ofen ausführen, das ergibt alles 0, und dein Mineraleinkommen notieren.
2. `event pe.22`.
   - Im Log steht, welcher Planet es ist und ob dort eine Station von uns abgebaut wurde.
   - Im System nachsehen:
     - Ist der Ofen sichtbar (Megastruktur der Holdings, unsere Flagge)?
     - Ist der Lavaplanet unsichtbar, wie in Vanilla?
     - Haben die anderen Planeten das Vorkommen „Arc Furnace“ und den Modifikator?
3. Einen Monat laufen lassen, dann `event pe.25`.
   - Ist unser Mineraleinkommen gestiegen (unsere Stationen im System)?
   - Was verdienen die Holdings (Ertrag des Lavaplaneten, Energie minus 20)?
4. **Stufen sofort:** `event pe.24` zweimal, dann ist Stufe III erreicht.
   - Bericht: Welcher Overclock ist voreingestellt?
   - Wie viel Mineralien oder Legierungen haben wir und die Holdings?
5. `event pe.26` ein- bis zweimal und jeweils einen Monat später `event pe.25`.
   - Schaltet der Overclock um?
   - Wechselt der Ertrag (Mineralien ↔ Legierungen)?
   - Achtung: Der Overclock-Bonus wirkt laut Vanilla nur auf Planeten und Flotten **des Besitzers**. Das Ofen-Vorkommen selbst gilt aber für jede Station.
6. `event pe.24` noch einmal ergibt Stufe IV. Gleiche Prüfung wie in Schritt 4.
7. **Vanilla-Ausbau:** `event pe.27`, dann `event pe.22`, dann `event pe.23`.
   - Bericht: Ausbau läuft = 1.
   - Nach 3 Jahren:
     - Stufe 2?
     - Vorkommen auf „Arc Furnace II“ umgestellt?
     - Kein Fehler zu cybernetics.1005 im error.log?
8. Speichern und neu laden. Bericht wie vorher?
9. `event pe.27`.
   - Ofen, Vorkommen und Modifikatoren sind weg.
   - Der Lavaplanet ist wieder sichtbar.
10. Logs (error.log, game.log) und Save hochladen, dann sehe ich mir das an.

## Offene Fragen, die der Test klären soll
- Funktioniert `spawn_megastructure` für den Ofen mit den Holdings als Besitzer?
- Funktionieren die Vanilla-Ausbau-Events für die Holdings?
- Bekommen unsere Stationen das Ofen-Vorkommen und den Bonus, obwohl uns der Ofen nicht gehört?
- Welchen Overclock wählen die Holdings selbst? Bleibt `set_overclock` bestehen?
- Kommen die Holdings mit dem Unterhalt (Energie) zurecht? Ihr Überschuss an Mineralien und Legierungen wird jährlich zum Kauf angeboten (pe.281).
