import puppeteer from 'puppeteer';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.join(__dirname, 'temporary screenshots');

const url = process.argv[2];
const label = process.argv[3];
const width = parseInt(process.argv[4], 10) || 1440;
const height = parseInt(process.argv[5], 10) || 900;

if (!url) {
  console.error('Usage: node screenshot.mjs <url> [label] [width] [height]');
  process.exit(1);
}

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function nextScreenshotPath(label) {
  const existing = fs.readdirSync(OUTPUT_DIR)
    .map((f) => f.match(/^screenshot-(\d+)/))
    .filter(Boolean)
    .map((m) => parseInt(m[1], 10));
  const next = existing.length ? Math.max(...existing) + 1 : 1;
  const suffix = label ? `-${label}` : '';
  return path.join(OUTPUT_DIR, `screenshot-${next}${suffix}.png`);
}

const browser = await puppeteer.launch({ args: ['--disable-gpu', '--no-sandbox'] });
try {
  const page = await browser.newPage();
  await page.setViewport({ width, height });
  await page.goto(url, { waitUntil: 'networkidle0' });

  // Scroll through the page first so scroll-triggered reveal animations fire
  // before the full-page screenshot is taken (they use IntersectionObserver,
  // which an instant fullPage capture would otherwise skip past).
  await page.evaluate(async () => {
    const step = window.innerHeight;
    let y = 0;
    while (y < document.body.scrollHeight) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 180));
      y += step;
    }
    window.scrollTo(0, document.body.scrollHeight);
    await new Promise((r) => setTimeout(r, 300));
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 500));
  });

  const outPath = nextScreenshotPath(label);
  await page.screenshot({ path: outPath, fullPage: true });
  console.log(`Saved ${outPath}`);
} finally {
  await browser.close();
}
