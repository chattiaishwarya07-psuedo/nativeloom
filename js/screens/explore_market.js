/**
 * Screen: Explore Market (Buyer / Patron Market Feed)
 * Pixel-perfect recreation of User Provided Reference Screenshot
 */

import { State } from '../state.js';
import { AudioAssistance } from '../speech.js';

export function renderExploreScreen(container) {
  container.innerHTML = `
    <div class="market-screen animate-fade-in" style="padding: 10px 14px 84px; background: #FAF7F2; min-height: 100vh;">
      
      <!-- Top Search & Filter Bar -->
      <div style="display:flex; align-items:center; gap:8px; margin-bottom:14px;">
        <div style="flex:1; display:flex; align-items:center; background:#FFFFFF; border:1px solid #E5DCD3; border-radius:9999px; height:42px; padding:0 12px; gap:8px; box-shadow:0 1px 3px rgba(0,0,0,0.03);">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8C7F77" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.3-4.3"/>
          </svg>
          <input type="text" id="input-market-search" placeholder="Search by craft, GI tag, or artisa..." style="flex:1; border:none; outline:none; font-size:0.8rem; background:transparent; color:#1F2937;">
          <button type="button" id="btn-voice-search" style="background:#F4ECE4; border:none; border-radius:50%; width:26px; height:26px; display:flex; align-items:center; justify-content:center; cursor:pointer; color:#7A2813; padding:0;" title="Voice Search">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
              <line x1="12" x2="12" y1="19" y2="22"/>
            </svg>
          </button>
        </div>

        <button type="button" id="btn-filter-settings" style="width:42px; height:42px; background:#7A2813; border:none; border-radius:8px; display:flex; align-items:center; justify-content:center; color:#FFFFFF; cursor:pointer; flex-shrink:0; box-shadow:0 2px 6px rgba(122, 40, 19, 0.2);" title="Filter Crafts">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="4" x2="20" y1="21" y2="21"/>
            <line x1="4" x2="20" y1="14" y2="14"/>
            <line x1="4" x2="20" y1="7" y2="7"/>
            <circle cx="8" cy="7" r="2" fill="currentColor"/>
            <circle cx="16" cy="14" r="2" fill="currentColor"/>
            <circle cx="10" cy="21" r="2" fill="currentColor"/>
          </svg>
        </button>
      </div>

      <!-- Hero Banner: Special Offers & Heritage Sale -->
      <div style="background:#702213; border-radius:14px; padding:14px 14px 12px; color:#FFFFFF; margin-bottom:18px; box-shadow:0 4px 12px rgba(112, 34, 19, 0.2);">
        <div style="display:inline-flex; align-items:center; gap:5px; background:#D97706; color:#FFFFFF; font-size:0.62rem; font-weight:800; padding:2px 8px; border-radius:9999px; letter-spacing:0.04em; margin-bottom:8px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
          <span>UTSAV HERITAGE SEASON</span>
        </div>

        <h2 style="font-size:1.15rem; font-weight:900; line-height:1.2; margin:0 0 12px 0; color:#FFFFFF;">
          Special Offers &amp; Heritage Sale
        </h2>

        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div style="display:flex; align-items:center; gap:8px;">
            <div style="display:flex; flex-direction:column; line-height:1.1;">
              <span style="font-size:0.55rem; color:#FCD34D; font-weight:800; letter-spacing:0.06em;">USE COUPON</span>
              <span style="font-size:0.88rem; color:#FFFFFF; font-weight:900; letter-spacing:0.04em;">UTSAV20</span>
            </div>
            <button type="button" id="btn-copy-coupon" style="display:inline-flex; align-items:center; gap:4px; background:rgba(0,0,0,0.3); border:1px solid rgba(255,255,255,0.25); border-radius:9999px; padding:3px 8px; font-size:0.65rem; font-weight:700; color:#FFFFFF; cursor:pointer;">
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
              </svg>
              <span>Copy</span>
            </button>
          </div>

          <button type="button" id="btn-claim-explore" style="background:#C87714; color:#FFFFFF; border:none; border-radius:6px; padding:8px 14px; font-size:0.75rem; font-weight:800; cursor:pointer; box-shadow:0 2px 6px rgba(0,0,0,0.15);">
            Claim &amp; Explore
          </button>
        </div>
      </div>

      <!-- Section: Explore Craft Types -->
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
        <h3 style="font-size:1.02rem; font-weight:900; color:#1C1917; margin:0;">
          Explore Craft Types
        </h3>
        <a href="javascript:void(0)" onclick="window.navigateToScreen('buyer_search')" style="font-size:0.75rem; font-weight:800; color:#7A2813; text-decoration:none; display:flex; align-items:center; gap:2px;">
          <span>View All</span>
          <span style="font-size:0.9rem;">›</span>
        </a>
      </div>

      <!-- 2x2 Craft Types Grid -->
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:20px;">
        
        <!-- 1. Pottery & Clay -->
        <div style="background:#FFFFFF; border:1px solid #ECE7E1; border-radius:12px; overflow:hidden; box-shadow:0 1px 4px rgba(0,0,0,0.03); cursor:pointer;" onclick="window.navigateToScreen('buyer_search')">
          <div style="height:110px; position:relative; overflow:hidden;">
            <img src="/assets/raw_pottery_snap.jpg" alt="Pottery & Clay" style="width:100%; height:100%; object-fit:cover;">
          </div>
          <div style="padding:8px 10px;">
            <div style="font-size:0.85rem; font-weight:800; color:#1C1917; margin-bottom:1px;">Pottery &amp; Clay</div>
            <div style="font-size:0.68rem; color:#78716C;">2,140 Verified Crafts</div>
          </div>
        </div>

        <!-- 2. Handloom Weaves -->
        <div style="background:#FFFFFF; border:1px solid #ECE7E1; border-radius:12px; overflow:hidden; box-shadow:0 1px 4px rgba(0,0,0,0.03); cursor:pointer;" onclick="window.navigateToScreen('buyer_search')">
          <div style="height:110px; position:relative; overflow:hidden;">
            <img src="/assets/ikat_saree.jpg" alt="Handloom Weaves" style="width:100%; height:100%; object-fit:cover;">
            <span style="position:absolute; top:6px; left:6px; background:#17375E; color:#FFFFFF; font-size:0.56rem; font-weight:800; padding:2px 7px; border-radius:9999px;">
              Loom Direct
            </span>
          </div>
          <div style="padding:8px 10px;">
            <div style="font-size:0.85rem; font-weight:800; color:#1C1917; margin-bottom:1px;">Handloom Weaves</div>
            <div style="font-size:0.68rem; color:#78716C;">4,890 Spun Pieces</div>
          </div>
        </div>

        <!-- 3. Wood & Inlay -->
        <div style="background:#FFFFFF; border:1px solid #ECE7E1; border-radius:12px; overflow:hidden; box-shadow:0 1px 4px rgba(0,0,0,0.03); cursor:pointer;" onclick="window.navigateToScreen('buyer_search')">
          <div style="height:110px; position:relative; overflow:hidden;">
            <img src="/assets/woodcraft_bowl.jpg" alt="Wood & Inlay" style="width:100%; height:100%; object-fit:cover;">
            <span style="position:absolute; top:6px; left:6px; background:#D97706; color:#FFFFFF; font-size:0.56rem; font-weight:800; padding:2px 7px; border-radius:9999px;">
              Heirloom
            </span>
          </div>
          <div style="padding:8px 10px;">
            <div style="font-size:0.85rem; font-weight:800; color:#1C1917; margin-bottom:1px;">Wood &amp; Inlay</div>
            <div style="font-size:0.68rem; color:#78716C;">1,320 Carved Artifacts</div>
          </div>
        </div>

        <!-- 4. Brass & Dhokra -->
        <div style="background:#FFFFFF; border:1px solid #ECE7E1; border-radius:12px; overflow:hidden; box-shadow:0 1px 4px rgba(0,0,0,0.03); cursor:pointer;" onclick="window.navigateToScreen('buyer_search')">
          <div style="height:110px; position:relative; overflow:hidden;">
            <img src="/assets/dhokra_brass.jpg" alt="Brass & Dhokra" style="width:100%; height:100%; object-fit:cover;">
            <span style="position:absolute; top:6px; left:6px; background:#15803D; color:#FFFFFF; font-size:0.56rem; font-weight:800; padding:2px 7px; border-radius:9999px;">
              Lost-Wax
            </span>
          </div>
          <div style="padding:8px 10px;">
            <div style="font-size:0.85rem; font-weight:800; color:#1C1917; margin-bottom:1px;">Brass &amp; Dhokra</div>
            <div style="font-size:0.68rem; color:#78716C;">980 Forged Heirlooms</div>
          </div>
        </div>

      </div>

      <!-- Section: Master Karigars Spotlight -->
      <div style="display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:10px;">
        <div>
          <h3 style="font-size:1.02rem; font-weight:900; color:#1C1917; line-height:1.15; margin:0;">
            Master Karigars<br>Spotlight
          </h3>
        </div>
        <a href="javascript:void(0)" onclick="window.navigateToScreen('artisans')" style="font-size:0.72rem; font-weight:800; color:#7A2813; text-decoration:none; text-align:right; line-height:1.2;">
          Guild<br>Registry ›
        </a>
      </div>

      <!-- Spotlight Card: Ramdev Kumhar -->
      <div style="background:#FFFFFF; border:1px solid #ECE7E1; border-radius:14px; padding:12px; box-shadow:0 1px 4px rgba(0,0,0,0.03); margin-bottom:20px;">
        <div style="display:flex; gap:10px; align-items:flex-start; margin-bottom:8px;">
          <div style="width:68px; height:68px; border-radius:8px; overflow:hidden; position:relative; flex-shrink:0;">
            <img src="/assets/artisan_ramulu.jpg" alt="Ramdev Kumhar" style="width:100%; height:100%; object-fit:cover;">
            <span style="position:absolute; bottom:2px; left:50%; transform:translateX(-50%); background:#0F172A; color:#FFFFFF; font-size:0.52rem; font-weight:800; padding:1px 5px; border-radius:3px; white-space:nowrap;">
              35 YRS
            </span>
          </div>

          <div style="flex:1;">
            <div style="font-size:0.95rem; font-weight:900; color:#1C1917; margin-bottom:2px;">
              Ramdev Kumhar
            </div>
            
            <div style="margin-bottom:3px;">
              <span style="background:#E7F7ED; color:#15803D; font-size:0.58rem; font-weight:800; padding:2px 7px; border-radius:9999px; display:inline-flex; align-items:center; gap:2px;">
                Verified Maker
              </span>
            </div>

            <div style="font-size:0.75rem; font-weight:800; color:#8D2B15; margin-bottom:2px;">
              Master Terracotta Craftsman
            </div>

            <div style="font-size:0.66rem; color:#78716C; display:flex; align-items:center; gap:3px;">
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <span>Chunar Cluster, Uttar Pradesh</span>
            </div>
          </div>
        </div>

        <p style="font-size:0.72rem; color:#57534E; line-height:1.4; margin:0 0 10px 0;">
          Carrying forward five generations of clay surahis and porous desert water pots made from...
        </p>

        <div style="display:flex; gap:8px;">
          <button type="button" id="btn-listen-story" style="flex:1; background:#FFFBF7; border:1px solid #EADBCE; border-radius:6px; padding:7px 10px; font-size:0.74rem; font-weight:800; color:#7A2813; display:flex; align-items:center; justify-content:center; gap:5px; cursor:pointer;">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
            </svg>
            <span>Listen Story (2:10)</span>
          </button>

          <button type="button" id="btn-direct-talk" style="background:#172E47; border:none; border-radius:6px; padding:7px 14px; font-size:0.74rem; font-weight:800; color:#FFFFFF; display:flex; align-items:center; justify-content:center; gap:5px; cursor:pointer;" onclick="window.showToast?.('Connecting direct call to Master Ramdev Kumhar...')">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            <span>Direct Talk</span>
          </button>
        </div>
      </div>

      <!-- Section: NEARBY ARTISANS / Discovery Radar -->
      <div style="margin-bottom:8px;">
        <div style="font-size:0.62rem; font-weight:800; color:#9A5847; text-transform:uppercase; letter-spacing:0.06em; margin-bottom:2px;">
          NEARBY ARTISANS
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
          <h3 style="font-size:1.1rem; font-weight:900; color:#1C1917; margin:0;">
            Discovery Radar
          </h3>
          <div style="background:#F5EEE7; border:1px solid #E5DCD3; border-radius:9999px; padding:3px 10px; font-size:0.68rem; font-weight:700; color:#57534E; display:inline-flex; align-items:center; gap:4px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="22" x2="11" y1="2" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
            <span>Varanasi • 18 km</span>
          </div>
        </div>

        <!-- Filter Chips Row -->
        <div style="display:flex; gap:8px; overflow-x:auto; padding-bottom:4px; margin-bottom:14px;">
          <button type="button" class="discovery-filter-chip active" style="background:#7A2813; color:#FFFFFF; border:none; border-radius:9999px; padding:6px 14px; font-size:0.72rem; font-weight:800; cursor:pointer; white-space:nowrap; display:inline-flex; align-items:center; gap:4px;">
            <span>✓ All Makers</span>
          </button>

          <button type="button" class="discovery-filter-chip" style="background:#FFFFFF; color:#44403C; border:1px solid #E5DCD3; border-radius:9999px; padding:6px 14px; font-size:0.72rem; font-weight:700; cursor:pointer; white-space:nowrap;" onclick="window.showToast?.('Filtered by Ready to Ship crafts')">
            <span>Ready to Ship</span>
          </button>

          <button type="button" class="discovery-filter-chip" style="background:#FFFFFF; color:#44403C; border:1px solid #E5DCD3; border-radius:9999px; padding:6px 14px; font-size:0.72rem; font-weight:700; cursor:pointer; white-space:nowrap;" onclick="window.showToast?.('Filtered by On Loom crafts')">
            <span>On Loom (Pre-...</span>
          </button>
        </div>
      </div>

      <!-- Product Feed List (3 Exact Cards from Screenshot) -->
      <div style="display:flex; flex-direction:column; gap:16px;">
        
        <!-- CARD 1: Hand-turned Terracotta Surahi -->
        <div style="background:#FFFFFF; border:1px solid #ECE7E1; border-radius:14px; overflow:hidden; box-shadow:0 1px 4px rgba(0,0,0,0.03);">
          <div style="height:190px; position:relative; overflow:hidden; background:#ECE7E1;">
            <img src="/assets/terracotta_pitcher.jpg" alt="Hand-turned Terracotta Surahi" style="width:100%; height:100%; object-fit:cover;">
            
            <!-- Badges top -->
            <div style="position:absolute; top:10px; left:10px; display:flex; gap:6px; align-items:center;">
              <span style="background:#14532D; color:#FFFFFF; font-size:0.6rem; font-weight:800; padding:3px 8px; border-radius:9999px; display:inline-flex; align-items:center; gap:4px;">
                <span style="font-size:0.6rem;">•</span> Ready to Ship
              </span>
              <span style="background:#FFFFFF; color:#1C1917; font-size:0.6rem; font-weight:800; padding:3px 8px; border-radius:9999px; box-shadow:0 1px 3px rgba(0,0,0,0.1);">
                Chunar GI #412
              </span>
            </div>

            <!-- Badge bottom right -->
            <div style="position:absolute; bottom:10px; right:10px; background:rgba(28,25,23,0.78); backdrop-filter:blur(4px); color:#FFFFFF; font-size:0.6rem; font-weight:700; padding:3px 8px; border-radius:9999px; display:inline-flex; align-items:center; gap:3px;">
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <span>Workshop pickup 14 km</span>
            </div>
          </div>

          <div style="padding:12px 14px;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:2px;">
              <div style="font-size:0.95rem; font-weight:900; color:#1C1917; line-height:1.25; max-width:65%;">
                Hand-turned Terracotta Surahi
              </div>
              <div style="text-align:right;">
                <div style="font-size:1.15rem; font-weight:900; color:#7A2813; line-height:1;">
                  ₹850
                </div>
                <div style="font-size:0.58rem; font-weight:900; color:#15803D; letter-spacing:0.04em;">
                  100% TO MAKER
                </div>
              </div>
            </div>

            <div style="font-size:0.7rem; color:#78716C; margin-bottom:12px;">
              By Ramdev Kumhar • Chunar Guild
            </div>

            <div style="display:flex; gap:8px; align-items:center;">
              <button type="button" class="btn-buy-feed-1" style="flex:1; background:#7A2813; color:#FFFFFF; border:none; border-radius:6px; padding:10px 14px; font-size:0.8rem; font-weight:800; display:flex; align-items:center; justify-content:center; gap:6px; cursor:pointer;" onclick="window.navigateToScreen('product_details')">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
                  <path d="M3 6h18"/>
                  <path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
                <span>Buy Direct from Maker</span>
              </button>

              <button type="button" style="width:38px; height:38px; border:1px solid #E5DCD3; border-radius:6px; background:#FFFFFF; display:flex; align-items:center; justify-content:center; color:#7A2813; font-size:1.15rem; cursor:pointer;" onclick="window.showToast?.('Added Hand-turned Surahi to wishlist ♡')">
                ♡
              </button>
            </div>
          </div>
        </div>

        <!-- CARD 2: Katan Silk Zari Brocade Dupatta -->
        <div style="background:#FFFFFF; border:1px solid #ECE7E1; border-radius:14px; overflow:hidden; box-shadow:0 1px 4px rgba(0,0,0,0.03);">
          <div style="height:190px; position:relative; overflow:hidden; background:#ECE7E1;">
            <img src="/assets/ikat_saree.jpg" alt="Katan Silk Zari Brocade Dupatta" style="width:100%; height:100%; object-fit:cover;">
            
            <!-- Badges top -->
            <div style="position:absolute; top:10px; left:10px; display:flex; gap:6px; align-items:center;">
              <span style="background:#C2410C; color:#FFFFFF; font-size:0.6rem; font-weight:800; padding:3px 8px; border-radius:9999px; display:inline-flex; align-items:center; gap:4px;">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                </svg>
                <span>On Loom (Ships 4 Days)</span>
              </span>
              <span style="background:#FFFFFF; color:#1C1917; font-size:0.6rem; font-weight:800; padding:3px 8px; border-radius:9999px; box-shadow:0 1px 3px rgba(0,0,0,0.1);">
                Varanasi GI #28
              </span>
            </div>

            <!-- Badge bottom right -->
            <div style="position:absolute; bottom:10px; right:10px; background:rgba(28,25,23,0.78); backdrop-filter:blur(4px); color:#FFFFFF; font-size:0.6rem; font-weight:700; padding:3px 8px; border-radius:9999px; display:inline-flex; align-items:center; gap:3px;">
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <span>Loom shed 8 km</span>
            </div>
          </div>

          <div style="padding:12px 14px;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:2px;">
              <div style="font-size:0.95rem; font-weight:900; color:#1C1917; line-height:1.25; max-width:65%;">
                Katan Silk Zari Brocade Dupatta
              </div>
              <div style="text-align:right;">
                <div style="font-size:1.15rem; font-weight:900; color:#7A2813; line-height:1;">
                  ₹4,200
                </div>
                <div style="font-size:0.58rem; font-weight:900; color:#15803D; letter-spacing:0.04em;">
                  100% TO MAKER
                </div>
              </div>
            </div>

            <div style="font-size:0.7rem; color:#78716C; margin-bottom:12px;">
              By Anandi Devi • Kabir Chaura Weavers
            </div>

            <div style="display:flex; gap:8px; align-items:center;">
              <button type="button" style="flex:1; background:#7A2813; color:#FFFFFF; border:none; border-radius:6px; padding:10px 14px; font-size:0.8rem; font-weight:800; display:flex; align-items:center; justify-content:center; gap:6px; cursor:pointer;" onclick="window.navigateToScreen('product_details')">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                </svg>
                <span>Order Now</span>
              </button>

              <button type="button" style="width:38px; height:38px; border:1px solid #E5DCD3; border-radius:6px; background:#FFFFFF; display:flex; align-items:center; justify-content:center; color:#7A2813; font-size:1.15rem; cursor:pointer;" onclick="window.showToast?.('Added Katan Silk Dupatta to wishlist ♡')">
                ♡
              </button>
            </div>
          </div>
        </div>

        <!-- CARD 3: Nizamabad Black Clay & Wood Toys -->
        <div style="background:#FFFFFF; border:1px solid #ECE7E1; border-radius:14px; overflow:hidden; box-shadow:0 1px 4px rgba(0,0,0,0.03);">
          <div style="height:190px; position:relative; overflow:hidden; background:#ECE7E1;">
            <img src="/assets/bidriware_vase.jpg" alt="Nizamabad Black Clay & Wood Toys" style="width:100%; height:100%; object-fit:cover;">
            
            <!-- Badges top -->
            <div style="position:absolute; top:10px; left:10px; display:flex; gap:6px; align-items:center;">
              <span style="background:#14532D; color:#FFFFFF; font-size:0.6rem; font-weight:800; padding:3px 8px; border-radius:9999px; display:inline-flex; align-items:center; gap:4px;">
                <span style="font-size:0.6rem;">•</span> 2 Left in Stock
              </span>
            </div>

            <!-- Badge bottom right -->
            <div style="position:absolute; bottom:10px; right:10px; background:rgba(28,25,23,0.78); backdrop-filter:blur(4px); color:#FFFFFF; font-size:0.6rem; font-weight:700; padding:3px 8px; border-radius:9999px; display:inline-flex; align-items:center; gap:3px;">
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <span>Direct Workshop Pick-up 22 km</span>
            </div>
          </div>

          <div style="padding:12px 14px;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:2px;">
              <div style="font-size:0.95rem; font-weight:900; color:#1C1917; line-height:1.25; max-width:60%;">
                Nizamabad Black Clay &amp; Wood Toys
              </div>
              <div style="text-align:right;">
                <div style="font-size:1.05rem; font-weight:900; color:#7A2813; line-height:1;">
                  ₹780 – ₹1,890
                </div>
                <div style="font-size:0.58rem; font-weight:900; color:#15803D; letter-spacing:0.04em;">
                  100% TO MAKER
                </div>
              </div>
            </div>

            <div style="font-size:0.7rem; color:#78716C; margin-bottom:12px;">
              By Mohan Lal • Azamgarh Collective
            </div>

            <div style="display:flex; gap:8px; align-items:center;">
              <button type="button" style="flex:1; background:#7A2813; color:#FFFFFF; border:none; border-radius:6px; padding:10px 14px; font-size:0.8rem; font-weight:800; display:flex; align-items:center; justify-content:center; gap:6px; cursor:pointer;" onclick="window.navigateToScreen('product_details')">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
                  <path d="M3 6h18"/>
                  <path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
                <span>Buy Direct from Maker</span>
              </button>

              <button type="button" style="width:38px; height:38px; border:1px solid #E5DCD3; border-radius:6px; background:#FFFFFF; display:flex; align-items:center; justify-content:center; color:#7A2813; font-size:1.15rem; cursor:pointer;" onclick="window.showToast?.('Added Nizamabad Toys to wishlist ♡')">
                ♡
              </button>
            </div>
          </div>
        </div>

      </div>

    </div>
  `;

  // Attach Event Handlers
  container.querySelector('#btn-copy-coupon')?.addEventListener('click', () => {
    navigator.clipboard?.writeText('UTSAV20');
    window.showToast?.('Coupon UTSAV20 copied to clipboard! 📋');
  });

  container.querySelector('#btn-claim-explore')?.addEventListener('click', () => {
    window.showToast?.('Coupon UTSAV20 activated! Enjoy 20% discount on Heritage Season crafts.');
  });

  container.querySelector('#btn-voice-search')?.addEventListener('click', () => {
    window.showToast?.('🎙️ Voice Search listening in Hindi & English...');
    AudioAssistance.speak("आप कौन सा हस्तशिल्प या कारीगर ढूंढ रहे हैं? बनारस सिल्क, चुनार मिट्टी, या ढोकरा मेटल?", "hi-IN");
  });

  container.querySelector('#btn-listen-story')?.addEventListener('click', () => {
    AudioAssistance.speak(
      "रामदेव कुम्हार, चुनार क्लस्टर उत्तर प्रदेश के 35 वर्षों के अनुभवी मास्टर टेराकोटा शिल्पकार हैं। पांच पीढ़ियों से इनकी सुराही और मिट्टी के मटके शुद्ध प्राकृतिक शिल्प का प्रतीक हैं।",
      "hi-IN"
    );
  });
}
