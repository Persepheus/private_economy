# Private Economy

Stellaris 4.5: Eine Richtlinie **Wirtschaftsordnung** legt fest, wie viel der Wirtschaft privaten Firmen gehört – von Planwirtschaft (unverändert) bis Laissez-faire (80 % der Distrikt-Plätze). Privatfirmen belegen Distrikt-Plätze und Gebäude, beschäftigen eigene Jobs, die der Staat nicht steuern kann, und entscheiden selbst, was sie produzieren.

Plug and play: nur neue Dateien, keine Vanilla-Datei wird überschrieben (`tools/validate.mjs` prüft das).

Die von Codex vorgenommenen Änderungen sind mit Diagnose, betroffenen Dateien und Prüfstatus im [Codex-Changelog](CODEX_CHANGELOG.md) dokumentiert.

## Stand 0.47.0

**Strukturwandel** ([TESTS_0.47.md](docs/TESTS_0.47.md)). Gefunden im Save 2269 (31.10.2026): Ein KI-Reich mit 82 Firmen verlor 371 Mineralien im Monat bei 1664 im Lager. 13 Konsumgüterfabriken verbrauchten 657 Mineralien für Konsumgüter, von denen es 16.000 im Lager hatte. Die Fabriken machten Verlust, konnten aber nicht umbauen: ohne Kapital für den Umbau, mit Schulden, über Überbrückungskredite am Leben gehalten. Weil nur die Firma mit dem größten Gewinn je Planet umbauen darf, blockierte eine, die nicht zahlen konnte, den ganzen Planeten.
- **Rettung:** Eine Firma, die zu unseren Preisen Wert vernichtet, oder die etwas verbraucht, das in unter einem Jahr ausgeht, darf nach einem Jahr umbauen, auch mit Gründungsschulden und ohne die Bremse des Liefervertrags.
  - Fehlt ihr Kapital, leiht der Investorenpool den Rest; die Firma schuldet ihn und zahlt ihn aus dem Gewinn zurück.
  - Firmen mit einem Konzernkredit bleiben bei der Sanierung durch den Kreditgeber.
- **Bezahlbar:** Um den Umbau auf einem Planeten konkurrieren nur Firmen, die ihn bezahlen können.
- **Kein Überbrückungskredit** mehr für eine Firma, die zwei Quartale in Folge Wert vernichtet: Sie schrumpft, und ihre Arbeiter werden frei, sofern sie nicht vorher umbaut.
- **Akuter Mangel:** `pe_acute_<res>`, wenn das Lager bei diesem Defizit kein Jahr mehr reicht.
- Jeder Umbau steht im game.log (Planet, alte und neue Variante, Kredit des Pools).
- Fehlerbehebung: Die Piraten- und Monsterprüfung der Konzernflotten greift nicht mehr auf den Besitzer einer besitzerlosen Flotte zu (error.log, Astral Rift Research Station).

## Stand 0.46.0

**0.46.1 – die richtige Firma geht.** Die Engine entfernt mit `remove_deposit` ein Deposit des Typs, nicht unbedingt das gemeinte. Standen zwei Firmen derselben Branche und Stufe auf einem Planeten, verschwand beim Wachsen, Umziehen, Umbauen, Fusionieren oder Verstaatlichen manchmal die andere samt Kapital. Die gemeinte Firma gab es danach doppelt, mit derselben Firmennummer.
- Folge: Drei Minen mit einer Nummer zählten dieselben Abnehmer. Die kleinste kürzte jedes Quartal Verträge, die größte schloss sie neu ab: zwei Lieferketten-Nachrichten pro Quartal ohne echten Grund.
- Jetzt übernimmt die zu entfernende Firma vorher die Daten einer gleichartigen. Egal welches Deposit die Engine nimmt, die andere Firma bleibt erhalten (auch bei Ruinen).
- Laufende Spiele: Doppelte Firmennummern werden im nächsten Quartal neu vergeben. Dabei kann einmalig ein Vertrag gekürzt und neu geschlossen werden.

**Lieferketten mit Wirkung** ([TESTS_0.46.md](docs/TESTS_0.46.md)). Bisher waren die Verträge ein zufällig verteilter +5-%-Bonus. Jetzt gilt:
- **Lieferantenwahl:** Ein Abnehmer ohne Vertrag nimmt den besten Lieferanten mit freiem Platz. Zuerst zählt die höchste Stufe, dann ein Lieferant aus dem eigenen Konzern, dann das meiste Geld. Der erfolgreichste Zulieferer gilt als der mit den besten Produkten und als der zuverlässigste.
- **Kapazität nach Stufe:** klein 1, normal 2, mittel 3, groß 4 Abnehmer. Schrumpft ein Lieferant, verliert er die zuletzt gewonnenen Abnehmer. Sie bekommen eine Nachricht und suchen sofort neu.
- **Bis zu zwei neue Verträge** je Lieferantenart (Mine, Fabrik, Farm), Reich und Quartal, statt einem.
- **Gewinn:** Ein Lieferant mit festen Abnehmern fährt die Produktion hoch und verdient +5 % je Abnehmer. Ein Abnehmer mit festem Lieferanten plant besser, steht seltener still und verdient +10 %.
  - Gerechnet wird auf den Rohgewinn vor den Fixkosten.
  - Der Staat zahlt das über den Gewinnanteil. Der +5-%-Produktionsbonus der Branchen bleibt.
  - Firmen mit Lieferkette wachsen damit schneller und werden eher zum Konzern.
- **Versorgungssicherheit:** Fehlt dem Reich etwas, das ein Abnehmer mit Vertrag verbraucht, baut er später um. Statt nach 2 Jahren mit einem Drittel der Schwelle erst nach 4 Jahren mit zwei Dritteln. Firmen ohne Vertrag bauen zuerst um; hält das Defizit an, ziehen die anderen nach.

## Stand 0.45.0

**Mehr Aufstiege, Konzerne bauen mit** ([TESTS_0.45.md](docs/TESTS_0.45.md)). Anlass war der Save cevantianmultistellar2 (2241): In elf Jahren gab es 7 Aufstiege, aber rund 65 neue Firmen. Galaxisweit gab es nur 4 Konzerne, die Firmenkassen waren fast leer. Die Gründe:
- Seit 0.33 war der Gewinnanteil halbiert.
- Seit 0.43 starten Firmen klein und brauchen einen Aufstieg mehr.
- Ein Kauf braucht keine freien Pops, ein Aufstieg schon.

Die Gründungsregel für Konzerne bleibt unverändert (Entscheidung 30.10.2026).
- **Gewinnanteile wieder höher:** Gelenkt 10 %, Gemischt 15 %, Freie Marktwirtschaft 20 %, Laissez-faire 25 %. Reiche mit viel Handel zahlen voll aus, Reiche mit wenig Handel nicht mehr.
- **Firmen behalten 75 %** ihres Gewinns statt 50 %. Das restliche Viertel geht bei unabhängigen Firmen an den Pool, bei Konzernmitgliedern an den Konzern. Modellrechnung bis „groß“: Stadtfirma etwa 15 statt 33 Jahre, Landfirma etwa 7 statt 16 Jahre.
- **Fusion:**
  - Zwei Firmen desselben Typs und derselben Stufe auf einem Planeten werden eine Firma eine Stufe größer. Voraussetzung: Beide haben das Geld für den Ausbau, sind schuldenfrei, und der Ausbau scheitert nur an den Arbeitskräften.
  - Die reichere Firma bleibt mit ihrer Variante, Gleichstand entscheidet der Zufall. Sie bekommt das Geld beider. Weniger Jobs, ein Distriktplatz wird frei.
  - Gelenkte und gemischte Wirtschaft können Einspruch erheben (fünf Jahre Pause), die KI nie.
- **Kauf nur bei besetzten Staatsjobs:** Der Pool kauft einen Landdistrikt nur, wenn dessen Staatsjobs zu mindestens 90 % besetzt sind. Bei Stadt- und Habitatdistrikten gilt das für alle Fachkräftejobs des Planeten.
- **Kauf nur mit Arbeitern (0.45.2):** Kein Kauf, solange die Privatjobs des Planeten zu weniger als 90 % besetzt sind. Ein Stadtdistrikt bringt nur die Arbeiter seiner Spezialisierungen mit (100 je Spezialisierung); den Rest einer normalen Stadtfirma müssen freie Pops decken. Anlass: Auf Faenov Prime (2244) kaufte der Pool einen Stadtdistrikt ohne Spezialisierung, obwohl dort schon rund 430 Privatjobs leer waren.
- **Bauliste:** Kein Distriktkauf auf einem Planeten, solange dort ein Distrikt in der Bauliste steht. Er könnte den gekauften Distrikt ersetzen, etwa das letzte Farmdistrikt.
- **Spezialisierungsgebäude der Konzerne:**
  - Ein Konzern baut auf Planeten mit seinen Firmen die Mineralienaufbereitung, das Energienetz oder die Nahrungsverarbeitung. Er nutzt dafür eine vorhandene Spezialisierung oder legt Spezialisierung und Distrikt an.
  - Seit 0.45.1 bezahlt der Konzern immer alles. Der Staat pachtet es zehn Jahre lang für die Kosten plus 50 % Gewinn (Budgetzeile). Danach gehört es ihm, oder er löst die Pacht vorher zum Restwert ab.
  - Vorher (0.45.0) baute der Konzern nur, wenn sich der Mehrertrag der Privatjobs in zehn Jahren lohnte, und der Staat zahlte gegebenenfalls Spezialisierung und Distrikt. Die Pacht betrug Kosten plus 20 %.
  - Der Spieler wird immer gefragt, die KI nimmt an.
  - Das Gebäude steigert auch den Gewinn der passenden Firmen.
  - **Preis (0.45.4):** Die Kosten zählen die Mineralien zum Marktkaufpreis, nicht mehr zum Schattenpreis. Bei einem Mineralienüberschuss fällt der Schattenpreis weit unter 1 (Save 2248: 0,26). So kostete Distrikt, Spezialisierung und Energienetz (1700 Mineralien) nur 449 Handel, und die Pacht betrug 6 im Monat. Das Angebot nennt jetzt auch die Baukosten. Die Ablöse ist der noch offene Anteil der Baukosten, ohne den Gewinn des Konzerns.
- **Fusionsnachricht (0.45.4):** Sie nennt die übernehmende Firma, die übernommene und die neue, etwa „Fusion auf X: Private Mine hat Private Mine übernommen und ist jetzt Mittelständische Private Mine“.
- **Lieferverträge (0.45.4):**
  - Wachsen, Umziehen und Fusionieren beenden keinen Vertrag mehr. Eine Firma, die im Quartal wuchs oder umbaute, hatte bis zur nächsten Abrechnung kein Hauptprodukt, und ihre Abnehmer verloren den Lieferanten. Bei einer Fusion übernimmt die verbleibende Firma die Abnehmer der anderen.
  - Ein Abnehmer, der in eine Branche umbaut, die die Ware nicht braucht, verlässt den Vertrag still, ohne Wartezeit. Bisher blieb er gebunden und belegte einen Platz beim Lieferanten.

## Stand 0.44.0

**Bezahlung der Firmen** ([TESTS_0.44.md](docs/TESTS_0.44.md)):
- **Produktivität und Löhne:** Jeder Privatjob erzeugt zusätzlich +0,5 Handel und verbraucht 0,1 Konsumgüter mehr (bessere Bezahlung). Beides läuft in der Kategorie des Jobs, Boni der Kategorie gelten also auch dafür, und die KI-Wirtschaftsplanung sieht es. Unterm Strich etwa die Hälfte der Gewinnauszahlung unter Gemischt: Privatwirtschaft kostet weiter, aber weniger, und der zusätzliche Handel hebt den Auszahlungsdeckel. Die Lohn-Konsumgüter zählen nicht für die Defizit-Sperre und die Versorgungsprüfung.
- **Früher Deckel (0.44.1):** Von den ersten 100 Netto-Handel im Monat dürfen jetzt 60 % statt 40 % an die Privatwirtschaft gehen. Kleine Reiche zahlen früh mehr aus.
- **Startwarnung (0.44.1):** Die Schattenpreise haben ab dem ersten Monat ihre Grundwerte; error.log meldet beim Spielstart keine fehlenden `pe_s_*` mehr.
- **Flotte ohne Schiffsentwurf (0.44.3):** Hat das Reich gar keinen Entwurf, den ein Konzern bauen kann, kommt der Flottenvertrag (Krieg, Räumung, Konvoi, Schutz) nicht zustande: Die leere Flotte wird entfernt, der Konzern behält sein Geld, bezahlte Legierungen oder Einfluss kommen zurück, und du bekommst eine Nachricht. Beim Rüstungsauftrag kommen Legierungen und Gebühr zurück.
- **Lagervertrag (0.44.2):** Die Verlängerung wird angeboten, wenn der Bestand sechs Monate vor Ende noch 85 % des eigenen Lagers ohne Vertrag füllt. Vorher zählte das durch den Vertrag verdoppelte Lager, das ein langsamer Überschuss nie zu 85 % füllte. Der Vertrag lief deshalb ohne Vorwarnung aus, und der Bestand über dem eigenen Lager ging verloren. Die Lagergrenzen für Mineralien und Handelswert haben jetzt einen Namen im Tooltip.
- **Auszahlung aus dem Lager (nur KI):** Was der Deckel einer KI nicht auszahlt, zahlt sie aus ihrem Handelslager, soweit dort mehr als zwölf Monatszahlungen liegen. Für dich bleibt der Deckel unverändert.

## Stand 0.43.0

**Firmenstufen getrennt von der Spezialisierung** ([TESTS_0.43.md](docs/TESTS_0.43.md)):
- **Vier Stufen:** klein, normal, mittel, groß. „Normal“ entspricht einem Vanilla-Distrikt mit Spezialisierung. Die Jobs hängen nicht mehr von der Spezialisierung des Planeten ab.

| Arbeitskraft | klein | normal | mittel | groß |
|---|---|---|---|---|
| Landfirma (Mine, Kraftwerk, Farm) | 200 | 300 | 400 | 500 |
| Stadtfirma und Labor | 130 | 200 | 300 | 400 |
| Habitat ohne Void Dweller, alle Firmen | 130 | 200 | 300 | 400 |
| Habitat mit Void Dweller (Ursprung oder Voidborn), alle Firmen | 200 | 300 | 400 | 500 |

- **Neue Firmen** starten klein, gekaufte Distrikte werden normale Firmen. Kosten, Unterhalt, Räumung und Verstaatlichung richten sich nach der Größe relativ zu „normal“.
- **Labore auf Habitaten** zählen als Landfirma: Sie belegen einen Forschungsdistrikt und brauchen keine Forschungsspezialisierung mehr.
- **Bestehende Firmen** behalten ihre Stufe: Die bisherigen Stufen klein, mittel und groß heißen jetzt normal, mittel und groß. Stadtfirmen ändern sich dadurch nicht. Landfirmen haben normal immer 300 Jobs (vorher 200 plus 100 nur mit Spezialisierung), mittel 400 statt 450 und groß 500 statt 600.
- **Wachstum** kostet pro Stufe das Doppelte der Umbaukosten für die zusätzliche Größe (Stadt 375, Land 150, klein zu normal in der Stadt 263).

## Stand 0.42.4

**KI-Reiche stärken** ([TESTS_0.42.md](docs/TESTS_0.42.md)):
- **Wirtschaftsordnung der KI:**
  - Megakonzerne und egalitäre Reiche: Laissez-faire.
  - Fanatisch autoritäre Reiche: Gelenkt.
  - Autoritäre Reiche: Gemischt.
  - Alle anderen: Freie Marktwirtschaft.
- **Rüstungsaufträge der KI** schon ab halbvollem Lager oder 10.000 Legierungen, alle fünf Jahre.
- **Staatsanleihen (nur KI):** Privatkapital über 10.000 leiht der Pool einem KI-Staat zinslos. Unter 3.000 zahlt der Staat zurück. Spielerreiche sind nicht betroffen.
- **Lagervertrag:** +100 % Lagergrenze (0.42.4, vorher +20 %; laufende Verträge werden umgestellt), Gebühr 20 % der Nettoproduktion.
- **Firmenregister:** eigenes Fenster mit fester Höhe und Scrollleiste (0.42.3).
- **Konzern-Habitat:** Die Designation wird einmal fest gesetzt, auch wenn die automatische Designation schon passt (0.42.2).

## Stand 0.41.0

**Firmenlager und Rüstungsauftrag** ([TESTS_0.41.md](docs/TESTS_0.41.md)):
- **Firmenlager** sind jetzt Vorkommen statt Gebäude. Das Gebäude hatte sich eigene Spezialisierungs-Slots gesucht und dabei Spezialisierungen belegt oder angelegt.
- **Rüstungsauftrag:** Der Preis pro Schiff steigt mit Panzerungs-, Schild- und Reaktortechnik. Im späten Spiel kostet ein Schlachtschiff etwa 4.400 statt 1.200.

## Stand 0.40.2

**Absturz beim Laden behoben:** Seit 0.36.8 setzte die Engine beim Laden die Versorgungsprüfung für alle 80 Firmenvarianten bei jedem Kandidaten neu ein. Die Mod wuchs dadurch auf etwa das 50-Fache, und das Spiel stürzte vor dem Hauptmenü ab. Jede Variante prüft jetzt nur sich selbst. Der Validator kontrolliert diese Größe ([TESTS_0.40.md](docs/TESTS_0.40.md)).

## Stand 0.40.0

**Buchhaltung und Erklärbarkeit** ([TESTS_0.40.md](docs/TESTS_0.40.md)):
- **Gewinnauszahlung ohne Zeitversatz:** Firmen buchen ihren Gewinn wie bisher zur Quote des Vorquartals. Die Differenz zur neuen Quote verrechnet der Investorenpool, und Ersparnisse bekommt er zur Quote, die der Staat wirklich zahlt. Es entsteht und verschwindet kein Handel mehr. Ein Preiskampf senkt den Gewinn jetzt schon vor der Auszahlung, der Staat zahlt also auch weniger.
- **Neuer Deckel:** Gewinne und Ersparnisse dürfen einen gestaffelten Anteil des Netto-Handels kosten, den das Reich ohne sie hätte: 40 % der ersten 100 im Monat, 70 % der nächsten 200, 85 % von allem darüber. Die Handelsbilanz rutscht dadurch nie ins Minus, und eine große Handelswirtschaft investiert deutlich mehr. Monopol- und Katastrophenhilfe-Faktor liegen jetzt innerhalb des Deckels.
- **Holdings im Krieg:** Die Holdings mit Zitadelle treten jedem unserer Kriege bei, auch einem zweiten.
- **Kaufangebot:** Bei der Annahme wird erneut geprüft, ob der Planet noch uns gehört, die Wirtschaftsordnung den Kauf erlaubt und dem Staat ein Distrikt des Typs bleibt. Sonst ist das Angebot hinfällig.
- **Firmenregister erklärt:** Es zeigt jetzt, warum die Investoren auf dem Planeten gründen oder nicht, für jede Firma den Gewinn des letzten Quartals und was sie tut (baut aus, spart, wartet auf Arbeiter, zahlt Kredit ab …), dazu die aktuelle Auszahlungsquote und den Deckel.

## Stand 0.39.0

**Volle Lager** ([TESTS_0.39.md](docs/TESTS_0.39.md)):
- **Lagervertrag:** Ist ein Lager zu 95 % voll, bietet eine Firma an, den Überschuss zu lagern. Das bringt fünf Jahre lang +20 % Lagergrenze und kostet jeden Monat 5 % der Nettoproduktion dieser Ressource. Ein Firmenlager-Gebäude steht auf ihrem Planeten. Vor Ablauf gibt es ein Verlängerungsangebot.
- **Rüstungsauftrag:** Höchstens alle zehn Jahre baut ein Konzern aus der Hälfte eines vollen Legierungslagers Kriegsschiffe auf eigenen Werften, gegen einen Aufpreis in Handel. Die Schiffe werden nach einem Jahr geliefert.
- **Umbau:** Die Pause gilt jetzt pro Firma (zehn Jahre, bei knappen Vorprodukten zwei). Pro Planet ist nur noch ein Jahr Abstand nötig.
- **Über der Quote:** Bei Arbeitslosigkeit fragen die Investoren dich in einem Fenster: erlauben, gegen Lizenzgebühr erlauben oder ablehnen.

## Stand 0.38.0

**Wirtschaft im späten Spiel** ([TESTS_0.38.md](docs/TESTS_0.38.md)):
- **Arbeitslosigkeit:** Solange Pops arbeitslos und Plätze frei sind, gründen Investoren über die Quote der Wirtschaftsordnung hinaus (eine Firma je 200 Arbeitslose). Ab 600 Arbeitslosen dürfen zwei Baustellen gleichzeitig laufen.
- **Legierungen und Mineralien:** Legierungen bleiben bei vollem Lager mindestens halb so viel wert wie ihr Grundwert. Firmen, die eine knappe Ressource verbrauchen, dürfen schneller umbauen (ein Jahr statt fünf, ein Drittel der Gewinnschwelle).
- **Sanierung:** Konzernkredite an eigene Firmen kosten 1 % statt 3 %. Kann eine Firma vier Quartale lang die Zinsen nicht verdienen, saniert sie der Konzern. Bei dir geschieht das per Event „Ein Sanierungsfall“: Schulden gegen Anteile, Staatsbürgschaft oder Insolvenz.


**0.37.1:** Labore auf Habitaten erkennen jetzt alle Forschungszonen des Vanilla-Sets `habitat_research`, auch Physik, Gesellschaft und Ingenieurwesen. Vorher konnten auf solchen Habitaten nie Labore entstehen.

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
- **Umbau** nur, wenn die neue Firma klar mehr wert ist und danach nichts knapp wird, was die alte gemacht hat. Eine Firma baut frühestens nach 10 Jahren um (bei knappen Vorprodukten nach 2), ein Planet höchstens einmal im Jahr. Eine Firma, die Wert vernichtet oder verbraucht, was in unter einem Jahr ausgeht, schon nach einem Jahr, notfalls mit einem Kredit des Investorenpools (0.47).
- **Freie Pops:** Gründung und Wachstum brauchen Zivilisten minus offene Jobs minus Baustellen-Jobs, mindestens 50. Eine fertige Baustelle öffnet erst, wenn Arbeiter da sind.
- **Gewinne und Ersparnisse** zusammen höchstens ein gestaffelter Anteil des Netto-Handels ohne sie (60 % der ersten 100 im Monat, seit 0.44.1; 70 % der nächsten 200, 85 % darüber); was der Staat nicht zahlt, bekommen Firmen und Pool auch nicht.
- **Kosten** wie für den Staat. Finanziert über private Ersparnisse (Anteil am Handelseinkommen, nach Ordnung) und Kredit (40 % Anzahlung, Rest aus dem Firmengewinn).
- **Abwechslung** durch Pseudo-Zufall, Diversifikation und Spezialisierung.
- **Räumen:** Unter gelenkter und gemischter Wirtschaft kann der Spieler Firmen und Baustellen wie Blocker für Influence räumen; unter Gemischt zusätzlich mit Entschädigung in Handel und mit Unmut.
- **Umzug:** Hat ein Planet keine freien Pops (oder fehlt Wohnraum bzw. fehlen Annehmlichkeiten), ziehen unpassende Firmen samt Arbeitern auf Planeten mit passender Spezialisierung. Die Hauptstadt gibt nur ab, wenn 2/3 ihrer Distriktplätze bebaut sind, oder bei Mangel. Von einem Planeten zieht höchstens alle 3 Jahre eine Firma weg.
- **Mäzene:** Reiche Privatleute geben überschüssiges Pool-Kapital aus. Es sind durchgehende Figuren mit Ruf. Die Ergebnisse wachsen mit dem Einsatz. Die Events: Galas, Stiftungen, Prototypen, Wohltätigkeit, Anwerbung, Prospektion, Hydroponik, Kunst, Sport, Parteispenden, Kolonisten, Universitäten, Tourismus, Katastrophenhilfe.
- **Arbeitskräfte-Events:** Bleiben private Arbeiterjobs leer, gibt es Sonderschichten, Gastarbeiter, Maschinen-Leasing, Streiks, Werkswohnungen, Roboter-Startups, eine Landprämie (private Arbeiterjobs schlagen Spezialisten) oder Familienförderung; auch sie wachsen mit dem Einsatz.
- **Konzerne:** Aus großen Firmen werden benannte Konzerne mit Hauptsitz, Kasse und Vorstand. Sie übernehmen kleinere Firmen, führen Preiskämpfe und fusionieren (mit deiner Genehmigung). Seit 0.45 bauen sie Spezialisierungsgebäude und verpachten sie uns.
- **Firmenfusion (0.45):** Fehlen für den Ausbau nur Arbeitskräfte, werden zwei gleiche Firmen eines Planeten zu einer größeren.
- **Konzern-Stationen:** Konzerne bauen oder kaufen Orbitalstationen (gewöhnliche Rohstoffe, nach Wirtschaftsordnung begrenzt), gehalten von den Private Holdings des Reichs. Sie verarbeiten den Ertrag effizienter (140 %): Davon zahlen sie den Unterhalt ihrer Megastrukturen, liefern uns 120 % des Werts in ihrem eigenen Produkt (Zeile des Hauptsitz-Vorkommens) und behalten 20 % als Marge.
- **Konzernflotten:** Im Krieg verleasen Industriekonzerne Flotten (5 Jahre, 10 % Gebühr, danach kaufen oder zurückgeben). Gegen Weltraumkreaturen an der Grenze stellen Konzerne Flotten gegen die Beuterechte (bei KI-Reichen startet die Flotte direkt bei den Kreaturen).
- **Lieferketten:** Private Minen, Fabriken und (bei katalytischer Verarbeitung) Farmen beliefern Stahlwerke, Fabriken, Labore, Handels- und Medienhäuser. Der Abnehmer wählt den größten und reichsten Lieferanten mit freiem Platz (je Stufe ein Abnehmer). Beide Branchen erzeugen +5 %, der Lieferant verdient +5 % je Abnehmer, der Abnehmer +10 %. Bei einem Defizit baut ein Abnehmer mit Vertrag später um (0.46).
- **Weitere Konzern-Angebote:** Erkundungscharta (Forschungsschiff gegen Schürfrechte), Konvoischutz gegen Piraten, Schutzflotten für bombardierte Planeten (gegen Firmen, Legierungen oder Einfluss; für den eigenen Hauptsitz kostenlos), Bergung von Trümmerfeldern, eigene Dyson-Schwärme und Arc Furnaces (gebaut wie in Vanilla: Baustelle der Holdings mit Vanilla-Bauzeit; der Konzern zahlt Bau, Ausbau und Unterhalt und wählt einen mittleren Standort; beim Ofen bekommt er die Himmelskörper ohne früheres Vorkommen, die übrigen bleiben beim Reich); Mäzene spenden Schiffe nach Verlusten.
- **Firmenregister:** Planeten-Entscheidung, die zeigt, welche Firma zu welchem Konzern gehört, was jede Firma im letzten Quartal verdient und getan hat, warum auf dem Planeten gegründet wird oder nicht, und wie viel der Staat von den Gewinnen auszahlt.
- **Kredite:** Konzerne verleihen aus ihrer Kasse für Wachstum und gegen Verluste (3 % Zins pro Quartal, Kreditlinie −200). Ausfälle treffen den Gläubiger; ein Konzern im Minus verkauft Firmen.
- **Bombardement:** Firmen bombardierter Planeten verlieren Kapital (0,1–0,3 % je Punkt Verwüstung und Monat), selten Stufen bis zur Zerstörung (Trümmer); danach drei Jahre Kriegsgebiet ohne neue Investitionen; Konzerne bauen ihre Firmen wieder auf, unabhängige gegen einen Zuschuss.
- **Eroberung:** Geht ein Planet an ein anderes Reich, gehen seine Firmen mit; Konzernbindungen und Kredite enden, ein Konzern mit Hauptsitz dort zieht mit um (oder wird aufgelöst, wenn das neue Reich keinen Platz hat). Ohne Privatwirtschaft beim neuen Besitzer werden die Firmen Staatsdistrikte. Stationen und Megastrukturen der Holdings folgen dem Gebiet.
- **Besatzung und Bodenkampf:** Firmen besetzter Planeten stehen still, der Besatzer erhebt Kontributionen; nach der Befreiung bestrafst, begnadigst oder enteignest du Kollaborateure. Ein besetzter Konzernsitz friert die Kasse ein und zieht nach fünf Jahren womöglich um. Bei einer Invasion schicken Konzerne Werkschutz (für den eigenen Sitz kostenlos, sonst gegen Firmen, Legierungen oder Einfluss).
- **Spezialisierungen und Habitate:** Firmenjobs hängen nicht von Spezialisierungen ab (seit 0.43, Stufen siehe oben). Landfirmen lassen dem Staat immer einen Distrikt des Typs, damit eine Spezialisierung möglich bleibt. Auf Habitaten belegen Firmen Habitat-Distrikte: Stadtfirmen den Wohndistrikt, Labore einen Forschungsdistrikt, Minen und Kraftwerke ihren Distrikt, Farmen den Energiedistrikt (nur mit Hydroponik); Kosten in Legierungen.
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
- **Gefunden im Save Hesukaran 7 (2287), Stand 29.10.2026:** Schutzflotte ohne passenden Schiffsentwurf: Ersatzklasse seit 0.34.3. Kredite eines aufgelösten Konzerns: erledigt (Auflösung und Übernahme streichen sie). Rohstoffkonzerne horten Kasse: für später; eine Verwendung sind seit 0.45 die Spezialisierungsgebäude. Leere Flotte ohne jeden Entwurf: erledigt (0.44.3).
- **Gefunden im Save Andari (2235, 29.10.2026): keine Konzerne.** Einen Konzern gründet nur eine Firma der Stufe 3; seit 0.43 starten Firmen klein und wachsen ohne freie Pops nicht. In 35 Jahren entstand in der ganzen Galaxis kein Konzern. Nach dem Testspiel Cevantian (2241, 30.10.2026) entschieden: Die Gründungsregel bleibt. Stattdessen sollen mehr Firmen aufsteigen (0.45: höhere Gewinnanteile, 75 % für die Firma, Fusion).
- **Nächste Schritte**: Kalibrierung von Gewinn, Kosten und Gewichten; Firmen forschen an ihrem Sektor, Techs schalten Varianten frei; Firmennamen.
- **Volle Lager (27.10.2026):** Rüstungsauftrag und Lagervertrag sind in 0.39 umgesetzt. Verworfen: Modernisierung der Verteidigung und Werftausbau durch Konzerne.
- **Längere Lieferketten (Supply Chains):** mehrstufige Wertschöpfung zwischen Firmen (Vorprodukte, Zulieferer), gemerkt am 27.10.2026. Aus dem Review: mit begrenzten Abhängigkeiten, also Ausfällen, Ersatzlieferanten und Versorgungssicherheit statt eines dauerhaften Bonus.
  - Umgesetzt in 0.46.0 (Lieferantenwahl, Kapazität, Gewinn, Versorgungssicherheit). Ausfälle einzelner Lieferanten: verworfen, zu kleinteilig. Offen bleibt die mehrstufige Wertschöpfung.
- **Erweiterungen aus dem Review (27.10.2026):**
  - **Staatliche Ausschreibungen:** Wir setzen Anreize für benötigte Legierungen, Forschung oder Versorgung, und die Firmen entscheiden, ob sie investieren.
  - **Konzernprofile und Branchentechnologien:** Konzerne unterscheiden sich durch Spezialisierung, Risikobereitschaft und Investitionsverhalten (passt zu „Firmen forschen an ihrem Sektor“).
  - **Lobbys mit Interessenkonflikten:** Ein Konzern fordert Privilegien und bietet dafür Leistungen (ergänzt die beschlossenen Lobbys).
  - **Gezielte Krisen:** Kreditkrisen, Überkapazitäten und Rettungsentscheidungen, erst wenn die Buchhaltung stabil läuft (Sanierung und Lagerverträge seit 0.38/0.39 sind ein Anfang).
  - **Ökumenopolis und andere Umwandlungen:** Jeder neue Planetentyp braucht eine festgelegte Behandlung der Firmen, die schon dort sind.
- **Danach (beschlossen):** Lobbys der Branchengruppen (bauen auf den Konzernen auf); private Werften erst, wenn klar ist, was sie spielerisch bringen.
- **Konjunkturzyklus:** erst, wenn die Wirtschaft stabil läuft.
- **Aufräumen:** alter Holdings-Prototyp (pe.15-21) und diese Weltraum-Zeile sind überholt.
- **Noch nie im Spiel getestet:** Konvoischutz, Bergung, Schiffsspenden der Mäzene, Konzern-Automatisierung, Liefervertrag (zwei Jahre), Trümmer und Wiederaufbau, Besatzung und Kollaboration.
- **Prototyp Hilfsreich:** [docs/TESTS_PROTO_HOLDINGS.md](docs/TESTS_PROTO_HOLDINGS.md) (Konsole `event pe.15` bis `pe.21`).
- **Weltraum (Ideen):** private Stationen und Kilostrukturen über ein Hilfsreich mit Leasing, Spenden von Schiffen durch Mäzene nach Verlusten, Konzernflotten über ein Hilfsreich, private Werften.
- **Erledigt (0.45): Spezialisierungsgebäude durch Konzerne** (Regeln 29./30.10.2026, im Spiel noch ungetestet). Pacht als Mietkauf über zehn Jahre in Handel, immer gezahlt. Der Gebäudebonus kommt im Firmengewinn an. Im Spiel bestätigt (30.10.2026): Distrikt, Spezialisierung und Gebäude entstehen auf einmal. Seit 0.45.1 (30.10.2026) zahlt der Konzern alles, die Pacht bringt ihm 50 % Gewinn; es gibt keine Zusatzzahlung des Staates mehr.
- **Erledigt (0.45): Sperre bei Distrikten in der Bauliste** (30.10.2026). Bestätigt: Ein Ersetzen (Bergbau- durch Stadtdistrikt) löst `on_district_queued` aus.
- **KI in einem neuen Spiel beobachten (27.10.2026):** Vergleich 2301 → 2304 zeigte Fortschritt bei Militär und Firmenzahl, aber kaum mehr Legierungen; Staatsanleihen landen ungenutzt im Handelslager, Gewinnauszahlung bei kleinen KIs nur 21–39 %.
- **Effizienzbonus der Konzernstationen prüfen (27.10.2026, niedrige Priorität seit 29.10.2026, vorerst bleibt es so):** Stationen erzeugen 140 % des Vanilla-Werts, 120 % gehen an uns, 20 % sind Marge. Damit kostet Privatwirtschaft dort nichts und bringt dem Staat sogar mehr; vermutlich zu stark. Neu kalibrieren, sodass Privatisierung auch bei Stationen einen spürbaren Preis hat.
- **Erledigt (0.43): Neue Firmenstufen, getrennt von der Spezialisierung** (beschlossen 28.10.2026, im Spiel noch ungetestet).
- **Erledigt (0.44): Bezahlung der Firmen** (beschlossen 28.10.2026, im Spiel noch ungetestet): Handelszahlung bleibt, dazu Handel und Lohn-Konsumgüter auf Privatjobs und für die KI Zahlung aus dem Lager. Verworfen: Effizienzbonus auf Jobs wie bei den Stationen (Privatwirtschaft hätte keine Kosten mehr) und eine Marge über dem Bonus (schwächt die Wirtschaft stärker als heute). Noch offen: dasselbe Konzept (Produktivität als Handel, bessere Löhne als Konsumgüter) bei den Konzernen durchdenken, zusammen mit dem Effizienzbonus der Stationen.
- **Gemerkte Ideen, noch offen:**
- **Verworfen:** Spezialisten-Automatisierung (gibt es im Spiel sonst auch nicht); Besetzungsquote pro Firma statt pro Planet (28.10.2026: eine volle Firma darf nicht wachsen, während dem Planeten Arbeitskräfte fehlen); freie Pops nur gegen offene Privatjobs rechnen (Zivilisten verteilen sich oft lange nicht auf offene Jobs); Rationalisierung als eigene Firmenstufe, etwa eine schlanke Firma mit weniger Jobs (29.10.2026).
- **Erledigt aus den gemerkten Ideen:** Anwerbekampagne (pe.205), Robotik (pe.231), Modernisierung (pe.262), Rationalisierung als Event (pe.263), Kapitalertragssteuer als Vermögensabgabe (pe.264).
- **v0.3**: Privatgebäude, Technologieabhängigkeit (Techs schalten Firmenjobs frei, Firmen subventionieren benötigte Techs), Spielerhebel (Steuern, Subventionen, Regulierung, Verstaatlichung).

Ziel: Die Privatwirtschaft soll gut genug entscheiden, dass sie auch KI-Reichen hilft.
