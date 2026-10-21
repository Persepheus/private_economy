# Version 0.16 – Testablauf

Ein laufendes Spiel kann weiterlaufen. Bestehende Firmen gelten als alt genug für einen Umbau.

## Korrekturen
- **Mäzen-Events waren teilweise kaputt:** Ein Syntaxfehler bei den privaten Kolonisten (`ethos = root`) hat die Datei ab dort zerlegt. Die Universität (pe.224) fehlte ganz („could not find event: pe.224“), die Kolonisten kamen ohne Siedler. Jetzt wie Vanilla: Kolonie anlegen, dann Siedler.
- **Gründung trotz leerer Jobs:** Während eines Umbaus sind die Arbeiter der alten Firma Zivilisten. Sie zählten als freie Pops, und eine neue Firma wurde gegründet. Danach holte die umgebaute Firma ihre Arbeiter zurück, und die neuen Jobs blieben leer.
  - Baustellen ziehen ihre künftigen Jobs (200 × Stufengröße) von den freien Pops ab, ebenso ein Wachstumsschritt (+100).
  - Eine fertige Baustelle einer neuen Firma öffnet erst, wenn auf dem Planeten mindestens 50 freie Pops sind.
  - Nach zwei Jahren Warten geben die Investoren auf und bekommen ihre Anzahlung zurück (Nachricht).
- **Kein Umzug mehr:** Ein Planet galt nur als festgefahren, wenn er keinen freien Distriktplatz hatte. Deine Planeten haben 9–19 freie Plätze, aber keine Arbeiter.
  - Jetzt reicht: keine freien Pops.
  - Die Hauptstadt passt zu keiner Firma. Sie gibt nur ab, wenn Firmen mindestens 2/3 ihrer belegten Distriktplätze halten (Staatsdistrikte plus Firmen und Baustellen), oder wenn ihr Wohnraum oder Annehmlichkeiten fehlen. Im Save: 17 Firmen, 4 Staatsdistrikte, also 81 %.
- **Pool zu groß (35.000 im Save):** Die Obergrenze kürzte nur die Zahlung des Staates (zuletzt auf 41 %), Firmen und Pool verbuchten trotzdem den vollen Gewinn. Jetzt bekommen sie nur, was der Staat zahlt. Der Anteil wird ein Quartal später angewendet.

## Werte
- **Gewinne plus Ersparnisse** höchstens **40 %** des Brutto-Handels (vorher 50 %).
- **Umbau:**
  - Eine Firma frühestens **10 Jahre** nach Gründung oder letztem Umbau; Wachstum und Umzug zählen nicht.
  - Ein Planet höchstens alle **5 Jahre** (vorher 2).
  - **Neu:** Nichts, was die alte Firma gemacht hat, darf danach knapp werden.
    - Marktgüter müssen über der Mangelgrenze bleiben.
    - Legierungen, Forschung und Einheit dürfen nicht unter ihren Zielanteil fallen.
    - Gezählt wird mit dem echten Ertrag pro Job; was die neue Firma davon selbst macht oder verbraucht, ist eingerechnet.
- **Mäzene:** Faktor = Einsatz / 1500, zwischen 0,5 und 3.
  - Mengen (Einheit, Forschung, Handel, Einfluss) wuchsen schon mit.
  - Jetzt auch die Modifier: Gala, Wohltätigkeit, Anwerbung, Kunst, Liga, Universität und Akademie, Tourismus, Katastrophenhilfe, Exportboom, Gentrifizierung.
  - Kolonisten: 100 × Faktor Siedler.
  - Prospektion: 1, 2 oder 3 Vorkommen.
  - Hydroponik: 15, 30 oder 45 Nahrung.
  - Einheit nach dem Gala-Skandal und bei abgelehnter Wohltätigkeit.
  - Nachteile bleiben fest.

## Prüfen
1. `pe.10` bis zur Universität: Sie erscheint. Kolonisten: Die Kolonie hat Siedler.
2. Ein Mäzen-Event mit großem Pool: Die Modifier im Tooltip sind größer als 1×.
3. Ein Umbau beginnt: Während der Bauzeit entsteht auf dem Planeten keine neue Firma.
4. Eine fertige Baustelle ohne freie Pops wartet. Nach zwei Jahren kommt „Investoren haben eine Baustelle aufgegeben“.
5. Innerhalb von ein, zwei Jahren zieht eine Firma von einem Planeten ohne freie Pops um. Auch die Hauptstadt gibt Firmen ab, bis Firmen dort unter 2/3 der belegten Plätze halten.
6. `pe.6`: Der Pool wächst deutlich langsamer. Gewinne plus Ersparnisse im Monat sind höchstens 40 % des Brutto-Handels.
7. Logs: keine Fehler aus pe_patron_events.txt.
