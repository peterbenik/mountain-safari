import puppeteer from 'puppeteer';
const url = process.argv[2] || 'https://lp.mountainsafari.sk/';
const b = await puppeteer.launch({ args: ['--no-sandbox'] });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 900 });
await p.setCacheEnabled(false);
const res = [];
p.on('response', async (r) => {
  try {
    const h = r.headers();
    res.push({ url: r.url(), type: r.request().resourceType(),
               bytes: parseInt(h['content-length'] || '0', 10) || (await r.buffer().catch(() => Buffer.alloc(0))).length });
  } catch {}
});
const t0 = Date.now();
await p.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
const load = Date.now() - t0;
const m = await p.evaluate(() => {
  const nav = performance.getEntriesByType('navigation')[0] || {};
  const lcp = performance.getEntriesByType('largest-contentful-paint').pop();
  const fcp = performance.getEntriesByName('first-contentful-paint')[0];
  return { fcp: fcp ? Math.round(fcp.startTime) : null,
           lcp: lcp ? Math.round(lcp.startTime) : null,
           domContentLoaded: Math.round(nav.domContentLoadedEventEnd || 0) };
});
const byType = {};
for (const r of res) { byType[r.type] = (byType[r.type] || 0) + r.bytes; }
const total = res.reduce((a, r) => a + r.bytes, 0);
console.log(`\n${url}`);
console.log(`  requests: ${res.length}   total: ${(total/1048576).toFixed(2)} MB   load: ${load}ms`);
console.log(`  FCP ${m.fcp}ms   LCP ${m.lcp}ms   DCL ${m.domContentLoaded}ms\n`);
console.log('  by type:');
Object.entries(byType).sort((a,b)=>b[1]-a[1]).forEach(([t,v]) => console.log(`    ${t.padEnd(12)} ${(v/1024).toFixed(0).padStart(7)} KB`));
console.log('\n  heaviest 12:');
res.sort((a,b)=>b.bytes-a.bytes).slice(0,12).forEach(r =>
  console.log(`    ${(r.bytes/1024).toFixed(0).padStart(7)} KB  ${decodeURIComponent(r.url).replace(/^https?:\/\//,'').slice(0,78)}`));
await b.close();
