# Prototyp 0.0.1 – Testablauf

Ziel: die Grundannahmen im Spiel prüfen, bevor die Logik der Privatwirtschaft entsteht. Noch keine automatische Gründung, kein Kapital, keine Steuern.

## Enthalten

- Richtlinie **Wirtschaftsordnung** (Kategorie Wirtschaft): Planwirtschaft, Gelenkte Wirtschaft, Gemischte Wirtschaft, Freie Marktwirtschaft, Laissez-faire. Setzt nur `pe_private_share` (0/20/40/60/80). Nicht für Gestalt-Reiche.
- Firmen als Deposits mit eigener Kategorie (kein Blocker), jeweils −1 Distrikt-Platz:
  - **Private Stahlwerke**: 120 Arbeitskraft Private Metallurgen.
  - **Privater Mischkonzern**: je 40 Private Metallurgen, Handwerker und Händler auf einem Platz.
- Drei Privatjobs: wie Metallurg, Handwerker, Händler, gleiche Ertragskategorien (also gleiche Technologie-Boni), 15 % mehr Grundertrag, Priorität nicht änderbar.
- Gebäude **Private Börse**: nicht baubar, nicht abreißbar, nicht stilllegbar; 100 Private Händler, kein Unterhalt.

## Konsole

Als eigenes Reich:

| Befehl | Wirkung |
|---|---|
| `event pe.1` | Private Stahlwerke auf der Hauptstadt |
| `event pe.2` | Privater Mischkonzern auf der Hauptstadt |
| `event pe.3` | Private Börse auf der Hauptstadt |
| `event pe.4` | alle Firmen und die Börse von der Hauptstadt entfernen |
| `event pe.5` | Mischkonzern auf jeder KI-Hauptstadt (Nicht-Gestalt) |

## Prüfen

1. **Richtlinie**: erscheint unter Richtlinien → Wirtschaft mit fünf Stufen und Texten.
2. **Platz**: Nach `pe.1` sinkt die Zahl freier Distrikt-Plätze der Hauptstadt um 1. Die Firma steht unter den Deposits/Merkmalen und lässt sich nicht räumen.
3. **Volle Hauptstadt**: Was passiert, wenn kein Platz frei ist? Wird ein Distrikt stillgelegt, entfernt oder überzählig angezeigt?
4. **Jobs**: Private Metallurgen erscheinen mit eigenem Symbol, die Priorität ist nicht einstellbar. Werden die Jobs besetzt, auch wenn es freie staatliche Jobs gibt?
5. **Ertrag**: Tooltip der Legierungen – Private Metallurgen mit Technologie-Boni unter „Metallurgen“.
6. **Mischkonzern** (`pe.2`): drei Jobarten auf einem Platz.
7. **Börse** (`pe.3`): Gebäude ohne Abriss-/Stilllegungsknopf; welchen Gebäude-/Zonenplatz belegt es?
8. **Entfernen** (`pe.4`): Platz und Jobs verschwinden wieder.
9. **KI** (`pe.5`, dann einige Jahre laufen lassen): Arbeitet die KI normal weiter, besetzt sie die Jobs, baut sie trotzdem Distrikte?
10. **Logs**: `error.log` auf `pe_`-, `private_economy`- oder Deposit-/Job-Fehler prüfen.

## Prüfung ohne Spiel

`node tools/validate.mjs`: keine Vanilla-Datei überschrieben, Klammern, Modifier, Verweise, Variablen, Event-Typen, Texte (Deutsch/Englisch) und Symbole.
