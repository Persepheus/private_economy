# Version 0.11 – Testablauf

Ein laufendes 0.10-Spiel kann weiterlaufen.

## Neu: Firmen ziehen mit ihren Arbeitern um

Hängt ein Planet fest (kein freier Distriktplatz, keine freien Zivilisten, keine Baustelle), kann **eine** Stadtfirma oder ein Labor auf einen Planeten mit passender Spezialisierung umziehen. Die Arbeiter ziehen mit. So wachsen kleine Planeten schneller, auch wenn deine Pops in Privatfirmen arbeiten.

- **Welche Firma:** Ihr Hauptanteil passt nicht zur Spezialisierung ihres Planeten (z. B. ein Labor auf einer Schmiedewelt). Sie kann den Umzug aus eigenem Kapital zahlen: 250 × Stufengröße.
- **Wohin:** ein eigener Planet mit passender Spezialisierung. Dort braucht es:
  - einen freien Distriktplatz
  - keine Baustelle
  - freien Wohnraum für alle Arbeiter (200 × Stufengröße)
  - genug Annehmlichkeiten für alle Arbeiter (1 pro Pop)
- **Ablauf:**
  1. Die Firma schließt, ihre Arbeiter werden zu Zivilisten.
  2. Bis zur Arbeiterzahl ziehen Zivilisten mit, in Gruppen zu 10. Nur Pop-Gruppen ziehen, für die das Ziel mindestens so bewohnbar ist. Technisch ist das derselbe Vorgang wie Vanilla `resettle_pop_group`.
  3. Die Firma eröffnet am Ziel sofort, mit Stufe, Kapital und Schulden. Du bekommst eine Nachricht.
- **Höchstens ein Umzug pro Reich und Jahr.**
- Landfirmen ziehen nicht um, sie hängen an den Vorkommen ihres Planeten.

## Konsole
| Befehl | Wirkung |
|---|---|
| `event pe.9` | Umzug sofort versuchen (Jahressperre ignoriert). game.log zeigt, ob er stattfand und wie viele Arbeiter mitzogen. |

## Prüfen
1. Volle Hauptwelt ohne Zivilisten mit einem Labor oder Stahlwerk, das nicht zur Spezialisierung passt, dazu ein Planet mit passender Spezialisierung, freiem Platz, Wohnraum und Annehmlichkeiten. Nach `pe.9`:
   - Die Firma ist weg und am Ziel wieder da (gleiche Stufe).
   - Die Pops am Ziel sind um bis zu 200 × Stufengröße gestiegen, auf der Hauptwelt entsprechend gesunken.
   - Die Nachricht nennt beide Planeten.
2. Ziel mit schlechterer Bewohnbarkeit für eine Spezies: Diese Pops bleiben zu Hause.
3. Logs: error.log nach `pe_relocate`, `create_pop_group`, `transfer_pop_amount` und `habitability` durchsuchen.
