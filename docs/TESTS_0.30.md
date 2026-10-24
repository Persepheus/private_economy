# Version 0.30 – Testablauf

Ein laufendes Spiel kann weiterlaufen. Die Firmen-Vorkommen sind neu erzeugt. Bestehende Firmen bekommen ihre neuen Jobs sofort, ihre Bewertung im nächsten Quartal.

## Spezialisierungen (Zonen) auf normalen Planeten
- **Landfirmen bekommen die Jobs der Spezialisierung ihres Distrikttyps**, wenn der Planet sie hat. Es sind dieselben Jobs wie beim Staatsdistrikt, nur als Privatjobs, je Stufe skaliert.

| Distrikttyp | Spezialisierung | Zusätzlich |
|---|---|---|
| **Bergbau** | Bergbau, Betharian, Seltene Kristalle | +100 Bergleute |
| | Bergbau mit Physik | +50 Bergleute, +50 Physiker |
| **Generator** | Energie, Flüchtige Partikel | +100 Techniker |
| **Landwirtschaft** | Landwirtschaft, Exotische Gase | +100 Farmer |
| | Angler | +50 Farmer, +50 Handwerker |
| | Agrar-Angler | +50 Farmer, +50 Handwerker, +50 Händler |

  - Eine Landfirma auf Stufe 1 hat damit wie ein Staatsdistrikt 300 statt 200 Jobs.
  - Kristalle, Partikel und Gase laufen über die Vanilla-Job-Swaps. Die Privatjobs sind Kopien davon.
- **Stadtfirmen** bleiben wie bisher mit festen Jobs.
- **Letzter Platz:**
  - Eine Landfirma entsteht, kauft, baut um oder zieht hin nur, wenn danach noch ein Distrikt dieses Typs für den Staat bleibt, gebaut oder baubar.
  - So bleibt die Spezialisierung möglich, auch wenn sie nachträglich gebaut wird.
  - Kaufen war schon vorher nur ab 2 Distrikten möglich.
- **Firmenwert:**
  - Gewinn, Gründung, Kauf und Umbau rechnen mit den tatsächlichen Jobs der Firma auf diesem Planeten, also samt Spezialisierung.
  - Auch der Staatsdistrikt wird beim Kauf mit seiner Spezialisierung bewertet.

## Habitate
Privatwirtschaft gibt es jetzt auch auf Habitaten. Es sind dieselben Firmen-Vorkommen, nur mit Bedingungen:
- **Stadtfirmen** (Stahl, Konsumgüter, Handel, Unterhaltung, Medien): wie auf Planeten, auf einem Wohndistrikt-Platz.
- **Labore:**
  - Wie auf Planeten, belegen aber zusätzlich einen Habitat-Forschungsplatz.
  - Sie entstehen, werden gekauft, entstehen durch Umbau oder ziehen hin nur, wenn das Habitat eine Forschungs-Spezialisierung hat (Forschung oder Forschung/Einheit) und ein Forschungsplatz frei ist.
  - Während der Bauzeit hält die Baustelle den Forschungsplatz frei.
- **Minen und Kraftwerke:**
  - 100 statt 200 Grundjobs. Eine Sparte gibt es nur als Stadtsparte.
  - Dazu die Jobs der Spezialisierung des Habitat-Bergbau- bzw. Energiedistrikts.
  - Sie belegen einen Habitat-Bergbau- bzw. Energieplatz.
- **Farmen:**
  - Wie Minen, auf einem Habitat-Energieplatz, nur mit Hydroponik-Spezialisierung.
  - Mit Hydroponik oder exotischen Gasen kommen +100 Farmer dazu.
- **Leerenbewohner:** +50 % auf alle Firmenjobs auf Habitaten, wie in Vanilla.
- **Kosten wie ein Habitat-Distrikt:**
  - Gründung 600, Bauzeit 12 Monate.
  - Kauf eines Staatsdistrikts 225 Legierungen + 150 bzw. 90 Handel; das Angebot pe.110 nennt Legierungen.
  - Unterhalt 2 Energie + 0,25 Legierungen je Stufe.
- **Letzter Platz:** Auch auf Habitaten bleibt dem Staat ein Bergbau-, Energie- bzw. Forschungsplatz. Auf kleinen Habitaten kommen Landfirmen deshalb erst ab 2 Plätzen.
- **Designationen:** Habitat-Designationen wie Gießerei, Handel, Forschung, Bergbau, Energie oder Landwirtschaft ziehen passende Firmen an, wie auf Planeten.
- **Rückwandlung:** Planwirtschaft, Verstaatlichung, Eroberung ohne Privatwirtschaft und Enteignung setzen Habitat-Distrikte: Wohn-, Bergbau-, Energie- bzw. Forschungsdistrikt.

### Prüfen
1. **Normale Planeten:**
   - Ein Planet mit Generator-Spezialisierung und einem privaten Kraftwerk: Stufe 1 hat jetzt 300 Techniker-Jobs (Planetenansicht, Jobs).
   - Ohne Spezialisierung bleiben es 200.
2. **Letzter Platz:** Auf einem Planeten mit nur einem freien Generatorplatz und keinem Staatsgenerator entsteht kein privates Kraftwerk.
3. **Habitat Okul (Gießerei):**
   - Nach einigen Quartalen erscheinen dort Firmen, zuerst Stahlwerke wegen der Designation.
   - Ein Labor erst, wenn ein zweiter Forschungsplatz frei ist.
   - Eine Mine bzw. ein Kraftwerk mit halben Grundjobs.
4. **Kosten auf dem Habitat:** Unterhalt in Legierungen im Haushalt der Firma (Tooltip des Vorkommens).
5. Logs: keine Fehler aus pe_firm_deposits.txt, pe_firm_triggers_generated.txt, pe_firm_effects_generated.txt oder pe_economy_effects.txt (pe_state_district).
