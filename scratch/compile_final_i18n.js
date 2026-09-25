const fs = require('fs');
const path = require('path');

const i18nOrig = fs.readFileSync('js/i18n.js', 'utf8');

// Find end of Translations object
const endTranslationsIndex = i18nOrig.indexOf('export const PhraseDictionary = [');
if (endTranslationsIndex === -1) {
  console.error('Could not find PhraseDictionary marker in js/i18n.js');
  process.exit(1);
}

const headerPart = i18nOrig.substring(0, endTranslationsIndex).trim();

const phrases = JSON.parse(fs.readFileSync('scratch/master_phrases.json', 'utf8'));
const words = JSON.parse(fs.readFileSync('scratch/master_word_dict.json', 'utf8'));

const i18nEngineCode = `
export const PhraseDictionary = ${JSON.stringify(phrases, null, 2)};

export const WordDictionary = ${JSON.stringify(words, null, 2)};

// High-performance bi-directional phrase map
const phraseIndex = new Map();
for (const entry of PhraseDictionary) {
  for (const [lang, text] of Object.entries(entry)) {
    if (typeof text === 'string') {
      phraseIndex.set(text.toLowerCase().trim(), entry);
    }
  }
}

/**
 * Strips non-letter, non-digit unicode symbols, emojis, and brackets from text edges
 */
function stripSymbols(str) {
  let prefix = '';
  let suffix = '';
  let core = str;
  const mStart = core.match(/^([^\\p{L}\\p{N}]+)([\\p{L}\\p{N}].*)$/u);
  if (mStart) {
    prefix = mStart[1];
    core = mStart[2];
  }
  const mEnd = core.match(/^(.*?)([^\\p{L}\\p{N}]+)$/u);
  if (mEnd) {
    core = mEnd[1];
    suffix = mEnd[2];
  }
  return { prefix, core, suffix };
}

export const i18n = {
  get currentLang() {
    return (window.State && window.State.language) || localStorage.getItem('klv_language') || 'hi';
  },

  get metadata() {
    return LanguageMetadata[this.currentLang] || LanguageMetadata.hi;
  },

  /**
   * Translate a key into the active language, falling back to English or fallback string.
   */
  t(key, fallback = '') {
    const lang = this.currentLang;
    if (Translations[lang] && Translations[lang][key] !== undefined) {
      return Translations[lang][key];
    }
    if (Translations.en && Translations.en[key] !== undefined) {
      return Translations.en[key];
    }
    // Also check phrase dictionary directly
    const directPhrase = this.translatePhrase(fallback || key, lang);
    if (directPhrase) return directPhrase;
    return fallback || key;
  },

  /**
   * Translates any string bi-directionally between all 10 supported Indian languages
   */
  translatePhrase(text, targetLang) {
    if (!text || typeof text !== 'string') return text;
    if (!targetLang) targetLang = this.currentLang;
    if (targetLang === 'en') return text;

    let trimmed = text.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").trim();
    if (!trimmed) return text;
    if (/^[0-9\\s.,₹$%+\\-*/:()|•→✓—#_›><=]+$/.test(trimmed)) return text;

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
    const numMatch = trimmed.match(/^(\\d+[\\.\\)]\\s*)(.*)$/);
    if (numMatch) {
      const sub = this.translatePhrase(numMatch[2], targetLang);
      if (sub && sub !== numMatch[2]) {
        return numMatch[1] + sub;
      }
    }

    // 4. Compound clauses
    const delimiters = [' • ', ' | ', ' - ', ' / ', ', '];
    for (const delim of delimiters) {
      if (trimmed.includes(delim)) {
        const parts = trimmed.split(delim);
        const translatedParts = parts.map(p => this.translatePhrase(p, targetLang));
        return translatedParts.join(delim);
      }
    }

    // 5. Token / Word fallback
    const tokens = trimmed.split(/(\\s+|[.,!?:;()\\-]+)/);
    let changed = false;
    const translatedTokens = tokens.map(tok => {
      const clean = tok.toLowerCase().trim();
      if (!clean || !/[a-zA-Z]/.test(clean)) return tok;
      if (WordDictionary[clean] && WordDictionary[clean][targetLang]) {
        changed = true;
        return WordDictionary[clean][targetLang];
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
  },

  /**
   * Set active language, persist to localStorage, update state, and re-render app.
   */
  setLanguage(langId) {
    if (!LanguageMetadata[langId]) langId = 'hi';
    localStorage.setItem('klv_language', langId);
    if (window.State) {
      window.State.language = langId;
    }
    document.documentElement.lang = langId;
    this.updateHeaderPill();
    
    // Automatically re-render current screen with new language
    if (window.State && typeof window.State.notify === 'function') {
      window.State.notify();
    }

    // Run universal DOM deep translation
    setTimeout(() => {
      const container = (typeof document !== 'undefined') ? (document.querySelector('.mobile-container') || document.body) : null;
      this.translatePage(container);
    }, 15);
  },

  /**
   * Updates the top header language button label with current language native name & flag
   */
  updateHeaderPill() {
    const pill = document.getElementById('btn-language');
    const label = document.getElementById('btn-language-label');
    if (!pill) return;
    const meta = this.metadata;
    if (label) {
      label.innerHTML = \`\${meta.flag} \${meta.native} ▾\`;
    } else {
      pill.innerHTML = \`<span id="btn-language-label">\${meta.flag} \${meta.native} ▾</span>\`;
    }
    pill.title = \`Current Language: \${meta.english} (\${meta.native}). Click to change.\`;
  },

  /**
   * Return speech synthesizer BCP-47 locale tag
   */
  getVoiceLocale() {
    return this.metadata.voiceLocale || 'hi-IN';
  },

  /**
   * Return contextual voice speech string for the given screen in the active language
   */
  getScreenVoiceText(screenName) {
    const t = this.t.bind(this);
    if (screenName === 'artisan_studio' || screenName === 'craft_studio') return t('voiceGreetingArtisan');
    if (screenName === 'buyer_explore' || screenName === 'explore') return t('voiceGreetingBuyer');
    if (screenName === 'corporate_clusters') return t('voiceGreetingCorporate');
    return t('voiceGreetingWelcome');
  },

  /**
   * Deeply scans the DOM and translates all text nodes, input placeholders,
   * button titles, and data-i18n attributes into the active language in real time.
   */
  translatePage(container) {
    if (!container) {
      container = (typeof document !== 'undefined') ? (document.querySelector('.mobile-container') || document.body) : null;
    }
    if (!container || typeof container.querySelectorAll !== 'function') return;
    const lang = this.currentLang;

    // 1. Direct [data-i18n] elements
    container.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = this.t(key);
      if (val) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = val;
        } else {
          el.textContent = val;
        }
      }
    });

    // 2. Input placeholders
    container.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(input => {
      if (!input.getAttribute('data-orig-ph')) {
        input.setAttribute('data-orig-ph', input.placeholder);
      }
      const orig = input.getAttribute('data-orig-ph');
      if (lang === 'en') {
        input.placeholder = orig;
      } else {
        const translated = this.translatePhrase(orig, lang);
        if (translated) input.placeholder = translated;
      }
    });

    // 3. TreeWalker for leaf text elements with individual text node original caching
    if (typeof document !== 'undefined' && document.createTreeWalker) {
      const walker = document.createTreeWalker(
        container,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode(node) {
            if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
            const parent = node.parentElement;
            if (!parent) return NodeFilter.FILTER_REJECT;
            const tag = parent.tagName;
            if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'NOSCRIPT') return NodeFilter.FILTER_REJECT;
            if (parent.id === 'header-brand-logo' || (typeof parent.closest === 'function' && parent.closest('#header-brand-logo'))) return NodeFilter.FILTER_REJECT;
            if (node.nodeValue.trim() === 'Native Loom') return NodeFilter.FILTER_REJECT;
            return NodeFilter.FILTER_ACCEPT;
          }
        }
      );

      const nodesToTranslate = [];
      while (walker.nextNode()) {
        nodesToTranslate.push(walker.currentNode);
      }

      for (const node of nodesToTranslate) {
        if (node._origText === undefined) {
          node._origText = node.nodeValue;
        }
        const orig = node._origText;
        if (lang === 'en') {
          node.nodeValue = orig;
        } else {
          const text = orig.trim();
          if (!text) continue;
          const translated = this.translatePhrase(text, lang);
          if (translated && translated !== text) {
            node.nodeValue = orig.replace(text, translated);
          }
        }
      }
    }

    // 4. Titles and aria-labels
    container.querySelectorAll('[title]').forEach(el => {
      if (!el.getAttribute('data-orig-title')) {
        el.setAttribute('data-orig-title', el.title);
      }
      const orig = el.getAttribute('data-orig-title');
      if (lang === 'en') {
        el.title = orig;
      } else {
        const translated = this.translatePhrase(orig, lang);
        if (translated) el.title = translated;
      }
    });
  },

  /**
   * Translate any DOM elements with [data-i18n] in a container (Legacy compatibility)
   */
  translateElements(container) {
    this.translatePage(container);
  }
};

export function t(key, fallback = '') {
  return i18n.t(key, fallback);
}

// Global export
if (typeof window !== 'undefined') {
  window.i18n = i18n;
  window.t = t;
}
`;

const finalI18nContent = headerPart + '\n\n' + i18nEngineCode.trim() + '\n';
fs.writeFileSync('js/i18n.js', finalI18nContent, 'utf8');
console.log('Successfully wrote updated js/i18n.js!');
