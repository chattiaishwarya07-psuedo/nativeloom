/**
 * Corporate / Institutional B2B Authentication Flow (Role: CORPORATE)
 * Business / GSTIN KYB (Know-Your-Business) Verification Flow
 * Provides access to wholesale clusters, tiered pricing, and formal RFQs.
 */

import { State, AccountType } from '../state.js';

export function renderCorporateAuthScreen(container) {
  container.innerHTML = `
    <div class="corporate-auth-screen animate-fade-in" style="padding: 16px 14px 32px; background: #FAF7F2; min-height: 100vh;">
      
      <!-- Top Step Meta Row -->
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
        <button type="button" class="header-btn" onclick="window.navigateToScreen('account_select')" style="display:flex; align-items:center; gap:4px; font-size:0.75rem; font-weight:700; color:var(--text-secondary); background:none; border:none; cursor:pointer;">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          Back to Roles
        </button>
        <span style="font-size:0.68rem; font-weight:800; color:#0F172A; letter-spacing:0.04em;">
          INSTITUTIONAL B2B KYB PORTAL
        </span>
      </div>

      <!-- Title & Headline -->
      <div style="margin-bottom:18px;">
        <h1 style="font-size:1.35rem; font-weight:900; color:var(--text-primary); margin:0 0 4px 0;">
          Corporate &amp; Institutional Access
        </h1>
        <p style="font-size:0.76rem; color:var(--text-secondary); margin:0; line-height:1.4;">
          Direct-from-cluster wholesale procurement for hotels, interior specifiers, architects, and corporate gifting houses.
        </p>
      </div>

      <!-- KYB Form Card -->
      <div style="background:#FFFFFF; border:1px solid var(--border-subtle); border-radius:var(--radius-xl); padding:18px 16px; box-shadow:var(--shadow-sm); margin-bottom:16px;">
        
        <!-- Company / Legal Entity Name -->
        <label style="display:block; font-size:0.74rem; font-weight:800; color:var(--text-primary); margin-bottom:6px;">
          LEGAL COMPANY / INSTITUTION NAME
        </label>
        <div style="display:flex; align-items:center; background:#FAF7F2; border:1px solid var(--border-subtle); border-radius:var(--radius-md); padding:10px 12px; gap:8px; margin-bottom:14px;">
          <span style="font-size:0.9rem;">🏢</span>
          <input type="text" id="input-corp-name" value="Vistara Hospitality &amp; Resorts Ltd." style="flex:1; border:none; background:transparent; outline:none; font-size:0.88rem; font-weight:700; color:var(--text-primary);">
        </div>

        <!-- GSTIN Verification Field with Live Green Validation Badge -->
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
          <label style="font-size:0.74rem; font-weight:800; color:var(--text-primary);">
            GSTIN VERIFICATION (B2B TAX INVOICING)
          </label>
          <span style="background:#E7F4ED; color:#1E6B47; font-size:0.65rem; font-weight:800; padding:2px 8px; border-radius:var(--radius-pill); border:1px solid #B7DFCA;">
            GST Validated ✓
          </span>
        </div>
        <div style="display:flex; align-items:center; background:#FAF7F2; border:1.5px solid #1E6B47; border-radius:var(--radius-md); padding:10px 12px; gap:8px; margin-bottom:14px;">
          <span style="font-size:0.9rem;">📑</span>
          <input type="text" id="input-corp-gst" value="09AAACV4920K1ZX" style="flex:1; border:none; background:transparent; outline:none; font-size:0.9rem; font-weight:800; letter-spacing:0.04em; color:#174332;">
        </div>

        <!-- Business Type -->
        <label style="display:block; font-size:0.74rem; font-weight:800; color:var(--text-primary); margin-bottom:6px;">
          INDUSTRY / PROCUREMENT PURPOSE
        </label>
        <div style="display:flex; align-items:center; background:#FAF7F2; border:1px solid var(--border-subtle); border-radius:var(--radius-md); padding:10px 12px; gap:8px; margin-bottom:14px;">
          <span style="font-size:0.9rem;">🏷️</span>
          <select id="select-corp-category" style="flex:1; border:none; background:transparent; outline:none; font-size:0.85rem; font-weight:700; color:var(--text-primary);">
            <option>Hospitality &amp; Boutique Hotel Furnishing</option>
            <option>Architectural &amp; Interior Decor Specifier</option>
            <option>Corporate Diwali &amp; Annual Gifting</option>
            <option>Museum / Heritage Gift Shop Procurement</option>
            <option>Handicraft Export House</option>
          </select>
        </div>

        <!-- Authorized Procurement Contact -->
        <label style="display:block; font-size:0.74rem; font-weight:800; color:var(--text-primary); margin-bottom:6px;">
          AUTHORIZED PROCUREMENT OFFICER PHONE
        </label>
        <div style="display:flex; align-items:center; background:#FAF7F2; border:1px solid var(--border-subtle); border-radius:var(--radius-md); padding:10px 12px; gap:8px; margin-bottom:18px;">
          <span style="font-size:0.9rem; font-weight:800; color:#0F172A;">🇮🇳 +91</span>
          <input type="tel" id="input-corp-phone" value="98112 04921" style="flex:1; border:none; background:transparent; outline:none; font-size:0.95rem; font-weight:800; color:var(--text-primary);">
        </div>

        <!-- Submit Button -->
        <button type="button" class="btn-primary" id="btn-submit-corp-auth" style="width:100%; background:#0F172A; color:#FFFFFF; border:none; padding:14px; font-size:0.9rem; font-weight:800; border-radius:var(--radius-md); cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px;">
          <span>Verify KYB &amp; Enter Wholesale Portal →</span>
        </button>

      </div>

      <!-- KYB Security Clearance Box -->
      <div style="background:#EFF6FF; border:1px solid #BFDBFE; border-radius:var(--radius-md); padding:10px 12px; display:flex; align-items:center; gap:10px;">
        <span style="font-size:1.2rem;">🏛️</span>
        <div style="font-size:0.72rem; color:#1E40AF; line-height:1.35;">
          <strong>Institutional Cooperative Escrow:</strong> Tiered wholesale volume pricing is backed by direct craft cooperative agreements and official GST tax credits.
        </div>
      </div>

    </div>
  `;

  // Submit Handler
  container.querySelector('#btn-submit-corp-auth').addEventListener('click', () => {
    window.showToast?.("KYB Cleared: Vistara Hospitality B2B wholesale portal unlocked.");
    State.loginAs(AccountType.CORPORATE, {
      companyName: 'Vistara Hospitality & Resorts Ltd.',
      gstin: '09AAACV4920K1ZX',
      officer: 'Siddharth Sen'
    });
  });
}
