/**
 * Screen: AI Smart Craft Studio (1-Photo Auto-Listing Flow)
 * Integrated with:
 * 1) Photo enhancement: RetinexFormer + OpenCV + BiRefNet (only when required)
 * 2) Voice recognition & translation: Whisper + IndicTrans2 1B (with 2-min real recording)
 * 3) Price prediction: XGBoost
 * 4) Smart catalogue: Qwen2.5-VL-7B-Instruct
 *
 * Exact 1:1 pixel-perfect visual styling and color themes preserved without modification.
 */

import { State } from '../state.js';
import { AudioAssistance } from '../speech.js';
import { aiClient } from '../ai_client.js';

export function renderCraftStudioScreen(container) {
  let isPlayingAudio = false;
  let isRecording = false;
  let selectedProductImage = null;
  let enhancedProductImageUrl = null;
  let isEnhancingImage = false;

  // Camera stream tracker
  let activeCameraStream = null;

  // Audio recording tracker (2 minutes max)
  let mediaRecorder = null;
  let audioStream = null;
  let audioChunks = [];
  let recordedAudioBlob = null;
  let recordedAudioUrl = null;
  let recordingInterval = null;
  let recordingSeconds = 0;
  const MAX_RECORDING_SECONDS = 120; // 2 minutes maximum
  let activeAudioPlayer = null;

  let currentCraftData = State.craftListingDraft || {
    title: 'Handcrafted Gorakhpur Terracotta Pitcher',
    subtitle: 'Handcrafted Terracotta Surahi',
    category: 'Terracotta Pottery',
    cluster: '📍 GI Tagged Artisan Cluster',
    confidence: '99% Match',
    spokenHindi: 'गोरखपुर टेराकोटा सुराही, जी आई टैग प्रमाणित।',
    spokenStoryBhojpuri: 'ई माटी राप्ती नदी के किनारे से निकल गइल बा, 2 दिन चाक पर गढ़ल आ नीम के छांव में सुखवल गइल बा।',
    englishTranslation: 'Pure alluvial clay surahi shaped on the foot-spun wheel and hand-carved with traditional Gorakhpur sun-flora. Naturally cools drinking water without electricity.',
    rawMaterialCost: 140,
    hoursCost: 420,
    kilnCost: 110,
    rangeMin: 700,
    rangeMax: 850
  };
  let listingPrice = currentCraftData.targetPrice || currentCraftData.price || currentCraftData.listingPrice || 750;

  // Interactive craft details verification list
  let craftDetailsList = [
    { id: 'cat', label: 'Terracotta Pottery', icon: '🏺', verified: true, desc: 'Natural alluvial terracotta clay' },
    { id: 'carving', label: 'Red Clay Hand-Carving', icon: '✎', verified: true, desc: 'Intricate traditional floral motifs' },
    { id: 'pigment', label: 'Natural Earth Pigment', icon: '💧', verified: true, desc: 'Lead-free natural slip coating' },
    { id: 'wheel', label: 'Foot-Spun Potter Wheel', icon: '⚙️', verified: false, desc: 'Handcrafted on traditional chaak' },
    { id: 'kiln', label: 'Open Pit Fired (850°C)', icon: '🔥', verified: false, desc: 'Generational slow-firing technique' }
  ];

  function formatDuration(sec) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  container.innerHTML = `
    <div class="craft-studio-screen animate-fade-in" style="padding: 10px 14px 80px; background: #FAF8F5; min-height: 100vh; max-width: 480px; margin: 0 auto; box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">

      <!-- Hidden file inputs for photo capture & gallery upload -->
      <input type="file" id="craft-photo-input" accept="image/*" style="display:none;" />
      <input type="file" id="craft-camera-input" accept="image/*" capture="environment" style="display:none;" />

      <!-- ========================================== -->
      <!-- SECTION 1: 1. Craft Photo • 1-Photo Capture -->
      <!-- ========================================== -->
      <div style="background:#FFFFFF; border:1px solid #ECE6DE; border-radius:14px; padding:16px 14px; margin-bottom:14px; box-shadow:0 1px 4px rgba(0,0,0,0.03);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
          <div style="display:flex; align-items:center; gap:8px;">
            <div style="width:24px; height:24px; border-radius:50%; background:#7A2813; color:#FFFFFF; font-size:0.8rem; font-weight:800; display:flex; align-items:center; justify-content:center;">
              1
            </div>
            <span style="font-size:0.92rem; font-weight:800; color:#1E150F;">
              1. Craft Photo Capture &amp; AI Enhance
            </span>
          </div>
          <div style="width:26px; height:26px; border-radius:50%; background:#FDE6DB; color:#7A2813; display:flex; align-items:center; justify-content:center; cursor:pointer;" id="voice-step1-btn" title="Listen instructions">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
          </div>
        </div>

        <!-- Before/After Split View Container -->
        <div style="position:relative; width:100%; height:220px; border-radius:10px; overflow:hidden; margin-bottom:12px; display:flex; background:#2A231E;">
          <!-- Left side: Raw Photo • Workshop -->
          <div style="width:50%; height:100%; position:relative; overflow:hidden;">
            <img id="raw-photo-img" src="/assets/raw_pottery_snap.jpg" alt="Raw Photo Workshop" style="width:200%; height:100%; object-fit:cover;" onerror="this.src='/assets/terracotta_pitcher.jpg'">
            <span style="position:absolute; top:8px; left:8px; background:rgba(0,0,0,0.65); color:#FFFFFF; font-size:0.62rem; font-weight:700; padding:3px 6px; border-radius:4px; cursor:pointer;" title="Raw Photo • Workshop Capture">
              Raw Photo • Workshop
            </span>
          </div>

          <!-- Right side: AI Enhanced Presentation -->
          <div style="width:50%; height:100%; position:relative; overflow:hidden;">
            <img id="enhanced-photo-img" src="/assets/terracotta_pitcher.jpg" alt="AI Enhanced" style="width:200%; height:100%; object-fit:cover; margin-left:-100%;" onerror="this.src='/assets/raw_pottery_snap.jpg'">
            <span style="position:absolute; top:8px; right:8px; background:#1F4E3A; color:#FFFFFF; font-size:0.62rem; font-weight:700; padding:3px 6px; border-radius:4px; display:flex; align-items:center; gap:3px;">
              <span>✨</span>
              <span>AI Enhanced</span>
            </span>
          </div>

          <!-- Split handle in center -->
          <div style="position:absolute; top:0; bottom:0; left:50%; width:2px; background:#FFFFFF; transform:translateX(-50%); display:flex; align-items:center; justify-content:center;">
            <div style="width:24px; height:24px; border-radius:50%; background:#FFFFFF; box-shadow:0 2px 6px rgba(0,0,0,0.25); display:flex; align-items:center; justify-content:center; font-size:10px; font-weight:900; color:#1E150F;">
              ◀▶
            </div>
          </div>
        </div>

        <!-- AI Enhancing Live Status Indicator -->
        <div id="ai-enhancing-indicator" style="display:none; background:#E8F5E9; border:1px solid #C8E6C9; border-radius:8px; padding:10px 12px; margin-bottom:12px; align-items:center; gap:10px;">
          <div style="width:18px; height:18px; border:2.5px solid #1E6B47; border-top-color:transparent; border-radius:50%; animation: spin 1s linear infinite;"></div>
          <div>
            <div style="font-size:0.8rem; font-weight:800; color:#1E6B47;">AI Enhancing Craft Photo...</div>
            <div style="font-size:0.68rem; color:#2E7D32;">RetinexFormer lighting enhancement &amp; BiRefNet studio isolation</div>
          </div>
        </div>

        <!-- Camera Capture & Actions Row -->
        <div style="display:grid; grid-template-columns:1.3fr 1fr; gap:8px; margin-bottom:10px;">
          <!-- Prominent Camera Button with Camera Icon -->
          <button type="button" id="btn-camera-capture" style="background:#7A2813; color:#FFFFFF; border:none; border-radius:10px; padding:12px; font-size:0.85rem; font-weight:800; display:flex; align-items:center; justify-content:center; gap:8px; cursor:pointer; box-shadow:0 3px 8px rgba(122, 40, 19, 0.25); transition:transform 0.15s ease;">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
            <span>Capture Photo</span>
          </button>

          <!-- Choose from Gallery Button -->
          <button type="button" id="btn-retake-photo" style="background:#FFFFFF; border:1px solid #D8CFC4; border-radius:10px; padding:12px; font-size:0.82rem; font-weight:700; color:#1E150F; display:flex; align-items:center; justify-content:center; gap:6px; cursor:pointer;">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
            <span>Gallery</span>
          </button>
        </div>

        <button type="button" id="btn-confirm-photo" style="width:100%; background:#FDE6DB; border:1px solid #F8D1BF; border-radius:8px; padding:10px; font-size:0.82rem; font-weight:800; color:#7A2813; display:flex; align-items:center; justify-content:center; gap:6px; cursor:pointer;">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          <span>Looks Good • Keep Enhanced Photo</span>
        </button>
      </div>

      <!-- ========================================== -->
      <!-- SECTION 2: 2. Auto-Detected Craft -->
      <!-- ========================================== -->
      <div style="background:#FFFFFF; border:1px solid #ECE6DE; border-radius:14px; padding:16px 14px; margin-bottom:14px; box-shadow:0 1px 4px rgba(0,0,0,0.03);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
          <div style="display:flex; align-items:center; gap:8px;">
            <div style="width:22px; height:22px; border-radius:50%; background:#1F4E3A; color:#FFFFFF; font-size:0.8rem; font-weight:800; display:flex; align-items:center; justify-content:center;">
              2
            </div>
            <span style="font-size:0.92rem; font-weight:800; color:#1E150F;">
              2. Auto-Detected Craft
            </span>
          </div>
          <span id="craft-confidence-badge" style="background:#DBEAFE; color:#1E40AF; font-size:0.68rem; font-weight:800; padding:3px 8px; border-radius:10px; display:flex; align-items:center; gap:4px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            <span id="confidence-text">${currentCraftData.confidence}</span>
          </span>
        </div>

        <!-- Craft Detection Card -->
        <div style="background:#FAF8F5; border:1px solid #EAE3D9; border-radius:10px; padding:12px; margin-bottom:12px; display:flex; align-items:center; justify-content:space-between;">
          <div style="display:flex; align-items:center; gap:10px;">
            <div style="width:38px; height:38px; border-radius:8px; background:#FDE6DB; display:flex; align-items:center; justify-content:center; font-size:1.2rem;">
              🏺
            </div>
            <div>
              <div id="craft-title-display" style="font-size:0.95rem; font-weight:800; color:#1E150F;">
                ${currentCraftData.title}
              </div>
              <div id="craft-subtitle-display" style="font-size:0.75rem; color:#71655D;">
                ${currentCraftData.subtitle}
              </div>
              <div id="craft-cluster-display" style="font-size:0.7rem; color:#15803D; font-weight:700; margin-top:2px;">
                ${currentCraftData.cluster}
              </div>
            </div>
          </div>
          <div style="width:32px; height:32px; border-radius:50%; background:#FFFFFF; border:1px solid #ECE6DE; color:#7A2813; display:flex; align-items:center; justify-content:center; cursor:pointer;" id="voice-step2-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
          </div>
        </div>

        <!-- Tap to verify details (Interactive) -->
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <div style="font-size:0.72rem; font-weight:800; color:#71655D; text-transform:uppercase; letter-spacing:0.04em;">
            TAP TO VERIFY DETAILS:
          </div>
          <div id="verification-count-badge" style="font-size:0.68rem; font-weight:800; color:#15803D; background:#DCFCE7; padding:2px 8px; border-radius:10px;">
            3 Verified
          </div>
        </div>

        <!-- Interactive verification options container -->
        <div style="display:flex; flex-direction:column; gap:8px;" id="verification-tags-container">
          <!-- Rendered dynamically via renderVerificationTags() -->
        </div>

        <!-- Add Custom Craft Detail Button & Form -->
        <div id="add-tag-box" style="margin-top:10px;">
          <button type="button" id="btn-show-add-tag" style="background:#FAF8F5; border:1px dashed #C8BDB2; border-radius:8px; padding:8px 12px; font-size:0.75rem; font-weight:700; color:#7A2813; width:100%; display:flex; align-items:center; justify-content:center; gap:6px; cursor:pointer;">
            <span>+</span>
            <span>Add Custom Craft Detail / Tag</span>
          </button>
          <div id="add-tag-input-group" style="display:none; margin-top:8px; gap:6px;">
            <input type="text" id="input-new-craft-tag" placeholder="e.g. Lead-free & Food-safe, GI Tagged" style="flex:1; padding:8px 10px; border-radius:6px; border:1px solid #D8CFC4; font-size:0.78rem; outline:none;" />
            <button type="button" id="btn-save-new-tag" style="background:#7A2813; color:#FFFFFF; border:none; border-radius:6px; padding:8px 12px; font-size:0.78rem; font-weight:800; cursor:pointer;">Add</button>
            <button type="button" id="btn-cancel-new-tag" style="background:#ECE6DE; color:#1E150F; border:none; border-radius:6px; padding:8px 10px; font-size:0.78rem; font-weight:700; cursor:pointer;">✕</button>
          </div>
        </div>
      </div>

      <!-- ========================================== -->
      <!-- SECTION 3: 3. Voice Description • Spoken Story -->
      <!-- ========================================== -->
      <div style="background:#FFFFFF; border:1px solid #ECE6DE; border-radius:14px; padding:16px 14px; margin-bottom:14px; box-shadow:0 1px 4px rgba(0,0,0,0.03);">
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:12px;">
          <div style="display:flex; align-items:center; gap:8px;">
            <div style="width:22px; height:22px; border-radius:50%; background:#C25E1A; color:#FFFFFF; font-size:0.8rem; font-weight:800; display:flex; align-items:center; justify-content:center;">
              3
            </div>
            <span style="font-size:0.92rem; font-weight:800; color:#1E150F;">
              3. Craft Description &amp; Heritage Story
            </span>
          </div>
          <!-- 2 Minute Max Indicator Badge -->
          <span style="background:#FEF3C7; color:#92400E; font-size:0.68rem; font-weight:800; padding:3px 8px; border-radius:10px; border:1px solid #FDE68A;">
            ⏱️ Max 2 Min
          </span>
        </div>

        <!-- Mode Toggle Tabs: Voice Story vs Manual Input -->
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-bottom:12px;">
          <button type="button" id="tab-voice-story" style="background:#7A2813; color:#FFFFFF; border:none; border-radius:8px; padding:8px 10px; font-size:0.78rem; font-weight:800; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:6px; box-shadow:0 2px 4px rgba(122,40,19,0.2);">
            <span>🎙️ Voice Story</span>
          </button>
          <button type="button" id="tab-manual-story" style="background:#EAE5DE; color:#2E251F; border:none; border-radius:8px; padding:8px 10px; font-size:0.78rem; font-weight:800; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:6px;">
            <span>✍️ Manual Input</span>
          </button>
        </div>

        <!-- Manual Input Story Container -->
        <div id="container-manual-story" style="display:none; flex-direction:column; gap:10px; margin-bottom:12px;">
          <div>
            <label for="input-manual-craft-title" style="font-size:0.72rem; font-weight:800; color:#1E150F; display:block; margin-bottom:4px;">CRAFT PIECE TITLE *</label>
            <input type="text" id="input-manual-craft-title" value="${currentCraftData.title}" placeholder="e.g. Gorakhpur Terracotta Pitcher" style="width:100%; padding:9px 12px; border-radius:8px; border:1px solid #D8CFC4; background:#FAF8F5; font-size:0.85rem; font-weight:800; color:#1E150F; outline:none; box-sizing:border-box;">
          </div>
          <div>
            <label for="input-manual-craft-story" style="font-size:0.72rem; font-weight:800; color:#1E150F; display:block; margin-bottom:4px;">CRAFT STORY &amp; HERITAGE DESCRIPTION *</label>
            <textarea id="input-manual-craft-story" rows="3" placeholder="Describe how this craft is created, materials used, generational heritage..." style="width:100%; padding:9px 12px; border-radius:8px; border:1px solid #D8CFC4; background:#FAF8F5; font-size:0.8rem; font-family:inherit; color:#1E150F; outline:none; box-sizing:border-box;">${currentCraftData.storyHindi || ''}</textarea>
          </div>
          <div>
            <label for="input-manual-craft-english" style="font-size:0.72rem; font-weight:800; color:#1E150F; display:block; margin-bottom:4px;">ENGLISH TRANSLATION / BUYER OVERVIEW</label>
            <textarea id="input-manual-craft-english" rows="2" placeholder="English summary for buyers..." style="width:100%; padding:9px 12px; border-radius:8px; border:1px solid #D8CFC4; background:#FAF8F5; font-size:0.78rem; font-family:inherit; color:#1E150F; outline:none; box-sizing:border-box;">${currentCraftData.englishTranslation || ''}</textarea>
          </div>
        </div>

        <!-- Voice Story Container -->
        <div id="container-voice-story">
          <!-- Waveform Card with Mic Button & 2-Min Live Recording Engine -->
          <div style="background:#FAF8F5; border:1px solid #EAE3D9; border-radius:10px; padding:16px 12px; text-align:center; margin-bottom:12px;">

            <!-- Live Timer & Progress Bar for 2-Minute Max Limit -->
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
              <span style="font-size:0.72rem; font-weight:800; color:#71655D; text-transform:uppercase;">Recording Time:</span>
              <span id="voice-timer-display" style="font-size:0.85rem; font-weight:900; color:#7A2813; font-variant-numeric:tabular-nums;">00:00 / 02:00</span>
            </div>

            <!-- 2-Minute Progress Bar -->
            <div id="voice-progress-container" style="width:100%; height:6px; background:#ECE6DE; border-radius:3px; overflow:hidden; margin-bottom:12px;">
              <div id="voice-progress-bar" style="width:0%; height:100%; background:#7A2813; transition:width 0.25s linear;"></div>
            </div>

            <!-- Audio Waveform Graphic with Dynamic Waves -->
            <div id="audio-waveform-bars" style="display:flex; align-items:center; justify-content:center; gap:5px; height:34px; margin-bottom:14px;">
              <span class="wave-bar" style="width:4px; height:12px; background:#7A2813; border-radius:2px; transition:height 0.15s ease;"></span>
              <span class="wave-bar" style="width:4px; height:20px; background:#C25E1A; border-radius:2px; transition:height 0.15s ease;"></span>
              <span class="wave-bar" style="width:4px; height:28px; background:#D97706; border-radius:2px; transition:height 0.15s ease;"></span>
              <span class="wave-bar" style="width:4px; height:18px; background:#1F4E3A; border-radius:2px; transition:height 0.15s ease;"></span>
              <span class="wave-bar" style="width:4px; height:26px; background:#7A2813; border-radius:2px; transition:height 0.15s ease;"></span>
              <span class="wave-bar" style="width:4px; height:14px; background:#C25E1A; border-radius:2px; transition:height 0.15s ease;"></span>
              <span class="wave-bar" style="width:4px; height:22px; background:#D97706; border-radius:2px; transition:height 0.15s ease;"></span>
              <span class="wave-bar" style="width:4px; height:10px; background:#1F4E3A; border-radius:2px; transition:height 0.15s ease;"></span>
            </div>

            <!-- Mic Button: Toggles 2-minute real recording -->
            <div id="btn-mic-record" style="display:inline-flex; align-items:center; justify-content:center; width:52px; height:52px; border-radius:50%; background:#7A2813; color:#FFFFFF; margin-bottom:8px; cursor:pointer; box-shadow:0 3px 10px rgba(122, 40, 19, 0.3); transition:all 0.2s ease;">
              <svg id="mic-icon-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
            </div>

            <div id="mic-status-label" style="font-size:0.8rem; font-weight:700; color:#1E150F;">
              Tap microphone to record story (Max 2 minutes)
            </div>
            <div id="mic-sub-hint" style="font-size:0.68rem; color:#71655D; margin-top:2px;">
              Speak in Bhojpuri, Hindi, or any native tongue • Whisper AI will transcribe
            </div>
          </div>

          <!-- Recorded Spoken Audio Player Card -->
          <div style="background:#FAF8F5; border:1px solid #EAE3D9; border-radius:10px; padding:10px 12px; display:flex; align-items:center; justify-content:space-between; margin-bottom:12px;">
            <div style="display:flex; align-items:center; gap:10px;">
              <div style="width:34px; height:34px; border-radius:50%; background:#1F4E3A; color:#FFFFFF; display:flex; align-items:center; justify-content:center; cursor:pointer;" id="btn-play-spoken-story" title="Play recorded audio">
                <svg id="play-spoken-icon" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              </div>
              <div>
                <div id="recorded-audio-title-text" style="font-size:0.82rem; font-weight:800; color:#1E150F;">
                  Recorded Spoken Audio (0:28s)
                </div>
                <div style="font-size:0.68rem; color:#71655D;">
                  Native artisan dialect audio recording
                </div>
              </div>
            </div>
            <button type="button" id="btn-rerecord-voice" style="background:#FDE6DB; border:1px solid #F8D1BF; border-radius:6px; padding:6px 10px; font-size:0.72rem; font-weight:800; color:#7A2813; cursor:pointer;">
              Re-record
            </button>
          </div>

          <!-- AI English Translation for Global Buyers -->
          <div style="background:#FAF8F5; border:1px solid #EAE3D9; border-radius:10px; padding:12px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
              <div style="font-size:0.72rem; font-weight:800; color:#1E150F; display:flex; align-items:center; gap:4px;">
                <span>文A</span>
                <span>AI English Translation for Global Buyers:</span>
              </div>
              <div style="width:20px; height:20px; border-radius:50%; color:#71655D; display:flex; align-items:center; justify-content:center; cursor:pointer;" id="btn-play-english-translation">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
              </div>
            </div>
            <p id="translation-text-para" style="font-size:0.78rem; font-style:italic; color:#5C524A; line-height:1.45; margin:0;">
              "${currentCraftData.englishTranslation}"
            </p>
          </div>
        </div>
      </div>

      <!-- ========================================== -->
      <!-- SECTION 4: 4. AI Fair Price Recommendation -->
      <!-- ========================================== -->
      <div style="background:#FFFFFF; border:1px solid #ECE6DE; border-radius:14px; padding:16px 14px; margin-bottom:18px; box-shadow:0 1px 4px rgba(0,0,0,0.03);">
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:12px;">
          <div style="width:22px; height:22px; border-radius:50%; background:#7A2813; color:#FFFFFF; font-size:0.8rem; font-weight:800; display:flex; align-items:center; justify-content:center;">
            4
          </div>
          <span style="font-size:0.92rem; font-weight:800; color:#1E150F;">
            4. AI Fair Price Recommendation
          </span>
        </div>

        <!-- Estimated Fair Market Value Card -->
        <div style="background:#FAF8F5; border:1px solid #EAE3D9; border-radius:10px; padding:16px 12px; text-align:center; margin-bottom:12px;">
          <div style="font-size:0.68rem; font-weight:800; color:#71655D; letter-spacing:0.04em; text-transform:uppercase; margin-bottom:8px;">
            ESTIMATED FAIR MARKET VALUE
          </div>

          <div style="display:flex; align-items:center; justify-content:center; gap:12px; margin-bottom:8px;">
            <button type="button" id="btn-price-minus" style="width:40px; height:40px; border-radius:8px; background:#FFFFFF; border:1px solid #EAE3D9; font-size:1.4rem; font-weight:800; color:#7A2813; display:flex; align-items:center; justify-content:center; cursor:pointer;">
              −
            </button>
            <div style="display:flex; align-items:center; background:#FFFFFF; border:1.5px solid #D8CFC4; border-radius:8px; padding:4px 12px;">
              <span style="font-size:1.4rem; font-weight:900; color:#7A2813; margin-right:2px;">₹</span>
              <input type="number" id="input-listing-price" value="${listingPrice}" min="50" max="100000" step="10" style="width:90px; font-size:1.5rem; font-weight:900; color:#7A2813; border:none; background:transparent; text-align:center; outline:none;">
            </div>
            <button type="button" id="btn-price-plus" style="width:40px; height:40px; border-radius:8px; background:#FFFFFF; border:1px solid #EAE3D9; font-size:1.4rem; font-weight:800; color:#7A2813; display:flex; align-items:center; justify-content:center; cursor:pointer;">
              +
            </button>
          </div>

          <div id="price-recommended-range-text" style="font-size:0.75rem; color:#71655D; font-weight:600; margin-bottom:10px;">
            ₹${currentCraftData.rangeMin} – ₹${currentCraftData.rangeMax} Recommended Range
          </div>

          <!-- Range Track Slider -->
          <div style="position:relative; width:90%; margin:0 auto; height:5px; background:#E5DAC8; border-radius:3px;">
            <div id="price-slider-fill" style="position:absolute; left:0; width:45%; height:100%; background:#7A2813; border-radius:3px;"></div>
            <div id="price-slider-knob" style="position:absolute; left:45%; top:50%; transform:translate(-50%, -50%); width:16px; height:16px; border-radius:50%; background:#7A2813; border:2px solid #FFFFFF; box-shadow:0 1px 4px rgba(0,0,0,0.3);"></div>
          </div>
        </div>

        <!-- Cost Breakdown Card -->
        <div style="background:#FAF8F5; border:1px solid #EAE3D9; border-radius:10px; padding:12px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
            <div style="display:flex; align-items:center; gap:6px; font-size:0.8rem; font-weight:800; color:#1E150F; cursor:pointer;" id="btn-cost-breakdown-title" title="Cost Breakdown">
              <span>🪟</span>
              <span>Cost Breakdown (Why this price)</span>
            </div>
            <button type="button" id="btn-listen-breakdown" style="background:#FFFFFF; border:1px solid #EAE3D9; border-radius:6px; padding:3px 8px; font-size:0.72rem; font-weight:700; color:#1E150F; display:flex; align-items:center; gap:4px; cursor:pointer;">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
              <span>Listen</span>
            </button>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:6px; text-align:center;">
            <div style="background:#FFFFFF; border:1px solid #EAE3D9; border-radius:8px; padding:8px 4px;">
              <div style="font-size:0.62rem; color:#71655D; line-height:1.2; margin-bottom:4px;">
                Raw Material<br>(Clay &amp; Husk)
              </div>
              <div id="cost-raw-display" style="font-size:0.88rem; font-weight:900; color:#1E150F;">
                ₹${currentCraftData.rawMaterialCost}
              </div>
            </div>

            <div style="background:#FFFFFF; border:1px solid #EAE3D9; border-radius:8px; padding:8px 4px;">
              <div style="font-size:0.62rem; color:#71655D; line-height:1.2; margin-bottom:4px;">
                16 Hours<br>Handcrafting
              </div>
              <div id="cost-labor-display" style="font-size:0.88rem; font-weight:900; color:#1E150F;">
                ₹${currentCraftData.hoursCost}
              </div>
            </div>

            <div style="background:#FFFFFF; border:1px solid #EAE3D9; border-radius:8px; padding:8px 4px;">
              <div style="font-size:0.62rem; color:#71655D; line-height:1.2; margin-bottom:4px;">
                Kiln Firing &amp;<br>Loss Reserve
              </div>
              <div id="cost-kiln-display" style="font-size:0.88rem; font-weight:900; color:#1E150F;">
                ₹${currentCraftData.kilnCost}
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- Publish Craft to Marketplace Button -->
      <button type="button" id="btn-publish-craft" style="width:100%; background:#7A2813; color:#FFFFFF; border:none; border-radius:10px; padding:14px; font-size:0.95rem; font-weight:800; display:flex; align-items:center; justify-content:center; gap:8px; cursor:pointer; box-shadow:0 4px 14px rgba(122, 40, 19, 0.3); margin-bottom:8px;">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        <span>Publish Craft to Marketplace</span>
      </button>

      <!-- Fair Trade Protection Subtext -->
      <div style="font-size:0.72rem; color:#15803D; font-weight:700; text-align:center; display:flex; align-items:center; justify-content:center; gap:4px;">
        <span>🛡️</span>
        <span>Protected by Artisan Fair Trade Guarantee</span>
      </div>

      <!-- Live Camera Viewfinder Modal -->
      <div id="modal-craft-camera" style="display:none; position:fixed; inset:0; background:rgba(0,0,0,0.92); z-index:9999; flex-direction:column; align-items:center; justify-content:space-between; padding:20px 16px; box-sizing:border-box;">
        <div style="width:100%; display:flex; justify-content:space-between; align-items:center; color:#FFFFFF;">
          <div style="font-size:0.9rem; font-weight:800; display:flex; align-items:center; gap:6px;">
            <span>📷</span>
            <span>Artisan Camera Viewfinder</span>
          </div>
          <button type="button" id="btn-close-camera-modal" style="background:rgba(255,255,255,0.2); border:none; color:#FFFFFF; border-radius:50%; width:36px; height:36px; font-size:1.1rem; cursor:pointer; display:flex; align-items:center; justify-content:center;">
            ✕
          </button>
        </div>

        <!-- Video stream area with craft grid alignment -->
        <div style="position:relative; width:100%; max-width:400px; height:60vh; background:#000000; border-radius:16px; overflow:hidden; display:flex; align-items:center; justify-content:center;">
          <video id="craft-camera-video" autoplay playsinline style="width:100%; height:100%; object-fit:cover;"></video>

          <!-- Rule of thirds alignment overlay for artisan craft framing -->
          <div style="position:absolute; inset:20px; border:2px dashed rgba(255,255,255,0.4); border-radius:12px; pointer-events:none; display:flex; align-items:center; justify-content:center;">
            <div style="color:rgba(255,255,255,0.7); font-size:0.75rem; font-weight:700; background:rgba(0,0,0,0.5); padding:4px 10px; border-radius:20px;">
              Center your craft in frame
            </div>
          </div>
        </div>

        <!-- Camera Control Bar with Large Shutter Button -->
        <div style="width:100%; max-width:400px; display:flex; align-items:center; justify-content:space-around; padding-bottom:10px;">
          <div style="width:44px;"></div>
          <!-- Shutter Button with Camera Icon -->
          <button type="button" id="btn-shutter-snap" style="width:72px; height:72px; border-radius:50%; background:#FFFFFF; border:5px solid #7A2813; display:flex; align-items:center; justify-content:center; cursor:pointer; box-shadow:0 0 0 4px rgba(255,255,255,0.5); transition:transform 0.1s ease;">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="#7A2813"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3" fill="#FFFFFF"/></svg>
          </button>
          <button type="button" id="btn-switch-camera-mode" style="background:rgba(255,255,255,0.2); border:none; color:#FFFFFF; border-radius:50%; width:44px; height:44px; font-size:1.2rem; cursor:pointer; display:flex; align-items:center; justify-content:center;" title="Upload file fallback">
            📁
          </button>
        </div>
      </div>

    </div>
  `;

  // ==========================================
  // 1. Photo Capture & AI Enhancement Logic
  // ==========================================
  const fileInput = container.querySelector('#craft-photo-input');
  const cameraInput = container.querySelector('#craft-camera-input');
  const btnCameraCapture = container.querySelector('#btn-camera-capture');
  const btnRetake = container.querySelector('#btn-retake-photo');
  const rawPhotoImg = container.querySelector('#raw-photo-img');
  const enhancedPhotoImg = container.querySelector('#enhanced-photo-img');
  const aiEnhancingIndicator = container.querySelector('#ai-enhancing-indicator');

  const cameraModal = container.querySelector('#modal-craft-camera');
  const cameraVideo = container.querySelector('#craft-camera-video');
  const btnCloseCamera = container.querySelector('#btn-close-camera-modal');
  const btnShutter = container.querySelector('#btn-shutter-snap');
  const btnSwitchMode = container.querySelector('#btn-switch-camera-mode');

  function stopActiveCamera() {
    if (activeCameraStream) {
      activeCameraStream.getTracks().forEach(track => track.stop());
      activeCameraStream = null;
    }
    if (cameraVideo) cameraVideo.srcObject = null;
    if (cameraModal) cameraModal.style.display = 'none';
  }
  window.stopCraftCamera = stopActiveCamera;

  async function openLiveCamera() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        if (cameraModal) cameraModal.style.display = 'flex';
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: 'environment' } },
          audio: false
        });
        activeCameraStream = stream;
        if (cameraVideo) {
          cameraVideo.srcObject = stream;
          cameraVideo.play();
        }
      } catch (err) {
        console.warn('Camera stream error, falling back to camera input:', err);
        stopActiveCamera();
        cameraInput?.click();
      }
    } else {
      cameraInput?.click();
    }
  }

  btnCameraCapture?.addEventListener('click', () => {
    openLiveCamera();
  });

  btnRetake?.addEventListener('click', () => {
    fileInput?.click();
  });

  btnCloseCamera?.addEventListener('click', () => {
    stopActiveCamera();
  });

  btnSwitchMode?.addEventListener('click', () => {
    stopActiveCamera();
    fileInput?.click();
  });

  // Snap photo from live camera shutter
  btnShutter?.addEventListener('click', () => {
    if (!cameraVideo || !activeCameraStream) {
      stopActiveCamera();
      cameraInput?.click();
      return;
    }

    try {
      const canvas = document.createElement('canvas');
      canvas.width = cameraVideo.videoWidth || 720;
      canvas.height = cameraVideo.videoHeight || 720;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(cameraVideo, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(async (blob) => {
        stopActiveCamera();
        if (blob) {
          handleCapturedPhoto(blob);
        }
      }, 'image/jpeg', 0.92);
    } catch (e) {
      console.warn('Shutter snapshot failed:', e);
      stopActiveCamera();
      cameraInput?.click();
    }
  });

  cameraInput?.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (file) handleCapturedPhoto(file);
  });

  fileInput?.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (file) handleCapturedPhoto(file);
  });

  async function handleCapturedPhoto(fileOrBlob) {
    if (!fileOrBlob) return;

    const localUrl = URL.createObjectURL(fileOrBlob);
    if (rawPhotoImg) rawPhotoImg.src = localUrl;

    if (aiEnhancingIndicator) aiEnhancingIndicator.style.display = 'flex';
    window.showToast?.('AI Enhancing with RetinexFormer + OpenCV + BiRefNet...');

    try {
      const enhanceResult = await aiClient.enhancePhoto(fileOrBlob, { applyBiRefNet: true });
      if (enhanceResult && enhancedPhotoImg) {
        enhancedPhotoImg.src = enhanceResult.imageUrl;
        enhancedProductImageUrl = enhanceResult.imageUrl;
      } else {
        enhancedProductImageUrl = localUrl;
      }

      // Smart Catalogue: Qwen2.5-VL-7B-Instruct
      const catResult = await aiClient.smartCatalogue(fileOrBlob);
      if (catResult) {
        const titleEl = container.querySelector('#craft-title-display');
        const subEl = container.querySelector('#craft-subtitle-display');
        const clusterEl = container.querySelector('#craft-cluster-display');
        const confEl = container.querySelector('#confidence-text');

        if (titleEl) titleEl.textContent = catResult.shortTitle || catResult.title;
        if (subEl) subEl.textContent = catResult.subtitle || catResult.title;
        if (clusterEl && catResult.giBadge) clusterEl.textContent = catResult.giBadge;
        if (confEl && catResult.confidenceBadge) confEl.textContent = catResult.confidenceBadge;
        if (catResult.spokenHindi) currentCraftData.spokenHindi = catResult.spokenHindi;
      }

      // Price Prediction: XGBoost
      const priceResult = await aiClient.predictPrice({ craftCategory: 'Terracotta Pottery' });
      if (priceResult) {
        listingPrice = priceResult.recommendedPrice;
        const priceInput = container.querySelector('#input-listing-price');
        if (priceInput) priceInput.value = listingPrice;
        updateSliderPosition(listingPrice);

        const rangeEl = container.querySelector('#price-recommended-range-text');
        if (rangeEl) rangeEl.textContent = priceResult.rangeFormatted;

        const rawEl = container.querySelector('#cost-raw-display');
        const labEl = container.querySelector('#cost-labor-display');
        const kilnEl = container.querySelector('#cost-kiln-display');
        if (rawEl) rawEl.textContent = `₹${priceResult.costBreakdown.raw_material}`;
        if (labEl) labEl.textContent = `₹${priceResult.costBreakdown.handcraft_labor}`;
        if (kilnEl) kilnEl.textContent = `₹${priceResult.costBreakdown.kiln_firing_and_loss_reserve}`;
      }

      window.showToast?.('✨ AI Enhanced Presentation & Smart Catalogue Complete!');
    } catch (err) {
      console.warn('Enhance error:', err);
    } finally {
      if (aiEnhancingIndicator) aiEnhancingIndicator.style.display = 'none';
    }
  }

  container.querySelector('#btn-confirm-photo')?.addEventListener('click', () => {
    window.showToast?.('AI Enhanced Presentation confirmed!');
  });

  container.querySelector('#voice-step1-btn')?.addEventListener('click', () => {
    AudioAssistance.speak('पहिला कदम: अपने शिल्प की एक फोटो कैमरा से खींचें या गैलरी से चुनें। AI इसे स्टूडियो क्वालिटी में सुधार देगा।');
  });

  // ==========================================
  // 2. Interactive Auto-Detected Craft Verification
  // ==========================================
  const tagsContainer = container.querySelector('#verification-tags-container');
  const countBadge = container.querySelector('#verification-count-badge');
  const confidenceBadge = container.querySelector('#confidence-text');

  function renderVerificationTags() {
    if (!tagsContainer) return;
    tagsContainer.innerHTML = '';

    const verifiedCount = craftDetailsList.filter(d => d.verified).length;
    if (countBadge) {
      countBadge.textContent = `${verifiedCount} / ${craftDetailsList.length} Verified`;
    }

    // Update confidence badge based on verified tags
    if (confidenceBadge) {
      const matchPct = Math.min(99, 88 + (verifiedCount * 2.5));
      confidenceBadge.textContent = `${Math.round(matchPct)}% Match`;
    }

    craftDetailsList.forEach((item, index) => {
      const tagDiv = document.createElement('div');
      tagDiv.style.borderRadius = '8px';
      tagDiv.style.padding = '10px 12px';
      tagDiv.style.fontSize = '0.8rem';
      tagDiv.style.display = 'flex';
      tagDiv.style.alignItems = 'center';
      tagDiv.style.justifyContent = 'space-between';
      tagDiv.style.cursor = 'pointer';
      tagDiv.style.transition = 'all 0.18s ease';
      tagDiv.style.userSelect = 'none';

      if (item.verified) {
        tagDiv.style.background = '#7A2813';
        tagDiv.style.color = '#FFFFFF';
        tagDiv.style.border = '1px solid #7A2813';
        tagDiv.style.boxShadow = '0 2px 6px rgba(122, 40, 19, 0.18)';
        tagDiv.innerHTML = `
          <div style="display:flex; align-items:center; gap:8px;">
            <span style="display:inline-flex; align-items:center; justify-content:center; width:20px; height:20px; border-radius:50%; background:rgba(255,255,255,0.2);">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </span>
            <div>
              <div style="font-weight:800; font-size:0.82rem;">${item.label}</div>
              <div style="font-size:0.66rem; color:#F8D1BF;">${item.desc}</div>
            </div>
          </div>
          <span style="font-size:0.68rem; font-weight:800; background:rgba(255,255,255,0.22); padding:3px 8px; border-radius:10px;">
            Verified ✓
          </span>
        `;
      } else {
        tagDiv.style.background = '#FAF8F5';
        tagDiv.style.color = '#1E150F';
        tagDiv.style.border = '1px solid #EAE3D9';
        tagDiv.innerHTML = `
          <div style="display:flex; align-items:center; gap:8px;">
            <span style="font-size:1.05rem;">${item.icon || '✎'}</span>
            <div>
              <div style="font-weight:700; font-size:0.82rem;">${item.label}</div>
              <div style="font-size:0.66rem; color:#71655D;">${item.desc}</div>
            </div>
          </div>
          <span style="font-size:0.68rem; font-weight:700; color:#7A2813; background:#FDE6DB; padding:3px 8px; border-radius:10px;">
            + Tap to Verify
          </span>
        `;
      }

      tagDiv.addEventListener('click', () => {
        item.verified = !item.verified;
        renderVerificationTags();
        if (item.verified) {
          window.showToast?.(`✓ Verified: ${item.label}`);
        } else {
          window.showToast?.(`Removed verification: ${item.label}`);
        }
      });

      tagsContainer.appendChild(tagDiv);
    });
  }

  // Initial render of verification tags
  renderVerificationTags();

  // Add custom detail handler
  const btnShowAddTag = container.querySelector('#btn-show-add-tag');
  const addTagInputGroup = container.querySelector('#add-tag-input-group');
  const inputNewTag = container.querySelector('#input-new-craft-tag');
  const btnSaveNewTag = container.querySelector('#btn-save-new-tag');
  const btnCancelNewTag = container.querySelector('#btn-cancel-new-tag');

  btnShowAddTag?.addEventListener('click', () => {
    btnShowAddTag.style.display = 'none';
    if (addTagInputGroup) {
      addTagInputGroup.style.display = 'flex';
      inputNewTag?.focus();
    }
  });

  btnCancelNewTag?.addEventListener('click', () => {
    if (addTagInputGroup) addTagInputGroup.style.display = 'none';
    if (btnShowAddTag) btnShowAddTag.style.display = 'flex';
    if (inputNewTag) inputNewTag.value = '';
  });

  btnSaveNewTag?.addEventListener('click', () => {
    const val = inputNewTag?.value?.trim();
    if (val) {
      craftDetailsList.push({
        id: 'custom_' + Date.now(),
        label: val,
        icon: '✨',
        verified: true,
        desc: 'Custom verified artisan craft attribute'
      });
      renderVerificationTags();
      window.showToast?.(`✓ Added verified detail: ${val}`);
      if (inputNewTag) inputNewTag.value = '';
    }
    if (addTagInputGroup) addTagInputGroup.style.display = 'none';
    if (btnShowAddTag) btnShowAddTag.style.display = 'flex';
  });

  container.querySelector('#voice-step2-btn')?.addEventListener('click', () => {
    AudioAssistance.speak(currentCraftData.spokenHindi);
  });

  // ==========================================
  // 3. Voice Story • 2-Minute Max Microphone Engine
  // ==========================================
  const btnMic = container.querySelector('#btn-mic-record');
  const micStatus = container.querySelector('#mic-status-label');
  const micSubHint = container.querySelector('#mic-sub-hint');
  const micIconSvg = container.querySelector('#mic-icon-svg');
  const transPara = container.querySelector('#translation-text-para');
  const timerDisplay = container.querySelector('#voice-timer-display');
  const progressBar = container.querySelector('#voice-progress-bar');
  const waveformBars = container.querySelectorAll('.wave-bar');
  const recordedAudioTitle = container.querySelector('#recorded-audio-title-text');
  const btnPlaySpoken = container.querySelector('#btn-play-spoken-story');
  const playSpokenIcon = container.querySelector('#play-spoken-icon');

  function updateWaveformVisuals(recording) {
    if (recording) {
      waveformBars.forEach(bar => {
        const randHeight = Math.floor(Math.random() * 24) + 8;
        bar.style.height = `${randHeight}px`;
      });
    } else {
      const defaultHeights = [12, 20, 28, 18, 26, 14, 22, 10];
      waveformBars.forEach((bar, i) => {
        bar.style.height = `${defaultHeights[i % defaultHeights.length]}px`;
      });
    }
  }

  function stopRecordingAudio(hitMaxLimit = false) {
    if (!isRecording) return;
    isRecording = false;

    if (recordingInterval) {
      clearInterval(recordingInterval);
      recordingInterval = null;
    }

    // Stop MediaRecorder
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      try {
        mediaRecorder.stop();
      } catch (e) {
        console.warn('Error stopping mediaRecorder:', e);
      }
    }

    // Stop audio stream tracks to turn off microphone hardware indicator
    if (audioStream) {
      audioStream.getTracks().forEach(t => t.stop());
      audioStream = null;
    }

    // Reset mic button UI
    if (btnMic) {
      btnMic.style.background = '#7A2813';
      btnMic.style.boxShadow = '0 3px 10px rgba(122, 40, 19, 0.3)';
      btnMic.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
      `;
    }

    updateWaveformVisuals(false);

    if (hitMaxLimit) {
      window.showToast?.('⏱️ Maximum 2 minutes recording reached! Processing audio...');
      if (micStatus) micStatus.textContent = '2 min reached • Transcribing with Whisper...';
    } else {
      if (micStatus) micStatus.textContent = 'Recording stopped • Transcribing with Whisper...';
    }

    if (micSubHint) micSubHint.textContent = 'Whisper ASR & IndicTrans2 1B translation in progress';
  }
  window.stopCraftRecording = () => stopRecordingAudio(false);

  async function processRecordedVoice(blob) {
    const recordedSec = Math.max(1, recordingSeconds);
    if (recordedAudioTitle) {
      recordedAudioTitle.textContent = `Recorded Spoken Audio (${formatDuration(recordedSec)})`;
    }

    try {
      const voiceResult = await aiClient.transcribeAndTranslate(blob, currentCraftData.spokenStoryBhojpuri, 'bho_Deva');
      if (micStatus) micStatus.textContent = `✓ Whisper transcribed • IndicTrans2 1B translated (${formatDuration(recordedSec)})`;
      if (micSubHint) micSubHint.textContent = 'Voice story successfully captured and translated for global buyers';

      if (transPara && voiceResult.translation) {
        transPara.textContent = `"${voiceResult.translation}"`;
        currentCraftData.englishTranslation = voiceResult.translation;
      }

      if (voiceResult.transcription) {
        currentCraftData.spokenStoryBhojpuri = voiceResult.transcription;
        const manualHindi = container.querySelector('#input-manual-craft-story');
        if (manualHindi) manualHindi.value = voiceResult.transcription;
      }

      const manualEng = container.querySelector('#input-manual-craft-english');
      if (manualEng && voiceResult.translation) {
        manualEng.value = voiceResult.translation;
      }

      window.showToast?.('Transcribed by Whisper & translated by IndicTrans2 1B!');
    } catch (err) {
      console.warn('Voice processing error:', err);
      if (micStatus) micStatus.textContent = 'Recording saved • Tap mic to record again';
    }
  }

  async function startRecordingAudio() {
    isRecording = true;
    recordingSeconds = 0;
    audioChunks = [];

    if (timerDisplay) timerDisplay.textContent = '00:00 / 02:00';
    if (progressBar) progressBar.style.width = '0%';

    // Pulsing recording UI
    if (btnMic) {
      btnMic.style.background = '#DC2626';
      btnMic.style.boxShadow = '0 0 0 6px rgba(220, 38, 38, 0.25)';
      // Stop button icon
      btnMic.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>
      `;
    }

    if (micStatus) micStatus.textContent = '🔴 Recording oral heritage... Speak now';
    if (micSubHint) micSubHint.textContent = 'Tap red button to finish • Auto-stops at 2 minutes';

    // Start 1-second interval timer enforcing 2-minute maximum
    recordingInterval = setInterval(() => {
      recordingSeconds++;
      if (timerDisplay) {
        timerDisplay.textContent = `${formatDuration(recordingSeconds)} / 02:00`;
      }
      if (progressBar) {
        const pct = Math.min(100, (recordingSeconds / MAX_RECORDING_SECONDS) * 100);
        progressBar.style.width = `${pct}%`;
      }

      updateWaveformVisuals(true);

      // Enforce 2 minutes (120 seconds) maximum limit
      if (recordingSeconds >= MAX_RECORDING_SECONDS) {
        stopRecordingAudio(true);
      }
    }, 1000);

    // Try real microphone access via MediaRecorder
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioStream = stream;
        mediaRecorder = new MediaRecorder(stream);
        audioChunks = [];

        mediaRecorder.ondataavailable = (e) => {
          if (e.data && e.data.size > 0) {
            audioChunks.push(e.data);
          }
        };

        mediaRecorder.onstop = () => {
          const blob = new Blob(audioChunks, { type: 'audio/webm' });
          recordedAudioBlob = blob;
          recordedAudioUrl = URL.createObjectURL(blob);
          processRecordedVoice(blob);
        };

        mediaRecorder.start(250);
        window.showToast?.('🎙️ Microphone active: Recording audio for up to 2 minutes...');
      } catch (micErr) {
        console.warn('Microphone permission notice (running simulated voice track):', micErr);
        window.showToast?.('🎙️ Recording oral heritage (simulated timer active for up to 2 min)...');
      }
    } else {
      window.showToast?.('🎙️ Recording oral heritage (timer active for up to 2 min)...');
    }
  }

  btnMic?.addEventListener('click', () => {
    if (isRecording) {
      stopRecordingAudio(false);
    } else {
      startRecordingAudio();
    }
  });

  // Play spoken audio: Plays real recorded audio if available, else speaks via AudioAssistance
  btnPlaySpoken?.addEventListener('click', () => {
    if (activeAudioPlayer) {
      activeAudioPlayer.pause();
      activeAudioPlayer = null;
      if (playSpokenIcon) playSpokenIcon.innerHTML = `<polygon points="5 3 19 12 5 21 5 3"/>`;
      return;
    }

    if (recordedAudioUrl) {
      activeAudioPlayer = new Audio(recordedAudioUrl);
      if (playSpokenIcon) {
        playSpokenIcon.innerHTML = `<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>`;
      }
      activeAudioPlayer.onended = () => {
        activeAudioPlayer = null;
        if (playSpokenIcon) playSpokenIcon.innerHTML = `<polygon points="5 3 19 12 5 21 5 3"/>`;
      };
      activeAudioPlayer.play().catch(e => {
        console.warn('Audio playback error:', e);
        AudioAssistance.speak(currentCraftData.spokenStoryBhojpuri);
      });
    } else {
      AudioAssistance.speak(currentCraftData.spokenStoryBhojpuri);
    }
  });

  container.querySelector('#btn-rerecord-voice')?.addEventListener('click', () => {
    if (isRecording) stopRecordingAudio(false);
    if (activeAudioPlayer) {
      activeAudioPlayer.pause();
      activeAudioPlayer = null;
    }
    recordedAudioBlob = null;
    recordedAudioUrl = null;
    recordingSeconds = 0;
    if (timerDisplay) timerDisplay.textContent = '00:00 / 02:00';
    if (progressBar) progressBar.style.width = '0%';
    if (micStatus) micStatus.textContent = 'Tap microphone to record story (Max 2 minutes)';
    if (micSubHint) micSubHint.textContent = 'Speak in Bhojpuri, Hindi, or any native tongue • Whisper AI will transcribe';
    window.showToast?.('Reset audio recording. Tap microphone to record a fresh 2-minute take.');
  });

  container.querySelector('#btn-play-english-translation')?.addEventListener('click', () => {
    AudioAssistance.speak(currentCraftData.englishTranslation, 'en-IN');
  });

  // Mode Switching: Voice Story vs Manual Input
  const tabVoice = container.querySelector('#tab-voice-story');
  const tabManual = container.querySelector('#tab-manual-story');
  const contVoice = container.querySelector('#container-voice-story');
  const contManual = container.querySelector('#container-manual-story');
  const inputManualTitle = container.querySelector('#input-manual-craft-title');
  const inputManualStory = container.querySelector('#input-manual-craft-story');
  const inputManualEnglish = container.querySelector('#input-manual-craft-english');
  const craftTitleDisplay = container.querySelector('#craft-title-display');

  tabVoice?.addEventListener('click', () => {
    tabVoice.style.background = '#7A2813';
    tabVoice.style.color = '#FFFFFF';
    tabVoice.style.boxShadow = '0 2px 4px rgba(122,40,19,0.2)';
    tabManual.style.background = '#EAE5DE';
    tabManual.style.color = '#2E251F';
    tabManual.style.boxShadow = 'none';
    if (contVoice) contVoice.style.display = 'block';
    if (contManual) contManual.style.display = 'none';
  });

  tabManual?.addEventListener('click', () => {
    tabManual.style.background = '#7A2813';
    tabManual.style.color = '#FFFFFF';
    tabManual.style.boxShadow = '0 2px 4px rgba(122,40,19,0.2)';
    tabVoice.style.background = '#EAE5DE';
    tabVoice.style.color = '#2E251F';
    tabVoice.style.boxShadow = 'none';
    if (contVoice) contVoice.style.display = 'none';
    if (contManual) contManual.style.display = 'flex';
    inputManualTitle?.focus();
    window.showToast?.("Manual craft input active. Type your title & story directly.");
  });

  inputManualTitle?.addEventListener('input', (e) => {
    const val = e.target.value.trim();
    currentCraftData.title = val || 'Traditional Handicraft Piece';
    if (craftTitleDisplay) craftTitleDisplay.textContent = currentCraftData.title;
  });

  inputManualStory?.addEventListener('input', (e) => {
    currentCraftData.storyHindi = e.target.value;
    currentCraftData.spokenHindi = e.target.value;
  });

  inputManualEnglish?.addEventListener('input', (e) => {
    currentCraftData.englishTranslation = e.target.value;
    if (transPara) transPara.textContent = `"${e.target.value}"`;
  });

  // ==========================================
  // 4. Price Prediction: XGBoost controls
  // ==========================================
  const sliderFill = container.querySelector('#price-slider-fill');
  const sliderKnob = container.querySelector('#price-slider-knob');
  const inputListingPrice = container.querySelector('#input-listing-price');

  function updateSliderPosition(price) {
    const min = 650;
    const max = 950;
    const pct = Math.max(5, Math.min(95, Math.round(((price - min) / (max - min)) * 100)));
    if (sliderFill) sliderFill.style.width = `${pct}%`;
    if (sliderKnob) sliderKnob.style.left = `${pct}%`;
  }

  inputListingPrice?.addEventListener('input', (e) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val > 0) {
      listingPrice = val;
      updateSliderPosition(listingPrice);
    }
  });

  container.querySelector('#btn-price-minus')?.addEventListener('click', () => {
    if (listingPrice > 650) {
      listingPrice -= 10;
      if (inputListingPrice) inputListingPrice.value = listingPrice;
      updateSliderPosition(listingPrice);
    }
  });

  container.querySelector('#btn-price-plus')?.addEventListener('click', () => {
    if (listingPrice < 950) {
      listingPrice += 10;
      if (inputListingPrice) inputListingPrice.value = listingPrice;
      updateSliderPosition(listingPrice);
    }
  });

  container.querySelector('#btn-listen-breakdown')?.addEventListener('click', () => {
    AudioAssistance.speak(`लागत का विवरण: कच्चा माल ₹${currentCraftData.rawMaterialCost}, 16 घंटे हस्तशिल्प ₹${currentCraftData.hoursCost}, भट्टी की आग और हानि रिज़र्व ₹${currentCraftData.kilnCost}। कुल मूल्य ₹${listingPrice}।`);
  });

  // Publish Craft to Marketplace: Actually Produce Product
  container.querySelector('#btn-publish-craft')?.addEventListener('click', () => {
    const finalTitle = inputManualTitle?.value?.trim() || currentCraftData.title || 'Handcrafted Gorakhpur Terracotta Pitcher';
    const finalStory = inputManualStory?.value?.trim() || currentCraftData.storyHindi || '';
    const finalEnglish = inputManualEnglish?.value?.trim() || currentCraftData.englishTranslation || '';
    const finalImage = enhancedProductImageUrl || (rawPhotoImg?.src && !rawPhotoImg.src.includes('raw_pottery_snap') ? rawPhotoImg.src : '/assets/terracotta_pitcher.jpg');

    const verifiedTagsList = craftDetailsList.filter(d => d.verified).map(d => d.label);

    const producedCraft = State.publishCraft({
      title: finalTitle,
      subtitle: currentCraftData.subtitle || 'Handcrafted Terracotta Surahi',
      category: currentCraftData.category || 'Terracotta Pottery',
      cluster: currentCraftData.cluster || 'Gorakhpur Clay Cluster (GI #182)',
      price: listingPrice,
      stock: 12,
      rawMaterialCost: currentCraftData.rawMaterialCost || 140,
      hoursCost: currentCraftData.hoursCost || 420,
      kilnCost: currentCraftData.kilnCost || 110,
      storyHindi: finalStory,
      englishTranslation: finalEnglish,
      image: finalImage,
      verifiedAttributes: verifiedTagsList
    });

    AudioAssistance.speak(`बधाई हो! आपकी शिल्प '${finalTitle}' अब मार्केटप्लेस में सफलतापूर्वक निर्मित और प्रकाशित हो गई है।`);
    window.showToast?.(`🎉 Craft Produced! '${finalTitle}' is now live in the marketplace at ₹${listingPrice}.`);

    setTimeout(() => {
      window.navigateToScreen('artisan_studio');
    }, 700);
  });
}
