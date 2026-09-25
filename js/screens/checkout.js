/**
 * Screen: Checkout & Direct Patronage (Final Step)
 * Pixel-perfect recreation of User Provided Reference Screenshot
 */

import { State } from '../state.js';
import { AudioAssistance } from '../speech.js';

export function renderCheckoutScreen(container) {
  let selectedPayment = 'upi';
  let noteText = '';

  container.innerHTML = `
    <div class="checkout-screen animate-fade-in" style="padding: 10px 14px 40px; background: #FAF7F2; min-height: 100vh;">
      
      <!-- Top Step Badge -->
      <div style="display:flex; align-items:center; gap:6px; margin-bottom:6px;">
        <span style="width:20px; height:20px; border-radius:50%; background:#B45309; color:#FFFFFF; font-size:0.7rem; font-weight:900; display:flex; align-items:center; justify-content:center;">
          3
        </span>
        <span style="font-size:0.65rem; font-weight:800; color:#B45309; letter-spacing:0.06em;">
          FINAL STEP
        </span>
      </div>

      <!-- Main Heading -->
      <h1 style="font-size:1.35rem; font-weight:900; color:#702213; line-height:1.2; margin:0 0 16px 0;">
        Checkout &amp; Direct<br>Patronage
      </h1>

      <!-- Card 1: Artisan Impact Receipt -->
      <div style="background:#FFFFFF; border:1px solid #ECE7E1; border-radius:14px; padding:14px; margin-bottom:14px; box-shadow:0 1px 4px rgba(0,0,0,0.03);">
        <div style="display:flex; gap:10px; align-items:center; margin-bottom:10px;">
          <div style="width:32px; height:32px; border-radius:8px; background:#FDEEE5; color:#7A2813; display:flex; align-items:center; justify-content:center; font-size:1rem; flex-shrink:0;">
            🧾
          </div>
          <div style="line-height:1.2;">
            <div style="font-size:0.88rem; font-weight:900; color:#1C1917;">Artisan Impact Receipt</div>
            <div style="font-size:0.62rem; color:#78716C; font-weight:700; letter-spacing:0.04em;">Direct Guild Transfer Record #KR-8821</div>
          </div>
        </div>

        <!-- Item 1: Ramdev Kumhar -->
        <div style="background:#FAF5F0; border-radius:8px; padding:8px 10px; display:flex; align-items:center; justify-content:space-between; margin-bottom:8px;">
          <div style="display:flex; gap:10px; align-items:center;">
            <img src="/assets/terracotta_pitcher.jpg" alt="Ramdev Kumhar" style="width:44px; height:44px; border-radius:6px; object-fit:cover; border:1px solid #ECE7E1;">
            <div>
              <div style="font-size:0.82rem; font-weight:900; color:#1C1917;">Ramdev Kumhar</div>
              <div style="font-size:0.68rem; color:#78716C; display:flex; align-items:center; gap:3px;">
                <span>📍</span>
                <span>Varanasi Terracotta Guild</span>
              </div>
            </div>
          </div>
          <span style="font-size:0.95rem; font-weight:900; color:#7A2813;">
            ₹750
          </span>
        </div>

        <!-- Item 2: Somnath Baghel -->
        <div style="background:#FAF5F0; border-radius:8px; padding:8px 10px; display:flex; align-items:center; justify-content:space-between; margin-bottom:12px;">
          <div style="display:flex; gap:10px; align-items:center;">
            <img src="/assets/dhokra_brass.jpg" alt="Somnath Baghel" style="width:44px; height:44px; border-radius:6px; object-fit:cover; border:1px solid #ECE7E1;">
            <div>
              <div style="font-size:0.82rem; font-weight:900; color:#1C1917;">Somnath Baghel</div>
              <div style="font-size:0.68rem; color:#78716C; display:flex; align-items:center; gap:3px;">
                <span>📍</span>
                <span>Bastar Dhokra Collective</span>
              </div>
            </div>
          </div>
          <span style="font-size:0.95rem; font-weight:900; color:#7A2813;">
            ₹920
          </span>
        </div>

        <!-- Fee Calculations -->
        <div style="display:flex; flex-direction:column; gap:6px; margin-bottom:10px;">
          <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.75rem;">
            <span style="color:#57534E;">Subtotal to Master Creators</span>
            <strong style="color:#1C1917;">₹1,670</strong>
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.75rem;">
            <span style="color:#57534E;">Platform Middleman Fee ⓘ</span>
            <strong style="color:#15803D;">₹0 (Zero Cut)</strong>
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.75rem;">
            <span style="color:#57534E;">Logistics</span>
            <strong style="color:#1C1917;">₹100</strong>
          </div>
        </div>

        <!-- Total Box -->
        <div style="background:#FAF7F2; border-radius:8px; padding:12px 14px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
            <span style="font-size:1.05rem; font-weight:900; color:#1C1917;">Total</span>
            <span style="font-size:1.4rem; font-weight:900; color:#7A2813;">₹1,670</span>
          </div>

          <div style="font-size:0.68rem; color:#57534E; line-height:1.4; display:flex; gap:6px; align-items:flex-start;">
            <span style="color:#15803D; font-size:0.8rem;">🌱</span>
            <div>
              Typical luxury gallery price: <span style="text-decoration:line-through; color:#A8A29E;">₹3,400</span>. You save <strong style="color:#15803D;">₹1,730</strong> while paying 100% direct value to creators.
            </div>
          </div>
        </div>
      </div>

      <!-- Card 2: Delivery Destination -->
      <div style="background:#FFFFFF; border:1px solid #ECE7E1; border-radius:14px; padding:14px; margin-bottom:14px; box-shadow:0 1px 4px rgba(0,0,0,0.03);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <div style="display:flex; gap:10px; align-items:center;">
            <div style="width:32px; height:32px; border-radius:8px; background:#FAF7F2; border:1px solid #ECE7E1; display:flex; align-items:center; justify-content:center; font-size:0.95rem;">
              📍
            </div>
            <div style="line-height:1.2;">
              <div style="font-size:0.88rem; font-weight:900; color:#1C1917;">Delivery Destination</div>
              <div style="font-size:0.62rem; color:#78716C;">Verified Indian Postal Zone</div>
            </div>
          </div>

          <button type="button" style="background:#EFECE6; border:1px solid #E5DCD3; border-radius:4px; padding:3px 10px; font-size:0.72rem; font-weight:700; color:#1C1917; cursor:pointer;" onclick="window.showToast?.('Edit delivery address modal')">
            Edit
          </button>
        </div>

        <!-- Address Box -->
        <div style="background:#FAF7F2; border-radius:8px; padding:10px 12px; margin-bottom:10px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
            <strong style="font-size:0.85rem; color:#1C1917;">Ananya Deshmukh</strong>
            <span style="background:#E7F7ED; color:#15803D; font-size:0.58rem; font-weight:800; padding:2px 7px; border-radius:9999px;">
              ✓ PIN 560038 Verified
            </span>
          </div>

          <div style="font-size:0.72rem; color:#57534E; line-height:1.35; margin-bottom:4px;">
            Flat 402, Kaveri Heights, 12th Main<br>
            Indiranagar, Bengaluru, Karnataka
          </div>

          <div style="font-size:0.72rem; color:#7A2813; font-weight:700; display:flex; align-items:center; gap:4px;">
            <span>📞</span>
            <span>+91 98450 12839</span>
          </div>
        </div>

        <!-- Fast Delivery Notice Box -->
        <div style="background:#FDF2EC; border-radius:8px; padding:10px 12px; display:flex; gap:10px; align-items:flex-start;">
          <div style="width:28px; height:28px; border-radius:50%; background:#7A2813; color:#FFFFFF; display:flex; align-items:center; justify-content:center; font-size:0.8rem; flex-shrink:0;">
            🚚
          </div>
          <div>
            <div style="font-size:0.76rem; font-weight:900; color:#1C1917; margin-bottom:2px;">Fast delivery</div>
            <div style="font-size:0.68rem; color:#57534E; line-height:1.35;">
              Packed with zero-plastic hand-knotted straw cushions and sun-dried paddy chaff. Estimated dispatch: 48 Hours.
            </div>
          </div>
        </div>
      </div>

      <!-- Card 3: Blessing Note -->
      <div style="background:#FFFFFF; border:1px solid #ECE7E1; border-radius:14px; padding:14px; margin-bottom:14px; box-shadow:0 1px 4px rgba(0,0,0,0.03);">
        <div style="display:flex; gap:10px; align-items:center; margin-bottom:10px;">
          <div style="width:32px; height:32px; border-radius:8px; background:#FAF7F2; border:1px solid #ECE7E1; display:flex; align-items:center; justify-content:center; font-size:0.95rem;">
            ✍️
          </div>
          <div style="font-size:0.88rem; font-weight:900; color:#1C1917;">Blessing Note</div>
        </div>

        <!-- 3 Quick Chips -->
        <div style="display:flex; gap:6px; flex-wrap:wrap; margin-bottom:10px;">
          <button type="button" class="blessing-chip active" id="chip-blessing-1" style="background:#FAF5EF; border:1px solid #EADBCE; border-radius:9999px; padding:4px 9px; font-size:0.65rem; font-weight:700; color:#57534E; cursor:pointer;">
            ✨ Honoring your traditional skill
          </button>
          <button type="button" class="blessing-chip" id="chip-blessing-2" style="background:#FAF5EF; border:1px solid #ECE7E1; border-radius:9999px; padding:4px 9px; font-size:0.65rem; font-weight:700; color:#57534E; cursor:pointer;">
            ♡ Blessings for your family
          </button>
          <button type="button" class="blessing-chip" id="chip-blessing-3" style="background:#FAF5EF; border:1px solid #ECE7E1; border-radius:9999px; padding:4px 9px; font-size:0.65rem; font-weight:700; color:#57534E; cursor:pointer;">
            🏠 Warm gratitude
          </button>
        </div>

        <div style="background:#FAF7F2; border:1px solid #ECE7E1; border-radius:8px; padding:10px;">
          <textarea id="input-blessing-note" rows="2" placeholder="Write a warm note of respect and encouragement for Ramdev and Somnath..." style="width:100%; border:none; background:transparent; outline:none; resize:none; font-family:inherit; font-size:0.72rem; color:#1C1917; line-height:1.4;"></textarea>
          <div style="text-align:right; font-size:0.62rem; color:#A8A29E; margin-top:4px;" id="char-count">
            0/160
          </div>
        </div>
      </div>

      <!-- Card 4: Payment Instrument -->
      <div style="background:#FFFFFF; border:1px solid #ECE7E1; border-radius:14px; padding:14px; margin-bottom:20px; box-shadow:0 1px 4px rgba(0,0,0,0.03);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
          <div style="display:flex; gap:10px; align-items:center;">
            <div style="width:32px; height:32px; border-radius:8px; background:#EFF6FF; color:#1E40AF; display:flex; align-items:center; justify-content:center; font-size:1rem;">
              💳
            </div>
            <div style="line-height:1.2;">
              <div style="font-size:0.88rem; font-weight:900; color:#1C1917;">Payment Instrument</div>
              <div style="font-size:0.62rem; color:#78716C;">Instant Direct Settlement</div>
            </div>
          </div>
          <span style="color:#15803D; font-size:0.85rem;">🔒</span>
        </div>

        <!-- 4 Payment Options -->
        <div style="display:flex; flex-direction:column; gap:8px;">
          
          <!-- Option 1: UPI Transfer (Active) -->
          <div class="pay-option active" id="pay-upi" style="background:#FAF5F0; border:1px solid #EADBCE; border-radius:8px; padding:10px 12px; display:flex; align-items:center; justify-content:space-between; cursor:pointer;">
            <div style="display:flex; align-items:center; gap:10px;">
              <div style="width:18px; height:18px; border-radius:50%; border:2px solid #7A2813; display:flex; align-items:center; justify-content:center;">
                <div style="width:8px; height:8px; border-radius:50%; background:#7A2813;"></div>
              </div>
              <div>
                <div style="font-size:0.82rem; font-weight:800; color:#1C1917; display:flex; align-items:center; gap:6px;">
                  <span>UPI Transfer</span>
                  <span style="background:#064E3B; color:#FFFFFF; font-size:0.56rem; font-weight:800; padding:1px 6px; border-radius:4px;">Instant</span>
                </div>
                <div style="font-size:0.68rem; color:#78716C;">Google Pay, PhonePe, Paytm, BHIM</div>
              </div>
            </div>
            <span style="font-size:1.1rem; color:#57534E;">▦</span>
          </div>

          <!-- Option 2: Credit / Debit Cards -->
          <div class="pay-option" id="pay-card" style="background:#FAF7F2; border:1px solid #ECE7E1; border-radius:8px; padding:10px 12px; display:flex; align-items:center; justify-content:space-between; cursor:pointer;">
            <div style="display:flex; align-items:center; gap:10px;">
              <div style="width:18px; height:18px; border-radius:50%; border:2px solid #D6C7B2;"></div>
              <div>
                <div style="font-size:0.82rem; font-weight:800; color:#1C1917;">Credit / Debit Cards</div>
                <div style="font-size:0.68rem; color:#78716C;">RuPay, Visa, Mastercard</div>
              </div>
            </div>
            <span style="font-size:1.1rem; color:#57534E;">💳</span>
          </div>

          <!-- Option 3: Net Banking -->
          <div class="pay-option" id="pay-netbank" style="background:#FAF7F2; border:1px solid #ECE7E1; border-radius:8px; padding:10px 12px; display:flex; align-items:center; justify-content:space-between; cursor:pointer;">
            <div style="display:flex; align-items:center; gap:10px;">
              <div style="width:18px; height:18px; border-radius:50%; border:2px solid #D6C7B2;"></div>
              <div>
                <div style="font-size:0.82rem; font-weight:800; color:#1C1917;">Net Banking</div>
                <div style="font-size:0.68rem; color:#78716C;">All Scheduled Commercial Indian Banks</div>
              </div>
            </div>
            <span style="font-size:1.1rem; color:#57534E;">🏛️</span>
          </div>

          <!-- Option 4: Cash on Delivery -->
          <div class="pay-option" id="pay-cod" style="background:#FAF7F2; border:1px solid #ECE7E1; border-radius:8px; padding:10px 12px; display:flex; align-items:center; justify-content:space-between; cursor:pointer;">
            <div style="display:flex; align-items:center; gap:10px;">
              <div style="width:18px; height:18px; border-radius:50%; border:2px solid #D6C7B2;"></div>
              <div>
                <div style="font-size:0.82rem; font-weight:800; color:#1C1917;">Cash on Delivery</div>
                <div style="font-size:0.68rem; color:#78716C;">Verified Delivery Agent COD Courier</div>
              </div>
            </div>
            <span style="font-size:1.1rem; color:#57534E;">💵</span>
          </div>

        </div>
      </div>

      <!-- Action Button & Pledge -->
      <button type="button" id="btn-final-pay" style="width:100%; height:48px; background:#702213; color:#FFFFFF; border:none; border-radius:8px; font-size:0.92rem; font-weight:900; display:flex; align-items:center; justify-content:center; gap:8px; cursor:pointer; box-shadow:0 2px 8px rgba(112,34,19,0.25);">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          <path d="m9 12 2 2 4-4"/>
        </svg>
        <span>Pay ₹1,670 &amp; Support Master Artisans</span>
      </button>

      <div style="font-size:0.65rem; color:#57534E; text-align:center; margin-top:8px; display:flex; align-items:center; justify-content:center; gap:4px;">
        <span style="color:#7A2813;">♡</span>
        <span>Direct Artisan Patronage Pledge: 0% Native Loom Cut</span>
      </div>

    </div>
  `;

  // Attach Event Handlers
  const textarea = container.querySelector('#input-blessing-note');
  const counter = container.querySelector('#char-count');
  textarea?.addEventListener('input', (e) => {
    noteText = e.target.value;
    if (counter) counter.textContent = `${noteText.length}/160`;
  });

  container.querySelector('#chip-blessing-1')?.addEventListener('click', () => {
    if (textarea) {
      textarea.value = "Honoring your traditional skill and timeless dedication to Indian heritage.";
      if (counter) counter.textContent = `${textarea.value.length}/160`;
    }
  });

  container.querySelector('#chip-blessing-2')?.addEventListener('click', () => {
    if (textarea) {
      textarea.value = "Sending warm blessings for your family and continuous prosperity to your craft.";
      if (counter) counter.textContent = `${textarea.value.length}/160`;
    }
  });

  container.querySelector('#chip-blessing-3')?.addEventListener('click', () => {
    if (textarea) {
      textarea.value = "With warm gratitude and respect for carrying forward this sacred handmade legacy.";
      if (counter) counter.textContent = `${textarea.value.length}/160`;
    }
  });

  // Pay button handler
  container.querySelector('#btn-final-pay')?.addEventListener('click', () => {
    AudioAssistance.speak("धन्यवाद! आपका ₹1,670 का सीधा भुगतान कारीगर रामदेव कुम्हार और सोमनाथ बघेल के खाते में सफलतापूर्वक जमा हो गया है।", "hi-IN");
    window.showToast?.("Payment successful! Direct DBT payout dispatched to artisans.");
    State.setScreen('buyer_orders');
  });
}
