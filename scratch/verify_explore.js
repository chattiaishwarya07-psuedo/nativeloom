const fs = require('fs');
const path = require('path');

const exploreContent = fs.readFileSync(path.join(__dirname, '..', 'js', 'screens', 'explore_market.js'), 'utf8');
const appContent = fs.readFileSync(path.join(__dirname, '..', 'js', 'app.js'), 'utf8');
const indexContent = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

const requiredElements = [
  // Header / Branding
  'Native Loom',
  'EXPLORE MARKET',
  'EN | हि',
  
  // Search and Filter
  'Search by craft, GI tag, or artisa...',
  'btn-voice-search',
  'btn-filter-settings',
  
  // Hero Banner
  'UTSAV HERITAGE SEASON',
  'Special Offers & Heritage Sale',
  'USE COUPON',
  'UTSAV20',
  'Copy',
  'Claim &amp; Explore',
  
  // Explore Craft Types
  'Explore Craft Types',
  'View All',
  'Pottery & Clay',
  '2,140 Verified Crafts',
  'Handloom Weaves',
  '4,890 Spun Pieces',
  'Loom Direct',
  'Wood & Inlay',
  '1,320 Carved Artifacts',
  'Heirloom',
  'Brass & Dhokra',
  '980 Forged Heirlooms',
  'Lost-Wax',
  
  // Master Karigars Spotlight
  'Master Karigars',
  'Spotlight',
  'Guild',
  'Registry',
  'Ramdev Kumhar',
  '35 YRS',
  'Verified Maker',
  'Master Terracotta Craftsman',
  'Chunar Cluster, Uttar Pradesh',
  'Carrying forward five generations of clay surahis',
  'Listen Story (2:10)',
  'Direct Talk',
  
  // Discovery Radar
  'NEARBY ARTISANS',
  'Discovery Radar',
  'Varanasi • 18 km',
  'All Makers',
  'Ready to Ship',
  'On Loom (Pre-...',
  
  // Product Card 1
  'Hand-turned Terracotta Surahi',
  '₹850',
  '100% TO MAKER',
  'By Ramdev Kumhar • Chunar Guild',
  'Chunar GI #412',
  'Workshop pickup 14 km',
  'Buy Direct from Maker',
  
  // Product Card 2
  'Katan Silk Zari Brocade Dupatta',
  '₹4,200',
  'On Loom (Ships 4 Days)',
  'Varanasi GI #28',
  'Loom shed 8 km',
  'By Anandi Devi • Kabir Chaura Weavers',
  'Order Now',
  
  // Product Card 3
  'Nizamabad Black Clay & Wood Toys',
  '₹780 – ₹1,890',
  '2 Left in Stock',
  'Direct Workshop Pick-up 22 km',
  'By Mohan Lal • Azamgarh Collective',
  
  // Bottom Navigation
  'Home',
  'Search',
  'Cart',
  'Profile'
];

let allPassed = true;
const combined = exploreContent + ' ' + appContent + ' ' + indexContent;

for (const req of requiredElements) {
  if (combined.includes(req)) {
    console.log(`✓ Found: "${req}"`);
  } else {
    console.error(`✗ MISSING: "${req}"`);
    allPassed = false;
  }
}

if (allPassed) {
  console.log('\n🎉 ALL REQUIRED ELEMENTS VERIFIED SUCCESSFULLY!');
} else {
  process.exit(1);
}
