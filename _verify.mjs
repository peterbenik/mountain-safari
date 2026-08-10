import puppeteer from 'puppeteer';
const dir = process.argv[2];
const b = await puppeteer.launch({ args: ['--no-sandbox'] });
const vis = (el) => el.getClientRects().length > 0;
try {
  // ---- MOBILE ----
  const pg = await b.newPage();
  const errs = [];
  pg.on('console', m => { if (m.type()==='error') errs.push(m.text()); });
  pg.on('pageerror', e => errs.push('PAGEERROR '+e.message));
  await pg.setViewport({ width: 390, height: 844, deviceScaleFactor: 1, isMobile: true });
  await pg.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

  const collapsed = await pg.evaluate(() => {
    const grp = document.querySelector('[data-season-group="leto"]');
    const cards = [...grp.querySelectorAll('.tour-card')];
    const visNames = cards.filter(c => c.getClientRects().length).map(c => c.querySelector('h3').textContent);
    const btn = grp.querySelector('[data-toggle-tours]');
    const sec = document.querySelector('#tours').getBoundingClientRect();
    return { visibleCount: visNames.length, visibleNames: visNames, hasCollapsedClass: grp.classList.contains('is-collapsed'),
      btnText: btn ? btn.textContent : null, btnVisible: btn ? btn.getClientRects().length>0 : false, btnAria: btn?.getAttribute('aria-expanded'),
      sectionScreens: +(sec.height/window.innerHeight).toFixed(1) };
  });
  console.log('MOBILE collapsed:', JSON.stringify(collapsed));
  await pg.evaluate(() => document.querySelector('#tours').scrollIntoView());
  await new Promise(r=>setTimeout(r,300));
  await pg.screenshot({ path: `${dir}/tours-mobile-collapsed.png` });

  // click expand
  await pg.click('[data-season-group="leto"] [data-toggle-tours]');
  await new Promise(r=>setTimeout(r,300));
  const expanded = await pg.evaluate(() => {
    const grp = document.querySelector('[data-season-group="leto"]');
    const cards = [...grp.querySelectorAll('.tour-card')].filter(c => c.getClientRects().length);
    const btn = grp.querySelector('[data-toggle-tours]');
    const sec = document.querySelector('#tours').getBoundingClientRect();
    return { visibleCount: cards.length, btnText: btn.textContent, btnAria: btn.getAttribute('aria-expanded'), sectionScreens: +(sec.height/window.innerHeight).toFixed(1) };
  });
  console.log('MOBILE expanded: ', JSON.stringify(expanded));

  // click collapse again
  await pg.click('[data-season-group="leto"] [data-toggle-tours]');
  await new Promise(r=>setTimeout(r,200));
  const recollapsed = await pg.evaluate(() => {
    const grp = document.querySelector('[data-season-group="leto"]');
    const cards = [...grp.querySelectorAll('.tour-card')].filter(c => c.getClientRects().length);
    const btn = grp.querySelector('[data-toggle-tours]');
    return { visibleCount: cards.length, btnText: btn.textContent };
  });
  console.log('MOBILE re-collapsed:', JSON.stringify(recollapsed));

  // season switch to zima on mobile
  await pg.click('[data-season-option="zima"]');
  await new Promise(r=>setTimeout(r,300));
  const zima = await pg.evaluate(() => {
    const grp = document.querySelector('[data-season-group="zima"]');
    const cards = [...grp.querySelectorAll('.tour-card')].filter(c => c.getClientRects().length);
    const btn = grp.querySelector('[data-toggle-tours]');
    return { visibleCount: cards.length, hasButton: !!btn };
  });
  console.log('MOBILE zima:      ', JSON.stringify(zima));
  console.log('CONSOLE ERRORS:   ', errs.length ? errs : 'NONE');
  await pg.close();

  // ---- DESKTOP ----
  const dp = await b.newPage();
  await dp.setViewport({ width: 1440, height: 900 });
  await dp.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  const desk = await dp.evaluate(() => {
    const grp = document.querySelector('[data-season-group="leto"]');
    const cards = [...grp.querySelectorAll('.tour-card')].filter(c => c.getClientRects().length);
    const btn = grp.querySelector('[data-toggle-tours]');
    return { visibleCount: cards.length, order: cards.slice(0,4).map(c=>c.querySelector('h3').textContent), btnVisible: btn ? btn.getClientRects().length>0 : false };
  });
  console.log('DESKTOP:          ', JSON.stringify(desk));
  await dp.evaluate(() => document.querySelector('#tours').scrollIntoView());
  await new Promise(r=>setTimeout(r,300));
  await dp.close();
} finally { await b.close(); }
