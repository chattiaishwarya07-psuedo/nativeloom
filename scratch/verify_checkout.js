const fs = require('fs');
const path = require('path');

const checkoutContent = fs.readFileSync(path.join(__dirname, '..', 'js', 'screens', 'checkout.js'), 'utf8');
const appContent = fs.readFileSync(path.join(__dirname, '..', 'js', 'app.js'), 'utf8');

const requiredElements = [
  // Top Step
  'FINAL STEP',
  'Checkout &amp; Direct<br>Patronage',
  
  // Card 1: Artisan Impact Receipt
  'Artisan Impact Receipt',
  'Direct Guild Transfer Record #KR-8821',
  'Ramdev Kumhar',
  'Varanasi Terracotta Guild',
  '₹750',
  'Somnath Baghel',
  'Bastar Dhokra Collective',
  '₹920',
  'Subtotal to Master Creators',
  '₹1,670',
  'Platform Middleman Fee ⓘ',
  '₹0 (Zero Cut)',
  'Logistics',
  '₹100',
  'Total',
  'Typical luxury gallery price:',
  '₹3,400',
  '₹1,730',
  'paying 100% direct value to creators',
  
  // Card 2: Delivery Destination
  'Delivery Destination',
  'Verified Indian Postal Zone',
  'Edit',
  'Ananya Deshmukh',
  'PIN 560038 Verified',
  'Flat 402, Kaveri Heights, 12th Main',
  'Indiranagar, Bengaluru, Karnataka',
  '+91 98450 12839',
  'Fast delivery',
  'zero-plastic hand-knotted straw cushions and sun-dried paddy chaff',
  'Estimated dispatch: 48 Hours',
  
  // Card 3: Blessing Note
  'Blessing Note',
  'Honoring your traditional skill',
  'Blessings for your family',
  'Warm gratitude',
  'Write a warm note of respect and encouragement for Ramdev and Somnath...',
  '0/160',
  
  // Card 4: Payment Instrument
  'Payment Instrument',
  'Instant Direct Settlement',
  'UPI Transfer',
  'Instant',
  'Google Pay, PhonePe, Paytm, BHIM',
  'Credit / Debit Cards',
  'RuPay, Visa, Mastercard',
  'Net Banking',
  'All Scheduled Commercial Indian Banks',
  'Cash on Delivery',
  'Verified India Post COD Courier',
  
  // Bottom Action Button & Pledge
  'Pay ₹1,670 &amp; Support Master Artisans',
  'Direct Artisan Patronage Pledge: 0% Native Loom Cut'
];

let allPassed = true;
const combined = checkoutContent + ' ' + appContent;

for (const req of requiredElements) {
  if (combined.includes(req)) {
    console.log(`✓ Found: "${req}"`);
  } else {
    console.error(`✗ MISSING: "${req}"`);
    allPassed = false;
  }
}

if (allPassed) {
  console.log('\n🎉 ALL REQUIRED CHECKOUT ELEMENTS VERIFIED SUCCESSFULLY!');
} else {
  process.exit(1);
}
