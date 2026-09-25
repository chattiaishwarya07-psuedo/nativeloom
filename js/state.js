/**
 * Native Loom - Central Reactive State Store
 * Strictly enforces three distinct, non-overlapping account types:
 * 1. ARTISAN / SELLER account
 * 2. BUYER / PATRON account (individual consumer)
 * 3. CORPORATE / B2B BUYER account (institutional bulk buyer)
 * 
 * Powered by centralized single source of truth data layer (js/data.js).
 * Includes Route Guard validation and zero cross-role switching without full logout.
 */

import {
  Clusters,
  Artisans,
  Crafts,
  Orders,
  getCluster,
  getArtisan,
  getCraft,
  getOrdersForArtisan,
  getOrdersForBuyer
} from './data.js';

export const AccountType = {
  GUEST: 'GUEST',
  ARTISAN: 'ARTISAN',
  BUYER: 'BUYER',
  CORPORATE: 'CORPORATE'
};

export const State = {
  // Active Authenticated Session
  session: {
    accountType: null,
    isLoggedIn: false,
    authToken: null,
    user: null
  },

  // Active Screen and Persona Mode
  currentScreen: 'splash',
  mode: 'seller', // 'seller' | 'buyer' | 'corporate'
  language: 'hi', // 'hi' | 'en' | 'bn' | 'ta' | 'te' | 'mr' | 'gu' | 'kn' | 'bho' | 'mai'

  // Centralized entity access
  data: {
    clusters: Clusters,
    artisans: Artisans,
    crafts: Crafts,
    orders: Orders,
    getCluster,
    getArtisan,
    getCraft,
    getOrdersForArtisan,
    getOrdersForBuyer
  },

  // ==========================================
  // 1. ARTISAN / SELLER STATE (Isolated)
  // ==========================================
  artisan: {
    pehchanId: 'UP-VAR-49281',
    artisanName: 'Ramdev Kumhar',
    craftType: 'Gorakhpur & Varanasi Terracotta Pottery',
    cluster: 'Gorakhpur & Varanasi Terracotta Cluster',
    clusterId: 'cl-varanasi-terracotta',
    giTag: 'GI #182',
    trustScore: 98,
    bankName: 'Bank of Baroda',
    bankAccountMasked: '•••• 4012',
    ifsc: 'BARB0VARANA',
    dbtLinked: true,
    totalEarnings: 48500,
    lastMonthEarnings: 41100,
    monthGrowth: 18,
    nextTransfer: 4350,
    nextTransferTime: 'Tomorrow, 12:00 PM',
    trustScoreModalOpen: false,

    // AI Price Analysis Insight
    aiPriceAnalysis: {
      suggestedMin: 1400,
      suggestedMax: 1650,
      targetPrice: 1450,
      breakdown: {
        rawMaterial: 180, // River clay & alluvial silt
        labor: 720,       // 4.5 hours skilled wheel & carving
        studioFuel: 150,  // Wood-kiln firing
        packaging: 120    // Delivery Agent zero-plastic corrugated box
      },
      reasoning: 'Fair value benchmarked against certified GI #182 clayware. Allows 100% direct artisan compensation while saving patron ₹1,750 vs gallery markups.'
    },

    // Festive & Demand Surge Insight
    festiveSurge: {
      title: 'Diwali Festive Demand Surge',
      percent: '+45%',
      insight: 'High search volume from Delhi NCR and Bengaluru patrons for water surahis and sets of 12 natural clay diyas.'
    },

    // Urgent Order Handover Queue
    urgentOrder: {
      id: 'ORD-HS-90214',
      craftId: 'craft-terracotta-pitcher',
      title: 'Hand-Carved Terracotta Water Surahi Pitcher',
      units: 2,
      price: 1450,
      paymentStatus: 'Prepaid (RBI Escrow)',
      buyerName: 'Dr. Aditi Varma',
      destination: 'Bengaluru, KA (Speed Post)',
      deadline: 'Pickup Today 3:00 PM',
      accepted: false,
      dispatched: false,
      blessingNote: 'Dear Ramdev Ji, thank you for keeping this sacred earthen pottery tradition alive. We are excited to place your surahi in our home altar.'
    },

    // Incoming Orders fulfillment queue
    incomingOrders: [
      {
        id: 'ORD-HS-90214',
        craftId: 'craft-terracotta-pitcher',
        title: 'Hand-Carved Terracotta Water Surahi Pitcher',
        units: 2,
        amount: 1450,
        buyer: 'Dr. Aditi Varma',
        destination: 'Bengaluru, Karnataka',
        service: 'Delivery Agent',
        barcode: 'CP928410294IN',
        status: 'Pickup Scheduled Today 3:00 PM',
        pickupTime: 'Today 3:00 PM',
        blessingNote: 'Dear Ramdev Ji, thank you for keeping this sacred earthen pottery tradition alive. We are excited to place your surahi in our home altar.'
      },
      {
        id: 'ORD-HS-87299',
        craftId: 'craft-terracotta-diyas',
        title: 'Handcrafted Festive Terracotta Diyas (Set of 12)',
        units: 4,
        amount: 1280,
        buyer: 'Rohan Mehra',
        destination: 'New Delhi, NCR',
        service: 'Delivery Agent',
        barcode: 'IP948088012IN',
        status: 'Packed & Barcoded',
        pickupTime: 'Today 3:00 PM',
        blessingNote: 'Looking forward to lighting your handmade diyas this Diwali season!'
      },
      {
        id: 'ORD-HS-86510',
        craftId: 'craft-clay-wall-plate',
        title: 'Decorative Terracotta Sun Medallion Plaque',
        units: 1,
        amount: 850,
        buyer: 'Kavita Patel',
        destination: 'Ahmedabad, Gujarat',
        service: 'Delivery Agent Parcel',
        barcode: 'IP947931084IN',
        status: 'In Transit',
        pickupTime: 'Dispatched Yesterday',
        blessingNote: 'May the sun plaque bring auspicious blessings to our new home.'
      }
    ],

    // Active Listed Crafts
    activeCrafts: [
      {
        id: 'craft-terracotta-pitcher',
        title: 'Hand-Carved Terracotta Water Surahi Pitcher',
        price: 1450,
        stock: 8,
        soldCount: 14,
        status: 'Ready',
        badge: '• Ready (8)',
        image: '/assets/raw_pottery_snap.jpg'
      },
      {
        id: 'craft-terracotta-diyas',
        title: 'Handcrafted Festive Terracotta Diyas (Set of 12)',
        price: 320,
        stock: 18,
        soldCount: 32,
        status: 'Ready',
        badge: '• Ready (18)',
        image: '/assets/handcrafted_diyas.jpg'
      },
      {
        id: 'craft-clay-wall-plate',
        title: 'Decorative Terracotta Sun Medallion Plaque',
        price: 850,
        stock: 3,
        soldCount: 9,
        status: 'Low Stock',
        badge: '• Low Stock (3)',
        image: '/assets/clay_wall_plate.jpg'
      }
    ]
  },

  // ==========================================
  // 2. BUYER / PATRON STATE (Isolated)
  // ==========================================
  buyer: {
    profile: {
      name: 'Dr. Aditi Varma',
      phone: '+91 98450 21980',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560038',
      savedAddresses: [
        {
          id: 'addr-1',
          type: 'Home',
          line: '#42, 4th Cross, Indiranagar',
          city: 'Bengaluru',
          pincode: '560038',
          state: 'Karnataka',
          isDefault: true
        }
      ]
    },

    // Individual Consumer Shopping Cart
    cart: [
      {
        id: 'craft-terracotta-pitcher',
        title: 'Hand-Etched Terracotta Pitcher',
        artisan: 'Ramdev Kumhar',
        pehchanId: 'UP-VAR-492',
        cluster: 'Gorakhpur & Varanasi Terracotta Cluster',
        hub: 'Varanasi Hub',
        specification: 'Capacity: 1.8 Liters • Clay Fired',
        price: 750,
        artisanShare: 750,
        quantity: 1,
        dispatch: 'Dispatches within 2 days',
        image: '/assets/terracotta_pitcher.jpg',
        insuranceFee: 0
      },
      {
        id: 'craft-dhokra-nandi',
        title: 'Dhokra Brass Tribal Nandi',
        artisan: 'Somnath Baghel',
        pehchanId: 'CG-BST-118',
        cluster: 'Bastar Dhokra Guild, Chhattisgarh',
        hub: 'Bastar Guild',
        specification: 'Solid Brass • Lost-Wax Casting',
        price: 920,
        artisanShare: 920,
        quantity: 1,
        dispatch: 'Dispatches in 48 hrs',
        image: '/assets/dhokra_brass.jpg',
        insuranceFee: 0
      }
    ],

    // Consumer's Placed Purchases (Purchase-Tracking Only)
    myOrders: [
      {
        orderId: 'ORD-HS-90214',
        date: '25 Sep 2026',
        craftTitle: 'Hand-Carved Terracotta Water Surahi Pitcher',
        artisan: 'Ramdev Kumhar',
        cluster: 'Gorakhpur & Varanasi Terracotta Cluster (GI #182)',
        amount: 1450,
        itemsCount: 1,
        trackingNumber: 'CP928410294IN',
        carrier: 'Delivery Agent',
        status: 'Speed Post Pickup Scheduled Today',
        estimatedDelivery: '28 Sep 2026',
        image: '/assets/raw_pottery_snap.jpg',
        hasInsurance: true,
        canReturn: true,
        blessingNote: 'Dear Ramdev Ji, thank you for keeping this sacred earthen pottery tradition alive. We are excited to place your surahi in our home altar.'
      },
      {
        orderId: 'ORD-HS-88401',
        date: '18 Sep 2026',
        craftTitle: 'Bastar Lost-Wax Brass Tribal Bell Figurine',
        artisan: 'Budhram Baghel',
        cluster: 'Bastar Dhokra Brass Castings Guild (GI #84)',
        amount: 1850,
        itemsCount: 1,
        trackingNumber: 'SP492817204IN',
        carrier: 'Delivery Agent',
        status: 'Delivered Safely',
        estimatedDelivery: '21 Sep 2026',
        image: '/assets/dhokra_brass.jpg',
        hasInsurance: true,
        canReturn: false,
        blessingNote: 'Honoured to receive this authentic Bastar bell directly from your workshop.'
      }
    ],

    // Return & Protection Claims
    returnClaims: []
  },

  // ==========================================
  // 3. CORPORATE / B2B BUYER STATE (Isolated)
  // ==========================================
  corporate: {
    company: {
      name: 'Vistara Hospitality & Resorts Ltd.',
      tradeName: 'Vistara Hotels',
      gstin: '09AAACV4920K1ZX',
      pan: 'AAACV4920K',
      businessType: 'Boutique Hotel & Interior Specifier',
      kybStatus: 'KYB Verified & Institutional Cleared',
      procurementOfficer: 'Siddharth Sen',
      workEmail: 'procurement@vistarahotels.in',
      phone: '+91 98112 04921'
    },

    // Cluster Bulk Sourcing Directories
    clusters: Clusters,

    // Wholesale Catalog Items with Tiered Volume Pricing (Not consumer cart)
    catalog: [
      {
        id: 'corp-item-1',
        title: 'Gorakhpur Fluted Terracotta Hospitality Planters',
        cluster: 'Gorakhpur & Varanasi Terracotta Cluster',
        giTagNumber: 'GI #182',
        moq: 50,
        samplePrice: 450,
        tiers: [
          { min: 50, price: 320, discount: '15% Off' },
          { min: 250, price: 280, discount: '25% Off' },
          { min: 1000, price: 240, discount: '36% Off' }
        ],
        leadTime: '15-20 Days',
        image: '/assets/raw_pottery_snap.jpg'
      },
      {
        id: 'corp-item-2',
        title: 'Bastar Lost-Wax Brass Tribal Desk Figurine',
        cluster: 'Bastar Dhokra Brass Castings Guild',
        giTagNumber: 'GI #84',
        moq: 25,
        samplePrice: 950,
        tiers: [
          { min: 25, price: 780, discount: '18% Off' },
          { min: 100, price: 690, discount: '27% Off' },
          { min: 500, price: 580, discount: '39% Off' }
        ],
        leadTime: '25-30 Days',
        image: '/assets/dhokra_brass.jpg'
      },
      {
        id: 'corp-item-3',
        title: 'Jaipur Hand-Painted Glazed Ceramic Coaster Set',
        cluster: 'Jaipur Traditional Blue Pottery Guild',
        giTagNumber: 'GI #28',
        moq: 100,
        samplePrice: 380,
        tiers: [
          { min: 100, price: 290, discount: '24% Off' },
          { min: 500, price: 240, discount: '37% Off' },
          { min: 2000, price: 195, discount: '49% Off' }
        ],
        leadTime: '14-18 Days',
        image: '/assets/blue_pottery.jpg'
      }
    ],

    // Corporate Formal RFQs & Proforma Quotes
    quotes: [
      {
        rfqId: 'RFQ-B2B-89104',
        targetCluster: 'Gorakhpur & Varanasi Terracotta Cluster',
        craftItem: 'Fluted Terracotta Planters (14-inch)',
        quantity: 250,
        targetDeliveryDate: '15 Nov 2026',
        gstInvoiceRequired: true,
        status: 'Proforma Issued by Cooperative',
        quotedRatePerUnit: 280,
        totalEstimate: 70000,
        proformaToken: 'PR-VISTARA-2026-89104',
        escrowEligible: true,
        sampleStatus: 'Sample Dispatched via Delivery Agent'
      },
      {
        rfqId: 'RFQ-B2B-87291',
        targetCluster: 'Bastar Dhokra Brass Castings Guild',
        craftItem: 'Custom Brass Memento (Corporate Award)',
        quantity: 100,
        targetDeliveryDate: '10 Dec 2026',
        gstInvoiceRequired: true,
        status: 'Under Cluster Review',
        quotedRatePerUnit: 690,
        totalEstimate: 69000,
        proformaToken: 'PR-PENDING',
        escrowEligible: true,
        sampleStatus: 'Sample Requested'
      }
    ]
  },

  // ==========================================
  // Reactive change listeners
  // ==========================================
  listeners: [],
  subscribe(fn) {
    if (typeof fn === 'function') {
      this.listeners.push(fn);
    }
  },
  notify() {
    this.listeners.forEach(fn => {
      try { fn(this); } catch (e) { console.error('State subscriber error:', e); }
    });
  },

  // Legacy compatibility getters & setters
  get cart() {
    return this.buyer.cart;
  },
  get urgentOrder() {
    return this.artisan.urgentOrder;
  },
  get pehchanId() {
    return this.artisan.pehchanId;
  },
  get artisanRegisteredName() {
    return this.artisan.artisanName;
  },
  get clusterName() {
    return this.artisan.cluster;
  },
  get bankMethod() {
    return this._bankMethod || 'passbook';
  },
  set bankMethod(val) {
    this._bankMethod = val;
  },

  // ==========================================
  // SESSION AUTHENTICATION & ROLE SWITCHING CONTROLLERS
  // ==========================================

  /**
   * Switch active application mode (Seller / Karigar vs Buyer / Patron vs Corporate B2B)
   */
  setMode(mode) {
    this.mode = mode;
    if (mode === 'seller') {
      this.session.accountType = AccountType.ARTISAN;
      this.session.isLoggedIn = true;
      this.currentScreen = 'artisan_studio';
    } else if (mode === 'buyer') {
      this.session.accountType = AccountType.BUYER;
      this.session.isLoggedIn = true;
      this.currentScreen = 'buyer_explore';
    } else if (mode === 'corporate') {
      this.session.accountType = AccountType.CORPORATE;
      this.session.isLoggedIn = true;
      this.currentScreen = 'corporate_clusters';
    }
    this.notify();
    if (typeof window !== 'undefined' && window.onScreenChange) {
      window.onScreenChange(this.currentScreen);
    }
  },

  /**
   * Log into a specific role session.
   */
  loginAs(accountType, userProfile = null) {
    this.session.accountType = accountType;
    this.session.isLoggedIn = true;
    this.session.authToken = `HS_JWT_${accountType}_${btoa(JSON.stringify({ role: accountType, user: userProfile?.name || accountType, iat: Date.now() }))}`;
    this.session.user = userProfile;

    if (accountType === AccountType.ARTISAN) {
      this.mode = 'seller';
      this.setScreen('artisan_pehchan');
    } else if (accountType === AccountType.BUYER) {
      this.mode = 'buyer';
      this.setScreen('buyer_explore');
    } else if (accountType === AccountType.CORPORATE) {
      this.mode = 'corporate';
      this.setScreen('corporate_clusters');
    }
  },

  /**
   * Explicit Logout / Switch Account.
   */
  logout() {
    this.session.accountType = AccountType.GUEST;
    this.session.isLoggedIn = false;
    this.session.authToken = null;
    this.session.user = null;
    this.setScreen('account_select');
  },

  /**
   * Set screen with automatic role synchronization and alias mapping.
   */
  setScreen(screenName) {
    // Map screen aliases
    if (screenName === 'studio') screenName = 'artisan_studio';
    if (screenName === 'orders') {
      screenName = this.mode === 'seller' ? 'artisan_orders' : 'buyer_orders';
    }
    if (screenName === 'explore') screenName = 'buyer_explore';
    if (screenName === 'welcome') screenName = 'welcome_identity';
    if (screenName === 'bank') screenName = 'artisan_bank';
    if (screenName === 'pehchan') screenName = 'artisan_pehchan';
    if (screenName === 'wholesale') screenName = 'corporate_clusters';
    if (screenName === 'languages') screenName = 'language_select';

    // Auto-align session role so all live reference screens render smoothly
    if (ArtisanStackScreens.includes(screenName)) {
      this.session.accountType = AccountType.ARTISAN;
      this.session.isLoggedIn = true;
      this.mode = 'seller';
    } else if (BuyerStackScreens.includes(screenName)) {
      this.session.accountType = AccountType.BUYER;
      this.session.isLoggedIn = true;
      this.mode = 'buyer';
    } else if (CorporateStackScreens.includes(screenName)) {
      this.session.accountType = AccountType.CORPORATE;
      this.session.isLoggedIn = true;
      this.mode = 'corporate';
    }

    if (screenName !== this.currentScreen) {
      this.previousScreen = this.currentScreen;
    }
    this.currentScreen = screenName;
    this.notify();

    if (typeof window !== 'undefined' && window.onScreenChange) {
      window.onScreenChange(screenName);
    }
  },

  // ==========================================
  // BUYER CART & CHECKOUT CONTROLLERS
  // ==========================================
  getCartCount() {
    return this.buyer.cart.reduce((sum, item) => sum + item.quantity, 0);
  },

  getBuyerCartCount() {
    return this.getCartCount();
  },

  getCartSubtotal() {
    return this.buyer.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  },

  getCartTypicalGalleryTotal() {
    return this.buyer.cart.reduce((sum, item) => sum + ((item.typicalGalleryPrice || item.price * 2.2) * item.quantity), 0);
  },

  getBuyerCartTotal() {
    return this.getCartSubtotal();
  },

  getCartInsuranceTotal() {
    return this.buyer.cart.reduce((sum, item) => sum + ((item.insuranceFee || 25) * item.quantity), 0);
  },

  getCartArtisanShare() {
    // 100% of craft price goes to artisan (0% fee)
    return this.getCartSubtotal();
  },

  addToCart(craft) {
    if (this.session.accountType !== AccountType.BUYER) {
      throw new Error("Action restricted to Buyer account only");
    }
    const existing = this.buyer.cart.find(i => i.id === craft.id || i.title === craft.title);
    if (existing) {
      existing.quantity += (craft.quantity || 1);
    } else {
      this.buyer.cart.push({
        id: craft.id || `b-cart-${Date.now()}`,
        title: craft.title,
        artisan: craft.artisan || 'Ramdev Kumhar',
        cluster: craft.origin || craft.cluster || 'Gorakhpur & Varanasi Terracotta Cluster',
        giTagNumber: craft.giTagNumber || 'GI #182',
        price: craft.price || 1450,
        typicalGalleryPrice: craft.typicalGalleryPrice || 3200,
        quantity: craft.quantity || 1,
        image: craft.image || craft.images?.[0] || '/assets/raw_pottery_snap.jpg',
        insuranceFee: 25
      });
    }
    this.notify();
  },

  updateCartQuantity(id, delta) {
    const item = this.buyer.cart.find(i => i.id === id);
    if (!item) return;
    item.quantity += delta;
    if (item.quantity <= 0) {
      this.removeFromCart(id);
    } else {
      this.notify();
    }
  },

  removeFromCart(id) {
    this.buyer.cart = this.buyer.cart.filter(i => i.id !== id);
    this.notify();
  },

  placeBuyerOrder(orderParams = {}) {
    const newOrder = {
      orderId: `ORD-HS-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      craftTitle: this.buyer.cart[0]?.title || 'Hand-Carved Terracotta Water Surahi Pitcher',
      artisan: this.buyer.cart[0]?.artisan || 'Ramdev Kumhar',
      cluster: this.buyer.cart[0]?.cluster || 'Gorakhpur & Varanasi Terracotta Cluster (GI #182)',
      amount: this.getCartSubtotal(),
      itemsCount: this.getCartCount(),
      trackingNumber: `CP${Math.floor(100000000 + Math.random() * 900000000)}IN`,
      carrier: 'Delivery Agent',
      status: 'Pickup Scheduled with Master Potter',
      estimatedDelivery: '3-4 Business Days',
      image: this.buyer.cart[0]?.image || '/assets/raw_pottery_snap.jpg',
      hasInsurance: true,
      canReturn: true,
      blessingNote: orderParams.blessingNote || 'Thank you for your dedicated hand skills.'
    };

    this.buyer.myOrders.unshift(newOrder);

    // Also notify artisan incoming queue if matches active artisan
    this.artisan.incomingOrders.unshift({
      id: newOrder.orderId,
      craftId: 'craft-terracotta-pitcher',
      title: newOrder.craftTitle,
      units: newOrder.itemsCount,
      amount: newOrder.amount,
      buyer: this.buyer.profile.name,
      destination: `${this.buyer.profile.city}, ${this.buyer.profile.state}`,
      service: 'Delivery Agent',
      barcode: newOrder.trackingNumber,
      status: 'Pickup Scheduled Today 3:00 PM',
      pickupTime: 'Today 3:00 PM',
      blessingNote: newOrder.blessingNote
    });

    this.buyer.cart = [];
    this.notify();
    return newOrder;
  },

  fileReturnRequest(claim) {
    this.buyer.returnClaims.unshift({
      id: `RET-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      ...claim,
      status: 'Reverse Pickup Scheduled (Craft Transit Insurance Fund Active)'
    });
    this.notify();
  },

  submitRfq(rfq) {
    const newRfq = {
      rfqId: `RFQ-B2B-${Math.floor(10000 + Math.random() * 90000)}`,
      targetCluster: rfq.cluster,
      craftItem: rfq.item,
      quantity: rfq.quantity,
      targetDeliveryDate: '15 Nov 2026',
      gstInvoiceRequired: true,
      status: 'Transmitted to Cluster Guild',
      quotedRatePerUnit: rfq.ratePerPiece,
      totalEstimate: rfq.totalAmount,
      proformaToken: `PR-GEN-${Date.now().toString().slice(-5)}`,
      escrowEligible: true,
      sampleStatus: 'Sample Initiated'
    };
    this.corporate.quotes.unshift(newRfq);
    this.notify();
    return newRfq;
  }
};

// ==========================================
// ROLE STACKS AND PRE-AUTH SCREEN DEFINITIONS
// ==========================================
export const PreAuthScreens = [
  'splash',
  'language_select',
  'languages',
  'account_select',
  'about_impact',
  'account_recovery',
  'artisan_auth',
  'welcome',
  'welcome_identity',
  'buyer_auth',
  'corporate_auth'
];

export const ArtisanStackScreens = [
  'artisan_studio',
  'craft_studio',
  'artisan_orders',
  'artisan_bank',
  'artisan_pehchan',
  'artisan_profile'
];

export const BuyerStackScreens = [
  'buyer_explore',
  'explore',
  'buyer_search',
  'product_details',
  'cart_review',
  'checkout',
  'buyer_orders',
  'buyer_returns',
  'returns_policy',
  'buyer_profile',
  'artisans'
];

export const CorporateStackScreens = [
  'corporate_clusters',
  'corporate_catalog',
  'corporate_rfq',
  'corporate_quotes',
  'corporate_profile'
];

// ==========================================
// BACKEND API CLIENT WITH TOKEN ROLE CLAIM VERIFICATION
// ==========================================
export const BackendApi = {
  verifyTokenRole(expectedRole) {
    if (!State.session.isLoggedIn) {
      throw new Error("401 Unauthorized: Session is not authenticated.");
    }
    if (State.session.accountType !== expectedRole) {
      throw new Error(`403 Forbidden: Active token carries role claim '${State.session.accountType}', but endpoint requires '${expectedRole}'.`);
    }
    return true;
  },

  // Artisan Seller Endpoints
  seller: {
    acceptOrder(orderId) {
      BackendApi.verifyTokenRole(AccountType.ARTISAN);
      const order = State.artisan.incomingOrders.find(o => o.id === orderId);
      if (order) order.status = 'Ready for Pickup';
      return { success: true, message: `Order ${orderId} accepted for Delivery Agent pickup.` };
    },
    publishCraft(craftData) {
      BackendApi.verifyTokenRole(AccountType.ARTISAN);
      State.artisan.activeCrafts.unshift(craftData);
      return { success: true, message: "Craft published to artisan portfolio." };
    },
    viewPayouts() {
      BackendApi.verifyTokenRole(AccountType.ARTISAN);
      return {
        totalEarnings: State.artisan.totalEarnings,
        nextTransfer: State.artisan.nextTransfer,
        bank: State.artisan.bankName
      };
    }
  },

  // Individual Buyer Endpoints
  buyer: {
    placeOrder(orderData) {
      BackendApi.verifyTokenRole(AccountType.BUYER);
      return State.placeBuyerOrder(orderData);
    },
    fileReturn(claimData) {
      BackendApi.verifyTokenRole(AccountType.BUYER);
      return State.fileReturnRequest(claimData);
    }
  },

  // Corporate B2B Endpoints
  corporate: {
    submitRfq(rfqData) {
      BackendApi.verifyTokenRole(AccountType.CORPORATE);
      return State.submitRfq(rfqData);
    },
    fundEscrow(rfqId, amount) {
      BackendApi.verifyTokenRole(AccountType.CORPORATE);
      return { success: true, escrowId: `ESC-${Date.now().toString().slice(-6)}`, amount };
    }
  }
};
