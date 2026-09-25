/**
 * Corporate Screen: Direct-from-Cluster Sourcing Directories
 * (Role: CORPORATE only - bulk procurement from registered cooperatives)
 */

import { State } from '../state.js';

export function renderCorporateClustersScreen(container) {
  const clusters = State.corporate.clusters;

  container.innerHTML = `
    <div class="corporate-clusters-screen animate-fade-in" style="padding-bottom: 30px;">
      
      <!-- Top Title -->
      <div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:4px;">
        <h1 style="font-size:1.25rem; font-weight:900; color:var(--text-primary); margin:0;">
          Cluster Sourcing Directory
        </h1>
        <span style="font-size:0.75rem; font-weight:800; color:#0F172A;">${clusters.length} GI Clusters</span>
      </div>
      <p style="font-size:0.75rem; color:var(--text-secondary); margin:0 0 14px 0; line-height:1.35;">
        Direct institutional procurement from government-recognized artisan cooperatives with formal GST billing and escrow safety.
      </p>

      <!-- Clusters Grid -->
      <div style="display:flex; flex-direction:column; gap:14px; margin-bottom:18px;">
        ${clusters.map(c => `
          <div style="background:#FFFFFF; border:1px solid var(--border-subtle); border-radius:var(--radius-xl); overflow:hidden; box-shadow:var(--shadow-sm);">
            
            <div style="position:relative; height:120px;">
              <img src="${c.image}" alt="${c.name}" style="width:100%; height:100%; object-fit:cover;">
              <div style="position:absolute; inset:0; background:linear-gradient(180deg, transparent 40%, rgba(15, 23, 42, 0.8) 100%);"></div>
              <span style="position:absolute; top:8px; left:8px; background:#0F172A; color:#FFFFFF; font-size:0.62rem; font-weight:800; padding:3px 8px; border-radius:var(--radius-pill);">
                ${c.giTag} • ${c.state}
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
                <div>Lead Artisan: <strong>${c.leadArtisan}</strong></div>
                <div>Capacity: <strong>${c.capacity}</strong></div>
                <div>Wholesale Tier: <strong>From ₹${c.minTierPrice}/unit</strong></div>
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
        `).join('')}
      </div>

    </div>
  `;
}
