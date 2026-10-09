/**
 * Corporate Screen: Institutional B2B Profile & KYB Compliance
 * (Role: CORPORATE only - company procurement details and explicit role logout)
 */

import { State } from '../state.js';

export function openEditCorporateModal(container, initialFocus = 'company') {
  const existing = document.getElementById('modal-edit-corporate');
  if (existing) existing.remove();

  const company = State.corporate.company;

  const modal = document.createElement('div');
  modal.id = 'modal-edit-corporate';
  modal.className = 'modal-overlay active';

  modal.innerHTML = `
    <div class="bottom-sheet animate-slide-up" style="max-height:92vh; width:100%; max-width:480px; overflow-y:auto; background:#FAF7F2; border-radius:22px 22px 0 0; padding:16px 18px 28px; box-sizing:border-box;">

      <!-- Drag Handle -->
      <div style="width:36px; height:4px; background:#D6C7B2; border-radius:2px; margin:0 auto 12px;"></div>

      <!-- Sheet Header -->
      <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:14px;">
        <div style="display:flex; align-items:center; gap:10px;">
          <div style="width:36px; height:36px; border-radius:10px; background:#E2E8F0; color:#0F172A; display:flex; align-items:center; justify-content:center; font-size:1.15rem; flex-shrink:0;">
            🏢
          </div>
          <div>
            <div style="font-size:1.05rem; font-weight:900; color:#0F172A; line-height:1.2;">Edit Institutional Profile</div>
            <div style="font-size:0.7rem; color:#64748B;">Corporate identity, KYB tax details &amp; procurement contact</div>
          </div>
        </div>

        <button type="button" id="btn-close-edit-corporate" style="background:#ECE5DC; border:none; border-radius:50%; width:28px; height:28px; display:flex; align-items:center; justify-content:center; cursor:pointer; color:#1C1917; font-weight:700; font-size:0.9rem;">
          ✕
        </button>
      </div>

      <!-- Form -->
      <form id="form-edit-corporate" style="display:flex; flex-direction:column; gap:12px;">

        <!-- Section: Corporate Identity -->
        <div style="background:#FFFFFF; border:1px solid #CBD5E1; border-radius:14px; padding:14px;">
          <div style="font-size:0.78rem; font-weight:900; color:#0F172A; text-transform:uppercase; letter-spacing:0.04em; margin-bottom:10px; display:flex; align-items:center; gap:6px;">
            <span>🏢</span>
            <span>Corporate Identity &amp; Tax</span>
          </div>

          <div style="display:flex; flex-direction:column; gap:10px;">
            <div>
              <label style="font-size:0.7rem; font-weight:800; color:#475569; display:block; margin-bottom:4px;">Legal Registered Entity *</label>
              <input type="text" id="edit-corp-name" required value="${company.name || ''}" placeholder="e.g. Vistara Hospitality & Resorts Ltd." style="width:100%; border:1px solid #CBD5E1; border-radius:8px; padding:8px 10px; font-size:0.82rem; font-weight:700; color:#0F172A; background:#FFFDFB; outline:none; box-sizing:border-box;">
            </div>

            <div style="display:grid; grid-template-columns:1fr 1.2fr; gap:8px;">
              <div>
                <label style="font-size:0.7rem; font-weight:800; color:#475569; display:block; margin-bottom:4px;">Trade Name *</label>
                <input type="text" id="edit-corp-tradename" required value="${company.tradeName || ''}" placeholder="e.g. Vistara Hotels" style="width:100%; border:1px solid #CBD5E1; border-radius:8px; padding:8px 10px; font-size:0.82rem; font-weight:700; color:#0F172A; background:#FFFDFB; outline:none; box-sizing:border-box;">
              </div>
              <div>
                <label style="font-size:0.7rem; font-weight:800; color:#475569; display:block; margin-bottom:4px;">Industry / Category *</label>
                <input type="text" id="edit-corp-businesstype" required value="${company.businessType || ''}" placeholder="e.g. Boutique Hotel & Interior Specifier" style="width:100%; border:1px solid #CBD5E1; border-radius:8px; padding:8px 10px; font-size:0.82rem; font-weight:700; color:#0F172A; background:#FFFDFB; outline:none; box-sizing:border-box;">
              </div>
            </div>

            <div style="display:grid; grid-template-columns:1.2fr 1fr; gap:8px;">
              <div>
                <label style="font-size:0.7rem; font-weight:800; color:#475569; display:block; margin-bottom:4px;">GSTIN (Verified) *</label>
                <input type="text" id="edit-corp-gstin" required maxlength="15" value="${company.gstin || ''}" placeholder="15-digit GSTIN" style="width:100%; border:1px solid #CBD5E1; border-radius:8px; padding:8px 10px; font-size:0.82rem; font-weight:800; color:#0F172A; background:#FFFDFB; outline:none; box-sizing:border-box; text-transform:uppercase;">
              </div>
              <div>
                <label style="font-size:0.7rem; font-weight:800; color:#475569; display:block; margin-bottom:4px;">Corporate PAN *</label>
                <input type="text" id="edit-corp-pan" required maxlength="10" value="${company.pan || ''}" placeholder="10-digit PAN" style="width:100%; border:1px solid #CBD5E1; border-radius:8px; padding:8px 10px; font-size:0.82rem; font-weight:800; color:#0F172A; background:#FFFDFB; outline:none; box-sizing:border-box; text-transform:uppercase;">
              </div>
            </div>
          </div>
        </div>

        <!-- Section: Procurement Officer & HQ -->
        <div style="background:#FFFFFF; border:1px solid #CBD5E1; border-radius:14px; padding:14px;">
          <div style="font-size:0.78rem; font-weight:900; color:#0F172A; text-transform:uppercase; letter-spacing:0.04em; margin-bottom:10px; display:flex; align-items:center; gap:6px;">
            <span>👔</span>
            <span>Designated Procurement Officer</span>
          </div>

          <div style="display:flex; flex-direction:column; gap:10px;">
            <div>
              <label style="font-size:0.7rem; font-weight:800; color:#475569; display:block; margin-bottom:4px;">Officer Full Name *</label>
              <input type="text" id="edit-corp-officer" required value="${company.procurementOfficer || ''}" placeholder="e.g. Siddharth Sen" style="width:100%; border:1px solid #CBD5E1; border-radius:8px; padding:8px 10px; font-size:0.82rem; font-weight:700; color:#0F172A; background:#FFFDFB; outline:none; box-sizing:border-box;">
            </div>

            <div style="display:grid; grid-template-columns:1.2fr 1fr; gap:8px;">
              <div>
                <label style="font-size:0.7rem; font-weight:800; color:#475569; display:block; margin-bottom:4px;">Official Work Email *</label>
                <input type="email" id="edit-corp-email" required value="${company.workEmail || ''}" placeholder="e.g. procurement@vistarahotels.in" style="width:100%; border:1px solid #CBD5E1; border-radius:8px; padding:8px 10px; font-size:0.82rem; font-weight:700; color:#0F172A; background:#FFFDFB; outline:none; box-sizing:border-box;">
              </div>
              <div>
                <label style="font-size:0.7rem; font-weight:800; color:#475569; display:block; margin-bottom:4px;">Phone Number *</label>
                <input type="tel" id="edit-corp-phone" required value="${company.phone || ''}" placeholder="e.g. +91 98112 04921" style="width:100%; border:1px solid #CBD5E1; border-radius:8px; padding:8px 10px; font-size:0.82rem; font-weight:700; color:#0F172A; background:#FFFDFB; outline:none; box-sizing:border-box;">
              </div>
            </div>

            <div>
              <label style="font-size:0.7rem; font-weight:800; color:#475569; display:block; margin-bottom:4px;">Registered HQ Address *</label>
              <input type="text" id="edit-corp-hq" required value="${company.registeredHq || 'Vistara Tower, Cyber City, Gurugram, HR'}" placeholder="e.g. Vistara Tower, Cyber City, Gurugram, HR" style="width:100%; border:1px solid #CBD5E1; border-radius:8px; padding:8px 10px; font-size:0.82rem; font-weight:700; color:#0F172A; background:#FFFDFB; outline:none; box-sizing:border-box;">
            </div>
          </div>
        </div>

        <!-- Submit & Cancel Actions -->
        <div style="display:flex; gap:10px; margin-top:8px;">
          <button type="button" id="btn-cancel-edit-corp" class="btn-secondary" style="flex:1; padding:11px; font-size:0.82rem; font-weight:800;">
            Cancel
          </button>
          <button type="submit" class="btn-primary" style="flex:2; background:#0F172A; color:#FFFFFF; padding:11px; font-size:0.82rem; font-weight:800; display:flex; align-items:center; justify-content:center; gap:6px;">
            <span>💾 Save Corporate Profile</span>
          </button>
        </div>

      </form>
    </div>
  `;

  document.body.appendChild(modal);

  const close = () => {
    modal.classList.remove('active');
    setTimeout(() => modal.remove(), 250);
  };

  modal.querySelector('#btn-close-edit-corporate')?.addEventListener('click', close);
  modal.querySelector('#btn-cancel-edit-corp')?.addEventListener('click', close);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) close();
  });

  if (initialFocus === 'officer') {
    modal.querySelector('#edit-corp-officer')?.focus();
  } else {
    modal.querySelector('#edit-corp-name')?.focus();
  }

  // Handle save
  modal.querySelector('#form-edit-corporate')?.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = modal.querySelector('#edit-corp-name')?.value.trim();
    const tradeName = modal.querySelector('#edit-corp-tradename')?.value.trim();
    const businessType = modal.querySelector('#edit-corp-businesstype')?.value.trim();
    const gstin = modal.querySelector('#edit-corp-gstin')?.value.trim();
    const pan = modal.querySelector('#edit-corp-pan')?.value.trim();
    const procurementOfficer = modal.querySelector('#edit-corp-officer')?.value.trim();
    const workEmail = modal.querySelector('#edit-corp-email')?.value.trim();
    const phone = modal.querySelector('#edit-corp-phone')?.value.trim();
    const registeredHq = modal.querySelector('#edit-corp-hq')?.value.trim();

    State.updateCorporateProfile({
      name,
      tradeName,
      businessType,
      gstin,
      pan,
      procurementOfficer,
      workEmail,
      phone,
      registeredHq
    });

    window.showToast?.("✓ Institutional B2B profile updated successfully!");
    close();
    renderCorporateProfileScreen(container);
  });
}

export function renderCorporateProfileScreen(container) {
  const company = State.corporate.company;

  container.innerHTML = `
    <div class="corporate-profile-screen animate-fade-in" style="padding-bottom: 35px;">

      <!-- Top Title -->
      <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
        <div>
          <div style="display:flex; align-items:center; gap:8px;">
            <h1 style="font-size:1.25rem; font-weight:900; color:var(--text-primary); margin:0;">
              Institutional Account
            </h1>
            <span style="font-size:0.7rem; font-weight:800; color:#0F172A; background:#E2E8F0; padding:2px 8px; border-radius:9999px;">B2B Verified</span>
          </div>
          <p style="font-size:0.75rem; color:var(--text-secondary); margin:4px 0 0 0; line-height:1.35;">
            Registered corporate buyer profile with enterprise billing, tax deduction certificates, and cluster escrow authorization.
          </p>
        </div>
        <button type="button" id="btn-edit-corporate-main" style="background:#F1F5F9; color:#0F172A; border:1.5px solid #CBD5E1; border-radius:8px; padding:6px 12px; font-size:0.75rem; font-weight:800; cursor:pointer; display:inline-flex; align-items:center; gap:5px; box-shadow:0 1px 3px rgba(15,23,42,0.08); flex-shrink:0;">
          <span>✏️</span>
          <span>Edit Details</span>
        </button>
      </div>

      <!-- Company Identity Card -->
      <div style="background:#FFFFFF; border:1px solid var(--border-subtle); border-radius:var(--radius-xl); padding:16px; box-shadow:var(--shadow-sm); margin-bottom:14px; margin-top:14px;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:12px;">
          <div style="display:flex; align-items:center; gap:12px;">
            <div style="width:48px; height:48px; border-radius:12px; background:#0F172A; color:#FFFFFF; display:flex; align-items:center; justify-content:center; font-size:1.3rem; font-weight:900;">
              🏢
            </div>
            <div>
              <div style="font-size:1rem; font-weight:900; color:var(--text-primary);">${company.name}</div>
              <div style="font-size:0.72rem; color:var(--text-secondary);">${company.tradeName} • ${company.businessType}</div>
            </div>
          </div>
          <button type="button" id="btn-edit-company-card" style="background:#F1F5F9; color:#0F172A; border:1px solid #CBD5E1; border-radius:6px; padding:3px 8px; font-size:0.68rem; font-weight:800; cursor:pointer; display:inline-flex; align-items:center; gap:4px;">
            <span>✏️</span>
            <span>Edit</span>
          </button>
        </div>

        <div style="display:flex; align-items:center; gap:6px; background:#DCFCE7; border:1px solid #86EFAC; border-radius:var(--radius-md); padding:6px 10px; margin-bottom:12px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
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
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <div style="font-size:0.78rem; font-weight:900; color:var(--text-primary);">
            Designated Procurement Officer
          </div>
          <button type="button" id="btn-edit-officer-card" style="background:#F1F5F9; color:#0F172A; border:1px solid #CBD5E1; border-radius:6px; padding:3px 8px; font-size:0.68rem; font-weight:800; cursor:pointer; display:inline-flex; align-items:center; gap:4px;">
            <span>✏️</span>
            <span>Edit</span>
          </button>
        </div>
        <div style="font-size:0.75rem; color:var(--text-secondary); line-height:1.6;">
          <div>Officer: <strong>${company.procurementOfficer}</strong></div>
          <div>Official Email: <strong>${company.workEmail}</strong></div>
          <div>Phone: <strong>${company.phone}</strong></div>
          <div>Registered HQ: <strong>${company.registeredHq || 'Vistara Tower, Cyber City, Gurugram, HR'}</strong></div>
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

  // Attach edit handlers
  container.querySelector('#btn-edit-corporate-main')?.addEventListener('click', () => {
    openEditCorporateModal(container, 'company');
  });
  container.querySelector('#btn-edit-company-card')?.addEventListener('click', () => {
    openEditCorporateModal(container, 'company');
  });
  container.querySelector('#btn-edit-officer-card')?.addEventListener('click', () => {
    openEditCorporateModal(container, 'officer');
  });
}

if (typeof window !== 'undefined') {
  window.corporateLogout = function() {
    if (confirm("Are you sure you want to log out of your Corporate Buyer account?")) {
      State.logout();
      window.showToast?.("🚪 Successfully logged out of Corporate session");
    }
  };
}
