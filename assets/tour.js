/* ==========================================================================
   TOUR DETAIL PAGE SCRIPT — /tury/<slug>.html
   Reads window.MS_TOUR_ID, looks the tour up in window.MS_CONTENT, and renders
   the detail page. Also wires the shared header / footer / booking modal /
   lightbox (adapted from main.js). PHASE 1: self-contained duplicate of the
   shared machinery so the working homepage (index.html + main.js) is untouched.
   PHASE 2 will extract these shared helpers into assets/shared.js.
   ========================================================================== */
(function () {
  const content = window.MS_CONTENT;
  const tour = (content.tours || []).find((t) => t.id === window.MS_TOUR_ID);

  /* ===== HELPERS ===== */
  function escapeHtml(str) {
    if (str == null) return '';
    return String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }
  // Where the site is mounted. Usually "/", but a preview deploy can sit under a
  // subpath (GitHub Pages project sites serve at /<repo>/). This file always lives
  // at <site root>/assets/, so its own <script> URL is the reliable way to find it.
  const SITE_ROOT = (() => {
    const tag = document.querySelector('script[src$="assets/tour.js"]');
    return tag ? new URL('..', tag.src).pathname : '/';
  })();

  // Content image paths are stored relative to the site root (e.g. "brand_assets/x.jpg").
  // This page lives under /tury/, so normalise anything that isn't already absolute.
  function imgUrl(src) {
    if (!src) return '';
    if (/^(https?:)?\/\//.test(src) || src.startsWith('/')) return src;
    return SITE_ROOT + src;
  }
  function resolvePath(path) {
    return path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), content);
  }
  function hydrateContent() {
    document.querySelectorAll('[data-content]').forEach((el) => {
      const val = resolvePath(el.getAttribute('data-content'));
      if (val == null) return;
      if (Array.isArray(val)) {
        el.innerHTML = val.map((item) => `<p>${escapeHtml(item).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')}</p>`).join('');
      } else el.textContent = val;
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
  function guideRatioLabel(ratio) {
    const { guideRatioPrefix, guideRatioSuffix, guideRatioUnit } = content.toursSection;
    const n = parseInt(String(ratio).split(':')[0], 10);
    const unit = n === 1 ? guideRatioUnit.one : (n <= 4 ? guideRatioUnit.few : guideRatioUnit.many);
    return `${guideRatioPrefix} ${n} ${unit} ${guideRatioSuffix}`;
  }
  // '' for the Slovak site at root, '/pl' when this page is served under /pl/.
  const localePrefix = (content.meta && content.meta.lang) === 'pl' ? '/pl' : '';

  // Homepage nav uses in-page hashes (#tours). From /tury/ they must point back to the homepage.
  function navHref(href) { return href.startsWith('#') ? `${localePrefix}/index.html` + href : href; }

  /* ===== LANGUAGE SWITCHER (SK | PL) — same path-prefix swap as main.js ===== */
  function langCounterpartUrl(targetLang) {
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
    document.querySelectorAll('.lang-switcher').forEach((n) => { n.innerHTML = html; });
  }

  /* ===== NAV / HEADER / MOBILE MENU ===== */
  function renderNavLinks() {
    const { nav } = content;
    const el = (id) => document.getElementById(id);
    if (el('nav-links')) el('nav-links').innerHTML = nav.links.map((l) => `<a href="${navHref(l.href)}" class="nav-link font-medium text-sm">${escapeHtml(l.label)}</a>`).join('');
    if (el('mobile-nav-links')) el('mobile-nav-links').innerHTML = nav.links.map((l) => `<a href="${navHref(l.href)}" class="font-display font-semibold text-lg text-navy900">${escapeHtml(l.label)}</a>`).join('');
    if (el('footer-nav-links')) el('footer-nav-links').innerHTML = nav.links.map((l) => `<a href="${navHref(l.href)}" class="text-cream/70 hover:text-periwinkle text-sm transition-colors">${escapeHtml(l.label)}</a>`).join('');
  }
  const header = document.getElementById('site-header');
  function updateHeaderScrollState() { header.classList.toggle('is-scrolled', window.scrollY > 40); }

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
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !mobileMenu.hidden) closeMobileMenu(); });

  /* ===== OVERLAY MANAGER (shared by modal + lightbox) ===== */
  const overlayStack = [];
  function getFocusable(container) {
    return Array.from(container.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'))
      .filter((el) => !el.disabled && el.offsetParent !== null);
  }
  function openOverlay({ backdrop, panel, initialFocus }) {
    const lastFocused = document.activeElement;
    backdrop.hidden = false;
    document.body.style.overflow = 'hidden';
    overlayStack.push({ backdrop, panel, lastFocused });
    const toFocus = initialFocus || getFocusable(panel)[0];
    if (toFocus) toFocus.focus();
  }
  function closeTopOverlay() {
    const top = overlayStack.pop();
    if (!top) return;
    top.backdrop.hidden = true;
    if (overlayStack.length === 0) document.body.style.overflow = '';
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

  /* ===== BOOKING MODAL ===== */
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
    if (message) { input.classList.add('is-invalid'); errorEl.textContent = message; errorEl.hidden = false; }
    else { input.classList.remove('is-invalid'); errorEl.hidden = true; errorEl.textContent = ''; }
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
    Object.entries(checks).forEach(([name, msg]) => { setFieldError(name, msg); if (msg && !firstInvalid) firstInvalid = name; });
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
  document.getElementById('modal-close').addEventListener('click', closeTopOverlay);
  modalBackdrop.addEventListener('click', (e) => { if (e.target === e.currentTarget) closeTopOverlay(); });
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
      method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(payload),
    });
    const json = await res.json();
    if (json.result !== 'success') throw new Error(json.error || 'unknown error');
    return json;
  }
  bookingForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(bookingForm);
    const data = {
      name: formData.get('name') || '', phone: formData.get('phone') || '', email: formData.get('email') || '',
      tour: formData.get('tour') || '', date: formData.get('date') || '', message: formData.get('message') || '',
    };
    if (!validateForm(data)) return;
    formErrorBanner.hidden = true;
    setSubmitLoading(true);
    try {
      const payload = buildPayload(data);
      await submitBooking(payload);
      const params = new URLSearchParams({ name: payload.meno, tour: payload.vystup, date: payload.termin || '' });
      window.location.href = `${localePrefix}/thank-you.html?${params.toString()}`;
      return;
    } catch (err) {
      formErrorBanner.textContent = content.modal.errorMessage;
      formErrorBanner.hidden = false;
    } finally {
      setSubmitLoading(false);
    }
  });

  /* ===== LIGHTBOX (per-tour gallery) ===== */
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  let galleryImages = [];
  let lightboxIndex = 0;
  function updateLightboxImage() {
    const img = galleryImages[lightboxIndex];
    lightboxImage.src = imgUrl(img.src);
    lightboxImage.alt = img.alt || '';
  }
  function openLightbox(index) {
    lightboxIndex = index;
    updateLightboxImage();
    openOverlay({ backdrop: lightbox, panel: lightbox.querySelector('.lightbox-panel'), initialFocus: document.getElementById('lightbox-close') });
  }
  function lightboxPrev() { lightboxIndex = (lightboxIndex - 1 + galleryImages.length) % galleryImages.length; updateLightboxImage(); }
  function lightboxNext() { lightboxIndex = (lightboxIndex + 1) % galleryImages.length; updateLightboxImage(); }
  document.getElementById('lightbox-close').addEventListener('click', closeTopOverlay);
  document.getElementById('lightbox-prev').addEventListener('click', lightboxPrev);
  document.getElementById('lightbox-next').addEventListener('click', lightboxNext);
  lightbox.addEventListener('click', (e) => { if (e.target === e.currentTarget) closeTopOverlay(); });
  lightbox.addEventListener('keydown', (e) => { if (e.key === 'ArrowLeft') lightboxPrev(); if (e.key === 'ArrowRight') lightboxNext(); });

  /* ===== FOOTER ===== */
  function renderFooter() {
    const g = document.getElementById('footer-guides');
    if (g) g.innerHTML = content.footer.guides.map((x) => `
      <div>
        <div class="text-cream/90 text-sm font-medium">${escapeHtml(x.name)}</div>
        <a href="tel:${x.phone}" class="text-cream/60 hover:text-periwinkle text-sm transition-colors">${escapeHtml(x.phoneDisplay)}</a>
      </div>`).join('');
    const s = document.getElementById('footer-socials');
    if (s) s.innerHTML = content.footer.socials.map((x) => `<a href="${x.href}" class="text-cream/70 hover:text-periwinkle text-sm transition-colors">${escapeHtml(x.label)}</a>`).join('');
    const l = document.getElementById('footer-legal');
    const legal = content.footer.legalLinks || [];
    if (l && legal.length) {
      l.innerHTML = legal.map((x) =>
        `<a href="${localePrefix}/${x.href}" class="hover:text-periwinkle underline underline-offset-2 transition-colors">${escapeHtml(x.label)}</a>`
      ).join('');
    }
    const c = document.getElementById('footer-copyright');
    if (c) c.textContent = `© ${new Date().getFullYear()} ${content.footer.copyrightName}`;
  }

  /* ===== WHATSAPP + TRACKING ===== */
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  function initWhatsapp() {
    const href = `https://wa.me/${content.whatsapp.phone}?text=${encodeURIComponent(content.whatsapp.prefilledMessage)}`;
    document.querySelectorAll('[data-whatsapp-link]').forEach((el) => el.setAttribute('href', href));
    const fab = document.getElementById('whatsapp-fab');
    if (fab) { fab.setAttribute('aria-label', content.whatsapp.fabAriaLabel); setTimeout(() => fab.classList.add('is-visible'), 500); }
  }

  /* ===== SCROLL REVEAL ===== */
  function initScrollReveal() {
    const items = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) { items.forEach((el) => el.classList.add('is-visible')); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); io.unobserve(entry.target); } });
    }, { threshold: 0.12 });
    items.forEach((el) => io.observe(el));
  }

  /* ======================================================================
     TOUR DETAIL RENDER
     ====================================================================== */
  const td = content.tourDetail;
  const defaults = content.tourDefaults;

  function priceRows(list) {
    return `<div class="price-grid">${list.map((p) => `
      <div class="price-card">
        <span class="price-card__label">${escapeHtml(p.label)}</span>
        <span><span class="price-card__price">${escapeHtml(String(p.price))} ${escapeHtml(p.unit && p.unit.includes('€') ? '' : (tour.currency || '€'))}</span><span class="price-card__unit">${escapeHtml(p.unit || '')}</span></span>
      </div>`).join('')}</div>`;
  }

  function section(id, eyebrow, heading, inner) {
    // eyebrow arrives as "NN / Heading" — keep only the "NN" so it doesn't duplicate the <h2>.
    const label = eyebrow ? eyebrow.split(' / ')[0] : '';
    return `
      <section id="${id}" class="tour-section reveal">
        ${label ? `<div class="section-eyebrow">${escapeHtml(label)}</div>` : ''}
        <h2 class="font-display font-bold text-2xl sm:text-3xl heading-tight mb-6">${escapeHtml(heading)}</h2>
        ${inner}
      </section>`;
  }

  function renderMainColumn() {
    const parts = [];
    let n = 0;
    const num = () => String(++n).padStart(2, '0');

    // Overview
    const longDesc = tour.longDescription || defaults.longDescription;
    parts.push(section('prehlad', `${num()} / ${td.overviewHeading}`, td.overviewHeading, `
      <div class="tour-prose max-w-2xl">
        <p style="color:var(--ink);font-size:1.05rem;line-height:1.7;">${escapeHtml(tour.description)}</p>
        ${longDesc.map((p) => `<p>${escapeHtml(p)}</p>`).join('')}
      </div>`));

    // Pricing (with optional summer/winter toggle)
    if (Array.isArray(tour.pricingDetail) && tour.pricingDetail.length) {
      const hasWinter = Array.isArray(tour.winterPricingDetail) && tour.winterPricingDetail.length;
      const toggle = hasWinter ? `
        <div class="flex gap-2 mb-5" role="tablist" aria-label="${escapeHtml(td.pricingHeading)}">
          <button type="button" class="season-pill" data-price-season="leto" aria-pressed="true">${escapeHtml(td.pricingSeasonSummer)}</button>
          <button type="button" class="season-pill" data-price-season="zima" aria-pressed="false">${escapeHtml(td.pricingSeasonWinter)}</button>
        </div>` : '';
      const panels = `
        <div class="tour-pricing-panel" data-price-panel="leto">${priceRows(tour.pricingDetail)}</div>
        ${hasWinter ? `<div class="tour-pricing-panel" data-price-panel="zima" hidden>${priceRows(tour.winterPricingDetail)}</div>` : ''}
        ${tour.pricingNote ? `<p class="text-muted text-sm mt-4">${escapeHtml(tour.pricingNote)}</p>` : ''}`;
      parts.push(section('cennik', `${num()} / ${td.pricingHeading}`, td.pricingHeading, `<div class="max-w-2xl">${toggle}${panels}</div>`));
    }

    // Routes
    if (Array.isArray(tour.routes) && tour.routes.length) {
      parts.push(section('trasy', `${num()} / ${td.routesHeading}`, td.routesHeading, `
        <div class="max-w-2xl overflow-x-auto"><table class="routes-table">
          <thead><tr><th>${escapeHtml(td.routeColName)}</th><th>${escapeHtml(td.routeColDuration)}</th><th>${escapeHtml(td.routeColGroup)}</th></tr></thead>
          <tbody>${tour.routes.map((r) => `<tr><td>${escapeHtml(r.name)}</td><td>${r.duration ? escapeHtml(r.duration) : '—'}</td><td>${r.maxGroup != null ? escapeHtml(String(r.maxGroup)) + ' ' + escapeHtml(td.routeGroupUnit) : '—'}</td></tr>`).join('')}</tbody>
        </table></div>`));
    }

    // Included / Excluded
    if ((tour.included && tour.included.length) || (tour.excluded && tour.excluded.length)) {
      const yes = tour.included && tour.included.length ? `
        <div>
          <h3 class="font-display font-semibold text-base mb-4">${escapeHtml(td.includedHeading)}</h3>
          <ul class="checklist checklist--yes">${tour.included.map((i) => `<li><svg class="checklist__icon" viewBox="0 0 24 24" style="fill:currentColor" aria-hidden="true"><use href="#icon-shield"/></svg><span>${escapeHtml(i)}</span></li>`).join('')}</ul>
        </div>` : '';
      const no = tour.excluded && tour.excluded.length ? `
        <div>
          <h3 class="font-display font-semibold text-base mb-4">${escapeHtml(td.excludedHeading)}</h3>
          <ul class="checklist checklist--no">${tour.excluded.map((i) => `<li><svg class="checklist__icon" viewBox="0 0 24 24" style="fill:currentColor" aria-hidden="true"><use href="#icon-close"/></svg><span>${escapeHtml(i)}</span></li>`).join('')}</ul>
        </div>` : '';
      parts.push(section('cena-zahrna', `${num()} / ${td.inclusionHeading}`, td.inclusionHeading, `<div class="grid sm:grid-cols-2 gap-8 max-w-2xl">${yes}${no}</div>`));
    }

    // Requirements
    const reqs = tour.requirements || defaults.requirements;
    if (reqs && reqs.length) {
      parts.push(section('narocnost', `${num()} / ${td.requirementsHeading}`, td.requirementsHeading, `
        <ul class="checklist max-w-2xl">${reqs.map((r) => `<li><svg class="checklist__icon" style="color:var(--royal)" viewBox="0 0 24 24" aria-hidden="true"><use href="#icon-star"/></svg><span>${escapeHtml(r)}</span></li>`).join('')}</ul>`));
    }

    // Logistics / meeting point — always shown, carries the punctuality disclaimer (red alert)
    {
      const hasMeeting = tour.meetingPoint || tour.meetingTime;
      const meetingRows = hasMeeting ? `
        <div class="grid sm:grid-cols-2 gap-6 max-w-2xl">
          ${tour.meetingPoint ? `<div class="spec-row"><span class="spec-row__icon"><svg class="w-5 h-5" style="fill:currentColor" aria-hidden="true"><use href="#icon-pin"/></svg></span><span><span class="spec-row__label">${escapeHtml(td.meetingPointLabel)}</span><br><span class="spec-row__value">${escapeHtml(tour.meetingPoint)}</span></span></div>` : ''}
          ${tour.meetingTime ? `<div class="spec-row"><span class="spec-row__icon"><svg class="w-5 h-5" style="fill:currentColor" aria-hidden="true"><use href="#icon-clock"/></svg></span><span><span class="spec-row__label">${escapeHtml(td.meetingTimeLabel)}</span><br><span class="spec-row__value">${escapeHtml(tour.meetingTime)}</span></span></div>` : ''}
        </div>` : `<p class="text-muted max-w-2xl">${escapeHtml(td.meetingTbd)}</p>`;
      parts.push(section('stretnutie', `${num()} / ${td.logisticsHeading}`, td.logisticsHeading, `
        ${meetingRows}
        <div class="tour-alert" role="note">
          <svg class="tour-alert__icon w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          <p><strong>${escapeHtml(td.meetingDisclaimerTitle)}</strong> ${escapeHtml(td.meetingDisclaimer)}</p>
        </div>`));
    }

    // Policies
    const policies = tour.policies || defaults.policies;
    if (policies && policies.length) {
      parts.push(section('podmienky', `${num()} / ${td.policiesHeading}`, td.policiesHeading, `
        <div class="grid sm:grid-cols-3 gap-4">${policies.map((p) => `
          <div class="policy-card"><h3>${escapeHtml(p.title)}</h3><p>${escapeHtml(p.body)}</p></div>`).join('')}</div>`));
    }

    // FAQ (fallback to global FAQ)
    const faqs = tour.faq || content.faqSection.items;
    if (faqs && faqs.length) {
      parts.push(section('faq', `${num()} / ${td.faqHeading}`, td.faqHeading, `
        <div id="tour-faq-list" class="flex flex-col gap-3 max-w-2xl">${faqs.map((item, i) => `
          <div class="faq-item surface-elevated rounded-card bg-surface px-6" data-index="${i}">
            <h3 class="m-0"><button type="button" class="w-full flex items-center gap-4 py-5 text-left font-display font-semibold" aria-expanded="false" aria-controls="tfaq-${i}" id="tfaq-t-${i}">
              <span class="font-serif italic text-royal/50 text-sm shrink-0 w-7">${String(i + 1).padStart(2, '0')}</span>
              <span class="flex-1">${escapeHtml(item.question)}</span>
              <svg class="faq-chevron w-5 h-5 shrink-0 text-royal" style="fill:currentColor" aria-hidden="true"><use href="#icon-chevron"/></svg>
            </button></h3>
            <div class="faq-panel-wrap" id="tfaq-${i}" role="region" aria-labelledby="tfaq-t-${i}" aria-hidden="true"><div class="faq-panel-inner"><p class="text-muted pb-5 pl-11 pr-8">${escapeHtml(item.answer)}</p></div></div>
          </div>`).join('')}</div>`));
    }

    return parts.join('');
  }

  function priceFromHtml() {
    return tour.priceFrom != null
      ? `<span class="text-muted text-xs uppercase tracking-wide">${escapeHtml(td.priceFromLabel)}</span> <span class="font-display font-bold text-2xl text-royal">${tour.priceFrom} ${escapeHtml(tour.currency)}</span>`
      : `<span class="font-display font-bold text-lg text-royal">${escapeHtml(td.priceOnRequestLabel)}</span>`;
  }

  function renderSidebar() {
    const specs = [
      { icon: 'icon-clock', label: td.durationLabel, value: escapeHtml(tour.duration) },
      { icon: 'icon-star', label: td.difficultyLabel, value: buildStars(tour.difficulty) },
      { icon: 'icon-shield', label: td.guideRatioLabel, value: escapeHtml(guideRatioLabel(tour.guideRatio)) },
    ];
    if (tour.meetingPoint) specs.push({ icon: 'icon-pin', label: td.meetingLabel, value: escapeHtml(tour.meetingPoint) });
    return `
      <div class="tour-booking-card">
        <div class="mb-5">${priceFromHtml()}</div>
        <div class="spec-list mb-6">
          ${specs.map((s) => `
            <div class="spec-row">
              <span class="spec-row__icon"><svg class="w-5 h-5" style="fill:currentColor" aria-hidden="true"><use href="#${s.icon}"/></svg></span>
              <span><span class="spec-row__label">${escapeHtml(s.label)}</span><br><span class="spec-row__value">${s.value}</span></span>
            </div>`).join('')}
        </div>
        <button type="button" class="btn-pill btn-pill--primary btn-pill--glow w-full" data-open-modal data-tour-id="${tour.id}">${escapeHtml(td.bookCtaLabel)}</button>
        <div class="flex flex-col gap-2 mt-3">
          <a href="tel:${escapeHtml(content.nav.phone)}" class="btn-pill btn-pill--outline-ink w-full !py-2.5 text-sm">
            <svg class="w-4 h-4" style="fill:currentColor" aria-hidden="true"><use href="#icon-phone"/></svg>${escapeHtml(content.nav.phoneDisplay)}
          </a>
        </div>
        <p class="text-muted text-xs text-center mt-4">${escapeHtml(td.reassurance)}</p>
      </div>`;
  }

  // Tour photos render at most ~380px wide in the card grid, but the same file
  // doubles as the detail-page hero at 1440w. Offer a 720w variant so phones
  // stop downloading the hero-sized version for a thumbnail.
  // Note: monte-rosa's source is only 800px, so its "1440w" candidate is really
  // 800px — the browser just gets a slightly softer image on very large screens,
  // which is already true today. Flagged to the client as a photo to replace.
  function cardSrcset(src) {
    if (!src || /^https?:/i.test(src) || !/\.webp$/i.test(src)) return '';
    const small = imgUrl(src.replace(/\.webp$/i, '-720.webp'));
    return ` srcset="${small} 720w, ${imgUrl(src)} 1440w"` +
           ` sizes="(min-width:1024px) 380px, (min-width:640px) 45vw, calc(100vw - 3rem)"`;
  }

  function relatedCard(t) {
    const priceHtml = t.priceFrom != null
      ? `<span class="text-muted text-xs uppercase tracking-wide">${escapeHtml(td.priceFromLabel)}</span> <span class="font-display font-bold text-lg text-royal">${t.priceFrom} ${escapeHtml(t.currency)}</span>`
      : `<span class="font-display font-bold text-base text-royal">${escapeHtml(content.toursSection.priceOnRequestLabel)}</span>`;
    const href = t.slug ? `${localePrefix}/tury/${t.slug}.html` : '#';
    return `
      <article class="tour-card surface-elevated flex flex-col">
        <div class="relative">
          <div class="tour-media media"><img src="${imgUrl(t.image)}"${cardSrcset(t.image)} alt="${escapeHtml(t.imageAlt)}" loading="lazy" width="720" height="520" />${t.slug ? `<a href="${href}" class="tour-media-link" tabindex="-1" aria-hidden="true"></a>` : ''}</div>
          <div class="info-strip absolute left-4 right-4 bottom-0 bg-surface rounded-lg px-4 py-2.5 flex items-center justify-between text-sm">
            <span class="flex items-center gap-1.5 font-medium"><svg class="w-4 h-4 text-royal" style="fill:currentColor" aria-hidden="true"><use href="#icon-clock"/></svg>${escapeHtml(t.duration)}</span>
            <span class="flex items-center gap-1.5" role="img" aria-label="${escapeHtml(content.toursSection.difficultyLabel)} ${t.difficulty} z 5"><span class="text-muted text-xs font-medium" aria-hidden="true">${escapeHtml(content.toursSection.difficultyLabel)}</span>${buildStars(t.difficulty)}</span>
          </div>
        </div>
        <div class="pt-9 px-6 pb-6 flex flex-col flex-1">
          <h3 class="font-display font-bold text-lg">${escapeHtml(t.name)}</h3>
          <div class="flex items-center gap-1.5 text-muted text-sm mt-1.5"><svg class="w-3.5 h-3.5" style="fill:currentColor" aria-hidden="true"><use href="#icon-pin"/></svg>${escapeHtml(t.location)}</div>
          <p class="text-muted text-sm mt-3 line-clamp-2">${escapeHtml(t.description)}</p>
          <div class="mt-auto">
            <hr class="hairline my-4" />
            <div class="flex items-baseline justify-end gap-1.5 mb-4">${priceHtml}</div>
            <div class="flex items-center gap-3">
              <a href="${href}" class="btn-pill btn-pill--outline-ink !px-4 !py-2 text-sm flex-1">${escapeHtml(content.toursSection.ctaLabel)}</a>
              <button type="button" class="btn-pill btn-pill--primary !px-4 !py-2 text-sm flex-1" data-open-modal data-tour-id="${t.id}">${escapeHtml(content.toursSection.ctaReserveLabel)}</button>
            </div>
          </div>
        </div>
      </article>`;
  }

  function renderRelated() {
    const related = content.tours
      .filter((t) => t.id !== tour.id && t.showOnLp && t.season === tour.season && t.slug)
      .slice(0, 3);
    const pool = related.length ? related : content.tours.filter((t) => t.id !== tour.id && t.showOnLp && t.slug).slice(0, 3);
    if (!pool.length) return '';
    return `
      <section class="bg-surface" style="padding-block:var(--space-section);">
        <div class="max-w-7xl mx-auto px-6 lg:px-10">
          <h2 class="font-display font-bold text-2xl sm:text-3xl heading-tight text-center max-w-2xl mx-auto mb-12 reveal">${escapeHtml(td.relatedHeading)}</h2>
          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 reveal">${pool.map(relatedCard).join('')}</div>
        </div>
      </section>`;
  }

  function renderHero() {
    return `
      <header class="tour-hero grain">
        <img class="tour-hero__img" src="${imgUrl(tour.image)}" alt="${escapeHtml(tour.imageAlt)}" width="1440" height="960" fetchpriority="high" />
        <div class="tour-hero__scrim"></div>
        <div class="relative max-w-7xl mx-auto px-6 lg:px-10 pb-14 pt-40 w-full">
          <nav class="flex items-center gap-2 text-cream/70 text-sm mb-5 reveal" aria-label="Drobčeková navigácia">
            <a href="${localePrefix}/index.html" class="hover:text-cream transition-colors">${escapeHtml(td.breadcrumbHome)}</a>
            <span aria-hidden="true">/</span>
            <a href="${localePrefix}/index.html#tours" class="hover:text-cream transition-colors">${escapeHtml(td.breadcrumbTours)}</a>
            <span aria-hidden="true">/</span>
            <span class="text-cream">${escapeHtml(tour.name)}</span>
          </nav>
          <h1 class="hero-copy-shadow font-display font-extrabold text-cream text-4xl sm:text-5xl lg:text-6xl leading-[0.98] heading-tight max-w-3xl reveal">${escapeHtml(tour.name)}</h1>
          <div class="flex flex-wrap items-center gap-3 mt-6 text-cream reveal">
            <span class="tour-hero__meta-pill"><svg class="w-4 h-4" style="fill:currentColor" aria-hidden="true"><use href="#icon-pin"/></svg>${escapeHtml(tour.location)}</span>
            <span class="tour-hero__meta-pill"><svg class="w-4 h-4" style="fill:currentColor" aria-hidden="true"><use href="#icon-clock"/></svg>${escapeHtml(tour.duration)}</span>
            <span class="tour-hero__meta-pill">${escapeHtml(content.toursSection.difficultyLabel)} ${buildStars(tour.difficulty)}</span>
            <span class="tour-hero__meta-pill"><svg class="w-4 h-4" style="fill:currentColor" aria-hidden="true"><use href="#icon-shield"/></svg>${escapeHtml(guideRatioLabel(tour.guideRatio))}</span>
          </div>
        </div>
      </header>`;
  }

  function renderMobileCta() {
    return `
      <div class="tour-mobile-cta" id="tour-mobile-cta">
        <div class="flex-1 min-w-0"><div class="leading-tight">${priceFromHtml()}</div></div>
        <button type="button" class="btn-pill btn-pill--primary shrink-0" data-open-modal data-tour-id="${tour.id}">${escapeHtml(td.bookCtaLabel)}</button>
      </div>`;
  }

  function renderTourDetail() {
    const root = document.getElementById('tour-detail-root');
    root.innerHTML = `
      ${renderHero()}
      <div class="bg-surface" style="padding-block:clamp(3rem,6vw,5rem);">
        <div class="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-[1fr_360px] gap-10 lg:gap-16 items-start">
          <main>${renderMainColumn()}</main>
          <aside class="hidden lg:block"><div class="tour-sidebar">${renderSidebar()}</div></aside>
        </div>
      </div>
      ${renderRelated()}`;
    document.getElementById('tour-mobile-cta-slot').innerHTML = renderMobileCta();

    // Pricing season toggle
    root.querySelectorAll('[data-price-season]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const season = btn.getAttribute('data-price-season');
        root.querySelectorAll('[data-price-season]').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
        root.querySelectorAll('[data-price-panel]').forEach((p) => { p.hidden = p.getAttribute('data-price-panel') !== season; });
      });
    });

    // FAQ accordion
    const faqList = document.getElementById('tour-faq-list');
    if (faqList) faqList.addEventListener('click', (e) => {
      const btn = e.target.closest('button[aria-expanded]');
      if (!btn) return;
      const item = btn.closest('.faq-item');
      const wasOpen = item.classList.contains('is-open');
      faqList.querySelectorAll('.faq-item').forEach((i) => {
        i.classList.remove('is-open');
        i.querySelector('button[aria-expanded]').setAttribute('aria-expanded', 'false');
        i.querySelector('.faq-panel-wrap').setAttribute('aria-hidden', 'true');
      });
      if (!wasOpen) { item.classList.add('is-open'); btn.setAttribute('aria-expanded', 'true'); item.querySelector('.faq-panel-wrap').setAttribute('aria-hidden', 'false'); }
    });

    // Gallery lightbox
    root.querySelectorAll('[data-gallery-index]').forEach((btn) => {
      btn.addEventListener('click', () => openLightbox(Number(btn.getAttribute('data-gallery-index'))));
    });

    // Reveal mobile CTA after scrolling past the hero
    const mobileCta = document.getElementById('tour-mobile-cta');
    if (mobileCta) {
      const onScroll = () => mobileCta.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.6);
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }
  }

  /* ===== INIT ===== */
  function init() {
    if (!tour) { console.error('[MS] Unknown tour id:', window.MS_TOUR_ID); return; }
    hydrateContent();
    renderNavLinks();
    renderLangSwitcher();
    renderFooter();
    populateTourSelect();
    renderTourDetail();
    initWhatsapp();
    updateHeaderScrollState();
    initScrollReveal();
    window.addEventListener('scroll', updateHeaderScrollState, { passive: true });
  }
  document.addEventListener('DOMContentLoaded', init);
})();
