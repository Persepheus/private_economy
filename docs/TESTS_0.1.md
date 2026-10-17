# Version 0.1 – Testablauf

Ziel: Die Privatwirtschaft läuft automatisch. Firmen gründen sich im dringendsten Sektor, kaufen je nach Wirtschaftsordnung staatliche Distrikte auf und werden verstaatlicht, wenn die Richtlinie sinkt.

## Logik

Alle **3 Monate** pro Reich (Nicht-Gestalt, normales Reich):

1. **Dringlichkeit je Ressource** (Legierungen, Konsumgüter, Handel, Mineralien, Energie, Nahrung):
   - Defizit: +50 und zusätzlich das Defizit in % der Bruttoproduktion. Ein Lager, das gerade am Markt gekauft wurde, ändert nichts, denn es zählt das monatliche Netto.
   - Lager reicht beim aktuellen Defizit keine 12 Monate: +30.
   - Überschuss: minus die Hälfte des Überschusses in % der Produktion.
   - Lager zu mindestens 90 % voll: −50.
   - Marktpreis: +1 je 1 % über dem Preis, den das Reich beim ersten Lauf gesehen hat (nicht für Handel).
2. **Je Planet** (keine Habitate, Ringwelten oder Ökumenopolen, höchstens eine Aktion pro Planet und Jahr):
   - Erlaubte Firmen = (Distrikte + freie Plätze + Firmen) × Privatanteil, abgerundet.
   - **Zu wenige Firmen, freier Platz**: Gründung im dringendsten verfügbaren Sektor. Mine, Kraftwerk und Agrarbetrieb brauchen einen freien Distriktplatz ihres Typs, also passende Vorkommen. Liegt kein Sektor über 25, entsteht ein Mischkonzern.
   - **Zu wenige Firmen, kein Platz frei**:
     - Gelenkte und Gemischte Wirtschaft: nichts.
     - Freie Marktwirtschaft, Spieler: Angebot als Popup. Ablehnen gibt −5 Stabilität für 2 Jahre auf dem Planeten. Höchstens ein Angebot pro Quartal.
     - Freie Marktwirtschaft, KI, sowie Laissez-faire: automatischer Kauf.
     - Beim Kauf wird der Distrikt entfernt und die Firma entsteht. Das Reich erhält die Baukosten plus Handel: Stadt 500 Mineralien + 100 Handel, Land 300 + 60.
   - **Zu viele Firmen** (Richtlinie gesenkt): Der Staat kauft eine Firma zum gleichen Preis zurück, wenn er zahlen kann. Sie wird wieder ein Distrikt des passenden Typs.

## Firmen

| Firma | Belegt | Jobs |
|---|---|---|
| Private Stahlwerke | Platz | 120 Private Metallurgen |
| Private Fabrik | Platz | 120 Private Handwerker |
| Privates Handelshaus | Platz | 120 Private Händler |
| Privater Mischkonzern | Platz | je 40 Metallurgen, Handwerker, Händler |
| Private Mine | Platz + Bergbaudistrikt | 240 Private Bergleute |
| Privates Kraftwerk | Platz + Generatordistrikt | 240 Private Techniker |
| Privater Agrarbetrieb | Platz + Landwirtschaftsdistrikt | 240 Private Bauern |

## Konsole

| Befehl | Wirkung |
|---|---|
| `event pe.6` | Diagnose: Privatanteil, Dringlichkeit je Ressource, Zahlen der Hauptstadt, bester Sektor |
| `event pe.7` | Quartalslogik sofort ausführen; vorher alle Planeten-Abklingzeiten löschen |
| `event pe.4` | alle Firmen und die Börse von der Hauptstadt entfernen |
| `event pe.1` / `pe.2` / `pe.3` / `pe.5` | wie im Prototyp |

## Prüfen

1. **Diagnose**: Bei Planwirtschaft zeigt `pe.6` den Anteil 0 und erlaubt 0 Firmen. Distrikte und freie Plätze stimmen mit der Planetenansicht überein.
2. **Dringlichkeit**: Ein Defizit erzeugen, z. B. Nahrung durch Bauern-Jobs auf niedrige Priorität. Nahrung muss in `pe.6` deutlich über 25 liegen. Danach am Markt Nahrung kaufen: Der Wert bleibt hoch.
3. **Gründung**: Gemischte Wirtschaft, freier Platz auf der Hauptstadt, dann `pe.7`. Eine Firma entsteht, eine Nachricht erscheint und lässt sich anklicken. Bei Nahrungsdefizit und freiem Landwirtschaftsplatz sollte es ein Agrarbetrieb sein.
4. **Ohne Vorkommen**: Planet ohne freien Bergbauplatz, Mineraliendefizit. Es darf keine Mine entstehen, sondern der nächstbeste Sektor.
5. **Gelenkt, voll**: Hauptstadt ohne freien Platz, Gelenkte Wirtschaft, `pe.7`. Es passiert nichts.
6. **Freie Marktwirtschaft, voll**: `pe.7` zeigt ein Angebot. Annehmen: Distrikt weg, Firma da, Mineralien und Handel gutgeschrieben. Erneut auf einem anderen Planeten: Ablehnen gibt den Modifikator „Übernahme abgelehnt“.
7. **Laissez-faire, voll**: `pe.7` kauft ohne Nachfrage und schickt eine Nachricht.
8. **Verstaatlichung**: Mit mehreren Firmen auf Planwirtschaft wechseln, dann `pe.7`. Eine Firma pro Planet wird zurückgekauft (Mineralien und Handel werden abgezogen), und ein Distrikt entsteht.
9. **Takt**: Ohne Konsole entsteht nach einigen Monaten pro Planet höchstens eine Aktion pro Jahr.
10. **KI**: Nach ein paar Jahren KI-Planeten ansehen, ob dort Firmen entstanden sind, und ob die KI-Wirtschaft stabil bleibt.
11. **Logs**: error.log nach `pe_`, `private_economy`, `scripted_effect` und `recursive depth` durchsuchen.

## Bekannte Grenzen

- Habitate, Ringwelten, Ökumenopolen und Spezialplaneten bleiben außen vor.
- Stadtdistrikte werden als Ganzes gekauft. Was mit Zonen und Gebäuden darin passiert, ist ungetestet.
- Kein Kapital, keine Steuern, keine Pleiten (geplant für v0.2).
