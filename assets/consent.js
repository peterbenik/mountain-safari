/* ==========================================================================
   consent.js — cookie consent banner + Google Consent Mode v2 update.

   Self-contained on purpose: the legal pages load no other site JS (no
   content.js, no main.js), so copy, styles and behaviour all live here and
   the file is included root-absolute (/assets/consent.js) from every page.

   The DEFAULTS are NOT set here — they must run before GTM and gtag, so they
   sit inline at the top of every <head>. This file only handles the UI and the
   'consent' → 'update' call once the visitor chooses.

   Storage: localStorage key ms_consent_v1, shape { analytics, marketing, ts }.
   Absent or unreadable = no choice made yet = banner shows, everything denied.

   Re-opening: window.MSConsent.open() — wired to any [data-consent-open]
   element, so a footer or privacy-page link can let visitors change their mind.
   ========================================================================== */
(function () {
  'use strict';

  var KEY = 'ms_consent_v1';

  /* ---- copy ---- */
  var COPY = {
    sk: {
      title: 'Súkromie a cookies',
      body: 'Nevyhnutné cookies zabezpečujú fungovanie stránky. S vaším súhlasom k nim pridáme analytické a marketingové, aby sme vedeli, ktoré výstupy vás zaujímajú.',
      accept: 'Prijať všetko',
      reject: 'Odmietnuť',
      settings: 'Nastavenia',
      save: 'Uložiť voľbu',
      close: 'Zavrieť',
      privacy: 'Ochrana osobných údajov',
      privacyHref: '/ochrana-osobnych-udajov.html',
      cats: {
        necessary: { name: 'Nevyhnutné', desc: 'Potrebné na fungovanie stránky a odoslanie rezervácie.', always: 'Vždy aktívne' },
        analytics: { name: 'Analytické', desc: 'Anonymné meranie návštevnosti — ktoré stránky si ľudia prezerajú a odkiaľ prichádzajú.' },
        marketing: { name: 'Marketingové', desc: 'Meranie účinnosti reklamy v Google Ads, aby sme neplatili za reklamu, ktorá nefunguje.' }
      }
    },
    pl: {
      title: 'Prywatność i pliki cookie',
      body: 'Niezbędne pliki cookie zapewniają działanie strony. Za Twoją zgodą dodamy do nich analityczne i marketingowe, aby wiedzieć, które wejścia Cię interesują.',
      accept: 'Akceptuj wszystko',
      reject: 'Odrzuć',
      settings: 'Ustawienia',
      save: 'Zapisz wybór',
      close: 'Zamknij',
      privacy: 'Ochrona danych osobowych',
      privacyHref: '/pl/ochrana-osobnych-udajov.html',
      cats: {
        necessary: { name: 'Niezbędne', desc: 'Potrzebne do działania strony i wysłania rezerwacji.', always: 'Zawsze aktywne' },
        analytics: { name: 'Analityczne', desc: 'Anonimowy pomiar ruchu — które strony są oglądane i skąd przychodzą odwiedzający.' },
        marketing: { name: 'Marketingowe', desc: 'Pomiar skuteczności reklam Google Ads, żebyśmy nie płacili za reklamę, która nie działa.' }
      }
    }
  };

  var lang = (document.documentElement.lang || 'sk').toLowerCase().slice(0, 2);
  var t = COPY[lang] || COPY.sk;

  /* ---- storage ---- */
  function read() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return null;
      var v = JSON.parse(raw);
      return (v && typeof v === 'object') ? v : null;
    } catch (e) { return null; }
  }
  function write(choice) {
    try { localStorage.setItem(KEY, JSON.stringify(choice)); } catch (e) {}
  }

  /* ---- consent mode ---- */
  function apply(choice) {
    var m = choice.marketing ? 'granted' : 'denied';
    var a = choice.analytics ? 'granted' : 'denied';
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        ad_storage: m,
        ad_user_data: m,
        ad_personalization: m,
        analytics_storage: a
      });
    }
    // Lets GTM triggers react to the choice without reading storage themselves.
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'consent_choice',
      consent_analytics: choice.analytics ? 'granted' : 'denied',
      consent_marketing: choice.marketing ? 'granted' : 'denied'
    });
  }

  /* ---- styles ---- */
  var CSS = [
    '.ms-consent{position:fixed;left:0;right:0;bottom:0;z-index:70;display:flex;justify-content:center;',
    'padding:1rem;pointer-events:none;font-family:Inter,ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif;}',
    '.ms-consent[hidden]{display:none!important;}',
    '.ms-consent__panel{pointer-events:auto;width:100%;max-width:44rem;background:#FFFFFF;color:#1A1A1A;',
    'border:1px solid #E5E1D8;border-radius:14px;padding:1.35rem 1.5rem;line-height:1.6;',
    'box-shadow:0 1px 2px rgba(20,27,46,.06),0 18px 44px -20px rgba(20,27,46,.45);',
    'transform:translateY(12px);opacity:0;transition:transform 320ms cubic-bezier(.2,.7,.3,1),opacity 320ms cubic-bezier(.2,.7,.3,1);}',
    '.ms-consent.is-in .ms-consent__panel{transform:translateY(0);opacity:1;}',
    '.ms-consent__title{font-family:Sora,ui-sans-serif,system-ui,sans-serif;font-weight:700;letter-spacing:-.02em;',
    'font-size:1.02rem;margin:0 0 .35rem;color:#141B2E;}',
    '.ms-consent__body{margin:0 0 1.05rem;font-size:.92rem;color:#4A4F5C;max-width:60ch;}',
    '.ms-consent__actions{display:flex;flex-wrap:wrap;gap:.55rem;align-items:center;}',
    '.ms-consent__btn{font:inherit;font-size:.9rem;font-weight:600;border-radius:9px;padding:.62rem 1.15rem;',
    'cursor:pointer;border:1px solid transparent;transition:transform 160ms cubic-bezier(.2,.7,.3,1),background-color 160ms ease,color 160ms ease;}',
    '.ms-consent__btn:active{transform:translateY(1px);}',
    '.ms-consent__btn:focus-visible{outline:2px solid #1E40C4;outline-offset:3px;}',
    '.ms-consent__btn--accept{background:#1E40C4;color:#FFFFFF;}',
    '.ms-consent__btn--accept:hover{background:#16309A;}',
    '.ms-consent__btn--reject{background:#FFFFFF;color:#141B2E;border-color:#C9C2B4;}',
    '.ms-consent__btn--reject:hover{background:#F5F0E6;}',
    '.ms-consent__btn--save{background:#FFFFFF;color:#1E40C4;border-color:#B4C0E9;}',
    '.ms-consent__btn--save:hover{background:#EEF1FC;}',
    '.ms-consent__link{font:inherit;font-size:.87rem;font-weight:500;background:none;border:0;padding:.4rem .3rem;',
    'color:#4A4F5C;text-decoration:underline;text-underline-offset:2px;cursor:pointer;border-radius:5px;',
    'transition:color 160ms ease;}',
    '.ms-consent__link:hover{color:#1E40C4;}',
    '.ms-consent__link:focus-visible{outline:2px solid #1E40C4;outline-offset:2px;}',
    '.ms-consent__spacer{flex:1 1 auto;}',
    '.ms-consent__cats{display:none;flex-direction:column;gap:.1rem;margin:0 0 1.05rem;',
    'border-top:1px solid #E5E1D8;padding-top:.35rem;}',
    '.ms-consent.is-open .ms-consent__cats{display:flex;}',
    '.ms-consent__cat{display:flex;gap:.85rem;align-items:flex-start;padding:.7rem 0;border-bottom:1px solid #F0ECE2;}',
    '.ms-consent__cat:last-child{border-bottom:0;}',
    '.ms-consent__cat-text{flex:1;}',
    '.ms-consent__cat-name{font-weight:600;font-size:.88rem;color:#141B2E;display:block;}',
    '.ms-consent__cat-desc{font-size:.83rem;color:#6B7280;display:block;margin-top:.1rem;}',
    '.ms-consent__always{font-size:.76rem;color:#6B7280;white-space:nowrap;margin-left:auto;align-self:center;',
    'background:#F5F0E6;border-radius:999px;padding:.18rem .55rem;}',
    '.ms-consent__toggle--locked input{cursor:not-allowed;}',
    // :disabled keeps this above the generic checked rule regardless of source order.
    '.ms-consent__toggle--locked input:checked:disabled + .ms-consent__track{background:#A7B0C6;}',
    '.ms-consent__toggle{position:relative;flex:none;width:2.6rem;height:1.5rem;margin-top:.1rem;}',
    '.ms-consent__toggle input{position:absolute;inset:0;opacity:0;width:100%;height:100%;margin:0;cursor:pointer;}',
    '.ms-consent__track{display:block;width:2.6rem;height:1.5rem;border-radius:999px;background:#D6D0C4;',
    'transition:background-color 180ms ease;pointer-events:none;}',
    '.ms-consent__track::after{content:"";position:absolute;top:3px;left:3px;width:1.1rem;height:1.1rem;border-radius:50%;',
    'background:#FFFFFF;box-shadow:0 1px 2px rgba(20,27,46,.3);transition:transform 200ms cubic-bezier(.2,.7,.3,1);}',
    '.ms-consent__toggle input:checked + .ms-consent__track{background:#1E40C4;}',
    '.ms-consent__toggle input:checked + .ms-consent__track::after{transform:translateX(1.1rem);}',
    '.ms-consent__toggle input:focus-visible + .ms-consent__track{outline:2px solid #1E40C4;outline-offset:3px;}',
    '@media (max-width:32rem){',
    '.ms-consent{padding:.7rem;}',
    '.ms-consent__panel{padding:1.15rem 1.15rem 1.25rem;}',
    '.ms-consent__actions{gap:.5rem;}',
    '.ms-consent__btn{flex:1 1 auto;text-align:center;}',
    '.ms-consent__spacer{display:none;}',
    '}',
    '@media (prefers-reduced-motion:reduce){',
    '.ms-consent__panel,.ms-consent__btn,.ms-consent__track,.ms-consent__track::after{transition:none;}',
    '.ms-consent__panel{transform:none;}',
    '}'
  ].join('');

  /* ---- markup ---- */
  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function toggleRow(id, cat, checked) {
    return '<div class="ms-consent__cat">' +
      '<label class="ms-consent__toggle">' +
        '<input type="checkbox" id="' + id + '"' + (checked ? ' checked' : '') + ' aria-describedby="' + id + '-d" />' +
        '<span class="ms-consent__track"></span>' +
      '</label>' +
      '<span class="ms-consent__cat-text">' +
        '<span class="ms-consent__cat-name">' + esc(cat.name) + '</span>' +
        '<span class="ms-consent__cat-desc" id="' + id + '-d">' + esc(cat.desc) + '</span>' +
      '</span>' +
    '</div>';
  }

  var root, analyticsBox, marketingBox;

  function build(current) {
    var style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);

    root = document.createElement('div');
    root.className = 'ms-consent';
    root.setAttribute('role', 'dialog');
    root.setAttribute('aria-modal', 'false');
    root.setAttribute('aria-label', t.title);

    var pre = current || { analytics: false, marketing: false };

    root.innerHTML =
      '<div class="ms-consent__panel">' +
        '<p class="ms-consent__title">' + esc(t.title) + '</p>' +
        '<p class="ms-consent__body">' + esc(t.body) + '</p>' +
        '<div class="ms-consent__cats">' +
          '<div class="ms-consent__cat">' +
            '<label class="ms-consent__toggle ms-consent__toggle--locked">' +
              '<input type="checkbox" checked disabled aria-label="' + esc(t.cats.necessary.name) + ' — ' + esc(t.cats.necessary.always) + '" />' +
              '<span class="ms-consent__track"></span>' +
            '</label>' +
            '<span class="ms-consent__cat-text">' +
              '<span class="ms-consent__cat-name">' + esc(t.cats.necessary.name) + '</span>' +
              '<span class="ms-consent__cat-desc">' + esc(t.cats.necessary.desc) + '</span>' +
            '</span>' +
            '<span class="ms-consent__always">' + esc(t.cats.necessary.always) + '</span>' +
          '</div>' +
          toggleRow('ms-consent-analytics', t.cats.analytics, !!pre.analytics) +
          toggleRow('ms-consent-marketing', t.cats.marketing, !!pre.marketing) +
        '</div>' +
        '<div class="ms-consent__actions">' +
          '<button type="button" class="ms-consent__btn ms-consent__btn--accept" data-act="accept">' + esc(t.accept) + '</button>' +
          '<button type="button" class="ms-consent__btn ms-consent__btn--reject" data-act="reject">' + esc(t.reject) + '</button>' +
          '<button type="button" class="ms-consent__link" data-act="settings">' + esc(t.settings) + '</button>' +
          '<button type="button" class="ms-consent__btn ms-consent__btn--save" data-act="save" hidden>' + esc(t.save) + '</button>' +
          '<span class="ms-consent__spacer"></span>' +
          '<a class="ms-consent__link" href="' + esc(t.privacyHref) + '">' + esc(t.privacy) + '</a>' +
        '</div>' +
      '</div>';

    document.body.appendChild(root);
    analyticsBox = root.querySelector('#ms-consent-analytics');
    marketingBox = root.querySelector('#ms-consent-marketing');

    root.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-act]');
      if (!btn) return;
      var act = btn.getAttribute('data-act');
      if (act === 'accept') return decide({ analytics: true, marketing: true });
      if (act === 'reject') return decide({ analytics: false, marketing: false });
      if (act === 'save') return decide({ analytics: analyticsBox.checked, marketing: marketingBox.checked });
      if (act === 'settings') {
        root.classList.add('is-open');
        root.querySelector('[data-act="settings"]').hidden = true;
        root.querySelector('[data-act="save"]').hidden = false;
        analyticsBox.focus();
      }
    });
  }

  function show() {
    root.hidden = false;
    // Next frame, so the entrance transition has a start state to animate from.
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { root.classList.add('is-in'); });
    });
  }

  function hide() {
    root.classList.remove('is-in');
    root.classList.remove('is-open');
    var el = root;
    setTimeout(function () { el.hidden = true; }, 320);
  }

  function decide(choice) {
    choice.ts = Date.now();
    write(choice);
    apply(choice);
    hide();
  }

  /* ---- init ---- */
  function init() {
    var current = read();
    build(current);

    if (current) {
      // Returning visitor: the head defaults already matched this choice, but
      // push an explicit update so tags loading later see a settled state.
      apply(current);
      root.hidden = true;
    } else {
      show();
    }

    // Any "cookie settings" link anywhere on the page re-opens the banner.
    document.addEventListener('click', function (e) {
      var opener = e.target.closest('[data-consent-open]');
      if (!opener) return;
      e.preventDefault();
      window.MSConsent.open();
    });
  }

  window.MSConsent = {
    open: function () {
      var current = read() || { analytics: false, marketing: false };
      if (analyticsBox) analyticsBox.checked = !!current.analytics;
      if (marketingBox) marketingBox.checked = !!current.marketing;
      root.classList.add('is-open');
      root.querySelector('[data-act="settings"]').hidden = true;
      root.querySelector('[data-act="save"]').hidden = false;
      show();
    },
    get: read
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
