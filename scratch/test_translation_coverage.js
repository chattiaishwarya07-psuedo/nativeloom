const fs = require('fs');
const path = require('path');

const comprehensiveEntries = JSON.parse(fs.readFileSync(path.join(__dirname, 'comprehensive_entries.json'), 'utf8'));
const wordDict = JSON.parse(fs.readFileSync(path.join(__dirname, 'word_dictionary.json'), 'utf8'));
const allStrings = JSON.parse(fs.readFileSync(path.join(__dirname, 'extracted_strings.json'), 'utf8'));

// Build index
const phraseIndex = new Map();
comprehensiveEntries.forEach(entry => {
  for (const [lang, text] of Object.entries(entry)) {
    if (typeof text === 'string') {
      phraseIndex.set(text.toLowerCase().trim(), entry);
    }
  }
});

// Also add existing PhraseDictionary from i18n.js
const i18nContent = fs.readFileSync(path.join(__dirname, '../js/i18n.js'), 'utf8');
const existingMatch = i18nContent.match(/export const PhraseDictionary = (\[[\s\S]*?\]);\s*\/\/ High-performance/);
if (existingMatch) {
  try {
    const existing = eval(existingMatch[1]);
    existing.forEach(entry => {
      for (const [lang, text] of Object.entries(entry)) {
        if (typeof text === 'string') {
          phraseIndex.set(text.toLowerCase().trim(), entry);
        }
      }
    });
  } catch(e) {
    console.error('Error parsing existing PhraseDictionary:', e.message);
  }
}

function translatePhrase(text, targetLang) {
  if (!text || typeof text !== 'string') return text;
  const trimmed = text.trim();
  if (!trimmed) return text;
  if (/^[0-9\s.,₹$%+\-*/:()|•→✓—#_]+$/.test(trimmed)) return text;

  // Direct match
  const lower = trimmed.toLowerCase();
  const direct = phraseIndex.get(lower);
  if (direct && direct[targetLang]) return direct[targetLang];

  // Prefix & Suffix stripping
  let prefix = '';
  let suffix = '';
  let core = trimmed;

  const prefixMatch = core.match(/^([^a-zA-Z0-9\u0900-\u0DFF]+)(.*)$/);
  if (prefixMatch) {
    prefix = prefixMatch[1];
    core = prefixMatch[2].trim();
  }

  const suffixMatch = core.match(/^(.*?)([^a-zA-Z0-9\u0900-\u0DFF]+)$/);
  if (suffixMatch) {
    core = suffixMatch[1].trim();
    suffix = suffixMatch[2];
  }

  const coreLower = core.toLowerCase();
  const coreEntry = phraseIndex.get(coreLower);
  if (coreEntry && coreEntry[targetLang]) {
    return prefix + coreEntry[targetLang] + suffix;
  }

  // Compound clauses (e.g. split by ' • ' or ' | ')
  if (trimmed.includes(' • ')) {
    const parts = trimmed.split(' • ');
    const transParts = parts.map(p => translatePhrase(p, targetLang));
    return transParts.join(' • ');
  }
  if (trimmed.includes(' | ')) {
    const parts = trimmed.split(' | ');
    const transParts = parts.map(p => translatePhrase(p, targetLang));
    return transParts.join(' | ');
  }

  // Word-level translation
  const words = trimmed.split(/\s+/);
  if (words.length > 1) {
    let anyWordTranslated = false;
    const transWords = words.map(w => {
      const wClean = w.replace(/[^a-zA-Z]/g, '').toLowerCase();
      if (wordDict[wClean] && wordDict[wClean][targetLang]) {
        anyWordTranslated = true;
        return w.replace(new RegExp(wClean, 'i'), wordDict[wClean][targetLang]);
      }
      const wEntry = phraseIndex.get(wClean);
      if (wEntry && wEntry[targetLang]) {
        anyWordTranslated = true;
        return w.replace(new RegExp(wClean, 'i'), wEntry[targetLang]);
      }
      return w;
    });
    if (anyWordTranslated) {
      return transWords.join(' ');
    }
  }

  return null;
}

let translatedCount = 0;
let stillMissing = [];

for (const s of allStrings) {
  const t = translatePhrase(s, 'hi');
  if (t && t !== s) {
    translatedCount++;
  } else {
    stillMissing.push(s);
  }
}

console.log('Translated count:', translatedCount, '/', allStrings.length);
console.log('Remaining missing:', stillMissing.length);
fs.writeFileSync(path.join(__dirname, 'still_missing.json'), JSON.stringify(stillMissing, null, 2));
