import { escapeHtml, normalizeGuestCount } from './utils.js';

const isConfigured = (url) => /^https:\/\/script\.google\.com\/macros\/s\//.test(url);

export function initRsvp(config) {
  const form = document.querySelector('#rsvp-form');
  const status = document.querySelector('#rsvp-status');
  const attendance = document.querySelector('#attendance');
  const guests = document.querySelector('#guest-count');
  const submit = document.querySelector('#rsvp-submit');
  const wishes = document.querySelector('#wishes-list');

  attendance.addEventListener('change', () => {
    const attending = attendance.value === 'attending';
    guests.disabled = !attending;
    guests.value = attending ? Math.max(1, Number(guests.value) || 1) : 0;
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    status.textContent = '';
    if (!form.reportValidity()) return;
    if (!isConfigured(config.appsScriptUrl)) {
      status.textContent = 'RSVP backend belum diaktifkan. Tambahkan URL Web App Apps Script di js/config.js.';
      status.dataset.type = 'error';
      return;
    }

    const data = new FormData(form);
    const payload = {
      fullName: String(data.get('fullName') || '').trim(),
      attendance: String(data.get('attendance') || ''),
      guestCount: normalizeGuestCount(String(data.get('attendance')), data.get('guestCount')),
      wishes: String(data.get('wishes') || '').trim().slice(0, 500),
      source: location.href
    };

    submit.disabled = true;
    submit.textContent = 'Sending…';
    status.textContent = 'Saving your RSVP…';
    status.dataset.type = 'info';
    try {
      const response = await fetch(config.appsScriptUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (!result.ok) throw new Error(result.error || 'Unable to save RSVP');
      status.textContent = 'Thank you. Your RSVP has been received ♡';
      status.dataset.type = 'success';
      form.reset();
      guests.value = 1;
      guests.disabled = false;
      await loadWishes(config.appsScriptUrl, wishes);
    } catch (error) {
      status.textContent = `RSVP could not be sent: ${error.message}`;
      status.dataset.type = 'error';
    } finally {
      submit.disabled = false;
      submit.textContent = 'Send RSVP';
    }
  });

  if (isConfigured(config.appsScriptUrl)) {
    loadWishes(config.appsScriptUrl, wishes);
    setInterval(() => loadWishes(config.appsScriptUrl, wishes), config.wishesRefreshMs || 15000);
  } else {
    wishes.innerHTML = '<p class="empty-state">Wedding wishes will appear here after the Google Apps Script URL is connected.</p>';
  }
}

async function loadWishes(url, container) {
  try {
    const response = await fetch(`${url}?action=wishes&limit=30&ts=${Date.now()}`);
    const data = await response.json();
    if (!data.ok) throw new Error(data.error || 'Unable to load wishes');
    if (!data.wishes?.length) {
      container.innerHTML = '<p class="empty-state">Be the first to leave a beautiful wish ♡</p>';
      return;
    }
    container.innerHTML = data.wishes.map((item) => `
      <article class="wish-card">
        <h3>${escapeHtml(item.name)}</h3>
        <p>“${escapeHtml(item.message)}”</p>
      </article>
    `).join('');
  } catch {
    if (!container.children.length) container.innerHTML = '<p class="empty-state">Wishes are temporarily unavailable.</p>';
  }
}
