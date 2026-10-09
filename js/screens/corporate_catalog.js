/**
 * Corporate Screen: Wholesale Catalog with Tiered Volume Pricing & Live Search
 * (Role: CORPORATE only - wholesale pricing matrices for institutional bulk procurement)
 */

import { State } from '../state.js';

let activeCategory = 'all';
let catalogSearchQuery = '';

export function renderCorporateCatalogScreen(container) {
  const allItems = State.corporate.catalog || [];

  function filterItems() {
    return allItems.filter(item => {
      const matchesCategory = (activeCategory === 'all') || (item.category === activeCategory);
      if (!matchesCategory) return false;

      if (!catalogSearchQuery.trim()) return true;

      const q = catalogSearchQuery.toLowerCase().trim();
      const matchTitle = item.title && item.title.toLowerCase().includes(q);
      const matchCluster = item.cluster && item.cluster.toLowerCase().includes(q);
      const matchMaterial = item.material && item.material.toLowerCase().includes(q);
      const matchGi = item.giTagNumber && item.giTagNumber.toLowerCase().includes(q);
      const matchMoq = String(item.moq || '').includes(q);

      return matchTitle || matchCluster || matchMaterial || matchGi || matchMoq;
    });
  }

  function renderView() {
    const filtered = filterItems();

    const categories = [
      { id: 'all', label: 'All Wholesale' },
      { id: 'terracotta', label: '🏺 Terracotta' },
      { id: 'brass', label: '🔱 Metal & Brass' },
      { id: 'ceramics', label: '🎨 Ceramics' },
      { id: 'woodcraft', label: '🪵 Woodcraft' },
      { id: 'handloom', label: '🧵 Handloom Silk' },
      { id: 'blackclay', label: '🖤 Black Clay' }
    ];

    container.innerHTML = `
      <div class="corporate-catalog-screen animate-fade-in" style="padding-bottom: 36px;">

        <!-- Top Title & Badge -->
        <div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:4px;">
          <h1 style="font-size:1.25rem; font-weight:900; color:var(--text-primary); margin:0;">
            Wholesale Craft Catalog
          </h1>
          <span style="font-size:0.75rem; font-weight:800; color:#0F172A; background:#E2E8F0; padding:2px 8px; border-radius:var(--radius-pill);">
            B2B Tiered Volume
          </span>
        </div>
        <p style="font-size:0.75rem; color:var(--text-secondary); margin:0 0 12px 0; line-height:1.35;">
          Standardized cluster craft pieces available for high-volume corporate gifting, hospitality, and retail supply with tax credits.
        </p>

        <!-- B2B Live Search Bar -->
        <div style="position:relative; margin-bottom:12px;">
          <span style="position:absolute; left:14px; top:50%; transform:translateY(-50%); display:flex; align-items:center; pointer-events:none;">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </span>
          <input
            type="text"
            id="b2b-catalog-search-input"
            placeholder="Search wholesale crafts, GI clusters, materials, MOQs..."
            value="${catalogSearchQuery}"
            style="width:100%; padding:11px 38px 11px 38px; border-radius:var(--radius-pill); border:1.5px solid #CBD5E1; background:#FFFFFF; font-size:0.84rem; font-weight:600; color:#0F172A; box-shadow:0 1px 3px rgba(0,0,0,0.04); outline:none; box-sizing:border-box; transition:border-color 0.2s;"
          >
          ${catalogSearchQuery ? `
            <button
              type="button"
              id="b2b-catalog-clear-search"
              style="position:absolute; right:12px; top:50%; transform:translateY(-50%); background:#E2E8F0; border:none; border-radius:50%; width:20px; height:20px; display:flex; align-items:center; justify-content:center; color:#475569; font-size:0.65rem; font-weight:900; cursor:pointer;"
              title="Clear search"
            >
              ✕
            </button>
          ` : ''}
        </div>

        <!-- Category Filter Tabs -->
        <div style="display:flex; gap:6px; overflow-x:auto; padding-bottom:8px; margin-bottom:10px; scrollbar-width:none;">
          ${categories.map(cat => {
            const isSelected = activeCategory === cat.id;
            return `
              <button
                type="button"
                class="b2b-cat-btn"
                data-category="${cat.id}"
                style="padding:6px 12px; font-size:0.72rem; font-weight:700; border-radius:var(--radius-pill); white-space:nowrap; cursor:pointer; border:1px solid ${isSelected ? '#0F172A' : '#CBD5E1'}; background:${isSelected ? '#0F172A' : '#FFFFFF'}; color:${isSelected ? '#FFFFFF' : '#475569'}; transition:all 0.15s ease;"
              >
                ${cat.label}
              </button>
            `;
          }).join('')}
        </div>

        <!-- Results Counter & Status -->
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; font-size:0.72rem; color:var(--text-secondary);">
          <span>Showing <strong>${filtered.length}</strong> wholesale verified craft pieces</span>
          ${(catalogSearchQuery || activeCategory !== 'all') ? `
            <button type="button" id="b2b-reset-filters-btn" style="background:none; border:none; color:#0F172A; font-weight:800; cursor:pointer; text-decoration:underline; font-size:0.7rem; padding:0;">
              Reset filters
            </button>
          ` : ''}
        </div>

        <!-- Catalog Cards List -->
        ${filtered.length === 0 ? `
          <div style="background:#FFFFFF; border:1px dashed #CBD5E1; border-radius:var(--radius-xl); padding:32px 16px; text-align:center; color:#64748B;">
            <div style="font-size:2rem; margin-bottom:8px;">📦</div>
            <div style="font-size:0.9rem; font-weight:800; color:#0F172A; margin-bottom:4px;">No wholesale items found</div>
            <div style="font-size:0.74rem; line-height:1.4; margin-bottom:14px;">
              No pieces matched "${catalogSearchQuery}" in ${activeCategory === 'all' ? 'the catalog' : activeCategory}. Try a different search term or view all items.
            </div>
            <button type="button" id="b2b-empty-reset-btn" class="btn-primary" style="padding:8px 16px; font-size:0.76rem; background:#0F172A;">
              View All Wholesale Pieces
            </button>
          </div>
        ` : `
          <div style="display:flex; flex-direction:column; gap:16px;">
            ${filtered.map(item => `
              <div style="background:#FFFFFF; border:1px solid var(--border-subtle); border-radius:var(--radius-xl); overflow:hidden; box-shadow:var(--shadow-sm);">

                <div style="display:flex; gap:12px; padding:12px 14px 8px 14px;">
                  <img src="${item.image}" alt="${item.title}" style="width:84px; height:84px; border-radius:var(--radius-md); object-fit:cover; border:1px solid var(--border-subtle); flex-shrink:0;">
                  <div style="flex:1;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:2px;">
                      <div style="font-size:0.65rem; font-weight:800; color:#0F172A; text-transform:uppercase;">
                        ${item.cluster}
                      </div>
                      ${item.giTagNumber ? `
                        <span style="font-size:0.6rem; font-weight:800; background:#E2E8F0; color:#0F172A; padding:1px 6px; border-radius:var(--radius-pill);">
                          ${item.giTagNumber}
                        </span>
                      ` : ''}
                    </div>
                    <div style="font-size:0.9rem; font-weight:800; color:var(--text-primary); line-height:1.3; margin-bottom:4px;">
                      ${item.title}
                    </div>
                    ${item.material ? `
                      <div style="font-size:0.68rem; color:#64748B; margin-bottom:2px;">
                        Material: <strong>${item.material}</strong>
                      </div>
                    ` : ''}
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
                    <button type="button" class="btn-secondary" style="flex:1; padding:8px; font-size:0.74rem; font-weight:700;" onclick="window.requestSample('${item.id}', '${item.title.replace(/'/g, "\\'")}')">
                      📦 Request Sample
                    </button>
                    <button type="button" class="btn-primary" style="flex:1.4; padding:8px; font-size:0.74rem; font-weight:800; background:#0F172A;" onclick="window.orderWholesale('${item.id}', '${item.title.replace(/'/g, "\\'")}', ${item.tiers[1].min}, ${item.tiers[1].price})">
                      📋 Generate Proforma (₹${item.tiers[1].price})
                    </button>
                  </div>
                </div>

              </div>
            `).join('')}
          </div>
        `}

      </div>
    `;

    // Attach Event Listeners
    const searchInput = container.querySelector('#b2b-catalog-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        catalogSearchQuery = e.target.value;
        renderView();
        // Keep focus and cursor position after re-render
        const reInput = container.querySelector('#b2b-catalog-search-input');
        if (reInput) {
          reInput.focus();
          reInput.setSelectionRange(catalogSearchQuery.length, catalogSearchQuery.length);
        }
      });
    }

    container.querySelector('#b2b-catalog-clear-search')?.addEventListener('click', () => {
      catalogSearchQuery = '';
      renderView();
    });

    container.querySelectorAll('.b2b-cat-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        activeCategory = btn.getAttribute('data-category') || 'all';
        renderView();
      });
    });

    container.querySelector('#b2b-reset-filters-btn')?.addEventListener('click', () => {
      catalogSearchQuery = '';
      activeCategory = 'all';
      renderView();
    });

    container.querySelector('#b2b-empty-reset-btn')?.addEventListener('click', () => {
      catalogSearchQuery = '';
      activeCategory = 'all';
      renderView();
    });
  }

  renderView();
}

if (typeof window !== 'undefined') {
  window.requestSample = function(id, title) {
    window.showToast?.(`📦 Sample order initiated for "${title}". Dispatched with test certificate.`);
  };

  window.orderWholesale = function(id, title, qty, price) {
    window.showToast?.(`📋 Proforma quote initiated for ${qty} units of "${title}" at ₹${price}/unit.`);
    window.navigateToScreen('corporate_rfq');
  };
}
