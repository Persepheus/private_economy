# Tests 0.42.0

Statisch geprüft (Validator einschließlich der Codex-Tests). Im Spiel noch nicht getestet. Anlass ist die KI-Analyse im Save Queptilium 2301: Die KI produziert ein Viertel bis ein Zehntel deiner Legierungen, hortet Legierungen und hat brachliegendes Privatkapital.

## Wirtschaftsordnung der KI

- **Regel:** Jedes Quartal prüft die Mod die Wirtschaftsordnung der KI-Reiche (`pe_ai_order`). Auch die `ai_weight` der Richtlinie folgen dieser Regel. Planwirtschaft wählt die KI nie.
  - Megakonzerne und egalitäre Reiche: Laissez-faire.
  - Fanatisch autoritäre Reiche: Gelenkt.
  - Autoritäre Reiche: Gemischt.
  - Alle anderen: Freie Marktwirtschaft.
- **Alte Saves:** KI-Reiche wechseln beim nächsten Quartal.
- **Log:** `AI economic order set to <Ordnung>`, einmal pro Wechsel.
- **Prüfen:** In der Reichsübersicht der KI steht die passende Ordnung. In späteren Saves haben die KIs mehr Firmen.

## Rüstungsaufträge der KI

- KI-Reiche bekommen das Angebot schon ab halbvollem Legierungslager oder 10.000 Legierungen, alle fünf Jahre statt alle zehn.
- Sie nehmen es zu 80 % an, wenn ihr Handel für die Gebühr reicht.
- Für dich gilt weiter: ab 90 %, alle zehn Jahre.

## Staatsanleihen aus brachliegendem Privatkapital (nur KI, ab 0.42.1)

- Hat der Investorenpool mehr als 10.000, leiht er dem Staat den Überschuss zinslos, als Handel ins Lager. Es wird nur so viel überwiesen, wie ins Lager passt, mindestens 100.
- Fällt der Pool unter 3.000, zahlt der Staat zurück: höchstens 2.000 pro Quartal und nur, solange er mindestens das Doppelte im Lager hat.
- Das gilt nur für KI-Reiche. Dein Pool bleibt unberührt; dein Handel darf sich durch Anleihen nicht ändern.
- Log: `AI state bonds: the investor pool lends …` bzw. `AI state bonds: repaid …`.

## Konzern-Habitat: Designation fest gesetzt (0.42.2)

- Ein Konzern-Habitat, das auf automatischer Designation stand und schon die passende hatte, hat sie nach dem nächsten Monat fest eingestellt.
- Stellst du danach selbst wieder auf automatisch, bleibt das so, solange die automatische Designation passt. Weicht sie ab, setzt der Konzern seine wieder.

## Firmenregister mit Scrollleiste (0.42.3)

- Das Register öffnet sich in einem eigenen Fenster (720 × 760) mit Titel, scrollbarem Text und „Schließen“.
- Ein langes Register lässt sich scrollen und ragt nicht mehr über den Bildschirm.
- error.log: keine Meldungen zu `pe_register_window` oder fehlenden GUI-Elementen.

## Lagervertrag: Gebühr 20 %

- Die Gebühr steigt von 5 % auf 20 % der monatlichen Nettoproduktion, weil das Firmenlager jetzt keinen Bauplatz mehr kostet.
- Laufende Verträge zahlen ab dem nächsten Monat 20 %.
