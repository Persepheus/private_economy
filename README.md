# Private Economy

Stellaris 4.5: Eine Richtlinie **Wirtschaftsordnung** legt fest, wie viel der Wirtschaft privaten Firmen gehört – von Planwirtschaft (unverändert) bis Laissez-faire (80 % der Distrikt-Plätze). Privatfirmen belegen Distrikt-Plätze und Gebäude, beschäftigen eigene Jobs, die der Staat nicht steuern kann, und entscheiden selbst, was sie produzieren.

Plug and play: nur neue Dateien, keine Vanilla-Datei wird überschrieben (`tools/validate.mjs` prüft das).

## Stand 0.4.0

Die Privatwirtschaft ist ein Kreislauf:

- **Schattenpreise** aus Markt und Bedarf, mit Zielüberschüssen je Gut.
- **Wertschöpfung pro Job:** gemessen an den echten Einnahmen.
- **Gewinnanteil:** nach Wirtschaftsordnung.
- **Kapital:** Firmenkapital und Investorenpool finanzieren Wachstum, Gründung, Aufkauf und Umbau.
- **Bauzeit:** Firmen entstehen als Baustelle mit Vanilla-Bauzeit, eine pro Planet. Gegründet wird nur, wo Pops arbeitslos sind. Firmen bieten Housing.
- **Sektoren:** Industrie, Handel, Unterhaltung (Annehmlichkeiten nach Bedarf des Planeten), Labore (Forschung) und Landwirtschaft und Rohstoffe. Das sind 42 Varianten in 3 Stufen.
- **Abwechslung:** Diversifikation, Zufall, Planetenspezialisierung und Optionswert der letzten Plätze.

Testablauf: [docs/TESTS_0.4.md](docs/TESTS_0.4.md). Ältere Stände: [0.3](docs/TESTS_0.3.md), [0.2](docs/TESTS_0.2.md), [0.1](docs/TESTS_0.1.md), [Prototyp](docs/PROTOTYPE_TESTS.md).

## Geplant

- **Später**: Lösung für Habitate, Ringwelten, Ökumenopolen, Arkships und Spezialplaneten.
- **Nächste Schritte**: Kalibrierung von Gewinn, Kosten und Gewichten; Firmen forschen an ihrem Sektor, Techs schalten Varianten frei; Firmennamen und Ereignisse.
- **v0.3**: Privatgebäude, Technologieabhängigkeit (Techs schalten Firmenjobs frei, Firmen subventionieren benötigte Techs), Spielerhebel (Steuern, Subventionen, Regulierung, Verstaatlichung), Firmennamen und Ereignisse.

Ziel: Die Privatwirtschaft soll gut genug entscheiden, dass sie auch KI-Reichen hilft.
