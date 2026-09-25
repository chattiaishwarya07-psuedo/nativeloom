const fs = require('fs');
const path = require('path');

const cartContent = fs.readFileSync(path.join(__dirname, '..', 'js', 'screens', 'cart_review.js'), 'utf8');
const appContent = fs.readFileSync(path.join(__dirname, '..', 'js', 'app.js'), 'utf8');
const stateContent = fs.readFileSync(path.join(__dirname, '..', 'js', 'state.js'), 'utf8');

const requiredElements = [
  // Top Header / Meta
  'Craft Direct Order',
  'CART REVIEW',
  'Review each artisan\'s direct parcel before dispatch.',
  
  // Parcel 1: Ramdev Kumhar
  'Ramdev Kumhar',
  'PEHCHAN #UP-VAR-492',
  'Varanasi Hub',
  'Hand-Etched Terracotta Pitc...',
  'Capacity: 1.8 Liters • Clay Fired',
  '₹750',
  'Qty: 1',
  'Dispatches within 2 days',
  'Add more pieces from Ramdev\'s workshop',
  
  // Parcel 2: Somnath Baghel
  'Somnath Baghel',
  'PEHCHAN #CG-BST-118',
  'Bastar Guild',
  'Dhokra Brass Tribal Nandi',
  'Solid Brass • Lost-Wax Casting',
  '₹920',
  'Dispatches in <strong>48 hrs</strong>',
  'Add more pieces from Somnath\'s workshop',
  
  // Payment Transparency
  'Payment Transparency',
  'Direct to Artisans',
  '₹1,670',
  'Delivery charges',
  '₹100',
  'Platform Service Fee',
  '₹20',
  'Total cost',
  '₹1,770',
  
  // Bottom Checkout
  'Proceed to Address &amp; Direct Checkout',
  'Secure direct UPI / Rupay / NetBanking escrow'
];

let allPassed = true;
const combined = cartContent + ' ' + appContent + ' ' + stateContent;

for (const req of requiredElements) {
  if (combined.includes(req)) {
    console.log(`✓ Found: "${req}"`);
  } else {
    console.error(`✗ MISSING: "${req}"`);
    allPassed = false;
  }
}

if (allPassed) {
  console.log('\n🎉 ALL REQUIRED CART REVIEW ELEMENTS VERIFIED SUCCESSFULLY!');
} else {
  process.exit(1);
}
