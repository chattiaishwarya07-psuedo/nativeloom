const fs = require('fs');
const path = require('path');

const ordersFile = path.join(__dirname, '..', 'js', 'screens', 'buyer_orders.js');
const appFile = path.join(__dirname, '..', 'js', 'app.js');

const ordersContent = fs.readFileSync(ordersFile, 'utf8');
const appContent = fs.readFileSync(appFile, 'utf8');

const requiredTokensOrders = [
  'TRACKING ORDER',
  '#KRG-98421',
  'In Transit',
  'TERRACOTTA GUILD OF ALWAR',
  'Hand-Etched Terracotta Pitcher',
  '₹750',
  '100% Direct Artisan Payout',
  'Estimated Doorstep Arrival',
  'Thursday, 24 Oct',
  'Ramdev Kumhar',
  'Master Potter • Pehchān Verified',
  '99',
  'Ramdev\'s Thank-You Blessing',
  '0:00 / 0:18',
  'potter wheel keeps turning',
  'DELIVERY STATUS',
  'Loom-to-Doorstep Journey',
  'Handed to India Post Speed Post',
  'Order Placed & Advance Disbursed',
  '100% upfront raw material fund credited',
  'Selected from Sun-Dried Kiln',
  'Inspected for hairline fractures and bell-like resonance',
  'Eco-Cushion Packaging',
  'shredded dried straw, recycled jute, and molded earthen husk pods',
  'Workshop Dispatch Snapshot',
  'Verified safe wrap',
  'Departed Regional Sort Center, Alwar GPO',
  'AWB: SP-UP298412IN',
  'Copy',
  'Arriving at Local Delivery Hub',
  'Doorstep Delivery with OTP',
  'Call Courier',
  'Craft Transit Insurance Guarantee',
  'Handmade pottery carries souls and fragility',
  '100% instant refund or free handcrafted replacement',
  'Zero-Hassle Resolution',
  'Policy Details'
];

let missingOrders = [];
for (const token of requiredTokensOrders) {
  if (!ordersContent.includes(token)) {
    missingOrders.push(token);
  }
}

if (missingOrders.length > 0) {
  console.error('Missing tokens in buyer_orders.js:', missingOrders);
  process.exit(1);
} else {
  console.log('✓ All 37 required screenshot tokens verified in buyer_orders.js');
}

const requiredTokensApp = [
  'ORDERS',
  'tab-orders-explore',
  'tab-orders-artisans',
  'tab-orders-orders',
  'tab-orders-studio',
  'isOrderTracking'
];

let missingApp = [];
for (const token of requiredTokensApp) {
  if (!appContent.includes(token)) {
    missingApp.push(token);
  }
}

if (missingApp.length > 0) {
  console.error('Missing tokens in app.js:', missingApp);
  process.exit(1);
} else {
  console.log('✓ All navigation and header tokens verified in app.js');
}

console.log('ALL VERIFICATIONS PASSED!');
