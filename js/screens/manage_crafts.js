/**
 * Screen: Manage All Crafts / Artisan Inventory
 * Provides complete control to:
 * 1. View all craft images, status, stock, and pricing
 * 2. Add new products (via Quick Form or 4-step AI Voice Studio)
 * 3. Edit details of existing products (title, price, stock, image, story)
 * 4. Delete products with real-time sync across marketplace and studio
 */

import { State } from '../state.js';

export function renderManageCraftsScreen(container) {
  let crafts = [...(State.artisan?.activeCrafts || [])];
  let activeFilter = 'all'; // 'all', 'ready', 'low_stock'
  let searchQuery = '';
  let craftToEdit = null;
  let craftToDelete = null;

  // Preset sample craft images for quick selection
  const imagePresets = [
    { label: 'Terracotta Pitcher', url: '/assets/terracotta_pitcher.jpg' },
    { label: 'Hand-Carved Surahi', url: '/assets/raw_pottery_snap.jpg' },
    { label: 'Festive Diyas (Set)', url: '/assets/handcrafted_diyas.jpg' },
    { label: 'Sun Medallion Plaque', url: '/assets/clay_wall_plate.jpg' },
    { label: 'Gorakhpur Horse Figure', url: '/assets/artisan_ramulu.jpg' }
  ];

  function getFilteredCrafts() {
    return (State.artisan?.activeCrafts || []).filter(c => {
      const matchesSearch = !searchQuery || 
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (c.category && c.category.toLowerCase().includes(searchQuery.toLowerCase()));
      
      if (!matchesSearch) return false;
      if (activeFilter === 'ready') return c.status === 'Ready' || (c.stock && c.stock > 5);
      if (activeFilter === 'low_stock') return c.status === 'Low Stock' || (c.stock !== undefined && c.stock <= 5);
      return true;
    });
  }

  function renderView() {
    const list = getFilteredCrafts();
    const totalCrafts = (State.artisan?.activeCrafts || []).length;
    const totalStock = (State.artisan?.activeCrafts || []).reduce((acc, c) => acc + (parseInt(c.stock, 10) || 0), 0);
    const totalSold = (State.artisan?.activeCrafts || []).reduce((acc, c) => acc + (parseInt(c.soldCount, 10) || 0), 0);
    const totalValue = (State.artisan?.activeCrafts || []).reduce((acc, c) => acc + ((parseInt(c.price, 10) || 0) * (parseInt(c.stock, 10) || 0)), 0);

    container.innerHTML = `
      <div class="manage-crafts-screen animate-fade-in" style="background:#FAF8F5; min-height:100vh; padding:16px 14px 80px; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color:#1E150F;">
        
        <!-- Breadcrumb & Top Bar -->
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:14px;">
          <button type="button" id="btn-back-to-studio" style="background:#FFFFFF; border:1px solid #E5DCD3; border-radius:var(--radius-pill); padding:6px 14px; font-size:0.75rem; font-weight:800; color:#7A2813; display:inline-flex; align-items:center; gap:6px; cursor:pointer; box-shadow:0 1px 3px rgba(0,0,0,0.04);">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            <span>Back to Studio</span>
          </button>
          
          <button type="button" id="btn-open-add-modal" style="background:#7A2813; color:#FFFFFF; border:none; border-radius:var(--radius-pill); padding:7px 16px; font-size:0.78rem; font-weight:800; display:inline-flex; align-items:center; gap:6px; cursor:pointer; box-shadow:0 3px 10px rgba(122,40,19,0.3);">
            <span style="font-size:1rem; line-height:1;">+</span>
            <span>Add New Product</span>
          </button>
        </div>

        <!-- Page Title & Header -->
        <div style="margin-bottom:14px;">
          <h1 style="font-family:'Playfair Display', Georgia, serif; font-size:1.35rem; font-weight:900; color:#1E150F; margin:0 0 4px 0; letter-spacing:-0.01em;">
            Craft Inventory &amp; Listings
          </h1>
          <div style="font-size:0.75rem; color:#71655D; line-height:1.3;">
            Manage all your active marketplace items: inspect full photos, edit prices &amp; inventory, add new crafts, or remove listings.
          </div>
        </div>

        <!-- Live Inventory Metrics Grid -->
        <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:8px; margin-bottom:16px;">
          <div style="background:#FFFFFF; border:1px solid #ECE6DE; border-radius:10px; padding:10px 8px; text-align:center; box-shadow:0 1px 3px rgba(0,0,0,0.02);">
            <div style="font-size:1.15rem; font-weight:900; color:#7A2813;">${totalCrafts}</div>
            <div style="font-size:0.62rem; font-weight:700; color:#71655D; text-transform:uppercase;">Listed</div>
          </div>
          <div style="background:#FFFFFF; border:1px solid #ECE6DE; border-radius:10px; padding:10px 8px; text-align:center; box-shadow:0 1px 3px rgba(0,0,0,0.02);">
            <div style="font-size:1.15rem; font-weight:900; color:#15803D;">${totalStock}</div>
            <div style="font-size:0.62rem; font-weight:700; color:#71655D; text-transform:uppercase;">In Stock</div>
          </div>
          <div style="background:#FFFFFF; border:1px solid #ECE6DE; border-radius:10px; padding:10px 8px; text-align:center; box-shadow:0 1px 3px rgba(0,0,0,0.02);">
            <div style="font-size:1.15rem; font-weight:900; color:#1E150F;">${totalSold}</div>
            <div style="font-size:0.62rem; font-weight:700; color:#71655D; text-transform:uppercase;">Sold</div>
          </div>
          <div style="background:#FFFFFF; border:1px solid #ECE6DE; border-radius:10px; padding:10px 8px; text-align:center; box-shadow:0 1px 3px rgba(0,0,0,0.02);">
            <div style="font-size:1.05rem; font-weight:900; color:#7A2813;">₹${(totalValue / 1000).toFixed(1)}k</div>
            <div style="font-size:0.62rem; font-weight:700; color:#71655D; text-transform:uppercase;">Valuation</div>
          </div>
        </div>

        <!-- Search Bar & Filters -->
        <div style="background:#FFFFFF; border:1px solid #ECE6DE; border-radius:12px; padding:10px 12px; margin-bottom:16px; box-shadow:0 1px 4px rgba(0,0,0,0.03);">
          <div style="display:flex; align-items:center; gap:8px; border-bottom:1px solid #F0EAE2; padding-bottom:8px; margin-bottom:8px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input type="text" id="input-craft-search" value="${searchQuery}" placeholder="Search products by title or category..." style="width:100%; border:none; outline:none; font-size:0.8rem; background:transparent; font-weight:600; color:#1E150F;">
            ${searchQuery ? `<button type="button" id="btn-clear-search" style="border:none; background:transparent; color:#A89582; cursor:pointer; font-size:0.8rem;">✕</button>` : ''}
          </div>
          <div style="display:flex; align-items:center; gap:6px;">
            <button type="button" class="filter-chip ${activeFilter === 'all' ? 'active' : ''}" data-filter="all" style="padding:4px 10px; font-size:0.68rem; font-weight:700; border-radius:var(--radius-pill); border:1px solid ${activeFilter === 'all' ? '#7A2813' : '#D8CFC4'}; background:${activeFilter === 'all' ? '#7A2813' : '#FFFFFF'}; color:${activeFilter === 'all' ? '#FFFFFF' : '#71655D'}; cursor:pointer;">
              All (${totalCrafts})
            </button>
            <button type="button" class="filter-chip ${activeFilter === 'ready' ? 'active' : ''}" data-filter="ready" style="padding:4px 10px; font-size:0.68rem; font-weight:700; border-radius:var(--radius-pill); border:1px solid ${activeFilter === 'ready' ? '#15803D' : '#D8CFC4'}; background:${activeFilter === 'ready' ? '#15803D' : '#FFFFFF'}; color:${activeFilter === 'ready' ? '#FFFFFF' : '#71655D'}; cursor:pointer;">
              Ready to Ship
            </button>
            <button type="button" class="filter-chip ${activeFilter === 'low_stock' ? 'active' : ''}" data-filter="low_stock" style="padding:4px 10px; font-size:0.68rem; font-weight:700; border-radius:var(--radius-pill); border:1px solid ${activeFilter === 'low_stock' ? '#C2410C' : '#D8CFC4'}; background:${activeFilter === 'low_stock' ? '#C2410C' : '#FFFFFF'}; color:${activeFilter === 'low_stock' ? '#FFFFFF' : '#71655D'}; cursor:pointer;">
              Low Stock (&lt;5)
            </button>
          </div>
        </div>

        <!-- Craft Listings (All Images and Management Controls) -->
        <div style="display:flex; flex-direction:column; gap:12px;" id="crafts-list-container">
          ${list.length === 0 ? `
            <div style="background:#FFFFFF; border:1.5px dashed #D8CFC4; border-radius:12px; padding:32px 16px; text-align:center;">
              <div style="margin-bottom:8px; display:flex; justify-content:center;">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v4"/><path d="M7 6h10"/><path d="M6 10c0 6 2 10 6 10s6-4 6-10V6H6v4Z"/></svg>
              </div>
              <div style="font-size:0.95rem; font-weight:800; color:#1E150F; margin-bottom:4px;">No products found</div>
              <div style="font-size:0.75rem; color:#71655D; margin-bottom:14px;">Try searching for another name or add a new handcrafted piece to your inventory.</div>
              <button type="button" id="btn-empty-add" style="background:#7A2813; color:#FFFFFF; border:none; border-radius:8px; padding:8px 18px; font-size:0.78rem; font-weight:800; cursor:pointer;">
                + Add Your First Product
              </button>
            </div>
          ` : list.map(craft => `
            <div class="craft-manage-card" data-id="${craft.id}" style="background:#FFFFFF; border:1px solid #ECE6DE; border-radius:12px; overflow:hidden; box-shadow:0 2px 6px rgba(0,0,0,0.03); transition:transform 0.15s ease;">
              
              <!-- Card Header Row: Image + Main Details -->
              <div style="display:flex; padding:12px; gap:12px;">
                
                <!-- Product Image with Zoom Badge -->
                <div style="position:relative; width:95px; height:95px; border-radius:8px; overflow:hidden; flex-shrink:0; background:#F5EFE6; border:1px solid #EAE3D9;">
                  <img src="${craft.image || '/assets/terracotta_pitcher.jpg'}" alt="${craft.title}" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='/assets/terracotta_pitcher.jpg'">
                  <span style="position:absolute; bottom:4px; right:4px; background:rgba(0,0,0,0.6); color:#FFFFFF; border-radius:4px; padding:2px 4px; font-size:0.55rem; font-weight:700; display:inline-flex; align-items:center; gap:2px;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                    <span>Zoom</span>
                  </span>
                </div>

                <!-- Product Information -->
                <div style="flex:1; display:flex; flex-direction:column; justify-content:space-between; min-width:0;">
                  <div>
                    <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:6px;">
                      <span style="background:${craft.status === 'Low Stock' ? '#FEF3C7' : '#DCFCE7'}; color:${craft.status === 'Low Stock' ? '#B45309' : '#15803D'}; font-size:0.62rem; font-weight:800; padding:2px 8px; border-radius:10px; border:1px solid ${craft.status === 'Low Stock' ? '#FDE68A' : '#BBF7D0'};">
                        ${craft.badge || (craft.stock <= 5 ? `• Low Stock (${craft.stock})` : `• Ready (${craft.stock})`)}
                      </span>
                      <span style="font-size:0.68rem; color:#71655D; font-weight:600;">
                        ${craft.soldCount || 0} sold
                      </span>
                    </div>

                    <div style="font-size:0.88rem; font-weight:800; color:#1E150F; margin:4px 0 2px; line-height:1.25; overflow:hidden; text-overflow:ellipsis; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical;" title="${craft.title}">
                      ${craft.title}
                    </div>

                    <div style="font-size:0.68rem; color:#71655D; font-weight:600;">
                      ${craft.category || 'Terracotta Pottery'} • ${craft.cluster || 'Gorakhpur Clay GI #182'}
                    </div>
                  </div>

                  <div style="display:flex; align-items:baseline; justify-content:space-between; margin-top:4px;">
                    <div>
                      <span style="font-size:1.1rem; font-weight:900; color:#7A2813;">₹${craft.price}</span>
                      <span style="font-size:0.68rem; color:#71655D; font-weight:600; margin-left:4px;">(Stock: ${craft.stock || 0} pcs)</span>
                    </div>
                  </div>
                </div>

              </div>

              <!-- Action Bar: Edit, Delete, View -->
              <div style="background:#FAF8F5; border-top:1px solid #ECE6DE; padding:8px 12px; display:flex; align-items:center; justify-content:space-between; gap:8px;">
                
                <button type="button" class="btn-preview-craft" data-id="${craft.id}" style="background:#FFFFFF; border:1px solid #D8CFC4; border-radius:6px; padding:6px 10px; font-size:0.72rem; font-weight:700; color:#1E150F; display:inline-flex; align-items:center; gap:4px; cursor:pointer;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                  <span>Preview</span>
                </button>

                <div style="display:flex; align-items:center; gap:6px;">
                  <!-- Edit Details Button -->
                  <button type="button" class="btn-edit-craft" data-id="${craft.id}" style="background:#FFF0E6; border:1px solid #FCD7C2; border-radius:6px; padding:6px 12px; font-size:0.72rem; font-weight:800; color:#7A2813; display:inline-flex; align-items:center; gap:4px; cursor:pointer;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                    <span>Edit Details</span>
                  </button>

                  <!-- Delete Product Button -->
                  <button type="button" class="btn-delete-craft" data-id="${craft.id}" style="background:#FEF2F2; border:1px solid #FECACA; border-radius:6px; padding:6px 10px; font-size:0.72rem; font-weight:800; color:#DC2626; display:inline-flex; align-items:center; gap:4px; cursor:pointer;" title="Delete Product">
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                    <span>Delete</span>
                  </button>
                </div>

              </div>

            </div>
          `).join('')}
        </div>

        <!-- Sticky Floating Bar at bottom to quickly add new craft -->
        <div style="position:fixed; bottom:14px; left:50%; transform:translateX(-50%); width:calc(100% - 28px); max-width:420px; z-index:40; display:flex; gap:8px;">
          <button type="button" id="btn-floating-add-quick" style="flex:1; background:#7A2813; color:#FFFFFF; border:none; border-radius:12px; padding:12px; font-size:0.85rem; font-weight:800; display:flex; align-items:center; justify-content:center; gap:8px; cursor:pointer; box-shadow:0 6px 18px rgba(122,40,19,0.35);">
            <span style="font-size:1.1rem; line-height:1;">+</span>
            <span>Add New Product</span>
          </button>
          <button type="button" id="btn-floating-ai-studio" style="background:#FFFFFF; color:#7A2813; border:1.5px solid #7A2813; border-radius:12px; padding:12px 14px; font-size:0.8rem; font-weight:800; display:flex; align-items:center; justify-content:center; gap:6px; cursor:pointer; box-shadow:0 4px 12px rgba(0,0,0,0.06);" title="4-Step Voice & Photo Studio">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
            <span>AI Studio</span>
          </button>
        </div>

      </div>

      <!-- ============================================== -->
      <!-- MODAL 1: EDIT CRAFT DETAILS                    -->
      <!-- ============================================== -->
      <div class="modal-overlay" id="modal-edit-craft">
        <div class="bottom-sheet" style="max-height:92vh; padding-bottom:24px;">
          <div class="sheet-header">
            <div class="sheet-title-group">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
              <div>
                <div style="font-size:0.95rem; font-weight:800; color:#1E150F;">Edit Craft Details</div>
                <div style="font-size:0.68rem; color:#71655D;">Update product pricing, stock availability, photos and story</div>
              </div>
            </div>
            <button type="button" class="sheet-close-btn" id="btn-close-edit-modal">✕</button>
          </div>

          <form id="form-edit-craft" style="display:flex; flex-direction:column; gap:12px; margin-top:8px;">
            <input type="hidden" id="edit-craft-id" value="">

            <!-- Title Field -->
            <div>
              <label for="edit-craft-title" style="display:block; font-size:0.75rem; font-weight:800; color:#1E150F; margin-bottom:4px;">
                Product Title *
              </label>
              <input type="text" id="edit-craft-title" required style="width:100%; border:1px solid #D8CFC4; border-radius:8px; padding:9px 12px; font-size:0.85rem; font-weight:700; color:#1E150F; outline:none; background:#FFFDFB;">
            </div>

            <!-- Price & Stock Row -->
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
              <div>
                <label for="edit-craft-price" style="display:block; font-size:0.75rem; font-weight:800; color:#1E150F; margin-bottom:4px;">
                  Listing Price (₹) *
                </label>
                <input type="number" id="edit-craft-price" min="10" required style="width:100%; border:1px solid #D8CFC4; border-radius:8px; padding:9px 12px; font-size:0.95rem; font-weight:900; color:#7A2813; outline:none; background:#FFFDFB;">
              </div>
              <div>
                <label for="edit-craft-stock" style="display:block; font-size:0.75rem; font-weight:800; color:#1E150F; margin-bottom:4px;">
                  Units In Stock *
                </label>
                <input type="number" id="edit-craft-stock" min="0" required style="width:100%; border:1px solid #D8CFC4; border-radius:8px; padding:9px 12px; font-size:0.95rem; font-weight:900; color:#15803D; outline:none; background:#FFFDFB;">
              </div>
            </div>

            <!-- Category & Status Row -->
            <div style="display:grid; grid-template-columns:1.2fr 0.8fr; gap:10px;">
              <div>
                <label for="edit-craft-category" style="display:block; font-size:0.75rem; font-weight:800; color:#1E150F; margin-bottom:4px;">
                  Craft Category
                </label>
                <select id="edit-craft-category" style="width:100%; border:1px solid #D8CFC4; border-radius:8px; padding:9px 10px; font-size:0.8rem; font-weight:700; color:#1E150F; background:#FFFDFB;">
                  <option value="Terracotta Pottery">Terracotta Pottery</option>
                  <option value="Banarasi Handloom">Banarasi Handloom</option>
                  <option value="Dhokra Brass Metal">Dhokra Brass Metal</option>
                  <option value="Chunar Clayware">Chunar Clayware</option>
                  <option value="Wooden Carvings">Wooden Carvings</option>
                </select>
              </div>
              <div>
                <label for="edit-craft-status" style="display:block; font-size:0.75rem; font-weight:800; color:#1E150F; margin-bottom:4px;">
                  Status
                </label>
                <select id="edit-craft-status" style="width:100%; border:1px solid #D8CFC4; border-radius:8px; padding:9px 10px; font-size:0.8rem; font-weight:700; color:#1E150F; background:#FFFDFB;">
                  <option value="Ready">Ready</option>
                  <option value="Low Stock">Low Stock</option>
                  <option value="Made to Order">Made to Order</option>
                </select>
              </div>
            </div>

            <!-- Image Selection / URL -->
            <div>
              <label style="display:block; font-size:0.75rem; font-weight:800; color:#1E150F; margin-bottom:4px;">
                Product Image
              </label>
              <div style="display:flex; align-items:center; gap:8px; margin-bottom:6px;">
                <img id="edit-craft-img-preview" src="/assets/terracotta_pitcher.jpg" alt="Preview" style="width:48px; height:48px; border-radius:6px; object-fit:cover; border:1px solid #D8CFC4;">
                <input type="text" id="edit-craft-image" placeholder="Image URL or choose preset below" style="flex:1; border:1px solid #D8CFC4; border-radius:8px; padding:8px 10px; font-size:0.75rem; color:#1E150F;">
              </div>
              <div style="display:flex; gap:6px; overflow-x:auto; padding-bottom:4px;">
                ${imagePresets.map(p => `
                  <button type="button" class="btn-preset-img" data-url="${p.url}" style="flex-shrink:0; background:#FFF0E6; border:1px solid #FCD7C2; border-radius:6px; padding:3px 7px; font-size:0.65rem; font-weight:700; color:#7A2813; cursor:pointer;">
                    ${p.label}
                  </button>
                `).join('')}
              </div>
            </div>

            <!-- Story / Description -->
            <div>
              <label for="edit-craft-story" style="display:block; font-size:0.75rem; font-weight:800; color:#1E150F; margin-bottom:4px;">
                Heritage Story &amp; Details
              </label>
              <textarea id="edit-craft-story" rows="3" style="width:100%; border:1px solid #D8CFC4; border-radius:8px; padding:8px 12px; font-size:0.78rem; font-weight:500; color:#1E150F; outline:none; background:#FFFDFB; line-height:1.35; resize:none;"></textarea>
            </div>

            <!-- Save Changes Buttons -->
            <div style="display:flex; gap:10px; margin-top:8px;">
              <button type="button" id="btn-cancel-edit" style="flex:1; background:#F5EFE6; border:none; border-radius:8px; padding:12px; font-size:0.85rem; font-weight:800; color:#71655D; cursor:pointer;">
                Cancel
              </button>
              <button type="submit" id="btn-save-edit" style="flex:2; background:#7A2813; border:none; border-radius:8px; padding:12px; font-size:0.85rem; font-weight:800; color:#FFFFFF; cursor:pointer; box-shadow:0 3px 10px rgba(122,40,19,0.3);">
                Save Changes ✓
              </button>
            </div>

          </form>
        </div>
      </div>

      <!-- ============================================== -->
      <!-- MODAL 2: ADD NEW PRODUCT MODAL                 -->
      <!-- ============================================== -->
      <div class="modal-overlay" id="modal-add-craft">
        <div class="bottom-sheet" style="max-height:92vh; padding-bottom:24px;">
          <div class="sheet-header">
            <div class="sheet-title-group">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
              <div>
                <div style="font-size:0.95rem; font-weight:800; color:#1E150F;">Add New Product to Marketplace</div>
                <div style="font-size:0.68rem; color:#71655D;">List handcrafted items directly to national and global buyers</div>
              </div>
            </div>
            <button type="button" class="sheet-close-btn" id="btn-close-add-modal">✕</button>
          </div>

          <!-- Quick Banner for 4-Step Voice Studio -->
          <div style="background:linear-gradient(135deg, #7A2813 0%, #A24218 100%); color:#FFFFFF; border-radius:10px; padding:12px 14px; margin-bottom:12px; display:flex; align-items:center; justify-content:space-between; cursor:pointer;" id="banner-launch-studio">
            <div style="display:flex; align-items:center; gap:8px;">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
              <div>
                <div style="font-size:0.85rem; font-weight:800;">Want Voice Listing Assistance?</div>
                <div style="font-size:0.68rem; opacity:0.9;">Use our 4-Step AI Wheel Studio with photo enhancement</div>
              </div>
            </div>
            <span style="font-size:0.75rem; font-weight:800; background:rgba(255,255,255,0.2); padding:4px 8px; border-radius:6px;">Launch →</span>
          </div>

          <div style="text-align:center; font-size:0.68rem; font-weight:800; color:#71655D; margin-bottom:10px; position:relative;">
            <span style="background:#FAF8F5; padding:0 8px; position:relative; z-index:2;">OR FILL QUICK DETAILS BELOW</span>
            <div style="position:absolute; top:50%; left:0; right:0; height:1px; background:#ECE6DE;"></div>
          </div>

          <form id="form-add-craft" style="display:flex; flex-direction:column; gap:12px;">
            <div>
              <label for="add-craft-title" style="display:block; font-size:0.75rem; font-weight:800; color:#1E150F; margin-bottom:4px;">
                Craft Title *
              </label>
              <input type="text" id="add-craft-title" required placeholder="e.g. Handcrafted Varanasi Terracotta Diya Plaque" style="width:100%; border:1px solid #D8CFC4; border-radius:8px; padding:9px 12px; font-size:0.85rem; font-weight:700; color:#1E150F; outline:none; background:#FFFDFB;">
            </div>

            <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
              <div>
                <label for="add-craft-price" style="display:block; font-size:0.75rem; font-weight:800; color:#1E150F; margin-bottom:4px;">
                  Price (₹) *
                </label>
                <input type="number" id="add-craft-price" min="10" required placeholder="e.g. 850" style="width:100%; border:1px solid #D8CFC4; border-radius:8px; padding:9px 12px; font-size:0.95rem; font-weight:900; color:#7A2813; outline:none; background:#FFFDFB;">
              </div>
              <div>
                <label for="add-craft-stock" style="display:block; font-size:0.75rem; font-weight:800; color:#1E150F; margin-bottom:4px;">
                  Initial Stock *
                </label>
                <input type="number" id="add-craft-stock" min="1" value="10" required style="width:100%; border:1px solid #D8CFC4; border-radius:8px; padding:9px 12px; font-size:0.95rem; font-weight:900; color:#15803D; outline:none; background:#FFFDFB;">
              </div>
            </div>

            <div>
              <label for="add-craft-category" style="display:block; font-size:0.75rem; font-weight:800; color:#1E150F; margin-bottom:4px;">
                Category &amp; Craft Cluster
              </label>
              <select id="add-craft-category" style="width:100%; border:1px solid #D8CFC4; border-radius:8px; padding:9px 10px; font-size:0.8rem; font-weight:700; color:#1E150F; background:#FFFDFB;">
                <option value="Terracotta Pottery">Terracotta Pottery • Gorakhpur GI #182</option>
                <option value="Banarasi Handloom">Banarasi Handloom • Varanasi Silk</option>
                <option value="Dhokra Brass Metal">Dhokra Brass Metal • Bastar Guild</option>
                <option value="Chunar Clayware">Chunar Red Glazed Clayware</option>
                <option value="Wooden Carvings">Saharanpur Wooden Carvings</option>
              </select>
            </div>

            <div>
              <label style="display:block; font-size:0.75rem; font-weight:800; color:#1E150F; margin-bottom:4px;">
                Choose Sample Craft Photo
              </label>
              <div style="display:flex; align-items:center; gap:8px; margin-bottom:6px;">
                <img id="add-craft-img-preview" src="/assets/terracotta_pitcher.jpg" alt="Preview" style="width:48px; height:48px; border-radius:6px; object-fit:cover; border:1px solid #D8CFC4;">
                <input type="text" id="add-craft-image" value="/assets/terracotta_pitcher.jpg" placeholder="Image URL or choose below" style="flex:1; border:1px solid #D8CFC4; border-radius:8px; padding:8px 10px; font-size:0.75rem; color:#1E150F;">
              </div>
              <div style="display:flex; gap:6px; overflow-x:auto; padding-bottom:4px;">
                ${imagePresets.map(p => `
                  <button type="button" class="btn-preset-add-img" data-url="${p.url}" style="flex-shrink:0; background:#FFF0E6; border:1px solid #FCD7C2; border-radius:6px; padding:3px 7px; font-size:0.65rem; font-weight:700; color:#7A2813; cursor:pointer;">
                    ${p.label}
                  </button>
                `).join('')}
              </div>
            </div>

            <div>
              <label for="add-craft-story" style="display:block; font-size:0.75rem; font-weight:800; color:#1E150F; margin-bottom:4px;">
                Product Story / Artisan Note
              </label>
              <textarea id="add-craft-story" rows="2" placeholder="Brief heritage note about materials, clay source, or tradition..." style="width:100%; border:1px solid #D8CFC4; border-radius:8px; padding:8px 12px; font-size:0.78rem; font-weight:500; color:#1E150F; outline:none; background:#FFFDFB; line-height:1.35; resize:none;"></textarea>
            </div>

            <div style="display:flex; gap:10px; margin-top:8px;">
              <button type="button" id="btn-cancel-add" style="flex:1; background:#F5EFE6; border:none; border-radius:8px; padding:12px; font-size:0.85rem; font-weight:800; color:#71655D; cursor:pointer;">
                Cancel
              </button>
              <button type="submit" id="btn-submit-add" style="flex:2; background:#7A2813; border:none; border-radius:8px; padding:12px; font-size:0.85rem; font-weight:800; color:#FFFFFF; cursor:pointer; box-shadow:0 3px 10px rgba(122,40,19,0.3);">
                Publish to Marketplace ✓
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- ============================================== -->
      <!-- MODAL 3: DELETE CONFIRMATION MODAL             -->
      <!-- ============================================== -->
      <div class="modal-overlay" id="modal-delete-craft">
        <div class="bottom-sheet" style="padding-bottom:24px; text-align:center;">
          <div style="width:54px; height:54px; border-radius:50%; background:#FEE2E2; color:#7A2813; display:flex; align-items:center; justify-content:center; margin:0 auto 12px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
          </div>
          <h3 style="font-size:1.05rem; font-weight:800; color:#1E150F; margin:0 0 6px 0;">
            Delete Product Listing?
          </h3>
          <p id="delete-confirm-text" style="font-size:0.78rem; color:#71655D; margin:0 0 16px 0; line-height:1.4;">
            Are you sure you want to remove this craft from your active marketplace listings?
          </p>

          <div style="background:#FFF9F5; border:1px solid #FCD7C2; border-radius:10px; padding:10px; display:flex; align-items:center; gap:10px; margin-bottom:16px; text-align:left;">
            <img id="delete-craft-thumb" src="/assets/terracotta_pitcher.jpg" alt="Thumb" style="width:48px; height:48px; border-radius:6px; object-fit:cover; border:1px solid #ECE6DE;">
            <div style="min-width:0; flex:1;">
              <div id="delete-craft-title" style="font-size:0.85rem; font-weight:800; color:#1E150F; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                Craft Title
              </div>
              <div id="delete-craft-meta" style="font-size:0.72rem; color:#7A2813; font-weight:700;">
                ₹0 • 0 in stock
              </div>
            </div>
          </div>

          <div style="display:flex; gap:10px;">
            <button type="button" id="btn-cancel-delete" style="flex:1; background:#F5EFE6; border:none; border-radius:8px; padding:12px; font-size:0.85rem; font-weight:800; color:#71655D; cursor:pointer;">
              Keep Product
            </button>
            <button type="button" id="btn-confirm-delete" style="flex:1; background:#DC2626; border:none; border-radius:8px; padding:12px; font-size:0.85rem; font-weight:800; color:#FFFFFF; cursor:pointer; box-shadow:0 3px 10px rgba(220,38,38,0.3);">
              Yes, Delete Product
            </button>
          </div>
        </div>
      </div>
    `;

    attachEventHandlers();
  }

  function attachEventHandlers() {
    // Back to Studio
    container.querySelector('#btn-back-to-studio')?.addEventListener('click', () => {
      window.navigateToScreen('artisan_studio');
    });

    // Search bar
    const searchInput = container.querySelector('#input-craft-search');
    searchInput?.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderView();
      // Keep focus on input after render
      const newInput = container.querySelector('#input-craft-search');
      if (newInput) {
        newInput.focus();
        newInput.setSelectionRange(newInput.value.length, newInput.value.length);
      }
    });

    container.querySelector('#btn-clear-search')?.addEventListener('click', () => {
      searchQuery = '';
      renderView();
    });

    // Filter chips
    container.querySelectorAll('.filter-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        activeFilter = btn.dataset.filter;
        renderView();
      });
    });

    // Open Add Modal
    const openAddModal = () => {
      const modal = container.querySelector('#modal-add-craft');
      if (modal) modal.classList.add('active');
    };

    container.querySelector('#btn-open-add-modal')?.addEventListener('click', openAddModal);
    container.querySelector('#btn-floating-add-quick')?.addEventListener('click', openAddModal);
    container.querySelector('#btn-empty-add')?.addEventListener('click', openAddModal);

    // Launch AI Voice Studio
    container.querySelector('#banner-launch-studio')?.addEventListener('click', () => {
      window.navigateToScreen('craft_studio');
    });
    container.querySelector('#btn-floating-ai-studio')?.addEventListener('click', () => {
      window.navigateToScreen('craft_studio');
    });

    // Close Add Modal
    container.querySelector('#btn-close-add-modal')?.addEventListener('click', () => {
      container.querySelector('#modal-add-craft')?.classList.remove('active');
    });
    container.querySelector('#btn-cancel-add')?.addEventListener('click', () => {
      container.querySelector('#modal-add-craft')?.classList.remove('active');
    });

    // Preset images in Add Modal
    container.querySelectorAll('.btn-preset-add-img').forEach(btn => {
      btn.addEventListener('click', () => {
        const url = btn.dataset.url;
        const imgInput = container.querySelector('#add-craft-image');
        const imgPreview = container.querySelector('#add-craft-img-preview');
        if (imgInput) imgInput.value = url;
        if (imgPreview) imgPreview.src = url;
      });
    });

    // Submit Add Modal
    container.querySelector('#form-add-craft')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = container.querySelector('#add-craft-title')?.value.trim();
      const price = parseInt(container.querySelector('#add-craft-price')?.value, 10) || 500;
      const stock = parseInt(container.querySelector('#add-craft-stock')?.value, 10) || 10;
      const category = container.querySelector('#add-craft-category')?.value || 'Terracotta Pottery';
      const image = container.querySelector('#add-craft-image')?.value.trim() || '/assets/terracotta_pitcher.jpg';
      const story = container.querySelector('#add-craft-story')?.value.trim() || 'Handmade authentic artisan creation.';

      if (!title) {
        window.showToast?.('Please enter a product title.');
        return;
      }

      State.publishCraft({
        title,
        price,
        stock,
        category,
        image,
        storyHindi: story,
        englishTranslation: story
      });

      container.querySelector('#modal-add-craft')?.classList.remove('active');
      window.showToast?.(`✓ '${title}' added to active marketplace!`);
      renderView();
    });

    // Edit Product Click
    container.querySelectorAll('.btn-edit-craft').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.dataset.id;
        craftToEdit = (State.artisan?.activeCrafts || []).find(c => c.id === id);
        if (!craftToEdit) return;

        // Populate edit modal
        const modal = container.querySelector('#modal-edit-craft');
        if (modal) {
          container.querySelector('#edit-craft-id').value = craftToEdit.id;
          container.querySelector('#edit-craft-title').value = craftToEdit.title;
          container.querySelector('#edit-craft-price').value = craftToEdit.price;
          container.querySelector('#edit-craft-stock').value = craftToEdit.stock || 10;
          container.querySelector('#edit-craft-category').value = craftToEdit.category || 'Terracotta Pottery';
          container.querySelector('#edit-craft-status').value = craftToEdit.status || 'Ready';
          container.querySelector('#edit-craft-image').value = craftToEdit.image || '';
          container.querySelector('#edit-craft-img-preview').src = craftToEdit.image || '/assets/terracotta_pitcher.jpg';
          container.querySelector('#edit-craft-story').value = craftToEdit.englishTranslation || craftToEdit.storyHindi || '';
          modal.classList.add('active');
        }
      });
    });

    // Preset images in Edit Modal
    container.querySelectorAll('.btn-preset-img').forEach(btn => {
      btn.addEventListener('click', () => {
        const url = btn.dataset.url;
        const imgInput = container.querySelector('#edit-craft-image');
        const imgPreview = container.querySelector('#edit-craft-img-preview');
        if (imgInput) imgInput.value = url;
        if (imgPreview) imgPreview.src = url;
      });
    });

    // Image URL change live preview
    container.querySelector('#edit-craft-image')?.addEventListener('input', (e) => {
      const preview = container.querySelector('#edit-craft-img-preview');
      if (preview && e.target.value) preview.src = e.target.value;
    });

    // Close Edit Modal
    container.querySelector('#btn-close-edit-modal')?.addEventListener('click', () => {
      container.querySelector('#modal-edit-craft')?.classList.remove('active');
    });
    container.querySelector('#btn-cancel-edit')?.addEventListener('click', () => {
      container.querySelector('#modal-edit-craft')?.classList.remove('active');
    });

    // Submit Edit Modal
    container.querySelector('#form-edit-craft')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = container.querySelector('#edit-craft-id')?.value;
      const title = container.querySelector('#edit-craft-title')?.value.trim();
      const price = parseInt(container.querySelector('#edit-craft-price')?.value, 10);
      const stock = parseInt(container.querySelector('#edit-craft-stock')?.value, 10);
      const category = container.querySelector('#edit-craft-category')?.value;
      const status = container.querySelector('#edit-craft-status')?.value;
      const image = container.querySelector('#edit-craft-image')?.value.trim();
      const story = container.querySelector('#edit-craft-story')?.value.trim();

      if (!id || !title) return;

      State.updateCraft(id, {
        title,
        price,
        stock,
        category,
        status,
        image: image || '/assets/terracotta_pitcher.jpg',
        englishTranslation: story,
        storyHindi: story
      });

      container.querySelector('#modal-edit-craft')?.classList.remove('active');
      window.showToast?.(`✓ '${title}' updated successfully!`);
      renderView();
    });

    // Delete Product Click
    container.querySelectorAll('.btn-delete-craft').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.dataset.id;
        craftToDelete = (State.artisan?.activeCrafts || []).find(c => c.id === id);
        if (!craftToDelete) return;

        const modal = container.querySelector('#modal-delete-craft');
        if (modal) {
          container.querySelector('#delete-craft-thumb').src = craftToDelete.image || '/assets/terracotta_pitcher.jpg';
          container.querySelector('#delete-craft-title').textContent = craftToDelete.title;
          container.querySelector('#delete-craft-meta').textContent = `₹${craftToDelete.price} • ${craftToDelete.stock || 0} units in stock`;
          modal.classList.add('active');
        }
      });
    });

    // Confirm Delete
    container.querySelector('#btn-confirm-delete')?.addEventListener('click', () => {
      if (!craftToDelete) return;
      const deletedTitle = craftToDelete.title;
      State.deleteCraft(craftToDelete.id);
      craftToDelete = null;

      container.querySelector('#modal-delete-craft')?.classList.remove('active');
      window.showToast?.(`🗑️ '${deletedTitle}' deleted from inventory.`);
      renderView();
    });

    // Cancel Delete
    container.querySelector('#btn-cancel-delete')?.addEventListener('click', () => {
      craftToDelete = null;
      container.querySelector('#modal-delete-craft')?.classList.remove('active');
    });

    // Preview in Marketplace
    container.querySelectorAll('.btn-preview-craft').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.dataset.id;
        const craft = (State.artisan?.activeCrafts || []).find(c => c.id === id);
        if (craft) {
          State.selectedCraft = craft;
          window.navigateToScreen('product_details');
        }
      });
    });

    // Click anywhere outside sheets to close
    ['#modal-edit-craft', '#modal-add-craft', '#modal-delete-craft'].forEach(id => {
      const modal = container.querySelector(id);
      modal?.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
      });
    });
  }

  renderView();
}
