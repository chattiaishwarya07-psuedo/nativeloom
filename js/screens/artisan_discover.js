/**
 * Screen: Artisan Market Discovery (artisan_discover.js)
 * Clean, simple English with minimal words for artisans:
 * 1. Popular Crafts (What buyers are searching for)
 * 2. Big Orders (Bulk direct orders from hotels & companies)
 * 3. Other Artisans (Peer master makers)
 * 4. Craft Melas (Free govt stalls with Pehchan)
 * 5. Material Prices (Fair local rates for clay & fuel)
 */

import { State } from '../state.js';
import { AudioAssistance } from '../speech.js';

export function renderArtisanDiscoverScreen(container) {
  let activeTab = 'demand'; // 'demand' | 'rfqs' | 'guilds' | 'melas' | 'materials'
  let selectedRFQ = null;

  // Other Artisans
  const peers = [
    {
      id: 'ramdev',
      name: 'Ramdev Kumhar (You)',
      craft: 'Clay Pottery & Pots',
      location: 'Varanasi, UP',
      pehchanId: 'UP-VAR-49281',
      trustScore: 98,
      avatar: '/assets/artisan_ramulu.jpg',
      work: 'Water pots (surahi) & festive diyas',
      isSelf: true
    },
    {
      id: 'saleem',
      name: 'Saleem Ahmed',
      craft: 'Metal & Silver Inlay (Bidri)',
      location: 'Bidar, Karnataka',
      pehchanId: 'KA-BID-11092',
      trustScore: 97,
      avatar: '/assets/artisan_saleem.jpg',
      work: 'Silver wire work on dark metal vases',
      isSelf: false
    },
    {
      id: 'sunita',
      name: 'Sunita Devi',
      craft: 'Jaipur Blue Pottery',
      location: 'Jaipur, Rajasthan',
      pehchanId: 'RJ-JAI-77201',
      trustScore: 96,
      avatar: '/assets/artisan_sunita.jpg',
      work: 'Blue ceramic plates, cups & tiles',
      isSelf: false
    },
    {
      id: 'budhram',
      name: 'Budhram Sahu',
      craft: 'Bronze Dhokra Art',
      location: 'Bastar, Chhattisgarh',
      pehchanId: 'CG-BAS-99382',
      trustScore: 99,
      avatar: '/assets/artisan_budhram.jpg',
      work: 'Wax cast bronze tribal figures',
      isSelf: false
    }
  ];

  // Big Orders
  const rfqs = [
    {
      id: 'RFQ-TAJ-8821',
      org: 'Taj Hotel (Varanasi)',
      location: 'For luxury guest rooms',
      logo: '🏛️',
      item: '250 Clay Water Pots (1L Surahi)',
      quantity: 250,
      unitPrice: 1450,
      totalPayout: 362500,
      time: 'Need in 30 Days',
      badge: '50% Advance Paid',
      details: 'Handmade cooling water pots with lid. 100% natural river clay, zero chemical polish.'
    },
    {
      id: 'RFQ-TCS-4920',
      org: 'TCS Company Diwali Gifts',
      location: 'For staff gift boxes',
      logo: '🏢',
      item: '600 Boxes of Clay Diyas (12 in box)',
      quantity: 600,
      unitPrice: 320,
      totalPayout: 192000,
      time: 'Need in 20 Days',
      badge: 'Direct Bank Pay',
      details: 'Clean burning clay diyas with cotton wicks in brown paper boxes.'
    },
    {
      id: 'RFQ-MUS-1029',
      org: 'Crafts Museum Shop (Delhi)',
      location: 'For museum gift shop',
      logo: '🏺',
      item: '80 Sun Design Clay Wall Plates',
      quantity: 80,
      unitPrice: 850,
      totalPayout: 68000,
      time: 'Need in 45 Days',
      badge: 'Govt Order',
      details: 'Traditional round sun plate with hook for wall hanging. Signed by maker.'
    }
  ];

  // Craft Melas
  const melas = [
    {
      id: 'mela-surajkund',
      name: 'Surajkund Crafts Mela',
      place: 'Haryana (Near Delhi)',
      date: '1 Nov – 15 Nov',
      stall: 'Free Stall + ₹15,000 Travel Money',
      left: 14
    },
    {
      id: 'mela-gandhi-shilp',
      name: 'Gandhi Shilp Bazaar',
      place: 'Chowkaghat, Varanasi',
      date: '10 Oct – 24 Oct',
      stall: 'Local Potter Stall (₹500/day)',
      left: 8
    },
    {
      id: 'mela-dilli-haat',
      name: 'Dilli Haat National Mela',
      place: 'INA, New Delhi',
      date: '25 Oct – 8 Nov',
      stall: 'Ministry Free Stall',
      left: 5
    }
  ];

  function renderView() {
    container.innerHTML = `
      <div class="artisan-discover-screen animate-fade-in" style="background:#FAF8F5; min-height:100vh; padding:14px 14px 90px; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color:#1E150F; max-width:500px; margin:0 auto; box-sizing:border-box;">
        
        <!-- Header: Simple & Clear -->
        <div style="background:#FFFFFF; border:1px solid #ECE6DE; border-radius:14px; padding:14px; margin-bottom:12px; box-shadow:0 1px 3px rgba(0,0,0,0.03);">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:6px;">
            <div>
              <div style="display:flex; align-items:center; gap:6px;">
                <span style="font-size:1.15rem; font-weight:900; color:#1E150F;">Market Trends</span>
                <span style="background:#FEECE5; color:#9A3412; font-size:0.65rem; font-weight:800; padding:2px 8px; border-radius:999px;">
                  What Buyers Want
                </span>
              </div>
              <p style="font-size:0.75rem; color:#78716C; margin:3px 0 0 0;">
                See what buyers want and find big orders.
              </p>
            </div>
            
            <!-- Voice Guide Button -->
            <button type="button" class="voice-guide-toggle-btn ${AudioAssistance.isEnabled ? 'vg-on' : 'vg-off'}" id="discover-voice-guide-btn" title="Voice Guide" style="height:28px; border-radius:999px; padding:4px 10px; font-size:0.7rem; font-weight:800; display:inline-flex; align-items:center; gap:5px; cursor:pointer; flex-shrink:0;">
              <span class="vg-icon" style="display:inline-flex; align-items:center;">
                ${AudioAssistance.isEnabled 
                  ? `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>`
                  : `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><line x1="1" y1="1" x2="23" y2="23"/><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 1.7 4.54"/><path d="M19.07 4.93a10 10 0 0 1 .82 12.06"/></svg>`
                }
              </span>
              <span class="vg-label" style="color:#7A2813;">${AudioAssistance.isEnabled ? 'Voice: ON' : 'Voice: OFF'}</span>
            </button>
          </div>

          <!-- Quick 3 Summary Numbers -->
          <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:6px; margin-top:10px; background:#FAF7F2; border-radius:10px; padding:8px; text-align:center;">
            <div>
              <div style="font-size:1.05rem; font-weight:900; color:#7A2813;">+45%</div>
              <div style="font-size:0.65rem; color:#78716C; font-weight:700;">Diwali Rush</div>
            </div>
            <div style="border-left:1px solid #EAE3D9; border-right:1px solid #EAE3D9;">
              <div style="font-size:1.05rem; font-weight:900; color:#1E6B47;">3 Orders</div>
              <div style="font-size:0.65rem; color:#78716C; font-weight:700;">₹6.2 Lakh</div>
            </div>
            <div>
              <div style="font-size:1.05rem; font-weight:900; color:#92400E;">3 Melas</div>
              <div style="font-size:0.65rem; color:#78716C; font-weight:700;">Free Stalls</div>
            </div>
          </div>
        </div>

        <!-- Simple 5 Tabs -->
        <div style="display:flex; gap:6px; overflow-x:auto; padding-bottom:6px; margin-bottom:12px; scrollbar-width:none;">
          <button type="button" class="btn-subnav ${activeTab === 'demand' ? 'active' : ''}" data-tab="demand" style="background:${activeTab === 'demand' ? '#7A2813' : '#FFFFFF'}; color:${activeTab === 'demand' ? '#FFFFFF' : '#44403C'}; border:1px solid ${activeTab === 'demand' ? '#7A2813' : '#E5DCD3'}; border-radius:999px; padding:6px 12px; font-size:0.75rem; font-weight:800; cursor:pointer; white-space:nowrap;">
            🔥 Popular Crafts
          </button>
          <button type="button" class="btn-subnav ${activeTab === 'rfqs' ? 'active' : ''}" data-tab="rfqs" style="background:${activeTab === 'rfqs' ? '#7A2813' : '#FFFFFF'}; color:${activeTab === 'rfqs' ? '#FFFFFF' : '#44403C'}; border:1px solid ${activeTab === 'rfqs' ? '#7A2813' : '#E5DCD3'}; border-radius:999px; padding:6px 12px; font-size:0.75rem; font-weight:800; cursor:pointer; white-space:nowrap;">
            🏢 Big Orders (3)
          </button>
          <button type="button" class="btn-subnav ${activeTab === 'guilds' ? 'active' : ''}" data-tab="guilds" style="background:${activeTab === 'guilds' ? '#7A2813' : '#FFFFFF'}; color:${activeTab === 'guilds' ? '#FFFFFF' : '#44403C'}; border:1px solid ${activeTab === 'guilds' ? '#7A2813' : '#E5DCD3'}; border-radius:999px; padding:6px 12px; font-size:0.75rem; font-weight:800; cursor:pointer; white-space:nowrap;">
            👥 Other Artisans
          </button>
          <button type="button" class="btn-subnav ${activeTab === 'melas' ? 'active' : ''}" data-tab="melas" style="background:${activeTab === 'melas' ? '#7A2813' : '#FFFFFF'}; color:${activeTab === 'melas' ? '#FFFFFF' : '#44403C'}; border:1px solid ${activeTab === 'melas' ? '#7A2813' : '#E5DCD3'}; border-radius:999px; padding:6px 12px; font-size:0.75rem; font-weight:800; cursor:pointer; white-space:nowrap;">
            🎪 Craft Melas
          </button>
          <button type="button" class="btn-subnav ${activeTab === 'materials' ? 'active' : ''}" data-tab="materials" style="background:${activeTab === 'materials' ? '#7A2813' : '#FFFFFF'}; color:${activeTab === 'materials' ? '#FFFFFF' : '#44403C'}; border:1px solid ${activeTab === 'materials' ? '#7A2813' : '#E5DCD3'}; border-radius:999px; padding:6px 12px; font-size:0.75rem; font-weight:800; cursor:pointer; white-space:nowrap;">
            🌾 Material Prices
          </button>
        </div>

        <!-- TAB CONTENT -->
        <div>
          ${renderTabContent()}
        </div>

        <!-- Modal for Big Order Offer -->
        ${selectedRFQ ? renderRFQModal(selectedRFQ) : ''}

      </div>
    `;

    attachEvents();
  }

  function renderTabContent() {
    if (activeTab === 'demand') {
      return `
        <!-- TAB 1: POPULAR CRAFTS -->
        <div>
          <!-- Festival Rush Card -->
          <div style="background:linear-gradient(135deg, #7A2813 0%, #9A3412 100%); color:#FFFFFF; border-radius:12px; padding:14px; margin-bottom:12px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
              <span style="background:rgba(255,255,255,0.2); font-size:0.65rem; font-weight:800; padding:2px 8px; border-radius:999px;">
                FESTIVAL RUSH
              </span>
              <span style="font-size:0.95rem; font-weight:900; color:#FDE68A;">+45% More Demand</span>
            </div>
            <div style="font-size:1rem; font-weight:800; margin-bottom:4px;">
              Diwali Season: People Want Clay Items
            </div>
            <p style="font-size:0.74rem; opacity:0.95; line-height:1.35; margin:0 0 10px 0;">
              Buyers in Delhi, Mumbai, and Bengaluru want natural clay water pots and sets of diyas.
            </p>
            <button type="button" onclick="window.navigateToScreen('manage_crafts')" style="background:#FFFFFF; color:#7A2813; border:none; border-radius:6px; padding:7px 12px; font-size:0.74rem; font-weight:800; cursor:pointer; display:inline-flex; align-items:center; gap:4px;">
              <span>+ Add More Stock</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>

          <!-- Title -->
          <div style="font-size:0.85rem; font-weight:800; color:#1E150F; margin-bottom:8px; display:flex; justify-content:space-between; align-items:center;">
            <span>Most Wanted Items</span>
            <span style="font-size:0.68rem; color:#78716C;">Updated today</span>
          </div>

          <div style="display:flex; flex-direction:column; gap:10px;">
            <!-- Item 1 -->
            <div style="background:#FFFFFF; border:1px solid #ECE6DE; border-radius:12px; padding:12px; box-shadow:0 1px 3px rgba(0,0,0,0.03);">
              <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:4px;">
                <div style="font-size:0.88rem; font-weight:800; color:#1E150F;">
                  Clay Water Pot (Surahi 1L)
                </div>
                <span style="background:#FEF3C7; color:#92400E; font-size:0.62rem; font-weight:800; padding:2px 8px; border-radius:999px;">
                  🔥 High Demand
                </span>
              </div>
              <div style="display:flex; flex-wrap:wrap; gap:8px; font-size:0.72rem; color:#57534E; margin-bottom:6px;">
                <span>👥 <strong>4,850 buyers/week</strong></span>
                <span>💰 Price: <strong>₹1,400 to ₹1,650</strong></span>
                <span>📍 <strong>Delhi (Most buyers)</strong></span>
              </div>
              <div style="font-size:0.72rem; color:#78716C; background:#FAF7F2; padding:6px 10px; border-radius:6px; margin-bottom:8px;">
                💡 <em>Buyers want natural cooling pots without paint. Matches your listed pot!</em>
              </div>
              <div style="display:flex; gap:8px;">
                <button type="button" onclick="window.navigateToScreen('manage_crafts')" style="background:#7A2813; color:#FFFFFF; border:none; border-radius:6px; padding:6px 12px; font-size:0.72rem; font-weight:800; cursor:pointer;">
                  Check My Stock
                </button>
              </div>
            </div>

            <!-- Item 2 -->
            <div style="background:#FFFFFF; border:1px solid #ECE6DE; border-radius:12px; padding:12px; box-shadow:0 1px 3px rgba(0,0,0,0.03);">
              <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:4px;">
                <div style="font-size:0.88rem; font-weight:800; color:#1E150F;">
                  Festive Clay Diyas (Set of 12)
                </div>
                <span style="background:#FEECE5; color:#9A3412; font-size:0.62rem; font-weight:800; padding:2px 8px; border-radius:999px;">
                  🚀 Fast Selling (+120%)
                </span>
              </div>
              <div style="display:flex; flex-wrap:wrap; gap:8px; font-size:0.72rem; color:#57534E; margin-bottom:6px;">
                <span>👥 <strong>11,200 buyers/week</strong></span>
                <span>💰 Price: <strong>₹300 to ₹380</strong></span>
                <span>📍 <strong>Mumbai &amp; Bengaluru</strong></span>
              </div>
              <div style="font-size:0.72rem; color:#78716C; background:#FAF7F2; padding:6px 10px; border-radius:6px; margin-bottom:8px;">
                💡 <em>People buy 5 to 10 sets together for Diwali.</em>
              </div>
              <div style="display:flex; gap:8px;">
                <button type="button" onclick="window.navigateToScreen('manage_crafts')" style="background:#7A2813; color:#FFFFFF; border:none; border-radius:6px; padding:6px 12px; font-size:0.72rem; font-weight:800; cursor:pointer;">
                  Update Stock (18 left)
                </button>
              </div>
            </div>

            <!-- Item 3 -->
            <div style="background:#FFFFFF; border:1px solid #ECE6DE; border-radius:12px; padding:12px; box-shadow:0 1px 3px rgba(0,0,0,0.03);">
              <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:4px;">
                <div style="font-size:0.88rem; font-weight:800; color:#1E150F;">
                  Sun Design Clay Wall Plate
                </div>
                <span style="background:#E7F4ED; color:#1E6B47; font-size:0.62rem; font-weight:800; padding:2px 8px; border-radius:999px;">
                  📈 Good Demand
                </span>
              </div>
              <div style="display:flex; flex-wrap:wrap; gap:8px; font-size:0.72rem; color:#57534E; margin-bottom:6px;">
                <span>👥 <strong>1,640 buyers/week</strong></span>
                <span>💰 Price: <strong>₹800 to ₹950</strong></span>
              </div>
              <div style="font-size:0.72rem; color:#78716C; background:#FAF7F2; padding:6px 10px; border-radius:6px; margin-bottom:8px;">
                💡 <em>Low stock! Only 3 left in your shop.</em>
              </div>
              <div style="display:flex; gap:8px;">
                <button type="button" onclick="window.navigateToScreen('manage_crafts')" style="background:#7A2813; color:#FFFFFF; border:none; border-radius:6px; padding:6px 12px; font-size:0.72rem; font-weight:800; cursor:pointer;">
                  Make More
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    if (activeTab === 'rfqs') {
      return `
        <!-- TAB 2: BIG ORDERS -->
        <div>
          <div style="background:#FFF9F5; border:1px solid #FCD7C2; border-radius:10px; padding:10px 12px; margin-bottom:12px;">
            <div style="font-size:0.82rem; font-weight:800; color:#7A2813; margin-bottom:2px;">
              Direct Big Orders (No Middlemen)
            </div>
            <p style="font-size:0.72rem; color:#78716C; margin:0;">
              Hotels and companies buying directly from you. 100% money goes to your bank.
            </p>
          </div>

          <div style="display:flex; flex-direction:column; gap:10px;">
            ${rfqs.map(rfq => `
              <div style="background:#FFFFFF; border:1px solid #ECE6DE; border-radius:12px; padding:12px; box-shadow:0 1px 3px rgba(0,0,0,0.03);">
                <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:6px;">
                  <div>
                    <div style="font-size:0.9rem; font-weight:900; color:#1E150F;">
                      ${rfq.logo} ${rfq.org}
                    </div>
                    <div style="font-size:0.68rem; color:#78716C;">${rfq.location}</div>
                  </div>
                  <span style="background:#E7F4ED; color:#1E6B47; font-size:0.62rem; font-weight:800; padding:2px 8px; border-radius:999px;">
                    ${rfq.badge}
                  </span>
                </div>

                <div style="font-size:0.88rem; font-weight:800; color:#7A2813; margin-bottom:4px;">
                  ${rfq.item}
                </div>

                <p style="font-size:0.72rem; color:#57534E; line-height:1.35; margin:0 0 8px 0;">
                  ${rfq.details}
                </p>

                <!-- Order Numbers -->
                <div style="background:#FAF7F2; border-radius:8px; padding:8px 10px; display:grid; grid-template-columns:repeat(3, 1fr); gap:4px; text-align:center; margin-bottom:10px;">
                  <div>
                    <div style="font-size:0.62rem; color:#78716C; font-weight:700;">Quantity</div>
                    <div style="font-size:0.85rem; font-weight:800; color:#1E150F;">${rfq.quantity} pcs</div>
                  </div>
                  <div style="border-left:1px solid #EAE3D9; border-right:1px solid #EAE3D9;">
                    <div style="font-size:0.62rem; color:#78716C; font-weight:700;">Rate per Pc</div>
                    <div style="font-size:0.85rem; font-weight:800; color:#1E6B47;">₹${rfq.unitPrice}</div>
                  </div>
                  <div>
                    <div style="font-size:0.62rem; color:#78716C; font-weight:700;">Total Payout</div>
                    <div style="font-size:0.85rem; font-weight:900; color:#7A2813;">₹${rfq.totalPayout.toLocaleString('en-IN')}</div>
                  </div>
                </div>

                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <span style="font-size:0.7rem; color:#92400E; font-weight:700;">⏱️ ${rfq.time}</span>
                  <button type="button" class="btn-open-rfq" data-rfqid="${rfq.id}" style="background:#7A2813; color:#FFFFFF; border:none; border-radius:6px; padding:6px 14px; font-size:0.74rem; font-weight:800; cursor:pointer;">
                    Take Order / Send Price
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    if (activeTab === 'guilds') {
      return `
        <!-- TAB 3: OTHER ARTISANS -->
        <div>
          <div style="background:#FFFFFF; border:1px solid #ECE6DE; border-radius:10px; padding:10px 12px; margin-bottom:12px;">
            <div style="font-size:0.82rem; font-weight:800; color:#1E150F; margin-bottom:2px;">
              Master Artisans of India
            </div>
            <p style="font-size:0.72rem; color:#78716C; margin:0;">
              Connect and share ideas with verified craftspeople.
            </p>
          </div>

          <div style="display:flex; flex-direction:column; gap:10px;">
            ${peers.map(p => `
              <div style="background:#FFFFFF; border:1px solid #ECE6DE; border-radius:12px; padding:12px; box-shadow:0 1px 3px rgba(0,0,0,0.03);">
                <div style="display:flex; gap:10px; align-items:center; margin-bottom:8px;">
                  <img src="${p.avatar}" alt="${p.name}" style="width:48px; height:48px; border-radius:10px; object-fit:cover; border:1px solid #E5DCD3;" onerror="this.src='/assets/artisan_ramulu.jpg'">
                  <div style="flex:1;">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                      <div style="font-size:0.92rem; font-weight:900; color:#1E150F;">${p.name}</div>
                      <span style="background:#E7F4ED; color:#1E6B47; font-size:0.62rem; font-weight:800; padding:2px 6px; border-radius:999px;">
                        Score ${p.trustScore}/100
                      </span>
                    </div>
                    <div style="font-size:0.74rem; font-weight:700; color:#7A2813;">${p.craft}</div>
                    <div style="font-size:0.68rem; color:#78716C;">${p.location} • ${p.pehchanId}</div>
                  </div>
                </div>

                <div style="font-size:0.72rem; color:#57534E; background:#FAF7F2; padding:6px 10px; border-radius:6px; margin-bottom:8px;">
                  <strong>Craft:</strong> ${p.work}
                </div>

                <div style="display:flex; justify-content:flex-end;">
                  ${p.isSelf ? `
                    <span style="font-size:0.7rem; font-weight:800; color:#7A2813; background:#FEECE5; padding:3px 10px; border-radius:6px;">
                      Your Profile
                    </span>
                  ` : `
                    <button type="button" onclick="window.showToast?.('Message sent to ${p.name}')" style="background:#FFFFFF; color:#7A2813; border:1px solid #7A2813; border-radius:6px; padding:5px 12px; font-size:0.72rem; font-weight:800; cursor:pointer;">
                      Send Message
                    </button>
                  `}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    if (activeTab === 'melas') {
      return `
        <!-- TAB 4: CRAFT MELAS -->
        <div>
          <div style="background:#FFFFFF; border:1px solid #ECE6DE; border-radius:10px; padding:10px 12px; margin-bottom:12px;">
            <div style="font-size:0.82rem; font-weight:800; color:#1E150F; margin-bottom:2px;">
              Govt. Craft Exhibitions
            </div>
            <p style="font-size:0.72rem; color:#78716C; margin:0;">
              Get free stalls using your Pehchan card (#UP-VAR-49281).
            </p>
          </div>

          <div style="display:flex; flex-direction:column; gap:10px;">
            ${melas.map(m => `
              <div style="background:#FFFFFF; border:1px solid #ECE6DE; border-radius:12px; padding:12px; box-shadow:0 1px 3px rgba(0,0,0,0.03);">
                <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:4px;">
                  <div style="font-size:0.9rem; font-weight:900; color:#1E150F;">${m.name}</div>
                  <span style="background:#FEECE5; color:#9A3412; font-size:0.62rem; font-weight:800; padding:2px 6px; border-radius:999px;">
                    ${m.left} Stalls Left
                  </span>
                </div>

                <div style="font-size:0.72rem; color:#78716C; margin-bottom:6px;">
                  📍 ${m.place} • 📅 <strong>${m.date}</strong>
                </div>

                <div style="background:#FAF7F2; border-radius:6px; padding:6px 10px; font-size:0.72rem; color:#57534E; margin-bottom:8px;">
                  <strong>Stall:</strong> <span style="color:#1E6B47; font-weight:800;">${m.stall}</span>
                </div>

                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <span style="font-size:0.68rem; color:#1E6B47; font-weight:800;">✓ Pehchan Verified</span>
                  <button type="button" onclick="window.showToast?.('Stall booked for ${m.name}!')" style="background:#7A2813; color:#FFFFFF; border:none; border-radius:6px; padding:6px 12px; font-size:0.72rem; font-weight:800; cursor:pointer;">
                    Book Free Stall
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    if (activeTab === 'materials') {
      return `
        <!-- TAB 5: MATERIAL PRICES -->
        <div>
          <div style="background:#FFFFFF; border:1px solid #ECE6DE; border-radius:10px; padding:10px 12px; margin-bottom:12px;">
            <div style="font-size:0.82rem; font-weight:800; color:#1E150F; margin-bottom:2px;">
              Local Material Rates (Varanasi)
            </div>
            <p style="font-size:0.72rem; color:#78716C; margin:0;">
              Standard market rates to keep your making costs fair.
            </p>
          </div>

          <div style="display:flex; flex-direction:column; gap:8px;">
            <div style="background:#FFFFFF; border:1px solid #ECE6DE; border-radius:10px; padding:10px 12px; display:flex; justify-content:space-between; align-items:center;">
              <div>
                <div style="font-size:0.85rem; font-weight:800; color:#1E150F;">River Clay (50kg bag)</div>
                <div style="font-size:0.68rem; color:#78716C;">Clean silt from Chunar Ghats</div>
              </div>
              <div style="text-align:right;">
                <div style="font-size:0.95rem; font-weight:900; color:#1E6B47;">₹180</div>
                <div style="font-size:0.62rem; color:#1E6B47; font-weight:700;">Normal Rate ✓</div>
              </div>
            </div>

            <div style="background:#FFFFFF; border:1px solid #ECE6DE; border-radius:10px; padding:10px 12px; display:flex; justify-content:space-between; align-items:center;">
              <div>
                <div style="font-size:0.85rem; font-weight:800; color:#1E150F;">Firewood for Kiln</div>
                <div style="font-size:0.68rem; color:#78716C;">Per single firing cycle</div>
              </div>
              <div style="text-align:right;">
                <div style="font-size:0.95rem; font-weight:900; color:#1E6B47;">₹150</div>
                <div style="font-size:0.62rem; color:#1E6B47; font-weight:700;">Normal Rate ✓</div>
              </div>
            </div>

            <div style="background:#FFFFFF; border:1px solid #ECE6DE; border-radius:10px; padding:10px 12px; display:flex; justify-content:space-between; align-items:center;">
              <div>
                <div style="font-size:0.85rem; font-weight:800; color:#1E150F;">Natural Clay Color Powder</div>
                <div style="font-size:0.68rem; color:#78716C;">Red ochre &amp; oxide (per kg)</div>
              </div>
              <div style="text-align:right;">
                <div style="font-size:0.95rem; font-weight:900; color:#1E6B47;">₹220</div>
                <div style="font-size:0.62rem; color:#1E6B47; font-weight:700;">Price Down 5%</div>
              </div>
            </div>

            <div style="background:#FFFFFF; border:1px solid #ECE6DE; border-radius:10px; padding:10px 12px; display:flex; justify-content:space-between; align-items:center;">
              <div>
                <div style="font-size:0.85rem; font-weight:800; color:#1E150F;">Strong Packing Box</div>
                <div style="font-size:0.68rem; color:#78716C;">Safe parcel box with straw</div>
              </div>
              <div style="text-align:right;">
                <div style="font-size:0.95rem; font-weight:900; color:#7A2813;">₹18 each</div>
                <div style="font-size:0.62rem; color:#7A2813; font-weight:700;">Low Price</div>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    return '';
  }

  function renderRFQModal(rfq) {
    return `
      <div id="rfq-quote-modal" style="position:fixed; inset:0; background:rgba(0,0,0,0.6); display:flex; align-items:center; justify-content:center; z-index:9999; padding:14px; backdrop-filter:blur(3px);">
        <div style="background:#FFFFFF; border-radius:14px; width:100%; max-width:420px; padding:18px; box-sizing:border-box; box-shadow:0 8px 24px rgba(0,0,0,0.2);">
          
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:10px;">
            <div>
              <div style="font-size:0.7rem; font-weight:800; color:#7A2813; text-transform:uppercase;">
                Send Offer
              </div>
              <div style="font-size:1rem; font-weight:900; color:#1E150F; margin-top:2px;">
                ${rfq.org}
              </div>
            </div>
            <button type="button" id="btn-close-rfq" style="background:#F3EBE1; border:none; border-radius:50%; width:26px; height:26px; font-weight:800; color:#7A2813; cursor:pointer;">✕</button>
          </div>

          <div style="background:#FAF7F2; border-radius:8px; padding:10px; margin-bottom:12px; font-size:0.75rem; line-height:1.4;">
            <div style="font-weight:800; color:#1E150F; margin-bottom:4px;">${rfq.item}</div>
            <div>Order Size: <strong>${rfq.quantity} pieces</strong></div>
            <div>Total Pay: <strong style="color:#1E6B47;">₹${rfq.totalPayout.toLocaleString('en-IN')} (₹${rfq.unitPrice} each)</strong></div>
            <div>Time: <strong>${rfq.time}</strong></div>
          </div>

          <div style="margin-bottom:12px;">
            <label style="font-size:0.75rem; font-weight:800; color:#1E150F; display:block; margin-bottom:4px;">
              Your Price per Piece (₹):
            </label>
            <input type="number" id="rfq-bid-price" value="${rfq.unitPrice}" style="width:100%; padding:8px 10px; border:1px solid #D6C7B7; border-radius:6px; font-size:0.88rem; font-weight:800; color:#1E150F; box-sizing:border-box;">
            <span style="font-size:0.65rem; color:#78716C;">No platform cut. 100% money goes to you.</span>
          </div>

          <div style="background:#E7F4ED; border:1px solid #A7F3D0; border-radius:8px; padding:8px 10px; font-size:0.72rem; color:#065F46; line-height:1.35; margin-bottom:14px;">
            ✓ Your ID: <strong>UP-VAR-49281 (Ramdev Kumhar)</strong><br>
            ✓ Bank: <strong>Bank of Baroda (•••• 4012)</strong>
          </div>

          <div style="display:flex; gap:8px;">
            <button type="button" id="btn-cancel-rfq" style="flex:1; background:#F3EBE1; color:#7A2813; border:none; border-radius:6px; padding:9px; font-size:0.76rem; font-weight:800; cursor:pointer;">
              Cancel
            </button>
            <button type="button" id="btn-submit-rfq-bid" style="flex:2; background:#7A2813; color:#FFFFFF; border:none; border-radius:6px; padding:9px; font-size:0.76rem; font-weight:800; cursor:pointer;">
              Send My Offer
            </button>
          </div>

        </div>
      </div>
    `;
  }

  function attachEvents() {
    // Tab switching
    container.querySelectorAll('.btn-subnav').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tab = e.currentTarget.getAttribute('data-tab');
        if (tab && tab !== activeTab) {
          activeTab = tab;
          renderView();
        }
      });
    });

    // Voice Guide Toggle
    const vgBtn = container.querySelector('#discover-voice-guide-btn');
    if (vgBtn) {
      vgBtn.addEventListener('click', () => {
        AudioAssistance.toggle();
        if (AudioAssistance.isEnabled) {
          AudioAssistance.speak("मार्केट ट्रेंड्स: यहाँ आप देख सकते हैं कि खरीदार क्या ढूंढ रहे हैं, बड़े होटल के आर्डर और सरकारी मेलों में मुफ्त स्टॉल।", "hi-IN");
        } else {
          AudioAssistance.stop();
        }
        renderView();
      });
    }

    // Open RFQ Modal
    container.querySelectorAll('.btn-open-rfq').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const rfqId = e.currentTarget.getAttribute('data-rfqid');
        selectedRFQ = rfqs.find(r => r.id === rfqId);
        renderView();
      });
    });

    // Close RFQ Modal
    const closeBtn = container.querySelector('#btn-close-rfq');
    const cancelBtn = container.querySelector('#btn-cancel-rfq');
    if (closeBtn) closeBtn.addEventListener('click', () => { selectedRFQ = null; renderView(); });
    if (cancelBtn) cancelBtn.addEventListener('click', () => { selectedRFQ = null; renderView(); });

    // Submit RFQ Bid
    const submitBidBtn = container.querySelector('#btn-submit-rfq-bid');
    if (submitBidBtn) {
      submitBidBtn.addEventListener('click', () => {
        const bidPrice = container.querySelector('#rfq-bid-price')?.value || selectedRFQ.unitPrice;
        window.showToast?.(`✅ Offer of ₹${bidPrice}/pc sent to ${selectedRFQ.org}!`);
        selectedRFQ = null;
        renderView();
      });
    }
  }

  renderView();
}
