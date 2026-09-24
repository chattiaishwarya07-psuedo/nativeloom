/**
 * Screen 3: Craft Product Details & 12-Day Creation Journey
 * Exact recreation of User Provided Reference Screenshot (Screen 3)
 */

import { State } from '../state.js';
import { AudioAssistance } from '../speech.js';

export function renderProductDetailsScreen(container) {
  let isTranscriptOpen = false;

  container.innerHTML = `
    <div class="product-details-screen animate-fade-in">
      
      <!-- GI Certified Origin Header Banner -->
      <div style="background:#FFF9F5; border:1px solid var(--color-terracotta-border); border-radius:var(--radius-md); padding:8px 12px; margin: 8px 0 12px; display:flex; justify-content:space-between; align-items:center;">
        <span style="font-size:0.75rem; font-weight:800; color:var(--color-terracotta);">
          🛡️ GI Certified Origin: Gorakhpur Terracotta
        </span>
        <span class="badge-amber" style="font-size:0.62rem; font-weight:800; background:#FEE2E2; color:#B91C1C; border-color:#FECACA;">
          GI TAG #412
        </span>
      </div>

      <!-- Hero Image Container with Master Guild Seal & 1.8L Badge -->
      <div class="gallery-hero-container">
        <img src="/assets/raw_pottery_snap.jpg" alt="Hand-Etched Terracotta Pitcher" class="gallery-hero-img" id="main-product-image">
        
        <button type="button" style="position:absolute; top:12px; right:12px; width:34px; height:34px; border-radius:50%; background:rgba(255,255,255,0.9); border:none; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="window.showToast('Zooming high-res clay jaali pores...')">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/><line x1="11" x2="11" y1="8" y2="14"/><line x1="8" x2="14" y1="11" y2="11"/></svg>
        </button>

        <div class="gallery-seal-tag">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-green)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          <div>
            <span style="display:block; line-height:1;">MASTER GUILD SEAL</span>
            <span style="font-size:0.6rem; color:var(--text-muted); font-family:monospace;">Pehchan #UP-VAR-492</span>
          </div>
          <span style="margin-left:6px; padding-left:6px; border-left:1px solid #D6C7B2; color:var(--color-terracotta);">
            💧 1.8 Litres
          </span>
        </div>
      </div>

      <!-- 4 Thumbnail Gallery -->
      <div class="gallery-thumbs-row">
        <img src="/assets/raw_pottery_snap.jpg" alt="Thumb 1" class="gallery-thumb-item active">
        <img src="/assets/raw_pottery_snap.jpg" alt="Thumb 2" class="gallery-thumb-item" style="filter:brightness(0.95);">
        <img src="/assets/raw_pottery_snap.jpg" alt="Thumb 3" class="gallery-thumb-item" style="filter:contrast(1.1);">
        <img src="/assets/raw_pottery_snap.jpg" alt="Thumb 4" class="gallery-thumb-item" style="filter:sepia(0.2);">
      </div>

      <!-- 3 Value Pillars -->
      <div class="value-triad-row">
        <div class="triad-item">
          <span style="font-size:1rem; display:block; margin-bottom:2px;">🏵️</span>
          GI Tag Certified
        </div>
        <div class="triad-item">
          <span style="font-size:1rem; display:block; margin-bottom:2px;">🏺</span>
          100% River Clay
        </div>
        <div class="triad-item">
          <span style="font-size:1rem; display:block; margin-bottom:2px;">🛠️</span>
          Master Potter
        </div>
      </div>

      <!-- Title & Pricing -->
      <div style="background:#FFFFFF; border:1px solid var(--border-subtle); border-radius:var(--radius-lg); padding:14px; margin-bottom:14px;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start;">
          <span style="font-size:0.7rem; font-weight:800; color:var(--color-terracotta); letter-spacing:0.04em;">
            TRADITIONAL NIZAMABAD CRAFT
          </span>
          <button type="button" style="background:none; border:none; cursor:pointer;" onclick="window.showToast('Added to Craft Wishlist')">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
          </button>
        </div>

        <h1 style="font-size:1.25rem; font-weight:900; color:var(--text-primary); margin: 4px 0 6px;">
          Hand-Etched Terracotta Pitcher
        </h1>
        <p style="font-size:0.78rem; color:var(--text-secondary); line-height:1.35; margin-bottom:12px;">
          Natural evaporative cooler for drinking water with natural alkaline balancing minerals.
        </p>

        <!-- Price Row -->
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:12px;">
          <span style="font-size:1.6rem; font-weight:900; color:var(--text-primary);">₹750</span>
          <span style="font-size:0.9rem; text-decoration:line-through; color:var(--text-muted);">₹950</span>
          <span class="badge-amber" style="background:#FEECE5; color:#9A3412; font-size:0.72rem; font-weight:800;">21% OFF</span>
          <span style="font-size:0.72rem; color:var(--color-green); font-weight:700; margin-left:auto;">● 8 Ready to Ship</span>
        </div>

        <!-- 100% Direct Artisan Payout Box -->
        <div style="background:#FFF9F5; border:1px dashed var(--color-terracotta-border); border-radius:var(--radius-md); padding:10px 12px; font-size:0.74rem; color:var(--text-secondary); line-height:1.4;">
          <strong style="color:var(--color-terracotta);">100% Direct Artisan Payout:</strong>
          Full ₹750 credits directly to Master Potter Ramdev Kumhar's verified Jan Dhan bank account. <strong>₹0 platform commission</strong> deducted.
        </div>
      </div>

      <!-- Artisan's Oral History Section -->
      <div style="background:#FFFFFF; border:1px solid var(--border-subtle); border-radius:var(--radius-lg); padding:14px; margin-bottom:14px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <div style="display:flex; align-items:center; gap:6px;">
            <span style="font-size:1.1rem;">🎙️</span>
            <div>
              <div style="font-size:0.85rem; font-weight:800;">Artisan's Oral History</div>
              <div style="font-size:0.68rem; color:var(--text-muted);">Spoken in English • 30 Seconds</div>
            </div>
          </div>
          <span style="font-size:0.7rem; font-family:monospace; color:var(--text-muted);">00:00 / 00:30</span>
        </div>

        <div style="display:flex; align-items:center; gap:10px; background:#FBF8F3; border-radius:var(--radius-md); padding:8px 12px; margin-bottom:8px;">
          <button type="button" id="btn-oral-history" style="width:34px; height:34px; border-radius:50%; background:var(--color-terracotta); color:#fff; border:none; display:flex; align-items:center; justify-content:center; cursor:pointer;">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          </button>
          <div style="flex:1; display:flex; gap:2px; align-items:center; height:20px;">
            ${Array(28).fill(0).map(() => '<span style="width:3px; height:50%; background:#C27E5D; border-radius:1px;"></span>').join('')}
          </div>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.72rem; color:var(--color-terracotta); font-weight:700; cursor:pointer;" id="toggle-transcript">
          <span>📖 Read Audio Transcript ▾</span>
        </div>

        <div id="oral-transcript" style="display:none; font-size:0.74rem; color:var(--text-secondary); line-height:1.4; padding-top:8px; margin-top:8px; border-top:1px dashed var(--border-subtle);">
          "My grandfather carved pitchers for the temple courtyard. This sacred Gomati clay cools water naturally without a drop of electricity, just through earthen breathing pores."
        </div>
      </div>

      <!-- Master Artisan Profile Card -->
      <div style="background:#FFFFFF; border:1px solid var(--border-subtle); border-radius:var(--radius-lg); padding:14px; margin-bottom:14px;">
        <div style="display:flex; gap:12px; align-items:center; margin-bottom:10px;">
          <img src="/assets/artisan_ramulu.jpg" alt="Ramdev Kumhar" style="width:52px; height:52px; border-radius:12px; object-fit:cover; border:2px solid var(--color-terracotta);">
          <div style="flex:1;">
            <div style="display:flex; align-items:center; gap:6px;">
              <span style="font-size:0.95rem; font-weight:800;">Ramdev Kumhar</span>
              <span class="badge-green" style="font-size:0.6rem; padding:1px 5px;">✓ Verified</span>
            </div>
            <div style="font-size:0.72rem; color:var(--text-secondary);">Varanasi Clay Guild • 35 Yr Heritage</div>
            <div style="font-size:0.7rem; color:var(--color-green); font-weight:700;">★ 98/100 Trust Index</div>
          </div>
        </div>

        <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:6px; text-align:center; background:#FAF7F2; border-radius:var(--radius-sm); padding:8px 4px; margin-bottom:10px;">
          <div>
            <div style="font-size:0.85rem; font-weight:800;">4th Gen</div>
            <div style="font-size:0.62rem; color:var(--text-muted);">Family Lineage</div>
          </div>
          <div>
            <div style="font-size:0.85rem; font-weight:800;">1,420+</div>
            <div style="font-size:0.62rem; color:var(--text-muted);">Pots Fired</div>
          </div>
          <div>
            <div style="font-size:0.85rem; font-weight:800; color:var(--color-green);">0 km</div>
            <div style="font-size:0.62rem; color:var(--text-muted);">Direct Channel</div>
          </div>
        </div>

        <div style="display:flex; gap:8px;">
          <button type="button" class="btn-secondary" style="flex:1; padding:8px; font-size:0.74rem;" onclick="window.showToast('Visiting Ramdev Kumhar Studio...')">
            🏛️ Visit Studio
          </button>
          <button type="button" class="btn-primary" style="flex:1; padding:8px; font-size:0.74rem; background:#1C3550;" onclick="window.showToast('Opening Guild direct message with Ramdev...')">
            💬 Artisan Message
          </button>
        </div>
      </div>

      <!-- Handcrafted Creation Journey (12 Days of Craft Timeline) -->
      <div style="background:#FFFFFF; border:1px solid var(--border-subtle); border-radius:var(--radius-lg); padding:16px; margin-bottom:14px;">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span style="font-size:0.92rem; font-weight:800; color:var(--text-primary);">Handcrafted Creation Journey</span>
          <span class="badge-amber" style="font-size:0.65rem;">12 Days of Craft</span>
        </div>

        <div class="timeline-step-list">
          
          <div class="timeline-item">
            <div class="timeline-step-number">1</div>
            <div class="timeline-content-card">
              <div class="timeline-title">Clay Sourcing</div>
              <div class="timeline-desc">Deep alluvium scooped from sacred Gomati-Ganges riverbeds, sieved five times through cotton muslin.</div>
            </div>
          </div>

          <div class="timeline-item">
            <div class="timeline-step-number">2</div>
            <div class="timeline-content-card">
              <div class="timeline-title">Wheel Shaping</div>
              <div class="timeline-desc">Thrown on heavy stone kick-wheel, shaped by thumb precision to ensure balanced water wall thickness.</div>
            </div>
          </div>

          <div class="timeline-item">
            <div class="timeline-step-number">3</div>
            <div class="timeline-content-card">
              <div class="timeline-title">Hand Etching (Jaali)</div>
              <div class="timeline-desc">Carved using hand-whittled bamboo chisels while clay is leather-hard to create breathing micro-pores.</div>
            </div>
          </div>

          <div class="timeline-item">
            <div class="timeline-step-number">4</div>
            <div class="timeline-content-card">
              <div class="timeline-title">Sun Drying</div>
              <div class="timeline-desc">Slow-cured under neem shade for 48 hours to prevent cracking in tropical ambient humidity.</div>
            </div>
          </div>

          <div class="timeline-item">
            <div class="timeline-step-number check">✓</div>
            <div class="timeline-content-card">
              <div class="timeline-title" style="color:var(--color-green);">Wood-Kiln Smoke Firing</div>
              <div class="timeline-desc">Fired in subterranean closed pits with wood husks at 900°C for earthy terracotta durability.</div>
            </div>
          </div>

        </div>
      </div>

      <!-- India Post Speed Post Delivery Card -->
      <div style="background:#FFFDF9; border:1px solid var(--border-subtle); border-radius:var(--radius-lg); padding:14px; margin-bottom:14px;">
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:6px;">
          <span style="font-size:1.1rem;">📦</span>
          <span style="font-size:0.85rem; font-weight:800; color:var(--text-primary);">India Post Speed Post Delivery</span>
        </div>
        <p style="font-size:0.74rem; color:var(--text-secondary); line-height:1.4; margin-bottom:10px;">
          Shipped directly from Varanasi artisan hub. Dispatches within 24 hours. Expected delivery in 3–5 business days across India.
        </p>

        <div style="background:#FEECE5; border-radius:var(--radius-sm); padding:8px 10px; font-size:0.72rem; color:#7A2E0E; display:flex; align-items:center; gap:8px;">
          <span>🌾</span>
          <div>
            <strong>Zero-Plastic Straw Cushioning:</strong>
            Packed with dry paddy straw &amp; corrugated shock-guard.
          </div>
        </div>
      </div>

    </div>

    <!-- Sticky Bottom Buy Bar -->
    <div class="sticky-buy-bar">
      <div class="sticky-price-left">
        <span style="font-size:0.65rem; color:var(--text-muted);">Total Price</span>
        <div class="sticky-price-amount">₹750</div>
        <span class="sticky-delivery-tag">Free Delivery</span>
      </div>

      <button type="button" class="header-btn" style="background:#FFF5EE; border:1px solid var(--color-terracotta-border); border-radius:8px; padding:10px 14px;" onclick="window.navigateToScreen('cart_review')">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-terracotta)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
      </button>

      <button type="button" class="btn-primary" style="flex:1; padding:12px 14px; font-size:0.85rem;" onclick="window.navigateToScreen('checkout')">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
        Buy Now (Direct Payout)
      </button>
    </div>
  `;

  // Handlers
  container.querySelector('#btn-oral-history').addEventListener('click', () => {
    AudioAssistance.speak(
      "My grandfather carved pitchers for the temple courtyard. This sacred Gomati riverbed clay cools water naturally without a drop of electricity.",
      "en-IN"
    );
  });

  const transcriptToggle = container.querySelector('#toggle-transcript');
  const transcriptDiv = container.querySelector('#oral-transcript');
  transcriptToggle.addEventListener('click', () => {
    isTranscriptOpen = !isTranscriptOpen;
    transcriptDiv.style.display = isTranscriptOpen ? 'block' : 'none';
  });
}
