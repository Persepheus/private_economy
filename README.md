# Private Economy

Stellaris 4.5: Eine Richtlinie **Wirtschaftsordnung** legt fest, wie viel der Wirtschaft privaten Firmen gehört – von Planwirtschaft (unverändert) bis Laissez-faire (80 % der Distrikt-Plätze). Privatfirmen belegen Distrikt-Plätze und Gebäude, beschäftigen eigene Jobs, die der Staat nicht steuern kann, und entscheiden selbst, was sie produzieren.

Plug and play: nur neue Dateien, keine Vanilla-Datei wird überschrieben (`tools/validate.mjs` prüft das).

## Stand 0.2.0

Die Privatwirtschaft läuft automatisch, jedes Quartal pro Reich.

- **Firmen:** 28 Varianten aus je 3 Anteilen, nämlich Stadtfirmen aus Legierungen, Konsumgütern und Handel sowie Landfirmen mit Nebensparte. Ein Generator erzeugt sie: `tools/generate-firms.mjs`.
- **Bewertung:** Mischungen und reine Firmen werden nach denselben Dringlichkeitsregeln bewertet, mit abnehmendem Ertrag wiederholter Anteile.
- **Kosten:** Gründung, Aufkauf und Umbau zahlt ein Privatkapital. Es speist sich aus dem Gewinn der Privatjobs (Energie-Unterhalt). Firmen haben Unterhalt wie Distrikte.
- **Volle Planeten:** Firmen strukturieren um.
- **Aufkauf und Verstaatlichung:** wie in 0.1.

Testablauf: [docs/TESTS_0.2.md](docs/TESTS_0.2.md). Ältere Stände: [docs/TESTS_0.1.md](docs/TESTS_0.1.md), [docs/PROTOTYPE_TESTS.md](docs/PROTOTYPE_TESTS.md).

## Geplant

- **Später**: Lösung für Habitate, Ringwelten, Ökumenopolen und Spezialplaneten.
- **Nächste Schritte**: Review von Kapitalwachstum und Gewichten; Steuern als Hebel auf den Gewinn; Pleiten; Forschung und Einheit als Sektoren.
- **v0.3**: Privatgebäude, Technologieabhängigkeit (Techs schalten Firmenjobs frei, Firmen subventionieren benötigte Techs), Spielerhebel (Steuern, Subventionen, Regulierung, Verstaatlichung), Firmennamen und Ereignisse.

Ziel: Die Privatwirtschaft soll gut genug entscheiden, dass sie auch KI-Reichen hilft.
