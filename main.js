(function () {
  const content = window.MS_CONTENT;

  /* ===== 1. HELPERS ===== */
  function escapeHtml(str) {
    if (str == null) return '';
    return String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  function resolvePath(path) {
    return path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), content);
  }

  // Where the site is mounted. Usually "/", but a preview deploy can sit under a
  // subpath (GitHub Pages project sites serve at /<repo>/). main.js always lives
  // at the site root, so its own <script> URL is the reliable way to find it.
  const SITE_ROOT = (() => {
    const tag = document.querySelector('script[src$="main.js"]');
    return tag ? new URL('.', tag.src).pathname : '/';
  })();

  // Content image paths are stored relative to the site root (e.g. "brand_assets/x.jpg").
  // The LP is also served from /pl/, so normalise anything that isn't already absolute
  // (same helper as in assets/tour.js).
  function imgUrl(src) {
    if (!src) return '';
    if (/^(https?:)?\/\//.test(src) || src.startsWith('/')) return src;
    return SITE_ROOT + src;
  }

  function hydrateContent() {
    document.querySelectorAll('[data-content]').forEach((el) => {
      const val = resolvePath(el.getAttribute('data-content'));
      if (val == null) return;
      if (Array.isArray(val)) {
        el.innerHTML = val
          .map((item) => `<p>${escapeHtml(item).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')}</p>`)
          .join('');
      } else el.textContent = val;
    });
    document.querySelectorAll('[data-content-src]').forEach((el) => {
      const val = resolvePath(el.getAttribute('data-content-src'));
      if (val) el.setAttribute('src', imgUrl(val));
    });
    document.querySelectorAll('[data-content-alt]').forEach((el) => {
      const val = resolvePath(el.getAttribute('data-content-alt'));
      if (val) el.setAttribute('alt', val);
    });
    document.querySelectorAll('[data-content-href]').forEach((el) => {
      const val = resolvePath(el.getAttribute('data-content-href'));
      const prefix = el.getAttribute('data-content-href-prefix') || '';
      if (val) el.setAttribute('href', prefix + val);
    });
    document.querySelectorAll('[data-content-placeholder]').forEach((el) => {
      const val = resolvePath(el.getAttribute('data-content-placeholder'));
      if (val != null) el.setAttribute('placeholder', val);
    });
    document.querySelectorAll('[data-content-aria-label]').forEach((el) => {
      const val = resolvePath(el.getAttribute('data-content-aria-label'));
      if (val) el.setAttribute('aria-label', val);
    });
    linkifyNahvsr();
  }

  // The footer credentials line ends with a NAHVSR mention (SK "členovia NAHVSR",
  // PL "członkowie NAHVSR"). Content strings are plain text set via textContent,
  // so the outbound link is added here instead of embedding markup in content.js.
  function linkifyNahvsr() {
    document.querySelectorAll('[data-content="footer.credentialsNote"]').forEach((el) => {
      const text = el.textContent;
      if (!text.includes('NAHVSR')) return;
      el.innerHTML = escapeHtml(text).replace(
        'NAHVSR',
        '<a href="https://www.nahvsr.sk/" target="_blank" rel="noopener noreferrer" class="underline decoration-cream/25 underline-offset-2 hover:text-periwinkle hover:decoration-periwinkle active:text-periwinkle transition-colors">NAHVSR</a>'
      );
    });
  }

  function buildStars(difficulty) {
    let html = '';
    for (let i = 1; i <= 5; i++) {
      html += `<svg class="inline-block w-4 h-4 ${i <= difficulty ? 'star' : 'star--empty'}" style="fill:currentColor" aria-hidden="true"><use href="#icon-star"/></svg>`;
    }
    return html;
  }

  /* ===== 2. NAV ===== */
  function renderNavLinks() {
    const { nav } = content;
    document.getElementById('nav-links').innerHTML = nav.links
      .map((l) => `<a href="${l.href}" class="nav-link font-medium text-sm">${escapeHtml(l.label)}</a>`)
      .join('');
    document.getElementById('mobile-nav-links').innerHTML = nav.links
      .map((l) => `<a href="${l.href}" class="font-display font-semibold text-lg text-navy900">${escapeHtml(l.label)}</a>`)
      .join('');
    document.getElementById('footer-nav-links').innerHTML = nav.links
      .map((l) => `<a href="${l.href}" class="text-cream/70 hover:text-periwinkle text-sm transition-colors">${escapeHtml(l.label)}</a>`)
      .join('');
  }

  /* ===== 2b. LANGUAGE SWITCHER (SK | PL) =====
     The PL site is the same codebase served under /pl/ with /pl/content.js.
     The counterpart URL is a pure path-prefix swap, so the switcher works on
     every page (LP, thank-you, tour pages) without per-page configuration. */
  function langCounterpartUrl(targetLang) {
    // Swap the prefix on the path *below* SITE_ROOT, so this keeps working when
    // the site is mounted under a subpath rather than at the domain root.
    const here = window.location.pathname;
    let rel = here.startsWith(SITE_ROOT) ? here.slice(SITE_ROOT.length) : here.replace(/^\//, '');
    const isPl = rel === 'pl' || rel.startsWith('pl/');
    if (targetLang === 'pl' && !isPl) rel = 'pl/' + rel;
    if (targetLang === 'sk' && isPl) rel = rel.replace(/^pl\/?/, '');
    return SITE_ROOT + rel + window.location.search + window.location.hash;
  }

  function renderLangSwitcher() {
    const current = (content.meta && content.meta.lang) === 'pl' ? 'pl' : 'sk';
    const html = ['sk', 'pl'].map((lang) => {
      const label = lang.toUpperCase();
      if (lang === current) return `<span class="lang-switcher__item lang-switcher__item--active" aria-current="true">${label}</span>`;
      return `<a href="${langCounterpartUrl(lang)}" class="lang-switcher__item" hreflang="${lang}" lang="${lang}" aria-label="${lang === 'pl' ? 'Polski' : 'Slovensky'}">${label}</a>`;
    }).join('<span class="lang-switcher__sep" aria-hidden="true">|</span>');
    document.querySelectorAll('.lang-switcher').forEach((el) => { el.innerHTML = html; });
  }

  const header = document.getElementById('site-header');
  function updateHeaderScrollState() {
    header.classList.toggle('is-scrolled', window.scrollY > 40);
  }

  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuBackdrop = document.getElementById('mobile-menu-backdrop');
  const mobileMenuClose = document.getElementById('mobile-menu-close');

  function openMobileMenu() {
    mobileMenu.hidden = false;
    mobileMenuBackdrop.classList.add('is-open');
    requestAnimationFrame(() => mobileMenu.classList.add('is-open'));
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    const firstLink = mobileMenu.querySelector('a, button');
    if (firstLink) firstLink.focus();
  }
  function closeMobileMenu() {
    mobileMenu.classList.remove('is-open');
    mobileMenuBackdrop.classList.remove('is-open');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    setTimeout(() => { mobileMenu.hidden = true; }, 320);
    hamburgerBtn.focus();
  }
  hamburgerBtn.addEventListener('click', openMobileMenu);
  mobileMenuClose.addEventListener('click', closeMobileMenu);
  mobileMenuBackdrop.addEventListener('click', closeMobileMenu);
  mobileMenu.addEventListener('click', (e) => {
    if (e.target.closest('a[href^="#"]')) closeMobileMenu();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !mobileMenu.hidden) closeMobileMenu();
  });

  /* ===== 3. OVERLAY MANAGER (shared by modal + lightbox) ===== */
  const overlayStack = [];

  function getFocusable(container) {
    return Array.from(container.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'))
      .filter((el) => !el.disabled && el.offsetParent !== null);
  }

  function openOverlay({ backdrop, panel, initialFocus, onClose }) {
    const lastFocused = document.activeElement;
    backdrop.hidden = false;
    document.body.style.overflow = 'hidden';
    overlayStack.push({ backdrop, panel, onClose, lastFocused });
    const toFocus = initialFocus || getFocusable(panel)[0];
    if (toFocus) toFocus.focus();
  }

  function closeTopOverlay() {
    const top = overlayStack.pop();
    if (!top) return;
    top.backdrop.hidden = true;
    if (overlayStack.length === 0) document.body.style.overflow = '';
    if (top.onClose) top.onClose();
    if (top.lastFocused) top.lastFocused.focus();
  }

  document.addEventListener('keydown', (e) => {
    if (overlayStack.length === 0) return;
    const top = overlayStack[overlayStack.length - 1];
    if (e.key === 'Escape') { closeTopOverlay(); return; }
    if (e.key === 'Tab') {
      const focusable = getFocusable(top.panel);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  /* ===== 4. RENDER: TOURS (season + region grouped) ===== */
  function guideRatioLabel(ratio) {
    const { guideRatioPrefix, guideRatioSuffix, guideRatioUnit } = content.toursSection;
    const n = parseInt(String(ratio).split(':')[0], 10);
    const unit = n === 1 ? guideRatioUnit.one : (n <= 4 ? guideRatioUnit.few : guideRatioUnit.many);
    return `${guideRatioPrefix} ${n} ${unit} ${guideRatioSuffix}`;
  }

  // Tour photos render at most ~380px wide in the card grid, but the same file
  // doubles as the detail-page hero at 1440w. Offer a 720w variant so phones
  // stop downloading the hero-sized version for a thumbnail.
  // Note: monte-rosa's source is only 800px, so its "1440w" candidate is really
  // 800px — the browser just gets a slightly softer image on very large screens,
  // which is already true today. Flagged to the client as a photo to replace.
  function cardSrcset(src) {
    if (!src || /^https?:/i.test(src) || !/\.webp$/i.test(src)) return '';
    const at = (w) => imgUrl(src.replace(/\.webp$/i, `-${w}.webp`));
    return ` srcset="${at(720)} 720w, ${at(960)} 960w, ${imgUrl(src)} 1440w"` +
           ` sizes="(min-width:1024px) 380px, (min-width:640px) 45vw, calc(100vw - 3rem)"`;
  }

  function renderTourCard(tour) {
    const { toursSection } = content;
    const priceHtml = tour.priceFrom != null
      ? `<span class="text-muted text-xs uppercase tracking-wide">${escapeHtml(toursSection.priceFromLabel)}</span><span class="font-display font-bold text-lg text-royal">${tour.priceFrom} ${escapeHtml(tour.currency)}</span>`
      : `<span class="font-display font-bold text-base text-royal">${escapeHtml(toursSection.priceOnRequestLabel)}</span>`;
    // The photo doubles as a link to the same detail page — a far bigger tap target than the
    // button alone, especially on mobile. Kept out of the a11y tree (aria-hidden + tabindex="-1")
    // so it doesn't announce as a duplicate link; "Viac info" below stays the keyboard/SR path.
    const mediaLink = tour.slug
      ? `<a href="tury/${tour.slug}.html" class="tour-media-link" tabindex="-1" aria-hidden="true"></a>`
      : '';
    // "Viac info" links to the tour's detail page when it has a slug; falls back to the booking modal otherwise.
    const infoCta = tour.slug
      ? `<a href="tury/${tour.slug}.html" class="btn-pill btn-pill--outline-ink !px-4 !py-2 text-sm flex-1" data-tour-id="${tour.id}">${escapeHtml(toursSection.ctaLabel)}</a>`
      : `<button type="button" class="btn-pill btn-pill--outline-ink !px-4 !py-2 text-sm flex-1" data-open-modal data-tour-id="${tour.id}">${escapeHtml(toursSection.ctaLabel)}</button>`;
    return `
      <article class="tour-card surface-elevated flex flex-col">
        <div class="relative">
          <div class="tour-media media">
            <img src="${imgUrl(tour.image)}"${cardSrcset(tour.image)} alt="${escapeHtml(tour.imageAlt)}" loading="lazy" width="720" height="520" />
            ${mediaLink}
          </div>
          <div class="info-strip absolute left-4 right-4 bottom-0 bg-surface rounded-lg px-4 py-2.5 flex items-center justify-between text-sm">
            <span class="flex items-center gap-1.5 font-medium">
              <svg class="w-4 h-4 text-royal" style="fill:currentColor" aria-hidden="true"><use href="#icon-clock"/></svg>
              ${escapeHtml(tour.duration)}
            </span>
            <span class="flex items-center gap-1.5" role="img" aria-label="${escapeHtml(toursSection.difficultyLabel)} ${tour.difficulty} z 5">
              <span class="text-muted text-xs font-medium" aria-hidden="true">${escapeHtml(toursSection.difficultyLabel)}</span>
              ${buildStars(tour.difficulty)}
            </span>
          </div>
        </div>
        <div class="pt-9 px-6 pb-6 flex flex-col flex-1">
          <h3 class="font-display font-bold text-lg">${escapeHtml(tour.name)}</h3>
          <div class="flex items-center gap-1.5 text-muted text-sm mt-1.5">
            <svg class="w-3.5 h-3.5" style="fill:currentColor" aria-hidden="true"><use href="#icon-pin"/></svg>
            ${escapeHtml(tour.location)}
          </div>
          <div class="flex items-center gap-1.5 text-muted text-xs mt-2">
            <svg class="w-3.5 h-3.5 text-royal" style="fill:currentColor" aria-hidden="true"><use href="#icon-shield"/></svg>
            ${escapeHtml(guideRatioLabel(tour.guideRatio))}
          </div>
          <hr class="hairline my-4" />
          <p class="text-muted text-sm">${escapeHtml(tour.description)}</p>
          <div class="mt-auto">
            <hr class="hairline my-4" />
            <div class="flex items-baseline justify-end gap-1.5 mb-4">
              ${priceHtml}
            </div>
            <div class="flex items-center gap-3">
              ${infoCta}
              <button type="button" class="btn-pill btn-pill--primary !px-4 !py-2 text-sm flex-1" data-open-modal data-tour-id="${tour.id}">${escapeHtml(toursSection.ctaReserveLabel)}</button>
            </div>
          </div>
        </div>
      </article>
    `;
  }

  // Cards shown per season before the mobile "show all" button; hidden ones reveal on tap.
  const MOBILE_TOUR_LIMIT = 3;

  function renderSeasonGroup(season, seasonId, isActive) {
    const { seasonToggle, toursSection } = content;
    if (season.length === 0) {
      return `<div class="season-group" data-season-group="${seasonId}" ${isActive ? '' : 'hidden'}><p class="text-muted text-center">${escapeHtml(seasonToggle.emptyState)}</p></div>`;
    }
    // One continuous grid (no per-region sub-grid) so rows pack fully (3/3/2, no orphan row).
    // Featured tours lead — so the mobile "top 3" (see MOBILE_TOUR_LIMIT) are the featured ones —
    // with region order as the tiebreaker. Sort is stable, preserving array order within a tier.
    const regionOrder = Object.keys(seasonToggle.regionLabels);
    const sorted = [...season].sort((a, b) =>
      (a.featured ? 0 : 1) - (b.featured ? 0 : 1) ||
      regionOrder.indexOf(a.region) - regionOrder.indexOf(b.region));
    // Collapse to the first MOBILE_TOUR_LIMIT cards on mobile (single-column) when there are more;
    // the CSS clamp on .season-group.is-collapsed hides cards 4+ below the sm breakpoint.
    const collapsible = season.length > MOBILE_TOUR_LIMIT;
    const moreButton = collapsible ? `
        <div class="flex justify-center sm:hidden">
          <button type="button" class="btn-pill btn-pill--secondary" data-toggle-tours aria-expanded="false">${escapeHtml(toursSection.showAllLabel.replace('{count}', season.length))}</button>
        </div>` : '';
    return `
      <div class="season-group flex flex-col gap-10${collapsible ? ' is-collapsed' : ''}" data-season-group="${seasonId}" ${isActive ? '' : 'hidden'}>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          ${sorted.map(renderTourCard).join('')}
        </div>${moreButton}
      </div>
    `;
  }

  function renderTours(activeSeason) {
    const { tours, seasonToggle } = content;
    const shown = tours.filter((t) => t.showOnLp);
    document.getElementById('tours-grid').innerHTML = seasonToggle.options
      .map((opt) => renderSeasonGroup(shown.filter((t) => t.season === opt.id), opt.id, opt.id === activeSeason))
      .join('');
  }

  /* ===== 4b. SEASON TOGGLE ===== */
  function getInitialSeason() {
    const { seasonToggle } = content;
    const requested = new URLSearchParams(window.location.search).get('season');
    const isValid = seasonToggle.options.some((o) => o.id === requested);
    return isValid ? requested : seasonToggle.defaultSeason;
  }

  function renderSeasonToggle(activeSeason) {
    const { seasonToggle } = content;
    const el = document.getElementById('season-toggle');
    el.setAttribute('aria-label', seasonToggle.heading);
    el.innerHTML = seasonToggle.options.map((opt) => `
      <button type="button" class="season-pill" data-season-option="${opt.id}" aria-pressed="${opt.id === activeSeason}">${escapeHtml(opt.label)}</button>
    `).join('');
  }

  function switchSeason(season) {
    const { seasonToggle, tours } = content;
    document.querySelectorAll('#season-toggle .season-pill').forEach((btn) => {
      btn.setAttribute('aria-pressed', String(btn.getAttribute('data-season-option') === season));
    });
    document.querySelectorAll('[data-season-group]').forEach((group) => {
      const isActive = group.getAttribute('data-season-group') === season;
      if (isActive) {
        group.hidden = false;
        group.classList.add('is-entering');
        requestAnimationFrame(() => requestAnimationFrame(() => group.classList.remove('is-entering')));
      } else {
        group.hidden = true;
      }
    });
    const url = new URL(window.location.href);
    url.searchParams.set('season', season);
    window.history.replaceState(null, '', url);
    const count = tours.filter((t) => t.showOnLp && t.season === season).length;
    const label = seasonToggle.options.find((o) => o.id === season).label;
    document.getElementById('season-live-region').textContent = seasonToggle.liveAnnounceTemplate
      .replace('{season}', label)
      .replace('{count}', count);
    window.gtag('event', 'season_toggle', { season });
  }

  function initSeasonToggle() {
    const toggle = document.getElementById('season-toggle');
    toggle.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-season-option]');
      if (!btn || btn.getAttribute('aria-pressed') === 'true') return;
      switchSeason(btn.getAttribute('data-season-option'));
    });
  }

  // Delegated on #tours-grid (survives renderTours' innerHTML re-render). Toggles a season group
  // between its collapsed (mobile: first 3 cards) and expanded (all cards) states.
  function initToursExpand() {
    const grid = document.getElementById('tours-grid');
    grid.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-toggle-tours]');
      if (!btn) return;
      const group = btn.closest('.season-group');
      if (!group) return;
      const { toursSection } = content;
      const collapsed = group.classList.toggle('is-collapsed');
      btn.setAttribute('aria-expanded', String(!collapsed));
      const count = group.querySelectorAll('.tour-card').length;
      btn.textContent = collapsed
        ? toursSection.showAllLabel.replace('{count}', count)
        : toursSection.showLessLabel;
      window.gtag('event', 'tours_expand', {
        season: group.getAttribute('data-season-group'),
        expanded: !collapsed,
      });
    });
  }

  /* ===== 5. RENDER: PROCESS ===== */
  function renderProcess() {
    const track = '<div class="process-track hidden lg:block" aria-hidden="true"></div>';
    const cards = content.process.steps.map((step) => `
      <div class="process-card surface-elevated rounded-card bg-surface px-6 pb-8 text-center">
        <div class="process-badge w-12 h-12 rounded-full bg-royal text-cream font-display font-bold flex items-center justify-center">${step.number}</div>
        <svg class="w-6 h-6 text-royal mx-auto mt-8 mb-4" style="fill:currentColor" aria-hidden="true"><use href="#${step.icon}"/></svg>
        <h3 class="font-display font-semibold text-lg mb-2">${escapeHtml(step.title)}</h3>
        <p class="text-muted text-sm">${escapeHtml(step.description)}</p>
      </div>
    `).join('');
    document.getElementById('process-steps').innerHTML = track + cards;
  }

  /* ===== 6. RENDER: TESTIMONIALS ===== */
  function renderTestimonials() {
    const { items } = content.testimonialsSection;
    document.getElementById('testimonial-track').innerHTML = items.map((t) => `
      <div class="testimonial-card surface-elevated rounded-card overflow-hidden" style="background:var(--navy-800);">
        ${t.wistiaId ? `
          <wistia-player media-id="${t.wistiaId}" aspect="0.5625" style="--wistia-swatch:url('https://fast.wistia.com/embed/medias/${t.wistiaId}/swatch')"></wistia-player>
        ` : `
          <div class="flex items-center gap-3 px-6 pt-6">
            <img src="${imgUrl(t.avatarImage)}" alt="" loading="lazy" width="44" height="44" class="w-11 h-11 rounded-full object-cover shrink-0" />
            <span class="text-cream/90 text-sm font-medium">${escapeHtml(t.name)}</span>
          </div>
          <div class="p-6 flex flex-col gap-3">
            <svg class="w-6 h-6 text-periwinkle/50 shrink-0" style="fill:currentColor" aria-hidden="true"><use href="#icon-quote"/></svg>
            <p class="font-serif italic text-cream text-base leading-snug">${escapeHtml(t.quote)}</p>
          </div>
        `}
      </div>
    `).join('');
  }

  /* ===== 6b. WISTIA — loaded on approach, not on page load =====
     The player bundle is heavy (~340 KB across ~26 requests, plus Sentry) and
     the testimonials sit well below the fold, so loading it eagerly dominated
     main-thread time for no benefit. rootMargin gives it a head start so the
     video is usually ready by the time the section is actually on screen. */
  function initWistiaLazyLoad() {
    const section = document.getElementById('testimonials');
    if (!section) return;
    const ids = (content.testimonialsSection.items || []).map((t) => t.wistiaId).filter(Boolean);
    if (!ids.length) return;

    let loaded = false;
    const load = () => {
      if (loaded) return;
      loaded = true;
      const add = (src, module) => {
        const el = document.createElement('script');
        el.src = src;
        el.async = true;
        if (module) el.type = 'module';
        document.body.appendChild(el);
      };
      add('https://fast.wistia.com/player.js', false);
      ids.forEach((id) => add(`https://fast.wistia.com/embed/${id}.js`, true));
    };

    if (!('IntersectionObserver' in window)) { load(); return; }
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { load(); io.disconnect(); }
    }, { rootMargin: '600px 0px' });
    io.observe(section);
  }

  /* ===== 7. RENDER: GALLERY + LIGHTBOX ===== */
  function renderGallery() {
    document.getElementById('gallery-grid').innerHTML = content.gallerySection.images.map((img, i) => `
      <button type="button" class="gallery-item aspect-square" data-gallery-index="${i}">
        <img src="${imgUrl(img.src)}" alt="${escapeHtml(img.alt)}" loading="lazy" width="900" height="900" class="w-full h-full object-cover" />
      </button>
    `).join('');
  }

  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  let lightboxIndex = 0;

  function updateLightboxImage() {
    const img = content.gallerySection.images[lightboxIndex];
    lightboxImage.src = imgUrl(img.src);
    lightboxImage.alt = img.alt;
  }
  function openLightbox(index) {
    lightboxIndex = index;
    updateLightboxImage();
    openOverlay({ backdrop: lightbox, panel: lightbox.querySelector('.lightbox-panel'), initialFocus: document.getElementById('lightbox-close') });
  }
  function closeLightbox() { closeTopOverlay(); }
  function lightboxPrev() { lightboxIndex = (lightboxIndex - 1 + content.gallerySection.images.length) % content.gallerySection.images.length; updateLightboxImage(); }
  function lightboxNext() { lightboxIndex = (lightboxIndex + 1) % content.gallerySection.images.length; updateLightboxImage(); }

  document.getElementById('gallery-grid').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-gallery-index]');
    if (!btn) return;
    openLightbox(Number(btn.getAttribute('data-gallery-index')));
  });
  document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
  document.getElementById('lightbox-prev').addEventListener('click', lightboxPrev);
  document.getElementById('lightbox-next').addEventListener('click', lightboxNext);
  lightbox.addEventListener('click', (e) => { if (e.target === e.currentTarget) closeLightbox(); });
  lightbox.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') lightboxPrev();
    if (e.key === 'ArrowRight') lightboxNext();
  });

  /* ===== 8. RENDER: FAQ ACCORDION ===== */
  function renderFaq() {
    document.getElementById('faq-list').innerHTML = content.faqSection.items.map((item, i) => `
      <div class="faq-item surface-elevated rounded-card bg-surface px-6" data-index="${i}">
        <h3 class="m-0">
          <button type="button" class="w-full flex items-center gap-4 py-5 text-left font-display font-semibold" aria-expanded="false" aria-controls="faq-panel-${i}" id="faq-trigger-${i}">
            <span class="font-serif italic text-royal/50 text-sm shrink-0 w-7">${String(i + 1).padStart(2, '0')}</span>
            <span class="flex-1">${escapeHtml(item.question)}</span>
            <svg class="faq-chevron w-5 h-5 shrink-0 text-royal" style="fill:currentColor" aria-hidden="true"><use href="#icon-chevron"/></svg>
          </button>
        </h3>
        <div class="faq-panel-wrap" id="faq-panel-${i}" role="region" aria-labelledby="faq-trigger-${i}" aria-hidden="true">
          <div class="faq-panel-inner"><p class="text-muted pb-5 pl-11 pr-8">${escapeHtml(item.answer)}</p></div>
        </div>
      </div>
    `).join('');
  }

  document.getElementById('faq-list').addEventListener('click', (e) => {
    const btn = e.target.closest('button[aria-expanded]');
    if (!btn) return;
    const item = btn.closest('.faq-item');
    const wasOpen = item.classList.contains('is-open');
    document.querySelectorAll('#faq-list .faq-item').forEach((i) => {
      i.classList.remove('is-open');
      i.querySelector('button[aria-expanded]').setAttribute('aria-expanded', 'false');
      i.querySelector('.faq-panel-wrap').setAttribute('aria-hidden', 'true');
    });
    if (!wasOpen) {
      item.classList.add('is-open');
      btn.setAttribute('aria-expanded', 'true');
      item.querySelector('.faq-panel-wrap').setAttribute('aria-hidden', 'false');
    }
  });

  /* ===== 9. RENDER: FOOTER + PARTNER LOGOS + HERO BADGE ===== */
  function renderFooterGuides() {
    document.getElementById('footer-guides').innerHTML = content.footer.guides.map((g) => `
      <div>
        <div class="text-cream/90 text-sm font-medium">${escapeHtml(g.name)}</div>
        <a href="tel:${g.phone}" class="text-cream/60 hover:text-periwinkle text-sm transition-colors">${escapeHtml(g.phoneDisplay)}</a>
      </div>
    `).join('');
  }
  function renderFooterSocials() {
    document.getElementById('footer-socials').innerHTML = content.footer.socials
      .map((s) => `<a href="${s.href}" target="_blank" rel="noopener noreferrer" class="text-cream/70 hover:text-periwinkle text-sm transition-colors">${escapeHtml(s.label)}</a>`)
      .join('');
  }
  // Legal links resolve against the locale root, so the same data works from
  // /, /pl/, /tury/ and /pl/tury/.
  function renderFooterLegal() {
    const el = document.getElementById('footer-legal');
    const links = (content.footer && content.footer.legalLinks) || [];
    if (!el || !links.length) return;
    const base = (content.meta && content.meta.lang) === 'pl' ? '/pl' : '';
    el.innerHTML = links.map((l) =>
      `<a href="${base}/${l.href}" class="hover:text-periwinkle underline underline-offset-2 transition-colors">${escapeHtml(l.label)}</a>`
    ).join('');
  }

  function renderFooterCopyright() {
    document.getElementById('footer-copyright').textContent = `© ${new Date().getFullYear()} ${content.footer.copyrightName}`;
  }
  function renderPartnerLogos() {
    document.getElementById('partner-logos').innerHTML = content.finalCta.partnerLogos
      .map((p) => `
        <div class="surface-elevated w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-surface p-3 flex items-center justify-center">
          <img src="${imgUrl(p.src)}" alt="${escapeHtml(p.alt)}" loading="lazy" width="200" height="100" class="max-w-full max-h-full object-contain grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-opacity duration-300" />
        </div>
      `)
      .join('');
  }
  /* ===== 10. ABOUT DUO PORTRAIT ===== */
  function initDuoPortrait() {
    const wrap = document.getElementById('about-duo-portrait');
    if (!wrap) return;
    wrap.addEventListener('click', (e) => {
      const btn = e.target.closest('.duo-portrait__photo');
      if (!btn || btn.classList.contains('is-front')) return;
      wrap.querySelectorAll('.duo-portrait__photo').forEach((el) => {
        el.classList.toggle('is-front', el === btn);
        el.classList.toggle('is-back', el !== btn);
      });
    });
  }

  /* ===== 11. BOOKING MODAL ===== */
  const modalBackdrop = document.getElementById('booking-modal-backdrop');
  const modalPanel = document.getElementById('booking-modal');
  const bookingForm = document.getElementById('booking-form');
  const modalSubmitBtn = document.getElementById('modal-submit');
  const modalSubmitLabel = document.getElementById('modal-submit-label');
  const modalSpinner = document.getElementById('modal-spinner');
  const formErrorBanner = document.getElementById('form-error-banner');
  const tourSelect = document.getElementById('field-tour');

  function populateTourSelect() {
    const { tours, modal } = content;
    const options = [`<option value="" disabled selected>${escapeHtml(modal.fields.tour.placeholderOption)}</option>`]
      .concat(tours.filter((t) => t.showOnLp).map((t) => `<option value="${t.id}">${escapeHtml(t.name)}</option>`))
      .concat([`<option value="other">${escapeHtml(modal.fields.tour.otherOptionLabel)}</option>`]);
    tourSelect.innerHTML = options.join('');
  }

  function setFieldError(name, message) {
    const input = bookingForm.querySelector(`[name="${name}"]`);
    const errorEl = bookingForm.querySelector(`[data-error-for="${name}"]`);
    if (message) {
      input.classList.add('is-invalid');
      errorEl.textContent = message;
      errorEl.hidden = false;
    } else {
      input.classList.remove('is-invalid');
      errorEl.hidden = true;
      errorEl.textContent = '';
    }
  }

  function validateForm(data) {
    const { errors } = content.modal;
    const checks = {
      name: data.name.trim() ? '' : errors.required,
      phone: !data.phone.trim() ? errors.required : (!/^[+\d][\d\s()-]{6,}$/.test(data.phone) ? errors.invalidPhone : ''),
      email: !data.email.trim() ? errors.required : (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) ? errors.invalidEmail : ''),
      tour: data.tour ? '' : errors.required,
    };
    let firstInvalid = null;
    Object.entries(checks).forEach(([name, msg]) => {
      setFieldError(name, msg);
      if (msg && !firstInvalid) firstInvalid = name;
    });
    if (firstInvalid) bookingForm.querySelector(`[name="${firstInvalid}"]`).focus();
    return !firstInvalid;
  }

  function setSubmitLoading(isLoading) {
    modalSubmitBtn.disabled = isLoading;
    modalSubmitLabel.textContent = isLoading ? content.modal.submitLoadingLabel : content.modal.submitLabel;
    modalSpinner.hidden = !isLoading;
  }

  function resetBookingForm() {
    bookingForm.reset();
    bookingForm.hidden = false;
    formErrorBanner.hidden = true;
    bookingForm.querySelectorAll('.field-error').forEach((el) => { el.hidden = true; el.textContent = ''; });
    bookingForm.querySelectorAll('.field-input').forEach((el) => el.classList.remove('is-invalid'));
    tourSelect.selectedIndex = 0;
    setSubmitLoading(false);
  }

  function openBookingModal(tourId) {
    resetBookingForm();
    if (tourId) tourSelect.value = tourId;
    openOverlay({ backdrop: modalBackdrop, panel: modalPanel, initialFocus: document.getElementById('field-name') });
  }
  function closeBookingModal() { closeTopOverlay(); }

  document.getElementById('modal-close').addEventListener('click', closeBookingModal);
  modalBackdrop.addEventListener('click', (e) => { if (e.target === e.currentTarget) closeBookingModal(); });
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-open-modal]');
    if (!trigger) return;
    openBookingModal(trigger.getAttribute('data-tour-id'));
  });

  function buildPayload(data) {
    const tourName = data.tour === 'other'
      ? content.modal.fields.tour.otherOptionLabel
      : ((content.tours.find((t) => t.id === data.tour) || {}).name || data.tour);
    return { meno: data.name, telefon: data.phone, email: data.email, vystup: tourName, termin: data.date, sprava: data.message };
  }

  async function submitBooking(payload) {
    if (content.devMode) {
      console.log('[MS devMode] booking payload', payload);
      await new Promise((resolve) => setTimeout(resolve, 700));
      const params = new URLSearchParams(window.location.search);
      if (params.get('mockSubmit') === 'error') throw new Error('mock error');
      return { result: 'success' };
    }
    const res = await fetch(content.appsScriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
    });
    const json = await res.json();
    if (json.result !== 'success') throw new Error(json.error || 'unknown error');
    return json;
  }

  bookingForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(bookingForm);
    const data = {
      name: formData.get('name') || '',
      phone: formData.get('phone') || '',
      email: formData.get('email') || '',
      tour: formData.get('tour') || '',
      date: formData.get('date') || '',
      message: formData.get('message') || '',
    };
    if (!validateForm(data)) return;
    formErrorBanner.hidden = true;
    setSubmitLoading(true);
    try {
      const payload = buildPayload(data);
      await submitBooking(payload);
      const params = new URLSearchParams({ name: payload.meno, tour: payload.vystup, date: payload.termin || '' });
      window.location.href = `thank-you.html?${params.toString()}`;
      return;
    } catch (err) {
      formErrorBanner.textContent = content.modal.errorMessage;
      formErrorBanner.hidden = false;
    } finally {
      setSubmitLoading(false);
    }
  });

  /* ===== 12. WHATSAPP FAB ===== */
  function buildWhatsappHref() {
    return `https://wa.me/${content.whatsapp.phone}?text=${encodeURIComponent(content.whatsapp.prefilledMessage)}`;
  }
  function initWhatsapp() {
    const href = buildWhatsappHref();
    document.querySelectorAll('[data-whatsapp-link]').forEach((el) => {
      el.setAttribute('href', href);
      el.addEventListener('click', () => fireWhatsappConversion());
    });
    const fab = document.getElementById('whatsapp-fab');
    fab.setAttribute('aria-label', content.whatsapp.fabAriaLabel);
    setTimeout(() => fab.classList.add('is-visible'), 500);
  }

  /* ===== 13. TRACKING ===== */
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); console.log('[MS tracking]', arguments); };

  // The Google tag is installed manually in every page's <head> (Google's
  // recommended install), so this is now only a fallback for a page that ships
  // without it. Google is explicit: never more than one Google tag per page.
  function loadGtag() {
    const { ga4MeasurementId } = content.tracking;
    if (!ga4MeasurementId || ga4MeasurementId.includes('XXXX')) return;
    if (document.querySelector('script[src*="googletagmanager.com/gtag/js"]')) return;
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${ga4MeasurementId}`;
    document.head.appendChild(script);
    window.gtag('js', new Date());
    window.gtag('config', ga4MeasurementId);
  }
  function fireWhatsappConversion() {
    window.gtag('event', 'contact');
    window.gtag('event', 'conversion', { send_to: `${content.tracking.googleAdsId}/${content.tracking.convLabelWhatsapp}` });
  }
  function firePhoneConversion() {
    window.gtag('event', 'phone_click');
    window.gtag('event', 'conversion', { send_to: `${content.tracking.googleAdsId}/${content.tracking.convLabelPhone}` });
  }
  document.addEventListener('click', (e) => {
    if (e.target.closest('a[href^="tel:"]')) firePhoneConversion();
  });

  /* ===== 14. SCROLL REVEAL ===== */
  function initScrollReveal() {
    const items = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    items.forEach((el) => io.observe(el));
  }

  /* ===== 15. INIT ===== */
  function init() {
    hydrateContent();
    renderNavLinks();
    renderLangSwitcher();
    const initialSeason = getInitialSeason();
    renderSeasonToggle(initialSeason);
    renderTours(initialSeason);
    initSeasonToggle();
    initToursExpand();
    renderProcess();
    renderTestimonials();
    initWistiaLazyLoad();
    renderGallery();
    renderFaq();
    renderFooterGuides();
    renderFooterSocials();
    renderFooterLegal();
    renderFooterCopyright();
    renderPartnerLogos();
    populateTourSelect();
    initDuoPortrait();
    initWhatsapp();
    loadGtag();
    updateHeaderScrollState();
    initScrollReveal();
    window.addEventListener('scroll', updateHeaderScrollState, { passive: true });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
