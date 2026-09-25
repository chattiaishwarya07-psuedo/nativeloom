/**
 * Screen 1: Welcome & Identity (Step 1 of 4)
 * Exact recreation of User Provided Reference Screenshot
 */

import { State } from '../state.js';
import { AudioAssistance } from '../speech.js';

export function renderWelcomeScreen(container) {
  container.innerHTML = `
    <div class="welcome-screen animate-fade-in">
      
      <!-- Stepper Progress Bar -->
      <div class="stepper-container" style="padding-left:0; padding-right:0;">
        <div class="stepper-header">
          <span class="stepper-step-name">Welcome &amp; Identity</span>
          <span class="stepper-count">1 of 4</span>
        </div>
        <div class="stepper-track">
          <div class="stepper-fill" style="width: 25%;"></div>
        </div>
        <div class="stepper-caption">Step 1 of 4: Welcome &amp; Identity</div>
      </div>



      <!-- Simple Spoken Guide Video Demo Banner -->
      <div class="video-guide-card" onclick="window.playSpokenGuideDemo()" style="position:relative; width:100%; border-radius:14px; overflow:hidden; cursor:pointer; box-shadow:0 4px 16px rgba(0,0,0,0.12); margin-top:14px; margin-bottom:16px; border:1px solid rgba(122,40,19,0.18); background:#1F1916;">
        <img src="/assets/spoken_guide_demo.png" alt="Simple Spoken Guide - Tap to Play Video" style="width:100%; height:auto; display:block; object-fit:cover; transition:transform 0.25s ease;">
      </div>

      <!-- Choose Your Identity Header -->
      <h1 class="screen-headline" style="font-size:1.35rem; font-weight:900; margin-bottom:4px;">Choose Your Identity</h1>
      <p class="screen-subtext" style="margin-bottom:16px;">Join India's dedicated platform connecting indigenous artisans directly to patrons.</p>

      <!-- Select How You Will Participate -->
      <div class="section-label-row">
        <span class="section-label">Select How You Will Participate</span>
        <span class="badge-required">REQUIRED</span>
      </div>

      <!-- Role Selection Cards -->
      <div class="role-cards-container">
        <!-- Option 1: Artisan / Maker -->
        <div class="role-card ${State.role === 'artisan' ? 'selected' : ''}" id="role-card-artisan">
          <img src="/assets/raw_pottery_snap.jpg" alt="Artisan Maker" class="role-thumb" onerror="this.src='/assets/artisan_ramulu.jpg'">
          <div class="role-content">
            <div class="role-header">
              <span class="role-title">Artisan / Maker</span>
              <span class="badge-green">
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                Govt Pehchan
              </span>
            </div>
            <p class="role-desc">I make and sell authentic handicrafts directly with zero commission.</p>
          </div>
          <div class="role-radio">
            <span class="role-radio-check">✓</span>
          </div>
        </div>

        <!-- Option 2: Buyer / Patron -->
        <div class="role-card ${State.role === 'buyer' ? 'selected' : ''}" id="role-card-buyer">
          <img src="/assets/woodcraft_bowl.jpg" alt="Buyer Patron" class="role-thumb" onerror="this.src='/assets/bidriware_vase.jpg'">
          <div class="role-content">
            <div class="role-header">
              <span class="role-title">Buyer / Patron</span>
              <span class="badge-subtle">Individual</span>
            </div>
            <p class="role-desc">I want to discover and purchase verified handicrafts directly from makers.</p>
          </div>
          <div class="role-radio">
            <span class="role-radio-check">✓</span>
          </div>
        </div>
      </div>

      <!-- Direct Phone Authentication Box (Step 1 of 4) -->
      <div class="phone-auth-box" style="background:#FFFFFF; border:1px solid var(--border-subtle); border-radius:var(--radius-xl); padding:18px 16px; box-shadow:var(--shadow-sm); margin-bottom:16px;">
        
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <label style="font-size:0.75rem; font-weight:800; color:var(--text-primary); letter-spacing:0.04em;">
            MOBILE NUMBER
          </label>
          <span style="font-size:0.7rem; font-weight:700; color:#57534E; display:flex; align-items:center; gap:4px;">
            🔒 100% Encrypted
          </span>
        </div>

        <!-- Mobile Input Row -->
        <div style="display:flex; align-items:center; background:#FAF7F2; border:1.5px solid #EADBCE; border-radius:10px; padding:10px 14px; gap:10px; margin-bottom:6px;">
          <span style="font-size:0.85rem; font-weight:800; color:#1C1917; white-space:nowrap;">
            IN <strong>+91</strong>
          </span>
          <div style="width:1px; height:20px; background:#D6C7B2;"></div>
          <input type="tel" id="phone-input" value="98765 43210" maxlength="12" style="flex:1; border:none; background:transparent; outline:none; font-size:1.05rem; font-weight:800; color:#1C1917; letter-spacing:0.04em;">
          <button type="button" onclick="document.getElementById('phone-input').value=''; document.getElementById('phone-input').focus();" style="background:none; border:none; color:#A89582; cursor:pointer; font-size:1rem; padding:0; line-height:1;">
            ⊗
          </button>
        </div>
        <div style="font-size:0.7rem; color:var(--text-secondary); margin-bottom:16px;">
          SMS with instant single-use code will be sent
        </div>

        <!-- 4-Digit Security Code (OTP) -->
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <label style="font-size:0.75rem; font-weight:800; color:var(--text-primary); letter-spacing:0.04em;">
            4-DIGIT SECURITY CODE (OTP)
          </label>
          <span style="font-size:0.72rem; font-weight:700; color:#C2410C; display:flex; align-items:center; gap:4px;">
            ⏱ 00:48
          </span>
        </div>

        <!-- 4 Large Square Digit Boxes -->
        <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:10px; margin-bottom:14px;">
          <input type="text" class="otp-box" maxlength="1" value="7" id="otp-1" style="width:100%; height:52px; text-align:center; font-size:1.35rem; font-weight:900; background:#FAF7F2; border:1.5px solid #7A2813; border-radius:10px; outline:none; color:#1C1917;">
          <input type="text" class="otp-box" maxlength="1" value="4" id="otp-2" style="width:100%; height:52px; text-align:center; font-size:1.35rem; font-weight:900; background:#FAF7F2; border:1.5px solid #7A2813; border-radius:10px; outline:none; color:#1C1917;">
          <input type="text" class="otp-box" maxlength="1" value="2" id="otp-3" style="width:100%; height:52px; text-align:center; font-size:1.35rem; font-weight:900; background:#FAF7F2; border:1.5px solid #7A2813; border-radius:10px; outline:none; color:#1C1917;">
          <input type="text" class="otp-box" maxlength="1" value="" placeholder="•" id="otp-4" style="width:100%; height:52px; text-align:center; font-size:1.35rem; font-weight:900; background:#FAF7F2; border:1.5px solid #D6C7B2; border-radius:10px; outline:none; color:#1C1917;" autofocus>
        </div>

        <!-- Resend OTP Row -->
        <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.74rem; margin-bottom:18px;">
          <span style="color:var(--text-secondary);">Didn't receive code?</span>
          <button type="button" id="btn-resend-sms" style="background:none; border:none; color:#7A2813; font-weight:800; cursor:pointer; display:flex; align-items:center; gap:4px; font-size:0.74rem; padding:0;">
            📞 Resend OTP via Call or SMS
          </button>
        </div>

        <!-- Verify & Continue Button -->
        <button type="button" class="btn-primary" id="btn-verify-continue" style="width:100%; background:#7A2813; color:#FFFFFF; border:none; padding:14px; font-size:0.95rem; font-weight:800; border-radius:10px; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px; box-shadow:0 3px 8px rgba(122,40,19,0.25);">
          <span>Verify &amp; Continue →</span>
        </button>

        <p class="terms-caption" style="margin-top:10px; font-size:0.68rem; text-align:center; color:var(--text-muted);">
          By continuing, you agree to Native Loom's <a href="javascript:void(0)" style="color:#7A2813; font-weight:700;">Artisan Terms</a> and <a href="javascript:void(0)" style="color:#7A2813; font-weight:700;">Fair Trade Charter</a>.
        </p>
      </div>

      <!-- Govt. Certified National Ecosystem Footer Box -->
      <div class="ecosystem-box">
        <div class="ecosystem-header">
          <span class="ecosystem-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-terracotta)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            GOVT. CERTIFIED NATIONAL ECOSYSTEM
          </span>
          <span class="badge-green" style="background:#E2EFE7; border-color:#97CBB2; font-size:0.62rem;">MoT Approved</span>
        </div>

        <div class="ecosystem-grid">
          <div class="ecosystem-item">
            <div class="ecosystem-item-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg>
            </div>
            <div class="ecosystem-item-title">100% Direct</div>
            <div class="ecosystem-item-sub">To Bank Account</div>
          </div>

          <div class="ecosystem-item">
            <div class="ecosystem-item-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>
            </div>
            <div class="ecosystem-item-title">Zero Middleman</div>
            <div class="ecosystem-item-sub">0% Commission</div>
          </div>

          <div class="ecosystem-item">
            <div class="ecosystem-item-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 7h.01"/><path d="M17 7h.01"/><path d="M7 17h.01"/><path d="M17 17h.01"/></svg>
            </div>
            <div class="ecosystem-item-title">Pehchan ID</div>
            <div class="ecosystem-item-sub">Govt. Verified</div>
          </div>
        </div>

        <div class="ecosystem-tollfree">
          Need help signing up? <strong>Toll-Free 1800-200-ARTS</strong>
        </div>
      </div>
    </div>
  `;

  // Attach Event Handlers
  const artisanCard = container.querySelector('#role-card-artisan');
  const buyerCard = container.querySelector('#role-card-buyer');

  artisanCard.addEventListener('click', () => {
    State.setRole('artisan');
    artisanCard.classList.add('selected');
    buyerCard.classList.remove('selected');
  });

  buyerCard.addEventListener('click', () => {
    State.setRole('buyer');
    buyerCard.classList.add('selected');
    artisanCard.classList.remove('selected');
  });

  // Audio Play
  container.querySelector('#btn-play-step1')?.addEventListener('click', () => {
    AudioAssistance.playStep1();
  });

  // Auto-focus logic for 4 digit inputs
  const otpInputs = [
    container.querySelector('#otp-1'),
    container.querySelector('#otp-2'),
    container.querySelector('#otp-3'),
    container.querySelector('#otp-4')
  ];

  otpInputs.forEach((input, idx) => {
    input.addEventListener('keyup', (e) => {
      if (e.key >= '0' && e.key <= '9') {
        if (idx < 3) otpInputs[idx + 1].focus();
      } else if (e.key === 'Backspace') {
        if (idx > 0 && !input.value) otpInputs[idx - 1].focus();
      }
    });
  });

  // Verify and proceed
  container.querySelector('#btn-verify-continue').addEventListener('click', () => {
    if (State.role === 'artisan') {
      State.setScreen('pehchan');
    } else {
      State.setScreen('explore');
    }
  });

  // Resend buttons
  container.querySelector('#btn-resend-sms').addEventListener('click', () => {
    window.showToast?.("New 4-digit OTP sent via SMS to +91 98450 21980");
  });

  container.querySelector('#btn-resend-call').addEventListener('click', () => {
    window.showToast?.("Calling you with your verification code...");
  });
}
