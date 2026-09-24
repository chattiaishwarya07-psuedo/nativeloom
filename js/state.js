/**
 * Hastshilp Sangam / Karigra - Central Reactive State Store
 * Manages Seller (Artisan) vs Buyer (Patron) personas, dynamic cart,
 * AI listings, wholesale RFQs, return cases, and live data models.
 */

export const State = {
  // Mode: 'seller' (Karigar / Artisan) | 'buyer' (Patron / Consumer / Wholesale)
  mode: 'seller', 
  currentScreen: 'studio',
  activeTab: 'studio',
  language: 'hi', // 'hi' | 'en' | 'bn' | 'ta' | 'te' | 'mr' | 'gu' | 'kn' | 'bho' | 'mai'
  
  // Step 1: Identity & Phone Auth
  phone: '98450 21980',
  otp: ['8', '3', '1', ''],
  otpTimerSeconds: 108,
  otpTimerInterval: null,

  // Step 2: Pehchan Registry
  pehchanId: 'UP-VAR-49281-H',
  isPehchanVerified: true,
  artisanName: 'Ramdev Kumhar',
  artisanRegisteredName: 'Shri Rameshwar Lal',
  clusterName: 'Gorakhpur Terracotta Cluster (GI #182)',
  isScannerActive: false,

  // Step 3: Bank Khata
  bankMethod: 'passbook',
  selectedBank: 'State Bank of India',
  accountHolder: 'Ramdev Kumhar',
  accountNumber: '3084190822914',
  ifscCode: 'SBIN0000201',
  branchName: 'SBI Main Branch, Gorakhpur',
  branchAddress: 'Kachehri Compound, Gorakhpur, Uttar Pradesh',
  isDbtChecked: true,

  // Step 4: Studio & Trust Score
  trustScore: 98,
  trustScoreModalOpen: false,
  ordersCount: 9,
  payoutsTotal: 46200,
  nextPayout: 8200,

  // Seller's Live Inventory & Drafts
  artisanInventory: [
    {
      id: 'inv-1',
      title: 'Gorakhpur Traditional Terracotta Pitcher',
      price: 680,
      stock: 14,
      image: '/assets/raw_pottery_snap.jpg',
      status: 'active',
      giTag: 'GI-UP-182',
      views: 342,
      orders: 8
    },
    {
      id: 'inv-2',
      title: 'Hand-carved Floral Water Surahi',
      price: 950,
      stock: 6,
      image: '/assets/blue_pottery.jpg',
      status: 'active',
      giTag: 'GI-UP-182',
      views: 189,
      orders: 3
    }
  ],

  // Buyer: Dynamic Cart with initial items matching design screens
  cart: [
    {
      id: 'cart-1',
      productId: 'prod-terracotta',
      title: 'Gorakhpur Terracotta Water Pitcher',
      artisan: 'Ramdev Kumhar',
      origin: 'Gorakhpur Cluster (GI #182)',
      price: 680,
      quantity: 1,
      image: '/assets/raw_pottery_snap.jpg',
      artisanShare: 580,
      transitInsurance: 40,
      gst: 60,
      leadTime: '3-5 Days',
      dispatchPartner: 'India Post Speed Parcel'
    },
    {
      id: 'cart-2',
      productId: 'prod-brass-bell',
      title: 'Bastar Lost-Wax Brass Bell Figurine',
      artisan: 'Budhram Baghel',
      origin: 'Bastar Dhokra Cluster (GI #84)',
      price: 820,
      quantity: 1,
      image: '/assets/dhokra_brass.jpg',
      artisanShare: 710,
      transitInsurance: 50,
      gst: 60,
      leadTime: '5-7 Days',
      dispatchPartner: 'India Post Speed Parcel'
    }
  ],

  // Buyer: Active Orders & Tracking
  buyerOrders: [
    {
      id: 'ORD-2026-9041',
      date: '2026-09-24',
      items: ['Gorakhpur Terracotta Pitcher', 'Bastar Brass Bell'],
      total: 1500,
      status: 'Shipped via India Post',
      trackingCode: 'IP-UP-902188',
      artisanBlessing: 'Shri Ramdev Kumhar has blessed your clay vessel with holy Ganga clay water.'
    }
  ],

  // Returns Cases filed
  returnCases: [
    {
      id: 'RET-2026-041',
      orderId: 'ORD-2026-8812',
      itemTitle: 'Terracotta Water Pitcher',
      reason: 'Broken in Transit',
      status: 'Pickup Scheduled',
      pickupDate: 'Tomorrow by India Post',
      refundStatus: '100% Guaranteed via Craft Insurance Fund',
      trackingNumber: 'IP-REV-849102'
    }
  ],

  // Wholesale B2B RFQs
  rfqList: [
    {
      id: 'RFQ-2026-108',
      cluster: 'Gorakhpur Terracotta Cluster',
      item: 'Terracotta Botanical Planters',
      quantity: 250,
      ratePerPiece: 340,
      totalAmount: 85000,
      company: 'Heritage Eco Resorts India Ltd.',
      status: 'Cluster Review & Sample Sent'
    }
  ],

  // Urgent dispatch order for Seller
  urgentOrder: {
    id: 'ORD-2026-8812',
    title: '2x Terracotta Water Pitchers',
    destination: 'Bengaluru, Karnataka (PIN 560001)',
    consignmentId: 'IP-BNG-88231',
    status: 'urgent_incoming',
    amount: 1450,
    artisanEarning: 1240,
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

  // Switch between Seller (Artisan) and Buyer (Patron) modes
  setMode(mode) {
    this.mode = mode;
    if (mode === 'seller') {
      this.setScreen('studio');
    } else {
      this.setScreen('explore');
    }
    this.notify();
  },

  setScreen(screenName) {
    this.currentScreen = screenName;
    if (['explore', 'wholesale', 'orders', 'studio', 'craft_studio', 'cart_review'].includes(screenName)) {
      this.activeTab = screenName;
    }
    this.notify();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  setRole(role) {
    this.mode = role === 'buyer' ? 'buyer' : 'seller';
    this.notify();
  },

  setLanguage(langCode) {
    this.language = langCode;
    this.notify();
  },

  setTrustScoreModal(open) {
    this.trustScoreModalOpen = open;
    this.notify();
  },

  // Cart operations
  addToCart(product) {
    const existing = this.cart.find(item => item.id === product.id || item.productId === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.cart.push({
        id: product.id || `cart-${Date.now()}`,
        productId: product.id,
        title: product.title,
        artisan: product.artisan || 'Ramdev Kumhar',
        origin: product.origin || 'Gorakhpur Cluster (GI #182)',
        price: product.price || 680,
        quantity: 1,
        image: product.image || '/assets/raw_pottery_snap.jpg',
        artisanShare: Math.round((product.price || 680) * 0.85),
        transitInsurance: 40,
        gst: Math.round((product.price || 680) * 0.08),
        leadTime: '3-5 Days',
        dispatchPartner: 'India Post Speed Parcel'
      });
    }
    this.notify();
  },

  updateCartQuantity(cartItemId, delta) {
    const item = this.cart.find(i => i.id === cartItemId);
    if (item) {
      item.quantity += delta;
      if (item.quantity <= 0) {
        this.cart = this.cart.filter(i => i.id !== cartItemId);
      }
      this.notify();
    }
  },

  removeFromCart(cartItemId) {
    this.cart = this.cart.filter(i => i.id !== cartItemId);
    this.notify();
  },

  clearCart() {
    this.cart = [];
    this.notify();
  },

  getCartCount() {
    return this.cart.reduce((sum, item) => sum + item.quantity, 0);
  },

  getCartSubtotal() {
    return this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  },

  getCartArtisanShare() {
    return this.cart.reduce((sum, item) => sum + (item.artisanShare * item.quantity), 0);
  },

  getCartInsuranceTotal() {
    return this.cart.reduce((sum, item) => sum + (item.transitInsurance * item.quantity), 0);
  },

  getCartGstTotal() {
    return this.cart.reduce((sum, item) => sum + (item.gst * item.quantity), 0);
  },

  // Publish new craft item from AI Studio
  publishCraftItem(newItem) {
    this.artisanInventory.unshift(newItem);
    this.ordersCount += 1;
    this.notify();
  },

  // File new return request
  fileReturnRequest(returnReq) {
    this.returnCases.unshift({
      id: `RET-2026-${Math.floor(100 + Math.random() * 900)}`,
      date: new Date().toISOString().split('T')[0],
      ...returnReq,
      status: 'Pickup Scheduled',
      trackingNumber: `IP-REV-${Math.floor(100000 + Math.random() * 900000)}`
    });
    this.notify();
  },

  // Submit Wholesale RFQ
  submitRfq(rfqData) {
    const newRfq = {
      id: `RFQ-2026-${Math.floor(100 + Math.random() * 900)}`,
      date: new Date().toISOString().split('T')[0],
      status: 'Cluster Review in Progress',
      ...rfqData
    };
    this.rfqList.unshift(newRfq);
    this.notify();
    return newRfq;
  }
};
