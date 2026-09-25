/**
 * Buyer Screen: Profile & Settings
 * (Role: BUYER only)
 * Includes saved shipping address, consumer patronage statistics,
 * and the deliberate "Log Out / Switch Account" action to return to pre-auth.
 */

import { State } from '../state.js';

export function renderBuyerProfileScreen(container) {
  const p = State.buyer.profile;
  const ordersCount = State.buyer.myOrders.length;

  container.innerHTML = `
    <div class="buyer-profile-screen animate-fade-in" style="padding-bottom: 30px;">
      
      <!-- Top Title -->
      <h1 style="font-size:1.25rem; font-weight:900; color:var(--text-primary); margin:0 0 14px 0;">
        Patron Profile &amp; Settings
      </h1>

      <!-- Buyer Card -->
      <div style="background:linear-gradient(135deg, #1C3550 0%, #2A4D73 100%); color:#FFFFFF; border-radius:var(--radius-xl); padding:16px; margin-bottom:16px; box-shadow:var(--shadow-md);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
          <span style="font-size:0.68rem; font-weight:800; letter-spacing:0.1em; opacity:0.9;">
            VERIFIED CRAFT PATRON
          </span>
          <span style="background:rgba(255,255,255,0.2); padding:2px 8px; border-radius:var(--radius-pill); font-size:0.62rem; font-weight:800;">
            ${ordersCount} Crafts Collected
          </span>
        </div>

        <div style="display:flex; gap:12px; align-items:center;">
          <div style="width:52px; height:52px; border-radius:50%; background:rgba(255,255,255,0.2); display:flex; align-items:center; justify-content:center; font-size:1.6rem; border:2px solid #FFFFFF;">
            👩
          </div>
          <div>
            <div style="font-size:1.15rem; font-weight:900;">${p.name}</div>
            <div style="font-size:0.75rem; opacity:0.9;">${p.phone}</div>
            <div style="font-size:0.72rem; opacity:0.85;">${p.city}, ${p.state} - ${p.pincode}</div>
          </div>
        </div>
      </div>

      <!-- Saved Delivery Address -->
      <div style="background:#FFFFFF; border:1px solid var(--border-subtle); border-radius:var(--radius-lg); padding:14px; margin-bottom:14px; box-shadow:var(--shadow-sm);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <span style="font-size:0.82rem; font-weight:800; color:var(--text-primary);">Default Shipping Address</span>
          <span style="font-size:0.65rem; font-weight:800; color:#1E6B47; background:#E7F4ED; padding:2px 6px; border-radius:var(--radius-pill);">Delivery Agent Verified</span>
        </div>
        <div style="font-size:0.76rem; color:var(--text-secondary); line-height:1.4;">
          ${p.savedAddresses[0].line}<br>
          ${p.savedAddresses[0].city}, ${p.savedAddresses[0].state} - ${p.savedAddresses[0].pincode}
        </div>
      </div>

      <!-- Impact & Protection Summary -->
      <div style="background:#FFFFFF; border:1px solid var(--border-subtle); border-radius:var(--radius-lg); padding:14px; margin-bottom:20px; box-shadow:var(--shadow-sm);">
        <div style="font-size:0.82rem; font-weight:800; color:var(--text-primary); margin-bottom:6px;">
          Patronage Impact
        </div>
        <div style="font-size:0.74rem; color:var(--text-secondary); line-height:1.4;">
          100% of your product payments have been transferred directly to verified cluster artisans via RBI Direct Benefit Transfer (DBT) with zero intermediary platform fees.
        </div>
      </div>

      <!-- DELIBERATE LOGOUT & SWITCH ACCOUNT BUTTON -->
      <div style="background:#FFF9F5; border:1.5px dashed #EADBCE; border-radius:var(--radius-lg); padding:16px; text-align:center;">
        <div style="font-size:0.85rem; font-weight:800; color:var(--text-primary); margin-bottom:4px;">
          Switch Account or Sign Out
        </div>
        <p style="font-size:0.72rem; color:var(--text-secondary); margin:0 0 12px 0;">
          To access the Artisan Studio portal or Institutional Corporate B2B procurement, please log out of this patron session first.
        </p>

        <button type="button" id="btn-buyer-logout" style="width:100%; background:#1C3550; color:#FFFFFF; border:none; padding:12px; font-size:0.85rem; font-weight:800; border-radius:var(--radius-md); cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
          <span>Log Out &amp; Switch Account</span>
        </button>
      </div>

    </div>
  `;

  // Attach logout handler
  container.querySelector('#btn-buyer-logout').addEventListener('click', () => {
    if (confirm("Log out of Patron account? You will return to the role selection screen.")) {
      window.showToast?.("Patron session ended. Please select an account type.");
      State.logout();
    }
  });
}
