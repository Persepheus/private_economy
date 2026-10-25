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

## Konsole (Scope: dein Reich)
- `event pe.310`: Die Holdings bekommen Technologie und Citadel im Hauptsystem (wie beim Ursprung „Starlit Citadel“).
- `event pe.311`: **Variante A.** Leasing an dich: Kontrolle über ihre Flotte (`set_controller`), dazu der Leasing-Modifikator (Unterhalt −100 %, Engine kappt bei 90 %).
- `event pe.312`: **Variante B.** Eine Citadel, die von Anfang an dir gehört, dazu der Unterhalts-Modifikator auf ihrer Flotte. Dafür brauchst du die Technologie Deep Space Citadel.
- **Vorher speichern, danach neu laden.** Der Prototyp räumt nichts auf.

## Ablauf
1. Speichern. Energie- und Legierungs-Tooltip merken (Zeilen „Starbases“ und „Ships“). Die Citadel Stufe I kostet 10 Energie und 5 Legierungen im Monat.
2. `event pe.310`, einen Tag laufen lassen. Die Citadel der Holdings steht im Hauptsystem.
3. `event pe.311`, einen Tag laufen lassen (game.log: „leased …: 1“).
   - Flagge oder Besetzungsanzeige?
   - Kannst du sie anklicken, steuern, ausbauen?
   - Steht ihr Unterhalt bei dir, und ist er auf etwa 10 % gesenkt?
   - Im Krieg: Schießt sie auf deine Feinde?
4. Neu laden. `event pe.312`, einen Tag laufen lassen (game.log: „our own citadel …: 1“).
   - Gehört sie dir?
   - Ist ihr Unterhalt gesenkt? Ist er unter „Starbases“ oder „Ships“ verbucht?
5. Logs: Fehler zu `spawn_megastructure`, `set_controller` oder `add_modifier` im error.log.

## Danach
- **A funktioniert:** Die Citadel gehört dem Konzern (Holdings), du kontrollierst sie geleast.
- **Sonst B:** Der Konzern bezahlt Bau und Unterhalt, die Citadel gehört uns.
