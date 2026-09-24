/**
 * Hastshilp Sangam / Karigra - Central Reactive State Store
 */

export const State = {
  currentScreen: 'welcome', // 'welcome' | 'pehchan' | 'bank' | 'studio' | 'explore' | 'artisans' | 'orders'
  activeTab: 'studio',
  role: 'artisan', // 'artisan' | 'buyer'
  language: 'en', // 'en' | 'hi'

  // Step 1: Identity & Phone Auth
  phone: '98450 21980',
  otp: ['8', '3', '1', ''],
  otpTimerSeconds: 108, // 01:48
  otpTimerInterval: null,

  // Step 2: Pehchan Registry
  pehchanId: 'UP-VAR-49281-H',
  isPehchanVerified: true,
  artisanName: 'Ramdev Kumhar',
  artisanRegisteredName: 'Shri Rameshwar Lal',
  clusterName: 'Varanasi Zari Guild Cluster (GI #84)',
  isScannerActive: false,

  // Step 3: Bank Khata
  bankMethod: 'passbook', // 'passbook' | 'manual'
  selectedBank: 'State Bank of India',
  accountHolder: 'Ramdev Kumhar',
  accountNumber: '3084190822914',
  ifscCode: 'SBIN0000201',
  branchName: 'SBI Main Branch, Varanasi',
  branchAddress: 'Kachehri Compound, Varanasi, Uttar Pradesh',
  isDbtChecked: true,

  // Step 4: Studio & Trust Score
  trustScore: 98,
  trustScoreModalOpen: false,
  ordersCount: 9,
  payoutsTotal: 46200,
  nextPayout: 8200,

  // Marketplace & Cart
  cart: [],

  // Orders
  urgentOrder: {
    id: 'ORD-2026-8812',
    title: '2x Terracotta Water Pitchers',
    destination: 'Bengaluru, Karnataka',
    consignmentId: 'IP-BNG-88231',
    status: 'urgent_incoming',
    amount: 1450,
    accepted: false
  },

  // Event Listeners for State Changes
  listeners: [],

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  },

  notify() {
    this.listeners.forEach(fn => fn(this));
  },

  setScreen(screenName) {
    this.currentScreen = screenName;
    if (['explore', 'artisans', 'orders', 'studio'].includes(screenName)) {
      this.activeTab = screenName;
    }
    this.notify();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  setRole(role) {
    this.role = role;
    this.notify();
  },

  setTrustScoreModal(open) {
    this.trustScoreModalOpen = open;
    this.notify();
  }
};
