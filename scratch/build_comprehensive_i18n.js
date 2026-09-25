const fs = require('fs');
const path = require('path');

// Read existing i18n file
const i18nPath = path.join(__dirname, '../js/i18n.js');
let i18nContent = fs.readFileSync(i18nPath, 'utf8');

// Load extracted strings to ensure 100% coverage
const extractedStrings = JSON.parse(fs.readFileSync(path.join(__dirname, 'extracted_strings.json'), 'utf8'));

console.log('Total strings to cover:', extractedStrings.length);
