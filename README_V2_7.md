# Chalet Michael V2.7 - Manager update

Changes in section 3:
1. Strom anschalten (Sicherungskasten) comes first.
2. Hauptwasser öffnen comes second and now has three illustrated substeps:
   - key-box.jpeg, code 391
   - boiler-room.jpeg
   - main-water.jpeg
3. Kühlschrank einschalten remains third.

Upload/replace:
- app/manager/ManagerClient.js
- app/manager/manager-v26.css
- private/Chalet_Manager_Checkliste.pdf

Upload these images to `/public`:
- key-box.jpeg
- boiler-room.jpeg
- main-water.jpeg
- electrical-panel.jpeg

Keep the existing password protection and `/api/manager-pdf` route.
