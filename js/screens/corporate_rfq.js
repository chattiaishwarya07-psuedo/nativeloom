/**
 * Corporate Screen: Custom B2B Request For Quotation (RFQ) Generator
 * (Role: CORPORATE only - institutional bulk RFQs to artisan clusters)
 */

import { State } from '../state.js';

export function renderCorporateRFQScreen(container) {
  const clusters = State.corporate.clusters;
  const company = State.corporate.company;

  container.innerHTML = `
    <div class="corporate-rfq-screen animate-fade-in" style="padding-bottom: 30px;">
      
      <!-- Top Title -->
      <div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:4px;">
        <h1 style="font-size:1.25rem; font-weight:900; color:var(--text-primary); margin:0;">
          Custom B2B RFQ Generator
        </h1>
        <span style="font-size:0.75rem; font-weight:800; color:#0F172A;">Cooperative Escrow</span>
      </div>
      <p style="font-size:0.75rem; color:var(--text-secondary); margin:0 0 14px 0; line-height:1.35;">
        Submit institutional craft specifications directly to registered cluster cooperative leads for formal proforma pricing.
      </p>

      <!-- Institutional Entity Summary Box -->
      <div style="background:#F1F5F9; border:1px solid #CBD5E1; border-radius:var(--radius-lg); padding:10px 12px; margin-bottom:16px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
          <span style="font-size:0.72rem; font-weight:800; color:#0F172A;">Procuring Entity:</span>
          <span style="font-size:0.65rem; font-weight:800; background:#0F172A; color:#FFFFFF; padding:2px 6px; border-radius:var(--radius-pill);">GST Verified</span>
        </div>
        <div style="font-size:0.85rem; font-weight:800; color:var(--text-primary);">${company.name}</div>
        <div style="font-size:0.7rem; color:var(--text-secondary); margin-top:2px;">
          GSTIN: <strong>${company.gstin}</strong> • Contact: <strong>${company.procurementOfficer}</strong>
        </div>
      </div>

      <!-- RFQ Form -->
      <form id="rfq-form" onsubmit="window.submitRFQ(event)" style="display:flex; flex-direction:column; gap:14px;">
        
        <!-- Target Cluster -->
        <div>
          <label style="font-size:0.75rem; font-weight:800; display:block; margin-bottom:4px; color:var(--text-primary);">
            1. Target Artisan Cluster / Guild
          </label>
          <select id="rfq-cluster" required style="width:100%; padding:10px; border-radius:var(--radius-md); border:1px solid var(--border-subtle); background:#FFFFFF; font-size:0.8rem; font-weight:700;">
            ${clusters.map(c => `
              <option value="${c.name}">${c.name} (${c.giTag})</option>
            `).join('')}
          </select>
        </div>

        <!-- Craft Title & Specs -->
        <div>
          <label style="font-size:0.75rem; font-weight:800; display:block; margin-bottom:4px; color:var(--text-primary);">
            2. Craft Product & Custom Specifications
          </label>
          <input type="text" id="rfq-item" required placeholder="e.g. Fluted Planters / Brass Corporate Mementos" value="Hospitality Fluted Planters" style="width:100%; padding:10px; border-radius:var(--radius-md); border:1px solid var(--border-subtle); background:#FFFFFF; font-size:0.8rem; font-weight:700; margin-bottom:6px;">
          <textarea id="rfq-notes" rows="3" placeholder="Provide dimensions, custom brass engraving, clay firing finish, or packaging preferences..." style="width:100%; padding:10px; border-radius:var(--radius-md); border:1px solid var(--border-subtle); background:#FFFFFF; font-size:0.75rem; font-family:inherit;">Custom hotel logo embossing required on base. Natural terracotta matte burnish finish with waterproofing treatment.</textarea>
        </div>

        <!-- Quantity & Target Delivery -->
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div>
            <label style="font-size:0.75rem; font-weight:800; display:block; margin-bottom:4px; color:var(--text-primary);">
              3. Volume (Units)
            </label>
            <input type="number" id="rfq-qty" min="25" max="10000" step="25" required value="250" style="width:100%; padding:10px; border-radius:var(--radius-md); border:1px solid var(--border-subtle); background:#FFFFFF; font-size:0.82rem; font-weight:800;">
          </div>
          <div>
            <label style="font-size:0.75rem; font-weight:800; display:block; margin-bottom:4px; color:var(--text-primary);">
              4. Target Delivery
            </label>
            <input type="date" id="rfq-date" value="2026-11-20" required style="width:100%; padding:10px; border-radius:var(--radius-md); border:1px solid var(--border-subtle); background:#FFFFFF; font-size:0.8rem; font-weight:700;">
          </div>
        </div>

        <!-- Compliance & Pre-conditions -->
        <div style="background:#FAF7F2; border:1px solid var(--border-subtle); border-radius:var(--radius-md); padding:10px 12px;">
          <div style="font-size:0.72rem; font-weight:800; color:var(--text-primary); margin-bottom:6px;">Institutional Compliance Terms:</div>
          
          <label style="display:flex; align-items:center; gap:8px; font-size:0.72rem; color:var(--text-secondary); margin-bottom:6px; cursor:pointer;">
            <input type="checkbox" checked required>
            <span>Pre-production physical sample approval before batch execution</span>
          </label>

          <label style="display:flex; align-items:center; gap:8px; font-size:0.72rem; color:var(--text-secondary); margin-bottom:6px; cursor:pointer;">
            <input type="checkbox" checked required>
            <span>Formal GST Tax Invoice with GSTR-2B input tax credit</span>
          </label>

          <label style="display:flex; align-items:center; gap:8px; font-size:0.72rem; color:var(--text-secondary); cursor:pointer;">
            <input type="checkbox" checked required>
            <span>Cooperative Escrow: Funds released only after delivery inspection</span>
          </label>
        </div>

        <!-- Submit Button -->
        <button type="submit" class="btn-primary" style="padding:14px; font-size:0.85rem; font-weight:800; background:#0F172A; margin-top:4px;">
          📄 Transmit RFQ to Cluster Lead
        </button>

      </form>

    </div>
  `;
}

if (typeof window !== 'undefined') {
  window.submitRFQ = function(event) {
    event.preventDefault();
    const cluster = document.getElementById('rfq-cluster').value;
    const item = document.getElementById('rfq-item').value;
    const qty = document.getElementById('rfq-qty').value;
    const date = document.getElementById('rfq-date').value;

    const newQuote = {
      rfqId: `RFQ-B2B-${Math.floor(10000 + Math.random() * 90000)}`,
      targetCluster: cluster,
      craftItem: item,
      quantity: parseInt(qty, 10),
      targetDeliveryDate: date,
      gstInvoiceRequired: true,
      status: 'RFQ Submitted • Under Review',
      quotedRatePerUnit: 280,
      totalEstimate: parseInt(qty, 10) * 280,
      proformaToken: 'PR-PROCESSING',
      escrowEligible: true,
      sampleStatus: 'Sample In Preparation'
    };

    State.corporate.quotes.unshift(newQuote);
    window.showToast?.(`✅ RFQ ${newQuote.rfqId} dispatched to ${cluster}!`);
    window.navigateToScreen('corporate_quotes');
  };
}
