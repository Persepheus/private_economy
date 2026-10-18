# Private Economy

Stellaris 4.5: Eine Richtlinie **Wirtschaftsordnung** legt fest, wie viel der Wirtschaft privaten Firmen gehört – von Planwirtschaft (unverändert) bis Laissez-faire (80 % der Distrikt-Plätze). Privatfirmen belegen Distrikt-Plätze und Gebäude, beschäftigen eigene Jobs, die der Staat nicht steuern kann, und entscheiden selbst, was sie produzieren.

Plug and play: nur neue Dateien, keine Vanilla-Datei wird überschrieben (`tools/validate.mjs` prüft das).

## Stand 0.3.0

Die Privatwirtschaft ist ein Kreislauf:

- **Schattenpreise** aus Markt und Bedarf. Investitionsgüter sind Legierungen und bei Bioschiffen auch Nahrung.
- **Wertschöpfung pro Job:** gemessen an den echten Einnahmen der Privatkategorien.
- **Gewinnanteil:** gekoppelt an die Wirtschaftsordnung und echt vom Privat-Output abgezogen.
- **Firmen:**
  - Sie haben eigenes Kapital und wachsen in 3 Stufen, schrumpfen oder gehen pleite.
  - Ein Investorenpool aus Ausschüttungen gründet neue Firmen, bevorzugt auf Planeten mit Arbeitslosen, und kauft Distrikte.
- **Privatjobs:** Sie kopieren die Vanilla-Jobs inklusive Job-Swaps, in eigenen Wirtschaftskategorien mit Vanilla-Eltern.
- **Generator:** `tools/generate-firms.mjs` erzeugt Jobs, Kategorien, 84 Firmen-Deposits (28 Varianten × 3 Stufen), Verteiler und Texte.

Testablauf: [docs/TESTS_0.3.md](docs/TESTS_0.3.md). Ältere Stände: [0.2](docs/TESTS_0.2.md), [0.1](docs/TESTS_0.1.md), [Prototyp](docs/PROTOTYPE_TESTS.md).

## Geplant

- **Später**: Lösung für Habitate, Ringwelten, Ökumenopolen und Spezialplaneten.
- **Nächste Schritte**: Kalibrierung von Gewinn, Kosten und Gewichten; Forschung und Einheit als Sektoren; Firmennamen und Ereignisse.
- **v0.3**: Privatgebäude, Technologieabhängigkeit (Techs schalten Firmenjobs frei, Firmen subventionieren benötigte Techs), Spielerhebel (Steuern, Subventionen, Regulierung, Verstaatlichung), Firmennamen und Ereignisse.

Ziel: Die Privatwirtschaft soll gut genug entscheiden, dass sie auch KI-Reichen hilft.
