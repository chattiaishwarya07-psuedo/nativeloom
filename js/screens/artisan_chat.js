/**
 * Screen: Direct Talk / Artisan Live Chat
 * Real-time direct communication channel between Buyer Patron & Master Artisan
 */

import { State } from '../state.js';
import { AudioAssistance } from '../speech.js';

export function renderArtisanChatScreen(container) {
  const artisan = State.activeChatArtisan || {
    name: 'Ramdev Kumhar',
    craft: 'Master Terracotta Craftsman',
    cluster: 'Chunar Cluster, Uttar Pradesh',
    avatar: '/assets/artisan_ramulu.jpg',
    pehchanId: 'UP-VAR-49281',
    phone: '+91 94150 28910',
    years: '35 Yrs'
  };

  let messages = [
    {
      sender: 'artisan',
      time: '10:15 AM',
      textHindi: 'प्रणाम जी! 🙏 हस्तशिल्प संगम में आपका स्वागत है। मैं चुनार की अपनी कुम्हारशाला में चाक पर मिट्टी की सुराही गढ़ रहा हूँ। क्या आप किसी खास शिल्प के बारे में जानना चाहते हैं?',
      text: 'Greetings! 🙏 Welcome to Native Loom. I am currently at my wheel in our Chunar pottery workshop shaping natural riverbed surahis. How can I craft something special for your home?',
      hasAudio: true,
      audioText: 'प्रणाम जी! हस्तशिल्प संगम में आपका स्वागत है। मैं चुनार की अपनी कुम्हारशाला में चाक पर मिट्टी की सुराही गढ़ रहा हूँ।'
    },
    {
      sender: 'artisan',
      time: '10:16 AM',
      image: '/assets/terracotta_pitcher.jpg',
      caption: 'Freshly wheel-turned terracotta surahi with traditional sun-flora etching, sun-drying under neem shade.'
    },
    {
      sender: 'user',
      time: '10:18 AM',
      text: 'Namaste Ramdev Ji! Can this water pitcher be kept outdoors in summer, and how cold does it keep the water?'
    },
    {
      sender: 'artisan',
      time: '10:19 AM',
      textHindi: 'हाँ बिल्कुल! यह गंगा किनारे की शुद्ध जलोढ़ मिट्टी से बनी है। इसके प्राकृतिक छिद्र लगातार पानी को 4 से 6 डिग्री तक प्राकृतिक रूप से ठंडा रखते हैं, बिना किसी बिजली के।',
      text: 'Yes absolutely! Made from pure Gangetic alluvial clay, the natural micropores constantly evaporate water, cooling it by 4°C to 6°C without any electricity.',
      hasAudio: true,
      audioText: 'हाँ बिल्कुल! यह गंगा किनारे की शुद्ध मिट्टी से बनी है। इसके प्राकृतिक छिद्र पानी को 4 से 6 डिग्री तक ठंडा रखते हैं।'
    }
  ];

  container.innerHTML = `
    <div class="artisan-chat-screen animate-fade-in" style="display:flex; flex-direction:column; height:calc(100vh - 65px); max-width:480px; margin:0 auto; background:#FAF7F2; position:relative;">
      
      <!-- Chat Header -->
      <div style="background:#FFFFFF; border-bottom:1px solid #ECE7E1; padding:10px 14px; display:flex; align-items:center; justify-content:space-between; position:sticky; top:0; z-index:10; box-shadow:0 1px 3px rgba(0,0,0,0.03);">
        
        <div style="display:flex; align-items:center; gap:10px;">
          <!-- Back button -->
          <button type="button" id="btn-chat-back" style="background:#F5EEE7; border:none; border-radius:50%; width:32px; height:32px; display:flex; align-items:center; justify-content:center; cursor:pointer; color:#7A2813;" title="Back to Market">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>

          <!-- Avatar with Online indicator -->
          <div style="position:relative; width:40px; height:40px; flex-shrink:0;">
            <img src="${artisan.avatar}" alt="${artisan.name}" style="width:100%; height:100%; object-fit:cover; border-radius:50%; border:1.5px solid #7A2813;" onerror="this.src='/assets/artisan_budhram.jpg'">
            <span style="position:absolute; bottom:0; right:0; width:10px; height:10px; background:#16A34A; border:2px solid #FFFFFF; border-radius:50%;"></span>
          </div>

          <div>
            <div style="display:flex; align-items:center; gap:5px;">
              <span style="font-size:0.92rem; font-weight:900; color:#1C1917;">${artisan.name}</span>
              <span style="background:#E7F7ED; color:#15803D; font-size:0.58rem; font-weight:800; padding:1px 6px; border-radius:9999px;">✓ Verified</span>
            </div>
            <div style="font-size:0.68rem; color:#78716C; line-height:1.2;">
              ${artisan.craft} • 📍 ${artisan.cluster}
            </div>
          </div>
        </div>

        <!-- Header Actions: Direct Call & Voice Guide -->
        <div style="display:flex; align-items:center; gap:6px;">
          <button type="button" id="btn-call-artisan" style="background:#FAF2EB; border:1px solid #EADBCE; border-radius:50%; width:34px; height:34px; display:flex; align-items:center; justify-content:center; color:#7A2813; cursor:pointer;" title="Call Master Artisan">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          </button>
        </div>

      </div>

      <!-- Verified Direct Guild Channel Banner -->
      <div style="background:#FFF8F3; border-bottom:1px solid #F5EAE1; padding:7px 12px; display:flex; align-items:center; justify-content:space-between; font-size:0.68rem;">
        <span style="color:#7A2813; font-weight:700; display:flex; align-items:center; gap:4px;">
          <span>🤝</span>
          <span>100% Direct Channel (Zero Intermediary Fees)</span>
        </span>
        <span style="color:#78716C; font-size:0.64rem;">ID: ${artisan.pehchanId}</span>
      </div>

      <!-- Messages Stream Area -->
      <div id="chat-messages-container" style="flex:1; overflow-y:auto; padding:12px 14px; display:flex; flex-direction:column; gap:12px;">
        
        <!-- Timestamp separator -->
        <div style="text-align:center; margin:4px 0;">
          <span style="background:#ECE7E1; color:#57534E; font-size:0.6rem; font-weight:700; padding:2px 10px; border-radius:9999px;">
            TODAY • DIRECT PATRON TALK
          </span>
        </div>

        ${messages.map((m, idx) => `
          <div style="display:flex; flex-direction:column; align-items:${m.sender === 'user' ? 'flex-end' : 'flex-start'};">
            
            <div style="max-width:82%; border-radius:${m.sender === 'user' ? '14px 14px 2px 14px' : '14px 14px 14px 2px'}; padding:10px 12px; ${m.sender === 'user' ? 'background:#7A2813; color:#FFFFFF;' : 'background:#FFFFFF; color:#1C1917; border:1px solid #ECE7E1; box-shadow:0 1px 3px rgba(0,0,0,0.02);'}">
              
              ${m.image ? `
                <div style="border-radius:8px; overflow:hidden; margin-bottom:6px; border:1px solid #ECE7E1;">
                  <img src="${m.image}" alt="Craft Snapshot" style="width:100%; height:130px; object-fit:cover; display:block;">
                </div>
                ${m.caption ? `<div style="font-size:0.72rem; line-height:1.35; color:#57534E; margin-bottom:4px;">${m.caption}</div>` : ''}
              ` : ''}

              ${m.textHindi ? `
                <div style="font-size:0.75rem; font-weight:700; line-height:1.35; margin-bottom:4px; color:${m.sender === 'user' ? '#FFE8DC' : '#7A2813'};">
                  ${m.textHindi}
                </div>
              ` : ''}

              ${m.text ? `
                <div style="font-size:0.78rem; line-height:1.4; color:${m.sender === 'user' ? '#FFFFFF' : '#1C1917'};">
                  ${m.text}
                </div>
              ` : ''}

              ${m.hasAudio ? `
                <button type="button" class="btn-play-voice-msg" data-audio="${encodeURIComponent(m.audioText || m.text)}" style="margin-top:6px; background:#FAF2EB; border:1px solid #EADBCE; border-radius:9999px; padding:3px 10px; font-size:0.65rem; font-weight:800; color:#7A2813; display:inline-flex; align-items:center; gap:4px; cursor:pointer;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
                  <span>Listen Audio</span>
                </button>
              ` : ''}

            </div>

            <div style="font-size:0.6rem; color:#A8A29E; margin-top:3px; padding:0 4px;">
              ${m.time}
            </div>

          </div>
        `).join('')}

      </div>

      <!-- Quick Suggestion Chips -->
      <div style="padding:4px 12px 6px; display:flex; gap:6px; overflow-x:auto; background:#FAF7F2; border-top:1px solid #F0EAE3;">
        <button type="button" class="quick-chip" data-msg="How long does it take to wheel-turn this pitcher?" style="background:#FFFFFF; border:1px solid #E5DCD3; border-radius:9999px; padding:5px 12px; font-size:0.68rem; font-weight:700; color:#57534E; white-space:nowrap; cursor:pointer;">
          ⏳ How long to craft?
        </button>
        <button type="button" class="quick-chip" data-msg="Can I get 2 units customized with my family name?" style="background:#FFFFFF; border:1px solid #E5DCD3; border-radius:9999px; padding:5px 12px; font-size:0.68rem; font-weight:700; color:#57534E; white-space:nowrap; cursor:pointer;">
          ✨ Can you customize with name?
        </button>
        <button type="button" class="quick-chip" data-msg="How should I clean and season raw terracotta?" style="background:#FFFFFF; border:1px solid #E5DCD3; border-radius:9999px; padding:5px 12px; font-size:0.68rem; font-weight:700; color:#57534E; white-space:nowrap; cursor:pointer;">
          🧼 Pottery care guide
        </button>
      </div>

      <!-- Message Input Bar -->
      <div style="background:#FFFFFF; border-top:1px solid #ECE7E1; padding:8px 12px 14px; display:flex; align-items:center; gap:8px;">
        
        <!-- Voice Input simulation button -->
        <button type="button" id="btn-voice-input" style="background:#FAF2EB; border:1px solid #EADBCE; border-radius:50%; width:38px; height:38px; display:flex; align-items:center; justify-content:center; color:#7A2813; cursor:pointer; flex-shrink:0;" title="Speak in Hindi/English/Regional">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
        </button>

        <!-- Text Input Field -->
        <div style="flex:1; position:relative;">
          <input type="text" id="chat-input-text" placeholder="Write message to Ramdev Kumhar..." style="width:100%; background:#FAF7F2; border:1px solid #E5DCD3; border-radius:20px; padding:9px 14px; font-size:0.78rem; outline:none; box-sizing:border-box;">
        </div>

        <!-- Send Button -->
        <button type="button" id="btn-chat-send" style="background:#7A2813; border:none; border-radius:50%; width:38px; height:38px; display:flex; align-items:center; justify-content:center; color:#FFFFFF; cursor:pointer; flex-shrink:0;" title="Send Message">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" x2="11" y1="2" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </button>

      </div>

    </div>
  `;

  // Attach Event Handlers
  const backBtn = container.querySelector('#btn-chat-back');
  backBtn?.addEventListener('click', () => {
    window.navigateToScreen('explore');
  });

  const callBtn = container.querySelector('#btn-call-artisan');
  callBtn?.addEventListener('click', () => {
    window.showToast?.(`Connecting direct phone line to Master ${artisan.name} (${artisan.phone})... 📞`);
  });

  // Audio Play Buttons on Messages
  container.querySelectorAll('.btn-play-voice-msg').forEach(btn => {
    btn.addEventListener('click', () => {
      const audioText = decodeURIComponent(btn.dataset.audio);
      AudioAssistance.speak(audioText, "hi-IN");
    });
  });

  // Sending Messages
  const input = container.querySelector('#chat-input-text');
  const sendBtn = container.querySelector('#btn-chat-send');
  const msgContainer = container.querySelector('#chat-messages-container');

  function sendMessage(text) {
    if (!text || !text.trim()) return;

    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Append user message
    const userMsgHtml = `
      <div style="display:flex; flex-direction:column; align-items:flex-end;">
        <div style="max-width:82%; border-radius:14px 14px 2px 14px; padding:10px 12px; background:#7A2813; color:#FFFFFF;">
          <div style="font-size:0.78rem; line-height:1.4;">${text}</div>
        </div>
        <div style="font-size:0.6rem; color:#A8A29E; margin-top:3px; padding:0 4px;">${timeNow}</div>
      </div>
    `;
    msgContainer.insertAdjacentHTML('beforeend', userMsgHtml);
    input.value = '';
    msgContainer.scrollTop = msgContainer.scrollHeight;

    // Simulate artisan reply after 1s
    setTimeout(() => {
      const typingHtml = `
        <div id="artisan-typing-indicator" style="display:flex; align-items:center; gap:6px; background:#FFFFFF; border:1px solid #ECE7E1; border-radius:14px; padding:8px 12px; width:fit-content; margin-bottom:4px;">
          <span style="font-size:0.7rem; color:#78716C;">${artisan.name} is replying...</span>
          <span style="display:inline-flex; gap:2px;">
            <span style="width:4px; height:4px; background:#7A2813; border-radius:50%; animation:pulse 1s infinite;"></span>
            <span style="width:4px; height:4px; background:#7A2813; border-radius:50%; animation:pulse 1s infinite 0.2s;"></span>
            <span style="width:4px; height:4px; background:#7A2813; border-radius:50%; animation:pulse 1s infinite 0.4s;"></span>
          </span>
        </div>
      `;
      msgContainer.insertAdjacentHTML('beforeend', typingHtml);
      msgContainer.scrollTop = msgContainer.scrollHeight;

      setTimeout(() => {
        container.querySelector('#artisan-typing-indicator')?.remove();

        const replies = [
          {
            hindi: "जी धन्यवाद! हमारे यहाँ प्रत्येक बर्तन हाथ से चाक पर गढ़ा जाता है। 2 दिन धूप में सूखने के बाद इसे लकड़ी के भट्ठे में पकाया जाता है।",
            eng: "Thank you! Every piece is handcrafted individually on our wheel. After 2 days of sun drying under neem shade, it undergoes traditional wood kiln firing.",
            audio: "जी धन्यवाद! हमारे यहाँ प्रत्येक बर्तन हाथ से चाक पर गढ़ा जाता है।"
          },
          {
            hindi: "ज़रूर! हम आपके नाम की नक्काशी भी कर सकते हैं। आप जब चाहें ऑर्डर कर सकते हैं, हम 48 घंटे में स्पीड पोस्ट से डिस्पैच कर देंगे।",
            eng: "Certainly! We can hand-etch customized initials or family names. You can place your order anytime, and we will dispatch it via India Post Speed Post within 48 hours.",
            audio: "ज़रूर! हम आपके नाम की नक्काशी भी कर सकते हैं। हम 48 घंटे में स्पीड पोस्ट से डिस्पैच कर देंगे।"
          }
        ];
        const r = replies[Math.floor(Math.random() * replies.length)];
        const replyTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const replyHtml = `
          <div style="display:flex; flex-direction:column; align-items:flex-start;">
            <div style="max-width:82%; border-radius:14px 14px 14px 2px; padding:10px 12px; background:#FFFFFF; color:#1C1917; border:1px solid #ECE7E1; box-shadow:0 1px 3px rgba(0,0,0,0.02);">
              <div style="font-size:0.75rem; font-weight:700; line-height:1.35; margin-bottom:4px; color:#7A2813;">${r.hindi}</div>
              <div style="font-size:0.78rem; line-height:1.4; color:#1C1917;">${r.eng}</div>
              <button type="button" class="btn-play-voice-msg" data-audio="${encodeURIComponent(r.audio)}" style="margin-top:6px; background:#FAF2EB; border:1px solid #EADBCE; border-radius:9999px; padding:3px 10px; font-size:0.65rem; font-weight:800; color:#7A2813; display:inline-flex; align-items:center; gap:4px; cursor:pointer;" onclick="window.AudioAssistance?.speak('${r.audio}', 'hi-IN')">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
                <span>Listen Audio</span>
              </button>
            </div>
            <div style="font-size:0.6rem; color:#A8A29E; margin-top:3px; padding:0 4px;">${replyTime}</div>
          </div>
        `;
        msgContainer.insertAdjacentHTML('beforeend', replyHtml);
        msgContainer.scrollTop = msgContainer.scrollHeight;
        window.showToast?.(`New message from Master ${artisan.name} 💬`);
      }, 1000);
    }, 800);
  }

  sendBtn?.addEventListener('click', () => sendMessage(input.value));
  input?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendMessage(input.value);
  });

  // Suggestion chips
  container.querySelectorAll('.quick-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      sendMessage(chip.dataset.msg);
    });
  });

  // Voice speech simulation button
  const voiceBtn = container.querySelector('#btn-voice-input');
  voiceBtn?.addEventListener('click', () => {
    window.showToast?.("🎙️ Microphone active: Speak in Hindi, English, or your local dialect...");
    setTimeout(() => {
      input.value = "Ramdev Ji, I want to know about your natural clay pottery.";
      sendMessage(input.value);
    }, 1500);
  });
}
