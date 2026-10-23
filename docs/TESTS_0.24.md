# Version 0.24 – Testablauf

Ein laufendes Spiel kann weiterlaufen. Firmen bekommen im nächsten Quartal ihre Firmennummer, danach entstehen die ersten Verträge.

## Lieferketten
- **Wer mit wem:**
  - Eine private **Mine** beliefert Stahlwerke und Fabriken (Mineralien).
  - Eine private **Fabrik** beliefert Labore, Handels- und Medienhäuser (Konsumgüter).
  - Bei katalytischer Verarbeitung beliefert ein privater **Agrarbetrieb** die Stahlwerke (Nahrung) statt der Mine.
- **Wie Verträge entstehen:**
  - Pro Quartal höchstens ein neuer Vertrag je Lieferantenart.
  - Ein Lieferant beliefert höchstens 2 Abnehmer, ein Abnehmer hat einen Lieferanten. Beide können auf verschiedenen Planeten sein oder auf demselben.
  - Bei dir kommt eine Nachricht: „Eine private Mine auf X beliefert jetzt eine Firma auf Y.“
- **Bonus:** Beide Planeten bekommen den Modifier „Lieferverträge: Branche“, +5 % Ertrag der Branche dort (auch für Staatsjobs). Ingenieurslabore: halber Wert auf alle Forscher. Pro Branche und Planet gibt es nur einen solchen Modifier, egal wie viele Verträge.
- **Bruch:** Verschwindet ein Lieferant (Pleite, Umbau in ein anderes Produkt, Räumung, Verstaatlichung), endet der Vertrag. Bei dir kommt eine Nachricht. Der Abnehmer sucht erst nach einem Jahr wieder.
  - Wachstum, Schrumpfen und Umzug beenden den Vertrag nicht, die Firmennummer bleibt.
- **Umbau:** Eine Firma mit Vertrag (als Abnehmer oder Lieferant) braucht 50 % mehr Vorsprung, bevor sie umbaut.

## Debug
- `event pe.7`, dann `event pe.279`: Lieferketten-Schritt sofort. Das Log nennt die zuletzt verbundenen Firmennummern.

## Prüfen
1. Nach ein bis zwei Quartalen: Nachrichten über neue Lieferverträge. Auf beiden Planeten erscheint der Modifier „Lieferverträge“.
2. Eine Lieferfirma räumen (Gelenkt/Gemischt) oder verstaatlichen: Nachricht über das Ende, der Modifier verschwindet im Quartal danach (falls kein anderer Vertrag der Branche dort besteht).
3. Logs: keine Fehler aus pe_economy_effects.txt (pe_supply_step) oder pe_corp_effects_generated.txt.

## 0.24.1: Konzern-Dyson-Schwarm, Konzernproduktion 150 %
- **Konzernproduktion:**
  - Stationen und Schwärme bringen dem Konzern jetzt das **Anderthalbfache** ihres Werts in seinem Produkt, statt des Doppelten.
  - Das Produkt hängt am Typ des Konzerns: Ein Rohstoffkonzern aus einem Kraftwerk produziert Energie, ein Forschungskonzern Forschung usw.
- **Schwarm wie in Vanilla:**
  - Der Schwarm ersetzt die Station am Stern.
  - Eine Station von uns dort wird abgebaut und bezahlt: unter Laissez-faire mit den Baukosten, sonst mit dem Doppelten.
  - Der Konzern übernimmt keine Station mehr am Stern.
- **Wert des Schwarms:**
  - Der Schwarm erntet das Sternvorkommen selbst, für die Holdings.
  - Das zählt jetzt als Konzernproduktion: Vorkommen × 6 / 16 / 31 je Stufe, davon das Anderthalbfache.
  - Beispiel: Physik 3 auf Stufe I ergibt 18 Physik, das sind 63 Wert zu Grundpreisen. Davon das Anderthalbfache: etwa 95 Energie bei einem Energiekonzern.
  - Vorher zählte der Schwarm gar nicht, weil keine Station am Stern stand.
- **Ausbau:** bis Stufe III (8000 aus der Kasse, mit Dyson-Sphären-Technologie), nie eine Dyson-Sphäre.
- **Schwarm verloren:**
  - Ein Schwarm, der abgebaut oder zerstört ist oder außerhalb unserer Grenzen liegt, beendet den Konzernschwarm.
  - Der Konzern kann dann wieder einen bauen.

### Prüfen
1. Dein Konzern mit Schwarm: Im Firmenregister steigt die Konzernproduktion nach dem nächsten Quartal deutlich. Beim Schwarm mit Physik 3 auf Stufe I kommen etwa +95 dazu.
2. Am Schwarm-Stern ist keine Station.
3. Logs: keine Fehler aus pe_fleet_effects.txt oder pe_corp_effects_generated.txt.

