/**
 * Screen 3: Bank Khata Jodna (Step 3 of 4)
 * Exact recreation of User Provided Reference Screenshot
 */

import { State } from '../state.js';
import { AudioAssistance } from '../speech.js';

export function renderBankScreen(container) {
  let showAccountNumber = false;

  container.innerHTML = `
    <div class="bank-screen animate-fade-in">
      
      <!-- Top Step Meta Row -->
      <div class="step-meta-row">
        <div class="step-indicator-pill">
          <div class="step-num-circle">3</div>
          <span>KADAM 3 / 4 • BANK KHATA JODNA</span>
        </div>
        <span class="badge-amber" style="background:#FEECE5; color:#9A3412; border-color:#FDBA74; font-size:0.7rem;">
          75% Completed
        </span>
      </div>

      <!-- Stepper Progress Bar -->
      <div class="stepper-track" style="margin-bottom:14px;">
        <div class="stepper-fill" style="width: 75%;"></div>
      </div>

      <!-- 100% Direct Payout Banner -->
      <div class="payout-banner">
        <div class="payout-banner-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
        </div>
        <div>
          <div class="payout-banner-title">100% Direct Payout</div>
          <div class="payout-banner-sub">Bina kisi bicholiye ke pura bhugtan seedhe aapke khate mein. 0% Commission.</div>
        </div>
      </div>

      <!-- Audio Sahayata -->
      <div class="audio-guide-card" style="margin-bottom:12px;">
        <div class="audio-square-icon" id="btn-audio-step3">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
        </div>
        <div class="audio-guide-content">
          <div class="audio-guide-title-row">
            <span class="audio-guide-label" style="font-size:0.72rem;">Aawaz Sahayata (Audio Guide)</span>
            <span class="badge-subtle" style="font-size:0.6rem; padding:1px 5px;">BHOJPURI / HINDI</span>
          </div>
          <div class="audio-guide-quote">Passbook photo khinchne ya khata sankhya darj karne mein sahayata ke liye yahan dabayein.</div>
        </div>
      </div>

      <!-- Khata Jodne Ka Tarika Chunein -->
      <div class="section-label" style="font-size:0.76rem; text-transform:uppercase; letter-spacing:0.04em;">
        KHATA JODNE KA TARIKA CHUNEIN
      </div>

      <div class="bank-mode-switch">
        <button type="button" class="bank-mode-tab ${State.bankMethod === 'passbook' ? 'active' : ''}" id="tab-passbook">
          <div class="bank-mode-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
            Passbook Photo
          </div>
          <div class="bank-mode-sub">Turant &amp; Aasan</div>
        </button>

        <button type="button" class="bank-mode-tab ${State.bankMethod === 'manual' ? 'active' : ''}" id="tab-manual">
          <div class="bank-mode-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
            Likh Kar Bharein
          </div>
          <div class="bank-mode-sub">Manual Input</div>
        </button>
      </div>

      <!-- Passbook Pehchan Guide Box -->
      <div class="passbook-guide-box">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span style="font-size:0.85rem; font-weight:800; color:var(--text-primary); display:flex; align-items:center; gap:6px;">
            📖 Passbook Pehchan Guide
          </span>
          <span class="badge-amber" style="font-size:0.62rem;">Sahayata</span>
        </div>

        <div class="passbook-mock">
          <div class="passbook-bank-name">
            <span>🏛️ BHARAT GRAMEEN BANK</span>
            <span style="color:var(--text-muted); font-size:0.68rem;">Varanasi Shaakha</span>
          </div>

          <div class="passbook-highlight-red">
            <span>1. ACCOUNT NUMBER (KHATA SANKHYA)</span>
            <span>3084 **** **** 9214 ←</span>
          </div>

          <div class="passbook-highlight-blue">
            <span>2. IFSC CODE (SHAAKHA CODE)</span>
            <span>SBIN0000201 ←</span>
          </div>
        </div>

        <button type="button" class="btn-upload-passbook" id="btn-upload-passbook">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" x2="12" y1="18" y2="12"/><line x1="9" x2="15" y1="15" y2="15"/></svg>
          Passbook ki photo upload karein
        </button>
      </div>

      <!-- Apna Bank Chunein (Select Bank) -->
      <div class="section-label-row">
        <span class="section-label" style="font-size:0.75rem; text-transform:uppercase;">APNA BANK CHUNEIN (SELECT BANK)</span>
        <span style="font-size:0.72rem; color:var(--color-terracotta); font-weight:700;">50+ Banks</span>
      </div>

      <div class="bank-chips-row">
        <div class="bank-chip selected">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          State Bank of India
        </div>
        <div class="bank-chip">
          Punjab National Bank
        </div>
        <div class="bank-chip">
          Bank of Baroda
        </div>
        <div class="bank-chip">
          Canara Bank
        </div>
      </div>

      <!-- Artisan Pehchan Verified Card -->
      <div class="artisan-verified-card">
        <img src="/assets/artisan_ramulu.jpg" alt="Ramdev Kumhar" class="artisan-avatar-sm" onerror="this.src='/assets/artisan_budhram.jpg'">
        <div class="artisan-details-mini">
          <div class="artisan-badge-tag">PEHCHAN VERIFIED CARD</div>
          <div class="artisan-name-lg">${State.artisanName}</div>
          <div class="artisan-guild-location">Pottery Guild, Varanasi (GI-Registered)</div>
        </div>
      </div>

      <!-- Form: Khata Dharak Ka Naam -->
      <div class="bank-field-group">
        <div class="field-label-row">
          <label class="input-label" style="margin-bottom:0;">Khata Dharak Ka Naam (Account Holder)</label>
          <span class="badge-green" style="font-size:0.62rem;">🔒 Pehchan Matched</span>
        </div>
        <div class="field-input-box" style="background:#F4EFE6;">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          <input type="text" value="${State.accountHolder}" readonly style="font-weight:800; color:var(--text-primary);">
        </div>
        <div style="font-size:0.68rem; color:var(--text-muted); margin-top:4px;">
          Pehchan ID aur Bank Passbook par naam ek samaan hona anivarya hai.
        </div>
      </div>

      <!-- Khata Sankhya (Account Number) -->
      <div class="bank-field-group">
        <label class="input-label">Khata Sankhya (Account Number) *</label>
        <div class="field-input-box">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
          <input type="${showAccountNumber ? 'text' : 'password'}" value="3084190822914" id="input-account-num">
          <button type="button" id="btn-toggle-eye" style="background:none; border:none; cursor:pointer; padding:0; color:var(--text-secondary);">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
          </button>
        </div>
      </div>

      <!-- Khata Sankhya Dobara Likhein (Confirm Account) -->
      <div class="bank-field-group">
        <label class="input-label">Khata Sankhya Dobara Likhein (Confirm Account) *</label>
        <div class="field-input-box verified">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-green)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          <input type="text" value="${State.accountNumber}">
        </div>
      </div>

      <!-- IFSC Code -->
      <div class="bank-field-group">
        <div class="field-label-row">
          <label class="input-label" style="margin-bottom:0;">IFSC Code *</label>
          <a href="javascript:void(0)" style="font-size:0.72rem; color:var(--color-terracotta); font-weight:700; text-decoration:none;">Shaakha dhoondhein</a>
        </div>
        <div class="field-input-box verified">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg>
          <input type="text" value="${State.ifscCode}" style="font-weight:800; letter-spacing:0.04em;">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="var(--color-green)"><path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.74-5.25z" clip-rule="evenodd" /></svg>
        </div>
        
        <div class="branch-location-card">
          <span>📍 <strong>${State.branchName}</strong> - ${State.branchAddress}</span>
          <span class="badge-amber" style="font-size:0.62rem;">Verified</span>
        </div>
      </div>

      <!-- DBT Subsidy Checkbox -->
      <div class="dbt-checkbox-row">
        <div class="custom-checkbox" id="chk-dbt">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <div class="dbt-text">
          <strong>DBT &amp; Govt. Hastshilp Subsidy Khata:</strong>
          Main is bank khate ko sarkari shilpkar anudan aur seedhe labh hastantaran (DBT) ke liye prathmik banata hoon.
        </div>
      </div>

      <!-- Suraksha Vaada 100% Secure -->
      <div class="ecosystem-box" style="margin-top:0; margin-bottom:14px;">
        <div class="ecosystem-header" style="margin-bottom:8px; padding-bottom:6px;">
          <span class="ecosystem-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-terracotta)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            Suraksha Vaada (100% Secure)
          </span>
          <span style="font-size:0.65rem; color:var(--text-secondary); font-weight:700;">RBI-Standard 256-Bit Financial Encryption</span>
        </div>
        <div style="display:flex; justify-content:space-between; font-size:0.72rem; padding:4px 0;">
          <span style="color:var(--text-primary); font-weight:700;">🏛️ DBT Ready Govt. Direct Benefit</span>
          <span style="color:var(--color-green); font-weight:700;">₹ Zero Commission No Hidden Fee</span>
        </div>
      </div>

      <!-- Penny Drop Alert -->
      <div class="penny-drop-banner">
        <span style="font-size:1.1rem;">🪙</span>
        <span>Pushtikaran ke liye aapke khate mein abhi <strong>₹1.00 (Penny-Drop)</strong> jama kiya jayega.</span>
      </div>

      <!-- Primary Submit Button -->
      <button type="button" class="btn-primary" id="btn-save-bank">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        Khata Surakshit Karein &amp; Aage Badhein
      </button>

      <div style="font-size:0.72rem; color:var(--text-secondary); text-align:center; margin-top:12px;">
        Khata jodte samay pareshani? <a href="javascript:void(0)" style="color:var(--color-terracotta); font-weight:700; text-decoration:none;">Guild Sahayak se baat karein</a>
      </div>
    </div>
  `;

  // Handlers
  container.querySelector('#btn-audio-step3').addEventListener('click', () => {
    AudioAssistance.playStep3();
  });

  // Toggle Eye for password/text
  const eyeBtn = container.querySelector('#btn-toggle-eye');
  const accountInput = container.querySelector('#input-account-num');
  eyeBtn.addEventListener('click', () => {
    showAccountNumber = !showAccountNumber;
    accountInput.type = showAccountNumber ? 'text' : 'password';
  });

  // Upload Passbook simulation
  container.querySelector('#btn-upload-passbook').addEventListener('click', () => {
    window.showToast?.("Scanning Passbook OCR... Auto-populating Account No. & IFSC!");
  });

  // Proceed to Studio
  container.querySelector('#btn-save-bank').addEventListener('click', () => {
    window.showToast?.("₹1.00 Penny-Drop Successful! Bank Account Verified.");
    setTimeout(() => {
      State.setScreen('studio');
    }, 600);
  });
}
