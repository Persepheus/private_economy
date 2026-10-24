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
- `event pe.32`: `empire_size_mult = -1` (alles, Reichs-Modifikator direkt auf der Kolonie)
- `event pe.31`: alle Test-Modifikatoren wieder entfernen

## Ablauf
1. Speichern. Den Tooltip der Ausdehnung (oben, Empire Sprawl) öffnen und die Werte für Distrikte, Pops und Kolonien sowie die Gesamtzahl notieren.
2. `event pe.28`, einen Tag laufen lassen, dann den Tooltip vergleichen. Die Distrikte des Habitats sollten herausfallen.
3. `event pe.29`, einen Tag laufen lassen, vergleichen.
   - Fallen nur die Pops des Habitats heraus, ist es gut.
   - Fallen die Pops des ganzen Reichs heraus, wirkt der Modifikator reichsweit. Dann sofort `event pe.31`.
4. `event pe.30`, einen Tag laufen lassen, vergleichen. Dieselbe Frage für die Kolonie.
5. `event pe.31`, dann `event pe.32`, einen Tag laufen lassen, vergleichen.
   - Fällt nur die Ausdehnung des Habitats weg, ist es gut.
   - Sinkt die Ausdehnung des ganzen Reichs auf 0, wirkt der Modifikator reichsweit. Dann sofort `event pe.31`.
6. `event pe.31`. Ist alles wieder wie in Schritt 1?
7. Das game.log zeigt die Ausdehnung vor und nach jedem Schritt (`pe.28` bis `pe.31`). Die Engine zählt eventuell erst am nächsten Tag neu, daher zählt vor allem der Tooltip.

## Mögliche Ergebnisse
- **Alle drei wirken nur auf den Planeten:** Das Konzern-Habitat bekommt alle drei als Modifikator, die Ausdehnung ist exakt 0.
- **Nur die Distrikte wirken pro Planet:** Den Rest (Pops, Kolonie) rechnet die Mod quartalsweise aus und zieht ihn reichsweit ab. Das ist eine Annäherung.

## Ergebnis des ersten Tests
Keiner der Planeten-Modifikatoren nimmt die Ausdehnung der Kolonie heraus, auch `empire_size_mult` nicht. Daher gilt ab 0.30.1 ein **Abgleich über die Reichs-Ausdehnung** (pe_sprawl_step, quartalsweise):
- **Firmen zählen wie Distrikte:**
  - Jede Firma belegt einen Distriktplatz und bringt deshalb wie ein Distrikt 0,5 Ausdehnung.
  - Eingerechnet werden der Distrikt-Modifikator ihres Planeten (`empire_size_districts_mult`) und seine Planetare Aufstiegsstufe: −5 % je Stufe, mal `planetary_ascension_effect_mult`.
  - Im Tooltip erscheint das als „Privatfirmen (Distriktplätze)“.
- **Konzern-Habitate zählen nicht als Kolonie:**
  - Je Konzern-Habitat −20, mit `empire_size_colonies_mult` und seiner Aufstiegsstufe.
  - Im Tooltip erscheint das als „Konzern-Habitate“.
  - Die Pops des Habitats zählen weiter.
- Die Werte liest die Mod jedes Quartal aus den aktuellen Modifikatoren und setzt sie als Reichs-Modifikator mit Multiplikator.

## Test (0.30.1)
- **`event pe.35`:** Abgleich der Firmen sofort.
  - Das Log nennt die Zahl der Firmen, den Distrikt-Modifikator des Reichs und der Hauptwelt sowie die Ausdehnung vorher.
  - Am nächsten Tag im Tooltip prüfen: Steht „Privatfirmen (Distriktplätze)“ mit Firmen × 0,5 da, und entspricht das dem, was ein Distrikt auf demselben Planeten kostet?
- **`event pe.33`:** Dein erstes Habitat zählt testweise als Konzern-Habitat.
  - Am nächsten Tag im Tooltip prüfen: Steht „Konzern-Habitate“ mit −20 da (bzw. mit deinen Modifikatoren), und gleicht es den Kolonie-Anteil des Habitats genau aus?
- **`event pe.34`:** Das Habitat ist wieder normal.

### Offen
- Ob die Engine `empire_size_add` vor oder nach `empire_size_mult` anrechnet. Ohne einen solchen Modifikator in deinem Reich ist das egal.
- Ob der Wert von `empire_size_districts_mult` auf dem Planeten den des Reichs schon enthält. Das Log von pe.35 nennt beide Werte zum Vergleich.

