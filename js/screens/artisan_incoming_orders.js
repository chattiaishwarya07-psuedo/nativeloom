/**
 * Artisan Screen: Incoming Orders & Delivery Agent Fulfillment
 * (Role: ARTISAN only - NOT reused as a buyer purchase-tracking screen)
 */

import { State } from '../state.js';

export function renderArtisanIncomingOrdersScreen(container) {
  const orders = State.artisan.incomingOrders;

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
        <div style="width:38px; height:38px; border-radius:10px; background:#7A2813; color:#FFFFFF; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="13" x="1" y="3" rx="2"/><polygon points="16 8 20 8 23 11 23 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
        </div>
        <div style="flex:1;">
          <div style="font-size:0.82rem; font-weight:800; color:#7A2813;">Speed Post Daily Studio Pickup</div>
          <div style="font-size:0.7rem; color:var(--text-secondary);">Postman: Rajesh Yadav • Pin 221001 • OTP 4921</div>
        </div>
      </div>

      <!-- Orders Fulfillment List -->
      <div style="display:flex; flex-direction:column; gap:12px;">
        ${orders.map(o => `
          <div style="background:#FFFFFF; border:1px solid var(--border-subtle); border-radius:var(--radius-lg); padding:14px; box-shadow:var(--shadow-sm);">
            
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
                  <span style="font-size:0.7rem; font-weight:800; color:#B45309;">💌 PATRON BLESSING NOTE</span>
                  <button type="button" class="btn-secondary" style="padding:2px 8px; font-size:0.65rem; font-weight:700; background:#FFFFFF; display:flex; align-items:center; gap:4px;" onclick="window.AudioAssistance.speak('${o.blessingNote.replace(/'/g, "\\'")}', 'en-IN')">
                    <span>🔊 Read Aloud</span>
                  </button>
                </div>
                <div style="font-size:0.74rem; color:#78350F; font-style:italic; line-height:1.4;">
                  "${o.blessingNote}"
                </div>
              </div>
            ` : ''}

            <!-- Actions -->
            <div style="display:flex; gap:8px;">
              <button type="button" class="btn-secondary" style="flex:1; padding:8px; font-size:0.75rem; font-weight:700;" onclick="window.showToast('Printing Delivery Agent Shipping Label: ${o.barcode}...')">
                🖨️ Print Label
              </button>
              <button type="button" class="btn-primary" style="flex:1.2; padding:8px; font-size:0.75rem; font-weight:800; background:#7A2813;" onclick="window.showToast('Consignment ${o.id} marked as packed &amp; handed over.')">
                ✓ Mark Packed
              </button>
            </div>

          </div>
        `).join('')}
      </div>

    </div>
  `;
}
