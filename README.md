# Mountain Safari — Landing Page

Single-page, conversion-focused landing page for Mountain Safari (High Tatras mountain guiding). Static site, no build step: one `index.html`, one data file (`content.js`), one behavior file (`main.js`), plus a Google Apps Script backend for the booking form.

## File map

- `index.html` — all markup, design tokens (CSS custom properties), Tailwind CDN config. Contains no hard-coded copy — every visible string is hydrated at runtime from `content.js` via `data-content` attributes or rendered from array data (tours, FAQ, testimonials, process steps, gallery).
- `content.js` — every copy string and every data array (tours, FAQ, testimonials, process, footer, tracking config, Apps Script URL). This is the only file you should need to edit to update copy, prices, or config.
- `main.js` — all interactivity: nav/mobile menu, scroll reveal, tour/process/testimonial/gallery/FAQ rendering, booking modal (validation, submit, focus trap), carousel, lightbox, accordion, WhatsApp link building, GA4/Google Ads tracking calls.
- `apps-script/Code.gs` — Google Apps Script Web App: appends bookings to a Google Sheet, emails the owner(s), emails a confirmation to the customer.
- `serve.mjs` / `screenshot.mjs` — local dev server (`localhost:3000`) and Puppeteer screenshot helper, unchanged workflow.

## Local development

```bash
npm install
node serve.mjs
```

Open `http://localhost:3000`. No build step — edit `index.html`, `content.js`, or `main.js` and refresh.

### Testing the booking form without a live Apps Script

`content.js` has a `devMode: true` flag. While true, form submissions are **not** sent anywhere — `main.js` logs the payload to the console, waits ~700ms, and resolves as if the Apps Script call succeeded (so you can see the full success UI and confirm the `generate_lead` tracking event fires). Visit the page with `?mockSubmit=error` in the URL to instead exercise the error/fallback state.

**Before going live, set `devMode: false` in `content.js`** and make sure `appsScriptUrl` points at a real deployment.

## Screenshots

```bash
node screenshot.mjs http://localhost:3000 [label] [width] [height]
```

Saved to `./temporary screenshots/`. Width/height default to 1440×900; pass explicit values to check other breakpoints, e.g. `node screenshot.mjs http://localhost:3000 mobile 375 812`.

## Deploying the Apps Script backend

1. Create a Google Sheet to store leads.
2. Open it → **Extensions → Apps Script**, paste in the contents of `apps-script/Code.gs`.
3. Fill in the config constants at the top: `SHEET_ID` (from the Sheet's URL), `OWNER_EMAILS`.
4. **Deploy → New deployment → Web app.** Set "Execute as: Me" and "Who has access: Anyone".
5. Copy the resulting `/exec` URL into `content.js` → `appsScriptUrl`.
6. Set `devMode: false` in `content.js`.

The client intentionally POSTs with `Content-Type: text/plain;charset=utf-8` (see `submitBooking` in `main.js`) so the browser never sends a CORS preflight `OPTIONS` request — Apps Script Web Apps can't answer one. Do not change this to `application/json`.

## Deploying the site

It's three static files (plus `apps-script/` which isn't served). Upload `index.html`, `content.js`, `main.js` to any static host — Netlify, Vercel, Cloudflare Pages, GitHub Pages, or a plain S3 bucket. No build command needed.

## Setting up tracking

`content.js` → `tracking`:

- `ga4MeasurementId` — from Google Analytics 4 (Admin → Data streams).
- `googleAdsId` — your Google Ads account's conversion ID (`AW-...`).
- `convLabelLead` / `convLabelWhatsapp` — create two conversion actions in Google Ads (e.g. "Lead form" and "WhatsApp contact") and paste their `AW-.../label` values here.

While these are still placeholders (containing `XXXX`), `main.js` skips loading the real `gtag.js` script and instead logs tracking calls to the console (`[MS tracking] ...`) so you can verify the events fire at the right moments (form success, WhatsApp click) before wiring up real IDs.

## Placeholder checklist

Everything below lives in `content.js` unless noted otherwise.

- [ ] All bracketed `[...]` copy strings (paragraphs, tour descriptions, FAQ answers, testimonial quotes, footer tagline, etc.)
- [ ] `hero.bgImage`, `about.photo`, `finalCta.cutoutImage` and all `tours[].image` — currently `placehold.co` placeholders; swap for real photography (see dimensions encoded in each placeholder URL)
- [x] `testimonialsSection.items[].wistiaId` — real Wistia video testimonials wired up (Andrea, Marek, Miška); still pending real `quote` text to replace the bracketed placeholders
- [ ] `gallerySection.images` — 6 real gallery photos
- [ ] `finalCta.partnerLogos` — real partner/trust logos
- [ ] `footer.guides[].phone` / `.phoneDisplay` — Anton Sedlák's and Štefan Krasňan's real phone numbers
- [ ] `footer.email` — real contact email
- [ ] `whatsapp.phone` — real WhatsApp number (digits only, country code, no `+`)
- [ ] `appsScriptUrl` — real Apps Script deployment URL (see above), and set `devMode: false`
- [ ] `tracking.ga4MeasurementId`, `tracking.googleAdsId`, `tracking.convLabelLead`, `tracking.convLabelWhatsapp`
- [ ] Brand colors in `index.html`'s `:root` CSS variables and `tailwind.config` — currently provisional (royal blue / navy / periwinkle) pending final brand guidelines
- [ ] Fonts (Sora / Playfair Display / Inter) — provisional pending brand guidelines

## Adding a Polish version later

1. Duplicate `content.js` → `content.pl.js`, keeping every key identical and translating only the string values.
2. In `index.html`, change `<script src="content.js"></script>` to `<script src="content.pl.js"></script>` (or build a small loader that picks the file based on a `?lang=pl` query param / path prefix).

No changes to `index.html` markup or `main.js` are needed beyond that — nothing in either file hard-codes Slovak copy.
