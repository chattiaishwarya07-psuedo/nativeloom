/**
 * Screen 2: Explore Market (Buyer Home Feed)
 * Exact recreation of User Provided Reference Screenshot (Screen 2)
 */

import { State } from '../state.js';
import { AudioAssistance } from '../speech.js';

export function renderExploreScreen(container) {
  container.innerHTML = `
    <div class="market-screen animate-fade-in" style="padding-bottom: 74px;">
      
      <!-- Top Search & Utility Bar -->
      <div style="display:flex; align-items:center; gap:8px; margin: 10px 0 12px;">
        <div style="flex:1; display:flex; align-items:center; background:#FFFFFF; border:1px solid var(--border-subtle); border-radius:var(--radius-pill); padding:8px 12px; gap:8px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input type="text" placeholder="Search craft, cluster, maker..." style="flex:1; border:none; outline:none; font-size:0.8rem; background:transparent;">
          <button type="button" style="background:none; border:none; cursor:pointer; color:var(--text-secondary); padding:0;" onclick="window.showToast('Voice Search listening in Hindi & English...')">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
          </button>
        </div>

        <button type="button" class="header-btn" style="background:#FFFFFF; border:1px solid var(--border-subtle); border-radius:50%; width:36px; height:36px; padding:0;" onclick="window.showToast('Craft Wishlist saved.')">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
        </button>

        <button type="button" class="header-btn" style="position:relative; background:#FFFFFF; border:1px solid var(--border-subtle); border-radius:50%; width:36px; height:36px; padding:0;" onclick="window.navigateToScreen('cart_review')">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          <span style="position:absolute; top:-2px; right:-2px; background:var(--color-terracotta); color:#fff; border-radius:50%; width:16px; height:16px; font-size:0.65rem; font-weight:800; display:flex; align-items:center; justify-content:center;">3</span>
        </button>
      </div>

      <!-- Listen & Explore Audio Bar -->
      <div style="background:#FFFDF8; border:1px solid var(--border-subtle); border-radius:var(--radius-md); padding:10px 12px; display:flex; align-items:center; gap:10px; margin-bottom:14px; box-shadow:var(--shadow-sm);">
        <button type="button" id="btn-listen-explore" style="width:34px; height:34px; border-radius:8px; background:var(--color-terracotta); color:#fff; display:flex; align-items:center; justify-content:center; border:none; cursor:pointer; flex-shrink:0;">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        </button>
        <div style="flex:1;">
          <div style="font-size:0.68rem; font-weight:800; color:var(--color-terracotta); letter-spacing:0.04em;">✦ LISTEN &amp; EXPLORE</div>
          <div style="font-size:0.75rem; color:var(--text-primary); font-weight:600;">Spoken guide to today's handloom and clay crafts...</div>
        </div>
        <div style="display:flex; align-items:flex-end; gap:2px; height:18px;">
          <span style="width:3px; height:60%; background:var(--color-terracotta); border-radius:1px;"></span>
          <span style="width:3px; height:100%; background:var(--color-terracotta); border-radius:1px;"></span>
          <span style="width:3px; height:40%; background:var(--color-terracotta); border-radius:1px;"></span>
          <span style="width:3px; height:80%; background:var(--color-terracotta); border-radius:1px;"></span>
        </div>
      </div>

      <!-- Hero Banner: Festive Clay & Terracotta Wonders -->
      <div class="explore-hero-banner">
        <div class="hero-tag">FEATURED CLUSTER • Molela • Rajasthan</div>
        <h1 class="hero-title">Festive Clay &amp; Terracotta Wonders</h1>
        <p class="hero-sub">Hand-fired sacred urns, wind bells, and lamps directly from master potter Ramdev Kumhar's...</p>
        <button type="button" class="btn-hero-explore" onclick="window.navigateToScreen('product_details')">
          Explore Direct from Potters →
        </button>
      </div>

      <!-- Section: Four Sacred Guilds -->
      <div class="section-label-row">
        <div>
          <span class="section-label" style="font-size:0.92rem;">Four Sacred Guilds</span>
          <div style="font-size:0.68rem; color:var(--text-muted);">Authentic hand skills across India</div>
        </div>
        <a href="javascript:void(0)" style="font-size:0.72rem; color:var(--color-terracotta); font-weight:700; text-decoration:none;">View All ›</a>
      </div>

      <!-- 4 Guilds Quad Grid -->
      <div class="guilds-quad-grid">
        <div class="guild-card-thumb" onclick="window.navigateToScreen('product_details')">
          <div class="guild-img-wrap">
            <img src="/assets/raw_pottery_snap.jpg" alt="Pottery & Clay">
            <div class="guild-corner-badge">🏺</div>
          </div>
          <div class="guild-info-wrap">
            <div class="guild-title">Pottery &amp; Clay</div>
            <div class="guild-craft-count">2,140 Verified Crafts</div>
          </div>
        </div>

        <div class="guild-card-thumb" onclick="window.navigateToScreen('artisans')">
          <div class="guild-img-wrap">
            <img src="/assets/ikat_saree.jpg" alt="Handloom Weaves">
            <div class="guild-corner-badge">🧵</div>
          </div>
          <div class="guild-info-wrap">
            <div class="guild-title">Handloom Weaves</div>
            <div class="guild-craft-count">4,890 Spun Pieces</div>
          </div>
        </div>

        <div class="guild-card-thumb" onclick="window.navigateToScreen('product_details')">
          <div class="guild-img-wrap">
            <img src="/assets/woodcraft_bowl.jpg" alt="Wood & Inlay">
            <div class="guild-corner-badge">🪵</div>
          </div>
          <div class="guild-info-wrap">
            <div class="guild-title">Wood &amp; Inlay</div>
            <div class="guild-craft-count">1,320 Carved Artifacts</div>
          </div>
        </div>

        <div class="guild-card-thumb" onclick="window.navigateToScreen('product_details')">
          <div class="guild-img-wrap">
            <img src="/assets/dhokra_brass.jpg" alt="Brass & Metal">
            <div class="guild-corner-badge">🪔</div>
          </div>
          <div class="guild-info-wrap">
            <div class="guild-title">Brass &amp; Metal</div>
            <div class="guild-craft-count">980 Forged Heirlooms</div>
          </div>
        </div>
      </div>

      <!-- Section: Featured Master Artisans -->
      <div class="section-label-row">
        <div>
          <span class="section-label" style="font-size:0.92rem; display:flex; align-items:center; gap:6px;">
            🎖️ Featured Master Artisans
          </span>
          <div style="font-size:0.68rem; color:var(--text-muted);">Pehchan Card Certified Master Craftspeople</div>
        </div>
      </div>

      <!-- Artisans Scroll Cards -->
      <div style="display:flex; gap:12px; overflow-x:auto; padding-bottom:8px; margin-bottom:18px;">
        
        <!-- Ramdev Kumhar -->
        <div style="min-width:240px; background:#FFFFFF; border:1px solid var(--border-subtle); border-radius:var(--radius-lg); padding:12px; box-shadow:var(--shadow-sm);">
          <div style="position:relative; height:120px; border-radius:8px; overflow:hidden; margin-bottom:8px;">
            <img src="/assets/artisan_ramulu.jpg" alt="Ramdev Kumhar" style="width:100%; height:100%; object-fit:cover;">
            <span class="badge-green" style="position:absolute; bottom:6px; left:6px; font-size:0.62rem;">
              ✓ Pehchan Verified
            </span>
          </div>
          <div style="font-size:0.92rem; font-weight:800; color:var(--text-primary);">Ramdev Kumhar</div>
          <div style="font-size:0.72rem; color:var(--text-secondary); margin-bottom:4px;">35 yrs Mastery • Terracotta Murals</div>
          <div style="font-size:0.68rem; color:var(--text-muted); margin-bottom:10px;">Molela, Rajsamand Cluster</div>
          <div style="display:flex; gap:6px;">
            <button type="button" class="btn-secondary" style="flex:1; padding:6px; font-size:0.72rem;" onclick="window.AudioAssistance.speak('रामदेव कुम्हार, मोलेला राजस्थान के राष्ट्रीय स्तर के मिट्टी शिल्पकार हैं।')">
              🔊 His Story
            </button>
            <button type="button" class="btn-secondary" style="padding:6px 10px;" onclick="window.showToast('Opening Direct Guild Message...')">
              💬
            </button>
          </div>
        </div>

        <!-- Shabana Begum -->
        <div style="min-width:240px; background:#FFFFFF; border:1px solid var(--border-subtle); border-radius:var(--radius-lg); padding:12px; box-shadow:var(--shadow-sm);">
          <div style="position:relative; height:120px; border-radius:8px; overflow:hidden; margin-bottom:8px;">
            <img src="/assets/artisan_sunita.jpg" alt="Shabana Begum" style="width:100%; height:100%; object-fit:cover;">
            <span class="badge-green" style="position:absolute; bottom:6px; left:6px; font-size:0.62rem;">
              ✓ Pehchan Verified
            </span>
          </div>
          <div style="font-size:0.92rem; font-weight:800; color:var(--text-primary);">Shabana Begum</div>
          <div style="font-size:0.72rem; color:var(--text-secondary); margin-bottom:4px;">National Awardee • Chanderi Silk</div>
          <div style="font-size:0.68rem; color:var(--text-muted); margin-bottom:10px;">Pranpur Weavers Guild</div>
          <div style="display:flex; gap:6px;">
            <button type="button" class="btn-secondary" style="flex:1; padding:6px; font-size:0.72rem;" onclick="window.AudioAssistance.speak('शबाना बेगम प्राणपुर की चंदेरी बुनाई की उस्ताद कारीगर हैं।')">
              🔊 Her Story
            </button>
            <button type="button" class="btn-secondary" style="padding:6px 10px;" onclick="window.showToast('Opening Direct Guild Message...')">
              💬
            </button>
          </div>
        </div>

      </div>

      <!-- Section: Artisans Near You (Discovery Radar) -->
      <div class="section-label-row">
        <div>
          <span class="section-label" style="font-size:0.92rem; display:flex; align-items:center; gap:6px;">
            📍 DISCOVERY RADAR • Artisans Near You
          </span>
        </div>
        <div style="font-size:0.72rem; color:var(--text-secondary); font-weight:700; background:#FFFDF8; border:1px solid var(--border-subtle); border-radius:var(--radius-pill); padding:2px 8px;">
          📍 Varanasi • 15 km ▾
        </div>
      </div>

      <!-- Near You List -->
      <div class="near-you-list">
        
        <!-- Item 1: Zari Weave Silk -->
        <div class="near-you-card">
          <img src="/assets/ikat_saree.jpg" alt="Zari Weave" class="near-you-img">
          <div class="near-you-details">
            <div class="near-you-top">
              <span>● Loom Ready</span>
              <span>• 6 km away</span>
            </div>
            <div class="near-you-title">Zari Weave Katan Silk Dupatta</div>
            <div class="near-you-artisan">Master Tariq Ansari • Varanasi Silk</div>
            <div class="near-you-price-row">
              <div>
                <span style="font-size:0.92rem; font-weight:900; color:var(--text-primary);">₹3,450</span>
                <span style="font-size:0.72rem; text-decoration:line-through; color:var(--text-muted); margin-left:4px;">₹5,200</span>
              </div>
              <button type="button" class="btn-order-now" onclick="window.navigateToScreen('product_details')">
                Order Now
              </button>
            </div>
          </div>
        </div>

        <!-- Item 2: Nizamabad Black Pottery -->
        <div class="near-you-card">
          <img src="/assets/raw_pottery_snap.jpg" alt="Nizamabad Pitcher" class="near-you-img">
          <div class="near-you-details">
            <div class="near-you-top">
              <span>● Workshop Pickup</span>
              <span>• 12 km</span>
            </div>
            <div class="near-you-title">Nizamabad Black Pottery Pitcher</div>
            <div class="near-you-artisan">Suresh Prajapati • Azamgarh Cluster</div>
            <div class="near-you-price-row">
              <div>
                <span style="font-size:0.92rem; font-weight:900; color:var(--text-primary);">₹1,890</span>
                <span style="font-size:0.72rem; text-decoration:line-through; color:var(--text-muted); margin-left:4px;">₹2,500</span>
              </div>
              <button type="button" class="btn-order-now" onclick="window.navigateToScreen('product_details')">
                Order Now
              </button>
            </div>
          </div>
        </div>

        <!-- Item 3: Lacquered Wood Toy -->
        <div class="near-you-card">
          <img src="/assets/woodcraft_bowl.jpg" alt="Lacquered Wood Toy" class="near-you-img">
          <div class="near-you-details">
            <div class="near-you-top" style="color:#D97706;">
              <span>● Crafting on Lathe</span>
              <span>• 15 km</span>
            </div>
            <div class="near-you-title">Lacquered Wood Toy Chariot</div>
            <div class="near-you-artisan">Rameshwar Lal • Varanasi Woodcraft</div>
            <div class="near-you-price-row">
              <div>
                <span style="font-size:0.92rem; font-weight:900; color:var(--text-primary);">₹780</span>
                <span style="font-size:0.72rem; text-decoration:line-through; color:var(--text-muted); margin-left:4px;">₹1,100</span>
              </div>
              <button type="button" class="btn-order-now" onclick="window.navigateToScreen('cart_review')">
                Order Now
              </button>
            </div>
          </div>
        </div>

      </div>

      <!-- Karigra Hastshilp Pratigya Green Guarantee Box -->
      <div style="background:#174332; color:#FFFFFF; border-radius:var(--radius-lg); padding:16px; margin-bottom:14px;">
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:12px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4ADE80" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          <div>
            <div style="font-size:0.9rem; font-weight:800;">Karigra Hastshilp Pratigya</div>
            <div style="font-size:0.68rem; opacity:0.85;">Subcontinental Craft Guarantee</div>
          </div>
        </div>

        <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:8px; text-align:center;">
          <div style="background:#0E2E21; border-radius:8px; padding:10px 4px;">
            <div style="font-size:1.1rem; margin-bottom:2px;">💵</div>
            <div style="font-size:0.7rem; font-weight:800;">100% Direct Payout</div>
            <div style="font-size:0.62rem; opacity:0.8;">To artisan bank</div>
          </div>
          <div style="background:#0E2E21; border-radius:8px; padding:10px 4px;">
            <div style="font-size:1.1rem; margin-bottom:2px;">🪪</div>
            <div style="font-size:0.7rem; font-weight:800;">Govt Pehchan</div>
            <div style="font-size:0.62rem; opacity:0.8;">Verified identity</div>
          </div>
          <div style="background:#0E2E21; border-radius:8px; padding:10px 4px;">
            <div style="font-size:1.1rem; margin-bottom:2px;">🛡️</div>
            <div style="font-size:0.7rem; font-weight:800;">Zero Middleman</div>
            <div style="font-size:0.62rem; opacity:0.8;">Pure craft lineage</div>
          </div>
        </div>
      </div>

    </div>
  `;

  // Attach Audio handler
  container.querySelector('#btn-listen-explore').addEventListener('click', () => {
    AudioAssistance.speak(
      "नमस्ते। आज के खास मिट्टी और हथकरघा शिल्प संग्रह में मोलेला राजस्थान और बनारस के मास्टर शिल्पकारों की अनूठी कृतियां उपलब्ध हैं।",
      "hi-IN"
    );
  });
}
