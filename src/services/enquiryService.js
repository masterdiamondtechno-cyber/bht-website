/**
 * Frontend-Only Enquiry Service for Bachelor's Hub Technologies (BHT)
 * 
 * Supports:
 * 1. Google Sheets Integration (via Google Apps Script Web App - appends row & sends email to bht.enquiry123@gmail.com)
 * 2. EmailJS Direct Frontend Service (sends email to bht.enquiry123@gmail.com via EmailJS REST API)
 * 3. Client-Side Persistent Storage (localStorage backup)
 * 4. Duplicate Submission Protection (throttling & duplicate payload checking)
 * 
 * NO custom backend or database required.
 * No private secrets exposed in client code.
 */

// Target notification email
export const DEFAULT_NOTIFICATION_EMAIL = "bht.enquiry123@gmail.com";

// Vite Environment Variables with live fallbacks
export const ENV_CONFIG = {
  googleSheetsUrl: import.meta.env.VITE_GOOGLE_SHEETS_URL || "",
  emailJsServiceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_qz3effu",
  emailJsTemplateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_uqhyeh9",
  emailJsPublicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "7nvmhf47hg0wDk_MH",
  notificationEmail: import.meta.env.VITE_NOTIFICATION_EMAIL || DEFAULT_NOTIFICATION_EMAIL,
};

/**
 * Check if the submission is a duplicate within the last 5 minutes.
 */
export function isDuplicateSubmission({ email, phone }) {
  try {
    const raw = localStorage.getItem("bht_enquiries");
    if (!raw) return false;
    const enquiries = JSON.parse(raw);
    const now = Date.now();
    const FIVE_MINUTES = 5 * 60 * 1000;

    const cleanInputPhone = (phone || "").replace(/\D/g, "");
    const cleanInputEmail = (email || "").trim().toLowerCase();

    return enquiries.some((item) => {
      const itemPhone = (item.phone || "").replace(/\D/g, "");
      const itemEmail = (item.email || "").trim().toLowerCase();
      const submittedTime = new Date(item.submittedAt).getTime();

      const samePhone = cleanInputPhone && itemPhone && cleanInputPhone === itemPhone;
      const sameEmail = cleanInputEmail && itemEmail && cleanInputEmail === itemEmail;

      return (samePhone || sameEmail) && now - submittedTime < FIVE_MINUTES;
    });
  } catch (e) {
    console.warn("Error checking duplicate submission:", e);
    return false;
  }
}

/**
 * Record enquiry in browser local storage as a secure offline backup.
 */
export function recordLocalEnquiry(data) {
  try {
    const raw = localStorage.getItem("bht_enquiries");
    const enquiries = raw ? JSON.parse(raw) : [];
    const newEntry = {
      id: "ENQ-" + Date.now(),
      ...data,
      recipientEmail: ENV_CONFIG.notificationEmail,
      submittedAt: new Date().toISOString(),
      formattedDate: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    };

    enquiries.unshift(newEntry);
    // Keep the latest 50 enquiries in storage
    localStorage.setItem("bht_enquiries", JSON.stringify(enquiries.slice(0, 50)));
    return newEntry;
  } catch (e) {
    console.warn("Could not save to localStorage:", e);
    return null;
  }
}

/**
 * Send enquiry to Google Sheets Web App (Google Apps Script).
 * Google Apps Script appends the row to Google Sheets and dispatches the notification email.
 */
export async function sendToGoogleSheets(data) {
  if (!ENV_CONFIG.googleSheetsUrl) {
    return { success: false, notConfigured: true };
  }

  const payload = {
    fullName: data.fullName,
    email: data.email,
    mobile: data.phone,
    whatsapp: data.whatsapp || data.phone,
    course: data.course,
    education: data.education || "N/A",
    experience: data.experience || "N/A",
    message: data.message || "None",
    recipientEmail: ENV_CONFIG.notificationEmail,
    timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
  };

  try {
    // Mode no-cors with text/plain prevents CORS preflight issues with Google Apps Script
    await fetch(ENV_CONFIG.googleSheetsUrl, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to post to Google Sheets Web App:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Send enquiry via EmailJS REST API.
 * Uses public client-side credentials without leaking any private keys.
 */
export async function sendViaEmailJS(data) {
  const { emailJsServiceId, emailJsTemplateId, emailJsPublicKey } = ENV_CONFIG;

  if (!emailJsServiceId || !emailJsTemplateId || !emailJsPublicKey) {
    return { success: false, notConfigured: true };
  }

  const rawWhatsapp = (data.whatsapp || data.phone || "").replace(/\D/g, "");
  const whatsappFormatted = rawWhatsapp.length === 10 ? `91${rawWhatsapp}` : rawWhatsapp;
  const whatsappChatUrl = `https://wa.me/${whatsappFormatted}`;
  const phoneCallUrl = `tel:${data.phone}`;
  const emailMailtoUrl = `mailto:${data.email}`;

  const cleanOwnerMessage = [
    `NEW ADMISSION LEAD FOR BHT`,
    ``,
    `Candidate Name: ${data.fullName}`,
    `Course Applied: ${data.course}`,
    ``,
    `--- Quick Contact Options ---`,
    `Mobile Call: ${data.phone}`,
    `WhatsApp Chat: ${whatsappChatUrl}`,
    `Email Address: ${data.email}`,
    ``,
    `--- Candidate Background ---`,
    `Education: ${data.education || "N/A"}`,
    `Experience Level: ${data.experience || "N/A"}`,
    `Candidate Note: ${data.message || "No specific note provided"}`,
    ``,
    `Received at: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}`,
  ].join("\n");

  const payload = {
    service_id: emailJsServiceId,
    template_id: emailJsTemplateId,
    user_id: emailJsPublicKey,
    template_params: {
      // Recipient routing: ensure email delivers directly to bht.enquiry123@gmail.com
      email: ENV_CONFIG.notificationEmail,
      to_email: ENV_CONFIG.notificationEmail,
      recipient: ENV_CONFIG.notificationEmail,
      user_email: ENV_CONFIG.notificationEmail,

      // Candidate details for owner's direct action
      name: data.fullName,
      from_name: data.fullName,
      reply_to: data.email,
      from_email: data.email,
      student_email: data.email,
      candidate_name: data.fullName,
      candidate_email: data.email,
      candidate_phone: data.phone,
      candidate_whatsapp: data.whatsapp || data.phone,
      candidate_course: data.course,
      candidate_education: data.education || "N/A",
      candidate_experience: data.experience || "N/A",
      candidate_message: data.message || "None",

      // Contact action links for one-click response
      phone: data.phone,
      mobile: data.phone,
      student_mobile: data.phone,
      whatsapp: data.whatsapp || data.phone,
      student_whatsapp: data.whatsapp || data.phone,
      whatsapp_link: whatsappChatUrl,
      call_link: phoneCallUrl,
      email_link: emailMailtoUrl,

      // Course and notification details
      course: data.course,
      course_name: data.course,
      education: data.education || "N/A",
      experience: data.experience || "N/A",
      subject: `New Lead: ${data.fullName} interested in ${data.course}`,
      to_name: "Institute Director / Admissions",

      // Fallback message text if template uses {{message}}
      message: cleanOwnerMessage,
      summary: cleanOwnerMessage,
      enquiry_id: Math.floor(100 + Math.random() * 900).toString(),
      enquiry_number: Math.floor(100 + Math.random() * 900).toString(),
      submission_time: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    },
  };

  try {
    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errMessage = await response.text();
      throw new Error(`EmailJS error (${response.status}): ${errMessage}`);
    }

    return { success: true };
  } catch (error) {
    console.error("Failed to send via EmailJS:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Master Submit Function
 * Coordinates duplicate check, local backup, Google Sheets row append, and email notification.
 */
export async function submitEnquiry(formData) {
  // 1. Guard against duplicate submissions within 5 minutes
  if (isDuplicateSubmission(formData)) {
    throw new Error(
      `We have already received an enquiry with this mobile/email within the last 5 minutes. Our admissions team is already reviewing it and will reach out to you shortly!`
    );
  }

  // 2. Save local backup record
  recordLocalEnquiry(formData);

  // 3. Dispatch to third-party endpoints concurrently
  const [sheetsResult, emailJsResult] = await Promise.allSettled([
    sendToGoogleSheets(formData),
    sendViaEmailJS(formData),
  ]);

  const emailRes = emailJsResult.status === "fulfilled" ? emailJsResult.value : null;
  const sheetsRes = sheetsResult.status === "fulfilled" ? sheetsResult.value : null;

  if (emailRes && emailRes.error) {
    throw new Error(`Email service error: ${emailRes.error}`);
  }

  return {
    success: true,
    data: formData,
    sheetsResult: sheetsRes,
    emailJsResult: emailRes,
  };
}
