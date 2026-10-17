# Private Economy

Stellaris 4.5: Eine Richtlinie **Wirtschaftsordnung** legt fest, wie viel der Wirtschaft privaten Firmen gehört – von Planwirtschaft (unverändert) bis Laissez-faire (80 % der Distrikt-Plätze). Privatfirmen belegen Distrikt-Plätze und Gebäude, beschäftigen eigene Jobs, die der Staat nicht steuern kann, und entscheiden selbst, was sie produzieren.

Plug and play: nur neue Dateien, keine Vanilla-Datei wird überschrieben (`tools/validate.mjs` prüft das).

## Stand 0.0.1 – Prototyp

Richtlinie, zwei Firmen-Deposits, drei Privatjobs, ein Privatgebäude und Konsolen-Testereignisse. Noch keine automatische Privatwirtschaft. Testablauf: [docs/PROTOTYPE_TESTS.md](docs/PROTOTYPE_TESTS.md).

## Geplant

- **v0.1**: Privatanteil je Planet nach Richtlinie; Firmen entstehen automatisch im knappsten Sektor.
- **v0.2**: Kapital, Gewinn und Steuern; Pleiten; Aufkauf staatlicher Distrikte (vor allem Richtung Laissez-faire); mehr Sektoren und gemischte Firmen.
- **v0.3**: Privatgebäude, Technologieabhängigkeit (Techs schalten Firmenjobs frei, Firmen subventionieren benötigte Techs), Spielerhebel (Steuern, Subventionen, Regulierung, Verstaatlichung), Firmennamen und Ereignisse.

Ziel: Die Privatwirtschaft soll gut genug entscheiden, dass sie auch KI-Reichen hilft.
