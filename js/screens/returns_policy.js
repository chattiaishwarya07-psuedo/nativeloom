/**
 * Screen: Craft Piece Detail - Fair Protection, Returns & Replacements Policy
 * Exact recreation of User Provided Reference Screenshot (Screen 2)
 */

import { State } from '../state.js';
import { AudioAssistance } from '../speech.js';

export function renderReturnsPolicyScreen(container) {
  container.innerHTML = `
    <div class="returns-policy-screen animate-fade-in" style="padding-bottom:30px;">
      
      <!-- Audio Policy Explainer -->
      <div style="background:#FFF9F5; border:1px solid var(--color-terracotta-border); border-radius:var(--radius-md); padding:10px 12px; display:flex; align-items:center; gap:10px; margin: 8px 0 14px;">
        <div style="width:36px; height:36px; border-radius:10px; background:var(--color-terracotta); color:#fff; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
        </div>
        <div style="flex:1;">
          <div style="font-size:0.68rem; font-weight:800; color:var(--color-terracotta); letter-spacing:0.04em;">AUDIO GUIDE • 1 MIN 20 SEC</div>
          <div style="font-size:0.82rem; font-weight:800; color:var(--text-primary);">Listen to Policy Explanation</div>
          <div style="font-size:0.7rem; color:var(--text-secondary);">Understand replacement and artisan security</div>
        </div>
        <button type="button" id="btn-play-returns-audio" style="width:32px; height:32px; border-radius:50%; background:#7A2E0E; color:#fff; border:none; display:flex; align-items:center; justify-content:center; cursor:pointer;">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        </button>
      </div>

      <!-- What Qualifies vs What Doesn't -->
      <div class="policy-block-card">
        <div style="display:flex; align-items:center; gap:6px; margin-bottom:2px;">
          <span style="font-size:1.1rem;">📋</span>
          <span style="font-size:0.92rem; font-weight:800; color:var(--text-primary);">What Qualifies vs What Doesn't</span>
        </div>
        <p style="font-size:0.72rem; color:var(--text-secondary); margin-bottom:12px;">
          Clear parameters for genuine artisan protection &amp; customer care
        </p>

        <!-- Eligible Section -->
        <div style="display:flex; align-items:center; gap:6px; margin-bottom:8px;">
          <span style="color:var(--color-green); font-size:1rem;">✓</span>
          <div>
            <div style="font-size:0.78rem; font-weight:800; color:var(--color-green);">Eligible for Replacement or 100% Refund</div>
            <div style="font-size:0.65rem; color:var(--text-muted);">Covered fully by the craft protection fund</div>
          </div>
        </div>

        <!-- 3 Eligible Criteria Cards -->
        <div class="criteria-item-row">
          <img src="/assets/raw_pottery_snap.jpg" alt="Broken in Transit" class="criteria-thumb" style="filter:grayscale(0.4);">
          <div style="flex:1;">
            <div style="font-size:0.8rem; font-weight:800; color:var(--text-primary);">Broken in Transit</div>
            <div style="font-size:0.7rem; color:var(--text-secondary); line-height:1.3;">
              Damaged clay, fractured woodwork, or torn weave incurred during courier handling.
            </div>
          </div>
        </div>

        <div class="criteria-item-row">
          <img src="/assets/blue_pottery.jpg" alt="Incorrect Item" class="criteria-thumb">
          <div style="flex:1;">
            <div style="font-size:0.8rem; font-weight:800; color:var(--text-primary);">Incorrect Item Dispatched</div>
            <div style="font-size:0.7rem; color:var(--text-secondary); line-height:1.3;">
              Receipt of a completely different craft piece, style, or variant from what was ordered.
            </div>
          </div>
        </div>

        <div class="criteria-item-row" style="margin-bottom:16px;">
          <img src="/assets/ikat_saree.jpg" alt="Size Discrepancy" class="criteria-thumb">
          <div style="flex:1;">
            <div style="font-size:0.8rem; font-weight:800; color:var(--text-primary);">Severe Size Discrepancy</div>
            <div style="font-size:0.7rem; color:var(--text-secondary); line-height:1.3;">
              Significant measurement deviation exceeding 20% from listed dimensions.
            </div>
          </div>
        </div>

        <!-- Not Eligible Section -->
        <div style="display:flex; align-items:center; gap:6px; margin-bottom:8px; border-top:1px dashed var(--border-subtle); padding-top:12px;">
          <span style="color:#B91C1C; font-size:1rem;">✕</span>
          <div>
            <div style="font-size:0.78rem; font-weight:800; color:#B91C1C;">Not Eligible — Natural Craft Signatures</div>
            <div style="font-size:0.65rem; color:var(--text-muted);">Authentic signs of pure handmade artistry</div>
          </div>
        </div>

        <div class="criteria-item-row">
          <img src="/assets/silver_wire_spools.jpg" alt="Handmade Signatures" class="criteria-thumb">
          <div style="flex:1;">
            <div style="font-size:0.8rem; font-weight:800; color:var(--text-primary);">Handmade Signatures</div>
            <div style="font-size:0.7rem; color:var(--text-secondary); line-height:1.3;">
              Subtle slubs in handloom, natural vegetable dye gradations, and organic texture variations are marks of authentic craftsmanship, not defects.
            </div>
          </div>
        </div>

        <div class="criteria-item-row">
          <img src="/assets/woodcraft_bowl.jpg" alt="Change of Mind" class="criteria-thumb">
          <div style="flex:1;">
            <div style="font-size:0.8rem; font-weight:800; color:var(--text-primary);">Change of Mind After Creation</div>
            <div style="font-size:0.7rem; color:var(--text-secondary); line-height:1.3;">
              Personalized commissions and custom hand-carved works crafted exclusively for your order cannot be returned.
            </div>
          </div>
        </div>
      </div>

      <!-- Simple 3-Step Return Flow -->
      <div class="policy-block-card">
        <div style="display:flex; align-items:center; gap:6px; margin-bottom:2px;">
          <span style="font-size:1.1rem;">🔄</span>
          <span style="font-size:0.92rem; font-weight:800; color:var(--text-primary);">Simple 3-Step Return Flow</span>
        </div>
        <p style="font-size:0.72rem; color:var(--text-secondary); margin-bottom:12px;">
          Effortless, doorstep-assisted reverse logistics
        </p>

        <div class="timeline-step-list" style="margin:8px 0 4px; padding-left:18px;">
          <div class="timeline-item">
            <div class="timeline-step-number">1</div>
            <div class="timeline-content-card">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:2px;">
                <span class="timeline-title">Upload unboxing photo or video</span>
                <span class="badge-amber" style="font-size:0.6rem;">Within 48 Hours</span>
              </div>
              <div class="timeline-desc">Submit clear unboxing photograph or short video in the app within 48 hours of parcel delivery. Quick verification within 2 working hours.</div>
            </div>
          </div>

          <div class="timeline-item">
            <div class="timeline-step-number">2</div>
            <div class="timeline-content-card">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:2px;">
                <span class="timeline-title">Doorstep pickup by India Post</span>
                <span class="badge-subtle" style="font-size:0.6rem;">Within a week</span>
              </div>
              <div class="timeline-desc">An India Post postal agent collects the securely packed item straight from your address. Free reverse pickup directly from your doorstep.</div>
            </div>
          </div>

          <div class="timeline-item">
            <div class="timeline-step-number check">3</div>
            <div class="timeline-content-card">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:2px;">
                <span class="timeline-title" style="color:var(--color-green);">Refund</span>
                <span class="badge-green" style="font-size:0.6rem;">After confirmation</span>
              </div>
              <div class="timeline-desc">The moment your return parcel barcode is scanned at pickup, 100% refund is initiated to your original payment method. Instant refund.</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Artisan Financial Security Guarantee Box (Pink) -->
      <div style="background:#FEECE5; border:1px solid var(--color-terracotta-border); border-radius:var(--radius-lg); padding:14px; margin-bottom:14px;">
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:6px;">
          <span style="font-size:1.1rem;">🛡️</span>
          <span class="badge-amber" style="background:#7A2E0E; color:#FFFFFF; border:none; font-size:0.65rem;">
            ARTISAN PAYOUT GUARANTEE • 100% Fair Trade Shield
          </span>
        </div>
        <div style="font-size:0.92rem; font-weight:800; color:var(--text-primary); margin-bottom:4px;">
          Will the artisan lose their payout?
        </div>
        <div style="font-size:0.75rem; color:var(--text-secondary); line-height:1.4;">
          <strong>Never!</strong> For transit damage or technical issues, full refund is covered by the <strong>Craft Transit Insurance Fund</strong>. The artisan's time and craft earnings remain 100% protected with zero deductions.
        </div>
      </div>

      <!-- Government of India Registered Guild Tag -->
      <div style="background:#FAF7F2; border:1px solid var(--border-subtle); border-radius:var(--radius-md); padding:10px 12px; display:flex; align-items:center; justify-content:space-between; margin-bottom:14px;">
        <div style="display:flex; align-items:center; gap:8px;">
          <span style="font-size:1.2rem;">🏛️</span>
          <div style="font-size:0.75rem; font-weight:800; color:var(--text-primary);">
            GI Tag Certified Authentic Artisans
            <div style="font-size:0.65rem; color:var(--text-muted); font-weight:normal;">Government of India Registered Guild Protection</div>
          </div>
        </div>
        <span class="badge-green" style="font-size:0.62rem;">Insured</span>
      </div>

      <!-- Action Buttons -->
      <button type="button" class="btn-primary" id="btn-file-return" style="margin-bottom:8px;">
        📦 File New Return Request
      </button>

      <button type="button" class="btn-secondary" style="background:#1C3550; color:#FFFFFF; border:none; padding:12px; font-weight:700;" onclick="window.showToast('Calling Artisan & Buyer Support: 1800-200-ARTS')">
        🎧 Artisan &amp; Buyer Support Centre (1800-200-ARTS)
      </button>

    </div>
  `;

  container.querySelector('#btn-play-returns-audio').addEventListener('click', () => {
    AudioAssistance.speak(
      "हस्तशिल्प सुरक्षा नीति: पारगमन में नुकसान होने पर पूरा रिफंड मिलता है, और शिल्पकार का मेहनताना भी बीमा फंड से पूरी तरह सुरक्षित रहता है।",
      "hi-IN"
    );
  });

  container.querySelector('#btn-file-return').addEventListener('click', () => {
    window.openReturnModal();
  });
}
