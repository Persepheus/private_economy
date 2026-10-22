# Version 0.19 – Testablauf

Ein laufendes Spiel kann weiterlaufen. Bestehende Firmen sind zunächst unabhängig. Konzerne entstehen ab dem nächsten Quartal aus Firmen der Stufe 3.

## Korrektur: Besonderes Angebot (pe.260)
- **Gut:** Gewählt wird das knappste Gut, also das mit dem niedrigsten Monatssaldo, das auch eine Privatfirma herstellt. Bisher wurde zufällig gewählt. `event pe.12` nimmt das knappste Gut auch ohne Firma.
- **Menge:** ein Jahr des echten Monatsdefizits, mindestens 100.

## Cluster
- Mehrere Firmen mit demselben Hauptprodukt auf einem Planeten:
  - 2 Firmen: +3 % Ertrag der Branche dort, auch für Staatsjobs.
  - 3 Firmen: +6 %.
  - 4 und mehr: +9 %.
  - Ingenieure: halber Wert auf alle Forscher.
- Sichtbar als Modifier „Stahl-Cluster (2 Firmen)“ usw.
- Neue Firmen derselben Branche dort sind pro vorhandener Firma 5 % mehr wert, höchstens 15 %.

## Konzerne
- **Entstehung:** Eine unabhängige Firma der Stufe 3 gründet einen Konzern (höchstens einer pro Quartal, höchstens 8 pro Reich).
  - Name aus 40 (10 je Branchengruppe: Industrie, Handel und Freizeit, Wissenschaft und Medien, Rohstoffe).
  - Ein Mäzen wird Vorstand.
  - Event pe.270.
- **Hauptsitz:** Modifier „Hauptsitz: Name“ (+1 Stabilität, +2 % Jobertrag). Planeten mit weiteren Konzernfirmen zeigen „Niederlassung: Name“ (+50 Annehmlichkeiten).
- **Kasse:** Die Hälfte dessen, was die Firmen des Konzerns an den Pool abgeben würden, geht in die Konzernkasse.
- **Übernahmen:** Mit genug Kasse übernimmt ein Konzern pro Quartal mit 35 % Chance eine unabhängige Firma seiner Branchengruppe.
  - Preis: halbe Distriktkosten × Stufengröße, Stadt 250, Land 150. Er geht an den Pool.
  - Dazu kommt eine Nachricht.
- **Preiskampf:** Zwei Konzerne derselben Gruppe mit je mindestens 3 Firmen geraten mit 10 % pro Quartal aneinander.
  - Event pe.271. Drei Jahre lang machen ihre Firmen 30 % weniger Gewinn, ihre Planeten produzieren 3 % mehr.
  - Schlichten für 25 Einfluss beendet ihn nach einem Jahr.
- **Fusion:** Nach dem Preiskampf will der Stärkere (mehr Firmen, dann mehr Kasse) den Schwächeren schlucken. Event pe.272:
  - Genehmigen: Firmen und Kasse wechseln.
  - Untersagen: Der Schwächere verliert ein Viertel seiner Kasse.
  - In beiden Fällen 10 Jahre kein neuer Preiskampf zwischen ihnen.
- **Auflösung:** Ein Konzern ohne Firmen wird aufgelöst (Nachricht).
- **Planwirtschaft:** Alle Konzerne enden.
- **Umbau, Wachstum und Umzug:** Die Firma bleibt in ihrem Konzern.

## Debug
- `event pe.14`: sofort einen Konzern gründen (vorher `event pe.7`).
- `event pe.273`: Konzernregister mit Firmen, Kasse und Preiskämpfen.

## Prüfen
1. `event pe.7`, dann `event pe.14`: Event pe.270 mit Name, Branche und Vorstand. Der Planet hat den Hauptsitz-Modifier.
2. Ein Quartal später: `event pe.273` zeigt den Konzern mit Firmen und Kasse.
3. Ein Planet mit zwei gleichen Firmen zeigt den Cluster-Modifier.
4. Nach einiger Zeit: Übernahme-Nachrichten, Niederlassungs-Modifier auf anderen Planeten.
5. `event pe.12` bei Konsumgüter-Mangel: Konsumgüter mit einer Jahresmenge.
6. Logs: keine Fehler aus pe_corp_effects_generated.txt, pe_corp_events.txt oder den Modifiern.
