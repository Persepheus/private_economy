# Private Economy

Stellaris 4.5: Eine Richtlinie **Wirtschaftsordnung** legt fest, wie viel der Wirtschaft privaten Firmen gehört – von Planwirtschaft (unverändert) bis Laissez-faire (80 % der Distrikt-Plätze). Privatfirmen belegen Distrikt-Plätze und Gebäude, beschäftigen eigene Jobs, die der Staat nicht steuern kann, und entscheiden selbst, was sie produzieren.

Plug and play: nur neue Dateien, keine Vanilla-Datei wird überschrieben (`tools/validate.mjs` prüft das).

## Stand 0.31.1

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
- **Konzern-Stationen:** Konzerne bauen oder kaufen Orbitalstationen (gewöhnliche Rohstoffe, nach Wirtschaftsordnung begrenzt), gehalten von den Private Holdings des Reichs. Dafür produzieren sie das Anderthalbfache des Werts in ihrem eigenen Produkt, als Zeile des Hauptsitz-Vorkommens.
- **Konzernflotten:** Im Krieg verleasen Industriekonzerne Flotten (5 Jahre, 10 % Gebühr, danach kaufen oder zurückgeben). Gegen Weltraumkreaturen an der Grenze stellen Konzerne Flotten gegen die Beuterechte (bei KI-Reichen startet die Flotte direkt bei den Kreaturen).
- **Lieferketten:** Private Minen, Fabriken und (bei katalytischer Verarbeitung) Farmen schließen Lieferverträge mit Stahlwerken, Fabriken, Laboren, Handels- und Medienhäusern auf anderen Planeten: +5 % Ertrag der Branche auf beiden Planeten.
- **Weitere Konzern-Angebote:** Erkundungscharta (Forschungsschiff gegen Schürfrechte), Konvoischutz gegen Piraten, Schutzflotten für bombardierte Planeten (gegen Firmen, Legierungen oder Einfluss; für den eigenen Hauptsitz kostenlos), Bergung von Trümmerfeldern, eigene Dyson-Schwärme und Arc Furnaces (der Konzern zahlt Bau, Ausbau und Unterhalt und wählt einen mittleren Standort; beim Ofen bekommt er die Himmelskörper ohne früheres Vorkommen, die übrigen bleiben beim Reich); Mäzene spenden Schiffe nach Verlusten.
- **Firmenregister:** Planeten-Entscheidung, die zeigt, welche Firma zu welchem Konzern gehört.
- **Kredite:** Konzerne verleihen aus ihrer Kasse für Wachstum und gegen Verluste (3 % Zins pro Quartal, Kreditlinie −200). Ausfälle treffen den Gläubiger; ein Konzern im Minus verkauft Firmen.
- **Bombardement:** Firmen bombardierter Planeten verlieren Kapital (0,1–0,3 % je Punkt Verwüstung und Monat), selten Stufen bis zur Zerstörung (Trümmer); danach drei Jahre Kriegsgebiet ohne neue Investitionen; Konzerne bauen ihre Firmen wieder auf, unabhängige gegen einen Zuschuss.
- **Eroberung:** Geht ein Planet an ein anderes Reich, gehen seine Firmen mit; Konzernbindungen und Kredite enden, ein Konzern mit Hauptsitz dort zieht mit um (oder wird aufgelöst, wenn das neue Reich keinen Platz hat). Ohne Privatwirtschaft beim neuen Besitzer werden die Firmen Staatsdistrikte. Stationen und Megastrukturen der Holdings folgen dem Gebiet.
- **Besatzung und Bodenkampf:** Firmen besetzter Planeten stehen still, der Besatzer erhebt Kontributionen; nach der Befreiung bestrafst, begnadigst oder enteignest du Kollaborateure. Ein besetzter Konzernsitz friert die Kasse ein und zieht nach fünf Jahren womöglich um. Bei einer Invasion schicken Konzerne Werkschutz (für den eigenen Sitz kostenlos, sonst gegen Firmen, Legierungen oder Einfluss).
- **Spezialisierungen und Habitate:** Landfirmen bekommen die Jobs der Spezialisierung ihres Distrikttyps (wie Staatsdistrikte) und lassen dem Staat immer einen Distrikt des Typs. Auf Habitaten belegen Firmen Habitat-Distrikte: Stadtfirmen wie auf Planeten, Labore nur mit Forschungs-Spezialisierung, Minen und Kraftwerke mit halben Grundjobs, Farmen mit Hydroponik; Kosten in Legierungen, Leerenbewohner +50 %.
- **Konzern-Habitat:** Ein reicher Konzern baut ein eigenes Habitat, eins pro Konzern und System. Er zahlt die Legierungen, wir den Einfluss. Bau und Besiedlung laufen wie in Vanilla. Den Standort wählt er nach seiner Branche. Der Konzern legt die Designation fest, besitzt alle Firmen dort, zahlt dort alle Kosten (25 % günstiger) und verlegt seinen Hauptsitz dorthin. Keine Verstaatlichung oder Räumung; Kolonie, Distrikte und Firmen zählen nicht zur Ausdehnung. Krise, Auflösung oder Planwirtschaft beenden die Rechte. Unseren Einfluss bestätigen wir immer selbst (KI-Reiche, wenn sie ihn haben). Nur durch eine Fusion kann ein Konzern zwei Habitate haben.
- **Kilostrukturen wie Vanilla bauen (vorgemerkt):** Konzern-Dyson-Schwarm und Arc Furnace entstehen bisher sofort. Mit demselben Weg wie beim Konzern-Habitat (Baustelle der Holdings, Ausbau mit Vanilla-Bauzeit) ginge das auch, sobald der Habitat-Test zeigt, dass der Ausbau der Holdings-Baustelle klappt.
- **Cluster:** Mehrere gleiche Firmen auf einem Planeten stärken die ganze Branche dort. Cluster und Lieferverträge zeigt das Vorkommen „Standortvorteile“.
- **Flair:** Lieferverträge bei Mangel (zwei Jahre monatlich, nur bei weniger als halb vollem Lager), Modernisierung, Rationalisierung, Vermögensabgabe; mit den Nachbarn: Auslandsinvestitionen, ausländische Filialen, Technologielizenzen, Dumping und Schutzzölle.
- **Planwirtschaft** beendet die Privatwirtschaft: Firmen werden Staatsdistrikte, der Pool verfällt.
- **Börse:** Aktien mit Dividende, Staatsanleihen, Übernahmen, Monopole, Spionage, Exportboom, Umweltskandale, Crash und Rally, Insiderhandel, Gentrifizierung, Abschied der Mäzene.
- **Investitions-Dreieck:** Legierungen, Forschung und Einheit (private Medienhäuser) werden nach einem Zielmix gewichtet, der sich nach Ethik und Krieg richtet. Keins der drei fällt hinten runter.
- **Arbeitermangel:** Firmen automatisieren Bergbau, Energie und Landwirtschaft, wie die Vanilla-Gebäude, aber auf eigene Kosten. Firmen behalten eine Rücklage, der Rest geht an den Pool. Gehören die Firmen zu einem Konzern, bezahlt er die Automatisierung aus seiner Kasse.

Testablauf: [docs/TESTS_0.31.md](docs/TESTS_0.31.md). Ältere Stände: [0.30](docs/TESTS_0.30.md), [0.29](docs/TESTS_0.29.md), [0.28](docs/TESTS_0.28.md), [0.27](docs/TESTS_0.27.md), [0.26](docs/TESTS_0.26.md), [0.25](docs/TESTS_0.25.md), [0.24](docs/TESTS_0.24.md), [0.23](docs/TESTS_0.23.md), [0.22](docs/TESTS_0.22.md), [0.21](docs/TESTS_0.21.md), [0.20](docs/TESTS_0.20.md), [0.19](docs/TESTS_0.19.md), [0.18](docs/TESTS_0.18.md), [0.17](docs/TESTS_0.17.md), [0.16](docs/TESTS_0.16.md), [0.15](docs/TESTS_0.15.md), [0.14](docs/TESTS_0.14.md), [0.13](docs/TESTS_0.13.md), [0.12](docs/TESTS_0.12.md), [0.11](docs/TESTS_0.11.md), [0.10](docs/TESTS_0.10.md), [0.9](docs/TESTS_0.9.md), [0.8](docs/TESTS_0.8.md), [0.7](docs/TESTS_0.7.md), [0.6](docs/TESTS_0.6.md), [0.5](docs/TESTS_0.5.md), [0.4](docs/TESTS_0.4.md), [0.3](docs/TESTS_0.3.md), [0.2](docs/TESTS_0.2.md), [0.1](docs/TESTS_0.1.md), [Prototyp](docs/PROTOTYPE_TESTS.md), [Prototyp Holdings](docs/TESTS_PROTO_HOLDINGS.md), [Prototyp Arc Furnace](docs/TESTS_PROTO_FURNACE.md).

## Geplant

- **In Arbeit: Spezialplaneten.** Habitate (0.30) und Konzern-Habitate (0.31) sind drin; als Nächstes Ringwelten, Ökumenopolen, Arkships und weitere.
- **Erledigt (0.31): Konzern-Habitat** (im Spiel noch ungetestet, [TESTS_0.31.md](docs/TESTS_0.31.md)). Beschluss war: höchstens eins pro Konzern, gebaut aus seiner Kasse (wir zahlen den Einfluss, so viel wie Vanilla mit unseren Modifikatoren verlangt), eins pro System. Standort: Energie-/Agrarkonzern das System mit den meisten Energievorkommen, Bergbau die meisten Mineralienvorkommen, Wissenschaft die meisten Forschungsvorkommen, Industrie und Handel das System, in dem das Habitat am größten werden kann (die meisten großen Himmelskörper). Rechte: Designation legt der Konzern fest, unbegrenzter Privatanteil (letzter Platz bleibt Staat), alle Firmen dort gehören ihm (neue Mechanik), keine Verstaatlichung oder Räumung, Hauptsitz zieht dorthin, Automatisierung zahlt er, alle seine Kosten dort (Gründung, Wachstum, Automatisierung) 25 % günstiger und aus seiner Kasse. Ausdehnung des Habitats möglichst 0 (Prototyp [TESTS_PROTO_SPRAWL.md](docs/TESTS_PROTO_SPRAWL.md)). Ende bei Krise oder Auflösung: Habitat bleibt uns, Firmen unabhängig; bei Eroberung geht der Konzern mit. Dazu: Bau und Besiedlung wie Vanilla, Planwirtschaft ohne Ausnahme, KI-Reiche ohne Fenster, keine Ausdehnung für Distrikte und Firmen dort.
- **Erledigt (0.30):** Landfirmen bekommen die Jobs der Spezialisierung ihres Distrikttyps; der letzte Distrikt eines Typs bleibt beim Staat.
- **Gefunden im Save Hesukaran 7 (2287):** Schutzflotte der KI ohne passenden Schiffsentwurf (create_ship ungültig, leere Flotte); Kredite eines aufgelösten Konzerns zahlen weiter in seinen leeren Platz; zwei Rohstoffkonzerne horten je 13-14 Tsd. Kasse (Verwendung bzw. Kalibrierung).
- **Nächste Schritte**: Kalibrierung von Gewinn, Kosten und Gewichten; Firmen forschen an ihrem Sektor, Techs schalten Varianten frei; Firmennamen.
- **Danach (beschlossen):** Lobbys der Branchengruppen (bauen auf den Konzernen auf); private Werften erst, wenn klar ist, was sie spielerisch bringen.
- **Konjunkturzyklus:** erst, wenn die Wirtschaft stabil läuft.
- **Aufräumen:** alter Holdings-Prototyp (pe.15-21) und diese Weltraum-Zeile sind überholt.
- **Noch nie im Spiel getestet:** Konvoischutz, Bergung, Schiffsspenden der Mäzene, Konzern-Automatisierung, Liefervertrag (zwei Jahre), Trümmer und Wiederaufbau, Besatzung und Kollaboration.
- **Prototyp Hilfsreich:** [docs/TESTS_PROTO_HOLDINGS.md](docs/TESTS_PROTO_HOLDINGS.md) (Konsole `event pe.15` bis `pe.21`).
- **Weltraum (Ideen):** private Stationen und Kilostrukturen über ein Hilfsreich mit Leasing, Spenden von Schiffen durch Mäzene nach Verlusten, Konzernflotten über ein Hilfsreich, private Werften.
- **Gemerkte Ideen, noch offen:**
  - Rationalisierung als eigene Firmenstufe („schlank“ statt „groß“), nicht nur als Event.
- **Verworfen:** Spezialisten-Automatisierung (gibt es im Spiel sonst auch nicht).
- **Erledigt aus den gemerkten Ideen:** Anwerbekampagne (pe.205), Robotik (pe.231), Modernisierung (pe.262), Rationalisierung als Event (pe.263), Kapitalertragssteuer als Vermögensabgabe (pe.264).
- **v0.3**: Privatgebäude, Technologieabhängigkeit (Techs schalten Firmenjobs frei, Firmen subventionieren benötigte Techs), Spielerhebel (Steuern, Subventionen, Regulierung, Verstaatlichung).

Ziel: Die Privatwirtschaft soll gut genug entscheiden, dass sie auch KI-Reichen hilft.
