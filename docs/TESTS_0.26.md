# Version 0.26 – Testablauf

Ein laufendes Spiel kann weiterlaufen.

## Konzern-Arc-Furnace
- **Voraussetzungen:**
  - Technologie Arc Furnace.
  - Wirtschaftsordnung Gemischt, Freie Marktwirtschaft oder Laissez-faire.
  - Ein Konzern aus Industrie oder Rohstoffen mit mindestens 2500 Kasse.
  - Ein Lavaplanet in deinem Gebiet. Er muss erforscht sein, darf keine Anomalie, keinen Besitzer und keine Megastruktur haben, im System darf kein Ofen und keine Dyson-Sphäre sein, und die Station dort muss fehlen oder dir gehören.
- **Häufigkeit:** höchstens alle 4 Jahre ein Angebot. Unter Laissez-faire baut der Konzern ohne zu fragen, sonst kommt Event pe.293.
- **Bau** (2000 aus der Kasse, wie in Vanilla):
  - Der Ofen kommt über den Lavaplaneten. Eine Station von dir dort wird abgebaut und bezahlt: unter Laissez-faire 100 Mineralien, sonst 200.
  - Jeder Himmelskörper des Systems bekommt das Ofen-Vorkommen und den Stationsbonus. Ausgenommen sind Sterne, besiedelbare Planeten und Körper mit Forschungsvorkommen, wie in Vanilla.
  - **Körper ohne früheres Vorkommen bekommen eine Station der Holdings.** Sie zählen als Konzernstationen.
  - **Körper mit Vorkommen bleiben deine.** Deine Stationen dort profitieren mit.
- **Verfahren:** Der Konzern wählt ab Stufe III selbst, ohne Überstimmung. Ein Industriekonzern nimmt Legierungen, ein Rohstoffkonzern Mineralien.
- **Unterhalt:**
  - Den Energie-Unterhalt bezahlt der Konzern: 20 / 40 / 80 / 100 im Monat. Ab Stufe III kommen −25 % beim Verfahren Mineralien bzw. +25 % bei Legierungen dazu.
  - Die Holdings bekommen die Energie jeweils für drei Monate im Voraus.
- **Ausbau** aus der Kasse: Stufe II 4000, III 7000, IV 12000, mit Vanilla-Bauzeit.
- **Konzernproduktion** pro Holdings-Station, Stationsbonus eingerechnet:
  - Stufe I: 1,25 Mineralien.
  - Stufe II: 3 Mineralien.
  - Stufe III: 7 Mineralien oder 3,5 Legierungen.
  - Stufe IV: 12 Mineralien oder 6 Legierungen.
  - Davon produziert der Konzern das Anderthalbfache des Werts in seinem Produkt.
- **Standortwahl:**
  - Infrage kommen nur Systeme, in denen sich der Ofen auf Stufe IV trägt. Der Konzern verdient die Hälfte des Werts im Monat.
  - Industriekonzern: mindestens 11 Körper ohne Vorkommen (12 Wert pro Körper gegen 125 Energie).
  - Rohstoffkonzern: mindestens 13 Körper (6 gegen 75).
  - Unter diesen nimmt er den Standort, der dem Durchschnitt am nächsten liegt. Ab 3 Kandidaten mit unterschiedlicher Zahl nie den besten und nie den schlechtesten.
- **Ende:**
  - Ist der Ofen weg, verschwinden Vorkommen, Boni und die Holdings-Stationen.
  - Löst sich der Konzern auf, gehen Ofen und Stationen an dich.

## Konzern-Dyson-Schwarm
- **Der Konzern bezahlt jetzt den Unterhalt.**
  - Vanilla verlangt 5 / 10 / 20 Legierungen im Monat. Die Holdings bekommen sie für drei Monate, der Konzern zahlt deren Wert (×4).
  - Bisher zahlten die Holdings selbst und standen im Minus: im letzten Save 10 Legierungen und 40 Energie im Monat bei 0 Lager.
- **Standortwahl:**
  - Nur Sterne, deren Vorkommen den Unterhalt auf der Endstufe trägt, also ab einem Wert von etwa 5 (z. B. Physik 2 oder Energie 6).
  - Unter diesen nimmt er den Stern, der dem Durchschnitt am nächsten liegt. Ab 3 Kandidaten mit unterschiedlichem Wert nie den besten und nie den schlechtesten.
- **Auflösung:** Löst sich der Konzern auf, geht sein Schwarm an dich.

## Debug
- **`event pe.277`:** alle Konzernangebote sofort, auch Schwarm und Ofen.
  - Dabei gilt keine Rentabilitätsschwelle, damit du den Ofen auch in kleinen Systemen testen kannst.
  - Laufende Unterhaltszahlungen und Ausbauten werden in diesem Moment nicht ausgeführt.
- **Prototyp-Events pe.22–27:** unverändert. Sie sind unabhängig vom Konzern-Ofen, also nicht beide im selben System verwenden.

## Prüfen
1. **Dein Konzern-Schwarm:**
   - Im Firmenregister sinkt die Kasse pro Quartal zusätzlich um 120, weil Stufe II 30 Legierungen kostet.
   - Die Holdings haben Legierungen auf Lager. Das sehe ich im Save nach.
2. **Ofen:**
   - `event pe.277` mit einem Industrie- oder Rohstoffkonzern ab 2500 Kasse und einem Lavaplaneten. Unter Gemischt oder Freier Marktwirtschaft kommt pe.293, unter Laissez-faire die Nachricht.
   - Im System nachsehen: Ofen da? Vorkommen überall? Holdings-Stationen auf den Körpern ohne früheres Vorkommen? Deine Stationen unverändert?
   - Ein Quartal später: Im Firmenregister haben die Stationen des Konzerns zugenommen, und die Konzernproduktion ist gestiegen.
3. **Ausbau:**
   - Mit viel Kasse kommt nach dem nächsten Quartal die Nachricht „baut seinen Arc Furnace aus“.
   - Nach Stufe III setzt der Konzern das Verfahren. Im Tab „Verhüttung“ am Ofen steht Legierungen bzw. Mineralien.
4. Logs: keine Fehler aus pe_fleet_effects.txt (pe_corp_furnace, pe_corp_furnace_exec, pe_select_mid) oder pe_corp_effects_generated.txt (pe_orbital_value, pe_corp_station_output).
