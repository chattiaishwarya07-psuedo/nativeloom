/**
 * Screen: Direct-from-Cluster Wholesale & Corporate Procurement
 * Exact recreation of User Provided Reference Screenshot (Screen 4)
 */

import { State } from '../state.js';
import { AudioAssistance } from '../speech.js';

export function renderWholesaleScreen(container) {
  container.innerHTML = `
    <div class="wholesale-screen animate-fade-in">

      <!-- Top Institutional Badges -->
      <div style="display:flex; gap:6px; margin: 8px 0 6px;">
        <span class="badge-green" style="background:#0E2E21; color:#4ADE80; border:none; font-size:0.65rem; display:inline-flex; align-items:center; gap:4px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg>
          <span>INSTITUTIONAL B2B</span>
        </span>
        <span class="badge-amber" style="background:#FEECE5; color:#9A3412; font-size:0.65rem; font-weight:800;">
          TIERED BULK PRICING
        </span>
      </div>

      <!-- Title & Subtitle -->
      <h1 style="font-size:1.35rem; font-weight:900; color:var(--text-primary); margin-bottom:4px; line-height:1.2;">
        Direct-from-Cluster Wholesale &amp; Corporate Procurement
      </h1>
      <p style="font-size:0.75rem; color:var(--text-secondary); line-height:1.35; margin-bottom:14px;">
        Source authentic GI-certified crafts directly from weaver co-ops, brass guilds, and pottery clusters. 0% middleman markups, verified GST invoices, and custom corporate branding.
      </p>

      <!-- 4 Quick Metrics Quad -->
      <div style="display:grid; grid-template-columns:repeat(2, 1fr); gap:8px; margin-bottom:14px;">
        <div style="background:#FFFFFF; border:1px solid var(--border-subtle); border-radius:var(--radius-md); padding:10px; display:flex; align-items:center; gap:8px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg>
          <div>
            <div style="font-size:0.92rem; font-weight:900; color:var(--text-primary);">180+</div>
            <div style="font-size:0.68rem; color:var(--text-muted);">Artisan Clusters</div>
          </div>
        </div>

        <div style="background:#FFFFFF; border:1px solid var(--border-subtle); border-radius:var(--radius-md); padding:10px; display:flex; align-items:center; gap:8px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><line x1="12" x2="12" y1="7" y2="17"/><line x1="8" x2="16" y1="10" y2="10"/><line x1="8" x2="14" y1="13" y2="13"/></svg>
          <div>
            <div style="font-size:0.92rem; font-weight:900; color:var(--color-green);">Up to 42%</div>
            <div style="font-size:0.68rem; color:var(--text-muted);">Bulk Savings</div>
          </div>
        </div>

        <div style="background:#FFFFFF; border:1px solid var(--border-subtle); border-radius:var(--radius-md); padding:10px; display:flex; align-items:center; gap:8px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
          <div>
            <div style="font-size:0.85rem; font-weight:900; color:var(--text-primary);">Ministry GI</div>
            <div style="font-size:0.68rem; color:var(--text-muted);">Tag Certified</div>
          </div>
        </div>

        <div style="background:#FFFFFF; border:1px solid var(--border-subtle); border-radius:var(--radius-md); padding:10px; display:flex; align-items:center; gap:8px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16.5 9.4 7.55 4.24 2.5 7.15 11.45 12.31 20.5 7.15"/><polyline points="3.29 7 12 12.01 20.71 7"/><line x1="12" x2="12" y1="22.01" y2="12"/><path d="M20.7 7v10a2 2 0 0 1-1.1 1.8l-6.6 3.8a2 2 0 0 1-2 0l-6.6-3.8A2 2 0 0 1 3.3 17V7"/></svg>
          <div>
            <div style="font-size:0.85rem; font-weight:900; color:var(--color-terracotta);">48 Hours</div>
            <div style="font-size:0.68rem; color:var(--text-muted);">Sample Dispatch</div>
          </div>
        </div>
      </div>

      <!-- Bulk Requirement Box (Dark Terracotta) -->
      <div style="background:#7A2E0E; color:#FFFFFF; border-radius:var(--radius-lg); padding:16px; margin-bottom:16px; box-shadow:0 4px 14px rgba(122, 46, 14, 0.25);">
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M8 10h.01"/><path d="M16 10h.01"/><path d="M8 14h.01"/><path d="M16 14h.01"/></svg>
          <div style="font-size:0.95rem; font-weight:800;">Need 50 to 5,000+ Units?</div>
        </div>
        <p style="font-size:0.75rem; opacity:0.92; line-height:1.35; margin-bottom:12px;">
          Ideal for Festive Gifting, Hotel Interiors, or Retail Inventory without remiddlemanning.
        </p>

        <button type="button" class="btn-primary" style="background:#FFFFFF; color:#7A2E0E; margin-bottom:8px; font-weight:800; display:flex; align-items:center; justify-content:center; gap:6px;" onclick="window.openRfqModal('Gorakhpur Terracotta Botanical Planters', 'Gorakhpur Terracotta Cluster')">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/></svg>
          <span>Post Instant RFP / Request Quote</span>
        </button>

        <button type="button" class="btn-secondary" style="background:transparent; border-color:rgba(255,255,255,0.4); color:#FFFFFF; font-size:0.75rem; display:flex; align-items:center; justify-content:center; gap:6px;" onclick="window.showToast('Downloading Cluster Catalog 2026 (PDF)...')">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
          <span>Download Cluster Catalog (PDF)</span>
        </button>
      </div>

      <!-- Cluster Sourcing by Category -->
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
        <span style="font-size:0.85rem; font-weight:800; color:var(--text-primary);">Cluster Sourcing by Category</span>
        <span class="badge-amber" style="font-size:0.62rem;">WHOLESALE READY</span>
      </div>

      <div style="display:flex; gap:8px; margin-bottom:14px;">
        <button type="button" class="craft-chip active" style="padding:6px 14px; font-size:0.75rem; display:flex; align-items:center; gap:4px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" x2="7.01" y1="7" y2="7"/></svg>
          <span>Corporate Gifting</span>
        </button>
        <button type="button" class="craft-chip" style="padding:6px 14px; font-size:0.75rem; display:flex; align-items:center; gap:4px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/></svg>
          <span>Handloom &amp; Uniforms</span>
        </button>
      </div>

      <!-- B2B Product 1: Gorakhpur Terracotta Planters -->
      <div class="order-card" style="margin-bottom:14px;">
        <div style="position:relative; height:140px; border-radius:8px; overflow:hidden; margin-bottom:10px;">
          <img src="/assets/raw_pottery_snap.jpg" alt="Gorakhpur Terracotta" style="width:100%; height:100%; object-fit:cover;">
          <div style="position:absolute; top:8px; left:8px; background:rgba(0,0,0,0.75); color:#fff; font-size:0.62rem; font-weight:700; padding:2px 8px; border-radius:var(--radius-pill);">
            GI Cluster: Gorakhpur • MOQ: 25 Units
          </div>
          <div style="position:absolute; bottom:8px; right:8px; background:rgba(0,0,0,0.75); color:#4ADE80; font-size:0.62rem; font-weight:700; padding:2px 8px; border-radius:var(--radius-pill);">
            ⏱ Lead: 10-14 Days
          </div>
        </div>

        <div style="font-size:0.92rem; font-weight:800; color:var(--text-primary); margin-bottom:2px;">
          Gorakhpur Terracotta Botanical Planter &amp; Vases
        </div>
        <div style="font-size:0.72rem; color:var(--text-secondary); margin-bottom:6px; display:flex; align-items:center; gap:4px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
          <span>Custom embossed company insignia &amp; eco-safe mineral glaze</span>
        </div>

        <!-- Tiered matrix -->
        <div class="b2b-tier-matrix">
          <div class="tier-col">
            <div style="font-size:0.65rem; color:var(--text-muted);">25–99 pcs</div>
            <div style="font-size:0.85rem; font-weight:900;">₹420</div>
            <div style="font-size:0.6rem; color:var(--text-secondary);">Standard bulk</div>
          </div>
          <div class="tier-col">
            <div style="font-size:0.65rem; color:var(--text-muted);">100–499 pcs</div>
            <div style="font-size:0.85rem; font-weight:900; color:var(--color-terracotta);">₹340</div>
            <div style="font-size:0.6rem; color:var(--color-green); font-weight:700;">Save 19%</div>
          </div>
          <div class="tier-col highlight">
            <div style="font-size:0.65rem; color:var(--text-muted);">500+ pcs</div>
            <div style="font-size:0.85rem; font-weight:900; color:#7A2E0E;">₹290</div>
            <div style="font-size:0.6rem; color:var(--color-green); font-weight:800;">Save 31%</div>
          </div>
        </div>

        <div style="display:flex; gap:8px;">
          <button type="button" class="btn-primary" style="flex:1; padding:8px; font-size:0.75rem; display:flex; align-items:center; justify-content:center; gap:6px;" onclick="window.openRfqModal('Gorakhpur Terracotta Botanical Planters', 'Gorakhpur Terracotta Cluster')">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
            <span>Add to Bulk RFQ</span>
          </button>
          <button type="button" class="btn-secondary" style="padding:8px 12px; font-size:0.75rem; display:flex; align-items:center; gap:4px;" onclick="window.showToast('Ordering single paid sample...')">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16.5 9.4 7.55 4.24 2.5 7.15 11.45 12.31 20.5 7.15"/><polyline points="3.29 7 12 12.01 20.71 7"/><line x1="12" x2="12" y1="22.01" y2="12"/><path d="M20.7 7v10a2 2 0 0 1-1.1 1.8l-6.6 3.8a2 2 0 0 1-2 0l-6.6-3.8A2 2 0 0 1 3.3 17V7"/></svg>
            <span>Sample</span>
          </button>
        </div>
      </div>

      <!-- B2B Product 2: Kutch Indigo Ajrakh -->
      <div class="order-card" style="margin-bottom:14px;">
        <div style="position:relative; height:140px; border-radius:8px; overflow:hidden; margin-bottom:10px;">
          <img src="/assets/woodcraft_bowl.jpg" alt="Kutch Indigo Ajrakh" style="width:100%; height:100%; object-fit:cover;">
          <div style="position:absolute; top:8px; left:8px; background:rgba(0,0,0,0.75); color:#fff; font-size:0.62rem; font-weight:700; padding:2px 8px; border-radius:var(--radius-pill);">
            GI Cluster: Kutch &amp; Patan • MOQ: 50 Sets
          </div>
          <div style="position:absolute; bottom:8px; right:8px; background:rgba(0,0,0,0.75); color:#4ADE80; font-size:0.62rem; font-weight:700; padding:2px 8px; border-radius:var(--radius-pill);">
            ⏱ Lead: 7 Days
          </div>
        </div>

        <div style="font-size:0.92rem; font-weight:800; color:var(--text-primary); margin-bottom:2px;">
          Kutch Natural Indigo Ajrakh Desk Organizer &amp; Notebook Sets
        </div>
        <div style="font-size:0.72rem; color:var(--text-secondary); margin-bottom:6px; display:flex; align-items:center; gap:4px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
          <span>Laser logo debossing on vegan leather + magnetic closure strap</span>
        </div>

        <div class="b2b-tier-matrix" style="grid-template-columns:1fr 1fr;">
          <div class="tier-col">
            <div style="font-size:0.65rem; color:var(--text-muted);">50–199 sets</div>
            <div style="font-size:0.85rem; font-weight:900;">₹380 / set</div>
            <div style="font-size:0.6rem; color:var(--text-secondary);">Cluster Direct</div>
          </div>
          <div class="tier-col highlight">
            <div style="font-size:0.65rem; color:var(--text-muted);">200+ sets</div>
            <div style="font-size:0.85rem; font-weight:900; color:#7A2E0E;">₹290 / set</div>
            <div style="font-size:0.6rem; color:var(--color-green); font-weight:800;">Save 24%</div>
          </div>
        </div>

        <div style="display:flex; gap:8px;">
          <button type="button" class="btn-primary" style="flex:1; padding:8px; font-size:0.75rem; display:flex; align-items:center; justify-content:center; gap:6px;" onclick="window.openRfqModal('Kutch Natural Indigo Ajrakh Desk Sets', 'Kutch & Patan Artisan Guild')">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
            <span>Add to Bulk RFQ</span>
          </button>
          <button type="button" class="btn-secondary" style="padding:8px 12px; font-size:0.75rem; display:flex; align-items:center; gap:4px;" onclick="window.showToast('Ordering single paid sample...')">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16.5 9.4 7.55 4.24 2.5 7.15 11.45 12.31 20.5 7.15"/><polyline points="3.29 7 12 12.01 20.71 7"/><line x1="12" x2="12" y1="22.01" y2="12"/><path d="M20.7 7v10a2 2 0 0 1-1.1 1.8l-6.6 3.8a2 2 0 0 1-2 0l-6.6-3.8A2 2 0 0 1 3.3 17V7"/></svg>
            <span>Sample</span>
          </button>
        </div>
      </div>

      <!-- B2B Product 3: Bastar Lost-Wax Brass Nandi -->
      <div class="order-card" style="margin-bottom:14px;">
        <div style="position:relative; height:140px; border-radius:8px; overflow:hidden; margin-bottom:10px;">
          <img src="/assets/dhokra_brass.jpg" alt="Bastar Brass Nandi" style="width:100%; height:100%; object-fit:cover;">
          <div style="position:absolute; top:8px; left:8px; background:rgba(0,0,0,0.75); color:#fff; font-size:0.62rem; font-weight:700; padding:2px 8px; border-radius:var(--radius-pill);">
            GI Cluster: Bastar Craft Guild • MOQ: 15 Units
          </div>
          <div style="position:absolute; bottom:8px; right:8px; background:rgba(0,0,0,0.75); color:#4ADE80; font-size:0.62rem; font-weight:700; padding:2px 8px; border-radius:var(--radius-pill);">
            ⏱ Lead: 18 Days
          </div>
        </div>

        <div style="font-size:0.92rem; font-weight:800; color:var(--text-primary); margin-bottom:2px;">
          Bastar Lost-Wax Brass Desktop Nandi Figurine
        </div>
        <div style="font-size:0.72rem; color:var(--text-secondary); margin-bottom:6px; display:flex; align-items:center; gap:4px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
          <span>Includes pine-wood box, brass closure &amp; printed GI artisan story booklet</span>
        </div>

        <div class="b2b-tier-matrix" style="grid-template-columns:1fr 1fr;">
          <div class="tier-col">
            <div style="font-size:0.65rem; color:var(--text-muted);">15–49 pcs</div>
            <div style="font-size:0.85rem; font-weight:900;">₹1,650</div>
            <div style="font-size:0.6rem; color:var(--text-secondary);">Master Guild Cost</div>
          </div>
          <div class="tier-col highlight">
            <div style="font-size:0.65rem; color:var(--text-muted);">50+ pcs</div>
            <div style="font-size:0.85rem; font-weight:900; color:#7A2E0E;">₹1,320</div>
            <div style="font-size:0.6rem; color:var(--color-green); font-weight:800;">Save 20%</div>
          </div>
        </div>

        <div style="display:flex; gap:8px;">
          <button type="button" class="btn-primary" style="flex:1; padding:8px; font-size:0.75rem; display:flex; align-items:center; justify-content:center; gap:6px;" onclick="window.openRfqModal('Bastar Lost-Wax Brass Desktop Nandi', 'Bastar Craft Guild')">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
            <span>Add to Bulk RFQ</span>
          </button>
          <button type="button" class="btn-secondary" style="padding:8px 12px; font-size:0.75rem; display:flex; align-items:center; gap:4px;" onclick="window.showToast('Ordering single paid sample...')">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16.5 9.4 7.55 4.24 2.5 7.15 11.45 12.31 20.5 7.15"/><polyline points="3.29 7 12 12.01 20.71 7"/><line x1="12" x2="12" y1="22.01" y2="12"/><path d="M20.7 7v10a2 2 0 0 1-1.1 1.8l-6.6 3.8a2 2 0 0 1-2 0l-6.6-3.8A2 2 0 0 1 3.3 17V7"/></svg>
            <span>Sample</span>
          </button>
        </div>
      </div>

      <!-- Section: Meet the Cooperatives -->
      <div style="background:#FFFFFF; border:1px solid var(--border-subtle); border-radius:var(--radius-lg); padding:14px; margin-bottom:14px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
          <span style="font-size:0.88rem; font-weight:800; color:var(--text-primary); display:flex; align-items:center; gap:6px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            <span>Meet the Cooperatives</span>
          </span>
          <span class="badge-green" style="font-size:0.62rem;">Pehchan Verified</span>
        </div>
        <p style="font-size:0.72rem; color:var(--text-secondary); line-height:1.35; margin-bottom:12px;">
          Direct contracting with 100% Pehchan verified master guilds ensures 100% of profits/remittances reach registered artisan bank accounts via DBT.
        </p>

        <!-- Co-op card -->
        <div style="background:#FAF7F2; border-radius:var(--radius-md); padding:10px; margin-bottom:10px;">
          <div style="display:flex; gap:10px; align-items:center; margin-bottom:8px;">
            <img src="/assets/artisan_saleem.jpg" alt="Coop Society" style="width:40px; height:40px; border-radius:8px; object-fit:cover;">
            <div>
              <div style="font-size:0.85rem; font-weight:800;">Barabanki Weavers Coop Society</div>
              <div style="font-size:0.68rem; color:var(--text-muted);">Uttar Pradesh Handloom Cluster • Society Reg: UP-BRK-49241 • Direct DBT</div>
            </div>
          </div>

          <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:6px; text-align:center; background:#FFFFFF; border-radius:6px; padding:6px; margin-bottom:8px;">
            <div>
              <div style="font-size:0.82rem; font-weight:800;">140</div>
              <div style="font-size:0.6rem; color:var(--text-muted);">Active Looms</div>
            </div>
            <div>
              <div style="font-size:0.82rem; font-weight:800;">3,000m</div>
              <div style="font-size:0.6rem; color:var(--text-muted);">Monthly Cap</div>
            </div>
            <div>
              <div style="font-size:0.82rem; font-weight:800; color:var(--color-green);">GI Tag</div>
              <div style="font-size:0.6rem; color:var(--text-muted);">Certified</div>
            </div>
          </div>

          <button type="button" class="btn-secondary" style="width:100%; padding:6px; font-size:0.72rem; display:flex; align-items:center; justify-content:center; gap:6px;" onclick="window.showToast('Downloading Guild Verification Dossier (PDF)...')">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/></svg>
            <span>View Guild Verification Dossier &amp; Capacity Audit</span>
          </button>
        </div>
      </div>

      <!-- Institutional Compliance Guarantee -->
      <div style="background:#FAF7F2; border:1px solid var(--border-subtle); border-radius:var(--radius-lg); padding:14px;">
        <div style="font-size:0.85rem; font-weight:800; color:var(--text-primary); margin-bottom:10px; display:flex; align-items:center; gap:6px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
          <span>Institutional Compliance Guarantee</span>
        </div>

        <div style="display:flex; flex-direction:column; gap:8px;">
          <div style="display:flex; gap:8px; align-items:flex-start;">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M16 8h-8"/><path d="M16 12h-8"/><path d="M10 16h-2"/></svg>
            <div>
              <div style="font-size:0.76rem; font-weight:800;">Official GST Invoicing</div>
              <div style="font-size:0.68rem; color:var(--text-secondary);">Full B2B Input Tax Credit (ITC) compliant billing direct from cooperative entities.</div>
            </div>
          </div>

          <div style="display:flex; gap:8px; align-items:flex-start;">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="14" x="3" y="5" rx="2"/><circle cx="9" cy="11" r="2"/><path d="M15 10h2"/><path d="M15 13h2"/></svg>
            <div>
              <div style="font-size:0.76rem; font-weight:800;">Textiles Ministry GI Tag</div>
              <div style="font-size:0.68rem; color:var(--text-secondary);">Govt of India Pehchan authenticity QR certificates included with every wholesale consignment.</div>
            </div>
          </div>

          <div style="display:flex; gap:8px; align-items:flex-start;">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="10" x="1" y="3" rx="1"/><polygon points="15 8 18 8 21 11 21 13 15 13 15 8"/><circle cx="5.5" cy="15.5" r="2.5"/><circle cx="17.5" cy="15.5" r="2.5"/></svg>
            <div>
              <div style="font-size:0.76rem; font-weight:800;">Insured Commercial Freight</div>
              <div style="font-size:0.68rem; color:var(--text-secondary);">Delivery Agent Commercial Express &amp; palletized air logistics with zero-transit breakages guarantee.</div>
            </div>
          </div>

          <div style="display:flex; gap:8px; align-items:flex-start;">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" x2="7.01" y1="7" y2="7"/></svg>
            <div>
              <div style="font-size:0.76rem; font-weight:800;">Artisan Story Co-Branding</div>
              <div style="font-size:0.68rem; color:var(--text-secondary);">Custom printed parchment booklets featuring your corporate logo alongside artisan provenance.</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  `;
}
