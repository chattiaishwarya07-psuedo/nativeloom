/**
 * Screen: 10 Regional Languages Selection (Listen or Choose Your Language)
 * Exact recreation of User Provided Reference Screenshot (Screen 1)
 */

import { State, AccountType } from '../state.js';
import { AudioAssistance } from '../speech.js';

export const RegionalLanguages = [
  {
    id: 'en',
    native: 'English',
    english: 'English',
    region: 'Pan-India & International Crafts Guide',
    greeting: '"Welcome"',
    tag: 'Standard Interface',
    voiceText: 'Welcome to Native Loom, connecting indigenous artisans directly to patrons.'
  },
  {
    id: 'hi',
    native: 'हिन्दी',
    english: 'Hindi',
    region: 'North & Central India',
    greeting: '"Namaste" • Welcome',
    tag: 'National Official',
    voiceText: 'नमस्ते! नेटिव लूम में आपका स्वागत है।'
  },
  {
    id: 'bn',
    native: 'বাংলা',
    english: 'Bengali',
    region: 'West Bengal & Tripura',
    greeting: '"Nomoshkar" • Welcome',
    tag: 'Handloom & Terracotta',
    voiceText: 'নমস্কার! নেটিভ লুমে আপনাকে স্বাগত।'
  },
  {
    id: 'te',
    native: 'తెలుగు',
    english: 'Telugu',
    region: 'Andhra Pradesh & Telangana',
    greeting: '"Namaskaram" • Welcome',
    tag: 'Kalamkari & Lepakshi',
    voiceText: 'నమస్కారం! నేటివ్ లూమ్‌కు మీకు స్వాగతం.'
  },
  {
    id: 'ta',
    native: 'தமிழ்',
    english: 'Tamil',
    region: 'Tamil Nadu Craft Clusters',
    greeting: '"Vanakkam" • Welcome',
    tag: 'Bronze & Kanchipuram Silk',
    voiceText: 'வணக்கம்! நேட்டிவ் லூமிற்கு உங்களை வரவேற்கிறோம்.'
  },
  {
    id: 'mr',
    native: 'मराठी',
    english: 'Marathi',
    region: 'Maharashtra Craft Clusters',
    greeting: '"Namaskar" • Welcome',
    tag: 'Paithani & Warli',
    voiceText: 'नमस्कार! नेटिव लूम मध्ये आपले स्वागत आहे.'
  },
  {
    id: 'gu',
    native: 'ગુજરાતી',
    english: 'Gujarati',
    region: 'Kutch & Patan Artisan Guilds',
    greeting: '"Namaste" • Welcome',
    tag: 'Ajrakh & Bandhani',
    voiceText: 'નમસ્તે! નેટિવ લૂમમાં આપનું સ્વાગત છે.'
  },
  {
    id: 'kn',
    native: 'ಕನ್ನಡ',
    english: 'Kannada',
    region: 'Karnataka Craft Clusters',
    greeting: '"Namaskara" • Welcome',
    tag: 'Channapatna Toys',
    voiceText: 'ನಮಸ್ಕಾರ! ನೇಟಿವ್ ಲೂಮ್‌ಗೆ ನಿಮಗೆ ಸ್ವಾಗತ.'
  },
  {
    id: 'ml',
    native: 'മലയാളം',
    english: 'Malayalam',
    region: 'Kerala Artisan Weaves',
    greeting: '"Namaskaram" • Welcome',
    tag: 'Aranmula & Bell Metal',
    voiceText: 'നമസ്കാരം! നേറ്റീവ് ലൂമിലേക്ക് സ്വാഗതം.'
  },
  {
    id: 'pa',
    native: 'ਪੰਜਾਬੀ',
    english: 'Punjabi',
    region: 'Punjab Phulkari Clusters',
    greeting: '"Sat Sri Akal" • Welcome',
    tag: 'Phulkari & Jutti',
    voiceText: 'ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ! ਨੇਟਿਵ ਲੂਮ ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ।'
  },
  {
    id: 'or',
    native: 'ଓଡ଼ିଆ',
    english: 'Odia',
    region: 'Odisha Pattachitra & Ikat',
    greeting: '"Namaskar" • Welcome',
    tag: 'Pattachitra & Silver Filigree',
    voiceText: 'ନମସ୍କାର! ନେଟିଭ୍ ଲୁମ୍‌କୁ ଆପଣଙ୍କୁ ସ୍ୱାଗତ।'
  },
  {
    id: 'as',
    native: 'অসমীয়া',
    english: 'Assamese',
    region: 'Assam Muga Silk & Cane',
    greeting: '"Nomoskar" • Welcome',
    tag: 'Muga Silk & Bell Metal',
    voiceText: 'নমস্কাৰ! নেটিভ লুমলৈ আপোনাক স্বাগতম।'
  },
  {
    id: 'ur',
    native: 'اُردُو',
    english: 'Urdu',
    region: 'Kashmir & Lucknow Zari',
    greeting: '"Adaab" • Welcome',
    tag: 'Zardozi & Chikan',
    voiceText: 'آداب! نیٹو لوم میں آپ کا خیر مقدم ہے۔'
  },
  {
    id: 'mai',
    native: 'मैथिली',
    english: 'Maithili',
    region: 'Mithila / Madhubani Region',
    greeting: '"Pranam" • Welcome',
    tag: 'Madhubani Painting',
    voiceText: 'प्रणाम! नेटिव लूम मे अहाँक स्वागत अछि।'
  },
  {
    id: 'ks',
    native: 'कॉशुर',
    english: 'Kashmiri',
    region: 'Kashmir Valley Pashmina',
    greeting: '"Salam" • Welcome',
    tag: 'Pashmina & Walnut Wood',
    voiceText: 'سلام! نیٹو لومس منز خوش آمدید۔'
  },
  {
    id: 'ne',
    native: 'नेपाली',
    english: 'Nepali',
    region: 'Sikkim & Darjeeling Hills',
    greeting: '"Namaste" • Welcome',
    tag: 'Thangka & Himalayan Weaves',
    voiceText: 'नमस्ते! नेटिव लूममा तपाईंलाई स्वागत छ।'
  },
  {
    id: 'sa',
    native: 'संस्कृतम्',
    english: 'Sanskrit',
    region: 'Ancient Heritage Crafts',
    greeting: '"Namaskaraha" • Welcome',
    tag: 'Vedic Shilpa Shastra',
    voiceText: 'नमस्कारः! नेटिव लूम मध्ये भवतां स्वागतम्।'
  },
  {
    id: 'kok',
    native: 'कोंकणी',
    english: 'Konkani',
    region: 'Goa & Coastal Konkan',
    greeting: '"Dev Boro Dis Dinv" • Welcome',
    tag: 'Terracotta & Shell Craft',
    voiceText: 'नमस्कार! नेटिव लूम खातीर तुमकां येवकार।'
  },
  {
    id: 'sd',
    native: 'सिंधी',
    english: 'Sindhi',
    region: 'Sindhi Ajrak Traditions',
    greeting: '"Pranam" • Welcome',
    tag: 'Ajrak & Ralli Quilts',
    voiceText: 'प्रणाम! नेटिव लूम में तव्हां जो सुआगत आहे।'
  },
  {
    id: 'brx',
    native: 'बड़ो',
    english: 'Bodo',
    region: 'Bodoland Weaving Guilds',
    greeting: '"Khulumba" • Welcome',
    tag: 'Aronai & Dokhona',
    voiceText: 'खुलुमबाय! नेटिव लूम आव नोंथांखौ बरायबाय।'
  },
  {
    id: 'doi',
    native: 'डोगरी',
    english: 'Dogri',
    region: 'Jammu Foothill Crafts',
    greeting: '"Namaste" • Welcome',
    tag: 'Basohli Paintings',
    voiceText: 'नमस्ते! नेटिव लूम च थुआड़ा स्वागत ऐ।'
  },
  {
    id: 'sat',
    native: 'ᱥᱟᱱᱛᱟᱲᱤ',
    english: 'Santali',
    region: 'Chota Nagpur Indigenous Arts',
    greeting: '"Johar" • Welcome',
    tag: 'Sohrai & Dhokra',
    voiceText: 'ᱡᱚᱦᱟᱨ! ᱱᱮᱴᱤᱵᱷ ᱞᱩᱢ ᱨᱮ ᱟᱯᱮᱭᱟᱜ ᱥᱟᱹᱜᱩᱱ ᱫᱟᱨᱟᱢ।'
  },
  {
    id: 'bho',
    native: 'भोजपुरी',
    english: 'Bhojpuri',
    region: 'Purvanchal & Bihar',
    greeting: '"Pranam" • Welcome',
    tag: 'Sikki Grass & Tikuli',
    voiceText: 'प्रणाम! नेटिव लूम में राउर सभे के बहुत बहुत स्वागत बा।'
  },
  {
    id: 'mni',
    native: 'মৈতৈলোন্',
    english: 'Manipuri',
    region: 'Manipur Handloom & Kauna Crafts',
    greeting: '"Khurumjari" • Welcome',
    tag: 'Kauna & Shaphee Lanphee',
    voiceText: 'নেটিভ লুমদা তরাম্না ওকচরি, অচুম্বা শিন্মীশিংগা হকথেংননা শম্নহল্লি।'
  }
];

export function renderLanguageScreen(container) {
  let selectedLangId = State.language || 'en';

  let filteredLanguages = [...RegionalLanguages];

  function renderList() {
    if (!filteredLanguages.length) {
      return `
        <div style="text-align:center; padding:24px 12px; background:#FFFFFF; border-radius:12px; border:1px dashed var(--border-subtle);">
          <div style="display:flex; justify-content:center; margin-bottom:6px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
          </div>
          <div style="font-size:0.85rem; font-weight:800; color:var(--text-primary);">Language not found</div>
          <div style="font-size:0.7rem; color:var(--text-secondary);">Try Hindi, English, Tamil, Marathi, or Bhojpuri</div>
        </div>
      `;
    }

    return filteredLanguages.map(lang => {
      const isSel = lang.id === selectedLangId;
      return `
        <div class="lang-card ${isSel ? 'selected' : ''}" data-id="${lang.id}">
          <div style="flex:1;">
            <div style="display:flex; align-items:baseline; gap:6px; margin-bottom:2px;">
              <span style="font-size:1.1rem; font-weight:800;">${lang.native}</span>
              <span style="font-size:0.75rem; font-weight:600; opacity:0.85;">${lang.english}</span>
            </div>
            <div class="lang-sub-text" style="font-size:0.72rem; color:var(--text-secondary); margin-bottom:4px;">
              ${lang.region}
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span class="lang-welcome-text" style="font-size:0.68rem; font-style:italic; color:var(--text-muted);">${lang.greeting}</span>
              <span style="font-size:0.62rem; font-weight:700; ${isSel ? 'color:#FBBF24;' : 'color:var(--color-terracotta);'}">${lang.tag}</span>
            </div>
          </div>

          <div style="display:flex; align-items:center; gap:8px; margin-left:12px;">
            <button type="button" class="lang-audio-round" data-voice="${lang.voiceText}" title="Listen to pronunciation">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
            </button>
            <div class="lang-radio-circle">
              ${isSel ? '✓' : ''}
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  container.innerHTML = `
    <div class="lang-selection-screen animate-fade-in" style="padding-bottom:30px;">



      <!-- Select Language by Voice Box -->
      <div style="background:#FFFFFF; border:1px solid var(--border-subtle); border-radius:var(--radius-lg); padding:14px; margin-bottom:14px; box-shadow:var(--shadow-sm);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
          <span style="font-size:0.88rem; font-weight:800; color:var(--text-primary);">Select Language by Voice</span>
          <span class="badge-amber" style="font-size:0.62rem;">Easy Mode</span>
        </div>
        <p style="font-size:0.74rem; color:var(--text-secondary); margin-bottom:10px;">
          Speak your mother tongue or type below:
        </p>

        <div style="display:flex; gap:8px;">
          <div style="flex:1; display:flex; align-items:center; background:#FAF7F2; border:1px solid var(--border-subtle); border-radius:var(--radius-md); padding:8px 12px; gap:8px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input type="text" id="input-lang-search" placeholder="Search language..." style="flex:1; border:none; outline:none; background:transparent; font-size:0.82rem;">
          </div>
          <button type="button" id="btn-voice-lang" style="width:40px; background:#1C3550; color:#fff; border:none; border-radius:var(--radius-md); display:flex; align-items:center; justify-content:center; cursor:pointer;">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
          </button>
        </div>
      </div>

      <!-- 22+ Regional Languages Available -->
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
        <span style="font-size:0.78rem; font-weight:800; color:var(--text-primary);">22+ Regional Languages Available</span>
        <span style="font-size:0.68rem; color:var(--text-muted); font-weight:600;">All India Dialects</span>
      </div>

      <!-- Languages List -->
      <div id="languages-list-container">
        ${renderList()}
      </div>

      <!-- Save & Continue CTA -->
      <button type="button" class="btn-primary" id="btn-save-lang" style="margin-top:14px; padding:14px;">
        Save Language &amp; Continue →
      </button>

      <div style="font-size:0.7rem; color:var(--text-muted); text-align:center; margin-top:8px;">
        You can change the language anytime from your profile settings
      </div>

    </div>
  `;

  // Attach card selection & audio handlers
  function attachHandlers() {
    container.querySelectorAll('.lang-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.lang-audio-round')) return;
        selectedLangId = card.getAttribute('data-id');
        window.i18n?.setLanguage(selectedLangId);
        container.querySelector('#languages-list-container').innerHTML = renderList();
        attachHandlers();
      });
    });

    container.querySelectorAll('.lang-audio-round').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const text = btn.getAttribute('data-voice');
        const langCard = btn.closest('.lang-card');
        const lid = langCard ? langCard.getAttribute('data-id') : null;
        const voiceLoc = window.i18n?.metadata?.voiceLocale || (lid ? window.i18n?.metadata?.voiceLocale : 'hi-IN');
        AudioAssistance.speak(text, voiceLoc);
      });
    });
  }

  attachHandlers();

  // Manual search input listener
  const langSearchInput = container.querySelector('#input-lang-search');
  langSearchInput?.addEventListener('input', (e) => {
    const q = (e.target.value || '').toLowerCase().trim();
    if (!q) {
      filteredLanguages = [...RegionalLanguages];
    } else {
      filteredLanguages = RegionalLanguages.filter(l =>
        l.native.toLowerCase().includes(q) ||
        l.english.toLowerCase().includes(q) ||
        l.region.toLowerCase().includes(q)
      );
    }
    const listContainer = container.querySelector('#languages-list-container');
    if (listContainer) {
      listContainer.innerHTML = renderList();
      attachHandlers();
    }
  });

  // Voice search trigger
  container.querySelector('#btn-voice-lang').addEventListener('click', () => {
    AudioAssistance.speak(window.i18n ? window.i18n.t('voiceGreetingWelcome') : "कृपया अपनी भाषा बोलें।");
    window.showToast?.("Listening for mother tongue...");
  });

  // Save Language
  container.querySelector('#btn-save-lang')?.addEventListener('click', () => {
    if (window.i18n) {
      window.i18n.setLanguage(selectedLangId);
    } else {
      State.language = selectedLangId;
    }
    const meta = window.i18n?.metadata;
    const toastMsg = selectedLangId === 'en'
      ? `Language saved: English!`
      : `भाषा सुरक्षित: ${meta ? meta.native + ' (' + meta.english + ')' : selectedLangId.toUpperCase()}!`;
    window.showToast?.(toastMsg);
    setTimeout(() => {
      if (State.previousScreen && !['language_select', 'languages', 'splash'].includes(State.previousScreen)) {
        State.setScreen(State.previousScreen);
        return;
      }
      const role = State.session.accountType;
      if (role === AccountType.ARTISAN) State.setScreen('artisan_studio');
      else if (role === AccountType.BUYER) State.setScreen('buyer_explore');
      else if (role === AccountType.CORPORATE) State.setScreen('corporate_clusters');
      else State.setScreen('explore');
    }, 300);
  });
}
