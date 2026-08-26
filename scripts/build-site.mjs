/* ==========================================================================
   build-site.mjs — assemble the deployable site into dist/.

   The repo root doubles as the web root during local dev (serve.mjs serves
   __dirname), but it also holds source and tooling that must NEVER be
   published: apps-script/Code.gs carries the Google Sheet ID, and CLAUDE.md /
   README.md / package.json / the dev scripts are all internal.

   So deployment copies an explicit ALLOWLIST into dist/ rather than excluding
   things from the root — a denylist would silently leak anything added later.

   Run after build-tour-pages.mjs:
     node scripts/build-tour-pages.mjs && node scripts/build-site.mjs
   ========================================================================== */
import { rmSync, mkdirSync, cpSync, existsSync, readdirSync, statSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const dist = join(root, 'dist');

// Everything the browser can legitimately request. Anything absent here is
// simply not deployed.
const PUBLISH = [
  'index.html',
  'thank-you.html',
  'ochrana-osobnych-udajov.html',
  'impressum.html',
  'main.js',
  'content.js',
  'robots.txt',
  'sitemap.xml',
  'favicon.svg',
  'favicon.ico',
  'apple-touch-icon.png',
  'site.webmanifest',
  'assets',
  'brand_assets',
  'tury',
  'pl',
];

// Belt-and-braces: if any of these ever turn up inside dist/, the build fails
// rather than publishing them.
const FORBIDDEN = ['apps-script', 'scripts', 'node_modules', 'serve.mjs', 'screenshot.mjs',
  '_verify.mjs', 'package.json', 'package-lock.json', 'CLAUDE.md', 'README.md',
  'PROPOSAL.md', 'netlify.toml', '.git', '.claude', 'content.pl.js', 'temporary screenshots'];

rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });

let copied = 0;
const missing = [];
for (const entry of PUBLISH) {
  const src = join(root, entry);
  if (!existsSync(src)) { missing.push(entry); continue; }
  cpSync(src, join(dist, entry), { recursive: true });
  copied++;
}

for (const banned of FORBIDDEN) {
  if (existsSync(join(dist, banned))) {
    throw new Error(`REFUSING TO PUBLISH: "${banned}" ended up in dist/`);
  }
}

// dist/pl must not carry the PL source content file under its build name.
const plSrc = join(dist, 'pl', 'content.pl.js');
if (existsSync(plSrc)) throw new Error('REFUSING TO PUBLISH: pl/content.pl.js in dist/');

function walk(dir) {
  let files = 0, bytes = 0;
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) { const r = walk(p); files += r.files; bytes += r.bytes; }
    else { files++; bytes += st.size; }
  }
  return { files, bytes };
}
const { files, bytes } = walk(dist);
const html = [];
(function findHtml(dir, rel = '') {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) findHtml(p, rel + name + '/');
    else if (name.endsWith('.html')) html.push(rel + name);
  }
})(dist);

console.log(`✓ dist/ assembled — ${copied}/${PUBLISH.length} entries, ${files} files, ${(bytes / 1048576).toFixed(1)} MB`);
console.log(`✓ ${html.length} HTML pages`);
if (missing.length) console.log(`  not present (skipped): ${missing.join(', ')}`);
console.log('✓ no source, tooling or secrets in dist/');
