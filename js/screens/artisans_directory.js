/**
 * Screen: Artisans Directory & GI Guilds (Artisans Tab)
 * Authenticated master craftsmen across India
 */

import { State } from '../state.js';

export const MasterArtisans = [
  {
    id: 1,
    name: 'Ramdev Kumhar',
    craft: 'Varanasi Pottery & Clay Craft',
    giTag: 'GI #84 (Uttar Pradesh)',
    pehchanId: 'UP-VAR-49281-H',
    trustScore: 98,
    avatar: '/assets/artisan_ramulu.jpg',
    speciality: 'Hand-etched Terracotta cooling pitchers & ceremonial diyas',
    experience: '24 Years Master Craftsman'
  },
  {
    id: 2,
    name: 'Saleem Ahmed',
    craft: 'Bidriware Silver Wire Inlay',
    giTag: 'GI #67 (Karnataka)',
    pehchanId: 'KA-BID-11092-B',
    trustScore: 97,
    avatar: '/assets/artisan_saleem.jpg',
    speciality: 'Zinc-copper alloy vases with pure silver inlay & oxidized finish',
    experience: '30 Years State Awardee'
  },
  {
    id: 3,
    name: 'Sunita Devi',
    craft: 'Jaipur Blue Pottery',
    giTag: 'GI #33 (Rajasthan)',
    pehchanId: 'RJ-JAI-77201-P',
    trustScore: 96,
    avatar: '/assets/artisan_sunita.jpg',
    speciality: 'Quartz stone paste tableware with cobalt Persian motifs',
    experience: '18 Years Guild Leader'
  },
  {
    id: 4,
    name: 'Budhram Sahu',
    craft: 'Bastar Dhokra Lost-Wax Art',
    giTag: 'GI #92 (Chhattisgarh)',
    pehchanId: 'CG-BAS-99382-D',
    trustScore: 99,
    avatar: '/assets/artisan_budhram.jpg',
    speciality: 'Tribal bronze casting using traditional beeswax techniques',
    experience: '35 Years National Shilp Guru'
  }
];

export function renderArtisansScreen(container) {
  container.innerHTML = `
    <div class="artisans-screen animate-fade-in">
      <div class="section-label-row" style="margin-top:12px;">
        <span class="section-label" style="font-size:0.9rem;">Govt. Verified Master Artisans</span>
        <span class="badge-green" style="font-size:0.65rem;">Ministry of Textiles</span>
      </div>
      <p style="font-size:0.75rem; color:var(--text-secondary); margin-bottom:14px;">
        Direct GI guild artisans authenticated with biometric Pehchan ID cards.
      </p>

      <div style="display:flex; flex-direction:column; gap:12px;">
        ${MasterArtisans.map(a => `
          <div style="background:#FFFFFF; border:1px solid var(--border-subtle); border-radius:var(--radius-lg); padding:14px; box-shadow:var(--shadow-sm);">
            <div style="display:flex; gap:12px; align-items:center; margin-bottom:10px;">
              <img src="${a.avatar}" alt="${a.name}" style="width:52px; height:52px; border-radius:12px; object-fit:cover; border:2px solid var(--color-terracotta);" onerror="this.src='/assets/artisan_ramulu.jpg'">
              <div style="flex:1;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <span style="font-size:0.95rem; font-weight:800; color:var(--text-primary);">${a.name}</span>
                  <span class="badge-green" style="font-size:0.65rem;">${a.trustScore}/100 Trust</span>
                </div>
                <div style="font-size:0.72rem; color:var(--color-terracotta); font-weight:700;">${a.craft} • ${a.giTag}</div>
                <div style="font-size:0.68rem; color:var(--text-muted); font-family:monospace;">ID: ${a.pehchanId}</div>
              </div>
            </div>

            <div style="background:#FBF8F3; border-radius:var(--radius-sm); padding:8px 10px; font-size:0.72rem; color:var(--text-secondary); margin-bottom:10px; line-height:1.35;">
              "${a.speciality}" • <em>${a.experience}</em>
            </div>

            <div style="display:flex; gap:8px;">
              <button type="button" class="btn-secondary" style="flex:1; padding:8px; font-size:0.75rem;" onclick="window.showToast('Connecting with ${a.name} via Guild Hotline...')">
                💬 Guild Message
              </button>
              <button type="button" class="btn-primary" style="flex:1; padding:8px; font-size:0.75rem;" onclick="window.navigateToScreen('explore')">
                View Studio Crafts
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}
