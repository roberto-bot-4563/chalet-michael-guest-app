# Chalet Michael – Version 2.3 Chalet Manager

This package adds a password-protected `/manager` area for family and friends.

## Upload to GitHub

Keep your existing app files and existing `public/` photos.

Add/replace the files from this package:

- `app/manager/page.js`
- `app/manager/ManagerClient.js`
- `app/manager/Manager.module.css`
- `app/manager/auth.js`
- `app/manager/login/page.js`
- `app/api/manager-login/route.js`
- `app/api/manager-logout/route.js`
- `public/manager/main-water.jpeg`
- `public/manager/electrical-panel.jpeg`
- `package.json`
- `next.config.mjs`

## Configure password in Vercel

In Vercel:
1. Open the Chalet Michael project.
2. Go to **Settings → Environment Variables**.
3. Add:
   - `CHALET_MANAGER_PASSWORD` = your chosen family/friends password
   - `CHALET_MANAGER_SECRET` = a long random secret, e.g. at least 32 random characters
4. Apply to **Production**, **Preview**, and **Development** if desired.
5. Save.
6. Redeploy.

The password is never stored in GitHub or sent to the browser as source code.

## Manager URL

`https://YOUR-VERCEL-DOMAIN/manager`

The login cookie lasts 14 days on that browser.

## Checklist

Check marks are stored locally on the user's device and remain after refreshing the page until the checklist is reset.