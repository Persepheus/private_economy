# Private Economy

Stellaris 4.5: Eine Richtlinie **Wirtschaftsordnung** legt fest, wie viel der Wirtschaft privaten Firmen gehört – von Planwirtschaft (unverändert) bis Laissez-faire (80 % der Distrikt-Plätze). Privatfirmen belegen Distrikt-Plätze und Gebäude, beschäftigen eigene Jobs, die der Staat nicht steuern kann, und entscheiden selbst, was sie produzieren.

Plug and play: nur neue Dateien, keine Vanilla-Datei wird überschrieben (`tools/validate.mjs` prüft das).

## Stand 0.19.0

Die Privatwirtschaft ist ein Kreislauf:

- **Schattenpreise** aus Markt und Bedarf.
- **Privatjobs** sind vollständige Kopien der Vanilla-Jobs, mit Swaps, allen Boni und Vanilla-Kategorie.
- **Wertschöpfung, Gewinn und Kapital:** Den Gewinn der Firmen zahlt der Staat in Handel.
- **Firmen** aus 4 Anteilen à 50 Arbeitskraft:
  - Stadt höchstens 150 pro Produkt.
  - Land 200, oder 150 plus 50 Sparte.
- **Defizit-Sperre:** Keine Firmen, die eine Ressource im Defizit verbrauchen. Bestehende werden zuerst umgebaut, auch über Klassengrenzen.
- **Umbau** nur, wenn die neue Firma klar mehr wert ist und danach nichts knapp wird, was die alte gemacht hat. Eine Firma baut frühestens nach 10 Jahren um, ein Planet höchstens alle 5 Jahre.
- **Freie Pops:** Gründung und Wachstum brauchen Zivilisten minus offene Jobs minus Baustellen-Jobs, mindestens 50. Eine fertige Baustelle öffnet erst, wenn Arbeiter da sind.
- **Gewinne und Ersparnisse** zusammen höchstens 40 % des Brutto-Handels; was der Staat nicht zahlt, bekommen Firmen und Pool auch nicht.
- **Kosten** wie für den Staat. Finanziert über private Ersparnisse (Anteil am Handelseinkommen, nach Ordnung) und Kredit (40 % Anzahlung, Rest aus dem Firmengewinn).
- **Abwechslung** durch Pseudo-Zufall, Diversifikation und Spezialisierung.
- **Räumen:** Unter gelenkter und gemischter Wirtschaft kann der Spieler Firmen und Baustellen wie Blocker für Influence räumen; unter Gemischt zusätzlich mit Entschädigung in Handel und mit Unmut.
- **Umzug:** Hat ein Planet keine freien Pops (oder fehlt Wohnraum bzw. fehlen Annehmlichkeiten), ziehen unpassende Firmen samt Arbeitern auf Planeten mit passender Spezialisierung. Die Hauptstadt gibt nur ab, wenn 2/3 ihrer Distriktplätze bebaut sind, oder bei Mangel. Von einem Planeten zieht höchstens alle 3 Jahre eine Firma weg.
- **Mäzene:** Reiche Privatleute geben überschüssiges Pool-Kapital aus. Es sind durchgehende Figuren mit Ruf. Die Ergebnisse wachsen mit dem Einsatz. Die Events: Galas, Stiftungen, Prototypen, Wohltätigkeit, Anwerbung, Prospektion, Hydroponik, Kunst, Sport, Parteispenden, Kolonisten, Universitäten, Tourismus, Katastrophenhilfe.
- **Arbeitskräfte-Events:** Bleiben private Arbeiterjobs leer, gibt es Sonderschichten, Gastarbeiter, Maschinen-Leasing, Streiks, Werkswohnungen, Roboter-Startups, eine Landprämie (private Arbeiterjobs schlagen Spezialisten) oder Familienförderung; auch sie wachsen mit dem Einsatz.
- **Konzerne:** Aus großen Firmen werden benannte Konzerne mit Hauptsitz, Kasse und Vorstand. Sie übernehmen kleinere Firmen, führen Preiskämpfe und fusionieren (mit deiner Genehmigung).
- **Cluster:** Mehrere gleiche Firmen auf einem Planeten stärken die ganze Branche dort.
- **Flair:** Liefer-Deals bei Mangel, Modernisierung, Rationalisierung, Vermögensabgabe; mit den Nachbarn: Auslandsinvestitionen, ausländische Filialen, Technologielizenzen, Dumping und Schutzzölle.
- **Planwirtschaft** beendet die Privatwirtschaft: Firmen werden Staatsdistrikte, der Pool verfällt.
- **Börse:** Aktien mit Dividende, Staatsanleihen, Übernahmen, Monopole, Spionage, Exportboom, Umweltskandale, Crash und Rally, Insiderhandel, Gentrifizierung, Abschied der Mäzene.
- **Investitions-Dreieck:** Legierungen, Forschung und Einheit (private Medienhäuser) werden nach einem Zielmix gewichtet, der sich nach Ethik und Krieg richtet. Keins der drei fällt hinten runter.
- **Arbeitermangel:** Firmen automatisieren Bergbau, Energie und Landwirtschaft, wie die Vanilla-Gebäude, aber auf eigene Kosten. Firmen behalten eine Rücklage, der Rest geht an den Pool.

Testablauf: [docs/TESTS_0.19.md](docs/TESTS_0.19.md). Ältere Stände: [0.18](docs/TESTS_0.18.md), [0.17](docs/TESTS_0.17.md), [0.16](docs/TESTS_0.16.md), [0.15](docs/TESTS_0.15.md), [0.14](docs/TESTS_0.14.md), [0.13](docs/TESTS_0.13.md), [0.12](docs/TESTS_0.12.md), [0.11](docs/TESTS_0.11.md), [0.10](docs/TESTS_0.10.md), [0.9](docs/TESTS_0.9.md), [0.8](docs/TESTS_0.8.md), [0.7](docs/TESTS_0.7.md), [0.6](docs/TESTS_0.6.md), [0.5](docs/TESTS_0.5.md), [0.4](docs/TESTS_0.4.md), [0.3](docs/TESTS_0.3.md), [0.2](docs/TESTS_0.2.md), [0.1](docs/TESTS_0.1.md), [Prototyp](docs/PROTOTYPE_TESTS.md).

## Geplant

- **Später**: Lösung für Habitate, Ringwelten, Ökumenopolen, Arkships und Spezialplaneten.
- **Nächste Schritte**: Kalibrierung von Gewinn, Kosten und Gewichten; Firmen forschen an ihrem Sektor, Techs schalten Varianten frei; Firmennamen.
- **Als Nächstes (beschlossen):** Firmenkredite aus den Konzernkassen, Lieferketten zwischen Planeten, Lobbys der Branchengruppen.
- **Prototyp Hilfsreich:** [docs/TESTS_PROTO_HOLDINGS.md](docs/TESTS_PROTO_HOLDINGS.md) (Konsole `event pe.15` bis `pe.21`).
- **Weltraum (Ideen):** private Stationen und Kilostrukturen über ein Hilfsreich mit Leasing, Spenden von Schiffen durch Mäzene nach Verlusten, Konzernflotten über ein Hilfsreich, private Werften.
- **Gemerkte Ideen, noch offen:**
  - Spezialisten-Automatisierung hinter späten Techs (`job_..._automated_workforce_mult` für Privatjobs, schwächer und teurer als bei Arbeitern). Offen ist, was die Engine dafür an Energie verlangt.
  - Rationalisierung als eigene Firmenstufe („schlank“ statt „groß“), nicht nur als Event.
- **Erledigt aus den gemerkten Ideen:** Anwerbekampagne (pe.205), Robotik (pe.231), Modernisierung (pe.262), Rationalisierung als Event (pe.263), Kapitalertragssteuer als Vermögensabgabe (pe.264).
- **v0.3**: Privatgebäude, Technologieabhängigkeit (Techs schalten Firmenjobs frei, Firmen subventionieren benötigte Techs), Spielerhebel (Steuern, Subventionen, Regulierung, Verstaatlichung).

Ziel: Die Privatwirtschaft soll gut genug entscheiden, dass sie auch KI-Reichen hilft.
