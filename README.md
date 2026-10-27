# Private Economy

Stellaris 4.5: Eine Richtlinie **Wirtschaftsordnung** legt fest, wie viel der Wirtschaft privaten Firmen gehört – von Planwirtschaft (unverändert) bis Laissez-faire (80 % der Distrikt-Plätze). Privatfirmen belegen Distrikt-Plätze und Gebäude, beschäftigen eigene Jobs, die der Staat nicht steuern kann, und entscheiden selbst, was sie produzieren.

Plug and play: nur neue Dateien, keine Vanilla-Datei wird überschrieben (`tools/validate.mjs` prüft das).

Die von Codex vorgenommenen Änderungen sind mit Diagnose, betroffenen Dateien und Prüfstatus im [Codex-Changelog](CODEX_CHANGELOG.md) dokumentiert.

## Stand 0.37.0

**Korrekturen 0.37.0** ([TESTS_0.37.md](docs/TESTS_0.37.md)):
- Forschungsfirmen auf Habitaten bekommen die halben Basisjobs; die andere Hälfte nur, solange das Habitat eine Forschungsspezialisierung (Zone) hat. Das entspricht Vanilla (Forschungsdistrikt 90, mit Zone 180) und dem Bergbau.
- Die größte Firmenstufe heißt jetzt „Großbetrieb“ (Large) statt „Konzern“, damit sie nicht mit den echten Konzernen verwechselt wird.
- Familienförderung kommt nur auf Planeten, auf denen Pops wachsen (nicht bei reinen Roboter- und Maschinenplaneten).
- Jagdrechte werden nur gegen Weltraumkreaturen angeboten, die uns feindlich gesinnt sind.
- „Lagerbestand zu verkaufen“ nennt den Rohstoff. Der Text der Konzern-Station nennt die tatsächlichen 120 % statt „doppelt“.
- Das Kaufangebot zeigt keine Variablen mehr im Tooltip. Jeder Verkauf schreibt sein Ergebnis ins game.log.

## Stand 0.36.8

**Versorgung vor Expansion:** Gründung, Wachstum (einschließlich Konzernkrediten und Konzernhabitat-Finanzierung), Distriktkäufe und Umbauten verwenden eine gemeinsame Prüfung für Energie, Mineralien, Nahrung, Konsumgüter und Handel. Eine netto verschlechterte Ressource muss nach der Investition mindestens 5 % ihrer monatlichen Ausgaben als Überschuss behalten, begrenzt auf 10–250. Bereits zugesagte Investitionen und der volle künftige Verbrauch laufender Baustellen werden reichsweit reserviert; deren künftige Produktion finanziert noch keine weitere Expansion. Bestehende Firmen und Überbrückungskredite laufen weiter. Initialisierung im bestehenden Spielstand am nächsten Monatspuls. [Rechenmodell, Prüfungen und Einschränkungen](docs/TESTS_0.36.8.md). Statisch geprüft; Spielprüfung durch den Nutzer steht aus.

**Korrektur 0.36.7:** Der X-Button des Nachrichtenmenüs ist auf beiden Seiten ausdrücklich der wirkungslosen Schließen-Option zugeordnet. Dadurch soll er keine Kategorie mehr umschalten und das Menü nicht erneut öffnen. Statisch geprüft; Bestätigung im Spiel noch offen.

**Nachrichten einstellen:** Auf deiner Hauptstadt unter **Entscheidungen → Privatwirtschaft: Nachrichten einstellen** öffnest du ein kostenloses Menü mit zwölf Kategorien auf zwei Seiten. Jeder Schalter zeigt den aktuellen Zustand **Aktiv/Stumm**; ein Klick schaltet ihn um. Zusätzlich kannst du alle Kategorien aktivieren oder stummschalten. Standardmäßig ist alles aktiv. Die Einstellungen gelten für dein Reich und werden im Spielstand gespeichert. Echte Entscheidungen und Angebote bleiben sichtbar; Meldungsfilter verändern keine Wirtschaftsabläufe.

Jedes Thema hat ein eigenes Symbol in Meldungen und Menü, außerdem einen eigenen Eintrag in den allgemeinen Stellaris-Nachrichteneinstellungen. Diese gelten zusätzlich zum Mod-Filter. [Symbolübersicht](docs/message-icons.png) · [Testanleitung 0.36.6](docs/TESTS_0.36.6.md). Statisch geprüft, noch nicht im Spiel getestet.

Dyson-Schwarm-Fix: Der fertige Konzern-Schwarm wird einen Tag nach dem Entfernen seiner Baustelle angelegt, damit die Rückverknüpfung vom Stern zur Megastruktur erhalten bleibt. Diagnose und manuelle Prüfschritte: [docs/TESTS_0.36.5.md](docs/TESTS_0.36.5.md). Bereits beschädigte Spielstände benötigen eine separate Reparatur dieser Verknüpfung; der Patch allein korrigiert sie nicht rückwirkend. Noch nicht im Spiel getestet.

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
- **Konzern-Stationen:** Konzerne bauen oder kaufen Orbitalstationen (gewöhnliche Rohstoffe, nach Wirtschaftsordnung begrenzt), gehalten von den Private Holdings des Reichs. Sie verarbeiten den Ertrag effizienter (140 %): Davon zahlen sie den Unterhalt ihrer Megastrukturen, liefern uns 120 % des Werts in ihrem eigenen Produkt (Zeile des Hauptsitz-Vorkommens) und behalten 20 % als Marge.
- **Konzernflotten:** Im Krieg verleasen Industriekonzerne Flotten (5 Jahre, 10 % Gebühr, danach kaufen oder zurückgeben). Gegen Weltraumkreaturen an der Grenze stellen Konzerne Flotten gegen die Beuterechte (bei KI-Reichen startet die Flotte direkt bei den Kreaturen).
- **Lieferketten:** Private Minen, Fabriken und (bei katalytischer Verarbeitung) Farmen schließen Lieferverträge mit Stahlwerken, Fabriken, Laboren, Handels- und Medienhäusern auf anderen Planeten: +5 % Ertrag der Branche auf beiden Planeten.
- **Weitere Konzern-Angebote:** Erkundungscharta (Forschungsschiff gegen Schürfrechte), Konvoischutz gegen Piraten, Schutzflotten für bombardierte Planeten (gegen Firmen, Legierungen oder Einfluss; für den eigenen Hauptsitz kostenlos), Bergung von Trümmerfeldern, eigene Dyson-Schwärme und Arc Furnaces (gebaut wie in Vanilla: Baustelle der Holdings mit Vanilla-Bauzeit; der Konzern zahlt Bau, Ausbau und Unterhalt und wählt einen mittleren Standort; beim Ofen bekommt er die Himmelskörper ohne früheres Vorkommen, die übrigen bleiben beim Reich); Mäzene spenden Schiffe nach Verlusten.
- **Firmenregister:** Planeten-Entscheidung, die zeigt, welche Firma zu welchem Konzern gehört.
- **Kredite:** Konzerne verleihen aus ihrer Kasse für Wachstum und gegen Verluste (3 % Zins pro Quartal, Kreditlinie −200). Ausfälle treffen den Gläubiger; ein Konzern im Minus verkauft Firmen.
- **Bombardement:** Firmen bombardierter Planeten verlieren Kapital (0,1–0,3 % je Punkt Verwüstung und Monat), selten Stufen bis zur Zerstörung (Trümmer); danach drei Jahre Kriegsgebiet ohne neue Investitionen; Konzerne bauen ihre Firmen wieder auf, unabhängige gegen einen Zuschuss.
- **Eroberung:** Geht ein Planet an ein anderes Reich, gehen seine Firmen mit; Konzernbindungen und Kredite enden, ein Konzern mit Hauptsitz dort zieht mit um (oder wird aufgelöst, wenn das neue Reich keinen Platz hat). Ohne Privatwirtschaft beim neuen Besitzer werden die Firmen Staatsdistrikte. Stationen und Megastrukturen der Holdings folgen dem Gebiet.
- **Besatzung und Bodenkampf:** Firmen besetzter Planeten stehen still, der Besatzer erhebt Kontributionen; nach der Befreiung bestrafst, begnadigst oder enteignest du Kollaborateure. Ein besetzter Konzernsitz friert die Kasse ein und zieht nach fünf Jahren womöglich um. Bei einer Invasion schicken Konzerne Werkschutz (für den eigenen Sitz kostenlos, sonst gegen Firmen, Legierungen oder Einfluss).
- **Spezialisierungen und Habitate:** Landfirmen bekommen die Jobs der Spezialisierung ihres Distrikttyps (wie Staatsdistrikte) und lassen dem Staat immer einen Distrikt des Typs. Auf Habitaten belegen Firmen Habitat-Distrikte: Stadtfirmen wie auf Planeten, Labore nur mit Forschungs-Spezialisierung, Minen und Kraftwerke mit halben Grundjobs, Farmen mit Hydroponik; Kosten in Legierungen, Leerenbewohner +50 %.
- **Konzern-Habitat:** Ein reicher Konzern baut ein eigenes Habitat, eins pro Konzern und System. Er zahlt die Legierungen, wir den Einfluss. Bau und Besiedlung laufen wie in Vanilla. Den Standort wählt er nach seiner Branche. Der Konzern legt die Designation fest, besitzt alle Firmen dort, zahlt dort alle Kosten (25 % günstiger) und verlegt seinen Hauptsitz dorthin. Keine Verstaatlichung oder Räumung; Kolonie, Distrikte und Firmen zählen nicht zur Ausdehnung. Krise, Auflösung oder Planwirtschaft beenden die Rechte. Unseren Einfluss bestätigen wir immer selbst (KI-Reiche, wenn sie ihn haben). Nur durch eine Fusion kann ein Konzern zwei Habitate haben.
- **Erledigt (0.31.2):** Konzern-Schwarm und -Ofen werden wie in Vanilla gebaut (Baustelle der Holdings, Vanilla-Bauzeit).
- **Neu testen (beschlossen):** Die Wirtschaftswerte ab 0.33 (Marge, halbierter Gewinnanteil, Sozialleistungen, Institute, Rüstungsvertrag, Stiftungen) in einem **neuen Spiel**; bisher nur mit schon reichen Firmen getestet.
- **Erledigt (0.36): Konzern-Zitadellen** als Deep Space Citadel der Holdings (Prototyp [TESTS_PROTO_CITADEL.md](docs/TESTS_PROTO_CITADEL.md): Leasen und Übergabe gingen nicht, die Variante „bleibt bei den Holdings, die treten unseren Kriegen bei“ schon).
- **Gefunden im Save Hesukaran 7 (2298), Kalibrierung:** Der Rohstoffkonzern Stormgate Utilities hortet 114 Tsd. Kasse (Stationserträge plus Firmengewinne, fast nichts zum Ausgeben), der Investorenpool 40 Tsd.; die Firmen wollen 9600 Gewinn im Quartal, der Staat zahlt wegen der 40-%-Grenze nur 20 % davon (635 Handel im Monat). Es fehlt ein Abfluss für überschüssiges Geld. Erledigt (0.33): Konzern-Marge (140 % Effizienz, Unterhalt zuerst, 120 % an uns, 20 % Marge) und halbierter Gewinnanteil; die 40-%-Grenze bleibt (Entscheidung). Erledigt (0.34): Rüstungsvertrag. Offen: Förderabgaben (es gibt jetzt eine Marge; erst nach Test der neuen Kalibrierung entscheiden). Erledigt (0.32): Forschungsinstitut, Betriebliche Sozialleistungen. Erledigt: Staatsanleihen (pe.242) im Krieg und bei Defizit viermal so häufig, die KI nimmt sie dann eher an. Konzernnamen kommen in mehreren Reichen doppelt vor.
- **Konzern-Beamte:** Reiche Konzerne (ab 3000 Kasse) heben ihre Beschäftigten auf den höchsten Lebensstandard: Sie kaufen die zusätzlichen Konsumgüter zum Marktpreis, der Planet bekommt anteilig die Zufriedenheit (Betriebliche Sozialleistungen). Am Hauptsitz betreiben sie ein Forschungsinstitut ihres Fachs (bis 300 Forscherstellen, +25 % Ausstattung), Betrieb und Löhne aus der Kasse.
- **Rüstungsvertrag:** Ein reicher Industriekonzern trägt 10–20 % unseres Flottenunterhalts und zahlt den Gegenwert aus seiner Kasse (keine Schiffe aus dem Nichts). Dafür Rüstungsaufträge für seine Stahlwerke, ein Rüstungszentrum am Hauptsitz und Vorrang beim Kriegsleasing.
- **Konzern-Stiftungen:** Der reichste Konzern (ab 20.000 Kasse) stiftet Mäzen-Events mit 10 % seiner Kasse; abgelehntes Geld geht an ihn zurück.
- **Vorkommen „Privatwirtschaft“:** ein Status-Vorkommen je Planet für Cluster, Lieferverträge, Sozialleistungen, Rüstungsaufträge, Preiskampf und Institutsausstattung; Institutsstellen und Rüstungszentrum stehen im Hauptsitz-Vorkommen, die Automatisierung in einem Vorkommen.
- **Konzern-Zitadellen:** Jeder Konzern, der es sich leisten kann, baut in seinen wichtigen Systemen je eine Deep Space Citadel (eine je Konzern und System) (Vanilla-Bauzeit, Ausbau auf II/III, Verteidigungsplattformen), sobald wir die Technologie haben. Sie gehört den Holdings (Bau und Unterhalt aus der Konzernkasse); die Holdings treten unseren Kriegen bei. Die Holdings haben unsere Technologien.
- **Cluster:** Mehrere gleiche Firmen auf einem Planeten stärken die ganze Branche dort. Cluster und Lieferverträge zeigt das Vorkommen „Standortvorteile“.
- **Flair:** Lieferverträge bei Mangel (zwei Jahre monatlich, nur bei weniger als halb vollem Lager), Modernisierung, Rationalisierung, Vermögensabgabe; mit den Nachbarn: Auslandsinvestitionen, ausländische Filialen, Technologielizenzen, Dumping und Schutzzölle.
- **Planwirtschaft** beendet die Privatwirtschaft: Firmen werden Staatsdistrikte, der Pool verfällt.
- **Börse:** Aktien mit Dividende, Staatsanleihen, Übernahmen, Monopole, Spionage, Exportboom, Umweltskandale, Crash und Rally, Insiderhandel, Gentrifizierung, Abschied der Mäzene.
- **Investitions-Dreieck:** Legierungen, Forschung und Einheit (private Medienhäuser) werden nach einem Zielmix gewichtet, der sich nach Ethik und Krieg richtet. Keins der drei fällt hinten runter.
- **Arbeitermangel:** Firmen automatisieren Bergbau, Energie und Landwirtschaft, wie die Vanilla-Gebäude, aber auf eigene Kosten: Sie erstatten uns die Energie ihrer automatisierten Jobs als eigene Einnahmezeile „Private Automatisierung (Erstattung der Firmen)“. Firmen behalten eine Rücklage, der Rest geht an den Pool. Gehören die Firmen zu einem Konzern, bezahlt er die Automatisierung aus seiner Kasse.

Testablauf: [docs/TESTS_0.36.md](docs/TESTS_0.36.md). Ältere Stände: [0.35](docs/TESTS_0.35.md), [0.34](docs/TESTS_0.34.md), [0.33](docs/TESTS_0.33.md), [0.32](docs/TESTS_0.32.md), [0.31](docs/TESTS_0.31.md), [0.30](docs/TESTS_0.30.md), [0.29](docs/TESTS_0.29.md), [0.28](docs/TESTS_0.28.md), [0.27](docs/TESTS_0.27.md), [0.26](docs/TESTS_0.26.md), [0.25](docs/TESTS_0.25.md), [0.24](docs/TESTS_0.24.md), [0.23](docs/TESTS_0.23.md), [0.22](docs/TESTS_0.22.md), [0.21](docs/TESTS_0.21.md), [0.20](docs/TESTS_0.20.md), [0.19](docs/TESTS_0.19.md), [0.18](docs/TESTS_0.18.md), [0.17](docs/TESTS_0.17.md), [0.16](docs/TESTS_0.16.md), [0.15](docs/TESTS_0.15.md), [0.14](docs/TESTS_0.14.md), [0.13](docs/TESTS_0.13.md), [0.12](docs/TESTS_0.12.md), [0.11](docs/TESTS_0.11.md), [0.10](docs/TESTS_0.10.md), [0.9](docs/TESTS_0.9.md), [0.8](docs/TESTS_0.8.md), [0.7](docs/TESTS_0.7.md), [0.6](docs/TESTS_0.6.md), [0.5](docs/TESTS_0.5.md), [0.4](docs/TESTS_0.4.md), [0.3](docs/TESTS_0.3.md), [0.2](docs/TESTS_0.2.md), [0.1](docs/TESTS_0.1.md), [Prototyp](docs/PROTOTYPE_TESTS.md), [Prototyp Holdings](docs/TESTS_PROTO_HOLDINGS.md), [Prototyp Arc Furnace](docs/TESTS_PROTO_FURNACE.md).

## Geplant

- **In Arbeit: Spezialplaneten.** Habitate (0.30) und Konzern-Habitate (0.31) sind drin; als Nächstes Ringwelten, Ökumenopolen, Arkships und weitere.
- **Erledigt (0.31): Konzern-Habitat** (im Spiel noch ungetestet, [TESTS_0.31.md](docs/TESTS_0.31.md)). Beschluss war: höchstens eins pro Konzern, gebaut aus seiner Kasse (wir zahlen den Einfluss, so viel wie Vanilla mit unseren Modifikatoren verlangt), eins pro System. Standort: Energie-/Agrarkonzern das System mit den meisten Energievorkommen, Bergbau die meisten Mineralienvorkommen, Wissenschaft die meisten Forschungsvorkommen, Industrie und Handel das System, in dem das Habitat am größten werden kann (die meisten großen Himmelskörper). Rechte: Designation legt der Konzern fest, unbegrenzter Privatanteil (letzter Platz bleibt Staat), alle Firmen dort gehören ihm (neue Mechanik), keine Verstaatlichung oder Räumung, Hauptsitz zieht dorthin, Automatisierung zahlt er, alle seine Kosten dort (Gründung, Wachstum, Automatisierung) 25 % günstiger und aus seiner Kasse. Ausdehnung des Habitats möglichst 0 (Prototyp [TESTS_PROTO_SPRAWL.md](docs/TESTS_PROTO_SPRAWL.md)). Ende bei Krise oder Auflösung: Habitat bleibt uns, Firmen unabhängig; bei Eroberung geht der Konzern mit. Dazu: Bau und Besiedlung wie Vanilla, Planwirtschaft ohne Ausnahme, KI-Reiche ohne Fenster, keine Ausdehnung für Distrikte und Firmen dort.
- **Erledigt (0.30):** Landfirmen bekommen die Jobs der Spezialisierung ihres Distrikttyps; der letzte Distrikt eines Typs bleibt beim Staat.
- **Gefunden im Save Hesukaran 7 (2287):** Schutzflotte der KI ohne passenden Schiffsentwurf (create_ship ungültig, leere Flotte); Kredite eines aufgelösten Konzerns zahlen weiter in seinen leeren Platz; zwei Rohstoffkonzerne horten je 13-14 Tsd. Kasse (Verwendung bzw. Kalibrierung).
- **Nächste Schritte**: Kalibrierung von Gewinn, Kosten und Gewichten; Firmen forschen an ihrem Sektor, Techs schalten Varianten frei; Firmennamen.
- **Längere Lieferketten (Supply Chains):** mehrstufige Wertschöpfung zwischen Firmen (Vorprodukte, Zulieferer), gemerkt am 27.10.2026.
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
