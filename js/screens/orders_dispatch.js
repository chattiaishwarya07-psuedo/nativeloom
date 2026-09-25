/**
 * Screen: Orders & Delivery Agent Dispatch (Orders Tab)
 * Manage incoming orders, fragile packing checklists, and Delivery Agent consignment slips
 */

import { State } from '../state.js';

export function renderOrdersScreen(container) {
  const orders = [
    {
      id: State.urgentOrder.id,
      title: State.urgentOrder.title,
      dest: State.urgentOrder.destination,
      consignment: State.urgentOrder.consignmentId,
      status: State.urgentOrder.accepted ? 'Delivery Agent Pickup Scheduled' : 'Incoming Handover (Urgent)',
      badgeClass: State.urgentOrder.accepted ? 'badge-green' : 'badge-amber',
      amount: State.urgentOrder.amount,
      img: '/assets/raw_pottery_snap.jpg',
      canPrint: true
    },
    {
      id: 'ORD-2026-8794',
      title: 'Handcrafted Terracotta Festive Diya Set (12)',
      dest: 'Bandra West, Mumbai',
      consignment: 'IP-BOM-91024',
      status: 'Delivered • Direct DBT Settled',
      badgeClass: 'badge-green',
      amount: 680,
      img: '/assets/raw_pottery_snap.jpg',
      canPrint: false
    }
  ];

  container.innerHTML = `
    <div class="orders-screen animate-fade-in">
      
      <!-- Orders Header -->
      <div class="section-label-row" style="margin-top:12px;">
        <span class="section-label" style="font-size:0.92rem;">Delivery Agent Artisan Dispatch Hub</span>
        <span class="badge-green" style="font-size:0.62rem;">Daily Scheduled Pickup</span>
      </div>
      <p style="font-size:0.75rem; color:var(--text-secondary); margin-bottom:14px;">
        All packages handled with certified shock-absorbing padding for fragile terracotta craft.
      </p>

      <!-- Orders List -->
      ${orders.map(o => `
        <div class="order-card">
          <div class="order-top-row">
            <span class="order-id-badge">${o.id}</span>
            <span class="${o.badgeClass}" style="font-size:0.65rem;">${o.status}</span>
          </div>

          <div class="order-body-flex">
            <img src="${o.img}" alt="${o.title}" class="order-product-thumb" onerror="this.src='/assets/artisan_ramulu.jpg'">
            <div class="order-details-col">
              <div class="order-product-title">${o.title}</div>
              <div class="order-dest">Destination: <strong>${o.dest}</strong></div>
              <div style="font-size:0.68rem; color:var(--text-muted); font-family:monospace; margin-top:2px;">
                Consignment: ${o.consignment}
              </div>
            </div>
            <div style="font-size:0.95rem; font-weight:800; color:var(--text-primary);">
              ₹${o.amount}
            </div>
          </div>

          <!-- Consignment Slip Action -->
          <button type="button" class="order-slip-btn" onclick="window.showConsignmentModal('${o.id}', '${o.consignment}', '${o.dest}', '${o.title}')">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/></svg>
            View Delivery Agent Shipping Slip &amp; Barcode
          </button>
        </div>
      `).join('')}

      <!-- Bottom Sheet Modal: Delivery Agent Dispatch Slip -->
      <div class="modal-overlay" id="modal-consignment">
        <div class="bottom-sheet" style="background:#FFFFFF;">
          <div class="sheet-header">
            <div class="sheet-title-group">
              <span style="font-size:1.1rem;">📦</span>
              <div>
                <div style="font-size:0.95rem; font-weight:800;">Delivery Agent Artisan Dispatch Slip</div>
                <div style="font-size:0.7rem; color:var(--text-muted);">Ministry of Textiles Artisan Fast-Track</div>
              </div>
            </div>
            <button type="button" class="sheet-close-btn" id="btn-close-consignment">✕</button>
          </div>

          <!-- Slip Details -->
          <div id="consignment-slip-content" style="background:#FFFDF9; border:1px solid #D6C7B2; border-radius:8px; padding:12px; margin-bottom:14px; font-family:monospace;">
            <!-- Filled dynamically -->
          </div>

          <button type="button" class="btn-primary" onclick="window.printSlip()">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/></svg>
            Print Shipping Label (Thermal / A4)
          </button>
        </div>
      </div>

    </div>
  `;

  // Attach modal handlers
  const modal = container.querySelector('#modal-consignment');
  container.querySelector('#btn-close-consignment').addEventListener('click', () => {
    modal.classList.remove('active');
  });

  window.showConsignmentModal = (orderId, trackingId, dest, item) => {
    const content = container.querySelector('#consignment-slip-content');
    content.innerHTML = `
      <div style="text-align:center; padding-bottom:8px; border-bottom:1px dashed #A89582; margin-bottom:8px;">
        <strong style="font-size:0.85rem;">DELIVERY AGENT NETWORK</strong><br>
        <span style="font-size:0.7rem; color:#6B5548;">EXPRESS LOGISTICS • ZERO WEIGHT PENALTY</span>
      </div>
      <div style="font-size:0.74rem; line-height:1.5;">
        <strong>SENDER:</strong> Shri Ramdev Kumhar (Pehchan: UP-VAR-49281-H)<br>
        Varanasi Clay Guild Cluster, Uttar Pradesh - 221002<br>
        <strong>RECIPIENT:</strong> Buyer at ${dest}<br>
        <strong>ITEM:</strong> ${item}<br>
        <strong>BARCODE TRACKING:</strong> ${trackingId}
      </div>
      <div style="margin-top:10px; padding:8px; background:#000; color:#fff; text-align:center; font-size:1.1rem; letter-spacing:0.3em; font-weight:bold;">
        ||| | ||||| || |||||| | |||
      </div>
    `;
    modal.classList.add('active');
  };

  window.printSlip = () => {
    window.showToast?.("Preparing label for Delivery Agent thermal printing...");
    setTimeout(() => {
      modal.classList.remove('active');
    }, 1000);
  };
}
