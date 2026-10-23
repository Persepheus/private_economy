# Version 0.28 – Testablauf

Ein laufendes Spiel kann weiterlaufen.

## Eroberung und Abtretung (endgültiger Besitzerwechsel)
Das Ereignis `on_colony_transfer` feuert bei jedem neuen Besitzer: Frieden, Abtretung, totaler Krieg, Handel.

### Der frühere Besitzer gibt ab
- **Firmen des Planeten:**
  - Sie verlassen unsere Konzerne.
  - Konzernkredite werden abgeschrieben.
  - Lieferverträge enden; die Partner im alten Reich bekommen die übliche Nachricht.
  - Die Firmennummern werden neu vergeben.
- **Alte Verträge:** Liefervertrag (Deal), Ersparnisse und Aktien-Zeile verschwinden vom Planeten.
- **Konzern mit Hauptsitz auf dem Planeten:**
  - Er **zieht mit dem Planeten um**. Seine Daten (Name, Kasse, Branche, Vorstand, Produkt) gehen mit.
  - Seine Firmen anderswo im alten Reich werden unabhängig. Kredite, die er dort vergeben hat, werden abgeschrieben.
  - Sein Platz im alten Reich wird frei: Stationen, Dyson-Schwarm und Arc Furnace gehen an das alte Reich.
  - Das alte Reich bekommt eine Nachricht.

### Der neue Besitzer übernimmt
- **Ohne eigene Privatwirtschaft** (kein normales Reich, Gestalt, Planwirtschaft):
  - Alle Firmen werden sofort Staatsdistrikte ihres Typs, wie bei der Planwirtschaft.
  - Hauptsitze verschwinden.
- **Mit Privatwirtschaft:**
  - Die Firmen gehören ab sofort zur neuen Wirtschaft.
  - Ein mitgekommener Konzern bekommt einen freien Platz, mit Nachricht. Seine Firmen auf dem Planeten bleiben seine.
  - **Gibt es schon 2 Konzerne seiner Branchengruppe oder ist kein Platz frei, wird er aufgelöst.** Hauptsitz weg, Firmen unabhängig, Nachricht.
- **Niedrigere Wirtschaftsordnung beim neuen Besitzer:** Hat der Planet mehr Firmen, als die Ordnung erlaubt, verstaatlicht der Staat wie üblich eine Firma pro Quartal, wenn er sie bezahlen kann. Es wird also langsam reduziert.
- **Kein früherer Besitzer** (zerstörtes Reich) oder einer ohne Privatwirtschaft: Konzernbindungen, Kredite und Hauptsitze des Planeten werden vorher gelöscht.

### Stationen und Megastrukturen im abgetretenen Gebiet
Quartalsweise gilt: Stationen, Dyson-Schwärme und Arc Furnaces unserer Holdings in einem System, das jetzt einem anderen Reich gehört, gehen an dieses Reich. Unsere Konzerne verlieren sie. Das gilt in beide Richtungen:
- **Konzern zieht weg:** Sein Platz bei uns wird frei, seine Stationen und Megastrukturen gehen an uns.
- **System geht an ein anderes Reich:** Die Stationen dort gehen an dieses Reich.

## Debug
- **`event pe.134`:** Dein Planet mit den meisten Firmen (nicht die Hauptwelt) geht an ein anderes normales Reich. Das löst denselben Ablauf aus wie ein Friedensvertrag. Das Log nennt Planet und Reich.
- **`event pe.135`:** Du holst ihn zurück. Dabei laufen beide Richtungen.

### Prüfen
1. Vorher speichern. Dann `event pe.7` und `event pe.134` auf einen Planeten mit Konzernfirmen und möglichst einem Hauptsitz.
   - Nachricht „Hauptsitz verloren“, falls einer dort war.
   - Im Firmenregister fehlt der Konzern, seine anderen Firmen sind unabhängig.
2. Den Planeten über die Planetenliste des anderen Reichs ansehen:
   - Firmen-Vorkommen und Hauptsitz sind noch da.
   - Im Save stehen die Firmen beim neuen Reich: pe_corp = neuer Platz oder 0.
3. `event pe.135`:
   - Der Konzern kommt mit dem Planeten zurück, mit Nachricht „unter unsere Herrschaft gekommen“.
   - Oder er wird aufgelöst, falls inzwischen zwei Konzerne seiner Gruppe existieren.
4. Logs (error.log) und Save hochladen.

## Bombardement
Unverändert seit 0.27.2, siehe [TESTS_0.27.md](TESTS_0.27.md).
