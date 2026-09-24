/**
 * Screen 5: Checkout & Direct Patronage (Final Step)
 * Exact recreation of User Provided Reference Screenshot (Screen 5)
 */

import { State } from '../state.js';
import { AudioAssistance } from '../speech.js';

export function renderCheckoutScreen(container) {
  let selectedPayment = 'upi';
  let noteText = '';

  container.innerHTML = `
    <div class="checkout-screen animate-fade-in" style="padding-bottom:30px;">
      
      <!-- Top Step Meta Row -->
      <div class="step-meta-row" style="margin-top:8px;">
        <div class="step-indicator-pill">
          <div class="step-num-circle">3</div>
          <span style="font-size:0.75rem; font-weight:800;">FINAL STEP</span>
        </div>
        <span class="badge-green" style="font-size:0.65rem;">
          ✓ RBI Direct Payout
        </span>
      </div>

      <!-- Title -->
      <h1 style="font-size:1.35rem; font-weight:900; color:var(--text-primary); margin:6px 0 4px;">
        Checkout &amp; Direct Patronage
      </h1>
      <p style="font-size:0.76rem; color:var(--text-secondary); line-height:1.35; margin-bottom:14px;">
        Your contribution transfers immediately to the artisan co-operative guilds without third-party deductions.
      </p>

      <!-- Section 1: Artisan Impact Receipt -->
      <div class="patron-card">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:12px; padding-bottom:8px; border-bottom:1px dashed var(--border-subtle);">
          <div style="display:flex; gap:8px; align-items:center;">
            <span style="font-size:1.2rem;">🧾</span>
            <div>
              <div style="font-size:0.88rem; font-weight:800; color:var(--text-primary);">Artisan Impact Receipt</div>
              <div style="font-size:0.68rem; color:var(--text-muted); font-family:monospace;">Direct Guild Transfer Record #KR-8821</div>
            </div>
          </div>
          <span class="badge-green" style="background:#0E2E21; color:#4ADE80; border:none; font-size:0.62rem;">
            ⚡ 100% Direct
          </span>
        </div>

        <!-- Artisan Item 1 -->
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
          <div style="display:flex; gap:8px; align-items:center;">
            <img src="/assets/artisan_ramulu.jpg" alt="Ramdev Kumhar" style="width:36px; height:36px; border-radius:6px; object-fit:cover;">
            <div>
              <div style="font-size:0.82rem; font-weight:800;">Ramdev Kumhar</div>
              <div style="font-size:0.68rem; color:var(--text-muted);">Varanasi Terracotta Guild</div>
            </div>
          </div>
          <div style="text-align:right;">
            <div style="font-size:0.9rem; font-weight:900; color:var(--text-primary);">₹750</div>
            <div style="font-size:0.62rem; color:var(--color-green); font-weight:700;">100% Payout</div>
          </div>
        </div>

        <!-- Artisan Item 2 -->
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
          <div style="display:flex; gap:8px; align-items:center;">
            <img src="/assets/artisan_budhram.jpg" alt="Somnath Baghel" style="width:36px; height:36px; border-radius:6px; object-fit:cover;">
            <div>
              <div style="font-size:0.82rem; font-weight:800;">Somnath Baghel</div>
              <div style="font-size:0.68rem; color:var(--text-muted);">Bastar Dhokra Collective</div>
            </div>
          </div>
          <div style="text-align:right;">
            <div style="font-size:0.9rem; font-weight:900; color:var(--text-primary);">₹920</div>
            <div style="font-size:0.62rem; color:var(--color-green); font-weight:700;">100% Payout</div>
          </div>
        </div>

        <!-- Fee calculations -->
        <div class="transparency-row">
          <span>Subtotal to Master Creators</span>
          <strong>₹1,670</strong>
        </div>
        <div class="transparency-row">
          <span>Platform Middleman Fee</span>
          <strong style="color:var(--color-green);">₹0 (Zero Cut)</strong>
        </div>
        <div class="transparency-row">
          <span>India Post Subsidized Logistics</span>
          <div>
            <span class="badge-amber" style="font-size:0.6rem; padding:1px 5px; margin-right:4px;">Govt Assist</span>
            <strong style="color:var(--color-green);">FREE</strong>
          </div>
        </div>

        <div class="transparency-total-row">
          <span style="font-size:0.95rem; font-weight:900;">Direct Patron Total</span>
          <span style="font-size:1.4rem; font-weight:900; color:var(--color-terracotta);">₹1,670</span>
        </div>

        <!-- Luxury Gallery Comparison -->
        <div style="background:#F2EBE1; border-radius:var(--radius-sm); padding:8px 10px; font-size:0.72rem; color:var(--text-secondary); margin-top:10px; line-height:1.35;">
          🌱 <strong>Typical luxury gallery price: <span style="text-decoration:line-through;">₹3,400</span>.</strong> You save <strong>₹1,730</strong> while paying 100% direct value to creators.
        </div>
      </div>

      <!-- Section 2: Delivery Destination -->
      <div class="patron-card">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <div style="display:flex; align-items:center; gap:6px;">
            <span style="font-size:1.1rem;">📍</span>
            <div>
              <div style="font-size:0.85rem; font-weight:800;">Delivery Destination</div>
              <div style="font-size:0.68rem; color:var(--text-muted);">Verified Indian Postal Zone</div>
            </div>
          </div>
          <button type="button" style="background:none; border:none; color:var(--color-terracotta); font-size:0.72rem; font-weight:700; cursor:pointer;" onclick="window.showToast('Edit delivery address modal...')">
            Edit
          </button>
        </div>

        <div style="background:#FAF7F2; border-radius:var(--radius-md); padding:10px 12px; margin-bottom:8px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:3px;">
            <strong style="font-size:0.85rem; color:var(--text-primary);">Ananya Deshmukh</strong>
            <span class="badge-green" style="font-size:0.62rem;">✓ PIN 560038 Verified</span>
          </div>
          <div style="font-size:0.74rem; color:var(--text-secondary); line-height:1.35;">
            Flat 402, Kaveri Heights, 12th Main<br>
            Indiranagar, Bengaluru, Karnataka
          </div>
          <div style="font-size:0.72rem; color:var(--text-muted); margin-top:4px;">
            📞 +91 98450 12839
          </div>
        </div>

        <div style="background:#FEECE5; border-radius:var(--radius-sm); padding:8px 10px; font-size:0.72rem; color:#7A2E0E; display:flex; align-items:center; gap:8px;">
          <span>🚚</span>
          <div>
            <strong>India Post Handicrafts Speed Post:</strong> Packed with zero-plastic hand-knotted straw cushions and sun-dried paddy chaff. Estimated dispatch: 48 Hours.
          </div>
        </div>
      </div>

      <!-- Section 3: Patron Blessing Note -->
      <div class="patron-card">
        <div style="display:flex; align-items:center; gap:6px; margin-bottom:4px;">
          <span style="font-size:1.1rem;">✍️</span>
          <div>
            <div style="font-size:0.85rem; font-weight:800;">Patron Blessing Note</div>
            <div style="font-size:0.68rem; color:var(--text-muted);">Printed in Hindi &amp; handed to artisans</div>
          </div>
        </div>

        <p style="font-size:0.72rem; color:var(--text-secondary); line-height:1.35; margin-bottom:8px;">
          Your note is translated and read aloud at the craft guild morning assembly:
        </p>

        <!-- Quick Blessing Tags -->
        <div class="blessing-chips-row">
          <button type="button" class="blessing-chip active" id="chip-1">✨ Honoring your traditional skill</button>
          <button type="button" class="blessing-chip" id="chip-2">❤️ Blessings for your family</button>
          <button type="button" class="blessing-chip" id="chip-3">🏠 Warm gratitude</button>
        </div>

        <div style="position:relative;">
          <textarea id="note-input" rows="3" placeholder="Write a warm note of respect and encouragement for Ramdev and Somnath..." style="width:100%; border:1px solid var(--border-subtle); border-radius:var(--radius-md); padding:8px 10px; font-size:0.75rem; background:#FAF7F2; outline:none; resize:none; font-family:inherit;"></textarea>
          <div style="text-align:right; font-size:0.65rem; color:var(--text-muted); margin-top:2px;">
            0/160
          </div>
        </div>
      </div>

      <!-- Section 4: Payment Instrument -->
      <div class="patron-card">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
          <div style="display:flex; align-items:center; gap:6px;">
            <span style="font-size:1.1rem;">💳</span>
            <div>
              <div style="font-size:0.85rem; font-weight:800;">Payment Instrument</div>
              <div style="font-size:0.68rem; color:var(--text-muted);">Instant Direct Settlement</div>
            </div>
          </div>
          <span style="font-size:0.8rem;">🔒</span>
        </div>

        <div class="payment-radio-group">
          <!-- UPI -->
          <div class="payment-method-item selected" id="pay-upi">
            <div class="pay-radio-circle">
              <div class="pay-radio-dot"></div>
            </div>
            <div style="flex:1;">
              <div style="font-size:0.82rem; font-weight:800; display:flex; align-items:center; gap:6px;">
                UPI Transfer
                <span class="badge-green" style="font-size:0.58rem; padding:1px 5px;">Instant</span>
              </div>
              <div style="font-size:0.68rem; color:var(--text-muted);">Google Pay, PhonePe, Paytm, BHIM</div>
            </div>
            <span style="font-size:1.1rem;">📱</span>
          </div>

          <!-- Cards -->
          <div class="payment-method-item" id="pay-card">
            <div class="pay-radio-circle" style="border-color:#D6C7B2;"></div>
            <div style="flex:1;">
              <div style="font-size:0.82rem; font-weight:800;">Credit / Debit Cards</div>
              <div style="font-size:0.68rem; color:var(--text-muted);">RuPay, Visa, Mastercard</div>
            </div>
            <span style="font-size:1.1rem;">💳</span>
          </div>

          <!-- Net Banking -->
          <div class="payment-method-item" id="pay-netbank">
            <div class="pay-radio-circle" style="border-color:#D6C7B2;"></div>
            <div style="flex:1;">
              <div style="font-size:0.82rem; font-weight:800;">Net Banking</div>
              <div style="font-size:0.68rem; color:var(--text-muted);">All Scheduled Commercial Indian Banks</div>
            </div>
            <span style="font-size:1.1rem;">🏛️</span>
          </div>

          <!-- COD -->
          <div class="payment-method-item" id="pay-cod">
            <div class="pay-radio-circle" style="border-color:#D6C7B2;"></div>
            <div style="flex:1;">
              <div style="font-size:0.82rem; font-weight:800;">Cash on Delivery</div>
              <div style="font-size:0.68rem; color:var(--text-muted);">Verified India Post COD Courier</div>
            </div>
            <span style="font-size:1.1rem;">💵</span>
          </div>
        </div>
      </div>

      <!-- Section 5: RBI Escrow & Sovereign Payout Guarantee -->
      <div style="background:#FAF7F2; border:1px solid var(--border-subtle); border-radius:var(--radius-lg); padding:12px; margin-bottom:16px; display:flex; gap:10px; align-items:center;">
        <div style="width:36px; height:36px; border-radius:8px; background:#174332; color:#fff; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        </div>
        <div style="font-size:0.72rem; color:var(--text-secondary); line-height:1.35;">
          <strong style="color:var(--text-primary);">256-Bit RBI Escrow &amp; Sovereign Payout Guarantee:</strong>
          Artisans are paid 50% advance for raw clay/bronze and 50% upon parcel handover.
        </div>
      </div>

      <!-- Primary Action CTA -->
      <button type="button" class="btn-primary" id="btn-final-pay" style="padding:14px; font-size:0.95rem;">
        ✓ Pay ₹1,670 &amp; Support Master Artisans
      </button>

      <div style="font-size:0.7rem; color:var(--color-terracotta); text-align:center; margin-top:8px; font-weight:700;">
        ♡ Direct Artisan Patronage Pledge: 0% Karigra Cut
      </div>

    </div>
  `;

  // Blessing Chips clicks
  const noteInput = container.querySelector('#note-input');
  container.querySelector('#chip-1').addEventListener('click', () => {
    noteInput.value = "Honoring your traditional skill. Thank you for keeping our ancestral Indian crafts alive!";
  });
  container.querySelector('#chip-2').addEventListener('click', () => {
    noteInput.value = "Blessings for your family and workshop. May your hands continue to shape wonder!";
  });
  container.querySelector('#chip-3').addEventListener('click', () => {
    noteInput.value = "Warm gratitude from Bengaluru. Can't wait to welcome your handcrafted piece home!";
  });

  // Final Pay Trigger
  container.querySelector('#btn-final-pay').addEventListener('click', () => {
    window.showToast?.("Processing UPI Direct Settlement to Artisan Bank Accounts...");
    setTimeout(() => {
      window.showToast?.("₹1,670 Settled! Consignment generated with India Post.");
      setTimeout(() => {
        State.setScreen('orders');
      }, 900);
    }, 1200);
  });
}
