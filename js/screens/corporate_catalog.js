/**
 * Corporate Screen: Wholesale Catalog with Tiered Volume Pricing
 * (Role: CORPORATE only - wholesale pricing matrices for institutional bulk procurement)
 */

import { State } from '../state.js';

export function renderCorporateCatalogScreen(container) {
  const catalog = State.corporate.catalog;

  container.innerHTML = `
    <div class="corporate-catalog-screen animate-fade-in" style="padding-bottom: 30px;">
      
      <!-- Top Title -->
      <div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:4px;">
        <h1 style="font-size:1.25rem; font-weight:900; color:var(--text-primary); margin:0;">
          Wholesale Craft Catalog
        </h1>
        <span style="font-size:0.75rem; font-weight:800; color:#0F172A;">Tiered B2B Pricing</span>
      </div>
      <p style="font-size:0.75rem; color:var(--text-secondary); margin:0 0 14px 0; line-height:1.35;">
        Standardized cluster craft pieces available for high-volume corporate gifting, hospitality, and retail supply with tax credits.
      </p>

      <!-- Category Filter Tabs -->
      <div style="display:flex; gap:6px; overflow-x:auto; padding-bottom:8px; margin-bottom:12px; scrollbar-width:none;">
        <button type="button" class="btn-primary" style="padding:5px 12px; font-size:0.72rem; border-radius:var(--radius-pill); white-space:nowrap; background:#0F172A;">
          All Clusters
        </button>
        <button type="button" class="btn-secondary" style="padding:5px 12px; font-size:0.72rem; border-radius:var(--radius-pill); white-space:nowrap;">
          🏺 Terracotta
        </button>
        <button type="button" class="btn-secondary" style="padding:5px 12px; font-size:0.72rem; border-radius:var(--radius-pill); white-space:nowrap;">
          🔱 Metal & Brass
        </button>
        <button type="button" class="btn-secondary" style="padding:5px 12px; font-size:0.72rem; border-radius:var(--radius-pill); white-space:nowrap;">
          🎨 Ceramics & Blue Pottery
        </button>
      </div>

      <!-- Catalog Cards with Tier Matrices -->
      <div style="display:flex; flex-direction:column; gap:16px;">
        ${catalog.map(item => `
          <div style="background:#FFFFFF; border:1px solid var(--border-subtle); border-radius:var(--radius-xl); overflow:hidden; box-shadow:var(--shadow-sm);">
            
            <div style="display:flex; gap:12px; padding:12px 14px 8px 14px;">
              <img src="${item.image}" alt="${item.title}" style="width:84px; height:84px; border-radius:var(--radius-md); object-fit:cover; border:1px solid var(--border-subtle); flex-shrink:0;">
              <div style="flex:1;">
                <div style="font-size:0.65rem; font-weight:800; color:#0F172A; text-transform:uppercase; margin-bottom:2px;">
                  ${item.cluster}
                </div>
                <div style="font-size:0.9rem; font-weight:800; color:var(--text-primary); line-height:1.3; margin-bottom:4px;">
                  ${item.title}
                </div>
                <div style="font-size:0.72rem; color:var(--text-secondary);">
                  MOQ: <strong>${item.moq} pcs</strong> • Lead Time: <strong>${item.leadTime}</strong>
                </div>
                <div style="font-size:0.72rem; color:#0F172A; font-weight:700; margin-top:2px;">
                  Single Unit Sample: ₹${item.samplePrice}
                </div>
              </div>
            </div>

            <!-- Volume Tier Table -->
            <div style="padding:0 14px 12px 14px;">
              <div style="font-size:0.68rem; font-weight:800; color:var(--text-muted); text-transform:uppercase; margin-bottom:6px;">
                Volume Discount Tiers (Per Piece)
              </div>
              <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:6px; margin-bottom:12px;">
                ${item.tiers.map(t => `
                  <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:var(--radius-md); padding:8px 6px; text-align:center;">
                    <div style="font-size:0.68rem; font-weight:700; color:var(--text-secondary);">${t.min}+ Pcs</div>
                    <div style="font-size:0.92rem; font-weight:900; color:#0F172A;">₹${t.price}</div>
                    <div style="font-size:0.62rem; font-weight:800; color:#1E6B47;">${t.discount}</div>
                  </div>
                `).join('')}
              </div>

              <!-- Action Buttons -->
              <div style="display:flex; gap:8px;">
                <button type="button" class="btn-secondary" style="flex:1; padding:8px; font-size:0.74rem; font-weight:700;" onclick="window.requestSample('${item.id}', '${item.title}')">
                  📦 Request Sample
                </button>
                <button type="button" class="btn-primary" style="flex:1.4; padding:8px; font-size:0.74rem; font-weight:800; background:#0F172A;" onclick="window.orderWholesale('${item.id}', '${item.title}', ${item.tiers[1].min}, ${item.tiers[1].price})">
                  📋 Generate Proforma (₹${item.tiers[1].price})
                </button>
              </div>
            </div>

          </div>
        `).join('')}
      </div>

    </div>
  `;
}

if (typeof window !== 'undefined') {
  window.requestSample = function(id, title) {
    window.showToast?.(`📦 Sample order initiated for "${title}". Dispatched with test certificate.`);
  };

  window.orderWholesale = function(id, title, qty, price) {
    window.navigateToScreen('corporate_rfq');
  };
}
