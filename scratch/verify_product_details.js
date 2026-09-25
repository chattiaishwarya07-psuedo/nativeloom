const fs = require('fs');
const path = require('path');

const productDetailsContent = fs.readFileSync(path.join(__dirname, '..', 'js', 'screens', 'product_details.js'), 'utf8');
const appContent = fs.readFileSync(path.join(__dirname, '..', 'js', 'app.js'), 'utf8');
const indexContent = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

const requiredElements = [
  // Header
  'Craft Produc...',
  
  // Origin banner
  'Authentic Origin: Gorakhpur ...',
  'VERIFIED CRAFT',
  
  // Image Badges
  'MASTER GUILD SEAL',
  'Pehchan #UP-438-290',
  '1.8 Litres',
  
  // 3 Feature Badges
  'Verified Master',
  'Craft',
  '100% River Clay',
  'Master Potter',
  
  // Product Details
  'TRADITIONAL NIZAMABAD CRAFT',
  'Hand-Etched',
  'Terracotta Pitcher',
  'Natural evaporative cooler for drinking water with natural alkaline balancing minerals.',
  '₹750',
  '₹950',
  '21% OFF',
  '8 Ready to Ship',
  
  // 100% Payout Box
  '100% Direct Artisan Payout',
  'Ramdev Kumhar',
  'Jan Dhan bank account',
  '₹0 platform commission',
  
  // Made to order commission
  'MADE TO ORDER COMMISSION',
  'within 2 weeks',
  'Custom Monogram / Name Engraving',
  'Specific Volume (1L - 5L)',
  'Custom Motif / Floral Design',
  'Request Custom Order',
  
  // Oral History
  "Artisan's Oral History",
  'Spoken in English • 30 Seconds',
  '00:00 / 00:30',
  'Read Audio Transcript',
  
  // Master Artisan Card
  'Ramdev Kumhar',
  'Varanasi Clay Guild • 35 Yr Heritage',
  '98/100',
  'Trust Index',
  'Verified Master Craft',
  '1,420+',
  'Pots Fired',
  '0 km',
  'Direct Channel',
  'Visit Studio',
  'Artisan Message',
  
  // See Description Accordion
  'See Description',
  '12 Days of Craft',
  'Handcrafted Creation Journey &amp; earthen specifications',
  
  // Fast Delivery
  'Fast Delivery',
  'Shipped directly from Varanasi artisan hub. Dispatches within 24 hours. Expected delivery within 10 days',
  
  // Bottom Sticky Bar
  'Total Price',
  '₹750',
  'Custo...',
  'Buy Now'
];

let allPassed = true;
const combined = productDetailsContent + ' ' + appContent + ' ' + indexContent;

for (const req of requiredElements) {
  if (combined.includes(req)) {
    console.log(`✓ Found: "${req}"`);
  } else {
    console.error(`✗ MISSING: "${req}"`);
    allPassed = false;
  }
}

if (allPassed) {
  console.log('\n🎉 ALL REQUIRED PRODUCT DETAILS ELEMENTS VERIFIED SUCCESSFULLY!');
} else {
  process.exit(1);
}
