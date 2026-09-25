const fs = require('fs');
const path = require('path');

// Mock a lightweight DOM environment in Node
class MockNode {
  constructor(nodeType, value = '') {
    this.nodeType = nodeType;
    this.nodeValue = value;
    this._textContent = value;
    this.parentElement = null;
    this.childNodes = [];
    this.attributes = {};
  }
  get textContent() {
    if (this.nodeType === 3) return this.nodeValue;
    return this.childNodes.map(c => c.textContent).join('');
  }
  set textContent(val) {
    this.nodeValue = val;
    this.childNodes = [new MockNode(3, val)];
  }
  getAttribute(k) { return this.attributes[k] || null; }
  setAttribute(k, v) { this.attributes[k] = String(v); }
  hasAttribute(k) { return k in this.attributes; }
  querySelectorAll(sel) {
    const res = [];
    function walk(el) {
      for (const c of el.childNodes) {
        if (c.nodeType === 1) {
          if (sel === '[data-i18n]' && c.hasAttribute('data-i18n')) res.push(c);
          else if (sel.includes('placeholder') && c.hasAttribute('placeholder')) res.push(c);
          else if (sel === '[title]' && c.hasAttribute('title')) res.push(c);
          else if (c.tagName.toLowerCase() === sel.toLowerCase()) res.push(c);
          walk(c);
        }
      }
    }
    walk(this);
    return res;
  }
}

class MockElement extends MockNode {
  constructor(tag) {
    super(1);
    this.tagName = tag.toUpperCase();
    this.id = '';
    this.className = '';
    this.style = {};
  }
  get placeholder() { return this.attributes['placeholder'] || ''; }
  set placeholder(v) { this.attributes['placeholder'] = v; }
  get title() { return this.attributes['title'] || ''; }
  set title(v) { this.attributes['title'] = v; }
}

function parseHtmlToMockTree(html) {
  const root = new MockElement('div');
  // Simple regex parser for tags and text
  const tagOrTextRegex = /(<[^>]+>)|([^<]+)/g;
  const stack = [root];

  let match;
  while ((match = tagOrTextRegex.exec(html)) !== null) {
    if (match[1]) {
      const tagStr = match[1];
      if (tagStr.startsWith('<!--')) continue;
      if (tagStr.startsWith('</')) {
        if (stack.length > 1) stack.pop();
      } else {
        const isSelfClosing = tagStr.endsWith('/>') || /^<(img|input|hr|br|meta|link)/i.test(tagStr);
        const tagMatch = tagStr.match(/<([a-zA-Z0-9]+)/);
        if (tagMatch) {
          const el = new MockElement(tagMatch[1]);
          // parse attributes
          const attrRegex = /([a-zA-Z0-9\-_:]+)(?:=["']([^"']*)["'])?/g;
          let am;
          while ((am = attrRegex.exec(tagStr.slice(tagMatch[0].length))) !== null) {
            const attrName = am[1];
            const attrVal = am[2] !== undefined ? am[2] : '';
            if (attrName === 'id') el.id = attrVal;
            else if (attrName === 'class') el.className = attrVal;
            else el.setAttribute(attrName, attrVal);
          }
          stack[stack.length - 1].childNodes.push(el);
          el.parentElement = stack[stack.length - 1];
          if (!isSelfClosing) {
            stack.push(el);
          }
        }
      }
    } else if (match[2]) {
      const text = match[2].trim();
      if (text) {
        const textNode = new MockNode(3, text);
        textNode.parentElement = stack[stack.length - 1];
        stack[stack.length - 1].childNodes.push(textNode);
      }
    }
  }
  return root;
}

// Setup global mock DOM for i18n module
global.NodeFilter = {
  SHOW_TEXT: 4,
  FILTER_ACCEPT: 1,
  FILTER_REJECT: 2,
  FILTER_SKIP: 3
};

global.document = {
  createElement(tag) { return new MockElement(tag); },
  documentElement: { lang: 'en' },
  getElementById(id) { return null; },
  querySelector(sel) { return null; },
  createTreeWalker(root, whatToShow, filter) {
    const allTextNodes = [];
    function walk(node) {
      if (node.nodeType === 3) {
        if (filter.acceptNode(node) === NodeFilter.FILTER_ACCEPT) {
          allTextNodes.push(node);
        }
      } else {
        for (const child of node.childNodes) {
          walk(child);
        }
      }
    }
    walk(root);
    let index = -1;
    return {
      nextNode() {
        index++;
        if (index < allTextNodes.length) {
          this.currentNode = allTextNodes[index];
          return true;
        }
        return false;
      },
      currentNode: null
    };
  }
};

global.window = {
  State: { language: 'en', notify: () => {} },
  localStorage: {
    data: {},
    getItem(k) { return this.data[k] || null; },
    setItem(k, v) { this.data[k] = String(v); }
  }
};

// Import compiled i18n engine
async function runVerification() {
  const i18nModule = await import('../js/i18n.js');
  const i18n = i18nModule.i18n;

  console.log('Testing i18n engine loaded successfully.');
  console.log('Languages available:', Object.keys(i18nModule.LanguageMetadata));

  // Test sample HTML from screens:
  const testHtml = `
    <div class="mobile-container">
      <h1>Choose Your Account Type</h1>
      <div class="card">
        <span class="badge">0% Platform Commission • 100% DBT Direct to Artisans</span>
        <h2>Artisan / Maker</h2>
        <p>Sell your authentic handicrafts directly to patrons with 0% commission.</p>
        <button>Continue as Artisan →</button>
      </div>
      <div class="card">
        <h2>Buyer / Patron</h2>
        <p>Buy authentic handicrafts directly from makers. GI tagged verified.</p>
        <button>Shop as Patron →</button>
      </div>
      <div class="card">
        <h2>Institutional / Bulk Buyer</h2>
        <p>Procure large consignments directly from handicraft clusters.</p>
        <button>Explore B2B Wholesale →</button>
      </div>
      <div class="footer">
        <input type="text" placeholder="Search craft, artisan or cluster...">
      </div>
    </div>
  `;

  const container = parseHtmlToMockTree(testHtml);

  // Test each language translation:
  const testLangs = ['hi', 'bn', 'ta', 'te', 'mr', 'gu', 'kn', 'bho', 'mai'];

  for (const lang of testLangs) {
    window.State.language = lang;
    i18n.translatePage(container);

    const allText = container.textContent;
    const ph = container.querySelectorAll('input')[0].placeholder;

    console.log(`\n================== Language: ${lang} (${i18nModule.LanguageMetadata[lang].native}) ==================`);
    console.log('Sample translated text:');
    // Extract lines
    const lines = allText.split(/\s{2,}/).filter(l => l.trim().length > 3);
    lines.slice(0, 6).forEach(l => console.log('  •', l.trim()));
    console.log('  • Input Placeholder:', ph);

    // Verify non-English script is present
    const hasRegionalChars = /[\u0900-\u0DFF]/.test(allText);
    console.log(`Verification: Has regional script characters? ${hasRegionalChars ? 'PASS ✓' : 'FAIL ✗'}`);
    if (!hasRegionalChars) {
      throw new Error(`Failed to translate into ${lang}`);
    }
  }

  // Now test restoring back to English:
  console.log('\n================== Restoring to English (en) ==================');
  window.State.language = 'en';
  i18n.translatePage(container);

  const restoredText = container.textContent;
  const restoredPh = container.querySelectorAll('input')[0].placeholder;
  console.log('Restored English text sample:');
  const restoredLines = restoredText.split(/\s{2,}/).filter(l => l.trim().length > 3);
  restoredLines.slice(0, 5).forEach(l => console.log('  •', l.trim()));
  console.log('  • Restored Input Placeholder:', restoredPh);

  const containsAccountType = restoredText.includes('Choose Your Account Type');
  const containsArtisan = restoredText.includes('Artisan / Maker');
  const containsSearchPlaceholder = restoredPh.includes('Search craft, artisan or cluster...');

  console.log(`Verification: English cleanly restored? ${containsAccountType && containsArtisan && containsSearchPlaceholder ? 'PASS ✓' : 'FAIL ✗'}`);
  if (!containsAccountType || !containsArtisan) {
    throw new Error('English restoration failed');
  }

  console.log('\nALL 10 LANGUAGES VERIFIED SUCCESSFULLY!');
}

runVerification().catch(err => {
  console.error('Verification error:', err);
  process.exit(1);
});
