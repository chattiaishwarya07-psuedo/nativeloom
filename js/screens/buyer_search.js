/**
 * Buyer Screen: Craft Search & Discovery with Filters
 * (Role: BUYER only - consumer search by GI tag, artisan, craft material, and budget)
 */

import { State } from '../state.js';

export function renderBuyerSearchScreen(container) {
  // Unified Craft Catalog for Search
  const baseCatalog = [
    {
      id: 'craft-terracotta-diyas',
      title: 'Handcrafted Festive Terracotta Diyas (Set of 12)',
      artisan: 'Ramdev Kumhar',
      cluster: 'Varanasi Clay Cluster (GI #182)',
      category: 'pottery',
      price: 320,
      rating: '4.9 ★ (128)',
      tag: 'GI Authenticated',
      image: '/assets/handcrafted_diyas.jpg'
    },
    {
      id: 'craft-terracotta-pitcher',
      title: 'Gorakhpur Traditional Clay Water Surahi',
      artisan: 'Ramdev Kumhar',
      cluster: 'Gorakhpur Terracotta (GI #182)',
      category: 'pottery',
      price: 1450,
      rating: '4.8 ★ (94)',
      tag: 'Eco-Friendly Clay',
      image: '/assets/terracotta_pitcher.jpg'
    },
    {
      id: 'craft-dhokra-bell',
      title: 'Bastar Lost-Wax Brass Tribal Figurine',
      artisan: 'Budhram Baghel',
      cluster: 'Bastar Dhokra Cluster (GI #84)',
      category: 'brass',
      price: 1850,
      rating: '5.0 ★ (42)',
      tag: 'Ancient Metal Cast',
      image: '/assets/dhokra_brass.jpg'
    },
    {
      id: 'craft-blue-pottery-vase',
      title: 'Jaipur Blue Pottery Glazed Floral Plate',
      artisan: 'Rahul Shekhawat',
      cluster: 'Jaipur Blue Pottery (GI #28)',
      category: 'pottery',
      price: 1250,
      rating: '4.9 ★ (76)',
      tag: 'Lead-Free Glaze',
      image: '/assets/blue_pottery.jpg'
    },
    {
      id: 'craft-katan-silk',
      title: 'Katan Silk Zari Brocade Dupatta',
      artisan: 'Anandi Devi',
      cluster: 'Kabir Chaura Weavers (GI #28)',
      category: 'handloom',
      price: 4200,
      rating: '5.0 ★ (64)',
      tag: 'GI Authenticated',
      image: '/assets/ikat_saree.jpg'
    },
    {
      id: 'craft-wood-jaali-box',
      title: 'Saharanpur Hand-Carved Sheesham Jaali Box',
      artisan: 'Saleem Ahmed',
      cluster: 'Saharanpur Woodcraft Guild (GI #124)',
      category: 'wood',
      price: 950,
      rating: '4.9 ★ (52)',
      tag: 'GI Authenticated',
      image: '/assets/woodcraft_bowl.jpg'
    }
  ];

  // Append produced crafts from state
  const producedItems = (State.getProducedCrafts ? State.getProducedCrafts() : (State.producedCrafts || [])).map(c => ({
    id: c.id,
    title: c.title,
    artisan: c.artisanName || 'Ramdev Kumhar',
    cluster: c.cluster || 'Gorakhpur Terracotta Cluster',
    category: 'pottery',
    price: c.price || 750,
    rating: '5.0 ★ (New)',
    tag: c.giTagNumber || 'GI Authenticated',
    image: c.image || '/assets/terracotta_pitcher.jpg'
  }));

  const craftItems = [...producedItems, ...baseCatalog];
  let activeFilterPill = 'all';
  let activeSort = 'authentic';
  let activeQuery = State.buyerSearchQuery || '';

  container.innerHTML = `
    <div class="buyer-search-screen animate-fade-in" style="padding-bottom: 30px;">

      <!-- Search Input Header -->
      <div style="margin-bottom:14px;">
        <div style="position:relative;">
          <input type="text" id="craft-search-input" placeholder="Search crafts, GI clusters, artisans, materials..." value="${activeQuery}" style="width:100%; padding:12px 38px 12px 38px; border-radius:var(--radius-pill); border:1px solid var(--border-subtle); background:#FFFFFF; font-size:0.82rem; font-weight:700; box-shadow:var(--shadow-sm); outline:none;">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="position:absolute; left:14px; top:50%; transform:translateY(-50%);"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <button type="button" id="btn-search-clear" style="display:${activeQuery ? 'flex' : 'none'}; position:absolute; right:12px; top:50%; transform:translateY(-50%); background:#E5DCD3; border:none; border-radius:50%; width:20px; height:20px; align-items:center; justify-content:center; cursor:pointer; font-size:0.65rem; color:#57534E;">✕</button>
        </div>
      </div>

      <!-- Quick Filter Pills -->
      <div style="display:flex; gap:6px; overflow-x:auto; padding-bottom:8px; margin-bottom:14px; scrollbar-width:none;" id="quick-filter-pills-bar">
        <button type="button" class="btn-pill-filter ${activeFilterPill === 'all' ? 'active' : ''}" data-filter="all" style="padding:5px 12px; font-size:0.72rem; border-radius:var(--radius-pill); white-space:nowrap; cursor:pointer; font-weight:800; border:1px solid #D6C7B2; background:${activeFilterPill === 'all' ? '#7A2813' : '#FFFFFF'}; color:${activeFilterPill === 'all' ? '#FFFFFF' : '#57534E'};">
          All Crafts
        </button>
        <button type="button" class="btn-pill-filter ${activeFilterPill === 'pottery' ? 'active' : ''}" data-filter="pottery" style="padding:5px 12px; font-size:0.72rem; border-radius:var(--radius-pill); white-space:nowrap; cursor:pointer; font-weight:700; border:1px solid #D6C7B2; background:${activeFilterPill === 'pottery' ? '#7A2813' : '#FFFFFF'}; color:${activeFilterPill === 'pottery' ? '#FFFFFF' : '#57534E'};">
          🏺 Pottery &amp; Clay
        </button>
        <button type="button" class="btn-pill-filter ${activeFilterPill === 'brass' ? 'active' : ''}" data-filter="brass" style="padding:5px 12px; font-size:0.72rem; border-radius:var(--radius-pill); white-space:nowrap; cursor:pointer; font-weight:700; border:1px solid #D6C7B2; background:${activeFilterPill === 'brass' ? '#7A2813' : '#FFFFFF'}; color:${activeFilterPill === 'brass' ? '#FFFFFF' : '#57534E'};">
          🔱 Metal &amp; Brass
        </button>
        <button type="button" class="btn-pill-filter ${activeFilterPill === 'wood' ? 'active' : ''}" data-filter="wood" style="padding:5px 12px; font-size:0.72rem; border-radius:var(--radius-pill); white-space:nowrap; cursor:pointer; font-weight:700; border:1px solid #D6C7B2; background:${activeFilterPill === 'wood' ? '#7A2813' : '#FFFFFF'}; color:${activeFilterPill === 'wood' ? '#FFFFFF' : '#57534E'};">
          🪵 Woodcraft
        </button>
        <button type="button" class="btn-pill-filter ${activeFilterPill === 'handloom' ? 'active' : ''}" data-filter="handloom" style="padding:5px 12px; font-size:0.72rem; border-radius:var(--radius-pill); white-space:nowrap; cursor:pointer; font-weight:700; border:1px solid #D6C7B2; background:${activeFilterPill === 'handloom' ? '#7A2813' : '#FFFFFF'}; color:${activeFilterPill === 'handloom' ? '#FFFFFF' : '#57534E'};">
          🧵 Handloom
        </button>
        <button type="button" class="btn-pill-filter ${activeFilterPill === 'gi_only' ? 'active' : ''}" data-filter="gi_only" style="padding:5px 12px; font-size:0.72rem; border-radius:var(--radius-pill); white-space:nowrap; cursor:pointer; font-weight:700; border:1px solid #D6C7B2; background:${activeFilterPill === 'gi_only' ? '#7A2813' : '#FFFFFF'}; color:${activeFilterPill === 'gi_only' ? '#FFFFFF' : '#57534E'};">
          🏷️ GI Tag Only
        </button>
      </div>

      <!-- Result Count and Sort -->
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
        <span id="search-result-count" style="font-size:0.75rem; font-weight:800; color:var(--text-secondary);">
          Showing ${craftItems.length} verified artisan crafts
        </span>
        <select id="sort-select" style="border:none; background:transparent; font-size:0.72rem; font-weight:800; color:#7A2813; cursor:pointer; outline:none;">
          <option value="authentic">Sort: Most Authentic</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>
      </div>

      <!-- Crafts Search Results Grid -->
      <div id="crafts-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
        ${renderCards(craftItems)}
      </div>

    </div>
  `;

  function renderCards(items) {
    if (!items.length) {
      return `
        <div style="grid-column: 1 / -1; text-align:center; padding:32px 16px; background:#FFFFFF; border-radius:12px; border:1px dashed var(--border-subtle);">
          <div style="margin-bottom:8px; display:flex; justify-content:center;">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </div>
          <div style="font-size:0.9rem; font-weight:800; color:var(--text-primary); margin-bottom:4px;">No matching crafts found</div>
          <div style="font-size:0.75rem; color:var(--text-secondary); margin-bottom:12px;">Try searching for "Clay", "Brass", "Varanasi", or "Silk"</div>
          <button type="button" id="btn-reset-search-grid" style="background:#7A2813; color:#FFFFFF; border:none; border-radius:6px; padding:6px 14px; font-size:0.75rem; font-weight:800; cursor:pointer;">Show All Crafts</button>
        </div>
      `;
    }

    return items.map(item => `
      <div style="background:#FFFFFF; border:1px solid var(--border-subtle); border-radius:var(--radius-lg); overflow:hidden; box-shadow:var(--shadow-sm); display:flex; flex-direction:column;">

        <div style="position:relative; height:120px; cursor:pointer;" onclick="window.showCraftDetails?.('${item.id}') || window.navigateToScreen('product_details')">
          <img src="${item.image}" alt="${item.title}" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='/assets/terracotta_pitcher.jpg'">
          <span style="position:absolute; top:6px; left:6px; background:#7A2813; color:#FFFFFF; font-size:0.58rem; font-weight:800; padding:2px 6px; border-radius:var(--radius-pill);">
            ${item.tag}
          </span>
        </div>

        <div style="padding:8px 10px; display:flex; flex-direction:column; flex:1; justify-content:space-between;">
          <div>
            <div style="font-size:0.62rem; color:var(--text-muted); font-weight:700; margin-bottom:2px;">
              By ${item.artisan}
            </div>
            <div style="font-size:0.75rem; font-weight:800; color:var(--text-primary); line-height:1.25; margin-bottom:4px; max-height:2.5em; overflow:hidden; cursor:pointer;" onclick="window.showCraftDetails?.('${item.id}') || window.navigateToScreen('product_details')">
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
            <button type="button" class="btn-primary" style="padding:4px 8px; font-size:0.68rem; font-weight:800; border-radius:var(--radius-pill); background:#7A2813;" onclick="window.addSearchItemToCart('${item.id}', '${item.title.replace(/'/g, "\\'")}', ${item.price}, '${item.artisan}')">
              + Add
            </button>
          </div>
        </div>

      </div>
    `).join('');
  }

  // Interactive Live Search & Filters
  const searchInput = container.querySelector('#craft-search-input');
  const btnSearchClear = container.querySelector('#btn-search-clear');
  const countDisplay = container.querySelector('#search-result-count');
  const gridContainer = container.querySelector('#crafts-grid');
  const sortSelect = container.querySelector('#sort-select');

  function applySearchAndFilters() {
    const query = activeQuery.toLowerCase().trim();
    let filtered = craftItems.filter(it => {
      // Query filter
      if (query) {
        const matches =
          it.title.toLowerCase().includes(query) ||
          it.artisan.toLowerCase().includes(query) ||
          it.cluster.toLowerCase().includes(query) ||
          it.tag.toLowerCase().includes(query) ||
          (it.category && it.category.toLowerCase().includes(query));
        if (!matches) return false;
      }

      // Pill filter
      if (activeFilterPill === 'gi_only') {
        if (!it.tag || !it.tag.toLowerCase().includes('gi')) return false;
      } else if (activeFilterPill !== 'all') {
        if (it.category !== activeFilterPill) return false;
      }

      return true;
    });

    // Sort
    if (activeSort === 'low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (activeSort === 'high') {
      filtered.sort((a, b) => b.price - a.price);
    }

    if (countDisplay) {
      countDisplay.textContent = `Showing ${filtered.length} verified artisan craft${filtered.length === 1 ? '' : 's'}`;
    }
    if (gridContainer) {
      gridContainer.innerHTML = renderCards(filtered);
      gridContainer.querySelector('#btn-reset-search-grid')?.addEventListener('click', () => {
        activeQuery = '';
        activeFilterPill = 'all';
        if (searchInput) searchInput.value = '';
        if (btnSearchClear) btnSearchClear.style.display = 'none';
        updatePillsUI();
        applySearchAndFilters();
      });
    }
  }

  function updatePillsUI() {
    container.querySelectorAll('.btn-pill-filter').forEach(btn => {
      const f = btn.dataset.filter;
      if (f === activeFilterPill) {
        btn.classList.add('active');
        btn.style.background = '#7A2813';
        btn.style.color = '#FFFFFF';
        btn.style.fontWeight = '800';
      } else {
        btn.classList.remove('active');
        btn.style.background = '#FFFFFF';
        btn.style.color = '#57534E';
        btn.style.fontWeight = '700';
      }
    });
  }

  searchInput?.addEventListener('input', (e) => {
    activeQuery = e.target.value;
    State.buyerSearchQuery = activeQuery;
    if (btnSearchClear) btnSearchClear.style.display = activeQuery ? 'flex' : 'none';
    applySearchAndFilters();
  });

  btnSearchClear?.addEventListener('click', () => {
    activeQuery = '';
    State.buyerSearchQuery = '';
    if (searchInput) searchInput.value = '';
    btnSearchClear.style.display = 'none';
    applySearchAndFilters();
  });

  // Filter Pills Click
  container.querySelectorAll('.btn-pill-filter').forEach(btn => {
    btn.addEventListener('click', () => {
      activeFilterPill = btn.dataset.filter || 'all';
      updatePillsUI();
      applySearchAndFilters();
    });
  });

  // Sort Select Change
  sortSelect?.addEventListener('change', (e) => {
    activeSort = e.target.value;
    applySearchAndFilters();
  });

  // Initial Filter Application if query was present
  if (activeQuery) {
    applySearchAndFilters();
  }
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
