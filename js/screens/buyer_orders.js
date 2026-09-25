/**
 * Screen: Buyer Orders / Loom-to-Doorstep Journey Tracking
 * Pixel-perfect recreation of User Provided Reference Screenshot
 */

import { State } from '../state.js';
import { AudioAssistance } from '../speech.js';

export function renderBuyerOrdersScreen(container) {
  let isTimelineExpanded = true;
  let isPlayingBlessing = false;

  container.innerHTML = `
    <div class="buyer-orders-screen animate-fade-in" style="padding: 10px 14px 84px; background: #FAF7F2; min-height: 100vh;">
      
      <!-- Top Tracking Order Status Card -->
      <div style="background:#FAF7F2; border:1px solid #ECE7E1; border-radius:12px; padding:10px 14px; margin-bottom:12px; display:flex; justify-content:space-between; align-items:center;">
        <div style="display:flex; align-items:center; gap:10px;">
          <div style="width:34px; height:34px; border-radius:50%; background:#FEECE5; color:#7A2813; display:flex; align-items:center; justify-content:center; font-size:1.1rem; flex-shrink:0;">
            🚚
          </div>
          <div style="line-height:1.2;">
            <div style="font-size:0.62rem; font-weight:800; color:#C2410C; letter-spacing:0.04em;">TRACKING ORDER</div>
            <div style="font-size:0.95rem; font-weight:900; color:#1C1917;">#KRG-98421</div>
          </div>
        </div>

        <span style="background:#E7F7ED; color:#15803D; font-size:0.65rem; font-weight:800; padding:3px 10px; border-radius:9999px; display:inline-flex; align-items:center; gap:4px;">
          <span>•</span>
          <span>In Transit</span>
        </span>
      </div>

      <!-- Product Item Summary Card -->
      <div style="background:#FFFFFF; border:1px solid #ECE7E1; border-radius:14px; padding:14px; margin-bottom:12px; box-shadow:0 1px 4px rgba(0,0,0,0.03);">
        <div style="display:flex; gap:12px; align-items:center;">
          <div style="width:68px; height:68px; border-radius:8px; overflow:hidden; position:relative; flex-shrink:0; border:1px solid #ECE7E1;">
            <img src="/assets/terracotta_pitcher.jpg" alt="Hand-Etched Terracotta Pitcher" style="width:100%; height:100%; object-fit:cover;">
            <span style="position:absolute; bottom:2px; right:2px; background:rgba(0,0,0,0.65); color:#FFFFFF; font-size:0.52rem; font-weight:800; padding:1px 4px; border-radius:3px;">
              1 Pc
            </span>
          </div>

          <div style="flex:1;">
            <div style="font-size:0.6rem; font-weight:800; color:#B45309; letter-spacing:0.04em; text-transform:uppercase; margin-bottom:2px;">
              TERRACOTTA GUILD OF ALWAR
            </div>
            <div style="font-size:0.92rem; font-weight:900; color:#1C1917; margin-bottom:4px; line-height:1.25;">
              Hand-Etched Terracotta Pitcher
            </div>
            <div style="font-size:0.8rem; font-weight:900; color:#7A2813;">
              ₹750 <span style="font-size:0.68rem; font-weight:600; color:#57534E;">(100% Direct Artisan Payout)</span>
            </div>
          </div>
        </div>

        <!-- Estimated Doorstep Arrival Banner -->
        <div style="background:#FAF7F2; border:1px solid #ECE7E1; border-radius:8px; padding:10px 12px; margin-top:12px; display:flex; justify-content:space-between; align-items:center;">
          <div style="display:flex; align-items:center; gap:8px;">
            <span style="font-size:1.1rem;">📅</span>
            <div style="line-height:1.2;">
              <div style="font-size:0.62rem; color:#78716C;">Estimated Doorstep Arrival</div>
              <div style="font-size:0.85rem; font-weight:900; color:#1C1917;">Thursday, 24 Oct</div>
            </div>
          </div>
          <div style="color:#15803D; font-size:1.1rem;">
            🛡️
          </div>
        </div>
      </div>

      <!-- Master Artisan Thank-You & Blessing Card -->
      <div style="background:#FFFFFF; border:1px solid #ECE7E1; border-radius:14px; padding:14px; margin-bottom:12px; box-shadow:0 1px 4px rgba(0,0,0,0.03);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
          <div style="display:flex; align-items:center; gap:10px;">
            <div style="width:40px; height:40px; border-radius:8px; overflow:hidden; position:relative; flex-shrink:0;">
              <img src="/assets/artisan_ramulu.jpg" alt="Ramdev Kumhar" style="width:100%; height:100%; object-fit:cover;">
              <span style="position:absolute; bottom:1px; right:1px; background:#15803D; color:#FFFFFF; font-size:0.48rem; width:12px; height:12px; border-radius:50%; display:flex; align-items:center; justify-content:center;">✔</span>
            </div>
            <div>
              <div style="font-size:0.9rem; font-weight:900; color:#1C1917;">Ramdev Kumhar</div>
              <div style="font-size:0.66rem; color:#78716C;">Master Potter • Pehchān Verified</div>
            </div>
          </div>

          <div style="font-size:1.15rem; font-weight:900; color:#D97706;">
            99
          </div>
        </div>

        <!-- Audio Blessing Bar -->
        <div style="background:#FAF5EE; border-radius:10px; padding:8px 12px; margin-bottom:8px; display:flex; align-items:center; gap:10px;">
          <button type="button" id="btn-play-blessing" style="width:32px; height:32px; border-radius:50%; background:#7A2813; color:#FFFFFF; border:none; display:flex; align-items:center; justify-content:center; cursor:pointer; flex-shrink:0;">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
          </button>

          <div style="flex:1;">
            <div style="font-size:0.75rem; font-weight:800; color:#1C1917; margin-bottom:2px;">
              Ramdev's Thank-You Blessing
            </div>
            <!-- Equalizer Sound Wave -->
            <div style="display:flex; align-items:center; gap:2px; height:14px;">
              <span style="width:2px; height:50%; background:#B45309; border-radius:1px;"></span>
              <span style="width:2px; height:90%; background:#B45309; border-radius:1px;"></span>
              <span style="width:2px; height:60%; background:#B45309; border-radius:1px;"></span>
              <span style="width:2px; height:100%; background:#B45309; border-radius:1px;"></span>
              <span style="width:2px; height:40%; background:#D6C7B2; border-radius:1px;"></span>
              <span style="width:2px; height:75%; background:#D6C7B2; border-radius:1px;"></span>
              <span style="width:2px; height:85%; background:#D6C7B2; border-radius:1px;"></span>
              <span style="width:2px; height:30%; background:#D6C7B2; border-radius:1px;"></span>
              <span style="width:2px; height:60%; background:#D6C7B2; border-radius:1px;"></span>
              <span style="width:2px; height:45%; background:#D6C7B2; border-radius:1px;"></span>
            </div>
          </div>

          <span style="font-size:0.65rem; color:#78716C; font-family:monospace;">
            0:00 / 0:18
          </span>
        </div>

        <p style="font-size:0.72rem; color:#57534E; font-style:italic; line-height:1.45; margin:0;">
          "Dear patron, with your direct support, our family's potter wheel keeps turning. May this earthen pitcher bring cool serenity to your home."
        </p>
      </div>

      <!-- Loom-to-Doorstep Journey Timeline Card -->
      <div style="background:#FFFFFF; border:1px solid #ECE7E1; border-radius:14px; padding:14px; margin-bottom:12px; box-shadow:0 1px 4px rgba(0,0,0,0.03);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
          <div style="display:flex; align-items:center; gap:8px;">
            <div style="width:28px; height:28px; border-radius:8px; background:#FEECE5; color:#7A2813; display:flex; align-items:center; justify-content:center; font-size:0.95rem;">
              🪢
            </div>
            <div>
              <div style="font-size:0.6rem; font-weight:800; color:#C2410C; letter-spacing:0.04em;">DELIVERY STATUS</div>
              <div style="font-size:0.95rem; font-weight:900; color:#1C1917;">Loom-to-Doorstep Journey</div>
            </div>
          </div>

          <button type="button" id="btn-toggle-timeline" style="width:28px; height:28px; border-radius:6px; background:#FAF7F2; border:1px solid #ECE7E1; display:flex; align-items:center; justify-content:center; cursor:pointer; color:#7A2813; font-weight:900; font-size:0.8rem;">
            ^
          </button>
        </div>

        <!-- Sub status bar -->
        <div style="display:flex; justify-content:space-between; align-items:center; padding:6px 0; border-top:1px solid #F1ECE6; border-bottom:1px solid #F1ECE6; margin-bottom:12px; font-size:0.68rem;">
          <span style="color:#1C1917; font-weight:700;">
            <span style="color:#C2410C;">•</span> In Transit • Handed to Delivery Agent
          </span>
          <span id="hide-details-btn" style="color:#7A2813; font-weight:800; cursor:pointer;">
            Hide Details
          </span>
        </div>

        <!-- Vertical Timeline Steps -->
        <div id="timeline-steps-container" style="display:flex; flex-direction:column; gap:14px; position:relative; padding-left:4px;">
          
          <!-- Step 1: Order Placed & Advance Disbursed -->
          <div style="display:flex; gap:10px; align-items:flex-start;">
            <div style="width:22px; height:22px; border-radius:50%; background:#15803D; color:#FFFFFF; font-size:0.65rem; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
              ✓
            </div>
            <div style="flex:1;">
              <div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:2px;">
                <strong style="font-size:0.8rem; color:#1C1917;">Order Placed &amp; Advance Disbursed</strong>
                <span style="font-size:0.62rem; color:#78716C;">21 Oct, 10:15 AM</span>
              </div>
              <div style="font-size:0.68rem; color:#57534E; line-height:1.35;">
                100% upfront raw material fund credited directly to Ramdev's bank.
              </div>
            </div>
          </div>

          <!-- Step 2: Selected from Sun-Dried Kiln -->
          <div style="display:flex; gap:10px; align-items:flex-start;">
            <div style="width:22px; height:22px; border-radius:50%; background:#15803D; color:#FFFFFF; font-size:0.65rem; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
              ✓
            </div>
            <div style="flex:1;">
              <div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:2px;">
                <strong style="font-size:0.8rem; color:#1C1917;">Selected from Sun-Dried Kiln</strong>
                <span style="font-size:0.62rem; color:#78716C;">21 Oct, 04:40 PM</span>
              </div>
              <div style="font-size:0.68rem; color:#57534E; line-height:1.35;">
                Inspected for hairline fractures and bell-like resonance.
              </div>
            </div>
          </div>

          <!-- Step 3: Eco-Cushion Packaging -->
          <div style="display:flex; gap:10px; align-items:flex-start;">
            <div style="width:22px; height:22px; border-radius:50%; background:#15803D; color:#FFFFFF; font-size:0.65rem; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
              ✓
            </div>
            <div style="flex:1;">
              <div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:2px;">
                <strong style="font-size:0.8rem; color:#1C1917;">Eco-Cushion Packaging</strong>
                <span style="font-size:0.62rem; color:#78716C;">22 Oct, 11:00 AM</span>
              </div>
              <div style="font-size:0.68rem; color:#57534E; line-height:1.35; margin-bottom:6px;">
                Packed safely inside shredded dried straw, recycled jute, and molded earthen husk pods.
              </div>

              <!-- Workshop Dispatch Snapshot -->
              <div style="background:#FAF7F2; border:1px solid #ECE7E1; border-radius:6px; padding:6px 8px; display:flex; align-items:center; gap:8px;">
                <img src="/assets/terracotta_pitcher.jpg" alt="Packaging Snapshot" style="width:36px; height:36px; border-radius:4px; object-fit:cover;">
                <div>
                  <div style="font-size:0.7rem; font-weight:800; color:#1C1917;">Workshop Dispatch Snapshot</div>
                  <div style="font-size:0.62rem; color:#15803D; font-weight:700;">📷 Verified safe wrap</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 4: Handed to Delivery Agent (Active Step) -->
          <div style="background:#FDF2EC; border-radius:8px; padding:10px; display:flex; gap:10px; align-items:flex-start;">
            <div style="width:22px; height:22px; border-radius:50%; background:#7A2813; color:#FFFFFF; font-size:0.7rem; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
              🔄
            </div>
            <div style="flex:1;">
              <div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:2px;">
                <strong style="font-size:0.82rem; color:#7A2813;">Handed to Delivery Agent</strong>
                <span style="font-size:0.62rem; color:#78716C;">22 Oct, 03:20 PM</span>
              </div>
              <div style="font-size:0.68rem; color:#57534E; line-height:1.35; margin-bottom:8px;">
                Departed Regional Sort Center, Alwar GPO. En route to Central Transit Junction.
              </div>

              <!-- Tracking Consignment Box -->
              <div style="background:#FFFFFF; border:1px solid #E5DCD3; border-radius:6px; padding:4px 8px; display:flex; justify-content:space-between; align-items:center;">
                <div style="font-size:0.68rem; font-family:monospace; color:#1C1917; display:flex; align-items:center; gap:4px;">
                  <span>▦</span>
                  <strong>AWB: SP-UP298412IN</strong>
                </div>
                <button type="button" style="background:none; border:none; color:#1C1917; font-size:0.68rem; font-weight:800; cursor:pointer;" onclick="navigator.clipboard?.writeText('SP-UP298412IN'); window.showToast?.('AWB SP-UP298412IN copied! 📋')">
                  Copy
                </button>
              </div>
            </div>
          </div>

          <!-- Step 5: Arriving at Local Delivery Hub -->
          <div style="display:flex; gap:10px; align-items:flex-start;">
            <div style="width:22px; height:22px; border-radius:50%; background:#EAE6E1; color:#78716C; font-size:0.7rem; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
              🏢
            </div>
            <div style="flex:1;">
              <div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:2px;">
                <strong style="font-size:0.8rem; color:#57534E;">Arriving at Local Delivery Hub</strong>
                <span style="font-size:0.62rem; color:#78716C;">24 Oct (Expected)</span>
              </div>
              <div style="font-size:0.68rem; color:#78716C; line-height:1.35;">
                Sorting at your city post office branch for morning dispatch.
              </div>
            </div>
          </div>

          <!-- Step 6: Doorstep Delivery with OTP -->
          <div style="display:flex; gap:10px; align-items:flex-start;">
            <div style="width:22px; height:22px; border-radius:50%; background:#EAE6E1; color:#78716C; font-size:0.7rem; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
              📍
            </div>
            <div style="flex:1;">
              <div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:2px;">
                <strong style="font-size:0.8rem; color:#57534E;">Doorstep Delivery with OTP</strong>
                <span style="font-size:0.62rem; color:#A8A29E;">Pending</span>
              </div>
              <div style="font-size:0.68rem; color:#78716C; line-height:1.35;">
                Secure contact-free handover. Keep delivery OTP handy upon arrival.
              </div>
            </div>
          </div>

        </div>

        <!-- Call Courier Action Button -->
        <button type="button" style="width:100%; background:#FAF7F2; border:1px solid #E5DCD3; border-radius:8px; padding:10px; font-size:0.76rem; font-weight:800; color:#1C1917; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:6px; margin-top:14px;" onclick="window.showToast?.('Connecting call to Delivery Agent Dispatcher...')">
          <span>📞</span>
          <span>Call Courier</span>
        </button>
      </div>

      <!-- Craft Transit Insurance Guarantee Card -->
      <div style="background:linear-gradient(135deg, #FDEEE5 0%, #FDF2EC 100%); border:1px solid #F5D7C7; border-radius:14px; padding:14px; margin-bottom:18px; display:flex; gap:12px; align-items:flex-start;">
        <div style="width:38px; height:38px; border-radius:8px; background:#174332; color:#4ADE80; display:flex; align-items:center; justify-content:center; font-size:1.15rem; flex-shrink:0;">
          🛡️
        </div>
        <div>
          <div style="font-size:0.88rem; font-weight:900; color:#7A2813; margin-bottom:4px;">
            Craft Transit Insurance Guarantee
          </div>
          <div style="font-size:0.7rem; color:#57534E; line-height:1.4; margin-bottom:6px;">
            Handmade pottery carries souls and fragility. In the rare event of transit crack or breakage, receive a <strong>100% instant refund or free handcrafted replacement</strong> directly backed by our Craft Transit Insurance Fund.
          </div>
          <div style="display:flex; align-items:center; gap:6px; font-size:0.68rem;">
            <span style="color:#15803D; font-weight:800;">✓ Zero-Hassle Resolution</span>
            <span style="color:#A8A29E;">•</span>
            <a href="javascript:void(0)" onclick="window.navigateToScreen('buyer_returns')" style="color:#7A2813; font-weight:800; text-decoration:underline;">
              Policy Details
            </a>
          </div>
        </div>
      </div>

    </div>
  `;

  // Attach Event Handlers
  container.querySelector('#btn-play-blessing')?.addEventListener('click', () => {
    isPlayingBlessing = !isPlayingBlessing;
    if (isPlayingBlessing) {
      AudioAssistance.speak(
        "नमस्ते प्रिय ग्राहक। आपके सीधे सहयोग से हमारे परिवार का चाक घूमता रहता है। आशा है कि यह मिट्टी का घड़ा आपके घर में शीतलता और शांति लाएगा।",
        "hi-IN"
      );
      window.showToast?.("Playing Master Ramdev Kumhar's Blessing 🎙️");
    } else {
      AudioAssistance.stop();
    }
  });

  const toggleBtn = container.querySelector('#btn-toggle-timeline');
  const hideDetailsBtn = container.querySelector('#hide-details-btn');
  const stepsContainer = container.querySelector('#timeline-steps-container');

  const handleToggle = () => {
    isTimelineExpanded = !isTimelineExpanded;
    if (stepsContainer) stepsContainer.style.display = isTimelineExpanded ? 'flex' : 'none';
    if (toggleBtn) toggleBtn.textContent = isTimelineExpanded ? '^' : 'v';
    if (hideDetailsBtn) hideDetailsBtn.textContent = isTimelineExpanded ? 'Hide Details' : 'Show Details';
  };

  toggleBtn?.addEventListener('click', handleToggle);
  hideDetailsBtn?.addEventListener('click', handleToggle);
}
