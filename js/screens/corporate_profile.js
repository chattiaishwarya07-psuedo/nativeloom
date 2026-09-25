/**
 * Corporate Screen: Institutional B2B Profile & KYB Compliance
 * (Role: CORPORATE only - company procurement details and explicit role logout)
 */

import { State } from '../state.js';

export function renderCorporateProfileScreen(container) {
  const company = State.corporate.company;

  container.innerHTML = `
    <div class="corporate-profile-screen animate-fade-in" style="padding-bottom: 35px;">
      
      <!-- Top Title -->
      <div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:4px;">
        <h1 style="font-size:1.25rem; font-weight:900; color:var(--text-primary); margin:0;">
          Institutional Account
        </h1>
        <span style="font-size:0.75rem; font-weight:800; color:#0F172A;">B2B Verified</span>
      </div>
      <p style="font-size:0.75rem; color:var(--text-secondary); margin:0 0 16px 0; line-height:1.35;">
        Registered corporate buyer profile with enterprise billing, tax deduction certificates, and cluster escrow authorization.
      </p>

      <!-- Company Identity Card -->
      <div style="background:#FFFFFF; border:1px solid var(--border-subtle); border-radius:var(--radius-xl); padding:16px; box-shadow:var(--shadow-sm); margin-bottom:14px;">
        <div style="display:flex; align-items:center; gap:12px; margin-bottom:12px;">
          <div style="width:48px; height:48px; border-radius:12px; background:#0F172A; color:#FFFFFF; display:flex; align-items:center; justify-content:center; font-size:1.3rem; font-weight:900;">
            🏢
          </div>
          <div>
            <div style="font-size:1rem; font-weight:900; color:var(--text-primary);">${company.name}</div>
            <div style="font-size:0.72rem; color:var(--text-secondary);">${company.tradeName} • ${company.businessType}</div>
          </div>
        </div>

        <div style="display:flex; align-items:center; gap:6px; background:#DCFCE7; border:1px solid #86EFAC; border-radius:var(--radius-md); padding:6px 10px; margin-bottom:12px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16A34A" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          <span style="font-size:0.72rem; font-weight:800; color:#16A34A;">
            ${company.kybStatus}
          </span>
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; font-size:0.74rem;">
          <div style="background:#F8FAFC; padding:8px 10px; border-radius:6px;">
            <div style="font-size:0.65rem; color:var(--text-muted); font-weight:700;">GSTIN (Verified)</div>
            <div style="font-weight:800; color:#0F172A;">${company.gstin}</div>
          </div>
          <div style="background:#F8FAFC; padding:8px 10px; border-radius:6px;">
            <div style="font-size:0.65rem; color:var(--text-muted); font-weight:700;">Corporate PAN</div>
            <div style="font-weight:800; color:#0F172A;">${company.pan}</div>
          </div>
        </div>
      </div>

      <!-- Procurement Officer Details -->
      <div style="background:#FFFFFF; border:1px solid var(--border-subtle); border-radius:var(--radius-xl); padding:14px; box-shadow:var(--shadow-sm); margin-bottom:14px;">
        <div style="font-size:0.78rem; font-weight:900; color:var(--text-primary); margin-bottom:8px;">
          Designated Procurement Officer
        </div>
        <div style="font-size:0.75rem; color:var(--text-secondary); line-height:1.6;">
          <div>Officer: <strong>${company.procurementOfficer}</strong></div>
          <div>Official Email: <strong>${company.workEmail}</strong></div>
          <div>Phone: <strong>${company.phone}</strong></div>
          <div>Registered HQ: <strong>Vistara Tower, Cyber City, Gurugram, HR</strong></div>
        </div>
      </div>

      <!-- Institutional Benefits & GST Credit -->
      <div style="background:#FAF7F2; border:1px solid var(--border-subtle); border-radius:var(--radius-xl); padding:14px; margin-bottom:20px;">
        <div style="font-size:0.78rem; font-weight:900; color:var(--text-primary); margin-bottom:8px;">
          Cooperative Direct Sourcing Privileges
        </div>
        <div style="display:flex; flex-direction:column; gap:6px; font-size:0.72rem; color:var(--text-secondary);">
          <div>✅ Direct B2B volume pricing with zero middlemen margin</div>
          <div>✅ Automated GSTR-2B input tax reconciliation</div>
          <div>✅ 100% money-back escrow until batch inspection</div>
          <div>✅ Customized GI certification seal on packaging</div>
        </div>
      </div>

      <!-- Explicit Role Logout Button (Mandatory for role change) -->
      <div style="border-top:1px solid var(--border-subtle); padding-top:16px;">
        <button type="button" class="btn-secondary" style="width:100%; padding:12px; font-size:0.82rem; font-weight:800; color:#DC2626; border-color:#FCA5A5; background:#FEF2F2;" onclick="window.corporateLogout()">
          🚪 Log Out &amp; Switch Account
        </button>
        <p style="font-size:0.68rem; color:var(--text-muted); text-align:center; margin-top:8px;">
          You are authenticated as Corporate Buyer. To switch to Artisan or Patron, you must log out first.
        </p>
      </div>

    </div>
  `;
}

if (typeof window !== 'undefined') {
  window.corporateLogout = function() {
    if (confirm("Are you sure you want to log out of your Corporate Buyer account?")) {
      State.logout();
      window.showToast?.("🚪 Successfully logged out of Corporate session");
    }
  };
}
