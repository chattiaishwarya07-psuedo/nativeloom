const fs = require('fs');
const path = require('path');

const phrases = JSON.parse(fs.readFileSync(path.join(__dirname, 'master_phrases.json'), 'utf8'));
const words = JSON.parse(fs.readFileSync(path.join(__dirname, 'master_word_dict.json'), 'utf8'));
const snippets = JSON.parse(fs.readFileSync(path.join(__dirname, 'all_ui_snippets.json'), 'utf8'));

// Build lookup maps
const phraseIndex = new Map();
phrases.forEach(entry => {
  for (const [lang, text] of Object.entries(entry)) {
    if (typeof text === 'string') {
      phraseIndex.set(text.toLowerCase().trim(), entry);
    }
  }
});

function stripSymbols(str) {
  let prefix = '';
  let suffix = '';
  let core = str;
  const mStart = core.match(/^([^\p{L}\p{N}]+)([\p{L}\p{N}].*)$/u);
  if (mStart) {
    prefix = mStart[1];
    core = mStart[2];
  }
  const mEnd = core.match(/^(.*?)([^\p{L}\p{N}]+)$/u);
  if (mEnd) {
    core = mEnd[1];
    suffix = mEnd[2];
  }
  return { prefix, core, suffix };
}

function translatePhrase(text, targetLang) {
  if (!text || typeof text !== 'string') return text;
  let trimmed = text.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").trim();
  if (!trimmed) return text;
  if (/^[0-9\s.,₹$%+\-*/:()|•→✓—#_›><=]+$/.test(trimmed)) return text;

  // 1. Direct phrase match
  const lower = trimmed.toLowerCase();
  const direct = phraseIndex.get(lower);
  if (direct && direct[targetLang]) return direct[targetLang];

  // 2. Unicode prefix / suffix stripping (emojis, brackets, bullets, numbers)
  const stripped = stripSymbols(trimmed);
  if (stripped.prefix || stripped.suffix) {
    const coreLower = stripped.core.toLowerCase().trim();
    const coreEntry = phraseIndex.get(coreLower);
    if (coreEntry && coreEntry[targetLang]) {
      return stripped.prefix + coreEntry[targetLang] + stripped.suffix;
    }
  }

  // 3. Numbered list prefixes like "1. ", "2. ", "Step 1: "
  const numMatch = trimmed.match(/^(\d+[\.\)]\s*)(.*)$/);
  if (numMatch) {
    const sub = translatePhrase(numMatch[2], targetLang);
    if (sub && sub !== numMatch[2]) {
      return numMatch[1] + sub;
    }
  }

  // 4. Compound clauses
  const delimiters = [' • ', ' | ', ' - ', ' / ', ', '];
  for (const delim of delimiters) {
    if (trimmed.includes(delim)) {
      const parts = trimmed.split(delim);
      const translatedParts = parts.map(p => translatePhrase(p, targetLang));
      return translatedParts.join(delim);
    }
  }

  // 5. Token / Word fallback
  const tokens = trimmed.split(/(\s+|[.,!?:;()\-]+)/);
  let changed = false;
  const translatedTokens = tokens.map(tok => {
    const clean = tok.toLowerCase().trim();
    if (!clean || !/[a-zA-Z]/.test(clean)) return tok;
    if (words[clean] && words[clean][targetLang]) {
      changed = true;
      return words[clean][targetLang];
    }
    const tokEntry = phraseIndex.get(clean);
    if (tokEntry && tokEntry[targetLang]) {
      changed = true;
      return tokEntry[targetLang];
    }
    return tok;
  });

  if (changed) {
    return translatedTokens.join('');
  }

  return null;
}

let translatedCount = 0;
const untranslated = [];

snippets.forEach(s => {
  const tr = translatePhrase(s, 'hi');
  if (tr && tr !== s) {
    translatedCount++;
  } else {
    untranslated.push(s);
  }
});

console.log(`Translated into Hindi: ${translatedCount} / ${snippets.length}`);
console.log(`Untranslated: ${untranslated.length}`);
fs.writeFileSync(path.join(__dirname, 'untranslated_snippets.json'), JSON.stringify(untranslated, null, 2));
