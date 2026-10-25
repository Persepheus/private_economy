# Version 0.35 – Testablauf: Zusammengelegte Vorkommen, Konzern-Stiftungen

Ein laufendes Spiel kann weiterlaufen. Die Umstellung passiert beim nächsten Quartal von selbst.

## Zusammengelegte Vorkommen
- **„Privatwirtschaft“** (bisher „Standortvorteile“) ist das Status-Vorkommen jedes Planeten, auf dem die Privatwirtschaft etwas bewirkt. Der Tooltip listet die Zeilen einzeln auf.
  - Cluster und Lieferverträge (wie bisher).
  - **Betriebliche Sozialleistungen:** +x % Zufriedenheit. Bisher ein Planeten-Modifikator.
  - **Rüstungsaufträge:** +10 % private Metallurgen. Bisher ein Planeten-Modifikator.
  - **Preiskampf:** +3 % Ertrag aller Jobs. Bisher ein Planeten-Modifikator.
  - **Ausstattung eines Konzern-Forschungsinstituts:** +25 % private Forscher des Fachs, einmal je Fach und Planet. Auch wenn mehrere Konzerne dort ein Institut desselben Fachs haben, zählt der Bonus nur einmal.
- **„Hauptsitz: <Konzern>“** enthält jetzt:
  - die **Forscherstellen** seines Instituts (100 je Stufe);
  - bei unserem Rüstungskonzern das **Rüstungszentrum** (+2 Stabilität, +10 % Metallurgen).
  - Mehrere Hauptsitze auf einem Planeten haben je ihr eigenes Institut.
  - Die neun Instituts-Vorkommen von 0.32 entfallen.
- **„Private Automatisierung“:** ein Vorkommen für alle automatisierten Jobs (Bergbau, Energie, Landwirtschaft, je Stufe I/II). Der Tooltip zeigt die Stufen; bisher war es ein Vorkommen je Job und Stufe.
- **Bleiben eigenständig:**
  - Gewinnauszahlung, Ersparnisse und Dividende (je eine Haushaltszeile).
  - Der Liefervertrag.
  - Die zeitlich begrenzten Event-Modifikatoren (Sonderschichten, Modernisierung, Tourismus, Streik, Kriegsgebiet …).

## Konzern-Stiftungen
- Der reichste Konzern mit mindestens 20.000 Kasse stiftet ein Mäzen-Event (Gala, Forschungsstiftung, Universität, Kunst …).
  - Mit 25 % je Quartal, nicht im selben Quartal wie ein Mäzen; danach zwei Jahre Pause. Die Mäzene behalten ihre eigene Pause.
- Er setzt nur **10 % seiner Kasse** ein (ein Mäzen 30 % des Pools). Die Ergebnisse wachsen wie bei Mäzenen mit dem Einsatz.
- Lehnst du ab, geht das Geld an den Konzern zurück (bei Mäzenen an den Pool).
- Im Text steht „Stiftung von <Konzern> (eine Konzern-Stiftung)“ an Stelle des Mäzens. Manche Sätze sind auf eine Person zugeschnitten und lesen sich dann etwas holprig.

## 0.35.1: Private Automatisierung, dritter Anlauf
- **Woran es lag:** Weder als Reichs- noch als Planeten-Modifikator senkte der ressourcenspezifische Schlüssel (`planet_automated_jobs_energy_upkeep_mult`) die Zeile. Im Save stand der Planeten-Modifikator mit −100 %, die Zeile blieb bei 257.
- **Jetzt:** Ein Reichsmodifikator „Private Automatisierung“ mit dem allgemeinen Schlüssel `planet_automated_jobs_upkeep_mult`, wie ihn Vanilla beim Civic „Tankbound“ nutzt.
  - Der Anteil ergibt sich aus der genauen Privat-Summe und der beobachteten Zeile.
  - Bis 100 % ohne staatliche Vanilla-Automatisierung, sonst höchstens 99 %.
- **Sofort testen:** `event pe.309` entfernt die alten Planeten-Modifikatoren und setzt den Reichsmodifikator sofort. Einen Tag später sollte die Zeile „Automatisierte Arbeitskraft“ im Energie-Tooltip bei etwa 0 stehen.
  - Bleibt sie stehen, wirkt auch dieser Schlüssel nicht. Dann gehe ich auf eine sichtbare Erstattung als Einnahmezeile.
  - Im game.log: „automation cover: private P energy a month, budget line E, cover now M %“.
- **Tooltip „Privatwirtschaft“:** Die Zufriedenheit der Sozialleistungen wird jetzt in ganzen Prozent angezeigt (vorher ein Fehler im error.log).

## Prüfen
1. Nach einem Quartal:
   - Planeten mit Konzernfirmen haben „Privatwirtschaft“ mit den Zeilen im Tooltip.
   - Die Modifikatoren „Betriebliche Sozialleistungen“, „Preiskampf“, „Rüstungsaufträge“ und „Rüstungszentrum“ sind weg; die Zufriedenheit ist gleich geblieben.
2. Konzern-Habitat (Hauptsitz von Stormgate): Das Vorkommen „Konzern-Forschungsinstitut“ ist weg, die Forscherstellen stehen im Hauptsitz-Vorkommen. Die +25 % Ingenieure stehen in „Privatwirtschaft“.
3. Planeten mit Automatisierung: ein Vorkommen „Private Automatisierung“ statt eines je Job; der Tooltip zeigt die Stufen.
4. Stiftungen: Bei Stormgate (Kasse weit über 20.000) sollte innerhalb weniger Jahre ein Event „Stiftung von Stormgate Utilities“ kommen; seine Kasse sinkt um 10 %.
5. Logs: keine Fehler aus pe_corp_effects_generated.txt (pe_corp_social, pe_dc_step, pe_status_apply), pe_economy_effects.txt (pe_automation), pe_patron_effects.txt.
