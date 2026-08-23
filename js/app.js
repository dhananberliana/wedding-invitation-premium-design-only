import { CONFIG } from './config.js';
import { getCountdownParts, buildGoogleCalendarUrl } from './utils.js';
import { initRsvp } from './rsvp.js';

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

function hydrateText() {
  const values = {
    groom: CONFIG.groom,
    bride: CONFIG.bride,
    groomFather: CONFIG.groomFather,
    groomMother: CONFIG.groomMother,
    brideFather: CONFIG.brideFather,
    brideMother: CONFIG.brideMother,
    weddingDateLabel: CONFIG.weddingDateLabel,
    venueName: CONFIG.venueName,
    venueAddress: CONFIG.venueAddress,
    bankName: CONFIG.bankName,
    bankAccount: CONFIG.bankAccount,
    bankAccountName: CONFIG.bankAccountName,
    giftAddress: CONFIG.giftAddress
  };
  Object.entries(values).forEach(([key, value]) => {
    $$(`[data-bind="${key}"]`).forEach((el) => { el.textContent = value; });
  });
  document.title = CONFIG.weddingTitle;
}

function initGuestName() {
  const guest = new URLSearchParams(location.search).get('to')?.trim();
  if (guest) {
    $('#guest-name').textContent = guest;
    $('#guest-wrap').hidden = false;
  }
}

function initOpening() {
  const cover = $('#cover');
  const main = $('#main-content');
  $('#open-invitation').addEventListener('click', async () => {
    cover.classList.add('cover--opened');
    main.removeAttribute('inert');
    document.body.classList.remove('locked');
    setTimeout(() => cover.setAttribute('hidden', ''), 650);
    try { await $('#bg-music').play(); $('#music-toggle').classList.add('is-playing'); } catch {}
  });
}

function initCountdown() {
  const target = new Date(CONFIG.eventStart);
  const ids = ['days', 'hours', 'minutes', 'seconds'];
  const render = () => {
    const parts = getCountdownParts(target);
    ids.forEach((id) => { $(`#count-${id}`).textContent = String(parts[id]).padStart(2, '0'); });
    if (parts.ended) $('#countdown-caption').textContent = 'Today is our special day ✦';
  };
  render();
  setInterval(render, 1000);
}

function initLinks() {
  $('#maps-link').href = CONFIG.mapsUrl;
  $('#calendar-link').href = buildGoogleCalendarUrl({
    title: CONFIG.weddingTitle,
    start: CONFIG.eventStart,
    end: CONFIG.eventEnd,
    location: `${CONFIG.venueName}, ${CONFIG.venueAddress}`,
    details: CONFIG.calendarDescription
  });
}

function initMusic() {
  const audio = $('#bg-music');
  const button = $('#music-toggle');
  button.addEventListener('click', async () => {
    if (audio.paused) {
      try { await audio.play(); button.classList.add('is-playing'); } catch {}
    } else {
      audio.pause();
      button.classList.remove('is-playing');
    }
  });
}

function initReveal() {
  if (!('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  $$('.reveal').forEach((el) => observer.observe(el));
}

hydrateText();
initGuestName();
initOpening();
initCountdown();
initLinks();
initMusic();
initReveal();
initRsvp(CONFIG);
