const fs = require('fs');
const path = require('path');

const screensDir = 'js/screens';
const files = fs.readdirSync(screensDir);
const textSnippets = new Set();

files.forEach(file => {
  const content = fs.readFileSync(path.join(screensDir, file), 'utf8');
  
  // 1. Text between HTML tags: >text<
  const tagMatches = content.matchAll(/>([^<]+)</g);
  for (const match of tagMatches) {
    let raw = match[1]
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");
    // Strip ${...} template variables
    raw = raw.replace(/\$\{[^}]*\}/g, ' ').trim();
    raw = raw.replace(/\s+/g, ' ');
    if (raw && raw.length > 1 && /[a-zA-Z]/.test(raw)) {
      if (!raw.includes('{') && !raw.includes('}') && !raw.includes('function') && !raw.includes('return')) {
        textSnippets.add(raw);
      }
    }
  }

  // 2. Attributes: placeholder, title, aria-label
  const attrMatches = content.matchAll(/(?:placeholder|title|aria-label)=["']([^"']+)["']/g);
  for (const m of attrMatches) {
    let raw = m[1].replace(/\$\{[^}]*\}/g, ' ').trim().replace(/\s+/g, ' ');
    if (raw && raw.length > 1 && /[a-zA-Z]/.test(raw) && !raw.startsWith('assets/') && !raw.startsWith('http')) {
      textSnippets.add(raw);
    }
  }
});

// Also check index.html and js/app.js
const indexHtml = fs.readFileSync('index.html', 'utf8');
const indexMatches = indexHtml.matchAll(/>([^<]+)</g);
for (const match of indexMatches) {
  let raw = match[1].trim().replace(/\s+/g, ' ');
  if (raw && raw.length > 1 && /[a-zA-Z]/.test(raw)) {
    textSnippets.add(raw);
  }
}

const appJs = fs.readFileSync('js/app.js', 'utf8');
const appMatches = appJs.matchAll(/>([^<]+)</g);
for (const match of appMatches) {
  let raw = match[1].replace(/\$\{[^}]*\}/g, ' ').trim().replace(/\s+/g, ' ');
  if (raw && raw.length > 1 && /[a-zA-Z]/.test(raw) && !raw.includes('{') && !raw.includes('}')) {
    textSnippets.add(raw);
  }
}

console.log('Total unique real UI text snippets extracted:', textSnippets.size);
fs.writeFileSync('scratch/all_ui_snippets.json', JSON.stringify(Array.from(textSnippets).sort(), null, 2));
