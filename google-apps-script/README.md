# Google Apps Script Setup

1. Open https://script.google.com and create a **New project**.
2. Replace the default `Code.gs` with the contents of this folder's `Code.gs`.
3. The Sheet ID is already configured for the dedicated RSVP spreadsheet created for this template.
4. Click **Deploy → New deployment**.
5. Select **Web app**.
6. Execute as: **Me**.
7. Who has access: **Anyone**.
8. Click **Deploy**, authorize the requested permissions, and copy the `/exec` Web App URL.
9. Paste that URL into `js/config.js` as `appsScriptUrl`.
10. Re-deploy/update the GitHub Pages files after changing the URL.

## Endpoint behavior

- `POST <WEB_APP_URL>` accepts JSON fields: `fullName`, `attendance`, `guestCount`, `wishes`, `source`.
- `GET <WEB_APP_URL>?action=wishes&limit=30` returns the most recent guest wishes.

## Spreadsheet

Tab: `RSVP`

Columns:
1. Timestamp
2. Full Name
3. Attendance
4. Guest Count
5. Wishes
6. Source
