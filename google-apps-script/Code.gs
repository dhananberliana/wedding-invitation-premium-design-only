const SHEET_ID = '15RacQDVoV2mRPp8xq-bKcmAJJGXdZp5IzNQtt_V0d38';
const SHEET_NAME = 'RSVP';

function doGet(e) {
  try {
    const action = String((e && e.parameter && e.parameter.action) || 'wishes');
    if (action !== 'wishes') return json_({ ok: false, error: 'Unsupported action' });
    const limit = Math.max(1, Math.min(100, Number((e.parameter && e.parameter.limit) || 30)));
    return json_({ ok: true, wishes: getWishes_(limit) });
  } catch (error) {
    return json_({ ok: false, error: error.message });
  }
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const body = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    const clean = validatePayload_(body);
    const sheet = getSheet_();
    sheet.appendRow([
      new Date(),
      clean.fullName,
      clean.attendance,
      clean.guestCount,
      clean.wishes,
      clean.source
    ]);
    return json_({ ok: true });
  } catch (error) {
    return json_({ ok: false, error: error.message });
  } finally {
    try { lock.releaseLock(); } catch (_) {}
  }
}

function getWishes_(limit) {
  const sheet = getSheet_();
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return [];
  const startRow = Math.max(2, lastRow - limit + 1);
  const values = sheet.getRange(startRow, 1, lastRow - startRow + 1, 6).getValues();
  return values
    .filter(row => String(row[4] || '').trim())
    .reverse()
    .map(row => ({ name: String(row[1] || 'Guest'), message: String(row[4] || '') }));
}

function validatePayload_(body) {
  const fullName = String(body.fullName || '').trim().slice(0, 100);
  const attendance = String(body.attendance || '');
  const wishes = String(body.wishes || '').trim().slice(0, 500);
  const source = String(body.source || '').slice(0, 500);
  if (!fullName) throw new Error('Full name is required');
  if (!['attending', 'not_attending'].includes(attendance)) throw new Error('Invalid attendance value');
  let guestCount = Number.parseInt(body.guestCount, 10);
  if (attendance === 'not_attending') guestCount = 0;
  if (attendance === 'attending') guestCount = Math.max(1, Math.min(10, Number.isFinite(guestCount) ? guestCount : 1));
  return { fullName, attendance, guestCount, wishes, source };
}

function getSheet_() {
  if (!SHEET_ID || SHEET_ID.includes('PASTE_')) throw new Error('Set SHEET_ID in Code.gs first');
  const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  const sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) throw new Error(`Sheet '${SHEET_NAME}' not found`);
  return sheet;
}

function json_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
