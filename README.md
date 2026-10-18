# Private Economy

Stellaris 4.5: Eine Richtlinie **Wirtschaftsordnung** legt fest, wie viel der Wirtschaft privaten Firmen gehört – von Planwirtschaft (unverändert) bis Laissez-faire (80 % der Distrikt-Plätze). Privatfirmen belegen Distrikt-Plätze und Gebäude, beschäftigen eigene Jobs, die der Staat nicht steuern kann, und entscheiden selbst, was sie produzieren.

Plug and play: nur neue Dateien, keine Vanilla-Datei wird überschrieben (`tools/validate.mjs` prüft das).

## Stand 0.5.0

Die Privatwirtschaft ist ein Kreislauf:

- **Schattenpreise** aus Markt und Bedarf. Investitionsgüter sättigen über das Lager, ein Defizit bringt einen starken Aufschlag.
- **Wertschöpfung, Gewinnanteil und Kapital:** Firmenkapital und Investorenpool finanzieren Wachstum, Gründung, Aufkauf und Umbau.
- **Firmen wie Distrikte:** 2 Anteile à 100 Arbeitskraft, wie ein Stadtdistrikt mit zwei Spezialisierungen. Housing pro Anteil wie eine Zone.
- **Aufbau:** Baustellen mit Vanilla-Bauzeit, eine pro Planet. Gründung nur bei freien Zivilisten (nach Neuverteilung der Jobs).
- **Aufkauf** nur, wenn die Firma mehr bringt als der ersetzte Distrikt.
- **Sektoren:** Industrie, Handel, Unterhaltung, Labore, Rohstoffe. 34 Varianten in 3 Stufen.

Testablauf: [docs/TESTS_0.5.md](docs/TESTS_0.5.md). Ältere Stände: [0.4](docs/TESTS_0.4.md), [0.3](docs/TESTS_0.3.md), [0.2](docs/TESTS_0.2.md), [0.1](docs/TESTS_0.1.md), [Prototyp](docs/PROTOTYPE_TESTS.md).

## Geplant

- **Später**: Lösung für Habitate, Ringwelten, Ökumenopolen, Arkships und Spezialplaneten.
- **Nächste Schritte**: Kalibrierung von Gewinn, Kosten und Gewichten; Firmen forschen an ihrem Sektor, Techs schalten Varianten frei; Firmennamen und Ereignisse.
- **v0.3**: Privatgebäude, Technologieabhängigkeit (Techs schalten Firmenjobs frei, Firmen subventionieren benötigte Techs), Spielerhebel (Steuern, Subventionen, Regulierung, Verstaatlichung), Firmennamen und Ereignisse.

Ziel: Die Privatwirtschaft soll gut genug entscheiden, dass sie auch KI-Reichen hilft.
