/**
 * Artisan Screen: Personal Details & Logout
 * Simple English, clear personal details, and direct logout button.
 */

import { State } from '../state.js';

export function openEditArtisanModal(container, initialFocus = 'personal') {
  const existing = document.getElementById('modal-edit-artisan');
  if (existing) existing.remove();

  const a = State.artisan;

  const modal = document.createElement('div');
  modal.id = 'modal-edit-artisan';
  modal.className = 'modal-overlay active';

  modal.innerHTML = `
    <div class="bottom-sheet animate-slide-up" style="max-height:92vh; width:100%; max-width:480px; overflow-y:auto; background:#FAF7F2; border-radius:22px 22px 0 0; padding:16px 18px 28px; box-sizing:border-box;">

      <!-- Drag Handle -->
      <div style="width:36px; height:4px; background:#D6C7B2; border-radius:2px; margin:0 auto 12px;"></div>

      <!-- Sheet Header -->
      <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:14px;">
        <div style="display:flex; align-items:center; gap:10px;">
          <div style="width:36px; height:36px; border-radius:10px; background:#FEECE5; color:#7A2813; display:flex; align-items:center; justify-content:center; font-size:1.15rem; flex-shrink:0;">
            ✏️
          </div>
          <div>
            <div style="font-size:1.05rem; font-weight:900; color:#1C1917; line-height:1.2;">Edit Artisan Details</div>
            <div style="font-size:0.7rem; color:#78716C;">Pehchan ID: ${a.pehchanId} • GI Cluster Verified</div>
          </div>
        </div>

        <button type="button" id="btn-close-edit-artisan" style="background:#ECE5DC; border:none; border-radius:50%; width:28px; height:28px; display:flex; align-items:center; justify-content:center; cursor:pointer; color:#1C1917; font-weight:700; font-size:0.9rem;">
          ✕
        </button>
      </div>

      <!-- Form -->
      <form id="form-edit-artisan" style="display:flex; flex-direction:column; gap:12px;">

        <!-- Section: Personal Details -->
        <div style="background:#FFFFFF; border:1px solid #EADBCE; border-radius:14px; padding:14px;">
          <div style="font-size:0.78rem; font-weight:900; color:#7A2813; text-transform:uppercase; letter-spacing:0.04em; margin-bottom:10px; display:flex; align-items:center; gap:6px;">
            <span>👤</span>
            <span>Personal &amp; Studio Info</span>
          </div>

          <div style="display:flex; flex-direction:column; gap:10px;">
            <div>
              <label style="font-size:0.7rem; font-weight:800; color:#57534E; display:block; margin-bottom:4px;">Full Name *</label>
              <input type="text" id="edit-artisan-name" required value="${a.artisanName || ''}" placeholder="e.g. Ramdev Kumhar" style="width:100%; border:1px solid #D8CFC4; border-radius:8px; padding:8px 10px; font-size:0.82rem; font-weight:700; color:#1C1917; background:#FFFDFB; outline:none; box-sizing:border-box;">
            </div>

            <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
              <div>
                <label style="font-size:0.7rem; font-weight:800; color:#57534E; display:block; margin-bottom:4px;">Mobile Number *</label>
                <input type="tel" id="edit-artisan-phone" required value="${a.phone || ''}" placeholder="e.g. +91 98391 42910" style="width:100%; border:1px solid #D8CFC4; border-radius:8px; padding:8px 10px; font-size:0.82rem; font-weight:700; color:#1C1917; background:#FFFDFB; outline:none; box-sizing:border-box;">
              </div>
              <div>
                <label style="font-size:0.7rem; font-weight:800; color:#57534E; display:block; margin-bottom:4px;">Language(s) *</label>
                <input type="text" id="edit-artisan-language" required value="${a.language || ''}" placeholder="e.g. Bhojpuri & Hindi" style="width:100%; border:1px solid #D8CFC4; border-radius:8px; padding:8px 10px; font-size:0.82rem; font-weight:700; color:#1C1917; background:#FFFDFB; outline:none; box-sizing:border-box;">
              </div>
            </div>

            <div>
              <label style="font-size:0.7rem; font-weight:800; color:#57534E; display:block; margin-bottom:4px;">Studio Address *</label>
              <textarea id="edit-artisan-address" rows="2" required placeholder="Workshop/Studio address" style="width:100%; border:1px solid #D8CFC4; border-radius:8px; padding:8px 10px; font-size:0.82rem; font-weight:700; color:#1C1917; background:#FFFDFB; outline:none; box-sizing:border-box; resize:vertical;">${a.studioAddress || ''}</textarea>
            </div>

            <div style="display:grid; grid-template-columns:1.2fr 1fr; gap:8px;">
              <div>
                <label style="font-size:0.7rem; font-weight:800; color:#57534E; display:block; margin-bottom:4px;">Craft Skill *</label>
                <input type="text" id="edit-artisan-skill" required value="${a.craftSkill || ''}" placeholder="e.g. Terracotta Clay Pottery" style="width:100%; border:1px solid #D8CFC4; border-radius:8px; padding:8px 10px; font-size:0.82rem; font-weight:700; color:#1C1917; background:#FFFDFB; outline:none; box-sizing:border-box;">
              </div>
              <div>
                <label style="font-size:0.7rem; font-weight:800; color:#57534E; display:block; margin-bottom:4px;">Experience *</label>
                <input type="text" id="edit-artisan-experience" required value="${a.experience || ''}" placeholder="e.g. 35 Years" style="width:100%; border:1px solid #D8CFC4; border-radius:8px; padding:8px 10px; font-size:0.82rem; font-weight:700; color:#1C1917; background:#FFFDFB; outline:none; box-sizing:border-box;">
              </div>
            </div>
          </div>
        </div>

        <!-- Section: Bank Account Details -->
        <div style="background:#FFFFFF; border:1px solid #EADBCE; border-radius:14px; padding:14px;">
          <div style="font-size:0.78rem; font-weight:900; color:#1E6B47; text-transform:uppercase; letter-spacing:0.04em; margin-bottom:10px; display:flex; align-items:center; gap:6px;">
            <span>🏦</span>
            <span>Linked Bank Account (Direct DBT)</span>
          </div>

          <div style="display:flex; flex-direction:column; gap:10px;">
            <div>
              <label style="font-size:0.7rem; font-weight:800; color:#57534E; display:block; margin-bottom:4px;">Bank Name *</label>
              <input type="text" id="edit-artisan-bank-name" required value="${a.bankName || ''}" placeholder="e.g. Bank of Baroda" style="width:100%; border:1px solid #D8CFC4; border-radius:8px; padding:8px 10px; font-size:0.82rem; font-weight:700; color:#1C1917; background:#FFFDFB; outline:none; box-sizing:border-box;">
            </div>

            <div style="display:grid; grid-template-columns:1.2fr 1fr; gap:8px;">
              <div>
                <label style="font-size:0.7rem; font-weight:800; color:#57534E; display:block; margin-bottom:4px;">Account Number *</label>
                <input type="text" id="edit-artisan-bank-account" required value="${a.bankAccount || '984012948201'}" placeholder="Account Number" style="width:100%; border:1px solid #D8CFC4; border-radius:8px; padding:8px 10px; font-size:0.82rem; font-weight:700; color:#1C1917; background:#FFFDFB; outline:none; box-sizing:border-box;">
              </div>
              <div>
                <label style="font-size:0.7rem; font-weight:800; color:#57534E; display:block; margin-bottom:4px;">IFSC Code *</label>
                <input type="text" id="edit-artisan-ifsc" required value="${a.ifsc || ''}" placeholder="e.g. BARB0VARANA" style="width:100%; border:1px solid #D8CFC4; border-radius:8px; padding:8px 10px; font-size:0.82rem; font-weight:800; color:#1C1917; background:#FFFDFB; outline:none; box-sizing:border-box; text-transform:uppercase;">
              </div>
            </div>
          </div>
        </div>

        <!-- Submit & Cancel Actions -->
        <div style="display:flex; gap:10px; margin-top:8px;">
          <button type="button" id="btn-cancel-edit-artisan" class="btn-secondary" style="flex:1; padding:11px; font-size:0.82rem; font-weight:800;">
            Cancel
          </button>
          <button type="submit" class="btn-primary" style="flex:2; background:#7A2813; padding:11px; font-size:0.82rem; font-weight:800; display:flex; align-items:center; justify-content:center; gap:6px;">
            <span>💾 Save Profile Changes</span>
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

  modal.querySelector('#btn-close-edit-artisan')?.addEventListener('click', close);
  modal.querySelector('#btn-cancel-edit-artisan')?.addEventListener('click', close);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) close();
  });

  if (initialFocus === 'bank') {
    modal.querySelector('#edit-artisan-bank-name')?.focus();
  } else {
    modal.querySelector('#edit-artisan-name')?.focus();
  }

  // Handle save
  modal.querySelector('#form-edit-artisan')?.addEventListener('submit', (e) => {
    e.preventDefault();

    const artisanName = modal.querySelector('#edit-artisan-name')?.value.trim();
    const phone = modal.querySelector('#edit-artisan-phone')?.value.trim();
    const language = modal.querySelector('#edit-artisan-language')?.value.trim();
    const studioAddress = modal.querySelector('#edit-artisan-address')?.value.trim();
    const craftSkill = modal.querySelector('#edit-artisan-skill')?.value.trim();
    const experience = modal.querySelector('#edit-artisan-experience')?.value.trim();
    const bankName = modal.querySelector('#edit-artisan-bank-name')?.value.trim();
    const bankAccount = modal.querySelector('#edit-artisan-bank-account')?.value.trim();
    const ifsc = modal.querySelector('#edit-artisan-ifsc')?.value.trim();

    State.updateArtisanProfile({
      artisanName,
      phone,
      language,
      studioAddress,
      craftSkill,
      experience,
      bankName,
      bankAccount,
      ifsc
    });

    window.showToast?.("✓ Artisan details updated successfully!");
    close();
    renderArtisanProfileScreen(container);
  });
}

export function renderArtisanProfileScreen(container) {
  const a = State.artisan;

  container.innerHTML = `
    <div class="artisan-profile-screen animate-fade-in" style="padding-bottom: 30px;">

      <!-- Top Title -->
      <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:14px;">
        <div>
          <h1 style="font-size:1.25rem; font-weight:900; color:var(--text-primary); margin:0 0 4px 0;">
            Artisan Profile
          </h1>
          <p style="font-size:0.75rem; color:var(--text-secondary); margin:0;">
            Your registered artisan details and account settings.
          </p>
        </div>
        <button type="button" id="btn-edit-artisan-main" style="background:#FFF3EB; color:#7A2813; border:1.5px solid #FCD7C2; border-radius:8px; padding:6px 12px; font-size:0.75rem; font-weight:800; cursor:pointer; display:inline-flex; align-items:center; gap:5px; box-shadow:0 1px 3px rgba(122,40,19,0.1);">
          <span>✏️</span>
          <span>Edit Details</span>
        </button>
      </div>

      <!-- Identity Card with Photo -->
      <div style="background:linear-gradient(135deg, #174332 0%, #1E6B47 100%); color:#FFFFFF; border-radius:var(--radius-xl); padding:16px; margin-bottom:14px; box-shadow:0 4px 12px rgba(23,67,50,0.25);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
          <div style="font-size:0.68rem; font-weight:800; letter-spacing:0.08em; opacity:0.9;">
            MINISTRY OF TEXTILES • GOVT OF INDIA
          </div>
          <span style="background:rgba(255,255,255,0.25); padding:2px 8px; border-radius:10px; font-size:0.62rem; font-weight:800;">
            ✓ VERIFIED
          </span>
        </div>

        <div style="display:flex; gap:12px; align-items:center; margin-bottom:12px;">
          <img src="/assets/artisan_ramulu.jpg" alt="${a.artisanName}" style="width:60px; height:60px; border-radius:12px; object-fit:cover; border:2px solid #FFFFFF;" onerror="this.src='/assets/artisan_budhram.jpg'">
          <div>
            <div style="font-size:1.15rem; font-weight:900; line-height:1.2;">${a.artisanName}</div>
            <div style="font-size:0.75rem; opacity:0.9; margin-top:2px;">${a.craftSkill || 'Master Potter & Clay Sculptor'}</div>
            <div style="font-size:0.72rem; font-family:monospace; font-weight:700; opacity:0.9; margin-top:2px;">ID: ${a.pehchanId}</div>
          </div>
        </div>

        <div style="background:rgba(0,0,0,0.18); border-radius:8px; padding:8px 10px; font-size:0.7rem; display:flex; justify-content:space-between;">
          <span>GI Cluster: <strong>${a.cluster}</strong></span>
          <span>Tag: <strong>${a.giTag}</strong></span>
        </div>
      </div>

      <!-- Artisan Personal Details Card -->
      <div style="background:#FFFFFF; border:1px solid var(--border-subtle); border-radius:var(--radius-lg); padding:14px; margin-bottom:14px; box-shadow:var(--shadow-sm);">
        <div style="font-size:0.85rem; font-weight:800; color:var(--text-primary); margin-bottom:12px; display:flex; align-items:center; justify-content:space-between;">
          <div style="display:flex; align-items:center; gap:6px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            <span>Personal Details</span>
          </div>
          <button type="button" id="btn-edit-artisan-personal" style="background:#FFF3EB; color:#7A2813; border:1px solid #FCD7C2; border-radius:6px; padding:3px 8px; font-size:0.68rem; font-weight:800; cursor:pointer; display:inline-flex; align-items:center; gap:4px;">
            <span>✏️</span>
            <span>Edit</span>
          </button>
        </div>

        <div style="display:flex; flex-direction:column; gap:10px; font-size:0.75rem;">
          <div style="display:flex; justify-content:space-between; border-bottom:1px solid #F5F1EB; padding-bottom:8px;">
            <span style="color:var(--text-secondary);">Full Name</span>
            <span style="font-weight:700; color:var(--text-primary);">${a.artisanName}</span>
          </div>

          <div style="display:flex; justify-content:space-between; border-bottom:1px solid #F5F1EB; padding-bottom:8px;">
            <span style="color:var(--text-secondary);">Mobile Number</span>
            <span style="font-weight:700; color:var(--text-primary);">${a.phone || '+91 98391 42910'}</span>
          </div>

          <div style="display:flex; justify-content:space-between; border-bottom:1px solid #F5F1EB; padding-bottom:8px;">
            <span style="color:var(--text-secondary);">Studio Address</span>
            <span style="font-weight:700; color:var(--text-primary); text-align:right;">${a.studioAddress || 'Sarai Mohalla, Varanasi, UP - 221001'}</span>
          </div>

          <div style="display:flex; justify-content:space-between; border-bottom:1px solid #F5F1EB; padding-bottom:8px;">
            <span style="color:var(--text-secondary);">Craft Skill</span>
            <span style="font-weight:700; color:var(--text-primary);">${a.craftSkill || 'Terracotta Clay Pottery'}</span>
          </div>

          <div style="display:flex; justify-content:space-between; border-bottom:1px solid #F5F1EB; padding-bottom:8px;">
            <span style="color:var(--text-secondary);">Experience</span>
            <span style="font-weight:700; color:var(--text-primary);">${a.experience || '35 Years Experience'}</span>
          </div>

          <div style="display:flex; justify-content:space-between;">
            <span style="color:var(--text-secondary);">Language</span>
            <span style="font-weight:700; color:var(--text-primary);">${a.language || 'Bhojpuri & Hindi'}</span>
          </div>
        </div>
      </div>

      <!-- Bank Details (Direct DBT) -->
      <div style="background:#FFFFFF; border:1px solid var(--border-subtle); border-radius:var(--radius-lg); padding:14px; margin-bottom:14px; box-shadow:var(--shadow-sm);">
        <div style="font-size:0.85rem; font-weight:800; color:var(--text-primary); margin-bottom:12px; display:flex; align-items:center; justify-content:space-between;">
          <div style="display:flex; align-items:center; gap:6px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="3" y1="21" x2="21" y2="21"/><line x1="3" y1="10" x2="21" y2="10"/><polyline points="5 6 12 3 19 6"/><line x1="4" y1="10" x2="4" y2="21"/><line x1="20" y1="10" x2="20" y2="21"/><line x1="8" y1="14" x2="8" y2="17"/><line x1="12" y1="14" x2="12" y2="17"/><line x1="16" y1="14" x2="16" y2="17"/>
            </svg>
            <span>Linked Bank Account</span>
          </div>
          <div style="display:flex; align-items:center; gap:6px;">
            <span style="background:#E7F4ED; color:#1E6B47; font-size:0.62rem; font-weight:800; padding:2px 8px; border-radius:10px;">
              DBT Active
            </span>
            <button type="button" id="btn-edit-artisan-bank" style="background:#F0FDF4; color:#1E6B47; border:1px solid #BBF7D0; border-radius:6px; padding:3px 8px; font-size:0.68rem; font-weight:800; cursor:pointer; display:inline-flex; align-items:center; gap:4px;">
              <span>✏️</span>
              <span>Edit</span>
            </button>
          </div>
        </div>

        <div style="display:flex; flex-direction:column; gap:8px; font-size:0.75rem;">
          <div style="display:flex; justify-content:space-between;">
            <span style="color:var(--text-secondary);">Bank Name</span>
            <span style="font-weight:700; color:var(--text-primary);">${a.bankName || 'Bank of Baroda'}</span>
          </div>
          <div style="display:flex; justify-content:space-between;">
            <span style="color:var(--text-secondary);">Account Number</span>
            <span style="font-weight:700; color:var(--text-primary);">${a.bankAccountMasked || '•••• 4012'}</span>
          </div>
          <div style="display:flex; justify-content:space-between;">
            <span style="color:var(--text-secondary);">IFSC Code</span>
            <span style="font-weight:700; color:var(--text-primary);">${a.ifsc || 'BARB0VARANA'}</span>
          </div>
          <div style="display:flex; justify-content:space-between;">
            <span style="color:var(--text-secondary);">Platform Commission</span>
            <span style="font-weight:800; color:#1E6B47;">0% (100% Direct Payout)</span>
          </div>
        </div>
      </div>

      <!-- Logout Card & Button -->
      <div style="background:#FFF9F5; border:1px solid #FCD7C2; border-radius:var(--radius-lg); padding:16px; text-align:center;">
        <div style="font-size:0.85rem; font-weight:800; color:var(--text-primary); margin-bottom:4px;">
          Account Session
        </div>
        <p style="font-size:0.72rem; color:var(--text-secondary); margin:0 0 12px 0;">
          Log out to return to account selection screen.
        </p>

        <button type="button" id="btn-artisan-logout" style="width:100%; background:#7A2813; color:#FFFFFF; border:none; padding:12px; font-size:0.85rem; font-weight:800; border-radius:var(--radius-md); cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px; box-shadow:0 2px 6px rgba(122,40,19,0.25);">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" x2="9" y1="12" y2="12"/>
          </svg>
          <span>Log Out</span>
        </button>
      </div>

    </div>
  `;

  // Attach edit handlers
  container.querySelector('#btn-edit-artisan-main')?.addEventListener('click', () => {
    openEditArtisanModal(container, 'personal');
  });
  container.querySelector('#btn-edit-artisan-personal')?.addEventListener('click', () => {
    openEditArtisanModal(container, 'personal');
  });
  container.querySelector('#btn-edit-artisan-bank')?.addEventListener('click', () => {
    openEditArtisanModal(container, 'bank');
  });

  // Attach logout handler
  container.querySelector('#btn-artisan-logout')?.addEventListener('click', () => {
    if (confirm("Are you sure you want to log out of Artisan Studio?")) {
      window.showToast?.("Logged out of Artisan Studio.");
      State.logout();
    }
  });
}
