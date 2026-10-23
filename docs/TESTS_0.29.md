# Version 0.29 – Testablauf

Ein laufendes Spiel kann weiterlaufen.

## Bombardement: Kapitalverlust nur aus der Verwüstung
- **Je Punkt Verwüstung** verliert jede Firma pro Monat 0,2 % ihres Kapitals.
  - Der Satz wird jeden Monat pro Planet zufällig zwischen 0,1 % und 0,3 % je Punkt gezogen.
  - Beispiel: Bei 50 Verwüstung sind das 5–15 % im Monat.
- Der Sockel von 2 % ist weg. Ohne Verwüstung gibt es keinen Kapitalverlust.
- Der Rest bleibt unverändert: seltene Zerstörung, Kriegsgebiet, Wiederaufbau.

## Vorübergehende Besetzung
- **Stillstand:** Auf einem besetzten Planeten stehen die Firmen still.
  - Keine Abrechnung, kein Wachstum, kein Umbau, keine Gründung, keine Gewinnauszahlung.
  - Baustellen ruhen.
  - Das Kapital bleibt, wie es ist.
- **Kontributionen (pe.138):** Bei der Besetzung beschlagnahmt der Besatzer ein Viertel des Kapitals jeder Firma und bekommt es als Handel. Du bekommst eine Nachricht.
- **Kollaboration (pe.139 / pe.299):** Nach der Befreiung, wenn die Besetzung mindestens 3 Monate gedauert hat, entscheidest du:
  - **Bestrafen:** Die Firmen zahlen ein Fünftel ihres Kapitals als Strafe an dich. Der Planet bekommt +5 Stabilität für 5 Jahre.
  - **Amnestie:** Die Firmen behalten alles. Der Planet bekommt −5 Stabilität für 2 Jahre.
  - **Enteignen:** Die größte Firma wird ohne Entschädigung Staatsdistrikt. Der Planet bekommt +5 Stabilität für 5 Jahre.
  - KI-Reiche bestrafen.
- **Hauptsitz unter Besatzung:**
  - Die Konzernkasse ist eingefroren, neue Einnahmen ebenfalls. Im Register steht 0.
  - Nach 5 Jahren Besatzung verlegt der Konzern mit 3 % Chance pro Monat seinen Sitz auf deinen freien Planeten mit den meisten seiner Firmen. Dazu kommt eine Nachricht, und die Kasse ist wieder frei.
  - Endet die Besatzung vorher, taut die Kasse auf.

## Werkschutz im Bodenkampf
- **Wann:** Beginnt auf deinem Planeten ein Bodenkampf. Dabei gilt höchstens ein Auslöser pro Planet in 180 Tagen.
- **Hauptsitz auf dem Planeten:** Der Konzern schickt seinen Werkschutz **kostenlos**, notfalls bis −200 Kasse. Es kommt nur eine Nachricht.
- **Sonst:** Der stärkste Konzern ab 500 Kasse macht ein Angebot (pe.297), höchstens einmal im Jahr. Du kannst zahlen mit:
  - den unabhängigen Firmen des Planeten,
  - Legierungen,
  - 100 Einfluss,
  - oder verhandeln (pe.298: 50 % Chance auf die halben Legierungen, sonst geht der Konzern).
- **Menge:**
  - Eine Einheit je 2000 Pops auf dem Planeten, plus die Hälfte der Verteidigungsarmeen dort.
  - Mindestens 1, höchstens 25, und nur so viel, wie das Geld reicht: 75 je Einheit. Bezahlt wird beim Hauptsitz aus Kasse plus 200, sonst aus 80 % der Kasse.
  - Die Stärke der Angreifer zählt nicht.
- **Einheit:** neuer Armeetyp **Werkschutz**. Er ist defensiv, hat Leben, Schaden und Moral ×1,5 und verursacht keine Kriegsmüdigkeit. Er gehört dir.
- **Abzug:** Ist der Bodenkampf vorbei, zieht der Werkschutz beim nächsten Monatswechsel ab. Gefallene Einheiten sind verloren.

## Debug
- **`event pe.136`:** Das Werkschutz-Angebot für deine Hauptwelt, als würde sie angegriffen.
  - Das Log nennt Konzern, Einheiten, Pops, Verteidiger, Kosten und Legierungen.
  - Die Einheiten ziehen beim nächsten Monatswechsel wieder ab, weil kein Kampf läuft.
- **Besetzung und Befreiung** lassen sich nur in einem echten Krieg testen.

### Prüfen
1. `event pe.136`:
   - Bei einem Konzernsitz auf der Hauptwelt landen Einheiten mit Nachricht.
   - Sonst kommt pe.297, mit plausibler Einheitenzahl und Preis.
   - Einen Monat später sind die Einheiten weg.
2. In einem Krieg einen Planeten mit Firmen besetzen lassen:
   - Nachricht über Kontributionen.
   - Keine Gewinnauszahlung mehr für den Planeten im Haushalt.
3. Nach der Befreiung (mindestens 3 Monate später): pe.299.
4. Bei einer echten Invasion: Kommt das Angebot, und kämpft der Werkschutz mit? Bitte genau beobachten.
5. Logs: keine Fehler aus pe_war_effects.txt, pe_war_events.txt oder pe_corp_effects_generated.txt (pe_occupation_step).

## 0.29.1: Werkschutz schneller und zahlreicher
- **Zeitpunkt:** **10 Tage nach Beginn** eines Bodenkampfs, mit 75 % Chance, und nur, wenn der Kampf dann noch läuft.
  - Derselbe Planet kann alle 30 Tage wieder auslösen statt alle 180.
  - Bezahlte Angebote kommen höchstens alle 180 Tage statt einmal im Jahr. Der Hauptsitz wird immer kostenlos verteidigt.
- **Menge:** 1 Einheit je **400** Pops plus die Hälfte der Verteidiger, höchstens 50. Weiterhin begrenzt durch das Geld, 75 je Einheit.
- **Werkschutz** ist jetzt eine Kopie der Vanilla-Verteidigungsarmee: Leben 1,25, Schaden 1,5, Moral 1,25. Er funktioniert für jede Spezies, auch für Roboter in normalen Reichen.
- **Debug:**
  - `event pe.136` lässt 10 Rebellenarmeen einer feindlichen Fraktion auf deiner Hauptwelt landen, wie Vanillas wütende Wälder. Der Bodenkampf beginnt, und 10 Tage später kommt der Werkschutz sicher: kostenlos bei einem Konzernsitz, sonst als Angebot pe.297.
  - `event pe.137` entfernt die Invasoren wieder.

### Prüfen
1. Speichern, dann `event pe.136`.
   - Der Bodenkampf auf der Hauptwelt beginnt.
   - Nach 10 Tagen kommt die Nachricht oder pe.297.
2. Landen die Einheiten, und kämpfen sie im laufenden Kampf mit (Bodenkampf-Fenster)?
3. Nach dem Kampf ist der Werkschutz beim nächsten Monatswechsel weg.
4. `event pe.137` räumt die Invasoren weg, falls sie noch da sind.

