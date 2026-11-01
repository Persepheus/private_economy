# Tests 0.48.0: Konzernprofile

Statisch geprüft (Validator). Im Spiel noch nicht getestet. Ein laufendes Spiel weist die Profile im nächsten Quartal zu.

## Zuweisung (pe_profile_effects.txt)

- `pe_c<k>_prof` 1..9, `pe_c<k>_profnm` = Namensnummer, für die gewürfelt wurde. Neuer Konzern im Platz oder Profil 0: neu würfeln.
- Grundgewicht 10, Faktoren:

| Profil | Faktoren |
|---|---|
| 1 Gründerkonzern | egalitär ×1,5; Handel ×1,5; autoritär ×0,7 |
| 2 Solides Haus | pazifistisch ×1,5; Rohstoffe ×1,5; xenophob ×1,3 |
| 3 Familienkonzern | autoritär ×2; spirituell ×1,5; egalitär ×0,5 |
| 4 Technologiekonzern | materialistisch ×2; Wissenschaft ×2; Rohstoffe ×0,5; spirituell ×0,5 |
| 5 Rüstungskonzern | militaristisch ×2; Industrie ×2; Handel ×0,3; Wissenschaft ×0,3; pazifistisch ×0,5 |
| 6 Finanzhaus | Handel ×2; Megakonzern ×1,5; Rohstoffe ×0,3 |
| 7 Genossenschaft | egalitär ×2; Arbeiterkooperative ×3; autoritär ×0,2; Megakonzern ×0,5 |
| 8 Pionierkonzern | Rohstoffe ×2; xenophil ×1,5; Wissenschaft ×0,5 |
| 9 Kartell | kriminelles Erbe ×3; Megakonzern ×1,5; egalitär ×0,5 |

Jedes Profil, das das Reich schon hat: ×0,5.

## Faktoren auf das Gewicht des „Ja“-Zweigs

Die Faktoren wirken auf das Gewicht, nicht direkt auf die Prozente: 35 gegen 65 mit ×1,5 ergibt 52,5 gegen 65, also 45 %.

| Mechanik (Grundwert) | Faktoren nach Profil des Konzerns |
|---|---|
| Übernahme (35/65) | Gründer 1,5; Solide 0,5; Finanz 1,5; Genossenschaft 0,4; Kartell 1,3 |
| Preiskampf (10/90, beide Seiten) | Gründer 1,5; Solide 0,5; Familie 0,7; Genossenschaft 0,3; Kartell 2,5 |
| Station (Gewicht je Konzern) | Gründer 1,5; Solide 0,7; Pionier 2,5; Kartell 1,2 |
| Konzern-Habitat (20/80) | Gründer 1,5; Solide 0,5; Familie 0,5; Pionier 2,5 |
| Institut ausbauen (25/75) | Gründer 0,7; Solide 0,7; Technologie 2 |
| Hauptsitz zieht nach Besatzung um (3/97 im Monat) | Gründer 1,5; Familie 0,3 |
| Rüstungsvertrag (15/85) | Rüstung 3; Familie 1,2; Finanz 0,5; Genossenschaft 0,2; Rüstungskonzern der Industrie zuerst gefragt |
| Kriegsleasing (30/70) | Gründer 1,2; Rüstung 2; Finanz 0,7; Genossenschaft 0,3 |
| Jagdrechte (25/75) | Solide 0,7; Rüstung 1,5; Pionier 2 |
| Erkundungscharta (20/80) | Technologie 1,3; Pionier 2,5 |
| Konvoischutz (35/65) | Solide 0,8; Rüstung 1,5; Pionier 1,5 |
| Bergung (30/70) | Gründer 1,3; Pionier 2 |
| Dyson-Schwarm (20/80) | Gründer 1,3; Solide 0,7; Technologie 1,5 |
| Arc Furnace (20/80) | Gründer 1,3; Solide 0,7; Technologie 1,3; Rüstung 1,3 |
| Zitadelle: Wahl des Konzerns | Solide 0,7; Rüstung 3; Genossenschaft 0,5 |
| Zitadelle: Bau (20/80) | Rüstung 1,5 |
| Stiftung (25/75) | Gründer 0,5; Familie 2; Genossenschaft 1,5; Kartell 0,5 |
| Schutzflotte, Werkschutz | Rüstungskonzern mit genug Kasse zuerst gefragt |

## Regeln

- Konzernkredite: Gründerkonzern verleiht bis −400 Kasse, solides Haus nur bis 0, alle anderen bis −200.
- Sozialleistungen: Familie und Genossenschaft ab 1500 Kasse, Gründer und Kartell ab 5000, sonst ab 3000.
- Kündigung des Rüstungsvertrags im Konzernrat: Sperre 10 Jahre (Rüstung, Familie), 3 Jahre (Solide), sonst 5.

## Ereignisse ohne eigenen Konzern (Faktor, wenn das Reich das Profil hat)

| Ereignis | Faktoren |
|---|---|
| pe.202 Stiftung Wissenschaft | Technologie 1,5 |
| pe.203 Prototyp | Technologie 2 |
| pe.204 Helfende Hand, pe.226 Katastrophenhilfe | Familie 1,5 |
| pe.214 Prospektion | Pionier 2 |
| pe.267 Technologielizenz | Technologie 2 |
| pe.268 Dumping | Kartell 2 |
| pe.241 Börsengang | Finanz 2 |
| pe.242 Staatsanleihen | Solide 1,5; Finanz 1,5 |
| pe.243 Feindliche Übernahme | Gründer 1,5; Finanz 2 |
| pe.244 Monopol | Kartell 2 |
| pe.245 Industriespionage | Technologie 1,5; Kartell 1,5 |
| pe.247 Umweltskandal | Kartell 2; Genossenschaft 0,5 |
| pe.248 Crash, pe.249 Rally, pe.250 Insiderhandel | Finanz 2 |
| pe.213 Streik | Genossenschaft 0,5; Kartell 1,5 |
| pe.230 Werkswohnungen | Familie 1,5; Genossenschaft 2 |
| pe.231 Roboter-Startup | Technologie 1,5 |
| pe.233 Familienförderung | Familie 2; Genossenschaft 2 |

## Prüfen

- **Konzernrat:** Nach dem Quartalswechsel steht hinter jedem Konzern Art und Profil, z. B. „(Industriekonzern, Rüstungskonzern)“. „Was für ein Unternehmen führen Sie?“ zeigt den Profiltext.
- **Verteilung:** Bei Militarismus mehr Rüstungskonzerne, bei Materialismus mehr Technologiekonzerne. Im Save `pe_c<k>_prof` nachsehen, auch bei den KI-Reichen.
- **Eroberung:** Ein übernommener Konzern behält sein Profil.
- **error.log:** keine Fehler zu `pe_prof_*`, `random_list` oder `modifier`.

## 0.48.2

- **pe.270:** `immediate` ruft zuerst `pe_prof_ensure` auf und merkt sich das Profil in `pe_prof270`. Der Text zeigt Art (`GetPeCorpKind270`, `GetPeCorpKindText270`), Profil (`GetPeProfText270`) und den Hinweis auf den Konzernrat in der Kontaktliste.
- **Hauptsitz:** `[pe_dlg_hq.GetName]` steht direkt in pe.337 und pe.338, nicht mehr in Scripted Loc. Ersatz ohne Hauptsitz: ein Planet mit Firmen des Konzerns, sonst die Hauptstadt.
- **Lager:** `STOCK_MONTHS` 120 statt 240 (`tools/supply-safety.mjs`).
- **Prüfen:**
  - Ein neuer Konzern zeigt in seiner Nachricht Art, Profiltext und den roten Kasten zum Konzernrat.
  - Der Hauptsitz im Gespräch ist ein Planet.
  - Im error.log kein „Unknown promotion“ zu `pe_dlg_hq`.
  - Im Save sinkt die Zahl der Firmen mit Status 9 bei KI-Reichen mit großem Lager. Save 2284.12: Reich 16777220 hatte 21 von 46.
