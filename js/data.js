/**
 * Native Loom - Centralized Single Source of Truth Data Layer
 * Centralized Platform Data Model:
 * 
 * Cluster { id, name, state, giTagNumber, description, leadArtisanId, capacityPerMonth, wholesaleFromPrice, image }
 * Artisan { id, name, craftTitle, pehchanId, clusterId, trustScore, bankLinked, bankAccountMasked, bankName, ifsc, preferredDialect, avatar }
 * Craft   { id, title, artisanId, clusterId, category, attributes[], price, typicalGalleryPrice, stock, status, images[], voiceDescription{originalText, originalLang, translatedText}, giTagNumber }
 * Order   { id, craftId, buyerId, buyerName, buyerCity, buyerType, status, carrier, consignmentNo, expectedArrival, blessingNote, amount, units }
 */

export const Clusters = [
  {
    id: 'cl-varanasi-terracotta',
    name: 'Gorakhpur & Varanasi Terracotta Cluster',
    state: 'Uttar Pradesh',
    giTagNumber: 'GI #182',
    description: 'Centuries-old hand-turned terracotta pottery and water pitchers made with natural mineral-rich river clay from the Rapti and Ganga basins.',
    leadArtisanId: 'artisan-ramdev',
    capacityPerMonth: '5,000 units / month',
    wholesaleFromPrice: 260,
    specialty: 'Hand-fluted water surahis, earthen tableware, Diwali clay diyas, and ceremonial wall plaques',
    image: '/assets/raw_pottery_snap.jpg'
  },
  {
    id: 'cl-bastar-dhokra',
    name: 'Bastar Dhokra Brass Castings Guild',
    state: 'Chhattisgarh',
    giTagNumber: 'GI #84',
    description: '4,000-year-old ancient lost-wax hollow casting technique handed down through indigenous tribal families, utilizing recycled brass and beeswax.',
    leadArtisanId: 'artisan-budhram',
    capacityPerMonth: '800 pieces / month',
    wholesaleFromPrice: 580,
    specialty: 'Lost-wax bell metal statues, sacred bells, corporate trophies, and bespoke tribal artifacts',
    image: '/assets/dhokra_brass.jpg'
  },
  {
    id: 'cl-jaipur-bluepottery',
    name: 'Jaipur Traditional Blue Pottery Guild',
    state: 'Rajasthan',
    giTagNumber: 'GI #28',
    description: 'Luminous turquoise and cobalt quartz-glazed craft made without traditional clay, utilizing crushed quartz, fuller earth, and natural plant gums.',
    leadArtisanId: 'artisan-rahul',
    capacityPerMonth: '2,500 pieces / month',
    wholesaleFromPrice: 340,
    specialty: 'Quartz glazed ceramic tableware, hand-painted coasters, architectural accents, and vases',
    image: '/assets/blue_pottery.jpg'
  },
  {
    id: 'cl-saharanpur-wood',
    name: 'Saharanpur Wood Carvers Cooperative',
    state: 'Uttar Pradesh',
    giTagNumber: 'GI #124',
    description: 'Intricate Jaali fretwork lattice screens and brass-inlaid seasoned Sheesham wood carving by master hereditary woodcraft guilds.',
    leadArtisanId: 'artisan-saleem',
    capacityPerMonth: '1,500 pieces / month',
    wholesaleFromPrice: 420,
    specialty: 'Sheesham & Teak lattice screens, corporate desk boxes, brass-inlaid heirloom keepsake chests',
    image: '/assets/woodcraft_bowl.jpg'
  }
];

export const Artisans = [
  {
    id: 'artisan-ramdev',
    name: 'Ramdev Kumhar',
    craftTitle: 'Master Potter & Terracotta Sculptor',
    pehchanId: 'UP-VAR-49281',
    clusterId: 'cl-varanasi-terracotta',
    trustScore: 98,
    bankLinked: true,
    bankName: 'Bank of Baroda',
    bankAccountMasked: '•••• 4012',
    ifsc: 'BARB0VARANA',
    preferredDialect: 'Bhojpuri',
    experienceYears: 35,
    avatar: '/assets/artisan_ramulu.jpg',
    bio: 'National Merit Master Potter dedicated to natural evaporative clay ware and temple terracotta traditions in Varanasi & Gorakhpur.'
  },
  {
    id: 'artisan-budhram',
    name: 'Budhram Baghel',
    craftTitle: 'Master Dhokra Brass Sculptor',
    pehchanId: 'CG-BAS-18302',
    clusterId: 'cl-bastar-dhokra',
    trustScore: 96,
    bankLinked: true,
    bankName: 'State Bank of India',
    bankAccountMasked: '•••• 8914',
    ifsc: 'SBIN0001830',
    preferredDialect: 'Hindi / Chhattisgarhi',
    experienceYears: 28,
    avatar: '/assets/artisan_sunita.jpg',
    bio: 'Guardian of 4,000-year-old lost-wax bell metal casting in the forests of Bastar, creating acoustic sacred bells and figurines.'
  },
  {
    id: 'artisan-rahul',
    name: 'Rahul Shekhawat',
    craftTitle: 'Senior Blue Pottery Artisan',
    pehchanId: 'RJ-JAI-72019',
    clusterId: 'cl-jaipur-bluepottery',
    trustScore: 95,
    bankLinked: true,
    bankName: 'Punjab National Bank',
    bankAccountMasked: '•••• 5102',
    ifsc: 'PUNB0720100',
    preferredDialect: 'Hindi',
    experienceYears: 22,
    avatar: '/assets/artisan_ramulu.jpg',
    bio: 'Preserving clay-free low-fire quartz glaze artistry with natural copper and cobalt oxide pigments in Jaipur.'
  },
  {
    id: 'artisan-saleem',
    name: 'Mohammad Saleem',
    craftTitle: 'Master Wood Carver',
    pehchanId: 'UP-SAH-38491',
    clusterId: 'cl-saharanpur-wood',
    trustScore: 97,
    bankLinked: true,
    bankName: 'Canara Bank',
    bankAccountMasked: '•••• 6631',
    ifsc: 'CNRB0003849',
    preferredDialect: 'Hindi',
    experienceYears: 31,
    avatar: '/assets/artisan_sunita.jpg',
    bio: 'Master of fine Jaali fretwork lattice chiseling and solid brass inlay in seasoned North Indian Sheesham wood.'
  }
];

export const Crafts = [
  {
    id: 'craft-terracotta-pitcher',
    title: 'Hand-Carved Terracotta Water Surahi Pitcher',
    artisanId: 'artisan-ramdev',
    clusterId: 'cl-varanasi-terracotta',
    category: 'Terracotta Pottery',
    attributes: ['GI Tag Certified', '100% River Clay', 'Master Potter Guild Seal', 'Alkaline Mineral Balancing', 'Chemical Free'],
    price: 1450,
    typicalGalleryPrice: 3200,
    stock: 8,
    status: 'Ready',
    badge: '• Ready (8)',
    images: ['/assets/raw_pottery_snap.jpg'],
    volume: '1.8 Litres',
    voiceDescription: {
      originalText: 'हम ई सुराही आपन पुरखों के तरीका से राप्ती नदी के शुद्ध माटी से चाक पर गढ़ले बानी। ई पानी के प्राकृतिक रूप से शीतल रखेला आ मीठ स्वाद देवेला।',
      originalLang: 'Bhojpuri (Purvanchal)',
      translatedText: 'Hand-thrown on a traditional wooden kick-wheel using mineral-rich natural river clay from the Rapti basin. This porous earthenware pitcher naturally chills drinking water by micro-evaporation, infusing it with subtle earthy alkaline minerals without any synthetic glaze or chemicals.'
    },
    giTagNumber: 'GI #182'
  },
  {
    id: 'craft-dhokra-bell',
    title: 'Bastar Lost-Wax Brass Tribal Bell Figurine',
    artisanId: 'artisan-budhram',
    clusterId: 'cl-bastar-dhokra',
    category: 'Bell Metal & Brass',
    attributes: ['GI Tag Certified', 'Lost-Wax Cast', 'Non-Ferrous Alloy', 'Tribal Guild Seal', 'Acoustic Resonance'],
    price: 1850,
    typicalGalleryPrice: 4200,
    stock: 4,
    status: 'Low Stock',
    badge: '• Low Stock (4)',
    images: ['/assets/dhokra_brass.jpg'],
    volume: 'Height: 8.5 inches',
    voiceDescription: {
      originalText: 'ई घंटी हमनी के बस्तर के जंगल में मोम के धागा बनाके ढलाई कइले बानी। एकर आवाज़ बहुत मीठ आ पवित्र बा।',
      originalLang: 'Hindi / Chhattisgarhi',
      translatedText: 'Sculpted using pure beeswax threads coiled over hand-kneaded clay cores, cast in molten bell-metal alloy by indigenous Bastar families. Each piece has distinct acoustic chime resonance and unique handmade fingerprint striations.'
    },
    giTagNumber: 'GI #84'
  },
  {
    id: 'craft-blue-pottery-vase',
    title: 'Jaipur Quartz Turquoise Glazed Floral Vase',
    artisanId: 'artisan-rahul',
    clusterId: 'cl-jaipur-bluepottery',
    category: 'Blue Pottery',
    attributes: ['GI Tag Certified', 'Clay-Free Quartz', 'Hand-Painted Cobalt', 'Low Fire Glaze', 'Architectural Accent'],
    price: 1250,
    typicalGalleryPrice: 2800,
    stock: 12,
    status: 'Ready',
    badge: '• Ready (12)',
    images: ['/assets/blue_pottery.jpg'],
    volume: 'Height: 10 inches',
    voiceDescription: {
      originalText: 'यह फूलदान हमने पिसे हुए क्वार्ट्ज पत्थर और मुल्तानी मिट्टी के मिश्रण से बनाया है, जिस पर प्राकृतिक कोबाल्ट ऑक्साइड से हाथ से चित्रकारी की गई है।',
      originalLang: 'Hindi',
      translatedText: 'Formed from powdered quartz rock, glass, and Fuller earth rather than clay. Hand-painted with cobalt oxide floral arabesques and fired once at low heat to achieve its luminous turquoise sheen and delicate crackle finish.'
    },
    giTagNumber: 'GI #28'
  },
  {
    id: 'craft-wood-jaali-box',
    title: 'Saharanpur Hand-Carved Sheesham Jaali Box',
    artisanId: 'artisan-saleem',
    clusterId: 'cl-saharanpur-wood',
    category: 'Woodcraft',
    attributes: ['GI Tag Certified', 'Seasoned Sheesham Wood', 'Pure Brass Inlay', 'Lattice Jaali Fretwork', 'Natural Wax Polish'],
    price: 950,
    typicalGalleryPrice: 2400,
    stock: 6,
    status: 'Ready',
    badge: '• Ready (6)',
    images: ['/assets/woodcraft_bowl.jpg'],
    volume: '8 x 5 x 3 inches',
    voiceDescription: {
      originalText: 'सहारनपुर के शीशम की लकड़ी पर यह जालीदार नक्काशी हमारे उस्ताद कारीगरों ने हाथों की छेनी से तराशी है।',
      originalLang: 'Hindi',
      translatedText: 'Carved out of sustainably seasoned Indian Rosewood (Sheesham) featuring open fretwork lattice patterns with natural beeswax buffing and hand-cut pure brass corner inlays.'
    },
    giTagNumber: 'GI #124'
  },
  {
    id: 'craft-terracotta-diyas',
    title: 'Handcrafted Festive Terracotta Diyas (Set of 12)',
    artisanId: 'artisan-ramdev',
    clusterId: 'cl-varanasi-terracotta',
    category: 'Terracotta Pottery',
    attributes: ['GI Tag Certified', 'Hand-Pinched Clay', '100% River Clay', 'Biodegradable', 'Festival Ready'],
    price: 320,
    typicalGalleryPrice: 750,
    stock: 18,
    status: 'Ready',
    badge: '• Ready (18)',
    images: ['/assets/handcrafted_diyas.jpg'],
    volume: 'Set of 12 pieces',
    voiceDescription: {
      originalText: 'दीपावली खातिर हमनी के पवित्र गंगा माटी से ई दीया तैयार कइले बानी। ई बहुत चोखा आ शुद्ध बा।',
      originalLang: 'Bhojpuri (Purvanchal)',
      translatedText: 'Hand-pinched festive earthen oil lamps molded from sacred alluvial clay, slow-fired in traditional wood-fired kilns for clean, soot-free festive illumination.'
    },
    giTagNumber: 'GI #182'
  },
  {
    id: 'craft-clay-wall-plate',
    title: 'Decorative Terracotta Sun Medallion Plaque',
    artisanId: 'artisan-ramdev',
    clusterId: 'cl-varanasi-terracotta',
    category: 'Terracotta Pottery',
    attributes: ['GI Tag Certified', 'Bas-Relief Carved', 'Natural Mineral Ochre', 'Wall Mount Ready'],
    price: 850,
    typicalGalleryPrice: 1950,
    stock: 3,
    status: 'Low Stock',
    badge: '• Low Stock (3)',
    images: ['/assets/clay_wall_plate.jpg'],
    volume: 'Diameter: 12 inches',
    voiceDescription: {
      originalText: 'सूर्य देवता के प्रतीक ई दीवार पट्टिका घर के वास्तु खातिर बहुत मंगलकारी मानल जाला।',
      originalLang: 'Bhojpuri (Purvanchal)',
      translatedText: 'Hand-sculpted solar medallion mural plaque featuring traditional Vedic sun motifs, fired in kiln with rice husk fuel to achieve warm earthen gradients.'
    },
    giTagNumber: 'GI #182'
  }
];

export const Orders = [
  {
    id: 'ORD-HS-90214',
    craftId: 'craft-terracotta-pitcher',
    artisanId: 'artisan-ramdev',
    buyerId: 'buyer-aditi',
    buyerName: 'Dr. Aditi Varma',
    buyerCity: 'Bengaluru, Karnataka',
    buyerPincode: '560038',
    buyerType: 'patron',
    status: 'Delivery Agent Pickup Scheduled (Today 3:00 PM)',
    carrier: 'Delivery Agent',
    consignmentNo: 'CP928410294IN',
    expectedArrival: '28 Sep 2026',
    blessingNote: 'Dear Ramdev Ji, thank you for keeping this sacred earthen pottery tradition alive. We are excited to place your surahi in our home altar.',
    amount: 1450,
    units: 2,
    hasInsurance: true,
    pickupAgent: 'Manoj Kumar (Varanasi Hub Delivery Agent)'
  },
  {
    id: 'ORD-HS-88401',
    craftId: 'craft-dhokra-bell',
    artisanId: 'artisan-budhram',
    buyerId: 'buyer-rohit',
    buyerName: 'Rohit Kulkarni',
    buyerCity: 'Pune, Maharashtra',
    buyerPincode: '411004',
    buyerType: 'patron',
    status: 'In Transit with Delivery Agent',
    carrier: 'Delivery Agent',
    consignmentNo: 'SP492817204IN',
    expectedArrival: '27 Sep 2026',
    blessingNote: 'Honoured to receive this authentic Bastar bell directly from your workshop.',
    amount: 1850,
    units: 1,
    hasInsurance: true
  },
  {
    id: 'ORD-HS-87299',
    craftId: 'craft-terracotta-diyas',
    artisanId: 'artisan-ramdev',
    buyerId: 'buyer-rohan',
    buyerName: 'Rohan Mehra',
    buyerCity: 'New Delhi, NCR',
    buyerPincode: '110017',
    buyerType: 'patron',
    status: 'Packed & Barcoded',
    carrier: 'Delivery Agent',
    consignmentNo: 'IP948088012IN',
    expectedArrival: '29 Sep 2026',
    blessingNote: 'Looking forward to lighting your handmade diyas this Diwali season!',
    amount: 1280,
    units: 4,
    hasInsurance: true,
    pickupAgent: 'Manoj Kumar (Varanasi Hub Delivery Agent)'
  }
];

// Helper Accessors Guaranteeing Single Source of Truth
export function getCluster(clusterId) {
  return Clusters.find(c => c.id === clusterId) || Clusters[0];
}

export function getArtisan(artisanId) {
  return Artisans.find(a => a.id === artisanId) || Artisans[0];
}

export function getCraft(craftId) {
  return Crafts.find(c => c.id === craftId) || Crafts[0];
}

export function getOrdersForArtisan(artisanId) {
  return Orders.filter(o => o.artisanId === artisanId);
}

export function getOrdersForBuyer(buyerId) {
  return Orders.filter(o => o.buyerId === buyerId);
}

// Global registry for direct consumption
if (typeof window !== 'undefined') {
  window.NativeLoomData = window.HastshilpData = {
    Clusters,
    Artisans,
    Crafts,
    Orders,
    getCluster,
    getArtisan,
    getCraft,
    getOrdersForArtisan,
    getOrdersForBuyer
  };
}
