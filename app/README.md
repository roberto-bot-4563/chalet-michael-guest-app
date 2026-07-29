# Chalet Michael – Projektverwaltung installieren

Dieses Paket ergänzt die bestehende Website um die geschützte Seite:

`/projekte`

Der Gästeguide wird dabei nicht ersetzt oder verändert.

## Upload über GitHub

1. Repository `roberto-bot-4563/chalet-michael-guest-app` öffnen.
2. In den Ordner `app` wechseln.
3. Über **Add file → Upload files** den kompletten Ordner `projekte` aus diesem
   Paket hochladen.
4. Die drei Dateien müssen anschließend hier liegen:

   - `app/projekte/page.js`
   - `app/projekte/ProjectBoard.js`
   - `app/projekte/ProjectBoard.module.css`

5. Als Commit-Nachricht `Projektverwaltung hinzufügen` eintragen.
6. **Commit changes** bestätigen.

Vercel übernimmt die Veröffentlichung danach automatisch. Die Seite ist nach
dem bestehenden Login unter `/projekte` erreichbar.

## Enthalten

- 15 vorbereitete Chalet-Projekte
- Zeiträume Sofort, 6–12 Monate und Langfristig
- Zuständigkeit, Name, Kosten, Status, Maße, Notizen und Erinnerungsdatum
- Suche und Filter
- Projekte ergänzen, bearbeiten, löschen und als erledigt markieren
- Kontaktübersicht
- mobile Darstellung

Aktuell werden Änderungen auf dem jeweiligen Gerät gespeichert. Eine
gemeinsame synchronisierte Datenbank kann später ergänzt werden.
