/**
 * Hastshilp Sangam / Karigra - Main Application Controller
 * Handles all 12 Live Screens, Global Routing, Audio Assistance, and Micro-interactions
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
import { renderReturnsPolicyScreen } from './screens/returns_policy.js';
import { renderAccountRecoveryScreen } from './screens/account_recovery.js';
import { renderWholesaleScreen } from './screens/wholesale_b2b.js';
import { AudioAssistance } from './speech.js';

// Complete 12-Screen Dictionary
const Screens = {
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

// Global navigation helper
export function navigateTo(screenName) {
  if (!Screens[screenName]) return;
  AudioAssistance.stop();
  State.setScreen(screenName);
}
window.navigateToScreen = navigateTo;
window.AudioAssistance = AudioAssistance;

// Render current screen from state
function renderCurrentScreen() {
  const current = State.currentScreen;
  const renderer = Screens[current] || renderWelcomeScreen;
  renderer(outlet);

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
    headerTitle.textContent = 'Karigra Studio';
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

  // Update bottom nav active state
  document.querySelectorAll('.nav-tab').forEach(tab => {
    const tabScreen = tab.getAttribute('data-screen');
    if (tabScreen === current || (current === 'craft_studio' && tabScreen === 'studio') || (current === 'product_details' && tabScreen === 'explore')) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });

  // Close screen menu modal if open
  screensModal.classList.remove('active');
}

// Global Toast Notification Helper
window.showToast = function(msg) {
  const container = document.getElementById('toast-container');
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

// Event Listeners Setup
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
    else State.setScreen('studio');
  });

  // Screen Jumper Menu
  document.getElementById('btn-steps-menu').addEventListener('click', () => {
    screensModal.classList.add('active');
  });
  document.getElementById('btn-close-screens-menu').addEventListener('click', () => {
    screensModal.classList.remove('active');
  });
  screensModal.addEventListener('click', (e) => {
    if (e.target === screensModal) screensModal.classList.remove('active');
  });

  // Global Audio Button in Header
  document.getElementById('btn-global-audio').addEventListener('click', () => {
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

  // Header Language Button -> Opens 10 Languages Screen!
  document.getElementById('btn-language').addEventListener('click', () => {
    AudioAssistance.stop();
    State.setScreen('languages');
  });

  // Bottom Navigation Bar tabs
  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const screen = tab.getAttribute('data-screen');
      AudioAssistance.stop();
      State.setScreen(screen);
    });
  });

  // Initial Render
  renderCurrentScreen();
});
