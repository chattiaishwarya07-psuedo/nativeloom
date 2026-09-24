/**
 * Screen 4: Artisan Studio & Dashboard with Trust Score Modal
 * Pixel-perfect recreation of User Provided Reference Screenshot (media_1790279093037.png)
 */

import { State } from '../state.js';
import { AudioAssistance } from '../speech.js';

export function renderStudioScreen(container) {
  container.innerHTML = `
    <div class="studio-screen animate-fade-in" style="padding-bottom: 24px;">
      
      <!-- Top Step Indicator Row -->
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
        <span style="font-size:0.75rem; font-weight:800; color:#7A2813; letter-spacing:0.04em;">
          STEP 4 OF 4 • ARTISAN STUDIO &amp; DASHBOARD
        </span>
        <button type="button" style="width:28px; height:28px; border-radius:50%; background:#6B1D0F; color:#FFFFFF; border:none; display:flex; align-items:center; justify-content:center; cursor:pointer;" title="Artisan Profile">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
        </button>
      </div>

      <!-- Stepper Progress Bar (Gradient Brown to Dark Green) -->
      <div style="width:100%; height:4px; background:#E5DAC8; border-radius:var(--radius-pill); overflow:hidden; margin-bottom:14px;">
        <div style="width:100%; height:100%; background:linear-gradient(90deg, #7A2813 0%, #1F4E3A 100%);"></div>
      </div>

      <!-- Artisan Profile Hero Card -->
      <div style="background:#FFFFFF; border:1px solid var(--border-subtle); border-radius:var(--radius-lg); padding:14px; margin-bottom:12px; display:flex; align-items:center; gap:12px; box-shadow:var(--shadow-sm);">
        <div style="position:relative; width:64px; height:64px; flex-shrink:0;">
          <img src="/assets/artisan_ramulu.jpg" alt="Ramdev Kumhar" style="width:100%; height:100%; object-fit:cover; border-radius:var(--radius-md);" onerror="this.src='/assets/artisan_budhram.jpg'">
          <div style="position:absolute; bottom:-3px; right:-3px; width:20px; height:20px; border-radius:50%; background:#1E6B47; color:#FFFFFF; display:flex; align-items:center; justify-content:center; border:2px solid #FFFFFF;">
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
        </div>
        <div style="flex:1;">
          <div style="font-size:1.15rem; font-weight:800; color:var(--text-primary); margin-bottom:2px;">
            Ramdev Kumhar
          </div>
          <div style="display:flex; align-items:center; gap:4px; font-size:0.75rem; color:#873413; font-weight:700; margin-bottom:2px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
            Verified Master Artisan
          </div>
          <div style="font-size:0.72rem; color:var(--text-muted); margin-bottom:2px;">
            Pehchan #UP-VAR-49281
          </div>
          <div style="display:flex; align-items:center; gap:4px; font-size:0.72rem; color:var(--text-secondary);">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            Varanasi Clay Cluster, UP
          </div>
        </div>
      </div>

      <!-- Flawless Trust Score Card (Opens breakdown modal) -->
      <div style="background:#FFFFFF; border:1px solid var(--border-subtle); border-radius:var(--radius-lg); padding:14px; margin-bottom:12px; box-shadow:var(--shadow-sm); cursor:pointer;" id="btn-open-trust-modal">
        <div style="display:flex; align-items:center; gap:14px; margin-bottom:10px;">
          <!-- Circular Gauge 98 / 100 -->
          <div style="position:relative; width:52px; height:52px; flex-shrink:0;">
            <svg viewBox="0 0 36 36" width="52" height="52">
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#E5DAC8" stroke-width="3" />
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#1E6B47" stroke-width="3" stroke-dasharray="98, 100" stroke-linecap="round" />
            </svg>
            <div style="position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; line-height:1;">
              <span style="font-size:0.88rem; font-weight:900; color:#174332;">98</span>
              <span style="font-size:0.55rem; color:var(--text-muted); font-weight:700;">/100</span>
            </div>
          </div>
          
          <div style="flex:1;">
            <div style="font-size:0.95rem; font-weight:800; color:var(--text-primary); margin-bottom:3px;">
              Flawless Trust Score
            </div>
            <div style="font-size:0.72rem; color:var(--text-secondary); line-height:1.35;">
              0% platform fee • Instant India Post daily pickups unlocked
            </div>
          </div>
        </div>

        <div style="text-align:center; padding-top:6px; border-top:1px dashed var(--divider);">
          <span style="font-size:0.78rem; font-weight:700; color:#873413; text-decoration:none;">See how</span>
        </div>
      </div>

      <!-- Urgent Order Incoming Card -->
      <div style="border-radius:var(--radius-lg); overflow:hidden; margin-bottom:12px; box-shadow:var(--shadow-md); border:1px solid var(--border-subtle);">
        <!-- Terracotta Header -->
        <div style="background:#7A2813; color:#FFFFFF; padding:10px 14px; display:flex; justify-content:space-between; align-items:center;">
          <div style="display:flex; align-items:center; gap:8px; font-size:0.88rem; font-weight:800;">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="13" x="1" y="3" rx="2"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
            Urgent Order Incoming
          </div>
          <div style="display:flex; align-items:center; gap:4px; font-size:0.72rem; opacity:0.85; font-weight:600;">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            14m ago
          </div>
        </div>

        <!-- White Card Body -->
        <div style="background:#FFFFFF; padding:14px;">
          <div style="display:flex; gap:12px; margin-bottom:12px;">
            <img src="/assets/terracotta_pitcher.jpg" alt="Hand-Carved Terracotta Pitcher" style="width:68px; height:68px; object-fit:cover; border-radius:var(--radius-md); border:1px solid var(--border-subtle);" onerror="this.src='/assets/raw_pottery_snap.jpg'">
            <div style="flex:1;">
              <div style="font-size:0.92rem; font-weight:800; color:var(--text-primary); margin-bottom:6px;">
                Hand-Carved Terracotta Pit...
              </div>
              <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap; margin-bottom:6px;">
                <span style="background:#FEECE5; color:#9A3412; font-size:0.68rem; font-weight:800; padding:2px 8px; border-radius:var(--radius-pill);">
                  2 Units
                </span>
                <span style="font-size:0.88rem; font-weight:900; color:var(--text-primary);">
                  ₹1,450
                </span>
                <span style="background:#E7F4ED; color:#1E6B47; font-size:0.68rem; font-weight:800; padding:2px 8px; border-radius:var(--radius-pill); display:inline-flex; align-items:center; gap:3px;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  Prepaid UPI
                </span>
              </div>
              <div style="display:flex; align-items:center; gap:4px; font-size:0.72rem; color:var(--text-secondary);">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                Destination: Bengaluru, KA (Speed Post)
              </div>
            </div>
          </div>

          <!-- Accept & Pack Button -->
          <button type="button" class="btn-primary" id="btn-accept-pack" style="width:100%; background:#7A2813; color:#FFFFFF; border:none; border-radius:var(--radius-md); padding:12px; font-size:0.85rem; font-weight:800; display:flex; align-items:center; justify-content:center; gap:8px; cursor:pointer;">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
            Accept &amp; Pack (Pickup Today 3 PM)
          </button>
        </div>
      </div>

      <!-- Bank of Baroda Card -->
      <div style="background:#FFFFFF; border:1px solid var(--border-subtle); border-radius:var(--radius-lg); padding:14px; margin-bottom:12px; box-shadow:var(--shadow-sm);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
          <div style="display:flex; align-items:center; gap:8px;">
            <div style="width:28px; height:28px; border-radius:6px; background:#1C3550; color:#FFFFFF; display:flex; align-items:center; justify-content:center;">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="21" x2="21" y2="21"/><line x1="3" y1="10" x2="21" y2="10"/><polyline points="5 6 12 3 19 6"/><line x1="4" y1="10" x2="4" y2="21"/><line x1="20" y1="10" x2="20" y2="21"/><line x1="8" y1="14" x2="8" y2="17"/><line x1="12" y1="14" x2="12" y2="17"/><line x1="16" y1="14" x2="16" y2="17"/></svg>
            </div>
            <div>
              <span style="font-size:0.85rem; font-weight:800; color:var(--text-primary);">Bank of Baroda</span>
              <span style="font-size:0.75rem; color:var(--text-muted); margin-left:6px;">•••• 4012</span>
            </div>
          </div>
          <span style="background:#E7F4ED; color:#1E6B47; font-size:0.65rem; font-weight:800; padding:2px 8px; border-radius:var(--radius-pill);">
            Active
          </span>
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:12px; background:#FAF7F2; border-radius:var(--radius-md); padding:10px 12px;">
          <div>
            <div style="display:flex; align-items:center; gap:4px; font-size:0.68rem; font-weight:700; color:var(--text-muted); margin-bottom:2px;">
              TOTAL EARNINGS
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1E6B47" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
            </div>
            <div style="font-size:1.25rem; font-weight:900; color:var(--text-primary); margin-bottom:2px;">₹48,500</div>
            <div style="font-size:0.68rem; color:#1E6B47; font-weight:700;">+18% this month</div>
          </div>

          <div>
            <div style="display:flex; align-items:center; gap:4px; font-size:0.68rem; font-weight:700; color:var(--text-muted); margin-bottom:2px;">
              NEXT TRANSFER
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#873413" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.93 19.07A10 10 0 0 1 19.07 4.93"/><path d="M7.76 16.24a6 6 0 0 1 8.48-8.48"/></svg>
            </div>
            <div style="font-size:1.25rem; font-weight:900; color:#873413; margin-bottom:2px;">₹4,350</div>
            <div style="font-size:0.68rem; color:var(--text-muted);">Tomorrow, 12:00 PM</div>
          </div>
        </div>

        <a href="javascript:void(0)" onclick="window.navigateToScreen('bank')" style="display:flex; align-items:center; gap:4px; font-size:0.75rem; font-weight:700; color:#873413; text-decoration:none;">
          View Passbook &amp; Batch Settlements →
        </a>
      </div>

      <!-- AI Suggestions Card -->
      <div style="background:#FFFDF8; border:1px solid #FDE68A; border-radius:var(--radius-lg); padding:14px; margin-bottom:14px; box-shadow:var(--shadow-sm);">
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:6px;">
          <div style="width:26px; height:26px; border-radius:6px; background:#D97706; color:#FFFFFF; display:flex; align-items:center; justify-content:center;">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
          </div>
          <span style="font-size:0.7rem; font-weight:800; color:#D97706; letter-spacing:0.04em;">AI SUGGESTIONS</span>
        </div>

        <div style="font-size:0.95rem; font-weight:800; color:var(--text-primary); margin-bottom:6px; display:flex; align-items:center; gap:4px;">
          Festive Surge: +45% Demand for Diwali ✨
        </div>

        <p style="font-size:0.75rem; color:var(--text-secondary); line-height:1.4; margin-bottom:12px;">
          Many buyers from Delhi and Mumbai want festive clay pots and diyas right now. Make <strong>40 more surahis and diyas</strong> on your wheel this week.
        </p>

        <div style="display:flex; gap:8px;">
          <button type="button" class="btn-secondary" style="flex:1; border:1px solid var(--border-subtle); background:#FFFFFF; padding:8px 12px; font-size:0.75rem; font-weight:700; color:var(--text-primary); display:flex; align-items:center; justify-content:center; gap:6px;" onclick="window.showToast('AI Price Analysis: Target price ₹320-₹350/set recommended for peak festive margins.')">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
            Request Price Analysis
          </button>
          <button type="button" class="btn-secondary" style="width:38px; border:1px solid var(--border-subtle); background:#FFFFFF; padding:0; display:flex; align-items:center; justify-content:center; color:#873413;" onclick="window.AudioAssistance.speak('दिवाली के लिए मांग 45 प्रतिशत बढ़ गई है। इस सप्ताह अपने चाक पर 40 और सुराही और दीये बनाएं।')">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
          </button>
        </div>
      </div>

      <!-- Active Crafts Section -->
      <div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:2px;">
        <span style="font-size:1.05rem; font-weight:800; color:var(--text-primary);">Active Crafts</span>
        <a href="javascript:void(0)" onclick="window.navigateToScreen('explore')" style="font-size:0.75rem; font-weight:700; color:#873413; text-decoration:none;">Manage All &gt;</a>
      </div>
      <div style="font-size:0.72rem; color:var(--text-muted); margin-bottom:12px;">
        6 items currently listed in marketplace
      </div>

      <!-- 2-Column Craft Cards -->
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:14px;">
        
        <!-- Craft 1: Handcrafted Diyas -->
        <div style="background:#FFFFFF; border:1px solid var(--border-subtle); border-radius:var(--radius-md); overflow:hidden; box-shadow:var(--shadow-sm); cursor:pointer;" onclick="window.navigateToScreen('product_details')">
          <div style="position:relative; width:100%; height:130px;">
            <img src="/assets/handcrafted_diyas.jpg" alt="Handcrafted Diyas" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='/assets/blue_pottery.jpg'">
            <span style="position:absolute; top:6px; left:6px; background:#1F4E3A; color:#FFFFFF; font-size:0.6rem; font-weight:800; padding:2px 6px; border-radius:var(--radius-pill);">
              • Ready (18)
            </span>
          </div>
          <div style="padding:8px 10px;">
            <div style="font-size:0.8rem; font-weight:800; color:var(--text-primary); margin-bottom:4px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
              Handcrafted Diyas (...
            </div>
            <div style="display:flex; justify-content:space-between; align-items:baseline;">
              <span style="font-size:0.92rem; font-weight:900; color:var(--text-primary);">₹320</span>
              <span style="font-size:0.68rem; color:var(--text-muted); font-weight:600;">12 sold</span>
            </div>
          </div>
        </div>

        <!-- Craft 2: Decorative Clay Wall Plate -->
        <div style="background:#FFFFFF; border:1px solid var(--border-subtle); border-radius:var(--radius-md); overflow:hidden; box-shadow:var(--shadow-sm); cursor:pointer;" onclick="window.navigateToScreen('product_details')">
          <div style="position:relative; width:100%; height:130px;">
            <img src="/assets/clay_wall_plate.jpg" alt="Decorative Clay Wall Plate" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='/assets/woodcraft_bowl.jpg'">
            <span style="position:absolute; top:6px; left:6px; background:#C2410C; color:#FFFFFF; font-size:0.6rem; font-weight:800; padding:2px 6px; border-radius:var(--radius-pill);">
              • Low Stock (3)
            </span>
          </div>
          <div style="padding:8px 10px;">
            <div style="font-size:0.8rem; font-weight:800; color:var(--text-primary); margin-bottom:4px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
              Decorative Clay Wall ...
            </div>
            <div style="display:flex; justify-content:space-between; align-items:baseline;">
              <span style="font-size:0.92rem; font-weight:900; color:var(--text-primary);">₹850</span>
              <span style="font-size:0.68rem; color:var(--text-muted); font-weight:600;">9 sold</span>
            </div>
          </div>
        </div>

      </div>

      <!-- Add New Craft Button (Terracotta Pill) -->
      <div style="background:#7A2813; color:#FFFFFF; border-radius:var(--radius-pill); padding:10px 16px; display:flex; align-items:center; justify-content:space-between; cursor:pointer; box-shadow:var(--shadow-md);" onclick="window.navigateToScreen('craft_studio')" id="btn-add-new-craft">
        <div style="display:flex; align-items:center; gap:10px;">
          <div style="width:34px; height:34px; border-radius:50%; background:rgba(255,255,255,0.2); display:flex; align-items:center; justify-content:center; font-size:1.3rem; font-weight:900;">
            +
          </div>
          <div>
            <div style="font-size:0.92rem; font-weight:800;">Add New Craft</div>
            <div style="font-size:0.68rem; opacity:0.85;">Voice &amp; Photo Listing Flow</div>
          </div>
        </div>
        <div style="display:flex; align-items:center; gap:12px; opacity:0.9;">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
        </div>
      </div>

    </div>

    <!-- Bottom Sheet Modal: Artisan Trust Score Breakdown (Screenshot 5 Modal) -->
    <div class="modal-overlay ${State.trustScoreModalOpen ? 'active' : ''}" id="modal-trust-score">
      <div class="bottom-sheet">
        
        <!-- Sheet Header -->
        <div class="sheet-header">
          <div class="sheet-title-group">
            <div style="width:32px; height:32px; border-radius:8px; background:#E8F5EE; display:flex; align-items:center; justify-content:center; color:var(--color-green);">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <div>
              <div style="font-size:0.95rem; font-weight:800; color:var(--text-primary);">Artisan Trust Score Breakdown</div>
              <div style="font-size:0.7rem; color:var(--color-terracotta); font-weight:700;">Ministry of Textiles Pehchan Verified</div>
            </div>
          </div>
          <button type="button" class="sheet-close-btn" id="btn-close-trust-sheet">✕</button>
        </div>

        <!-- Green Hero Score Card -->
        <div class="trust-score-hero-card">
          <div class="score-badge-circle">98</div>
          <div class="score-hero-details">
            <div class="score-hero-headline">
              98/100 • Exceptional Master
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#4ADE80"><path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.74-5.25z" clip-rule="evenodd" /></svg>
            </div>
            <div class="score-hero-perks">
              0% marketplace fee + instant India Post daily pickups unlocked
            </div>
          </div>
        </div>

        <!-- 4 Score Categories Breakdown List -->
        <div class="score-categories-list">
          
          <div class="score-category-item">
            <div class="score-cat-title">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-green)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              Verified identity
            </div>
            <span class="score-cat-points">30 / 30 pts</span>
          </div>

          <div class="score-category-item">
            <div class="score-cat-title">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-green)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="13" x="1" y="3" rx="2"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
              Delivery reliability
            </div>
            <span class="score-cat-points">35 / 35 pts</span>
          </div>

          <div class="score-category-item">
            <div class="score-cat-title">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D97706" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
              Buyer Reviews &amp; Order Acceptance
            </div>
            <span class="score-cat-points amber">18 / 20 pts</span>
          </div>

          <div class="score-category-item">
            <div class="score-cat-title">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-green)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
              Craft Quality
            </div>
            <span class="score-cat-points">15 / 15 pts</span>
          </div>

        </div>

        <!-- Karigra Protection Disclaimer -->
        <div class="protection-disclaimer-box">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0; margin-top:2px;"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          <div>
            <strong>Karigra Protection:</strong> Unpredictable weather or carrier delays outside your Varanasi studio never lower your trust score.
          </div>
        </div>

      </div>
    </div>
  `;

  // Attach Handlers
  const modal = container.querySelector('#modal-trust-score');
  
  container.querySelector('#btn-open-trust-modal').addEventListener('click', () => {
    modal.classList.add('active');
    AudioAssistance.playTrustScore();
  });

  container.querySelector('#btn-close-trust-sheet').addEventListener('click', () => {
    modal.classList.remove('active');
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });

  // Urgent order button
  container.querySelector('#btn-accept-pack').addEventListener('click', () => {
    State.urgentOrder.accepted = true;
    window.showToast?.("Order accepted! Pickup scheduled with India Post Speed Post for today 3 PM.");
    setTimeout(() => {
      State.setScreen('orders');
    }, 600);
  });
}
