# Version 0.8 – Testablauf

Ein laufendes 0.7-Spiel kann weiterlaufen.

## Neu

### Private Automatisierung
Firmen mit Kapital, aber ohne Arbeiter, automatisieren. Vorbild sind die Vanilla-Automatisierungsgebäude, die es nur für Arbeiterjobs gibt:

| Stufe | Tech | Wirkung | Investition | Wartung |
|---|---|---|---|---|
| I | Montagemuster (`tech_assembly_pattern`) | +25 % automatisierte Arbeitskraft | 600 | 8 pro Monat |
| II | Konstruktionsvorlagen (`tech_construction_templates`) | +50 % | 800 zusätzlich | 10 pro Monat |

- Gilt für **Privat-Bergleute, -Techniker und -Bauern**. Der Modifikator wirkt planetenweit für alle Privatjobs dieses Typs, nicht für deine Staatsjobs.
- **Gemeinsame Investition** aller Firmen des Planeten mit diesem Job:
  - Investition und Wartung zahlen die Firmen aus ihrem Kapital, anteilig nach Kapital.
  - **Du zahlst keinen Unterhalt.**
- **Ertrag:** Automatisierte Jobs brauchen keine Pops und keine Löhne. Ihr voller Wert geht an die Firmen, nach Arbeitskraft verteilt. Können sie einen Verlust nicht tragen, fällt die Stufe weg (mit Nachricht).
- **Auslöser:**
  - keine freien Zivilisten auf dem Planeten
  - mindestens 400 Privat-Arbeitskraft des Typs
  - Tech vorhanden
  - Die Firmen können zahlen.
  - Der automatisierte Wert ist mindestens 1,5× die Wartung.
- Sichtbar als Deposit „Private Automatisierung (Bergbau) I/II“, belegt keinen Platz.

### Rücklage
- Jede Firma behält so viel Kapital, wie ihr eigener Umbau kostet (Stadt 250, Land 150 × Stufengröße), plus die nächste Wachstumsstufe, solange sie noch kein Konzern ist.
- Darüber geht alles an den Investorenpool. Konzerne können damit jetzt auch umbauen.

## Prüfen
1. Planet mit vielen privaten Minen oder Farmen, keinen freien Zivilisten, Tech Montagemuster: Nach einigen Quartalen erscheint „Private Automatisierung (…) I“ mit Nachricht. Die Jobs sind teilweise ohne Pops besetzt.
2. Dein Energie-Tooltip zeigt **keinen** Unterhalt für die Automatisierung.
3. Firmenkapital wächst nicht mehr unbegrenzt. Der Überschuss erscheint als Pool-Einnahme.
4. Ein Konzern baut um, wenn ein deutlich besseres Ziel möglich ist.
5. Logs: error.log nach `pe_auto`, `automated_workforce` und `pe_wf_` durchsuchen.

## 0.8.1

- **Spezialisierung stärker:** Anteile, die zur Spezialisierung des Planeten passen, zählen ×1,6 (vorher 1,25). Auf spezialisierten Planeten zählen alle anderen Anteile ×0,8. Auf Bergbau- und Forschungswelten entstehen dadurch kaum noch Stahlwerke.
- **Mangelgrenze:** Eine Ressource gilt schon als knapp, wenn ihr Netto (inklusive Baustellen) unter max(5, 5 % der Bruttoproduktion) liegt, höchstens 50. Das gilt für Defizit-Sperre, Preisaufschlag und Überschussband. Die Wirtschaft hält so einen Puffer und rutscht nicht ins Minus, aus dem sie ohne Pops nicht mehr herauskommt.
- **Automatisierung zugänglicher:**
  - Die Wartung (8 bzw. 10 Energie) wird zum Energie-Schattenpreis bewertet, ist bei Energieüberschuss also billig.
  - Investiert wird, sobald der Ertrag die Wartung deckt (vorher das 1,5-Fache).
  - Schon ab 200 Privat-Arbeitskraft des Typs (vorher 400).
  - Fehlt den Firmen Kapital, schießt der Investorenpool den Rest zu.

**Prüfen:** Planet ohne freie Zivilisten mit mindestens einer privaten Mine oder Farm und Tech *Montagemuster*. Nach ein bis zwei Quartalen (`pe.7`) erscheint die Automatisierung, sofern der Bergmann- bzw. Bauern-Wert in `pe.6` die Wartung trägt. Bei sehr billigen Mineralien (Überschuss) lohnt sie sich bewusst nicht.
