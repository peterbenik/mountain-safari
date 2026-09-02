/* ==========================================================================
   build-legal-pages.mjs — renders the privacy notice and imprint for both
   locales from the `legal` block in content.js / content.pl.js.

   Output: ochrana-osobnych-udajov.html, impressum.html (SK, repo root)
           pl/ochrana-osobnych-udajov.html, pl/impressum.html

   These pages deliberately do NOT load the Tailwind play CDN — they are prose,
   and the CDN compiles styles in the browser on every view. Self-contained CSS
   keeps them fast, which matters because Google Ads reviewers open them.

   Usage:  node scripts/build-legal-pages.mjs
   ========================================================================== */
import { createRequire } from 'module';
import { writeFileSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { PL_INDEXABLE, PREVIEW } from './site-flags.mjs';

const require = createRequire(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const locales = [
  { code: 'sk', contentFile: 'content.js', prefix: '' },
  { code: 'pl', contentFile: 'content.pl.js', prefix: 'pl/' },
];

function loadContent(file) {
  global.window = {};
  const abs = join(root, file);
  delete require.cache[require.resolve(abs)];
  require(abs);
  return global.window.MS_CONTENT;
}

const esc = (s) => String(s ?? '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// {company} / {email} / {ico} … resolve against legal.company. Returns null when
// any referenced field is empty, so the caller can drop the whole line instead of
// rendering a dangling label like "Sídlo:" with nothing after it.
function fill(str, company) {
  let missing = false;
  const out = String(str).replace(/\{(\w+)\}/g, (m, key) => {
    const v = key === 'company' ? company.name : company[key];
    if (v == null || String(v).trim() === '') { missing = true; return ''; }
    return v;
  });
  return missing ? null : out;
}

// Turn bare emails and domains into real links after escaping.
function linkify(html) {
  return html
    // Each dot must be followed by word chars, so a sentence-ending period is
    // left outside the link rather than becoming part of the mailto: address.
    .replace(/([\w.+-]+@[\w-]+(?:\.[\w-]+)+)/g, '<a href="mailto:$1">$1</a>')
    .replace(/(^|[\s(])((?:dataprotection\.gov\.sk|ec\.europa\.eu\/consumers\/odr|orsr\.sk))/g,
      '$1<a href="https://$2" target="_blank" rel="noopener noreferrer">$2</a>');
}

const CSS = `
:root{--navy-900:#141B2E;--navy-800:#1A2234;--royal:#1E40C4;--royal-dark:#16309A;
--cream:#F5F0E6;--ink:#1A1A1A;--muted:#6B7280;--surface:#FFFFFF;--hairline:#E5E1D8;}
*{box-sizing:border-box}
body{margin:0;background:var(--cream);color:var(--ink);
font-family:'Inter',ui-sans-serif,system-ui,-apple-system,'Segoe UI',sans-serif;
font-size:16px;line-height:1.7;-webkit-font-smoothing:antialiased;}
.wrap{max-width:44rem;margin:0 auto;padding:0 1.25rem 5rem;}
header.top{background:var(--navy-900);color:var(--cream);padding:1.05rem 0;margin-bottom:3rem;
background-image:radial-gradient(ellipse 60% 120% at 20% 0%,rgba(30,64,196,.30),transparent 70%);}
header.top .wrap{padding-bottom:0;display:flex;align-items:center;gap:.65rem;}
header.top a{display:inline-flex;align-items:center;gap:.65rem;color:var(--cream);
text-decoration:none;font-weight:800;letter-spacing:-.02em;font-size:1.05rem;
font-family:'Sora',ui-sans-serif,system-ui,sans-serif;border-radius:8px;}
header.top img{width:34px;height:34px;border-radius:8px;display:block;}
h1{font-family:'Sora',ui-sans-serif,system-ui,sans-serif;font-weight:800;letter-spacing:-.03em;
font-size:clamp(1.9rem,5vw,2.6rem);line-height:1.12;margin:0 0 .6rem;}
h2{font-family:'Sora',ui-sans-serif,system-ui,sans-serif;font-weight:700;letter-spacing:-.02em;
font-size:1.12rem;margin:2.6rem 0 .7rem;color:var(--navy-900);}
p{margin:0 0 1rem;}
.intro{font-size:1.06rem;color:#3A3A3A;margin-bottom:.4rem;}
.updated{color:var(--muted);font-size:.82rem;margin:0 0 2.2rem;
text-transform:uppercase;letter-spacing:.08em;}
ul{margin:0 0 1rem;padding-left:1.1rem;}
li{margin-bottom:.45rem;}
a{color:var(--royal);text-decoration:underline;text-underline-offset:2px;
transition:color 160ms cubic-bezier(.2,.7,.3,1);}
a:hover{color:var(--royal-dark);}
a:focus-visible{outline:2px solid var(--royal);outline-offset:3px;border-radius:3px;}
.gap{background:#FFF6E5;border:1px solid #E8D5A8;border-radius:6px;
padding:.08rem .4rem;font-size:.93em;color:#7A5A12;font-weight:600;white-space:nowrap;}
hr{border:0;border-top:1px solid var(--hairline);margin:3rem 0 1.6rem;}
.back{display:inline-flex;align-items:center;gap:.45rem;font-weight:600;text-decoration:none;}
.back:hover{text-decoration:underline;}
@media (prefers-reduced-motion:reduce){a{transition:none}}
`.trim();

// Highlight unfilled client details so they can't slip past review.
const markGaps = (html) => html.replace(/\[DOPLNIŤ[^\]]*\]/g, (m) => `<span class="gap">${m}</span>`);

function renderSections(sections, company) {
  return sections.map((s) => {
    const body = (s.body || []).map((p) => fill(p, company)).filter(Boolean);
    const list = (s.list || []).map((li) => fill(li, company)).filter(Boolean);
    // A section left with nothing to say is dropped rather than shown empty.
    if (!body.length && !list.length) return '';
    const parts = [`<h2>${esc(s.heading)}</h2>`];
    for (const p of body) parts.push(`<p>${linkify(esc(p))}</p>`);
    if (list.length) parts.push('<ul>' + list.map((li) => `<li>${linkify(esc(li))}</li>`).join('') + '</ul>');
    return parts.join('\n');
  }).filter(Boolean).join('\n\n');
}

function renderPage(doc, C, locale) {
  const L = C.legal;
  const up = locale.prefix ? '../' : '';
  const noindex = (PREVIEW || (locale.code === 'pl' && !PL_INDEXABLE))
    ? '\n<meta name="robots" content="noindex, nofollow" />' : '';
  const canonical = `${C.site.baseUrl}/${locale.prefix}${doc.slug}`;

  return `<!DOCTYPE html>
<html lang="${esc(C.meta.lang)}">
<head>
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-2L4FCK798G"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-2L4FCK798G');
</script>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${esc(doc.title)} — ${esc(C.site.name)}</title>
<meta name="description" content="${esc(doc.intro).slice(0, 155)}" />${noindex}
<link rel="canonical" href="${canonical}" />
<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
<link rel="icon" href="/favicon.ico" sizes="any" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
<meta name="theme-color" content="#141B2E" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@700;800&family=Inter:wght@400;600&display=swap" rel="stylesheet" />
<style>
${CSS}
</style>
</head>
<body>
<header class="top">
  <div class="wrap">
    <a href="${up === '' ? 'index.html' : '../pl/index.html'}">
      <img src="${up}brand_assets/logo.webp" alt="" width="34" height="34" />
      <span>${esc(C.nav.logoText)}</span>
    </a>
  </div>
</header>
<main class="wrap">
  <h1>${esc(doc.title)}</h1>
  <p class="intro">${linkify(esc(fill(doc.intro, L.company) || doc.intro))}</p>
  <p class="updated">${esc(L.updatedLabel)}: ${esc(L.updated)}</p>

${markGaps(renderSections(doc.sections, L.company))}

  <hr />
  <a class="back" href="index.html">← ${esc(L.backLabel)}</a>
</main>
</body>
</html>
`;
}

for (const locale of locales) {
  const C = loadContent(locale.contentFile);
  if (!C.legal) { console.warn(`skip ${locale.code}: no legal block`); continue; }
  mkdirSync(join(root, locale.prefix), { recursive: true });
  for (const doc of [C.legal.privacy, C.legal.imprint]) {
    const out = join(root, locale.prefix, doc.slug);
    writeFileSync(out, renderPage(doc, C, locale));
    console.log(`✓ ${locale.prefix}${doc.slug}  (${doc.title})`);
  }
}
console.log(`\nDone. PREVIEW=${PREVIEW}, PL_INDEXABLE=${PL_INDEXABLE}`);
