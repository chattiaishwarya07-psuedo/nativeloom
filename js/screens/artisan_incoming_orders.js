/**
 * Artisan Screen: Incoming Orders & Delivery Agent Fulfillment
 * (Role: ARTISAN only - NOT reused as a buyer purchase-tracking screen)
 */

import { State } from '../state.js';

export function renderArtisanIncomingOrdersScreen(container) {
  function renderView() {
    const orders = State.artisan.incomingOrders || [];

    container.innerHTML = `
      <div class="artisan-orders-screen animate-fade-in" style="padding-bottom: 30px;">

        <!-- Top Title Row -->
        <div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:4px;">
          <h1 style="font-size:1.25rem; font-weight:900; color:var(--text-primary); margin:0;">
            Incoming Orders &amp; Dispatch
          </h1>
          <span style="font-size:0.75rem; font-weight:800; color:#7A2813;">${orders.length} Active Orders</span>
        </div>
        <p style="font-size:0.75rem; color:var(--text-secondary); margin:0 0 14px 0; line-height:1.35;">
          Delivery Agent daily pickup scheduled for <strong>Today, 3:00 PM</strong> from your Varanasi studio.
        </p>

        <!-- Pickup Notice Card -->
        <div style="background:#FFF9F5; border:1px solid #FCD7C2; border-radius:var(--radius-lg); padding:12px 14px; margin-bottom:16px; display:flex; align-items:center; gap:12px;">
          <div style="width:38px; height:38px; border-radius:10px; background:#7A2813; color:#FFFFFF; display:flex; align-items:center; justify-content:center; flex-shrink:0; box-shadow:0 1px 4px rgba(122,40,19,0.25);">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" data-keep-color="true" style="stroke:#FFFFFF !important; color:#FFFFFF !important;"><rect width="16" height="13" x="1" y="3" rx="2"/><polygon points="16 8 20 8 23 11 23 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
          </div>
          <div style="flex:1;">
            <div style="font-size:0.82rem; font-weight:800; color:#7A2813;">Speed Post Daily Studio Pickup</div>
            <div style="font-size:0.7rem; color:var(--text-secondary);">Postman: Rajesh Yadav • Pin 221001 • OTP 4921</div>
          </div>
        </div>

        <!-- Orders Fulfillment List / Empty State -->
        ${orders.length === 0 ? `
          <div style="background:#FFFFFF; border:1px solid var(--border-subtle); border-radius:var(--radius-lg); padding:32px 20px; text-align:center; box-shadow:var(--shadow-sm);">
            <div style="width:54px; height:54px; border-radius:50%; background:#E7F4ED; color:#1E6B47; display:flex; align-items:center; justify-content:center; margin:0 auto 12px auto;">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <h3 style="font-size:1.05rem; font-weight:800; color:var(--text-primary); margin:0 0 6px 0;">All Orders Packed &amp; Ready!</h3>
            <p style="font-size:0.78rem; color:var(--text-secondary); margin:0 0 16px 0; line-height:1.4;">
              All items have been marked packed and staged for Speed Post pickup.
            </p>
            <button type="button" id="btn-reset-orders" class="btn-secondary" style="padding:8px 16px; font-size:0.76rem; font-weight:700; border-radius:var(--radius-md); display:inline-flex; align-items:center; gap:6px; cursor:pointer;">
              <span>🔄 Reset Sample Orders</span>
            </button>
          </div>
        ` : `
          <div id="artisan-orders-list" style="display:flex; flex-direction:column; gap:12px;">
            ${orders.map(o => `
              <div class="order-card-item" id="order-card-${o.id}" style="background:#FFFFFF; border:1px solid var(--border-subtle); border-radius:var(--radius-lg); padding:14px; box-shadow:var(--shadow-sm); transition:all 0.28s ease;">

                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                  <span style="font-size:0.75rem; font-weight:800; color:var(--text-muted);">${o.id}</span>
                  <span style="background:${o.status === 'Ready for Pickup' ? '#FEECE5' : (o.status === 'Packed' ? '#FEF3C7' : '#E7F4ED')}; color:${o.status === 'Ready for Pickup' ? '#9A3412' : (o.status === 'Packed' ? '#92400E' : '#1E6B47')}; font-size:0.65rem; font-weight:800; padding:2px 8px; border-radius:var(--radius-pill);">
                    ${o.status}
                  </span>
                </div>

                <div style="font-size:0.95rem; font-weight:800; color:var(--text-primary); margin-bottom:4px;">
                  ${o.title}
                </div>

                <div style="display:flex; gap:12px; font-size:0.74rem; color:var(--text-secondary); margin-bottom:10px;">
                  <span><strong>Quantity:</strong> ${o.units} pcs</span>
                  <span><strong>Payout:</strong> ₹${o.amount} (0% fee)</span>
                </div>

                <!-- Buyer & Destination Details -->
                <div style="background:#FAF7F2; border-radius:var(--radius-md); padding:8px 10px; font-size:0.72rem; line-height:1.4; margin-bottom:12px;">
                  <div><strong>Buyer:</strong> ${o.buyer}</div>
                  <div><strong>Destination:</strong> ${o.destination}</div>
                  <div><strong>Barcode:</strong> <code style="font-family:monospace; font-weight:700; color:#7A2813;">${o.barcode}</code></div>
                </div>

                <!-- Patron Blessing Note to Artisan -->
                ${o.blessingNote ? `
                  <div style="background:#FFFDF5; border:1px dashed #D97706; border-radius:var(--radius-md); padding:10px 12px; margin-bottom:12px;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                      <span style="font-size:0.7rem; font-weight:800; color:#B45309; display:inline-flex; align-items:center; gap:4px;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                        <span>PATRON BLESSING NOTE</span>
                      </span>
                      <button type="button" class="btn-secondary" style="padding:2px 8px; font-size:0.65rem; font-weight:700; background:#FFFFFF; display:flex; align-items:center; gap:4px;" onclick="window.AudioAssistance.speak('${o.blessingNote.replace(/'/g, "\\'")}', 'en-IN')">
                        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
                        <span>Read Aloud</span>
                      </button>
                    </div>
                    <div style="font-size:0.74rem; color:#78350F; font-style:italic; line-height:1.4;">
                      "${o.blessingNote}"
                    </div>
                  </div>
                ` : ''}

                <!-- Actions -->
                <div style="display:flex; gap:8px;">
                  <button type="button" class="btn-secondary" style="flex:1; padding:8px; font-size:0.75rem; font-weight:700; display:flex; align-items:center; justify-content:center; gap:4px;" onclick="window.showToast('Printing Delivery Agent Shipping Label: ${o.barcode}...')">
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/></svg>
                    <span>Print Label</span>
                  </button>
                  <button type="button" class="btn-primary btn-mark-packed" data-order-id="${o.id}" style="flex:1.2; padding:8px; font-size:0.75rem; font-weight:800; background:#7A2813; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:4px;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    <span>Mark Packed</span>
                  </button>
                </div>

              </div>
            `).join('')}
          </div>
        `}

      </div>
    `;

    // Attach Mark Packed event listeners
    container.querySelectorAll('.btn-mark-packed').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const orderId = btn.getAttribute('data-order-id');
        const cardEl = container.querySelector(`#order-card-${orderId}`);

        if (cardEl) {
          cardEl.style.transition = 'all 0.25s ease';
          cardEl.style.opacity = '0';
          cardEl.style.transform = 'translateX(25px)';
        }

        setTimeout(() => {
          State.markIncomingOrderPacked(orderId);
          window.updateBottomNavUI?.();
          window.showToast?.(`Order ${orderId} marked as packed & removed.`);
          renderView();
        }, 220);
      });
    });

    // Attach Reset Sample Orders listener
    container.querySelector('#btn-reset-orders')?.addEventListener('click', () => {
      State.resetIncomingOrders();
      window.updateBottomNavUI?.();
      window.showToast?.("Sample orders restored.");
      renderView();
    });
  }

  renderView();
}
