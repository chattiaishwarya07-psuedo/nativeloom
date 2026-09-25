/**
 * Screen: Cart Review (Craft Direct Order)
 * Pixel-perfect recreation of User Provided Reference Screenshot
 */

import { State } from '../state.js';
import { AudioAssistance } from '../speech.js';

export function renderCartReviewScreen(container) {
  const items = State.cart;
  const itemCount = State.getCartCount();

  container.innerHTML = `
    <div class="cart-review-screen animate-fade-in" style="padding: 10px 14px 96px; background: #FAF7F2; min-height: 100vh;">
      
      <!-- Top Badge -->
      <div style="margin-bottom:6px;">
        <span style="background:#FEECE5; color:#7A2813; font-size:0.62rem; font-weight:800; padding:3px 9px; border-radius:9999px; display:inline-flex; align-items:center; gap:4px; letter-spacing:0.04em;">
          <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
            <path d="M3 6h18"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          <span>CART REVIEW</span>
        </span>
      </div>

      <!-- Title Row -->
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
        <h1 style="font-size:1.35rem; font-weight:900; color:#1C1917; margin:0; line-height:1.2;">
          Craft Direct Order
        </h1>
        <span style="font-size:0.68rem; font-weight:700; color:#57534E; background:#EFE8DC; padding:3px 10px; border-radius:9999px;">
          ${itemCount || 2} Items
        </span>
      </div>

      <p style="font-size:0.74rem; color:#57534E; margin:0 0 16px 0; line-height:1.4;">
        Review each artisan's direct parcel before dispatch.
      </p>

      <!-- Parcel Card 1: Ramdev Kumhar -->
      <div style="background:#FFFFFF; border:1px solid #ECE7E1; border-radius:14px; overflow:hidden; box-shadow:0 1px 4px rgba(0,0,0,0.03); margin-bottom:14px;">
        <!-- Header Strip -->
        <div style="background:#FAF5F0; padding:10px 14px; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #F3EDE6;">
          <div style="display:flex; align-items:center; gap:8px;">
            <div style="width:28px; height:28px; border-radius:50%; background:#FEECE5; color:#7A2813; display:flex; align-items:center; justify-content:center; font-size:0.85rem; flex-shrink:0;">
              🛡️
            </div>
            <div style="line-height:1.15;">
              <div style="font-size:0.85rem; font-weight:800; color:#1C1917;">Ramdev Kumhar</div>
              <div style="font-size:0.62rem; color:#78716C; font-weight:700; letter-spacing:0.04em;">PEHCHAN #UP-VAR-492</div>
            </div>
          </div>
          <span style="font-size:0.62rem; font-weight:700; color:#57534E; background:#EAE6E1; padding:3px 8px; border-radius:4px;">
            Varanasi Hub
          </span>
        </div>

        <!-- Body -->
        <div style="padding:12px 14px;">
          <div style="display:flex; gap:12px; align-items:center; margin-bottom:8px;">
            <img src="/assets/terracotta_pitcher.jpg" alt="Hand-Etched Terracotta Pitcher" style="width:68px; height:68px; border-radius:8px; object-fit:cover; border:1px solid #ECE7E1; flex-shrink:0;">
            <div style="flex:1;">
              <div style="font-size:0.88rem; font-weight:800; color:#1C1917; margin-bottom:2px; line-height:1.25;">
                Hand-Etched Terracotta Pitc...
              </div>
              <div style="font-size:0.68rem; color:#78716C; margin-bottom:6px;">
                Capacity: 1.8 Liters • Clay Fired
              </div>
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <span style="font-size:1.05rem; font-weight:900; color:#7A2813;">
                  ₹750
                </span>
                <span style="font-size:0.68rem; font-weight:800; color:#1C1917; background:#FAF7F2; border:1px solid #E5DCD3; padding:2px 8px; border-radius:6px;">
                  Qty: 1
                </span>
              </div>
            </div>
          </div>

          <div style="font-size:0.7rem; color:#475569; display:flex; align-items:center; gap:5px; margin:8px 0 6px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M10 17h4V5H2v12h3"/>
              <path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5"/>
              <circle cx="7.5" cy="17.5" r="2.5"/>
              <circle cx="17.5" cy="17.5" r="2.5"/>
            </svg>
            <span>Dispatches within 2 days</span>
          </div>

          <div style="font-size:0.72rem; font-weight:800; color:#C2410C; display:flex; align-items:center; gap:5px; cursor:pointer;" onclick="window.navigateToScreen('product_details')">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="16"/>
              <line x1="8" y1="12" x2="16" y2="12"/>
            </svg>
            <span>Add more pieces from Ramdev's workshop</span>
          </div>
        </div>
      </div>

      <!-- Parcel Card 2: Somnath Baghel -->
      <div style="background:#FFFFFF; border:1px solid #ECE7E1; border-radius:14px; overflow:hidden; box-shadow:0 1px 4px rgba(0,0,0,0.03); margin-bottom:16px;">
        <!-- Header Strip -->
        <div style="background:#F4F7FB; padding:10px 14px; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #EBF0F7;">
          <div style="display:flex; align-items:center; gap:8px;">
            <div style="width:28px; height:28px; border-radius:50%; background:#E0EDFB; color:#2563EB; display:flex; align-items:center; justify-content:center; font-size:0.85rem; flex-shrink:0;">
              🛡️
            </div>
            <div style="line-height:1.15;">
              <div style="font-size:0.85rem; font-weight:800; color:#1C1917;">Somnath Baghel</div>
              <div style="font-size:0.62rem; color:#78716C; font-weight:700; letter-spacing:0.04em;">PEHCHAN #CG-BST-118</div>
            </div>
          </div>
          <span style="font-size:0.62rem; font-weight:700; color:#57534E; background:#E5E7EB; padding:3px 8px; border-radius:4px;">
            Bastar Guild
          </span>
        </div>

        <!-- Body -->
        <div style="padding:12px 14px;">
          <div style="display:flex; gap:12px; align-items:center; margin-bottom:8px;">
            <img src="/assets/dhokra_brass.jpg" alt="Dhokra Brass Tribal Nandi" style="width:68px; height:68px; border-radius:8px; object-fit:cover; border:1px solid #ECE7E1; flex-shrink:0;">
            <div style="flex:1;">
              <div style="font-size:0.88rem; font-weight:800; color:#1C1917; margin-bottom:2px; line-height:1.25;">
                Dhokra Brass Tribal Nandi
              </div>
              <div style="font-size:0.68rem; color:#78716C; margin-bottom:6px;">
                Solid Brass • Lost-Wax Casting
              </div>
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <span style="font-size:1.05rem; font-weight:900; color:#7A2813;">
                  ₹920
                </span>
                <span style="font-size:0.68rem; font-weight:800; color:#1C1917; background:#FAF7F2; border:1px solid #E5DCD3; padding:2px 8px; border-radius:6px;">
                  Qty: 1
                </span>
              </div>
            </div>
          </div>

          <div style="font-size:0.7rem; color:#475569; display:flex; align-items:center; gap:5px; margin:8px 0 6px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M10 17h4V5H2v12h3"/>
              <path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5"/>
              <circle cx="7.5" cy="17.5" r="2.5"/>
              <circle cx="17.5" cy="17.5" r="2.5"/>
            </svg>
            <span>Dispatches in <strong>48 hrs</strong></span>
          </div>

          <div style="font-size:0.72rem; font-weight:800; color:#C2410C; display:flex; align-items:center; gap:5px; cursor:pointer;" onclick="window.navigateToScreen('explore')">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="16"/>
              <line x1="8" y1="12" x2="16" y2="12"/>
            </svg>
            <span>Add more pieces from Somnath's workshop</span>
          </div>
        </div>
      </div>

      <!-- Payment Transparency Card -->
      <div style="background:#FFFFFF; border:1px solid #ECE7E1; border-radius:14px; padding:14px; margin-bottom:20px; box-shadow:0 1px 4px rgba(0,0,0,0.03);">
        <div style="font-size:0.92rem; font-weight:900; color:#1C1917; margin-bottom:12px; display:flex; align-items:center; gap:6px;">
          <span>🧾</span>
          <span>Payment Transparency</span>
        </div>

        <div style="display:flex; flex-direction:column; gap:8px;">
          <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.8rem;">
            <div style="display:flex; align-items:center; gap:6px; color:#334155;">
              <span>🌿</span>
              <span>Direct to Artisans</span>
            </div>
            <strong style="color:#1C1917; font-size:0.9rem;">₹1,670</strong>
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.8rem;">
            <div style="display:flex; align-items:center; gap:6px; color:#334155;">
              <span>🚚</span>
              <span>Delivery charges</span>
            </div>
            <strong style="color:#1C1917; font-size:0.9rem;">₹100</strong>
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.8rem;">
            <div style="display:flex; align-items:center; gap:6px; color:#334155;">
              <span>🤝</span>
              <span>Platform Service Fee</span>
            </div>
            <strong style="color:#1C1917; font-size:0.9rem;">₹20</strong>
          </div>

          <div style="border-top:1px solid #F1ECE6; margin:8px 0 4px;"></div>

          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span style="font-size:0.95rem; font-weight:900; color:#1C1917;">Total cost</span>
            <span style="font-size:1.35rem; font-weight:900; color:#7A2813;">₹1,770</span>
          </div>
        </div>
      </div>

    </div>

    <!-- Sticky Bottom Checkout Bar -->
    <div style="position:fixed; bottom:0; left:50%; transform:translateX(-50%); width:100%; max-width:430px; background:#FFFFFF; border-top:1px solid #ECE7E1; padding:10px 14px 14px; z-index:100; box-shadow:0 -2px 10px rgba(0,0,0,0.06);">
      <button type="button" id="btn-proceed-checkout" style="width:100%; height:48px; background:#782715; color:#FFFFFF; border:none; border-radius:10px; font-size:0.9rem; font-weight:900; display:flex; align-items:center; justify-content:center; gap:8px; cursor:pointer; box-shadow:0 2px 8px rgba(120,39,21,0.25);">
        <span>Proceed to Address &amp; Direct Checkout</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"/>
          <polyline points="12 5 19 12 12 19"/>
        </svg>
      </button>

      <div style="font-size:0.65rem; color:#57534E; text-align:center; margin-top:6px; display:flex; align-items:center; justify-content:center; gap:4px;">
        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#15803D" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
        <span>Secure direct UPI / Rupay / NetBanking escrow</span>
      </div>
    </div>
  `;

  // Attach Event Handlers
  container.querySelector('#btn-proceed-checkout')?.addEventListener('click', () => {
    State.setScreen('checkout');
  });
}
