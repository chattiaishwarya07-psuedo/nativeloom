/**
 * Screen: In-App About / Impacts & Metrics
 * Comprehensive overview of Background, Challenge, Expected AI Solution, Impact Goals, and Platform Metrics.
 */

import { State } from '../state.js';
import { AudioAssistance } from '../speech.js';
import { i18n, t } from '../i18n.js';

export function renderAboutImpactScreen(container) {
  container.innerHTML = `
    <div class="about-impact-screen animate-fade-in" style="padding: 16px 14px 48px; background: #FAF7F2; min-height: 100vh;">
      
      <!-- Top Brand Bar -->
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
        <button type="button" class="btn-secondary" onclick="window.navigateToScreen('account_select')" style="padding:6px 12px; font-size:0.75rem; font-weight:800; border-radius:var(--radius-pill); cursor:pointer;">
          ← ${t('back', 'Back')}
        </button>
        <span class="badge-amber" style="font-size:0.68rem; font-weight:800; background:#FEECE5; color:#7A2813; border:1px solid #E8D3C7; padding:4px 10px; border-radius:var(--radius-pill);">
          Impacts &amp; Metrics
        </span>
      </div>

      <!-- Hero Header Banner (Terracotta Gradient) -->
      <div style="background:linear-gradient(135deg, #873413 0%, #A24218 100%); color:#FFFFFF; border-radius:var(--radius-xl); padding:20px 18px; margin-bottom:16px; box-shadow:0 8px 24px rgba(135, 52, 19, 0.2); position:relative; overflow:hidden;">
        <div style="display:flex; align-items:center; gap:12px; margin-bottom:12px;">
          <div style="width:48px; height:48px; border-radius:50%; background:#FFFFFF; display:flex; align-items:center; justify-content:center; overflow:hidden; flex-shrink:0; border:2px solid rgba(255,255,255,0.4); box-shadow:0 2px 8px rgba(0,0,0,0.15);">
            <img src="assets/native_loom_logo.png" alt="Native Loom" style="width:100%; height:100%; object-fit:contain;">
          </div>
          <div>
            <div style="font-size:1.25rem; font-weight:900; line-height:1.2;">Native Loom</div>
            <div style="font-size:0.72rem; opacity:0.92; font-weight:600; letter-spacing:0.04em;">National Indigenous Artisan Platform</div>
          </div>
        </div>
        <p style="font-size:0.8rem; line-height:1.45; opacity:0.95; margin:0 0 14px 0;">
          Eliminating middlemen and digital literacy barriers for India's traditional craftspeople through <strong>0% platform commission</strong>, <strong>Pehchan ID verification</strong>, <strong>direct DBT bank payouts</strong>, and <strong>voice-first AI in regional dialects</strong>.
        </p>
        <button type="button" class="btn-secondary" style="background:#FFFFFF; color:#7A2813; border:none; padding:8px 16px; font-size:0.76rem; font-weight:800; border-radius:var(--radius-pill); display:inline-flex; align-items:center; gap:6px; cursor:pointer;" onclick="window.AudioAssistance.speak('नेटिव लूम (Native Loom): स्वदेशी कारीगरों और बुनकरों को डिजिटल अर्थव्यवस्था से सीधे जोड़ने वाला एआई-सक्षम राष्ट्रीय मंच।')">
          <span>🔊</span>
          <span>Listen to Impact Overview</span>
        </button>
      </div>

      <!-- 1. Background Section Card -->
      <div style="background:#FFFFFF; border:1px solid var(--border-subtle); border-radius:var(--radius-lg); padding:16px; margin-bottom:14px; box-shadow:var(--shadow-sm);">
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:10px;">
          <span style="font-size:1.15rem;">🏛️</span>
          <h2 style="font-size:0.95rem; font-weight:800; color:var(--text-primary); margin:0;">
            Background
          </h2>
        </div>
        <p style="font-size:0.76rem; color:var(--text-secondary); line-height:1.5; margin:0 0 10px 0;">
          The government actively supports the socio-economic upliftment of marginalized communities, particularly micro-entrepreneurs, artisans, and weavers. Financial assistance is provided to establish small-scale manufacturing and handicraft units. To help these beneficiaries sell their goods, market exposure is facilitated through periodic physical exhibitions, cluster development programs, and trade fairs (such as Shilp Samagam, Surajkund Mela, and Dilli Haat).
        </p>
        <div style="background:#FFF9F5; border-radius:var(--radius-md); padding:10px 12px; font-size:0.74rem; color:#873413; line-height:1.45; border-left:3px solid var(--color-terracotta);">
          <strong>The Gap:</strong> While physical exhibitions provide a temporary boost in sales, these micro-entrepreneurs lack continuous, year-round access to broader digital markets. Transitioning to the digital economy is hindered by low digital literacy, language barriers, and a lack of technical skills required to professionally photograph, price, and catalog products for modern e-commerce.
        </div>
      </div>

      <!-- 2. Challenge Section Card -->
      <div style="background:#FFFFFF; border:1px solid var(--border-subtle); border-radius:var(--radius-lg); padding:16px; margin-bottom:14px; box-shadow:var(--shadow-sm);">
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:10px;">
          <span style="font-size:1.15rem;">🎯</span>
          <h2 style="font-size:0.95rem; font-weight:800; color:var(--text-primary); margin:0;">
            Challenge
          </h2>
        </div>
        <p style="font-size:0.76rem; color:var(--text-secondary); line-height:1.5; margin:0 0 10px 0;">
          There is a critical need to bridge the gap between traditional craftsmanship and modern digital commerce. Beneficiaries struggle to present their products competitively online. They often fail to capture high-quality images, write compelling product descriptions, or understand dynamic market pricing.
        </p>
        <div style="background:#F4ECE4; border-radius:var(--radius-md); padding:10px 12px; font-size:0.74rem; color:#1C1917; line-height:1.45; border-left:3px solid #1C3550;">
          <strong>Core Challenge:</strong> Build an intuitive, AI-driven mobile application that acts as a <em>'virtual business manager'</em> for these artisans. The app must empower them to seamlessly digitize their inventory, optimize their listings using AI, and connect directly with larger B2B buyers or government e-marketplaces without requiring advanced technical knowledge.
        </div>
      </div>

      <!-- 3. Expected Solution & Key Features -->
      <div style="background:#FFFFFF; border:1px solid var(--border-subtle); border-radius:var(--radius-lg); padding:16px; margin-bottom:14px; box-shadow:var(--shadow-sm);">
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
          <span style="font-size:1.15rem;">💡</span>
          <h2 style="font-size:0.95rem; font-weight:800; color:var(--text-primary); margin:0;">
            Expected Solution
          </h2>
        </div>
        <p style="font-size:0.76rem; color:var(--text-secondary); line-height:1.5; margin:0 0 12px 0;">
          An AI-powered, cross-platform application supported by a robust, scalable backend architecture with a highly responsive, minimalist UI/UX design (incorporating modern, clean visual hierarchies and accessible layouts for low-literacy users).
        </p>

        <div style="font-size:0.78rem; font-weight:800; color:var(--color-terracotta); text-transform:uppercase; letter-spacing:0.04em; margin-bottom:8px;">
          Key Platform Features:
        </div>

        <div style="display:flex; flex-direction:column; gap:10px;">
          
          <!-- Feature 1 -->
          <div style="background:#FAF7F2; border:1px solid #ECE7E1; border-radius:var(--radius-md); padding:12px;">
            <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">
              <span style="font-size:1rem;">📸</span>
              <span style="font-size:0.82rem; font-weight:800; color:var(--text-primary);">1. AI Image Enhancer &amp; Studio</span>
            </div>
            <p style="font-size:0.72rem; color:var(--text-secondary); line-height:1.45; margin:0;">
              A built-in camera module that utilizes AI to automatically remove cluttered backgrounds, correct lighting, and format product photos (e.g., textiles, handicrafts) to professional e-commerce standards.
            </p>
          </div>

          <!-- Feature 2 -->
          <div style="background:#FAF7F2; border:1px solid #ECE7E1; border-radius:var(--radius-md); padding:12px;">
            <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">
              <span style="font-size:1rem;">🗣️</span>
              <span style="font-size:0.82rem; font-weight:800; color:var(--text-primary);">2. Multilingual Auto-Cataloger</span>
            </div>
            <p style="font-size:0.72rem; color:var(--text-secondary); line-height:1.45; margin:0;">
              An NLP-based engine that allows artisans to describe their product via voice notes in regional languages. The AI translates and generates SEO-friendly, professional product descriptions in English and Hindi.
            </p>
          </div>

          <!-- Feature 3 -->
          <div style="background:#FAF7F2; border:1px solid #ECE7E1; border-radius:var(--radius-md); padding:12px;">
            <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">
              <span style="font-size:1rem;">📈</span>
              <span style="font-size:0.82rem; font-weight:800; color:var(--text-primary);">3. Dynamic Pricing Assistant</span>
            </div>
            <p style="font-size:0.72rem; color:var(--text-secondary); line-height:1.45; margin:0;">
              A machine learning algorithm that analyzes the uploaded product image and description to suggest an optimal, competitive selling price based on current market trends and raw material costs.
            </p>
          </div>

        </div>
      </div>

      <!-- 4. Impact Goals Card -->
      <div style="background:#FFFFFF; border:1px solid var(--border-subtle); border-radius:var(--radius-lg); padding:16px; margin-bottom:16px; box-shadow:var(--shadow-sm);">
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:10px;">
          <span style="font-size:1.15rem;">🌟</span>
          <h2 style="font-size:0.95rem; font-weight:800; color:var(--text-primary); margin:0;">
            Impact Goals
          </h2>
        </div>
        
        <div style="display:flex; flex-direction:column; gap:10px;">
          
          <div style="display:flex; align-items:flex-start; gap:10px;">
            <span style="color:var(--color-terracotta); font-size:1.1rem; line-height:1;">•</span>
            <div style="font-size:0.75rem; color:var(--text-secondary); line-height:1.45;">
              <strong style="color:var(--text-primary);">Continuous Digital Sales Channel:</strong> Provide marginalized micro-entrepreneurs with a continuous, year-round digital sales channel, reducing their dependency on periodic physical fairs (Shilp Samagam, Surajkund Mela, Dilli Haat).
            </div>
          </div>

          <div style="display:flex; align-items:flex-start; gap:10px;">
            <span style="color:var(--color-terracotta); font-size:1.1rem; line-height:1;">•</span>
            <div style="font-size:0.75rem; color:var(--text-secondary); line-height:1.45;">
              <strong style="color:var(--text-primary);">Drastically Lower Barrier to Entry:</strong> Lower the barrier to entry for digital commerce through intuitive AI automation, oral heritage descriptions, and regional dialect voice assistance.
            </div>
          </div>

          <div style="display:flex; align-items:flex-start; gap:10px;">
            <span style="color:var(--color-terracotta); font-size:1.1rem; line-height:1;">•</span>
            <div style="font-size:0.75rem; color:var(--text-secondary); line-height:1.45;">
              <strong style="color:var(--text-primary);">Financial Independence:</strong> Improve digital literacy and financial independence, ultimately increasing the average annual income of the target artisan and weaver demographic.
            </div>
          </div>

        </div>
      </div>

      <!-- 5. Key Platform Impact Metrics Grid -->
      <div style="margin-bottom:18px;">
        <div style="font-size:0.75rem; font-weight:800; color:var(--text-muted); text-transform:uppercase; margin-bottom:8px; letter-spacing:0.06em;">
          Key Platform Impact Metrics
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          
          <div style="background:#FFFFFF; border:1px solid var(--border-subtle); border-radius:var(--radius-md); padding:12px; box-shadow:var(--shadow-sm);">
            <div style="font-size:1.5rem; font-weight:900; color:var(--color-terracotta); line-height:1.1;">0%</div>
            <div style="font-size:0.75rem; font-weight:800; color:var(--text-primary); margin-bottom:2px;">Commission</div>
            <div style="font-size:0.68rem; color:var(--text-secondary);">100% of purchase credits directly to artisan DBT bank account</div>
          </div>

          <div style="background:#FFFFFF; border:1px solid var(--border-subtle); border-radius:var(--radius-md); padding:12px; box-shadow:var(--shadow-sm);">
            <div style="font-size:1.5rem; font-weight:900; color:#1E6B47; line-height:1.1;">4,800+</div>
            <div style="font-size:0.75rem; font-weight:800; color:var(--text-primary); margin-bottom:2px;">Artisans Verified</div>
            <div style="font-size:0.68rem; color:var(--text-secondary);">Authenticated with Ministry of Textiles Pehchan Card IDs</div>
          </div>

          <div style="background:#FFFFFF; border:1px solid var(--border-subtle); border-radius:var(--radius-md); padding:12px; box-shadow:var(--shadow-sm);">
            <div style="font-size:1.5rem; font-weight:900; color:#1C3550; line-height:1.1;">180+</div>
            <div style="font-size:0.75rem; font-weight:800; color:var(--text-primary); margin-bottom:2px;">GI Craft Clusters</div>
            <div style="font-size:0.68rem; color:var(--text-secondary);">Single source of truth with verified geographical tags</div>
          </div>

          <div style="background:#FFFFFF; border:1px solid var(--border-subtle); border-radius:var(--radius-md); padding:12px; box-shadow:var(--shadow-sm);">
            <div style="font-size:1.5rem; font-weight:900; color:#92400E; line-height:1.1;">10</div>
            <div style="font-size:0.75rem; font-weight:800; color:var(--text-primary); margin-bottom:2px;">Regional Dialects</div>
            <div style="font-size:0.68rem; color:var(--text-secondary);">Aawaz Sahayata speech guide in native mother tongues</div>
          </div>

        </div>
      </div>

      <!-- 6. Architectural Pillars & Safeguards -->
      <div style="background:#FFFFFF; border:1px solid var(--border-subtle); border-radius:var(--radius-lg); padding:14px; margin-bottom:20px;">
        <div style="font-size:0.82rem; font-weight:800; color:var(--text-primary); margin-bottom:10px;">
          Architectural Pillars &amp; Safeguards
        </div>
        <div style="display:flex; flex-direction:column; gap:8px; font-size:0.74rem; color:var(--text-secondary);">
          <div style="display:flex; align-items:flex-start; gap:8px;">
            <span>🛡️</span>
            <div><strong>Craft Transit Insurance Fund:</strong> Breakage claims are paid out of a central reserve. Artisans keep 100% of their earnings.</div>
          </div>
          <div style="display:flex; align-items:flex-start; gap:8px;">
            <span>💌</span>
            <div><strong>Patron Blessing Note:</strong> Personal buyer notes translated into regional dialects and read aloud at the craft guild.</div>
          </div>
          <div style="display:flex; align-items:flex-start; gap:8px;">
            <span>✨</span>
            <div><strong>AI Smart Listing:</strong> 1-photo recognition auto-fills title, materials, attributes, and oral heritage description.</div>
          </div>
          <div style="display:flex; align-items:flex-start; gap:8px;">
            <span>🔒</span>
            <div><strong>Role-Locked Independent Sessions:</strong> Zero cross-role toggles, strict route guards, and separate session claims.</div>
          </div>
        </div>
      </div>

      <!-- Enter Platform CTA -->
      <button type="button" class="btn-primary" onclick="window.navigateToScreen('account_select')" style="width:100%; padding:14px; font-size:0.88rem; font-weight:800; border-radius:var(--radius-md); cursor:pointer;">
        Enter Platform • Select Account Type →
      </button>

    </div>
  `;
}
