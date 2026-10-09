/**
 * Screen 2: Handicrafts Pehchan Verification (Step 2 of 4)
 * Exact 1:1 pixel-perfect recreation of User's Reference Screenshot
 */

import { State } from '../state.js';
import { AudioAssistance } from '../speech.js';

export function renderPehchanScreen(container) {
  let isFlashOn = false;
  let activeStream = null;
  let isCaptured = false;

  // Sound feedback for camera shutter
  function playShutterSound() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(650, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.09);
      gain.gain.setValueAtTime(0.35, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.09);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.09);
    } catch (e) {
      // Audio autoplay policy fallback
    }
  }

  // Cleanup active camera stream
  function cleanupCamera() {
    if (activeStream) {
      activeStream.getTracks().forEach(track => {
        try {
          if (isFlashOn) {
            track.applyConstraints({ advanced: [{ torch: false }] }).catch(() => {});
          }
        } catch (e) {}
        track.stop();
      });
      activeStream = null;
    }
  }
  window.stopPehchanCamera = cleanupCamera;

  container.innerHTML = `
    <style>
      @keyframes scanLaser {
        0% { top: 18%; opacity: 0.3; }
        50% { top: 82%; opacity: 1; }
        100% { top: 18%; opacity: 0.3; }
      }
      @keyframes pulseDot {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.3; transform: scale(0.85); }
      }
      @keyframes shutterFlashAnim {
        0% { opacity: 0.95; }
        100% { opacity: 0; }
      }
    </style>

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
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:12px;">
          <div style="display:flex; align-items:center; gap:8px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/>
              <line x1="7" y1="12" x2="17" y2="12"/><line x1="7" y1="8" x2="17" y2="8"/><line x1="7" y1="16" x2="17" y2="16"/>
            </svg>
            <span style="font-size:0.95rem; font-weight:800; color:#1E150F;">
              Auto-Scan Pehchan Card
            </span>
          </div>
          <span id="camera-status-pill" style="font-size:0.65rem; font-weight:800; background:#DCFCE7; color:#166534; padding:3px 8px; border-radius:10px; border:1px solid #BBF7D0; display:flex; align-items:center; gap:4px;">
            <span style="width:6px; height:6px; border-radius:50%; background:#22C55E; display:inline-block; animation:pulseDot 1.2s infinite;"></span>
            LIVE CAMERA
          </span>
        </div>

        <!-- Live Camera Viewfinder with scanning overlay -->
        <div id="scanner-viewfinder" style="background:#141A16; border-radius:12px; height:230px; position:relative; overflow:hidden; display:flex; flex-direction:column; justify-content:center; align-items:center; box-shadow:inset 0 0 24px rgba(0,0,0,0.85);">

          <!-- Real Live Camera Feed -->
          <video id="camera-live-video" autoplay playsinline muted style="width:100%; height:100%; object-fit:cover; display:block; position:absolute; inset:0;"></video>

          <!-- Captured Photo Snapshot -->
          <img id="camera-snapshot-img" alt="Captured Pehchan Card" style="display:none; width:100%; height:100%; object-fit:cover; position:absolute; inset:0; z-index:4;" />

          <!-- Screen Torch Illumination Overlay (for mobile screen flash) -->
          <div id="screen-torch-overlay" style="display:none; position:absolute; inset:0; background:rgba(255,255,255,0.78); mix-blend-mode:screen; pointer-events:none; z-index:5;"></div>

          <!-- Camera Shutter Flash Animation -->
          <div id="camera-shutter-flash" style="display:none; position:absolute; inset:0; background:#FFFFFF; pointer-events:none; z-index:10; opacity:0;"></div>

          <!-- Camera Fallback (when camera permission blocked or on insecure LAN HTTP) -->
          <div id="camera-fallback-card" style="display:none; position:absolute; inset:12px; z-index:3; background:#1C241F; border:1px solid #3A463E; border-radius:8px; padding:14px; flex-direction:column; align-items:center; justify-content:center; text-align:center;">
            <div style="margin-bottom:6px; display:flex; justify-content:center;">
              <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
            </div>
            <div style="font-size:0.85rem; font-weight:800; color:#FFFFFF; margin-bottom:4px;">Device Camera Ready</div>
            <div style="font-size:0.72rem; color:#A8B5AC; max-width:250px; margin-bottom:12px; line-height:1.35;">
              Tap below to snap a photo with your mobile camera or grant browser permission.
            </div>
            <button type="button" id="btn-request-cam-perm" style="background:#22C55E; color:#FFFFFF; border:none; border-radius:6px; padding:8px 16px; font-size:0.78rem; font-weight:800; cursor:pointer; display:flex; align-items:center; gap:6px;">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
              <span>Open Mobile Camera</span>
            </button>
          </div>

          <!-- Alignment Card Frame & Reticle Overlay (sits over video) -->
          <div id="scanner-reticle-overlay" style="position:absolute; inset:0; pointer-events:none; z-index:6;">
            <!-- Corner Reticles -->
            <div style="position:absolute; top:10px; left:10px; width:22px; height:22px; border-top:3.5px solid #22C55E; border-left:3.5px solid #22C55E; border-top-left-radius:6px;"></div>
            <div style="position:absolute; top:10px; right:10px; width:22px; height:22px; border-top:3.5px solid #22C55E; border-right:3.5px solid #22C55E; border-top-right-radius:6px;"></div>
            <div style="position:absolute; bottom:10px; left:10px; width:22px; height:22px; border-bottom:3.5px solid #22C55E; border-left:3.5px solid #22C55E; border-bottom-left-radius:6px;"></div>
            <div style="position:absolute; bottom:10px; right:10px; width:22px; height:22px; border-bottom:3.5px solid #22C55E; border-right:3.5px solid #22C55E; border-bottom-right-radius:6px;"></div>

            <!-- Viewfinder Top Bar -->
            <div style="position:absolute; top:12px; left:14px; right:14px; display:flex; justify-content:space-between; align-items:center;">
              <div style="display:flex; align-items:center; gap:6px; background:rgba(0,0,0,0.65); padding:3px 9px; border-radius:12px; backdrop-filter:blur(4px);">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg>
                <span style="font-size:0.68rem; font-weight:800; color:#FFFFFF; letter-spacing:0.04em;">GOVT. OF INDIA • PEHCHAN</span>
              </div>
              <div id="torch-indicator-badge" style="display:none; background:#FEF08A; color:#854D0E; font-size:0.62rem; font-weight:800; padding:2px 7px; border-radius:10px; border:1px solid #FACC15;">
                ⚡ FLASH ACTIVE
              </div>
            </div>

            <!-- Card Placement Dashed Outline -->
            <div id="card-guide-outline" style="position:absolute; inset:42px 20px 36px 20px; border:1.8px dashed rgba(255,255,255,0.55); border-radius:8px; display:flex; align-items:center; justify-content:center;">
              <div id="card-placeholder-info" style="text-align:center; background:rgba(0,0,0,0.35); padding:6px 12px; border-radius:6px;">
                <div style="font-size:0.75rem; font-weight:800; color:#FFFFFF;">Fit Pehchan Card in Box</div>
                <div style="font-size:0.65rem; color:rgba(255,255,255,0.75);">AI OCR reads photo &amp; ID number</div>
              </div>
            </div>

            <!-- Animated Laser Scan Bar -->
            <div id="scanner-laser-line" style="position:absolute; left:16px; right:16px; height:2px; background:linear-gradient(90deg, transparent, #22C55E, transparent); box-shadow:0 0 10px #22C55E; top:50%; animation:scanLaser 2.4s ease-in-out infinite;"></div>

            <!-- Bottom Viewfinder Hint -->
            <div style="position:absolute; bottom:10px; left:0; right:0; text-align:center; font-size:0.72rem; color:#FFFFFF; font-weight:700; text-shadow:0 1px 4px rgba(0,0,0,0.9); display:flex; align-items:center; justify-content:center; gap:5px;">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/></svg>
              <span id="viewfinder-footer-text">Hold card steady inside frame</span>
            </div>
          </div>

        </div>

        <!-- Hidden Canvas for capture rendering -->
        <canvas id="camera-capture-canvas" style="display:none;"></canvas>

        <!-- Hidden Native File Input for Mobile Fallback -->
        <input type="file" id="camera-native-file-input" accept="image/*" capture="environment" style="display:none;" />

        <!-- Capture & Flash Button Row -->
        <div style="display:flex; gap:8px; margin-top:12px;">
          <button type="button" id="btn-capture-photo" style="flex:1; background:#1C3550; color:#FFFFFF; border:none; border-radius:8px; padding:13px; font-size:0.9rem; font-weight:800; display:flex; align-items:center; justify-content:center; gap:8px; cursor:pointer; box-shadow:0 2px 6px rgba(28,53,80,0.25); transition:all 0.15s ease;">
            <svg id="capture-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
            <span id="capture-btn-label">Capture Card Photo</span>
          </button>

          <button type="button" id="btn-toggle-flash" title="Toggle Flash / Torch" style="width:50px; background:#EDE8E1; border:none; border-radius:8px; display:flex; align-items:center; justify-content:center; cursor:pointer; transition:all 0.2s ease;">
            <svg id="flash-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          </button>
        </div>

      </div>

      <!-- Card 2: Manual 14-Digit Pehchan ID -->
      <div id="card-pehchan-id-box" style="background:#FFFFFF; border:1px solid #ECE6DE; border-radius:14px; padding:16px 14px; margin-bottom:18px; box-shadow:0 1px 4px rgba(0,0,0,0.03); transition:all 0.25s ease;">
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:10px;">
          <div style="display:flex; align-items:center; gap:8px;">
            <div style="width:20px; height:16px; border:1.8px solid #7A2813; border-radius:3px; display:inline-flex; align-items:center; justify-content:center; font-size:9px; font-weight:800; color:#7A2813; letter-spacing:-0.5px;">123</div>
            <span style="font-size:0.95rem; font-weight:800; color:#1E150F;">
              Pehchan Identification Number
            </span>
          </div>
          <span id="pehchan-verified-tag" style="display:none; font-size:0.68rem; font-weight:800; background:#DCFCE7; color:#166534; padding:2px 8px; border-radius:10px; border:1px solid #86EFAC;">
            ✓ OCR VERIFIED
          </span>
        </div>

        <div id="field-box-pehchan" style="background:#FAF8F5; border:1.5px solid #D6C7B2; border-radius:10px; padding:8px 12px; display:flex; align-items:center; gap:10px; transition:border-color 0.2s;">
          <!-- Fingerprint Icon -->
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4"/><path d="M14 13.12c0 2.38 0 6.38-1 8.88"/><path d="M17.29 21.02c.12-.6.43-2.3.5-3.02"/><path d="M2 12a10 10 0 0 1 18-6"/><path d="M2 16h.01"/><path d="M21.8 16c.2-2 .131-5.354 0-6"/><path d="M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2"/><path d="M8.65 22c.21-.66.45-1.32.57-2"/><path d="M9 6.8a6 6 0 0 1 9 5.2v2"/></svg>
          <input type="text" id="input-pehchan-id" value="UP-VAR-49281-H" placeholder="Enter 14-Digit Pehchan ID (e.g. UP-VAR-49281-H)" style="flex:1; border:none; background:transparent; outline:none; font-size:1.02rem; font-weight:800; color:#1E150F; letter-spacing:0.04em; text-transform:uppercase;">
          <button type="button" id="btn-manual-verify-id" style="background:#7A2813; color:#FFFFFF; border:none; border-radius:6px; padding:6px 12px; font-size:0.75rem; font-weight:800; cursor:pointer; white-space:nowrap;">
            Verify
          </button>
        </div>
        <div id="artisan-detected-meta" style="font-size:0.75rem; color:#166534; margin-top:8px; font-weight:600;">
          Verified Artisan: <strong>Ramdev Kumhar</strong> • Varanasi Clay Cluster, UP
        </div>
      </div>

      <!-- Action Buttons -->
      <button type="button" id="btn-verify-pehchan" style="width:100%; background:#7A2813; color:#FFFFFF; border:none; border-radius:8px; padding:14px; font-size:0.95rem; font-weight:800; display:flex; align-items:center; justify-content:center; gap:8px; cursor:pointer; box-shadow:0 4px 12px rgba(122, 40, 19, 0.25); margin-bottom:10px; transition:transform 0.15s ease;">
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
        <div style="font-size:0.85rem; font-weight:800; color:#7A2813; margin-bottom:6px; display:flex; align-items:center; justify-content:center; gap:6px; cursor:pointer;" onclick="window.openCscLocatorModal?.()">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
          <span>Apply at Nearest CSC Centre</span>
          <span style="color:#A19790;">•</span>
        </div>
        <div style="font-size:0.85rem; font-weight:800; color:#1C3550; display:flex; align-items:center; justify-content:center; gap:6px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          <span>Call Customer care XXXXXXXXXX</span>
        </div>
      </div>

    </div>
  `;

  // DOM Elements
  const video = container.querySelector('#camera-live-video');
  const snapshotImg = container.querySelector('#camera-snapshot-img');
  const canvas = container.querySelector('#camera-capture-canvas');
  const nativeFileInput = container.querySelector('#camera-native-file-input');
  const fallbackCard = container.querySelector('#camera-fallback-card');
  const statusPill = container.querySelector('#camera-status-pill');
  const laserLine = container.querySelector('#scanner-laser-line');
  const placeholderInfo = container.querySelector('#card-placeholder-info');
  const captureBtn = container.querySelector('#btn-capture-photo');
  const captureBtnLabel = container.querySelector('#capture-btn-label');
  const flashBtn = container.querySelector('#btn-toggle-flash');
  const flashIcon = container.querySelector('#flash-icon');
  const screenTorchOverlay = container.querySelector('#screen-torch-overlay');
  const shutterFlash = container.querySelector('#camera-shutter-flash');
  const torchBadge = container.querySelector('#torch-indicator-badge');
  const pehchanIdBox = container.querySelector('#card-pehchan-id-box');
  const pehchanVerifiedTag = container.querySelector('#pehchan-verified-tag');
  const artisanMeta = container.querySelector('#artisan-detected-meta');
  const verifyBtn = container.querySelector('#btn-verify-pehchan');

  // Start real camera stream
  async function startCamera() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      showFallbackCard("Camera not directly accessible over this connection.");
      return;
    }

    try {
      // Prefer rear environment camera on mobile for card scanning
      const constraints = {
        video: {
          facingMode: { ideal: 'environment' },
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      };

      activeStream = await navigator.mediaDevices.getUserMedia(constraints);
      if (video) {
        video.srcObject = activeStream;
        video.onloadedmetadata = () => {
          video.play().catch(e => console.warn('Video playback warning:', e));
          statusPill.innerHTML = `
            <span style="width:6px; height:6px; border-radius:50%; background:#22C55E; display:inline-block; animation:pulseDot 1.2s infinite;"></span>
            LIVE CAMERA
          `;
          fallbackCard.style.display = 'none';
        };
      }
    } catch (err) {
      console.warn('Primary camera request failed, trying simple video constraint:', err);
      try {
        activeStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        if (video) {
          video.srcObject = activeStream;
          video.play().catch(e => console.warn(e));
          fallbackCard.style.display = 'none';
        }
      } catch (err2) {
        console.warn('Camera access denied or unavailable:', err2);
        showFallbackCard();
      }
    }
  }

  function showFallbackCard(msg) {
    if (fallbackCard) {
      fallbackCard.style.display = 'flex';
      if (msg) {
        const textElem = fallbackCard.querySelector('div:nth-child(3)');
        if (textElem) textElem.textContent = msg + " Tap below to snap photo directly with mobile camera.";
      }
    }
    if (statusPill) {
      statusPill.style.background = '#FEF3C7';
      statusPill.style.color = '#B45309';
      statusPill.style.borderColor = '#FDE68A';
      statusPill.innerHTML = `
        <span style="width:6px; height:6px; border-radius:50%; background:#F59E0B; display:inline-block;"></span>
        CAMERA READY
      `;
    }
  }

  // Request Camera permission or open mobile camera app
  container.querySelector('#btn-request-cam-perm')?.addEventListener('click', () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      startCamera();
    } else {
      nativeFileInput?.click();
    }
  });

  // Handle Mobile Torch / Flash Toggle
  async function toggleFlash() {
    isFlashOn = !isFlashOn;
    let hardwareTorchWorked = false;

    if (activeStream) {
      const track = activeStream.getVideoTracks()[0];
      if (track) {
        try {
          const capabilities = track.getCapabilities ? track.getCapabilities() : {};
          if ('torch' in capabilities || capabilities.torch) {
            await track.applyConstraints({
              advanced: [{ torch: isFlashOn }]
            });
            hardwareTorchWorked = true;
          } else {
            // Some Android Chrome versions allow setting constraint directly
            await track.applyConstraints({
              advanced: [{ torch: isFlashOn }]
            });
            hardwareTorchWorked = true;
          }
        } catch (err) {
          console.warn('Hardware torch error, using screen illumination:', err);
        }
      }
    }

    // Update Flash Button UI
    if (isFlashOn) {
      flashBtn.style.background = '#FEF08A';
      flashBtn.style.border = '1.5px solid #F59E0B';
      flashBtn.style.boxShadow = '0 0 14px rgba(245, 158, 11, 0.7)';
      flashIcon.setAttribute('fill', '#F59E0B');
      flashIcon.setAttribute('stroke', '#B45309');
      screenTorchOverlay.style.display = 'block';
      torchBadge.style.display = 'inline-block';
      window.showToast?.(hardwareTorchWorked ? "🔦 Mobile Torch / Flash: ON" : "💡 Screen Flash / Light: ON");
    } else {
      flashBtn.style.background = '#EDE8E1';
      flashBtn.style.border = 'none';
      flashBtn.style.boxShadow = 'none';
      flashIcon.setAttribute('fill', 'none');
      flashIcon.setAttribute('stroke', '#2B241F');
      screenTorchOverlay.style.display = 'none';
      torchBadge.style.display = 'none';
      window.showToast?.("Flash / Torch: OFF");
    }
  }

  flashBtn?.addEventListener('click', toggleFlash);

  // Capture Card Photo Action
  function capturePhoto() {
    if (isCaptured) {
      // Retake action: unfreeze camera
      isCaptured = false;
      snapshotImg.style.display = 'none';
      laserLine.style.display = 'block';
      if (placeholderInfo) placeholderInfo.style.display = 'block';
      captureBtnLabel.textContent = "Capture Card Photo";
      captureBtn.style.background = "#1C3550";
      statusPill.innerHTML = `
        <span style="width:6px; height:6px; border-radius:50%; background:#22C55E; display:inline-block; animation:pulseDot 1.2s infinite;"></span>
        LIVE CAMERA
      `;
      window.showToast?.("Camera reset. Align your Pehchan Card.");
      return;
    }

    // Play tactile feedback
    playShutterSound();
    if (navigator.vibrate) {
      navigator.vibrate([40, 30, 40]);
    }

    // Shutter flash effect
    shutterFlash.style.display = 'block';
    shutterFlash.style.opacity = '0.9';
    setTimeout(() => {
      shutterFlash.style.opacity = '0';
      setTimeout(() => { shutterFlash.style.display = 'none'; }, 200);
    }, 70);

    // If live video is streaming, render frame onto canvas
    if (activeStream && video && video.videoWidth > 0) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const photoUrl = canvas.toDataURL('image/jpeg', 0.92);

      snapshotImg.src = photoUrl;
      snapshotImg.style.display = 'block';
      laserLine.style.display = 'none';
      if (placeholderInfo) placeholderInfo.style.display = 'none';

      finalizeCapture();
    } else {
      // In case video stream isn't active, open device camera directly
      nativeFileInput?.click();
    }
  }

  // Handle native file input fallback (when user snaps photo via device camera app)
  nativeFileInput?.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        snapshotImg.src = event.target.result;
        snapshotImg.style.display = 'block';
        laserLine.style.display = 'none';
        if (placeholderInfo) placeholderInfo.style.display = 'none';
        fallbackCard.style.display = 'none';
        finalizeCapture();
      };
      reader.readAsDataURL(file);
    }
  });

  function finalizeCapture() {
    isCaptured = true;
    captureBtnLabel.textContent = "🔄 Retake Card Photo";
    captureBtn.style.background = "#2D3748";
    statusPill.innerHTML = `
      <span style="color:#15803D; font-weight:800;">✓ PHOTO CAPTURED</span>
    `;

    window.showToast?.("📸 Card Captured! Analyzing Pehchan details...");

    setTimeout(() => {
      // OCR Success state
      pehchanIdBox.style.border = '1.5px solid #22C55E';
      pehchanIdBox.style.background = '#F0FDF4';
      pehchanVerifiedTag.style.display = 'inline-block';
      artisanMeta.style.display = 'block';

      verifyBtn.style.background = '#1E6B47';
      verifyBtn.style.boxShadow = '0 4px 16px rgba(30,107,71,0.35)';
      verifyBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        <span>Card Verified • Proceed to Bank Setup →</span>
      `;

      window.showToast?.("✓ OCR Verified: UP-VAR-49281-H • Ramdev Kumhar");
    }, 450);
  }

  captureBtn?.addEventListener('click', capturePhoto);

  // Manual Pehchan ID verification handlers
  const pehchanInput = container.querySelector('#input-pehchan-id');
  const manualVerifyBtn = container.querySelector('#btn-manual-verify-id');
  const fieldBoxPehchan = container.querySelector('#field-box-pehchan');

  function performManualVerify() {
    const val = pehchanInput?.value.trim().toUpperCase() || '';
    if (!val || val.length < 6) {
      window.showToast?.("⚠️ Please enter a valid Pehchan Number or Card ID.");
      pehchanInput?.focus();
      return;
    }

    if (fieldBoxPehchan) fieldBoxPehchan.style.borderColor = '#15803D';
    if (pehchanVerifiedTag) {
      pehchanVerifiedTag.textContent = '✓ MANUALLY VERIFIED';
      pehchanVerifiedTag.style.display = 'inline-block';
    }
    if (artisanMeta) {
      artisanMeta.style.display = 'block';
    }
    if (verifyBtn) {
      verifyBtn.style.background = '#1E6B47';
      verifyBtn.style.boxShadow = '0 4px 16px rgba(30,107,71,0.35)';
      verifyBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        <span>Pehchan Verified • Proceed to Bank Setup →</span>
      `;
    }

    if (window.State?.artisan) {
      window.State.artisan.pehchanId = val;
    }
    window.showToast?.(`✓ Pehchan ID Verified: ${val} (Ramdev Kumhar)`);
  }

  pehchanInput?.addEventListener('input', (e) => {
    e.target.value = e.target.value.toUpperCase();
  });

  pehchanInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      performManualVerify();
    }
  });

  manualVerifyBtn?.addEventListener('click', performManualVerify);

  // Verification button
  verifyBtn?.addEventListener('click', () => {
    const enteredId = pehchanInput?.value.trim().toUpperCase() || 'UP-VAR-49281-H';
    if (window.State?.artisan) {
      window.State.artisan.pehchanId = enteredId;
    }
    cleanupCamera();
    window.navigateToScreen('bank');
  });

  // Skip button
  container.querySelector('#btn-skip-bank')?.addEventListener('click', () => {
    cleanupCamera();
    window.navigateToScreen('studio');
  });

  // Start camera on mount
  startCamera();
}
