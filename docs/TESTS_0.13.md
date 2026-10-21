# Version 0.13 – Testablauf

Ein laufendes Spiel kann weiterlaufen.

## Neu: Arbeitskräfte-Events

**Auslöser:** Auf einem Planeten stehen private Arbeiterjobs leer (mindestens einer bei Bergleuten, Technikern oder Bauern), der Pool hat mindestens 1000, und in den letzten 2 Jahren gab es kein Arbeitskräfte-Event. Dann besteht pro Quartal eine 25-%-Chance. Die Firmen setzen 30 % des Pools ein.

| Event | Inhalt | Optionen |
|---|---|---|
| **Sonderschichten** (pe.210) | Mehrarbeit für bessere Löhne, beim Job mit den meisten leeren Stellen | Zustimmen: +20 % Ertrag dieser Arbeiter auf dem Planeten für 5 Jahre, −500 Annehmlichkeiten (müde Arbeiter) · Ablehnen: 30 % Chance auf einen Streik ein Jahr später |
| **Gastarbeiter** (pe.211) | 200 Pops der Gründerspezies eines bekannten Reichs ziehen auf den Planeten | Papiere ausstellen (100 Handel) · Ablehnen |
| **Maschinen-Leasing** (pe.212) | Für den knappsten Arbeiterjob | Leasen: 5 Jahre +25 % automatisierte Arbeitskraft, ohne Energieunterhalt für dich · Ablehnen |
| **Streik!** (pe.213) | Arbeiter legen die Arbeit nieder | Lohnerhöhung aus dem Pool · Laufen lassen: −15 % Job-Ertrag 1 Jahr · Sicherheitskräfte: −5 Stabilität 2 Jahre (autoritär −2) |

Zu den Gastarbeitern:
- Das Ereignis kommt nur, wenn der Planet für die Spezies mindestens 60 % bewohnbar ist und dein Reich sie nicht säubern würde.
- Xenophobe Reiche bekommen 3 Jahre lang −3 Stabilität auf dem Planeten.

## Neu: weitere Mäzen-Events

| Event | Inhalt | Optionen |
|---|---|---|
| **Fund der Prospektoren** (pe.214) | Ein neues Vorkommen: Bergbau, Generator oder Landwirtschaft, +1 Distriktplatz | Privat abbauen: Vorkommen plus Firma, wenn Platz ist · Verstaatlichen: Vorkommen, die halbe Summe kommt zurück, Wirtschaft verstimmt · Unter Schutz stellen: Einheit |
| **Hydroponik-Startup** (pe.215, nur bei Nahrungsknappheit) | Vertikale Farmen auf der Hauptstadt | Bauen: Deposit „Hydroponik-Türme“, +15 Nahrung ohne Pops, 3 Energie, 10 Jahre · Ablehnen |
| **Mäzen der Künste** (pe.220) | Museen und ein Monument | Freie Kunst: Einheit, +500 Annehmlichkeiten und +2 Stabilität 5 Jahre · Staatskunst: mehr Einheit |
| **Die Liga** (pe.221) | Sportliga auf mehreren Welten | Spielen lassen: Annehmlichkeiten auf der Hauptstadt und 2 weiteren Welten, 20 % Wettskandal (pe.227) · Rechte versteigern: Handel |
| **Parteispenden** (pe.222) | Geld für die Politik | Annehmen: Einfluss, Kriminalität · Verbieten: Wirtschaft verstimmt · Offenlegen: Einheit |
| **Private Kolonisten** (pe.223) | Ein Konsortium gründet eine Kolonie auf einem bewohnbaren Planeten in deinen Grenzen | Zustimmen: neue Kolonie · Ablehnen |
| **Eine Universität** (pe.224) | Stiftung in der Hauptstadt | Offen: +10 % Forschungsjobs 10 Jahre · Eliteakademie: +15 %, −2 Stabilität |
| **Weltraumtourismus** (pe.225) | Kreuzfahrten zu den Wundern des Reichs | Freigeben: Handel und Annehmlichkeiten, 15 % Unglück (pe.228) · Ablehnen |
| **Katastrophenhilfe** (pe.226, Planet unter 25 Stabilität) | Hilfe in der Krise | Annehmen: +10 Stabilität 2 Jahre, die Firmen nehmen 2 Jahre nur den halben Gewinnanteil · Ablehnen |

## Konsole
| Befehl | Wirkung |
|---|---|
| `event pe.10` | Mäzen-Event sofort |
| `event pe.11` | Arbeitskräfte-Event sofort (wenn irgendwo private Arbeiterjobs leer sind) |

## Prüfen
1. **Sonderschichten:** Der Modifikator wirkt auf staatliche und private Arbeiter dieses Typs auf dem Planeten.
2. **Gastarbeiter:** Die Pops der fremden Spezies erscheinen auf dem Planeten und besetzen die Jobs.
3. **Leasing:** Automatisierte Arbeitskraft erscheint im Job-Tooltip, ohne Energieunterhalt.
4. **Hydroponik:** Das Deposit erscheint auf der Hauptstadt und produziert Nahrung ohne Jobs. Nach 10 Jahren ist es wieder weg.
5. **Kolonisten:** Auf dem Zielplaneten beginnt eine Kolonie.
6. **Logs:** error.log nach `pe.21`, `pe.22`, `create_pop_group`, `create_colony`, `pe_gw_species` und `GetNamePlural` durchsuchen.
