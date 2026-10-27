# Versorgungsprüfung 0.36.8

Stand: 27.10.2026. **Kein eigener Spieltest.** Die folgenden Spielprüfungen
sind eine Anleitung für den Nutzer. Originalspielstände bleiben unverändert.

## Umgesetzte Regel

Für Energie, Mineralien, Nahrung, Konsumgüter und Handel gilt eine Reserve von
5 % der monatlichen Ausgaben, mindestens 10 und höchstens 250 pro Ressource.
Eine Investition wird nur für Ressourcen geprüft, deren Nettobeitrag sie
verschlechtert. Der Monatsüberschuss einschließlich schon zugesagter Änderungen
muss nach der Investition mindestens diese Reserve erreichen.

Neue Stellen werden vollständig besetzt kalkuliert. Die Jobraten stammen aus
den beobachteten Einnahmen und Ausgaben ihrer Jobkategorie, geteilt durch die
besetzte Arbeitskraft; ohne ausreichende Beobachtungen gelten Vanilla-Basiswerte
mit katalytischer Variante. Stufen, Habitat-Faktoren und die vom Mod vergebenen
Spezialisierungsjobs werden eingerechnet. Direkter Gebäude-/Distriktunterhalt
wird hier nicht pauschal für alle Gebäude addiert: relevant ist ausschließlich
der Basisunterhalt der neuen Firma bzw. dessen Differenz zum ersetzten Distrikt.
Bevölkerungsunterhalt wird nicht erneut addiert.

Baustellen reservieren den gesamten künftigen Verbrauch. Ihre Produktion steht
anderen Investitionen noch nicht zur Verfügung. Bei einer Neugründung wird
für eine netto verschlechterte Ressource deshalb konservativ der Bruttoverbrauch
geprüft. Netto verbessernde Mischbetriebe behalten die Ausnahme von der Prüfung
dieser Ressource. Ein Umbau muss zusätzlich den Ausfall des alten Betriebs bis
zur Fertigstellung verkraften.

## Statisch ausgeführt

- `node tools/test-supply-safety.mjs`: liest die tatsächlich generierten Skripte
  und führt deren Rechenoperationen und Verzweigungen in einem kleinen Testmodell
  aus. Keine eigenständige zweite Implementierung der Investitionsformel.
- Fälle: unter/auf der Reserveschwelle; bereits belegter Überschuss;
  Mineralien verbessernder Mischbetrieb; andere knappe Betriebsmittel;
  katalytische Nahrungskosten; Habitat-/Void-Dweller-/Zonenjobs;
  Nettovergleich beim Distriktkauf; Agrarbetrieb statt Habitat-Energiedistrikt;
  Habitat-Forschungsdistrikt; Umbauausfall; minimale/maximale Marge;
  Baustellenverbrauch ohne vorweggenommene Produktion; monatliche Ablösung
  temporärer Reservierungen; Initialisierung alter Saves.
- Die echten Gründungs-Zahlungszweige werden mit abgelehnter und genehmigter
  Investition ausgeführt: Investorpool und Konzernhabitat zahlen bei Ablehnung
  nichts; bei Genehmigung werden Kosten und Reservierung genau einmal verbucht.
- Strukturelle Prüfungen sichern die Verknüpfung von Wachstums-, Kredit-,
  Gründungs- und Kaufpfaden mit der Prüfung sowie deren Reihenfolge ab.
- `node tools/validate.mjs`: allgemeine Modprüfung einschließlich neuer Datei,
  reproduzierbarer Generierung und beider Regressionstests.

## Noch vom Nutzer im Spiel zu prüfen

1. Bestehenden Save laden und mindestens einen Monatswechsel abwarten. Die neue
   Sicherheitsbuchhaltung wird vor Baustellenfertigstellungen initialisiert.
2. Ein Quartal mit niedrigem Mineralienüberschuss beobachten: Eine profitable
   Fabrik mit genügend Kapital soll keinen mineralienverbrauchenden Ausbau
   bezahlen, wenn danach die Reserve unterschritten würde. Dasselbe bei
   Konzernfinanzierung und auf einem Konzernhabitat prüfen.
3. Bei Defiziten dürfen Firmen weiterarbeiten und Überbrückungskredite erhalten.
   Eine netto verbessernde Firma darf investieren, sofern die anderen durch sie
   verschlechterten Ressourcen ausreichend versorgt bleiben.
4. Mehrere finanzierbare Investitionen mit zusammen zu hohem Verbrauch beobachten:
   Der erste genehmigte Verbrauch soll den Spielraum der nächsten reduzieren.
5. Einen Kauf eines Staatsdistrikts beobachten: Maßgeblich ist neuer Betrieb
   minus vorheriger Distrikt. Ein älteres Kaufangebot wird bei Annahme erneut
   geprüft und bei inzwischen fehlendem Spielraum nicht ausgeführt/bezahlt.
6. Nach Fertigstellung eines Baus und dem folgenden Monatswechsel kontrollieren,
   dass dessen alte Baustellenreservierung verschwunden ist. Bei einem Umbau
   soll verlorene Altproduktion bereits im Entscheidungsmonat berücksichtigt sein.

Hilfsvariablen im Country-Scope: `pe_safe_net_<Ressource>`,
`pe_safe_margin_<Ressource>`, `pe_safe_reserved_<Ressource>`.
`pe_safe_ok` ist nur das Ergebnis der zuletzt geprüften Investition, kein
dauerhafter Zustand einer bestimmten Firma.

## Grenzen und offene Laufzeitprüfung

Die Monatsbuchhaltung setzt voraus, dass der monatliche Country-Puls den neuen
Budgetstand sieht. Genau diese Engine-Reihenfolge und die tatsächliche
Jobbesetzung können die statischen Tests nicht bestätigen. Temporäre Reserven
für sofortige Änderungen werden am nächsten Puls durch den neuen Budgetstand
ersetzt; noch vorhandene Baustellen werden erneut vollständig reserviert.
Ein abgebrochener Bau bleibt höchstens bis zum nächsten Puls konservativ reserviert.

Die Prognose verwendet Reichsdurchschnitte pro Job und direkten Basisunterhalt.
Abweichende lokale Produktionsboni, Sonderjobs oder zusätzliche Staatsdistriktjobs
besonderer Civics/Traditionen werden damit nicht vollständig individuell simuliert.
Auch eine dauerhaft unvollständige Besetzung neuer Stellen kann von der Prognose
abweichen. Eine Garantie stabiler Bilanzen oder besserer KI ist das nicht.

Preissprünge bei vollen Lagern, Überkapazitäten und die zeitversetzte Erstattung
von Automatisierungsunterhalt sind weiterhin getrennte, offene Themen.
