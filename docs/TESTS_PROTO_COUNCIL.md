# Prototyp Konzernrat (0.47.2, Themen 0.47.3)

0.47.2 im Spiel getestet (Save 2276.07, 31.10.2026): Kontakt öffnet den Rat, Gesichter funktionieren, keine Fehler im error.log. Gefunden: Man sah auch die Holdings der anderen Reiche, und der Raum wirkte nicht nach Konzern. 0.47.3 nur statisch geprüft.

## 0.47.3 prüfen

- **Kontaktliste:** Nach dem nächsten Quartalswechsel nur noch die eigenen Holdings, Name „Private Holdings (<unser Reich>)“. Die Holdings anderer Reiche verschwinden.
- **Raum:** Konzernsaal (`personality_ruthless_capitalists_room`). Falls er nicht passt, Alternativen: `personality_peaceful_traders_room`, `gilded_room`.
- **Konzernrat:** Hinter jedem Namen die Art des Konzerns.
- **Gespräch:** Zeile mit Art, Hauptprodukt und Hauptsitz (Planetenname).
- **Was für ein Unternehmen führen Sie?:** Text passend zur Art, „Zurück zum Gespräch“ zeigt wieder denselben Vorstand.
- **Rüstungsvertrag** (nur bei Industriekonzernen):
  - gesperrt mit Begründung, wenn ein anderer Vertrag läuft oder die Kasse unter 5000 liegt;
  - sonst öffnet sich das gewohnte Angebot (pe.306) mit dem gewählten Konzern;
  - bei unserem Rüstungskonzern stattdessen „kündigen“: Modifikator weg, Antwort des Vorstands (pe.339); im nächsten Quartal enden Rüstungsaufträge und Rüstungszentrum; danach ist die Anfrage bei ihm fünf Jahre gesperrt.
- **Kriegsleasing** (nur im Krieg): öffnet das gewohnte Angebot (pe.282) des gewählten Konzerns; gesperrt, solange eine Konzernflotte geleast ist.
- **Mehrfach klicken:** Der Rat öffnet sich nur einmal; nach dem Schließen wieder normal.
- **Nebenwirkungen:** Holdings-Zitadellen treten weiter unseren Kriegen bei, obwohl die Holdings keine Kommunikation mehr mit fremden Reichen haben.

## 0.47.2

## Aufbau

- Die Private Holdings (`pe_holdings`, ein Hilfsreich pro Reich mit Konzernen) stehen jetzt in der Kontaktliste (`show_in_contacts_list = yes`). Kontakt hat nur das eigene Reich.
- Öffnet man ihren Kontakt, löst `on_custom_diplomacy` das versteckte Ereignis pe.335 aus, wie bei Vanilla-Enklaven. Es öffnet den Konzernrat (pe.336).
- pe.336 zeigt das Porträt des Herrschers der Holdings, die Zeilen des Konzernregisters und eine Option pro aktivem Konzern.
- pe.337 ist das Gespräch mit einem Konzern. Der Vorstand ist ein Anführer der Holdings (`pe_council_ceo`):
  - Name `pe_magnate_<pe_c<k>_ceo>`, also derselbe Name wie in den bisherigen Nachrichten.
  - Spezies einer Pop-Gruppe auf dem Hauptsitz des Konzerns, sonst unsere Hauptspezies.
  - Unsterblich, ausgeblendet, Flag `pe_ceo_<k>`, Variable `pe_ceo_cn` = Namensnummer des Konzerns.
  - Er wird beim ersten Gespräch angelegt. Übernimmt ein neuer Konzern den Platz, geht der alte Vorstand.
- Die Option „Über eine Ausschreibung sprechen“ ist gesperrt (kommt mit 0.49).
- Konsole: `event pe.336` öffnet den Konzernrat auch ohne Kontaktliste.

## Prüfen

- **Kontaktliste:** Erscheinen die Private Holdings? Welches Porträt zeigt der Eintrag?
- **Öffnen:** Öffnet ein Klick den Konzernrat statt des normalen Diplomatiefensters? Kommt danach zusätzlich ein leeres Fenster?
- **Konzernrat:** Stimmen Porträt und Raum? Erscheinen alle Konzerne als Option?
- **Gespräch:** Zeigt das Porträt den Vorstand (eigene Spezies oder die des Hauptsitzes)? Stimmt der Name im Text mit dem Namen unter dem Porträt überein? Zeigt ein zweites Gespräch mit demselben Konzern dasselbe Gesicht?
- **Zurück:** Führt „Zurück zum Konzernrat“ wieder zur Auswahl, und zeigt ein anderer Konzern danach ein anderes Gesicht?
- **error.log:** keine Fehler zu `create_leader`, `pe_council_*`, `pe.335` bis `pe.337`.
- **Nebenwirkungen:** Die Stationen und Zitadellen der Holdings verhalten sich wie vorher. Die Holdings erscheinen nicht in der Kontaktliste anderer Reiche.
