# Version 0.36 – Testablauf: Konzern-Zitadelle

Ein laufendes Spiel kann weiterlaufen.

## Was neu ist
- **Holdings mit unseren Technologien:** Bei jeder neuen Technologie unseres Reichs und jedes Quartal kopieren unsere Private Holdings unsere Technologien (`copy_techs_from`). So haben sie die Entwürfe für Citadel und Plattformen.
- **Angebot (pe.315):**
  - Voraussetzung ist unsere Technologie Deep Space Citadel.
  - Jeder Konzern, der das Dreifache der Kosten (34.500) hat, kann in seinem wichtigsten System eine Citadel bauen.
  - Zufällig unter ihnen gewählt, mit 20 % je Quartal und höchstens einem Angebot je Quartal; danach hat dieser Konzern zwei Jahre Pause.
  - Menschliche Reiche bekommen das Angebot, unter Laissez-faire und als KI ohne Nachfrage.
- **System, in dieser Reihenfolge:**
  1. Hauptsitz.
  2. Konzern-Habitat.
  3. Dyson-Schwarm oder Arc Furnace.
  4. Ein System mit mindestens zwei seiner Stationen.

  Höchstens eine Citadel **je Konzern und System**. Bei zwei Hauptsitzen in einem System darf jeder Konzern seine bauen. Das System muss uns gehören und eine Sternenbasis haben.
- **Bau:**
  - Eine Baustelle der Holdings mit der Vanilla-Bauzeit (3 Jahre).
  - Danach entsteht die Vanilla-Citadel (wie beim Ursprung „Starlit Citadel“). Sie gehört den Holdings, also dem Konzern; du kannst sie nicht ausbauen oder abreißen.
- **Ausbau:** Stufe II und III, wenn der Konzern das Dreifache der Kosten hat (25 % je Quartal), mit Vanilla-Bauzeit (3 bzw. 4 Jahre).
- **Verteidigungsplattformen:** 4 je Stufe, solange der Konzern es sich leisten kann (je 500, ab 1500 Kasse).
- **Kosten** aus seiner Kasse (Legierungen ×4, Einheit ×3): Stufe I 11.500, II 17.500, III 35.000.
- **Unterhalt:**
  - Stufe I 10 Energie und 5 Legierungen, II 15/10, III 30/20, je Plattform 2 Energie im Monat.
  - Die Holdings bekommen ihn für drei Monate; der Konzern zahlt den Gegenwert. Bei uns erscheint nichts.
- **Krieg:** Sind wir im Krieg und haben die Holdings eine Citadel, treten sie unseren Kriegen auf unserer Seite bei, jeden Monat geprüft.
- **Ende:**
  - Löst sich der Konzern auf oder gehört das System nicht mehr uns, übernimmt der reichste andere Konzern die Citadel (Nachricht).
  - Gibt es keinen, oder gehört das System nicht mehr uns, wird sie stillgelegt.
- **Firmenregister:** „Zitadellen n“ je Konzern.

## 0.36.1
- Jeder Konzern, der es sich leisten kann, kann eine Citadel bauen (zufällig unter ihnen, eigene Pause je Konzern); bisher nur der reichste.
- Eine Citadel **je Konzern und System**: Zwei Hauptsitze in einem System erlauben zwei Citadels. Das Vanilla-Limit je System gilt für Konzern-Zitadellen nicht.
- Gleichzeitige Baustellen zweier Konzerne im selben System stören sich nicht (die Konzerndaten stehen auf der Baustelle selbst).

## 0.36.2
- **Baustelle sichtbar:** Sie hatte kein eigenes Modell; ein Ausbau zeigt das Modell der aktuellen Stufe. Jetzt hat sie das Bau-Modell der Citadel.
- **Ausbau mit Entwurf der neuen Stufe:** `set_starbase_size` ändert die Stufe, behält aber den Entwurf der alten. Deshalb hatte deine Stufe III die Werte und Waffen von Stufe I.
  - Jetzt bekommt das Citadel-Schiff selbst (nicht die Plattformen) den Entwurf seiner Stufe (`set_ship_design`).
  - Bestehende Citadels mit falschem Entwurf werden am nächsten Quartal repariert.
  - Haben die Holdings keinen Entwurf für Stufe II/III, steht das im error.log.
- **Meldung beim Baubeginn** auch unter Laissez-faire und ohne Nachfrage („baut im System … eine eigene Deep Space Citadel“).
- **Gastarbeiter (pe.211) und Kolonisten (pe.223):** Der Tooltip der Option zeigte 0 Pops, weil die Zahl erst beim Ausführen auf den Planeten geschrieben wurde. Es kamen trotzdem die richtigen Pops. Jetzt steht die Zahl schon im Tooltip.

## Konsole
- `event pe.317`: sofort ein Angebot (der reichste Konzern bekommt mindestens 34.500 Kasse, damit es einen Kandidaten gibt). Voraussetzung ist unsere Technologie Deep Space Citadel.
- `event pe.318`: Bau der Konzern-Zitadellen sofort fertig; ein laufender Ausbau wird am nächsten Quartal fertig.

## Prüfen
1. `event pe.317`: Kommt das Angebot mit Konzern und System (Hauptsitz-System des reichsten Konzerns)?
2. Annehmen: Baustelle „Konzern-Zitadelle (im Bau)“ im System; die Konzernkasse ist 11.500 kleiner.
3. `event pe.318`, einen Tag laufen lassen: Die Citadel der Holdings steht da; am nächsten Quartal kommt die Nachricht „ist fertig“.
4. Nach ein paar Quartalen: Plattformen an der Citadel; bei einem reichen Konzern beginnt der Ausbau auf Stufe II (`event pe.318` und ein Quartal warten). Wird die Citadel richtig zu Stufe II?
5. Im Krieg: Stehen die Holdings auf deiner Seite, kämpft die Citadel mit?
6. Logs: keine Fehler aus pe_citadel_effects.txt, pe_megastructures.txt (pe_corp_citadel_build), pe_citadel_events.txt; im game.log „corporate citadel: slot …“.

## Offen (erst im Spiel prüfbar)
- Ob der Ausbau per `set_starbase_size` auf Stufe II/III sauber funktioniert. Vanilla hat nur eine Citadel-Megastruktur (`deep_space_citadel_0`, den Bau); Stufe II und III sind Sternenbasis-Stufen der Citadel (`next_level`) und werden wie eine Sternenbasis ausgebaut, nicht wie ein Dyson-Schwarm.
- Ob die Holdings Plattformen-Entwürfe haben (sonst entstehen keine Plattformen und es kostet nichts).
