/**
 * Screen: Craft Product Details
 * Pixel-perfect recreation of User Provided Reference Screenshot
 */

import { State } from '../state.js';
import { AudioAssistance } from '../speech.js';

export function renderProductDetailsScreen(container) {
  let isTranscriptOpen = false;
  let isDescriptionOpen = false;
  let isPlayingAudio = false;

  container.innerHTML = `
    <div class="product-details-screen animate-fade-in" style="padding: 10px 14px 90px; background: #FAF7F2; min-height: 100vh;">
      
      <!-- Top Origin Banner -->
      <div style="background:#FFF9F5; border:1px solid #EADBCE; border-radius:9999px; padding:6px 14px; margin-bottom:12px; display:flex; justify-content:space-between; align-items:center;">
        <span style="font-size:0.72rem; font-weight:800; color:#1C1917; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
          Authentic Origin: Gorakhpur ...
        </span>
        <span style="background:#FEE8E2; color:#B93815; font-size:0.58rem; font-weight:800; padding:2px 8px; border-radius:9999px; letter-spacing:0.04em; flex-shrink:0;">
          VERIFIED CRAFT
        </span>
      </div>

      <!-- Hero Image Gallery Container -->
      <div style="background:#FFFFFF; border:1px solid #ECE7E1; border-radius:14px; overflow:hidden; box-shadow:0 1px 4px rgba(0,0,0,0.03); margin-bottom:10px;">
        <div style="height:260px; position:relative; overflow:hidden; background:#ECE7E1;">
          <img src="/assets/terracotta_pitcher.jpg" alt="Hand-Etched Terracotta Pitcher" id="main-product-image" style="width:100%; height:100%; object-fit:cover;">
          
          <!-- Zoom Icon Button Top Right -->
          <button type="button" id="btn-zoom-image" style="position:absolute; top:12px; right:12px; width:32px; height:32px; border-radius:8px; background:rgba(255,255,255,0.92); border:1px solid rgba(0,0,0,0.08); display:flex; align-items:center; justify-content:center; cursor:pointer; color:#1C1917;" title="Zoom Details">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" x2="16.65" y1="21" y2="16.65"/>
              <line x1="11" x2="11" y1="8" y2="14"/>
              <line x1="8" x2="14" y1="11" y2="11"/>
            </svg>
          </button>

          <!-- Master Guild Seal Badge Bottom Left -->
          <div style="position:absolute; bottom:12px; left:12px; background:rgba(255,255,255,0.95); backdrop-filter:blur(4px); border:1px solid #EADBCE; border-radius:8px; padding:4px 8px; display:flex; align-items:center; gap:6px; box-shadow:0 2px 6px rgba(0,0,0,0.08);">
            <div style="width:20px; height:20px; border-radius:50%; background:#E7F7ED; display:flex; align-items:center; justify-content:center; color:#15803D;">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <div style="line-height:1.1;">
              <div style="font-size:0.6rem; font-weight:900; color:#17375E; letter-spacing:0.02em;">MASTER GUILD SEAL</div>
              <div style="font-size:0.52rem; color:#78716C;">Pehchan #UP-438-290</div>
            </div>
          </div>

          <!-- Capacity Badge Bottom Right -->
          <div style="position:absolute; bottom:12px; right:12px; background:rgba(28,25,23,0.8); backdrop-filter:blur(4px); color:#FFFFFF; font-size:0.62rem; font-weight:800; padding:4px 9px; border-radius:9999px; display:flex; align-items:center; gap:4px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
            </svg>
            <span>1.8 Litres</span>
          </div>
        </div>
      </div>

      <!-- 4 Thumbnails Strip -->
      <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:8px; margin-bottom:12px;">
        <div class="thumb-item active" style="height:62px; border-radius:8px; overflow:hidden; border:2px solid #7A2813; cursor:pointer;" onclick="window.selectThumb(0)">
          <img src="/assets/terracotta_pitcher.jpg" alt="Detail 1" style="width:100%; height:100%; object-fit:cover;">
        </div>
        <div class="thumb-item" style="height:62px; border-radius:8px; overflow:hidden; border:1px solid #ECE7E1; cursor:pointer;" onclick="window.selectThumb(1)">
          <img src="/assets/raw_pottery_snap.jpg" alt="Detail 2" style="width:100%; height:100%; object-fit:cover;">
        </div>
        <div class="thumb-item" style="height:62px; border-radius:8px; overflow:hidden; border:1px solid #ECE7E1; cursor:pointer;" onclick="window.selectThumb(2)">
          <img src="/assets/blue_pottery.jpg" alt="Detail 3" style="width:100%; height:100%; object-fit:cover;">
        </div>
        <div class="thumb-item" style="height:62px; border-radius:8px; overflow:hidden; border:1px solid #ECE7E1; cursor:pointer;" onclick="window.selectThumb(3)">
          <img src="/assets/handcrafted_diyas.jpg" alt="Detail 4" style="width:100%; height:100%; object-fit:cover;">
        </div>
      </div>

      <!-- 3 Craft Credibility Value Badges -->
      <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:8px; margin-bottom:14px;">
        <div style="background:#FFFFFF; border:1px solid #ECE7E1; border-radius:10px; padding:10px 4px; text-align:center; box-shadow:0 1px 3px rgba(0,0,0,0.02);">
          <div style="width:28px; height:28px; border-radius:50%; background:#FEECE5; color:#7A2813; display:flex; align-items:center; justify-content:center; margin:0 auto 4px; font-size:0.85rem;">
            ⚙️
          </div>
          <div style="font-size:0.65rem; font-weight:800; color:#1C1917; line-height:1.2;">
            Verified Master<br>Craft
          </div>
        </div>

        <div style="background:#FFFFFF; border:1px solid #ECE7E1; border-radius:10px; padding:10px 4px; text-align:center; box-shadow:0 1px 3px rgba(0,0,0,0.02);">
          <div style="width:28px; height:28px; border-radius:50%; background:#FEF3C7; color:#D97706; display:flex; align-items:center; justify-content:center; margin:0 auto 4px; font-size:0.85rem;">
            🏺
          </div>
          <div style="font-size:0.65rem; font-weight:800; color:#1C1917; line-height:1.2;">
            100% River Clay
          </div>
        </div>

        <div style="background:#FFFFFF; border:1px solid #ECE7E1; border-radius:10px; padding:10px 4px; text-align:center; box-shadow:0 1px 3px rgba(0,0,0,0.02);">
          <div style="width:28px; height:28px; border-radius:50%; background:#EFF6FF; color:#1E40AF; display:flex; align-items:center; justify-content:center; margin:0 auto 4px; font-size:0.85rem;">
            ⚒️
          </div>
          <div style="font-size:0.65rem; font-weight:800; color:#1C1917; line-height:1.2;">
            Master Potter
          </div>
        </div>
      </div>

      <!-- Title, Description & Pricing Card -->
      <div style="background:#FFFFFF; border:1px solid #ECE7E1; border-radius:14px; padding:14px; margin-bottom:12px; box-shadow:0 1px 4px rgba(0,0,0,0.03);">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:4px;">
          <div style="font-size:0.62rem; font-weight:800; color:#B45309; letter-spacing:0.04em; text-transform:uppercase;">
            TRADITIONAL NIZAMABAD CRAFT
          </div>
          <button type="button" style="width:32px; height:32px; border-radius:8px; background:#FAF7F2; border:1px solid #EADBCE; display:flex; align-items:center; justify-content:center; color:#7A2813; font-size:1.1rem; cursor:pointer;" onclick="window.showToast?.('Added to wishlist ♡')">
            ♡
          </button>
        </div>

        <h1 style="font-size:1.22rem; font-weight:900; color:#7A2813; line-height:1.2; margin:0 0 6px 0;">
          Hand-Etched<br>Terracotta Pitcher
        </h1>

        <p style="font-size:0.72rem; color:#57534E; line-height:1.4; margin:0 0 12px 0;">
          Natural evaporative cooler for drinking water with natural alkaline balancing minerals.
        </p>

        <!-- Price Row -->
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:12px;">
          <span style="font-size:1.45rem; font-weight:900; color:#7A2813; line-height:1;">
            ₹750
          </span>
          <span style="font-size:0.82rem; text-decoration:line-through; color:#A8A29E;">
            ₹950
          </span>
          <span style="background:#FEE8E2; color:#B93815; font-size:0.62rem; font-weight:800; padding:2px 7px; border-radius:9999px;">
            21% OFF
          </span>
          <span style="font-size:0.68rem; font-weight:700; color:#15803D; margin-left:auto; display:flex; align-items:center; gap:3px;">
            <span style="font-size:0.6rem;">•</span> 8 Ready to Ship
          </span>
        </div>

        <!-- 100% Direct Artisan Payout Box -->
        <div style="background:#FFF9F5; border:1px solid #F5E5D8; border-radius:8px; padding:10px 12px; display:flex; gap:10px; align-items:flex-start;">
          <div style="width:24px; height:24px; border-radius:6px; background:#FDEEE5; display:flex; align-items:center; justify-content:center; color:#7A2813; font-size:0.85rem; flex-shrink:0;">
            🪙
          </div>
          <div style="font-size:0.7rem; color:#57534E; line-height:1.4;">
            <strong style="color:#1C1917; display:block; margin-bottom:2px;">100% Direct Artisan Payout</strong>
            Full <strong>₹750</strong> credits directly to Master Potter Ramdev Kumhar's verified Jan Dhan bank account. <strong style="color:#7A2813;">₹0 platform commission</strong> deducted.
          </div>
        </div>
      </div>

      <!-- Made to Order Commission Card -->
      <div style="background:#FFFFFF; border:1px solid #ECE7E1; border-radius:14px; padding:14px; margin-bottom:12px; box-shadow:0 1px 4px rgba(0,0,0,0.03);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
          <div style="display:flex; align-items:center; gap:6px;">
            <div style="width:20px; height:20px; border-radius:50%; background:#FEECE5; color:#7A2813; display:flex; align-items:center; justify-content:center; font-size:0.75rem;">
              🏵️
            </div>
            <span style="font-size:0.68rem; font-weight:900; color:#7A2813; letter-spacing:0.04em;">
              MADE TO ORDER COMMISSION
            </span>
          </div>
          <span style="font-size:0.62rem; color:#78716C; background:#FAF7F2; border:1px solid #EADBCE; border-radius:9999px; padding:2px 8px; font-weight:700;">
            within 2 weeks
          </span>
        </div>

        <div style="display:flex; flex-direction:column; gap:6px; margin-bottom:12px;">
          <div style="display:inline-flex; align-items:center; gap:5px; background:#FAF5EF; border:1px solid #EADBCE; border-radius:9999px; padding:4px 10px; font-size:0.68rem; color:#57534E; width:fit-content;">
            <span>✏️</span>
            <span>Custom Monogram / Name Engraving</span>
          </div>

          <div style="display:inline-flex; align-items:center; gap:5px; background:#FAF5EF; border:1px solid #EADBCE; border-radius:9999px; padding:4px 10px; font-size:0.68rem; color:#57534E; width:fit-content;">
            <span>🍶</span>
            <span>Specific Volume (1L - 5L)</span>
          </div>

          <div style="display:inline-flex; align-items:center; gap:5px; background:#FAF5EF; border:1px solid #EADBCE; border-radius:9999px; padding:4px 10px; font-size:0.68rem; color:#57534E; width:fit-content;">
            <span>🌸</span>
            <span>Custom Motif / Floral Design</span>
          </div>
        </div>

        <button type="button" id="btn-request-custom" style="width:100%; background:#FAF5EF; border:1px solid #D6C7B2; border-radius:8px; padding:10px; font-size:0.78rem; font-weight:800; color:#7A2813; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:6px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 20h9"/>
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
          </svg>
          <span>Request Custom Order</span>
        </button>
      </div>

      <!-- Artisan's Oral History Section -->
      <div style="background:#FFFFFF; border:1px solid #ECE7E1; border-radius:14px; padding:14px; margin-bottom:12px; box-shadow:0 1px 4px rgba(0,0,0,0.03);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
          <div style="display:flex; align-items:center; gap:8px;">
            <div style="width:26px; height:26px; border-radius:50%; background:#D97706; color:#FFFFFF; display:flex; align-items:center; justify-content:center; font-size:0.8rem;">
              🎙️
            </div>
            <div>
              <div style="font-size:0.82rem; font-weight:900; color:#1C1917;">Artisan's Oral History</div>
              <div style="font-size:0.64rem; color:#78716C;">Spoken in English • 30 Seconds</div>
            </div>
          </div>
          <span style="font-size:0.68rem; font-family:monospace; color:#78716C;">00:00 / 00:30</span>
        </div>

        <!-- Audio Player Bar -->
        <div style="background:#FAF5EE; border-radius:10px; padding:8px 12px; display:flex; align-items:center; gap:12px; margin-bottom:10px;">
          <button type="button" id="btn-play-oral" style="width:34px; height:34px; border-radius:50%; background:#7A2813; color:#FFFFFF; border:none; display:flex; align-items:center; justify-content:center; cursor:pointer; flex-shrink:0;">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
          </button>
          
          <!-- Sound wave bars -->
          <div style="flex:1; display:flex; align-items:center; gap:3px; height:22px;">
            <span style="width:3px; height:45%; background:#B45309; border-radius:2px;"></span>
            <span style="width:3px; height:80%; background:#B45309; border-radius:2px;"></span>
            <span style="width:3px; height:60%; background:#B45309; border-radius:2px;"></span>
            <span style="width:3px; height:100%; background:#B45309; border-radius:2px;"></span>
            <span style="width:3px; height:35%; background:#D6C7B2; border-radius:2px;"></span>
            <span style="width:3px; height:70%; background:#D6C7B2; border-radius:2px;"></span>
            <span style="width:3px; height:90%; background:#D6C7B2; border-radius:2px;"></span>
            <span style="width:3px; height:50%; background:#D6C7B2; border-radius:2px;"></span>
            <span style="width:3px; height:75%; background:#D6C7B2; border-radius:2px;"></span>
            <span style="width:3px; height:40%; background:#D6C7B2; border-radius:2px;"></span>
            <span style="width:3px; height:60%; background:#D6C7B2; border-radius:2px;"></span>
            <span style="width:3px; height:30%; background:#D6C7B2; border-radius:2px;"></span>
            <span style="width:3px; height:85%; background:#D6C7B2; border-radius:2px;"></span>
            <span style="width:3px; height:55%; background:#D6C7B2; border-radius:2px;"></span>
            <span style="width:3px; height:35%; background:#D6C7B2; border-radius:2px;"></span>
          </div>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.72rem; color:#7A2813; font-weight:800; cursor:pointer;" id="toggle-oral-transcript">
          <span style="display:inline-flex; align-items:center; gap:4px;">
            <span>📖 Read Audio Transcript</span>
          </span>
          <span id="transcript-arrow">∨</span>
        </div>

        <div id="transcript-body" style="display:none; font-size:0.72rem; color:#57534E; line-height:1.45; padding-top:8px; margin-top:8px; border-top:1px dashed #E5DCD3;">
          "Namaste. I am Ramdev Kumhar. For five generations, our family in Chunar has molded clay from the sacred riverbeds. Each pitcher is porous-fired so it breathes and chills water naturally without power."
        </div>
      </div>

      <!-- Master Artisan Profile Card -->
      <div style="background:#FFFFFF; border:1px solid #ECE7E1; border-radius:14px; padding:14px; margin-bottom:12px; box-shadow:0 1px 4px rgba(0,0,0,0.03);">
        <div style="display:flex; gap:10px; align-items:flex-start; margin-bottom:10px;">
          <div style="width:58px; height:58px; border-radius:8px; overflow:hidden; position:relative; flex-shrink:0;">
            <img src="/assets/artisan_ramulu.jpg" alt="Ramdev Kumhar" style="width:100%; height:100%; object-fit:cover;">
            <span style="position:absolute; bottom:2px; left:50%; transform:translateX(-50%); background:#0F172A; color:#FFFFFF; font-size:0.5rem; font-weight:800; padding:1px 5px; border-radius:3px; white-space:nowrap;">
              GUILD
            </span>
          </div>

          <div style="flex:1;">
            <div style="font-size:0.95rem; font-weight:900; color:#1C1917; display:flex; align-items:center; gap:4px; margin-bottom:2px;">
              <span>Ramdev Kumhar</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="#15803D">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>

            <div style="font-size:0.68rem; color:#78716C; margin-bottom:3px;">
              Varanasi Clay Guild • 35 Yr Heritage
            </div>

            <div style="font-size:0.66rem; font-weight:800; color:#D97706; display:flex; align-items:center; gap:4px;">
              <span>⭐ 98/100</span>
              <span style="color:#78716C; font-weight:600;">Trust Index</span>
            </div>
          </div>
        </div>

        <!-- 3-Metrics Box -->
        <div style="background:#FAF7F2; border-radius:8px; padding:10px 4px; display:grid; grid-template-columns:repeat(3, 1fr); text-align:center; gap:4px; margin-bottom:10px;">
          <div>
            <div style="font-size:0.75rem; font-weight:900; color:#1C1917;">Verified Master Craft</div>
            <div style="font-size:0.58rem; color:#78716C;">Verified Master Craft</div>
          </div>
          <div>
            <div style="font-size:0.88rem; font-weight:900; color:#1C1917;">1,420+</div>
            <div style="font-size:0.58rem; color:#78716C;">Pots Fired</div>
          </div>
          <div>
            <div style="font-size:0.88rem; font-weight:900; color:#15803D;">0 km</div>
            <div style="font-size:0.58rem; color:#78716C;">Direct Channel</div>
          </div>
        </div>

        <!-- 2 Action Buttons -->
        <div style="display:flex; gap:8px;">
          <button type="button" style="flex:1; background:#FAF5EF; border:1px solid #E5DCD3; border-radius:6px; padding:8px; font-size:0.74rem; font-weight:800; color:#1C1917; cursor:pointer;" onclick="window.showToast?.('Visiting Ramdev Kumhar Studio...')">
            🏛️ Visit Studio
          </button>
          <button type="button" style="flex:1; background:#172E47; border:none; border-radius:6px; padding:8px; font-size:0.74rem; font-weight:800; color:#FFFFFF; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:4px;" onclick="window.showToast?.('Opening Guild direct message with Master Ramdev...')">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            <span>Artisan Message</span>
          </button>
        </div>
      </div>

      <!-- See Description (Accordion Card) -->
      <div style="background:#FFFFFF; border:1px solid #ECE7E1; border-radius:14px; padding:12px 14px; margin-bottom:12px; box-shadow:0 1px 4px rgba(0,0,0,0.03);">
        <div style="display:flex; justify-content:space-between; align-items:center; cursor:pointer;" id="toggle-description">
          <div style="display:flex; align-items:center; gap:10px;">
            <div style="width:28px; height:28px; border-radius:50%; background:#FEECE5; color:#7A2813; display:flex; align-items:center; justify-content:center; font-size:0.85rem;">
              📖
            </div>
            <div>
              <div style="display:flex; align-items:center; gap:6px;">
                <span style="font-size:0.85rem; font-weight:900; color:#1C1917;">See Description</span>
                <span style="background:#FEE8E2; color:#B93815; font-size:0.58rem; font-weight:800; padding:1px 6px; border-radius:9999px;">
                  12 Days of Craft
                </span>
              </div>
              <div style="font-size:0.65rem; color:#78716C;">
                Handcrafted Creation Journey &amp; earthen specifications
              </div>
            </div>
          </div>

          <div style="width:26px; height:26px; border-radius:6px; background:#FAF5EE; display:flex; align-items:center; justify-content:center; color:#7A2813; font-weight:900; font-size:0.85rem;">
            ∨
          </div>
        </div>

        <div id="description-body" style="display:none; padding-top:12px; margin-top:10px; border-top:1px dashed #E5DCD3;">
          <div style="font-size:0.75rem; font-weight:800; color:#7A2813; margin-bottom:8px;">Handcrafted Creation Journey</div>
          <div style="display:flex; flex-direction:column; gap:8px; font-size:0.7rem; color:#57534E;">
            <div><strong>1. Silt Clay Sourcing:</strong> Harvested from pristine Gomati riverbed alluvium.</div>
            <div><strong>2. Hand-Turning on Wheel:</strong> Balanced wall thickness on traditional wooden wheel.</div>
            <div><strong>3. Jaali Perforation:</strong> Hand-carved breathing pores while leather-hard.</div>
            <div><strong>4. Neem Shade Curing:</strong> Slow drying for 48 hours without cracking.</div>
            <div><strong>5. Pit Husk Firing:</strong> Fired at 900°C for durable terracotta structure.</div>
          </div>
        </div>
      </div>

      <!-- Fast Delivery Notice Card -->
      <div style="background:#FFFFFF; border:1px solid #ECE7E1; border-radius:14px; padding:12px 14px; margin-bottom:14px; box-shadow:0 1px 4px rgba(0,0,0,0.03);">
        <div style="display:flex; align-items:center; gap:6px; margin-bottom:4px;">
          <span style="font-size:1rem; color:#DC2626;">🚚</span>
          <span style="font-size:0.82rem; font-weight:900; color:#1C1917;">Fast Delivery</span>
        </div>
        <p style="font-size:0.7rem; color:#57534E; line-height:1.4; margin:0;">
          Shipped directly from Varanasi artisan hub. Dispatches within 24 hours. Expected delivery within 10 days
        </p>
      </div>

    </div>

    <!-- Sticky Bottom Action Bar -->
    <div style="position:fixed; bottom:0; left:50%; transform:translateX(-50%); width:100%; max-width:430px; background:#FFFFFF; border-top:1px solid #ECE7E1; padding:10px 14px; display:flex; align-items:center; gap:8px; z-index:100; box-shadow:0 -2px 10px rgba(0,0,0,0.06);">
      <div style="display:flex; flex-direction:column; line-height:1; min-width:65px;">
        <span style="font-size:0.58rem; color:#78716C; text-transform:uppercase; font-weight:700; margin-bottom:2px;">Total Price</span>
        <span style="font-size:1.25rem; font-weight:900; color:#7A2813;">₹750</span>
      </div>

      <!-- Cart Button -->
      <button type="button" id="btn-sticky-cart" style="width:42px; height:42px; border-radius:8px; background:#F2ECE4; border:1px solid #E5DCD3; display:flex; align-items:center; justify-content:center; color:#1C1917; cursor:pointer;" title="Add to Cart">
        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
          <path d="M3 6h18"/>
          <path d="M16 10a4 4 0 0 1-8 0"/>
        </svg>
      </button>

      <!-- Customization Button -->
      <button type="button" id="btn-sticky-custom" style="height:42px; padding:0 10px; border-radius:8px; background:#FFFFFF; border:1px solid #D6C7B2; color:#7A2813; font-size:0.75rem; font-weight:800; display:flex; align-items:center; gap:4px; cursor:pointer;">
        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 20h9"/>
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
        </svg>
        <span>Custo...</span>
      </button>

      <!-- Buy Now Button -->
      <button type="button" id="btn-sticky-buy-now" style="flex:1; height:42px; border-radius:8px; background:#7A2813; border:none; color:#FFFFFF; font-size:0.85rem; font-weight:800; display:flex; align-items:center; justify-content:center; gap:6px; cursor:pointer;">
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
          <rect width="20" height="14" x="2" y="5" rx="2"/>
          <line x1="2" x2="22" y1="10" y2="10"/>
        </svg>
        <span>Buy Now</span>
      </button>
    </div>
  `;

  // Attach Event Handlers
  container.querySelector('#btn-play-oral')?.addEventListener('click', () => {
    isPlayingAudio = !isPlayingAudio;
    if (isPlayingAudio) {
      AudioAssistance.speak(
        "Namaste. I am Ramdev Kumhar. For five generations, our family in Chunar has molded clay from the sacred riverbeds. Each pitcher is porous-fired so it breathes and chills water naturally without power.",
        "en-IN"
      );
      window.showToast?.("Playing Master Ramdev Kumhar's Oral Story 🎙️");
    } else {
      AudioAssistance.stop();
    }
  });

  container.querySelector('#toggle-oral-transcript')?.addEventListener('click', () => {
    isTranscriptOpen = !isTranscriptOpen;
    const body = container.querySelector('#transcript-body');
    const arrow = container.querySelector('#transcript-arrow');
    if (body) body.style.display = isTranscriptOpen ? 'block' : 'none';
    if (arrow) arrow.textContent = isTranscriptOpen ? '∧' : '∨';
  });

  container.querySelector('#toggle-description')?.addEventListener('click', () => {
    isDescriptionOpen = !isDescriptionOpen;
    const body = container.querySelector('#description-body');
    if (body) body.style.display = isDescriptionOpen ? 'block' : 'none';
  });

  container.querySelector('#btn-request-custom')?.addEventListener('click', () => {
    window.showToast?.("Custom Order request drafted! Master Ramdev Kumhar will review within 24h.");
  });

  container.querySelector('#btn-sticky-custom')?.addEventListener('click', () => {
    window.showToast?.("Select custom volume (1L-5L) or monogram engraving.");
  });

  container.querySelector('#btn-sticky-cart')?.addEventListener('click', () => {
    State.addToCart({
      id: 'craft-terracotta-pitcher',
      title: 'Hand-Etched Terracotta Pitcher',
      artisan: 'Ramdev Kumhar',
      origin: 'Gorakhpur & Varanasi Terracotta Cluster',
      price: 750,
      image: '/assets/terracotta_pitcher.jpg'
    });
    window.showToast?.("Hand-Etched Terracotta Pitcher added to Cart! 👜");
  });

  container.querySelector('#btn-sticky-buy-now')?.addEventListener('click', () => {
    State.addToCart({
      id: 'craft-terracotta-pitcher',
      title: 'Hand-Etched Terracotta Pitcher',
      artisan: 'Ramdev Kumhar',
      origin: 'Gorakhpur & Varanasi Terracotta Cluster',
      price: 750,
      image: '/assets/terracotta_pitcher.jpg'
    });
    State.setScreen('cart_review');
  });

  container.querySelector('#btn-zoom-image')?.addEventListener('click', () => {
    window.showToast?.("Showing 4K macro view of breathing jaali clay pores.");
  });

  window.selectThumb = function(index) {
    const mainImg = container.querySelector('#main-product-image');
    const thumbs = container.querySelectorAll('.thumb-item');
    thumbs.forEach((t, i) => {
      t.style.border = (i === index) ? '2px solid #7A2813' : '1px solid #ECE7E1';
    });
    const images = [
      '/assets/terracotta_pitcher.jpg',
      '/assets/raw_pottery_snap.jpg',
      '/assets/blue_pottery.jpg',
      '/assets/handcrafted_diyas.jpg'
    ];
    if (mainImg) mainImg.src = images[index] || images[0];
  };
}
