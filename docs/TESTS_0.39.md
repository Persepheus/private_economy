# Tests 0.39.0

Statisch geprüft (Validator einschließlich der Codex-Tests). Im Spiel noch nicht getestet.

## Lagervertrag (pe.324, Verlängerung pe.325)

- **Wann:**
  - Ein Lager ist zu mindestens 95 % voll, und die Ressource wächst noch (Nettoproduktion > 0).
  - Es gibt eine Privatfirma, die die Ressource herstellt (Hauptprodukt). Eine Konzernfirma geht vor.
  - Gilt für Mineralien, Energie, Nahrung, Legierungen, Konsumgüter und Handelswert.
  - Höchstens ein Angebot im Jahr. Lehnst du ab, gibt es für diese Ressource fünf Jahre lang kein Angebot.
- **Vertrag:**
  - Fünf Jahre lang +20 % der Lagergrenze (Modifier „Lagervertrag: …“).
  - Gebühr: jeden Monat 5 % unserer Nettoproduktion dieser Ressource. Die Firma verkauft sie zum Grundwert, der Erlös geht in die Kasse ihres Konzerns oder in den Investorenpool.
- **Lagerhaus:** Auf dem Planet der Firma erscheint ein **Firmenlager** (`pe_building_corp_storage`), wenn dort ein Gebäudeplatz frei ist. Beim Ende verschwindet es wieder.
- **Verlängerung:** Sechs Monate vor Ablauf kommt das Angebot, um fünf Jahre zu verlängern, wenn das Lager noch zu 85 % voll ist.
- **Ende:** Modifier und Gebäude verschwinden, und du bekommst eine Meldung (Kategorie Lieferketten). Was nicht mehr ins eigene Lager passt, geht verloren.
- **KI:** nimmt zu 80 % an.
- **Log:** `storage contract N signed: +X capacity, fee about Y a month, corporation slot K`.
- **Prüfen:**
  - Erscheint das Gebäude? Das Gebäude der Mod ist per Skript bisher nie im Spiel bestätigt worden, deshalb kommt die Kapazität über den Modifier und nicht über das Gebäude.
  - Steigt die Lagergrenze um 20 %?
  - Wird jeden Monat die Gebühr abgezogen?

## Rüstungsauftrag aus dem Lager (pe.326, Lieferung pe.327)

- **Wann:**
  - Das Legierungslager ist zu mindestens 90 % voll.
  - Es gibt einen Rüstungskonzern, sonst nimmt der reichste Industriekonzern.
  - Höchstens alle zehn Jahre, auch nach Ablehnung.
- **Angebot:**
  - Schiffe unserer größten Klasse aus der Hälfte unseres Legierungslagers: Korvette 150, Zerstörer 300, Kreuzer 600, Schlachtschiff 1.200 Legierungen. Mindestens 2, höchstens 20 Schiffe.
  - Dazu die Hälfte dieser Legierungsmenge in Handel. Das geht an den Konzern.
- **Lieferung:** nach einem Jahr an der Hauptstadt.
  - Die Schiffe haben unseren neuesten Entwurf und gehören uns, mit normalem Unterhalt und normaler Flottenkapazität.
  - Fehlt der Entwurf einer Klasse, wird die nächstkleinere gebaut.
  - Unsere Werften bleiben frei.
  - Meldung in der Kategorie Militär.
- **Log:** `arms order: N ships of class C for A alloys and F trade, corporation slot K`.

## Umbau: Pause pro Firma

- Jede Firma wartet nach Gründung oder Umbau zehn Jahre (`pe_age` ≥ 40 Quartale).
- Verbraucht sie etwas, das dem Reich fehlt, wartet sie nur zwei Jahre (≥ 8 Quartale). Dazu genügt ein Drittel der sonst nötigen Gewinnschwelle.
- Pro Planet nur noch ein Jahr Pause zwischen zwei Umbauten statt fünf. Pro Quartal baut auf einem Planeten weiterhin höchstens eine Firma um.

## Über der Quote: Entscheidung (pe.323)

- **Wann:** In einem menschlichen Reich, außer unter Laissez-faire, wollen Investoren bei Arbeitslosigkeit eine Firma über die Quote hinaus gründen.
- **Ablauf:** Statt direkt zu gründen, kommt das Fenster „Investoren über der Quote“ (Firma, Planet, Zahl der Arbeitslosen). Es gibt immer nur eine offene Anfrage.
  - **Bauen lassen:** Die Firma entsteht über der Quote.
  - **Gegen Lizenzgebühr bauen lassen:** Ebenso, und die Investoren zahlen uns 120 Handel aus dem Privatkapital, sobald die Baustelle beginnt.
  - **Die Quote gilt:** Fünf Jahre lang keine Firma über der Quote auf diesem Planeten.
- **KI und Laissez-faire:** gründen wie in 0.38 direkt.
- **Log:** `firm beyond the share on <Planet>: mode M, sites before X after Y`. Bei „after = before“ wurde nicht gegründet, zum Beispiel weil der Platz inzwischen belegt war.
