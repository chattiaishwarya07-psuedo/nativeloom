/**
 * Screen 2: Handicrafts Pehchan Verification (Step 2 of 4)
 * Exact recreation of User Provided Reference Screenshot
 */

import { State } from '../state.js';
import { AudioAssistance } from '../speech.js';

export function renderPehchanScreen(container) {
  let isScanning = false;
  let isFlashOn = false;

  container.innerHTML = `
    <div class="pehchan-screen animate-fade-in">
      
      <!-- Step 2 Header Meta -->
      <div class="step-meta-row">
        <div class="step-indicator-pill">
          <div class="step-num-circle">2</div>
          <span>STEP 2 OF 4 • PEHCHAN REGISTRY</span>
        </div>
        <div style="display:flex; align-items:center; gap:6px;">
          <button type="button" class="lang-btn" id="btn-toggle-lang" style="padding:3px 8px; font-size:0.68rem;">
            EN | हिंदी
          </button>
          <a href="https://textilescommittee.nic.in" target="_blank" class="mot-link-btn">
            Official MoT Link
          </a>
        </div>
      </div>

      <!-- Stepper Progress Bar -->
      <div class="stepper-track" style="margin-bottom:14px;">
        <div class="stepper-fill" style="width: 50%;"></div>
      </div>

      <!-- Title & Subtitle -->
      <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-terracotta)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="14" x="3" y="5" rx="2"/><circle cx="9" cy="12" r="2.5"/><path d="M15 9h2"/><path d="M15 13h2"/><path d="M15 17h2"/></svg>
        <h1 class="screen-headline" style="margin:0; font-size:1.25rem;">Handicrafts Pehchan Verification</h1>
      </div>
      <p class="screen-subtext">Authenticate your Ministry of Textiles master artisan identity for direct national subsidies.</p>

      <!-- Aawaaz Sahayata Audio Card -->
      <div class="audio-guide-card">
        <div class="audio-square-icon" id="btn-audio-step2" title="Listen to spoken Hindi instructions">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
        </div>
        <div class="audio-guide-content">
          <div class="audio-guide-title-row">
            <span class="audio-guide-label">AAWAAZ SAHAYATA • HINDI / ENGLISH</span>
            <span class="audio-guide-tap">Tap to listen</span>
          </div>
          <div class="audio-guide-quote">"Why verify Pehchan card? Unlocks zero-commission direct bank payouts &amp; GI registry."</div>
          <div class="audio-guide-footer">• Available in 8 Indian Languages</div>
        </div>
      </div>

      <!-- Auto-Scan Pehchan Card Box -->
      <div class="autoscan-box">
        <div class="autoscan-header">
          <span class="autoscan-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-terracotta)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/></svg>
            Auto-Scan Pehchan Card
          </span>
          <span class="badge-amber" style="background:#FEF2F2; color:#B91C1C; border-color:#FECACA; font-size:0.65rem;">OCR Instant</span>
        </div>

        <!-- Camera Scanner Viewfinder -->
        <div class="card-viewfinder" id="scanner-viewfinder">
          <div class="viewfinder-corners"></div>
          
          <div class="viewfinder-top-bar">
            <div class="govt-title">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2 2 7l10 5 10-5-10-5Z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/></svg>
              GOVT. OF INDIA • PEHCHAN
            </div>
            <span class="badge-stable">STABLE</span>
          </div>

          <div class="viewfinder-card-body">
            <img src="/assets/artisan_ramulu.jpg" alt="Artisan Card Photo" class="artisan-card-photo" onerror="this.src='/assets/artisan_budhram.jpg'">
            <div class="card-info-lines">
              <div class="card-ghost-line"></div>
              <div class="card-ghost-line short"></div>
              <div class="card-id-code">${State.pehchanId}</div>
            </div>
            <div class="qr-code-placeholder">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="5" height="5" x="3" y="3" rx="1"/><rect width="5" height="5" x="16" y="3" rx="1"/><rect width="5" height="5" x="3" y="16" rx="1"/><path d="M21 16h-3a2 2 0 0 0-2 2v3"/><path d="M21 21v.01"/><path d="M12 7v3a2 2 0 0 1-2 2H7"/><path d="M3 12h.01"/><path d="M12 3h.01"/><path d="M12 16v.01"/><path d="M16 12h1"/><path d="M21 12v.01"/><path d="M12 21v-1"/></svg>
            </div>
          </div>

          <div class="viewfinder-helper">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle; margin-right:4px;"><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/></svg>
            Hold card steady inside frame
          </div>
        </div>

        <div class="scan-actions-row">
          <button type="button" class="btn-capture" id="btn-capture-photo">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
            Capture Card Photo
          </button>
          <button type="button" class="btn-flash" id="btn-toggle-flash" title="Toggle Flash">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          </button>
        </div>
      </div>

      <!-- Manual 14-Digit Pehchan ID Box -->
      <div class="manual-id-box">
        <div class="manual-id-header">
          <span class="manual-id-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-terracotta)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 7h.01"/><path d="M17 7h.01"/><path d="M7 17h.01"/><path d="M17 17h.01"/></svg>
            Manual 14-Digit Pehchan ID
          </span>
          <span style="font-size:0.7rem; color:var(--text-secondary); font-weight:700;">Step 2A</span>
        </div>

        <div class="id-input-matched">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4"/><path d="M14 13.12c0 2.38 0 6.38-1 8.88"/><path d="M17.29 21.02c.12-.6.43-2.3.5-3.02"/><path d="M2 12a10 10 0 0 1 18-6"/><path d="M2 16h.01"/><path d="M21.8 16c.2-2 .131-5.354 0-6"/><path d="M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2"/><path d="M8.65 22c.21-.66.45-1.32.57-2"/><path d="M9 6.8a6 6 0 0 1 9 5.2v2"/></svg>
          <span class="id-number-text">${State.pehchanId}</span>
          <svg class="id-check-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.74-5.25z" clip-rule="evenodd" /></svg>
        </div>

        <!-- Official Ministry Database Matched Card -->
        <div class="match-found-card">
          <div class="match-header">
            <span class="match-org-title">Official Ministry of Textiles Database Linked</span>
            <span class="badge-green" style="font-size:0.62rem;">MATCH FOUND</span>
          </div>
          <div class="match-artisan-name">
            Registered: <strong>${State.artisanRegisteredName}</strong> • ${State.clusterName}
          </div>
        </div>

        <button type="button" class="btn-primary" id="btn-verify-pehchan" style="margin-bottom:10px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          Verify Pehchan &amp; Proceed to Bank Setup
        </button>

        <button type="button" class="btn-secondary" id="btn-skip-bank">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          Add Bank Details Later • Skip for now
        </button>

        <div style="font-size:0.68rem; color:var(--text-muted); text-align:center; margin-top:8px;">
          (You can link your bank anytime before your first craft payout)
        </div>
      </div>

      <!-- Don't have a Pehchan Card? -->
      <div style="font-size:0.75rem; color:var(--text-secondary); text-align:center; margin-top:16px;">
        <div style="font-weight:700; margin-bottom:4px; color:var(--text-primary);">Don't have a Pehchan Card?</div>
        <div>
          <span>📍 Apply at Nearest CSC Centre</span>
          <span style="margin: 0 4px;">•</span>
          <a href="tel:18002002787" style="color:var(--color-terracotta); text-decoration:none; font-weight:700;">📞 Call 1800-200-ARTS</a>
        </div>
      </div>
    </div>
  `;

  // Attach handlers
  container.querySelector('#btn-audio-step2').addEventListener('click', () => {
    AudioAssistance.playStep2();
  });

  // Capture Button (OCR Flash Simulation)
  const captureBtn = container.querySelector('#btn-capture-photo');
  const viewfinder = container.querySelector('#scanner-viewfinder');
  captureBtn.addEventListener('click', () => {
    viewfinder.style.boxShadow = '0 0 25px rgba(255, 255, 255, 0.9)';
    window.showToast?.("Capturing Pehchan Card... OCR Verified!");
    setTimeout(() => {
      viewfinder.style.boxShadow = 'none';
      window.showToast?.("Matched: Shri Rameshwar Lal (Varanasi Guild GI #84)");
    }, 400);
  });

  // Flash Button
  const flashBtn = container.querySelector('#btn-toggle-flash');
  flashBtn.addEventListener('click', () => {
    isFlashOn = !isFlashOn;
    flashBtn.style.background = isFlashOn ? '#FEF08A' : '#EFE8DC';
    window.showToast?.(isFlashOn ? "Camera Flash ON" : "Camera Flash OFF");
  });

  // Proceed button
  container.querySelector('#btn-verify-pehchan').addEventListener('click', () => {
    State.setScreen('bank');
  });

  // Skip button -> goes directly to Studio
  container.querySelector('#btn-skip-bank').addEventListener('click', () => {
    State.setScreen('studio');
  });
}
