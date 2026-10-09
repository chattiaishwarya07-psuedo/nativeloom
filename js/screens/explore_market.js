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
        <div style="flex:1; display:flex; align-items:center; background:#FFFFFF; border:1px solid #E5DCD3; border-radius:9999px; height:42px; padding:0 12px; gap:8px; box-shadow:0 1px 3px rgba(0,0,0,0.03); position:relative;">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.3-4.3"/>
          </svg>
          <input type="text" id="input-market-search" placeholder="Search by craft, GI tag, or artisan..." style="flex:1; border:none; outline:none; font-size:0.8rem; background:transparent; color:#1F2937;">
          <button type="button" id="btn-clear-search" style="display:none; background:#E5DCD3; border:none; border-radius:50%; width:20px; height:20px; align-items:center; justify-content:center; cursor:pointer; font-size:0.62rem; color:#57534E; padding:0; flex-shrink:0;" title="Clear search">✕</button>
          <button type="button" id="btn-voice-search" style="background:#F4ECE4; border:none; border-radius:50%; width:26px; height:26px; display:flex; align-items:center; justify-content:center; cursor:pointer; color:#7A2813; padding:0; flex-shrink:0;" title="Voice Search">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
              <line x1="12" x2="12" y1="19" y2="22"/>
            </svg>
          </button>
        </div>

        <button type="button" id="btn-filter-settings" style="position:relative; width:42px; height:42px; background:#7A2813; border:none; border-radius:8px; display:flex; align-items:center; justify-content:center; color:#FFFFFF; cursor:pointer; flex-shrink:0; box-shadow:0 2px 6px rgba(122, 40, 19, 0.2);" title="Filter Crafts">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="4" x2="20" y1="21" y2="21"/>
            <line x1="4" x2="20" y1="14" y2="14"/>
            <line x1="4" x2="20" y1="7" y2="7"/>
            <circle cx="8" cy="7" r="2" fill="currentColor"/>
            <circle cx="16" cy="14" r="2" fill="currentColor"/>
            <circle cx="10" cy="21" r="2" fill="currentColor"/>
          </svg>
          <span id="filter-active-badge" style="display:none; position:absolute; top:-4px; right:-4px; background:#D97706; color:#FFFFFF; width:17px; height:17px; border-radius:50%; font-size:0.62rem; font-weight:900; border:2px solid #FAF7F2; align-items:center; justify-content:center;"></span>
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
        <div class="card-craft-type" data-cat="pottery" style="background:#FFFFFF; border:1px solid #ECE7E1; border-radius:12px; overflow:hidden; box-shadow:0 1px 4px rgba(0,0,0,0.03); cursor:pointer;">
          <div style="height:110px; position:relative; overflow:hidden;">
            <img src="/assets/raw_pottery_snap.jpg" alt="Pottery & Clay" style="width:100%; height:100%; object-fit:cover;">
          </div>
          <div style="padding:8px 10px;">
            <div style="font-size:0.85rem; font-weight:800; color:#1C1917; margin-bottom:1px;">Pottery &amp; Clay</div>
            <div style="font-size:0.68rem; color:#78716C;">2,140 Verified Crafts</div>
          </div>
        </div>

        <!-- 2. Handloom Weaves -->
        <div class="card-craft-type" data-cat="handloom" style="background:#FFFFFF; border:1px solid #ECE7E1; border-radius:12px; overflow:hidden; box-shadow:0 1px 4px rgba(0,0,0,0.03); cursor:pointer;">
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
        <div class="card-craft-type" data-cat="wood" style="background:#FFFFFF; border:1px solid #ECE7E1; border-radius:12px; overflow:hidden; box-shadow:0 1px 4px rgba(0,0,0,0.03); cursor:pointer;">
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
        <div class="card-craft-type" data-cat="brass" style="background:#FFFFFF; border:1px solid #ECE7E1; border-radius:12px; overflow:hidden; box-shadow:0 1px 4px rgba(0,0,0,0.03); cursor:pointer;">
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

        <p style="font-size:0.72rem; color:#57534E; line-height:1.4; margin:0 0 10px 0; cursor:pointer;" title="Carrying forward five generations of clay surahis and porous desert water pots made from pure Gangetic riverbed silt." onclick="window.showToast?.('Carrying forward five generations of clay surahis and porous desert water pots made from pure Gangetic riverbed silt.')">
          Carrying forward five generations of clay surahis and porous desert water pots made from pure Gangetic riverbed silt.
        </p>

        <div style="display:flex; gap:8px;">
          <button type="button" id="btn-listen-story" style="flex:1; background:#FFFBF7; border:1px solid #EADBCE; border-radius:6px; padding:7px 10px; font-size:0.74rem; font-weight:800; color:#7A2813; display:flex; align-items:center; justify-content:center; gap:5px; cursor:pointer;">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
            </svg>
            <span>Listen Story (2:10)</span>
          </button>

          <button type="button" id="btn-direct-talk" style="background:#172E47; border:none; border-radius:6px; padding:7px 14px; font-size:0.74rem; font-weight:800; color:#FFFFFF; display:flex; align-items:center; justify-content:center; gap:5px; cursor:pointer;" onclick="window.navigateToScreen('chat')">
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
          <button type="button" class="discovery-filter-chip active" data-avail="all" style="background:#7A2813; color:#FFFFFF; border:none; border-radius:9999px; padding:6px 14px; font-size:0.72rem; font-weight:800; cursor:pointer; white-space:nowrap; display:inline-flex; align-items:center; gap:4px;">
            <span>✓ All Makers</span>
          </button>

          <button type="button" class="discovery-filter-chip" data-avail="ready" style="background:#FFFFFF; color:#44403C; border:1px solid #E5DCD3; border-radius:9999px; padding:6px 14px; font-size:0.72rem; font-weight:700; cursor:pointer; white-space:nowrap;">
            <span>Ready to Ship</span>
          </button>

          <button type="button" class="discovery-filter-chip" data-avail="on_loom" style="background:#FFFFFF; color:#44403C; border:1px solid #E5DCD3; border-radius:9999px; padding:6px 14px; font-size:0.72rem; font-weight:700; cursor:pointer; white-space:nowrap;">
            <span>On Loom (Pre-Order)</span>
          </button>
        </div>
      </div>

      <!-- Active Filter / Search Pill Bar (Shows dynamically when filters are active) -->
      <div id="active-filters-bar" style="display:none; margin-bottom:14px; background:#FFF8F3; border:1px solid #F3DDD0; border-radius:10px; padding:8px 12px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
          <span id="active-filter-count" style="font-size:0.72rem; font-weight:800; color:#7A2813;"></span>
          <button type="button" id="btn-clear-all-filters" style="background:none; border:none; font-size:0.68rem; font-weight:800; color:#B45309; cursor:pointer; text-decoration:underline; padding:0;">Clear All</button>
        </div>
        <div id="active-filter-chips" style="display:flex; flex-wrap:wrap; gap:5px;"></div>
      </div>

      <!-- Product Feed List (Dynamic Produced Crafts + Verified Catalog) -->
      <div id="product-feed-list" style="display:flex; flex-direction:column; gap:16px;">
      </div>

    </div>

    <!-- ============================================== -->
    <!-- MODAL: MARKET FILTERS & SORT                   -->
    <!-- ============================================== -->
    <div class="modal-overlay" id="modal-market-filters">
      <div class="bottom-sheet" style="max-height:88vh; padding-bottom:28px; overflow-y:auto;">
        <div class="sheet-header" style="margin-bottom:12px;">
          <div class="sheet-title-group">
            <div style="width:34px; height:34px; border-radius:8px; background:#FEECE5; color:#7A2813; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>
            </div>
            <div>
              <div style="font-size:0.95rem; font-weight:900; color:#1E150F;">Filter &amp; Sort Crafts</div>
              <div style="font-size:0.68rem; color:#71655D;">Refine crafts by tradition, budget, GI tag &amp; delivery</div>
            </div>
          </div>
          <button type="button" class="sheet-close-btn" id="btn-close-filter-modal">✕</button>
        </div>

        <!-- Section: Craft Category -->
        <div style="margin-bottom:16px;">
          <label style="display:block; font-size:0.78rem; font-weight:900; color:#1E150F; margin-bottom:8px;">
            Craft Tradition / Category
          </label>
          <div style="display:flex; flex-wrap:wrap; gap:6px;" id="filter-category-group">
            <button type="button" class="btn-modal-filter-chip active" data-type="cat" data-value="all" style="background:#7A2813; color:#FFFFFF; border:1.5px solid #7A2813; border-radius:9999px; padding:6px 12px; font-size:0.72rem; font-weight:800; cursor:pointer;">All Crafts</button>
            <button type="button" class="btn-modal-filter-chip" data-type="cat" data-value="pottery" style="background:#FFFFFF; color:#57534E; border:1.5px solid #E5DCD3; border-radius:9999px; padding:6px 12px; font-size:0.72rem; font-weight:700; cursor:pointer;">Pottery &amp; Clay</button>
            <button type="button" class="btn-modal-filter-chip" data-type="cat" data-value="handloom" style="background:#FFFFFF; color:#57534E; border:1.5px solid #E5DCD3; border-radius:9999px; padding:6px 12px; font-size:0.72rem; font-weight:700; cursor:pointer;">Handloom Weaves</button>
            <button type="button" class="btn-modal-filter-chip" data-type="cat" data-value="wood" style="background:#FFFFFF; color:#57534E; border:1.5px solid #E5DCD3; border-radius:9999px; padding:6px 12px; font-size:0.72rem; font-weight:700; cursor:pointer;">Wood &amp; Inlay</button>
            <button type="button" class="btn-modal-filter-chip" data-type="cat" data-value="brass" style="background:#FFFFFF; color:#57534E; border:1.5px solid #E5DCD3; border-radius:9999px; padding:6px 12px; font-size:0.72rem; font-weight:700; cursor:pointer;">Brass &amp; Dhokra</button>
          </div>
        </div>

        <!-- Section: Budget / Price Range -->
        <div style="margin-bottom:16px;">
          <label style="display:block; font-size:0.78rem; font-weight:900; color:#1E150F; margin-bottom:8px;">
            Budget Range
          </label>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;" id="filter-price-group">
            <button type="button" class="btn-modal-filter-chip active" data-type="price" data-value="all" style="background:#7A2813; color:#FFFFFF; border:1.5px solid #7A2813; border-radius:8px; padding:8px 10px; font-size:0.75rem; font-weight:800; cursor:pointer; text-align:center;">Any Price</button>
            <button type="button" class="btn-modal-filter-chip" data-type="price" data-value="under1000" style="background:#FFFFFF; color:#57534E; border:1.5px solid #E5DCD3; border-radius:8px; padding:8px 10px; font-size:0.75rem; font-weight:700; cursor:pointer; text-align:center;">Under ₹1,000</button>
            <button type="button" class="btn-modal-filter-chip" data-type="price" data-value="1000to3000" style="background:#FFFFFF; color:#57534E; border:1.5px solid #E5DCD3; border-radius:8px; padding:8px 10px; font-size:0.75rem; font-weight:700; cursor:pointer; text-align:center;">₹1,000 – ₹3,000</button>
            <button type="button" class="btn-modal-filter-chip" data-type="price" data-value="above3000" style="background:#FFFFFF; color:#57534E; border:1.5px solid #E5DCD3; border-radius:8px; padding:8px 10px; font-size:0.75rem; font-weight:700; cursor:pointer; text-align:center;">Above ₹3,000</button>
          </div>
        </div>

        <!-- Section: Availability / Handcraft Stage -->
        <div style="margin-bottom:16px;">
          <label style="display:block; font-size:0.78rem; font-weight:900; color:#1E150F; margin-bottom:8px;">
            Availability
          </label>
          <div style="display:flex; flex-wrap:wrap; gap:6px;" id="filter-avail-group">
            <button type="button" class="btn-modal-filter-chip active" data-type="avail" data-value="all" style="background:#7A2813; color:#FFFFFF; border:1.5px solid #7A2813; border-radius:9999px; padding:6px 12px; font-size:0.72rem; font-weight:800; cursor:pointer;">All Availability</button>
            <button type="button" class="btn-modal-filter-chip" data-type="avail" data-value="ready" style="background:#FFFFFF; color:#57534E; border:1.5px solid #E5DCD3; border-radius:9999px; padding:6px 12px; font-size:0.72rem; font-weight:700; cursor:pointer;">Ready to Ship</button>
            <button type="button" class="btn-modal-filter-chip" data-type="avail" data-value="on_loom" style="background:#FFFFFF; color:#57534E; border:1.5px solid #E5DCD3; border-radius:9999px; padding:6px 12px; font-size:0.72rem; font-weight:700; cursor:pointer;">On Loom / Pre-Order</button>
          </div>
        </div>

        <!-- Section: Authenticity Filter (GI Tag Only) -->
        <div style="background:#FFF9F5; border:1px solid #F2DDD0; border-radius:10px; padding:10px 12px; margin-bottom:16px; display:flex; align-items:center; justify-content:space-between; cursor:pointer;" id="toggle-gi-certified">
          <div style="display:flex; align-items:center; gap:8px;">
            <span style="display:flex; align-items:center;">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"/><path d="M7 7h.01"/></svg>
            </span>
            <div>
              <div style="font-size:0.78rem; font-weight:800; color:#1E150F;">GI Certified Clusters Only</div>
              <div style="font-size:0.64rem; color:#78716C;">Filter government authenticated geographical indications</div>
            </div>
          </div>
          <input type="checkbox" id="checkbox-gi-only" style="width:18px; height:18px; accent-color:#7A2813; cursor:pointer;">
        </div>

        <!-- Section: Sort Order -->
        <div style="margin-bottom:20px;">
          <label style="display:block; font-size:0.78rem; font-weight:900; color:#1E150F; margin-bottom:8px;">
            Sort Crafts By
          </label>
          <select id="select-filter-sort" style="width:100%; border:1px solid #D8CFC4; border-radius:8px; padding:10px 12px; font-size:0.82rem; font-weight:700; color:#1E150F; background:#FFFDFB; outline:none;">
            <option value="authentic">★ Most Authentic (Master Artisans First)</option>
            <option value="low">₹ Price: Low to High</option>
            <option value="high">₹ Price: High to Low</option>
            <option value="distance">📍 Proximity: Closest Workshop First</option>
          </select>
        </div>

        <!-- Action Buttons -->
        <div style="display:flex; gap:10px;">
          <button type="button" id="btn-reset-filters" style="flex:1; height:42px; background:#FFFFFF; border:1.5px solid #D6C7B2; border-radius:10px; font-size:0.8rem; font-weight:800; color:#7A2813; cursor:pointer;">
            Reset All
          </button>
          <button type="button" id="btn-apply-filters" style="flex:2; height:42px; background:#7A2813; border:none; border-radius:10px; font-size:0.85rem; font-weight:800; color:#FFFFFF; cursor:pointer; box-shadow:0 2px 8px rgba(122,40,19,0.25);">
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  `;

  // Centralized Craft Catalog
  const baseCatalog = [
    {
      id: 'craft-terracotta-pitcher',
      title: 'Hand-turned Terracotta Surahi',
      artisan: 'Ramdev Kumhar',
      cluster: 'Chunar Guild, Uttar Pradesh',
      giTag: 'Chunar GI #412',
      giCertified: true,
      category: 'pottery',
      price: 850,
      status: 'ready',
      badge: 'Ready to Ship',
      distance: 'Workshop pickup 14 km',
      distanceKm: 14,
      image: '/assets/terracotta_pitcher.jpg',
      isProduced: false
    },
    {
      id: 'craft-katan-silk',
      title: 'Katan Silk Zari Brocade Dupatta',
      artisan: 'Anandi Devi',
      cluster: 'Kabir Chaura Weavers, Varanasi',
      giTag: 'Varanasi GI #28',
      giCertified: true,
      category: 'handloom',
      price: 4200,
      status: 'on_loom',
      badge: 'On Loom (Ships 4 Days)',
      distance: 'Loom shed 8 km',
      distanceKm: 8,
      image: '/assets/ikat_saree.jpg',
      isProduced: false
    },
    {
      id: 'craft-nizamabad-clay',
      title: 'Nizamabad Black Clay & Wood Toys',
      artisan: 'Mohan Lal',
      cluster: 'Azamgarh Collective, UP',
      giTag: 'Azamgarh GI #182',
      giCertified: true,
      category: 'pottery',
      price: 1250,
      displayPrice: '₹780 – ₹1,890',
      status: 'ready',
      badge: '2 Left in Stock',
      distance: 'Workshop Pick-up 22 km',
      distanceKm: 22,
      image: '/assets/bidriware_vase.jpg',
      isProduced: false
    },
    {
      id: 'craft-dhokra-bell',
      title: 'Bastar Lost-Wax Brass Tribal Bell Figurine',
      artisan: 'Budhram Baghel',
      cluster: 'Bastar Dhokra Cluster, Chhattisgarh',
      giTag: 'Bastar GI #84',
      giCertified: true,
      category: 'brass',
      price: 1850,
      status: 'ready',
      badge: 'Ancient Lost-Wax Cast',
      distance: 'Artisan Hub 38 km',
      distanceKm: 38,
      image: '/assets/dhokra_brass.jpg',
      isProduced: false
    },
    {
      id: 'craft-wood-jaali-box',
      title: 'Saharanpur Hand-Carved Sheesham Jaali Box',
      artisan: 'Saleem Ahmed',
      cluster: 'Saharanpur Woodcraft Guild, UP',
      giTag: 'Saharanpur GI #124',
      giCertified: true,
      category: 'wood',
      price: 950,
      status: 'ready',
      badge: 'Heirloom Jaali Carving',
      distance: 'Wood Shed 30 km',
      distanceKm: 30,
      image: '/assets/woodcraft_bowl.jpg',
      isProduced: false
    },
    {
      id: 'craft-terracotta-diyas',
      title: 'Handcrafted Festive Terracotta Diyas (Set of 12)',
      artisan: 'Ramdev Kumhar',
      cluster: 'Varanasi Clay Cluster, UP',
      giTag: 'Varanasi GI #182',
      giCertified: true,
      category: 'pottery',
      price: 320,
      status: 'ready',
      badge: 'Eco-Friendly Clay',
      distance: 'Kiln pickup 14 km',
      distanceKm: 14,
      image: '/assets/handcrafted_diyas.jpg',
      isProduced: false
    }
  ];

  // Combine with artisan dynamic produced crafts
  const producedCrafts = (State.getProducedCrafts ? State.getProducedCrafts() : (State.producedCrafts || [])).map(c => ({
    id: c.id,
    title: c.title,
    artisan: c.artisanName || 'Ramdev Kumhar',
    cluster: c.cluster || 'Gorakhpur & Varanasi Terracotta Cluster',
    giTag: c.giTagNumber || 'GI #182',
    giCertified: true,
    category: 'pottery',
    price: c.price || 750,
    status: 'ready',
    badge: '✨ Just Produced • Direct from Kiln',
    distance: 'Gorakhpur Workshop 14 km',
    distanceKm: 14,
    image: c.image || '/assets/terracotta_pitcher.jpg',
    isProduced: true
  }));

  const allCrafts = [...producedCrafts, ...baseCatalog];

  // Active Filter & Search State
  const filterState = {
    query: '',
    category: 'all',
    priceRange: 'all',
    availability: 'all',
    giOnly: false,
    sort: 'authentic'
  };

  const feedListEl = container.querySelector('#product-feed-list');
  const marketSearchInput = container.querySelector('#input-market-search');
  const btnClearSearch = container.querySelector('#btn-clear-search');
  const filterModal = container.querySelector('#modal-market-filters');
  const filterActiveBadge = container.querySelector('#filter-active-badge');
  const activeFiltersBar = container.querySelector('#active-filters-bar');
  const activeFilterCount = container.querySelector('#active-filter-count');
  const activeFilterChips = container.querySelector('#active-filter-chips');
  const checkboxGiOnly = container.querySelector('#checkbox-gi-only');
  const selectFilterSort = container.querySelector('#select-filter-sort');

  function getFilteredCrafts() {
    return allCrafts.filter(craft => {
      // 1. Query search filter
      if (filterState.query) {
        const q = filterState.query.toLowerCase();
        const matchesQuery =
          craft.title.toLowerCase().includes(q) ||
          craft.artisan.toLowerCase().includes(q) ||
          craft.cluster.toLowerCase().includes(q) ||
          craft.giTag.toLowerCase().includes(q) ||
          craft.category.toLowerCase().includes(q);
        if (!matchesQuery) return false;
      }

      // 2. Category filter
      if (filterState.category !== 'all') {
        if (craft.category !== filterState.category) return false;
      }

      // 3. Price Range filter
      if (filterState.priceRange !== 'all') {
        if (filterState.priceRange === 'under1000' && craft.price > 1000) return false;
        if (filterState.priceRange === '1000to3000' && (craft.price < 1000 || craft.price > 3000)) return false;
        if (filterState.priceRange === 'above3000' && craft.price <= 3000) return false;
      }

      // 4. Availability filter
      if (filterState.availability !== 'all') {
        if (craft.status !== filterState.availability) return false;
      }

      // 5. GI Certified Only filter
      if (filterState.giOnly) {
        if (!craft.giCertified) return false;
      }

      return true;
    }).sort((a, b) => {
      if (filterState.sort === 'low') return a.price - b.price;
      if (filterState.sort === 'high') return b.price - a.price;
      if (filterState.sort === 'distance') return (a.distanceKm || 0) - (b.distanceKm || 0);
      return 0; // authentic / default
    });
  }

  function renderFeed() {
    if (!feedListEl) return;
    const filtered = getFilteredCrafts();

    if (filtered.length === 0) {
      feedListEl.innerHTML = `
        <div style="background:#FFFFFF; border:1px dashed #D6C7B2; border-radius:14px; padding:32px 16px; text-align:center;">
          <div style="margin-bottom:10px; display:flex; justify-content:center;">
            <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </div>
          <div style="font-size:1rem; font-weight:900; color:#1C1917; margin-bottom:4px;">No matching crafts found</div>
          <div style="font-size:0.75rem; color:#78716C; margin-bottom:16px; max-width:280px; margin-left:auto; margin-right:auto;">
            We couldn't find any crafts matching your active search or filters. Try adjusting your query or price range.
          </div>
          <button type="button" id="btn-empty-reset" style="background:#7A2813; color:#FFFFFF; border:none; border-radius:8px; padding:8px 18px; font-size:0.78rem; font-weight:800; cursor:pointer;">
            Reset All Filters
          </button>
        </div>
      `;
      feedListEl.querySelector('#btn-empty-reset')?.addEventListener('click', resetAllFilters);
      updateActiveFiltersUI(0);
      return;
    }

    feedListEl.innerHTML = filtered.map(craft => {
      const isSpecialProduced = craft.isProduced;
      return `
        <div style="background:#FFFFFF; border:${isSpecialProduced ? '2px solid #7A2813' : '1px solid #ECE7E1'}; border-radius:14px; overflow:hidden; box-shadow:0 ${isSpecialProduced ? '2px 8px rgba(122,40,19,0.12)' : '1px 4px rgba(0,0,0,0.03)'};">
          <div style="height:190px; position:relative; overflow:hidden; background:#ECE7E1; cursor:pointer;" onclick="window.showCraftDetails?.('${craft.id}')">
            <img src="${craft.image}" alt="${craft.title}" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='/assets/terracotta_pitcher.jpg'">

            <!-- Badges top -->
            <div style="position:absolute; top:10px; left:10px; display:flex; gap:6px; align-items:center;">
              <span style="background:${craft.status === 'on_loom' ? '#C2410C' : (isSpecialProduced ? '#7A2813' : '#14532D')}; color:#FFFFFF; font-size:0.6rem; font-weight:800; padding:3px 8px; border-radius:9999px; display:inline-flex; align-items:center; gap:4px;">
                ${craft.badge || 'Ready to Ship'}
              </span>
              ${craft.giTag ? `
                <span style="background:#FFFFFF; color:#1C1917; font-size:0.6rem; font-weight:800; padding:3px 8px; border-radius:9999px; box-shadow:0 1px 3px rgba(0,0,0,0.1);">
                  ${craft.giTag}
                </span>
              ` : ''}
            </div>

            <!-- Badge bottom right -->
            <div style="position:absolute; bottom:10px; right:10px; background:rgba(28,25,23,0.78); backdrop-filter:blur(4px); color:#FFFFFF; font-size:0.6rem; font-weight:700; padding:3px 8px; border-radius:9999px; display:inline-flex; align-items:center; gap:3px;">
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <span>${craft.distance}</span>
            </div>
          </div>

          <div style="padding:12px 14px;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:2px;">
              <div style="font-size:0.95rem; font-weight:900; color:#1C1917; line-height:1.25; max-width:65%; cursor:pointer;" onclick="window.showCraftDetails?.('${craft.id}')">
                ${craft.title}
              </div>
              <div style="text-align:right;">
                <div style="font-size:1.15rem; font-weight:900; color:#7A2813; line-height:1;">
                  ${craft.displayPrice || ('₹' + craft.price.toLocaleString('en-IN'))}
                </div>
                <div style="font-size:0.58rem; font-weight:900; color:#15803D; letter-spacing:0.04em;">
                  100% TO MAKER
                </div>
              </div>
            </div>

            <div style="font-size:0.7rem; color:#78716C; margin-bottom:12px;">
              By ${craft.artisan} • ${craft.cluster}
            </div>

            <div style="display:flex; gap:8px; align-items:center;">
              <button type="button" style="flex:1; background:#7A2813; color:#FFFFFF; border:none; border-radius:6px; padding:10px 14px; font-size:0.8rem; font-weight:800; display:flex; align-items:center; justify-content:center; gap:6px; cursor:pointer;" onclick="window.showCraftDetails?.('${craft.id}')">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
                  <path d="M3 6h18"/>
                  <path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
                <span>Buy Direct from Maker</span>
              </button>

              <button type="button" style="width:38px; height:38px; border:1px solid #E5DCD3; border-radius:6px; background:#FFFFFF; display:flex; align-items:center; justify-content:center; color:#7A2813; cursor:pointer;" onclick="window.showToast?.('Added ${craft.title.replace(/'/g, "\\'")} to wishlist')">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    updateActiveFiltersUI(filtered.length);
  }

  function updateActiveFiltersUI(matchCount) {
    const chips = [];
    let activeFilterNum = 0;

    if (filterState.query) {
      chips.push({ label: `Search: "${filterState.query}"`, key: 'query' });
    }
    if (filterState.category !== 'all') {
      activeFilterNum++;
      const catLabels = { pottery: '🏺 Pottery & Clay', handloom: '🧵 Handloom Weaves', wood: '🪵 Wood & Inlay', brass: '🔱 Brass & Dhokra' };
      chips.push({ label: catLabels[filterState.category] || filterState.category, key: 'category' });
    }
    if (filterState.priceRange !== 'all') {
      activeFilterNum++;
      const priceLabels = { under1000: 'Under ₹1,000', '1000to3000': '₹1,000 – ₹3,000', above3000: 'Above ₹3,000' };
      chips.push({ label: priceLabels[filterState.priceRange] || filterState.priceRange, key: 'priceRange' });
    }
    if (filterState.availability !== 'all') {
      activeFilterNum++;
      const availLabels = { ready: '📦 Ready to Ship', on_loom: '🧵 On Loom' };
      chips.push({ label: availLabels[filterState.availability] || filterState.availability, key: 'availability' });
    }
    if (filterState.giOnly) {
      activeFilterNum++;
      chips.push({ label: '🏷️ GI Only', key: 'giOnly' });
    }

    // Update Filter button badge
    if (filterActiveBadge) {
      if (activeFilterNum > 0) {
        filterActiveBadge.style.display = 'flex';
        filterActiveBadge.textContent = activeFilterNum;
      } else {
        filterActiveBadge.style.display = 'none';
      }
    }

    // Update Active Filters Bar above feed
    if (activeFiltersBar && activeFilterChips && activeFilterCount) {
      if (chips.length > 0) {
        activeFiltersBar.style.display = 'block';
        activeFilterCount.textContent = `Showing ${matchCount} verified craft${matchCount === 1 ? '' : 's'}`;
        activeFilterChips.innerHTML = chips.map(c => `
          <span style="background:#FFFFFF; border:1px solid #D6C7B2; border-radius:9999px; padding:3px 10px; font-size:0.68rem; font-weight:700; color:#7A2813; display:inline-flex; align-items:center; gap:5px;">
            <span>${c.label}</span>
            <b data-remove-filter="${c.key}" style="cursor:pointer; color:#A8715A; font-size:0.75rem;">✕</b>
          </span>
        `).join('');

        activeFilterChips.querySelectorAll('[data-remove-filter]').forEach(b => {
          b.addEventListener('click', () => {
            const key = b.dataset.removeFilter;
            if (key === 'query') {
              filterState.query = '';
              if (marketSearchInput) marketSearchInput.value = '';
              if (btnClearSearch) btnClearSearch.style.display = 'none';
            } else if (key === 'giOnly') {
              filterState.giOnly = false;
              if (checkboxGiOnly) checkboxGiOnly.checked = false;
            } else {
              filterState[key] = 'all';
            }
            syncModalUI();
            renderFeed();
          });
        });
      } else {
        activeFiltersBar.style.display = 'none';
      }
    }
  }

  function resetAllFilters() {
    filterState.query = '';
    filterState.category = 'all';
    filterState.priceRange = 'all';
    filterState.availability = 'all';
    filterState.giOnly = false;
    filterState.sort = 'authentic';

    if (marketSearchInput) marketSearchInput.value = '';
    if (btnClearSearch) btnClearSearch.style.display = 'none';
    if (checkboxGiOnly) checkboxGiOnly.checked = false;
    if (selectFilterSort) selectFilterSort.value = 'authentic';

    syncModalUI();
    syncDiscoveryRadarUI();
    renderFeed();
    window.showToast?.('All search filters reset.');
  }

  function syncModalUI() {
    container.querySelectorAll('.btn-modal-filter-chip').forEach(btn => {
      const type = btn.dataset.type;
      const val = btn.dataset.value;
      const isSelected =
        (type === 'cat' && filterState.category === val) ||
        (type === 'price' && filterState.priceRange === val) ||
        (type === 'avail' && filterState.availability === val);

      if (isSelected) {
        btn.classList.add('active');
        btn.style.background = '#7A2813';
        btn.style.color = '#FFFFFF';
        btn.style.borderColor = '#7A2813';
        btn.style.fontWeight = '800';
      } else {
        btn.classList.remove('active');
        btn.style.background = '#FFFFFF';
        btn.style.color = '#57534E';
        btn.style.borderColor = '#E5DCD3';
        btn.style.fontWeight = '700';
      }
    });

    if (checkboxGiOnly) checkboxGiOnly.checked = filterState.giOnly;
    if (selectFilterSort) selectFilterSort.value = filterState.sort;
  }

  function syncDiscoveryRadarUI() {
    container.querySelectorAll('.discovery-filter-chip').forEach(btn => {
      const avail = btn.dataset.avail;
      if (avail === filterState.availability) {
        btn.classList.add('active');
        btn.style.background = '#7A2813';
        btn.style.color = '#FFFFFF';
        btn.style.border = 'none';
        btn.style.fontWeight = '800';
        btn.innerHTML = `<span>✓ ${btn.textContent.replace('✓', '').trim()}</span>`;
      } else {
        btn.classList.remove('active');
        btn.style.background = '#FFFFFF';
        btn.style.color = '#44403C';
        btn.style.border = '1px solid #E5DCD3';
        btn.style.fontWeight = '700';
        btn.innerHTML = `<span>${btn.textContent.replace('✓', '').trim()}</span>`;
      }
    });
  }

  // Live Search Input Event
  marketSearchInput?.addEventListener('input', (e) => {
    filterState.query = e.target.value.trim();
    if (btnClearSearch) {
      btnClearSearch.style.display = filterState.query ? 'flex' : 'none';
    }
    renderFeed();
  });

  marketSearchInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      feedListEl?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  btnClearSearch?.addEventListener('click', () => {
    if (marketSearchInput) marketSearchInput.value = '';
    filterState.query = '';
    btnClearSearch.style.display = 'none';
    renderFeed();
  });

  // Discovery Radar Chips
  container.querySelectorAll('.discovery-filter-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      filterState.availability = btn.dataset.avail || 'all';
      syncDiscoveryRadarUI();
      syncModalUI();
      renderFeed();
    });
  });

  // Craft Types 2x2 Grid Click
  container.querySelectorAll('.card-craft-type').forEach(card => {
    card.addEventListener('click', () => {
      const cat = card.dataset.cat;
      if (cat) {
        filterState.category = cat;
        syncModalUI();
        renderFeed();
        feedListEl?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        const names = { pottery: 'Pottery & Clay 🏺', handloom: 'Handloom Weaves 🧵', wood: 'Wood & Inlay 🪵', brass: 'Brass & Dhokra 🔱' };
        window.showToast?.(`Filtering by ${names[cat] || cat}`);
      }
    });
  });

  // Filter Modal Controls
  container.querySelector('#btn-filter-settings')?.addEventListener('click', () => {
    syncModalUI();
    filterModal?.classList.add('active');
  });

  container.querySelector('#btn-close-filter-modal')?.addEventListener('click', () => {
    filterModal?.classList.remove('active');
  });

  filterModal?.addEventListener('click', (e) => {
    if (e.target === filterModal) {
      filterModal.classList.remove('active');
    }
  });

  // Modal Filter Chips
  container.querySelectorAll('.btn-modal-filter-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.dataset.type;
      const val = btn.dataset.value;
      if (type === 'cat') filterState.category = val;
      if (type === 'price') filterState.priceRange = val;
      if (type === 'avail') filterState.availability = val;
      syncModalUI();
    });
  });

  checkboxGiOnly?.addEventListener('change', (e) => {
    filterState.giOnly = e.target.checked;
  });

  selectFilterSort?.addEventListener('change', (e) => {
    filterState.sort = e.target.value;
  });

  container.querySelector('#btn-reset-filters')?.addEventListener('click', () => {
    resetAllFilters();
    filterModal?.classList.remove('active');
  });

  container.querySelector('#btn-apply-filters')?.addEventListener('click', () => {
    filterModal?.classList.remove('active');
    syncDiscoveryRadarUI();
    renderFeed();
    feedListEl?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    const count = getFilteredCrafts().length;
    window.showToast?.(`Applied filters • ${count} crafts found`);
  });

  container.querySelector('#btn-clear-all-filters')?.addEventListener('click', resetAllFilters);

  // Voice Search
  container.querySelector('#btn-voice-search')?.addEventListener('click', () => {
    window.showToast?.('🎙️ Voice Search listening in Hindi & English...');
    AudioAssistance.speak("आप कौन सा हस्तशिल्प ढूंढ रहे हैं? मिट्टी, सिल्क, या पीतल?", "hi-IN");
    setTimeout(() => {
      if (marketSearchInput) {
        marketSearchInput.value = 'Terracotta';
        filterState.query = 'Terracotta';
        if (btnClearSearch) btnClearSearch.style.display = 'flex';
        renderFeed();
        feedListEl?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.showToast?.('🎙️ "Terracotta" searched by voice!');
      }
    }, 1800);
  });

  container.querySelector('#btn-copy-coupon')?.addEventListener('click', () => {
    navigator.clipboard?.writeText('UTSAV20');
    window.showToast?.('Coupon UTSAV20 copied to clipboard! 📋');
  });

  container.querySelector('#btn-claim-explore')?.addEventListener('click', () => {
    window.showToast?.('Coupon UTSAV20 activated! Enjoy 20% discount on Heritage Season crafts.');
  });

  container.querySelector('#btn-listen-story')?.addEventListener('click', () => {
    window.showArtisanStoryModal?.({
      name: 'Ramdev Kumhar',
      avatar: '/assets/artisan_ramulu.jpg',
      pehchanId: 'UP-VAR-49281',
      cluster: 'Varanasi Clay Cluster, UP',
      trustScore: 98,
      craft: 'Master Terracotta Potter',
      story: 'नमस्ते। मैं रामदेव कुम्हार। चुनार क्लस्टर में हमारी पांच पीढ़ियों से पवित्र नदी की गाद मिट्टी से सुराही और पारंपरिक घड़े गढ़े जा रहे हैं। यह पात्र बिना बिजली के पानी को अमृत जैसा शीतल और प्राकृतिक रूप से क्षारीय रखता है।'
    });
  });

  container.querySelector('#btn-direct-talk')?.addEventListener('click', () => {
    window.navigateToScreen('chat');
  });

  // Initial feed render
  renderFeed();
}
