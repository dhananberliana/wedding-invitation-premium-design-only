export function getCountdownParts(targetInput, nowInput = new Date()) {
  const target = targetInput instanceof Date ? targetInput : new Date(targetInput);
  const now = nowInput instanceof Date ? nowInput : new Date(nowInput);
  const diff = target.getTime() - now.getTime();
  if (!Number.isFinite(diff) || diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, ended: true };
  }
  const totalSeconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    ended: false
  };
}

function toCalendarUtc(isoString) {
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) throw new Error('Invalid calendar date');
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
}

export function buildGoogleCalendarUrl({ title, start, end, location, details }) {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${toCalendarUtc(start)}/${toCalendarUtc(end)}`,
    location,
    details
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function normalizeGuestCount(attendance, value) {
  if (attendance !== 'attending') return 0;
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed)) return 1;
  return Math.max(1, Math.min(10, parsed));
}

export function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
