/**
 * Screen: Trouble Logging In or Receiving OTP? (Role-Aware Account Recovery)
 * First asks which account type is being recovered (Artisan vs Buyer vs Corporate),
 * then dynamically presents the appropriate recovery options.
 */

import { State, AccountType } from '../state.js';
import { AudioAssistance } from '../speech.js';
import { i18n, t } from '../i18n.js';

export function renderAccountRecoveryScreen(container) {
  let selectedRecoveryRole = 'artisan'; // 'artisan' | 'buyer' | 'corporate'

  function renderContent() {
    return `
      <div class="recovery-screen animate-fade-in" style="padding: 16px 14px 32px; background: #FAF7F2; min-height: 100vh;">
        
        <!-- Top Audio Guide Banner (Terracotta Gradient) -->
        <div style="background:linear-gradient(135deg, #A84318 0%, #7A2E0E 100%); color:#FFFFFF; border-radius:var(--radius-lg); padding:14px; margin-bottom: 14px; position:relative;">
          <div style="display:flex; gap:10px; align-items:center; margin-bottom:10px;">
            <div style="width:36px; height:36px; border-radius:10px; background:rgba(255,255,255,0.2); display:flex; align-items:center; justify-content:center;">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
            </div>
            <div style="flex:1;">
              <div style="font-size:0.88rem; font-weight:800;">${t('audioBtn', 'Listen to Spoken Recovery Guide')}</div>
              <div style="font-size:0.7rem; opacity:0.9;">Audio help available in your preferred dialect (${i18n.metadata.native})</div>
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
            ${t('recoveryTitle', 'Trouble Logging In or Receiving OTP?')}
          </h1>
        </div>
        <p style="font-size:0.75rem; color:var(--text-secondary); line-height:1.35; margin-bottom:14px;">
          ${t('recoverySub', 'Account recovery routes to different backend systems based on your role. Please select which account you want to restore:')}
        </p>

        <!-- MANDATORY STEP: SELECT ACCOUNT TYPE TO RECOVER -->
        <div style="background:#FFFFFF; border:1px solid var(--border-subtle); border-radius:var(--radius-lg); padding:12px; margin-bottom:16px;">
          <label style="display:block; font-size:0.72rem; font-weight:800; color:var(--text-primary); margin-bottom:8px; text-transform:uppercase;">
            ${t('recoveryRoleStep', '1. Select Account Type Being Recovered:')}
          </label>
          <div style="display:grid; grid-template-columns:1fr 1fr 1.1fr; gap:6px;">
            <button type="button" class="btn-role-tab ${selectedRecoveryRole === 'artisan' ? 'active' : ''}" data-role="artisan" style="padding:8px 6px; font-size:0.72rem; font-weight:800; border-radius:var(--radius-md); border:1.5px solid ${selectedRecoveryRole === 'artisan' ? '#7A2813' : 'var(--border-subtle)'}; background:${selectedRecoveryRole === 'artisan' ? '#FEECE5' : '#FAF7F2'}; color:${selectedRecoveryRole === 'artisan' ? '#7A2813' : 'var(--text-primary)'}; cursor:pointer;">
              👨‍🎨 ${t('artisanCardTitle', 'Artisan')}
            </button>
            <button type="button" class="btn-role-tab ${selectedRecoveryRole === 'buyer' ? 'active' : ''}" data-role="buyer" style="padding:8px 6px; font-size:0.72rem; font-weight:800; border-radius:var(--radius-md); border:1.5px solid ${selectedRecoveryRole === 'buyer' ? '#1C3550' : 'var(--border-subtle)'}; background:${selectedRecoveryRole === 'buyer' ? '#EBF3FB' : '#FAF7F2'}; color:${selectedRecoveryRole === 'buyer' ? '#1C3550' : 'var(--text-primary)'}; cursor:pointer;">
              🛍️ ${t('buyerCardTitle', 'Buyer')}
            </button>
            <button type="button" class="btn-role-tab ${selectedRecoveryRole === 'corporate' ? 'active' : ''}" data-role="corporate" style="padding:8px 6px; font-size:0.72rem; font-weight:800; border-radius:var(--radius-md); border:1.5px solid ${selectedRecoveryRole === 'corporate' ? '#0F172A' : 'var(--border-subtle)'}; background:${selectedRecoveryRole === 'corporate' ? '#F1F5F9' : '#FAF7F2'}; color:${selectedRecoveryRole === 'corporate' ? '#0F172A' : 'var(--text-primary)'}; cursor:pointer;">
              🏛️ ${t('corporateCardTitle', 'Corporate')}
            </button>
          </div>
        </div>

        ${renderRoleSpecificOptions()}

        <!-- Security Guarantee Box -->
        <div style="background:#E8F5EE; border:1px solid var(--color-green-border); border-radius:var(--radius-md); padding:10px 12px; display:flex; gap:10px; align-items:center; margin-top:16px; margin-bottom:14px;">
          <span style="color:var(--color-green); font-size:1.2rem;">🛡️</span>
          <div style="font-size:0.72rem; color:#174332; line-height:1.35;">
            <strong>Your account and data remain 100% safe &amp; protected.</strong><br>
            All KYC/KYB records and funds are encrypted and secure.
          </div>
        </div>

        <!-- Return to Login Button -->
        <button type="button" class="btn-secondary" onclick="window.navigateToScreen('account_select')" style="width:100%; padding:12px; font-size:0.82rem; font-weight:800;">
          ← Return to Role Selection
        </button>

      </div>
    `;
  }

  function renderRoleSpecificOptions() {
    if (selectedRecoveryRole === 'artisan') {
      // Artisan Recovery Options (Matches Screenshot 3)
      return `
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
            If SMS is delayed or not received, listen to your 4-digit code in your regional language:
          </p>

          <div style="display:grid; grid-template-columns:1fr 1.3fr; gap:8px;">
            <button type="button" class="btn-secondary" style="padding:10px; font-size:0.78rem;" onclick="window.showToast('SMS OTP re-sent: [ 8 3 1 4 ] to artisan phone')">
              💬 SMS OTP
            </button>
            <button type="button" class="btn-primary" style="padding:10px; font-size:0.78rem; background:#7A2813;" onclick="window.AudioAssistance.speak('आपका 4 अंकों का सुरक्षा कोड है: 8 3 1 4')">
              📞 Call with Voice OTP
            </button>
          </div>
        </div>

        <!-- Option B: Call Artisan Companion Helpline -->
        <div class="recovery-option-card" style="margin-top:10px;">
          <div style="display:flex; align-items:center; gap:6px; margin-bottom:6px;">
            <span style="font-size:1rem;">🎧</span>
            <span class="recovery-badge" style="background:#EFF6FF; color:#1E40AF;">Option B</span>
          </div>
          <div style="font-size:0.88rem; font-weight:800; color:var(--text-primary); margin-bottom:2px;">
            Call Artisan Companion Helpline
          </div>
          <div style="font-size:0.72rem; color:var(--text-secondary); margin-bottom:8px;">
            Speak directly to an artisan support representative
          </div>

          <div style="background:#FAF7F2; border-radius:var(--radius-sm); padding:8px 10px; font-size:0.72rem; color:var(--text-secondary); margin-bottom:10px;">
            <span style="font-weight:700; color:var(--color-terracotta);">Available in 8 regional languages</span><br>
            Dedicated assistance • 8:00 AM to 8:00 PM
          </div>

          <button type="button" class="btn-secondary" style="background:#1C3550; color:#FFFFFF; border:none; padding:12px; font-size:0.85rem; font-weight:800; width:100%; cursor:pointer;" onclick="window.showToast('Connecting to 1800-200-ARTS (Toll-Free)...')">
            📞 1800-200-ARTS (1800-200-2787)
          </button>
        </div>

        <!-- Option D: CSC Center -->
        <div class="recovery-option-card" style="margin-top:10px;">
          <div style="display:flex; align-items:center; gap:6px; margin-bottom:6px;">
            <span style="font-size:1rem;">🏛️</span>
            <span class="recovery-badge">Option C</span>
          </div>
          <div style="font-size:0.88rem; font-weight:800; color:var(--text-primary); margin-bottom:2px;">
            Visit Nearest Common Service Centre (CSC)
          </div>
          <div style="font-size:0.72rem; color:var(--text-secondary); margin-bottom:10px;">
            Assisted in-person verification with physical Pehchan Card
          </div>

          <p style="font-size:0.72rem; color:var(--text-secondary); line-height:1.35; margin-bottom:10px;">
            Carry your physical Pehchan Card to reactivate account with CSC village operator or post office.
          </p>

          <button type="button" class="btn-secondary" style="padding:10px; font-size:0.8rem; width:100%;" onclick="window.showToast('Nearest CSC: Varanasi Rural VLE Center (1.2 km away)')">
            📍 Find Nearby CSC Centre
          </button>
        </div>
      `;
    } else if (selectedRecoveryRole === 'buyer') {
      // Buyer Recovery Options
      return `
        <div class="recovery-option-card">
          <div style="display:flex; align-items:center; gap:6px; margin-bottom:6px;">
            <span style="font-size:1rem;">📱</span>
            <span class="recovery-badge" style="background:#EBF3FB; color:#1C3550;">Buyer Recovery</span>
          </div>
          <div style="font-size:0.88rem; font-weight:800; color:var(--text-primary); margin-bottom:4px;">
            Verify with Delivery Phone Number
          </div>
          <p style="font-size:0.72rem; color:var(--text-secondary); line-height:1.35; margin-bottom:10px;">
            Enter your mobile number linked to past craft orders to receive an instant WhatsApp or SMS recovery link:
          </p>
          <div style="display:flex; align-items:center; background:#FAF7F2; border:1px solid var(--border-subtle); border-radius:var(--radius-md); padding:8px 12px; gap:8px; margin-bottom:10px;">
            <span style="font-size:0.9rem; font-weight:800; color:#1C3550;">+91</span>
            <input type="tel" value="98450 21980" placeholder="10-digit mobile number" style="flex:1; border:none; background:transparent; outline:none; font-size:0.9rem; font-weight:700;">
          </div>
          <button type="button" class="btn-primary" style="width:100%; background:#1C3550; padding:10px; font-size:0.8rem;" onclick="window.showToast('Patron account recovery link sent via SMS & WhatsApp!')">
            Send Login Link →
          </button>
        </div>
      `;
    } else {
      // Corporate Recovery Options
      return `
        <div class="recovery-option-card">
          <div style="display:flex; align-items:center; gap:6px; margin-bottom:6px;">
            <span style="font-size:1rem;">🏢</span>
            <span class="recovery-badge" style="background:#F1F5F9; color:#0F172A;">B2B KYB Recovery</span>
          </div>
          <div style="font-size:0.88rem; font-weight:800; color:var(--text-primary); margin-bottom:4px;">
            Recover Institutional Account via GSTIN
          </div>
          <p style="font-size:0.72rem; color:var(--text-secondary); line-height:1.35; margin-bottom:10px;">
            Enter your verified 15-character GSTIN to send an authorized signatory authentication code to your registered company domain:
          </p>
          <div style="display:flex; align-items:center; background:#FAF7F2; border:1px solid var(--border-subtle); border-radius:var(--radius-md); padding:8px 12px; gap:8px; margin-bottom:10px;">
            <span style="font-size:0.9rem;">📑</span>
            <input type="text" value="09AAACV4920K1ZX" placeholder="15-character GSTIN" style="flex:1; border:none; background:transparent; outline:none; font-size:0.85rem; font-weight:800; letter-spacing:0.04em;">
          </div>
          <button type="button" class="btn-primary" style="width:100%; background:#0F172A; padding:10px; font-size:0.8rem;" onclick="window.showToast('Authorized code dispatched to procurement@vistarahotels.in')">
            Verify GSTIN &amp; Dispatch Code →
          </button>
        </div>
      `;
    }
  }

  function update() {
    container.innerHTML = renderContent();
    attachListeners();
  }

  function attachListeners() {
    container.querySelectorAll('.btn-role-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        selectedRecoveryRole = btn.getAttribute('data-role');
        update();
      });
    });
  }

  update();
}
