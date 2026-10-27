# Arbeitsanweisungen für Private Economy

## Codex-Changelog

- Der Nutzer verlangt eine detaillierte Dokumentation aller von Codex vorgenommenen Änderungen in `CODEX_CHANGELOG.md` im Mod-Hauptverzeichnis.
- Bei jeder Änderung den passenden Changelog-Eintrag im selben Arbeitsgang ergänzen. Das gilt auch für Dokumentation, Werkzeuge, generierte Dateien und Änderungen an zugehörigen Dateien außerhalb des Mod-Ordners, etwa dem Launcher-Deskriptor oder einer Save-Kopie.
- Datum in Europe/Berlin, Mod-Version, Anlass, betroffene Dateien, konkrete Änderung mit Vorher/Nachher, erwartete Auswirkungen, Spielstand-Kompatibilität, durchgeführte Prüfungen und offene Einschränkungen festhalten. Bei Reparaturen Diagnose und vermutete Ursache ausdrücklich unterscheiden.
- Neue Einträge oben einfügen. Zusammengehörige Änderungen einer Aufgabe dürfen einen gemeinsamen Eintrag bilden. Historische Änderungen nicht stillschweigend umschreiben; spätere Korrekturen oder Testergebnisse datiert ergänzen.
- Ausschließlich tatsächlich ausgeführte Änderungen als umgesetzt dokumentieren. Vorschläge, Review-Befunde und geplante Arbeiten als solche kennzeichnen. Änderungen anderer Autoren nicht Codex zuschreiben.
- Auch das Anlegen oder Ändern dieser Arbeitsanweisungen dokumentieren. Reine Analyse ohne Dateiänderung benötigt keinen neuen Änderungseintrag, außer der Nutzer wünscht dies ausdrücklich.

## Prüfungen und Spielstände

- Der Nutzer hat am 26.10.2026 ausdrücklich festgelegt: keine eigenständigen Tests im Spiel; diese übernimmt er. Ohne neue ausdrückliche Freigabe Stellaris für Tests weder starten noch bedienen. Statische Prüfungen sind zulässig.
- Statische Validierung nicht als bestandenen Engine- oder Spieltest darstellen. Vom Nutzer berichtete Spielergebnisse mit Datum und Herkunft dokumentieren.
- `tools/validate.mjs` startet derzeit den Generator und schreibt dabei generierte Dateien neu. Vor dem Ausführen prüfen, ob dies zur Aufgabe passt. Bei rein lesender Arbeit nur schreibfreie Prüfungen verwenden.
- Generierte Dateien über `tools/generate-firms.mjs` pflegen; keine isolierten Handänderungen an generierten Ausgaben.
- Bei Save-Reparaturen Originaldateien erhalten, eine eindeutig benannte Kopie erstellen und die tatsächlichen Unterschiede prüfen und dokumentieren.
