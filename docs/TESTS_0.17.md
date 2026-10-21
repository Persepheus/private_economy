# Version 0.17 – Testablauf

Ein laufendes Spiel kann weiterlaufen.

## Arbeitskräfte-Events skalieren mit dem Einsatz
Gleicher Faktor wie bei den Mäzenen: Einsatz / 1500, zwischen 0,5 und 3.

- **Sonderschichten:** Der Ertrag wächst mit. Die Müdigkeit (−500 Annehmlichkeiten) ist ein eigener Modifier und bleibt fest.
- **Roboter-Startup, Landprämie, Familienförderung:** Die Modifier wachsen mit.
- **Maschinen-Leasing:** Höchstens doppelt so viele Maschinen (25 % → 50 % automatisiert). Der Pool erstattet die Energie entsprechend.
- **Gastarbeiter:** 200 × Faktor.
- **Werkswohnungen:** 500, 1000 oder 1500 Wohnraum (gleiche Stufen wie Prospektion und Hydroponik).

## Firmen räumen (Gelenkt und Gemischt)
Firmen und Baustellen haben jetzt den „Räumen“-Knopf wie Blocker, aber nur unter der gelenkten und der gemischten Wirtschaft. Die KI räumt nie; sie verstaatlicht weiter.

| | Gelenkt | Gemischt |
|---|---|---|
| Influence pro Stufe 1 / 2 / 3 | 30 / 45 / 60 | 50 / 75 / 100 |
| Entschädigung (Handel, zahlst du) | keine | Stadt 500 / 750 / 1000, Land 300 / 450 / 600 |
| Unmut | keiner | −5 Stabilität für 3 Jahre, Ruf des Mäzens −1 |

- **Dauer:** 180 Tage. So lange arbeitet die Firma weiter.
- **Baustellen:** kosten wie eine Firma der Stufe 1.
- **Danach:**
  - Der Distriktplatz ist frei, bei Landfirmen auch der Distrikt.
  - Die Arbeiter werden Zivilisten.
  - Fünf Jahre lang eröffnet auf dem Planeten keine neue Firma (auch kein Aufkauf und kein Umbau).
- **Risiko:** Einige Vanilla-Events räumen alle Blocker eines Planeten (`clear_blockers`): Spielstart, Ringwelten, Sonderkolonien, einzelne Story-Events. Die würden jetzt auch Firmen entfernen. Auf normalen Kolonien mit Firmen sollte das kaum vorkommen.

## Icons
- Die Modifier für Bergbau-, Energie-, Landwirtschafts- und Forschungsertrag haben auch in Vanilla kein Icon („Couldn't find texture file: mod_job_miner_produces_mult.dds“ im error.log). Das Mod bringt eigene mit (Kopien der Job-Icons).

## Prüfen
1. Sonderschichten oder Roboter-Startup mit großem Pool: Der Tooltip zeigt mehr als +20 % bzw. +2.
2. Werkswohnungen: Die Beschreibung nennt den Wohnraum, der Planet bekommt ihn.
3. Logs: keine fehlenden Modifier-Icons mehr.
4. Gelenkte Wirtschaft: Eine Firma zeigt den Räumen-Knopf mit Influence-Kosten. Nach 180 Tagen ist der Platz frei, die Arbeiter sind Zivilisten.
5. Gemischte Wirtschaft: Die Kosten enthalten Handel. Nach dem Räumen hat der Pool die Entschädigung, der Planet den Modifier „Enteignung“.
6. Freie Marktwirtschaft oder Laissez-faire: kein Räumen-Knopf. Die Firmen erscheinen in der Planetenansicht trotzdem korrekt.
7. Eine Baustelle räumen: Danach entsteht auf dem Planeten eine Zeit lang nichts Neues, und andere Planeten bauen normal weiter.
