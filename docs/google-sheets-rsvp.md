# Google Sheets RSVP

Each wedding can save RSVP responses to its own Google Sheet. The React app never holds Google credentials. Guests post JSON to a Google Apps Script Web App URL stored on that wedding’s configuration (`rsvp.apiUrl`) or, for local demos, in `VITE_RSVP_API_URL`.

## Architecture

```text
Guest
  → RSVP form
  → POST (text/plain JSON body)
  → Google Apps Script Web App
  → Google Sheet row
```

`Content-Type: text/plain` is used so the browser treats the request as “simple” and does not send a CORS preflight. The script still parses the body as JSON.

## 1. Create a Google Sheet

1. Open [Google Sheets](https://sheets.google.com) and create a spreadsheet (for example, `Allyzza & Kenneth RSVPs`).
2. Rename the first sheet to `RSVPs` (or keep `Sheet1` and update `SHEET_NAME` in the script).
3. In row 1, add these headers:

| A | B | C | D | E | F |
| --- | --- | --- | --- | --- | --- |
| Timestamp | Full Name | Email Address | Attendance | Number of Guests | Message |

## 2. Open Apps Script

In the spreadsheet: **Extensions → Apps Script**. Delete any placeholder code.

## 3. Paste this script

```javascript
const SHEET_NAME = "RSVPs";

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonOutput({ success: false, message: "Empty request body." }, 400);
    }

    const data = JSON.parse(e.postData.contents);

    const fullName = String(data.fullName || "").trim();
    const email = String(data.email || "").trim();
    const attendance = String(data.attendance || "").trim();
    const numberOfGuests = data.numberOfGuests === "" || data.numberOfGuests == null
      ? ""
      : Number(data.numberOfGuests);
    const message = String(data.message || "").trim();

    if (!fullName) {
      return jsonOutput({ success: false, message: "Full name is required." });
    }
    if (!email || email.indexOf("@") === -1) {
      return jsonOutput({ success: false, message: "A valid email is required." });
    }
    if (attendance !== "accepts" && attendance !== "declines") {
      return jsonOutput({ success: false, message: "Attendance must be accepts or declines." });
    }

    const sheet = SpreadsheetApp.getActive().getSheetByName(SHEET_NAME);
    if (!sheet) {
      return jsonOutput({ success: false, message: "RSVP sheet was not found." });
    }

    const timestamp = new Date();

    sheet.appendRow([
      timestamp,
      fullName,
      email,
      attendance,
      numberOfGuests,
      message,
    ]);

    return jsonOutput({
      success: true,
      message: "Your RSVP has been received.",
    });
  } catch (error) {
    return jsonOutput({
      success: false,
      message: "Something went wrong. Please try again.",
    });
  }
}

function jsonOutput(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
```

Timestamps are created on the server (`new Date()`), not by the guest’s browser.

## 4. Deploy as a Web App

1. Click **Deploy → New deployment**.
2. Select type **Web app**.
3. Description: `Wedding RSVP`.
4. **Execute as:** Me.
5. **Who has access:** Anyone (required so guests can submit without a Google account).
6. Click **Deploy** and authorize the script when prompted.
7. Copy the **Web app URL** (`https://script.google.com/macros/s/.../exec`).

If you edit the script later, create a **New version** (or a new deployment) so the live URL serves the updated code.

## 5. Configure the wedding

In the wedding config file (for example `src/config/weddings/allyzza-kenneth.ts`):

```ts
rsvp: {
  enabled: true,
  apiUrl: "https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec",
  allowAdditionalGuests: false,
  maxGuests: 1,
}
```

For local testing without editing config, copy `.env.example` to `.env` and set:

```env
VITE_RSVP_API_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

The form uses `rsvp.apiUrl` when present; otherwise it uses `VITE_RSVP_API_URL`. Never put service-account keys, sheet IDs that you want hidden, or OAuth secrets in the frontend.

## 6. Test an RSVP

1. Run the site (`npm run dev`) and open `/w/your-slug`.
2. Open the invitation, go to RSVP, and submit a test response.
3. Confirm a new row appears in the sheet with a timestamp.

If the request fails:

- Confirm the deployment is a Web App with access **Anyone**.
- Confirm you deployed a new version after script changes.
- Confirm `SHEET_NAME` matches the tab name.
- Confirm the URL is the `/exec` Web App URL, not the script editor URL.

## Duplicate submissions

The website disables the submit button while a request is in flight (`isSubmitting`) and remembers `weddingId + email` in the current browser session. The Apps Script above does not reject duplicate emails. You can add a uniqueness check later by scanning the Email column before `appendRow`.
