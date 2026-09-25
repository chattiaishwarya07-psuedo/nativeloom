/**
 * Corporate Screen: Proforma Invoices & RFQ Quotes Tracking
 * (Role: CORPORATE only - formal quotations and escrow payments)
 */

import { State } from '../state.js';

export function renderCorporateQuotesScreen(container) {
  const quotes = State.corporate.quotes;

  container.innerHTML = `
    <div class="corporate-quotes-screen animate-fade-in" style="padding-bottom: 30px;">
      
      <!-- Top Title -->
      <div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:4px;">
        <h1 style="font-size:1.25rem; font-weight:900; color:var(--text-primary); margin:0;">
          Proforma Quotes & Escrow
        </h1>
        <span style="font-size:0.75rem; font-weight:800; color:#0F172A;">${quotes.length} Quotes</span>
      </div>
      <p style="font-size:0.75rem; color:var(--text-secondary); margin:0 0 14px 0; line-height:1.35;">
        Institutional proforma invoices issued directly by craft guilds. Funds are safeguarded via government-backed escrow.
      </p>

      <!-- Active Quotes List -->
      <div style="display:flex; flex-direction:column; gap:14px;">
        ${quotes.map(q => `
          <div style="background:#FFFFFF; border:1px solid var(--border-subtle); border-radius:var(--radius-xl); padding:14px; box-shadow:var(--shadow-sm);">
            
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:6px;">
              <div>
                <span style="font-size:0.65rem; font-weight:800; color:#0F172A; text-transform:uppercase;">
                  ${q.rfqId}
                </span>
                <div style="font-size:0.92rem; font-weight:900; color:var(--text-primary); margin-top:2px;">
                  ${q.craftItem}
                </div>
              </div>
              <span style="font-size:0.68rem; font-weight:800; background:#E2E8F0; color:#0F172A; padding:3px 8px; border-radius:var(--radius-pill);">
                ${q.status}
              </span>
            </div>

            <div style="font-size:0.72rem; color:var(--text-secondary); margin-bottom:10px;">
              Cooperative: <strong>${q.targetCluster}</strong>
            </div>

            <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:var(--radius-md); padding:10px; font-size:0.72rem; margin-bottom:12px; display:grid; grid-template-columns:1fr 1fr; gap:6px;">
              <div>Volume: <strong>${q.quantity} units</strong></div>
              <div>Rate: <strong>₹${q.quotedRatePerUnit} / unit</strong></div>
              <div>Delivery Target: <strong>${q.targetDeliveryDate}</strong></div>
              <div>Proforma No: <strong>${q.proformaToken}</strong></div>
              <div>Sample Status: <strong>${q.sampleStatus}</strong></div>
              <div style="color:#1E6B47; font-weight:800;">Total: ₹${q.totalEstimate.toLocaleString()} (Excl. 12% GST)</div>
            </div>

            <div style="display:flex; gap:8px;">
              <button type="button" class="btn-secondary" style="flex:1; padding:8px; font-size:0.74rem; font-weight:700;" onclick="window.downloadProforma('${q.rfqId}')">
                📥 Proforma PDF
              </button>
              <button type="button" class="btn-primary" style="flex:1.3; padding:8px; font-size:0.74rem; font-weight:800; background:#0F172A;" onclick="window.fundEscrow('${q.rfqId}', ${q.totalEstimate})">
                🔒 Fund Cooperative Escrow
              </button>
            </div>

          </div>
        `).join('')}
      </div>

    </div>
  `;
}

if (typeof window !== 'undefined') {
  window.downloadProforma = function(rfqId) {
    window.showToast?.(`📄 Generating GST Proforma Invoice PDF for ${rfqId}... Download ready.`);
  };

  window.fundEscrow = function(rfqId, total) {
    window.showToast?.(`🔒 Escrow gateway initialized for ₹${total.toLocaleString()}. Funds locked until delivery.`);
  };
}
