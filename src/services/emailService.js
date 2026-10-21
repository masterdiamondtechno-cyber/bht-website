import emailjs from "@emailjs/browser";
import { siteConfig } from "../data/features";

/**
 * Checks whether the required EmailJS environment variables are configured.
 * @returns {boolean}
 */
export function isEmailConfigured() {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  return Boolean(serviceId && templateId && publicKey);
}

/**
 * Sends the student's admission enquiry email to the official BHT email address using EmailJS.
 *
 * @param {Object} data
 * @param {string} data.fullName
 * @param {string} data.phone
 * @param {string} data.email
 * @param {string} data.course
 * @param {string} [data.education]
 * @param {string} [data.experience]
 * @param {string} [data.contactMethod]
 * @param {string} [data.message]
 * @returns {Promise<{ success: boolean, error?: string, status?: number }>}
 */
export async function sendEnquiryEmail(data) {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    return {
      success: false,
      error:
        "EmailJS service is not configured. Please set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY in your local .env file.",
      isConfigurationError: true,
    };
  }

  const templateParams = {
    full_name: data.fullName?.trim() || "",
    mobile: data.phone?.trim() || "",
    email: data.email?.trim() || "",
    course: data.course || "",
    education: data.education || "Not specified",
    experience: data.experience || "Not specified",
    contact_channel: data.contactMethod || "WhatsApp",
    message: data.message?.trim() || "No specific message provided.",
    subject: "New Admission Enquiry - BHT Website",
    to_email: siteConfig.email || "bachelorshubtech@gmail.com",
    submitted_at: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
  };

  try {
    const response = await emailjs.send(
      serviceId,
      templateId,
      templateParams,
      publicKey
    );

    if (response && response.status === 200) {
      return {
        success: true,
        status: response.status,
      };
    }

    return {
      success: false,
      error: response?.text || "Email delivery failed to confirm.",
    };
  } catch (error) {
    // Only capture error text without logging sensitive user personal information
    const errorMessage =
      error?.text ||
      error?.message ||
      "Unable to send enquiry email. Please check network connection or try WhatsApp.";
    return {
      success: false,
      error: errorMessage,
    };
  }
}
