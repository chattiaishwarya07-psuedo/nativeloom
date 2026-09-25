/**
 * Buyer Authentication Flow (Role: BUYER)
 * Streamlined consumer phone OTP + name sign-in
 * No Pehchan ID or seller paperwork required.
 */

import { State, AccountType } from '../state.js';

export function renderBuyerAuthScreen(container) {
  container.innerHTML = `
    <div class="buyer-auth-screen animate-fade-in" style="padding: 16px 14px 32px; background: #FAF7F2; min-height: 100vh;">
      
      <!-- Top Step Meta Row -->
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
        <button type="button" class="header-btn" onclick="window.navigateToScreen('account_select')" style="display:flex; align-items:center; gap:4px; font-size:0.75rem; font-weight:700; color:var(--text-secondary); background:none; border:none; cursor:pointer;">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          Back to Roles
        </button>
        <span style="font-size:0.68rem; font-weight:800; color:#1C3550; letter-spacing:0.04em;">
          PATRON &amp; CONSUMER LOGIN
        </span>
      </div>

      <!-- Title & Headline -->
      <div style="margin-bottom:18px;">
        <h1 style="font-size:1.35rem; font-weight:900; color:var(--text-primary); margin:0 0 4px 0;">
          Patron Sign-In
        </h1>
        <p style="font-size:0.76rem; color:var(--text-secondary); margin:0; line-height:1.4;">
          Quick phone login for individual patrons. Purchase GI-certified handmade crafts directly from verified cluster artisans.
        </p>
      </div>

      <!-- Auth Form Card -->
      <div style="background:#FFFFFF; border:1px solid var(--border-subtle); border-radius:var(--radius-xl); padding:18px 16px; box-shadow:var(--shadow-sm); margin-bottom:16px;">
        
        <!-- Full Name -->
        <label style="display:block; font-size:0.74rem; font-weight:800; color:var(--text-primary); margin-bottom:6px;">
          YOUR FULL NAME
        </label>
        <div style="display:flex; align-items:center; background:#FAF7F2; border:1px solid var(--border-subtle); border-radius:var(--radius-md); padding:10px 12px; gap:8px; margin-bottom:14px;">
          <span style="font-size:0.9rem;">👤</span>
          <input type="text" id="input-buyer-name" value="Aditi Varma" placeholder="Enter your full name" style="flex:1; border:none; background:transparent; outline:none; font-size:0.9rem; font-weight:700; color:var(--text-primary);">
        </div>

        <!-- Phone Number -->
        <label style="display:block; font-size:0.74rem; font-weight:800; color:var(--text-primary); margin-bottom:6px;">
          MOBILE NUMBER (FOR DELIVERY &amp; OTP)
        </label>
        <div style="display:flex; align-items:center; background:#FAF7F2; border:1px solid var(--border-subtle); border-radius:var(--radius-md); padding:10px 12px; gap:8px; margin-bottom:14px;">
          <span style="font-size:0.9rem; font-weight:800; color:#1C3550;">🇮🇳 +91</span>
          <input type="tel" id="input-buyer-phone" value="98450 21980" style="flex:1; border:none; background:transparent; outline:none; font-size:0.95rem; font-weight:800; color:var(--text-primary);">
        </div>

        <!-- Delivery Pincode -->
        <label style="display:block; font-size:0.74rem; font-weight:800; color:var(--text-primary); margin-bottom:6px;">
          DELIVERY PINCODE (FOR SPEED POST ESTIMATES)
        </label>
        <div style="display:flex; align-items:center; background:#FAF7F2; border:1px solid var(--border-subtle); border-radius:var(--radius-md); padding:10px 12px; gap:8px; margin-bottom:16px;">
          <span style="font-size:0.9rem;">📍</span>
          <input type="text" id="input-buyer-pin" value="560038 - Bengaluru, KA" style="flex:1; border:none; background:transparent; outline:none; font-size:0.85rem; font-weight:700; color:var(--text-primary);">
        </div>

        <!-- 4-Digit Security OTP -->
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <label style="font-size:0.74rem; font-weight:800; color:var(--text-primary);">
            4-DIGIT VERIFICATION CODE
          </label>
          <span style="font-size:0.7rem; font-weight:700; color:#1E6B47;">OTP Sent ✓</span>
        </div>

        <div style="display:flex; justify-content:center; gap:10px; margin:6px 0 16px;">
          <input type="text" maxlength="1" value="5" style="width:42px; height:42px; text-align:center; font-size:1.1rem; font-weight:800; background:#FAF7F2; border:1.5px solid #1C3550; border-radius:8px; outline:none; box-sizing:border-box;">
          <input type="text" maxlength="1" value="2" style="width:42px; height:42px; text-align:center; font-size:1.1rem; font-weight:800; background:#FAF7F2; border:1.5px solid #1C3550; border-radius:8px; outline:none; box-sizing:border-box;">
          <input type="text" maxlength="1" value="9" style="width:42px; height:42px; text-align:center; font-size:1.1rem; font-weight:800; background:#FAF7F2; border:1.5px solid #1C3550; border-radius:8px; outline:none; box-sizing:border-box;">
          <input type="text" maxlength="1" value="1" style="width:42px; height:42px; text-align:center; font-size:1.1rem; font-weight:800; background:#FAF7F2; border:1.5px solid #1C3550; border-radius:8px; outline:none; box-sizing:border-box;">
        </div>

        <!-- Submit Button -->
        <button type="button" class="btn-primary" id="btn-submit-buyer-auth" style="width:100%; background:#1C3550; color:#FFFFFF; border:none; padding:14px; font-size:0.9rem; font-weight:800; border-radius:var(--radius-md); cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px;">
          <span>Enter Patron Marketplace →</span>
        </button>

      </div>

      <!-- Patron Guarantee Badge -->
      <div style="background:#FFF9F5; border:1px solid #EADBCE; border-radius:var(--radius-md); padding:10px 12px; display:flex; align-items:center; gap:10px;">
        <span style="font-size:1.2rem;">🏺</span>
        <div style="font-size:0.72rem; color:var(--text-secondary); line-height:1.35;">
          <strong>Craft Protection Guarantee:</strong> Every purchase includes free transit insurance and direct dispatch tracking via Delivery Agent.
        </div>
      </div>

    </div>
  `;

  // Submit Handler
  container.querySelector('#btn-submit-buyer-auth').addEventListener('click', () => {
    window.showToast?.("Welcome, Aditi Varma! Patron Market unlocked.");
    State.loginAs(AccountType.BUYER, {
      name: 'Aditi Varma',
      phone: '+91 98450 21980',
      city: 'Bengaluru'
    });
  });
}
