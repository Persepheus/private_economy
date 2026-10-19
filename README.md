# Private Economy

Stellaris 4.5: Eine Richtlinie **Wirtschaftsordnung** legt fest, wie viel der Wirtschaft privaten Firmen gehört – von Planwirtschaft (unverändert) bis Laissez-faire (80 % der Distrikt-Plätze). Privatfirmen belegen Distrikt-Plätze und Gebäude, beschäftigen eigene Jobs, die der Staat nicht steuern kann, und entscheiden selbst, was sie produzieren.

Plug and play: nur neue Dateien, keine Vanilla-Datei wird überschrieben (`tools/validate.mjs` prüft das).

## Stand 0.9.0

Die Privatwirtschaft ist ein Kreislauf:

- **Schattenpreise** aus Markt und Bedarf.
- **Wertschöpfung, Gewinnanteil und Kapital.**
- **Firmen** aus 4 Anteilen à 50 Arbeitskraft:
  - Stadt höchstens 150 pro Produkt.
  - Land 200, oder 150 plus 50 Sparte.
- **Defizit-Sperre:** Keine Firmen, die eine Ressource im Defizit verbrauchen. Bestehende werden zuerst umgebaut, auch über Klassengrenzen.
- **Kosten** wie für den Staat. Finanziert über private Ersparnisse (Anteil am Handelseinkommen, nach Ordnung) und Kredit (40 % Anzahlung, Rest aus dem Firmengewinn).
- **Abwechslung** durch Pseudo-Zufall, Diversifikation und Spezialisierung.
- **Investitions-Dreieck:** Legierungen, Forschung und Einheit (private Medienhäuser) werden nach einem Zielmix gewichtet, der sich nach Ethik und Krieg richtet. Keins der drei fällt hinten runter.
- **Arbeitermangel:** Firmen automatisieren Bergbau, Energie und Landwirtschaft, wie die Vanilla-Gebäude, aber auf eigene Kosten. Firmen behalten eine Rücklage, der Rest geht an den Pool.

Testablauf: [docs/TESTS_0.9.md](docs/TESTS_0.9.md). Ältere Stände: [0.8](docs/TESTS_0.8.md), [0.7](docs/TESTS_0.7.md), [0.6](docs/TESTS_0.6.md), [0.5](docs/TESTS_0.5.md), [0.4](docs/TESTS_0.4.md), [0.3](docs/TESTS_0.3.md), [0.2](docs/TESTS_0.2.md), [0.1](docs/TESTS_0.1.md), [Prototyp](docs/PROTOTYPE_TESTS.md).

## Geplant

- **Später**: Lösung für Habitate, Ringwelten, Ökumenopolen, Arkships und Spezialplaneten.
- **Nächste Schritte**: Kalibrierung von Gewinn, Kosten und Gewichten; Firmen forschen an ihrem Sektor, Techs schalten Varianten frei; Firmennamen und Ereignisse, z. B. eine **Anwerbekampagne**: Firmen mit unbesetzten Jobs werben Zivilisten von anderen Welten an (`planet_resettlement_unemployed_destination_mult`). Du kannst mitfinanzieren (stärker), es den Firmen überlassen (schwächer) oder ablehnen.
- **Später, mit den Flair-Events – Ideen gegen Arbeitermangel**:
  - Modernisierung: Firmen investieren in Produktivität statt Jobs, über die Kategorie-Modifikatoren.
  - Private Robotik: Firmen beschleunigen die Roboterfertigung.
  - Rationalisierung: weniger Jobs bei mehr Ertrag.
  - Spezialisten-Automatisierung hinter späten Techs.
  - Kapitalertragssteuer: überschüssiges Pool-Kapital fließt als Handel an den Staat zurück.
- **v0.3**: Privatgebäude, Technologieabhängigkeit (Techs schalten Firmenjobs frei, Firmen subventionieren benötigte Techs), Spielerhebel (Steuern, Subventionen, Regulierung, Verstaatlichung), Firmennamen und Ereignisse.

Ziel: Die Privatwirtschaft soll gut genug entscheiden, dass sie auch KI-Reichen hilft.
