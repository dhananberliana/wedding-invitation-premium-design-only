import fs from 'node:fs';
import assert from 'node:assert/strict';

const css = fs.readFileSync(new URL('../css/styles.css', import.meta.url), 'utf8');

assert.match(css, /--ink:\s*#2a211d/, 'premium ink token should exist');
assert.match(css, /--champagne:\s*#c3a26c/, 'champagne accent token should exist');
assert.match(css, /\.section::before/, 'sections should include decorative editorial framing');
assert.match(css, /\.quote-card::after/, 'glass quote card should include ornamental inner frame');
assert.match(css, /\.gallery-grid img:hover/, 'gallery should include refined desktop hover treatment');
assert.match(css, /@media \(max-width:759px\)/, 'mobile-specific polish should exist');
console.log('Design-only assertions passed');
