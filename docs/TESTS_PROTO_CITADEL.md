# Prototyp Konzern-Zitadelle (Deep Space Citadel) – Testablauf

**Frage:** Kann ein Konzern (über unsere Private Holdings) eine Deep Space Citadel in unserem System besitzen und an uns verleasen? Und wenn nicht: Lässt sie sich uns übergeben?

**Hintergrund:**
- Die Deep Space Citadel ist eine eigene Sternenbasis, zusätzlich zur normalen.
- Vanilla baut sie als Megastruktur: Stufe I in 3 Jahren für 2.500 Einheit und 1.000 Legierungen. Ausbau auf Stufe II und III wie eine Sternenbasis.
- Sie gehört dem Erbauer.
- Laut Engine-Dokumentation ist `set_controller` auf eine Sternenbasis eine **Besetzung**, kein Leasing. Was das bei einer Station der eigenen Holdings bedeutet, zeigt erst der Test.

## Erster Test (gescheitert) und was geändert ist
- `create_starbase` braucht für eine Deep Space Citadel einen globalen Schiffsentwurf. Ohne kam keine Station (error.log: „designable but no design was provided“).
  - Jetzt bringt die Mod den Entwurf „Konzern-Zitadelle“ mit (Grundkomponenten: Punktabwehr, Massebeschleuniger, Hangars, Panzerung, Schilde).
- `set_controller` wirkt nur auf die Flotte der Station, nicht auf die Sternenbasis selbst (error.log: „Wrong scope“).
- Der Absturz bei pe.312 kam vermutlich vom `set_owner` auf die nicht entstandene Station.

## Zweiter Test (gescheitert)
- Mit eigenem Entwurf entstand ein kaputtes Objekt. Im Spiel-Log stand „Fleet in system state but missing origin, went MIA“, danach stürzte das Spiel bei pe.312 ab.
- Ursache: `create_starbase` legt eine Sternenbasis am Stern an; eine Deep Space Citadel als zweite Basis im System bekommt so keine Position.

## Dritter Anlauf
- So, wie Vanilla beim Ursprung „Starlit Citadel“ eine Citadel erzeugt:
  1. Die Holdings bekommen die Technologie Deep Space Citadel und damit einen Entwurf.
  2. Dann entsteht die Megastruktur `deep_space_citadel_0` am Stern, im inneren Bahnradius.
  3. Danach existiert die Citadel als Flotte der Holdings.
- Verleast bzw. übergeben wird diese Flotte.

## Dritter Test
- **Die Station entstand** und gehörte den Holdings.
- pe.311 und pe.312 fanden sie nicht wieder: Die globale Merkvariable aus pe.310 war im nächsten Event weg.
- Nach dem Neuladen (pe.310 → pe.312 in einem Zug) stürzte das Spiel bei `set_owner` ab. Eine Citadel der Holdings an uns zu **übergeben, ist nicht möglich.**

## Vierter Anlauf
- Die Citadel wird über eine Flotten-Markierung wiedergefunden.
- Getestet werden zwei Varianten:
  - **A, Leasing:** Die Holdings besitzen die Citadel, wir kontrollieren sie.
  - **B, unsere Citadel vom Konzern bezahlt:** Sie gehört von Anfang an uns.

## Vierter Test
- **A, Leasing:** geht nicht.
- **B:** Die Citadel gehört uns, aber der Unterhalts-Modifikator auf ihrer **Flotte** wirkte nicht.

## Fünfter Anlauf (nur B)
- `event pe.312`: unsere Citadel, Unterhalts-Modifikator auf ihrer **Sternenbasis**.
- `event pe.313`: unsere Citadel, Unterhalts-Modifikator auf ihrem **Schiff**.
- Beide brauchen die Technologie Deep Space Citadel. Jedes Mal vorher neu laden.
- **Prüfen:**
  - Steht „Prototyp: Unterhalt der Zitadelle“ in der Ansicht der Citadel?
  - Sinkt ihr Unterhalt (10 Energie, 5 Legierungen im Monat) in den Zeilen „Starbases“ bzw. „Ships“ des Haushalts auf etwa 10 %?
