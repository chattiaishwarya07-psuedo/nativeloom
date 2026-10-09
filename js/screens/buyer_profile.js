/**
 * Buyer Screen: Profile & Settings
 * (Role: BUYER only)
 * Includes saved shipping address, consumer patronage statistics,
 * previous orders history view modal, and deliberate "Log Out / Switch Account".
 */

import { State } from '../state.js';

export function openPreviousOrdersModal(filter = 'all') {
  const existing = document.getElementById('modal-previous-orders');
  if (existing) existing.remove();

  const orders = State.buyer.myOrders || [];
  const inTransitCount = orders.filter(o => o.isInTransit || (o.status && o.status.toLowerCase().includes('transit')) || (o.status && o.status.toLowerCase().includes('pickup'))).length;
  const deliveredCount = orders.length - inTransitCount;
  const totalSpent = orders.reduce((sum, o) => sum + (o.amount || 0), 0);

  const modal = document.createElement('div');
  modal.id = 'modal-previous-orders';
  modal.className = 'modal-overlay active';

  function renderList(currentFilter) {
    let filteredOrders = orders;
    if (currentFilter === 'in_transit') {
      filteredOrders = orders.filter(o => o.isInTransit || (o.status && o.status.toLowerCase().includes('transit')) || (o.status && o.status.toLowerCase().includes('pickup')));
    } else if (currentFilter === 'delivered') {
      filteredOrders = orders.filter(o => !o.isInTransit && (!o.status || (!o.status.toLowerCase().includes('transit') && !o.status.toLowerCase().includes('pickup'))));
    }

    const container = modal.querySelector('#orders-list-container');
    if (!container) return;

    if (filteredOrders.length === 0) {
      container.innerHTML = `
        <div style="text-align:center; padding:32px 14px; color:#78716C;">
          <div style="font-size:2rem; margin-bottom:8px;">📦</div>
          <div style="font-size:0.9rem; font-weight:800; color:#1C1917;">No orders found in this category</div>
          <div style="font-size:0.75rem; margin-top:4px;">Browse authentic handcrafted products from rural guilds.</div>
          <button type="button" class="btn-primary" style="margin-top:14px; padding:10px 18px; font-size:0.8rem; background:#7A2813;" onclick="document.getElementById('modal-previous-orders')?.remove(); window.navigateToScreen('explore');">
            Explore Handloom &amp; Crafts
          </button>
        </div>
      `;
      return;
    }

    container.innerHTML = filteredOrders.map(order => {
      const isInTransit = order.isInTransit || (order.status && order.status.toLowerCase().includes('transit')) || (order.status && order.status.toLowerCase().includes('pickup'));

      return `
        <div class="order-card-item" style="background:#FFFFFF; border:1px solid #ECE7E1; border-radius:14px; padding:14px; margin-bottom:12px; box-shadow:0 1px 4px rgba(0,0,0,0.03);">
          <!-- Order Header: ID, Date & Status Badge -->
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; border-bottom:1px solid #F5EFEB; padding-bottom:8px;">
            <div>
              <div style="font-size:0.62rem; font-weight:800; color:#78716C; text-transform:uppercase; letter-spacing:0.04em;">ORDER ID</div>
              <div style="font-size:0.88rem; font-weight:900; color:#1C1917;">#${order.orderId}</div>
            </div>

            <div style="text-align:right;">
              <span style="display:inline-flex; align-items:center; gap:5px; font-size:0.65rem; font-weight:800; padding:3px 10px; border-radius:9999px; ${isInTransit ? 'background:#E7F7ED; color:#15803D; border:1px solid #BBF7D0;' : 'background:#F3F4F6; color:#374151; border:1px solid #E5E7EB;'}">
                <span style="width:6px; height:6px; border-radius:50%; background:${isInTransit ? '#15803D' : '#4B5563'};"></span>
                <span>${isInTransit ? 'In-Transit' : 'Delivered'}</span>
              </span>
              <div style="font-size:0.62rem; color:#78716C; margin-top:2px;">${order.date}</div>
            </div>
          </div>

          <!-- Product Details Row -->
          <div style="display:flex; gap:12px; align-items:center; margin-bottom:10px;">
            <div style="width:58px; height:58px; border-radius:10px; overflow:hidden; border:1px solid #ECE7E1; flex-shrink:0;">
              <img src="${order.image}" alt="${order.craftTitle}" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='/assets/terracotta_pitcher.jpg'">
            </div>

            <div style="flex:1; min-width:0;">
              <div style="font-size:0.88rem; font-weight:900; color:#1C1917; line-height:1.25; margin-bottom:3px; word-break:break-word;">
                ${order.craftTitle}
              </div>
              <div style="font-size:0.72rem; color:#873413; font-weight:700;">
                👨‍🎨 ${order.artisan}
              </div>
              <div style="font-size:0.68rem; color:#78716C; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                📍 ${order.cluster}
              </div>
            </div>
          </div>

          <!-- Amount & Transparent Payout Row -->
          <div style="background:#FAF7F2; border-radius:8px; padding:8px 10px; margin-bottom:10px; display:flex; justify-content:space-between; align-items:center;">
            <div>
              <div style="font-size:0.6rem; color:#78716C;">Direct Value Paid</div>
              <div style="font-size:0.95rem; font-weight:900; color:#7A2813;">
                ₹${order.amount.toLocaleString('en-IN')}
              </div>
            </div>
            <div style="text-align:right;">
              <span style="font-size:0.62rem; font-weight:800; color:#15803D; background:#E7F7ED; padding:2px 8px; border-radius:9999px;">
                100% Direct Payout (0% Cut)
              </span>
              <div style="font-size:0.62rem; color:#78716C; margin-top:2px;">
                ${order.itemsCount || 1} craft item${(order.itemsCount || 1) > 1 ? 's' : ''}
              </div>
            </div>
          </div>

          <!-- Postal Consignment Tracking Bar -->
          <div style="background:#FFFFFF; border:1px dashed #D6C7B2; border-radius:8px; padding:6px 10px; margin-bottom:10px; display:flex; justify-content:space-between; align-items:center;">
            <div style="font-size:0.68rem; color:#57534E; display:flex; align-items:center; gap:5px;">
              <span>📮</span>
              <span><strong>AWB:</strong> ${order.trackingNumber}</span>
            </div>
            <button type="button" style="background:none; border:none; color:#7A2813; font-size:0.68rem; font-weight:800; cursor:pointer;" onclick="navigator.clipboard?.writeText('${order.trackingNumber}'); window.showToast?.('AWB ${order.trackingNumber} copied! 📋');">
              Copy
            </button>
          </div>

          ${order.blessingNote ? `
            <div style="background:#FFF9F5; border-left:3px solid #C2410C; padding:6px 10px; border-radius:4px; font-size:0.68rem; color:#57534E; font-style:italic; margin-bottom:10px; line-height:1.35;">
              "${order.blessingNote}"
            </div>
          ` : ''}

          <!-- Action Buttons -->
          <div style="display:flex; gap:8px;">
            ${isInTransit ? `
              <button type="button" class="btn-primary" style="flex:1; padding:10px; font-size:0.78rem; font-weight:800; background:#7A2813; display:flex; align-items:center; justify-content:center; gap:6px;" onclick="document.getElementById('modal-previous-orders')?.remove(); window.navigateToScreen('buyer_orders');">
                <span>🚚 Track Live Doorstep Journey</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </button>
            ` : `
              <button type="button" class="btn-secondary" style="flex:1; padding:9px; font-size:0.74rem; font-weight:800;" onclick="window.showToast?.('📜 GI Certificate Verified: Handcrafted by ${order.artisan}')">
                📜 GI Certificate
              </button>
              <button type="button" class="btn-primary" style="flex:1.2; padding:9px; font-size:0.74rem; font-weight:800; background:#7A2813;" onclick="document.getElementById('modal-previous-orders')?.remove(); window.navigateToScreen('explore');">
                🔄 Reorder Craft
              </button>
            `}
          </div>

        </div>
      `;
    }).join('');
  }

  modal.innerHTML = `
    <div class="bottom-sheet animate-slide-up" style="max-height:90vh; width:100%; max-width:480px; overflow-y:auto; background:#FAF7F2; border-radius:22px 22px 0 0; padding:16px 16px 28px; box-sizing:border-box;">

      <!-- Drag Handle -->
      <div style="width:36px; height:4px; background:#D6C7B2; border-radius:2px; margin:0 auto 12px;"></div>

      <!-- Sheet Header -->
      <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:12px;">
        <div style="display:flex; align-items:center; gap:10px;">
          <div style="width:36px; height:36px; border-radius:10px; background:#FEECE5; color:#7A2813; display:flex; align-items:center; justify-content:center; font-size:1.15rem; flex-shrink:0;">
            📦
          </div>
          <div>
            <div style="font-size:1.05rem; font-weight:900; color:#1C1917; line-height:1.2;">All Previous Orders</div>
            <div style="font-size:0.7rem; color:#78716C;">${orders.length} craft orders • 100% direct artisan payout</div>
          </div>
        </div>

        <button type="button" id="btn-close-previous-orders" style="background:#ECE5DC; border:none; border-radius:50%; width:28px; height:28px; display:flex; align-items:center; justify-content:center; cursor:pointer; color:#1C1917; font-weight:700; font-size:0.9rem;">
          ✕
        </button>
      </div>

      <!-- Patron Direct Impact Overview Card -->
      <div style="background:linear-gradient(135deg, #1C3550 0%, #2A4D73 100%); color:#FFFFFF; border-radius:12px; padding:12px 14px; margin-bottom:12px;">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div>
            <div style="font-size:0.62rem; font-weight:800; opacity:0.85; text-transform:uppercase; letter-spacing:0.04em;">CUMULATIVE DIRECT PATRONAGE</div>
            <div style="font-size:1.15rem; font-weight:900; margin-top:2px;">₹${totalSpent.toLocaleString('en-IN')}</div>
          </div>
          <div style="text-align:right;">
            <span style="background:rgba(255,255,255,0.2); padding:3px 8px; border-radius:9999px; font-size:0.62rem; font-weight:800;">
              Zero Platform Fee
            </span>
            <div style="font-size:0.62rem; opacity:0.85; margin-top:2px;">Direct Benefit Transfer (DBT)</div>
          </div>
        </div>
      </div>

      <!-- Filter Tabs -->
      <div style="display:flex; gap:6px; margin-bottom:14px; overflow-x:auto; padding-bottom:2px;" id="order-filter-tabs">
        <button type="button" class="filter-tab active" data-filter="all" style="background:#7A2813; color:#FFFFFF; border:none; border-radius:9999px; padding:6px 14px; font-size:0.72rem; font-weight:800; cursor:pointer; white-space:nowrap;">
          All Orders (${orders.length})
        </button>
        <button type="button" class="filter-tab" data-filter="in_transit" style="background:#FFFFFF; color:#57534E; border:1px solid #E5DCD3; border-radius:9999px; padding:6px 14px; font-size:0.72rem; font-weight:800; cursor:pointer; white-space:nowrap;">
          In-Transit (${inTransitCount})
        </button>
        <button type="button" class="filter-tab" data-filter="delivered" style="background:#FFFFFF; color:#57534E; border:1px solid #E5DCD3; border-radius:9999px; padding:6px 14px; font-size:0.72rem; font-weight:800; cursor:pointer; white-space:nowrap;">
          Delivered (${deliveredCount})
        </button>
      </div>

      <!-- Orders List Container -->
      <div id="orders-list-container" style="max-height:55vh; overflow-y:auto; padding-right:2px;"></div>

      <!-- Bottom Close Button -->
      <button type="button" id="btn-done-previous-orders" class="btn-secondary" style="width:100%; margin-top:14px; padding:12px; font-size:0.82rem; font-weight:800;">
        Back to Profile
      </button>

    </div>
  `;

  document.body.appendChild(modal);
  renderList(filter);

  // Close handlers
  const close = () => {
    modal.classList.remove('active');
    setTimeout(() => modal.remove(), 250);
  };

  modal.querySelector('#btn-close-previous-orders')?.addEventListener('click', close);
  modal.querySelector('#btn-done-previous-orders')?.addEventListener('click', close);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) close();
  });

  // Filter handlers
  const tabs = modal.querySelectorAll('.filter-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.style.background = '#FFFFFF';
        t.style.color = '#57534E';
        t.style.border = '1px solid #E5DCD3';
      });
      tab.style.background = '#7A2813';
      tab.style.color = '#FFFFFF';
      tab.style.border = 'none';
      renderList(tab.dataset.filter);
    });
  });
}

if (typeof window !== 'undefined') {
  window.openPreviousOrdersModal = openPreviousOrdersModal;
}

export function openEditBuyerModal(container, initialFocus = 'profile') {
  const existing = document.getElementById('modal-edit-buyer');
  if (existing) existing.remove();

  const p = State.buyer.profile;
  const defaultAddr = p.savedAddresses?.[0] || { line: '', city: p.city || '', state: p.state || '', pincode: p.pincode || '' };

  const modal = document.createElement('div');
  modal.id = 'modal-edit-buyer';
  modal.className = 'modal-overlay active';

  modal.innerHTML = `
    <div class="bottom-sheet animate-slide-up" style="max-height:92vh; width:100%; max-width:480px; overflow-y:auto; background:#FAF7F2; border-radius:22px 22px 0 0; padding:16px 18px 28px; box-sizing:border-box;">

      <!-- Drag Handle -->
      <div style="width:36px; height:4px; background:#D6C7B2; border-radius:2px; margin:0 auto 12px;"></div>

      <!-- Sheet Header -->
      <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:14px;">
        <div style="display:flex; align-items:center; gap:10px;">
          <div style="width:36px; height:36px; border-radius:10px; background:#EBF2FA; color:#1C3550; display:flex; align-items:center; justify-content:center; font-size:1.15rem; flex-shrink:0;">
            ✏️
          </div>
          <div>
            <div style="font-size:1.05rem; font-weight:900; color:#1C1917; line-height:1.2;">Edit Patron Profile</div>
            <div style="font-size:0.7rem; color:#78716C;">Personal contact and default doorstep delivery address</div>
          </div>
        </div>

        <button type="button" id="btn-close-edit-buyer" style="background:#ECE5DC; border:none; border-radius:50%; width:28px; height:28px; display:flex; align-items:center; justify-content:center; cursor:pointer; color:#1C1917; font-weight:700; font-size:0.9rem;">
          ✕
        </button>
      </div>

      <!-- Form -->
      <form id="form-edit-buyer" style="display:flex; flex-direction:column; gap:12px;">

        <!-- Section: Patron Personal Info -->
        <div style="background:#FFFFFF; border:1px solid #EADBCE; border-radius:14px; padding:14px;">
          <div style="font-size:0.78rem; font-weight:900; color:#1C3550; text-transform:uppercase; letter-spacing:0.04em; margin-bottom:10px; display:flex; align-items:center; gap:6px;">
            <span>👩</span>
            <span>Patron Personal Details</span>
          </div>

          <div style="display:flex; flex-direction:column; gap:10px;">
            <div>
              <label style="font-size:0.7rem; font-weight:800; color:#57534E; display:block; margin-bottom:4px;">Full Name *</label>
              <input type="text" id="edit-buyer-name" required value="${p.name || ''}" placeholder="e.g. Dr. Aditi Varma" style="width:100%; border:1px solid #D8CFC4; border-radius:8px; padding:8px 10px; font-size:0.82rem; font-weight:700; color:#1C1917; background:#FFFDFB; outline:none; box-sizing:border-box;">
            </div>

            <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
              <div>
                <label style="font-size:0.7rem; font-weight:800; color:#57534E; display:block; margin-bottom:4px;">Mobile Phone *</label>
                <input type="tel" id="edit-buyer-phone" required value="${p.phone || ''}" placeholder="e.g. +91 98450 21980" style="width:100%; border:1px solid #D8CFC4; border-radius:8px; padding:8px 10px; font-size:0.82rem; font-weight:700; color:#1C1917; background:#FFFDFB; outline:none; box-sizing:border-box;">
              </div>
              <div>
                <label style="font-size:0.7rem; font-weight:800; color:#57534E; display:block; margin-bottom:4px;">Email (Optional)</label>
                <input type="email" id="edit-buyer-email" value="${p.email || 'aditi.varma@crafts.in'}" placeholder="e.g. aditi@domain.in" style="width:100%; border:1px solid #D8CFC4; border-radius:8px; padding:8px 10px; font-size:0.82rem; font-weight:700; color:#1C1917; background:#FFFDFB; outline:none; box-sizing:border-box;">
              </div>
            </div>
          </div>
        </div>

        <!-- Section: Shipping Address -->
        <div style="background:#FFFFFF; border:1px solid #EADBCE; border-radius:14px; padding:14px;">
          <div style="font-size:0.78rem; font-weight:900; color:#7A2813; text-transform:uppercase; letter-spacing:0.04em; margin-bottom:10px; display:flex; align-items:center; gap:6px;">
            <span>🏡</span>
            <span>Default Shipping Address</span>
          </div>

          <div style="display:flex; flex-direction:column; gap:10px;">
            <div>
              <label style="font-size:0.7rem; font-weight:800; color:#57534E; display:block; margin-bottom:4px;">Street Address / Flat / Floor *</label>
              <textarea id="edit-buyer-address-line" rows="2" required placeholder="Flat, House no., Building, Street" style="width:100%; border:1px solid #D8CFC4; border-radius:8px; padding:8px 10px; font-size:0.82rem; font-weight:700; color:#1C1917; background:#FFFDFB; outline:none; box-sizing:border-box; resize:vertical;">${defaultAddr.line || ''}</textarea>
            </div>

            <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
              <div>
                <label style="font-size:0.7rem; font-weight:800; color:#57534E; display:block; margin-bottom:4px;">City *</label>
                <input type="text" id="edit-buyer-city" required value="${defaultAddr.city || p.city || ''}" placeholder="e.g. Bengaluru" style="width:100%; border:1px solid #D8CFC4; border-radius:8px; padding:8px 10px; font-size:0.82rem; font-weight:700; color:#1C1917; background:#FFFDFB; outline:none; box-sizing:border-box;">
              </div>
              <div>
                <label style="font-size:0.7rem; font-weight:800; color:#57534E; display:block; margin-bottom:4px;">State *</label>
                <input type="text" id="edit-buyer-state" required value="${defaultAddr.state || p.state || ''}" placeholder="e.g. Karnataka" style="width:100%; border:1px solid #D8CFC4; border-radius:8px; padding:8px 10px; font-size:0.82rem; font-weight:700; color:#1C1917; background:#FFFDFB; outline:none; box-sizing:border-box;">
              </div>
            </div>

            <div>
              <label style="font-size:0.7rem; font-weight:800; color:#57534E; display:block; margin-bottom:4px;">PIN Code *</label>
              <input type="text" id="edit-buyer-pincode" maxlength="6" required value="${defaultAddr.pincode || p.pincode || ''}" placeholder="6-digit PIN code" style="width:100%; border:1px solid #D8CFC4; border-radius:8px; padding:8px 10px; font-size:0.82rem; font-weight:700; color:#1C1917; background:#FFFDFB; outline:none; box-sizing:border-box;">
            </div>
          </div>
        </div>

        <!-- Submit & Cancel Actions -->
        <div style="display:flex; gap:10px; margin-top:8px;">
          <button type="button" id="btn-cancel-edit-buyer" class="btn-secondary" style="flex:1; padding:11px; font-size:0.82rem; font-weight:800;">
            Cancel
          </button>
          <button type="submit" class="btn-primary" style="flex:2; background:#1C3550; padding:11px; font-size:0.82rem; font-weight:800; display:flex; align-items:center; justify-content:center; gap:6px;">
            <span>💾 Save Profile &amp; Address</span>
          </button>
        </div>

      </form>
    </div>
  `;

  document.body.appendChild(modal);

  const close = () => {
    modal.classList.remove('active');
    setTimeout(() => modal.remove(), 250);
  };

  modal.querySelector('#btn-close-edit-buyer')?.addEventListener('click', close);
  modal.querySelector('#btn-cancel-edit-buyer')?.addEventListener('click', close);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) close();
  });

  if (initialFocus === 'address') {
    modal.querySelector('#edit-buyer-address-line')?.focus();
  } else {
    modal.querySelector('#edit-buyer-name')?.focus();
  }

  // Handle save
  modal.querySelector('#form-edit-buyer')?.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = modal.querySelector('#edit-buyer-name')?.value.trim();
    const phone = modal.querySelector('#edit-buyer-phone')?.value.trim();
    const email = modal.querySelector('#edit-buyer-email')?.value.trim();
    const addressLine = modal.querySelector('#edit-buyer-address-line')?.value.trim();
    const city = modal.querySelector('#edit-buyer-city')?.value.trim();
    const state = modal.querySelector('#edit-buyer-state')?.value.trim();
    const pincode = modal.querySelector('#edit-buyer-pincode')?.value.trim();

    State.updateBuyerProfile({
      name,
      phone,
      email,
      addressLine,
      city,
      state,
      pincode
    });

    window.showToast?.("✓ Patron profile & shipping address updated!");
    close();
    renderBuyerProfileScreen(container);
  });
}

export function renderBuyerProfileScreen(container) {
  const p = State.buyer.profile;
  const orders = State.buyer.myOrders || [];
  const inTransitOrder = orders.find(o => o.isInTransit || (o.status && o.status.toLowerCase().includes('transit')) || (o.status && o.status.toLowerCase().includes('pickup'))) || orders[0];
  const inTransitCount = orders.filter(o => o.isInTransit || (o.status && o.status.toLowerCase().includes('transit')) || (o.status && o.status.toLowerCase().includes('pickup'))).length;
  const defaultAddr = p.savedAddresses?.[0] || { line: '#42, 4th Cross, Indiranagar', city: p.city || 'Bengaluru', state: p.state || 'Karnataka', pincode: p.pincode || '560038' };

  container.innerHTML = `
    <div class="buyer-profile-screen animate-fade-in" style="padding-bottom: 30px;">

      <!-- Top Title -->
      <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:14px;">
        <div>
          <h1 style="font-size:1.25rem; font-weight:900; color:var(--text-primary); margin:0 0 4px 0;">
            Patron Profile &amp; Settings
          </h1>
          <p style="font-size:0.75rem; color:var(--text-secondary); margin:0;">
            Manage patron profile details and delivery address.
          </p>
        </div>
        <button type="button" id="btn-edit-buyer-main" style="background:#EBF2FA; color:#1C3550; border:1.5px solid #C4D7ED; border-radius:8px; padding:6px 12px; font-size:0.75rem; font-weight:800; cursor:pointer; display:inline-flex; align-items:center; gap:5px; box-shadow:0 1px 3px rgba(28,53,80,0.1);">
          <span>✏️</span>
          <span>Edit Details</span>
        </button>
      </div>

      <!-- Buyer Card -->
      <div style="background:linear-gradient(135deg, #1C3550 0%, #2A4D73 100%); color:#FFFFFF; border-radius:var(--radius-xl); padding:16px; margin-bottom:16px; box-shadow:var(--shadow-md);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
          <span style="font-size:0.68rem; font-weight:800; letter-spacing:0.1em; opacity:0.9;">
            VERIFIED CRAFT PATRON
          </span>
          <div style="display:flex; align-items:center; gap:6px;">
            <span style="background:rgba(255,255,255,0.2); padding:2px 8px; border-radius:var(--radius-pill); font-size:0.62rem; font-weight:800;">
              ${orders.length} Crafts Collected
            </span>
            <button type="button" id="btn-edit-patron-badge" style="background:rgba(255,255,255,0.22); color:#FFFFFF; border:1px solid rgba(255,255,255,0.4); border-radius:6px; padding:2px 8px; font-size:0.62rem; font-weight:800; cursor:pointer; display:inline-flex; align-items:center; gap:3px;">
              <span>✏️</span>
              <span>Edit</span>
            </button>
          </div>
        </div>

        <div style="display:flex; gap:12px; align-items:center;">
          <div style="width:52px; height:52px; border-radius:50%; background:rgba(255,255,255,0.2); display:flex; align-items:center; justify-content:center; font-size:1.6rem; border:2px solid #FFFFFF;">
            👩
          </div>
          <div>
            <div style="font-size:1.15rem; font-weight:900;">${p.name}</div>
            <div style="font-size:0.75rem; opacity:0.9;">${p.phone}</div>
            <div style="font-size:0.72rem; opacity:0.85;">${p.city || defaultAddr.city}, ${p.state || defaultAddr.state} - ${p.pincode || defaultAddr.pincode}</div>
          </div>
        </div>
      </div>

      <!-- My Orders Option & Tracking -->
      <div id="card-my-orders" style="background:#FFFFFF; border:1.5px solid #EADBCE; border-radius:var(--radius-lg); padding:14px; margin-bottom:14px; box-shadow:var(--shadow-sm); cursor:pointer;">

        <!-- Header row with 'View >' action -->
        <div id="header-my-orders" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; cursor:pointer;" title="View all previous orders">
          <div style="display:flex; align-items:center; gap:10px;">
            <div style="width:38px; height:38px; border-radius:10px; background:#FEECE5; color:#7A2813; display:flex; align-items:center; justify-content:center; font-size:1.2rem; flex-shrink:0;">
              📦
            </div>
            <div>
              <div style="display:flex; align-items:center; gap:6px;">
                <span style="font-size:0.92rem; font-weight:900; color:var(--text-primary);">My Orders</span>
                <span style="background:#E7F7ED; color:#15803D; font-size:0.62rem; font-weight:800; padding:2px 8px; border-radius:var(--radius-pill); border:1px solid #BBF7D0; display:inline-flex; align-items:center; gap:4px;">
                  <span style="width:6px; height:6px; border-radius:50%; background:#15803D; display:inline-block;"></span>
                  ${inTransitCount} In-Transit
                </span>
              </div>
              <div style="font-size:0.72rem; color:var(--text-secondary); margin-top:2px;">
                Track live loom-to-doorstep journey &amp; past crafts
              </div>
            </div>
          </div>

          <button type="button" id="btn-view-all-orders" style="background:none; border:none; display:flex; align-items:center; gap:4px; color:#7A2813; font-weight:800; font-size:0.82rem; cursor:pointer; padding:4px 8px; border-radius:6px;" title="View all previous orders">
            <span>View</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>

        <!-- Active In-Transit Snippet -->
        ${inTransitOrder ? `
          <div id="snippet-in-transit-order" style="background:#FAF7F2; border:1px solid #ECE7E1; border-radius:10px; padding:10px 12px; display:flex; align-items:center; justify-content:space-between; gap:10px; cursor:pointer;" title="Track order #${inTransitOrder.orderId}">
            <div style="display:flex; align-items:center; gap:10px; overflow:hidden;">
              <img src="${inTransitOrder.image}" alt="${inTransitOrder.craftTitle}" style="width:40px; height:40px; border-radius:6px; object-fit:cover; border:1px solid #E5DCD3; flex-shrink:0;" onerror="this.src='/assets/terracotta_pitcher.jpg'">
              <div style="overflow:hidden;">
                <div style="font-size:0.78rem; font-weight:800; color:#1C1917; line-height:1.25; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                  ${inTransitOrder.craftTitle}
                </div>
                <div style="font-size:0.68rem; color:#78716C; margin-top:2px; display:flex; align-items:center; gap:4px;">
                  <span style="color:#C2410C; font-weight:700;">#${inTransitOrder.orderId}</span>
                  <span>•</span>
                  <span style="color:#15803D; font-weight:700;">${inTransitOrder.estimatedDelivery ? `Arrival ${inTransitOrder.estimatedDelivery}` : 'In Transit'}</span>
                </div>
              </div>
            </div>
            <button type="button" id="btn-track-active-order" style="background:#7A2813; color:#FFFFFF; border:none; border-radius:6px; padding:6px 12px; font-size:0.72rem; font-weight:800; white-space:nowrap; cursor:pointer; display:flex; align-items:center; gap:4px;">
              <span>Track</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>
        ` : ''}

        <!-- Quick pill hint to see previous orders -->
        <div style="margin-top:8px; text-align:center;">
          <span style="font-size:0.68rem; color:#7A2813; font-weight:700; display:inline-flex; align-items:center; gap:4px; cursor:pointer;" id="link-show-past-orders">
            <span>📜 Tap 'View' to see all ${orders.length} past craft orders &amp; GI receipts</span>
          </span>
        </div>

      </div>

      <!-- Saved Delivery Address -->
      <div style="background:#FFFFFF; border:1px solid var(--border-subtle); border-radius:var(--radius-lg); padding:14px; margin-bottom:14px; box-shadow:var(--shadow-sm);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <span style="font-size:0.82rem; font-weight:800; color:var(--text-primary);">Default Shipping Address</span>
          <div style="display:flex; align-items:center; gap:6px;">
            <span style="font-size:0.65rem; font-weight:800; color:#1E6B47; background:#E7F4ED; padding:2px 6px; border-radius:var(--radius-pill);">Delivery Agent Verified</span>
            <button type="button" id="btn-edit-shipping-address" style="background:#FFF3EB; color:#7A2813; border:1px solid #FCD7C2; border-radius:6px; padding:3px 8px; font-size:0.68rem; font-weight:800; cursor:pointer; display:inline-flex; align-items:center; gap:4px;">
              <span>✏️</span>
              <span>Edit</span>
            </button>
          </div>
        </div>
        <div style="font-size:0.76rem; color:var(--text-secondary); line-height:1.4;">
          ${defaultAddr.line}<br>
          ${defaultAddr.city}, ${defaultAddr.state} - ${defaultAddr.pincode}
        </div>
      </div>

      <!-- Impact & Protection Summary -->
      <div style="background:#FFFFFF; border:1px solid var(--border-subtle); border-radius:var(--radius-lg); padding:14px; margin-bottom:20px; box-shadow:var(--shadow-sm);">
        <div style="font-size:0.82rem; font-weight:800; color:var(--text-primary); margin-bottom:6px;">
          Patronage Impact
        </div>
        <div style="font-size:0.74rem; color:var(--text-secondary); line-height:1.4;">
          100% of your product payments have been transferred directly to verified cluster artisans via RBI Direct Benefit Transfer (DBT) with zero intermediary platform fees.
        </div>
      </div>

      <!-- DELIBERATE LOGOUT & SWITCH ACCOUNT BUTTON -->
      <div style="background:#FFF9F5; border:1.5px dashed #EADBCE; border-radius:var(--radius-lg); padding:16px; text-align:center;">
        <div style="font-size:0.85rem; font-weight:800; color:var(--text-primary); margin-bottom:4px;">
          Switch Account or Sign Out
        </div>
        <p style="font-size:0.72rem; color:var(--text-secondary); margin:0 0 12px 0;">
          To access the Artisan Studio portal or Institutional Corporate B2B procurement, please log out of this patron session first.
        </p>

        <button type="button" id="btn-buyer-logout" style="width:100%; background:#1C3550; color:#FFFFFF; border:none; padding:12px; font-size:0.85rem; font-weight:800; border-radius:var(--radius-md); cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
          <span>Log Out &amp; Switch Account</span>
        </button>
      </div>

    </div>
  `;

  // Attach edit handlers
  container.querySelector('#btn-edit-buyer-main')?.addEventListener('click', () => {
    openEditBuyerModal(container, 'profile');
  });
  container.querySelector('#btn-edit-patron-badge')?.addEventListener('click', () => {
    openEditBuyerModal(container, 'profile');
  });
  container.querySelector('#btn-edit-shipping-address')?.addEventListener('click', () => {
    openEditBuyerModal(container, 'address');
  });

  // Attach event handlers
  const viewBtn = container.querySelector('#btn-view-all-orders');
  const headerOrders = container.querySelector('#header-my-orders');
  const pastOrdersLink = container.querySelector('#link-show-past-orders');

  viewBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    openPreviousOrdersModal('all');
  });

  headerOrders?.addEventListener('click', () => {
    openPreviousOrdersModal('all');
  });

  pastOrdersLink?.addEventListener('click', (e) => {
    e.stopPropagation();
    openPreviousOrdersModal('all');
  });

  const trackBtn = container.querySelector('#btn-track-active-order');
  trackBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    window.navigateToScreen('buyer_orders');
  });

  const inTransitSnippet = container.querySelector('#snippet-in-transit-order');
  inTransitSnippet?.addEventListener('click', () => {
    window.navigateToScreen('buyer_orders');
  });

  // Attach logout handler
  container.querySelector('#btn-buyer-logout')?.addEventListener('click', () => {
    if (confirm("Log out of Patron account? You will return to the role selection screen.")) {
      window.showToast?.("Patron session ended. Please select an account type.");
      State.logout();
    }
  });
}
