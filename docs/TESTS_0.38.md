# Tests 0.38.0

Statisch geprüft (Validator einschließlich der Codex-Tests). Im Spiel noch nicht getestet. Anlass ist die Save-Reihe Queptilium 2221–2296.

## 1. Legierungen und Mineralien

- **Befund:**
  - Seit etwa 2289 ist das Legierungslager voll, rund +1.900 im Monat gehen verloren.
  - 48 Firmen haben Legierungen als Hauptprodukt und verbrauchen 2.700 Mineralien im Monat. 2295 lagen Energie und Mineralien bei −190 / −239.
  - Neue Stahlwerke entstanden nicht mehr, die bestehenden bauten aber nicht um. Ein Umbau ist nur alle fünf Jahre pro Planet möglich, mit mindestens 30 % Gewinn.
- **Legierungen bleiben das Endziel:** Bei vollem Lager (ab 95 %) fällt ihr interner Preis nie unter die Hälfte des Grundwerts (2 statt 4, danach mal Investitionsfaktor). Das gilt auch für Nahrung bei Bio-Schiffen.
- **Schutz der Rohstoffe:** Eine Firma, die etwas verbraucht, das dem Reich fehlt (`pe_firm_short`, aus den bestehenden `pe_ok_<Variante>`):
  - darf schon ein Jahr nach dem letzten Umbau auf dem Planeten umbauen statt nach fünf (Flag `pe_retool_scd`);
  - braucht dafür nur ein Drittel des sonst nötigen Gewinns (10 % statt 30 %).
  - Codex' Versorgungsprüfung (`pe_retool_guard`) gilt weiter.
- **Prüfen:**
  - Bei Mineralienmangel bauen Stahlwerke nach und nach in andere Firmen um (Nachricht „umgebaut“), etwa eins pro Planet und Jahr.
  - Der Preis der Legierungen bricht bei vollem Lager nicht ein (Register oder Variable `pe_s_alloys`).

## 2. Arbeitslosigkeit

- **Befund 2296:** Auf den Habitaten mit den meisten Arbeitslosen galt Firmen = Quote (14/14, 13/13, 16/16), obwohl noch 5–7 Distriktplätze frei waren. Die Quote der Wirtschaftsordnung war ausgeschöpft, und der Staat baute die freien Plätze nicht.
- **Jetzt:**
  - Solange auf einem Planeten Pops arbeitslos sind, dürfen die Investoren über die Quote hinaus gründen: eine Firma mehr je 200 Arbeitslose. Der letzte freie Platz bleibt frei.
  - Firmen, die so entstanden sind (`pe_xq`), werden nicht verstaatlicht, wenn die Arbeitslosigkeit vorbei ist. Wechselt die Wirtschaftsordnung zur Planwirtschaft, zählen sie nicht mehr.
  - Bei mindestens 600 Arbeitslosen (nach Abzug der Jobs, die laufende Baustellen bringen) darf eine zweite Baustelle gleichzeitig laufen.
  - Konzern-Habitate haben ohnehin keine Quote.
- **Prüfen:**
  - Auf einem Planeten mit vielen Arbeitslosen und freien Plätzen entstehen neue Firmen, auch wenn die Quote erreicht ist.
  - Wenn die Arbeitslosen weg sind, werden diese Firmen nicht verstaatlicht.
  - Ein Wechsel zu einer strengeren Wirtschaftsordnung verstaatlicht weiter alles über Quote plus `pe_xq`.

## 3. Konzernkredite und Sanierung

- **Befund:** Kessler-Orin hielt eine eigene Firma mit Krediten am Leben, 3.854 → 4.045 in sechs Monaten.
  - Die Firma verdiente 13–23 im Quartal, die Zinsen lagen bei etwa 120 (3 % im Quartal mit Zinseszins).
  - Die Grenze von acht Überbrückungsquartalen wurde nach jedem Gewinnquartal zurückgesetzt.
- **Jetzt:**
  - Ein Kredit des eigenen Konzerns kostet 1 % im Quartal statt 3 %.
  - Liegt der Gewinn einer Firma vier Quartale in Folge unter den Zinsen (3 % des Kredits), ist sie ein Sanierungsfall (`pe_zq`). Pro Quartal wird ein Fall behandelt.
  - **Menschliche Reiche** bekommen höchstens alle zwei Jahre das Event **pe.321 „Ein Sanierungsfall“**:
    - a) **Schulden gegen Anteile:** Der Konzern schreibt den Kredit ab und übernimmt die Firma, falls sie unabhängig war. Sie schrumpft um eine Stufe.
    - b) **Staatsbürgschaft:** Wir zahlen dem Konzern ein Viertel des Kredits in Handel, die Firma behält ihre Jobs.
    - c) **Insolvenz:** Die Firma schließt, der Konzern verliert den Kredit.
  - Andere Fälle, KI-Reiche und stummgeschaltete Krisenmeldungen: Der Konzern entscheidet selbst, wie in a (pe.322, ohne Fenster).
  - Jeder Fall schreibt ins game.log: `restructuring by corporation slot K on <Planet>: mode M, loan L`.
- **Prüfen:**
  - Event pe.321 erscheint bei einer Firma mit wachsendem Konzernkredit.
  - Nach a ist die Firma eine Stufe kleiner und ohne Kredit.
  - Nach b ist der Handel abgezogen und die Konzernkasse höher.
  - Nach c ist der Platz frei.
