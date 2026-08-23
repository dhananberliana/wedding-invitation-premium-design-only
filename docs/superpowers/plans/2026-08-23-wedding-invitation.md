# Premium Wedding Invitation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver a production-ready static wedding invitation with RSVP + wishes backed by Google Sheets.

**Architecture:** Static HTML/CSS/vanilla JS on GitHub Pages, with Google Apps Script as a small JSON API over a Google Sheet. Wedding content is centralized in one configuration module for maintenance.

**Tech Stack:** HTML5, CSS3, vanilla JavaScript ES modules, Google Apps Script, Google Sheets, GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-08-23-wedding-invitation-design.md`

## Global Constraints
- Mobile-first and responsive on iPhone and Android.
- No frontend framework dependency.
- RSVP creates one Google Sheet row per submission.
- Wishes render from the RSVP dataset.
- Wedding details remain replaceable from a single config file.

---

### Task 1: Media and Static Shell
**Files:** Create `index.html`, `css/styles.css`, optimized `assets/images/*.webp`.
- [ ] Optimize uploaded images with EXIF orientation corrected.
- [ ] Build all required semantic sections.
- [ ] Add responsive layout, glass cards, animation, and music control.
- [ ] Verify image paths and HTML structure.

### Task 2: Config, Countdown, Calendar, Maps
**Files:** Create `js/config.js`, `js/utils.js`, `js/app.js`; Test `tests/utils.test.mjs`.
- [ ] Write tests for countdown and Google Calendar URL helpers.
- [ ] Run tests to verify failures before implementation.
- [ ] Implement helpers and config-driven DOM hydration.
- [ ] Run tests to pass.

### Task 3: RSVP + Wishes
**Files:** Create `js/rsvp.js`, `google-apps-script/Code.gs`.
- [ ] Implement frontend validation and POST submission.
- [ ] Implement GET wishes refresh.
- [ ] Implement Apps Script input validation, append-row, CORS-safe JSON response.
- [ ] Verify expected request/response shapes.

### Task 4: Documentation + Deployment
**Files:** Create `README.md`, `.nojekyll`, `google-apps-script/README.md`.
- [ ] Document Google Sheet structure and Apps Script deployment.
- [ ] Document GitHub Pages deployment and config edits.
- [ ] Run local static-server smoke test and JS tests.
- [ ] Package deliverable ZIP.
