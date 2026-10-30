# Tests 0.45.0

Statisch geprüft (Validator). Im Spiel noch nicht getestet. Am besten ein neues Spiel, das mindestens 30 Jahre läuft, mit mindestens einem Konzern. Alternativ geht der Save cevantianmultistellar2 2241.03.23 weiter; er hat Paare für Fusionen und Fälle für Spezialisierungsgebäude.

## Mehr Gewinn für die Firmen

- **Gewinnanteil je Wirtschaftsordnung:** Gelenkt 10 %, Gemischt 15 %, Freie Marktwirtschaft 20 %, Laissez-faire 25 % (vorher 7,5 / 10 / 12,5 / 17,5 %). Laufende Spiele übernehmen die Werte im nächsten Monat.
- **Aufteilung:** Eine Firma unter „groß“ behält 75 % ihres Gewinns (vorher 50 %). Das restliche Viertel geht bei einer unabhängigen Firma an den Investorenpool, bei einem Konzernmitglied an den Konzern; der Pool bekommt dann nichts. Was über der Rücklage liegt, fließt wie bisher ab.
- **Prüfen:**
  - Tooltip der Wirtschaftsordnung zeigt die neuen Anteile.
  - pe.6 (Diagnose) zeigt den neuen Gewinnanteil.
  - Im Save steigt `pe_fcap` der Firmen schneller.
  - KIs mit wenig Handel zahlen unter 100 % aus (`pe_lpay`), sobald ihr Handelslager unter zwölf Monatszahlungen liegt.

## Kauf nur bei besetzten Staatsjobs

- **Landdistrikte:** Der Pool kauft einen Bergbau-, Generator- oder Landwirtschaftsdistrikt nur, wenn die Staatsjobs des Typs (Bergarbeiter, Techniker, Bauern) mindestens zu 90 % besetzt sind.
- **Stadt- und Habitatdistrikte:** Nötig sind 90 % für alle Fachkräftejobs des Planeten zusammen. Zurückgestellte Jobs zählen nicht als unbesetzt.
- **Prüfen:** Planet mit vielen unbesetzten Bergarbeiterjobs. Im Firmenregister steht als Grund „Kein Kauf: Die Staatsjobs … sind zu weniger als 90 % besetzt“.

## Kein Kauf, solange ein Distrikt in der Bauliste steht

- Steht auf einem Planeten ein Distrikt in der Bauliste (auch ein Ersetzen), kauft der Pool dort keinen Distrikt. Das gilt auch für ein angenommenes Kaufangebot.
- **Prüfen:**
  1. Einen Distrikt in die Bauliste setzen. In game.log steht `district queued on <Planet>, queued districts there 1`.
  2. Den Distrikt fertig bauen oder aus der Liste nehmen. Dann sinkt die Zahl.
  3. **Wichtig:** Ein Ersetzen (Farm zu Mine) in die Bauliste setzen. Erscheint auch dann die Zeile `district queued`? Wenn nicht, erkennt die Sperre das Ersetzen nicht.
- Im Firmenregister steht als Grund „Kein Kauf: Hier steht ein Distrikt in der Bauliste“.
- Zwei Jahre ohne Distrikt-Ereignis setzen den Zähler zurück.

## Fusion

- **Bedingungen:** Zwei Firmen desselben Typs (gleiches Hauptprodukt) und derselben Stufe (klein, normal oder mittel) auf einem Planeten fusionieren, wenn
  - beide das Geld für ihren nächsten Ausbau haben,
  - keine Schulden und keinen Konzernkredit haben,
  - und der Ausbau nur an den Arbeitskräften scheitert (Register: „keine Arbeitslosen“ oder „private Stellen unter 90 %“).
- **Ergebnis:** Die reichere Firma bleibt mit ihrer Variante (Gleichstand: Zufall) und bekommt das Geld beider. Sie wächst um eine Stufe, die andere verschwindet. Ein Distriktplatz wird frei, und es gibt weniger Jobs.
- **Konzerne:** Ist eine der Firmen unabhängig, gehört die neue zum Konzern der anderen. Zwei verschiedene Konzerne fusionieren nicht.
- **Häufigkeit:** Höchstens eine Fusion pro Planet und Quartal, und nur, wenn dort im Quartal sonst keine Firma die Stufe wechselt.
- **Gelenkte und gemischte Wirtschaft:** Event pe.332 mit „Zustimmen“ oder „Einspruch“. Nach einem Einspruch warten die beiden fünf Jahre. Es ist immer nur eine Anfrage offen. Bei Freier Marktwirtschaft und Laissez-faire kommt nur die Nachricht `pe_msg_merge` (Kategorie Firmenentwicklung). Die KI fusioniert immer.
- **Prüfen:**
  - game.log enthält `two firms merged on <Planet>`.
  - Das Register zeigt eine Firma weniger und eine eine Stufe größer.
  - Es erscheint keine zusätzliche Wachstumsnachricht.

## Spezialisierungsgebäude der Konzerne

- **Wer baut was:** Ein Konzern mit einer Firma des Typs auf einem normalen Planeten (keine Habitate) baut das passende Gebäude:
  - Mineralienaufbereitung (200 Mineralien)
  - Energienetz (400)
  - Nahrungsverarbeitung (400)
- **Technologie:** dieselbe wie für den Staat.
- **Platz, in dieser Reihenfolge:**
  1. Vorhandene Spezialisierung des Typs mit freiem Gebäudeplatz.
  2. Sonst wird im Staatsdistrikt die Spezialisierung ergänzt (1000 Mineralien).
  3. Sonst kommen ein neuer Distrikt (300) und die Spezialisierung dazu.
- **Lohnt sich:** Der Mehrertrag der Privatjobs des Typs auf dem Planeten über zehn Jahre (+0,5 je Job und Monat, zu Schattenpreisen) deckt das Gebäude. Grob heißt das:
  - Mineralienaufbereitung: ab etwa 334 privater Bergbau-Arbeitskraft.
  - Energienetz und Nahrungsverarbeitung: ab etwa 670 Arbeitskraft, bei gleichen Schattenpreisen.
- **Wer zahlt:**
  - Deckt der Mehrertrag auch Spezialisierung und Distrikt, bezahlt der Konzern alles.
  - Sonst kann der Staat den Rest bezahlen. Der Spieler wählt, die KI zahlt, wenn sie die Mineralien hat.
- **Pacht:**
  - Der Konzern zahlt aus seiner Kasse (Mineralien zum Schattenpreis).
  - Der Staat pachtet, was der Konzern bezahlt hat: Kosten plus 20 %, verteilt auf 120 Monate, als Budgetzeile „Pacht für Konzerngebäude“.
  - Danach gehört das Gebäude dem Staat. Die Planetenentscheidung „Pacht ablösen“ beendet die Pacht früher zum Restwert (pe.334).
  - Die Pacht endet ohne Zahlung, wenn der Konzern aufgelöst wird, das Gebäude abgerissen wird oder der Planet den Besitzer wechselt.
- **Gewinn der Firmen:** Das Gebäude erhöht die Wertschöpfung der Firmen mit dem passenden Job auf dem Planeten.
- **Häufigkeit:** Ein Gebäude pro Reich und Quartal. Der Spieler wird immer gefragt (pe.333), auch unter Laissez-faire. Nach einer Ablehnung wartet der Planet fünf Jahre für diesen Typ.
- **Prüfen:**
  - Kommt pe.333 mit Konzernname, Gebäude, Ort, Pacht und gegebenenfalls Restbetrag?
  - Nach „Annehmen“ steht das Gebäude, sofort und ohne Bauzeit, in der richtigen Spezialisierung. game.log enthält `corporate specialisation building, type … placement …, lease … a month`. Die Budgetzeile erscheint, die Konzernkasse sinkt.
  - Schlägt das Platzieren fehl, steht in game.log `… not built`, und es wird nichts bezahlt. Das bitte melden, dann passe ich die Platzierung an.
  - Variante 2 und 3: Wird die Spezialisierung beziehungsweise der Distrikt richtig angelegt?
  - Pacht ablösen: Der Betrag stimmt, die Budgetzeile verschwindet im nächsten Monat.
  - KI-Saves: Bei KIs mit Konzernen stehen nach einigen Jahren mehr dieser Gebäude, und die Konzernkassen bekommen Pacht.
