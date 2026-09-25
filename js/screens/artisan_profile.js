/**
 * Artisan Screen: Profile & Account Settings
 * (Role: ARTISAN only)
 * Includes official Pehchan Card details, trust credentials, and
 * the explicit "Log Out / Switch Account" action to return to pre-auth.
 */

import { State } from '../state.js';

export function renderArtisanProfileScreen(container) {
  const a = State.artisan;

  container.innerHTML = `
    <div class="artisan-profile-screen animate-fade-in" style="padding-bottom: 30px;">
      
      <!-- Top Title -->
      <h1 style="font-size:1.25rem; font-weight:900; color:var(--text-primary); margin:0 0 14px 0;">
        Artisan Profile &amp; Settings
      </h1>

      <!-- Pehchan Identity Card -->
      <div style="background:linear-gradient(135deg, #174332 0%, #1E6B47 100%); color:#FFFFFF; border-radius:var(--radius-xl); padding:16px; margin-bottom:16px; box-shadow:var(--shadow-md);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
          <div style="font-size:0.7rem; font-weight:800; letter-spacing:0.1em; opacity:0.9;">
            MINISTRY OF TEXTILES • GOVT OF INDIA
          </div>
          <span style="background:rgba(255,255,255,0.2); padding:2px 8px; border-radius:var(--radius-pill); font-size:0.62rem; font-weight:800;">
            ACTIVE PEHCHAN
          </span>
        </div>

        <div style="display:flex; gap:12px; align-items:center; margin-bottom:14px;">
          <img src="/assets/artisan_ramulu.jpg" alt="Ramdev Kumhar" style="width:58px; height:58px; border-radius:12px; object-fit:cover; border:2px solid #FFFFFF;" onerror="this.src='/assets/artisan_budhram.jpg'">
          <div>
            <div style="font-size:1.15rem; font-weight:900;">${a.artisanName}</div>
            <div style="font-size:0.75rem; opacity:0.9;">Master Potter &amp; Clay Sculptor</div>
            <div style="font-size:0.72rem; font-family:monospace; font-weight:800; opacity:0.85;">Pehchan: ${a.pehchanId}</div>
          </div>
        </div>

        <div style="background:rgba(0,0,0,0.15); border-radius:var(--radius-md); padding:8px 10px; font-size:0.7rem; display:flex; justify-content:space-between;">
          <span>Cluster: <strong>${a.cluster}</strong></span>
          <span>GI Tag: <strong>${a.giTag}</strong></span>
        </div>
      </div>

      <!-- Trust & DBT Overview -->
      <div style="background:#FFFFFF; border:1px solid var(--border-subtle); border-radius:var(--radius-lg); padding:14px; margin-bottom:16px; box-shadow:var(--shadow-sm);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
          <span style="font-size:0.82rem; font-weight:800; color:var(--text-primary);">Trust Score &amp; Perks</span>
          <span style="font-size:0.88rem; font-weight:900; color:#1E6B47;">98 / 100</span>
        </div>
        <p style="font-size:0.72rem; color:var(--text-secondary); margin:0 0 10px 0; line-height:1.4;">
          0% platform fee and instant Delivery Agent daily studio pickups unlocked. Your score is protected by Native Loom guarantee against transport delays.
        </p>
        <div style="font-size:0.72rem; color:var(--text-primary); font-weight:700;">
          Direct Bank Linking: <span style="color:#1E6B47;">${a.bankName} (${a.bankAccountMasked}) Active ✓</span>
        </div>
      </div>

      <!-- Audio Settings -->
      <div style="background:#FFFFFF; border:1px solid var(--border-subtle); border-radius:var(--radius-lg); padding:14px; margin-bottom:20px; box-shadow:var(--shadow-sm);">
        <div style="font-size:0.82rem; font-weight:800; color:var(--text-primary); margin-bottom:8px;">
          Accessibility &amp; Dialect
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span style="font-size:0.75rem; color:var(--text-secondary);">Preferred Spoken Dialect</span>
          <button type="button" class="btn-secondary" onclick="window.navigateToScreen('language_select')" style="font-size:0.72rem; font-weight:800; padding:4px 10px;">
            Hindi (North India) ▾
          </button>
        </div>
      </div>

      <!-- DELIBERATE LOGOUT & SWITCH ACCOUNT BUTTON -->
      <div style="background:#FFF9F5; border:1.5px dashed #EADBCE; border-radius:var(--radius-lg); padding:16px; text-align:center;">
        <div style="font-size:0.85rem; font-weight:800; color:var(--text-primary); margin-bottom:4px;">
          Switch Account or Exit Studio
        </div>
        <p style="font-size:0.72rem; color:var(--text-secondary); margin:0 0 12px 0;">
          To access Native Loom as an individual buyer or corporate B2B procurement officer, you must log out of this artisan session first.
        </p>

        <button type="button" id="btn-artisan-logout" style="width:100%; background:#7A2813; color:#FFFFFF; border:none; padding:12px; font-size:0.85rem; font-weight:800; border-radius:var(--radius-md); cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
          <span>Log Out &amp; Switch Account</span>
        </button>
      </div>

    </div>
  `;

  // Attach logout handler
  container.querySelector('#btn-artisan-logout').addEventListener('click', () => {
    if (confirm("Log out of Artisan Studio? You will return to the role selection screen.")) {
      window.showToast?.("Artisan session ended. Please select an account type.");
      State.logout();
    }
  });
}
