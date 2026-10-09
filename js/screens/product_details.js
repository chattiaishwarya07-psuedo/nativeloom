/**
 * Screen: Craft Product Details
 * Fully dynamic rendering reflecting the exact selected craft, artisan, cluster, and materials
 */

import { State } from '../state.js';
import { AudioAssistance } from '../speech.js';

export function renderProductDetailsScreen(container) {
  let isTranscriptOpen = false;
  let isDescriptionOpen = false;
  let isPlayingAudio = false;

  // 1. Resolve Active Craft
  const activeCraft = State.selectedCraft || State.data?.crafts?.[0] || {
    id: 'craft-terracotta-pitcher',
    title: 'Hand-Carved Terracotta Water Surahi Pitcher',
    category: 'Terracotta Pottery',
    cluster: 'Gorakhpur & Varanasi Terracotta Cluster',
    price: 1450,
    originalPrice: 1850,
    stock: 8,
    image: '/assets/terracotta_pitcher.jpg',
    images: ['/assets/terracotta_pitcher.jpg', '/assets/raw_pottery_snap.jpg', '/assets/clay_wall_plate.jpg', '/assets/handcrafted_diyas.jpg'],
    volume: '1.8 Litres'
  };

  // 2. Resolve Artisan & Cluster Data
  const artisanObj = (activeCraft.artisanId ? State.data?.getArtisan?.(activeCraft.artisanId) : null) ||
    (State.data?.artisans?.find(a => a.name === activeCraft.artisan || a.name === activeCraft.artisanName || a.id === activeCraft.artisanId)) ||
    {
      name: activeCraft.artisan || activeCraft.artisanName || 'Master Artisan',
      craftTitle: activeCraft.category ? `Master Artisan (${activeCraft.category})` : 'Master Craftsman',
      pehchanId: activeCraft.pehchanId || 'UP-VAR-49281',
      avatar: '/assets/artisan_ramulu.jpg',
      trustScore: 98,
      clusterId: activeCraft.clusterId || 'cl-varanasi-terracotta',
      bankName: 'Bank of Baroda',
      preferredDialect: 'Hindi',
      bio: 'National Merit Master Artisan dedicated to authentic handmade GI craft traditions.'
    };

  const clusterObj = (activeCraft.clusterId ? State.data?.getCluster?.(activeCraft.clusterId) : null) ||
    (artisanObj?.clusterId ? State.data?.getCluster?.(artisanObj.clusterId) : null) ||
    (State.data?.clusters?.find(c => c.name === activeCraft.cluster)) ||
    {
      name: activeCraft.cluster || 'Verified Heritage Cluster',
      giTagNumber: activeCraft.giTag || activeCraft.giTagNumber || 'GI #182',
      state: 'Uttar Pradesh'
    };

  // 3. Resolve Gallery Images (always provide 4 distinct/relevant angles)
  const heroImage = activeCraft.image || activeCraft.images?.[0] || '/assets/terracotta_pitcher.jpg';
  let galleryImages = (activeCraft.images && activeCraft.images.length > 0) ? [...activeCraft.images] : [heroImage];
  if (galleryImages.length < 4) {
    if (activeCraft.category?.toLowerCase().includes('wood')) {
      const fillers = ['/assets/woodcraft_bowl.jpg', '/assets/teak_lumber.jpg', '/assets/silver_wire_spools.jpg', '/assets/woodcraft_bowl.jpg'];
      galleryImages = [...galleryImages, ...fillers].slice(0, 4);
    } else if (activeCraft.category?.toLowerCase().includes('brass') || activeCraft.category?.toLowerCase().includes('metal')) {
      const fillers = ['/assets/dhokra_brass.jpg', '/assets/bidriware_vase.jpg', '/assets/silver_wire_spools.jpg', '/assets/dhokra_brass.jpg'];
      galleryImages = [...galleryImages, ...fillers].slice(0, 4);
    } else if (activeCraft.category?.toLowerCase().includes('silk') || activeCraft.category?.toLowerCase().includes('handloom')) {
      const fillers = ['/assets/ikat_saree.jpg', '/assets/silver_wire_spools.jpg', '/assets/ikat_saree.jpg', '/assets/silver_wire_spools.jpg'];
      galleryImages = [...galleryImages, ...fillers].slice(0, 4);
    } else if (activeCraft.category?.toLowerCase().includes('blue pottery')) {
      const fillers = ['/assets/blue_pottery.jpg', '/assets/blue_pottery.jpg', '/assets/bidriware_vase.jpg', '/assets/blue_pottery.jpg'];
      galleryImages = [...galleryImages, ...fillers].slice(0, 4);
    } else {
      const fillers = ['/assets/terracotta_pitcher.jpg', '/assets/raw_pottery_snap.jpg', '/assets/clay_wall_plate.jpg', '/assets/handcrafted_diyas.jpg'];
      galleryImages = [...galleryImages, ...fillers].slice(0, 4);
    }
  }

  // 4. Resolve Specifications / Dimensions Badge
  const dimensionSpec = activeCraft.volume || activeCraft.specification || activeCraft.dimensions || 'Handcrafted Standard';
  let dimensionIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>`;
  if (dimensionSpec.toLowerCase().includes('inch') || dimensionSpec.toLowerCase().includes('m ') || dimensionSpec.toLowerCase().includes('x')) {
    dimensionIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21.3 8.7 8.7 21.3c-1 1-2.5 1-3.4 0l-2.6-2.6c-1-1-1-2.5 0-3.4L15.3 2.7c1-1 2.5-1 3.4 0l2.6 2.6c1 1 1 2.5 0 3.4Z"/><path d="m14.5 3.5 2 2"/><path d="m11.5 6.5 2 2"/><path d="m8.5 9.5 2 2"/><path d="m5.5 12.5 2 2"/></svg>`;
  } else if (dimensionSpec.toLowerCase().includes('set') || dimensionSpec.toLowerCase().includes('piece')) {
    dimensionIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="8" x="2" y="2" rx="1"/><rect width="8" height="8" x="14" y="2" rx="1"/><rect width="8" height="8" x="2" y="14" rx="1"/><rect width="8" height="8" x="14" y="14" rx="1"/></svg>`;
  }

  // 5. Dynamic Credibility Value Badges
  let badge2Text = '100% River Clay';
  let badge2Icon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>`;
  if (activeCraft.category?.toLowerCase().includes('wood')) {
    badge2Text = 'Seasoned Sheesham';
    badge2Icon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`;
  } else if (activeCraft.category?.toLowerCase().includes('brass') || activeCraft.category?.toLowerCase().includes('metal')) {
    badge2Text = 'Lost-Wax Cast';
    badge2Icon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>`;
  } else if (activeCraft.category?.toLowerCase().includes('silk') || activeCraft.category?.toLowerCase().includes('handloom')) {
    badge2Text = '100% Pure Katan';
    badge2Icon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>`;
  } else if (activeCraft.category?.toLowerCase().includes('blue pottery')) {
    badge2Text = 'Quartz Glazed';
    badge2Icon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12l4 6-10 13L2 9z"/></svg>`;
  } else if (activeCraft.attributes?.[1]) {
    badge2Text = activeCraft.attributes[1];
  }

  let badge3Text = artisanObj.craftTitle ? artisanObj.craftTitle.split('&')[0].trim() : 'Master Artisan';
  let badge3Icon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`;
  if (activeCraft.category?.toLowerCase().includes('silk') || activeCraft.category?.toLowerCase().includes('handloom')) {
    badge3Icon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>`;
  }

  // 6. Oral History Transcript
  const oralTranscript = activeCraft.voiceDescription?.translatedText ||
    activeCraft.englishTranslation ||
    activeCraft.voiceDescription?.originalText ||
    artisanObj.bio ||
    `Namaste. I am ${artisanObj.name}. For generations our family has dedicated our lives to handcrafting authentic ${activeCraft.category || 'heritage pieces'} with natural materials.`;

  // 7. Dynamic Creation Steps
  function getCreationSteps(category) {
    const cat = (category || '').toLowerCase();
    if (cat.includes('wood')) {
      return [
        { step: '1. Sustainable Wood Seasoning', desc: 'Air-dried North Indian Sheesham wood cured for 6 months to prevent humidity warp.' },
        { step: '2. Geometric Graph Marking', desc: 'Precision layout of ancient Persian and Mughal Jaali lattice geometry.' },
        { step: '3. Hand-Chisel Fretwork', desc: 'Intricate openwork perforation chiseled entirely with hereditary hand tools.' },
        { step: '4. Pure Brass Inlay', desc: 'Hand-cut pure brass wire filigree hammered seamlessly into surface recesses.' },
        { step: '5. Natural Beeswax Buffing', desc: 'Buffed with natural beeswax for a durable, non-toxic heirloom sheen.' }
      ];
    }
    if (cat.includes('brass') || cat.includes('metal')) {
      return [
        { step: '1. Clay Core Sculpting', desc: 'Base form molded from riverbed alluvium and dried in shaded woodland breeze.' },
        { step: '2. Beeswax Thread Coiling', desc: 'Fine threads of pure bee honey wax hand-coiled across the clay core.' },
        { step: '3. Outer Refractory Mold', desc: 'Sealed with layers of clay mixed with paddy husk and charcoal ashes.' },
        { step: '4. Lost-Wax Metal Pouring', desc: 'Molten bell-metal alloy displaced the drained beeswax at 1,100°C.' },
        { step: '5. Hand-Chisel Cleaning & Patina', desc: 'Hand-buffed with river sand and wire brushes for antique acoustic resonance.' }
      ];
    }
    if (cat.includes('blue pottery')) {
      return [
        { step: '1. Clay-Free Dough Kneading', desc: 'Dough kneaded from crushed quartz stone, glass powder, and fuller earth (multani mitti).' },
        { step: '2. Open Mold Forming', desc: 'Shaped into shallow pottery forms without standard clay or pottery wheel.' },
        { step: '3. Cobalt Floral Painting', desc: 'Hand-painted delicate botanical arabesques using pure cobalt and copper oxides.' },
        { step: '4. Silicate Glaze Bath', desc: 'Dipped in clear non-lead glass glaze for luminous porcelain-like protection.' },
        { step: '5. Low-Fire Kiln Firing', desc: 'Fired once at 800°C for characteristic turquoise glow and crackle texture.' }
      ];
    }
    if (cat.includes('silk') || cat.includes('handloom')) {
      return [
        { step: '1. Pure Mulberry Silk Twisting', desc: 'High-twist Katan silk filaments sorted and spun for exceptional tensile strength.' },
        { step: '2. Natural Dye Bath', desc: 'Yarn steeped in organic botanical and mineral pigment vats for colorfast saturation.' },
        { step: '3. Kadwa Warp Loom Setup', desc: 'Traditional wooden pit loom threaded with over 4,000 individual warp strands.' },
        { step: '4. Electroplated Silver Zari', desc: 'Hand-interwoven real silver electroplated zari in traditional Mughal floral butas.' },
        { step: '5. Master Guild Quality Check', desc: 'Inspected under natural daylight by master weaver before loom release.' }
      ];
    }
    return [
      { step: '1. Silt Clay Sourcing', desc: 'Harvested from pristine Gomati and Rapti riverbed alluvium.' },
      { step: '2. Hand-Turning on Wheel', desc: 'Balanced wall thickness on traditional wooden kick-wheel.' },
      { step: '3. Jaali Perforation', desc: 'Hand-carved breathing pores while leather-hard for natural evaporative chilling.' },
      { step: '4. Neem Shade Curing', desc: 'Slow drying for 48 hours in neem shade without cracking.' },
      { step: '5. Pit Husk Firing', desc: 'Fired at 900°C with rice husk fuel for durable earthenware structure.' }
    ];
  }
  const creationSteps = getCreationSteps(activeCraft.category);

  // 8. Dynamic Commission Customization Configurations
  const craftCategory = (activeCraft.category || '').toLowerCase();
  const svgTerracottaBox = `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>`;
  const svgTerracottaMotif = `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
  let customSectionVolumeLabel = 'Select Vessel Volume / Capacity';
  let customSectionVolumeIcon = svgTerracottaBox;
  let customSectionMotifLabel = 'Custom Motif / Floral Design';
  let customSectionMotifIcon = svgTerracottaMotif;
  let customPill1Text = 'Custom Monogram / Name Engraving';
  let customPill2Text = 'Specific Volume (1L - 5L)';
  let customPill3Text = 'Custom Motif / Floral Design';
  let customVolOptions = [];
  let customMotifOptions = [];

  if (craftCategory.includes('wood')) {
    customSectionVolumeLabel = 'Select Keepsake Box Dimensions';
    customSectionVolumeIcon = svgTerracottaBox;
    customSectionMotifLabel = 'Custom Lattice Jaali Fretwork';
    customSectionMotifIcon = svgTerracottaMotif;
    customPill1Text = 'Custom Monogram / Brass Inlay';
    customPill2Text = 'Custom Dimensions (6" - 16")';
    customPill3Text = 'Custom Jaali Fretwork Pattern';
    customVolOptions = [
      { vol: '6x4x2.5 in', price: 750, label: '6 x 4 x 2.5 in (Desk Keepsake)', note: '★ Traditional Jaali Box', active: false },
      { vol: '8x5x3 in', price: 950, label: '8 x 5 x 3 in (Standard)', note: '★ Traditional Jaali Box', active: true },
      { vol: '12x8x5 in', price: 1650, label: '12 x 8 x 5 in (Heirloom Chest)', note: 'Jewelry & document chest', active: false },
      { vol: '16x10x6 in', price: 2400, label: '16 x 10 x 6 in (Grand Keepsake)', note: 'Hand-carved bridal treasure chest', active: false, fullWidth: true }
    ];
    customMotifOptions = [
      { motif: 'Mughal Jaali (Lattice)', fee: 0, desc: 'Geometric fretwork grid', feeLabel: 'Included (+₹0)', active: true },
      { motif: 'Floral Arabesque (Bel)', fee: 60, desc: 'Flowing vine chiseling', feeLabel: '+₹60', active: false },
      { motif: 'Star Medallion (Sitara)', fee: 80, desc: 'Central star lattice', feeLabel: '+₹80', active: false },
      { motif: 'Royal Peacock Inlay', fee: 120, desc: 'Solid brass peacock inlay', feeLabel: '+₹120', active: false }
    ];
  } else if (craftCategory.includes('brass') || craftCategory.includes('metal')) {
    customSectionVolumeLabel = 'Select Sculpture Height / Weight';
    customSectionVolumeIcon = svgTerracottaBox;
    customSectionMotifLabel = 'Select Tribal Dhokra Figurine Motif';
    customSectionMotifIcon = svgTerracottaMotif;
    customPill1Text = 'Custom Name Inscription Engraving';
    customPill2Text = 'Sculpture Height (6" - 16")';
    customPill3Text = 'Tribal Dhokra Folk Motif';
    customVolOptions = [
      { vol: '6 inches', price: 1200, label: '6.0 inches (Desk Figurine)', note: 'Compact bell desk token', active: false },
      { vol: '8.5 inches', price: 1850, label: '8.5 inches (Standard Bell)', note: '★ Sacred Acoustic Bell', active: true },
      { vol: '12 inches', price: 3200, label: '12.0 inches (Altar Deity)', note: 'Temple & home sanctuary idol', active: false },
      { vol: '16 inches', price: 4800, label: '16.0 inches (Grand Trophy)', note: 'Monumental tribal heirloom casting', active: false, fullWidth: true }
    ];
    customMotifOptions = [
      { motif: 'Sacred Bell Striations', fee: 0, desc: 'Acoustic concentric threads', feeLabel: 'Included (+₹0)', active: true },
      { motif: 'Bastar Horned Deer', fee: 80, desc: 'Forest guardian totem', feeLabel: '+₹80', active: false },
      { motif: 'Tribal Dancing Chariot', fee: 120, desc: 'Folk harvest dancers', feeLabel: '+₹120', active: false },
      { motif: 'Sun & Moon Deity', fee: 150, desc: 'Ancient tribal cosmogram', feeLabel: '+₹150', active: false }
    ];
  } else if (craftCategory.includes('silk') || craftCategory.includes('handloom')) {
    customSectionVolumeLabel = 'Select Handloom Weave Drape';
    customSectionVolumeIcon = svgTerracottaBox;
    customSectionMotifLabel = 'Select Zari Brocade Kadwa Motif';
    customSectionMotifIcon = svgTerracottaMotif;
    customPill1Text = 'Custom Monogram on Pallu';
    customPill2Text = 'Custom Length (2.0m - 6.5m)';
    customPill3Text = 'Kadwa Brocade Zari Motif';
    customVolOptions = [
      { vol: '2.0m x 0.8m', price: 3200, label: '2.0m x 0.8m (Silk Stole)', note: 'Lightweight shoulder wrap', active: false },
      { vol: '2.4m x 1.1m', price: 4200, label: '2.4m x 1.1m (Full Dupatta)', note: '★ Heritage Kadwa Brocade', active: true },
      { vol: '5.5m Saree', price: 8500, label: '5.5m + Blouse (Bridal Saree)', note: 'Complete wedding heirloom set', active: false },
      { vol: '6.5m Royal Saree', price: 11500, label: '6.5m (Royal Katan Saree)', note: 'Pure silver zari bridal ensemble', active: false, fullWidth: true }
    ];
    customMotifOptions = [
      { motif: 'Floral Kadwa Buta', fee: 0, desc: 'Mughal floral spray', feeLabel: 'Included (+₹0)', active: true },
      { motif: 'Kalka Paisley (Ambi)', fee: 150, desc: 'Classic royal mango buta', feeLabel: '+₹150', active: false },
      { motif: 'Royal Mayur Peacock', fee: 250, desc: 'Dual dancing peacock motif', feeLabel: '+₹250', active: false },
      { motif: 'Zari Shikargah Jaal', fee: 400, desc: 'Intricate wildlife brocade', feeLabel: '+₹400', active: false }
    ];
  } else {
    // Terracotta pottery & Default
    customVolOptions = [
      { vol: '1.0L', price: Math.round(activeCraft.price * 0.8), label: '1.0 Litre', note: 'Personal desk carafe', active: false },
      { vol: '1.8L', price: activeCraft.price, label: `${dimensionSpec.includes('Litre') ? dimensionSpec : '1.8L (Standard)'}`, note: '★ Traditional Standard', active: true },
      { vol: '2.5L', price: Math.round(activeCraft.price * 1.2), label: '2.5 Litre', note: 'Couple / Family table', active: false },
      { vol: '3.5L', price: Math.round(activeCraft.price * 1.45), label: '3.5 Litre', note: 'Large dining pitcher', active: false },
      { vol: '5.0L', price: Math.round(activeCraft.price * 1.8), label: '5.0 Litre (Feast Matka)', note: 'Grand household earthen vessel', active: false, fullWidth: true }
    ];
    customMotifOptions = [
      { motif: 'Sun-Flora (Surajmukhi)', fee: 0, desc: 'Surajmukhi petal rim', feeLabel: 'Included (+₹0)', active: true },
      { motif: 'Temple Jaali (Ghats)', fee: 50, desc: 'Heritage ghat lattices', feeLabel: '+₹50', active: false },
      { motif: 'Peacock Feathers (Mayur)', fee: 80, desc: 'Mayur Pankh relief', feeLabel: '+₹80', active: false },
      { motif: 'Ganga Waves (Nadi)', fee: 60, desc: 'Sacred water ripples', feeLabel: '+₹60', active: false }
    ];
  }

  const initialVol = customVolOptions.find(v => v.active) || customVolOptions[0];
  const initialMotif = customMotifOptions.find(m => m.active) || customMotifOptions[0];

  container.innerHTML = `
    <div class="product-details-screen animate-fade-in" style="padding: 10px 14px 90px; background: #FAF7F2; min-height: 100vh;">

      <!-- Top Origin Banner -->
      <div style="background:#FFF9F5; border:1px solid #EADBCE; border-radius:9999px; padding:6px 14px; margin-bottom:12px; display:flex; justify-content:space-between; align-items:center;">
        <span style="font-size:0.72rem; font-weight:800; color:#1C1917; cursor:pointer;" title="Authentic Origin: ${clusterObj.name} (${clusterObj.giTagNumber})" onclick="window.showToast?.('Authentic Origin: ${clusterObj.name} (${clusterObj.giTagNumber})')">
          Authentic Origin: ${clusterObj.name} (${clusterObj.giTagNumber})
        </span>
        <span style="background:#FEE8E2; color:#B93815; font-size:0.58rem; font-weight:800; padding:2px 8px; border-radius:9999px; letter-spacing:0.04em; flex-shrink:0;">
          VERIFIED CRAFT
        </span>
      </div>

      <!-- Hero Image Gallery Container -->
      <div style="background:#FFFFFF; border:1px solid #ECE7E1; border-radius:14px; overflow:hidden; box-shadow:0 1px 4px rgba(0,0,0,0.03); margin-bottom:10px;">
        <div style="height:260px; position:relative; overflow:hidden; background:#ECE7E1; cursor:zoom-in;" id="hero-image-wrapper">
          <img src="${heroImage}" alt="${activeCraft.title}" id="main-product-image" style="width:100%; height:100%; object-fit:cover; cursor:zoom-in;" onerror="this.src='/assets/terracotta_pitcher.jpg'">

          <!-- Zoom Icon Button Top Right -->
          <button type="button" id="btn-zoom-image" style="position:absolute; top:12px; right:12px; width:36px; height:36px; border-radius:8px; background:rgba(255,255,255,0.96); border:1px solid rgba(0,0,0,0.1); display:flex; align-items:center; justify-content:center; cursor:pointer; color:#7A2813; box-shadow:0 2px 8px rgba(0,0,0,0.18); z-index:2;" title="Zoom In 4K View">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" x2="16.65" y1="21" y2="16.65"/>
              <line x1="11" x2="11" y1="8" y2="14"/>
              <line x1="8" x2="14" y1="11" y2="11"/>
            </svg>
          </button>

          <!-- Master Guild Seal Badge Bottom Left -->
          <div style="position:absolute; bottom:12px; left:12px; background:rgba(255,255,255,0.95); backdrop-filter:blur(4px); border:1px solid #EADBCE; border-radius:8px; padding:4px 8px; display:flex; align-items:center; gap:6px; box-shadow:0 2px 6px rgba(0,0,0,0.08);">
            <div style="width:20px; height:20px; border-radius:50%; background:#E7F7ED; display:flex; align-items:center; justify-content:center; color:#15803D;">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <div style="line-height:1.1;">
              <div style="font-size:0.6rem; font-weight:900; color:#17375E; letter-spacing:0.02em;">MASTER GUILD SEAL</div>
              <div style="font-size:0.52rem; color:#78716C;">Pehchan #${artisanObj.pehchanId || 'UP-VAR-49281'}</div>
            </div>
          </div>

          <!-- Capacity / Dimension Badge Bottom Right -->
          <div style="position:absolute; bottom:12px; right:12px; background:rgba(28,25,23,0.8); backdrop-filter:blur(4px); color:#FFFFFF; font-size:0.62rem; font-weight:800; padding:4px 9px; border-radius:9999px; display:flex; align-items:center; gap:4px;">
            ${dimensionIcon}
            <span>${dimensionSpec}</span>
          </div>
        </div>
      </div>

      <!-- 4 Thumbnails Strip -->
      <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:8px; margin-bottom:12px;">
        ${galleryImages.map((imgSrc, idx) => `
          <div class="thumb-item ${idx === 0 ? 'active' : ''}" style="height:62px; border-radius:8px; overflow:hidden; border:${idx === 0 ? '2px solid #7A2813' : '1px solid #ECE7E1'}; cursor:pointer;" onclick="window.selectThumb(${idx})">
            <img src="${imgSrc}" alt="Detail ${idx + 1}" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='${heroImage}'">
          </div>
        `).join('')}
      </div>

      <!-- 3 Craft Credibility Value Badges -->
      <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:8px; margin-bottom:14px;">
        <div style="background:#FFFFFF; border:1px solid #ECE7E1; border-radius:10px; padding:10px 4px; text-align:center; box-shadow:0 1px 3px rgba(0,0,0,0.02);">
          <div style="width:28px; height:28px; border-radius:50%; background:#FEECE5; display:flex; align-items:center; justify-content:center; margin:0 auto 4px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
          </div>
          <div style="font-size:0.65rem; font-weight:800; color:#1C1917; line-height:1.2;">
            Verified Master<br>Craft
          </div>
        </div>

        <div style="background:#FFFFFF; border:1px solid #ECE7E1; border-radius:10px; padding:10px 4px; text-align:center; box-shadow:0 1px 3px rgba(0,0,0,0.02);">
          <div style="width:28px; height:28px; border-radius:50%; background:#FEECE5; display:flex; align-items:center; justify-content:center; margin:0 auto 4px;">
            ${badge2Icon}
          </div>
          <div style="font-size:0.65rem; font-weight:800; color:#1C1917; line-height:1.2;">
            ${badge2Text}
          </div>
        </div>

        <div style="background:#FFFFFF; border:1px solid #ECE7E1; border-radius:10px; padding:10px 4px; text-align:center; box-shadow:0 1px 3px rgba(0,0,0,0.02);">
          <div style="width:28px; height:28px; border-radius:50%; background:#FEECE5; display:flex; align-items:center; justify-content:center; margin:0 auto 4px;">
            ${badge3Icon}
          </div>
          <div style="font-size:0.65rem; font-weight:800; color:#1C1917; line-height:1.2;">
            ${badge3Text}
          </div>
        </div>
      </div>

      <!-- Title, Description & Pricing Card -->
      <div style="background:#FFFFFF; border:1px solid #ECE7E1; border-radius:14px; padding:14px; margin-bottom:12px; box-shadow:0 1px 4px rgba(0,0,0,0.03);">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:4px;">
          <div style="font-size:0.62rem; font-weight:800; color:#B45309; letter-spacing:0.04em; text-transform:uppercase;">
            ${activeCraft.category || 'HERITAGE GI CRAFT'}
          </div>
          <button type="button" style="width:32px; height:32px; border-radius:8px; background:#FAF7F2; border:1px solid #EADBCE; display:flex; align-items:center; justify-content:center; color:#7A2813; cursor:pointer;" onclick="window.showToast?.('Added to wishlist ♡')">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>
        </div>

        <h1 style="font-size:1.22rem; font-weight:900; color:#7A2813; line-height:1.2; margin:0 0 6px 0;">
          ${activeCraft.title}
        </h1>

        <p style="font-size:0.72rem; color:#57534E; line-height:1.4; margin:0 0 12px 0;">
          ${activeCraft.voiceDescription?.translatedText || activeCraft.englishTranslation || activeCraft.voiceDescription?.originalText || 'Authentic handmade heritage piece crafted by registered master artisan.'}
        </p>

        <!-- Price Row -->
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:12px;">
          <span style="font-size:1.45rem; font-weight:900; color:#7A2813; line-height:1;">
            ₹${activeCraft.price}
          </span>
          <span style="font-size:0.82rem; text-decoration:line-through; color:#A8A29E;">
            ₹${activeCraft.originalPrice || Math.round(activeCraft.price * 1.25)}
          </span>
          <span style="background:#FEE8E2; color:#B93815; font-size:0.62rem; font-weight:800; padding:2px 7px; border-radius:9999px;">
            21% OFF
          </span>
          <span style="font-size:0.68rem; font-weight:700; color:#15803D; margin-left:auto; display:flex; align-items:center; gap:3px;">
            <span style="font-size:0.6rem;">•</span> ${activeCraft.stock || 8} Ready to Ship
          </span>
        </div>

        <!-- 100% Direct Artisan Payout Box -->
        <div style="background:#FFF9F5; border:1px solid #F5E5D8; border-radius:8px; padding:10px 12px; display:flex; gap:10px; align-items:flex-start;">
          <div style="width:24px; height:24px; border-radius:6px; background:#FDEEE5; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8"/><path d="M12 8v8"/><path d="M9.5 10h5"/></svg>
          </div>
          <div style="font-size:0.7rem; color:#57534E; line-height:1.4;">
            <strong style="color:#1C1917; display:block; margin-bottom:2px;">100% Direct Artisan Payout</strong>
            Full <strong>₹${activeCraft.price}</strong> credits directly to ${artisanObj.name}'s verified Jan Dhan bank account (${artisanObj.bankName || 'Verified Bank'}). <strong style="color:#7A2813;">₹0 platform commission</strong> deducted.
          </div>
        </div>
      </div>

      <!-- Made to Order Commission Card -->
      <div style="background:#FFFFFF; border:1px solid #ECE7E1; border-radius:14px; padding:14px; margin-bottom:12px; box-shadow:0 1px 4px rgba(0,0,0,0.03);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
          <div style="display:flex; align-items:center; gap:6px;">
            <div style="width:20px; height:20px; border-radius:50%; background:#FEECE5; display:flex; align-items:center; justify-content:center;">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>
            </div>
            <span style="font-size:0.68rem; font-weight:900; color:#7A2813; letter-spacing:0.04em;">
              MADE TO ORDER COMMISSION
            </span>
          </div>
          <span style="font-size:0.62rem; color:#78716C; background:#FAF7F2; border:1px solid #EADBCE; border-radius:9999px; padding:2px 8px; font-weight:700;">
            within 2 weeks
          </span>
        </div>

        <div style="display:flex; flex-direction:column; gap:6px; margin-bottom:12px;">
          <button type="button" id="pill-custom-monogram" style="display:inline-flex; align-items:center; justify-content:space-between; gap:6px; background:#FAF5EF; border:1px solid #EADBCE; border-radius:9999px; padding:5px 12px; font-size:0.68rem; color:#57534E; width:fit-content; cursor:pointer; text-align:left; transition:all 0.15s ease;">
            <span style="display:inline-flex; align-items:center; gap:5px;">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
              <span id="label-custom-monogram" style="font-weight:600;">${customPill1Text}</span>
            </span>
            <span style="font-size:0.65rem; color:#873413; font-weight:800; margin-left:4px;">›</span>
          </button>

          <button type="button" id="pill-custom-volume" style="display:inline-flex; align-items:center; justify-content:space-between; gap:6px; background:#FAF5EF; border:1px solid #EADBCE; border-radius:9999px; padding:5px 12px; font-size:0.68rem; color:#57534E; width:fit-content; cursor:pointer; text-align:left; transition:all 0.15s ease;">
            <span style="display:inline-flex; align-items:center; gap:5px;">
              <span>${customSectionVolumeIcon}</span>
              <span id="label-custom-volume" style="font-weight:600;">${customPill2Text}</span>
            </span>
            <span style="font-size:0.65rem; color:#873413; font-weight:800; margin-left:4px;">›</span>
          </button>

          <button type="button" id="pill-custom-motif" style="display:inline-flex; align-items:center; justify-content:space-between; gap:6px; background:#FAF5EF; border:1px solid #EADBCE; border-radius:9999px; padding:5px 12px; font-size:0.68rem; color:#57534E; width:fit-content; cursor:pointer; text-align:left; transition:all 0.15s ease;">
            <span style="display:inline-flex; align-items:center; gap:5px;">
              <span>${customSectionMotifIcon}</span>
              <span id="label-custom-motif" style="font-weight:600;">${customPill3Text}</span>
            </span>
            <span style="font-size:0.65rem; color:#873413; font-weight:800; margin-left:4px;">›</span>
          </button>
        </div>

        <button type="button" id="btn-request-custom" style="width:100%; background:#FAF5EF; border:1px solid #D6C7B2; border-radius:8px; padding:10px; font-size:0.78rem; font-weight:800; color:#7A2813; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:6px; transition:background 0.15s ease;">
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 20h9"/>
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
          </svg>
          <span id="btn-request-custom-text">Request Custom Order</span>
        </button>
      </div>

      <!-- Artisan's Oral History Section -->
      <div style="background:#FFFFFF; border:1px solid #ECE7E1; border-radius:14px; padding:14px; margin-bottom:12px; box-shadow:0 1px 4px rgba(0,0,0,0.03);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
          <div style="display:flex; align-items:center; gap:8px;">
            <div style="width:26px; height:26px; border-radius:50%; background:#FAF2EB; border:1px solid #EADBCE; color:#7A2813; display:flex; align-items:center; justify-content:center;">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
            </div>
            <div>
              <div style="font-size:0.82rem; font-weight:900; color:#1C1917;">Artisan's Oral History</div>
              <div style="font-size:0.64rem; color:#78716C;">Spoken in ${activeCraft.voiceDescription?.originalLang || artisanObj.preferredDialect || 'Hindi'} • 30 Seconds</div>
            </div>
          </div>
          <span style="font-size:0.68rem; font-family:monospace; color:#78716C;">00:00 / 00:30</span>
        </div>

        <!-- Audio Player Bar -->
        <div style="background:#FAF5EE; border-radius:10px; padding:8px 12px; display:flex; align-items:center; gap:12px; margin-bottom:10px;">
          <button type="button" id="btn-play-oral" style="width:34px; height:34px; border-radius:50%; background:#7A2813; color:#FFFFFF; border:none; display:flex; align-items:center; justify-content:center; cursor:pointer; flex-shrink:0;">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
          </button>

          <!-- Sound wave bars -->
          <div style="flex:1; display:flex; align-items:center; gap:3px; height:22px;">
            <span style="width:3px; height:45%; background:#B45309; border-radius:2px;"></span>
            <span style="width:3px; height:80%; background:#B45309; border-radius:2px;"></span>
            <span style="width:3px; height:60%; background:#B45309; border-radius:2px;"></span>
            <span style="width:3px; height:100%; background:#B45309; border-radius:2px;"></span>
            <span style="width:3px; height:35%; background:#D6C7B2; border-radius:2px;"></span>
            <span style="width:3px; height:70%; background:#D6C7B2; border-radius:2px;"></span>
            <span style="width:3px; height:90%; background:#D6C7B2; border-radius:2px;"></span>
            <span style="width:3px; height:50%; background:#D6C7B2; border-radius:2px;"></span>
            <span style="width:3px; height:75%; background:#D6C7B2; border-radius:2px;"></span>
            <span style="width:3px; height:40%; background:#D6C7B2; border-radius:2px;"></span>
            <span style="width:3px; height:60%; background:#D6C7B2; border-radius:2px;"></span>
            <span style="width:3px; height:30%; background:#D6C7B2; border-radius:2px;"></span>
            <span style="width:3px; height:85%; background:#D6C7B2; border-radius:2px;"></span>
            <span style="width:3px; height:55%; background:#D6C7B2; border-radius:2px;"></span>
            <span style="width:3px; height:35%; background:#D6C7B2; border-radius:2px;"></span>
          </div>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.72rem; color:#7A2813; font-weight:800; cursor:pointer;" id="toggle-oral-transcript">
          <span style="display:inline-flex; align-items:center; gap:6px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
            <span>Read Audio Transcript</span>
          </span>
          <span id="transcript-arrow">∨</span>
        </div>

        <div id="transcript-body" style="display:none; font-size:0.72rem; color:#57534E; line-height:1.45; padding-top:8px; margin-top:8px; border-top:1px dashed #E5DCD3;">
          "${oralTranscript}"
        </div>
      </div>

      <!-- Master Artisan Profile & Flawless Trust Score Card -->
      <div style="background:#FFFFFF; border:1px solid #ECE6DE; border-radius:14px; padding:16px 14px; margin-bottom:14px; box-shadow:0 1px 4px rgba(0,0,0,0.03);">

        <!-- Profile Top Section -->
        <div style="display:flex; align-items:center; gap:14px; margin-bottom:14px; cursor:pointer;" id="btn-product-artisan-profile">
          <div style="position:relative; width:64px; height:64px; flex-shrink:0;">
            <img src="${artisanObj.avatar || '/assets/artisan_ramulu.jpg'}" alt="${artisanObj.name}" style="width:100%; height:100%; object-fit:cover; border-radius:10px;" onerror="this.src='/assets/artisan_ramulu.jpg'">
            <div style="position:absolute; bottom:-3px; right:-3px; width:20px; height:20px; border-radius:50%; background:#1E6B47; color:#FFFFFF; display:flex; align-items:center; justify-content:center; border:2px solid #FFFFFF;">
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
          </div>
          <div style="flex:1;">
            <div style="font-size:1.2rem; font-weight:800; color:#1E150F; margin-bottom:2px;">
              ${artisanObj.name}
            </div>
            <div style="display:flex; align-items:center; gap:4px; font-size:0.75rem; color:#873413; font-weight:700; margin-bottom:2px;">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
              ${artisanObj.craftTitle || 'Verified Master Artisan'}
            </div>
            <div style="font-size:0.72rem; color:#71655D; margin-bottom:2px;">
              Pehchan #${artisanObj.pehchanId || 'UP-VAR-49281'}
            </div>
            <div style="display:flex; align-items:center; gap:4px; font-size:0.72rem; color:#71655D;">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              ${clusterObj.name}, ${clusterObj.state}
            </div>
          </div>
        </div>

        <!-- Flawless Trust Score Container -->
        <div style="background:#FAF8F5; border:1px solid #EAE3D9; border-radius:10px; padding:12px 14px;" id="btn-product-open-trust">
          <div style="display:flex; align-items:center; gap:14px; margin-bottom:10px;">
            <!-- Circular Gauge -->
            <div style="position:relative; width:52px; height:52px; flex-shrink:0;">
              <svg viewBox="0 0 36 36" width="52" height="52">
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#E5DAC8" stroke-width="3" />
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#1E6B47" stroke-width="3.2" stroke-dasharray="${artisanObj.trustScore || 98}, 100" stroke-linecap="round" />
              </svg>
              <div style="position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; line-height:1;">
                <span style="font-size:0.92rem; font-weight:900; color:#174332;">${artisanObj.trustScore || 98}</span>
                <span style="font-size:0.55rem; color:#71655D; font-weight:700;">/100</span>
              </div>
            </div>

            <div style="flex:1;">
              <div style="font-size:0.95rem; font-weight:800; color:#1E150F; margin-bottom:3px;">
                Flawless Trust Score
              </div>
              <div style="font-size:0.72rem; color:#71655D; line-height:1.35;">
                0% platform fee • Instant Delivery Agent daily pickups unlocked
              </div>
            </div>
          </div>

          <button type="button" id="btn-product-see-how" style="width:100%; background:#FFFFFF; border:1px solid #EAE3D9; border-radius:6px; padding:8px; text-align:center; cursor:pointer;">
            <span style="font-size:0.75rem; font-weight:700; color:#7A2813;">See how</span>
          </button>
        </div>

      </div>

      <!-- See Description (Accordion Card) -->
      <div style="background:#FFFFFF; border:1px solid #ECE7E1; border-radius:14px; padding:12px 14px; margin-bottom:12px; box-shadow:0 1px 4px rgba(0,0,0,0.03);">
        <div style="display:flex; justify-content:space-between; align-items:center; cursor:pointer;" id="toggle-description">
          <div style="display:flex; align-items:center; gap:10px;">
            <div style="width:28px; height:28px; border-radius:50%; background:#FEECE5; color:#7A2813; display:flex; align-items:center; justify-content:center;">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 6h10"/><path d="M6 10h10"/></svg>
            </div>
            <div>
              <div style="display:flex; align-items:center; gap:6px;">
                <span style="font-size:0.85rem; font-weight:900; color:#1C1917;">See Description</span>
                <span style="background:#FEE8E2; color:#B93815; font-size:0.58rem; font-weight:800; padding:1px 6px; border-radius:9999px;">
                  Handcrafted Heritage
                </span>
              </div>
              <div style="font-size:0.65rem; color:#78716C;">
                Creation Journey &amp; artisan material specifications
              </div>
            </div>
          </div>

          <div style="width:26px; height:26px; border-radius:6px; background:#FAF5EE; display:flex; align-items:center; justify-content:center; color:#7A2813; font-weight:900; font-size:0.85rem;">
            ∨
          </div>
        </div>

        <div id="description-body" style="display:none; padding-top:12px; margin-top:10px; border-top:1px dashed #E5DCD3;">
          <div style="font-size:0.75rem; font-weight:800; color:#7A2813; margin-bottom:8px;">Handcrafted Creation Journey</div>
          <div style="display:flex; flex-direction:column; gap:8px; font-size:0.7rem; color:#57534E;">
            ${creationSteps.map(s => `
              <div><strong>${s.step}:</strong> ${s.desc}</div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Fast Delivery Notice Card -->
      <div style="background:#FFFFFF; border:1px solid #ECE7E1; border-radius:14px; padding:12px 14px; margin-bottom:14px; box-shadow:0 1px 4px rgba(0,0,0,0.03);">
        <div style="display:flex; align-items:center; gap:6px; margin-bottom:4px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="10" x="1" y="3" rx="1"/><polygon points="15 8 18 8 21 11 21 13 15 13 15 8"/><circle cx="5.5" cy="15.5" r="2.5"/><circle cx="17.5" cy="15.5" r="2.5"/></svg>
          <span style="font-size:0.82rem; font-weight:900; color:#1C1917;">Fast Delivery</span>
        </div>
        <p style="font-size:0.7rem; color:#57534E; line-height:1.4; margin:0;">
          Shipped directly from ${clusterObj.name} (${clusterObj.state}). Dispatches within 24 hours. Expected delivery within 7-10 days
        </p>
      </div>

    </div>

    <!-- Sticky Bottom Action Bar -->
    <div style="position:fixed; bottom:0; left:50%; transform:translateX(-50%); width:100%; max-width:430px; background:#FFFFFF; border-top:1px solid #ECE7E1; padding:10px 14px; display:flex; align-items:center; gap:8px; z-index:100; box-shadow:0 -2px 10px rgba(0,0,0,0.06);">
      <div style="display:flex; flex-direction:column; line-height:1; min-width:60px;">
        <span style="font-size:0.58rem; color:#78716C; text-transform:uppercase; font-weight:700; margin-bottom:2px;">Total Price</span>
        <span id="detail-total-price" style="font-size:1.15rem; font-weight:900; color:#7A2813;">₹${activeCraft.price}</span>
      </div>

      <!-- Quantity Stepper -->
      <div style="display:inline-flex; align-items:center; background:#FAF7F2; border:1px solid #E5DCD3; border-radius:8px; overflow:hidden; height:40px;">
        <button type="button" id="btn-detail-qty-minus" style="width:26px; height:100%; border:none; background:transparent; color:#7A2813; font-weight:900; font-size:1.05rem; cursor:pointer; display:flex; align-items:center; justify-content:center;">−</button>
        <span id="detail-qty-num" style="min-width:20px; text-align:center; font-size:0.75rem; font-weight:800; color:#1C1917; user-select:none;">1</span>
        <button type="button" id="btn-detail-qty-plus" style="width:26px; height:100%; border:none; background:transparent; color:#7A2813; font-weight:900; font-size:1.05rem; cursor:pointer; display:flex; align-items:center; justify-content:center;">+</button>
      </div>

      <!-- Cart Button -->
      <button type="button" id="btn-sticky-cart" style="width:40px; height:40px; border-radius:8px; background:#F2ECE4; border:1px solid #E5DCD3; display:flex; align-items:center; justify-content:center; color:#1C1917; cursor:pointer;" title="Add to Cart">
        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
          <path d="M3 6h18"/>
          <path d="M16 10a4 4 0 0 1-8 0"/>
        </svg>
      </button>

      <!-- Customization Button -->
      <button type="button" id="btn-sticky-custom" style="height:40px; padding:0 8px; border-radius:8px; background:#FFFFFF; border:1px solid #D6C7B2; color:#7A2813; font-size:0.75rem; font-weight:800; display:flex; align-items:center; gap:4px; cursor:pointer;">
        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 20h9"/>
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
        </svg>
        <span>Customize</span>
      </button>

      <!-- Buy Now Button -->
      <button type="button" id="btn-sticky-buy-now" style="flex:1; height:40px; border-radius:8px; background:#7A2813; border:none; color:#FFFFFF; font-size:0.85rem; font-weight:800; display:flex; align-items:center; justify-content:center; gap:6px; cursor:pointer;">
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
          <rect width="20" height="14" x="2" y="5" rx="2"/>
          <line x1="2" x2="22" y1="10" y2="10"/>
        </svg>
        <span>Buy Now</span>
      </button>
    </div>

    <!-- ============================================== -->
    <!-- MODAL: MADE TO ORDER COMMISSION                -->
    <!-- ============================================== -->
    <div class="modal-overlay" id="modal-custom-commission">
      <div class="bottom-sheet" style="max-height:90vh; padding-bottom:28px; overflow-y:auto;">
        <div class="sheet-header" style="margin-bottom:12px;">
          <div class="sheet-title-group">
            <div style="width:34px; height:34px; border-radius:50%; background:#FEECE5; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>
            </div>
            <div>
              <div style="font-size:0.95rem; font-weight:900; color:#1E150F;">Made to Order Commission</div>
              <div style="font-size:0.68rem; color:#71655D;">Directly handcrafted by Master ${artisanObj.name}</div>
            </div>
          </div>
          <button type="button" class="sheet-close-btn" id="btn-close-commission-modal">✕</button>
        </div>

        <!-- Commission Banner -->
        <div style="background:#FFF9F5; border:1px solid #F2DDD0; border-radius:10px; padding:10px 12px; margin-bottom:14px; display:flex; align-items:center; justify-content:space-between; gap:8px;">
          <div style="display:flex; align-items:center; gap:6px;">
            <span style="display:flex; align-items:center;">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </span>
            <div>
              <div style="font-size:0.72rem; font-weight:800; color:#7A2813;">Handcrafted within 2 weeks</div>
              <div style="font-size:0.62rem; color:#78716C;">Authentic ${activeCraft.category || 'craft'} • Dispatches via Delivery Agent direct</div>
            </div>
          </div>
          <span style="background:#EBF7EE; color:#1E6B47; font-size:0.62rem; font-weight:800; padding:3px 8px; border-radius:9999px; border:1px solid #C7E8D0; white-space:nowrap;">
            0% Fee
          </span>
        </div>

        <!-- Section 1: Dimensions / Sizing -->
        <div id="custom-section-volume" style="margin-bottom:16px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
            <label style="font-size:0.78rem; font-weight:900; color:#1E150F; display:flex; align-items:center; gap:5px;">
              <span>${customSectionVolumeIcon}</span>
              <span>${customSectionVolumeLabel}</span>
            </label>
            <span style="font-size:0.64rem; color:#78716C;">Base price adjusts</span>
          </div>

          <div style="display:grid; grid-template-columns:repeat(2, 1fr); gap:8px;">
            ${customVolOptions.map(opt => `
              <button type="button" class="btn-custom-vol-opt ${opt.active ? 'active' : ''}" data-vol="${opt.vol}" data-price="${opt.price}" data-label="${opt.label}" style="${opt.fullWidth ? 'grid-column:span 2;' : ''} background:${opt.active ? '#FFF5F0' : '#FAF8F5'}; border:1.5px solid ${opt.active ? '#7A2813' : '#EAE3D9'}; border-radius:8px; padding:8px 10px; text-align:left; cursor:pointer; transition:all 0.15s ease;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <span style="font-size:0.78rem; font-weight:800; color:${opt.active ? '#7A2813' : '#1E150F'};">${opt.vol}</span>
                  <span style="font-size:0.72rem; font-weight:900; color:#7A2813;">₹${opt.price}</span>
                </div>
                <div style="font-size:0.62rem; color:${opt.active ? '#7A2813' : '#78716C'}; margin-top:2px; ${opt.active ? 'font-weight:700;' : ''}">${opt.note}</div>
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Section 2: Custom Monogram / Name Engraving -->
        <div id="custom-section-monogram" style="margin-bottom:16px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
            <label for="input-custom-engraving" style="font-size:0.78rem; font-weight:900; color:#1E150F; display:flex; align-items:center; gap:5px;">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
              <span>${customPill1Text}</span>
            </label>
            <span style="font-size:0.64rem; font-weight:800; color:#1E6B47; background:#EBF7EE; padding:2px 6px; border-radius:4px;">Complimentary</span>
          </div>
          <div style="font-size:0.64rem; color:#78716C; margin-bottom:6px;">
            Master ${artisanObj.name} hand-crafts this directly prior to finishing.
          </div>
          <input type="text" id="input-custom-engraving" maxlength="40" placeholder="e.g. Aditi &amp; Vikram, 2026 or Har Har Mahadev" style="width:100%; border:1px solid #D8CFC4; border-radius:8px; padding:9px 12px; font-size:0.82rem; font-weight:700; color:#1E150F; background:#FFFDFB; outline:none; box-sizing:border-box;">

          <!-- Quick Chips -->
          <div style="display:flex; flex-wrap:wrap; gap:5px; margin-top:6px;">
            <button type="button" class="btn-quick-monogram" data-text="Aditi &amp; Vikram" style="font-size:0.62rem; background:#FAF5EF; border:1px solid #EADBCE; border-radius:9999px; padding:3px 8px; color:#7A2813; cursor:pointer;">+ Aditi &amp; Vikram</button>
            <button type="button" class="btn-quick-monogram" data-text="Om Namah Shivaya" style="font-size:0.62rem; background:#FAF5EF; border:1px solid #EADBCE; border-radius:9999px; padding:3px 8px; color:#7A2813; cursor:pointer;">+ Om Namah Shivaya</button>
            <button type="button" class="btn-quick-monogram" data-text="${clusterObj.state}, 2026" style="font-size:0.62rem; background:#FAF5EF; border:1px solid #EADBCE; border-radius:9999px; padding:3px 8px; color:#7A2813; cursor:pointer;">+ ${clusterObj.state}, 2026</button>
          </div>
        </div>

        <!-- Section 3: Custom Motif / Pattern Art -->
        <div id="custom-section-motif" style="margin-bottom:16px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
            <label style="font-size:0.78rem; font-weight:900; color:#1E150F; display:flex; align-items:center; gap:5px;">
              <span>${customSectionMotifIcon}</span>
              <span>${customSectionMotifLabel}</span>
            </label>
            <span style="font-size:0.64rem; color:#78716C;">Traditional heritage art</span>
          </div>
          <div style="font-size:0.64rem; color:#78716C; margin-bottom:6px;">
            Select the heritage motif crafted into the piece.
          </div>

          <div style="display:grid; grid-template-columns:repeat(2, 1fr); gap:8px;">
            ${customMotifOptions.map(m => `
              <button type="button" class="btn-custom-motif-opt ${m.active ? 'active' : ''}" data-motif="${m.motif}" data-fee="${m.fee}" style="background:${m.active ? '#FFF5F0' : '#FAF8F5'}; border:1.5px solid ${m.active ? '#7A2813' : '#EAE3D9'}; border-radius:8px; padding:8px 10px; text-align:left; cursor:pointer; transition:all 0.15s ease;">
                <div style="font-size:0.78rem; font-weight:800; color:${m.active ? '#7A2813' : '#1E150F'};">${m.motif}</div>
                <div style="font-size:0.62rem; color:#78716C; margin-top:2px;">${m.desc}</div>
                <div style="font-size:0.62rem; font-weight:800; color:${m.fee === 0 ? '#1E6B47' : '#7A2813'}; margin-top:3px;">${m.feeLabel}</div>
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Section 4: Special Instructions / Note for Artisan -->
        <div style="margin-bottom:16px;">
          <label for="input-custom-blessing" style="font-size:0.78rem; font-weight:900; color:#1E150F; display:flex; align-items:center; gap:5px; margin-bottom:4px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            <span>Patron Blessing Note for ${artisanObj.name} (Optional)</span>
          </label>
          <textarea id="input-custom-blessing" rows="2" placeholder="e.g. Please craft with love for our new home. Thank you ${artisanObj.name.split(' ')[0]} Ji!" style="width:100%; border:1px solid #D8CFC4; border-radius:8px; padding:8px 12px; font-size:0.78rem; color:#1E150F; background:#FFFDFB; outline:none; resize:none; box-sizing:border-box;"></textarea>
        </div>

        <!-- Live Commission Summary & Price Card -->
        <div style="background:#FAF8F5; border:1.5px solid #EAE3D9; border-radius:12px; padding:12px 14px; margin-bottom:16px;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:6px;">
            <div>
              <div style="font-size:0.68rem; font-weight:800; color:#71655D; text-transform:uppercase; letter-spacing:0.04em;">
                Configured Commission Total
              </div>
              <div id="modal-commission-summary" style="font-size:0.78rem; font-weight:700; color:#1E150F; margin-top:2px;">
                ${initialVol.label} • ${initialMotif.motif}
              </div>
            </div>
            <div style="text-align:right;">
              <div id="modal-commission-price" style="font-size:1.3rem; font-weight:900; color:#7A2813; line-height:1;">
                ₹${initialVol.price + initialMotif.fee}
              </div>
              <div style="font-size:0.62rem; color:#1E6B47; font-weight:700; margin-top:2px;">
                ✓ 100% to Artisan
              </div>
            </div>
          </div>
          <div style="font-size:0.65rem; color:#78716C; border-top:1px dashed #E5DCD3; padding-top:6px; margin-top:6px; display:flex; align-items:center; gap:4px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#7A2813" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
            <span>Includes Pehchan certificate &amp; zero-breakage delivery guarantee</span>
          </div>
        </div>

        <!-- Action Buttons -->
        <div style="display:flex; flex-direction:column; gap:8px;">
          <button type="button" id="btn-submit-custom-cart" style="width:100%; height:44px; background:#7A2813; color:#FFFFFF; border:none; border-radius:10px; font-size:0.88rem; font-weight:800; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px; box-shadow:0 2px 8px rgba(122,40,19,0.25);">
            <span>Add Custom Commission to Cart</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          </button>
          <button type="button" id="btn-submit-custom-checkout" style="width:100%; height:40px; background:#FFFFFF; color:#7A2813; border:1.5px solid #7A2813; border-radius:10px; font-size:0.82rem; font-weight:800; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:6px;">
            <span>Direct Order Custom Commission →</span>
          </button>
        </div>
      </div>
    </div>

    <!-- ============================================== -->
    <!-- MODAL: INTERACTIVE 4K CRAFT ZOOM & INSPECTOR   -->
    <!-- ============================================== -->
    <div id="modal-image-zoom" style="display:none; position:fixed; inset:0; z-index:9999; background:rgba(15, 12, 10, 0.96); backdrop-filter:blur(10px); flex-direction:column; justify-content:space-between; user-select:none;">

      <!-- Top Bar -->
      <div style="padding:12px 16px; display:flex; align-items:center; justify-content:space-between; border-bottom:1px solid rgba(255,255,255,0.12); background:rgba(0,0,0,0.5); z-index:10;">
        <div style="display:flex; align-items:center; gap:8px; max-width:60%;">
          <div style="width:28px; height:28px; border-radius:6px; background:#7A2813; display:flex; align-items:center; justify-content:center; color:#FFFFFF; flex-shrink:0;">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </div>
          <div style="overflow:hidden;">
            <div style="font-size:0.82rem; font-weight:800; color:#FFFFFF; white-space:nowrap; text-overflow:ellipsis; overflow:hidden;">
              ${activeCraft.title}
            </div>
            <div style="font-size:0.62rem; color:#D6C7B2;">
              Pinch, wheel or double-tap to inspect fine artisanal details
            </div>
          </div>
        </div>

        <!-- Controls Group -->
        <div style="display:flex; align-items:center; gap:6px;">
          <!-- Zoom Out Button -->
          <button type="button" id="btn-zoom-out" style="width:34px; height:34px; border-radius:8px; background:rgba(255,255,255,0.12); border:1px solid rgba(255,255,255,0.2); color:#FFFFFF; font-size:1.1rem; font-weight:800; display:flex; align-items:center; justify-content:center; cursor:pointer;" title="Zoom Out">
            −
          </button>

          <!-- Zoom Percentage Badge / Reset -->
          <button type="button" id="btn-zoom-reset" style="padding:0 10px; height:34px; border-radius:8px; background:rgba(255,255,255,0.18); border:1px solid rgba(255,255,255,0.25); color:#FCD34D; font-size:0.75rem; font-weight:800; display:flex; align-items:center; justify-content:center; cursor:pointer;" title="Reset to 1x">
            <span id="zoom-level-text">150%</span>
          </button>

          <!-- Zoom In Button -->
          <button type="button" id="btn-zoom-in" style="width:34px; height:34px; border-radius:8px; background:rgba(255,255,255,0.12); border:1px solid rgba(255,255,255,0.2); color:#FFFFFF; font-size:1.1rem; font-weight:800; display:flex; align-items:center; justify-content:center; cursor:pointer;" title="Zoom In">
            +
          </button>

          <!-- Close Button -->
          <button type="button" id="btn-close-zoom-modal" style="width:34px; height:34px; border-radius:8px; background:#7A2813; border:none; color:#FFFFFF; font-size:1.1rem; font-weight:900; display:flex; align-items:center; justify-content:center; cursor:pointer; margin-left:4px;" title="Close Inspection">
            ✕
          </button>
        </div>
      </div>

      <!-- Main Interactive Viewport -->
      <div id="zoom-viewport" style="flex:1; position:relative; overflow:hidden; display:flex; align-items:center; justify-content:center; cursor:grab;">
        <img id="zoom-modal-img" src="${heroImage}" alt="${activeCraft.title}" style="max-width:92%; max-height:85%; object-fit:contain; transform-origin:center center; transition:transform 0.15s ease-out; box-shadow:0 8px 32px rgba(0,0,0,0.6); border-radius:8px;">

        <!-- Helpful Floating Hint -->
        <div id="zoom-floating-hint" style="position:absolute; bottom:16px; background:rgba(0,0,0,0.7); backdrop-filter:blur(4px); color:#FFFFFF; font-size:0.68rem; font-weight:700; padding:6px 14px; border-radius:9999px; border:1px solid rgba(255,255,255,0.15); pointer-events:none; transition:opacity 0.3s ease;">
          Double-click to toggle zoom • Drag to pan details
        </div>
      </div>

      <!-- Bottom Thumbnail Selector Strip -->
      <div style="padding:12px 16px 20px; background:rgba(0,0,0,0.5); border-top:1px solid rgba(255,255,255,0.1); display:flex; justify-content:center; gap:10px; z-index:10;">
        ${galleryImages.map((imgSrc, idx) => `
          <div class="zoom-thumb-item ${idx === 0 ? 'active' : ''}" data-idx="${idx}" style="width:58px; height:58px; border-radius:8px; overflow:hidden; border:${idx === 0 ? '2.5px solid #FCD34D' : '1px solid rgba(255,255,255,0.25)'}; cursor:pointer; opacity:${idx === 0 ? '1' : '0.6'}; transition:all 0.15s ease;">
            <img src="${imgSrc}" alt="Detail ${idx + 1}" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='${heroImage}'">
          </div>
        `).join('')}
      </div>

    </div>
  `;

  // Attach Event Handlers
  let selectedQuantity = 1;
  const qtyNumEl = container.querySelector('#detail-qty-num');
  const totalPriceEl = container.querySelector('#detail-total-price');

  container.querySelector('#btn-detail-qty-plus')?.addEventListener('click', () => {
    selectedQuantity++;
    if (qtyNumEl) qtyNumEl.textContent = selectedQuantity;
    if (totalPriceEl) totalPriceEl.textContent = '₹' + (activeCraft.price * selectedQuantity).toLocaleString('en-IN');
  });

  container.querySelector('#btn-detail-qty-minus')?.addEventListener('click', () => {
    if (selectedQuantity > 1) {
      selectedQuantity--;
      if (qtyNumEl) qtyNumEl.textContent = selectedQuantity;
      if (totalPriceEl) totalPriceEl.textContent = '₹' + (activeCraft.price * selectedQuantity).toLocaleString('en-IN');
    }
  });

  const currentArtisanStoryData = {
    name: artisanObj.name,
    avatar: artisanObj.avatar || '/assets/artisan_ramulu.jpg',
    pehchanId: artisanObj.pehchanId || 'UP-VAR-49281',
    cluster: `${clusterObj.name}, ${clusterObj.state}`,
    trustScore: artisanObj.trustScore || 98,
    craft: artisanObj.craftTitle || activeCraft.category || 'Master Artisan',
    story: oralTranscript
  };

  container.querySelector('#btn-play-oral')?.addEventListener('click', () => {
    if (isPlayingAudio) {
      AudioAssistance.stop();
      isPlayingAudio = false;
      const playIcon = container.querySelector('#btn-play-oral svg');
      if (playIcon) playIcon.innerHTML = '<polygon points="5 3 19 12 5 21 5 3"/>';
    } else {
      isPlayingAudio = true;
      const playIcon = container.querySelector('#btn-play-oral svg');
      if (playIcon) playIcon.innerHTML = '<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>';
      AudioAssistance.speak(oralTranscript, 'en', () => {
        isPlayingAudio = false;
        if (playIcon) playIcon.innerHTML = '<polygon points="5 3 19 12 5 21 5 3"/>';
      });
    }
  });

  container.querySelector('#btn-product-see-how')?.addEventListener('click', () => {
    window.showArtisanStoryModal?.(currentArtisanStoryData);
  });

  container.querySelector('#btn-product-artisan-profile')?.addEventListener('click', () => {
    window.showArtisanStoryModal?.(currentArtisanStoryData);
  });

  container.querySelector('#toggle-oral-transcript')?.addEventListener('click', () => {
    isTranscriptOpen = !isTranscriptOpen;
    const body = container.querySelector('#transcript-body');
    const arrow = container.querySelector('#transcript-arrow');
    if (body) body.style.display = isTranscriptOpen ? 'block' : 'none';
    if (arrow) arrow.textContent = isTranscriptOpen ? '∧' : '∨';
  });

  container.querySelector('#toggle-description')?.addEventListener('click', () => {
    isDescriptionOpen = !isDescriptionOpen;
    const body = container.querySelector('#description-body');
    if (body) body.style.display = isDescriptionOpen ? 'block' : 'none';
  });

  // Made to Order Custom Commission State & Modal Management
  let customCommissionState = {
    volume: initialVol.vol,
    volumeLabel: initialVol.label,
    volumePrice: initialVol.price,
    motif: initialMotif.motif,
    motifFee: initialMotif.fee,
    engraving: '',
    blessing: '',
    configured: false
  };

  const modalCommission = container.querySelector('#modal-custom-commission');
  const modalCommissionPriceEl = container.querySelector('#modal-commission-price');
  const modalCommissionSummaryEl = container.querySelector('#modal-commission-summary');
  const inputEngraving = container.querySelector('#input-custom-engraving');
  const inputBlessing = container.querySelector('#input-custom-blessing');

  function updateCommissionPriceUI() {
    const total = customCommissionState.volumePrice + customCommissionState.motifFee;
    if (modalCommissionPriceEl) {
      modalCommissionPriceEl.textContent = '₹' + total.toLocaleString('en-IN');
    }
    if (modalCommissionSummaryEl) {
      const engText = inputEngraving?.value?.trim();
      const engSnippet = engText ? ` • "${engText}"` : '';
      modalCommissionSummaryEl.textContent = `${customCommissionState.volumeLabel} • ${customCommissionState.motif.split(' ')[0]} Motif${engSnippet}`;
    }
  }

  function openCommissionModal(targetSectionId = null) {
    if (!modalCommission) return;
    modalCommission.classList.add('active');
    updateCommissionPriceUI();
    if (targetSectionId) {
      setTimeout(() => {
        const sec = container.querySelector('#' + targetSectionId);
        sec?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        if (targetSectionId === 'custom-section-monogram') {
          inputEngraving?.focus();
        }
      }, 150);
    }
  }

  function closeCommissionModal() {
    modalCommission?.classList.remove('active');
  }

  // Pill Clicks: Open modal & scroll to section
  container.querySelector('#pill-custom-monogram')?.addEventListener('click', () => {
    openCommissionModal('custom-section-monogram');
  });

  container.querySelector('#pill-custom-volume')?.addEventListener('click', () => {
    openCommissionModal('custom-section-volume');
  });

  container.querySelector('#pill-custom-motif')?.addEventListener('click', () => {
    openCommissionModal('custom-section-motif');
  });

  container.querySelector('#btn-request-custom')?.addEventListener('click', () => {
    openCommissionModal();
  });

  container.querySelector('#btn-sticky-custom')?.addEventListener('click', () => {
    openCommissionModal();
  });

  container.querySelector('#btn-close-commission-modal')?.addEventListener('click', closeCommissionModal);

  modalCommission?.addEventListener('click', (e) => {
    if (e.target === modalCommission) closeCommissionModal();
  });

  // Volume Selection
  container.querySelectorAll('.btn-custom-vol-opt').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('.btn-custom-vol-opt').forEach(b => {
        b.classList.remove('active');
        b.style.background = '#FAF8F5';
        b.style.borderColor = '#EAE3D9';
        const spanLabel = b.querySelector('span:first-child');
        if (spanLabel) spanLabel.style.color = '#1E150F';
      });
      btn.classList.add('active');
      btn.style.background = '#FFF5F0';
      btn.style.borderColor = '#7A2813';
      const activeSpan = btn.querySelector('span:first-child');
      if (activeSpan) activeSpan.style.color = '#7A2813';

      customCommissionState.volume = btn.dataset.vol;
      customCommissionState.volumeLabel = btn.dataset.label;
      customCommissionState.volumePrice = parseInt(btn.dataset.price, 10) || activeCraft.price;
      updateCommissionPriceUI();
    });
  });

  // Motif Selection
  container.querySelectorAll('.btn-custom-motif-opt').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('.btn-custom-motif-opt').forEach(b => {
        b.classList.remove('active');
        b.style.background = '#FAF8F5';
        b.style.borderColor = '#EAE3D9';
        const titleDiv = b.querySelector('div:first-child');
        if (titleDiv) titleDiv.style.color = '#1E150F';
      });
      btn.classList.add('active');
      btn.style.background = '#FFF5F0';
      btn.style.borderColor = '#7A2813';
      const activeTitle = btn.querySelector('div:first-child');
      if (activeTitle) activeTitle.style.color = '#7A2813';

      customCommissionState.motif = btn.dataset.motif;
      customCommissionState.motifFee = parseInt(btn.dataset.fee, 10) || 0;
      updateCommissionPriceUI();
    });
  });

  // Engraving input live update
  inputEngraving?.addEventListener('input', () => {
    customCommissionState.engraving = inputEngraving.value.trim();
    updateCommissionPriceUI();
  });

  // Quick Chips
  container.querySelectorAll('.btn-quick-monogram').forEach(chip => {
    chip.addEventListener('click', () => {
      if (inputEngraving) {
        inputEngraving.value = chip.dataset.text;
        customCommissionState.engraving = chip.dataset.text;
        updateCommissionPriceUI();
      }
    });
  });

  // Apply Custom Commission
  function applyCustomCommission(andCheckout = false) {
    const totalUnitPrice = customCommissionState.volumePrice + customCommissionState.motifFee;
    const engraving = inputEngraving?.value?.trim() || '';
    const blessing = inputBlessing?.value?.trim() || '';

    customCommissionState.configured = true;

    // Update Pills in Product Details Screen
    const lblMonogram = container.querySelector('#label-custom-monogram');
    const lblVolume = container.querySelector('#label-custom-volume');
    const lblMotif = container.querySelector('#label-custom-motif');
    const pillMonogram = container.querySelector('#pill-custom-monogram');
    const pillVolume = container.querySelector('#pill-custom-volume');
    const pillMotif = container.querySelector('#pill-custom-motif');
    const btnReqText = container.querySelector('#btn-request-custom-text');

    if (lblMonogram && pillMonogram) {
      lblMonogram.textContent = engraving ? `✓ Engraved: "${engraving}"` : '✓ Free Engraving (Standard)';
      pillMonogram.style.borderColor = '#1E6B47';
      pillMonogram.style.background = '#EBF7EE';
      pillMonogram.style.color = '#1E6B47';
    }
    if (lblVolume && pillVolume) {
      lblVolume.textContent = `✓ Spec: ${customCommissionState.volumeLabel} (₹${customCommissionState.volumePrice})`;
      pillVolume.style.borderColor = '#1E6B47';
      pillVolume.style.background = '#EBF7EE';
      pillVolume.style.color = '#1E6B47';
    }
    if (lblMotif && pillMotif) {
      lblMotif.textContent = `✓ Pattern: ${customCommissionState.motif}${customCommissionState.motifFee > 0 ? ` (+₹${customCommissionState.motifFee})` : ''}`;
      pillMotif.style.borderColor = '#1E6B47';
      pillMotif.style.background = '#EBF7EE';
      pillMotif.style.color = '#1E6B47';
    }
    if (btnReqText) {
      btnReqText.textContent = `✓ Commission Configured (₹${totalUnitPrice}) • Edit`;
    }

    // Add Customized Craft to Buyer Cart
    State.addToCart({
      id: `commission-${Date.now()}`,
      title: `Custom Made-to-Order ${activeCraft.title} (${customCommissionState.volume})`,
      artisan: artisanObj.name,
      origin: clusterObj.name,
      specification: `Custom ${customCommissionState.volumeLabel} • ${customCommissionState.motif}${engraving ? ` • Engraved: "${engraving}"` : ''}`,
      price: totalUnitPrice,
      quantity: 1,
      image: heroImage,
      dispatch: 'Made to Order • Dispatches within 2 weeks',
      blessingNote: blessing || `Custom direct commission for Master ${artisanObj.name}.`
    });

    window.updateBottomNavUI?.();
    closeCommissionModal();

    if (andCheckout) {
      window.showToast?.("Custom Commission added! Proceeding to checkout...");
      State.setScreen('cart_review');
    } else {
      window.showToast?.(`Custom Commission (₹${totalUnitPrice}) added to Patron Cart!`);
    }
  }

  container.querySelector('#btn-submit-custom-cart')?.addEventListener('click', () => {
    applyCustomCommission(false);
  });

  container.querySelector('#btn-submit-custom-checkout')?.addEventListener('click', () => {
    applyCustomCommission(true);
  });

  container.querySelector('#btn-sticky-cart')?.addEventListener('click', () => {
    State.addToCart({
      id: activeCraft.id,
      title: activeCraft.title,
      artisan: artisanObj.name,
      origin: clusterObj.name,
      price: activeCraft.price,
      quantity: selectedQuantity,
      image: heroImage
    });
    window.updateBottomNavUI?.();
    window.showToast?.(`${selectedQuantity}x ${activeCraft.title} added to Cart!`);
  });

  container.querySelector('#btn-sticky-buy-now')?.addEventListener('click', () => {
    State.addToCart({
      id: activeCraft.id,
      title: activeCraft.title,
      artisan: artisanObj.name,
      origin: clusterObj.name,
      price: activeCraft.price,
      quantity: selectedQuantity,
      image: heroImage
    });
    window.updateBottomNavUI?.();
    State.setScreen('cart_review');
  });

  // ==========================================
  // INTERACTIVE 4K CRAFT ZOOM & LIGHTBOX
  // ==========================================
  const modalZoom = container.querySelector('#modal-image-zoom');
  const zoomModalImg = container.querySelector('#zoom-modal-img');
  const zoomViewport = container.querySelector('#zoom-viewport');
  const zoomLevelText = container.querySelector('#zoom-level-text');
  const zoomFloatingHint = container.querySelector('#zoom-floating-hint');

  let currentZoom = 1.5;
  let panX = 0;
  let panY = 0;
  let isDragging = false;
  let startX = 0;
  let startY = 0;

  function updateZoomTransform() {
    if (!zoomModalImg) return;
    zoomModalImg.style.transform = `scale(${currentZoom}) translate(${panX / currentZoom}px, ${panY / currentZoom}px)`;
    if (zoomLevelText) {
      zoomLevelText.textContent = `${Math.round(currentZoom * 100)}%`;
    }
    if (zoomViewport) {
      zoomViewport.style.cursor = currentZoom > 1.0 ? 'grab' : 'zoom-in';
    }
  }

  function openZoomModal(imgSrc = null) {
    if (!modalZoom) return;
    const currentHeroSrc = imgSrc || container.querySelector('#main-product-image')?.src || heroImage;
    if (zoomModalImg) {
      zoomModalImg.src = currentHeroSrc;
    }
    currentZoom = 1.5;
    panX = 0;
    panY = 0;
    updateZoomTransform();
    modalZoom.style.display = 'flex';
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }

    // Fade hint after 3 seconds
    if (zoomFloatingHint) {
      zoomFloatingHint.style.opacity = '1';
      setTimeout(() => {
        if (zoomFloatingHint) zoomFloatingHint.style.opacity = '0';
      }, 3000);
    }
  }

  function closeZoomModal() {
    if (!modalZoom) return;
    modalZoom.style.display = 'none';
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }

  // Open triggers: Zoom button and direct click on hero image
  container.querySelector('#btn-zoom-image')?.addEventListener('click', (e) => {
    e.stopPropagation();
    openZoomModal();
  });

  container.querySelector('#main-product-image')?.addEventListener('click', () => {
    openZoomModal();
  });

  // Close triggers
  container.querySelector('#btn-close-zoom-modal')?.addEventListener('click', closeZoomModal);

  modalZoom?.addEventListener('click', (e) => {
    if (e.target === modalZoom || e.target === zoomViewport) {
      closeZoomModal();
    }
  });

  // Zoom In / Out / Reset Controls
  container.querySelector('#btn-zoom-in')?.addEventListener('click', (e) => {
    e.stopPropagation();
    if (currentZoom < 4.0) {
      currentZoom = Math.min(4.0, +(currentZoom + 0.5).toFixed(1));
      updateZoomTransform();
    }
  });

  container.querySelector('#btn-zoom-out')?.addEventListener('click', (e) => {
    e.stopPropagation();
    if (currentZoom > 1.0) {
      currentZoom = Math.max(1.0, +(currentZoom - 0.5).toFixed(1));
      if (currentZoom === 1.0) {
        panX = 0;
        panY = 0;
      }
      updateZoomTransform();
    }
  });

  container.querySelector('#btn-zoom-reset')?.addEventListener('click', (e) => {
    e.stopPropagation();
    currentZoom = (currentZoom === 1.0) ? 2.0 : 1.0;
    panX = 0;
    panY = 0;
    updateZoomTransform();
  });

  // Double-click to toggle zoom
  zoomViewport?.addEventListener('dblclick', (e) => {
    e.preventDefault();
    if (currentZoom > 1.0) {
      currentZoom = 1.0;
      panX = 0;
      panY = 0;
    } else {
      currentZoom = 2.5;
    }
    updateZoomTransform();
  });

  // Wheel zoom
  zoomViewport?.addEventListener('wheel', (e) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      currentZoom = Math.min(4.0, +(currentZoom + 0.25).toFixed(2));
    } else {
      currentZoom = Math.max(1.0, +(currentZoom - 0.25).toFixed(2));
      if (currentZoom === 1.0) {
        panX = 0;
        panY = 0;
      }
    }
    updateZoomTransform();
  }, { passive: false });

  // Mouse drag panning
  zoomViewport?.addEventListener('mousedown', (e) => {
    if (currentZoom <= 1.0) return;
    isDragging = true;
    startX = e.clientX - panX;
    startY = e.clientY - panY;
    zoomViewport.style.cursor = 'grabbing';
  });

  if (typeof window !== 'undefined') {
    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      panX = e.clientX - startX;
      panY = e.clientY - startY;
      const maxPan = 160 * currentZoom;
      panX = Math.max(-maxPan, Math.min(maxPan, panX));
      panY = Math.max(-maxPan, Math.min(maxPan, panY));
      updateZoomTransform();
    });

    window.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false;
        if (zoomViewport) zoomViewport.style.cursor = currentZoom > 1.0 ? 'grab' : 'zoom-in';
      }
    });

    // Touch drag panning for mobile
    zoomViewport?.addEventListener('touchstart', (e) => {
      if (currentZoom <= 1.0 || e.touches.length !== 1) return;
      isDragging = true;
      startX = e.touches[0].clientX - panX;
      startY = e.touches[0].clientY - panY;
    }, { passive: true });

    zoomViewport?.addEventListener('touchmove', (e) => {
      if (!isDragging || e.touches.length !== 1) return;
      panX = e.touches[0].clientX - startX;
      panY = e.touches[0].clientY - startY;
      const maxPan = 160 * currentZoom;
      panX = Math.max(-maxPan, Math.min(maxPan, panX));
      panY = Math.max(-maxPan, Math.min(maxPan, panY));
      updateZoomTransform();
    }, { passive: true });

    zoomViewport?.addEventListener('touchend', () => {
      isDragging = false;
    });

    // Keyboard navigation (ESC to close, +/- to zoom)
    window.addEventListener('keydown', (e) => {
      if (modalZoom && modalZoom.style.display !== 'none') {
        if (e.key === 'Escape') closeZoomModal();
        if (e.key === '+' || e.key === '=') {
          currentZoom = Math.min(4.0, +(currentZoom + 0.5).toFixed(1));
          updateZoomTransform();
        }
        if (e.key === '-' || e.key === '_') {
          currentZoom = Math.max(1.0, +(currentZoom - 0.5).toFixed(1));
          updateZoomTransform();
        }
      }
    });
  }

  // Thumbnails inside zoom modal
  container.querySelectorAll('.zoom-thumb-item').forEach(thumb => {
    thumb.addEventListener('click', (e) => {
      e.stopPropagation();
      const idx = parseInt(thumb.dataset.idx, 10) || 0;
      container.querySelectorAll('.zoom-thumb-item').forEach((t, i) => {
        t.style.border = (i === idx) ? '2.5px solid #FCD34D' : '1px solid rgba(255,255,255,0.25)';
        t.style.opacity = (i === idx) ? '1' : '0.6';
      });
      const newSrc = galleryImages[idx] || galleryImages[0];
      if (zoomModalImg) zoomModalImg.src = newSrc;
      window.selectThumb?.(idx);
    });
  });

  if (typeof window !== 'undefined') {
    window.selectThumb = function(index) {
      const mainImg = container.querySelector('#main-product-image');
      const thumbs = container.querySelectorAll('.thumb-item');
      thumbs.forEach((t, i) => {
        t.style.border = (i === index) ? '2px solid #7A2813' : '1px solid #ECE7E1';
      });
      const activeSrc = galleryImages[index] || galleryImages[0];
      if (mainImg) mainImg.src = activeSrc;
      if (zoomModalImg) zoomModalImg.src = activeSrc;
      container.querySelectorAll('.zoom-thumb-item').forEach((t, i) => {
        t.style.border = (i === index) ? '2.5px solid #FCD34D' : '1px solid rgba(255,255,255,0.25)';
        t.style.opacity = (i === index) ? '1' : '0.6';
      });
    };
  }
}
