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

      <!-- Audio Assistance Available Banner -->
      <div class="audio-banner" style="margin-left:0; margin-right:0; margin-top:10px;">
        <div class="audio-banner-header">Audio Assistance Available</div>
        <div class="audio-banner-text">Tap to listen to spoken instructions in your preferred language</div>
        <button type="button" class="audio-play-btn" id="btn-play-step1">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          Play Instructions
        </button>
      </div>

      <!-- Choose Your Identity Header -->
      <h1 class="screen-headline">Choose Your Identity</h1>
      <p class="screen-subtext">Join India's dedicated platform connecting indigenous artisans directly to patrons.</p>

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

      <!-- Direct Phone Authentication Box -->
      <div class="phone-auth-box">
        <div class="phone-auth-title">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-terracotta)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>
          Direct Phone Authentication
        </div>
        <p class="phone-auth-desc">Enter your active mobile number to receive a secure 4-digit code</p>

        <label class="input-label" for="phone-input">10-Digit Mobile Number</label>
        <div class="phone-input-group">
          <span class="country-code">
            <span style="font-size:1.1rem; line-height:1;">🇮🇳</span> +91
          </span>
          <input type="tel" id="phone-input" class="phone-number-field" value="${State.phone}" maxlength="10" placeholder="98450 21980">
          <span class="otp-ready-badge">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            OTP Ready
          </span>
        </div>
        <div class="phone-hint">Numeric keypad enabled • Standard carrier SMS rates may apply</div>

        <!-- Enter 4-Digit SMS Code -->
        <div class="otp-label-row">
          <label class="input-label" style="margin-bottom:0;">Enter 4-Digit SMS Code</label>
          <span class="otp-timer">⏱ Expires in 01:48</span>
        </div>

        <div class="otp-boxes-grid">
          <input type="text" class="otp-box" maxlength="1" value="8" id="otp-1">
          <input type="text" class="otp-box" maxlength="1" value="3" id="otp-2">
          <input type="text" class="otp-box" maxlength="1" value="1" id="otp-3">
          <input type="text" class="otp-box" maxlength="1" value="" placeholder="•" id="otp-4" autofocus>
        </div>

        <div class="resend-row">
          <span>Didn't get the message?</span>
          <div class="resend-links">
            <button type="button" class="resend-btn" id="btn-resend-sms">Resend OTP via SMS</button>
            <span style="color:var(--border-subtle)">|</span>
            <button type="button" class="resend-btn" id="btn-resend-call">Call</button>
          </div>
        </div>

        <button type="button" class="btn-primary" id="btn-verify-continue">
          Verify &amp; Continue →
        </button>

        <p class="terms-caption">
          By continuing, you agree to Hastshilp Sangam's <a href="javascript:void(0)">Artisan Terms</a> and <a href="javascript:void(0)">Fair Trade Charter</a>.
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
  container.querySelector('#btn-play-step1').addEventListener('click', () => {
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
