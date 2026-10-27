# Codex-Changelog – Private Economy

Dieses Protokoll dokumentiert die von Codex vorgenommenen Änderungen am Mod
und unmittelbar zugehörigen Dateien. Beginn der tatsächlichen Änderungen:
26.10.2026. Frühere Mod-Versionen stammen aus der bestehenden Entwicklung
und werden hier nicht als Codex-Arbeit beansprucht.

Datumsangaben beziehen sich auf Europe/Berlin. Neueste Einträge stehen oben.
„Statisch geprüft“ bedeutet keine Bestätigung der Funktion durch Stellaris.
Spieltests übernimmt auf ausdrücklichen Wunsch des Nutzers der Nutzer selbst.
Die Pflicht zur weiteren Pflege dieses Protokolls steht in [AGENTS.md](AGENTS.md).

## 27.10.2026 – Gemeinsame Versorgungsprüfung für Firmeninvestitionen

**Version:** 0.36.7 → 0.36.8 (Mod- und Launcher-Deskriptor).

**Anlass und Umfang:** Vom Nutzer freigegebener erster Schritt nach der Analyse
starker Energie-/Mineralienschwankungen: zusätzliche Ressourcenengpässe durch
private Expansion begrenzen. Keine Änderungen an Spielständen, keine Spieltests.
Preissmoothing, Überkapazitätssteuerung und Automatisierungserstattung bleiben
unverändert und sind ausdrücklich nicht Teil dieses Schritts.

**Bestätigte Diagnose:** Die bisherige Kandidatenprüfung `pe_ok_<Variante>`
verwarf Firmen anhand einzelner knapper Eingangsressourcen und konnte dadurch
auch netto hilfreiche Mischbetriebe ausschließen. Der Wachstumszweig in
`pe_firm_book` enthielt keine entsprechende Versorgungsprüfung; auch Kredite
konnten Wachstum ohne gemeinsame Ressourcenreserve finanzieren. Der bisherige
Umbau-Guard nutzte die Preisberechnung einschließlich erwarteter Bauproduktion
und erfasste Habitat-/Spezialisierungsjobs sowie den Bauausfall nicht vollständig.
Dass genau ein bestimmter Ausbau einen konkreten Bilanzsprung im Spiel verursacht
hat, ist damit nicht nachgewiesen; Save-Snapshots ersetzen kein Ereignisprotokoll.

**Konkrete Änderungen:**

- Neue gemeinsame Prüfung für Energie, Mineralien, Nahrung, Konsumgüter und
  Handel: Marge = 5 % laufender Monatsausgaben, mindestens 10, höchstens 250.
  Nur Ressourcen mit negativem Nettobeitrag der Änderung müssen die Marge
  nach Budget, bestehenden Reservierungen und neuer Änderung einhalten.
- Vollbesetzung statt Annahme einer teilweise besetzten neuen Stufe. Netto-
  und Bruttoverbrauchswerte pro Job werden aus beobachteten Jobkategorien
  gewonnen; Fallback berücksichtigt katalytische Eingänge. Stufen, Habitat-
  und Void-Dweller-Faktoren sowie die Spezialisierungsjobs der Firmen fließen ein.
  Direkter Basisunterhalt wird zusätzlich berücksichtigt, Bevölkerungskosten
  werden nicht doppelt gerechnet.
- Gründung: Kandidaten werden vor der Auswahl geprüft, die gewählte Variante
  nochmals vor Ausführung. Sowohl Investorpool als auch Konzernhabitat dürfen
  nur bei positiver Prüfung bezahlen und eine Baustelle anlegen.
- Wachstum: Prüfung vor `pe_firm_book`; Ablehnung verhindert Eigenkapitalausgabe,
  Konzernhabitat-Ausgabe und die Anforderung eines Wachstumskredits. Vor tatsächlicher
  Kreditvergabe erfolgt eine erneute Prüfung des inzwischen verfügbaren Spielraums.
  Überbrückungskredite bestehender Firmen bleiben unabhängig davon zulässig.
  Durch Bombardierung zum Schrumpfen vorgesehene Firmen reservieren keinen Ausbau.
- Reichsweite Reservierung: angenommene Ausbauten und Käufe buchen ihre Nettodifferenz
  unmittelbar; neue Baustellen reservieren 100 % des zukünftigen Bruttoverbrauchs,
  aber 0 % ihrer Produktion. Bei negativem Nettobeitrag prüft eine Neugründung
  konservativ diesen Bruttoverbrauch. Netto verbessernde Mischbetriebe behalten
  für die verbesserte Ressource ihre Ausnahme. Reservierung erst bei echter Zusage,
  nicht schon beim bloßen Prüfen eines Kandidaten.
- Staatsdistriktkäufe: Vorprüfung und erneute Ausführungsprüfung verwenden die
  Differenz zwischen Firma und ersetztem Distrikt einschließlich Zonen und
  direktem Unterhalt. Auf Habitaten ersetzt Landwirtschaft einen Energiedistrikt;
  dessen verlorene Technikerproduktion wird abgezogen. Forschungsdistrikte nutzen
  die installierten Vanilla-Arbeitskraftwerte. Auch angenommene ältere menschliche
  Kaufangebote durchlaufen die Prüfung; bei Ablehnung werden weder Distrikt noch
  Kaufpreis verändert.
- Umbau: gemeinsame Versorgungsbasis für Endzustand und Bauphase, zusätzlich zur
  bisherigen Investitionstriade. Verlust alter Produktion und reservierter
  Verbrauch des Zielbetriebs werden bereits bei erfolgreichem Baustart gebucht.
  Der ausgewählte Betrieb wird vor Bezahlung erneut geprüft; ein Platz-Rollback
  hinterlässt keine zusätzliche Reservierung.
- Monatlicher Abgleich vor Baustellenfertigstellungen: Budget und Margen neu lesen,
  temporäre Investitionsreservierungen ablösen und Verbrauch aller noch vorhandenen
  Baustellen neu summieren. Damit werden sofortige Änderungen nicht dauerhaft
  zusätzlich zum Monatsbudget belastet. Bestehende Baustellen werden nicht
  rückwirkend storniert. Fehlende Initialisierung blockiert neue Investitionen bis
  zum nächsten Monatspuls; keine Save-Migration erforderlich.
- Generator: neue Hilfsdatei für die gemeinsame Mathematik; generierte Effekte
  bleiben innerhalb der bestehenden Verschachtelungsgrenze. Eingebettete Fragmente
  werden eingerückt, damit statische Werkzeuge innere `if`-/`root`-Blöcke nicht
  als eigene Top-Level-Effekte interpretieren. Der ungenutzte alte Rechentemplate
  für den Umbau wurde entfernt; die Preisformel selbst bleibt unverändert.

**Betroffene Dateien:**

- `tools/supply-safety.mjs` (neu): Generator der Versorgungseffekte und gemeinsam
  verwendeten eingebetteten Prüf-/Reservierungsblöcke.
- `tools/generate-firms.mjs`: beobachteter Bruttoverbrauch, Kandidaten-/Ausführungs-
  prüfung, Kaufvergleich, Umbau und Kreditvergabe; Erzeugung neuer Effekte.
- `common/scripted_effects/pe_supply_safety_generated.txt` (neu),
  `pe_firm_effects_generated.txt`, `pe_corp_effects_generated.txt`: generierte Laufzeitlogik.
- `common/scripted_effects/pe_economy_effects.txt`: Wachstumsprüfung und Reservierung,
  Gründungs-/Kauf-Zahlungssperren, Ablösung alter Kandidaten-Defizitfilter.
- `events/pe_economy_events.txt`: monatlicher Buchhaltungsabgleich vor Bauabschlüssen.
- `tools/test-supply-safety.mjs` (neu), `tools/validate.mjs`: Rechentests und Einbindung
  einschließlich Reproduzierbarkeitsprüfung der neuen generierten Datei.
- `docs/TESTS_0.36.8.md` (neu), `README.md`, dieses Changelog: Verhalten, Nutzerprüfungen,
  Annahmen und Grenzen. `descriptor.mod` und `../private_economy.mod`: Version.

**Erwartete Wirkung:** Weniger gleichzeitig zugesagte Rohstoffnachfrage und weniger
Ausbauten in bereits knappen Bilanzen. Für Spieler- und KI-Reiche gilt dieselbe
Regel. Abgelehnte Firmen arbeiten weiter und versuchen es regulär erneut; es
entsteht kein künstlicher Ausgleich durch zusätzliche Ressourcen.

**Kompatibilität und Einschränkungen:** Bestehende Saves sind ohne Bearbeitung
verwendbar; die neue Buchhaltung beginnt am nächsten Monatspuls. Die Prognose
verwendet Reichsdurchschnitte pro Job und direkten Basisunterhalt. Lokale Boni,
Sonderjobs sowie zusätzliche Staatsdistriktjobs spezieller Civics/Traditionen
werden nicht vollständig individuell nachgebaut. Das Ablösen temporärer Reserven
setzt den aktualisierten Budgetstand am monatlichen Country-Puls voraus. Diese
Engine-Reihenfolge und tatsächlich verzögerte/ausbleibende Stellenbesetzung
müssen im Spiel geprüft werden. Bereits fertiggestellte oder abgebrochene Bauten
bleiben im Entscheidungsmonat gegebenenfalls konservativ reserviert. Kein
Nachweis einer insgesamt besseren KI oder einer vollständigen Beseitigung der
bisher beobachteten Schwankungen.

**Prüfungen:** Die Rechentests auf den tatsächlich generierten Skriptblöcken sind
bestanden, einschließlich Grenzwerten, Mischbetrieben, katalytischen Kosten,
Habitat-/Zonenjobs, Kaufdifferenzen, Bauausfall, Monatsabgleich und beiden echten
Gründungs-Zahlungszweigen bei Genehmigung/Ablehnung. Die abschließende vollständige
Validierung ist bestanden: 58 Skriptdateien, 11 Jobs, 403 Deposits, keine Vanilla-
Überschreibungen; Klammern, Modifier, Referenzen, Variablen, Effektverschachtelung,
Ereignistypen, Lokalisierungen, Symbole und reproduzierbare Generierung geprüft.
Die bestehenden Nachrichtentests sind ebenfalls bestanden (2070 gefilterte
Meldungsaufrufe, 12 Kategorien und 24 Texturen). Stellaris wurde weder gestartet
noch bedient. Kein Engine- oder KI-Laufzeittest.

## 26.10.2026 – X-Button des Nachrichtenmenüs schaltet versehentlich eine Kategorie um

**Version:** 0.36.6 → 0.36.7.

**Nutzerbericht vom 26.10.2026:** Beim Schließen über X wird „Firm development“
umgeschaltet; das Fenster schließt nicht dauerhaft. Dies ist ein vom Nutzer
beobachteter Fehler im Spiel, kein eigener Spieltest durch Codex.

**Diagnose:** Die Menüereignisse hatten keine ausdrücklich markierte
Schließoption. Ihre erste sichtbare Option schaltet eine Kategorie um und ruft
dieselbe Menüseite erneut auf; das entspricht dem gemeldeten Verhalten. Vanilla
weist z. B. in `events/caravaneer_events.txt` der Exit-Option ausdrücklich
`default_hide_option = yes` zu. Die fehlende Zuordnung ist im Modcode bestätigt;
die Engineausführung der Korrektur muss noch im Spiel bestätigt werden.

**Änderungen:**

- `tools/message-settings.mjs`: Auf beiden Seiten die vorhandene Option
  `pe_settings_close` mit `default_hide_option = yes` markiert. Sie enthält
  weiterhin keinerlei Effekte, Bedingungen oder erneute Eventaufrufe. Die
  Kategorieoptionen und deren Reihenfolge bleiben unverändert.
- `events/pe_message_settings_generated.txt`: Über den Generator neu erzeugt;
  beide Schließen-Optionen enthalten die explizite X-Zuordnung und einen Kommentar.
- `tools/test-message-settings.mjs`: Regressionstest für beide Menüseiten:
  exakt eine Standard-Schließoption pro Seite, zwingend `pe_settings_close`,
  ohne zusätzliche Effekte oder Bedingungen.
- `descriptor.mod` und `../private_economy.mod`: Version 0.36.7.
- `README.md`: Aktueller Versionsstand und Fehlerkorrektur beschrieben.
- `docs/TESTS_0.36.6.md`: Nachprüfung für 0.36.7 ergänzt: X auf beiden Seiten,
  erste Kategorie jeweils aktiv/stumm, unveränderte Einstellungen nach erneutem
  Öffnen und weiterhin funktionierende reguläre Schaltflächen.
- `CODEX_CHANGELOG.md`: Nutzerbefund, Diagnose, Änderung und Prüfumfang dokumentiert.

**Auswirkung/Kompatibilität:** Keine Änderungen an Wirtschaftsmechanik,
Nachrichtenkategorien, Symbolen oder vorhandenen Reichsflags. Spielstände bleiben
unverändert und benötigen keine Migration. Eine durch den bisherigen X-Fehler
versehentlich umgeschaltete Kategorie wird nicht automatisch zurückgesetzt,
weil sie nicht von einer absichtlichen Auswahl zu unterscheiden ist.

**Prüfung:** Generator ausgeführt; vollständige statische Modprüfung bestanden
(57 Skriptdateien), einschließlich des neuen Regressionstests für genau eine
wirkungslose Standard-Schließoption auf jeder der beiden Seiten. Generierte
Dateien stimmen mit dem Generator überein. Bestehende Nachrichten-/Symboltests
und `git diff --check` ebenfalls ohne Befund.
Keine Spieltests durch Codex; Neustart von Stellaris mit der aktualisierten
Mod und Nutzerprüfung des X-Buttons erforderlich.

## 26.10.2026 – Nachrichtenmenü auf der Hauptstadt und zwölf eigene Themensymbole

**Version:** 0.36.5 → 0.36.6.

**Anlass:** Der Nutzer möchte auswählen, welche Nachrichten der Privatwirtschaft
er erhält. Auf Rückfrage ausdrücklich festgelegt: nur Meldungen und reine
Informationsfenster filtern; Ereignisse mit echten Entscheidungen weiterhin
anzeigen. Anschließend zusätzlich beauftragt: ein eigenes Symbol für jedes
identifizierte Thema erstellen und zuordnen. Keine Spieltests durch Codex.

### Bedienung und Verhalten

- Neue kostenlose Hauptstadtentscheidung **Privatwirtschaft: Nachrichten
  einstellen** öffnet `pe_settings.1`; die zweite Seite ist `pe_settings.2`.
  Nur auf der eigenen Hauptstadt eines menschlich gespielten Reiches sichtbar;
  keine Bauzeit, Kosten oder KI-Nutzung.
- Zwölf Kategorien, je sechs pro Seite: Firmenentwicklung; Umbau und Umzüge;
  Automatisierung; Firmenkrisen und Schäden; Konzernentwicklung; Lieferketten;
  Orbitalstationen; Dyson-Schwärme und Arc Furnaces; Konzern-Habitate;
  Flotten, Schutz und Zitadellen; Eroberung und Besatzung; Mäzene und private
  Initiativen. Die genaue Zuordnung mit Beispielen steht in `docs/TESTS_0.36.6.md`.
- Jede Kategorie zeigt **Aktiv/Stumm** und ihr Symbol. Anklicken ändert den
  Zustand und öffnet dieselbe Seite neu. Zwei globale Schalter aktivieren oder
  deaktivieren sämtliche Kategorien auf beiden Seiten. Schließen beendet das Menü.
- Zwölf dauerhafte Reichsflags `pe_mute_<Kategorie>` speichern die Auswahl.
  Kein Flag bedeutet aktiv; damit bleiben auf bestehenden und neuen Spielständen
  ohne Benutzereingriff alle Meldungen eingeschaltet. Keine Initialisierung,
  die beim Laden oder beim Wirtschaftswechsel die Auswahl zurücksetzt.
- Vorher wurden sämtliche Nachrichten als `pe_private_economy` erstellt.
  Jetzt gibt es zwölf eigene Typen `pe_private_economy_<Kategorie>` mit eigenem
  Namen und Symbol. Sie erscheinen auch separat in den allgemeinen
  Stellaris-Nachrichteneinstellungen. Deren Einstellungen gelten zusätzlich.
  Der bisherige Typ bleibt für alte gespeicherte Meldungen definiert; seine
  bisherigen UI-Einstellungen werden nicht auf die neuen Typen migriert.
- Filter prüfen den Empfänger im bestehenden Country-Scope. Nur der jeweilige
  `create_message`-Aufruf bzw. der reine `pe_corp_msg`-Aufruf wird bedingt
  ausgeführt. Umgebende Käufe, Bauten, Abrechnungen, Flotten- und Kriegseffekte
  bleiben außerhalb der Filter. Keine neuen zusätzlichen Effect-Aufrufebenen
  für die normale Nachrichtenfilterung.
- Bestehende Meldungen werden nicht entfernt; unterdrückte Meldungen werden
  beim Wiedereinschalten nicht nachgeliefert. Firmenregister, Angebote und
  Auswahlereignisse bleiben verfügbar. Keine Änderungen an Firmenjobs,
  Spezialisierungen, Preisen, KI-Entscheidungsgewichten oder Wirtschaftsregeln.

### Reine Informationsfenster und erhaltene Spielauswirkungen

- `pe.270` (Konzerngründung), `pe.285` (Jagdresultat), `pe.288` (Konvoischutz),
  `pe.308` (Rüstungsvertrag beendet) und `pe.252` (Spionage aufgeflogen) erhalten
  einen Trigger für ihre Nachrichtenkategorie. Ihre eigentlichen Spielwirkungen
  liegen bereits außerhalb dieser Infofenster; deren `immediate`-Blöcke enthalten,
  soweit vorhanden, nur Namensdaten für die Anzeige.
- `pe.206` bleibt unter seiner bisherigen ID erhalten und löst weiterhin das
  Prototyp-Ergebnis aus: volle/teilweise Forschung oder Unfall sowie Rufänderung.
  Es läuft nun verborgen und öffnet bei aktiver Kategorie anschließend
  `pe_notice.206` mit der bisherigen Beschreibung und Bestätigung. Stummschalten
  verhindert ausschließlich diese Anzeige, nicht Forschung oder Unfall.
- `pe.228` bleibt für bereits verzögert eingeplante Touristenunglücke erhalten.
  Die Auswahl wird bei Fälligkeit geprüft. Bei aktiver Kategorie öffnet es
  `pe_notice.228`; wie zuvor wirkt der Unfall bei Bestätigung. Bei stummer
  Kategorie wird derselbe gemeinsame Effekt sofort ausgeführt: Hauptstadt-
  Unfallmodifikator für 360 Tage und Mäzenruf −1. Ein stummes Fenster kann damit
  keinen Unfall verhindern. Der Unterschied im Zeitpunkt der Bestätigung ist
  ausdrücklich beabsichtigt, weil kein Bestätigungsklick mehr stattfindet.
- Die sieben sichtbaren Infofenster tragen zusätzlich ihr Themensymbol im Titel.
  Bestehende Beschreibungstexte werden wiederverwendet, keine Antworten auf
  echte Entscheidungen werden automatisch gewählt.

### Symbole

- Zwölf eigene Vektorpiktogramme erstellt, keine Vanilla-Grafiken kopiert:
  Fabrik mit Wachstumspfeil, gegenläufige Pfeile, Roboter, Warndreieck,
  Firmenzentrale, Kettenglieder, Orbitalstation, Stern mit Umlaufbahn,
  Habitatkuppel, Schild mit Stern, Flagge mit Wechselpfeil und Hand mit Herz.
- Einheitlich helles Türkis mit goldenen Akzenten auf transparentem Hintergrund.
  Pro Thema eine 36 × 36-Pixel-DDS für Meldungen und eine 20 × 20-Pixel-DDS
  für Text/Menu/Titel; unkomprimiertes BGRA mit Alpha, passend zum untersuchten
  Headerformat des Vanilla-Nachrichtensymbols.
- Sprite-Namen `GFX_pe_message_<Kategorie>` und
  `GFX_text_pe_message_<Kategorie>`; Inline-Verwendung über
  `£pe_message_<Kategorie>£`. Zuordnung sowohl für direkte Meldungen als auch
  für den parametrisierten Konzern-Nachrichtenhelfer, der jetzt zusätzlich
  `CATEGORY` übergeben bekommt.

### Geänderte und neue Dateien

- **`tools/message-settings.mjs` – neu:** Zentrale Themenzuordnung,
  Nachrichtengates und Typzuweisung; erzeugt Entscheidung, Menü, Lokalisierung,
  Meldungstypen und Sprite-Definitionen. Nicht zugeordnete neue Nachrichtenkeys
  brechen die Generierung/Prüfung ab, statt unbemerkt einen Filter zu umgehen.
- **`tools/generate-firms.mjs` – geändert:** Bindet diese Transformation beim
  Schreiben der generierten Skripte ein und erzeugt die neuen Menüdateien.
  **`common/scripted_effects/pe_firm_effects_generated.txt`** und
  **`common/scripted_effects/pe_corp_effects_generated.txt`** darüber neu erzeugt:
  nur Nachrichtengates, Nachrichtentypen und der `CATEGORY`-Parameter ergänzt.
  Sonstige bisherige generierte Wirtschaftsdateien bleiben inhaltlich gleich.
- **`common/scripted_effects/pe_economy_effects.txt`**, **`pe_fleet_effects.txt`**,
  **`pe_citadel_effects.txt`**, **`pe_patron_effects.txt`**, **`pe_war_effects.txt`**:
  bestehende handgeschriebene Nachrichtenaufrufe ebenso gefiltert und thematisch
  typisiert; Konzernmeldungen erhalten ihren Kategorieparameter.
- **`events/pe_citadel_events.txt`**, **`pe_habitat_events.txt`**,
  **`pe_war_events.txt`**: dortige Nachrichten ebenfalls zugeordnet/gefiltert.
  Beim Dyson-Abschluss betrifft das ausschließlich die Benachrichtigung aus
  dem vorherigen Fix; dessen Bau- und Verknüpfungslogik bleibt unverändert.
- **`events/pe_corp_events.txt`**, **`pe_fleet_events.txt`**,
  **`pe_contract_events.txt`**, **`pe_market_events.txt`**: Kategorie-Trigger
  der fünf oben genannten Infoereignisse und Titel mit Themensymbolen.
- **`events/pe_patron_events.txt`**: `pe.206` und `pe.228` wie oben in
  Wirkungsabwicklung und Anzeige getrennt. Die 17 übrigen Country-Events
  dieser Datei wurden gegenüber dem Zustand vor dieser Aufgabe unverändert gelassen.
- **`events/pe_notification_events.txt` – neu:** Sichtbare Folgefenster
  `pe_notice.206` und `pe_notice.228`.
- **`common/scripted_effects/pe_notification_effects.txt` – neu:** Gemeinsamer
  Effekt `pe_tourism_accident_apply` für sichtbare und stumme Unfallabwicklung.
- **`common/decisions/pe_message_settings_generated.txt`** und
  **`events/pe_message_settings_generated.txt` – neu/generiert:** Aufruf und
  beide Menüseiten, bedingte Optionen, Reichsflags und Navigation.
- **`localisation/german/pe_message_settings_l_german.yml`** und
  **`localisation/english/pe_message_settings_l_english.yml` – neu/generiert:**
  Vollständige deutsche und englische Entscheidung, Bedienhinweise, Kategorien,
  Statusoptionen, Tooltips, Nachrichtentitel und symboltragende Infofenstertitel;
  UTF-8 mit BOM entsprechend dem Modformat.
- **`common/message_types/pe_messages.txt` – jetzt generiert:** Zwölf neue
  Typen zusätzlich zum erhaltenen bisherigen Typ; Militär/Besatzung der
  Vanilla-Kategorie military zugeordnet, übrige economy. Benachrichtigungston,
  grüner Ping und standardmäßige Toasts bleiben erhalten.
- **`interface/pe_message_icons.gfx` – neu/generiert:** 24 Sprite-Zuordnungen
  für die zwölf Themen in Meldungs- und Inline-Größe.
- **`tools/generate-message-icons.mjs` – neu:** Reproduzierbarer Vektorentwurf
  und Export über `sharp`, DDS-Schreiber sowie Vorschaugenerierung. Nutzt das
  vorhandene gebündelte Paket, keine Installation oder Änderung globaler Tools.
- **`gfx/interface/icons/message/source/pe_message_<Kategorie>.svg` – zwölf
  neue generierte Vektorquellen.** Im Ordner **`gfx/interface/icons/message/`**
  entstehen **`pe_message_<Kategorie>.dds`** und
  **`pe_message_<Kategorie>_text.dds` – 24 neue Texturen.**
  Kategorienamen: `firms`, `restructuring`, `automation`, `crises`,
  `corporations`, `supply`, `stations`, `megastructures`, `habitats`, `military`,
  `ownership`, `patrons`.
- **`docs/message-icons.png` – neu:** Beschriftete Übersicht aller Symbole,
  einschließlich aus den fertigen DDS-Dateien gelesener Pixel in Originalgröße.
- **`tools/test-message-settings.mjs` – neu:** Rein lesende Regressionstests
  für vollständige Filterabdeckung, reine Nachrichtengates, richtige Kategorien,
  Umschalter, globale Schalter, Hauptstadteinschränkung, geschützte Auswahlereignisse,
  Infoereignisse sowie Texturformat, Transparenz und Sprite-Zuordnung.
- **`tools/validate.mjs` – erweitert:** Neue generierte Dateien in den
  Reproduzierbarkeitsvergleich aufgenommen; führt den speziellen Nachrichtentest
  zusätzlich zur bestehenden Modprüfung aus.
- **`docs/TESTS_0.36.6.md` – neu:** Kategorien-/Symboltabelle, Bedienung,
  manuelle Prüfschritte, Grenzen der statischen Prüfung und Exportanleitung.
- **`README.md`**: Versionsstand, Menüaufruf, Verhalten und Links ergänzt.
  **`descriptor.mod`** und der externe Launcherdeskriptor
  **`../private_economy.mod`**: Version auf 0.36.6 gesetzt.
  **`CODEX_CHANGELOG.md`**: dieser gemeinsame Eintrag für Menü und nachträglich
  beauftragte Symbole. Keine Änderung an `AGENTS.md` oder Spielständen.

### Prüfung, Auswirkungen und offene Punkte

- Spezieller statischer Test bestanden: **2.070 gefilterte Nachrichtenaufrufe**,
  **120 Namenszweige** des generischen Konzernhelfers, zwölf Kategorien,
  24 bedingte Einzel-Umschalter und sieben Informationsereignisse.
- Alle zwölf neuen Typen ihren Symbolen zugeordnet; **24 unterschiedliche DDS**
  auf Header, Abmessungen, Kanalformat, Transparenz und nicht leeren Bildinhalt
  geprüft. Symbolübersicht außerhalb von Stellaris visuell kontrolliert.
- Vergleich mit einem vor Beginn gesicherten Dateistand: 51 bisherige Skripte
  entsprechen exakt den vorgesehenen Meldungs-, Typ- und Titeländerungen bzw.
  bleiben unverändert; die 17 übrigen Mäzen-Events ebenfalls unverändert.
  So wurden insbesondere versehentliche Eingriffe in benachbarte Wirtschafts-
  und Flotteneffekte ausgeschlossen. Die beiden umgebauten Mäzenereignisse
  werden gesondert auf weiter vorhandene Auswirkungen geprüft.
- Allgemeine statische Modprüfung einschließlich Neugenerierung und Vergleich
  bestanden: **57 Skriptdateien**, keine Vanilla-Überschreibungen, 11 Jobs,
  403 Deposits, ein Gebäude und eine Richtlinie; Modifier, Referenzen,
  Variablen, Eventtypen, Lokalisierungen und Icons geprüft. `git diff --check`
  ebenfalls ohne Befund. Diese Zahlen umfassen den ganzen Mod, nicht nur
  neu hinzugefügte Inhalte.
- Keine Spielstände bearbeitet. Bestehende Saves benötigen für die Einstellungen
  keine Migration; alte Ereignis-IDs für verzögerte Folgen bleiben erhalten.
  Neue Typen und Grafiken erfordern ein erneutes Laden der Mod durch Stellaris.
- **Nicht im Spiel getestet:** Menüdarstellung, Optionslängen/Scrollen,
  tatsächliches Speichern/Laden der Flags, Ereignisablauf, Popup-Titel mit Symbol,
  Benachrichtigungsdarstellung und Mehrspielerbetrieb. Die genaue Enginewirkung
  ist damit noch nicht bestätigt; der Nutzer übernimmt den Spieltest.

## 26.10.2026 – Änderungsprotokoll und Arbeitsanweisungen

**Version:** weiterhin 0.36.5; reine Dokumentationsänderung.

### Anlass

Der Nutzer möchte alle bisherigen und zukünftigen Codex-Änderungen detailliert
innerhalb des Mods nachvollziehen können.

### Geänderte und neue Dateien

- **`CODEX_CHANGELOG.md` – neu:** Dieses Protokoll angelegt. Die Reparatur des
  Dyson-Schwarms in Vana nachträglich mit konkreten Dateien, Skriptänderungen,
  Save-Änderung, Prüfergebnissen und offenen Punkten dokumentiert. Frühere
  Reviews und Designvorschläge ausdrücklich als nicht umgesetzt eingeordnet.
- **`AGENTS.md` – neu:** Dauerhafte Arbeitsanweisung zur Pflege des Changelogs
  angelegt. Sie verlangt eine Dokumentation bei jedem weiteren Änderungsschritt,
  einschließlich generierter Dateien, Dokumentation und zugehöriger Save-Kopien.
  Zusätzlich den Nutzerwunsch gegen eigenständige Spieltests, die Erhaltung von
  Original-Saves und den Hinweis auf den schreibenden Validator festgehalten.
- **`README.md` – ergänzt:** Link auf dieses Protokoll eingefügt, damit es vom
  Einstiegspunkt des Mods aus auffindbar ist.

### Auswirkungen und Prüfung

- Keine Änderungen an Spielmechanik, Balance, Skripten, Lokalisierungen,
  Deskriptor-Versionen oder Spielständen in diesem Arbeitsschritt.
- Inhalt gegen die vorhandenen Dateien der Version 0.36.5 und die tatsächlich
  ausgeführten Arbeitsschritte abgeglichen; relative Dokumentationslinks geprüft.
- Abschließender Prüfsummenvergleich zur Eingrenzung auf die drei oben genannten
  Markdown-Dateien. Kein Spieltest und keine erneute Generierung erforderlich.

## 26.10.2026 – Dyson-Schwarm in Vana: Save-Reparatur und geänderter Bauabschluss

**Version:** 0.36.4 → 0.36.5.

**Status:** Mod-Änderung und separate Save-Reparatur umgesetzt; statische
Prüfungen bestanden. Wirkung in der Engine noch nicht durch einen Spieltest
bestätigt. Bis zur Anlage dieses Protokolls liegt kein Nutzer-Testergebnis vor.

### Anlass und untersuchte Daten

Der Nutzer meldete, dass ein Konzern in Vana einen Dyson-Schwarm gebaut und
ausgebaut hatte, dessen Ressource aber nicht abgebaut wurde.

Untersucht wurden diese vier Spielstände aus
`save games/queptiliumempire_-1000534548/` im Stellaris-Benutzerverzeichnis:

- `autosave_2265.10.01.sav`
- `autosave_2266.01.01.sav`
- `autosave_2266.04.01.sav`
- `2266.04.02.sav`

Zum Vergleich wurden relevante Definitionen und Skriptdokumentation der lokal
installierten Stellaris-Version 4.5.2 gelesen. Original-Saves wurden zur Analyse
nur gelesen; entpackte Arbeitskopien lagen im Windows-Temp-Verzeichnis.

### Festgestellter Zustand und abgeleitete Ursache

- Vana hat System-ID **146**, sein Stern die Planeten-ID **1932**.
- Megastruktur **122** ist `dyson_swarm_2`, gehört den Private Holdings
  (**100663336**) und enthält den korrekten Verweis `planet=1932`.
- Der Stern enthält `d_physics_3`, `dyson_swarm_2_mod` und `pe_swc_4`, aber
  nicht den erforderlichen Rückverweis `megastructure=122`.
- Im jüngsten untersuchten Save weist das Holdings-Budget nur **5 Physik pro
  Monat** aus. Der erwartete Grundbeitrag dieses Schwarms beträgt hingegen
  **3 × 16 = 48 Physik pro Monat**, vor weiteren möglichen Modifikatoren.
- Die gesonderte Konzernabrechnung berücksichtigt den Schwarm bereits:
  `pe_stval=168` entspricht 3 × 16 × 3,5. Stormgate Utilities, Konzernplatz 4,
  hat `pe_c4_sv=185`, `pe_c4_swu=40` und `pe_c4_out=182`.
  Seine gesamte Mineralienlieferung beträgt damit rechnerisch 185 × 1,2 − 40.

**Gesicherter Save-Befund:** Die Verknüpfung ist nur in einer Richtung vorhanden.
**Aus dem Code abgeleitete Ursache:** Beim Bauabschluss wird die Baustelle
entfernt und sofort am selben Stern ein neuer Schwarm erzeugt. Eine nachgelagerte
Bereinigung der Baustelle kann den Rückverweis des Sterns wieder entfernen.
Dieser Engine-Ablauf wurde nicht experimentell reproduziert; die Verzögerung
ist die darauf ausgerichtete Fehlerbehebung.

### Konkrete Änderungen im Mod

1. **`common/megastructures/pe_megastructures.txt`**
   - Den Abschlussblock von `pe_corp_swarm_build` geändert.
   - Vorher: lokale Ziele für Stern, System und Eigentümer speichern,
     Baustelle entfernen und im selben Abschlussblock `dyson_swarm_1` erzeugen;
     anschließend Modifier, Flags und Fertigmeldung setzen.
   - Nachher: Ziele `pe_sw_target`, `pe_sw_tsys` und `pe_sw_owner` weiterhin
     speichern, die Baustelle entfernen und beim gespeicherten Eigentümer
     `country_event = { id = pe.320 days = 1 }` auslösen.
   - Einen Kommentar zum Zweck der Verzögerung und zu den lokalen Ereigniszielen
     ergänzt. Die eigentliche Fertigstellung in das neue Ereignis verschoben.

2. **`events/pe_habitat_events.txt`**
   - Das neue verborgene, ausschließlich ausgelöste Länderereignis **`pe.320`**
     hinzugefügt und im Dateikopf aufgeführt.
   - Voraussetzungen: Die drei gespeicherten Ziele existieren; der Zielstern
     trägt `pe_swb` und hat laut `has_any_megastructure` keine Megastruktur.
     Dadurch soll keine zwischenzeitlich vorhandene Verknüpfung überschrieben
     werden.
   - Das Ereignis setzt `conduit_excluded` im System und erzeugt den fertigen
     `dyson_swarm_1` am gespeicherten Stern für den gespeicherten Eigentümer.
   - Es ergänzt bei Bedarf `dyson_swarm_1_mod`, setzt `has_megastructure` und
     entfernt `pe_swb` am Stern.
   - Die bestehende Fertigmeldung `pe_msg_swarm_done` geht weiterhin an den
     menschlichen Systemeigentümer, jetzt nach dem eintägigen Übergang.
   - Bestehende Lokalisierung wiederverwendet; keine neuen Übersetzungsschlüssel.

3. **`descriptor.mod` und `../private_economy.mod`**
   - Beide Versionsangaben von **0.36.4 auf 0.36.5** angehoben.
   - Name, unterstützte Spielversion und Launcher-Pfad beibehalten.
   - `../private_economy.mod` ist der Launcher-Deskriptor neben dem Mod-Ordner.

4. **`README.md`**
   - Stand auf **0.36.5** aktualisiert.
   - Bauabschluss mit einem Tag Abstand, separate Reparatur bereits beschädigter
     Saves und ausstehenden Spieltest beschrieben.
   - Link auf `docs/TESTS_0.36.5.md` ergänzt.

5. **`docs/TESTS_0.36.5.md` – neu**
   - Save-Diagnose mit IDs und Abrechnungswerten festgehalten.
   - Mod-Änderung, Umfang der Save-Reparatur und Grenze der statischen Prüfung
     erklärt.
   - Manuelle Prüfschritte für Laden, Monatswechsel, Speichern/Neuladen, neue
     Schwärme, Ausbauten und Sonderfälle dokumentiert.

### Separate Reparatur des laufenden Spiels

Neue Datei außerhalb des Mod-Ordners:
`save games/queptiliumempire_-1000534548/2266.04.02_pe_vana_repaired.sav`.

- Als Kopie von `2266.04.02.sav` erstellt; Original nicht überschrieben.
- Einzige Änderung am entpackten `gamestate`: am Stern **1932**, direkt nach
  `controller=100663336`, die Zeile **`megastructure=122`** eingefügt.
- Mit Einrückung und Zeilenumbruch beträgt der Unterschied genau **21 Bytes**.
- Der vorhandene Schwarm bleibt Stufe II. Keine Ressourcen nachgezahlt, keine
  Konzernkassen verändert, keine zusätzlichen Stationen angelegt und keine
  Baufortschritte, Technologien oder Eigentümer geändert.
- `meta` ist bytegleich zum Original. Das ZIP-Archiv wurde neu komprimiert;
  deshalb ist die gesamte SAV-Datei nicht bytegleich zum Original.
- SHA-256 des unveränderten Originals:
  `7E13237F8F1064210C62438434E7438586504738B3D1DE84C25EBB3B887723B2`.

### Durchgeführte Prüfungen

- Das neue SAV-Archiv erneut geöffnet und die Archiv-Eintragsnamen verglichen.
- `meta` byteweise über SHA-256 verglichen: unverändert.
- Den eingefügten Rückverweis rechnerisch wieder entfernt: Der restliche
  `gamestate` entspricht exakt dem Original; Längendifferenz genau 21 Bytes.
- SHA-256 des Original-Saves vor und nach der Reparatur verglichen: unverändert.
- Die schreibfreien Teile von `tools/validate.mjs` im Arbeitsspeicher ausgeführt:
  **PASS**, 53 Skriptdateien, 11 Jobs, insgesamt 403 Vorkommensdefinitionen,
  ein Gebäude und eine Richtlinie. Die vom Validator abgedeckten Prüfungen auf
  Klammern, Referenzen, Modifier, Variablen, Ereignistypen, Lokalisierung, Icons
  und Vanilla-Dateiüberschreibungen bestanden.
- Den Generator separat mit ausschließlich im Arbeitsspeicher abgefangenen
  Ausgaben geprüft: **19 Ausgaben verglichen, keine Abweichung**. Keine
  generierten Dateien für diesen Fix geändert.
- Die beiden Skriptänderungen gegen zuvor angelegte Arbeitskopien geprüft.
- **Kein Spieltest:** Die Vorbereitung der Windows-Steuerung wurde nach dem
  Nutzerhinweis beendet. Stellaris wurde dabei weder gestartet noch bedient.

### Auswirkungen, Grenzen und noch offene Bestätigung

- Neue Konzern-Schwärme erhalten einen zusätzlichen Tag zwischen Entfernung
  der Baustelle und Erzeugung des fertigen Schwarms. Baukosten und reguläre
  Vanilla-Bau- beziehungsweise Ausbauzeiten wurden nicht geändert.
- Der Mod-Patch allein repariert vorhandene fehlende Rückverweise **nicht**.
  Für das untersuchte Spiel ist die separat reparierte Save-Kopie vorgesehen.
- Kein neues Spiel erforderlich; für neue Skripte Stellaris vollständig neu
  starten und anschließend den gewünschten Save laden.
- Der echte Physikertrag fließt an die Holdings. Die bestehende Lieferung von
  Stormgate Utilities an den Spieler bleibt Teil der Konzernabrechnung; es
  soll keine zusätzliche direkte Forschungszahlung an den Spieler geben.
- Vom Nutzer zu bestätigen: Rohstoffgewinnung nach Monatswechsel, Erhalt der
  Verknüpfung nach Speichern/Neuladen sowie korrekte neue Bauabschlüsse und
  Ausbauten. Gleichzeitige Fertigstellungen, Konzernauflösung während des Baus
  und Speichern im eintägigen Übergang sind noch nicht im Spiel geprüft.

## 25.–26.10.2026 – Vorherige Analyse, ausdrücklich ohne Umsetzung

Am 25.10.2026 wurde Version 0.36.4 auf Wunsch ausschließlich gelesen und
technisch beurteilt. Die Prüfsummen aller damals erfassten 135 Mod-Dateien
waren vor und nach der Untersuchung identisch. Die statischen Prüfungen
und der Vergleich der Generator-Ausgaben erfolgten ohne Schreibzugriffe auf
den Mod.

Folgende Themen wurden dabei besprochen, aber nicht durch Codex geändert:

- Zeitversetzte Gewinn- und Sparquoten gegenüber staatlichen Zahlungen.
- Die 40-%-Zahlungsgrenze bei nachträglichem Monopolbonus.
- Beitritt der Holdings zu weiteren, gleichzeitig laufenden Kriegen.
- Erneute Prüfung von Kaufangeboten bei Annahme.
- Skalierung der Liefervertragsprüfung und ein schreibfreier Validator-Modus.
- Auslastung nach Berufsgruppe, Erklärbarkeit und Balancing-Vergleiche.
- Spezialplaneten, Ausschreibungen, Konzernprofile, Lobbys und Lieferketten.

Am 26.10.2026 wurde außerdem eine stärkere Unabhängigkeit der Firmenjobs von
Distriktspezialisierungen diskutiert. Das war ein Designvorschlag; die
Jobzusammensetzung, Spezialisierungsabhängigkeit und Entscheidungslogik
wurden nicht geändert. Diese Liste ist keine Freigabe zur Umsetzung.
