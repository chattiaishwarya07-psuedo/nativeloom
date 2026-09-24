/**
 * Screen: AI Smart Craft Studio (1-Photo AI Auto-Flow)
 * Exact recreation of User Provided Reference Screenshot (Screen 1)
 */

import { State } from '../state.js';
import { AudioAssistance } from '../speech.js';

export function renderCraftStudioScreen(container) {
  let viewMode = 'enhanced'; // 'enhanced', 'raw', 'side'
  let listingPrice = 750;
  let isPlayingAudio = false;

  function update() {
    render();
  }

  function render() {
    container.innerHTML = `
      <div class="craft-studio-screen animate-fade-in">
        
        <!-- Studio Mode Top Pill -->
        <div style="display:flex; justify-content:space-between; align-items:center; margin:8px 0 12px; padding-bottom:8px; border-bottom:1px solid var(--border-subtle);">
          <div style="display:flex; align-items:center; gap:8px;">
            <div style="width:24px; height:24px; border-radius:50%; background:var(--color-terracotta); color:#fff; display:flex; align-items:center; justify-content:center; font-size:0.75rem; font-weight:900;">1</div>
            <span style="font-size:0.95rem; font-weight:900; color:var(--text-primary);">AI Smart Craft Studio</span>
          </div>
          <span style="font-size:0.7rem; color:var(--text-muted); font-weight:700;">1-Photo AI Auto-Flow</span>
        </div>

        <!-- STEP 1: 1 Photo Capture & AI Polish -->
        <div class="studio-step-header">
          <div style="display:flex; align-items:center; gap:6px;">
            <span style="font-size:0.72rem; font-weight:800; color:var(--color-terracotta);">भाग 1 • STEP 1</span>
            <span class="studio-step-badge">✨ AI Studio</span>
          </div>
          <button type="button" class="btn-secondary" id="btn-retake" style="padding:3px 10px; font-size:0.68rem; font-weight:700;">
            📷 Retake
          </button>
        </div>

        <h2 class="studio-step-title" style="margin-bottom:8px;">1 Photo Capture &amp; AI Polish</h2>

        <div class="enhanced-ready-banner">
          <span style="display:flex; align-items:center; gap:6px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
            AI Presentation Enhanced
          </span>
          <span class="badge-green" style="font-size:0.62rem; padding:1px 6px;">Ready</span>
        </div>

        <!-- Comparison View Box -->
        <div class="comparison-container">
          <div class="comparison-toggle-bar">
            <span class="comparison-toggle-title">Live Comparison View</span>
            <div class="comparison-btn-group">
              <button type="button" class="cmp-btn ${viewMode === 'enhanced' ? 'active' : ''}" id="btn-cmp-enhanced">AI Enhanced</button>
              <button type="button" class="cmp-btn ${viewMode === 'raw' ? 'active' : ''}" id="btn-cmp-raw">Artisan Raw</button>
              <button type="button" class="cmp-btn ${viewMode === 'side' ? 'active' : ''}" id="btn-cmp-side">Side-by-Side</button>
            </div>
          </div>

          <div class="studio-image-preview-box">
            <img src="/assets/raw_pottery_snap.jpg" alt="Gorakhpur Terracotta Pitcher" class="studio-preview-img" style="${viewMode === 'raw' ? 'filter:none;' : 'filter:contrast(1.08) drop-shadow(0 16px 24px rgba(78, 42, 22, 0.35));'}" onerror="this.src='/assets/blue_pottery.jpg'">
            <span class="badge-mkt-ready">Marketplace Ready</span>
          </div>
        </div>

        <!-- STEP 2: AI Vision Auto-Detected -->
        <div class="studio-step-header">
          <div style="display:flex; align-items:center; gap:6px;">
            <span style="font-size:0.72rem; font-weight:800; color:var(--color-terracotta);">भाग 2 • STEP 2</span>
            <span class="studio-step-badge" style="background:#EFF6FF; color:#1E40AF; border-color:#BFDBFE;">👁️ Vision Extraction</span>
          </div>
          <span class="badge-green" style="font-size:0.65rem;">✓ Verified</span>
        </div>

        <h2 class="studio-step-title" style="margin-bottom:10px;">AI Vision Auto-Detected</h2>

        <!-- Craft Title -->
        <div style="background:#FFFFFF; border:1px solid var(--border-subtle); border-radius:var(--radius-lg); padding:12px; margin-bottom:12px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
            <span style="font-size:0.72rem; font-weight:800; color:var(--text-primary);">Craft Title</span>
            <span style="font-size:0.68rem; color:var(--color-terracotta); font-weight:700;">✨ Auto-filled from photo • Tap to edit</span>
          </div>
          <div style="display:flex; align-items:center; gap:8px; background:#FAF7F2; border-radius:var(--radius-md); padding:8px 12px;">
            <div style="width:26px; height:26px; border-radius:6px; background:var(--color-terracotta); color:#fff; display:flex; align-items:center; justify-content:center;">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
            </div>
            <input type="text" value="Hand-Etched Gorakhpur Terracotta Pitcher" style="flex:1; border:none; background:transparent; font-size:0.85rem; font-weight:800; color:var(--text-primary); outline:none;">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
          </div>

          <!-- Craft Category -->
          <div style="display:flex; justify-content:space-between; align-items:center; margin:10px 0 6px;">
            <span style="font-size:0.72rem; font-weight:800; color:var(--text-primary);">Craft Category</span>
            <span style="font-size:0.68rem; color:var(--color-green); font-weight:700;">⏱ 99% Match</span>
          </div>
          <div style="display:flex; align-items:center; justify-content:space-between; background:#FFFDF9; border:1.5px solid var(--color-green); border-radius:var(--radius-md); padding:8px 12px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <img src="/assets/raw_pottery_snap.jpg" alt="Pottery" style="width:32px; height:32px; border-radius:6px; object-fit:cover;">
              <span style="font-size:0.85rem; font-weight:800; color:var(--text-primary);">Clay &amp; Terracotta</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="var(--color-green)"><path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.74-5.25z" clip-rule="evenodd" /></svg>
          </div>

          <!-- Auto-Detected Craft Attributes -->
          <div style="font-size:0.72rem; font-weight:800; color:var(--text-secondary); margin-top:10px;">Auto-Detected Craft Attributes</div>
          <div class="detected-attr-grid">
            <span class="attr-pill">🏺 Natural Terracotta Clay</span>
            <span class="attr-pill">🧱 Jaali Cutwork Pattern</span>
            <span class="attr-pill">💧 Approx. 1.8 Liters</span>
          </div>
        </div>

        <!-- STEP 3: Artisan's Voice Description -->
        <div class="studio-step-header">
          <div style="display:flex; align-items:center; gap:6px;">
            <span style="font-size:0.72rem; font-weight:800; color:var(--color-terracotta);">भाग 3 • STEP 3</span>
            <span class="studio-step-badge" style="background:#FFF1F2; color:#9F1239; border-color:#FECDD3;">Artisan's Voice Description</span>
          </div>
          <span class="badge-amber" style="font-size:0.62rem;">⬇ Audio</span>
        </div>

        <!-- Voice Wave Card -->
        <div class="voice-wave-card">
          <div class="voice-top-row">
            <button type="button" class="voice-play-round" id="btn-play-voice">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            </button>
            <div style="flex:1;">
              <div style="font-size:0.78rem; font-weight:800; color:var(--text-primary);">Recorded in Bhojpuri / Hindi</div>
              <div style="font-size:0.68rem; color:var(--text-muted);">0:28s</div>
            </div>
            <span class="badge-amber" style="font-size:0.62rem;">• Audio Verified</span>
          </div>

          <div style="display:flex; align-items:center; gap:8px;">
            <div class="wave-bars-visual">
              ${Array(32).fill(0).map(() => '<span class="wave-bar"></span>').join('')}
            </div>
            <span style="font-size:0.7rem; font-weight:700; color:var(--text-muted); font-family:monospace;">0:28</span>
          </div>
        </div>

        <!-- Original Speech Quote -->
        <div class="quote-speech-card">
          <div style="font-size:0.7rem; font-weight:800; color:var(--color-terracotta); margin-bottom:4px; font-style:normal;">
            🗣️ कारीगर के मूल बोल (Original Speech):
          </div>
          "ई माटी राप्ती नदी के किनारे से निकल गइल बा, 2 दिन चाक पर गढ़ल आ नीम के छांव में सुखवल गइल.."
        </div>

        <!-- AI Translated English Story -->
        <div class="translation-card">
          <div class="translation-header">
            <span style="font-size:0.72rem; font-weight:800; color:var(--text-primary); display:flex; align-items:center; gap:4px;">
              🌐 Global Buyer Listing (English Story)
            </span>
            <span class="badge-green" style="font-size:0.6rem; background:#0E2E21; color:#4ADE80; border:none;">
              ✨ AI Translated to English
            </span>
          </div>
          <div class="translation-text">
            "Hand-thrown using sacred Rapti riverbed clay, shade-cured under neem trees, and hand-etched with ancestral floral jaali breathing pores."
          </div>
          <div style="display:flex; justify-content:flex-end; margin-top:6px;">
            <button type="button" style="background:none; border:none; font-size:0.72rem; color:var(--color-terracotta); font-weight:700; cursor:pointer;">
              ✏️ Fine-tune Translation
            </button>
          </div>
        </div>

        <!-- STEP 4: AI Fair Price Recommendation -->
        <div class="studio-step-header">
          <div style="display:flex; align-items:center; gap:6px;">
            <span style="font-size:0.72rem; font-weight:800; color:var(--color-terracotta);">भाग 4 • STEP 4</span>
            <span class="studio-step-badge" style="background:#FFFBEB; color:#92400E; border-color:#FDE68A;">🏷️ Fair Craft Valuation</span>
          </div>
          <span class="badge-subtle" style="font-size:0.62rem;">Transparent Costing</span>
        </div>

        <h2 class="studio-step-title" style="margin-bottom:10px;">AI Fair Price Recommendation</h2>

        <!-- Costing Breakdown Factors -->
        <div class="costing-table">
          <div style="font-size:0.75rem; font-weight:800; color:var(--text-primary); margin-bottom:8px;">Costing Breakdown Factors</div>
          
          <div class="costing-row">
            <span>🔄 Raw Material (River clay, wood husk firing)</span>
            <strong>₹140</strong>
          </div>
          <div class="costing-row">
            <span>⏳ Artisan Working Hours (16 hours handcrafting)</span>
            <strong>₹420</strong>
          </div>
          <div class="costing-row">
            <span>🛡️ Complexity &amp; Firing Loss Reserve</span>
            <strong>₹110</strong>
          </div>
          <div class="costing-row">
            <span>✓ Cluster Fair Minimum Floor</span>
            <strong>₹670</strong>
          </div>
        </div>

        <!-- AI Fair Market Range Banner -->
        <div class="fair-range-box">
          <div>
            <div style="font-size:0.68rem; font-weight:800; color:var(--color-terracotta); text-transform:uppercase; letter-spacing:0.04em;">AI FAIR MARKET RANGE</div>
            <div class="range-number">₹700 – ₹850</div>
            <div style="font-size:0.68rem; color:var(--text-secondary);">Similar products sell between this range</div>
          </div>
          <div style="width:48px; height:48px; border-radius:12px; background:var(--color-terracotta); color:#fff; display:flex; align-items:center; justify-content:center; font-size:1.5rem; font-weight:900;">
            ₹
          </div>
        </div>

        <!-- Choose Listing Price -->
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
          <span style="font-size:0.78rem; font-weight:800; color:var(--text-primary);">Choose Your Listing Price:</span>
          <span style="font-size:0.75rem; font-weight:800; color:var(--color-terracotta);">Selected: ₹${listingPrice}</span>
        </div>

        <div class="price-stepper-box">
          <span style="font-size:0.74rem; color:var(--text-secondary);">Adjust precisely in ₹10 increments</span>
          <div style="display:flex; align-items:center; gap:10px;">
            <button type="button" class="btn-stepper" id="btn-price-minus">−</button>
            <span style="font-size:1.05rem; font-weight:900; color:var(--text-primary);">₹${listingPrice}</span>
            <button type="button" class="btn-stepper plus" id="btn-price-plus">+</button>
          </div>
        </div>

        <!-- Artisan Autonomy Guarantee -->
        <div style="background:#E8F5EE; border:1px solid var(--color-green-border); border-radius:var(--radius-md); padding:10px 12px; display:flex; gap:10px; align-items:center; margin-bottom:18px;">
          <div style="width:34px; height:34px; border-radius:8px; background:#174332; color:#fff; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
          </div>
          <div style="font-size:0.72rem; color:#174332; line-height:1.35;">
            <strong>Artisan Autonomy Guarantee:</strong> Pricing is 100% your choice. 0% platform commission, direct bank payout within 24 hours.
          </div>
        </div>

        <!-- Bottom Action Buttons -->
        <button type="button" class="btn-primary" id="btn-publish-craft" style="margin-bottom:10px;">
          Publish to market
        </button>

        <button type="button" class="btn-secondary" id="btn-save-draft" style="border:none;">
          💾 Save as Draft
        </button>

      </div>
    `;

    // Comparison Mode Handlers
    container.querySelector('#btn-cmp-enhanced').addEventListener('click', () => {
      viewMode = 'enhanced';
      update();
    });
    container.querySelector('#btn-cmp-raw').addEventListener('click', () => {
      viewMode = 'raw';
      update();
    });
    container.querySelector('#btn-cmp-side').addEventListener('click', () => {
      viewMode = 'side';
      update();
    });

    // Voice Player Handler
    container.querySelector('#btn-play-voice').addEventListener('click', () => {
      AudioAssistance.speak(
        "ई माटी राप्ती नदी के किनारे से निकल गइल बा, 2 दिन चाक पर गढ़ल आ नीम के छांव में सुखवल गइल बा।",
        "hi-IN"
      );
    });

    // Price Stepper Handlers
    container.querySelector('#btn-price-minus').addEventListener('click', () => {
      if (listingPrice > 600) {
        listingPrice -= 10;
        update();
      }
    });
    container.querySelector('#btn-price-plus').addEventListener('click', () => {
      if (listingPrice < 1200) {
        listingPrice += 10;
        update();
      }
    });

    // Publish to market
    container.querySelector('#btn-publish-craft').addEventListener('click', () => {
      window.showToast?.("Terracotta Pitcher published live to Hastshilp Sangam!");
      setTimeout(() => {
        State.setScreen('explore');
      }, 700);
    });

    // Save as draft
    container.querySelector('#btn-save-draft').addEventListener('click', () => {
      window.showToast?.("Saved to local draft studio!");
    });
  }

  render();
}
