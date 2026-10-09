/**
 * Splash & Launch Landing Screen: Native Loom
 * Features the signature artisan emblem, branding, progress bar,
 * pulsing dots, and Hindi loading subtext.
 */

import { State } from '../state.js';
import { AudioAssistance } from '../speech.js';

export function renderSplashScreen(container) {
  // Hide top header and bottom nav while on splash screen for full immersion
  const header = document.getElementById('app-header');
  const bottomNav = document.getElementById('bottom-navigation');

  if (header) header.style.display = 'none';
  if (bottomNav) bottomNav.style.display = 'none';

  container.innerHTML = `
    <div class="splash-screen animate-fade-in" style="
      min-height: 92vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 32px 20px;
      background: #FAF7F2;
      user-select: none;
      position: relative;
    ">

      <!-- Top Right: Voice Guide ON/OFF Toggle -->
      <div style="position: absolute; top: 16px; right: 16px; z-index: 50;">
        <button type="button" class="voice-guide-toggle-btn ${AudioAssistance.isEnabled ? 'vg-on' : 'vg-off'}" id="splash-voice-guide-btn" title="Toggle Voice Guide ON / OFF" style="height:28px;">
          <span class="vg-icon" style="display:inline-flex; align-items:center;">
            ${AudioAssistance.isEnabled
              ? `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>`
              : `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><line x1="1" y1="1" x2="23" y2="23"/><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 1.7 4.54"/><path d="M19.07 4.93a10 10 0 0 1 .82 12.06"/></svg>`
            }
          </span>
          <span class="vg-label" style="color:#7A2813;">${AudioAssistance.isEnabled ? 'Voice: ON' : 'Voice: OFF'}</span>
        </button>
      </div>

      <!-- Center Brand Group -->
      <div style="display:flex; flex-direction:column; align-items:center; max-width:320px; width:100%;">

        <!-- Artisan Emblem -->
        <div class="kala-emblem-wrap" style="
          width: 140px;
          height: 140px;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        ">
          <div style="
            width: 120px;
            height: 120px;
            border-radius: 50%;
            background: #FFFFFF;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 8px 24px rgba(122, 40, 19, 0.25);
            border: 3px solid #FCD7C2;
            overflow: hidden;
          ">
            <img src="assets/native_loom_logo.png" alt="Native Loom" style="width:100%; height:100%; object-fit:contain;">
          </div>
        </div>

        <!-- Brand Title: Native Loom -->
        <h1 style="
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
          font-size: 1.85rem;
          font-weight: 800;
          color: #1C3550;
          margin: 0 0 4px 0;
          letter-spacing: -0.02em;
          text-align: center;
        ">Native Loom</h1>
        <!-- Subtitle: NATIONAL INDIGENOUS ARTISAN PLATFORM -->
        <div style="
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.68rem;
          font-weight: 700;
          color: #5A6B82;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          margin-bottom: 28px;
          text-align: center;
        ">NATIONAL INDIGENOUS ARTISAN PLATFORM</div>

        <!-- Progress Loading Bar (130px, brown fill on left, beige track) -->
        <div style="
          width: 130px;
          height: 3px;
          background: #E5DAC8;
          border-radius: 9999px;
          overflow: hidden;
          margin-bottom: 14px;
        ">
          <div id="splash-progress-fill" style="
            width: 40%;
            height: 100%;
            background: #7A2813;
            border-radius: 9999px;
            transition: width 0.3s ease;
          "></div>
        </div>

        <!-- 3 Bouncing / Pulsing Dots -->
        <div style="display:flex; justify-content:center; align-items:center; gap:6px; margin-bottom:18px;">
          <span class="splash-dot" style="width:6px; height:6px; background:#7A2813; border-radius:50%; display:inline-block; animation: splashPulse 1.2s infinite ease-in-out;"></span>
          <span class="splash-dot" style="width:6px; height:6px; background:#7A2813; border-radius:50%; display:inline-block; animation: splashPulse 1.2s infinite ease-in-out 0.2s;"></span>
          <span class="splash-dot" style="width:6px; height:6px; background:#7A2813; border-radius:50%; display:inline-block; animation: splashPulse 1.2s infinite ease-in-out 0.4s;"></span>
        </div>

        <!-- Loading Subtext: Loading handmade treasures... -->
        <p style="
          font-size: 0.88rem;
          color: #4B3629;
          font-weight: 500;
          margin: 0 0 24px 0;
          line-height: 1.4;
        ">Loading handmade treasures...</p>

        <!-- Tap to Continue / Skip Button -->
        <button type="button" id="btn-enter-platform" style="
          background: #7A2813;
          color: #FFFFFF;
          border: none;
          border-radius: var(--radius-pill);
          padding: 10px 22px;
          font-size: 0.8rem;
          font-weight: 700;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          box-shadow: 0 2px 8px rgba(122, 40, 19, 0.25);
          transition: transform 0.15s ease;
        ">
          <span>Enter Platform</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </button>

      </div>
    </div>

    <!-- Inline CSS for Dot Pulsing Animation -->
    <style>
      @keyframes splashPulse {
        0%, 100% {
          transform: scale(0.7);
          opacity: 0.4;
        }
        50% {
          transform: scale(1.3);
          opacity: 1;
        }
      }
    </style>
  `;

  // Restore header when leaving splash screen
  function exitSplashScreen(targetScreen = 'account_select') {
    if (header) header.style.display = 'flex';
    State.setScreen(targetScreen);
  }

  // Animate Progress Bar
  const progressFill = container.querySelector('#splash-progress-fill');
  let pct = 40;
  const progressInterval = setInterval(() => {
    pct += 15;
    if (progressFill) progressFill.style.width = pct + '%';
    if (pct >= 100) {
      clearInterval(progressInterval);
      // Auto transition after loading finishes (1.8s)
      setTimeout(() => {
        if (State.currentScreen === 'splash') {
          exitSplashScreen('account_select');
        }
      }, 500);
    }
  }, 250);

  // Instant Enter Button Click Handler
  container.querySelector('#btn-enter-platform')?.addEventListener('click', () => {
    clearInterval(progressInterval);
    exitSplashScreen('account_select');
  });

  // Voice Guide ON/OFF toggle on Splash Screen
  container.querySelector('#splash-voice-guide-btn')?.addEventListener('click', (e) => {
    e.stopPropagation();
    AudioAssistance.toggle();
  });

  // Tap anywhere on splash to skip immediately
  container.querySelector('.splash-screen')?.addEventListener('click', (e) => {
    if (e.target.tagName !== 'BUTTON' && !e.target.closest('button')) {
      clearInterval(progressInterval);
      exitSplashScreen('account_select');
    }
  });
}
