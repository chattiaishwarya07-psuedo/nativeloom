/**
 * Pre-Authentication Screen: Account Type Selection
 * Clean, focused layout with:
 * 1. Impacts & Metrics: Button Only
 * 2. Platform Demo Video: Interactive 1-minute video walkthrough
 * 3. Logins: Primary role buttons (Artisan / Buyer / Corporate)
 * 4. Account Recovery: Help footer
 * Fully internationalized in 10 regional Indian languages with native typography.
 */

import { State, AccountType } from '../state.js';
import { AudioAssistance } from '../speech.js';
import { i18n } from '../i18n.js';

export function renderAccountSelectScreen(container) {
  const t = i18n.t.bind(i18n);
  const meta = i18n.metadata;

  container.innerHTML = `
    <div class="account-select-screen animate-fade-in" style="padding: 18px 14px 32px; background: #FAF7F2; min-height: 100vh; max-width: 480px; margin: 0 auto; box-sizing: border-box;">

      <!-- Impacts & Metrics: Button Only -->
      <div style="margin-bottom: 16px;">
        <button type="button" id="btn-impacts-metrics" onclick="window.navigateToScreen('about_impact')" style="width: 100%; background: #FAF2EB; border: 1.5px solid #EADBCE; border-radius: 12px; padding: 13px 18px; font-size: 0.86rem; font-weight: 800; color: #7A2813; display: flex; align-items: center; justify-content: space-between; cursor: pointer; box-shadow: 0 1px 4px rgba(0,0,0,0.03); transition: all 0.2s ease;">
          <span style="display: flex; align-items: center; gap: 8px;">
            <span>📊</span>
            <span>View Impacts &amp; Metrics</span>
          </span>
          <span style="font-weight: 900; font-size: 1rem;">→</span>
        </button>
      </div>

      <!-- Screen Title & Guidance -->
      <div style="margin-bottom: 16px;">
        <h1 style="font-size: 1.35rem; font-weight: 900; color: var(--text-primary); margin: 0 0 4px 0; line-height: 1.25;">
          ${t('selectAccountTitle', 'Select Account Type')}
        </h1>
        <p style="font-size: 0.76rem; color: var(--text-secondary); margin: 0; line-height: 1.4;">
          ${t('selectAccountSub', 'Three independent, non-overlapping systems for Artisans, Patrons, and Institutional Buyers.')}
        </p>
      </div>

      <!-- PLATFORM DEMO VIDEO CARD -->
      <div class="demo-video-card" style="background: #FFFFFF; border: 1px solid #EADBCE; border-radius: 14px; padding: 12px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="background: #FAF2EB; color: #7A2813; font-size: 0.68rem; font-weight: 800; padding: 2px 8px; border-radius: 6px; display: inline-flex; align-items: center; gap: 4px;">
              <span>🎬</span> PLATFORM DEMO
            </span>
            <span style="font-size: 0.72rem; font-weight: 700; color: var(--text-secondary);">01:15 Walkthrough</span>
          </div>
          <button type="button" id="btn-expand-demo-modal" style="background: none; border: none; color: #7A2813; font-size: 0.72rem; font-weight: 800; cursor: pointer; display: flex; align-items: center; gap: 3px; padding: 2px 4px;">
            <span>Watch Full</span> ↗
          </button>
        </div>

        <!-- Video Player Wrapper -->
        <div id="video-wrapper" style="position: relative; width: 100%; aspect-ratio: 16/9; background: #1C1512; border-radius: 10px; overflow: hidden; box-shadow: inset 0 0 12px rgba(0,0,0,0.5);">

          <!-- Native Video Element with Fallback Sources -->
          <video id="demo-video-player" playsinline style="width: 100%; height: 100%; object-fit: cover; display: block;" poster="assets/spoken_guide_demo.png">
            <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" type="video/mp4">
            <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4">
          </video>

          <!-- Animated Craft Canvas Simulation Fallback (Ensures offline/error-free video experience) -->
          <canvas id="demo-fallback-canvas" style="position: absolute; inset: 0; width: 100%; height: 100%; display: none; object-fit: cover; pointer-events: none;"></canvas>

          <!-- Top Overlay: Current Chapter Badge -->
          <div id="demo-chapter-badge" style="position: absolute; top: 8px; left: 8px; background: rgba(0,0,0,0.65); backdrop-filter: blur(4px); color: #FFFFFF; font-size: 0.65rem; font-weight: 800; padding: 3px 8px; border-radius: 6px; pointer-events: none; display: flex; align-items: center; gap: 4px;">
            <span>🏺</span> <span id="demo-chapter-text">1. Artisan Studio & Voice AI</span>
          </div>

          <!-- Big Center Play Button Overlay -->
          <div id="demo-big-play-btn" style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: rgba(28,21,18,0.35); cursor: pointer; transition: all 0.2s ease;">
            <div style="width: 52px; height: 52px; border-radius: 50%; background: #7A2813; color: #FFFFFF; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 18px rgba(122,40,19,0.6); border: 2px solid rgba(255,255,255,0.8); transform: scale(1); transition: transform 0.15s ease;">
              <span id="big-play-icon" style="font-size: 20px; margin-left: 3px;">▶</span>
            </div>
          </div>

          <!-- Custom Bottom Controls Bar -->
          <div id="demo-controls-bar" style="position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(transparent, rgba(10,8,7,0.85)); padding: 6px 10px; display: flex; flex-direction: column; gap: 4px; z-index: 5;">

            <!-- Timeline Track -->
            <div id="demo-progress-track" style="width: 100%; height: 4px; background: rgba(255,255,255,0.3); border-radius: 2px; cursor: pointer; position: relative;">
              <div id="demo-progress-fill" style="width: 0%; height: 100%; background: #E27244; border-radius: 2px; position: relative;">
                <div style="position: absolute; right: -4px; top: -3px; width: 10px; height: 10px; border-radius: 50%; background: #FFFFFF; box-shadow: 0 1px 3px rgba(0,0,0,0.5);"></div>
              </div>
            </div>

            <!-- Controls row -->
            <div style="display: flex; justify-content: space-between; align-items: center; color: #FFFFFF; font-size: 0.68rem;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <button type="button" id="demo-play-toggle" style="background: none; border: none; color: #FFFFFF; cursor: pointer; font-size: 0.75rem; padding: 2px; display: flex; align-items: center;">
                  <span id="play-pause-icon">▶</span>
                </button>
                <span id="demo-time-display" style="font-family: monospace; font-size: 0.68rem; opacity: 0.9;">00:00 / 01:15</span>
              </div>

              <div style="display: flex; align-items: center; gap: 8px;">
                <button type="button" id="demo-mute-toggle" style="background: none; border: none; color: #FFFFFF; cursor: pointer; font-size: 0.75rem; padding: 2px;" title="Mute/Unmute">
                  <span id="mute-icon">🔊</span>
                </button>
                <button type="button" id="demo-fs-btn" style="background: none; border: none; color: #FFFFFF; cursor: pointer; font-size: 0.75rem; padding: 2px;" title="Watch in Modal">
                  ⛶
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Chapter Markers -->
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px; margin-top: 10px;">
          <button type="button" class="btn-chapter-jump active" data-time="0" data-label="1. Artisan Studio & Voice AI" style="background: #FAF2EB; border: 1px solid #EADBCE; border-radius: 8px; padding: 6px 4px; font-size: 0.65rem; font-weight: 800; color: #7A2813; cursor: pointer; text-align: center; line-height: 1.2;">
            <div>🏺 Studio</div>
            <div style="font-size: 0.58rem; opacity: 0.8; font-weight: 600;">0:00</div>
          </button>
          <button type="button" class="btn-chapter-jump" data-time="25" data-label="2. Direct Patron Discovery & GI" style="background: #FAF7F2; border: 1px solid #EAE3D9; border-radius: 8px; padding: 6px 4px; font-size: 0.65rem; font-weight: 700; color: var(--text-secondary); cursor: pointer; text-align: center; line-height: 1.2;">
            <div>🛍️ Patron</div>
            <div style="font-size: 0.58rem; opacity: 0.8; font-weight: 600;">0:25</div>
          </button>
          <button type="button" class="btn-chapter-jump" data-time="50" data-label="3. B2B Wholesale Cluster Portal" style="background: #FAF7F2; border: 1px solid #EAE3D9; border-radius: 8px; padding: 6px 4px; font-size: 0.65rem; font-weight: 700; color: var(--text-secondary); cursor: pointer; text-align: center; line-height: 1.2;">
            <div>🏢 Wholesale</div>
            <div style="font-size: 0.58rem; opacity: 0.8; font-weight: 600;">0:50</div>
          </button>
        </div>
      </div>

      <!-- Logins: Only Buttons -->
      <div style="display: flex; flex-direction: column; gap: 14px; margin-bottom: 24px;">

        <!-- Button 1: Artisan / Maker -->
        <button type="button" class="btn-primary" onclick="window.navigateToScreen('artisan_auth')" style="width: 100%; background: #7A2813; color: #FFFFFF; border: none; padding: 15px 18px; font-size: 0.92rem; font-weight: 800; border-radius: 12px; display: flex; align-items: center; justify-content: center; gap: 8px; cursor: pointer; box-shadow: 0 4px 14px rgba(122, 40, 19, 0.25); transition: all 0.15s ease;">
          <span>${t('artisanCardBtn', 'Continue as Artisan / Maker →')}</span>
        </button>

        <!-- Button 2: Buyer / Patron -->
        <button type="button" class="btn-primary" onclick="window.navigateToScreen('buyer_auth')" style="width: 100%; background: #1C3550; color: #FFFFFF; border: none; padding: 15px 18px; font-size: 0.92rem; font-weight: 800; border-radius: 12px; display: flex; align-items: center; justify-content: center; gap: 8px; cursor: pointer; box-shadow: 0 4px 14px rgba(28, 53, 80, 0.25); transition: all 0.15s ease;">
          <span>${t('buyerCardBtn', 'Shop as Buyer / Patron →')}</span>
        </button>

        <!-- Button 3: Corporate / Bulk Buyer -->
        <button type="button" class="btn-primary" onclick="window.navigateToScreen('corporate_auth')" style="width: 100%; background: #0F172A; color: #FFFFFF; border: none; padding: 15px 18px; font-size: 0.92rem; font-weight: 800; border-radius: 12px; display: flex; align-items: center; justify-content: center; gap: 8px; cursor: pointer; box-shadow: 0 4px 14px rgba(15, 23, 42, 0.25); transition: all 0.15s ease;">
          <span>${t('corporateCardBtn', 'Access Wholesale B2B Portal →')}</span>
        </button>

      </div>

      <!-- Account Recovery Footer -->
      <div style="background: #FFFFFF; border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 12px 14px; display: flex; align-items: center; justify-content: space-between; box-shadow: var(--shadow-sm);">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 1.1rem;">🔄</span>
          <div>
            <div style="font-size: 0.78rem; font-weight: 800; color: var(--text-primary);">${t('recoveryPrompt', 'Trouble Logging In?')}</div>
            <div style="font-size: 0.68rem; color: var(--text-secondary);">${t('recoveryBtn', 'Recovery by account type, voice OTP & CSC helpline')}</div>
          </div>
        </div>
        <button type="button" class="btn-secondary" onclick="window.navigateToScreen('account_recovery')" style="font-size: 0.72rem; font-weight: 800; padding: 6px 10px; border-radius: var(--radius-pill); cursor: pointer;">
          ${t('verify', 'Recover')}
        </button>
      </div>

      <!-- Fullscreen Walkthrough Modal -->
      <div id="modal-demo-walkthrough" class="modal-overlay" style="display: none; align-items: center; justify-content: center; padding: 16px;">
        <div style="background: #FFFFFF; border-radius: 16px; max-width: 440px; width: 100%; overflow: hidden; box-shadow: 0 16px 40px rgba(0,0,0,0.3); border: 1px solid var(--border-subtle);">
          <div style="padding: 14px 16px; background: #7A2813; color: #FFFFFF; display: flex; justify-content: space-between; align-items: center;">
            <div style="font-weight: 800; font-size: 0.95rem; display: flex; align-items: center; gap: 6px;">
              <span>🎬</span> Native Loom Walkthrough
            </div>
            <button type="button" id="btn-close-demo-modal" style="background: none; border: none; color: #FFFFFF; font-size: 1.2rem; cursor: pointer; padding: 2px 6px;">✕</button>
          </div>
          <div style="padding: 16px;">
            <div style="aspect-ratio: 16/9; background: #000000; border-radius: 10px; overflow: hidden; margin-bottom: 12px; position: relative;">
              <video id="modal-video-player" playsinline controls style="width: 100%; height: 100%; object-fit: cover;" poster="assets/spoken_guide_demo.png">
                <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" type="video/mp4">
              </video>
            </div>
            <div style="font-size: 0.82rem; font-weight: 800; color: var(--text-primary); margin-bottom: 6px;">
              Empowering India's Heritage Crafts:
            </div>
            <ul style="margin: 0 0 14px 0; padding-left: 20px; font-size: 0.75rem; color: var(--text-secondary); line-height: 1.5;">
              <li><strong>Artisan Studio:</strong> Voice listing in 22 regional dialects, fair pricing calculators & instant settlements.</li>
              <li><strong>Patron Market:</strong> Direct craft purchases with GI tags & artisan provenance authentication.</li>
              <li><strong>Wholesale B2B:</strong> Institutional bulk orders, milestone escrow, and GST invoicing.</li>
            </ul>
            <button type="button" class="btn-primary" id="btn-modal-start-artisan" style="width: 100%; background: #7A2813; color: #FFFFFF; border: none; padding: 12px; border-radius: 10px; font-weight: 800; font-size: 0.85rem; cursor: pointer;">
              Explore as Artisan / Maker →
            </button>
          </div>
        </div>
      </div>

    </div>
  `;

  // WIRE UP INTERACTIVE VIDEO PLAYER
  if (!container?.querySelector) return;

  const video = container.querySelector('#demo-video-player');
  const canvas = container.querySelector('#demo-fallback-canvas');
  const bigPlayBtn = container.querySelector('#demo-big-play-btn');
  const playToggle = container.querySelector('#demo-play-toggle');
  const playPauseIcon = container.querySelector('#play-pause-icon');
  const muteToggle = container.querySelector('#demo-mute-toggle');
  const muteIcon = container.querySelector('#mute-icon');
  const progressFill = container.querySelector('#demo-progress-fill');
  const progressTrack = container.querySelector('#demo-progress-track');
  const timeDisplay = container.querySelector('#demo-time-display');
  const chapterBadge = container.querySelector('#demo-chapter-text');
  const chapterBtns = container.querySelectorAll('.btn-chapter-jump');
  const fsBtn = container.querySelector('#demo-fs-btn');
  const expandModalBtn = container.querySelector('#btn-expand-demo-modal');
  const modal = container.querySelector('#modal-demo-walkthrough');
  const closeModalBtn = container.querySelector('#btn-close-demo-modal');
  const modalVideo = container.querySelector('#modal-video-player');
  const modalArtisanBtn = container.querySelector('#btn-modal-start-artisan');

  let simulatedTime = 0;
  let simulatedDuration = 75; // 01:15
  let isSimulating = false;
  let simInterval = null;

  function formatTime(secs) {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  }

  function updateProgress(curr, total) {
    const pct = total > 0 ? (curr / total) * 100 : 0;
    if (progressFill) progressFill.style.width = `${pct}%`;
    if (timeDisplay) timeDisplay.textContent = `${formatTime(curr)} / ${formatTime(total)}`;

    // Update chapter badge
    if (curr < 25) {
      if (chapterBadge) chapterBadge.textContent = '1. Artisan Studio & Voice AI';
      highlightChapter(0);
    } else if (curr < 50) {
      if (chapterBadge) chapterBadge.textContent = '2. Direct Patron Discovery & GI';
      highlightChapter(1);
    } else {
      if (chapterBadge) chapterBadge.textContent = '3. B2B Wholesale Cluster Portal';
      highlightChapter(2);
    }
  }

  function highlightChapter(index) {
    chapterBtns.forEach((btn, i) => {
      if (i === index) {
        btn.style.background = '#FAF2EB';
        btn.style.borderColor = '#EADBCE';
        btn.style.color = '#7A2813';
        btn.style.fontWeight = '800';
      } else {
        btn.style.background = '#FAF7F2';
        btn.style.borderColor = '#EAE3D9';
        btn.style.color = 'var(--text-secondary)';
        btn.style.fontWeight = '700';
      }
    });
  }

  // Animation fallback for offline canvas
  function startCanvasAnimation() {
    if (!canvas) return;
    canvas.style.display = 'block';
    const ctx = canvas.getContext('2d');
    let frame = 0;

    function draw() {
      if (!isSimulating) return;
      frame++;
      ctx.fillStyle = '#1C1512';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Pottery wheel simulation
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((frame * 0.05) % (Math.PI * 2));

      const grad = ctx.createRadialGradient(0, 0, 10, 0, 0, 80);
      grad.addColorStop(0, '#A84318');
      grad.addColorStop(0.7, '#7A2813');
      grad.addColorStop(1, '#38160B');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(0, 0, 70, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Title overlay
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Native Loom Interactive Platform Demo', canvas.width / 2, 35);

      requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);
  }

  function togglePlay() {
    if (!video.paused && !video.ended) {
      // Pause
      video.pause();
      isSimulating = false;
      if (simInterval) clearInterval(simInterval);
      if (playPauseIcon) playPauseIcon.textContent = '▶';
      if (bigPlayBtn) bigPlayBtn.style.display = 'flex';
    } else {
      // Play
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          if (bigPlayBtn) bigPlayBtn.style.display = 'none';
          if (playPauseIcon) playPauseIcon.textContent = '❚❚';
        }).catch(() => {
          // Fallback to canvas simulated playback
          isSimulating = true;
          startCanvasAnimation();
          if (bigPlayBtn) bigPlayBtn.style.display = 'none';
          if (playPauseIcon) playPauseIcon.textContent = '❚❚';

          if (simInterval) clearInterval(simInterval);
          simInterval = setInterval(() => {
            simulatedTime += 1;
            if (simulatedTime > simulatedDuration) simulatedTime = 0;
            updateProgress(simulatedTime, simulatedDuration);
          }, 1000);
        });
      }
    }
  }

  // Native video event listeners
  video.addEventListener('timeupdate', () => {
    updateProgress(video.currentTime, video.duration || simulatedDuration);
  });

  video.addEventListener('ended', () => {
    if (playPauseIcon) playPauseIcon.textContent = '▶';
    if (bigPlayBtn) bigPlayBtn.style.display = 'flex';
    updateProgress(0, video.duration || simulatedDuration);
  });

  bigPlayBtn?.addEventListener('click', togglePlay);
  playToggle?.addEventListener('click', togglePlay);

  muteToggle?.addEventListener('click', () => {
    video.muted = !video.muted;
    if (muteIcon) muteIcon.textContent = video.muted ? '🔇' : '🔊';
  });

  progressTrack?.addEventListener('click', (e) => {
    const rect = progressTrack.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const dur = video.duration || simulatedDuration;
    video.currentTime = pos * dur;
    simulatedTime = pos * dur;
    updateProgress(simulatedTime, dur);
  });

  // Chapter buttons
  chapterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTime = parseFloat(btn.dataset.time || 0);
      const label = btn.dataset.label || '';
      video.currentTime = targetTime;
      simulatedTime = targetTime;
      if (chapterBadge) chapterBadge.textContent = label;
      updateProgress(targetTime, video.duration || simulatedDuration);
      if (video.paused) {
        togglePlay();
      }
    });
  });

  // Modal Open/Close
  function openModal() {
    if (modal) modal.style.display = 'flex';
    if (modalVideo) {
      modalVideo.currentTime = video.currentTime;
      modalVideo.play().catch(() => {});
    }
    video.pause();
    if (playPauseIcon) playPauseIcon.textContent = '▶';
    if (bigPlayBtn) bigPlayBtn.style.display = 'flex';
  }

  function closeModal() {
    if (modal) modal.style.display = 'none';
    if (modalVideo) modalVideo.pause();
  }

  fsBtn?.addEventListener('click', openModal);
  expandModalBtn?.addEventListener('click', openModal);
  closeModalBtn?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  modalArtisanBtn?.addEventListener('click', () => {
    closeModal();
    window.navigateToScreen('artisan_auth');
  });
}
