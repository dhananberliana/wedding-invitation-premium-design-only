# Premium Wedding Invitation Design

## Goal
Build a lightweight, mobile-first Balinese editorial wedding invitation that runs on GitHub Pages, stores RSVP submissions in Google Sheets through a Google Apps Script Web App, and renders guest wishes from the same data source.

## Architecture
- Static frontend: semantic HTML, CSS, and vanilla JavaScript ES modules.
- Central configuration in `js/config.js` for names, parents, date/time, venue, gift details, and Apps Script URL.
- Google Apps Script endpoint exposes `GET` for wishes and `POST` for RSVP submissions.
- Google Sheet `RSVP` tab stores one row per submission.
- GitHub Pages hosts frontend assets only.

## Visual Direction
- Balinese editorial / premium heritage aesthetic.
- Warm ivory, antique gold, muted clay, charcoal-brown palette.
- Frosted-glass quote card and event cards.
- Uploaded pre-wedding photography used as full-bleed imagery and gallery.
- Smooth reveal animation with reduced-motion support.

## Sections
1. Opening cover with guest-name query parameter and open invitation button.
2. Intro / Vedic quote.
3. Bride & Groom section with parents.
4. Countdown (days, hours, minutes, seconds).
5. Event details with clickable Google Calendar save link.
6. Venue section with clickable Google Maps link.
7. Photo gallery.
8. RSVP form.
9. Near-real-time wedding wishes feed.
10. Gift section with bank and delivery address.
11. Closing section.
12. Floating background-music control.

## RSVP Data Model
Columns: Timestamp, Full Name, Attendance, Guest Count, Wishes, Source.
- Full Name required.
- Attendance required: attending / not_attending.
- Guest Count integer 0-10; forced to 0 when not attending.
- Wishes optional, max 500 chars.
- Source records page URL.

## Error Handling
- Frontend validates before POST.
- Submit button enters loading state.
- Network/API errors show inline status; form data remains intact.
- Wishes loading degrades to a friendly empty/error state.
- Apps Script returns JSON and validates input server-side.

## Performance
- WebP photos generated from uploaded JPGs, max dimension 1600px, quality ~78-82.
- `loading=lazy` on non-hero images.
- No framework/runtime dependency.
- CSS uses system fallbacks and optional Google Fonts via preload-friendly links.

## Accessibility
- Proper labels on RSVP inputs.
- Visible focus states.
- Buttons and links have accessible names.
- `prefers-reduced-motion` disables animation.

## Deployment
- GitHub Pages from repository root or `main` branch.
- Apps Script is deployed separately as Web App, Execute as owner, Access: Anyone.
- Web App URL is copied into `js/config.js`.
