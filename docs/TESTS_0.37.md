# Tests 0.37.0

Statisch geprüft (Validator einschließlich der Codex-Tests). Im Spiel noch nicht getestet.

## Forschungsfirmen auf Habitaten

- **Vorher:** Ein Labor auf einem Habitat bekam immer die vollen Basisjobs (Stufe 1: 200 Arbeitskraft), auch wenn die Forschungszone später wegfiel.
- **Vanilla zum Vergleich:**
  - Forschungsdistrikt: 30 je Forscherjob (90), mit Forschungszone weitere 30 je Job (zusammen 180).
  - Bergbaudistrikt: 100, mit Zone 200.
  - Die Habitat-Designation selbst gibt keine Jobs, nur +15 % Arbeitskraft (Forschung wie Bergbau).
- **Jetzt:** Ein Labor auf einem Habitat bekommt die halben Basisjobs (100). Die andere Hälfte (100) kommt nur, solange das Habitat eine Forschungszone hat (`zone_habitat_research` oder `zone_habitat_research_unity`). Void Dwellers bekommen auf beides +50 %. Das entspricht dem Bergbau (100 plus 100 mit Zone).
- Die Versorgungsprüfung von Codex (`pe_safe_vector`) rechnet Labore auf Habitaten genauso.
- **Prüfen:**
  - Ein Habitat mit Forschungslabor und Forschungszone zeigt unverändert 200 Arbeitskraft (Stufe 1).
  - Wird die Zone entfernt, sind es 100.

## Firmenstufe 3 heißt „Großbetrieb“

- Die Namen der Firmen-Deposits der Stufe 3 enden jetzt auf „(Großbetrieb)“ bzw. „(Large)“ statt „(Konzern)“ / „(Corporation)“.
- Die echten Konzerne heißen weiter Konzerne.

## Familienförderung (pe.233)

- Kommt nur noch, wenn auf dem Planeten mindestens eine nicht-robotische Pop-Gruppe lebt. Die Förderung (`logistic_growth_mult`) wirkt nur auf organisches Wachstum.
- Reine Roboter- und Maschinenplaneten bekommen das Event nicht mehr.

## Jagdrechte (pe.284)

- `pe_monster_system` zählt nur noch Kreaturen, deren Land uns feindlich gesinnt ist (`is_hostile = root`). Dasselbe gilt für die Stärke, nach der die Flotte bemessen wird.
- Sind die Kreaturen nicht mehr feindlich, gilt das System als frei, und die Flotte kehrt zurück.

## Texte

- **Lagerbestand zu verkaufen (pe.281):** Der Text nennt den Rohstoff mit Symbol (Mineralien, Energie, Nahrung, Handelswert, Legierungen, Konsumgüter).
- **Konzern-Station (pe.280):** Statt „doppelt so viel Wert“ steht dort jetzt 140 % Verarbeitung, 120 % für uns und 20 % Marge.

## Kaufangebot (pe.110)

- Die Option „Den Distrikt verkaufen“ zeigt einen Erklärtext statt der Variablen.
- **Befund im Save 2230.06.28:**
  - Der Verkauf auf Queptilium Primum (Stahlwerk mit Handelssparte, aaat) hat keine Firma erzeugt.
  - Die Planetenvariablen `pe_before = 2` / `pe_after = 1` stammen von einem älteren Kauf. Der Kauf aus dem Screenshot hätte sie auf 3/2 bzw. 0/0 gesetzt, also lief `pe_buyout_execute` beim Klick nicht auf diesem Planeten.
  - Ein zwei Quartale altes, gekauftes aaat steht stattdessen auf Planet 65. Ob dort der Kauf aus dem Screenshot gelandet ist, lässt sich aus dem Save nicht beweisen.
- **Neu:** Jeder Verkauf eines menschlichen Reichs schreibt ins game.log:
  `buyout <Firma> on <Planet>: <Distrikt> before X after Y, private capital Z (down payment …), supply check S`.
  Wenn ein Verkauf wieder ausbleibt, zeigt das Log den Planeten und den Grund (Kapital, Versorgungsprüfung, Distrikt nicht entfernt). Fehlt die Zeile ganz, wurde der Kauf gar nicht ausgeführt.

## Namenlose Reiche im Spiel ab 2253 (kein Mod-Fehler gefunden)

- **150994974:** entstanden am 2253.10.02 auf Planet 28, der 2245 dem Dima'Xanian Imperium gehörte. Seit 2281 ist es Vasall von 16777220.
- **50331692:** entstanden am 2281.03.21 auf Planet 118.
- Bei beiden ist der Name leer (`key=""`), auch das Adjektiv. Die Startflags haben beide erst bei ihrer Entstehung bekommen. Es sind also neu entstandene reguläre Reiche (Abspaltung, Rebellion oder freigelassener Vasall).
- Der Mod legt nur Holdings-Länder an (Typ `pe_holdings`, Name `pe_holdings_name`) und Debug-Invasoren (Typ `faction`). Er vergibt keine Planeten an neue reguläre Reiche.
- Vanilla erzeugt Rebellen mit `create_rebels = { name = random … }`. Der leere Name kommt sehr wahrscheinlich aus der Vanilla-Namensvergabe. Belegen lässt sich der genaue Auslöser nicht, weil game.log aus dieser Zeit fehlt.

## Geplant

- „Längere Lieferketten (Supply Chains)“ steht in README → Geplant.
