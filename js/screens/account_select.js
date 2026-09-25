/**
 * Pre-Authentication Screen: Account Type Selection
 * Displays THREE distinct, large cards:
 * 1. Artisan / Maker
 * 2. Buyer / Patron (individual consumer)
 * 3. Corporate / Bulk Buyer (institutional B2B)
 * Fully internationalized in 10 regional Indian languages with native typography.
 */

import { State, AccountType } from '../state.js';
import { AudioAssistance } from '../speech.js';
import { i18n } from '../i18n.js';

export function renderAccountSelectScreen(container) {
  const t = i18n.t.bind(i18n);
  const meta = i18n.metadata;

  container.innerHTML = `
    <div class="account-select-screen animate-fade-in" style="padding: 16px 14px 32px; background: #FAF7F2; min-height: 100vh;">
      
      <!-- Top Brand Row -->
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
        <div style="display:flex; align-items:center; gap:8px;">
          <div style="width:36px; height:36px; border-radius:50%; background:#FFFFFF; display:flex; align-items:center; justify-content:center; border:1px solid #EADBCE; overflow:hidden; flex-shrink:0; box-shadow:0 1px 3px rgba(0,0,0,0.06);">
            <img src="assets/native_loom_logo.png" alt="Native Loom" style="width:100%; height:100%; object-fit:contain;">
          </div>
          <div>
            <div style="font-size:1.05rem; font-weight:900; color:#1C3550; line-height:1.1;">${t('appName', 'Native Loom')}</div>
            <div style="font-size:0.62rem; font-weight:700; color:#5A6B82; letter-spacing:0.08em; text-transform:uppercase;">${t('tagline', 'National Indigenous Artisan Platform')}</div>
          </div>
        </div>

        <button type="button" class="btn-secondary" onclick="window.navigateToScreen('language_select')" style="padding:5px 10px; font-size:0.72rem; font-weight:700; border-radius:var(--radius-pill); background:#FFF9F5; border-color:var(--border-subtle); display:flex; align-items:center; gap:4px;" title="Switch Language">
          <span>🌐</span>
          <span>${meta.flag} ${meta.native}</span>
        </button>
      </div>

      <!-- Impacts & Metrics Hero Card -->
      <div style="background:linear-gradient(135deg, #7A2813 0%, #4A1508 100%); color:#FFFFFF; border-radius:var(--radius-xl); padding:14px 16px; margin-bottom:16px; box-shadow:0 4px 14px rgba(122, 40, 19, 0.25);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
          <span style="background:rgba(255,255,255,0.18); color:#FDE68A; font-size:0.65rem; font-weight:800; padding:2px 8px; border-radius:var(--radius-pill); letter-spacing:0.06em;">
            IMPACTS &amp; METRICS
          </span>
          <button type="button" onclick="window.navigateToScreen('about_impact')" style="background:#FDE68A; color:#7A2813; border:none; border-radius:var(--radius-pill); padding:3px 10px; font-size:0.68rem; font-weight:800; cursor:pointer;">
            View Impacts &amp; Metrics →
          </button>
        </div>
        <div style="font-size:0.92rem; font-weight:800; margin-bottom:4px;">0% Platform Commission • 100% DBT Direct to Artisans</div>
        <div style="font-size:0.7rem; color:#FCD7C2; line-height:1.35;">
          Bridging India's rural master craftspeople with patrons and institutions through Pehchan Card KYC, regional voice onboarding, and GI provenance tags.
        </div>
      </div>

      <!-- Screen Title & Guidance -->
      <div style="margin-bottom:16px;">
        <h1 style="font-size:1.3rem; font-weight:900; color:var(--text-primary); margin:0 0 4px 0; line-height:1.25;">
          ${t('selectAccountTitle', 'Choose Your Account Type')}
        </h1>
        <p style="font-size:0.75rem; color:var(--text-secondary); margin:0; line-height:1.4;">
          ${t('selectAccountSub', 'Select how you wish to access Native Loom. Each role provides a dedicated, independent portal.')}
        </p>
      </div>

      <!-- Simple Spoken Guide Video Demo Banner -->
      <div class="video-guide-card" onclick="window.playSpokenGuideDemo()" style="position:relative; width:100%; border-radius:14px; overflow:hidden; cursor:pointer; box-shadow:0 4px 16px rgba(0,0,0,0.12); margin-bottom:18px; border:1px solid rgba(122,40,19,0.18); background:#1F1916;">
        <img src="/assets/spoken_guide_demo.png" alt="Simple Spoken Guide - Tap to Play Video" style="width:100%; height:auto; display:block; object-fit:cover; transition:transform 0.25s ease;">
      </div>

      <!-- THREE DISTINCT LARGE CARDS -->
      <div style="display:flex; flex-direction:column; gap:14px; margin-bottom:22px;">
        
        <!-- CARD 1: ARTISAN / MAKER -->
        <div class="role-selection-card" style="background:#FFFFFF; border:2px solid #EADBCE; border-radius:var(--radius-xl); padding:16px; box-shadow:var(--shadow-sm); transition:all 0.2s ease;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:10px;">
            <div style="width:44px; height:44px; border-radius:12px; background:#FEECE5; display:flex; align-items:center; justify-content:center; font-size:1.5rem;">
              👨‍🎨
            </div>
            <span style="background:#E7F4ED; color:#1E6B47; font-size:0.68rem; font-weight:800; padding:3px 10px; border-radius:var(--radius-pill); border:1px solid #B7DFCA;">
              ${t('artisanCardBadge', '0% Commission • Pehchan Verified')}
            </span>
          </div>

          <div style="font-size:1.15rem; font-weight:900; color:var(--text-primary); margin-bottom:4px;">
            ${t('artisanCardTitle', 'Artisan / Maker')}
          </div>
          <p style="font-size:0.76rem; color:var(--text-secondary); line-height:1.4; margin-bottom:12px;">
            ${t('artisanCardDesc', 'Sell directly to patrons at 0% platform commission with Pehchan Card verification and direct DBT bank payouts.')}
          </p>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:6px; margin-bottom:14px; background:#FAF7F2; border-radius:var(--radius-md); padding:8px 10px; font-size:0.7rem; font-weight:700; color:var(--text-primary);">
            <div>✓ 0% Platform Fee</div>
            <div>✓ Delivery Agent Pickups</div>
            <div>✓ Direct DBT Bank</div>
            <div>✓ AI Smart Listing</div>
          </div>

          <button type="button" class="btn-primary" onclick="window.navigateToScreen('artisan_auth')" style="width:100%; background:#7A2813; color:#FFFFFF; border:none; padding:12px; font-size:0.85rem; font-weight:800; border-radius:var(--radius-md); display:flex; align-items:center; justify-content:center; gap:8px; cursor:pointer;">
            <span>${t('artisanCardBtn', 'Enter as Artisan / Seller')}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </button>
        </div>

        <!-- CARD 2: BUYER / PATRON (INDIVIDUAL CONSUMER) -->
        <div class="role-selection-card" style="background:#FFFFFF; border:2px solid #EADBCE; border-radius:var(--radius-xl); padding:16px; box-shadow:var(--shadow-sm); transition:all 0.2s ease;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:10px;">
            <div style="width:44px; height:44px; border-radius:12px; background:#FEF3C7; display:flex; align-items:center; justify-content:center; font-size:1.5rem;">
              🛍️
            </div>
            <span style="background:#FEF3C7; color:#92400E; font-size:0.68rem; font-weight:800; padding:3px 10px; border-radius:var(--radius-pill); border:1px solid #FDE68A;">
              ${t('buyerCardBadge', 'Direct Sourcing • GI Tagged')}
            </span>
          </div>

          <div style="font-size:1.15rem; font-weight:900; color:var(--text-primary); margin-bottom:4px;">
            ${t('buyerCardTitle', 'Buyer / Patron')}
          </div>
          <p style="font-size:0.76rem; color:var(--text-secondary); line-height:1.4; margin-bottom:12px;">
            ${t('buyerCardDesc', 'Discover certified handmade crafts directly from master artisans with provenance certificates and insured transit.')}
          </p>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:6px; margin-bottom:14px; background:#FAF7F2; border-radius:var(--radius-md); padding:8px 10px; font-size:0.7rem; font-weight:700; color:var(--text-primary);">
            <div>✓ Verified GI Crafts</div>
            <div>✓ Fast Phone Login</div>
            <div>✓ Transit Insurance</div>
            <div>✓ Speed Post Delivery</div>
          </div>

          <button type="button" class="btn-primary" onclick="window.navigateToScreen('buyer_auth')" style="width:100%; background:#1C3550; color:#FFFFFF; border:none; padding:12px; font-size:0.85rem; font-weight:800; border-radius:var(--radius-md); display:flex; align-items:center; justify-content:center; gap:8px; cursor:pointer;">
            <span>${t('buyerCardBtn', 'Enter as Buyer / Patron')}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </button>
        </div>

        <!-- CARD 3: CORPORATE / B2B BULK BUYER -->
        <div class="role-selection-card" style="background:#FFFFFF; border:2px solid #EADBCE; border-radius:var(--radius-xl); padding:16px; box-shadow:var(--shadow-sm); transition:all 0.2s ease;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:10px;">
            <div style="width:44px; height:44px; border-radius:12px; background:#EFF6FF; display:flex; align-items:center; justify-content:center; font-size:1.5rem;">
              🏛️
            </div>
            <span style="background:#EFF6FF; color:#1E40AF; font-size:0.68rem; font-weight:800; padding:3px 10px; border-radius:var(--radius-pill); border:1px solid #BFDBFE;">
              ${t('corporateCardBadge', 'GST Verified • Escrow Protected')}
            </span>
          </div>

          <div style="font-size:1.15rem; font-weight:900; color:var(--text-primary); margin-bottom:4px;">
            ${t('corporateCardTitle', 'Corporate / Bulk Buyer')}
          </div>
          <p style="font-size:0.76rem; color:var(--text-secondary); line-height:1.4; margin-bottom:12px;">
            ${t('corporateCardDesc', 'Bulk corporate gifting, hospitality decor, and export sourcing directly from artisan clusters with GST ITC invoices and escrow.')}
          </p>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:6px; margin-bottom:14px; background:#FAF7F2; border-radius:var(--radius-md); padding:8px 10px; font-size:0.7rem; font-weight:700; color:var(--text-primary);">
            <div>✓ Tiered Wholesale Rates</div>
            <div>✓ Custom RFQ &amp; Samples</div>
            <div>✓ Formal GST Invoicing</div>
            <div>✓ Cluster Escrow Safety</div>
          </div>

          <button type="button" class="btn-primary" onclick="window.navigateToScreen('corporate_auth')" style="width:100%; background:#0F172A; color:#FFFFFF; border:none; padding:12px; font-size:0.85rem; font-weight:800; border-radius:var(--radius-md); display:flex; align-items:center; justify-content:center; gap:8px; cursor:pointer;">
            <span>${t('corporateCardBtn', 'Enter as Corporate Buyer')}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </button>
        </div>

      </div>

      <!-- Account Recovery Footer -->
      <div style="background:#FFFFFF; border:1px solid var(--border-subtle); border-radius:var(--radius-lg); padding:12px 14px; display:flex; align-items:center; justify-content:space-between; box-shadow:var(--shadow-sm);">
        <div style="display:flex; align-items:center; gap:8px;">
          <span style="font-size:1.1rem;">🔄</span>
          <div>
            <div style="font-size:0.78rem; font-weight:800; color:var(--text-primary);">${t('recoveryPrompt', 'Trouble Logging In?')}</div>
            <div style="font-size:0.68rem; color:var(--text-secondary);">${t('recoveryBtn', 'Recovery by account type, voice OTP & CSC helpline')}</div>
          </div>
        </div>
        <button type="button" class="btn-secondary" onclick="window.navigateToScreen('account_recovery')" style="font-size:0.72rem; font-weight:800; padding:6px 10px; border-radius:var(--radius-pill);">
          ${t('verify', 'Recover')}
        </button>
      </div>

    </div>
  `;
}
