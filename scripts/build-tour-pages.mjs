/* ==========================================================================
   build-tour-pages.mjs — locale-aware static page generator.

   SK (source of truth, lives at the repo root):
     index.html, thank-you.html, content.js  — hand-edited, never overwritten
     tury/<slug>.html                        — stamped from the Gerlach shell
   PL (generated, lives under /pl/):
     pl/index.html, pl/thank-you.html        — stamped from the SK sources
     pl/content.js                           — copy of content.pl.js
     pl/tury/<slug>.html                     — stamped from the Gerlach shell

   Shared code/assets (main.js, assets/*, brand_assets/*) stay at the root and
   are referenced root-absolute from every generated page. Also emits
   sitemap.xml + robots.txt. DEV-ONLY: output is committed static HTML, so
   deployment stays build-free. Re-run after editing content.js/content.pl.js.

   PL_INDEXABLE: keep false until the client approves the Polish copy. While
   false, every /pl/ page gets <meta name="robots" content="noindex"> and PL
   URLs stay out of the sitemap. At Polish launch: set it to true, re-run, and
   uncomment the hreflang block in the SK index.html <head>.

   PREVIEW: set to true while the build is deployed to the GitHub Pages preview
   (peterbenik.github.io/mountain-safari). It noindexes EVERY page, SK included,
   so the preview can't compete with www.mountainsafari.sk in search. Set to
   false and re-run when deploying to the real domain.

   Usage:  node scripts/build-tour-pages.mjs
   ========================================================================== */
import { createRequire } from 'module';
import { readFileSync, writeFileSync, copyFileSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const require = createRequire(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const PL_INDEXABLE = false;
const PREVIEW = true;

const locales = [
  { code: 'sk', contentFile: 'content.js', prefix: '', generateLp: false },
  { code: 'pl', contentFile: 'content.pl.js', prefix: 'pl/', generateLp: true },
];

function loadContent(file) {
  global.window = {};
  const abs = join(root, file);
  delete require.cache[require.resolve(abs)];
  require(abs);
  return global.window.MS_CONTENT;
}

/* ---- helpers ---- */
const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
function altitude(loc) {
  const m = String(loc || '').match(/(\d[\d\s]*)\s*m(\s*n\.p\.m|\.?\s*n\.?\s*m)/i);
  return m ? m[1].replace(/\s+/g, ' ').trim() : null;
}
function trimDesc(s, n = 155) {
  s = String(s || '').replace(/\s+/g, ' ').trim();
  if (s.length <= n) return s;
  const cut = s.slice(0, n);
  return cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:\s]+$/, '') + '…';
}

// hreflang trio for a path shared by both locales (e.g. "tury/<slug>.html" or
// "index.html"). Only emitted once PL is indexable — hreflang must not point
// at noindexed pages.
function hreflangBlock(baseUrl, path) {
  if (!PL_INDEXABLE) return '';
  return `
<link rel="alternate" hreflang="sk" href="${baseUrl}/${path}" />
<link rel="alternate" hreflang="pl" href="${baseUrl}/pl/${path}" />
<link rel="alternate" hreflang="x-default" href="${baseUrl}/${path}" />`;
}

const noindexTag = (locale) => (PREVIEW || (locale.code === 'pl' && !PL_INDEXABLE))
  ? '\n<meta name="robots" content="noindex, nofollow" />' : '';

function seoBlock(t, C, locale) {
  const site = C.site;
  const sharedPath = `tury/${t.slug}.html`;
  const url = `${site.baseUrl}/${locale.prefix}${sharedPath}`;
  const absUrl = (p) => site.baseUrl + '/' + String(p).replace(/^\//, '');
  const ogImage = (t.image && /^https?:/i.test(t.image))
    ? encodeURI(absUrl(site.defaultOgImage))
    : encodeURI(absUrl(t.image || site.defaultOgImage));
  const alt = altitude(t.location);
  const guideSuffix = locale.code === 'pl' ? 'wejście z przewodnikiem wysokogórskim' : 'výstup s horským vodcom';
  const title = `${t.name}${alt ? ` (${alt} m)` : ''} — ${guideSuffix} | ${site.name}`;
  const desc = trimDesc(t.description);
  const ogTitle = `${t.name}${alt ? ` (${alt} m)` : ''} — ${guideSuffix}`;

  const touristTrip = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: `${t.name} — ${guideSuffix}`,
    description: desc,
    image: ogImage,
    touristType: locale.code === 'pl' ? 'Wejście wysokogórskie z przewodnikiem' : 'Sprievodcovaný vysokohorský výstup',
    offers: {
      '@type': 'Offer',
      price: String(t.priceFrom),
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url,
    },
    provider: { '@type': 'Organization', name: site.name, url: site.baseUrl },
  };
  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: C.tourDetail.breadcrumbHome, item: `${site.baseUrl}/${locale.prefix}index.html` },
      { '@type': 'ListItem', position: 2, name: C.tourDetail.breadcrumbTours, item: `${site.baseUrl}/${locale.prefix}index.html#tours` },
      { '@type': 'ListItem', position: 3, name: t.name, item: url },
    ],
  };

  return `<!-- ===== SEO (generated by scripts/build-tour-pages.mjs from ${locale.contentFile}). PLACEHOLDER domain until site.baseUrl is set. ===== -->
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}" />${noindexTag(locale)}
<link rel="canonical" href="${url}" />${hreflangBlock(site.baseUrl, sharedPath)}

<meta property="og:type" content="article" />
<meta property="og:locale" content="${esc(site.ogLocale || 'sk_SK')}" />
<meta property="og:site_name" content="${esc(site.name)}" />
<meta property="og:title" content="${esc(ogTitle)}" />
<meta property="og:description" content="${esc(desc)}" />
<meta property="og:url" content="${url}" />
<meta property="og:image" content="${ogImage}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${esc(ogTitle)}" />
<meta name="twitter:description" content="${esc(desc)}" />
<meta name="twitter:image" content="${ogImage}" />

<script type="application/ld+json">
${JSON.stringify(touristTrip, null, 2)}
</script>
<script type="application/ld+json">
${JSON.stringify(breadcrumbs, null, 2)}
</script>
`;
}

/* ---- tour-page template: reuse the verified SK Gerlach page as the shell.
   Read ONCE before any locale pass rewrites it. ---- */
const tpl = readFileSync(join(root, 'tury', 'gerlachovsky-stit.html'), 'utf8');
const seoStart = tpl.indexOf('<!-- ===== SEO');
const fontsIdx = tpl.indexOf('<link rel="preconnect" href="https://fonts.googleapis.com"');
if (seoStart === -1 || fontsIdx === -1) throw new Error('Template markers not found in gerlachovsky-stit.html');
const headTop = tpl.slice(0, seoStart);
const tail = tpl.slice(fontsIdx); // fonts + tailwind + body + MS_TOUR_ID script

function buildTourPage(t, C, locale) {
  let top = headTop;
  let body = tail.replace(/window\.MS_TOUR_ID = '[^']*';/, `window.MS_TOUR_ID = '${t.id}';`);
  if (locale.code !== 'sk') {
    top = top.replace('<html lang="sk">', `<html lang="${C.meta.lang}">`);
    // PL tour pages sit one level deeper (/pl/tury/ vs /tury/), so the shared
    // root assets need an extra hop. `../content.js` and `../index.html` are
    // already correct at this depth — they resolve to the PL copies.
    const deepen = (s) => s.replace(/(src|href)="\.\.\/(assets|brand_assets)\//g, '$1="../../$2/');
    top = deepen(top);
    body = deepen(body);
  }
  return top + seoBlock(t, C, locale) + '\n' + body;
}

/* ---- LP pages (index.html / thank-you.html): SK root files are the single
   source; the PL copies are stamped from them with locale rewrites. ---- */
function buildLpPage(srcName, C, locale) {
  let html = readFileSync(join(root, srcName), 'utf8');
  html = html.replace('<html lang="sk">', `<html lang="${C.meta.lang}">`);
  // Drop the SK source's hand-written preview meta — noindexTag re-injects the
  // right one below, so keeping this would emit the directive twice.
  html = html.replace(/<!-- PREVIEW ONLY[\s\S]*?-->\s*<meta name="robots"[^>]*>\s*/, '');
  // Shared root assets: the PL copy lives in /pl/, so it reaches them with one
  // hop up. `content.js` stays relative — under /pl/ it already resolves to the
  // locale's own copy, which is what we want.
  html = html.replace('<script src="main.js"></script>', '<script src="../main.js"></script>');
  html = html.replace(/(src|href)="brand_assets\//g, '$1="../brand_assets/');

  if (srcName === 'index.html') {
    html = html.replace(/<title>[^<]*<\/title>/, `<title>${esc(C.meta.siteTitle)}</title>`);
    html = html.replace(/(<meta name="description" content=")[^"]*(" \/>)/, `$1${esc(C.meta.metaDescription)}$2`);
    html = html.replace(/(<link rel="canonical" href=")[^"]*(" \/>)/, `$1${C.site.baseUrl}/${locale.prefix}index.html$2`);
    // Strip the SK-only commented hreflang instructions; inject the real trio + noindex.
    html = html.replace(/<!-- hreflang: ENABLE AT POLISH LAUNCH[\s\S]*?-->/, '');
    html = html.replace('</title>', `</title>${noindexTag(locale)}${hreflangBlock(C.site.baseUrl, 'index.html')}`);
  } else {
    // thank-you.html — already noindex; just localize the title.
    html = html.replace(/<title>[^<]*<\/title>/, `<title>${esc(C.thankYou.title.replace(/!$/, ''))} — ${esc(C.site.name)}</title>`);
  }
  return html;
}

/* ---- generate ---- */
const sitemapUrls = [];
for (const locale of locales) {
  const C = loadContent(locale.contentFile);
  const outTours = join(root, locale.prefix, 'tury');
  mkdirSync(outTours, { recursive: true });

  if (locale.generateLp) {
    copyFileSync(join(root, locale.contentFile), join(root, locale.prefix, 'content.js'));
    writeFileSync(join(root, locale.prefix, 'index.html'), buildLpPage('index.html', C, locale));
    writeFileSync(join(root, locale.prefix, 'thank-you.html'), buildLpPage('thank-you.html', C, locale));
    console.log(`✓ ${locale.prefix}content.js + ${locale.prefix}index.html + ${locale.prefix}thank-you.html`);
  }

  const indexable = locale.code === 'sk' || PL_INDEXABLE;
  if (indexable) sitemapUrls.push(`${C.site.baseUrl}/${locale.prefix}index.html`);
  for (const t of C.tours) {
    if (!t.slug) { console.warn(`skip (no slug): ${t.id}`); continue; }
    writeFileSync(join(outTours, `${t.slug}.html`), buildTourPage(t, C, locale));
    if (indexable) sitemapUrls.push(`${C.site.baseUrl}/${locale.prefix}tury/${t.slug}.html`);
    console.log(`✓ ${locale.prefix}tury/${t.slug}.html  (${t.name})`);
  }
}

/* ---- sitemap.xml + robots.txt (SK content drives baseUrl) ---- */
const site = loadContent('content.js').site;
const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.map((u) => `  <url><loc>${u}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`;
writeFileSync(join(root, 'sitemap.xml'), sitemap);
console.log('✓ sitemap.xml' + (PL_INDEXABLE ? ' (SK + PL)' : ' (SK only — PL noindexed)'));

writeFileSync(join(root, 'robots.txt'), `User-agent: *
Allow: /

Sitemap: ${site.baseUrl}/sitemap.xml
`);
console.log('✓ robots.txt');

console.log(`\nDone. PL_INDEXABLE=${PL_INDEXABLE}${PL_INDEXABLE ? '' : ' — flip to true at Polish launch (and uncomment the hreflang block in index.html).'}`);
