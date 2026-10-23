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
