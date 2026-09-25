/**
 * Splash & Launch Landing Screen: KalaVerse
 * Pixel-perfect recreation of User Uploaded Reference Screenshot
 * Features the signature KalaVerse artisan emblem, branding, progress bar,
 * pulsing dots, and Hindi loading subtext.
 */

import { State } from '../state.js';

export function renderSplashScreen(container) {
  // Hide top header and bottom nav while on splash screen for full immersion
  const header = document.getElementById('app-header');
  const roleBar = document.getElementById('role-mode-bar');
  const bottomNav = document.getElementById('bottom-navigation');
  
  if (header) header.style.display = 'none';
  if (roleBar) roleBar.style.display = 'none';
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
    ">
      
      <!-- Center Brand Group -->
      <div style="display:flex; flex-direction:column; align-items:center; max-width:320px; width:100%;">
        
        <!-- KalaVerse Circular Emblem SVG -->
        <div class="kala-emblem-wrap" style="
          width: 140px;
          height: 140px;
          margin-bottom: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        ">
          <svg viewBox="0 0 160 160" width="140" height="140" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- Outer Gold / Terracotta Ring with Stitched Detailing -->
            <circle cx="80" cy="80" r="74" stroke="#D97706" stroke-width="2.5" />
            <circle cx="80" cy="80" r="67" stroke="#D97706" stroke-width="1.2" stroke-dasharray="4 4" stroke-opacity="0.85" />
            
            <!-- Cardinal Petal / Wheel Markers -->
            <path d="M80 6 C76 14, 84 14, 80 6 Z" fill="#D97706" />
            <path d="M80 154 C76 146, 84 146, 80 154 Z" fill="#D97706" />
            <path d="M6 80 C14 76, 14 84, 6 80 Z" fill="#D97706" />
            <path d="M154 80 C146 76, 146 84, 154 80 Z" fill="#D97706" />

            <!-- Inner Traditional Arch Motifs -->
            <path d="M50 34 C64 26, 96 26, 110 34" stroke="#D97706" stroke-width="1.2" stroke-linecap="round" stroke-opacity="0.7" />
            <path d="M50 126 C64 134, 96 134, 110 126" stroke="#D97706" stroke-width="1.2" stroke-linecap="round" stroke-opacity="0.7" />
            
            <!-- Interlocking Indigo & Terracotta Lines (Artisan Craft Loom & Urn ligature) -->
            <!-- Indigo Loom / Urn Loop -->
            <path d="M80 50 V105 C80 114 74 120 65 120 C54 120 48 110 48 98 C48 76 72 65 80 65 C88 65 112 76 112 98 C112 110 106 120 95 120" 
                  stroke="#1E3A5F" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
            
            <!-- Terracotta Flowing Ribbon Loop -->
            <path d="M68 62 C58 70 54 82 58 98 C64 116 80 118 84 102 C88 86 78 72 70 85 C64 94 65 106 74 114 C82 120 92 118 96 108 C102 92 84 76 80 50" 
                  stroke="#9A3412" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />

            <!-- Center Accent Dot -->
            <circle cx="80" cy="54" r="2.5" fill="#D97706" />
          </svg>
        </div>

        <!-- Brand Title: KalaVerse -->
        <h1 style="
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
          font-size: 2.25rem;
          font-weight: 800;
          color: #1C3550;
          margin: 0 0 6px 0;
          letter-spacing: -0.02em;
        ">KalaVerse</h1>

        <!-- Subtitle: ARTISAN HANDMADE PLATFORM -->
        <div style="
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.72rem;
          font-weight: 700;
          color: #5A6B82;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          margin-bottom: 28px;
        ">ARTISAN HANDMADE PLATFORM</div>

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

        <!-- Loading Subtext: लोड हो रहा है... (Loading handmade treasures) -->
        <p style="
          font-size: 0.88rem;
          color: #4B3629;
          font-weight: 500;
          margin: 0 0 24px 0;
          line-height: 1.4;
        ">लोड हो रहा है... (Loading handmade treasures)</p>

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

  // Restore header and bottom navigation when leaving splash screen
  function exitSplashScreen(targetScreen = 'welcome') {
    if (header) header.style.display = 'flex';
    if (roleBar) roleBar.style.display = 'flex';
    if (bottomNav) bottomNav.style.display = 'flex';
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
          exitSplashScreen('welcome');
        }
      }, 500);
    }
  }, 250);

  // Instant Enter Button Click Handler
  container.querySelector('#btn-enter-platform')?.addEventListener('click', () => {
    clearInterval(progressInterval);
    exitSplashScreen('welcome');
  });

  // Tap anywhere on splash to skip immediately
  container.querySelector('.splash-screen')?.addEventListener('click', (e) => {
    if (e.target.tagName !== 'BUTTON' && !e.target.closest('button')) {
      clearInterval(progressInterval);
      exitSplashScreen('welcome');
    }
  });
}
