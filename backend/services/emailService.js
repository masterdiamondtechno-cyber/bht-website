import nodemailer from "nodemailer";

/**
 * Validates if SMTP credentials are fully provided in environment variables
 * @returns {boolean}
 */
export function isSmtpConfigured() {
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
  return Boolean(user && pass);
}

/**
 * Creates and returns a Nodemailer transporter instance
 * @returns {nodemailer.Transporter}
 */
export function createTransporter() {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = parseInt(process.env.SMTP_PORT || "465", 10);
  const secure =
    process.env.SMTP_SECURE !== undefined
      ? process.env.SMTP_SECURE === "true"
      : port === 465;

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user: process.env.SMTP_USER?.trim(),
      pass: process.env.SMTP_PASS?.trim(),
    },
    // Connection timeouts
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });
}

/**
 * Formats a clean, readable text representation of the enquiry
 */
function buildPlainText(enquiry) {
  const cleanPhone = (enquiry.phone || "").replace(/\D/g, "");
  return `
==================================================
🎓 NEW ADMISSION ENQUIRY - BHT
==================================================

Enquiry ID: #${enquiry.id || "N/A"}
Received At: ${enquiry.createdAt || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}

STUDENT DETAILS:
--------------------------------------------------
Full Name:           ${enquiry.fullName || enquiry.full_name || "N/A"}
Mobile Number:       ${enquiry.phone || enquiry.mobile || "N/A"}
Email Address:       ${enquiry.email || "N/A"}
Course Interested In:${enquiry.course || "N/A"}
Current Education:   ${enquiry.education || "Not specified"}
Experience Level:    ${enquiry.experience || "Not specified"}

STUDENT MESSAGE / QUESTIONS:
--------------------------------------------------
${enquiry.message || "No specific message provided."}

DIRECT ACTIONS:
--------------------------------------------------
WhatsApp Student: https://wa.me/${cleanPhone}
Call Student:     tel:${cleanPhone}
Reply by Email:   mailto:${enquiry.email}

--------------------------------------------------
Source: Bachelor's Hub Technologies Website
Backend: Express.js + MySQL (Saved to Database)
==================================================
`.trim();
}

/**
 * Formats an HTML email template with BHT branding
 */
function buildHtmlTemplate(enquiry) {
  const cleanPhone = (enquiry.phone || "").replace(/\D/g, "");
  const fullName = enquiry.fullName || enquiry.full_name || "N/A";
  const phone = enquiry.phone || enquiry.mobile || "N/A";
  const email = enquiry.email || "N/A";
  const course = enquiry.course || "N/A";
  const education = enquiry.education || "Not specified";
  const experience = enquiry.experience || "Not specified";
  const message = enquiry.message || "No specific message provided.";
  const enquiryId = enquiry.id ? `#${enquiry.id}` : "Pending";
  const timestamp =
    enquiry.createdAt ||
    new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "short",
    });

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Admission Enquiry</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      line-height: 1.6;
      color: #1e293b;
      background-color: #f8fafc;
      margin: 0;
      padding: 24px 12px;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
      border: 1px solid #e2e8f0;
    }
    .header {
      background: linear-gradient(135deg, #1e40af 0%, #2563eb 50%, #06b6d4 100%);
      padding: 32px 24px;
      color: #ffffff;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 22px;
      font-weight: 800;
      letter-spacing: -0.5px;
    }
    .header p {
      margin: 8px 0 0;
      font-size: 13px;
      color: #e0f2fe;
      font-weight: 500;
    }
    .badge {
      display: inline-block;
      margin-top: 14px;
      padding: 4px 12px;
      background-color: rgba(255, 255, 255, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.35);
      border-radius: 9999px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }
    .content {
      padding: 28px 24px;
    }
    .alert-banner {
      background-color: #ecfdf5;
      border: 1px solid #a7f3d0;
      color: #065f46;
      padding: 12px 16px;
      border-radius: 10px;
      font-size: 13px;
      margin-bottom: 24px;
      display: flex;
      align-items: center;
    }
    .table-container {
      margin-bottom: 24px;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      overflow: hidden;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 14px;
    }
    th, td {
      padding: 12px 16px;
      text-align: left;
    }
    tr:nth-child(even) {
      background-color: #f8fafc;
    }
    tr:not(:last-child) {
      border-bottom: 1px solid #e2e8f0;
    }
    th {
      width: 35%;
      color: #64748b;
      font-weight: 600;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      vertical-align: top;
    }
    td {
      color: #0f172a;
      font-weight: 600;
    }
    .highlight-course {
      color: #2563eb;
      font-weight: 700;
    }
    .message-card {
      background-color: #f1f5f9;
      border-left: 4px solid #2563eb;
      border-radius: 0 8px 8px 0;
      padding: 14px 18px;
      margin-bottom: 24px;
    }
    .message-card h4 {
      margin: 0 0 6px 0;
      font-size: 12px;
      color: #475569;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .message-card p {
      margin: 0;
      font-size: 13px;
      color: #1e293b;
      white-space: pre-wrap;
    }
    .actions-card {
      text-align: center;
      padding: 16px;
      background: #f8fafc;
      border-radius: 12px;
      border: 1px dashed #cbd5e1;
      margin-bottom: 24px;
    }
    .btn {
      display: inline-block;
      padding: 10px 18px;
      margin: 4px 6px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 600;
      text-decoration: none;
      transition: background-color 0.2s;
    }
    .btn-whatsapp {
      background-color: #10b981;
      color: #ffffff !important;
    }
    .btn-call {
      background-color: #2563eb;
      color: #ffffff !important;
    }
    .btn-email {
      background-color: #0f172a;
      color: #ffffff !important;
    }
    .footer {
      background-color: #f8fafc;
      padding: 20px 24px;
      border-top: 1px solid #e2e8f0;
      text-align: center;
      font-size: 11px;
      color: #94a3b8;
    }
    .footer strong {
      color: #64748b;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Bachelor’s Hub Technologies</h1>
      <p>Admission Enquiry Notification</p>
      <div class="badge">Enquiry ${enquiryId} &bull; MySQL Saved</div>
    </div>

    <div class="content">
      <div class="alert-banner">
        <span>✓ <strong>New Admission Lead:</strong> Form submission was validated and saved to MySQL database successfully.</span>
      </div>

      <div class="table-container">
        <table>
          <tr>
            <th>Full Name</th>
            <td>${fullName}</td>
          </tr>
          <tr>
            <th>Mobile Number</th>
            <td><a href="tel:${cleanPhone}" style="color: #2563eb; text-decoration: none;">${phone}</a></td>
          </tr>
          <tr>
            <th>Email Address</th>
            <td><a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></td>
          </tr>
          <tr>
            <th>Course</th>
            <td class="highlight-course">${course}</td>
          </tr>
          <tr>
            <th>Education</th>
            <td>${education}</td>
          </tr>
          <tr>
            <th>Experience</th>
            <td>${experience}</td>
          </tr>
          <tr>
            <th>Submitted At</th>
            <td style="font-weight: 500; color: #475569;">${timestamp}</td>
          </tr>
        </table>
      </div>

      <div class="message-card">
        <h4>Student Message / Specific Questions</h4>
        <p>${message}</p>
      </div>

      <div class="actions-card">
        <div style="font-size: 12px; color: #64748b; margin-bottom: 10px; font-weight: 600;">
          QUICK ACTIONS
        </div>
        <a href="https://wa.me/${cleanPhone}" target="_blank" class="btn btn-whatsapp">
          WhatsApp Student
        </a>
        <a href="tel:${cleanPhone}" class="btn btn-call">
          Call Phone
        </a>
        <a href="mailto:${email}" class="btn btn-email">
          Reply by Email
        </a>
      </div>
    </div>

    <div class="footer">
      <p style="margin: 0 0 4px;">
        <strong>Bachelor’s Hub Technologies</strong> &bull; Pune, Maharashtra
      </p>
      <p style="margin: 0;">
        This automated notification was generated by the BHT website backend system via Nodemailer &amp; SMTP.
      </p>
    </div>
  </div>
</body>
</html>
`.trim();
}

/**
 * Sends an email notification for a new admission enquiry
 *
 * @param {Object} enquiry
 * @returns {Promise<{ success: boolean, messageId?: string, error?: string, notConfigured?: boolean }>}
 */
export async function sendAdmissionEnquiryEmail(enquiry) {
  const recipient =
    process.env.NOTIFICATION_RECIPIENT_EMAIL?.trim() ||
    "bht.enquiry123@gmail.com";

  // If SMTP credentials are missing, log gracefully and do not break the database flow
  if (!isSmtpConfigured()) {
    const warning =
      "[Email Notification] SMTP credentials not configured (SMTP_USER / SMTP_PASS). Skipping email delivery. Form data is safely saved in MySQL.";
    console.warn(warning);
    return {
      success: false,
      notConfigured: true,
      error:
        "SMTP credentials (SMTP_USER and SMTP_PASS) not configured in backend/.env",
    };
  }

  const senderUser = process.env.SMTP_USER.trim();
  const fromAddress =
    process.env.SMTP_FROM?.trim() ||
    `"Bachelor's Hub Technologies" <${senderUser}>`;

  const fullName = enquiry.fullName || enquiry.full_name || "New Student";
  const course = enquiry.course || "General Enquiry";
  const enquiryId = enquiry.id ? `#${enquiry.id}` : "";

  const mailOptions = {
    from: fromAddress,
    to: recipient,
    replyTo: enquiry.email?.trim() || undefined,
    subject: `🎓 New Admission Enquiry ${enquiryId}: ${fullName} - ${course}`.trim(),
    text: buildPlainText(enquiry),
    html: buildHtmlTemplate(enquiry),
  };

  try {
    const transporter = createTransporter();
    const info = await transporter.sendMail(mailOptions);
    console.log(
      `[Email Notification] Email sent successfully to ${recipient} (Message ID: ${info.messageId})`
    );
    return {
      success: true,
      messageId: info.messageId,
      recipient,
    };
  } catch (error) {
    console.error(
      `[Email Notification] Failed to send email to ${recipient}:`,
      error.message
    );
    return {
      success: false,
      error: error.message,
    };
  }
}
