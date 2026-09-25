const fs = require('fs');
const path = require('path');

const screensDir = path.join(__dirname, '../js/screens');
const files = fs.readdirSync(screensDir).map(f => path.join(screensDir, f));
files.push(path.join(__dirname, '../index.html'));
files.push(path.join(__dirname, '../js/app.js'));

const extracted = new Set();

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  // Extract text inside HTML tags: >([^<]+)<
  const tagMatches = content.matchAll(/>([^<>{}\n]+)</g);
  for (const m of tagMatches) {
    const text = m[1].replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').replace(/&quot;/g, '"').trim();
    if (text && text.length > 1 && !/^[0-9\s.,₹$%+\-*/:()|•→✓—#_]+$/.test(text)) {
      extracted.add(text);
    }
  }
  // Extract string literals in quotes that look like UI text
  const strMatches = content.matchAll(/['"`]([A-Z][a-zA-Z0-9\s.,?!:;'"()/-]{2,80})['"`]/g);
  for (const m of strMatches) {
    const text = m[1].trim();
    if (text && !text.includes('/') && !text.includes('.js') && !text.includes('px') && !text.includes('rgba') && !text.includes('#')) {
      extracted.add(text);
    }
  }
}

const arr = Array.from(extracted).sort();
console.log('Total unique strings found:', arr.length);
fs.writeFileSync(path.join(__dirname, 'extracted_strings.json'), JSON.stringify(arr, null, 2));
console.log('Saved to scratch/extracted_strings.json');
