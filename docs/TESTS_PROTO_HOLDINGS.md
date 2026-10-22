# Prototyp: Private Holdings (Hilfsreich)

Ziel: Prüfen, ob ein Hilfsreich Stationen, Kilostrukturen und Flotten in unserem Raum besitzen kann und ob das Leasing von Flotten funktioniert. Erst danach bauen wir daraus Mechaniken. Alles läuft per Konsole, ohne Einfluss auf das normale Spiel.

## Schritte
1. `event pe.15`: Das Hilfsreich „Private Holdings“ entsteht (eigener Länder-Typ, ohne KI, ohne Grenzen). Es bekommt 1000 Energie, 500 Mineralien und 200 Legierungen.
   - Prüfen: Erscheint es in der Kontaktliste? Hat es eine Flagge? Gibt es Fehler im error.log?
2. `event pe.16`: Eine Bergbaustation der Holdings auf einem freien Orbitalvorkommen in deinem Raum.
   - Prüfen: Ist die Station auf der Karte sichtbar und gehört sie den Holdings (Farbe, Tooltip)? Wird sie nach einem Monat noch angezeigt?
3. `event pe.17`: Ein Dyson-Schwarm (Stufe I) der Holdings an einem Stern in deinem Raum, mit dem Schwarm-Modifier auf dem Stern.
   - Prüfen: Ist der Schwarm sichtbar? Wem gehört er? Erscheint er in der Megastruktur-Liste von dir oder von niemandem?
4. `event pe.18`: Drei Korvetten deines neuesten Entwurfs, Eigentum der Holdings, an dich verleast (`set_controller`).
   - Prüfen: Kannst du die Flotte steuern? Was zeigt der Flotten-Tooltip (Eigentümer, Vertrag)? Wer zahlt den Unterhalt? Kämpft sie, und zählt sie zu deiner Flottenkapazität?
5. Ein paar Monate laufen lassen, dann `event pe.19`: Bericht mit Lager und Monatseinkommen der Holdings sowie ihren Stationen, Megastrukturen und Flotten.
   - Prüfen: Steigen ihre Mineralien bzw. ihre Energie (Station, Schwarm)? Wenn nicht, produzieren fremde Stationen nichts für ihren Eigentümer.
6. `event pe.20`: Die Holdings verkaufen dir ihre Mineralien und Energie zum halben Grundpreis. Der Handel geht in den Pool.
   - Prüfen: Kommen die Rohstoffe bei dir an? Ist der Handel abgezogen?
7. Speichern und laden, dann `event pe.19` erneut: Ist alles noch da?
8. Optional ein Krieg: Greifen Feinde die Station der Holdings an? Wird der Leasingvertrag gebrochen (Vanilla bricht Söldnerverträge bei Kriegsbeginn)?
9. `event pe.21`: Holdings mit allem entfernen.

## Was ich danach wissen will
- error.log und game.log (lese ich selbst).
- Kurz: Was war sichtbar und wem gehörte es (Station, Schwarm, Flotte)? Kannst du die Flotte steuern? Hat sich das Lager der Holdings verändert?
