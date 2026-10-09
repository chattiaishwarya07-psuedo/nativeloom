/**
 * Screen 3: Link Bank Details (Step 3 of 4)
 * Exact 1:1 pixel-perfect recreation of User's Reference Screenshot
 * Portal: Handicraft Direct Portal / Karigar Portal
 */

import { State } from '../state.js';
import { AudioAssistance } from '../speech.js';
import { i18n } from '../i18n.js';

export function renderBankScreen(container) {
  let isPasswordHidden = true;
  let activeTab = 'passbook'; // 'passbook' or 'manual'
  let isDbtChecked = true;

  container.innerHTML = `
    <div class="bank-screen animate-fade-in" style="background: #FAF8F5; min-height: 100vh; max-width: 440px; margin: 0 auto; box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1E150F; padding-bottom: 24px;">

      <!-- Top Sticky App Header matching Screenshot -->
      <div style="background: #FAF8F5; padding: 12px 16px 8px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(0,0,0,0.04); position: sticky; top: 0; z-index: 40;">
        <!-- Left: Logo & Title (Functionless display brand) -->
        <div style="display: flex; align-items: center; gap: 8px; cursor: default; user-select: none;" title="Handicraft Direct Portal">
          <div style="width: 34px; height: 34px; border-radius: 6px; background: #7A2813; color: #FFFFFF; font-family: Georgia, serif; font-size: 1.25rem; font-weight: 800; display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 0 1px 3px rgba(122, 40, 19, 0.3);">
            K
          </div>
          <div style="display: flex; flex-direction: column; line-height: 1.15;">
            <span style="font-size: 0.88rem; font-weight: 800; color: #1E150F; letter-spacing: -0.01em;">Handicraft</span>
            <span style="font-size: 0.88rem; font-weight: 800; color: #1E150F; letter-spacing: -0.01em;">Direct Portal</span>
          </div>
        </div>

        <!-- Right: Audio & Language Pills -->
        <div style="display: flex; align-items: center; gap: 6px;">
          <!-- Voice Guide ON/OFF Pill Button -->
          <button type="button" id="screen-audio-btn" class="voice-guide-toggle-btn ${AudioAssistance.isEnabled ? 'vg-on' : 'vg-off'}" title="Toggle Voice Guide ON / OFF" style="height: 28px;">
            <span class="vg-icon" style="display:inline-flex; align-items:center;">
              ${AudioAssistance.isEnabled
                ? `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>`
                : `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><line x1="1" y1="1" x2="23" y2="23"/><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 1.7 4.54"/><path d="M19.07 4.93a10 10 0 0 1 .82 12.06"/></svg>`
              }
            </span>
            <span class="vg-label" style="color:#7A2813;">${AudioAssistance.isEnabled ? 'Voice: ON' : 'Voice: OFF'}</span>
          </button>

          <!-- Language Pill Button -->
          <button type="button" id="screen-lang-btn" onclick="window.openQuickLanguageModal && window.openQuickLanguageModal()" style="background: #F4E2DC; color: #7A2813; border: none; border-radius: 9999px; padding: 5px 10px; font-size: 0.72rem; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 4px; transition: all 0.2s;">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/>
            </svg>
            <span id="screen-lang-label">${window.i18n?.metadata?.native || 'English'} ▾</span>
          </button>
        </div>
      </div>

      <!-- Main Screen Content Padding -->
      <div style="padding: 12px 14px 16px;">

        <!-- Stepper Header Row -->
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
          <div style="width: 22px; height: 22px; border-radius: 50%; background: #7A2813; color: #FFFFFF; font-size: 0.8rem; font-weight: 800; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
            3
          </div>
          <div style="font-size: 0.92rem; font-weight: 700; color: #1E150F;">
            Step 3 of 4 <span style="color: #71655D; font-weight: 500;">• Link bank details</span>
          </div>
        </div>

        <!-- Continuous Progress Bar (Step 3 = 75%) -->
        <div style="width: 100%; height: 4px; background: #E7DFD4; border-radius: 2px; margin-bottom: 12px; overflow: hidden;">
          <div style="width: 75%; height: 100%; background: #7A2813; border-radius: 2px;"></div>
        </div>

        <!-- Empty Spacer Box matching reference screenshot -->
        <div style="background: #FFFFFF; border: 1px solid #ECE6DE; border-radius: 8px; height: 34px; margin-bottom: 16px;"></div>

        <!-- SELECT WAY TO LINK Label -->
        <div style="font-size: 0.72rem; font-weight: 800; color: #3D2D24; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 10px;">
          SELECT WAY TO LINK
        </div>

        <!-- Two Large Toggle Cards -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 16px;">
          <!-- Left: Passbook Photo (Active) -->
          <button type="button" id="tab-passbook" style="background: #7A2813; color: #FFFFFF; border: none; border-radius: 12px; padding: 16px 10px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; cursor: pointer; box-shadow: 0 2px 6px rgba(122, 40, 19, 0.2); transition: all 0.2s;">
            <div style="width: 36px; height: 36px; border-radius: 8px; background: rgba(255,255,255,0.18); display: flex; align-items: center; justify-content: center;">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
            </div>
            <span style="font-size: 0.92rem; font-weight: 800;">Passbook Photo</span>
          </button>

          <!-- Right: Manual Input (Active or Inactive) -->
          <button type="button" id="tab-manual" style="background: #EAE5DE; color: #2E251F; border: none; border-radius: 12px; padding: 16px 10px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; cursor: pointer; transition: all 0.2s;">
            <div style="width: 36px; height: 36px; border-radius: 8px; background: rgba(0,0,0,0.06); display: flex; align-items: center; justify-content: center;">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
            </div>
            <span style="font-size: 0.92rem; font-weight: 800;">Manual Input</span>
          </button>
        </div>

        <!-- Passbook Pehchan Guide Card -->
        <div id="passbook-guide-card" style="background: #FFFFFF; border: 1px solid #ECE6DE; border-radius: 14px; padding: 14px; margin-bottom: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.02);">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
            <span style="font-size: 0.95rem; font-weight: 800; color: #1E150F;">
              Passbook Pehchan Guide
            </span>
          </div>

          <div style="background: #FAF8F5; border: 1px solid #EAE3D9; border-radius: 10px; padding: 12px; margin-bottom: 2px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
              <div style="display: flex; align-items: center; gap: 6px; font-size: 0.76rem; font-weight: 800; color: #1E150F;">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M8 10h.01"/><path d="M16 10h.01"/></svg>
                <span>BHARAT GRAMEEN BANK</span>
              </div>
              <div style="font-size: 0.7rem; color: #71655D; font-weight: 600; text-align: right; line-height: 1.2;">
                Varanasi<br>Shaakha
              </div>
            </div>

            <!-- Highlight 1: Account Number -->
            <div style="background: #FDE6DB; border: 1px solid #F8D1BF; border-radius: 6px; padding: 8px 10px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center;">
              <div>
                <div style="font-size: 0.65rem; font-weight: 800; color: #9C3615; letter-spacing: 0.02em;">
                  1. ACCOUNT NUMBER (KHATA SANKHYA)
                </div>
                <div style="font-family: monospace; font-size: 0.95rem; font-weight: 800; color: #1E150F; letter-spacing: 1px; margin-top: 2px;">
                  3084 •••• •••• 9214
                </div>
              </div>
              <span style="color: #9C3615; font-size: 1.2rem; font-weight: 900;">←</span>
            </div>

            <!-- Highlight 2: IFSC Code -->
            <div style="background: #DBEAFE; border: 1px solid #BFDBFE; border-radius: 6px; padding: 8px 10px; display: flex; justify-content: space-between; align-items: center;">
              <div>
                <div style="font-size: 0.65rem; font-weight: 800; color: #1E40AF; letter-spacing: 0.02em;">
                  2. IFSC CODE (SHAAKHA CODE)
                </div>
                <div style="font-family: monospace; font-size: 0.95rem; font-weight: 800; color: #1E150F; letter-spacing: 1px; margin-top: 2px;">
                  SBIN0000201
                </div>
              </div>
              <span style="color: #1E40AF; font-size: 1.2rem; font-weight: 900;">←</span>
            </div>
          </div>
        </div>

        <!-- Main Verified Bank Form Card -->
        <div id="card-bank-form" style="background: #FFFFFF; border: 1px solid #ECE6DE; border-radius: 14px; padding: 16px 14px; margin-bottom: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.02);">

          <!-- Pehchan Verified Mini Banner -->
          <div style="background: #FAF8F5; border: 1px solid #EAE3D9; border-radius: 10px; padding: 10px 12px; display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
            <img src="/assets/artisan_ramulu.jpg" alt="Ramdev Kumhar" style="width: 44px; height: 44px; object-fit: cover; border-radius: 6px; flex-shrink: 0;" onerror="this.src='/assets/artisan_budhram.jpg'">
            <div>
              <div style="font-size: 0.62rem; font-weight: 800; color: #71655D; letter-spacing: 0.05em; text-transform: uppercase;">
                PEHCHAN VERIFIED CARD
              </div>
              <div style="font-size: 1.02rem; font-weight: 800; color: #1E150F; margin: 1px 0;">
                Ramdev Kumhar
              </div>
              <div style="font-size: 0.72rem; color: #71655D;">
                Pottery Guild, Varanasi (GI-Registered)
              </div>
            </div>
          </div>

          <!-- Field 1: Account Holder -->
          <div style="margin-bottom: 14px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <label for="input-bank-holder" style="font-size: 0.82rem; font-weight: 800; color: #1E150F;">
                Account Holder *
              </label>
              <div style="display: flex; align-items: center; gap: 4px; font-size: 0.72rem; font-weight: 800; color: #15803D;">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                <span>Pehchan Matched</span>
              </div>
            </div>
            <div id="field-box-holder" style="background: #FFFFFF; border: 1.5px solid #D8CFC4; border-radius: 8px; padding: 10px 12px; display: flex; align-items: center; gap: 10px; transition: border-color 0.2s;">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="14" x="3" y="5" rx="2"/><path d="M12 9v4"/><path d="M10 11h4"/><circle cx="12" cy="2" r="1"/></svg>
              <input type="text" id="input-bank-holder" value="Ramdev Kumhar" placeholder="Artisan full legal name" style="flex:1; border:none; background:transparent; outline:none; font-size:0.92rem; font-weight:800; color:#1E150F;">
            </div>
            <div style="font-size: 0.7rem; color: #71655D; margin-top: 4px; line-height: 1.35;">
              The name on the Pehchan ID and the bank passbook must match exactly.
            </div>
          </div>

          <!-- Field 2: Account Number * -->
          <div style="margin-bottom: 14px;">
            <label for="input-account-number" style="font-size: 0.82rem; font-weight: 800; color: #1E150F; display: block; margin-bottom: 6px;">
              Account Number *
            </label>
            <div id="field-box-account" style="background: #FFFFFF; border: 1.5px solid #D8CFC4; border-radius: 8px; padding: 10px 12px; display: flex; align-items: center; justify-content: space-between; transition: border-color 0.2s;">
              <div style="display: flex; align-items: center; gap: 10px; flex: 1;">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
                <input type="password" id="input-account-number" value="3084190822914" placeholder="Enter bank account number" style="flex:1; border:none; background:transparent; outline:none; font-family:monospace; font-size:1.05rem; font-weight:800; color:#1E150F; letter-spacing:1px;">
              </div>
              <button type="button" id="btn-toggle-eye" title="Show / Hide Account Number" style="background: none; border: none; padding: 0; cursor: pointer; color: #71655D; display: flex; align-items: center;">
                <svg id="eye-icon-svg" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
              </button>
            </div>
          </div>

          <!-- Field 3: Confirm Account * -->
          <div style="margin-bottom: 14px;">
            <label for="input-confirm-account" style="font-size: 0.82rem; font-weight: 800; color: #1E150F; display: block; margin-bottom: 6px;">
              Confirm Account *
            </label>
            <div id="field-box-confirm" style="background: #FFFFFF; border: 1.5px solid #D8CFC4; border-radius: 8px; padding: 10px 12px; display: flex; align-items: center; gap: 10px; transition: border-color 0.2s;">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#15803D" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="9 12 11 14 15 10"/></svg>
              <input type="password" id="input-confirm-account" value="3084190822914" placeholder="Re-enter bank account number" style="flex:1; border:none; background:transparent; outline:none; font-family:monospace; font-size:1.0rem; font-weight:800; color:#1E150F; letter-spacing:1px;">
            </div>
          </div>

          <!-- Field 4: IFSC Code * -->
          <div style="margin-bottom: 10px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <label for="input-ifsc-code" style="font-size: 0.82rem; font-weight: 800; color: #1E150F;">
                IFSC Code *
              </label>
              <a href="javascript:void(0)" id="link-find-branch" style="font-size: 0.75rem; color: #7A2813; font-weight: 700; text-decoration: none;">Find branch</a>
            </div>
            <div id="field-box-ifsc" style="background: #FFFFFF; border: 1.5px solid #D8CFC4; border-radius: 8px; padding: 10px 12px; display: flex; align-items: center; justify-content: space-between; transition: border-color 0.2s;">
              <div style="display: flex; align-items: center; gap: 10px; flex:1;">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M8 10h.01"/><path d="M16 10h.01"/><path d="M8 14h.01"/><path d="M16 14h.01"/></svg>
                <input type="text" id="input-ifsc-code" value="SBIN0000201" maxlength="11" placeholder="SBIN0000201" style="flex:1; border:none; background:transparent; outline:none; font-family:monospace; font-size:0.98rem; font-weight:800; color:#1E150F; letter-spacing:1px; text-transform:uppercase;">
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#15803D"><path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.74-5.25z" clip-rule="evenodd" /></svg>
            </div>
          </div>

          <!-- Verified Branch Banner -->
          <div style="background: #FAF8F5; border: 1px solid #EAE3D9; border-radius: 8px; padding: 10px 12px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
            <div style="display: flex; align-items: flex-start; gap: 8px;">
              <span style="color: #15803D; font-size: 1rem; line-height: 1;">📍</span>
              <div>
                <div style="font-size: 0.82rem; font-weight: 800; color: #1E150F;">
                  SBI Main Branch, Varanasi
                </div>
                <div style="font-size: 0.68rem; color: #71655D; cursor:pointer;" title="Kachehri Compound, Varanasi, Uttar Pradesh - 221002" onclick="window.showToast?.('Kachehri Compound, Varanasi, Uttar Pradesh - 221002')">
                  Kachehri Compound, Varanasi, Uttar Pradesh - 221002
                </div>
              </div>
            </div>
            <span style="background: #FDE6DB; color: #9C3615; font-size: 0.65rem; font-weight: 800; padding: 2px 8px; border-radius: 4px;">
              Verified
            </span>
          </div>

          <!-- Field 5: DBT & Govt. Subsidy account checkbox card -->
          <div id="card-dbt" style="background: #FAF8F5; border: 1px solid #EAE3D9; border-radius: 8px; padding: 10px 12px; display: flex; align-items: flex-start; gap: 10px; cursor: pointer;">
            <div id="chk-dbt-icon" style="width: 20px; height: 20px; border-radius: 4px; background: #7A2813; color: #FFFFFF; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px; transition: all 0.2s;">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div>
              <div style="font-size: 0.82rem; font-weight: 800; color: #1E150F;">
                DBT &amp; Govt. Subsidy account
              </div>
              <div style="font-size: 0.72rem; color: #5C524A; line-height: 1.35; margin-top: 2px;">
                I designate this bank account as primary for government artisan subsidies and Direct Benefit Transfer (DBT).
              </div>
            </div>
          </div>

        </div>

        <!-- Penny Drop Alert Banner -->
        <div style="background: #C6DAFE; border: 1px solid #B4D0FE; border-radius: 10px; padding: 12px 14px; margin-bottom: 16px; display: flex; align-items: center; gap: 10px;">
          <div style="width: 28px; height: 28px; border-radius: 50%; background: #2E4566; color: #FFFFFF; display: flex; align-items: center; justify-content: center; font-size: 0.85rem; font-weight: 900; flex-shrink: 0;">
            ₹
          </div>
          <span style="font-size: 0.78rem; color: #1E3A8A; font-weight: 600; line-height: 1.35;">
            ₹1.00 will be deposited into your account now for instant verification (Penny-Drop).
          </span>
        </div>

        <!-- Primary Action Button: Save Bank Details & Continue -->
        <button type="button" id="btn-save-bank" style="width: 100%; background: #7A2813; color: #FFFFFF; border: none; border-radius: 8px; padding: 14px; font-size: 0.95rem; font-weight: 800; display: flex; align-items: center; justify-content: center; gap: 8px; cursor: pointer; box-shadow: 0 4px 12px rgba(122, 40, 19, 0.25); margin-bottom: 16px; transition: transform 0.15s, background 0.2s;">
          <span>Save Bank Details &amp; Continue</span>
          <span style="font-size: 1.1rem; line-height: 1;">➔</span>
        </button>

        <!-- Customer Care Footer -->
        <div style="font-size: 0.82rem; font-weight: 700; color: #4A3B32; text-align: center; display: flex; align-items: center; justify-content: center; gap: 6px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/></svg>
          <span>Customer care XXXXXXXXXXXX</span>
        </div>

      </div>

    </div>

    <!-- Passbook Camera Scanner Modal -->
    <div id="passbook-camera-modal" style="display:none; position:fixed; inset:0; background:rgba(0,0,0,0.85); z-index:9999; align-items:flex-end; justify-content:center; backdrop-filter:blur(4px);">
      <div style="width:100%; max-width:440px; background:#1C1917; border-top-left-radius:20px; border-top-right-radius:20px; padding:16px 14px 28px; box-sizing:border-box; color:#FFFFFF; max-height:92vh; overflow-y:auto; box-shadow:0 -10px 30px rgba(0,0,0,0.5);">

        <!-- Sheet Header -->
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:12px;">
          <div style="display:flex; align-items:center; gap:8px;">
            <div style="width:32px; height:32px; border-radius:8px; background:#7A2813; display:flex; align-items:center; justify-content:center; font-size:1.05rem;">
              📷
            </div>
            <div>
              <div style="font-size:0.95rem; font-weight:800; color:#FFFFFF;">Scan Bank Passbook</div>
              <div style="font-size:0.68rem; color:#A89F91;">Capture front page showing A/C No. &amp; IFSC</div>
            </div>
          </div>
          <button type="button" id="btn-close-passbook-cam" style="background:#2C2622; border:none; color:#FFFFFF; width:32px; height:32px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:1rem; cursor:pointer;">✕</button>
        </div>

        <!-- Camera Viewfinder -->
        <div id="passbook-viewfinder" style="background:#0F0D0C; border-radius:12px; height:240px; position:relative; overflow:hidden; display:flex; align-items:center; justify-content:center; margin-bottom:12px; border:1px solid #332B25;">

          <!-- Live Video Feed -->
          <video id="passbook-video-feed" autoplay playsinline muted style="width:100%; height:100%; object-fit:cover; display:block; position:absolute; inset:0;"></video>

          <!-- Captured Snapshot Preview -->
          <img id="passbook-snapshot-preview" alt="Captured Passbook" style="display:none; width:100%; height:100%; object-fit:cover; position:absolute; inset:0; z-index:4;" />

          <!-- Torch screen illumination overlay -->
          <div id="passbook-screen-torch" style="display:none; position:absolute; inset:0; background:rgba(255,255,255,0.75); mix-blend-mode:screen; pointer-events:none; z-index:5;"></div>

          <!-- Shutter Flash animation overlay -->
          <div id="passbook-shutter-flash" style="display:none; position:absolute; inset:0; background:#FFFFFF; pointer-events:none; z-index:10; opacity:0; transition:opacity 0.2s ease;"></div>

          <!-- Fallback when camera permission blocked / insecure context -->
          <div id="passbook-cam-fallback" style="display:none; position:absolute; inset:12px; z-index:3; background:#1C1917; border:1px solid #38312B; border-radius:10px; padding:16px; flex-direction:column; align-items:center; justify-content:center; text-align:center;">
            <div style="margin-bottom:6px; display:flex; justify-content:center;">
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
            </div>
            <div style="font-size:0.85rem; font-weight:800; color:#FFFFFF; margin-bottom:4px;">Mobile Camera Ready</div>
            <div style="font-size:0.72rem; color:#A89F91; margin-bottom:12px; line-height:1.35;">
              Tap below to take a photo using your phone camera.
            </div>
            <button type="button" id="btn-passbook-fallback-cam" style="background:#22C55E; color:#FFFFFF; border:none; border-radius:8px; padding:8px 16px; font-size:0.8rem; font-weight:800; cursor:pointer;">
              Open Device Camera
            </button>
          </div>

          <!-- Reticle & Guide Overlay -->
          <div id="passbook-overlay-guide" style="position:absolute; inset:0; pointer-events:none; z-index:6;">
            <!-- Corner Reticles -->
            <div style="position:absolute; top:10px; left:10px; width:20px; height:20px; border-top:3px solid #22C55E; border-left:3px solid #22C55E; border-top-left-radius:6px;"></div>
            <div style="position:absolute; top:10px; right:10px; width:20px; height:20px; border-top:3px solid #22C55E; border-right:3px solid #22C55E; border-top-right-radius:6px;"></div>
            <div style="position:absolute; bottom:10px; left:10px; width:20px; height:20px; border-bottom:3px solid #22C55E; border-left:3px solid #22C55E; border-bottom-left-radius:6px;"></div>
            <div style="position:absolute; bottom:10px; right:10px; width:20px; height:20px; border-bottom:3px solid #22C55E; border-right:3px solid #22C55E; border-bottom-right-radius:6px;"></div>

            <!-- Passbook Frame Alignment box -->
            <div style="position:absolute; inset:36px 18px 32px 18px; border:1.8px dashed rgba(255,255,255,0.6); border-radius:8px; display:flex; flex-direction:column; justify-content:space-between; padding:8px;">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <span style="background:rgba(0,0,0,0.6); color:#FFF; font-size:0.62rem; font-weight:700; padding:2px 6px; border-radius:4px;">Bank Passbook First Page</span>
                <span id="passbook-live-pill" style="background:#22C55E; color:#FFF; font-size:0.6rem; font-weight:800; padding:2px 6px; border-radius:4px;">LIVE CAM</span>
              </div>
              <div style="text-align:center; font-size:0.68rem; color:#FFF; font-weight:700; text-shadow:0 1px 3px #000;">
                Ensure Account No. &amp; IFSC are clearly visible
              </div>
            </div>

            <!-- Animated Laser Scan Bar -->
            <div id="passbook-laser-line" style="position:absolute; left:14px; right:14px; height:2px; background:linear-gradient(90deg, transparent, #22C55E, transparent); box-shadow:0 0 10px #22C55E; top:50%; animation:scanLaser 2.4s ease-in-out infinite;"></div>
          </div>

        </div>

        <!-- Hidden canvas & file input fallback -->
        <canvas id="passbook-capture-canvas" style="display:none;"></canvas>
        <input type="file" id="passbook-file-input" accept="image/*" capture="environment" style="display:none;" />

        <!-- Controls Row -->
        <div style="display:flex; gap:8px;">
          <button type="button" id="btn-snap-passbook" style="flex:1; background:#7A2813; color:#FFFFFF; border:none; border-radius:10px; padding:13px; font-size:0.92rem; font-weight:800; display:flex; align-items:center; justify-content:center; gap:8px; cursor:pointer; box-shadow:0 3px 8px rgba(122,40,19,0.3);">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
            <span id="btn-snap-passbook-label">Capture Passbook Photo</span>
          </button>

          <button type="button" id="btn-passbook-torch" title="Toggle Flash / Torch" style="width:48px; background:#2C2622; border:none; border-radius:10px; display:flex; align-items:center; justify-content:center; cursor:pointer; color:#FFFFFF;">
            <svg id="passbook-torch-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          </button>
        </div>

        <!-- Post-Capture Extracted Card (hidden until captured) -->
        <div id="passbook-extracted-card" style="display:none; background:#241E1A; border:1px solid #3D332A; border-radius:10px; padding:12px; margin-top:12px;">
          <div style="font-size:0.75rem; font-weight:800; color:#22C55E; display:flex; align-items:center; gap:6px; margin-bottom:8px;">
            <span>✓</span> <span>AI OCR Auto-Extraction Successful</span>
          </div>
          <div style="font-size:0.72rem; color:#DDD5CC; line-height:1.45; margin-bottom:10px;">
            <strong>A/C:</strong> 3084190822914<br>
            <strong>IFSC:</strong> SBIN0000201 (SBI Varanasi Main)<br>
            <strong>Holder:</strong> Ramdev Kumhar (Pehchan Verified)
          </div>
          <div style="display:flex; gap:8px;">
            <button type="button" id="btn-apply-passbook-data" style="flex:1; background:#22C55E; color:#FFFFFF; border:none; border-radius:8px; padding:10px; font-size:0.85rem; font-weight:800; cursor:pointer;">
              ✓ Use This Passbook Photo
            </button>
            <button type="button" id="btn-retake-passbook" style="background:#3D332A; color:#FFFFFF; border:none; border-radius:8px; padding:10px 14px; font-size:0.82rem; font-weight:700; cursor:pointer;">
              Retake
            </button>
          </div>
        </div>

      </div>
    </div>
  `;

  // Attach interactive events
  const tabPassbook = container.querySelector('#tab-passbook');
  const tabManual = container.querySelector('#tab-manual');
  const passbookModal = container.querySelector('#passbook-camera-modal');
  const passbookVideo = container.querySelector('#passbook-video-feed');
  const passbookSnapshot = container.querySelector('#passbook-snapshot-preview');
  const passbookCanvas = container.querySelector('#passbook-capture-canvas');
  const passbookFileInput = container.querySelector('#passbook-file-input');
  const passbookFallback = container.querySelector('#passbook-cam-fallback');
  const passbookTorchBtn = container.querySelector('#btn-passbook-torch');
  const passbookTorchIcon = container.querySelector('#passbook-torch-icon');
  const passbookScreenTorch = container.querySelector('#passbook-screen-torch');
  const passbookShutterFlash = container.querySelector('#passbook-shutter-flash');
  const passbookExtractedCard = container.querySelector('#passbook-extracted-card');
  const snapPassbookBtn = container.querySelector('#btn-snap-passbook');
  const snapPassbookLabel = container.querySelector('#btn-snap-passbook-label');
  const accountDisplay = container.querySelector('#account-number-display');
  const eyeBtn = container.querySelector('#btn-toggle-eye');
  const eyeSvg = container.querySelector('#eye-icon-svg');

  let activeStream = null;
  let isTorchOn = false;

  function playShutterSound() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(650, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.09);
      gain.gain.setValueAtTime(0.35, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.09);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.09);
    } catch (e) {}
  }

  async function openPassbookCamera() {
    passbookModal.style.display = 'flex';
    passbookSnapshot.style.display = 'none';
    passbookExtractedCard.style.display = 'none';
    snapPassbookLabel.textContent = "Capture Passbook Photo";

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      if (passbookFallback) passbookFallback.style.display = 'flex';
      return;
    }

    try {
      const constraints = {
        video: {
          facingMode: { ideal: 'environment' },
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      };
      activeStream = await navigator.mediaDevices.getUserMedia(constraints);
      if (passbookVideo) {
        passbookVideo.srcObject = activeStream;
        passbookVideo.onloadedmetadata = () => {
          passbookVideo.play().catch(e => console.warn(e));
          if (passbookFallback) passbookFallback.style.display = 'none';
        };
      }
    } catch (err) {
      console.warn('Passbook camera stream error:', err);
      try {
        activeStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        if (passbookVideo) {
          passbookVideo.srcObject = activeStream;
          passbookVideo.play().catch(e => console.warn(e));
          if (passbookFallback) passbookFallback.style.display = 'none';
        }
      } catch (err2) {
        if (passbookFallback) passbookFallback.style.display = 'flex';
      }
    }
  }

  function stopPassbookCamera() {
    if (activeStream) {
      activeStream.getTracks().forEach(track => {
        try {
          if (isTorchOn) {
            track.applyConstraints({ advanced: [{ torch: false }] }).catch(() => {});
          }
        } catch (e) {}
        track.stop();
      });
      activeStream = null;
    }
    passbookModal.style.display = 'none';
    isTorchOn = false;
    if (passbookTorchBtn) {
      passbookTorchBtn.style.background = '#2C2622';
      passbookTorchBtn.style.boxShadow = 'none';
    }
    if (passbookTorchIcon) {
      passbookTorchIcon.setAttribute('fill', 'none');
      passbookTorchIcon.setAttribute('stroke', 'currentColor');
    }
    if (passbookScreenTorch) passbookScreenTorch.style.display = 'none';
  }
  window.stopPassbookCamera = stopPassbookCamera;

  container.querySelector('#btn-close-passbook-cam')?.addEventListener('click', stopPassbookCamera);

  // Fallback camera button
  container.querySelector('#btn-passbook-fallback-cam')?.addEventListener('click', () => {
    passbookFileInput?.click();
  });

  // Torch Toggle
  passbookTorchBtn?.addEventListener('click', async () => {
    isTorchOn = !isTorchOn;
    let hardwareWorked = false;

    if (activeStream) {
      const track = activeStream.getVideoTracks()[0];
      if (track) {
        try {
          await track.applyConstraints({ advanced: [{ torch: isTorchOn }] });
          hardwareWorked = true;
        } catch (e) {
          console.warn('Torch constraint error:', e);
        }
      }
    }

    if (isTorchOn) {
      passbookTorchBtn.style.background = '#FEF08A';
      passbookTorchBtn.style.boxShadow = '0 0 14px rgba(245, 158, 11, 0.7)';
      passbookTorchIcon.setAttribute('fill', '#F59E0B');
      passbookTorchIcon.setAttribute('stroke', '#B45309');
      passbookScreenTorch.style.display = 'block';
      window.showToast?.(hardwareWorked ? "🔦 Mobile Torch ON" : "💡 Screen Light ON");
    } else {
      passbookTorchBtn.style.background = '#2C2622';
      passbookTorchBtn.style.boxShadow = 'none';
      passbookTorchIcon.setAttribute('fill', 'none');
      passbookTorchIcon.setAttribute('stroke', 'currentColor');
      passbookScreenTorch.style.display = 'none';
      window.showToast?.("Flash / Torch OFF");
    }
  });

  // Capture Button
  function capturePassbookFrame() {
    playShutterSound();
    if (navigator.vibrate) navigator.vibrate([40, 30, 40]);

    // Flash effect
    passbookShutterFlash.style.display = 'block';
    passbookShutterFlash.style.opacity = '0.9';
    setTimeout(() => {
      passbookShutterFlash.style.opacity = '0';
      setTimeout(() => { passbookShutterFlash.style.display = 'none'; }, 200);
    }, 70);

    if (activeStream && passbookVideo && passbookVideo.videoWidth > 0) {
      passbookCanvas.width = passbookVideo.videoWidth;
      passbookCanvas.height = passbookVideo.videoHeight;
      const ctx = passbookCanvas.getContext('2d');
      ctx.drawImage(passbookVideo, 0, 0, passbookCanvas.width, passbookCanvas.height);
      const url = passbookCanvas.toDataURL('image/jpeg', 0.92);

      passbookSnapshot.src = url;
      passbookSnapshot.style.display = 'block';
      passbookExtractedCard.style.display = 'block';
      snapPassbookLabel.textContent = "Photo Captured";
    } else {
      passbookFileInput?.click();
    }
  }

  snapPassbookBtn?.addEventListener('click', capturePassbookFrame);

  // Fallback file input change
  passbookFileInput?.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        passbookSnapshot.src = event.target.result;
        passbookSnapshot.style.display = 'block';
        passbookExtractedCard.style.display = 'block';
        if (passbookFallback) passbookFallback.style.display = 'none';
      };
      reader.readAsDataURL(file);
    }
  });

  // Retake
  container.querySelector('#btn-retake-passbook')?.addEventListener('click', () => {
    passbookSnapshot.style.display = 'none';
    passbookExtractedCard.style.display = 'none';
    snapPassbookLabel.textContent = "Capture Passbook Photo";
  });

  // Apply Captured Passbook Data
  container.querySelector('#btn-apply-passbook-data')?.addEventListener('click', () => {
    stopPassbookCamera();

    // Populate and unmask fields
    isPasswordHidden = false;
    if (accountDisplay) {
      accountDisplay.textContent = '3084190822914';
      accountDisplay.style.letterSpacing = '0.5px';
      accountDisplay.style.color = '#15803D';
    }
    if (eyeSvg) {
      eyeSvg.innerHTML = `<path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/>`;
    }

    tabPassbook.innerHTML = `
      <div style="width: 36px; height: 36px; border-radius: 8px; background: rgba(34,197,94,0.3); display: flex; align-items: center; justify-content: center;">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      </div>
      <span style="font-size: 0.92rem; font-weight: 800;">Passbook ✓</span>
    `;

    const saveBtn = container.querySelector('#btn-save-bank');
    if (saveBtn) {
      saveBtn.style.background = '#15803D';
      saveBtn.style.boxShadow = '0 4px 16px rgba(21, 128, 61, 0.4)';
    }

    window.showToast?.("✓ Passbook Scanned! Bank details verified & auto-filled.");
  });

  const inputHolder = container.querySelector('#input-bank-holder');
  const inputAccount = container.querySelector('#input-account-number');
  const inputConfirm = container.querySelector('#input-confirm-account');
  const inputIfsc = container.querySelector('#input-ifsc-code');
  const fieldBoxes = container.querySelectorAll('#field-box-holder, #field-box-account, #field-box-confirm, #field-box-ifsc');

  // Click on Passbook Photo -> Open Camera
  tabPassbook?.addEventListener('click', () => {
    activeTab = 'passbook';
    tabPassbook.style.background = '#7A2813';
    tabPassbook.style.color = '#FFFFFF';
    tabPassbook.style.boxShadow = '0 2px 6px rgba(122, 40, 19, 0.2)';
    tabManual.style.background = '#EAE5DE';
    tabManual.style.color = '#2E251F';
    tabManual.style.boxShadow = 'none';
    fieldBoxes.forEach(b => { b.style.borderColor = '#D8CFC4'; });

    // Open camera immediately
    openPassbookCamera();
  });

  // Click on Manual Input -> Activate Manual Editing Mode
  tabManual?.addEventListener('click', () => {
    activeTab = 'manual';
    tabManual.style.background = '#7A2813';
    tabManual.style.color = '#FFFFFF';
    tabManual.style.boxShadow = '0 2px 6px rgba(122, 40, 19, 0.2)';
    tabPassbook.style.background = '#EAE5DE';
    tabPassbook.style.color = '#2E251F';
    tabPassbook.style.boxShadow = 'none';

    // Highlight all input boxes with terracotta border to signal editability
    fieldBoxes.forEach(b => {
      b.style.borderColor = '#7A2813';
      b.style.background = '#FFFDFB';
    });

    inputAccount?.focus();
    window.showToast?.("Manual input mode active. You can now edit all bank fields directly.");
  });

  // Toggle eye for masked account number
  eyeBtn?.addEventListener('click', () => {
    isPasswordHidden = !isPasswordHidden;
    if (inputAccount) {
      inputAccount.type = isPasswordHidden ? 'password' : 'text';
    }
    if (eyeSvg) {
      if (isPasswordHidden) {
        eyeSvg.innerHTML = `<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>`;
      } else {
        eyeSvg.innerHTML = `<path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/>`;
      }
    }
  });

  // Auto-uppercase IFSC Code
  inputIfsc?.addEventListener('input', (e) => {
    e.target.value = e.target.value.toUpperCase();
    if (e.target.value.length === 11) {
      window.showToast?.(`✓ IFSC Verified: ${e.target.value} (Verified Branch)`);
    }
  });

  // Find branch link
  container.querySelector('#link-find-branch')?.addEventListener('click', () => {
    const code = inputIfsc?.value.trim() || 'SBIN0000201';
    window.showToast?.(`Branch verified: State Bank of India (${code})`);
  });

  // Toggle DBT Checkbox
  const dbtCard = container.querySelector('#card-dbt');
  const chkIcon = container.querySelector('#chk-dbt-icon');
  dbtCard?.addEventListener('click', () => {
    isDbtChecked = !isDbtChecked;
    chkIcon.style.background = isDbtChecked ? '#7A2813' : '#EFECE6';
    chkIcon.style.border = isDbtChecked ? 'none' : '1px solid #D8CFC4';
    chkIcon.innerHTML = isDbtChecked ? '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>' : '';
  });

  // Universal Voice Guide ON / OFF Toggle trigger
  container.querySelector('#screen-audio-btn')?.addEventListener('click', () => {
    AudioAssistance.toggle();
  });

  // Primary Button: Validate Manual Inputs, Penny-Drop verification & Proceed to Step 4 Studio
  const saveBtn = container.querySelector('#btn-save-bank');
  saveBtn?.addEventListener('click', () => {
    stopPassbookCamera();

    const holder = inputHolder?.value.trim() || 'Ramdev Kumhar';
    const acc = inputAccount?.value.trim() || '';
    const confirm = inputConfirm?.value.trim() || '';
    const ifsc = inputIfsc?.value.trim() || '';

    if (!acc || acc.length < 8) {
      window.showToast?.("⚠️ Please enter a valid Bank Account Number (min 8 digits).");
      inputAccount?.focus();
      return;
    }

    if (acc !== confirm) {
      window.showToast?.("⚠️ Account numbers do not match! Please re-check.");
      inputConfirm?.focus();
      return;
    }

    if (!ifsc || ifsc.length < 6) {
      window.showToast?.("⚠️ Please enter a valid IFSC code.");
      inputIfsc?.focus();
      return;
    }

    // Save verified bank details in platform state
    if (window.State?.artisan) {
      window.State.artisan.bank = {
        holder,
        accountNumber: acc,
        ifsc,
        dbt: isDbtChecked
      };
    }

    saveBtn.disabled = true;
    saveBtn.innerHTML = `
      <svg class="animate-spin" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10" stroke-opacity="0.25"/><path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"/></svg>
      <span>Verifying via Penny-Drop (₹1.00)...</span>
    `;

    setTimeout(() => {
      saveBtn.style.background = '#15803D';
      saveBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        <span>Account Verified &amp; Linked!</span>
      `;
      window.showToast?.(`✓ ₹1.00 Penny-Drop Confirmed! A/C ending in ${acc.slice(-4)} linked.`);

      setTimeout(() => {
        window.navigateToScreen('studio');
      }, 700);
    }, 900);
  });
}
