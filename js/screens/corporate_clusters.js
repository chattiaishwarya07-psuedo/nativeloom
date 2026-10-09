/**
 * Corporate Screen: Direct-from-Cluster Sourcing Directories with Live Search
 * (Role: CORPORATE only - bulk procurement from registered cooperatives)
 */

import { State } from '../state.js';
import { getArtisan } from '../data.js';

let clusterSearchQuery = '';

export function renderCorporateClustersScreen(container) {
  const allClusters = State.corporate.clusters || [];

  function filterClusters() {
    if (!clusterSearchQuery.trim()) return allClusters;
    const q = clusterSearchQuery.toLowerCase().trim();

    return allClusters.filter(c => {
      const matchName = c.name && c.name.toLowerCase().includes(q);
      const matchState = c.state && c.state.toLowerCase().includes(q);
      const matchSpecialty = c.specialty && c.specialty.toLowerCase().includes(q);
      const matchGi = (c.giTagNumber || c.giTag || '').toLowerCase().includes(q);
      const matchArtisan = (c.leadArtisan || '').toLowerCase().includes(q);

      return matchName || matchState || matchSpecialty || matchGi || matchArtisan;
    });
  }

  function renderView() {
    const filtered = filterClusters();

    container.innerHTML = `
      <div class="corporate-clusters-screen animate-fade-in" style="padding-bottom: 36px;">

        <!-- Top Title & Badge -->
        <div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:4px;">
          <h1 style="font-size:1.25rem; font-weight:900; color:var(--text-primary); margin:0;">
            Cluster Sourcing Directory
          </h1>
          <span style="font-size:0.75rem; font-weight:800; color:#0F172A; background:#E2E8F0; padding:2px 8px; border-radius:var(--radius-pill);">
            ${filtered.length} GI Clusters
          </span>
        </div>
        <p style="font-size:0.75rem; color:var(--text-secondary); margin:0 0 12px 0; line-height:1.35;">
          Direct institutional procurement from government-recognized artisan cooperatives with formal GST billing and escrow safety.
        </p>

        <!-- Live Search Bar -->
        <div style="position:relative; margin-bottom:14px;">
          <span style="position:absolute; left:14px; top:50%; transform:translateY(-50%); display:flex; align-items:center; pointer-events:none;">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </span>
          <input
            type="text"
            id="b2b-cluster-search-input"
            placeholder="Search GI clusters, states, craft specialties, artisans..."
            value="${clusterSearchQuery}"
            style="width:100%; padding:11px 38px 11px 38px; border-radius:var(--radius-pill); border:1.5px solid #CBD5E1; background:#FFFFFF; font-size:0.84rem; font-weight:600; color:#0F172A; box-shadow:0 1px 3px rgba(0,0,0,0.04); outline:none; box-sizing:border-box; transition:border-color 0.2s;"
          >
          ${clusterSearchQuery ? `
            <button
              type="button"
              id="b2b-cluster-clear-search"
              style="position:absolute; right:12px; top:50%; transform:translateY(-50%); background:#E2E8F0; border:none; border-radius:50%; width:20px; height:20px; display:flex; align-items:center; justify-content:center; color:#475569; font-size:0.65rem; font-weight:900; cursor:pointer;"
              title="Clear search"
            >
              ✕
            </button>
          ` : ''}
        </div>

        <!-- Clusters Grid -->
        ${filtered.length === 0 ? `
          <div style="background:#FFFFFF; border:1px dashed #CBD5E1; border-radius:var(--radius-xl); padding:32px 16px; text-align:center; color:#64748B;">
            <div style="font-size:2rem; margin-bottom:8px;">🏛️</div>
            <div style="font-size:0.9rem; font-weight:800; color:#0F172A; margin-bottom:4px;">No clusters found</div>
            <div style="font-size:0.74rem; line-height:1.4; margin-bottom:14px;">
              No GI cluster matched "${clusterSearchQuery}". Try searching by state or craft specialty.
            </div>
            <button type="button" id="b2b-cluster-empty-reset-btn" class="btn-primary" style="padding:8px 16px; font-size:0.76rem; background:#0F172A;">
              View All Clusters
            </button>
          </div>
        ` : `
          <div style="display:flex; flex-direction:column; gap:14px; margin-bottom:18px;">
            ${filtered.map(c => {
              const giBadge = c.giTagNumber || c.giTag || 'GI Certified';
              const artisanName = c.leadArtisan || (getArtisan(c.leadArtisanId)?.name) || 'Master Craftsman';
              const capacity = c.capacityPerMonth || c.capacity || '1,500 units / month';
              const wholesalePrice = c.wholesaleFromPrice || c.minTierPrice || 350;

              return `
              <div style="background:#FFFFFF; border:1px solid var(--border-subtle); border-radius:var(--radius-xl); overflow:hidden; box-shadow:var(--shadow-sm);">

                <div style="position:relative; height:120px;">
                  <img src="${c.image}" alt="${c.name}" style="width:100%; height:100%; object-fit:cover;">
                  <div style="position:absolute; inset:0; background:linear-gradient(180deg, transparent 40%, rgba(15, 23, 42, 0.8) 100%);"></div>
                  <span style="position:absolute; top:8px; left:8px; background:#0F172A; color:#FFFFFF; font-size:0.62rem; font-weight:800; padding:3px 8px; border-radius:var(--radius-pill);">
                    ${giBadge} • ${c.state}
                  </span>
                  <div style="position:absolute; bottom:8px; left:10px; color:#FFFFFF;">
                    <div style="font-size:0.95rem; font-weight:800;">${c.name}</div>
                  </div>
                </div>

                <div style="padding:12px 14px;">
                  <div style="font-size:0.74rem; color:var(--text-secondary); line-height:1.4; margin-bottom:10px;">
                    ${c.specialty}
                  </div>

                  <div style="display:grid; grid-template-columns:1fr 1fr; gap:6px; background:#FAF7F2; border-radius:var(--radius-md); padding:8px 10px; font-size:0.7rem; margin-bottom:12px;">
                    <div>Lead Artisan: <strong>${artisanName}</strong></div>
                    <div>Capacity: <strong>${capacity}</strong></div>
                    <div>Wholesale Tier: <strong>From ₹${wholesalePrice}/unit</strong></div>
                    <div>Billing: <strong>100% GST Credit</strong></div>
                  </div>

                  <div style="display:flex; gap:8px;">
                    <button type="button" class="btn-secondary" style="flex:1; padding:8px; font-size:0.74rem; font-weight:700;" onclick="window.navigateToScreen('corporate_catalog')">
                      📦 View Catalog
                    </button>
                    <button type="button" class="btn-primary" style="flex:1.2; padding:8px; font-size:0.74rem; font-weight:800; background:#0F172A;" onclick="window.navigateToScreen('corporate_rfq')">
                      📝 Post RFP / Quote
                    </button>
                  </div>
                </div>

              </div>
            `;
            }).join('')}
          </div>
        `}

      </div>
    `;

    // Attach Search Listeners
    const searchInput = container.querySelector('#b2b-cluster-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        clusterSearchQuery = e.target.value;
        renderView();
        const reInput = container.querySelector('#b2b-cluster-search-input');
        if (reInput) {
          reInput.focus();
          reInput.setSelectionRange(clusterSearchQuery.length, clusterSearchQuery.length);
        }
      });
    }

    container.querySelector('#b2b-cluster-clear-search')?.addEventListener('click', () => {
      clusterSearchQuery = '';
      renderView();
    });

    container.querySelector('#b2b-cluster-empty-reset-btn')?.addEventListener('click', () => {
      clusterSearchQuery = '';
      renderView();
    });
  }

  renderView();
}
