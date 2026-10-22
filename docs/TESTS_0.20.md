# Version 0.20 – Testablauf

Ein laufendes Spiel kann weiterlaufen.

## Firmenkredite
Konzerne verleihen aus ihrer Kasse an alle Firmen, auch an unabhängige und an Firmen anderer Konzerne. Gefragt wird zuerst der eigene Konzern, dann der mit der meisten Kasse. Ein Konzern verleiht, solange seine Kasse nicht unter −200 fällt (Kreditlinie).
- **Wachstumskredit:** Will eine Firma wachsen (alle Bedingungen erfüllt), hat aber nicht genug Kapital, leiht sie sich den Rest. Die Wachstumsstufe kommt sofort, höchstens eine Stufenänderung pro Planet und Quartal.
- **Überbrückungskredit:** Bei Verlusten deckt ein Kredit das Minus, statt dass die Firma schrumpft. Das geht höchstens zwei Jahre (8 Quartale) in Folge; danach schrumpft sie oder geht pleite wie bisher. Ein Quartal mit Gewinn beendet die Serie.
- **Zinsen und Tilgung:** 3 % pro Quartal. Der Gewinn tilgt zuerst den Gründungskredit des Pools, dann den Konzernkredit. Erst danach wird ausgeschüttet.
- **Umbau:** nur ohne Schulden (unverändert: eigenes Kapital).
- **Ausfall:** Geht eine Firma pleite, wird geräumt oder verstaatlicht, verliert der Gläubiger den Rest des Kredits.
- **Konzernkrise:** Fällt die Kasse eines Konzerns unter 0, verkauft er pro Quartal eine Firma. Sie wird unabhängig, der Pool zahlt ihm 30 % der Distriktkosten × Stufengröße. Dazu kommt eine Nachricht. So können sich Ausfälle durch die Wirtschaft ziehen.
- Kredite bleiben bei Wachstum, Schrumpfen und Umzug an der Firma.

## Prüfen
1. `event pe.273`: Kassen der Konzerne; nach ein paar Jahren auch einmal unter 0 (Kreditlinie genutzt).
2. Firmen wachsen jetzt auch mit wenig Kapital (Nachrichten „ist gewachsen“), wenn ein Konzern Kasse hat.
3. Seltener „pleite“ und „geschrumpft“, solange Konzerne Kredit geben.
4. Gelegentlich „hat sich mit Krediten übernommen und verkauft ein Unternehmen“.
5. Logs: keine Fehler aus pe_corp_effects_generated.txt oder pe_economy_effects.txt.
