# Prototyp Ausdehnung (Empire Sprawl) eines Planeten – Testablauf

**Frage:** Lässt sich die Ausdehnung (Empire Sprawl) eines einzelnen Planeten, des künftigen Konzern-Habitats, auf 0 senken?

**Hintergrund:**
- Die Planetare Aufstiegsstufe senkt laut Vanilla-Defines die Ausdehnung des Planeten um 5 % je Stufe, bei höchstens 10 Stufen also −50 %. Das reicht nicht für 0.
- In den Modifikator-Listen steht nur der Distrikt-Anteil als Planeten-Modifikator (`empire_size_districts_mult`, Kategorie „Countries, Colony“). Pops und Kolonie stehen dort nur als Reichs-Modifikatoren. Ob die Engine sie trotzdem pro Planet anwendet, zeigt dieser Test.

## Konsole (Scope: dein Reich)
Ziel ist dein erstes Habitat, sonst die Hauptwelt. Die Modifikatoren erscheinen dort als „Ausdehnungs-Test: …“.
- `event pe.28`: `empire_size_districts_mult = -1` (Distrikte)
- `event pe.29`: `empire_size_pops_mult = -1` (Pops)
- `event pe.30`: `empire_size_colonies_mult = -1` (Kolonie)
- `event pe.31`: alle drei wieder entfernen

## Ablauf
1. Speichern. Den Tooltip der Ausdehnung (oben, Empire Sprawl) öffnen und die Werte für Distrikte, Pops und Kolonien sowie die Gesamtzahl notieren.
2. `event pe.28`, einen Tag laufen lassen, dann den Tooltip vergleichen. Die Distrikte des Habitats sollten herausfallen.
3. `event pe.29`, einen Tag laufen lassen, vergleichen.
   - Fallen nur die Pops des Habitats heraus, ist es gut.
   - Fallen die Pops des ganzen Reichs heraus, wirkt der Modifikator reichsweit. Dann sofort `event pe.31`.
4. `event pe.30`, einen Tag laufen lassen, vergleichen. Dieselbe Frage für die Kolonie.
5. `event pe.31`. Ist alles wieder wie in Schritt 1?
6. Das game.log zeigt die Ausdehnung vor und nach jedem Schritt (`pe.28` bis `pe.31`). Die Engine zählt eventuell erst am nächsten Tag neu, daher zählt vor allem der Tooltip.

## Mögliche Ergebnisse
- **Alle drei wirken nur auf den Planeten:** Das Konzern-Habitat bekommt alle drei als Modifikator, die Ausdehnung ist exakt 0.
- **Nur die Distrikte wirken pro Planet:** Den Rest (Pops, Kolonie) rechnet die Mod quartalsweise aus und zieht ihn reichsweit ab. Das ist eine Annäherung.
