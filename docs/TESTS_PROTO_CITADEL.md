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

## Konsole (Scope: dein Reich)
- `event pe.310`: Die Holdings bekommen die Technologie und eine Deep Space Citadel (Stufe I) in deinem Hauptsystem, wie beim Ursprung „Starlit Citadel“.
- `event pe.311`: Die Citadel wird an dich verleast: Die Kontrolle über ihre Flotte geht an dich (`set_controller`), dazu der Leasing-Modifikator der Konzernflotten (Unterhalt −100 %, die Engine kappt bei 90 %).
- `event pe.312`: Die Citadel wird dir übergeben (`set_owner`), dazu der Modifikator „Prototyp: Unterhalt der Zitadelle“ auf ihrer Flotte (`ships_upkeep_mult` und `starbases_upkeep_mult` je −100 %).
- **Vorher speichern, danach neu laden.** Der Prototyp räumt nichts auf.

## Ablauf
1. Speichern. `event pe.310`, einen Tag laufen lassen.
   - Steht im Hauptsystem eine zweite Station, eine Deep Space Citadel mit der Flagge der Holdings?
   - Im game.log: „pe.310 deep space citadel created“ oder „create_starbase failed“.
2. Vorher den Energie- und Legierungs-Tooltip ansehen (Zeilen „Starbases“ und „Ships“). Dann `event pe.311`, einen Tag laufen lassen.
   - Wie sieht die Citadel jetzt aus: deine Flagge, besetzt, Holdings?
   - Kannst du sie anklicken oder ausbauen?
   - Steht ihr Unterhalt in deinem Haushalt, und ist er durch den Modifikator auf etwa 10 % gesenkt? Die Citadel kostet 10 Energie und 5 Legierungen im Monat.
   - Im Krieg (falls möglich): Schießt sie auf deine Feinde?
3. Neu laden. `event pe.310`, dann `event pe.312`.
   - Gehört die Citadel jetzt dir: Flagge, ausbaubar?
   - Ist ihr Unterhalt in deinem Haushalt durch den Modifikator gesenkt? Ist er unter „Starbases“ oder unter „Ships“ verbucht?
4. Logs: Fehler zu `create_starbase`, `set_controller` oder `set_owner` im error.log.

## Danach
- **Leasing funktioniert:** Die Citadel gehört dem Konzern (Holdings) und steht dir zur Verfügung, wie die Konzernflotten.
- **Sonst:** Der Konzern baut sie für uns und übergibt sie (`set_owner`). Bau und Unterhalt zahlt er.
