# Private Economy

Stellaris 4.5: Eine Richtlinie **Wirtschaftsordnung** legt fest, wie viel der Wirtschaft privaten Firmen gehört – von Planwirtschaft (unverändert) bis Laissez-faire (80 % der Distrikt-Plätze). Privatfirmen belegen Distrikt-Plätze und Gebäude, beschäftigen eigene Jobs, die der Staat nicht steuern kann, und entscheiden selbst, was sie produzieren.

Plug and play: nur neue Dateien, keine Vanilla-Datei wird überschrieben (`tools/validate.mjs` prüft das).

## Stand 0.6.0

Die Privatwirtschaft ist ein Kreislauf:

- **Schattenpreise** aus Markt und Bedarf.
- **Wertschöpfung, Gewinnanteil und Kapital.**
- **Firmen** aus 4 Anteilen à 50 Arbeitskraft:
  - Stadt höchstens 150 pro Produkt.
  - Land 200, oder 150 plus 50 Sparte.
- **Defizit-Sperre:** Keine Firmen, die eine Ressource im Defizit verbrauchen. Bestehende werden zuerst umgebaut, auch über Klassengrenzen.
- **Kosten** wie für den Staat.
- **Abwechslung** durch Pseudo-Zufall, Diversifikation und Spezialisierung.

Testablauf: [docs/TESTS_0.6.md](docs/TESTS_0.6.md). Ältere Stände: [0.5](docs/TESTS_0.5.md), [0.4](docs/TESTS_0.4.md), [0.3](docs/TESTS_0.3.md), [0.2](docs/TESTS_0.2.md), [0.1](docs/TESTS_0.1.md), [Prototyp](docs/PROTOTYPE_TESTS.md).

## Geplant

- **Später**: Lösung für Habitate, Ringwelten, Ökumenopolen, Arkships und Spezialplaneten.
- **Nächste Schritte**: Kalibrierung von Gewinn, Kosten und Gewichten; Firmen forschen an ihrem Sektor, Techs schalten Varianten frei; Firmennamen und Ereignisse.
- **v0.3**: Privatgebäude, Technologieabhängigkeit (Techs schalten Firmenjobs frei, Firmen subventionieren benötigte Techs), Spielerhebel (Steuern, Subventionen, Regulierung, Verstaatlichung), Firmennamen und Ereignisse.

Ziel: Die Privatwirtschaft soll gut genug entscheiden, dass sie auch KI-Reichen hilft.
