/**
 * Screen 4: Cart Review (Craft Direct Order)
 * Fully interactive with live state, parcel quantity increment/decrement,
 * transparent artisan margin calculations, and direct checkout link.
 */

import { State } from '../state.js';
import { AudioAssistance } from '../speech.js';

export function renderCartReviewScreen(container) {
  const items = State.cart;
  const itemCount = State.getCartCount();
  const subtotal = State.getCartSubtotal();
  const artisanShare = State.getCartArtisanShare();

  if (items.length === 0) {
    container.innerHTML = `
      <div class="cart-review-screen animate-fade-in" style="padding: 40px 16px; text-align:center;">
        <div style="width:70px; height:70px; border-radius:50%; background:#FBEBE5; color:var(--color-terracotta); display:flex; align-items:center; justify-content:center; margin: 0 auto 16px; font-size:2rem;">
          🧺
        </div>
        <h2 style="font-size:1.3rem; font-weight:900; margin-bottom:6px;">Your Craft Cart is Empty</h2>
        <p style="font-size:0.8rem; color:var(--text-secondary); max-width:280px; margin:0 auto 20px;">
          Support authentic Indian master artisans directly. Browse our verified GI-tagged craft clusters.
        </p>
        <button type="button" class="btn-primary" onclick="window.navigateToScreen('explore')" style="display:inline-flex; width:auto; padding:12px 24px; margin: 0 auto;">
          🛍️ Explore Sacred Guilds
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="cart-review-screen animate-fade-in" style="padding-bottom:24px;">
      
      <!-- Top Cart Meta Badge -->
      <div style="margin-top:10px;">
        <span class="badge-amber" style="background:#FEECE5; color:#9A3412; font-size:0.68rem; font-weight:800; padding:3px 8px;">
          🧺 DIRECT PARCEL REVIEW
        </span>
      </div>

      <!-- Title & Items Pill -->
      <div style="display:flex; justify-content:space-between; align-items:center; margin:8px 0 4px;">
        <h1 style="font-size:1.35rem; font-weight:900; color:var(--text-primary); margin:0;">
          Craft Direct Order
        </h1>
        <span style="font-size:0.75rem; font-weight:800; background:#EFE8DC; color:var(--text-secondary); padding:3px 10px; border-radius:var(--radius-pill);">
          ${itemCount} ${itemCount === 1 ? 'Item' : 'Items'} (${items.length} ${items.length === 1 ? 'Parcel' : 'Parcels'})
        </span>
      </div>
      <p style="font-size:0.78rem; color:var(--text-secondary); line-height:1.35; margin-bottom:14px;">
        Review each artisan's direct parcel before dispatch. Zero platform commission.
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
          <span class="badge-amber" style="font-size:0.65rem;">VOICE AUDIO</span>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; height:20px; padding:0 8px; margin-bottom:6px;">
          ${Array(20).fill(0).map(() => '<span style="width:3px; height:60%; background:#C27E5D; border-radius:1px;"></span>').join('')}
        </div>

        <div style="font-size:0.68rem; color:var(--color-terracotta); font-weight:700; text-align:center;">
          👆 Tap to listen to parcel breakdown &amp; delivery schedules
        </div>
      </div>

      <!-- Live Dynamic Parcels -->
      <div id="cart-parcels-container">
        ${items.map((item, idx) => `
          <div class="parcel-card" style="margin-bottom:14px;" data-cart-id="${item.id}">
            <div class="parcel-header">
              <div style="display:flex; align-items:center; gap:6px;">
                <span style="font-size:1rem;">🛡️</span>
                <div>
                  <div class="parcel-artisan-name">Parcel ${idx + 1}: ${item.artisan}</div>
                  <div style="font-size:0.65rem; color:var(--text-muted); font-family:monospace;">${item.origin}</div>
                </div>
              </div>
              <button type="button" class="btn-remove-item" data-id="${item.id}" title="Remove item" style="background:none; border:none; color:var(--text-muted); cursor:pointer; font-size:1rem; padding:2px 6px;">✕</button>
            </div>

            <div class="parcel-item-row" style="margin-bottom:8px;">
              <img src="${item.image}" alt="${item.title}" class="parcel-item-img">
              <div style="flex:1;">
                <div style="font-size:0.85rem; font-weight:800; color:var(--text-primary);">${item.title}</div>
                <div style="font-size:0.7rem; color:var(--text-muted); margin-bottom:4px;">Dispatches: ${item.leadTime || '3-5 Days'}</div>
                <div style="font-size:0.95rem; font-weight:900; color:var(--text-primary);">₹${item.price}</div>
              </div>
              
              <!-- Quantity Stepper Controls -->
              <div style="display:flex; align-items:center; gap:6px; background:#F5EFE6; border-radius:var(--radius-pill); padding:2px 6px;">
                <button type="button" class="btn-qty-minus" data-id="${item.id}" style="width:24px; height:24px; border:none; background:#FFF; border-radius:50%; font-weight:bold; cursor:pointer;">-</button>
                <span style="font-size:0.78rem; font-weight:800; min-width:18px; text-align:center;">${item.quantity}</span>
                <button type="button" class="btn-qty-plus" data-id="${item.id}" style="width:24px; height:24px; border:none; background:#FFF; border-radius:50%; font-weight:bold; cursor:pointer;">+</button>
              </div>
            </div>

            <div class="direct-payout-chip" style="margin-bottom:8px;">
              <span>💵</span>
              <span>Direct to ${item.artisan.split(' ')[0]}'s verified bank: <strong>₹${item.artisanShare * item.quantity} (100% direct)</strong></span>
            </div>

            <div style="font-size:0.72rem; color:var(--text-secondary); margin-bottom:4px;">
              🚚 Insured doorstep delivery via <strong>${item.dispatchPartner || 'India Post Speed Parcel'}</strong>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Payment Transparency Breakdown -->
      <div class="transparency-summary-card">
        <div style="font-size:0.85rem; font-weight:800; color:var(--text-primary); margin-bottom:10px; display:flex; align-items:center; gap:6px;">
          🧾 Payment Transparency &amp; Direct Livelihood
        </div>

        <div class="transparency-row">
          <span>Direct to Master Artisans</span>
          <strong>₹${artisanShare}</strong>
        </div>

        <div class="transparency-row">
          <span>Craft Transit Insurance Fund</span>
          <strong>₹${State.getCartInsuranceTotal()} (Covered)</strong>
        </div>

        <div class="transparency-row">
          <span>India Post Subsidized Logistics</span>
          <strong style="color:var(--color-green);">FREE</strong>
        </div>

        <div class="transparency-row">
          <span>Platform Commission / Middleman Cut</span>
          <strong style="color:var(--color-green);">₹0 (Non-profit Escrow)</strong>
        </div>

        <div class="transparency-total-row">
          <div>
            <div style="font-size:0.9rem; font-weight:900;">Total Payable</div>
            <div style="font-size:0.65rem; color:var(--text-muted); font-weight:normal;">All GST and packaging included</div>
          </div>
          <span style="font-size:1.35rem; font-weight:900; color:var(--color-terracotta);">₹${subtotal}</span>
        </div>
      </div>

      <!-- 100% Direct Payout Guarantee Banner -->
      <div style="background:#174332; color:#FFFFFF; border-radius:var(--radius-lg); padding:14px; margin-bottom:18px;">
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4ADE80" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          <span style="font-size:0.85rem; font-weight:800;">100% Direct Payout Guarantee</span>
        </div>
        <div style="font-size:0.72rem; opacity:0.9; line-height:1.35;">
          Funds transfer directly to each artisan's Aadhaar-linked DBT account. Verified by the Ministry of Textiles handicraft registry.
        </div>
      </div>

      <!-- Action Button -->
      <button type="button" class="btn-primary" id="btn-proceed-checkout">
        Proceed to Address &amp; Direct Checkout (₹${subtotal}) →
      </button>

      <div style="font-size:0.68rem; color:var(--text-muted); text-align:center; margin-top:8px;">
        🔒 Secure direct UPI / RuPay / NetBanking escrow
      </div>

    </div>
  `;

  // Attach Event Handlers
  container.querySelectorAll('.btn-qty-plus').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-id');
      State.updateCartQuantity(id, 1);
      renderCartReviewScreen(container);
    });
  });

  container.querySelectorAll('.btn-qty-minus').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-id');
      State.updateCartQuantity(id, -1);
      renderCartReviewScreen(container);
    });
  });

  container.querySelectorAll('.btn-remove-item').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-id');
      State.removeFromCart(id);
      window.showToast?.("Item removed from parcel");
      renderCartReviewScreen(container);
    });
  });

  // Spoken Cart Audio
  container.querySelector('#btn-spoken-cart')?.addEventListener('click', () => {
    const names = items.map(i => `${i.artisan} की ${i.title}`).join(' और ');
    AudioAssistance.speak(
      `आपके कार्ट में ${itemCount} शिल्प हैं: ${names}। कुल राशि ₹${subtotal} सीधे कारीगरों के बैंक खाते में जाएगी।`,
      "hi-IN"
    );
  });

  // Proceed to Checkout
  container.querySelector('#btn-proceed-checkout')?.addEventListener('click', () => {
    State.setScreen('checkout');
  });
}
