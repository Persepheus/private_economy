# Version 0.27 – Testablauf

Ein laufendes Spiel kann weiterlaufen.

## Planetare Schutzflotte
- **Wann:** Einer deiner Planeten wird bombardiert, egal von wem: Weltraummonster, Kriegsgegner, Krise. Es gibt einen starken Konzern mit mindestens 1500 Kasse; angeboten wird von dem mit der meisten. Die Prüfung läuft jeden Monat, ein Angebot kommt höchstens alle 2 Jahre.
- **Angebot (pe.294):**
  - Der Konzern schickt sofort eine eigene Flotte aus deinen Entwürfen, in der größten Schiffsklasse, die du erforscht hast.
  - Er zahlt bis zu 80 % seiner Kasse und zielt auf das 1,5-Fache der feindlichen Flottenstärke im System.
  - Der Kommandant kommt von den Holdings.
- **Preis, du wählst:**
  - **Die unabhängigen Firmen auf dem Planeten** gehen an den Konzern. Ihre Gewinne fließen künftig an ihn statt an die Investoren. Diese Option gibt es nur, wenn es dort unabhängige Firmen gibt.
  - **Legierungen:** ein Achtel seines Flottenbudgets.
  - **Konzessionen:** 150 Einfluss.
  - **Verhandeln (pe.295):** Mit 50 % Chance kommt er für die halben Legierungen. Sonst zieht die Delegation ab, und es kommt keine Flotte.
  - Ablehnen.
- **Die Flotte:**
  - Sie gehört den Holdings und steht unter deinem Befehl, damit sie auch in deinen Kriegen kämpfen darf.
  - Kein Leasing und keine Gebühr außer den 10 % Unterhalt, die die Engine immer verlangt. Sie belegt keine Flottenkapazität und ist aggressiv eingestellt.
- **Abzug:**
  - Sobald der Planet nicht mehr bombardiert wird und keine feindliche Flotte mehr im System ist, spätestens nach 12 Monaten. Dazu kommt eine Nachricht.
  - Wird sie zerstört, kommt ebenfalls eine Nachricht.
- **KI-Reiche:** zahlen mit Legierungen, wenn sie können.

### Prüfen
1. Im laufenden Save wird ein Planet bombardiert. Im nächsten Monat sollte pe.294 kommen, weil dein erster Konzern genug Kasse hat.
   - Alternativ: `event pe.277`. Das prüft alle Konzernangebote sofort und setzt die 2-Jahres-Sperre zurück.
2. Eine Option wählen:
   - Die Flotte erscheint am Planeten, mit Kommandant und unter deinem Befehl.
   - Die Konzernkasse im Firmenregister sinkt um die Baukosten.
   - Bei der Firmen-Option zeigt das Firmenregister die Firmen des Planeten beim Konzern.
3. Kämpft die Flotte gegen die Bombardierer? Bitte genau beobachten, vor allem bei Monstern.
4. Ist das System frei, zieht die Flotte nach höchstens einem Monat ab, mit Nachricht.
5. Logs: keine Fehler aus pe_fleet_effects.txt (pe_corp_defence, pe_corp_defence_start).

## 0.27.1: Hauptsitz verteidigen
- **Wann:** Ein bombardierter Planet trägt den Hauptsitz eines Konzerns. Dann schickt dieser Konzern seine Flotte **kostenlos**, ohne Verhandlung. Es kommt nur die Nachricht „verteidigt seinen Hauptsitz“.
- **Budget:** seine ganze Kasse plus Kreditlinie. Er geht bis −200 ins Minus. Er muss mindestens noch −50 Kasse haben; darunter kann er es sich nicht mehr leisten.
- **Vorrang und Sperren:**
  - Der Hauptsitz hat Vorrang vor dem bezahlten Angebot.
  - Höchstens einmal im Jahr. Diese Sperre ist unabhängig von der 2-Jahres-Sperre des bezahlten Angebots.
- **Ins Minus gerutscht:** Die üblichen Regeln greifen. Ein Konzern unter 0 verkauft Firmen.

### Prüfen
1. Einen Planeten mit Konzernsitz bombardieren lassen. Dann kommt im nächsten Monat die Flotte ohne Event, mit Nachricht. Alternativ `event pe.277`.
2. Im Firmenregister sinkt die Kasse, notfalls bis −200.

## 0.27.2: Bombardement trifft Firmen
- **Maßstab ist die Verwüstung des Planeten**, nicht die Bombardement-Stufe. Es gilt nur, solange er bombardiert wird. Geprüft wird monatlich.
- **Kapitalverlust:** Jede Firma verliert pro Monat 2 % ihres Kapitals plus 0,15 % je Punkt Verwüstung, höchstens 20 %. Bei 50 Verwüstung sind das 9,5 % im Monat. Fehlt dann Kapital, greifen die üblichen Regeln: Verluste, Kredite, Schrumpfen.
- **Zerstörung, selten:**
  - Jede Firma wird pro Monat mit 1 % getroffen. Bei 20 / 40 / 60 / 80 Verwüstung steigt die Chance auf 2 / 3 / 4 / 5 %.
  - Eine getroffene Firma verliert bei ihrer nächsten Abrechnung eine Stufe.
  - Auf Stufe 1 wird sie zerstört. Es bleiben **„Trümmer einer Privatfirma“**: ein Blocker, der einen Distriktplatz belegt. Räumen kostet 300 Mineralien und 4 Monate.
- **Kriegsgebiet:** Nach dem letzten Bombardement gilt der Planeten-Modifikator „Kriegsgebiet“ 3 Jahre lang. Solange gibt es keine Neugründung, keine Übernahme von Staatsdistrikten und keinen Umbau.
- **Wiederaufbau** (quartalsweise, sobald das Bombardement vorbei ist, eine Baustelle pro Planet):
  - Trümmer einer Konzernfirma baut der Konzern aus seiner Kasse wieder auf: Gründungskosten 500 Stadt bzw. 300 Land, Reserve 300. Dazu kommt eine Nachricht.
  - Trümmer einer unabhängigen Firma: höchstens einmal im Jahr kommt das Angebot pe.296. Du zahlst die Hälfte der Gründungskosten in Handel, die Investoren leihen den Rest. KI-Reiche bauen aus dem Investorenpool wieder auf.

### Prüfen
1. Einen Planeten mit Firmen bombardieren lassen:
   - Nach einem Monat steht dort „Kriegsgebiet“.
   - Das Firmenkapital (Firmenregister bzw. Save) sinkt monatlich.
2. Bei längerem Bombardement:
   - Nachrichten über geschrumpfte Firmen, irgendwann „durch das Bombardement zerstört“.
   - Die Trümmer erscheinen als Vorkommen und lassen sich räumen.
3. Nach dem Bombardement:
   - Konzerntrümmer werden zur Baustelle, mit Nachricht.
   - Bei unabhängigen Trümmern kommt pe.296.
4. Logs: keine Fehler aus pe_economy_effects.txt (pe_bombard_step, pe_ruins_step) oder pe_firm_effects_generated.txt (pe_firm_change, pe_ruin_rebuild).

