/**
 * Screen 4: Artisan Studio & Dashboard with Trust Score Modal
 * Exact recreation of User Provided Reference Screenshot (Image 5)
 */

import { State } from '../state.js';
import { AudioAssistance } from '../speech.js';

export function renderStudioScreen(container) {
  container.innerHTML = `
    <div class="studio-screen animate-fade-in">
      
      <!-- Artisan Profile Hero Card -->
      <div class="artisan-hero-card">
        <img src="/assets/artisan_ramulu.jpg" alt="Ramdev Kumhar" class="artisan-hero-img" onerror="this.src='/assets/artisan_budhram.jpg'">
        <div class="artisan-hero-info">
          <div class="artisan-hero-name">
            ${State.artisanName}
            <span class="badge-green" style="font-size:0.62rem;">Master Artisan</span>
          </div>
          <div class="artisan-cluster-tag">
            Varanasi Clay Cluster (GI #84) • GI-84-129-UP
          </div>
        </div>
      </div>

      <!-- Artisan Trust Score Gauge Card (Tappable to open breakdown sheet) -->
      <div class="trust-score-card" id="btn-open-trust-modal">
        <div class="trust-score-left">
          <div class="trust-score-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-green)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            Artisan Trust Score: 98/100
          </div>
          <div class="trust-score-sub">
            Exceptional Master • Tap for breakdown
          </div>
        </div>
        <div class="trust-score-gauge">
          <svg viewBox="0 0 36 36" width="46" height="46">
            <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#E5DAC8" stroke-width="3.5" />
            <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#1E6B47" stroke-width="3.5" stroke-dasharray="98, 100" stroke-linecap="round" />
          </svg>
          <span style="position:absolute; font-size:0.75rem; font-weight:900; color:#174332;">98%</span>
        </div>
      </div>

      <!-- 3 Stats Overview -->
      <div class="stats-trio-grid">
        <div class="stat-trio-card">
          <div class="stat-trio-value">₹46k</div>
          <div class="stat-trio-label">Total Payouts</div>
        </div>
        <div class="stat-trio-card">
          <div class="stat-trio-value" style="color:var(--color-terracotta);">4.9 ★</div>
          <div class="stat-trio-label">Star Rating</div>
        </div>
        <div class="stat-trio-card">
          <div class="stat-trio-value" style="color:var(--color-green);">9</div>
          <div class="stat-trio-label">Ready Dispatch</div>
        </div>
      </div>

      <!-- High Priority Urgent Order Handover Card (Terracotta) -->
      <div class="urgent-order-card">
        <div class="urgent-badge-row">
          <span class="urgent-badge">HIGH PRIORITY HANDOVER</span>
          <span style="font-size:0.7rem; font-weight:700; opacity:0.85;">Urgent</span>
        </div>
        <div class="urgent-title">Urgent Order Incoming</div>
        <div class="urgent-desc">
          2x Terracotta Water Pitchers to <strong>Bengaluru, Karnataka</strong>. Packed safely for fragile artisanal handling.
        </div>
        <button type="button" class="btn-pack-order" id="btn-accept-pack">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
          Accept &amp; Pack (India Post)
        </button>
      </div>

      <!-- Quick Overview 2026 -->
      <div style="background:#FFFFFF; border:1px solid var(--border-subtle); border-radius:var(--radius-lg); padding:14px; margin-bottom:16px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <span style="font-size:0.75rem; font-weight:800; color:var(--text-muted); letter-spacing:0.04em;">QUICK OVERVIEW 2026</span>
          <a href="javascript:void(0)" style="font-size:0.72rem; color:var(--color-terracotta); font-weight:700; text-decoration:none;">See More</a>
        </div>
        <div style="font-size:1.5rem; font-weight:900; color:var(--text-primary); margin-bottom:6px;">₹46,200</div>
        <div style="background:#F8F5EE; border-radius:var(--radius-sm); padding:8px 10px; font-size:0.75rem; color:var(--color-green); font-weight:700; display:flex; align-items:center; gap:6px;">
          <span>⚡ Next Transfer: ₹8,200 scheduled tomorrow 09:00 AM via RBI 1-click</span>
        </div>
      </div>

      <!-- Karigra Studio Insights -->
      <div class="insights-header">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-terracotta)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
        Karigra Studio Insights
      </div>

      <!-- Insight 1: Festival Demand Surge -->
      <div class="insight-item-card">
        <div class="insight-title-row">
          <span class="insight-name">Festival Demand Surge</span>
          <span class="badge-amber" style="font-size:0.62rem;">Latest Alert</span>
        </div>
        <div class="insight-text">
          Diwali &amp; Karva Chauth season: Terracotta diya demand is up <strong>415%</strong> in Mumbai &amp; Bengaluru. Pre-pack 50 sets for 3x profit.
        </div>
      </div>

      <!-- Insight 2: Fair Price Advisor -->
      <div class="insight-item-card">
        <div class="insight-title-row">
          <span class="insight-name">Fair Price Advisor</span>
          <span class="badge-green" style="font-size:0.62rem;">Verified</span>
        </div>
        <div class="insight-text">
          Pricing integrity: 100% of your prices honour the Minimum Benchmark to prevent distress sales.
        </div>
        <a href="javascript:void(0)" style="display:inline-block; margin-top:6px; font-size:0.72rem; color:var(--color-terracotta); font-weight:700; text-decoration:none;">
          Compare Regional Rates ▾
        </a>
      </div>

    </div>

    <!-- Bottom Sheet Modal: Artisan Trust Score Breakdown (Screenshot 5 Modal) -->
    <div class="modal-overlay ${State.trustScoreModalOpen ? 'active' : ''}" id="modal-trust-score">
      <div class="bottom-sheet">
        
        <!-- Sheet Header -->
        <div class="sheet-header">
          <div class="sheet-title-group">
            <div style="width:32px; height:32px; border-radius:8px; background:#E8F5EE; display:flex; align-items:center; justify-content:center; color:var(--color-green);">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <div>
              <div style="font-size:0.95rem; font-weight:800; color:var(--text-primary);">Artisan Trust Score Breakdown</div>
              <div style="font-size:0.7rem; color:var(--color-terracotta); font-weight:700;">Ministry of Textiles Pehchan Verified</div>
            </div>
          </div>
          <button type="button" class="sheet-close-btn" id="btn-close-trust-sheet">✕</button>
        </div>

        <!-- Green Hero Score Card -->
        <div class="trust-score-hero-card">
          <div class="score-badge-circle">98</div>
          <div class="score-hero-details">
            <div class="score-hero-headline">
              98/100 • Exceptional Master
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#4ADE80"><path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.74-5.25z" clip-rule="evenodd" /></svg>
            </div>
            <div class="score-hero-perks">
              0% marketplace fee + instant India Post daily pickups unlocked
            </div>
          </div>
        </div>

        <!-- 4 Score Categories Breakdown List -->
        <div class="score-categories-list">
          
          <div class="score-category-item">
            <div class="score-cat-title">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-green)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              Verified identity
            </div>
            <span class="score-cat-points">30 / 30 pts</span>
          </div>

          <div class="score-category-item">
            <div class="score-cat-title">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-green)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="13" x="1" y="3" rx="2"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
              Delivery reliability
            </div>
            <span class="score-cat-points">35 / 35 pts</span>
          </div>

          <div class="score-category-item">
            <div class="score-cat-title">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D97706" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
              Buyer Reviews &amp; Order Acceptance
            </div>
            <span class="score-cat-points amber">18 / 20 pts</span>
          </div>

          <div class="score-category-item">
            <div class="score-cat-title">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-green)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
              Craft Quality
            </div>
            <span class="score-cat-points">15 / 15 pts</span>
          </div>

        </div>

        <!-- Karigra Protection Disclaimer -->
        <div class="protection-disclaimer-box">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0; margin-top:2px;"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          <div>
            <strong>Karigra Protection:</strong> Unpredictable weather or carrier delays outside your Varanasi studio never lower your trust score.
          </div>
        </div>

      </div>
    </div>
  `;

  // Attach Handlers
  const modal = container.querySelector('#modal-trust-score');
  
  container.querySelector('#btn-open-trust-modal').addEventListener('click', () => {
    modal.classList.add('active');
    AudioAssistance.playTrustScore();
  });

  container.querySelector('#btn-close-trust-sheet').addEventListener('click', () => {
    modal.classList.remove('active');
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });

  // Urgent order button
  container.querySelector('#btn-accept-pack').addEventListener('click', () => {
    State.urgentOrder.accepted = true;
    window.showToast?.("Order accepted! India Post consignment label generated.");
    setTimeout(() => {
      State.setScreen('orders');
    }, 600);
  });
}
