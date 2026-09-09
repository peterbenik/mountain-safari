// ── CONFIG — fill these in ──────────────────────────────
const SHEET_ID = '1blmq_ERUEj5C_2nvrnC05jgJNLLYg4xY2V8butniL-A'; // from the sheet URL: .../d/<THIS_PART>/edit
const SHEET_NAME = 'Leads - M.Safari';                              // tab name
const OWNER_EMAILS = ['info@mountainsafari.sk', 'peterbenik@benzomarketing.com']; // lead notifications
const BUSINESS_NAME = 'Mountain Safari';
const WHATSAPP_PHONE = '421903624085';                   // digits only, country code, no + — keep in sync with content.js whatsapp.phone

// Sending identity.
//
// Mail goes out via the Resend API, NOT from a mailbox. info@mountainsafari.sk
// holds the client's accounting and company correspondence, and a mailbox
// password grants full IMAP read access rather than send-only, so it is
// deliberately never shared with this script. Customer replies are routed back
// to info@ via REPLY_TO_EMAIL, so nothing changes on the customer's side.
//
// Why not Gmail "send as" over WebSupport SMTP: that route needed a Workspace
// policy change AND a mailbox password, and smtp.websupport.sk rejected AUTH
// with an opaque 535 even from a trusted machine. Resend removes the mailbox,
// the SMTP auth and the Workspace dependency from the path entirely.
//
// SETUP (once):
//   1. resend.com → add domain mountainsafari.sk → add the DKIM/SPF records it
//      generates to WebSupport DNS → wait for "Verified".
//   2. Resend → API Keys → create one with Sending access.
//   3. Apps Script → ⚙ Project Settings → Script Properties → add
//      RESEND_API_KEY = re_xxxxxxxx. Never paste the key into this file; this
//      repo is public.
//
// FROM_EMAIL only needs to be on the verified domain — the mailbox itself does
// not need to exist for sending, though keeping hello@ real means bounces and
// out-of-office replies have somewhere to land.
const FROM_EMAIL = 'hello@mountainsafari.sk';    // sender shown to customers
const REPLY_TO_EMAIL = 'info@mountainsafari.sk'; // where customer replies land

// ── PROFIT SHARE ────────────────────────────────────────────────────────
// Promoter commission: 10 % of the NET profit on each paid trip.
//
// Net profit is not stored anywhere, so it is derived from the gross price
// with a single margin figure. The agreed worked example was a ~500 EUR
// Gerlach trip leaving ~300 EUR net (10 % of that = ~30 EUR), which is a 60 %
// net margin. Anton separately estimated ~350 EUR net on the same trip, which
// would be 70 %. That spread is ~17 % of the promoter's income, so the figure
// lives in ONE editable cell (Provízia!M1) rather than in this file — change
// it there once it is pinned down in writing. These constants only seed the
// sheet the first time it is built.
const COMMISSION_SHEET = 'Provízia';
const PRICE_SHEET = 'Cenník';
const DEFAULT_NET_MARGIN = 0.60; // net profit as a share of the gross price
const COMMISSION_RATE = 0.10;    // promoter's share of that net profit

// Group TOTALS in EUR — deliberately normalised.
// content.js is inconsistent: the Tatras tours quote a group total ("2 osoby
// 450 €"), while Monte Rosa and Ortler quote PER PERSON ("2 osoby 950 €/os.").
// Everything below is the total the customer pays, so the sheet never has to
// know which convention a tour uses. Blank = no standard price, fill by hand.
// Gerlach also has a winter price (450 / 500) — override the Cena cell for a
// winter booking; the table carries the summer rate.
const PRICE_TABLE = [
  ['Gerlachovský štít',   430,  450,  500],
  ['Lomnický štít',       390,  430,  450],
  ['Ľadový štít',         430,  470,  500],
  ['Vysoká',              430,  470,  500],
  ['Mont Blanc',           '', 1700,   ''],
  ['Monte Rosa',         1700, 1900,   ''],
  ['Ortler - Hintergrat', 1000, 1000,  ''],
  ['Zimný Lomnický štít',  370,  420,  ''],
];

const LEAD_HEADERS = ['Čas', 'Meno', 'Telefón', 'E-mail', 'Výstup', 'Termín', 'Správa', 'Počet osôb'];
const STATUSES = ['Dopyt', 'Potvrdené', 'Zrealizované', 'Zaplatené', 'Zrušené'];
const SOURCES = ['Formulár', 'Telefón', 'WhatsApp', 'Iné'];
// ────────────────────────────────────────────────────────

// Brand tokens — kept in sync with index.html's :root CSS variables
const BRAND = {
  navy: '#141B2E',
  royal: '#1E40C4',
  cream: '#F5F0E6',
  ink: '#1A1A1A',
  muted: '#6B7280',
};

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function emailShell(bodyHtml) {
  return (
    '<div style="background:' + BRAND.cream + ';padding:32px 16px;font-family:Arial,Helvetica,sans-serif;">' +
      '<div style="max-width:560px;margin:0 auto;background:#FFFFFF;border-radius:12px;overflow:hidden;box-shadow:0 4px 16px rgba(20,27,46,0.12);">' +
        '<div style="background:' + BRAND.navy + ';padding:28px 32px;">' +
          '<span style="font-family:Georgia,\'Times New Roman\',serif;font-size:22px;letter-spacing:0.02em;color:#FFFFFF;">' + BUSINESS_NAME + '</span>' +
        '</div>' +
        '<div style="padding:32px;color:' + BRAND.ink + ';font-size:15px;line-height:1.65;">' +
          bodyHtml +
        '</div>' +
        '<div style="padding:20px 32px;background:' + BRAND.cream + ';color:' + BRAND.muted + ';font-size:12px;">' +
          BUSINESS_NAME + ' · IVBV/UIAGM/IFMGA licencovaní horskí vodcovia' +
        '</div>' +
      '</div>' +
    '</div>'
  );
}

// Sends one email through Resend's HTTP API.
//
// The API key lives in Script Properties, NOT in this file — this code sits in a
// public GitHub repo. Set it once:
//   Apps Script → ⚙ Project Settings → Script Properties → Add script property
//   Name: RESEND_API_KEY   Value: re_xxxxxxxx
//
// Throws on a non-2xx so the caller can log it; doPost() isolates each send so
// one failure cannot suppress the other email.
function sendEmail(to, subject, textBody, htmlBody, replyTo) {
  const key = PropertiesService.getScriptProperties().getProperty('RESEND_API_KEY');
  if (!key) throw new Error('RESEND_API_KEY is not set in Script Properties');

  const payload = {
    from: BUSINESS_NAME + ' <' + FROM_EMAIL + '>',
    to: Array.isArray(to) ? to : [to],
    subject: subject,
    text: textBody,
    html: htmlBody
  };
  if (replyTo) payload.reply_to = replyTo;

  const res = UrlFetchApp.fetch('https://api.resend.com/emails', {
    method: 'post',
    contentType: 'application/json',
    headers: { Authorization: 'Bearer ' + key },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  });

  const code = res.getResponseCode();
  if (code < 200 || code >= 300) {
    throw new Error('Resend HTTP ' + code + ': ' + res.getContentText().slice(0, 300));
  }
  return res.getContentText();
}

/* ── DIAGNOSTIC — run this from the editor to test email sending ──────────
   Select "testResend" in the function dropdown, press Run, and read the
   Execution log at the bottom. Reports the key state and the exact Resend
   response. Safe to leave in the file; it is never called by doPost.
   Change TEST_RECIPIENT to your own address before running.            */
function testResend() {
  const TEST_RECIPIENT = 'peterbenik@benzomarketing.com';

  const key = PropertiesService.getScriptProperties().getProperty('RESEND_API_KEY');
  Logger.log('--- Script Properties ---');
  Logger.log('all property names: ' + JSON.stringify(
    Object.keys(PropertiesService.getScriptProperties().getProperties())));
  if (!key) {
    Logger.log('RESEND_API_KEY: MISSING — add it in Project Settings → Script Properties');
    return;
  }
  Logger.log('RESEND_API_KEY: present, length ' + key.length + ', starts "' + key.slice(0, 4) + '"');
  if (key.trim() !== key) Logger.log('WARNING: key has leading/trailing whitespace — re-save it');

  Logger.log('--- Sending test via Resend ---');
  Logger.log('from: ' + BUSINESS_NAME + ' <' + FROM_EMAIL + '>');
  Logger.log('to:   ' + TEST_RECIPIENT);

  const res = UrlFetchApp.fetch('https://api.resend.com/emails', {
    method: 'post',
    contentType: 'application/json',
    headers: { Authorization: 'Bearer ' + key },
    payload: JSON.stringify({
      from: BUSINESS_NAME + ' <' + FROM_EMAIL + '>',
      to: [TEST_RECIPIENT],
      subject: 'Mountain Safari — test',
      text: 'Test odoslania cez Resend.',
      reply_to: REPLY_TO_EMAIL
    }),
    muteHttpExceptions: true
  });

  Logger.log('HTTP status: ' + res.getResponseCode());
  Logger.log('response: ' + res.getContentText());
  Logger.log(res.getResponseCode() === 200
    ? 'RESULT: SUCCESS — check the inbox and the Resend dashboard.'
    : 'RESULT: FAILED — the response above says why.');
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    const ss = SpreadsheetApp.openById(SHEET_ID);
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(LEAD_HEADERS);
    } else if (!sheet.getRange(1, LEAD_HEADERS.length).getValue()) {
      // Migration: the sheet predates the "Počet osôb" column. Appending the
      // header at the END keeps every existing row's data where it is.
      sheet.getRange(1, LEAD_HEADERS.length).setValue(LEAD_HEADERS[LEAD_HEADERS.length - 1]);
    }

    // Telefón (column C) must be plain text, otherwise Sheets tries to parse a
    // leading "+" as a formula (e.g. "+421 888 888 888") and shows #ERROR!.
    sheet.getRange('C2:C').setNumberFormat('@');

    sheet.appendRow([
      new Date(),
      data.meno || '',
      data.telefon || '',
      data.email || '',
      data.vystup || '',
      // Termín is LEGACY. The booking form no longer has a date field — any
      // preferred date now arrives inside Správa. The column stays so the
      // rows recorded before that change keep their data in the right place;
      // new rows leave it blank. Safe to hide in the Sheet, not to delete.
      data.termin || '',
      data.sprava || '',
      data.pocetOsob || '',
    ]);

    // Commission ledger. Isolated on purpose: the lead is what matters, and a
    // problem here must never cost a booking. Silently does nothing until
    // setupCommissionSheets() has been run once.
    try {
      appendCommissionRow(ss, data);
    } catch (commErr) {
      console.error('commission row failed', commErr);
    }

    const meno = escapeHtml(data.meno);
    const telefon = escapeHtml(data.telefon);
    const email = escapeHtml(data.email);
    const vystup = escapeHtml(data.vystup) || '—';
    const pocetOsob = escapeHtml(data.pocetOsob) || '—';
    const termin = escapeHtml(data.termin) || '—';
    const sprava = escapeHtml(data.sprava) || '—';

    // Notify owner(s) — scannable summary table, reply-to set to the lead so
    // hitting "Reply" in the inbox goes straight to the customer.
    const ownerBody =
      '<h2 style="margin:0 0 16px;font-family:Georgia,serif;font-size:20px;color:' + BRAND.navy + ';">Nová rezervácia</h2>' +
      '<table style="width:100%;border-collapse:collapse;font-size:14px;">' +
        '<tr><td style="padding:6px 0;color:' + BRAND.muted + ';width:120px;">Meno</td><td style="padding:6px 0;"><b>' + meno + '</b></td></tr>' +
        '<tr><td style="padding:6px 0;color:' + BRAND.muted + ';">Telefón</td><td style="padding:6px 0;">' + telefon + '</td></tr>' +
        '<tr><td style="padding:6px 0;color:' + BRAND.muted + ';">E-mail</td><td style="padding:6px 0;">' + email + '</td></tr>' +
        '<tr><td style="padding:6px 0;color:' + BRAND.muted + ';">Výstup</td><td style="padding:6px 0;">' + vystup + '</td></tr>' +
        '<tr><td style="padding:6px 0;color:' + BRAND.muted + ';">Počet osôb</td><td style="padding:6px 0;">' + pocetOsob + '</td></tr>' +
        '<tr><td style="padding:6px 0;color:' + BRAND.muted + ';vertical-align:top;">Správa</td><td style="padding:6px 0;">' + sprava + '</td></tr>' +
      '</table>';

    const ownerPlainText =
      'Nová rezervácia\n\n' +
      'Meno: ' + meno + '\n' +
      'Telefón: ' + telefon + '\n' +
      'E-mail: ' + email + '\n' +
      'Výstup: ' + vystup + '\n' +
      'Počet osôb: ' + pocetOsob + '\n' +
      'Správa: ' + sprava + '\n';

    const stripNewlines = (s) => String(s || '—').replace(/[\r\n]+/g, ' ').trim() || '—';
    const ownerSubject = '🟢 Nová rezervácia · ' + stripNewlines(data.vystup) + ' · ' + stripNewlines(data.meno);
    // Each send is isolated: the lead is already safe in the Sheet, and a failure
    // on one email must not stop the other from going out.
    const sendErrors = [];
    try {
      // Replying in the inbox should reach the customer, not ourselves.
      sendEmail(OWNER_EMAILS, ownerSubject, ownerPlainText, emailShell(ownerBody), data.email || null);
    } catch (mailErr) {
      sendErrors.push('owner: ' + mailErr);
      console.error('owner email failed', mailErr);
    }

    // Confirmation + encouragement to the customer
    if (data.email) {
      const waLink = 'https://wa.me/' + WHATSAPP_PHONE;
      // Pre-tour briefing: the confirmation doubles as the "what to bring /
      // how to prepare" note, so the guide does not have to send it separately.
      const H = 'margin:26px 0 8px;font-family:Georgia,\'Times New Roman\',serif;font-size:16px;color:' + BRAND.navy + ';';
      const P = 'margin:0 0 14px;';
      const GEAR = [
        'pevná turistická obuv s dobrou podrážkou',
        'pohodlné funkčné oblečenie podľa počasia',
        'teplá vrstva (mikina / bunda)',
        'nepremokavá bunda',
        'čiapka alebo šiltovka, prípadne rukavice',
        'slnečné okuliare a opaľovací krém',
        'menší batoh',
        'približne 1 – 1,5 l tekutín',
        'malé občerstvenie / energetická tyčinka',
        'osobné lieky, ktoré používate',
      ];

      // The briefing copy never names the tour, so restate the booking itself:
      // this email is the customer's only written record of what they reserved.
      const summaryRows = [
        ['Výstup', vystup],
        ['Počet osôb', pocetOsob],
        ['Termín', termin !== '—' ? termin : 'dohodneme spoločne'],
      ];
      const summaryHtml = vystup === '—' ? '' :
        '<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:separate;margin:0 0 20px;background:' + BRAND.cream + ';border-left:3px solid ' + BRAND.royal + ';border-radius:4px;">' +
          '<tr><td style="padding:16px 18px;">' +
            '<div style="margin:0 0 8px;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:' + BRAND.muted + ';">Vaša rezervácia</div>' +
            summaryRows.map(function (row, i) {
              // No trailing margin on the last row, so the cell's padding stays even.
              return '<div style="margin:0 0 ' + (i === summaryRows.length - 1 ? '0' : '4px') + ';font-size:15px;">' +
                '<span style="color:' + BRAND.muted + ';">' + row[0] + ': </span><b>' + row[1] + '</b></div>';
            }).join('') +
          '</td></tr>' +
        '</table>';

      const clientBody =
        '<p style="' + P + '">Zdravím' + (meno ? ' ' + meno : '') + ',</p>' +
        '<p style="' + P + '">sme hrdí na to, že chcete posúvať vaše limity na ďalšiu úroveň.</p>' +
        '<p style="' + P + '">Úspešne ste si rezervovali váš budúci zážitok s horskými vodcami — ' + BUSINESS_NAME + '.</p>' +
        summaryHtml +
        '<p style="' + P + '">Či je to váš prvý alebo X-tý výstup, ručíme, že vám tempo nastavíme na mieru a nebudeme vás hnať hore a dole…</p>' +
        '<p style="' + P + '">Aby sme si túru užili bezpečne a bez zbytočného stresu, prosím venujte pozornosť nasledujúcim informáciám nižšie.</p>' +

        '<h2 style="' + H + '">Čo si zobrať</h2>' +
        '<ul style="margin:0 0 14px;padding-left:20px;">' +
          GEAR.map(function (item) {
            return '<li style="margin:0 0 6px;">' + item + '</li>';
          }).join('') +
        '</ul>' +
        '<p style="' + P + '">Technické vybavenie potrebné na konkrétnu túru zabezpečí alebo vopred upresní horský vodca.</p>' +

        '<h2 style="' + H + '">Príchod</h2>' +
        '<p style="' + P + '">Na miesto stretnutia príďte ideálne 10 – 15 minút pred dohodnutým časom. Budeme mať priestor skontrolovať výstroj a pripraviť sa bez zbytočného zhonu.</p>' +

        '<h2 style="' + H + '">Deň pred túrou</h2>' +
        '<p style="' + P + '">Odporúčame ľahší režim, dostatok tekutín a kvalitný spánok. Vyhnite sa väčšiemu množstvu alkoholu a náročnej fyzickej aktivite.</p>' +

        '<h2 style="' + H + '">Počasie</h2>' +
        '<p style="' + P + '">Počasie v horách sa môže rýchlo meniť. Deň pred túrou si potvrdíme aktuálnu predpoveď, čas a miesto stretnutia.</p>' +
        '<p style="' + P + '">V prípade nevhodných podmienok môže horský vodca trasu upraviť, zvoliť náhradný cieľ alebo túru presunúť.</p>' +

        '<h2 style="' + H + '">Ešte jeden tip!</h2>' +
        '<p style="' + P + '">Nové topánky alebo úplne novú výstroj si radšej prvýkrát neskúšajte priamo na túre.</p>' +
        '<p style="' + P + '">Ak máte akékoľvek zdravotné obmedzenie alebo inú okolnosť, ktorá môže ovplyvniť priebeh túry, prosím informujte o tom horského vodcu vopred.</p>' +

        '<p style="margin:26px 0 14px;">Tešíme sa na spoločný deň v horách!</p>' +
        '<p style="margin:0 0 20px;">Ak máte akékoľvek otázky, neváhajte a napíšte/zavolajte nám!</p>' +
        '<p style="margin:0 0 8px;text-align:center;">' +
          '<a href="' + waLink + '" style="display:inline-block;background:' + BRAND.royal + ';color:#FFFFFF;text-decoration:none;padding:12px 28px;border-radius:999px;font-weight:bold;">Napísať na WhatsApp</a>' +
        '</p>' +
        '<p style="margin:24px 0 0;">S pozdravom,<br><b>' + BUSINESS_NAME + '</b></p>';

      const clientPlainText =
        'Zdravím' + (meno ? ' ' + meno : '') + ',\n\n' +
        'sme hrdí na to, že chcete posúvať vaše limity na ďalšiu úroveň.\n' +
        'Úspešne ste si rezervovali váš budúci zážitok s horskými vodcami — ' + BUSINESS_NAME + '.\n' +
        (vystup === '—' ? '' :
          '\nVAŠA REZERVÁCIA\n' +
          summaryRows.map(function (row) { return row[0] + ': ' + row[1] + '\n'; }).join('') + '\n') +
        'Či je to váš prvý alebo X-tý výstup, ručíme, že vám tempo nastavíme na mieru a nebudeme vás hnať hore a dole…\n\n' +
        'Aby sme si túru užili bezpečne a bez zbytočného stresu, prosím venujte pozornosť nasledujúcim informáciám nižšie.\n\n' +
        'ČO SI ZOBRAŤ\n' +
        GEAR.map(function (item) { return '- ' + item + '\n'; }).join('') +
        '\nTechnické vybavenie potrebné na konkrétnu túru zabezpečí alebo vopred upresní horský vodca.\n\n' +
        'PRÍCHOD\n' +
        'Na miesto stretnutia príďte ideálne 10 – 15 minút pred dohodnutým časom. Budeme mať priestor skontrolovať výstroj a pripraviť sa bez zbytočného zhonu.\n\n' +
        'DEŇ PRED TÚROU\n' +
        'Odporúčame ľahší režim, dostatok tekutín a kvalitný spánok. Vyhnite sa väčšiemu množstvu alkoholu a náročnej fyzickej aktivite.\n\n' +
        'POČASIE\n' +
        'Počasie v horách sa môže rýchlo meniť. Deň pred túrou si potvrdíme aktuálnu predpoveď, čas a miesto stretnutia.\n' +
        'V prípade nevhodných podmienok môže horský vodca trasu upraviť, zvoliť náhradný cieľ alebo túru presunúť.\n\n' +
        'EŠTE JEDEN TIP!\n' +
        'Nové topánky alebo úplne novú výstroj si radšej prvýkrát neskúšajte priamo na túre.\n' +
        'Ak máte akékoľvek zdravotné obmedzenie alebo inú okolnosť, ktorá môže ovplyvniť priebeh túry, prosím informujte o tom horského vodcu vopred.\n\n' +
        'Tešíme sa na spoločný deň v horách!\n\n' +
        'Ak máte akékoľvek otázky, neváhajte a napíšte/zavolajte nám!\n' +
        'WhatsApp: ' + waLink + '\n\n' +
        'S pozdravom,\n' + BUSINESS_NAME;

      try {
        // Replies go to the client's real inbox, not the send-only address.
        sendEmail(data.email, 'Vaša rezervácia je potvrdená — ' + BUSINESS_NAME,
                  clientPlainText, emailShell(clientBody), REPLY_TO_EMAIL);
      } catch (mailErr) {
        sendErrors.push('customer: ' + mailErr);
        console.error('customer email failed', mailErr);
      }
    }

    // The lead is recorded either way; surface mail trouble without failing the
    // submission, so the visitor still reaches the thank-you page.
    if (sendErrors.length) {
      return ContentService
        .createTextOutput(JSON.stringify({ result: 'success', warning: sendErrors.join('; ') }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}


/* ══════════════════════════════════════════════════════════════════════════
   PROFIT SHARE — price table + commission ledger

   Two sheets, both created by setupCommissionSheets() (run it ONCE from the
   editor; it is safe to re-run — it never clears booking rows and never
   overwrites a margin you have edited):

     Cenník    — group total prices per tour, editable by the client.
     Provízia  — one row per booking. Columns A–F and I–J are ordinary cells;
                 G and H are single ARRAYFORMULA cells that cover the whole
                 column, so a hand-typed row (a phone or WhatsApp booking)
                 computes itself with nothing to copy down.

   NEVER write into G or H from code or by hand — a value in the middle of an
   ARRAYFORMULA column breaks the whole array.
   ═════════════════════════════════════════════════════════════════════════ */

const COMM_HEADERS = ['Dátum', 'Meno', 'Výstup', 'Počet osôb', 'Zdroj', 'Cena (EUR)',
                      'Čistý zisk (EUR)', 'Provízia (EUR)', 'Stav', 'Poznámka'];
const COMM_ROWS = 2000; // bounded so the ARRAYFORMULA cannot spill endlessly

function setupCommissionSheets() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  buildPriceSheet_(ss);
  buildCommissionSheet_(ss);
  SpreadsheetApp.flush();
  Logger.log('Hotovo. Skontrolujte hárky "' + PRICE_SHEET + '" a "' + COMMISSION_SHEET + '".');
  Logger.log('Čistá marža je v bunke ' + COMMISSION_SHEET + '!M1 — zmeňte ju tam, nie v kóde.');
}

function buildPriceSheet_(ss) {
  let sh = ss.getSheetByName(PRICE_SHEET);
  const isNew = !sh;
  if (!sh) sh = ss.insertSheet(PRICE_SHEET);

  const header = ['Výstup', '1 osoba', '2 osoby', '3 osoby'];
  sh.getRange(1, 1, 1, header.length).setValues([header])
    .setFontWeight('bold').setBackground(BRAND.navy).setFontColor('#FFFFFF');

  // Only seed the prices on first build — the client may have edited them.
  if (isNew) {
    sh.getRange(2, 1, PRICE_TABLE.length, 4).setValues(PRICE_TABLE);
    sh.getRange(2, 2, PRICE_TABLE.length, 3).setNumberFormat('#,##0 €');
    const note = sh.getRange(PRICE_TABLE.length + 3, 1);
    note.setValue('Ceny sú CELKOVÉ za skupinu, v EUR (nie za osobu). Úprava tu sa prejaví '
      + 'na ďalších rezerváciách. Gerlach v zime stojí 450 / 500 € — pri zimnom termíne '
      + 'prepíšte cenu priamo v hárku ' + COMMISSION_SHEET + '.');
    note.setFontStyle('italic').setFontColor(BRAND.muted);
  }

  sh.setFrozenRows(1);
  sh.autoResizeColumns(1, 4);
}

function buildCommissionSheet_(ss) {
  let sh = ss.getSheetByName(COMMISSION_SHEET);
  if (!sh) sh = ss.insertSheet(COMMISSION_SHEET);

  // A fresh sheet ships with 1000 rows and 26 columns, but every ranged write
  // below addresses COMM_ROWS (2000) and column M. Grow it FIRST — otherwise
  // those calls run off the end of the grid and Apps Script reports the
  // unhelpful "Service Spreadsheets failed while accessing document".
  if (sh.getMaxRows() < COMM_ROWS) {
    sh.insertRowsAfter(sh.getMaxRows(), COMM_ROWS - sh.getMaxRows());
  }
  if (sh.getMaxColumns() < 13) {
    sh.insertColumnsAfter(sh.getMaxColumns(), 13 - sh.getMaxColumns());
  }

  // Headers. G1/H1 are overwritten by their ARRAYFORMULA below, which emits
  // its own header text — that is why they are written twice.
  sh.getRange(1, 1, 1, COMM_HEADERS.length).setValues([COMM_HEADERS])
    .setFontWeight('bold').setBackground(BRAND.navy).setFontColor('#FFFFFF');

  const last = COMM_ROWS;
  sh.getRange('G1').setFormula(
    '=ARRAYFORMULA(IF(ROW(A1:A' + last + ')=1,"' + COMM_HEADERS[6] + '",'
    + 'IF(A1:A' + last + '="","",F1:F' + last + '*$M$1)))');
  sh.getRange('H1').setFormula(
    '=ARRAYFORMULA(IF(ROW(A1:A' + last + ')=1,"' + COMM_HEADERS[7] + '",'
    + 'IF(A1:A' + last + '="","",G1:G' + last + '*$M$2)))');

  // ── assumptions + totals, off to the side ──
  sh.getRange('L1').setValue('Čistá marža (podiel z ceny)');
  sh.getRange('L2').setValue('Provízia z čistého zisku');
  sh.getRange('L4').setValue('Provízia — ZAPLATENÉ');
  sh.getRange('L5').setValue('Provízia — v príprave');
  sh.getRange('L6').setValue('Počet zaplatených výstupov');
  sh.getRange('L1:L6').setFontColor(BRAND.muted);
  sh.getRange('L4').setFontWeight('bold').setFontColor(BRAND.ink);

  // Seed the two rates ONLY if empty, so re-running never resets an edit.
  if (sh.getRange('M1').getValue() === '') sh.getRange('M1').setValue(DEFAULT_NET_MARGIN);
  if (sh.getRange('M2').getValue() === '') sh.getRange('M2').setValue(COMMISSION_RATE);
  sh.getRange('M1:M2').setNumberFormat('0%');

  sh.getRange('M4').setFormula('=SUMIF(I:I,"Zaplatené",H:H)');
  sh.getRange('M5').setFormula('=SUMIFS(H:H,I:I,"<>Zaplatené",I:I,"<>Zrušené",I:I,"<>")');
  sh.getRange('M6').setFormula('=COUNTIF(I:I,"Zaplatené")');
  sh.getRange('M4:M5').setNumberFormat('#,##0.00 €').setFontWeight('bold');
  sh.getRange('M4').setFontSize(12);

  // ── formats ──
  sh.getRange(2, 1, last - 1, 1).setNumberFormat('d.M.yyyy');
  sh.getRange(2, 6, last - 1, 3).setNumberFormat('#,##0.00 €');

  // ── dropdowns ──
  sh.getRange(2, 9, last - 1, 1).setDataValidation(
    SpreadsheetApp.newDataValidation().requireValueInList(STATUSES, true).build());
  sh.getRange(2, 5, last - 1, 1).setDataValidation(
    SpreadsheetApp.newDataValidation().requireValueInList(SOURCES, true).build());

  sh.setFrozenRows(1);
  sh.autoResizeColumns(1, 12);
}

/* Group total for a tour at a given headcount, read from the Cenník sheet so
   the client can change a price without touching this file. Returns '' when
   there is no standard price (4+ people, Mont Blanc solo, an unknown tour) —
   the cell is then filled in by hand. */
function lookupPrice(ss, tourName, people) {
  const sh = ss.getSheetByName(PRICE_SHEET);
  if (!sh) return '';
  const n = parseInt(people, 10);
  if (!n || n < 1 || n > 3) return '';
  const rows = sh.getDataRange().getValues();
  const wanted = String(tourName || '').trim();
  for (let i = 1; i < rows.length; i++) {
    if (String(rows[i][0]).trim() === wanted) {
      const v = rows[i][n]; // column 1 = "1 osoba", 2 = "2 osoby", 3 = "3 osoby"
      return (typeof v === 'number' && v > 0) ? v : '';
    }
  }
  return '';
}

function appendCommissionRow(ss, data) {
  const sh = ss.getSheetByName(COMMISSION_SHEET);
  if (!sh) return; // setupCommissionSheets() has not been run yet

  // getLastRow() is unreliable here: the ARRAYFORMULA columns return "" for
  // every unused row, which still counts as content. Scan column A instead.
  const colA = sh.getRange(1, 1, Math.min(COMM_ROWS, sh.getMaxRows()), 1).getValues();
  let lastUsed = 1;
  for (let i = colA.length - 1; i >= 0; i--) {
    if (colA[i][0] !== '' && colA[i][0] !== null) { lastUsed = i + 1; break; }
  }
  const row = lastUsed + 1;
  if (row > COMM_ROWS) throw new Error('Provízia sheet is full (' + COMM_ROWS + ' rows)');

  const price = lookupPrice(ss, data.vystup, data.pocetOsob);

  // Columns A–F only: G and H belong to the ARRAYFORMULA and must stay untouched.
  sh.getRange(row, 1, 1, 6).setValues([[
    new Date(),
    data.meno || '',
    data.vystup || '',
    data.pocetOsob || '',
    SOURCES[0],
    price,
  ]]);
  sh.getRange(row, 9).setValue(STATUSES[0]);
  if (price === '') {
    sh.getRange(row, 10).setValue('Cenu doplňte ručne — pre tento výstup a počet osôb nie je v cenníku sadzba.');
  }
}
