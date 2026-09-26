/**
 * Native Loom - Main Application Controller
 * Strictly enforces three distinct, non-overlapping account types:
 * 1. ARTISAN / SELLER account
 * 2. BUYER / PATRON account (individual consumer)
 * 3. CORPORATE / B2B BUYER account (institutional bulk buyer)
 * 
 * Independent authentication flows, dedicated navigation stacks,
 * route guards, and zero same-session cross-role toggling.
 */

import {
  State,
  AccountType,
  PreAuthScreens,
  ArtisanStackScreens,
  BuyerStackScreens,
  CorporateStackScreens,
  BackendApi
} from './state.js';

// Pre-Authentication Screens
import { renderSplashScreen } from './screens/splash.js';
import { renderLanguageScreen } from './screens/language_selection.js';
import { renderAccountSelectScreen } from './screens/account_select.js';
import { renderAboutImpactScreen } from './screens/about_impact.js';
import { renderAccountRecoveryScreen } from './screens/account_recovery.js';
import { renderArtisanAuthScreen } from './screens/artisan_auth.js';
import { renderBuyerAuthScreen } from './screens/buyer_auth.js';
import { renderCorporateAuthScreen } from './screens/corporate_auth.js';
import { renderWelcomeScreen } from './screens/welcome_identity.js';

// Artisan / Seller Screens
import { renderStudioScreen } from './screens/artisan_studio.js';
import { renderCraftStudioScreen } from './screens/craft_studio.js';
import { renderArtisanIncomingOrdersScreen } from './screens/artisan_incoming_orders.js';
import { renderBankScreen } from './screens/bank_khata.js';
import { renderPehchanScreen } from './screens/pehchan_verification.js';
import { renderArtisanProfileScreen } from './screens/artisan_profile.js';

// Buyer / Patron Screens
import { renderExploreScreen } from './screens/explore_market.js';
import { renderBuyerSearchScreen } from './screens/buyer_search.js';
import { renderProductDetailsScreen } from './screens/product_details.js';
import { renderCartReviewScreen } from './screens/cart_review.js';
import { renderCheckoutScreen } from './screens/checkout.js';
import { renderBuyerOrdersScreen } from './screens/buyer_orders.js';
import { renderReturnsPolicyScreen } from './screens/returns_policy.js';
import { renderBuyerProfileScreen } from './screens/buyer_profile.js';
import { renderArtisansScreen } from './screens/artisans_directory.js';

// Corporate / B2B Screens
import { renderCorporateClustersScreen } from './screens/corporate_clusters.js';
import { renderCorporateCatalogScreen } from './screens/corporate_catalog.js';
import { renderCorporateRFQScreen } from './screens/corporate_rfq.js';
import { renderCorporateQuotesScreen } from './screens/corporate_quotes.js';
import { renderCorporateProfileScreen } from './screens/corporate_profile.js';

import { AudioAssistance } from './speech.js';
import { i18n, t, LanguageMetadata } from './i18n.js';

// Screen Registry
const Screens = {
  // Pre-Authentication Screens
  splash: renderSplashScreen,
  language_select: renderLanguageScreen,
  languages: renderLanguageScreen,
  account_select: renderAccountSelectScreen,
  about_impact: renderAboutImpactScreen,
  account_recovery: renderAccountRecoveryScreen,
  artisan_auth: renderArtisanAuthScreen,
  welcome: renderWelcomeScreen,
  welcome_identity: renderWelcomeScreen,
  buyer_auth: renderBuyerAuthScreen,
  corporate_auth: renderCorporateAuthScreen,

  // Artisan Stack
  artisan_studio: renderStudioScreen,
  craft_studio: renderCraftStudioScreen,
  artisan_orders: renderArtisanIncomingOrdersScreen,
  artisan_bank: renderBankScreen,
  bank: renderBankScreen,
  artisan_pehchan: renderPehchanScreen,
  pehchan: renderPehchanScreen,
  studio: renderStudioScreen,

  // Buyer Stack
  buyer_explore: renderExploreScreen,
  explore: renderExploreScreen,
  buyer_search: renderBuyerSearchScreen,
  product_details: renderProductDetailsScreen,
  cart_review: renderCartReviewScreen,
  checkout: renderCheckoutScreen,
  buyer_orders: renderBuyerOrdersScreen,
  orders: renderBuyerOrdersScreen,
  buyer_returns: renderReturnsPolicyScreen,
  returns_policy: renderReturnsPolicyScreen,
  buyer_profile: renderBuyerProfileScreen,
  artisans: renderArtisansScreen,

  // Corporate Stack
  corporate_clusters: renderCorporateClustersScreen,
  corporate_catalog: renderCorporateCatalogScreen,
  corporate_rfq: renderCorporateRFQScreen,
  corporate_quotes: renderCorporateQuotesScreen,
  corporate_profile: renderCorporateProfileScreen
};

const outlet = typeof document !== 'undefined' ? document.getElementById('main-outlet') : null;
const backBtn = typeof document !== 'undefined' ? document.getElementById('header-back-btn') : null;
const headerTitle = typeof document !== 'undefined' ? document.getElementById('header-title-text') : null;
const screensModal = typeof document !== 'undefined' ? document.getElementById('modal-screens-menu') : null;
const bottomNav = typeof document !== 'undefined' ? document.getElementById('bottom-navigation') : null;

// Global navigation helper with route-guard validation
export function navigateTo(screenName) {
  AudioAssistance.stop();
  State.setScreen(screenName);
}
if (typeof window !== 'undefined') {
  window.navigateToScreen = navigateTo;
  window.AudioAssistance = AudioAssistance;
  window.BackendApi = BackendApi;
  window.State = State;
}

/// Switch App Mode (Seller vs Buyer vs Corporate)
export function switchAppMode(mode) {
  State.setMode(mode);
  updateRoleBarUI();
  updateBottomNavUI();
  
  if (mode === 'seller') {
    window.showToast?.("👨‍🎨 Karigar Studio (Artisan Seller Mode)");
  } else if (mode === 'buyer') {
    window.showToast?.("🛍️ Patron Market (Craft Buyer Mode)");
  } else if (mode === 'corporate') {
    window.showToast?.("🏛️ Corporate B2B (Institutional Wholesale)");
  }
}

if (typeof window !== 'undefined') {
  window.switchAppMode = switchAppMode;
}

// Update Role Toggle Bar in Header
function updateRoleBarUI() {
  const sellerBtn = document.getElementById('btn-mode-seller');
  const buyerBtn = document.getElementById('btn-mode-buyer');
  const corpBtn = document.getElementById('btn-mode-corporate');
  if (!sellerBtn || !buyerBtn) return;

  sellerBtn.classList.remove('active');
  buyerBtn.classList.remove('active');
  if (corpBtn) corpBtn.classList.remove('active');

  if (State.mode === 'seller') {
    sellerBtn.classList.add('active');
  } else if (State.mode === 'buyer') {
    buyerBtn.classList.add('active');
  } else if (State.mode === 'corporate') {
    if (corpBtn) corpBtn.classList.add('active');
  }
}

// ==========================================
// DYNAMIC ROLE-BASED BOTTOM NAVIGATION
// ==========================================
function updateBottomNavUI() {
  if (!bottomNav) return;
  const current = State.currentScreen;
  bottomNav.style.display = 'flex';

  const isExplore = ['buyer_explore', 'explore'].includes(current);
  const isDiscover = ['buyer_search', 'product_details', 'artisans'].includes(current);
  const isOrders = ['orders', 'artisan_orders', 'buyer_orders', 'cart_review', 'checkout'].includes(current);
  const isStudio = ['studio', 'artisan_studio', 'craft_studio', 'artisan_bank', 'artisan_pehchan', 'bank', 'pehchan', 'artisan_profile'].includes(current);

  const isOrderTracking = ['buyer_orders', 'orders'].includes(current);
  if (isOrderTracking) {
    bottomNav.innerHTML = `
      <button class="nav-tab" data-screen="explore" id="tab-orders-explore" onclick="window.navigateToScreen('explore')" style="color: #78716C;">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        <span style="font-weight:600; font-size:0.68rem;">${t('navExplore', 'Explore')}</span>
      </button>

      <button class="nav-tab" data-screen="artisans" id="tab-orders-artisans" onclick="window.navigateToScreen('artisans')" style="color: #78716C;">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
        <span style="font-weight:600; font-size:0.68rem;">${t('navArtisans', 'Artisans')}</span>
      </button>

      <button class="nav-tab active" data-screen="orders" id="tab-orders-orders" onclick="window.navigateToScreen('buyer_orders')" style="color: #7A2813;">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
        <span style="font-weight:800; font-size:0.68rem;">${t('navOrders', 'Orders')}</span>
      </button>

      <button class="nav-tab" data-screen="studio" id="tab-orders-studio" onclick="window.navigateToScreen('artisan_studio')" style="color: #78716C;">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.563-2.512 5.563-5.563C22 6.5 17.5 2 12 2Z"/></svg>
        <span style="font-weight:600; font-size:0.68rem;">${t('navStudio', 'Studio')}</span>
      </button>
    `;
    return;
  }

  // Buyer Mode (Matching Explore Market screenshot: Home, Search, Cart (3), Profile)
  if (isExplore || State.mode === 'buyer' || current === 'buyer_search' || current === 'buyer_profile') {
    const isHome = isExplore;
    const isSearch = ['buyer_search', 'artisans'].includes(current);
    const isCart = ['cart_review', 'checkout'].includes(current);
    const isProfile = ['buyer_profile', 'returns_policy', 'buyer_returns'].includes(current);

    bottomNav.innerHTML = `
      <button class="nav-tab ${isHome ? 'active' : ''}" data-screen="explore" id="tab-buyer-home" onclick="window.navigateToScreen('explore')" style="color: ${isHome ? '#7A2813' : '#78716C'};">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
        <span style="font-weight:${isHome ? '800' : '600'}; font-size:0.68rem;">${t('navHome', 'Home')}</span>
      </button>

      <button class="nav-tab ${isSearch ? 'active' : ''}" data-screen="search" id="tab-buyer-search" onclick="window.navigateToScreen('buyer_search')" style="color: ${isSearch ? '#7A2813' : '#78716C'};">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.3-4.3"/>
        </svg>
        <span style="font-weight:${isSearch ? '800' : '600'}; font-size:0.68rem;">${t('navSearch', 'Search')}</span>
      </button>

      <button class="nav-tab ${isCart ? 'active' : ''}" data-screen="cart" id="tab-buyer-cart" onclick="window.navigateToScreen('cart_review')" style="position:relative; color: ${isCart ? '#7A2813' : '#78716C'};">
        <div style="position:relative; display:inline-flex;">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
            <path d="M3 6h18"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          <span style="position:absolute; top:-4px; right:-8px; background:#7A2813; color:#FFFFFF; border-radius:50%; width:15px; height:15px; font-size:0.58rem; font-weight:800; display:flex; align-items:center; justify-content:center;">3</span>
        </div>
        <span style="font-weight:${isCart ? '800' : '600'}; font-size:0.68rem;">${t('navCart', 'Cart')}</span>
      </button>

      <button class="nav-tab ${isProfile ? 'active' : ''}" data-screen="profile" id="tab-buyer-profile" onclick="window.navigateToScreen('buyer_profile')" style="color: ${isProfile ? '#7A2813' : '#78716C'};">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
        <span style="font-weight:${isProfile ? '800' : '600'}; font-size:0.68rem;">${t('navProfile', 'Profile')}</span>
      </button>
    `;
    return;
  }

  bottomNav.innerHTML = `
    <button class="nav-tab ${isExplore ? 'active' : ''}" data-screen="explore" id="tab-explore" onclick="window.navigateToScreen('explore')">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
      <span>${t('navExplore', 'Explore')}</span>
    </button>

    <button class="nav-tab ${isDiscover ? 'active' : ''}" data-screen="discover" id="tab-discover" onclick="window.navigateToScreen('buyer_search')">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
      <span>${t('navDiscover', 'Discover')}</span>
    </button>

    <button class="nav-tab ${isOrders ? 'active' : ''}" data-screen="orders" id="tab-orders" onclick="window.navigateToScreen('orders')">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
      <span>${t('navOrders', 'Orders')}</span>
    </button>

    <button class="nav-tab ${isStudio ? 'active' : ''}" data-screen="studio" id="tab-studio" onclick="window.navigateToScreen('studio')">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.563-2.512 5.563-5.563C22 6.5 17.5 2 12 2Z"/></svg>
      <span>${t('navStudio', 'Studio')}</span>
    </button>
  `;
}

// ==========================================
// SCREENS DIRECTORY MODAL
// ==========================================
function updateScreensModalUI() {
  const modalSubtitle = document.getElementById('screens-menu-subtitle');
  if (modalSubtitle) {
    modalSubtitle.textContent = `Active Screen: ${State.currentScreen} • Mode: ${State.mode}`;
  }
}


// ==========================================
// RENDER CURRENT SCREEN & HEADER LOGIC
// ==========================================
function renderCurrentScreen() {
  const current = State.currentScreen;
  const role = State.session.accountType;
  const renderer = Screens[current] || renderAccountSelectScreen;
  
  renderer(outlet);

  const appHeader = document.getElementById('app-header');
  const cartBtn = document.getElementById('btn-header-cart');
  const cartBadge = document.getElementById('header-cart-count');
  const brandLogo = document.getElementById('header-brand-logo');
  const profileBtn = document.getElementById('btn-header-profile');
  const audioLabel = document.getElementById('btn-global-audio-label');
  const langLabel = document.getElementById('btn-language-label');

  if (current === 'splash') {
    if (appHeader) appHeader.style.display = 'none';
    if (bottomNav) bottomNav.style.display = 'none';
    return;
  } else if (current === 'artisan_bank') {
    if (appHeader) appHeader.style.display = 'none';
    if (bottomNav) bottomNav.style.display = 'none';
  } else {
    if (appHeader) appHeader.style.display = 'flex';
  }

  const isExploreScreen = ['explore', 'buyer_explore'].includes(current);
  const isDetailScreen = (current === 'product_details');
  const isCartScreen = (current === 'cart_review');
  const isCheckoutScreen = (current === 'checkout');
  const isOrderScreen = ['buyer_orders', 'orders'].includes(current);

  // Header Cart Button: ONLY visible for BUYER role sessions (hidden on Explore, Product Detail, Cart Review, Checkout, and Orders screens)
  if (cartBtn) {
    if (role === AccountType.BUYER && !isExploreScreen && !isDetailScreen && !isCartScreen && !isCheckoutScreen && !isOrderScreen) {
      cartBtn.style.display = 'flex';
      if (cartBadge) cartBadge.textContent = State.getCartCount();
    } else {
      cartBtn.style.display = 'none';
    }
  }

  // Header Title & Back Button State
  const isRootScreen = ['account_select', 'artisan_studio', 'craft_studio', 'buyer_explore', 'explore', 'corporate_clusters', 'artisan_pehchan', 'artisan_bank', 'buyer_orders', 'orders'].includes(current);
  if (backBtn) {
    backBtn.style.display = isRootScreen ? 'none' : 'flex';
  }

  // Manage screens button and mode bar visibility
  const stepsMenuBtn = document.getElementById('btn-steps-menu');
  const roleModeBar = document.getElementById('role-mode-bar');
  if (roleModeBar) roleModeBar.style.display = 'none';

  if (current === 'artisan_pehchan' || current === 'artisan_bank' || current === 'artisan_studio' || current === 'craft_studio' || isExploreScreen || isDetailScreen || isCartScreen || isCheckoutScreen || isOrderScreen) {
    if (stepsMenuBtn) stepsMenuBtn.style.display = 'none';
    if (current === 'artisan_studio' || current === 'craft_studio' || isExploreScreen || isOrderScreen) {
      if (bottomNav) bottomNav.style.display = 'flex';
    } else {
      if (bottomNav) bottomNav.style.display = 'none';
    }
  } else {
    if (stepsMenuBtn) stepsMenuBtn.style.display = 'inline-flex';
  }

  // Brand Logo and Profile Button on Header
  if (brandLogo) {
    brandLogo.style.display = 'flex';
  }
  if (profileBtn) {
    profileBtn.style.display = (isExploreScreen || isDetailScreen || isCartScreen || isCheckoutScreen || isOrderScreen) ? 'flex' : 'none';
  }
  if (audioLabel) {
    audioLabel.style.display = (isExploreScreen || isDetailScreen || isCartScreen || isCheckoutScreen || isOrderScreen) ? 'none' : 'inline';
  }
  const langBtn = document.getElementById('btn-language');
  if (langBtn) {
    langBtn.style.display = (isDetailScreen || isCartScreen || isCheckoutScreen) ? 'none' : 'flex';
  }
  i18n.updateHeaderPill();

  // Contextual Header Title with i18n
  if (headerTitle) {
    if (isExploreScreen) {
      headerTitle.innerHTML = `<span style="font-family:'Playfair Display', Georgia, serif; font-size:1.15rem; font-weight:900; color:#7A2813; letter-spacing:-0.01em; line-height:1;">Native Loom</span><span style="font-size:0.55rem; font-weight:800; color:#71655D; letter-spacing:0.06em; text-transform:uppercase;">${t('subExplore', 'EXPLORE MARKET')}</span>`;
    } else if (isOrderScreen) {
      headerTitle.innerHTML = `<span style="font-family:'Playfair Display', Georgia, serif; font-size:1.15rem; font-weight:900; color:#7A2813; letter-spacing:-0.01em; line-height:1;">Native Loom</span><span style="font-size:0.55rem; font-weight:800; color:#71655D; letter-spacing:0.06em; text-transform:uppercase;">${t('subOrders', 'ORDERS')}</span>`;
    } else if (isDetailScreen) {
      headerTitle.innerHTML = `<span style="font-family:'Playfair Display', Georgia, serif; font-size:1.15rem; font-weight:900; color:#7A2813; letter-spacing:-0.01em; line-height:1;">Native Loom</span><span style="font-size:0.55rem; font-weight:800; color:#71655D; letter-spacing:0.06em; text-transform:uppercase;">${t('subCraftPiece', 'CRAFT PIECE')}</span>`;
    } else if (isCartScreen) {
      headerTitle.innerHTML = `<span style="font-family:'Playfair Display', Georgia, serif; font-size:1.15rem; font-weight:900; color:#7A2813; letter-spacing:-0.01em; line-height:1;">Native Loom</span><span style="font-size:0.55rem; font-weight:800; color:#71655D; letter-spacing:0.06em; text-transform:uppercase;">${t('subCart', 'DIRECT CART')}</span>`;
    } else if (isCheckoutScreen) {
      headerTitle.innerHTML = `<span style="font-family:'Playfair Display', Georgia, serif; font-size:1.15rem; font-weight:900; color:#7A2813; letter-spacing:-0.01em; line-height:1;">Native Loom</span><span style="font-size:0.55rem; font-weight:800; color:#71655D; letter-spacing:0.06em; text-transform:uppercase;">${t('subCheckout', 'CHECKOUT')}</span>`;
    } else if (current === 'artisan_pehchan' || current === 'artisan_bank' || current === 'artisan_studio' || current === 'craft_studio') {
      headerTitle.innerHTML = `<span style="font-family:'Playfair Display', Georgia, serif; font-size:1.15rem; font-weight:900; color:#7A2813; letter-spacing:-0.01em; line-height:1;">Native Loom</span><span style="font-size:0.55rem; font-weight:800; color:#71655D; letter-spacing:0.06em; text-transform:uppercase;">${t('subStudio', 'ARTISAN STUDIO')}</span>`;
    } else {
      headerTitle.innerHTML = `<span style="font-family:'Playfair Display', Georgia, serif; font-size:1.15rem; font-weight:900; color:#7A2813; letter-spacing:-0.01em; line-height:1;">Native Loom</span>`;
    }
  }

  // Update Dynamic Navigation and Modal
  updateRoleBarUI();
  updateBottomNavUI();
  updateScreensModalUI();
  i18n.updateHeaderPill();

  // Universal DOM Translation pass
  i18n.translatePage(document.querySelector('.mobile-container') || document.body);

  // Close screen menu modal if open
  screensModal?.classList.remove('active');
}

// Global Toast Notification Helper
if (typeof window !== 'undefined') {
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
}

// ==========================================
// INTERACTIVE MODALS
// ==========================================

// 1. File Return Request Modal (Buyer Only)
if (typeof window !== 'undefined') {
  window.openReturnModal = function() {
    if (State.session.accountType !== AccountType.BUYER) {
      window.showToast?.("Returns & Protection are accessible to Patron / Buyer accounts.");
      return;
    }
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
        <div>
          <label style="font-size:0.75rem; font-weight:800; display:block; margin-bottom:4px;">1. Select Received Craft Piece</label>
          <select id="return-select-item" style="width:100%; padding:10px; border-radius:8px; border:1px solid var(--border-subtle); background:#FAF7F2; font-size:0.8rem; font-weight:700;">
            <option>Gorakhpur Traditional Terracotta Pitcher (KLV-BYR-90214)</option>
            <option>Bastar Lost-Wax Brass Bell Figurine (KLV-BYR-88401)</option>
          </select>
        </div>

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
          </div>
        </div>

        <div style="background:#FFF9F5; border:1px solid var(--color-terracotta-border); border-radius:8px; padding:10px; font-size:0.72rem; line-height:1.35; color:#7A2E0E;">
          🛡️ <strong>Artisan Livelihood Shield:</strong> Your refund of ₹680 is paid by the Craft Transit Insurance Fund. Master Potter Ramdev Kumhar keeps 100% of his making fee.
        </div>

        <button type="button" class="btn-primary" id="btn-submit-return-claim" style="padding:12px; font-size:0.85rem;">
          Generate Delivery Agent Reverse Pickup Slip →
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
      pickupDate: 'Tomorrow (Delivery Agent)',
      refundAmount: 680
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
          <div style="font-size:0.75rem; font-weight:800; color:var(--color-terracotta); margin-bottom:6px;">DELIVERY AGENT REVERSE PICKUP PASS</div>
          <div style="font-family:monospace; font-size:1.1rem; font-weight:900; letter-spacing:2px; margin-bottom:6px;">||||| | |||||| || |||||||| ||||</div>
          <div style="font-size:0.75rem; font-family:monospace; color:var(--text-muted);">IP-REV-849102-UP</div>
          <div style="font-size:0.7rem; color:var(--text-secondary); margin-top:8px;">
            Postal agent will collect parcel from your doorstep tomorrow. Keep packed with original straw cushion.
          </div>
        </div>

        <button type="button" class="btn-primary" onclick="document.getElementById('interactive-return-modal').remove(); window.showToast('Return pickup ticket saved!')">
          Done
        </button>
      </div>
    `;
  });
  };
}

if (typeof window !== 'undefined') {
  // 2. Wholesale RFQ Modal (Corporate Only)
  window.openRfqModal = function(defaultItem = 'Gorakhpur Terracotta Planters', defaultCluster = 'Gorakhpur Terracotta Guild') {
    if (State.session.accountType !== AccountType.CORPORATE) {
      window.showToast?.("Bulk RFQs are restricted to Corporate / B2B buyer accounts.");
      return;
    }
    window.navigateToScreen('corporate_rfq');
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
              <div style="font-size:0.82rem; font-weight:800;">Delivery Agent CSC Hub #028</div>
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
    AudioAssistance.speak("नमस्ते। नेटिव लूम में आपका सत्यापन कोड है: आठ, तीन, एक, चार। Your verification code is 8, 3, 1, 4.", "hi-IN");
    window.showToast?.("Incoming Voice Call: 'Ministry of Textiles OTP Bot'");
    State.otp = ['8', '3', '1', '4'];
  };

  // 5. Spoken Video Guide Demo Modal (01:30)
  window.playSpokenGuideDemo = function() {
    const existing = document.getElementById('spoken-guide-demo-modal');
    if (existing) existing.remove();

    AudioAssistance.speak("नमस्ते कारीगर भाई-बहन! मूल करघा (Native Loom) में आपका स्वागत है। अपना 10 अंकों का मोबाइल नंबर दर्ज करें, 4 अंकों का ओटीपी डालें, और सीधे बैंक खाते में भुगतान प्राप्त करें।", "hi-IN");

    const modal = document.createElement('div');
    modal.id = 'spoken-guide-demo-modal';
    modal.className = 'modal-overlay active';
    modal.innerHTML = `
      <div class="bottom-sheet" style="max-height:92vh; padding-bottom:24px; background:#1C1917; color:#FFFFFF;">
        <div class="sheet-header" style="border-bottom:1px solid #38332E; padding-bottom:10px;">
          <div class="sheet-title-group">
            <span style="font-size:1.3rem;">🎬</span>
            <div>
              <div style="font-size:0.95rem; font-weight:800; color:#FFFFFF;">Simple Spoken Video Guide</div>
              <div style="font-size:0.68rem; color:#A89582;">Aawaz Sahayata • Step-by-Step Audio Visual Demo (01:30)</div>
            </div>
          </div>
          <button type="button" class="sheet-close-btn" style="color:#FFFFFF; background:#38332E;" onclick="window.AudioAssistance.stop(); document.getElementById('spoken-guide-demo-modal').remove()">✕</button>
        </div>

        <div style="margin:12px 0 16px; border-radius:12px; overflow:hidden; position:relative; background:#000; border:1px solid #443E38;">
          <img src="/assets/spoken_guide_demo.png" alt="Video Player" style="width:100%; height:auto; display:block;">
          <div style="position:absolute; bottom:0; left:0; right:0; background:linear-gradient(to top, rgba(0,0,0,0.88), transparent); padding:12px; display:flex; justify-content:space-between; align-items:center;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:#EF4444;"></span>
              <span style="font-size:0.75rem; font-weight:800; color:#FFFFFF;">Playing Spoken Voice Guide</span>
            </div>
            <span style="font-size:0.72rem; color:#E5DAC8; font-family:monospace; background:rgba(0,0,0,0.5); padding:2px 6px; border-radius:4px;">00:14 / 01:30</span>
          </div>
        </div>

        <!-- 3 Audio Steps -->
        <div style="display:flex; flex-direction:column; gap:8px; margin-bottom:16px;">
          <div style="background:#292524; border:1px solid #44403C; border-radius:8px; padding:10px 12px; display:flex; align-items:center; gap:10px;">
            <div style="width:26px; height:26px; border-radius:50%; background:#7A2813; color:#fff; display:flex; align-items:center; justify-content:center; font-size:0.75rem; font-weight:800; flex-shrink:0;">1</div>
            <div style="flex:1;">
              <div style="font-size:0.8rem; font-weight:800; color:#FFFFFF;">मोबाइल नंबर और 4-अंकीय ओटीपी</div>
              <div style="font-size:0.68rem; color:#A89582;">Enter active 10-digit mobile number &amp; verify SMS OTP</div>
            </div>
            <span style="color:#22C55E; font-size:0.85rem;">✓</span>
          </div>

          <div style="background:#292524; border:1px solid #44403C; border-radius:8px; padding:10px 12px; display:flex; align-items:center; gap:10px;">
            <div style="width:26px; height:26px; border-radius:50%; background:#38332E; color:#A89582; display:flex; align-items:center; justify-content:center; font-size:0.75rem; font-weight:800; flex-shrink:0;">2</div>
            <div style="flex:1;">
              <div style="font-size:0.8rem; font-weight:800; color:#FFFFFF;">पहचान पत्र (Pehchan Card) स्कैन</div>
              <div style="font-size:0.68rem; color:#A89582;">Instant AI OCR recognition with 0% paperwork</div>
            </div>
          </div>

          <div style="background:#292524; border:1px solid #44403C; border-radius:8px; padding:10px 12px; display:flex; align-items:center; gap:10px;">
            <div style="width:26px; height:26px; border-radius:50%; background:#38332E; color:#A89582; display:flex; align-items:center; justify-content:center; font-size:0.75rem; font-weight:800; flex-shrink:0;">3</div>
            <div style="flex:1;">
              <div style="font-size:0.8rem; font-weight:800; color:#FFFFFF;">सीधा बैंक खाता (Direct DBT Payout)</div>
              <div style="font-size:0.68rem; color:#A89582;">0% intermediary commission into your savings passbook</div>
            </div>
          </div>
        </div>

        <button type="button" class="btn-primary" style="width:100%; background:#7A2813; color:#FFFFFF; border:none; padding:14px; font-size:0.9rem; font-weight:800; border-radius:10px; cursor:pointer;" onclick="window.AudioAssistance.stop(); document.getElementById('spoken-guide-demo-modal').remove()">
          ✓ समझ गए / Proceed to Login
        </button>
      </div>
    `;

    document.body.appendChild(modal);
  };
}

// ==========================================
// INITIALIZATION
// ==========================================
function initApp() {
  // Subscribe to state changes
  State.subscribe(() => {
    renderCurrentScreen();
  });

  // Header Back Button History Logic
  backBtn?.addEventListener('click', () => {
    AudioAssistance.stop();
    const curr = State.currentScreen;
    const role = State.session.accountType;

    if (role === AccountType.ARTISAN) {
      if (curr === 'craft_studio' || curr === 'artisan_orders' || curr === 'artisan_bank' || curr === 'artisan_profile') {
        State.setScreen('artisan_studio');
      } else if (curr === 'artisan_pehchan') {
        State.setScreen('artisan_studio');
      } else {
        State.setScreen('artisan_studio');
      }
    } else if (role === AccountType.BUYER) {
      if (curr === 'product_details') State.setScreen('buyer_explore');
      else if (curr === 'cart_review') State.setScreen('buyer_explore');
      else if (curr === 'checkout') State.setScreen('cart_review');
      else if (curr === 'buyer_search') State.setScreen('buyer_explore');
      else if (curr === 'buyer_orders') State.setScreen('buyer_explore');
      else if (curr === 'buyer_returns' || curr === 'returns_policy') State.setScreen('buyer_orders');
      else if (curr === 'buyer_profile') State.setScreen('buyer_explore');
      else if (curr === 'artisans') State.setScreen('buyer_explore');
      else State.setScreen('buyer_explore');
    } else if (role === AccountType.CORPORATE) {
      if (curr === 'corporate_catalog') State.setScreen('corporate_clusters');
      else if (curr === 'corporate_rfq') State.setScreen('corporate_catalog');
      else if (curr === 'corporate_quotes') State.setScreen('corporate_clusters');
      else if (curr === 'corporate_profile') State.setScreen('corporate_clusters');
      else State.setScreen('corporate_clusters');
    } else {
      // Pre-Auth back button routing
      if (['artisan_auth', 'buyer_auth', 'corporate_auth', 'account_recovery', 'languages', 'language_select'].includes(curr)) {
        State.setScreen('account_select');
      } else {
        State.setScreen('account_select');
      }
    }
  });

  // Screen Jumper Menu Modal
  document.getElementById('btn-steps-menu')?.addEventListener('click', () => {
    screensModal?.classList.add('active');
  });
  document.getElementById('btn-close-screens-menu')?.addEventListener('click', () => {
    screensModal?.classList.remove('active');
  });
  screensModal?.addEventListener('click', (e) => {
    if (e.target === screensModal) screensModal.classList.remove('active');
  });

  // Global Audio Button in Header: speaks localized audio in user's active language
  document.getElementById('btn-global-audio')?.addEventListener('click', () => {
    const curr = State.currentScreen;
    const spokenText = i18n.getScreenVoiceText(curr);
    AudioAssistance.speak(spokenText);
  });

  // Header Language Button -> Quick Language Switcher Sheet (10 Dialects)
  document.getElementById('btn-language')?.addEventListener('click', () => {
    AudioAssistance.stop();
    openQuickLanguageModal();
  });

  // Initialize UI & Language Pill - Start from URL or landing page (splash)
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    const hashScreen = window.location.hash ? window.location.hash.substring(1) : null;
    const paramScreen = urlParams.get('screen');
    const targetScreen = hashScreen || paramScreen || 'splash';
    State.setScreen(targetScreen);

    window.addEventListener('hashchange', () => {
      const newHash = window.location.hash ? window.location.hash.substring(1) : null;
      if (newHash && newHash !== State.currentScreen) {
        State.setScreen(newHash);
        renderCurrentScreen();
      }
    });
  }

  updateRoleBarUI();
  updateBottomNavUI();
  i18n.updateHeaderPill();
  renderCurrentScreen();
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
}

/**
 * Interactive Quick Language Switcher Modal
 * Enables instantaneous switching between 10 regional languages without session loss
 */
export function openQuickLanguageModal() {
  const existing = document.getElementById('quick-lang-modal');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.id = 'quick-lang-modal';
  modal.className = 'modal-overlay active';
  modal.innerHTML = `
    <div class="bottom-sheet" style="max-height:88vh; padding-bottom:24px;">
      <div class="sheet-header">
        <div class="sheet-title-group">
          <span style="font-size:1.3rem;">🌐</span>
          <div>
            <div style="font-size:1rem; font-weight:800;">${t('selectLanguage', 'Choose Your Language')}</div>
            <div style="font-size:0.68rem; color:var(--text-muted);">${t('selectLanguageSub', '10 Regional Dialects with Voice Assistance')}</div>
          </div>
        </div>
        <button type="button" class="sheet-close-btn" id="btn-close-quick-lang">✕</button>
      </div>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; margin: 10px 0 16px;">
        ${Object.values(LanguageMetadata).map(lang => {
          const isSel = lang.id === i18n.currentLang;
          return `
            <button type="button" class="quick-lang-btn" data-id="${lang.id}" style="text-align:left; padding:10px 12px; border-radius:10px; border:2px solid ${isSel ? 'var(--color-terracotta)' : 'var(--border-subtle)'}; background:${isSel ? '#FFF0E6' : '#FFFFFF'}; display:flex; flex-direction:column; gap:2px; cursor:pointer; transition:all 0.15s ease;">
              <div style="display:flex; justify-content:space-between; align-items:center; width:100%;">
                <span style="font-size:1.05rem; font-weight:800; color:var(--text-primary);">${lang.flag} ${lang.native}</span>
                ${isSel ? '<span style="color:var(--color-terracotta); font-weight:900; font-size:0.8rem;">✓</span>' : ''}
              </div>
              <span style="font-size:0.72rem; color:var(--text-secondary); font-weight:600;">${lang.english}</span>
            </button>
          `;
        }).join('')}
      </div>

      <div style="display:flex; gap:8px;">
        <button type="button" class="btn-secondary" id="btn-full-voice-guide" style="flex:1; padding:11px; font-size:0.78rem; font-weight:700;">
          🗣️ ${t('fullVoiceGuide', 'Full Voice Dialect Guide')}
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  modal.querySelectorAll('.quick-lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lid = btn.getAttribute('data-id');
      i18n.setLanguage(lid);
      const meta = LanguageMetadata[lid];
      const toastMsg = lid === 'en'
        ? `Language changed to English`
        : `भाषा: ${meta.native} (${meta.english})`;
      window.showToast?.(toastMsg);
      modal.remove();
    });
  });

  document.getElementById('btn-close-quick-lang')?.addEventListener('click', () => {
    modal.remove();
  });

  document.getElementById('btn-full-voice-guide')?.addEventListener('click', () => {
    modal.remove();
    window.navigateToScreen('language_select');
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.remove();
  });
}

if (typeof window !== 'undefined') {
  window.openQuickLanguageModal = openQuickLanguageModal;
}

