# BHT Enquiry Form Integration Guide

This guide explains how your frontend enquiry form sends all admission enquiries to **bht.enquiry123@gmail.com** and records them in a **Google Sheet** (Excel-compatible spreadsheet) without needing any custom backend or database.

---

## 🎯 Architecture Summary

| Destination | Method | Backend Needed? | Cost |
| :--- | :--- | :--- | :--- |
| **Google Sheets** (Excel Compatible) | Google Apps Script Web App | ❌ None | 100% Free |
| **Email to bht.enquiry123@gmail.com** | Google Apps Script `MailApp` and/or EmailJS | ❌ None | 100% Free |
| **Client Backup** | Browser Local Storage (`localStorage`) | ❌ None | Free & Offline |

---

## 🚀 Option 1: Google Sheets + Email (Recommended — 2 Minutes Setup)

This single Google Apps Script handles **BOTH**:
1. Appends each enquiry as a new row in your Google Sheet.
2. Sends an instant formatted email notification to **`bht.enquiry123@gmail.com`**.

### Step 1: Create Your Google Sheet
1. Go to [Google Sheets](https://sheets.new) and create a new blank spreadsheet.
2. Name it: **"BHT Admission Enquiries"**.
3. In Row 1, add these column headers:
   - **A1**: `Timestamp`
   - **B1**: `Full Name`
   - **C1**: `Email Address`
   - **D1**: `Mobile Number`
   - **E1**: `WhatsApp Number`
   - **F1**: `Course`
   - **G1**: `Education`
   - **H1**: `Experience`
   - **I1**: `Message`

### Step 2: Open Google Apps Script
1. In the Google Sheets menu, click **Extensions** > **Apps Script**.
2. Delete any code in the editor and replace it with this complete script:

```javascript
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

    // 1. Append row to Google Sheets
    sheet.appendRow([
      timestamp,
      data.fullName || "",
      data.email || "",
      data.mobile || "",
      data.whatsapp || "",
      data.course || "",
      data.education || "",
      data.experience || "",
      data.message || ""
    ]);

    // 2. Send instant email notification to bht.enquiry123@gmail.com
    var recipient = "bht.enquiry123@gmail.com";
    var subject = "🎓 New Admission Enquiry: " + (data.fullName || "Student") + " - " + (data.course || "General");

    var htmlBody = 
      "<div style='font-family: Arial, sans-serif; max-width: 620px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 14px; overflow: hidden; background: #ffffff;'>" +
        "<div style='background: linear-gradient(135deg, #1e40af, #0284c7); padding: 24px; color: #ffffff; text-align: center;'>" +
          "<h1 style='margin: 0; font-size: 20px; font-weight: bold;'>Bachelor's Hub Technologies</h1>" +
          "<p style='margin: 6px 0 0; font-size: 14px; opacity: 0.9;'>New Course Admission Enquiry Received</p>" +
        "</div>" +
        "<div style='padding: 24px;'>" +
          "<table style='width: 100%; border-collapse: collapse; font-size: 14px;'>" +
            "<tr style='border-bottom: 1px solid #f1f5f9;'><td style='padding: 10px 0; color: #64748b; font-weight: 600; width: 35%;'>Student Name:</td><td style='padding: 10px 0; color: #0f172a; font-weight: bold;'>" + (data.fullName || "") + "</td></tr>" +
            "<tr style='border-bottom: 1px solid #f1f5f9;'><td style='padding: 10px 0; color: #64748b; font-weight: 600;'>Course Interested:</td><td style='padding: 10px 0; color: #2563eb; font-weight: bold;'>" + (data.course || "") + "</td></tr>" +
            "<tr style='border-bottom: 1px solid #f1f5f9;'><td style='padding: 10px 0; color: #64748b; font-weight: 600;'>Mobile Number:</td><td style='padding: 10px 0; color: #0f172a;'><a href='tel:" + (data.mobile || "") + "' style='color: #2563eb; text-decoration: none; font-weight: 600;'>" + (data.mobile || "") + "</a></td></tr>" +
            "<tr style='border-bottom: 1px solid #f1f5f9;'><td style='padding: 10px 0; color: #64748b; font-weight: 600;'>WhatsApp Number:</td><td style='padding: 10px 0; color: #0f172a;'><a href='https://wa.me/" + (data.whatsapp ? data.whatsapp.replace(/\\D/g, "") : "") + "' style='color: #16a34a; text-decoration: none; font-weight: 600;'>" + (data.whatsapp || "") + "</a></td></tr>" +
            "<tr style='border-bottom: 1px solid #f1f5f9;'><td style='padding: 10px 0; color: #64748b; font-weight: 600;'>Email Address:</td><td style='padding: 10px 0; color: #0f172a;'><a href='mailto:" + (data.email || "") + "' style='color: #2563eb; text-decoration: none;'>" + (data.email || "") + "</a></td></tr>" +
            "<tr style='border-bottom: 1px solid #f1f5f9;'><td style='padding: 10px 0; color: #64748b; font-weight: 600;'>Education:</td><td style='padding: 10px 0; color: #0f172a;'>" + (data.education || "N/A") + "</td></tr>" +
            "<tr style='border-bottom: 1px solid #f1f5f9;'><td style='padding: 10px 0; color: #64748b; font-weight: 600;'>Experience Level:</td><td style='padding: 10px 0; color: #0f172a;'>" + (data.experience || "N/A") + "</td></tr>" +
            "<tr><td style='padding: 10px 0; color: #64748b; font-weight: 600; vertical-align: top;'>Message / Query:</td><td style='padding: 10px 0; color: #334155; line-height: 1.5;'>" + (data.message || "None provided") + "</td></tr>" +
          "</table>" +
        "</div>" +
        "<div style='background: #f8fafc; padding: 14px 24px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; text-align: center;'>" +
          "Recorded automatically at " + timestamp + " IST • Bachelor's Hub Technologies" +
        "</div>" +
      "</div>";

    MailApp.sendEmail({
      to: recipient,
      subject: subject,
      htmlBody: htmlBody
    });

    return ContentService.createTextOutput(JSON.stringify({ status: "success", message: "Enquiry recorded and emailed successfully" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

### Step 3: Deploy as Web App
1. In Apps Script, click the blue **Deploy** button at top right > select **New deployment**.
2. Click the gear icon (Select type) > choose **Web app**.
3. Set the options:
   - **Description**: `BHT Enquiry Webhook`
   - **Execute as**: `Me (your Google account)`
   - **Who has access**: **`Anyone`** *(Essential so the website can submit enquiries)*
4. Click **Deploy**.
5. Grant access permissions when prompted by Google.
6. Copy the **Web App URL** (looks like `https://script.google.com/macros/s/.../exec`).

### Step 4: Add URL to `.env`
In your project's `.env` file, paste your Web App URL:
```env
VITE_GOOGLE_SHEETS_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

*That's it! Every submission will now automatically write a row in your Google Sheet and send an email directly to `bht.enquiry123@gmail.com`.*

---

## ⚡ Option 2: EmailJS (Optional Alternative / Dual Delivery)

If you also wish to use EmailJS directly:

1. Create a free account at [EmailJS.com](https://www.emailjs.com/).
2. Add an **Email Service** (e.g., connect Gmail with `bht.enquiry123@gmail.com`).
3. Create an **Email Template** with variables:
   - `{{student_name}}`
   - `{{student_email}}`
   - `{{student_mobile}}`
   - `{{student_whatsapp}}`
   - `{{course_name}}`
   - `{{education}}`
   - `{{experience}}`
   - `{{message}}`
   - `{{submission_time}}`
4. Add your keys to `.env`:
```env
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxx
```

---

## 🔒 Security & Quality Protections Included

- **No Exposed Secrets**: Only public webhook URLs and public keys are used. No private database passwords or backend credentials exist in the client code.
- **Duplicate Prevention**: The form actively blocks repeated submissions from the same mobile or email address within 5 minutes and throttles rapid multi-clicks.
- **Validation**: Strict validation for Full Name, 10-15 digit Mobile number, optional WhatsApp number, valid Email address, and course selection.
- **Offline / Local Backup**: Even if third-party network APIs are temporarily unreachable, all submissions are backed up in browser `localStorage` under `bht_enquiries`.
