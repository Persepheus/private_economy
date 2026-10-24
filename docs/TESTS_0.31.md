# Version 0.31 – Testablauf: Konzern-Habitat

Ein laufendes Spiel kann weiterlaufen.

## Was neu ist
- **Angebot:** Ein Konzern ohne Habitat mit mindestens 7000 Kasse will ein eigenes Habitat bauen.
  - Bedingungen: Habitat-Technologie, Laissez-faire, Freie Marktwirtschaft oder Gemischt, genug Einfluss.
  - Es kommt mit 20 % je Quartal, danach vier Jahre Pause.
  - Menschliche Reiche bekommen das Angebot pe.300, KI-Reiche entscheiden ohne Fenster. KI-Reiche halten dabei die Vanilla-Obergrenze für Habitate ein.
- **Kosten:**
  - Der Konzern zahlt die Legierungen: 1500, also 6000 aus seiner Kasse.
  - Wir zahlen den Einfluss wie in Vanilla: 200 mit unseren Megastruktur-Kostenmodifikatoren.
- **Standort nach Konzern:**
  - Energie und Landwirtschaft: das System mit den meisten Habitat-Energieplätzen (aus den Vorkommen des Systems).
  - Bergbau: die meisten Bergbauplätze.
  - Wissenschaft und Medien: die meisten Forschungsplätze.
  - Industrie und Handel: das System, in dem das Habitat am größten werden kann (große Himmelskörper mal Habitat-Technologien, bei Leerenbewohnern auch kleine).
  - Gleichstand und Systeme ohne passende Vorkommen entscheidet die Größe.
  - Es gelten die Vanilla-Regeln: eigenes System mit Sternenbasis, noch kein Habitat, keine Ruine, keine Trümmer.
- **Bau wie in Vanilla:**
  - Unsere Private Holdings bauen das Habitat für den Konzern, mit der Bauzeit eines Habitats (fünf Jahre) und unserer Megastruktur-Baugeschwindigkeit.
  - Danach erscheint das Vanilla-Habitat.
  - Der Konzern besiedelt es mit unserer Hauptspezies, mit Vanilla-Besiedlung und dem Kolonieschiff (800) aus seiner Kasse.
  - Das Habitat heißt nach dem Konzern („Habitat <Konzern>“).
- **Rechte des Konzerns:**
  - Er legt die Designation nach seinem Produkt fest, jeden Monat.
  - Unbegrenzter Privatanteil. Der letzte Distrikt jedes Typs bleibt beim Staat.
  - Alle Firmen und Baustellen dort gehören ihm, auch zugezogene. Er kauft dort Staatsdistrikte direkt, auch unter Gemischt, ohne Angebot.
  - Gründung, Kauf, Wachstum und Automatisierung dort zahlt er aus seiner Kasse, 25 % günstiger und ohne Kredit.
  - Keine Verstaatlichung, kein Räumen.
  - Sein Hauptsitz zieht dorthin.
- **Ausdehnung:** Das Habitat zählt nicht als Kolonie. Seine Distrikte und Firmen zählen nicht, nur seine Pops.
- **Ende der Rechte:** Krise (Kasse unter 0), Auflösung oder Planwirtschaft. Das Habitat bleibt uns, die Firmen sind unabhängig, bei der Planwirtschaft werden sie Staatsdistrikte.
  - Bei einer Fusion bekommt der stärkere Konzern das Habitat, auch wenn er schon eins hat (ab 0.31.1). Nur so kann ein Konzern zwei Habitate haben; sein Hauptsitz bleibt dann auf dem ersten.
  - Bei einer Eroberung zieht der Konzern mit seinem Hauptsitz mit, und die Rechte gehen mit.
- **Firmenregister:** Auf dem Habitat steht oben „Konzern-Habitat von …“.

- **Einfluss:** Unser Einfluss wird immer bestätigt, unter jeder Wirtschaftsordnung (Angebot pe.300). KI-Reiche bestätigen, wenn sie den Einfluss haben.

## 0.31.1
- Die Datei `mod/private_economy.mod`, die der Launcher liest, war leer; der Mod wurde nicht geladen (deshalb fand die Konsole `event pe.302` nicht). Sie ist wiederhergestellt. Im Launcher prüfen, dass Private Economy 0.31.1 aktiv ist.
- Fusion zweier Konzerne mit Habitat: Der stärkere behält beide.
- Monsterräumung bei KI-Reichen: Die Konzernflotte erscheint direkt im System der Kreaturen (aggressiv), weil die KI sie sonst nicht hinschickt.

## Konsole
- `event pe.302`: sofort ein Angebot. Der reichste Konzern ohne Habitat bekommt dafür mindestens 7000 Kasse.
- `event pe.303`: Den Bau unserer Konzern-Habitate sofort fertigstellen.

## Ablauf
1. **Vorbereitung:** Speichern. Habitat-Technologie, ein Konzern, Wirtschaftsordnung Laissez-faire, Freie Marktwirtschaft oder Gemischt, genug Einfluss.
2. **Angebot:** `event pe.302`.
   - Kommt das Angebot pe.300 mit Konzernname, Standort und Einfluss?
   - Stimmt der Einfluss mit dem Vanilla-Habitat überein (du siehst dort 150)?
   - Passt der Standort zum Konzerntyp?
   - Kommt kein Angebot, steht im game.log eine Zeile „corporate habitat: slot …, influence … (have …), site found …“.
3. **Annehmen:**
   - Der Einfluss ist abgezogen.
   - Die Kasse des Konzerns ist im Firmenregister 6000 kleiner.
   - Im System steht die Baustelle „Zentralkomplex Konzern-Habitat“.
   - Es kommt eine Nachricht.
4. **Fertigstellen:** `event pe.303`, dann einen Tag laufen lassen.
   - Erscheint das Habitat und wird es besiedelt (Vanilla-Besiedlung)?
   - Heißt es „Habitat <Konzern>“?
   - Kommt die Nachricht, und ist die Kasse weitere 800 kleiner?
5. **Nach der Besiedlung**, am nächsten Monatswechsel:
   - Designation gesetzt?
   - Hauptsitz umgezogen (Nachricht, Vorkommen „Hauptsitz“)?
   - Firmenregister mit „Konzern-Habitat von …“?
6. **Ausdehnung** (Tooltip):
   - „Konzern-Habitate“ −20 (bzw. mit deinen Modifikatoren).
   - „Konzern-Habitate (Distrikte)“ −0,5 je Distrikt.
   - Firmen auf dem Habitat stehen nicht unter „Privatfirmen (Distriktplätze)“.
7. **Über die nächsten Quartale:**
   - Neue Firmen auf dem Habitat gehören dem Konzern.
   - Gründung 450 statt 600 aus seiner Kasse.
   - Kein Räumen-Knopf an den Firmen dort.
8. **Optional:** Planwirtschaft einstellen. Die Rechte enden, die Firmen werden Staatsdistrikte.
9. **Logs:** keine Fehler aus pe_megastructures.txt, pe_habitat_triggers.txt, pe_corp_effects_generated.txt (pe_chab_*), pe_habitat_events.txt.

## Offen (erst im Spiel prüfbar)
- Ob `upgrade_megastructure_to` die Baustelle der Holdings ausbaut.
- Ob der Einflussbestand über `resource_stockpile_compare` gelesen wird. Steht im Log „have 0“, obwohl Einfluss da ist, ist das der Fehler.
- Ob `start_colony` mit unserer Hauptspezies besiedelt.
- Ob `set_name` den Namen aus der Lokalisierung nimmt.
