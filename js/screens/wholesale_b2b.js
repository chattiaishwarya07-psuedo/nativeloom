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
        <span class="badge-green" style="background:#0E2E21; color:#4ADE80; border:none; font-size:0.65rem;">
          🏛️ INSTITUTIONAL B2B
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
          <span style="font-size:1.2rem;">🏛️</span>
          <div>
            <div style="font-size:0.92rem; font-weight:900; color:var(--text-primary);">180+</div>
            <div style="font-size:0.68rem; color:var(--text-muted);">Artisan Clusters</div>
          </div>
        </div>

        <div style="background:#FFFFFF; border:1px solid var(--border-subtle); border-radius:var(--radius-md); padding:10px; display:flex; align-items:center; gap:8px;">
          <span style="font-size:1.2rem;">💰</span>
          <div>
            <div style="font-size:0.92rem; font-weight:900; color:var(--color-green);">Up to 42%</div>
            <div style="font-size:0.68rem; color:var(--text-muted);">Bulk Savings</div>
          </div>
        </div>

        <div style="background:#FFFFFF; border:1px solid var(--border-subtle); border-radius:var(--radius-md); padding:10px; display:flex; align-items:center; gap:8px;">
          <span style="font-size:1.2rem;">🛡️</span>
          <div>
            <div style="font-size:0.85rem; font-weight:900; color:var(--text-primary);">Ministry GI</div>
            <div style="font-size:0.68rem; color:var(--text-muted);">Tag Certified</div>
          </div>
        </div>

        <div style="background:#FFFFFF; border:1px solid var(--border-subtle); border-radius:var(--radius-md); padding:10px; display:flex; align-items:center; gap:8px;">
          <span style="font-size:1.2rem;">📦</span>
          <div>
            <div style="font-size:0.85rem; font-weight:900; color:var(--color-terracotta);">48 Hours</div>
            <div style="font-size:0.68rem; color:var(--text-muted);">Sample Dispatch</div>
          </div>
        </div>
      </div>

      <!-- Bulk Requirement Box (Dark Terracotta) -->
      <div style="background:#7A2E0E; color:#FFFFFF; border-radius:var(--radius-lg); padding:16px; margin-bottom:16px; box-shadow:0 4px 14px rgba(122, 46, 14, 0.25);">
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">
          <span style="font-size:1.2rem;">🏢</span>
          <div style="font-size:0.95rem; font-weight:800;">Need 50 to 5,000+ Units?</div>
        </div>
        <p style="font-size:0.75rem; opacity:0.92; line-height:1.35; margin-bottom:12px;">
          Ideal for Festive Gifting, Hotel Interiors, or Retail Inventory without remiddlemanning.
        </p>

        <button type="button" class="btn-primary" style="background:#FFFFFF; color:#7A2E0E; margin-bottom:8px; font-weight:800;" onclick="window.showToast('Opening Instant Corporate RFP Generator...')">
          📄 Post Instant RFP / Request Quote
        </button>

        <button type="button" class="btn-secondary" style="background:transparent; border-color:rgba(255,255,255,0.4); color:#FFFFFF; font-size:0.75rem;" onclick="window.showToast('Downloading Cluster Catalog 2026 (PDF)...')">
          📥 Download Cluster Catalog (PDF)
        </button>
      </div>

      <!-- Cluster Sourcing by Category -->
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
        <span style="font-size:0.85rem; font-weight:800; color:var(--text-primary);">Cluster Sourcing by Category</span>
        <span class="badge-amber" style="font-size:0.62rem;">WHOLESALE READY</span>
      </div>

      <div style="display:flex; gap:8px; margin-bottom:14px;">
        <button type="button" class="craft-chip active" style="padding:6px 14px; font-size:0.75rem;">🏷️ Corporate Gifting</button>
        <button type="button" class="craft-chip" style="padding:6px 14px; font-size:0.75rem;">🧵 Handloom &amp; Uniforms</button>
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
        <div style="font-size:0.72rem; color:var(--text-secondary); margin-bottom:6px;">
          ✍️ Custom embossed company insignia &amp; eco-safe mineral glaze
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
          <button type="button" class="btn-primary" style="flex:1; padding:8px; font-size:0.75rem;" onclick="window.showToast('Added 100x Gorakhpur Terracotta to Corporate RFQ!')">
            🛒 Add to Bulk RFQ
          </button>
          <button type="button" class="btn-secondary" style="padding:8px 12px; font-size:0.75rem;" onclick="window.showToast('Ordering single paid sample...')">
            📦 Sample
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
        <div style="font-size:0.72rem; color:var(--text-secondary); margin-bottom:6px;">
          ✍️ Laser logo debossing on vegan leather + magnetic closure strap
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
          <button type="button" class="btn-primary" style="flex:1; padding:8px; font-size:0.75rem;" onclick="window.showToast('Added 50x Ajrakh Sets to Corporate RFQ!')">
            🛒 Add to Bulk RFQ
          </button>
          <button type="button" class="btn-secondary" style="padding:8px 12px; font-size:0.75rem;" onclick="window.showToast('Ordering single paid sample...')">
            📦 Sample
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
        <div style="font-size:0.72rem; color:var(--text-secondary); margin-bottom:6px;">
          ✍️ Includes pine-wood box, brass closure &amp; printed GI artisan story booklet
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
          <button type="button" class="btn-primary" style="flex:1; padding:8px; font-size:0.75rem;" onclick="window.showToast('Added 25x Bastar Brass to Corporate RFQ!')">
            🛒 Add to Bulk RFQ
          </button>
          <button type="button" class="btn-secondary" style="padding:8px 12px; font-size:0.75rem;" onclick="window.showToast('Ordering single paid sample...')">
            📦 Sample
          </button>
        </div>
      </div>

      <!-- Section: Meet the Cooperatives -->
      <div style="background:#FFFFFF; border:1px solid var(--border-subtle); border-radius:var(--radius-lg); padding:14px; margin-bottom:14px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
          <span style="font-size:0.88rem; font-weight:800; color:var(--text-primary); display:flex; align-items:center; gap:6px;">
            👥 Meet the Cooperatives
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

          <button type="button" class="btn-secondary" style="width:100%; padding:6px; font-size:0.72rem;" onclick="window.showToast('Downloading Guild Verification Dossier (PDF)...')">
            📄 View Guild Verification Dossier &amp; Capacity Audit
          </button>
        </div>
      </div>

      <!-- Institutional Compliance Guarantee -->
      <div style="background:#FAF7F2; border:1px solid var(--border-subtle); border-radius:var(--radius-lg); padding:14px;">
        <div style="font-size:0.85rem; font-weight:800; color:var(--text-primary); margin-bottom:10px; display:flex; align-items:center; gap:6px;">
          🛡️ Institutional Compliance Guarantee
        </div>

        <div style="display:flex; flex-direction:column; gap:8px;">
          <div style="display:flex; gap:8px; align-items:flex-start;">
            <span>🧾</span>
            <div>
              <div style="font-size:0.76rem; font-weight:800;">Official GST Invoicing</div>
              <div style="font-size:0.68rem; color:var(--text-secondary);">Full B2B Input Tax Credit (ITC) compliant billing direct from cooperative entities.</div>
            </div>
          </div>

          <div style="display:flex; gap:8px; align-items:flex-start;">
            <span>🪪</span>
            <div>
              <div style="font-size:0.76rem; font-weight:800;">Textiles Ministry GI Tag</div>
              <div style="font-size:0.68rem; color:var(--text-secondary);">Govt of India Pehchan authenticity QR certificates included with every wholesale consignment.</div>
            </div>
          </div>

          <div style="display:flex; gap:8px; align-items:flex-start;">
            <span>🚚</span>
            <div>
              <div style="font-size:0.76rem; font-weight:800;">Insured Commercial Freight</div>
              <div style="font-size:0.68rem; color:var(--text-secondary);">India Post Commercial Express &amp; palletized air logistics with zero-transit breakages guarantee.</div>
            </div>
          </div>

          <div style="display:flex; gap:8px; align-items:flex-start;">
            <span>🏷️</span>
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
