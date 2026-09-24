/**
 * Screen 4: Cart Review (Craft Direct Order)
 * Exact recreation of User Provided Reference Screenshot (Screen 4)
 */

import { State } from '../state.js';
import { AudioAssistance } from '../speech.js';

export function renderCartReviewScreen(container) {
  container.innerHTML = `
    <div class="cart-review-screen animate-fade-in" style="padding-bottom:24px;">
      
      <!-- Top Cart Meta Badge -->
      <div style="margin-top:10px;">
        <span class="badge-amber" style="background:#FEECE5; color:#9A3412; font-size:0.68rem; font-weight:800; padding:3px 8px;">
          🧺 CART REVIEW
        </span>
      </div>

      <!-- Title & 2 Items Pill -->
      <div style="display:flex; justify-content:space-between; align-items:center; margin:8px 0 4px;">
        <h1 style="font-size:1.35rem; font-weight:900; color:var(--text-primary); margin:0;">
          Craft Direct Order
        </h1>
        <span style="font-size:0.75rem; font-weight:800; background:#EFE8DC; color:var(--text-secondary); padding:3px 10px; border-radius:var(--radius-pill);">
          2 Items
        </span>
      </div>
      <p style="font-size:0.78rem; color:var(--text-secondary); line-height:1.35; margin-bottom:14px;">
        Review each artisan's direct parcel before dispatch.
      </p>

      <!-- Spoken Cart Summary Card -->
      <div style="background:#FFFDF9; border:1px solid var(--border-subtle); border-radius:var(--radius-lg); padding:12px; margin-bottom:14px; box-shadow:var(--shadow-sm);">
        <div style="display:flex; gap:10px; align-items:center; margin-bottom:8px;">
          <button type="button" id="btn-spoken-cart" style="width:38px; height:38px; border-radius:10px; background:#C2541A; color:#fff; display:flex; align-items:center; justify-content:center; border:none; cursor:pointer; flex-shrink:0;">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
          </button>
          <div style="flex:1;">
            <div style="font-size:0.82rem; font-weight:800; color:var(--text-primary);">Spoken Cart Summary</div>
            <div style="font-size:0.68rem; color:var(--text-muted);">Hindi &amp; Regional Guild Dialect</div>
          </div>
          <span class="badge-amber" style="font-size:0.65rem;">1:12 MIN</span>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; height:20px; padding:0 8px; margin-bottom:6px;">
          ${Array(20).fill(0).map(() => '<span style="width:3px; height:60%; background:#C27E5D; border-radius:1px;"></span>').join('')}
        </div>

        <div style="font-size:0.68rem; color:var(--color-terracotta); font-weight:700; text-align:center;">
          👆 Tap to listen to cart breakdown &amp; delivery schedules
        </div>
      </div>

      <!-- Parcel 1: Ramdev Kumhar -->
      <div class="parcel-card">
        <div class="parcel-header">
          <div style="display:flex; align-items:center; gap:6px;">
            <span style="font-size:1rem;">🛡️</span>
            <div>
              <div class="parcel-artisan-name">Ramdev Kumhar</div>
              <div style="font-size:0.65rem; color:var(--text-muted); font-family:monospace;">PEHCHAN #UP-VAR-492</div>
            </div>
          </div>
          <span class="badge-subtle" style="font-size:0.62rem;">Varanasi Hub</span>
        </div>

        <div class="parcel-item-row">
          <img src="/assets/raw_pottery_snap.jpg" alt="Terracotta Pitcher" class="parcel-item-img">
          <div style="flex:1;">
            <div style="font-size:0.85rem; font-weight:800; color:var(--text-primary);">Hand-Etched Terracotta Pitcher</div>
            <div style="font-size:0.7rem; color:var(--text-muted); margin-bottom:4px;">Capacity: 1.8 Liters • Clay Fired</div>
            <div style="font-size:0.95rem; font-weight:900; color:var(--text-primary);">₹750</div>
          </div>
          <div style="font-size:0.75rem; color:var(--text-secondary); font-weight:700;">Qty: 1</div>
        </div>

        <div class="direct-payout-chip">
          <span>💵</span>
          <span>Direct to Ramdev's account: <strong>₹750 (0% middleman)</strong></span>
        </div>

        <div style="font-size:0.72rem; color:var(--text-secondary); margin-bottom:8px;">
          🚚 Dispatches in <strong>24 hrs</strong> via India Post Speed Post
        </div>

        <button type="button" style="background:none; border:none; font-size:0.72rem; color:var(--color-terracotta); font-weight:700; cursor:pointer; padding:0;" onclick="window.navigateToScreen('explore')">
          + Add more pieces from Ramdev's workshop
        </button>
      </div>

      <!-- Parcel 2: Somnath Baghel -->
      <div class="parcel-card">
        <div class="parcel-header">
          <div style="display:flex; align-items:center; gap:6px;">
            <span style="font-size:1rem;">🛡️</span>
            <div>
              <div class="parcel-artisan-name">Somnath Baghel</div>
              <div style="font-size:0.65rem; color:var(--text-muted); font-family:monospace;">PEHCHAN #CG-BST-118</div>
            </div>
          </div>
          <span class="badge-subtle" style="font-size:0.62rem;">Bastar Guild</span>
        </div>

        <div class="parcel-item-row">
          <img src="/assets/dhokra_brass.jpg" alt="Dhokra Brass Nandi" class="parcel-item-img">
          <div style="flex:1;">
            <div style="font-size:0.85rem; font-weight:800; color:var(--text-primary);">Dhokra Brass Tribal Nandi</div>
            <div style="font-size:0.7rem; color:var(--text-muted); margin-bottom:4px;">Solid Brass • Lost-Wax Casting</div>
            <div style="font-size:0.95rem; font-weight:900; color:var(--text-primary);">₹920</div>
          </div>
          <div style="font-size:0.75rem; color:var(--text-secondary); font-weight:700;">Qty: 1</div>
        </div>

        <div class="direct-payout-chip">
          <span>💵</span>
          <span>Direct to Somnath's account: <strong>₹920 (0% middleman)</strong></span>
        </div>

        <div style="font-size:0.72rem; color:var(--text-secondary); margin-bottom:8px;">
          🚚 Dispatches in <strong>48 hrs</strong> via India Post Registered Parcel
        </div>

        <button type="button" style="background:none; border:none; font-size:0.72rem; color:var(--color-terracotta); font-weight:700; cursor:pointer; padding:0;" onclick="window.navigateToScreen('explore')">
          + Add more pieces from Somnath's workshop
        </button>
      </div>

      <!-- Payment Transparency Breakdown -->
      <div class="transparency-summary-card">
        <div style="font-size:0.85rem; font-weight:800; color:var(--text-primary); margin-bottom:10px; display:flex; align-items:center; gap:6px;">
          🧾 Payment Transparency
        </div>

        <div class="transparency-row">
          <span>Direct to Artisans</span>
          <strong>₹1,670</strong>
        </div>

        <div class="transparency-row">
          <span>India Post Subsidized Delivery</span>
          <strong style="color:var(--color-green);">FREE</strong>
        </div>

        <div class="transparency-row">
          <span>Platform Service Fee</span>
          <strong>₹0 (Non-profit)</strong>
        </div>

        <div class="transparency-total-row">
          <div>
            <div style="font-size:0.9rem; font-weight:900;">Consolidated Payable</div>
            <div style="font-size:0.65rem; color:var(--text-muted); font-weight:normal;">All taxes &amp; guild levies included</div>
          </div>
          <span style="font-size:1.35rem; font-weight:900; color:var(--color-terracotta);">₹1,670</span>
        </div>
      </div>

      <!-- 100% Direct Payout Guarantee -->
      <div style="background:#174332; color:#FFFFFF; border-radius:var(--radius-lg); padding:14px; margin-bottom:18px;">
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4ADE80" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          <span style="font-size:0.85rem; font-weight:800;">100% Direct Payout Guarantee</span>
        </div>
        <div style="font-size:0.72rem; opacity:0.9; line-height:1.35;">
          100% of purchase price transferred directly to both artisans' verified bank accounts upon dispatch. Guaranteed.
        </div>
      </div>

      <!-- Action Button -->
      <button type="button" class="btn-primary" id="btn-proceed-checkout">
        Proceed to Address &amp; Direct Checkout →
      </button>

      <div style="font-size:0.68rem; color:var(--text-muted); text-align:center; margin-top:8px;">
        🔒 Secure direct UPI / Rupay / NetBanking escrow
      </div>

    </div>
  `;

  // Spoken Cart Audio
  container.querySelector('#btn-spoken-cart').addEventListener('click', () => {
    AudioAssistance.speak(
      "आपके कार्ट में 2 शिल्प हैं: रामदेव कुम्हार की टेराकोटा सुराही ₹750 और सोमनाथ बघेल की ढोकरा नंदी ₹920। दोनों का 100% भुगतान सीधे कारीगरों के खाते में जाएगा।",
      "hi-IN"
    );
  });

  // Proceed to Checkout
  container.querySelector('#btn-proceed-checkout').addEventListener('click', () => {
    State.setScreen('checkout');
  });
}
