# Prototyp Konzernrat (0.47.2)

Statisch geprüft (Validator). Im Spiel noch nicht getestet.

## Aufbau

- Die Private Holdings (`pe_holdings`, ein Hilfsreich pro Reich mit Konzernen) stehen jetzt in der Kontaktliste (`show_in_contacts_list = yes`). Kontakt hat nur das eigene Reich.
- Öffnet man ihren Kontakt, löst `on_custom_diplomacy` das versteckte Ereignis pe.335 aus, wie bei Vanilla-Enklaven. Es öffnet den Konzernrat (pe.336).
- pe.336 zeigt das Porträt des Herrschers der Holdings, die Zeilen des Konzernregisters und eine Option pro aktivem Konzern.
- pe.337 ist das Gespräch mit einem Konzern. Der Vorstand ist ein Anführer der Holdings (`pe_council_ceo`):
  - Name `pe_magnate_<pe_c<k>_ceo>`, also derselbe Name wie in den bisherigen Nachrichten.
  - Spezies einer Pop-Gruppe auf dem Hauptsitz des Konzerns, sonst unsere Hauptspezies.
  - Unsterblich, ausgeblendet, Flag `pe_ceo_<k>`, Variable `pe_ceo_cn` = Namensnummer des Konzerns.
  - Er wird beim ersten Gespräch angelegt. Übernimmt ein neuer Konzern den Platz, geht der alte Vorstand.
- Die Option „Über eine Ausschreibung sprechen“ ist gesperrt (kommt mit 0.48).
- Konsole: `event pe.336` öffnet den Konzernrat auch ohne Kontaktliste.

## Prüfen

- **Kontaktliste:** Erscheinen die Private Holdings? Welches Porträt zeigt der Eintrag?
- **Öffnen:** Öffnet ein Klick den Konzernrat statt des normalen Diplomatiefensters? Kommt danach zusätzlich ein leeres Fenster?
- **Konzernrat:** Stimmen Porträt und Raum? Erscheinen alle Konzerne als Option?
- **Gespräch:** Zeigt das Porträt den Vorstand (eigene Spezies oder die des Hauptsitzes)? Stimmt der Name im Text mit dem Namen unter dem Porträt überein? Zeigt ein zweites Gespräch mit demselben Konzern dasselbe Gesicht?
- **Zurück:** Führt „Zurück zum Konzernrat“ wieder zur Auswahl, und zeigt ein anderer Konzern danach ein anderes Gesicht?
- **error.log:** keine Fehler zu `create_leader`, `pe_council_*`, `pe.335` bis `pe.337`.
- **Nebenwirkungen:** Die Stationen und Zitadellen der Holdings verhalten sich wie vorher. Die Holdings erscheinen nicht in der Kontaktliste anderer Reiche.
