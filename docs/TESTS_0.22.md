# Version 0.22 – Testablauf

Ein laufendes Spiel kann weiterlaufen.

## Konzernflotten
Die Flotten gehören dem Konzern (gehalten von deinen Private Holdings) und werden dir verleast. Du befehligst sie und zahlst 10 % Unterhalt als Leasinggebühr (mehr nimmt die Engine nicht ab). Sie belegen keine Flottenkapazität.

**Kriegsleasing (Event pe.282):**
- Bist du im Krieg, bietet ein Industriekonzern mit mindestens 600 Kasse eine Flotte an (30 % pro Quartal, dann 5 Jahre Pause).
- Sie besteht aus Schiffen der größten Klasse, für die du die Technik hast (Korvette bis Schlachtschiff), nach deinem neuesten Entwurf.
- Stärke: etwa ein Viertel deiner Flottenstärke (mindestens 500), höchstens so viel, wie die halbe Konzernkasse bezahlt (Korvette 150, Zerstörer 300, Kreuzer 600, Schlachtschiff 1200), höchstens 12 Schiffe.
- Sie erscheint an der Hauptstadt.
- Nach 5 Jahren (Event pe.283): kaufen für Legierungen (40 / 80 / 160 / 320 pro Schiff) oder zurückgeben. Die KI kauft, wenn sie 500 Legierungen hat.

**Säuberung gegen Beuterechte (Event pe.284):**
- Sitzen feindliche Weltraumkreaturen (Amöben, Kristalle, Drohnen, Leerenwürmer) in einem herrenlosen System neben deiner Grenze, bietet ein Konzern mit mindestens 600 Kasse eine Flotte an (25 % pro Quartal, dann 4 Jahre Pause).
- Stärke: das 1,5-Fache der Kreaturen, höchstens 80 % der Konzernkasse.
- Sie erscheint im angrenzenden System deiner Grenze.
- Ist das Zielsystem frei: Die Flotte kehrt zurück. Der Konzern bekommt ein Drittel der Kreaturenstärke als Beute plus seine Schiffskosten. Du bekommst ein Zwanzigstel als Gesellschaftsforschung (mindestens 25). Event pe.285.
- Nach 3 Jahren oder wenn die Flotte zerstört ist, endet der Vertrag ohne Beute.

## Änderungen 0.22.1 (nach dem ersten Test)
- **Kriegsleasing blieb aus:** Du hattest nur einen Konzern, einen Rohstoffkonzern. Angeboten hatten bisher nur Industriekonzerne. Jetzt springt ein anderer Konzern ein, wenn kein Industriekonzern 600 Kasse hat; er braucht dafür 1200.
- **Kommandant:** Jede Konzernflotte bekommt einen Kommandanten der Holdings (Fähigkeit 2). Er zählt nicht gegen dein Anführerlimit. Er geht mit der Flotte, wenn sie zurückgegeben wird. Kaufst du die Flotte, setzt du deinen eigenen ein.
- **Säuberung im Save geprüft:** Kreaturenstärke 2332, Flotte aus 5 Kreuzern für 3000. Beute für den Konzern 3816 (einschließlich der Schiffskosten), für dich 117 Gesellschaftsforschung.

## Debug
- `event pe.277`: beide Angebote sofort (Kriegsleasing auch im Frieden; Säuberung nur, wenn Kreaturen an der Grenze sitzen). Pausen und Zufall gelten nicht.

## Prüfen
1. `event pe.277`: Event pe.282 erscheint, und nach Annahme gibt es eine Flotte an der Hauptstadt.
   - Steuerbar, Eigentümer: deine Holdings.
   - Modifier „Geleast von den Private Holdings“.
   - Keine Flottenkapazität belegt.
   - Die Kasse des Konzerns sinkt (`event pe.273`).
2. Mit Kreaturen an der Grenze: Event pe.284, Flotte im Grenzsystem. Kreaturen besiegen, dann im nächsten Quartal Event pe.285 mit Beute und Forschung.
3. Konsole `event pe.283` testet das Ende des Kriegsleasings nicht direkt. Dafür 5 Jahre laufen lassen oder über die Konsole `pe_lease_war_q` setzen.
4. Logs: keine Fehler aus pe_fleet_effects.txt oder pe_fleet_events.txt.
