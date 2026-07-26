# Gästeguide · Chalet Michael — Version 2.8

Diese Version enthält nur noch eine Website:

- Gästeguide und Chalet Manager befinden sich auf derselben Seite.
- Die gesamte Website ist passwortgeschützt.
- Auch Bilder und die vollständige PDF werden nur nach erfolgreichem Login ausgeliefert.
- Der bisherige Pfad `/manager` leitet auf den Manager-Bereich der Hauptseite weiter.

## Vercel Environment Variables

Die bereits verwendeten Variablen bleiben unverändert:

```text
CHALET_MANAGER_PASSWORD
CHALET_MANAGER_SECRET
```

Beispiel für das Passwort:

```text
Michael3925
```

`CHALET_MANAGER_SECRET` sollte eine lange, zufällige Zeichenfolge sein.

## Inhaltliche Änderungen

- Titel: `Gästeguide`
- Logo entfernt
- Kasten `4 Schlafzimmer / 2 Bäder` entfernt
- Abschnitt `Rund ums Haus` entfernt
- Filterkaffeemaschine ergänzt
- Lage der Müll- und Recyclingstation ergänzt
- Check-out: `bis 10:00 Uhr oder nach Absprache`
- Bushaltestelle und kostenlose Nutzung für Bergbahnbenutzer ergänzt
- Bettwäsche und Handtücher: selber mitbringen oder nach Absprache
- Kurtaxe: CHF 3,80 pro Person und Tag; Barzahlung im Einmachglas
- Persönliche Ansprache in Deutsch, Englisch und Französisch

## PDF

Die vollständige PDF liegt in:

```text
private/Gaesteguide_komplett.pdf
```

Sie wird ausschließlich über die geschützte Route `/api/manager-pdf` ausgeliefert.

## Installation

Die vorhandenen Dateien im GitHub-Repository durch den Inhalt dieses Pakets ersetzen. Die beiden Vercel-Variablen müssen gesetzt bleiben. Danach neu deployen.
