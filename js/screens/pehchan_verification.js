/**
 * Screen 2: Handicrafts Pehchan Verification (Step 2 of 4)
 * Exact 1:1 pixel-perfect recreation of User's Reference Screenshot
 */

import { State } from '../state.js';
import { AudioAssistance } from '../speech.js';

export function renderPehchanScreen(container) {
  let isFlashOn = false;

  container.innerHTML = `
    <div class="pehchan-screen animate-fade-in" style="padding: 14px 14px 32px; background: #FAF8F5; min-height: 100vh; max-width: 480px; margin: 0 auto; box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
      
      <!-- Stepper Header Row -->
      <div style="display:flex; align-items:center; gap:8px; margin-bottom:10px;">
        <div style="width:24px; height:24px; border-radius:50%; background:#7A2813; color:#FFFFFF; font-size:0.85rem; font-weight:800; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
          2
        </div>
        <div style="font-size:0.95rem; font-weight:700; color:#1E150F;">
          Step 2 of 4 <span style="color:#71655D; font-weight:500;">• Pehchan Registry</span>
        </div>
      </div>

      <!-- 4-Segment Progress Bar -->
      <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:6px; margin-bottom:20px;">
        <div style="height:6px; border-radius:3px; background:#7A2813;"></div>
        <div style="height:6px; border-radius:3px; background:#7A2813;"></div>
        <div style="height:6px; border-radius:3px; background:#E5DAC8;"></div>
        <div style="height:6px; border-radius:3px; background:#E5DAC8;"></div>
      </div>

      <!-- Title & Subtitle -->
      <h1 style="font-family:'Lora', Georgia, 'Times New Roman', serif; font-size:1.55rem; font-weight:800; color:#1E150F; margin:0 0 6px 0; letter-spacing:-0.01em;">
        Pehchan Verification
      </h1>
      <p style="font-size:0.88rem; color:#5C524A; line-height:1.45; margin:0 0 20px 0;">
        Verify your government artisan card to get direct payments into your bank account.
      </p>

      <!-- Card 1: Auto-Scan Pehchan Card -->
      <div style="background:#FFFFFF; border:1px solid #ECE6DE; border-radius:14px; padding:16px 14px; margin-bottom:14px; box-shadow:0 1px 4px rgba(0,0,0,0.03);">
        
        <!-- Header -->
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:12px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/>
            <line x1="7" y1="12" x2="17" y2="12"/><line x1="7" y1="8" x2="17" y2="8"/><line x1="7" y1="16" x2="17" y2="16"/>
          </svg>
          <span style="font-size:0.95rem; font-weight:800; color:#1E150F;">
            Auto-Scan Pehchan Card
          </span>
        </div>

        <!-- Dark Camera Viewfinder with matrix background -->
        <div id="scanner-viewfinder" style="background:#141A16; background-image:radial-gradient(#26332A 1.2px, transparent 1.2px); background-size:12px 12px; border-radius:10px; padding:16px 12px; margin-bottom:12px; position:relative; overflow:hidden;">
          
          <!-- Corner reticles -->
          <div style="position:absolute; top:8px; left:8px; width:16px; height:16px; border-top:3px solid #2E7D32; border-left:3px solid #2E7D32; pointer-events:none;"></div>
          <div style="position:absolute; top:8px; right:8px; width:16px; height:16px; border-top:3px solid #2E7D32; border-right:3px solid #2E7D32; pointer-events:none;"></div>
          <div style="position:absolute; bottom:8px; left:8px; width:16px; height:16px; border-bottom:3px solid #2E7D32; border-left:3px solid #2E7D32; pointer-events:none;"></div>
          <div style="position:absolute; bottom:8px; right:8px; width:16px; height:16px; border-bottom:3px solid #2E7D32; border-right:3px solid #2E7D32; pointer-events:none;"></div>

          <!-- Viewfinder Top Bar -->
          <div style="display:flex; align-items:center; gap:6px; margin-bottom:12px;">
            <div style="width:16px; height:16px; border-radius:50%; background:#C05621; display:flex; align-items:center; justify-content:center; color:#fff; font-size:10px; flex-shrink:0;">🏛️</div>
            <span style="font-size:0.7rem; font-weight:800; color:#FFFFFF; letter-spacing:0.04em;">
              GOVT. OF INDIA • PEHCHAN
            </span>
          </div>

          <!-- Mock Card inside Frame -->
          <div style="background:#28312B; border:1px solid #3A463E; border-radius:8px; padding:10px; display:flex; align-items:center; gap:10px; margin-bottom:12px;">
            <img src="/assets/artisan_ramulu.jpg" alt="Ramdev Kumhar" style="width:48px; height:58px; object-fit:cover; border-radius:4px; border:1px solid #48574D; flex-shrink:0;" onerror="this.src='/assets/artisan_budhram.jpg'">
            <div style="flex:1;">
              <div style="width:75px; height:6px; background:#647369; border-radius:3px; margin-bottom:6px;"></div>
              <div style="width:110px; height:6px; background:#4B5950; border-radius:3px; margin-bottom:8px;"></div>
              <span style="background:#1B4D3E; color:#FFFFFF; font-size:0.72rem; font-weight:800; padding:2px 8px; border-radius:4px; letter-spacing:0.04em; display:inline-block;">
                UP-VAR-49281-H
              </span>
            </div>
            <div style="width:36px; height:36px; background:#37433C; border-radius:4px; display:flex; align-items:center; justify-content:center; color:#E0E7E3; flex-shrink:0;">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="5" height="5" x="3" y="3" rx="1"/><rect width="5" height="5" x="16" y="3" rx="1"/><rect width="5" height="5" x="3" y="16" rx="1"/><path d="M21 16h-3a2 2 0 0 0-2 2v3"/><path d="M21 21v.01"/><path d="M12 7v3a2 2 0 0 1-2 2H7"/><path d="M3 12h.01"/><path d="M12 3h.01"/><path d="M12 16v.01"/><path d="M16 12h1"/><path d="M21 12v.01"/><path d="M12 21v-1"/></svg>
            </div>
          </div>

          <!-- Bottom Viewfinder Hint -->
          <div style="text-align:center; font-size:0.75rem; color:#FFFFFF; opacity:0.9; font-weight:600; display:flex; align-items:center; justify-content:center; gap:6px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/></svg>
            <span>Hold card steady inside frame</span>
          </div>

        </div>

        <!-- Capture & Flash Button Row -->
        <div style="display:flex; gap:8px;">
          <button type="button" id="btn-capture-photo" style="flex:1; background:#1C3550; color:#FFFFFF; border:none; border-radius:8px; padding:12px; font-size:0.88rem; font-weight:700; display:flex; align-items:center; justify-content:center; gap:8px; cursor:pointer;">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
            <span>Capture Card Photo</span>
          </button>
          <button type="button" id="btn-toggle-flash" title="Toggle Flash" style="width:48px; background:#EDE8E1; border:none; border-radius:8px; display:flex; align-items:center; justify-content:center; cursor:pointer;">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2B241F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          </button>
        </div>

      </div>

      <!-- Card 2: Manual 14-Digit Pehchan ID -->
      <div style="background:#FFFFFF; border:1px solid #ECE6DE; border-radius:14px; padding:16px 14px; margin-bottom:18px; box-shadow:0 1px 4px rgba(0,0,0,0.03);">
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:10px;">
          <div style="width:20px; height:16px; border:1.8px solid #7A2813; border-radius:3px; display:inline-flex; align-items:center; justify-content:center; font-size:9px; font-weight:800; color:#7A2813; letter-spacing:-0.5px;">123</div>
          <span style="font-size:0.95rem; font-weight:800; color:#1E150F;">
            Manual 14-Digit Pehchan ID
          </span>
        </div>

        <div style="background:#FAF8F5; border:1px solid #EADBCE; border-radius:8px; padding:12px 14px; display:flex; align-items:center; gap:12px;">
          <!-- Fingerprint Icon -->
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8C827A" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4"/><path d="M14 13.12c0 2.38 0 6.38-1 8.88"/><path d="M17.29 21.02c.12-.6.43-2.3.5-3.02"/><path d="M2 12a10 10 0 0 1 18-6"/><path d="M2 16h.01"/><path d="M21.8 16c.2-2 .131-5.354 0-6"/><path d="M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2"/><path d="M8.65 22c.21-.66.45-1.32.57-2"/><path d="M9 6.8a6 6 0 0 1 9 5.2v2"/></svg>
          <span style="font-size:1.05rem; font-weight:800; color:#1E150F; letter-spacing:0.04em;">
            UP-VAR-49281-H
          </span>
        </div>
      </div>

      <!-- Action Buttons -->
      <button type="button" id="btn-verify-pehchan" style="width:100%; background:#7A2813; color:#FFFFFF; border:none; border-radius:8px; padding:14px; font-size:0.95rem; font-weight:800; display:flex; align-items:center; justify-content:center; gap:8px; cursor:pointer; box-shadow:0 4px 12px rgba(122, 40, 19, 0.25); margin-bottom:10px;">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
        <span>Verify Pehchan &amp; Proceed to Bank Setup</span>
      </button>

      <button type="button" id="btn-skip-bank" style="width:100%; background:#F7F3ED; border:1px solid #DFD6C9; border-radius:8px; padding:12px; font-size:0.85rem; font-weight:700; color:#4A3B32; display:flex; align-items:center; justify-content:center; gap:8px; cursor:pointer;">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        <span>Add Bank Details Later • Skip for now</span>
      </button>

      <div style="font-size:0.72rem; color:#73675F; text-align:center; margin:8px 0 18px 0;">
        (You can link your bank anytime before your first craft payout)
      </div>

      <!-- Bottom Help Card -->
      <div style="background:#FFFFFF; border:1px solid #ECE6DE; border-radius:14px; padding:16px; text-align:center; box-shadow:0 1px 4px rgba(0,0,0,0.03);">
        <div style="font-size:0.88rem; color:#5C524A; font-weight:600; margin-bottom:8px;">
          Don't have a Pehchan Card?
        </div>
        <div style="font-size:0.85rem; font-weight:800; color:#7A2813; margin-bottom:6px; display:flex; align-items:center; justify-content:center; gap:4px; cursor:pointer;" onclick="window.openCscLocatorModal?.()">
          <span>📍</span>
          <span>Apply at Nearest CSC Centre</span>
          <span style="color:#A19790;">•</span>
        </div>
        <div style="font-size:0.85rem; font-weight:800; color:#1C3550; display:flex; align-items:center; justify-content:center; gap:6px;">
          <span>📞</span>
          <span>Call Customer care XXXXXXXXXX</span>
        </div>
      </div>

    </div>
  `;

  // Attach interactive events
  const captureBtn = container.querySelector('#btn-capture-photo');
  const viewfinder = container.querySelector('#scanner-viewfinder');
  captureBtn?.addEventListener('click', () => {
    viewfinder.style.boxShadow = '0 0 25px rgba(255, 255, 255, 0.9)';
    window.showToast?.("Capturing Pehchan Card... OCR Verified!");
    setTimeout(() => {
      viewfinder.style.boxShadow = 'none';
      window.showToast?.("Matched: Ramdev Kumhar (Varanasi Clay Cluster)");
    }, 400);
  });

  const flashBtn = container.querySelector('#btn-toggle-flash');
  flashBtn?.addEventListener('click', () => {
    isFlashOn = !isFlashOn;
    flashBtn.style.background = isFlashOn ? '#FEF08A' : '#EDE8E1';
    window.showToast?.(isFlashOn ? "Camera Flash ON" : "Camera Flash OFF");
  });

  container.querySelector('#btn-verify-pehchan')?.addEventListener('click', () => {
    window.navigateToScreen('bank');
  });

  container.querySelector('#btn-skip-bank')?.addEventListener('click', () => {
    window.navigateToScreen('studio');
  });
}
