# Version 0.33 – Testablauf: Konzern-Marge und halbierter Gewinnanteil

Ein laufendes Spiel kann weiterlaufen. Die neuen Gewinnanteile gelten ab dem nächsten Monat, die Konzernproduktion ab dem nächsten Quartal.

## Stationen, Schwarm und Ofen der Konzerne
- **Bisher:**
  - Der Konzern lieferte uns das Anderthalbfache des Stationswerts als sein Produkt.
  - Er bekam zusätzlich die Hälfte des Werts als Kasse.
  - Den Unterhalt von Schwarm und Ofen zahlte er aus der Kasse. Ein Konzern-Schwarm machte damit auf jeder Stufe leichten Verlust.
- **Jetzt:** Private Firmen sind effizienter. Der Konzern macht 140 % des Werts in seinem Produkt.
  - Davon zahlt er zuerst den Unterhalt seiner Megastrukturen.
  - 120 % des Werts liefert er uns (Hauptsitz-Vorkommen, Haushaltszeile „Konzernproduktion“).
  - 20 % behält er als Marge in der Kasse.
- **Ergebnis:** Ein Schwarm oder Ofen bringt dem Konzern nie mehr laufenden Verlust. Der Bau selbst amortisiert sich nur langsam; er ist ein Prestigeprojekt.
- **Beispiel:** Stern mit Wert 5, Schwarm Stufe I.
  - Wert 30, Unterhalt 20.
  - Wir bekommen 36 − 20 = 16 im Monat. Mit einem eigenen Schwarm wären es 30 − 20 = 10.
  - Der Konzern bekommt 6 im Monat.

## Gewinnanteil halbiert
- **Neue Anteile:** Gelenkt 7,5 %, Gemischt 10 %, Freie Marktwirtschaft 12,5 %, Laissez-faire 17,5 % der Wertschöpfung.
- **Wirkung:**
  - Solange die 40-%-Grenze nicht greift (früh im Spiel), zahlt der Staat halb so viel Gewinn.
  - Greift sie, ändert sich an der Zahlung nichts; die Firmen bekommen dann einen größeren Teil dessen, was ihnen zusteht.
  - Die 40-%-Grenze bleibt.
- **Laufende Spiele:** Der neue Anteil wird jeden Monat aus der Wirtschaftsordnung gesetzt.

## Prüfen (Save Hesukaran)
1. Hauptsitz von Stormgate Utilities (Konzern-Habitat): Die Mineralien-Zeile der Konzernproduktion sinkt.
   - Bisher etwa 539 im Monat. Jetzt etwa 431 minus Schwarm-Unterhalt (Stufe II: 40), also etwa 390.
2. Firmenregister: Die Kasse von Stormgate wächst langsamer.
   - Marge etwa 72 im Monat statt 180, dazu die Sozialleistungen als Ausgabe.
3. Wirtschaftsordnung (Tooltip): Gewinnanteil 17,5 % unter Laissez-faire.
   - Debug pe.6 zeigt Gewinnanteil 17,5.
4. Haushalt: Die Gewinnauszahlung an Privatfirmen bleibt ungefähr gleich, weil die 40-%-Grenze greift.
5. Logs: keine Fehler aus pe_corp_effects_generated.txt (pe_corp_station_output) oder pe_fleet_effects.txt.
