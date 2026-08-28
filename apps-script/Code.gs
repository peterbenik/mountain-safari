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
      sheet.appendRow(['Čas', 'Meno', 'Telefón', 'E-mail', 'Výstup', 'Termín', 'Správa']);
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
      data.termin || '',
      data.sprava || '',
    ]);

    const meno = escapeHtml(data.meno);
    const telefon = escapeHtml(data.telefon);
    const email = escapeHtml(data.email);
    const vystup = escapeHtml(data.vystup) || '—';
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
        '<tr><td style="padding:6px 0;color:' + BRAND.muted + ';">Termín</td><td style="padding:6px 0;">' + termin + '</td></tr>' +
        '<tr><td style="padding:6px 0;color:' + BRAND.muted + ';vertical-align:top;">Správa</td><td style="padding:6px 0;">' + sprava + '</td></tr>' +
      '</table>';

    const ownerPlainText =
      'Nová rezervácia\n\n' +
      'Meno: ' + meno + '\n' +
      'Telefón: ' + telefon + '\n' +
      'E-mail: ' + email + '\n' +
      'Výstup: ' + vystup + '\n' +
      'Termín: ' + termin + '\n' +
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
      const clientBody =
        '<p style="margin:0 0 16px;">Dobrý deň ' + (meno || '') + ',</p>' +
        '<p style="margin:0 0 16px;">ďakujeme za váš záujem o výstup <b>' + vystup + '</b>' +
          (termin !== '—' ? ' v termíne <b>' + termin + '</b>' : '') + '. Vašu rezerváciu sme prijali a náš tím ju už spracováva.</p>' +
        '<p style="margin:0 0 16px;">Ozveme sa vám <b>do 24 hodín</b> s podrobnosťami k výstupu, dostupnými termínmi a ďalšími krokmi.</p>' +
        '<p style="margin:0 0 16px;">Naši horskí vodcovia sú licencovaní IVBV/UIAGM/IFMGA — takže sa môžete spoľahnúť, že vaše hory budú v tých najistejších rukách.</p>' +
        '<p style="margin:0 0 24px;">Potrebujete niečo doriešiť skôr? Ozvite sa nám priamo cez WhatsApp:</p>' +
        '<p style="margin:0 0 8px;text-align:center;">' +
          '<a href="' + waLink + '" style="display:inline-block;background:' + BRAND.royal + ';color:#FFFFFF;text-decoration:none;padding:12px 28px;border-radius:999px;font-weight:bold;">Napísať na WhatsApp</a>' +
        '</p>' +
        '<p style="margin:24px 0 0;">Tešíme sa na spoločný výstup!<br>S pozdravom,<br><b>' + BUSINESS_NAME + '</b></p>';

      const clientPlainText =
        'Dobrý deň ' + (meno || '') + ',\n\n' +
        'ďakujeme za váš záujem o výstup ' + vystup +
          (termin !== '—' ? ' v termíne ' + termin : '') + '. Vašu rezerváciu sme prijali a náš tím ju už spracováva.\n\n' +
        'Ozveme sa vám do 24 hodín s podrobnosťami k výstupu, dostupnými termínmi a ďalšími krokmi.\n\n' +
        'Naši horskí vodcovia sú licencovaní IVBV/UIAGM/IFMGA.\n\n' +
        'Potrebujete niečo doriešiť skôr? Napíšte nám na WhatsApp: ' + waLink + '\n\n' +
        'Tešíme sa na spoločný výstup!\nS pozdravom,\n' + BUSINESS_NAME;

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
