# Tests 0.46.0

Statisch geprüft (Validator). Im Spiel noch nicht getestet. Ein laufendes Spiel übernimmt die Regeln im nächsten Quartal.

## Lieferantenwahl

- Ein Abnehmer ohne Vertrag (Stahlwerk, Fabrik, Handelshaus, Labor, Medienhaus) nimmt den besten Lieferanten mit freiem Platz:
  1. die höchste Stufe,
  2. bei gleicher Stufe einer aus dem eigenen Konzern,
  3. dann das meiste Geld (`pe_fcap`).
- Bis zu zwei neue Verträge je Lieferantenart und Quartal.
- **Prüfen:** Die Nachricht „Liefervertrag“ nennt als Lieferanten-Planeten den einer großen oder mittelständischen Mine beziehungsweise Fabrik, nicht einen zufälligen.

## Kapazität

- Klein 1, normal 2, mittel 3, groß 4 Abnehmer (`pe_sup_n` höchstens Stufe + 1).
- Hat ein Lieferant mehr Abnehmer, verliert er die zuletzt gewonnenen (`pe_sup_seq`). Nachricht „Liefervertrag beendet: Ihr Lieferant ist geschrumpft …“. Der Abnehmer sucht sofort neu.
- **Laufende Spiele:** Kleine Lieferanten mit zwei Abnehmern verlieren im ersten Quartal einen. Ältere Verträge haben kein `pe_sup_seq`; dann entscheidet der Zufall.

## Gewinn

- `pe_firm_book`: Der Rohgewinn (vor den Fixkosten) wird multipliziert mit 1 + 0,05 × Abnehmer, mit Lieferant zusätzlich + 0,1.
- **Prüfen:** Im Firmenregister verdient eine Mine mit Abnehmern mehr als eine gleich große ohne. Die Gewinnauszahlung des Staats steigt leicht.

## Versorgungssicherheit

- Ein Abnehmer mit Vertrag, der verbraucht, was dem Reich fehlt, baut frühestens nach 4 Jahren (16 Quartalen) um, mit zwei Dritteln der Schwelle. Ohne Vertrag sind es 2 Jahre und ein Drittel.
- **Prüfen:** Bei einem Mineraliendefizit bauen zuerst Stahlwerke und Fabriken ohne Vertrag um.

## Unverändert aus 0.45.4

- Wachsen, Umziehen und Fusionieren beenden keinen Vertrag. Bei einer Fusion übernimmt die verbleibende Firma die Abnehmer der anderen.
- Ein Abnehmer, der in eine Branche umbaut, die die Ware nicht braucht, verlässt den Vertrag still.

## 0.46.1: die richtige Firma geht

- `pe_dep_remove` (und inline in `pe_relocate_exec`): Vor `remove_deposit` übernimmt die Firma die Daten einer anderen mit gleichem `pe_code` und `pe_stage` auf dem Planeten (Ruinen: `pe_ruin_code`, `pe_ruin_corp`).
- `pe_supply_step`: Doppelte `pe_fid` eines Reichs bekommen eine neue Nummer.
- **Prüfen im Spielstand:** Nach einem Quartal gibt es keine doppelte `pe_fid` je Reich mehr (vorher: Minen auf Planet 383 dreimal Nummer 6, KI-Reiche ebenfalls).
- **Prüfen im Spiel:** Lieferketten-Nachrichten kommen nur noch bei echten Änderungen, nicht mehr jedes Quartal „Lieferant geschrumpft“ plus neuer Vertrag.
- **Prüfen:** Firmen werden beim Wachsen, Umziehen, Umbauen und Fusionieren weiterhin normal ersetzt; keine Firma verschwindet ohne Nachricht.
