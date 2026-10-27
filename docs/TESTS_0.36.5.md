# 0.36.5 – Dyson-Schwarm: Verbindung zum Stern

## Diagnose

In den vier untersuchten Saves von Queptilium Empire (2265.10.01 bis
2266.04.02) steht in Vana (System 146) ein Dyson-Schwarm II (Megastruktur
122), Eigentümer Private Holdings (100663336), Planet/Stern 1932.
Der Stern besitzt `d_physics_3`, `dyson_swarm_2_mod` und `pe_swc_4`, aber
keinen Eintrag `megastructure=122`. Die Gegenrichtung `planet=1932` ist
an der Megastruktur vorhanden. Das Holdings-Budget zeigt nur 5 Physik
monatlich aus seinen anderen Forschungsstationen, nicht den Schwarm-Ertrag.

Die separate Konzernabrechnung bewertet den Schwarm bereits mit 168
(3 Physik × 16 × Wert 3,5). Stormgate Utilities liefert insgesamt 182
Mineralien monatlich (Stationswert 185 × 1,2 − Schwarm-Unterhalt 40).
Die Reparatur soll deshalb keine zusätzlichen Konzern-Gutschriften erzeugen.

## Änderung

`pe_corp_swarm_build.on_build_complete` entfernte die Baustelle und erzeugte
am selben Stern sofort den fertigen Schwarm. Der Austausch wird jetzt
über das verborgene Ereignis `pe.320` um einen Tag getrennt. Die lokalen
Ereignisziele bewahren Stern, System und Eigentümer für jede Fertigstellung.
Ein bereits mit einer Megastruktur verknüpfter Stern wird nicht überschrieben.

Die zeitverzögerte Entfernung der Baustelle ist die aus Code und Save
abgeleitete Ursache des fehlenden Rückverweises. Die Behebung ist statisch
geprüft, aber noch nicht in der Engine bestätigt.

## Reparierter Spielstand

`2266.04.02_pe_vana_repaired.sav` ist eine Kopie von `2266.04.02.sav`.
Einzige Änderung im gamestate: `megastructure=122` am Stern 1932.
Meta und übrige Archiv-Einträge bleiben unverändert. Das Original bleibt erhalten.
Es werden keine Ressourcen, Konzernkassen, Bauzeiten oder Technologien geändert.
Der Mod-Patch allein repariert bestehende fehlerhafte Rückverweise nicht.

## Vom Spieler im Spiel zu prüfen

1. Stellaris vollständig neu starten, damit 0.36.5 eingelesen wird.
2. `2266.04.02_pe_vana_repaired.sav` laden; Vana prüfen.
3. Einen Monatswechsel abwarten: Die Holdings sollten zusätzlich den Ertrag
   des Physik-Vorkommens bekommen (Grundwert 3 × 16 = 48; weitere geltende
   Modifikatoren können die Anzeige beeinflussen). Der Ertrag geht an die
   Holdings, nicht zusätzlich direkt an unsere Forschung.
4. Stormgate Utilities sollte weiterhin über seinen Hauptsitz liefern;
   keine zusätzliche Bergbau- oder Forschungsstation am Stern bauen.
5. Speichern und neu laden. Im Save muss Stern 1932 weiterhin auf
   Megastruktur 122 zeigen und diese zurück auf Stern 1932.
6. Bei einem später neu gebauten Konzern-Schwarm: einen Tag nach dem
   Baustellenabschluss müssen fertiger Schwarm und Stern gegenseitig verknüpft
   sein. Danach Monatswechsel und späteren Ausbau prüfen.
7. Sonderfälle für weitere Tests: zwei gleichzeitige Fertigstellungen,
   Konzernauflösung während des Baus und Speichern im eintägigen Übergang.

Es wurde auf ausdrücklichen Wunsch kein Spieltest durch den Assistenten ausgeführt.
