# Version 0.14 – Testablauf

Ein laufendes Spiel kann weiterlaufen.

## Korrekturen
- **Umzug:**
  - **Spezialisierung wiegt schwerer:** Eine Firma, die zur Spezialisierung ihres Planeten passt, zieht nie um, auch nicht bei Mangel. Bisher zog z. B. ein Stahlwerk von einer Schmiedewelt weg.
  - **Bestes Ziel statt erstes:** Unter allen möglichen Zielen gewinnt das mit dem meisten Spielraum (der kleinere Wert aus freiem Wohnraum und freien Annehmlichkeiten nach dem Umzug). Am Ziel müssen nach dem Umzug mindestens 100 Wohnraum und 200 Annehmlichkeiten frei bleiben, damit es nicht selbst in Mangel gerät.
- **Maschinen-Leasing:** Der Modifikator „−100 % Unterhalt für automatisierte Arbeitskraft“ griff nicht. Jetzt zahlt dir der Investorenpool die Energie für die geleasten Jobs jedes Quartal zurück.
- **Parteispenden:** Der Text sagt jetzt deutlich, dass das Geld an die Parteien geht, nicht in die Staatskasse.
- **Wiederholungen:** Alle Events können mehrfach kommen. Gala, Stiftung, Liga und Universität haben einen eigenen Text für die Wiederholung, z. B. „gründet eine weitere Forschungsstiftung“. Die Gala heißt jetzt „Eine glanzvolle Gala“.

## Neu: gegen Arbeitermangel
- **Ursache:** In Vanilla haben Spezialistenjobs das Gewicht 10, Arbeiterjobs 1. Pops nehmen deshalb jeden freien Spezialistenjob, und Minen und Felder stehen leer.

| Event | Wirkung |
|---|---|
| **Landprämie** (pe.232) | 5 Jahre lang haben private Arbeiterjobs auf dem Planeten das Gewicht 12, also mehr als Spezialisten. Pops bleiben oder kommen zurück. |
| **Werkswohnungen** (pe.230, bei Wohnungsmangel) | +500 Wohnraum dauerhaft (Deposit) |
| **Roboter-Startup** (pe.231, mit Roboter-Tech, nicht verboten) | +2 Pop-Fertigung für 5 Jahre |
| **Familienförderung** (pe.233) | +25 % Wachstum organischer Pops: 10 Jahre mit Staatsanteil (100 Handel), 5 Jahre ohne |
| dazu die Events aus 0.13 | Sonderschichten, Gastarbeiter, Maschinen-Leasing, Hydroponik |

## Neu: Börse und Konzerne
| Event | Inhalt |
|---|---|
| **Abschied** (pe.240) | Ein Mäzen zieht sich zurück. 15 % des Pools gehen an eine Forschungsstiftung (Forschung in allen Feldern), an den Staat (40 % als Erbschaftssteuer) oder an die Erben (der Nachfolger erbt den halben Ruf). |
| **Börsengang** (pe.241, wenn es einen Konzern gibt) | 1 oder 3 Aktien zu je 500 Handel. Jede zahlt 10 Handel im Monat, sichtbar als „Dividenden aus Aktien“, solange der Pool zahlen kann. |
| **Staatsanleihen** (pe.242) | 30 % des Pools als Kredit. Rückzahlung: 120 % über 5 Jahre, monatlich in der Ersparnis-Zeile. |
| **Feindliche Übernahme** (pe.243) | Eine Firma schluckt eine andere auf dem Planeten: Der Platz wird frei, die Käuferin bekommt deren Kapital. Oder untersagen. |
| **Monopol** (pe.244, ein Hauptprodukt hat 40 % von mindestens 8 Firmen) | Hinnehmen (5 Jahre +25 % Gewinnanteil) · Kartellverfahren (Pool −20 %) · Zerschlagen (50 Einfluss) |
| **Industriespionage** (pe.245) | Ingenieursforschung, 30 % Risiko (−50 Einfluss, Nachricht) |
| **Exportboom** (pe.246) | +5 % Handel für 5 Jahre |
| **Umweltskandal** (pe.247) | Firmen zahlen · der Staat zahlt (150 Handel) · liegen lassen (Verschmutzung) |
| **Börsencrash** (pe.248, Pool ab 7000, nach einer Blase dreimal wahrscheinlicher) | Pool, Firmenkapital und Aktien halbiert. Rettungspaket (300 Handel) oder 1 Jahr Rezession (−5 % Job-Ertrag) |
| **Börsenrally** (pe.249, Pool ab 3500) | Pool +25 %. Gewinne besteuern (10 % davon) oder laufen lassen (Blase, Crash wahrscheinlicher) |
| **Insiderhandel** (pe.250) | Anklage (Einheit, Wirtschaft verstimmt) oder ignorieren (Kriminalität) |
| **Gentrifizierung** (pe.251) | +1000 Annehmlichkeiten, −300 Wohnraum für 5 Jahre, oder Mietpreisbremse |

## Konsole
`event pe.10` (Mäzen/Börse), `event pe.11` (Arbeitskräfte).

## Prüfen
1. **Landprämie:** Nach dem Event wechseln Pops in private Arbeiterjobs. Der Job-Tooltip zeigt das höhere Gewicht.
2. **Leasing:** Der Energieunterhalt bleibt im Tooltip, wird aber pro Quartal erstattet.
3. **Aktien:** Nach dem Kauf erscheint auf der Hauptstadt „Staatliche Aktienbeteiligungen“ und im Handels-Tooltip „Dividenden aus Aktien“.
4. **Anleihen:** Die Ersparnis-Zeile steigt um die Monatsrate, für 5 Jahre.
5. **Umzug:** Nur unpassende Firmen ziehen um, und nur auf Ziele ohne Mangel.
6. **Logs:** error.log nach `pe.23`, `pe.24`, `pe.25`, `pe_rural_premium`, `pe_shares` und `pe_bond` durchsuchen.
