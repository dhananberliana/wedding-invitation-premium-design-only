import test from 'node:test';
import assert from 'node:assert/strict';
import { getCountdownParts, buildGoogleCalendarUrl, normalizeGuestCount } from '../js/utils.js';

test('getCountdownParts returns whole countdown units', () => {
  const now = new Date('2026-08-23T00:00:00+08:00');
  const target = new Date('2026-08-24T01:02:03+08:00');
  assert.deepEqual(getCountdownParts(target, now), { days: 1, hours: 1, minutes: 2, seconds: 3, ended: false });
});

test('getCountdownParts clamps ended events to zero', () => {
  const now = new Date('2026-08-24T01:02:04+08:00');
  const target = new Date('2026-08-24T01:02:03+08:00');
  assert.deepEqual(getCountdownParts(target, now), { days: 0, hours: 0, minutes: 0, seconds: 0, ended: true });
});

test('normalizeGuestCount forces zero when not attending', () => {
  assert.equal(normalizeGuestCount('not_attending', '4'), 0);
  assert.equal(normalizeGuestCount('attending', '3'), 3);
  assert.equal(normalizeGuestCount('attending', '99'), 10);
});

test('buildGoogleCalendarUrl contains encoded event details', () => {
  const url = buildGoogleCalendarUrl({
    title: 'Wedding XXX & XXX',
    start: '2026-12-12T10:00:00+08:00',
    end: '2026-12-12T14:00:00+08:00',
    location: 'Venue Address XXX',
    details: 'Please celebrate with us.'
  });
  assert.match(url, /^https:\/\/calendar\.google\.com\/calendar\/render\?/);
  assert.match(url, /text=Wedding\+XXX\+%26\+XXX/);
  assert.match(url, /location=Venue\+Address\+XXX/);
});
