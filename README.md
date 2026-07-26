# Gästeguide · Chalet Michael — Version 3.1

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

Optional können einzelne Gästelinks gesperrt werden:

```text
CHALET_REVOKED_INVITES
```

Hier werden die betreffenden Einladungs-IDs, durch Kommas getrennt, eingetragen.
Danach muss die Website neu bereitgestellt werden.

## Persönliche Gästelinks

Nach der Anmeldung mit dem Hauptpasswort erscheint unten auf der Seite der Link
`Gästelink erstellen`. Unter `/links` kann für jede Buchung ein persönlicher,
zeitlich begrenzter Zugangslink erstellt werden:

1. Name oder Bezeichnung der Buchung eintragen
2. Ablaufdatum wählen
3. Link erstellen
4. Link kopieren oder direkt über WhatsApp, Telegram oder E-Mail teilen

Beim Öffnen des Links wird der Gast automatisch angemeldet. Das Passwort muss
nicht mitgeteilt werden. Nach dem Ablaufdatum funktioniert der Link nicht mehr.
Die beim Erstellen angezeigte Einladungs-ID sollte für eine mögliche vorzeitige
Sperrung aufbewahrt werden.

## Aufbau

Die gesamte Seite und PDF folgen jetzt demselben chronologischen Ablauf:

1. Anreise: Adresse, Parken, Schlüssel, Schlüsselkasten, Aufschließen
2. Fenster und Läden öffnen
3. Haus in Betrieb nehmen
4. Im Chalet und Schlafzimmer
5. Check-out, Abreisecheckliste und Haus stilllegen

Die Bereiche `In der Region` und `Petra` wurden vollständig entfernt. `Gut zu wissen`
ist kein eigener Abschnitt mehr; die vier Hinweise stehen nun als
`Organisatorisches` unter `Im Chalet`.

Die vier Schnellzugriffe entsprechen den Hauptabschnitten:

1. Anreise und Haus aufschließen
2. Fensterläden öffnen
3. Haus in Betrieb nehmen
4. Im Chalet

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

Die vorhandenen Dateien im GitHub-Repository durch den Inhalt dieses Pakets
ersetzen. Die beiden bestehenden Vercel-Variablen müssen gesetzt bleiben.
`CHALET_REVOKED_INVITES` ist nur erforderlich, wenn ein Link vorzeitig gesperrt
werden soll. Danach neu deployen.
