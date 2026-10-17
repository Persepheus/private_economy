# Private Economy

Stellaris 4.5: Eine Richtlinie **Wirtschaftsordnung** legt fest, wie viel der Wirtschaft privaten Firmen gehört – von Planwirtschaft (unverändert) bis Laissez-faire (80 % der Distrikt-Plätze). Privatfirmen belegen Distrikt-Plätze und Gebäude, beschäftigen eigene Jobs, die der Staat nicht steuern kann, und entscheiden selbst, was sie produzieren.

Plug and play: nur neue Dateien, keine Vanilla-Datei wird überschrieben (`tools/validate.mjs` prüft das).

## Stand 0.1.0

Die Privatwirtschaft läuft automatisch, jedes Quartal pro Reich. Firmen gründen sich auf freien Distrikt-Plätzen im dringendsten Sektor. Dringlichkeit ergibt sich aus Netto-Zuwachs, Lagerreichweite, vollem Lager und Marktpreis. Mine, Kraftwerk und Agrarbetrieb brauchen passende Vorkommen. Ab Freier Marktwirtschaft kaufen Firmen staatliche Distrikte auf: Spieler bekommen ein Angebot, die KI und Laissez-faire kaufen automatisch. Sinkt die Richtlinie, verstaatlicht der Staat überzählige Firmen zum gleichen Preis. Sieben Firmentypen, sechs Privatjobs. Testablauf: [docs/TESTS_0.1.md](docs/TESTS_0.1.md), Prototyp: [docs/PROTOTYPE_TESTS.md](docs/PROTOTYPE_TESTS.md).

## Geplant

- **Später**: Lösung für Habitate, Ringwelten, Ökumenopolen und Spezialplaneten.
- **v0.2**: Kapital, Gewinn und Steuern; Pleiten; mehr Sektoren und gemischte Firmen.
- **v0.3**: Privatgebäude, Technologieabhängigkeit (Techs schalten Firmenjobs frei, Firmen subventionieren benötigte Techs), Spielerhebel (Steuern, Subventionen, Regulierung, Verstaatlichung), Firmennamen und Ereignisse.

Ziel: Die Privatwirtschaft soll gut genug entscheiden, dass sie auch KI-Reichen hilft.
