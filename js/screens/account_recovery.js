/**
 * Screen: Trouble Logging In or Receiving OTP? (Rural Account Recovery)
 * Exact recreation of User Provided Reference Screenshot (Screen 3)
 */

import { State } from '../state.js';
import { AudioAssistance } from '../speech.js';

export function renderAccountRecoveryScreen(container) {
  container.innerHTML = `
    <div class="recovery-screen animate-fade-in" style="padding-bottom:30px;">
      
      <!-- Top Audio Guide Banner (Terracotta Gradient) -->
      <div style="background:linear-gradient(135deg, #A84318 0%, #7A2E0E 100%); color:#FFFFFF; border-radius:var(--radius-lg); padding:14px; margin: 8px 0 14px; position:relative;">
        <div style="display:flex; gap:10px; align-items:center; margin-bottom:10px;">
          <div style="width:36px; height:36px; border-radius:10px; background:rgba(255,255,255,0.2); display:flex; align-items:center; justify-content:center;">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
          </div>
          <div style="flex:1;">
            <div style="font-size:0.88rem; font-weight:800;">Listen to Spoken Recovery Guide</div>
            <div style="font-size:0.7rem; opacity:0.9;">Audio help available in your preferred dialect</div>
          </div>
        </div>

        <div style="display:flex; gap:6px;">
          <button type="button" class="btn-secondary" style="background:#FFFFFF; color:#7A2E0E; border:none; padding:4px 12px; font-size:0.72rem; font-weight:800;" onclick="window.AudioAssistance.speak('लॉगिन सहायता: यदि ओटीपी नहीं मिल रहा है, तो कॉल से ओटीपी सुनें या नजदीकी सीएससी केंद्र पर जाएं।')">
            Hindi
          </button>
          <button type="button" class="btn-secondary" style="background:rgba(255,255,255,0.2); color:#FFFFFF; border:none; padding:4px 12px; font-size:0.72rem; font-weight:700;" onclick="window.AudioAssistance.speak('लॉगिन में दिक्कत बा त फोन से ओटीपी सुनीं या सहायता केंद्र से संपर्क करीं।')">
            Bhojpuri
          </button>
          <button type="button" class="btn-secondary" style="background:rgba(255,255,255,0.2); color:#FFFFFF; border:none; padding:4px 12px; font-size:0.72rem; font-weight:700;" onclick="window.AudioAssistance.speak('लॉगिन सहायता: अपना नजदीकी सीएससी केंद्र पर पहिचान पत्र ल क जाऊ।')">
            Maithili
          </button>
        </div>
      </div>

      <!-- Title & Subtitle -->
      <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">
        <span style="font-size:1.2rem;">🔄</span>
        <h1 style="font-size:1.25rem; font-weight:900; color:var(--text-primary); margin:0;">
          Trouble Logging In or Receiving OTP?
        </h1>
      </div>
      <p style="font-size:0.75rem; color:var(--text-secondary); line-height:1.35; margin-bottom:14px;">
        Easy recovery options for rural artisans without email
      </p>

      <!-- Option A: Resend OTP via Voice Call or SMS -->
      <div class="recovery-option-card">
        <div style="display:flex; align-items:center; gap:6px; margin-bottom:6px;">
          <span style="font-size:1rem;">💬</span>
          <span class="recovery-badge">Option A</span>
        </div>
        <div style="font-size:0.88rem; font-weight:800; color:var(--text-primary); margin-bottom:4px;">
          Resend OTP via Voice Call or SMS
        </div>
        <div style="font-size:0.72rem; color:var(--text-muted); margin-bottom:4px;">Receive your verification code instantly</div>
        <p style="font-size:0.72rem; color:var(--text-secondary); line-height:1.35; margin-bottom:10px;">
          If SMS is delayed or not received, you can also listen to your 4-digit code over a voice call:
        </p>

        <div style="display:grid; grid-template-columns:1fr 1.3fr; gap:8px;">
          <button type="button" class="btn-secondary" style="padding:10px; font-size:0.78rem;" onclick="window.showToast('SMS OTP re-sent: [ 8 3 1 4 ] to +91 98450 21980')">
            💬 SMS OTP
          </button>
          <button type="button" class="btn-primary" style="padding:10px; font-size:0.78rem;" onclick="window.triggerVoiceOtpModal()">
            📞 Call with Voice OTP
          </button>
        </div>
      </div>

      <!-- Option B: Call Artisan Companion Helpline -->
      <div class="recovery-option-card">
        <div style="display:flex; align-items:center; gap:6px; margin-bottom:6px;">
          <span style="font-size:1rem;">🎧</span>
          <span class="recovery-badge" style="background:#EFF6FF; color:#1E40AF;">Option B</span>
        </div>
        <div style="font-size:0.88rem; font-weight:800; color:var(--text-primary); margin-bottom:2px;">
          Call Artisan Companion Helpline
        </div>
        <div style="font-size:0.72rem; color:var(--text-secondary); margin-bottom:10px;">
          Speak directly to an artisan support representative
        </div>

        <div style="background:#FAF7F2; border-radius:var(--radius-sm); padding:8px 10px; font-size:0.72rem; color:var(--text-secondary); margin-bottom:10px;">
          <span style="font-weight:700; color:var(--color-terracotta);">Available in 8 regional languages</span><br>
          Dedicated assistance • 8:00 AM to 8:00 PM
        </div>

        <button type="button" class="btn-secondary" style="background:#1C3550; color:#FFFFFF; border:none; padding:12px; font-size:0.85rem; font-weight:800;" onclick="window.showToast('Connecting to 1800-200-ARTS (Toll-Free)...')">
          📞 1800-200-ARTS (1800-200-2787)
        </button>
      </div>

      <!-- Option C: Verify via Alternate Registered Number -->
      <div class="recovery-option-card">
        <div style="display:flex; align-items:center; gap:6px; margin-bottom:6px;">
          <span style="font-size:1rem;">👥</span>
          <span class="recovery-badge">Option C</span>
        </div>
        <div style="font-size:0.88rem; font-weight:800; color:var(--text-primary); margin-bottom:2px;">
          Verify via Alternate Registered Number
        </div>
        <div style="font-size:0.72rem; color:var(--text-secondary); margin-bottom:10px;">
          Use family or Aadhaar linked mobile number
        </div>

        <div style="font-size:0.72rem; color:var(--text-muted); margin-bottom:4px;">Enter family or Aadhaar linked phone number:</div>
        <div style="display:flex; align-items:center; background:#FAF7F2; border:1px solid var(--border-subtle); border-radius:var(--radius-md); padding:8px 12px; gap:8px; margin-bottom:8px;">
          <span style="font-size:1rem;">📱</span>
          <input type="tel" placeholder="10-digit alternate phone number" style="flex:1; border:none; background:transparent; outline:none; font-size:0.85rem; font-weight:700;">
        </div>

        <button type="button" class="btn-primary" style="padding:10px; font-size:0.8rem;" onclick="window.showToast('Security code sent to alternate phone!')">
          Send Security Code →
        </button>
      </div>

      <!-- Option D: Visit Nearest Common Service Centre (CSC) -->
      <div class="recovery-option-card">
        <div style="display:flex; align-items:center; gap:6px; margin-bottom:6px;">
          <span style="font-size:1rem;">🏛️</span>
          <span class="recovery-badge">Option D</span>
        </div>
        <div style="font-size:0.88rem; font-weight:800; color:var(--text-primary); margin-bottom:2px;">
          Visit Nearest Common Service Centre (CSC)
        </div>
        <div style="font-size:0.72rem; color:var(--text-secondary); margin-bottom:10px;">
          Assisted in-person verification
        </div>

        <div style="position:relative; height:120px; border-radius:8px; overflow:hidden; margin-bottom:10px;">
          <img src="/assets/artisan_sunita.jpg" alt="CSC Center" style="width:100%; height:100%; object-fit:cover;">
          <span style="position:absolute; bottom:6px; left:6px; background:rgba(0,0,0,0.75); color:#fff; font-size:0.62rem; font-weight:700; padding:2px 8px; border-radius:var(--radius-pill);">
            Carry physical Pehchan Card
          </span>
        </div>

        <p style="font-size:0.72rem; color:var(--text-secondary); line-height:1.35; margin-bottom:10px;">
          Carry your physical Pehchan Card to reactivate account with CSC village operator or post office.
        </p>

        <button type="button" class="btn-secondary" style="padding:10px; font-size:0.8rem;" onclick="window.openCscLocatorModal()">
          📍 Find Nearby CSC Centre
        </button>
      </div>

      <!-- Security Guarantee Box -->
      <div style="background:#E8F5EE; border:1px solid var(--color-green-border); border-radius:var(--radius-md); padding:10px 12px; display:flex; gap:10px; align-items:center; margin-bottom:16px;">
        <span style="color:var(--color-green); font-size:1.2rem;">🛡️</span>
        <div style="font-size:0.72rem; color:#174332; line-height:1.35;">
          <strong>Your bank account and earnings remain 100% safe &amp; protected.</strong><br>
          All personal records and funds are secure.
        </div>
      </div>

      <!-- Return to Login Button -->
      <button type="button" class="btn-secondary" onclick="window.navigateToScreen('welcome')" style="padding:12px; font-size:0.82rem; font-weight:800;">
        ← Return to Login
      </button>

    </div>
  `;
}
