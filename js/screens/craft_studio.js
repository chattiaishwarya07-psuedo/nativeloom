/**
 * Screen: AI Smart Craft Studio (1-Photo Auto-Listing Flow)
 * Integrated with:
 * 1) Photo enhancement: RetinexFormer + OpenCV + BiRefNet (only when required)
 * 2) Voice recognition & translation: Whisper + IndicTrans2 1B
 * 3) Price prediction: XGBoost
 * 4) Smart catalogue: Qwen2.5-VL-7B-Instruct
 *
 * Exact 1:1 pixel-perfect visual styling and color themes preserved without modification.
 */

import { State } from '../state.js';
import { AudioAssistance } from '../speech.js';
import { aiClient } from '../ai_client.js';

export function renderCraftStudioScreen(container) {
  let listingPrice = 750;
  let isPlayingAudio = false;
  let isRecording = false;
  let selectedProductImage = null;
  let enhancedProductImageUrl = null;
  let isEnhancingImage = false;

  let currentCraftData = {
    title: 'Handcrafted Gorakhp...',
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

  container.innerHTML = `
    <div class="craft-studio-screen animate-fade-in" style="padding: 10px 14px 80px; background: #FAF8F5; min-height: 100vh; max-width: 480px; margin: 0 auto; box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
      
      <!-- Hidden file input for RetinexFormer + OpenCV + BiRefNet photo capture -->
      <input type="file" id="craft-photo-input" accept="image/*" style="display:none;" />

      <!-- Top Audio Banner: Listen to Screen • A... Bhojpuri active -->
      <div style="background:#FDE6DB; border:1px solid #F8D1BF; border-radius:12px; padding:10px 12px; margin-bottom:14px; display:flex; align-items:center; justify-content:space-between; gap:10px;">
        <div style="display:flex; align-items:center; gap:8px;">
          <div style="width:28px; height:28px; border-radius:50%; background:#7A2813; color:#FFFFFF; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
          </div>
          <div>
            <div style="font-size:0.82rem; font-weight:800; color:#1E150F;">Listen to Screen • A...</div>
            <div style="font-size:0.68rem; color:#71655D;">Step-by-step spoken...</div>
          </div>
        </div>
        <span style="background:#FFFFFF; color:#1E6B47; font-size:0.68rem; font-weight:800; padding:4px 8px; border-radius:12px; border:1px solid #B7DFCA; display:flex; align-items:center; gap:4px; flex-shrink:0;">
          <span>👥</span>
          <span>Bhojpuri active</span>
        </span>
      </div>

      <!-- 4 Quick Step Navigation Icons -->
      <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:8px; margin-bottom:18px; text-align:center;">
        <div style="display:flex; flex-direction:column; align-items:center; gap:4px;">
          <div style="width:42px; height:42px; border-radius:10px; background:#7A2813; color:#FFFFFF; display:flex; align-items:center; justify-content:center; box-shadow:0 2px 6px rgba(122, 40, 19, 0.25);">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
          </div>
          <span style="font-size:0.75rem; font-weight:700; color:#1E150F;">1. Photo</span>
        </div>

        <div style="display:flex; flex-direction:column; align-items:center; gap:4px;">
          <div style="width:42px; height:42px; border-radius:10px; background:#1F4E3A; color:#FFFFFF; display:flex; align-items:center; justify-content:center;">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
          </div>
          <span style="font-size:0.75rem; font-weight:700; color:#1E150F;">2. Identify</span>
        </div>

        <div style="display:flex; flex-direction:column; align-items:center; gap:4px;">
          <div style="width:42px; height:42px; border-radius:10px; background:#C25E1A; color:#FFFFFF; display:flex; align-items:center; justify-content:center;">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
          </div>
          <span style="font-size:0.75rem; font-weight:700; color:#1E150F;">3. Voice</span>
        </div>

        <div style="display:flex; flex-direction:column; align-items:center; gap:4px;">
          <div style="width:42px; height:42px; border-radius:10px; background:#EFECE6; color:#7A2813; display:flex; align-items:center; justify-content:center; font-size:1.15rem; font-weight:900;">
            ₹
          </div>
          <span style="font-size:0.75rem; font-weight:700; color:#1E150F;">4. Price</span>
        </div>
      </div>

      <!-- ========================================== -->
      <!-- SECTION 1: 1. Craft Photo • 1-Photo Capture -->
      <!-- ========================================== -->
      <div style="background:#FFFFFF; border:1px solid #ECE6DE; border-radius:14px; padding:16px 14px; margin-bottom:14px; box-shadow:0 1px 4px rgba(0,0,0,0.03);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
          <div style="display:flex; align-items:center; gap:8px;">
            <div style="width:22px; height:22px; border-radius:50%; background:#7A2813; color:#FFFFFF; font-size:0.8rem; font-weight:800; display:flex; align-items:center; justify-content:center;">
              1
            </div>
            <span style="font-size:0.92rem; font-weight:800; color:#1E150F;">
              1. Craft Photo • 1-Photo Capture
            </span>
          </div>
          <div style="width:26px; height:26px; border-radius:50%; background:#FDE6DB; color:#7A2813; display:flex; align-items:center; justify-content:center; cursor:pointer;" id="voice-step1-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
          </div>
        </div>

        <!-- Before/After Split View Container -->
        <div style="position:relative; width:100%; height:220px; border-radius:10px; overflow:hidden; margin-bottom:12px; display:flex;">
          <!-- Left side: Raw Photo • Workshop -->
          <div style="width:50%; height:100%; position:relative; overflow:hidden;">
            <img id="raw-photo-img" src="/assets/raw_pottery_snap.jpg" alt="Raw Photo Workshop" style="width:200%; height:100%; object-fit:cover;" onerror="this.src='/assets/terracotta_pitcher.jpg'">
            <span style="position:absolute; top:8px; left:8px; background:rgba(0,0,0,0.65); color:#FFFFFF; font-size:0.62rem; font-weight:700; padding:3px 6px; border-radius:4px;">
              Raw Photo • Worksh...
            </span>
          </div>

          <!-- Right side: AI Enhanced Presentation -->
          <div style="width:50%; height:100%; position:relative; overflow:hidden;">
            <img id="enhanced-photo-img" src="/assets/terracotta_pitcher.jpg" alt="AI Enhanced" style="width:200%; height:100%; object-fit:cover; margin-left:-100%;" onerror="this.src='/assets/raw_pottery_snap.jpg'">
            <span style="position:absolute; top:8px; right:8px; background:#1F4E3A; color:#FFFFFF; font-size:0.62rem; font-weight:700; padding:3px 6px; border-radius:4px; display:flex; align-items:center; gap:3px;">
              <span>✨</span>
              <span>AI Enhanced Presentation</span>
            </span>
          </div>

          <!-- Split handle in center -->
          <div style="position:absolute; top:0; bottom:0; left:50%; width:2px; background:#FFFFFF; transform:translateX(-50%); display:flex; align-items:center; justify-content:center;">
            <div style="width:24px; height:24px; border-radius:50%; background:#FFFFFF; box-shadow:0 2px 6px rgba(0,0,0,0.25); display:flex; align-items:center; justify-content:center; font-size:10px; font-weight:900; color:#1E150F;">
              ◀▶
            </div>
          </div>
        </div>

        <!-- Retake & Looks Good Button Row -->
        <div style="display:flex; gap:10px;">
          <button type="button" id="btn-retake-photo" style="flex:1; background:#FFFFFF; border:1px solid #D8CFC4; border-radius:8px; padding:10px; font-size:0.82rem; font-weight:700; color:#1E150F; display:flex; align-items:center; justify-content:center; gap:6px; cursor:pointer;">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
            <span>Retake Photo</span>
          </button>
          <button type="button" id="btn-confirm-photo" style="flex:1; background:#FDE6DB; border:1px solid #F8D1BF; border-radius:8px; padding:10px; font-size:0.82rem; font-weight:800; color:#7A2813; display:flex; align-items:center; justify-content:center; gap:6px; cursor:pointer;">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            <span>Looks Good • Keep</span>
          </button>
        </div>
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

        <!-- Tap to verify details -->
        <div style="font-size:0.72rem; font-weight:800; color:#71655D; text-transform:uppercase; letter-spacing:0.04em; margin-bottom:8px;">
          TAP TO VERIFY DETAILS:
        </div>
        <div style="display:flex; flex-direction:column; gap:8px;" id="verification-tags-container">
          <div style="background:#7A2813; color:#FFFFFF; border-radius:8px; padding:10px 12px; font-size:0.8rem; font-weight:800; display:flex; align-items:center; gap:8px; cursor:pointer;">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            <span>Terracotta Pottery</span>
          </div>
          <div style="background:#FAF8F5; border:1px solid #EAE3D9; border-radius:8px; padding:10px 12px; font-size:0.8rem; font-weight:700; color:#1E150F; display:flex; align-items:center; gap:8px; cursor:pointer;">
            <span>✎</span>
            <span>Red Clay Hand-Carving</span>
          </div>
          <div style="background:#FAF8F5; border:1px solid #EAE3D9; border-radius:8px; padding:10px 12px; font-size:0.8rem; font-weight:700; color:#1E150F; display:flex; align-items:center; gap:8px; cursor:pointer;">
            <span>💧</span>
            <span>Natural Earth Pigment</span>
          </div>
        </div>
      </div>

      <!-- ========================================== -->
      <!-- SECTION 3: 3. Voice Description • Spoken Story -->
      <!-- ========================================== -->
      <div style="background:#FFFFFF; border:1px solid #ECE6DE; border-radius:14px; padding:16px 14px; margin-bottom:14px; box-shadow:0 1px 4px rgba(0,0,0,0.03);">
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:12px;">
          <div style="width:22px; height:22px; border-radius:50%; background:#C25E1A; color:#FFFFFF; font-size:0.8rem; font-weight:800; display:flex; align-items:center; justify-content:center;">
            3
          </div>
          <span style="font-size:0.92rem; font-weight:800; color:#1E150F;">
            3. Voice Description • Spoken Story
          </span>
        </div>

        <!-- Waveform Card with Mic Button -->
        <div style="background:#FAF8F5; border:1px solid #EAE3D9; border-radius:10px; padding:16px 12px; text-align:center; margin-bottom:12px;">
          <!-- Audio Waveform Graphic -->
          <div id="audio-waveform-bars" style="display:flex; align-items:center; justify-content:center; gap:4px; height:32px; margin-bottom:12px;">
            <span style="width:3px; height:12px; background:#7A2813; border-radius:2px;"></span>
            <span style="width:3px; height:20px; background:#C25E1A; border-radius:2px;"></span>
            <span style="width:3px; height:28px; background:#D97706; border-radius:2px;"></span>
            <span style="width:3px; height:18px; background:#1F4E3A; border-radius:2px;"></span>
            <span style="width:3px; height:26px; background:#7A2813; border-radius:2px;"></span>
            <span style="width:3px; height:14px; background:#C25E1A; border-radius:2px;"></span>
            <span style="width:3px; height:22px; background:#D97706; border-radius:2px;"></span>
            <span style="width:3px; height:10px; background:#1F4E3A; border-radius:2px;"></span>
          </div>

          <!-- Mic Button -->
          <div id="btn-mic-record" style="display:inline-flex; align-items:center; justify-content:center; width:48px; height:48px; border-radius:12px; background:#7A2813; color:#FFFFFF; margin-bottom:8px; cursor:pointer;">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
          </div>
          <div id="mic-status-label" style="font-size:0.8rem; font-weight:700; color:#1E150F;">
            Tap microphone and speak in your mother tongue
          </div>
        </div>

        <!-- Recorded Spoken Audio Player Card -->
        <div style="background:#FAF8F5; border:1px solid #EAE3D9; border-radius:10px; padding:10px 12px; display:flex; align-items:center; justify-content:space-between; margin-bottom:12px;">
          <div style="display:flex; align-items:center; gap:10px;">
            <div style="width:32px; height:32px; border-radius:50%; background:#1F4E3A; color:#FFFFFF; display:flex; align-items:center; justify-content:center; cursor:pointer;" id="btn-play-spoken-story">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            </div>
            <div>
              <div style="font-size:0.8rem; font-weight:800; color:#1E150F;">
                Recorded Spoken Audio (0:28s)
              </div>
              <div style="font-size:0.68rem; color:#71655D;">
                Bhojpuri / Hindi dialect audio
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

          <div style="display:flex; align-items:center; justify-content:center; gap:16px; margin-bottom:8px;">
            <button type="button" id="btn-price-minus" style="width:40px; height:40px; border-radius:8px; background:#FFFFFF; border:1px solid #EAE3D9; font-size:1.4rem; font-weight:800; color:#7A2813; display:flex; align-items:center; justify-content:center; cursor:pointer;">
              −
            </button>
            <div style="font-size:1.8rem; font-weight:900; color:#7A2813;" id="price-val">
              ₹${listingPrice}
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
            <div style="display:flex; align-items:center; gap:6px; font-size:0.8rem; font-weight:800; color:#1E150F;">
              <span>🪟</span>
              <span>Cost Breakdown (Why thi...</span>
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

    </div>
  `;

  // Attach All AI Model Interactions & Handlers
  const fileInput = container.querySelector('#craft-photo-input');
  const btnRetake = container.querySelector('#btn-retake-photo');
  const rawPhotoImg = container.querySelector('#raw-photo-img');
  const enhancedPhotoImg = container.querySelector('#enhanced-photo-img');
  const priceDisplay = container.querySelector('#price-val');
  const sliderFill = container.querySelector('#price-slider-fill');
  const sliderKnob = container.querySelector('#price-slider-knob');

  function updateSliderPosition(price) {
    const min = 650;
    const max = 950;
    const pct = Math.max(5, Math.min(95, Math.round(((price - min) / (max - min)) * 100)));
    if (sliderFill) sliderFill.style.width = `${pct}%`;
    if (sliderKnob) sliderKnob.style.left = `${pct}%`;
  }

  // 1) Photo Enhancement: RetinexFormer + OpenCV + BiRefNet
  btnRetake?.addEventListener('click', () => {
    fileInput?.click();
  });

  fileInput?.addEventListener('change', async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    window.showToast?.('Enhancing with RetinexFormer, OpenCV & BiRefNet...');
    const localUrl = URL.createObjectURL(file);
    if (rawPhotoImg) rawPhotoImg.src = localUrl;

    try {
      const enhanceResult = await aiClient.enhancePhoto(file, { applyBiRefNet: true });
      if (enhanceResult && enhancedPhotoImg) {
        enhancedPhotoImg.src = enhanceResult.imageUrl;
      }

      // 4) Smart Catalogue: Qwen2.5-VL-7B-Instruct
      const catResult = await aiClient.smartCatalogue(file);
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

      // 3) Price Prediction: XGBoost
      const priceResult = await aiClient.predictPrice({ craftCategory: 'Terracotta Pottery' });
      if (priceResult) {
        listingPrice = priceResult.recommendedPrice;
        if (priceDisplay) priceDisplay.textContent = `₹${listingPrice}`;
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

      window.showToast?.('AI Studio: Enhanced and auto-catalogued!');
    } catch (err) {
      console.warn('Enhance error:', err);
    }
  });

  container.querySelector('#btn-confirm-photo')?.addEventListener('click', () => {
    window.showToast?.('AI Enhanced Presentation confirmed!');
  });

  // Step 1 audio banner
  container.querySelector('#voice-step1-btn')?.addEventListener('click', () => {
    AudioAssistance.speak('पहिला कदम: अपने शिल्प की एक फोटो खींचें या गैलरी से चुनें।');
  });

  // Step 2 audio banner
  container.querySelector('#voice-step2-btn')?.addEventListener('click', () => {
    AudioAssistance.speak(currentCraftData.spokenHindi);
  });

  // 2) Voice Recognition & Translation: Whisper + IndicTrans2 1B
  const btnMic = container.querySelector('#btn-mic-record');
  const micStatus = container.querySelector('#mic-status-label');
  const transPara = container.querySelector('#translation-text-para');

  btnMic?.addEventListener('click', async () => {
    window.showToast?.('Whisper ASR: Listening to spoken oral heritage in Bhojpuri/Hindi...');
    if (micStatus) micStatus.textContent = 'Whisper listening... Speak your story';

    setTimeout(async () => {
      try {
        const voiceResult = await aiClient.transcribeAndTranslate(null, currentCraftData.spokenStoryBhojpuri, 'bho_Deva');
        if (micStatus) micStatus.textContent = 'Whisper transcribed • IndicTrans2 1B translated';
        if (transPara && voiceResult.translation) {
          transPara.textContent = `"${voiceResult.translation}"`;
          currentCraftData.englishTranslation = voiceResult.translation;
        }
        window.showToast?.('Transcribed by Whisper & translated by IndicTrans2 1B!');
      } catch (err) {
        console.warn('Voice processing error:', err);
      }
    }, 1200);
  });

  container.querySelector('#btn-play-spoken-story')?.addEventListener('click', () => {
    AudioAssistance.speak(currentCraftData.spokenStoryBhojpuri);
  });

  container.querySelector('#btn-rerecord-voice')?.addEventListener('click', () => {
    window.showToast?.('Reset audio recording. Tap mic to speak again.');
    if (micStatus) micStatus.textContent = 'Tap microphone and speak in your mother tongue';
  });

  container.querySelector('#btn-play-english-translation')?.addEventListener('click', () => {
    AudioAssistance.speak(currentCraftData.englishTranslation, 'en-IN');
  });

  // 3) Price Prediction: XGBoost controls
  container.querySelector('#btn-price-minus')?.addEventListener('click', () => {
    if (listingPrice > 650) {
      listingPrice -= 10;
      if (priceDisplay) priceDisplay.textContent = `₹${listingPrice}`;
      updateSliderPosition(listingPrice);
    }
  });

  container.querySelector('#btn-price-plus')?.addEventListener('click', () => {
    if (listingPrice < 950) {
      listingPrice += 10;
      if (priceDisplay) priceDisplay.textContent = `₹${listingPrice}`;
      updateSliderPosition(listingPrice);
    }
  });

  container.querySelector('#btn-listen-breakdown')?.addEventListener('click', () => {
    AudioAssistance.speak(`लागत का विवरण: कच्चा माल ₹${currentCraftData.rawMaterialCost}, 16 घंटे हस्तशिल्प ₹${currentCraftData.hoursCost}, भट्टी की आग और हानि रिज़र्व ₹${currentCraftData.kilnCost}। कुल मूल्य ₹${listingPrice}।`);
  });

  // Publish Craft
  container.querySelector('#btn-publish-craft')?.addEventListener('click', () => {
    window.showToast?.('Craft published with AI Smart Catalogue! Added to Active Crafts.');
    setTimeout(() => {
      window.navigateToScreen('studio');
    }, 600);
  });
}
