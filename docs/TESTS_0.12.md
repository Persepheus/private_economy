# Version 0.12 – Testablauf

Ein laufendes Spiel kann weiterlaufen.

## Neu: Mäzene

Reiche Privatleute geben überschüssiges Kapital aus, und das erzählt etwas über dein Reich.

### Rahmen
- **Auslöser:** Hat der Investorenpool mindestens 3000 und gab es in den letzten 2 Jahren kein Mäzen-Event, besteht pro Quartal eine 25-%-Chance auf ein Event.
- **Einsatz:** Jedes Event setzt **30 % des Pools** ein. Lehnst du ab, fließt das Geld bei Benefiz und Anwerbung in den Pool zurück.
- **Durchgehende Figuren:** 16 Mäzene, z. B. Aurelio Vance oder Selene Okoro-Thal.
  - Jeder hat einen **Ruf**: angesehen, umstritten oder berüchtigt. Deine Entscheidungen verändern ihn.
  - Nach 4 Events zieht sich ein Mäzen zurück, und ein neuer erscheint.
- **KI:** Sie entscheidet nach Ethik, z. B. Egalitäre gegen Dekadenz, Militaristen für den abgesicherten Prototyp.

### Events
| Event | Worum es geht | Optionen |
|---|---|---|
| **Die Gala des Jahrhunderts** (pe.200) | rauschendes Fest über der Hauptstadt | Feiern: +5 Stabilität und +1000 Annehmlichkeiten für 5 Jahre, 25 % Chance auf Skandal · Dekadenz anprangern: Einheit · Luxussteuer: Handel |
| **Skandal um die Gala** (pe.201) | Bestechungsvorwürfe ein halbes Jahr später | Vertuschen (150 Handel) · Ermitteln lassen: −5 Stabilität 2 Jahre, Einheit, Ruf −2 |
| **Stiftung für die Wissenschaft** (pe.202) | Forschungsstiftung | Freie Forschung: +25 %, zufälliges Feld · Leitlinien: Physik, Gesellschaft oder Ingenieurwesen |
| **Der Prototyp** (pe.203) | private Tech-Wette | Ihr Risiko: 40 % Erfolg, 40 % Teilerfolg, 20 % Unfall · Absichern (250 Legierungen): 70 / 25 / 5 % |
| **Eine helfende Hand** (pe.204) | Hilfe für einen Planeten mit Wohn- oder Annehmlichkeitsmangel | Annehmen: +500 Wohnraum, +1000 Annehmlichkeiten 5 Jahre; autoritär −2 Stabilität (Misstrauen) · Ablehnen: Einheit |
| **Anwerbekampagne** (pe.205) | Firmen finden keine Arbeiter | Mitfinanzieren (150 Handel): starke Umsiedlungs-Anziehung 5 Jahre · Firmen allein: schwächer, 3 Jahre · Verbieten: bei Freier Marktwirtschaft und Laissez-faire −3 Stabilität |

Die Wirkung von Forschung, Einheit und Steuer skaliert mit dem eingesetzten Betrag.

## Konsole
| Befehl | Wirkung |
|---|---|
| `event pe.10` | sofort ein Mäzen-Event, ohne Schwelle, Chance und Pause |

## Prüfen
1. `pe.10` mehrmals: Verschiedene Events erscheinen. Der Name des Mäzens bleibt über 4 Events gleich, und sein Ruf ändert sich je nach Entscheidung.
2. Der Pool sinkt pro Event um 30 %. Bei abgelehnter Hilfe oder verbotener Anwerbung steigt er wieder.
3. Die Stiftung bringt sichtbar Forschungsfortschritt. Ein Prototyp-Unfall setzt den Modifikator auf die Hauptstadt.
4. Logs: error.log nach `pe.20`, `pe_pat`, `GetPeMagnate` und `pe_mag` durchsuchen.
