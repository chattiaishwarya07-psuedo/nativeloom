/**
 * Artisan Authentication Flow (Role: ARTISAN)
 * Independent Artisan Phone OTP & Pehchan Onboarding
 */

import { State, AccountType } from '../state.js';
import { AudioAssistance } from '../speech.js';

export function renderArtisanAuthScreen(container) {
  let otpValues = ['8', '3', '1', '4'];

  container.innerHTML = `
    <div class="artisan-auth-screen animate-fade-in" style="padding: 16px 14px 32px; background: #FAF7F2; min-height: 100vh;">
      
      <!-- Top Step Meta Row -->
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
        <button type="button" class="header-btn" onclick="window.navigateToScreen('account_select')" style="display:flex; align-items:center; gap:4px; font-size:0.75rem; font-weight:700; color:var(--text-secondary); background:none; border:none; cursor:pointer;">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          Back to Roles
        </button>
        <span style="font-size:0.68rem; font-weight:800; color:#7A2813; letter-spacing:0.04em;">
          ARTISAN PORTAL LOGIN
        </span>
      </div>

      <!-- Stepper Progress Bar (Step 1 of 4) -->
      <div style="margin-bottom:12px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
          <span style="font-size:0.85rem; font-weight:800; color:var(--text-primary);">Welcome &amp; Identity</span>
          <span style="font-size:0.75rem; font-weight:800; color:#7A2813;">1 of 4</span>
        </div>
        <div style="width:100%; height:5px; background:#E5DAC8; border-radius:var(--radius-pill); overflow:hidden; margin-bottom:4px;">
          <div style="width:25%; height:100%; background:#7A2813;"></div>
        </div>
        <div style="font-size:0.72rem; color:var(--text-secondary); font-weight:600;">Step 1 of 4: Welcome &amp; Identity</div>
      </div>

      <!-- Simple Spoken Guide Video Demo Banner -->
      <div class="video-guide-card" onclick="window.playSpokenGuideDemo()" style="position:relative; width:100%; border-radius:14px; overflow:hidden; cursor:pointer; box-shadow:0 4px 16px rgba(0,0,0,0.12); margin-bottom:16px; border:1px solid rgba(122,40,19,0.18); background:#1F1916;">
        <img src="/assets/spoken_guide_demo.png" alt="Simple Spoken Guide - Tap to Play Video" style="width:100%; height:auto; display:block; object-fit:cover; transition:transform 0.25s ease;">
      </div>

      <!-- Spoken Audio Assistance Banner -->
      <div style="background:#FFF0E6; border:1px solid #FCD7C2; border-radius:var(--radius-md); padding:10px 12px; display:flex; align-items:center; gap:10px; margin-bottom:16px;">
        <button type="button" onclick="window.AudioAssistance.speak('कारीगर लॉगिन: अपना 10 अंकों का मोबाइल नंबर दर्ज करें और ओटीपी सत्यापित करें।')" style="width:34px; height:34px; border-radius:50%; background:#7A2813; color:#FFFFFF; border:none; display:flex; align-items:center; justify-content:center; cursor:pointer; flex-shrink:0;">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        </button>
        <div style="flex:1;">
          <div style="font-size:0.8rem; font-weight:800; color:#7A2813;">Aawaz Sahayata Available</div>
          <div style="font-size:0.7rem; color:var(--text-secondary);">Tap speaker to hear instructions in your regional dialect</div>
        </div>
      </div>

      <!-- Title & Headline -->
      <h1 style="font-size:1.35rem; font-weight:900; color:var(--text-primary); margin:0 0 4px 0;">
        Artisan Sign-In &amp; Studio Access
      </h1>
      <p style="font-size:0.76rem; color:var(--text-secondary); margin:0 0 16px 0; line-height:1.4;">
        Enter your Pehchan-registered mobile number to access your artisan dashboard, urgent incoming orders, and direct DBT bank payouts.
      </p>

      <!-- Auth Card (Step 1 of 4 Matching Reference) -->
      <div style="background:#FFFFFF; border:1px solid var(--border-subtle); border-radius:var(--radius-xl); padding:18px 16px; box-shadow:var(--shadow-sm); margin-bottom:16px;">
        
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
          <input type="tel" id="input-artisan-phone" value="98765 43210" maxlength="12" style="flex:1; border:none; background:transparent; outline:none; font-size:1.05rem; font-weight:800; color:#1C1917; letter-spacing:0.04em;">
          <button type="button" onclick="document.getElementById('input-artisan-phone').value=''; document.getElementById('input-artisan-phone').focus();" style="background:none; border:none; color:#A89582; cursor:pointer; font-size:1rem; padding:0; line-height:1;">
            ⊗
          </button>
        </div>
        <div style="font-size:0.7rem; color:var(--text-secondary); margin-bottom:16px;">
          SMS with instant single-use code will be sent
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <label style="font-size:0.75rem; font-weight:800; color:var(--text-primary); letter-spacing:0.04em;">
            4-DIGIT SECURITY CODE (OTP)
          </label>
          <span style="font-size:0.72rem; font-weight:700; color:#C2410C; display:flex; align-items:center; gap:4px;">
            ⏱ 00:48
          </span>
        </div>

        <!-- 4-Digit OTP Boxes -->
        <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:10px; margin-bottom:14px;">
          <input type="text" maxlength="1" value="7" style="width:100%; height:52px; text-align:center; font-size:1.35rem; font-weight:900; background:#FAF7F2; border:1.5px solid #7A2813; border-radius:10px; outline:none; color:#1C1917; box-sizing:border-box;">
          <input type="text" maxlength="1" value="4" style="width:100%; height:52px; text-align:center; font-size:1.35rem; font-weight:900; background:#FAF7F2; border:1.5px solid #7A2813; border-radius:10px; outline:none; color:#1C1917; box-sizing:border-box;">
          <input type="text" maxlength="1" value="2" style="width:100%; height:52px; text-align:center; font-size:1.35rem; font-weight:900; background:#FAF7F2; border:1.5px solid #7A2813; border-radius:10px; outline:none; color:#1C1917; box-sizing:border-box;">
          <input type="text" maxlength="1" value="" placeholder="•" style="width:100%; height:52px; text-align:center; font-size:1.35rem; font-weight:900; background:#FAF7F2; border:1.5px solid #D6C7B2; border-radius:10px; outline:none; color:#1C1917; box-sizing:border-box;">
        </div>

        <!-- Resend OTP Row -->
        <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.74rem; margin-bottom:18px;">
          <span style="color:var(--text-secondary);">Didn't receive code?</span>
          <button type="button" onclick="window.showToast?.('Resending 4-digit OTP via Call or SMS...')" style="background:none; border:none; color:#7A2813; font-weight:800; cursor:pointer; display:flex; align-items:center; gap:4px; font-size:0.74rem; padding:0;">
            📞 Resend OTP via Call or SMS
          </button>
        </div>

        <!-- Verify & Continue Button -->
        <button type="button" class="btn-primary" id="btn-submit-artisan-auth" style="width:100%; background:#7A2813; color:#FFFFFF; border:none; padding:14px; font-size:0.95rem; font-weight:800; border-radius:10px; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px; box-shadow:0 3px 8px rgba(122,40,19,0.25);">
          <span>Verify &amp; Continue →</span>
        </button>

      </div>

      <!-- Trust & Protection Notice -->
      <div style="background:#E7F4ED; border:1px solid #B7DFCA; border-radius:var(--radius-md); padding:10px 12px; display:flex; align-items:center; gap:10px;">
        <span style="color:#1E6B47; font-size:1.2rem;">🛡️</span>
        <div style="font-size:0.72rem; color:#174332; line-height:1.35;">
          <strong>Official Pehchan Card Integration:</strong> Direct bank account linking via PFMS/DBT ensures 0% intermediary deductions.
        </div>
      </div>

    </div>
  `;

  // Attach submit handler
  container.querySelector('#btn-submit-artisan-auth').addEventListener('click', () => {
    window.showToast?.("Artisan authenticated! Welcome back, Ramdev Kumhar.");
    State.loginAs(AccountType.ARTISAN, {
      name: 'Ramdev Kumhar',
      pehchan: 'UP-VAR-49281',
      cluster: 'Varanasi Clay Cluster, UP'
    });
    State.setScreen('artisan_pehchan');
  });
}
