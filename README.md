# Premium Wedding Invitation — Template Baru

A lightweight, mobile-first digital wedding invitation built with HTML, CSS, vanilla JavaScript, Google Apps Script, Google Sheets, and GitHub Pages.

## What is included

- Opening invitation cover with optional guest name via `?to=Guest%20Name`
- Bride & Groom section
- Vedic quote with frosted-glass treatment
- Live countdown: days / hours / minutes / seconds
- Event details
- Google Maps link
- Google Calendar “Save the Date” integration
- Optimized pre-wedding photo gallery
- RSVP form
- Near-real-time wedding wishes feed
- Gift / bank transfer section
- Closing section
- Floating background-music button
- 17 optimized WebP assets + supplied MP3

## Edit wedding information

Only edit `js/config.js` for the main wedding details:

- `groom`
- `bride`
- `groomFather`
- `groomMother`
- `brideFather`
- `brideMother`
- `weddingDateLabel`
- `eventStart`
- `eventEnd`
- `venueName`
- `venueAddress`
- `mapsUrl`
- bank and gift details
- `appsScriptUrl`

Use an ISO-8601 timestamp with timezone for `eventStart` / `eventEnd`, for example:

`2026-12-12T10:00:00+08:00`

## Google Sheet

Dedicated spreadsheet created for this template:

`Wedding Invitation RSVP - Template Baru`

Tab `RSVP` contains:

| Column | Field |
|---|---|
| A | Timestamp |
| B | Full Name |
| C | Attendance |
| D | Guest Count |
| E | Wishes |
| F | Source |

The Google Apps Script file is already configured with this Sheet ID.

## Connect Google Apps Script

See `google-apps-script/README.md`.

After deployment, copy the Apps Script Web App `/exec` URL and paste it in:

`js/config.js → appsScriptUrl`

## GitHub Pages deployment

1. Upload this project's contents to the intended GitHub repository. Keep `index.html` at the repository root.
2. Open **Repository → Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Branch: `main`, folder: `/ (root)`.
5. Save and wait for the Pages deployment to finish.
6. The website will normally be available at:
   `https://<github-username>.github.io/<repository-name>/`

`.nojekyll` is included so GitHub Pages serves the static asset tree directly.

## Local preview

From the project root:

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`.

## Tests

```bash
npm test
```

The unit tests validate countdown calculation, Google Calendar URL generation, and RSVP guest-count normalization.

## Asset maintenance

- Web images live in `assets/images/`.
- Background music lives in `assets/audio/`.
- Use WebP when adding new photos; target max 1600px on the longest side and ~80 quality.
- Keep music compressed for mobile use.

## Production checklist

- [ ] Replace every `XXX` in `js/config.js` with final wedding information.
- [ ] Set correct `eventStart` and `eventEnd` timestamps.
- [ ] Set final Google Maps URL.
- [ ] Confirm gift/bank details.
- [ ] Deploy Apps Script as a Web App and paste `/exec` URL into `js/config.js`.
- [ ] Submit a test RSVP and confirm a new row appears in `RSVP`.
- [ ] Confirm the submitted wish appears below the RSVP form.
- [ ] Test Google Calendar prefill.
- [ ] Test Google Maps link.
- [ ] Test on iPhone Safari and Android Chrome.
- [ ] Confirm music usage rights before public launch.
- [ ] Enable GitHub Pages and verify the final public URL.
