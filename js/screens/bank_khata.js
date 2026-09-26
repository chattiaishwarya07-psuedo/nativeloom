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
        <!-- Left: Logo & Title -->
        <div style="display: flex; align-items: center; gap: 8px; cursor: pointer;" onclick="window.navigateToScreen('explore')" title="Handicraft Direct Portal">
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
          <!-- Audio Pill Button -->
          <button type="button" id="screen-audio-btn" style="background: #F4E2DC; color: #7A2813; border: none; border-radius: 9999px; padding: 5px 12px; font-size: 0.72rem; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 4px; transition: all 0.2s;">
            <span>Audio</span>
          </button>

          <!-- Language Pill Button -->
          <button type="button" id="screen-lang-btn" onclick="window.openQuickLanguageModal && window.openQuickLanguageModal()" style="background: #F4E2DC; color: #7A2813; border: none; border-radius: 9999px; padding: 5px 10px; font-size: 0.72rem; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 4px; transition: all 0.2s;">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/>
            </svg>
            <span id="screen-lang-label">EN | Hindi ▾</span>
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

          <!-- Right: Manual imput (Inactive) -->
          <button type="button" id="tab-manual" style="background: #EAE5DE; color: #2E251F; border: none; border-radius: 12px; padding: 16px 10px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; cursor: pointer; transition: all 0.2s;">
            <div style="width: 36px; height: 36px; border-radius: 8px; background: rgba(0,0,0,0.06); display: flex; align-items: center; justify-content: center;">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
            </div>
            <span style="font-size: 0.92rem; font-weight: 800;">Manual imput</span>
          </button>
        </div>

        <!-- Passbook Pehchan Guide Card -->
        <div style="background: #FFFFFF; border: 1px solid #ECE6DE; border-radius: 14px; padding: 14px; margin-bottom: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.02);">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
            <span style="font-size: 0.95rem; font-weight: 800; color: #1E150F;">
              Passbook Pehchan Guide
            </span>
          </div>

          <div style="background: #FAF8F5; border: 1px solid #EAE3D9; border-radius: 10px; padding: 12px; margin-bottom: 2px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
              <div style="display: flex; align-items: center; gap: 6px; font-size: 0.76rem; font-weight: 800; color: #1E150F;">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#71655D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M8 10h.01"/><path d="M16 10h.01"/></svg>
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
        <div style="background: #FFFFFF; border: 1px solid #ECE6DE; border-radius: 14px; padding: 16px 14px; margin-bottom: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.02);">
          
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
              <label style="font-size: 0.82rem; font-weight: 800; color: #1E150F;">
                Account Holder
              </label>
              <div style="display: flex; align-items: center; gap: 4px; font-size: 0.72rem; font-weight: 800; color: #15803D;">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                <span>Pehchan Matched</span>
              </div>
            </div>
            <div style="background: #EFECE6; border: 1px solid #E2DCD3; border-radius: 8px; padding: 11px 12px; display: flex; align-items: center; gap: 10px;">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#71655D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="14" x="3" y="5" rx="2"/><path d="M12 9v4"/><path d="M10 11h4"/><circle cx="12" cy="2" r="1"/></svg>
              <span style="font-size: 0.92rem; font-weight: 800; color: #1E150F;">Ramdev Kumhar</span>
            </div>
            <div style="font-size: 0.7rem; color: #71655D; margin-top: 4px; line-height: 1.35;">
              The name on the Pehchan ID and the bank passbook must match exactly.
            </div>
          </div>

          <!-- Field 2: Account Number * -->
          <div style="margin-bottom: 14px;">
            <label style="font-size: 0.82rem; font-weight: 800; color: #1E150F; display: block; margin-bottom: 6px;">
              Account Number *
            </label>
            <div style="background: #FFFFFF; border: 1px solid #D8CFC4; border-radius: 8px; padding: 11px 12px; display: flex; align-items: center; justify-content: space-between;">
              <div style="display: flex; align-items: center; gap: 10px; flex: 1;">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8C827A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
                <span id="account-number-display" style="font-size: 1.15rem; letter-spacing: 2px; color: #1E150F; font-family: monospace; font-weight: 800;">••••••••••••••</span>
              </div>
              <button type="button" id="btn-toggle-eye" title="Show / Hide Account Number" style="background: none; border: none; padding: 0; cursor: pointer; color: #71655D; display: flex; align-items: center;">
                <svg id="eye-icon-svg" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
              </button>
            </div>
          </div>

          <!-- Field 3: Confirm Account * -->
          <div style="margin-bottom: 14px;">
            <label style="font-size: 0.82rem; font-weight: 800; color: #1E150F; display: block; margin-bottom: 6px;">
              Confirm Account *
            </label>
            <div style="background: #FFFFFF; border: 1px solid #D8CFC4; border-radius: 8px; padding: 11px 12px; display: flex; align-items: center; gap: 10px;">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#15803D" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="9 12 11 14 15 10"/></svg>
              <span style="font-family: monospace; font-size: 0.95rem; font-weight: 800; color: #1E150F; letter-spacing: 0.5px;">3084190822914</span>
            </div>
          </div>

          <!-- Field 4: IFSC Code * -->
          <div style="margin-bottom: 10px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <label style="font-size: 0.82rem; font-weight: 800; color: #1E150F;">
                IFSC Code *
              </label>
              <a href="javascript:void(0)" id="link-find-branch" style="font-size: 0.75rem; color: #7A2813; font-weight: 700; text-decoration: none;">Find branch</a>
            </div>
            <div style="background: #FFFFFF; border: 1px solid #D8CFC4; border-radius: 8px; padding: 11px 12px; display: flex; align-items: center; justify-content: space-between;">
              <div style="display: flex; align-items: center; gap: 10px;">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#71655D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M8 10h.01"/><path d="M16 10h.01"/><path d="M8 14h.01"/><path d="M16 14h.01"/></svg>
                <span style="font-family: monospace; font-size: 0.98rem; font-weight: 800; color: #1E150F; letter-spacing: 1px;">SBIN0000201</span>
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
                <div style="font-size: 0.68rem; color: #71655D;">
                  Kachehri Compound, Varanasi, Ut...
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
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#71655D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/></svg>
          <span>Customer care XXXXXXXXXXXX</span>
        </div>

      </div>

    </div>
  `;

  // Attach interactive events
  const tabPassbook = container.querySelector('#tab-passbook');
  const tabManual = container.querySelector('#tab-manual');

  tabPassbook?.addEventListener('click', () => {
    activeTab = 'passbook';
    tabPassbook.style.background = '#7A2813';
    tabPassbook.style.color = '#FFFFFF';
    tabPassbook.style.boxShadow = '0 2px 6px rgba(122, 40, 19, 0.2)';
    tabManual.style.background = '#EAE5DE';
    tabManual.style.color = '#2E251F';
    tabManual.style.boxShadow = 'none';
    window.showToast?.("Passbook Photo scan mode selected.");
  });

  tabManual?.addEventListener('click', () => {
    activeTab = 'manual';
    tabManual.style.background = '#7A2813';
    tabManual.style.color = '#FFFFFF';
    tabManual.style.boxShadow = '0 2px 6px rgba(122, 40, 19, 0.2)';
    tabPassbook.style.background = '#EAE5DE';
    tabPassbook.style.color = '#2E251F';
    tabPassbook.style.boxShadow = 'none';
    window.showToast?.("Manual input mode active. Pre-filled with Pehchan records.");
  });

  // Toggle eye for masked account number
  const eyeBtn = container.querySelector('#btn-toggle-eye');
  const accountDisplay = container.querySelector('#account-number-display');
  const eyeSvg = container.querySelector('#eye-icon-svg');
  eyeBtn?.addEventListener('click', () => {
    isPasswordHidden = !isPasswordHidden;
    if (isPasswordHidden) {
      accountDisplay.textContent = '••••••••••••••';
      accountDisplay.style.letterSpacing = '2px';
      eyeSvg.innerHTML = `<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>`;
    } else {
      accountDisplay.textContent = '3084190822914';
      accountDisplay.style.letterSpacing = '0.5px';
      eyeSvg.innerHTML = `<path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/>`;
    }
  });

  // Find branch link
  container.querySelector('#link-find-branch')?.addEventListener('click', () => {
    window.showToast?.("Branch verified: State Bank of India, Main Varanasi (SBIN0000201)");
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

  // Audio assistance trigger
  container.querySelector('#screen-audio-btn')?.addEventListener('click', () => {
    AudioAssistance.playStep3();
    window.showToast?.("🔊 Playing audio instructions for Bank Linking");
  });

  // Primary Button: Penny-Drop verification & Proceed to Step 4 Studio
  const saveBtn = container.querySelector('#btn-save-bank');
  saveBtn?.addEventListener('click', () => {
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
      window.showToast?.("₹1.00 Penny-Drop Confirmed! Bank Linked to Pehchan.");

      setTimeout(() => {
        window.navigateToScreen('studio');
      }, 700);
    }, 900);
  });
}
