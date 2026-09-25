/**
 * Hastshilp Sangam / Karigra - Main Application Controller
 * Handles Seller (Artisan) vs Buyer (Patron) personas, dynamic bottom navigation,
 * global routing, reactive cart management, voice assistance, and interactive modals.
 */

import { State } from './state.js';
import { renderWelcomeScreen } from './screens/welcome_identity.js';
import { renderPehchanScreen } from './screens/pehchan_verification.js';
import { renderBankScreen } from './screens/bank_khata.js';
import { renderStudioScreen } from './screens/artisan_studio.js';
import { renderCraftStudioScreen } from './screens/craft_studio.js';
import { renderExploreScreen } from './screens/explore_market.js';
import { renderProductDetailsScreen } from './screens/product_details.js';
import { renderCartReviewScreen } from './screens/cart_review.js';
import { renderCheckoutScreen } from './screens/checkout.js';
import { renderArtisansScreen } from './screens/artisans_directory.js';
import { renderOrdersScreen } from './screens/orders_dispatch.js';
import { renderLanguageScreen } from './screens/language_selection.js';
import { renderSplashScreen } from './screens/splash.js';
import { renderReturnsPolicyScreen } from './screens/returns_policy.js';
import { renderAccountRecoveryScreen } from './screens/account_recovery.js';
import { renderWholesaleScreen } from './screens/wholesale_b2b.js';
import { AudioAssistance } from './speech.js';

// Complete Screen Registry
const Screens = {
  splash: renderSplashScreen,
  welcome: renderWelcomeScreen,
  pehchan: renderPehchanScreen,
  bank: renderBankScreen,
  studio: renderStudioScreen,
  craft_studio: renderCraftStudioScreen,
  explore: renderExploreScreen,
  product_details: renderProductDetailsScreen,
  cart_review: renderCartReviewScreen,
  checkout: renderCheckoutScreen,
  artisans: renderArtisansScreen,
  orders: renderOrdersScreen,
  languages: renderLanguageScreen,
  returns_policy: renderReturnsPolicyScreen,
  account_recovery: renderAccountRecoveryScreen,
  wholesale: renderWholesaleScreen
};

const outlet = document.getElementById('main-outlet');
const backBtn = document.getElementById('header-back-btn');
const headerTitle = document.getElementById('header-title-text');
const screensModal = document.getElementById('modal-screens-menu');
const bottomNav = document.getElementById('bottom-navigation');

// Global navigation helper
export function navigateTo(screenName) {
  if (!Screens[screenName]) return;
  AudioAssistance.stop();
  State.setScreen(screenName);
}
window.navigateToScreen = navigateTo;
window.AudioAssistance = AudioAssistance;

// Switch App Mode (Seller vs Buyer)
export function switchAppMode(mode) {
  State.setMode(mode);
  updateRoleBarUI();
  updateBottomNavUI();
  
  if (mode === 'seller') {
    window.showToast?.("👨‍🎨 Switched to Karigar Studio (Artisan Seller Mode)");
  } else {
    window.showToast?.("🛍️ Switched to Patron Market (Craft Buyer Mode)");
  }
}
window.switchAppMode = switchAppMode;

// Update Role Toggle Bar in Header
function updateRoleBarUI() {
  const sellerBtn = document.getElementById('btn-mode-seller');
  const buyerBtn = document.getElementById('btn-mode-buyer');
  if (!sellerBtn || !buyerBtn) return;

  if (State.mode === 'seller') {
    sellerBtn.classList.add('active');
    buyerBtn.classList.remove('active');
  } else {
    buyerBtn.classList.add('active');
    sellerBtn.classList.remove('active');
  }
}

// Update Bottom Navigation Bar based on Role
function updateBottomNavUI() {
  if (!bottomNav) return;
  const current = State.currentScreen;

  if (State.mode === 'seller') {
    // Exact Screenshot 1 Navigation: Explore, Artisans, Orders, Studio
    bottomNav.innerHTML = `
      <button class="nav-tab ${current === 'explore' ? 'active' : ''}" data-screen="explore" id="tab-explore">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        <span>Explore</span>
      </button>

      <button class="nav-tab ${current === 'artisans' ? 'active' : ''}" data-screen="artisans" id="tab-artisans">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        <span>Artisans</span>
      </button>

      <button class="nav-tab ${current === 'orders' ? 'active' : ''}" data-screen="orders" id="tab-orders">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="13" x="1" y="3" rx="2"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
        <span>Orders</span>
      </button>

      <button class="nav-tab ${['studio', 'craft_studio', 'bank', 'pehchan'].includes(current) ? 'active' : ''}" data-screen="studio" id="tab-studio">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.563-2.512 5.563-5.563C22 6.5 17.5 2 12 2Z"/></svg>
        <span>Studio</span>
      </button>
    `;
  } else {
    // Buyer Tabs: Explore, Wholesale, Cart, Policy & Protection
    const cartCount = State.getCartCount();
    bottomNav.innerHTML = `
      <button class="nav-tab ${['explore', 'product_details'].includes(current) ? 'active' : ''}" data-screen="explore" id="tab-explore">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        <span>Explore</span>
      </button>

      <button class="nav-tab ${current === 'wholesale' ? 'active' : ''}" data-screen="wholesale" id="tab-wholesale">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><line x1="10" x2="14" y1="12" y2="12"/></svg>
        <span>Wholesale</span>
      </button>

      <button class="nav-tab ${['cart_review', 'checkout'].includes(current) ? 'active' : ''}" data-screen="cart_review" id="tab-cart" style="position:relative;">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
        <span>Cart (${cartCount})</span>
      </button>

      <button class="nav-tab ${current === 'returns_policy' ? 'active' : ''}" data-screen="returns_policy" id="tab-protection">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        <span>Protection</span>
      </button>
    `;
  }

  // Rebind navigation tab click events
  bottomNav.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const screen = tab.getAttribute('data-screen');
      AudioAssistance.stop();
      State.setScreen(screen);
    });
  });
}

// Render current screen from state
function renderCurrentScreen() {
  const current = State.currentScreen;
  const renderer = Screens[current] || renderWelcomeScreen;
  renderer(outlet);

  const appHeader = document.getElementById('app-header');
  const roleBar = document.getElementById('role-mode-bar');

  if (current === 'splash') {
    if (appHeader) appHeader.style.display = 'none';
    if (roleBar) roleBar.style.display = 'none';
    if (bottomNav) bottomNav.style.display = 'none';
    return;
  } else {
    if (appHeader) appHeader.style.display = 'flex';
    if (roleBar) roleBar.style.display = 'flex';
    if (bottomNav) bottomNav.style.display = 'flex';
  }

  // Update Header Back button visibility & title
  if (current === 'welcome') {
    backBtn.style.display = 'none';
    headerTitle.textContent = 'Hastshilp Sangam';
  } else if (current === 'pehchan') {
    backBtn.style.display = 'flex';
    headerTitle.textContent = 'Pehchan Registry';
  } else if (current === 'bank') {
    backBtn.style.display = 'flex';
    headerTitle.textContent = 'Bank Khata Jodna';
  } else if (current === 'studio') {
    backBtn.style.display = 'none';
    headerTitle.textContent = 'Handicraft Direct Po...';
  } else if (current === 'craft_studio') {
    backBtn.style.display = 'flex';
    headerTitle.textContent = 'AI Craft Studio';
  } else if (current === 'explore') {
    backBtn.style.display = 'flex';
    headerTitle.textContent = 'Karigra Explore';
  } else if (current === 'product_details') {
    backBtn.style.display = 'flex';
    headerTitle.textContent = 'Craft Piece Detail';
  } else if (current === 'cart_review') {
    backBtn.style.display = 'flex';
    headerTitle.textContent = 'Cart Review';
  } else if (current === 'checkout') {
    backBtn.style.display = 'flex';
    headerTitle.textContent = 'Direct Patronage';
  } else if (current === 'artisans') {
    backBtn.style.display = 'flex';
    headerTitle.textContent = 'Master Artisans';
  } else if (current === 'orders') {
    backBtn.style.display = 'flex';
    headerTitle.textContent = 'Artisan Orders';
  } else if (current === 'languages') {
    backBtn.style.display = 'flex';
    headerTitle.textContent = 'Select Language';
  } else if (current === 'returns_policy') {
    backBtn.style.display = 'flex';
    headerTitle.textContent = 'Protection & Policy';
  } else if (current === 'account_recovery') {
    backBtn.style.display = 'flex';
    headerTitle.textContent = 'Account Recovery';
  } else if (current === 'wholesale') {
    backBtn.style.display = 'flex';
    headerTitle.textContent = 'Wholesale Procurement';
  }

  // Update live cart badge in header
  const cartBadge = document.getElementById('header-cart-count');
  if (cartBadge) {
    cartBadge.textContent = State.getCartCount();
  }

  // Update Bottom Nav active state
  updateBottomNavUI();
  updateRoleBarUI();

  // Close screen menu modal if open
  screensModal?.classList.remove('active');
}

// Global Toast Notification Helper
window.showToast = function(msg) {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22C55E" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
    <span>${msg}</span>
  `;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 250);
  }, 2800);
};

// ==========================================
// INTERACTIVE MODALS
// ==========================================

// 1. File Return Request Modal
window.openReturnModal = function() {
  const existing = document.getElementById('interactive-return-modal');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.id = 'interactive-return-modal';
  modal.className = 'modal-overlay active';
  modal.innerHTML = `
    <div class="bottom-sheet" style="max-height:88vh; padding-bottom:24px;">
      <div class="sheet-header">
        <div class="sheet-title-group">
          <span style="font-size:1.3rem;">🛡️</span>
          <div>
            <div style="font-size:1rem; font-weight:800;">File New Return &amp; Replacement</div>
            <div style="font-size:0.68rem; color:var(--text-muted);">Protected by Craft Transit Insurance Fund</div>
          </div>
        </div>
        <button type="button" class="sheet-close-btn" onclick="document.getElementById('interactive-return-modal').remove()">✕</button>
      </div>

      <div style="display:flex; flex-direction:column; gap:12px;">
        <!-- Step 1: Select Item -->
        <div>
          <label style="font-size:0.75rem; font-weight:800; display:block; margin-bottom:4px;">1. Select Received Craft Piece</label>
          <select id="return-select-item" style="width:100%; padding:10px; border-radius:8px; border:1px solid var(--border-subtle); background:#FAF7F2; font-size:0.8rem; font-weight:700;">
            <option>Hand-Etched Terracotta Pitcher (ORD-2026-8812)</option>
            <option>Dhokra Brass Tribal Nandi (ORD-2026-9041)</option>
          </select>
        </div>

        <!-- Step 2: Reason -->
        <div>
          <label style="font-size:0.75rem; font-weight:800; display:block; margin-bottom:4px;">2. Reason for Claim</label>
          <div style="display:flex; flex-direction:column; gap:6px;">
            <label style="display:flex; align-items:center; gap:8px; font-size:0.75rem; background:#FFF; border:1px solid var(--border-subtle); padding:8px 10px; border-radius:6px; cursor:pointer;">
              <input type="radio" name="claim-reason" value="broken" checked>
              <span>💥 <strong>Broken in Transit:</strong> Damaged clay, fractured wood, torn weave</span>
            </label>
            <label style="display:flex; align-items:center; gap:8px; font-size:0.75rem; background:#FFF; border:1px solid var(--border-subtle); padding:8px 10px; border-radius:6px; cursor:pointer;">
              <input type="radio" name="claim-reason" value="wrong">
              <span>📦 <strong>Incorrect Item Dispatched:</strong> Completely different craft piece received</span>
            </label>
            <label style="display:flex; align-items:center; gap:8px; font-size:0.75rem; background:#FFF; border:1px solid var(--border-subtle); padding:8px 10px; border-radius:6px; cursor:pointer;">
              <input type="radio" name="claim-reason" value="size">
              <span>📏 <strong>Severe Size Discrepancy:</strong> Measurement exceeds 20% from specs</span>
            </label>
          </div>
        </div>

        <!-- Step 3: Photo Preview -->
        <div>
          <label style="font-size:0.75rem; font-weight:800; display:block; margin-bottom:4px;">3. Unboxing Evidence Photo</label>
          <div style="display:flex; gap:10px; align-items:center; background:#FAF7F2; border:1px dashed var(--color-terracotta-border); border-radius:8px; padding:10px;">
            <img src="/assets/raw_pottery_snap.jpg" alt="Unboxing Photo" style="width:52px; height:52px; border-radius:6px; object-fit:cover; filter:sepia(0.2);">
            <div style="flex:1;">
              <div style="font-size:0.75rem; font-weight:800;">IMG_20260924_Unbox.jpg</div>
              <div style="font-size:0.65rem; color:var(--color-green); font-weight:700;">✓ Hairline transit crack detected by AI</div>
            </div>
            <button type="button" class="btn-secondary" style="padding:4px 8px; font-size:0.65rem;" onclick="window.showToast('Select photo from gallery or camera')">Change</button>
          </div>
        </div>

        <!-- Payout Guarantee Badge -->
        <div style="background:#FFF9F5; border:1px solid var(--color-terracotta-border); border-radius:8px; padding:10px; font-size:0.72rem; line-height:1.35; color:#7A2E0E;">
          🛡️ <strong>Artisan Livelihood Shield:</strong> Your refund of ₹750 is paid by the Craft Transit Insurance Fund. Master Potter Ramdev Kumhar keeps 100% of his making fee.
        </div>

        <!-- Submit Button -->
        <button type="button" class="btn-primary" id="btn-submit-return-claim" style="padding:12px; font-size:0.85rem;">
          Generate India Post Reverse Pickup Slip →
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  modal.querySelector('#btn-submit-return-claim').addEventListener('click', () => {
    const itemTitle = modal.querySelector('#return-select-item').value;
    State.fileReturnRequest({
      itemTitle,
      reason: 'Broken in Transit',
      pickupDate: 'Tomorrow (India Post Speed Post)',
      refundAmount: 750
    });

    modal.querySelector('.bottom-sheet').innerHTML = `
      <div class="sheet-header">
        <div class="sheet-title-group">
          <span style="font-size:1.3rem;">✅</span>
          <div>
            <div style="font-size:1rem; font-weight:800; color:var(--color-green);">Return Claim Approved!</div>
            <div style="font-size:0.68rem; color:var(--text-muted);">Consignment #IP-REV-849102</div>
          </div>
        </div>
        <button type="button" class="sheet-close-btn" onclick="document.getElementById('interactive-return-modal').remove()">✕</button>
      </div>

      <div style="text-align:center; padding:10px 0;">
        <div style="background:#FFFFFF; border:1.5px solid var(--border-subtle); border-radius:12px; padding:16px; margin-bottom:14px;">
          <div style="font-size:0.75rem; font-weight:800; color:var(--color-terracotta); margin-bottom:6px;">INDIA POST REVERSE PICKUP PASS</div>
          <div style="font-family:monospace; font-size:1.1rem; font-weight:900; letter-spacing:2px; margin-bottom:6px;">||||| | |||||| || |||||||| ||||</div>
          <div style="font-size:0.75rem; font-family:monospace; color:var(--text-muted);">IP-REV-849102-UP</div>
          <div style="font-size:0.7rem; color:var(--text-secondary); margin-top:8px;">
            Postal agent will collect parcel from your doorstep tomorrow. Keep packed with original straw cushion.
          </div>
        </div>

        <button type="button" class="btn-primary" onclick="document.getElementById('interactive-return-modal').remove(); window.showToast('Return pickup ticket saved!')">
          Done (View Policy)
        </button>
      </div>
    `;
  });
};

// 2. Wholesale RFQ Modal
window.openRfqModal = function(defaultItem = 'Gorakhpur Terracotta Planters', defaultCluster = 'Gorakhpur Terracotta Guild') {
  const existing = document.getElementById('interactive-rfq-modal');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.id = 'interactive-rfq-modal';
  modal.className = 'modal-overlay active';
  modal.innerHTML = `
    <div class="bottom-sheet" style="max-height:88vh; padding-bottom:24px;">
      <div class="sheet-header">
        <div class="sheet-title-group">
          <span style="font-size:1.3rem;">🏛️</span>
          <div>
            <div style="font-size:1rem; font-weight:800;">Request Corporate Quote / Bulk RFQ</div>
            <div style="font-size:0.68rem; color:var(--text-muted);">${defaultCluster}</div>
          </div>
        </div>
        <button type="button" class="sheet-close-btn" onclick="document.getElementById('interactive-rfq-modal').remove()">✕</button>
      </div>

      <div style="display:flex; flex-direction:column; gap:10px;">
        <div>
          <label style="font-size:0.72rem; font-weight:800; display:block; margin-bottom:4px;">Target Craft Item</label>
          <input type="text" id="rfq-item" value="${defaultItem}" style="width:100%; padding:8px 10px; border-radius:6px; border:1px solid var(--border-subtle); background:#FAF7F2; font-size:0.8rem; font-weight:700;">
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
          <div>
            <label style="font-size:0.72rem; font-weight:800; display:block; margin-bottom:4px;">Desired Quantity</label>
            <input type="number" id="rfq-qty" value="100" min="25" max="5000" style="width:100%; padding:8px 10px; border-radius:6px; border:1px solid var(--border-subtle); font-size:0.85rem; font-weight:800;">
          </div>
          <div>
            <label style="font-size:0.72rem; font-weight:800; display:block; margin-bottom:4px;">Delivery Pincode</label>
            <input type="text" id="rfq-pincode" value="560001" style="width:100%; padding:8px 10px; border-radius:6px; border:1px solid var(--border-subtle); font-size:0.85rem;">
          </div>
        </div>

        <div>
          <label style="font-size:0.72rem; font-weight:800; display:block; margin-bottom:4px;">Company / Organisation Name</label>
          <input type="text" id="rfq-company" placeholder="e.g. Tata Consultancy Services / Taj Hotels" value="Heritage India Corp" style="width:100%; padding:8px 10px; border-radius:6px; border:1px solid var(--border-subtle); font-size:0.8rem;">
        </div>

        <!-- Live Tiered Calculation -->
        <div id="rfq-calc-box" style="background:#FFF9F5; border:1px solid var(--color-terracotta-border); border-radius:8px; padding:10px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
            <span style="font-size:0.75rem; font-weight:800; color:var(--color-terracotta);">Wholesale Tier 2 (100–499 pcs)</span>
            <span class="badge-green" style="font-size:0.6rem;">Save 19%</span>
          </div>
          <div style="display:flex; justify-content:space-between; font-size:0.75rem;">
            <span>Unit Rate: <strong>₹340 / piece</strong> (Retail: ₹420)</span>
            <span style="font-size:0.95rem; font-weight:900; color:var(--color-terracotta);">₹34,000</span>
          </div>
          <div style="font-size:0.65rem; color:var(--text-muted); margin-top:4px;">
            Includes Ministry GI Tag certificate and official GST tax invoice (ITC compliant).
          </div>
        </div>

        <button type="button" class="btn-primary" id="btn-submit-rfq-form" style="padding:12px; font-size:0.85rem; margin-top:6px;">
          Submit Formal RFQ &amp; Dispatch 48-hr Sample →
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // Dynamic recalculation on quantity change
  const qtyInput = modal.querySelector('#rfq-qty');
  qtyInput.addEventListener('input', () => {
    const qty = parseInt(qtyInput.value) || 25;
    let rate = 420;
    let discount = 'Standard Bulk';
    if (qty >= 500) { rate = 290; discount = 'Save 31%'; }
    else if (qty >= 100) { rate = 340; discount = 'Save 19%'; }

    modal.querySelector('#rfq-calc-box').innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
        <span style="font-size:0.75rem; font-weight:800; color:var(--color-terracotta);">Calculated Tier for ${qty} Units</span>
        <span class="badge-green" style="font-size:0.6rem;">${discount}</span>
      </div>
      <div style="display:flex; justify-content:space-between; font-size:0.75rem;">
        <span>Unit Rate: <strong>₹${rate} / piece</strong></span>
        <span style="font-size:0.95rem; font-weight:900; color:var(--color-terracotta);">₹${(rate * qty).toLocaleString('en-IN')}</span>
      </div>
      <div style="font-size:0.65rem; color:var(--text-muted); margin-top:4px;">
        Includes Ministry GI Tag certificate and official GST tax invoice.
      </div>
    `;
  });

  modal.querySelector('#btn-submit-rfq-form').addEventListener('click', () => {
    const item = modal.querySelector('#rfq-item').value;
    const qty = parseInt(qtyInput.value) || 100;
    const company = modal.querySelector('#rfq-company').value || 'Corporate Buyer';
    const rate = qty >= 500 ? 290 : (qty >= 100 ? 340 : 420);

    const rfq = State.submitRfq({
      item,
      quantity: qty,
      ratePerPiece: rate,
      totalAmount: rate * qty,
      company,
      cluster: defaultCluster
    });

    modal.querySelector('.bottom-sheet').innerHTML = `
      <div class="sheet-header">
        <div class="sheet-title-group">
          <span style="font-size:1.3rem;">🎉</span>
          <div>
            <div style="font-size:1rem; font-weight:800; color:var(--color-green);">RFQ Transmitted to Cluster!</div>
            <div style="font-size:0.68rem; color:var(--text-muted); font-family:monospace;">${rfq.id}</div>
          </div>
        </div>
        <button type="button" class="sheet-close-btn" onclick="document.getElementById('interactive-rfq-modal').remove()">✕</button>
      </div>

      <div style="text-align:center; padding:10px 0;">
        <p style="font-size:0.78rem; color:var(--text-secondary); line-height:1.4; margin-bottom:14px;">
          Your institutional procurement tender for <strong>${qty} units of ${item}</strong> has been transmitted to <strong>${defaultCluster}</strong>. An artisan master sample is dispatched via India Post Priority Courier.
        </p>

        <button type="button" class="btn-primary" onclick="document.getElementById('interactive-rfq-modal').remove(); window.showToast('RFQ saved in institutional records!')">
          View Procurement Dashboard
        </button>
      </div>
    `;
  });
};

// 3. CSC Center Locator Modal
window.openCscLocatorModal = function() {
  const existing = document.getElementById('interactive-csc-modal');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.id = 'interactive-csc-modal';
  modal.className = 'modal-overlay active';
  modal.innerHTML = `
    <div class="bottom-sheet" style="max-height:88vh; padding-bottom:24px;">
      <div class="sheet-header">
        <div class="sheet-title-group">
          <span style="font-size:1.3rem;">📍</span>
          <div>
            <div style="font-size:1rem; font-weight:800;">Nearest Common Service Centres (CSC)</div>
            <div style="font-size:0.68rem; color:var(--text-muted);">Assisted in-person artisan verification</div>
          </div>
        </div>
        <button type="button" class="sheet-close-btn" onclick="document.getElementById('interactive-csc-modal').remove()">✕</button>
      </div>

      <div style="display:flex; flex-direction:column; gap:8px;">
        <div style="background:#FAF7F2; border:1px solid var(--border-subtle); border-radius:8px; padding:10px;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div style="font-size:0.82rem; font-weight:800;">CSC Village Center #104 (Panchayat Bhawan)</div>
            <span class="badge-green" style="font-size:0.6rem;">1.8 km</span>
          </div>
          <div style="font-size:0.7rem; color:var(--text-secondary); margin:2px 0;">Operator: Rajesh Prajapati • Open 8 AM to 7 PM</div>
          <div style="font-size:0.68rem; color:var(--color-terracotta); font-weight:700;">Services: Pehchan Biometric Update, DBT Link, Voice Help</div>
        </div>

        <div style="background:#FAF7F2; border:1px solid var(--border-subtle); border-radius:8px; padding:10px;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div style="font-size:0.82rem; font-weight:800;">India Post Gramin Dak Seva CSC #028</div>
            <span class="badge-green" style="font-size:0.6rem;">3.2 km</span>
          </div>
          <div style="font-size:0.7rem; color:var(--text-secondary); margin:2px 0;">Operator: Sunita Devi • Post Office Compound</div>
          <div style="font-size:0.68rem; color:var(--color-terracotta); font-weight:700;">Services: IPPB Account Link, Aadhaar Mobile Update</div>
        </div>

        <button type="button" class="btn-primary" style="margin-top:6px; padding:12px;" onclick="window.showToast('Connecting call to nearest CSC Operator (+91 94150 28910)...')">
          📞 Call Village Operator for Free Assistance
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
};

// 4. Voice OTP Simulator Modal
window.triggerVoiceOtpModal = function() {
  AudioAssistance.speak("नमस्ते। हस्तशिल्प संगम में आपका सत्यापन कोड है: आठ, तीन, एक, चार। Your verification code is 8, 3, 1, 4.", "hi-IN");
  window.showToast?.("Incoming Voice Call: 'Ministry of Textiles OTP Bot'");
  State.otp = ['8', '3', '1', '4'];
  setTimeout(() => {
    State.setScreen('welcome');
  }, 1200);
};

// ==========================================
// INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  // Subscribe to state changes
  State.subscribe(() => {
    renderCurrentScreen();
  });

  // Header Back Button History Logic
  backBtn.addEventListener('click', () => {
    AudioAssistance.stop();
    const curr = State.currentScreen;
    if (curr === 'pehchan') State.setScreen('welcome');
    else if (curr === 'bank') State.setScreen('pehchan');
    else if (curr === 'studio') State.setScreen('bank');
    else if (curr === 'craft_studio') State.setScreen('studio');
    else if (curr === 'product_details') State.setScreen('explore');
    else if (curr === 'cart_review') State.setScreen('product_details');
    else if (curr === 'checkout') State.setScreen('cart_review');
    else if (curr === 'languages') State.setScreen('welcome');
    else if (curr === 'returns_policy') State.setScreen('product_details');
    else if (curr === 'account_recovery') State.setScreen('welcome');
    else if (curr === 'wholesale') State.setScreen('explore');
    else State.setScreen(State.mode === 'seller' ? 'studio' : 'explore');
  });

  // Screen Jumper Menu
  document.getElementById('btn-steps-menu')?.addEventListener('click', () => {
    screensModal?.classList.add('active');
  });
  document.getElementById('btn-close-screens-menu')?.addEventListener('click', () => {
    screensModal?.classList.remove('active');
  });
  screensModal?.addEventListener('click', (e) => {
    if (e.target === screensModal) screensModal.classList.remove('active');
  });

  // Global Audio Button in Header
  document.getElementById('btn-global-audio')?.addEventListener('click', () => {
    const curr = State.currentScreen;
    if (curr === 'welcome') AudioAssistance.playStep1();
    else if (curr === 'pehchan') AudioAssistance.playStep2();
    else if (curr === 'bank') AudioAssistance.playStep3();
    else if (curr === 'studio') AudioAssistance.playTrustScore();
    else if (curr === 'craft_studio') AudioAssistance.speak("स्मार्ट शिल्प स्टूडियो: एक फोटो से जादुई विवरण और उचित मूल्य निर्धारण।");
    else if (curr === 'explore') AudioAssistance.speak("हस्तशिल्प बाज़ार: देश के पवित्र शिल्प संघों से सीधा संपर्क।");
    else if (curr === 'product_details') AudioAssistance.speak("गोरखपुर टेराकोटा: प्राकृतिक राप्ती मिट्टी से हाथ से गढ़ी गई सुराही।");
    else if (curr === 'cart_review') AudioAssistance.speak("कार्ट समीक्षा: दोनों कारीगरों को शून्य बिचौलिए पर सीधा भुगतान।");
    else if (curr === 'checkout') AudioAssistance.speak("अंतिम चरण: रिज़र्व बैंक समर्थित सुरक्षित सीधा भुगतान।");
    else if (curr === 'languages') AudioAssistance.speak("कृपया अपनी क्षेत्रीय भाषा या बोली चुनें।");
    else if (curr === 'returns_policy') AudioAssistance.speak("हस्तशिल्प संगम सुरक्षा नीति: पूर्ण पारगमन बीमा और शिल्पकार सुरक्षा।");
    else if (curr === 'account_recovery') AudioAssistance.speak("खाता रिकवरी: फोन कॉल से ओटीपी प्राप्त करें या सीएससी केंद्र जाएं।");
    else if (curr === 'wholesale') AudioAssistance.speak("संस्थागत थोक खरीद: 180 से अधिक शिल्प क्लस्टरों से सीधा जीएसटी चालान।");
  });

  // Header Language Button -> Opens 10 Languages Screen
  document.getElementById('btn-language')?.addEventListener('click', () => {
    AudioAssistance.stop();
    State.setScreen('languages');
  });

  // Initialize UI
  updateRoleBarUI();
  updateBottomNavUI();
  renderCurrentScreen();
});
