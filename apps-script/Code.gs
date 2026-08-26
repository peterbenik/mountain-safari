// ── CONFIG — fill these in ──────────────────────────────
const SHEET_ID = '1blmq_ERUEj5C_2nvrnC05jgJNLLYg4xY2V8butniL-A'; // from the sheet URL: .../d/<THIS_PART>/edit
const SHEET_NAME = 'Leads - M.Safari';                              // tab name
const OWNER_EMAILS = ['info@mountainsafari.sk', 'peterbenik@benzomarketing.com']; // lead notifications
const BUSINESS_NAME = 'Mountain Safari';
const WHATSAPP_PHONE = '421903624085';                   // digits only, country code, no + — keep in sync with content.js whatsapp.phone

// Address customers should see as the sender.
//
// SETUP (once, in the Google account that owns this script):
//   Gmail → Settings → Accounts and Import → "Send mail as" → Add another email
//   address → info@mountainsafari.sk → UNCHECK "Treat as an alias" → SMTP server
//   smtp.websupport.sk, port 465, SSL, username = the full address, password =
//   the mailbox password → confirm the code sent to that mailbox.
//
// Routing through WebSupport's SMTP keeps SPF and DKIM aligned to
// mountainsafari.sk, so no DNS changes are needed. VERIFY after the first test
// booking: open the received mail → "Show original" → SPF/DKIM/DMARC must all
// PASS with domain mountainsafari.sk. If they show gmail.com or
// benzomarketing.com instead, Gmail is relaying through Google and alignment
// failed — switch to a transactional API (Resend/Brevo) with SPF+DKIM at
// WebSupport instead.
//
// senderOptions() below degrades safely: until the alias is verified, mail still
// goes out from the script account, just with the right display name. So this
// code is safe to deploy before or after the Gmail setup.
const FROM_EMAIL = 'info@mountainsafari.sk';
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

// GmailApp.sendEmail() throws if `from` is not a verified alias on the account,
// which would take the whole submission down. So probe the account's aliases and
// only claim the address when it is actually available.
function senderOptions() {
  try {
    if (GmailApp.getAliases().indexOf(FROM_EMAIL) !== -1) {
      return { from: FROM_EMAIL, name: BUSINESS_NAME };
    }
  } catch (err) {
    // getAliases() can fail on a missing scope — fall through to the default.
  }
  return { name: BUSINESS_NAME };
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

    const ownerMailOptions = senderOptions();
    ownerMailOptions.htmlBody = emailShell(ownerBody);
    // Replying in the inbox should reach the customer, not ourselves.
    if (data.email) ownerMailOptions.replyTo = data.email;
    const stripNewlines = (s) => String(s || '—').replace(/[\r\n]+/g, ' ').trim() || '—';
    const ownerSubject = '🟢 Nová rezervácia · ' + stripNewlines(data.vystup) + ' · ' + stripNewlines(data.meno);
    GmailApp.sendEmail(OWNER_EMAILS.join(','), ownerSubject, ownerPlainText, ownerMailOptions);

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

      const clientMailOptions = senderOptions();
      clientMailOptions.htmlBody = emailShell(clientBody);
      // Customer replies must land in the client's mailbox, not the agency's.
      clientMailOptions.replyTo = FROM_EMAIL;
      GmailApp.sendEmail(data.email, 'Vaša rezervácia je potvrdená — ' + BUSINESS_NAME, clientPlainText, clientMailOptions);
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
