/**
 * Screen: Cart Review (Craft Direct Order)
 * Allows buyers to increase or decrease quantities, dynamically updating totals.
 */

import { State } from '../state.js';

export function renderCartReviewScreen(container) {
  function render() {
    const items = State.buyer?.cart || [];
    const itemCount = State.getCartCount();
    const subtotal = State.getCartSubtotal();
    const delivery = items.length > 0 ? 100 : 0;
    const serviceFee = items.length > 0 ? 20 : 0;
    const totalCost = subtotal + delivery + serviceFee;

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
          <span id="cart-item-count-badge" style="font-size:0.68rem; font-weight:700; color:#57534E; background:#EFE8DC; padding:3px 10px; border-radius:9999px;">
            ${itemCount} ${itemCount === 1 ? 'Item' : 'Items'}
          </span>
        </div>

        <p style="font-size:0.74rem; color:#57534E; margin:0 0 16px 0; line-height:1.4;">
          Review each artisan's direct parcel before dispatch.
        </p>

        <!-- Empty Cart State -->
        ${items.length === 0 ? `
          <div style="background:#FFFFFF; border:1px solid #ECE7E1; border-radius:14px; padding:36px 20px; text-align:center; box-shadow:0 1px 4px rgba(0,0,0,0.03); margin-bottom:16px;">
            <div style="width:52px; height:52px; border-radius:50%; background:#FAF4EE; color:#7A2813; display:flex; align-items:center; justify-content:center; margin:0 auto 12px auto;">
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
                <path d="M3 6h18"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
            </div>
            <div style="font-size:1rem; font-weight:800; color:#1C1917; margin-bottom:4px;">Your cart is empty</div>
            <p style="font-size:0.74rem; color:#78716C; margin:0 0 16px 0;">Add authentic handcrafted pieces directly from India's master artisans.</p>
            <div style="display:flex; gap:8px; justify-content:center;">
              <button type="button" class="btn-primary" onclick="window.navigateToScreen('explore')" style="padding:8px 16px; font-size:0.75rem; font-weight:800; background:#7A2813;">
                Explore Marketplace
              </button>
              <button type="button" id="btn-reset-cart" class="btn-secondary" style="padding:8px 14px; font-size:0.75rem; font-weight:700;">
                Reset Sample Items
              </button>
            </div>
          </div>
        ` : `
          <!-- Dynamic Items List -->
          <div style="display:flex; flex-direction:column; gap:14px; margin-bottom:16px;">
            ${items.map(item => `
              <div class="cart-item-card" id="cart-item-${item.id}" style="background:#FFFFFF; border:1px solid #ECE7E1; border-radius:14px; overflow:hidden; box-shadow:0 1px 4px rgba(0,0,0,0.03);">
                <!-- Header Strip -->
                <div style="background:#FAF5F0; padding:10px 14px; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #F3EDE6;">
                  <div style="display:flex; align-items:center; gap:8px;">
                    <div style="width:28px; height:28px; border-radius:50%; background:#FEECE5; color:#7A2813; display:flex; align-items:center; justify-content:center; font-size:0.85rem; flex-shrink:0;">
                      🛡️
                    </div>
                    <div style="line-height:1.15;">
                      <div style="font-size:0.85rem; font-weight:800; color:#1C1917;">${item.artisan || 'Master Artisan'}</div>
                      <div style="font-size:0.62rem; color:#78716C; font-weight:700; letter-spacing:0.04em;">${item.pehchanId ? 'PEHCHAN #' + item.pehchanId : 'PEHCHAN VERIFIED'}</div>
                    </div>
                  </div>
                  <span style="font-size:0.62rem; font-weight:700; color:#57534E; background:#EAE6E1; padding:3px 8px; border-radius:4px;">
                    ${item.hub || 'Artisan Hub'}
                  </span>
                </div>

                <!-- Body -->
                <div style="padding:12px 14px;">
                  <div style="display:flex; gap:12px; align-items:center; margin-bottom:8px;">
                    <img src="${item.image || '/assets/terracotta_pitcher.jpg'}" alt="${item.title}" style="width:68px; height:68px; border-radius:8px; object-fit:cover; border:1px solid #ECE7E1; flex-shrink:0;" onerror="this.src='/assets/terracotta_pitcher.jpg'">
                    <div style="flex:1;">
                      <div style="font-size:0.88rem; font-weight:800; color:#1C1917; margin-bottom:2px; line-height:1.25; cursor:pointer;" title="${item.title}" onclick="window.showToast?.('${item.title}')">
                        ${item.title}
                      </div>
                      <div style="font-size:0.68rem; color:#78716C; margin-bottom:6px;">
                        ${item.specification || item.cluster || 'Pure Handmade Handloom Craft'}
                      </div>
                      <div style="display:flex; justify-content:space-between; align-items:center;">
                        <div style="display:flex; align-items:baseline; gap:6px;">
                          <span style="font-size:1.05rem; font-weight:900; color:#7A2813;">
                            ₹${item.price}
                          </span>
                          ${item.quantity > 1 ? `
                            <span style="font-size:0.68rem; color:#78716C; font-weight:600;">
                              (₹${(item.price * item.quantity).toLocaleString('en-IN')})
                            </span>
                          ` : ''}
                        </div>

                        <!-- Quantity Selector Stepper [-] Qty [+] -->
                        <div style="display:inline-flex; align-items:center; background:#FAF7F2; border:1.5px solid #E5DCD3; border-radius:8px; overflow:hidden;">
                          <button type="button" class="btn-qty-minus" data-id="${item.id}" title="Decrease quantity" style="width:30px; height:30px; border:none; background:transparent; color:#7A2813; font-size:1.1rem; font-weight:900; cursor:pointer; display:flex; align-items:center; justify-content:center; line-height:1;">
                            −
                          </button>
                          <span class="qty-display-number" style="min-width:24px; text-align:center; font-size:0.78rem; font-weight:800; color:#1C1917; user-select:none;">
                            ${item.quantity}
                          </span>
                          <button type="button" class="btn-qty-plus" data-id="${item.id}" title="Increase quantity" style="width:30px; height:30px; border:none; background:transparent; color:#7A2813; font-size:1.1rem; font-weight:900; cursor:pointer; display:flex; align-items:center; justify-content:center; line-height:1;">
                            +
                          </button>
                        </div>

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
                    <span>${item.dispatch || 'Dispatches within 2 days'}</span>
                  </div>

                  <div style="font-size:0.72rem; font-weight:800; color:#C2410C; display:flex; align-items:center; gap:5px; cursor:pointer;" onclick="window.navigateToScreen('explore')">
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="12" y1="8" x2="12" y2="16"/>
                      <line x1="8" y1="12" x2="16" y2="12"/>
                    </svg>
                    <span>Add more pieces from ${item.artisan ? item.artisan.split(' ')[0] + "'s" : "artisan's"} workshop</span>
                  </div>
                </div>
              </div>
            `).join('')}
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
                <strong style="color:#1C1917; font-size:0.9rem;">₹${subtotal.toLocaleString('en-IN')}</strong>
              </div>

              <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.8rem;">
                <div style="display:flex; align-items:center; gap:6px; color:#334155;">
                  <span>🚚</span>
                  <span>Delivery charges</span>
                </div>
                <strong style="color:#1C1917; font-size:0.9rem;">₹${delivery.toLocaleString('en-IN')}</strong>
              </div>

              <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.8rem;">
                <div style="display:flex; align-items:center; gap:6px; color:#334155;">
                  <span>🤝</span>
                  <span>Platform Service Fee</span>
                </div>
                <strong style="color:#1C1917; font-size:0.9rem;">₹${serviceFee.toLocaleString('en-IN')}</strong>
              </div>

              <div style="border-top:1px solid #F1ECE6; margin:8px 0 4px;"></div>

              <div style="display:flex; justify-content:space-between; align-items:center;">
                <span style="font-size:0.95rem; font-weight:900; color:#1C1917;">Total cost</span>
                <span style="font-size:1.35rem; font-weight:900; color:#7A2813;">₹${totalCost.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        `}

      </div>

      ${items.length > 0 ? `
        <!-- Sticky Bottom Checkout Bar -->
        <div style="position:fixed; bottom:0; left:50%; transform:translateX(-50%); width:100%; max-width:430px; background:#FFFFFF; border-top:1px solid #ECE7E1; padding:10px 14px 14px; z-index:100; box-shadow:0 -2px 10px rgba(0,0,0,0.06);">
          <button type="button" id="btn-proceed-checkout" style="width:100%; height:48px; background:#782715; color:#FFFFFF; border:none; border-radius:10px; font-size:0.9rem; font-weight:900; display:flex; align-items:center; justify-content:center; gap:8px; cursor:pointer; box-shadow:0 2px 8px rgba(120,39,21,0.25);">
            <span>Proceed to Address &amp; Direct Checkout (₹${totalCost.toLocaleString('en-IN')})</span>
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
      ` : ''}
    `;

    // Quantity Increment / Decrement Handlers
    container.querySelectorAll('.btn-qty-plus').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const id = btn.getAttribute('data-id');
        State.updateCartQuantity(id, 1);
        window.updateBottomNavUI?.();
        render();
      });
    });

    container.querySelectorAll('.btn-qty-minus').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const id = btn.getAttribute('data-id');
        State.updateCartQuantity(id, -1);
        window.updateBottomNavUI?.();
        render();
      });
    });

    // Reset Sample Cart listener
    container.querySelector('#btn-reset-cart')?.addEventListener('click', () => {
      State.resetBuyerCart?.();
      window.updateBottomNavUI?.();
      render();
    });

    // Proceed to checkout
    container.querySelector('#btn-proceed-checkout')?.addEventListener('click', () => {
      State.setScreen('checkout');
    });
  }

  render();
}
