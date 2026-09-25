/**
 * Buyer Screen: Craft Search & Discovery with Filters
 * (Role: BUYER only - consumer search by GI tag, artisan, craft material, and budget)
 */

import { State } from '../state.js';

export function renderBuyerSearchScreen(container) {
  const craftItems = [
    {
      id: 'srch-1',
      title: 'Handcrafted Festive Terracotta Diyas (Set of 12)',
      artisan: 'Ramdev Kumhar',
      cluster: 'Varanasi Clay Cluster (GI #84)',
      price: 320,
      rating: '4.9 ★ (128)',
      tag: 'GI Authenticated',
      image: '/assets/handcrafted_diyas.jpg'
    },
    {
      id: 'srch-2',
      title: 'Gorakhpur Traditional Clay Water Surahi',
      artisan: 'Ramdev Kumhar',
      cluster: 'Gorakhpur Terracotta (GI #182)',
      price: 680,
      rating: '4.8 ★ (94)',
      tag: 'Eco-Friendly Clay',
      image: '/assets/raw_pottery_snap.jpg'
    },
    {
      id: 'srch-3',
      title: 'Bastar Lost-Wax Brass Tribal Figurine',
      artisan: 'Budhram Baghel',
      cluster: 'Bastar Dhokra Cluster (GI #84)',
      price: 820,
      rating: '5.0 ★ (42)',
      tag: 'Ancient Metal Cast',
      image: '/assets/dhokra_brass.jpg'
    },
    {
      id: 'srch-4',
      title: 'Jaipur Blue Pottery Glazed Floral Plate',
      artisan: 'Rahul Shekhawat',
      cluster: 'Jaipur Blue Pottery (GI #28)',
      price: 540,
      rating: '4.9 ★ (76)',
      tag: 'Lead-Free Glaze',
      image: '/assets/blue_pottery.jpg'
    }
  ];

  container.innerHTML = `
    <div class="buyer-search-screen animate-fade-in" style="padding-bottom: 30px;">
      
      <!-- Search Input Header -->
      <div style="margin-bottom:14px;">
        <div style="position:relative;">
          <input type="text" id="craft-search-input" placeholder="Search crafts, GI clusters, artisans, materials..." value="Terracotta" style="width:100%; padding:12px 14px 12px 38px; border-radius:var(--radius-pill); border:1px solid var(--border-subtle); background:#FFFFFF; font-size:0.82rem; font-weight:700; box-shadow:var(--shadow-sm);">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748B" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="position:absolute; left:14px; top:50%; transform:translateY(-50%);"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        </div>
      </div>

      <!-- Quick Filter Pills -->
      <div style="display:flex; gap:6px; overflow-x:auto; padding-bottom:8px; margin-bottom:14px; scrollbar-width:none;">
        <button type="button" class="btn-primary" style="padding:5px 12px; font-size:0.72rem; border-radius:var(--radius-pill); white-space:nowrap; background:#7A2813;">
          🏺 Pottery & Clay
        </button>
        <button type="button" class="btn-secondary" style="padding:5px 12px; font-size:0.72rem; border-radius:var(--radius-pill); white-space:nowrap;">
          🔱 Metal & Brass
        </button>
        <button type="button" class="btn-secondary" style="padding:5px 12px; font-size:0.72rem; border-radius:var(--radius-pill); white-space:nowrap;">
          🪵 Woodcraft
        </button>
        <button type="button" class="btn-secondary" style="padding:5px 12px; font-size:0.72rem; border-radius:var(--radius-pill); white-space:nowrap;">
          🧵 Handloom
        </button>
        <button type="button" class="btn-secondary" style="padding:5px 12px; font-size:0.72rem; border-radius:var(--radius-pill); white-space:nowrap;">
          🏷️ GI Tag Only
        </button>
      </div>

      <!-- Result Count and Sort -->
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
        <span style="font-size:0.75rem; font-weight:800; color:var(--text-secondary);">
          Showing 4 verified artisan crafts
        </span>
        <select style="border:none; background:transparent; font-size:0.72rem; font-weight:800; color:#7A2813; cursor:pointer;">
          <option>Sort: Most Authentic</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
        </select>
      </div>

      <!-- Crafts Search Results Grid -->
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
        ${craftItems.map(item => `
          <div style="background:#FFFFFF; border:1px solid var(--border-subtle); border-radius:var(--radius-lg); overflow:hidden; box-shadow:var(--shadow-sm); display:flex; flex-direction:column;">
            
            <div style="position:relative; height:120px; cursor:pointer;" onclick="window.navigateToScreen('product_details')">
              <img src="${item.image}" alt="${item.title}" style="width:100%; height:100%; object-fit:cover;">
              <span style="position:absolute; top:6px; left:6px; background:#7A2813; color:#FFFFFF; font-size:0.58rem; font-weight:800; padding:2px 6px; border-radius:var(--radius-pill);">
                ${item.tag}
              </span>
            </div>

            <div style="padding:8px 10px; display:flex; flex-direction:column; flex:1; justify-content:space-between;">
              <div>
                <div style="font-size:0.62rem; color:var(--text-muted); font-weight:700; margin-bottom:2px;">
                  By ${item.artisan}
                </div>
                <div style="font-size:0.75rem; font-weight:800; color:var(--text-primary); line-height:1.25; margin-bottom:4px; max-height:2.5em; overflow:hidden;">
                  ${item.title}
                </div>
                <div style="font-size:0.65rem; color:#1E6B47; font-weight:700;">
                  ${item.rating}
                </div>
              </div>

              <div style="margin-top:8px; display:flex; justify-content:space-between; align-items:center;">
                <div style="font-size:0.85rem; font-weight:900; color:var(--text-primary);">
                  ₹${item.price}
                </div>
                <button type="button" class="btn-primary" style="padding:4px 8px; font-size:0.68rem; font-weight:800; border-radius:var(--radius-pill); background:#7A2813;" onclick="window.addSearchItemToCart('${item.id}', '${item.title}', ${item.price}, '${item.artisan}')">
                  + Add
                </button>
              </div>
            </div>

          </div>
        `).join('')}
      </div>

    </div>
  `;
}

if (typeof window !== 'undefined') {
  window.addSearchItemToCart = function(id, title, price, artisan) {
    State.buyer.cart.push({
      id: `b-cart-${Date.now()}`,
      title: title,
      artisan: artisan,
      cluster: 'GI Verified Artisan Cluster',
      price: price,
      quantity: 1,
      image: '/assets/handcrafted_diyas.jpg',
      insuranceFee: 25
    });
    window.showToast?.(`🛍️ Added "${title}" to your Patron Cart!`);
  };
}
