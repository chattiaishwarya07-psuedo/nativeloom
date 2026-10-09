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
import { renderManageCraftsScreen } from './screens/manage_crafts.js';
import { renderArtisanDiscoverScreen } from './screens/artisan_discover.js';

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
import { renderArtisanChatScreen } from './screens/artisan_chat.js';

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
  manage_crafts: renderManageCraftsScreen,
  artisan_inventory: renderManageCraftsScreen,
  artisan_discover: renderArtisanDiscoverScreen,
  artisan_orders: renderArtisanIncomingOrdersScreen,
  artisan_bank: renderBankScreen,
  bank: renderBankScreen,
  artisan_pehchan: renderPehchanScreen,
  pehchan: renderPehchanScreen,
  studio: renderStudioScreen,
  artisan_profile: renderArtisanProfileScreen,
  home: (outlet) => {
    if (State.mode === 'corporate' || State.session?.accountType === AccountType.CORPORATE) {
      renderCorporateClustersScreen(outlet);
    } else if (State.mode === 'seller' || State.session?.accountType === AccountType.ARTISAN) {
      renderStudioScreen(outlet);
    } else {
      renderExploreScreen(outlet);
    }
  },
  profile: (outlet) => {
    if (State.mode === 'corporate' || State.session?.accountType === AccountType.CORPORATE) {
      renderCorporateProfileScreen(outlet);
    } else if (State.mode === 'seller' || State.session?.accountType === AccountType.ARTISAN) {
      renderArtisanProfileScreen(outlet);
    } else {
      renderBuyerProfileScreen(outlet);
    }
  },

  // Buyer Stack
  buyer_explore: (outlet) => {
    if (State.mode === 'corporate' || State.session?.accountType === AccountType.CORPORATE || CorporateStackScreens.includes(State.currentScreen)) {
      renderCorporateClustersScreen(outlet);
    } else {
      renderExploreScreen(outlet);
    }
  },
  explore: (outlet) => {
    if (State.mode === 'corporate' || State.session?.accountType === AccountType.CORPORATE || CorporateStackScreens.includes(State.currentScreen)) {
      renderCorporateClustersScreen(outlet);
    } else {
      renderExploreScreen(outlet);
    }
  },
  search: (outlet) => {
    if (State.mode === 'corporate' || State.session?.accountType === AccountType.CORPORATE || CorporateStackScreens.includes(State.currentScreen)) {
      renderCorporateCatalogScreen(outlet);
    } else if (State.mode === 'seller' || State.session?.accountType === AccountType.ARTISAN) {
      renderArtisanDiscoverScreen(outlet);
    } else {
      renderBuyerSearchScreen(outlet);
    }
  },
  buyer_search: (outlet) => {
    if (State.mode === 'corporate' || State.session?.accountType === AccountType.CORPORATE || CorporateStackScreens.includes(State.currentScreen)) {
      renderCorporateCatalogScreen(outlet);
    } else {
      renderBuyerSearchScreen(outlet);
    }
  },
  product_details: renderProductDetailsScreen,
  cart_review: renderCartReviewScreen,
  checkout: renderCheckoutScreen,
  buyer_orders: (outlet) => {
    if (State.mode === 'corporate' || State.session?.accountType === AccountType.CORPORATE || CorporateStackScreens.includes(State.currentScreen)) {
      renderCorporateQuotesScreen(outlet);
    } else {
      renderBuyerOrdersScreen(outlet);
    }
  },
  orders: (outlet) => {
    if (State.mode === 'corporate' || State.session?.accountType === AccountType.CORPORATE || CorporateStackScreens.includes(State.currentScreen)) {
      renderCorporateQuotesScreen(outlet);
    } else if (State.mode === 'seller' || State.session?.accountType === AccountType.ARTISAN) {
      renderArtisanIncomingOrdersScreen(outlet);
    } else {
      renderBuyerOrdersScreen(outlet);
    }
  },
  buyer_returns: renderReturnsPolicyScreen,
  returns_policy: renderReturnsPolicyScreen,
  buyer_profile: (outlet) => {
    if (State.mode === 'corporate' || State.session?.accountType === AccountType.CORPORATE || CorporateStackScreens.includes(State.currentScreen)) {
      renderCorporateProfileScreen(outlet);
    } else {
      renderBuyerProfileScreen(outlet);
    }
  },
  artisans: renderArtisansScreen,
  chat: renderArtisanChatScreen,
  artisan_chat: renderArtisanChatScreen,

  // Corporate Stack
  wholesale: renderCorporateClustersScreen,
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
  window.stopPehchanCamera?.();
  window.stopPassbookCamera?.();
  window.stopCraftCamera?.();
  window.stopCraftRecording?.();
  State.setScreen(screenName);
}

export function openArtisanChat(artisanNameOrObj) {
  if (artisanNameOrObj) {
    if (typeof artisanNameOrObj === 'object') {
      State.activeChatArtisan = artisanNameOrObj;
    } else {
      const art = (State.data.artisans || []).find(a =>
        (a.name && a.name.toLowerCase().includes(artisanNameOrObj.toLowerCase())) ||
        (a.artisanName && a.artisanName.toLowerCase().includes(artisanNameOrObj.toLowerCase()))
      ) || State.data.artisans?.[0];
      if (art) {
        State.activeChatArtisan = {
          name: art.name || art.artisanName || 'Ramdev Kumhar',
          craft: art.craft || art.craftType || 'Master Terracotta Craftsman',
          cluster: art.cluster || 'Chunar Cluster, Uttar Pradesh',
          avatar: art.avatar || '/assets/artisan_ramulu.jpg',
          pehchanId: art.pehchanId || 'UP-VAR-49281',
          phone: art.phone || '+91 94150 28910',
          years: art.years || '35 Yrs'
        };
      }
    }
  }
  navigateTo('chat');
}

if (typeof window !== 'undefined') {
  window.navigateToScreen = navigateTo;
  window.openArtisanChat = openArtisanChat;
  window.AudioAssistance = AudioAssistance;
  window.BackendApi = BackendApi;
  window.State = State;
  window.updateBottomNavUI = updateBottomNavUI;
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

  // Screens that should NEVER show the bottom taskbar / navigation (auth, onboarding, forms)
  const hideNavScreens = [
    'splash', 'language_select', 'languages', 'account_select',
    'artisan_auth', 'buyer_auth', 'corporate_auth',
    'welcome', 'welcome_identity', 'account_recovery',
    'artisan_pehchan', 'pehchan', 'artisan_bank', 'bank',
    'cart_review', 'checkout', 'product_details',
    'returns_policy', 'buyer_returns', 'about_impact',
    'chat', 'artisan_chat'
  ];

  if (hideNavScreens.includes(current)) {
    bottomNav.style.display = 'none';
    return;
  }

  bottomNav.style.display = 'flex';

  const isExplore = ['buyer_explore', 'explore'].includes(current);
  const isDiscover = ['buyer_search', 'product_details', 'artisans', 'artisan_discover'].includes(current);
  const isOrders = ['orders', 'artisan_orders', 'buyer_orders', 'cart_review', 'checkout'].includes(current);
  const isStudio = ['studio', 'artisan_studio', 'craft_studio', 'manage_crafts', 'artisan_inventory', 'artisan_discover', 'artisan_bank', 'artisan_pehchan', 'bank', 'pehchan', 'artisan_profile'].includes(current);

  // Corporate / B2B Mode Dedicated Bottom Navigation
  const isCorporateMode = State.mode === 'corporate' ||
                          State.session?.accountType === AccountType.CORPORATE ||
                          CorporateStackScreens.includes(current);

  if (isCorporateMode) {
    const isHomeTab = ['corporate_clusters', 'home', 'explore', 'wholesale'].includes(current);
    const isCatalogTab = ['corporate_catalog', 'catalog', 'search', 'buyer_search'].includes(current);
    const isOrdersTab = ['corporate_quotes', 'corporate_rfq', 'orders', 'buyer_orders'].includes(current);
    const isProfileTab = ['corporate_profile', 'profile', 'buyer_profile'].includes(current);

    bottomNav.innerHTML = `
      <button class="nav-tab ${isHomeTab ? 'active' : ''}" data-screen="corporate_clusters" id="tab-corp-home" onclick="window.navigateToScreen('corporate_clusters')" style="color: ${isHomeTab ? '#7A2813' : '#78716C'};">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
        <span style="font-weight:${isHomeTab ? '800' : '600'}; font-size:0.68rem;">${t('navHome', 'Home')}</span>
      </button>

      <button class="nav-tab ${isCatalogTab ? 'active' : ''}" data-screen="corporate_catalog" id="tab-corp-wholesale" onclick="window.navigateToScreen('corporate_catalog')" style="color: ${isCatalogTab ? '#7A2813' : '#78716C'};">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.3-4.3"/>
        </svg>
        <span style="font-weight:${isCatalogTab ? '800' : '600'}; font-size:0.68rem;">${t('navWholesale', 'Wholesale')}</span>
      </button>

      <button class="nav-tab ${isOrdersTab ? 'active' : ''}" data-screen="corporate_quotes" id="tab-corp-orders" onclick="window.navigateToScreen('corporate_quotes')" style="position:relative; color: ${isOrdersTab ? '#7A2813' : '#78716C'};">
        <div style="position:relative; display:inline-flex;">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <rect width="16" height="13" x="1" y="3" rx="2"/>
            <polygon points="16 8 20 8 23 11 23 16 16 8"/>
            <circle cx="5.5" cy="18.5" r="2.5"/>
            <circle cx="18.5" cy="18.5" r="2.5"/>
          </svg>
        </div>
        <span style="font-weight:${isOrdersTab ? '800' : '600'}; font-size:0.68rem;">${t('navOrders', 'Orders')}</span>
      </button>

      <button class="nav-tab ${isProfileTab ? 'active' : ''}" data-screen="corporate_profile" id="tab-corp-profile" onclick="window.navigateToScreen('corporate_profile')" style="color: ${isProfileTab ? '#7A2813' : '#78716C'};">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
        <span style="font-weight:${isProfileTab ? '800' : '600'}; font-size:0.68rem;">${t('navProfile', 'Profile')}</span>
      </button>
    `;
    return;
  }

  const isOrderTracking = ['buyer_orders'].includes(current);
  if (isOrderTracking) {
    bottomNav.innerHTML = `
      <button class="nav-tab" data-screen="explore" id="tab-orders-explore" onclick="window.navigateToScreen('${(State.mode === 'seller' || State.session?.accountType === AccountType.ARTISAN) ? 'artisan_studio' : 'explore'}')" style="color: #78716C;">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        <span style="font-weight:600; font-size:0.68rem;">${(State.mode === 'seller' || State.session?.accountType === AccountType.ARTISAN) ? t('navHome', 'Home') : t('navExplore', 'Explore')}</span>
      </button>

      <button class="nav-tab" data-screen="artisans" id="tab-orders-artisans" onclick="window.navigateToScreen('artisans')" style="color: #78716C;">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
        <span style="font-weight:600; font-size:0.68rem;">${t('navArtisans', 'Artisans')}</span>
      </button>

      <button class="nav-tab active" data-screen="orders" id="tab-orders-orders" onclick="window.navigateToScreen('buyer_orders')" style="color: #7A2813;">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
        <span style="font-weight:800; font-size:0.68rem;">${t('navOrders', 'Orders')}</span>
      </button>

      <button class="nav-tab" data-screen="profile" id="tab-orders-profile" onclick="window.navigateToScreen('buyer_profile')" style="color: #78716C;">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        <span style="font-weight:600; font-size:0.68rem;">${t('navProfile', 'Profile')}</span>
      </button>
    `;
    return;
  }

  // Buyer Mode (Matching Explore Market screenshot: Home, Search, Cart, Profile)
  if (isExplore || State.mode === 'buyer' || current === 'buyer_search' || current === 'buyer_profile') {
    const isHome = isExplore;
    const isSearch = ['buyer_search', 'artisans'].includes(current);
    const isCart = ['cart_review', 'checkout'].includes(current);
    const isProfile = ['buyer_profile', 'returns_policy', 'buyer_returns'].includes(current);
    const buyerCartCount = State.getCartCount();

    bottomNav.innerHTML = `
      <button class="nav-tab ${isHome ? 'active' : ''}" data-screen="explore" id="tab-buyer-home" onclick="window.navigateToScreen('${(State.mode === 'seller' || State.session?.accountType === AccountType.ARTISAN) ? 'artisan_studio' : 'explore'}')" style="color: ${isHome ? '#7A2813' : '#78716C'};">
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
          ${buyerCartCount > 0 ? `
            <span id="tab-buyer-cart-badge" style="position:absolute; top:-4px; right:-8px; background:#7A2813; color:#FFFFFF; border-radius:50%; width:15px; height:15px; font-size:0.58rem; font-weight:800; display:flex; align-items:center; justify-content:center;">
              ${buyerCartCount}
            </span>
          ` : ''}
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

  // Artisan / Seller Mode Dedicated Bottom Navigation
  const isArtisanMode = State.mode === 'seller' ||
                        State.session?.accountType === AccountType.ARTISAN ||
                        isStudio ||
                        ['artisan_studio', 'manage_crafts', 'artisan_inventory', 'artisan_discover', 'artisan_orders', 'artisan_profile', 'craft_studio', 'artisan_bank', 'artisan_pehchan'].includes(current);

  if (isArtisanMode) {
    const isHomeTab = ['artisan_studio', 'studio', 'craft_studio', 'artisan_bank', 'artisan_pehchan', 'bank', 'pehchan', 'home'].includes(current);
    const isCraftsTab = ['manage_crafts', 'artisan_inventory'].includes(current);
    const isDiscoverTab = ['artisan_discover'].includes(current);
    const isOrdersTab = ['artisan_orders'].includes(current);
    const isProfileTab = ['artisan_profile'].includes(current);
    const artisanOrdersCount = State.artisan?.incomingOrders?.length || 0;

    bottomNav.innerHTML = `
      <button class="nav-tab ${isHomeTab ? 'active' : ''}" data-screen="artisan_studio" id="tab-artisan-home" onclick="window.navigateToScreen('artisan_studio')" style="color: ${isHomeTab ? '#7A2813' : '#78716C'};">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
        <span style="font-weight:${isHomeTab ? '800' : '600'}; font-size:0.68rem;">${t('navHome', 'Home')}</span>
      </button>

      <button class="nav-tab ${isCraftsTab ? 'active' : ''}" data-screen="manage_crafts" id="tab-artisan-crafts" onclick="window.navigateToScreen('manage_crafts')" style="color: ${isCraftsTab ? '#7A2813' : '#78716C'};">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m7.5 4.27 9 5.15"/>
          <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/>
          <path d="m3.3 7 8.7 5 8.7-5"/>
          <path d="M12 22V12"/>
        </svg>
        <span style="font-weight:${isCraftsTab ? '800' : '600'}; font-size:0.68rem;">${t('navCrafts', 'Crafts')}</span>
      </button>

      <button class="nav-tab ${isDiscoverTab ? 'active' : ''}" data-screen="artisan_discover" id="tab-artisan-discover" onclick="window.navigateToScreen('artisan_discover')" style="color: ${isDiscoverTab ? '#7A2813' : '#78716C'};">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
        </svg>
        <span style="font-weight:${isDiscoverTab ? '800' : '600'}; font-size:0.68rem;">${t('navDiscover', 'Discover')}</span>
      </button>

      <button class="nav-tab ${isOrdersTab ? 'active' : ''}" data-screen="artisan_orders" id="tab-artisan-orders" onclick="window.navigateToScreen('artisan_orders')" style="position:relative; color: ${isOrdersTab ? '#7A2813' : '#78716C'};">
        <div style="position:relative; display:inline-flex;">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <rect width="16" height="13" x="1" y="3" rx="2"/>
            <polygon points="16 8 20 8 23 11 23 16 16 8"/>
            <circle cx="5.5" cy="18.5" r="2.5"/>
            <circle cx="18.5" cy="18.5" r="2.5"/>
          </svg>
          ${artisanOrdersCount > 0 ? `
            <span id="tab-artisan-orders-badge" style="position:absolute; top:-4px; right:-8px; background:#7A2813; color:#FFFFFF; border-radius:50%; width:15px; height:15px; font-size:0.58rem; font-weight:800; display:flex; align-items:center; justify-content:center;">
              ${artisanOrdersCount}
            </span>
          ` : ''}
        </div>
        <span style="font-weight:${isOrdersTab ? '800' : '600'}; font-size:0.68rem;">${t('navOrders', 'Orders')}</span>
      </button>

      <button class="nav-tab ${isProfileTab ? 'active' : ''}" data-screen="artisan_profile" id="tab-artisan-profile" onclick="window.navigateToScreen('artisan_profile')" style="color: ${isProfileTab ? '#7A2813' : '#78716C'};">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
        <span style="font-weight:${isProfileTab ? '800' : '600'}; font-size:0.68rem;">${t('navProfile', 'Profile')}</span>
      </button>
    `;
    return;
  }

  const isSellerRole = (State.mode === 'seller' || State.session?.accountType === AccountType.ARTISAN);
  const targetDiscover = isSellerRole ? 'artisan_discover' : 'buyer_search';
  const targetOrders = isSellerRole ? 'artisan_orders' : 'orders';
  const targetLast = isSellerRole ? 'artisan_studio' : 'buyer_profile';
  const targetLastLabel = isSellerRole ? t('navStudio', 'Studio') : t('navProfile', 'Profile');

  bottomNav.innerHTML = `
    <button class="nav-tab ${isHome ? 'active' : ''}" data-screen="home" id="tab-explore" onclick="window.navigateToScreen('${isSellerRole ? 'artisan_studio' : 'explore'}')">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
      <span>${t('navHome', 'Home')}</span>
    </button>

    <button class="nav-tab ${isDiscover ? 'active' : ''}" data-screen="discover" id="tab-discover" onclick="window.navigateToScreen('${targetDiscover}')">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
      <span>${t('navDiscover', 'Discover')}</span>
    </button>

    <button class="nav-tab ${isOrders ? 'active' : ''}" data-screen="orders" id="tab-orders" onclick="window.navigateToScreen('${targetOrders}')">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
      <span>${t('navOrders', 'Orders')}</span>
    </button>

    <button class="nav-tab ${isSellerRole ? (isStudio ? 'active' : '') : (['buyer_profile'].includes(current) ? 'active' : '')}" data-screen="${isSellerRole ? 'studio' : 'profile'}" id="tab-nav-last" onclick="window.navigateToScreen('${targetLast}')">
      ${isSellerRole ? `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.563-2.512 5.563-5.563C22 6.5 17.5 2 12 2Z"/></svg>
      ` : `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
      `}
      <span>${targetLastLabel}</span>
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

  // Synchronize Voice Guide ON/OFF toggle states on all buttons in the newly rendered screen
  AudioAssistance.updateAllTogglesUI();

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
  if (stepsMenuBtn) stepsMenuBtn.style.display = 'none';

  const isCorpScreen = ['corporate_clusters', 'corporate_catalog', 'corporate_quotes', 'corporate_profile', 'corporate_rfq', 'wholesale'].includes(current) || State.mode === 'corporate';
  if (current === 'artisan_studio' || current === 'craft_studio' || current === 'manage_crafts' || current === 'artisan_discover' || current === 'artisan_orders' || current === 'artisan_profile' || isExploreScreen || isOrderScreen || isCorpScreen) {
    if (bottomNav) bottomNav.style.display = 'flex';
  } else {
    if (bottomNav) bottomNav.style.display = 'none';
  }

  // Brand Logo and Profile Button on Header
  if (brandLogo) {
    brandLogo.style.display = 'flex';
  }
  if (profileBtn) {
    profileBtn.style.display = (!isCorpScreen && (isExploreScreen || isDetailScreen || isCartScreen || isCheckoutScreen || isOrderScreen)) ? 'flex' : 'none';
  }
  if (audioLabel) {
    audioLabel.style.display = (isExploreScreen || isDetailScreen || isCartScreen || isCheckoutScreen || isOrderScreen || isCorpScreen) ? 'none' : 'inline';
  }
  const langBtn = document.getElementById('btn-language');
  if (langBtn) {
    langBtn.style.display = (isDetailScreen || isCartScreen || isCheckoutScreen) ? 'none' : 'flex';
  }
  i18n.updateHeaderPill();

  // Contextual Header Title with i18n
  if (headerTitle) {
    if (current === 'corporate_clusters' || current === 'wholesale') {
      headerTitle.innerHTML = `<span style="font-family:'Playfair Display', Georgia, serif; font-size:1.15rem; font-weight:900; color:#7A2813; letter-spacing:-0.01em; line-height:1;">Native Loom</span><span style="font-size:0.55rem; font-weight:800; color:#0F172A; letter-spacing:0.06em; text-transform:uppercase;">B2B CLUSTER SOURCING</span>`;
    } else if (current === 'corporate_catalog') {
      headerTitle.innerHTML = `<span style="font-family:'Playfair Display', Georgia, serif; font-size:1.15rem; font-weight:900; color:#7A2813; letter-spacing:-0.01em; line-height:1;">Native Loom</span><span style="font-size:0.55rem; font-weight:800; color:#0F172A; letter-spacing:0.06em; text-transform:uppercase;">WHOLESALE CATALOG</span>`;
    } else if (current === 'corporate_quotes' || current === 'corporate_rfq') {
      headerTitle.innerHTML = `<span style="font-family:'Playfair Display', Georgia, serif; font-size:1.15rem; font-weight:900; color:#7A2813; letter-spacing:-0.01em; line-height:1;">Native Loom</span><span style="font-size:0.55rem; font-weight:800; color:#0F172A; letter-spacing:0.06em; text-transform:uppercase;">B2B QUOTES &amp; RFQ</span>`;
    } else if (current === 'corporate_profile') {
      headerTitle.innerHTML = `<span style="font-family:'Playfair Display', Georgia, serif; font-size:1.15rem; font-weight:900; color:#7A2813; letter-spacing:-0.01em; line-height:1;">Native Loom</span><span style="font-size:0.55rem; font-weight:800; color:#0F172A; letter-spacing:0.06em; text-transform:uppercase;">B2B KYB PROFILE</span>`;
    } else if (isExploreScreen) {
      headerTitle.innerHTML = `<span style="font-family:'Playfair Display', Georgia, serif; font-size:1.15rem; font-weight:900; color:#7A2813; letter-spacing:-0.01em; line-height:1;">Native Loom</span><span style="font-size:0.55rem; font-weight:800; color:#71655D; letter-spacing:0.06em; text-transform:uppercase;">${t('subExplore', 'EXPLORE MARKET')}</span>`;
    } else if (isOrderScreen) {
      headerTitle.innerHTML = `<span style="font-family:'Playfair Display', Georgia, serif; font-size:1.15rem; font-weight:900; color:#7A2813; letter-spacing:-0.01em; line-height:1;">Native Loom</span><span style="font-size:0.55rem; font-weight:800; color:#71655D; letter-spacing:0.06em; text-transform:uppercase;">${t('subOrders', 'ORDERS')}</span>`;
    } else if (isDetailScreen) {
      headerTitle.innerHTML = `<span style="font-family:'Playfair Display', Georgia, serif; font-size:1.15rem; font-weight:900; color:#7A2813; letter-spacing:-0.01em; line-height:1;">Native Loom</span><span style="font-size:0.55rem; font-weight:800; color:#71655D; letter-spacing:0.06em; text-transform:uppercase;">${t('subCraftPiece', 'CRAFT PIECE')}</span>`;
    } else if (isCartScreen) {
      headerTitle.innerHTML = `<span style="font-family:'Playfair Display', Georgia, serif; font-size:1.15rem; font-weight:900; color:#7A2813; letter-spacing:-0.01em; line-height:1;">Native Loom</span><span style="font-size:0.55rem; font-weight:800; color:#71655D; letter-spacing:0.06em; text-transform:uppercase;">${t('subCart', 'DIRECT CART')}</span>`;
    } else if (isCheckoutScreen) {
      headerTitle.innerHTML = `<span style="font-family:'Playfair Display', Georgia, serif; font-size:1.15rem; font-weight:900; color:#7A2813; letter-spacing:-0.01em; line-height:1;">Native Loom</span><span style="font-size:0.55rem; font-weight:800; color:#71655D; letter-spacing:0.06em; text-transform:uppercase;">${t('subCheckout', 'CHECKOUT')}</span>`;
    } else if (current === 'manage_crafts' || current === 'artisan_inventory') {
      headerTitle.innerHTML = `<span style="font-family:'Playfair Display', Georgia, serif; font-size:1.15rem; font-weight:900; color:#7A2813; letter-spacing:-0.01em; line-height:1;">Native Loom</span><span style="font-size:0.55rem; font-weight:800; color:#71655D; letter-spacing:0.06em; text-transform:uppercase;">CRAFT INVENTORY</span>`;
    } else if (current === 'artisan_discover') {
      headerTitle.innerHTML = `<span style="font-family:'Playfair Display', Georgia, serif; font-size:1.15rem; font-weight:900; color:#7A2813; letter-spacing:-0.01em; line-height:1;">Native Loom</span><span style="font-size:0.55rem; font-weight:800; color:#71655D; letter-spacing:0.06em; text-transform:uppercase;">MARKET TRENDS</span>`;
    } else if (current === 'artisan_profile') {
      headerTitle.innerHTML = `<span style="font-family:'Playfair Display', Georgia, serif; font-size:1.15rem; font-weight:900; color:#7A2813; letter-spacing:-0.01em; line-height:1;">Native Loom</span><span style="font-size:0.55rem; font-weight:800; color:#71655D; letter-spacing:0.06em; text-transform:uppercase;">ARTISAN PROFILE</span>`;
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

  // Concise Page Summary Audio Guide (strictly plays only if voice toggle is ON)
  AudioAssistance.speakPageSummary(current);

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

  // 6. Artisan Story & Flawless Trust Score Modal (Appears on Buyers screens)
  window.showArtisanStoryModal = function(artisan) {
    artisan = artisan || {
      name: 'Ramdev Kumhar',
      avatar: '/assets/artisan_ramulu.jpg',
      pehchanId: 'UP-VAR-49281',
      cluster: 'Varanasi Clay Cluster, UP',
      trustScore: 98,
      craft: 'Master Terracotta Potter',
      story: 'नमस्ते। मैं रामदेव कुम्हार। चुनार क्लस्टर में हमारी पांच पीढ़ियों से पवित्र नदी की गाद मिट्टी से सुराही और पारंपरिक घड़े गढ़े जा रहे हैं। यह पात्र बिना बिजली के पानी को अमृत जैसा शीतल और प्राकृतिक रूप से क्षारीय रखता है।'
    };

    const existing = document.getElementById('modal-artisan-story');
    if (existing) {
      window.AudioAssistance?.stop();
      existing.remove();
    }

    const modal = document.createElement('div');
    modal.id = 'modal-artisan-story';
    modal.className = 'modal-overlay active';
    modal.style.cssText = 'display:flex; align-items:flex-end; justify-content:center; position:fixed; inset:0; background:rgba(0,0,0,0.65); z-index:9999; backdrop-filter:blur(3px);';

    modal.innerHTML = `
      <div class="bottom-sheet animate-slide-up" style="max-height:92vh; width:100%; max-width:480px; overflow-y:auto; background:#FAF7F2; border-radius:20px 20px 0 0; padding:16px 16px 28px; box-shadow:0 -4px 20px rgba(0,0,0,0.18);">

        <!-- Top Header Row -->
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
          <div style="display:flex; align-items:center; gap:6px;">
            <span style="font-size:1.1rem;">🏺</span>
            <span style="font-size:0.75rem; font-weight:800; color:#7A2813; letter-spacing:0.04em; text-transform:uppercase;">
              Artisan Story &amp; Trust Credentials
            </span>
          </div>
          <button type="button" class="sheet-close-btn" id="btn-close-artisan-story" style="background:#EAE5DE; border:none; border-radius:50%; width:28px; height:28px; font-size:0.85rem; cursor:pointer; display:flex; align-items:center; justify-content:center; color:#1E150F;">✕</button>
        </div>

        <!-- EXACT CARD FROM SCREENSHOT -->
        <div style="background:#FFFFFF; border:1px solid #ECE6DE; border-radius:14px; padding:16px 14px; margin-bottom:14px; box-shadow:0 1px 4px rgba(0,0,0,0.03);">

          <!-- Profile Top Section -->
          <div style="display:flex; align-items:center; gap:14px; margin-bottom:14px;">
            <div style="position:relative; width:64px; height:64px; flex-shrink:0;">
              <img src="${artisan.avatar || '/assets/artisan_ramulu.jpg'}" alt="${artisan.name}" style="width:100%; height:100%; object-fit:cover; border-radius:10px;" onerror="this.src='/assets/artisan_budhram.jpg'">
              <div style="position:absolute; bottom:-3px; right:-3px; width:20px; height:20px; border-radius:50%; background:#1E6B47; color:#FFFFFF; display:flex; align-items:center; justify-content:center; border:2px solid #FFFFFF;">
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
            </div>
            <div style="flex:1;">
              <div style="font-size:1.2rem; font-weight:800; color:#1E150F; margin-bottom:2px;">
                ${artisan.name || 'Ramdev Kumhar'}
              </div>
              <div style="display:flex; align-items:center; gap:4px; font-size:0.75rem; color:#873413; font-weight:700; margin-bottom:2px;">
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
                Verified Master Artisan
              </div>
              <div style="font-size:0.72rem; color:#71655D; margin-bottom:2px;">
                Pehchan #${artisan.pehchanId || 'UP-VAR-49281'}
              </div>
              <div style="display:flex; align-items:center; gap:4px; font-size:0.72rem; color:#71655D;">
                <span style="color:#7A2813; font-size:0.85rem;">📍</span>
                ${artisan.cluster || 'Varanasi Clay Cluster, UP'}
              </div>
            </div>
          </div>

          <!-- Flawless Trust Score Container -->
          <div style="background:#FAF8F5; border:1px solid #EAE3D9; border-radius:10px; padding:12px 14px;">
            <div style="display:flex; align-items:center; gap:14px; margin-bottom:10px;">
              <!-- Circular Gauge 98 / 100 -->
              <div style="position:relative; width:52px; height:52px; flex-shrink:0;">
                <svg viewBox="0 0 36 36" width="52" height="52">
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#E5DAC8" stroke-width="3" />
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#1E6B47" stroke-width="3.2" stroke-dasharray="${artisan.trustScore || 98}, 100" stroke-linecap="round" />
                </svg>
                <div style="position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; line-height:1;">
                  <span style="font-size:0.92rem; font-weight:900; color:#174332;">${artisan.trustScore || 98}</span>
                  <span style="font-size:0.55rem; color:#71655D; font-weight:700;">/100</span>
                </div>
              </div>

              <div style="flex:1;">
                <div style="font-size:0.95rem; font-weight:800; color:#1E150F; margin-bottom:3px;">
                  Flawless Trust Score
                </div>
                <div style="font-size:0.72rem; color:#71655D; line-height:1.35;">
                  0% platform fee • Instant Delivery Agent daily pickups unlocked
                </div>
              </div>
            </div>

            <button type="button" id="btn-see-how-trust" style="width:100%; background:#FFFFFF; border:1px solid #EAE3D9; border-radius:6px; padding:8px; text-align:center; cursor:pointer;">
              <span id="text-see-how-label" style="font-size:0.75rem; font-weight:700; color:#7A2813;">See how</span>
            </button>
          </div>

        </div>

        <!-- Trust Breakdown Details Panel (Toggled by "See how") -->
        <div id="trust-breakdown-details" style="display:none; background:#E8F5EE; border:1px solid #B7DFCA; border-radius:12px; padding:12px 14px; margin-bottom:14px; font-size:0.72rem; line-height:1.45;">
          <div style="font-weight:900; color:#174332; margin-bottom:8px; display:flex; align-items:center; gap:6px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1E6B47" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            <span>Why ${artisan.name}'s Trust Score is ${artisan.trustScore || 98}/100:</span>
          </div>
          <div style="display:flex; flex-direction:column; gap:6px; color:#174332;">
            <div>✓ <strong>Official Pehchan Card:</strong> Biometrically verified with Ministry of Textiles (Govt. of India).</div>
            <div>✓ <strong>0% Middleman Deduction:</strong> 100% of buyer money transfers directly to artisan's Jan Dhan bank account.</div>
            <div>✓ <strong>Direct Cluster Source:</strong> Handcrafted directly in Varanasi/Chunar, no wholesale agents.</div>
            <div>✓ <strong>Delivery Agent Dispatch:</strong> Daily direct scheduled courier pickups with fragile transit guarantee.</div>
          </div>
        </div>

        <!-- Oral Story Playback & Heritage Section -->
        <div style="background:#FFFFFF; border:1px solid #ECE7E1; border-radius:14px; padding:14px; margin-bottom:14px; box-shadow:0 1px 4px rgba(0,0,0,0.03);">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <div style="width:28px; height:28px; border-radius:50%; background:#D97706; color:#FFFFFF; display:flex; align-items:center; justify-content:center; font-size:0.85rem;">
                🎙️
              </div>
              <div>
                <div style="font-size:0.84rem; font-weight:900; color:#1C1917;">Artisan's Oral Heritage Story</div>
                <div style="font-size:0.65rem; color:#78716C;">Recorded in Native Dialect • 02:10</div>
              </div>
            </div>
            <span style="font-size:0.68rem; font-family:monospace; color:#78716C;" id="modal-story-timer">00:00 / 02:10</span>
          </div>

          <!-- Audio Player Bar -->
          <div style="background:#FAF5EE; border-radius:10px; padding:8px 12px; display:flex; align-items:center; gap:12px; margin-bottom:10px;">
            <button type="button" id="btn-modal-story-play" style="width:36px; height:36px; border-radius:50%; background:#7A2813; color:#FFFFFF; border:none; display:flex; align-items:center; justify-content:center; cursor:pointer; flex-shrink:0;">
              <svg id="icon-modal-play" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3"/>
              </svg>
            </button>

            <!-- Sound waves -->
            <div id="modal-audio-wave" style="flex:1; display:flex; align-items:center; gap:3px; height:22px;">
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

          <!-- Spoken Story Narrative -->
          <div style="font-size:0.75rem; color:#57534E; line-height:1.45; background:#FAF7F2; border-radius:8px; padding:10px 12px; border:1px solid #ECE7E1;">
            "${artisan.story}"
          </div>
        </div>

        <!-- Action Buttons -->
        <div style="display:flex; gap:8px;">
          <button type="button" class="btn-primary" style="flex:1.4; padding:12px; font-size:0.82rem; font-weight:800; background:#7A2813;" id="btn-modal-explore-crafts">
            Explore ${artisan.name}'s Crafts →
          </button>
          <button type="button" class="btn-secondary" style="flex:1; padding:12px; font-size:0.82rem; font-weight:800;" onclick="document.getElementById('modal-artisan-story')?.remove(); (window.openArtisanChat ? window.openArtisanChat('${artisan.name}') : window.navigateToScreen('chat'));">
            📞 Direct Talk
          </button>
        </div>

      </div>
    `;

    document.body.appendChild(modal);

    // Event Handlers for the Story Modal
    let isPlaying = false;
    const playBtn = modal.querySelector('#btn-modal-story-play');
    const playIcon = modal.querySelector('#icon-modal-play');
    const timer = modal.querySelector('#modal-story-timer');
    const seeHowBtn = modal.querySelector('#btn-see-how-trust');
    const seeHowLabel = modal.querySelector('#text-see-how-label');
    const breakdown = modal.querySelector('#trust-breakdown-details');
    const closeBtn = modal.querySelector('#btn-close-artisan-story');
    const exploreBtn = modal.querySelector('#btn-modal-explore-crafts');

    function toggleAudio() {
      if (isPlaying) {
        window.AudioAssistance?.stop();
        isPlaying = false;
        if (playIcon) playIcon.innerHTML = '<polygon points="5 3 19 12 5 21 5 3"/>';
        if (timer) timer.textContent = '00:00 / 02:10';
      } else {
        if (!window.AudioAssistance?.isEnabled) {
          window.showToast?.("🔇 Voice Guide is currently OFF. Turn it ON from the top header to listen.");
          return;
        }
        isPlaying = true;
        if (playIcon) playIcon.innerHTML = '<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>';
        if (timer) timer.textContent = '00:15 / 02:10';
        window.AudioAssistance?.speak(artisan.story, "hi-IN");
      }
    }

    playBtn?.addEventListener('click', toggleAudio);

    // Audio does not start automatically on modal open; user can tap Play whenever ready

    seeHowBtn?.addEventListener('click', () => {
      const isHidden = breakdown.style.display === 'none';
      breakdown.style.display = isHidden ? 'block' : 'none';
      if (seeHowLabel) seeHowLabel.textContent = isHidden ? 'Hide details' : 'See how';
    });

    closeBtn?.addEventListener('click', () => {
      window.AudioAssistance?.stop();
      modal.remove();
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        window.AudioAssistance?.stop();
        modal.remove();
      }
    });

    exploreBtn?.addEventListener('click', () => {
      window.AudioAssistance?.stop();
      modal.remove();
      window.navigateToScreen('buyer_search');
    });
  };

  // Global helper to open details for any produced craft
  window.showCraftDetails = (craftId) => {
    let found = null;
    if (State.data?.crafts) {
      found = State.data.crafts.find(c => c.id === craftId);
    }
    if (!found && State.getProducedCrafts) {
      found = State.getProducedCrafts().find(c => c.id === craftId);
    }
    if (!found && State.producedCrafts) {
      found = State.producedCrafts.find(c => c.id === craftId);
    }
    if (!found && State.artisan?.activeCrafts) {
      found = State.artisan.activeCrafts.find(c => c.id === craftId);
    }
    if (!found && State.data?.crafts) {
      found = State.data.crafts.find(c => c.id.toLowerCase().includes(String(craftId).toLowerCase()) || String(craftId).toLowerCase().includes(c.id.toLowerCase()));
    }
    if (found) {
      const artisan = found.artisanId ? State.data?.getArtisan?.(found.artisanId) : null;
      const cluster = found.clusterId ? State.data?.getCluster?.(found.clusterId) : (artisan?.clusterId ? State.data?.getCluster?.(artisan.clusterId) : null);

      State.selectedCraft = {
        ...found,
        artisan: found.artisan || artisan?.name || 'Master Artisan',
        cluster: found.cluster || cluster?.name || 'Verified Heritage Cluster',
        giTag: found.giTag || found.giTagNumber || cluster?.giTagNumber || 'GI Certified',
        image: found.image || found.images?.[0] || '/assets/terracotta_pitcher.jpg',
        images: (found.images && found.images.length > 0) ? found.images : [found.image || '/assets/terracotta_pitcher.jpg']
      };
    }
    window.navigateToScreen('product_details');
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
      if (curr === 'craft_studio' || curr === 'manage_crafts' || curr === 'artisan_discover' || curr === 'artisan_orders' || curr === 'artisan_bank' || curr === 'artisan_profile') {
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
      else if (curr === 'chat' || curr === 'artisan_chat') State.setScreen('buyer_explore');
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

  // Universal Delegated Voice Guide ON/OFF Toggle Button Handler (Works on header and all screens)
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.voice-guide-toggle-btn, #btn-voice-guide-toggle, #btn-global-audio, #screen-audio-btn, #splash-voice-guide-btn, #discover-voice-guide-btn');
    if (btn) {
      e.stopPropagation();
      AudioAssistance.toggle();
    }
  });

  // Theme Toggle Button Handler (Dark / Light theme)
  const themeToggleBtn = document.getElementById('btn-theme-toggle');
  const themeIcon = document.getElementById('theme-icon');

  function applyTheme(theme) {
    const isDark = theme === 'dark';
    document.body.classList.toggle('dark-theme', isDark);
    if (themeIcon) {
      themeIcon.innerHTML = isDark
        ? `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E27244" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`
        : `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`;
    }
    if (themeToggleBtn) {
      themeToggleBtn.setAttribute('title', isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme');
      themeToggleBtn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
    }
    State.theme = theme;
    try {
      localStorage.setItem('nl_theme', theme);
    } catch (e) {}
  }

  // Initial theme setup on launch
  const savedTheme = (typeof localStorage !== 'undefined' && localStorage.getItem('nl_theme')) || State.theme || 'light';
  applyTheme(savedTheme);

  themeToggleBtn?.addEventListener('click', () => {
    const nextTheme = State.theme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    window.showToast?.(nextTheme === 'dark' ? '🌙 Dark theme activated' : '☀️ Light theme activated');
  });

  // Header Language Button -> Quick Language Switcher Sheet (22 Dialects)
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

    // Strictly default to English when prototype link is opened unless explicitly chosen
    const urlLang = urlParams.get('lang');
    if (urlLang && LanguageMetadata[urlLang]) {
      i18n.setLanguage(urlLang);
    } else {
      const explicitLang = (typeof localStorage !== 'undefined') ? localStorage.getItem('nl_language') : null;
      if (!explicitLang) {
        State.language = 'en';
        document.documentElement.lang = 'en';
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('nl_language', 'en');
          localStorage.removeItem('klv_language');
        }
      } else {
        State.language = explicitLang;
        document.documentElement.lang = explicitLang;
      }
    }

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
 * Enables instantaneous switching between 22 regional languages without session loss
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
            <div style="font-size:0.68rem; color:var(--text-muted);">${t('selectLanguageSub', '22 Official Regional Languages with Voice Assistance')}</div>
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

