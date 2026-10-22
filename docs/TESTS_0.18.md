# Version 0.18 – Testablauf

Ein laufendes Spiel kann weiterlaufen.

## Wirtschaftsordnung
- Jede Stufe hat eine Beschreibung und einen Tooltip in Klartext: Anteil der Distriktplätze, Gewinnanteil, Sparquote, Räumen bzw. Aufkäufe. Die Variablen sind versteckt.
- **Planwirtschaft beendet die Privatwirtschaft:**
  - Jede Firma wird sofort zu einem Staatsdistrikt ihres Typs, egal welche Stufe. Stadtfirmen und Labore werden Stadtdistrikte, Landfirmen ihr Landdistrikt.
  - Baustellen neuer Firmen verschwinden. Umbau-Baustellen werden zum Distrikt (dort stand vorher eine Firma).
  - Automatisierung und Gewinnbuchungen verschwinden.
  - Pool, Aktien und Anleihen sind weg.
  - Das passiert beim Umstellen und danach jedes Quartal, falls doch eine Firma auftaucht.
- **Aufkauf:** Auf einem Planeten höchstens alle **2 Jahre** ein Aufkauf oder Angebot.

## Tooltips
- Keine Variablen mehr bei Leasing, Gastarbeitern, Kolonisten, Hydroponik und Katastrophenhilfe.

## Neue Events (die Mengen wachsen mit dem Einsatz)
- **pe.260 Ein besonderes Angebot:** Fehlt ein Marktgut (Legierungen, Konsumgüter, Mineralien, Energie, Nahrung) und gibt es eine Privatfirma, die es herstellt, bietet sie einen Tausch an.
  - Sie liefert die Fehlmenge eines Jahres. Dafür nimmt sie ein Gut, dessen Lager am vollsten ist (mindestens 40 %, kein Mangel).
  - Wert: 80 % dessen, was dich der Markt kosten würde, höchstens das halbe Lager.
  - Ein Viertel des Werts geht als Marge an die Investoren.
  - Feilschen (pe.261): 50 % Chance auf 15 % weniger Gegenleistung, sonst platzt der Deal.
  - Höchstens alle 3 Jahre, 30 % pro Quartal.
- **pe.262 Modernisierung:** Auf einem Planeten ohne freie Pops investieren die Firmen der stärksten Branche. +10 % Ertrag × Faktor für die ganze Branche dort (auch Staatsjobs), 10 Jahre.
- **pe.263 Rationalisierung:** Unbesetzte private Spezialistenjobs werden gestrichen, je 100 (höchstens so viele, wie leer sind). Dafür +5 % Ertrag je 100, 10 Jahre.
- **pe.264 Vermögensabgabe:** Ab 10.000 im Pool kann der Staat 10 % oder 25 % davon als Handel einziehen. Das gibt Unmut in der Hauptstadt und kostet Ruf. Das ist die gemerkte „Kapitalertragssteuer“.
- **Mit den Nachbarn:**
  - **pe.265 Auslandsinvestition:** 10 Jahre Steuern auf die Erträge für dich (Haushaltsposten „Dividenden“) und Erträge für den Pool. Der Nachbar mag dich mehr.
  - **pe.266 Ausländische Filiale:** Ein Konzern des Nachbarn eröffnet Büros (+3 % Jobertrag, +300 Annehmlichkeiten × Faktor). Oder nur gegen Lizenzgebühr (halber Effekt plus Handel), oder ablehnen.
  - **pe.267 Technologielizenz:** Der Staat kauft sie (Handel, volle Forschung), die Firmen kaufen sie (Pool, halbe Forschung), oder keine.
  - **pe.268 Dumping:** Billige Legierungen oder Konsumgüter für dich, aber deine Firmen der Branche verlieren ein Viertel ihres Kapitals. Oder Schutzzölle für Einfluss, dann sinkt die Meinung des Nachbarn.

## Korrekturen (0.18.1)
- **Ingenieure:** Vanilla hat keinen Ertrags-Multiplikator nur für Ingenieure (`planet_engineers_produces_mult` ist dort auskommentiert, error.log: „Invalid modifier“). Modernisierung und Rationalisierung von Ingenieurslaboren wirken deshalb mit halbem Wert auf alle Forscher des Planeten.
- **Validator:** Prüft jetzt auch die Statischen Modifier und gleicht Kategorie-Multiplikatoren mit den Vanilla-Kategorien ab.
- **`event pe.12`** erzwingt das Angebot jetzt, auch ohne Mangel. Es braucht nur eine Privatfirma, die das Gut herstellt, und ein anderes Lager, das mindestens 40 % voll ist. Das Log nennt die gewählten Güter (0 = keins gefunden).

## Debug
- `event pe.12`: Liefer-Deal sofort (vorher `event pe.7`, damit die Preise frisch sind).
- `event pe.13`: Planwirtschaft ausführen, ohne die Richtlinie umzustellen.

## Prüfen
1. Tooltip jeder Wirtschaftsordnung: Klartext, keine Variablen.
2. `event pe.13` oder Umstellen auf Planwirtschaft: Alle Firmen werden Distrikte, Jobs und Wohnraum bleiben ungefähr, der Pool ist 0.
3. Nach einem Aufkauf: zwei Jahre lang kein weiterer auf dem Planeten.
4. `event pe.12` bei einem Mangel: Mengen und Waren in der Beschreibung passen, Annehmen verbucht beides.
5. Die neuen Events über `event pe.10` (Mäzen): Texte vollständig, keine Variablen, Meinung bei den Nachbarn.
6. Logs: keine Fehler aus pe_flair_events.txt oder pe_patron_effects.txt.
