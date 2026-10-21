import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Send,
  CheckCircle2,
  Phone,
  Mail,
  User,
  Sparkles,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import confetti from "canvas-confetti";
import Button from "./Button";
import { siteConfig } from "../data/features";
import { submitEnquiryToBackend } from "../services/apiService";
import { sendEnquiryEmail, isEmailConfigured } from "../services/emailService";

export default function EnquiryForm({ defaultCourse = "", compact = false }) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    course: defaultCourse || "Java Full Stack with AI",
    education: "B.E. / B.Tech (CS / IT / ECE / Others)",
    experience: "Fresh Graduate (Looking for Job)",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const lastSubmitTimeRef = useRef(0);

  const [prevDefaultCourse, setPrevDefaultCourse] = useState(defaultCourse);
  if (defaultCourse !== prevDefaultCourse) {
    setPrevDefaultCourse(defaultCourse);
    setFormData((prev) => ({ ...prev, course: defaultCourse }));
  }

  const coursesList = [
    "Java Full Stack with AI",
    "Python Full Stack with AI",
    "Data Analytics",
  ];

  const educationList = [
    "B.E. / B.Tech (CS / IT / ECE / Others)",
    "BCA / MCA",
    "B.Sc / M.Sc (Computer Science / IT / Stats)",
    "B.Com / BBA / Non-IT Degree",
    "Diploma / Polytechnic",
    "Other Degree",
  ];

  const experienceList = [
    "Fresh Graduate (Looking for Job)",
    "Final Year College Student",
    "Working Professional (Non-IT Transition)",
    "Junior IT Professional (Upgrading Skills)",
    "Career Break / Re-entering IT",
  ];

  const validate = () => {
    const newErrors = {};

    const trimmedName = formData.fullName.trim();
    if (!trimmedName) {
      newErrors.fullName = "Please enter your full name.";
    } else if (trimmedName.length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters.";
    }

    const trimmedPhone = formData.phone.trim();
    const phoneDigits = trimmedPhone.replace(/\D/g, "");
    if (!trimmedPhone) {
      newErrors.phone = "Please enter your mobile number.";
    } else if (
      phoneDigits.length < 10 ||
      phoneDigits.length > 15 ||
      !/^[0-9+\s-]{10,18}$/.test(trimmedPhone)
    ) {
      newErrors.phone = "Please enter a valid mobile number (10-15 digits).";
    }

    const trimmedEmail = formData.email.trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!trimmedEmail) {
      newErrors.email = "Please enter your email address.";
    } else if (!emailRegex.test(trimmedEmail)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.course || !formData.course.trim()) {
      newErrors.course = "Please select a course.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent repeated clicks while submitting
    const now = Date.now();
    if (isSubmitting || now - lastSubmitTimeRef.current < 2500) {
      return;
    }

    if (!validate()) return;

    lastSubmitTimeRef.current = now;
    setIsSubmitting(true);
    setSubmitError("");

    try {
      // 1. Submit to Node.js + Express + MySQL backend
      const backendResult = await submitEnquiryToBackend(formData);

      if (!backendResult.success) {
        setIsSubmitting(false);
        setSubmitError(
          backendResult.error ||
            "Unable to submit enquiry to server. Please check your connection and try again."
        );
        return;
      }

      // 2. Trigger EmailJS notification in parallel if configured
      if (isEmailConfigured()) {
        sendEnquiryEmail(formData).catch(() => {
          // Safe non-blocking background notification
        });
      }

      setIsSubmitting(false);
      setIsSubmitted(true);

      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#2563EB", "#06B6D4", "#10B981", "#7C3AED"],
        });
      } catch {}
    } catch (err) {
      setIsSubmitting(false);
      setSubmitError(
        err?.message ||
          "An unexpected error occurred while sending your enquiry. Please try again."
      );
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setSubmitError("");
    setErrors({});
    setFormData({
      fullName: "",
      phone: "",
      email: "",
      course: defaultCourse || "Java Full Stack with AI",
      education: "B.E. / B.Tech (CS / IT / ECE / Others)",
      experience: "Fresh Graduate (Looking for Job)",
      message: "",
    });
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/90 shadow-xl relative overflow-hidden">
      {/* Decorative accent top bar */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600" />

      {isSubmitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-8 px-2 sm:px-4"
        >
          {/* Main Success Checkmark */}
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-5 shadow-inner">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
            Enquiry Submitted Successfully!
          </h3>

          <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto mb-6">
            Thank you, <strong className="text-slate-800">{formData.fullName}</strong>! Your
            admission enquiry for <strong className="text-blue-600">{formData.course}</strong> has
            been delivered to our admissions team at{" "}
            <span className="font-semibold text-slate-800">{siteConfig.email}</span>.
          </p>

          {/* Simple, Professional Confirmation Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 max-w-md mx-auto mb-6 text-left space-y-3 text-xs sm:text-sm">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm pb-2 border-b border-slate-200">
              <Sparkles className="w-4 h-4 text-blue-600" />
              What Happens Next:
            </div>
            <p className="text-slate-600 text-xs leading-relaxed">
              Our Admissions &amp; Career Counselor (
              <strong className="text-slate-900">{siteConfig.contactPerson}</strong>) will review
              your enquiry and contact you directly with the full curriculum, upcoming batch timings,
              and fee guidance.
            </p>
            <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-200/70">
              Direct Contact: <strong>{siteConfig.phone}</strong> | Center:{" "}
              <strong>{siteConfig.location}</strong>
            </div>
          </div>

          {/* Submit Another Enquiry Button */}
          <div>
            <button
              onClick={handleReset}
              className="px-6 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition-colors"
            >
              Submit Another Enquiry
            </button>
          </div>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              Apply / Request Program Details
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Fill in your details below and our admissions team will share the complete syllabus,
              upcoming batch timings, and fee guidance.
            </p>
          </div>

          {/* Inline Error Message */}
          {submitError && (
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-800 space-y-1">
              <div className="font-bold flex items-center gap-1.5 text-sm text-red-900">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                Submission Failed
              </div>
              <p>{submitError}</p>
            </div>
          )}

          {/* Full Name & Mobile Number */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Rahul Sharma"
                  disabled={isSubmitting}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm text-slate-900 bg-slate-50/50 focus:bg-white transition-all focus:outline-none focus:ring-2 ${
                    errors.fullName
                      ? "border-red-400 focus:ring-red-400/20"
                      : "border-slate-300 focus:border-blue-500 focus:ring-blue-500/20"
                  }`}
                />
              </div>
              {errors.fullName && (
                <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="e.g. 9876543210"
                  disabled={isSubmitting}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm text-slate-900 bg-slate-50/50 focus:bg-white transition-all focus:outline-none focus:ring-2 ${
                    errors.phone
                      ? "border-red-400 focus:ring-red-400/20"
                      : "border-slate-300 focus:border-blue-500 focus:ring-blue-500/20"
                  }`}
                />
              </div>
              {errors.phone && (
                <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
              )}
            </div>
          </div>

          {/* Email & Course Interested In */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. rahul@example.com"
                  disabled={isSubmitting}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm text-slate-900 bg-slate-50/50 focus:bg-white transition-all focus:outline-none focus:ring-2 ${
                    errors.email
                      ? "border-red-400 focus:ring-red-400/20"
                      : "border-slate-300 focus:border-blue-500 focus:ring-blue-500/20"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Course Interested In <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-900 bg-slate-50/50 focus:bg-white transition-all focus:outline-none focus:ring-2 cursor-pointer ${
                    errors.course
                      ? "border-red-400 focus:ring-red-400/20"
                      : "border-slate-300 focus:border-blue-500 focus:ring-blue-500/20"
                  }`}
                >
                  {coursesList.map((c) => (
                    <option key={c} value={c}>
                      {c} (6 Months / 120 Days)
                    </option>
                  ))}
                </select>
              </div>
              {errors.course && (
                <p className="text-xs text-red-500 mt-1">{errors.course}</p>
              )}
            </div>
          </div>

          {/* Current Education & Experience Level (only in full mode) */}
          {!compact && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Current Education
                </label>
                <div className="relative">
                  <select
                    name="education"
                    value={formData.education}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 bg-slate-50/50 focus:bg-white transition-all focus:outline-none focus:ring-2 focus:border-blue-500 focus:ring-blue-500/20 cursor-pointer"
                  >
                    {educationList.map((edu) => (
                      <option key={edu} value={edu}>
                        {edu}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Experience Level
                </label>
                <div className="relative">
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 bg-slate-50/50 focus:bg-white transition-all focus:outline-none focus:ring-2 focus:border-blue-500 focus:ring-blue-500/20 cursor-pointer"
                  >
                    {experienceList.map((exp) => (
                      <option key={exp} value={exp}>
                        {exp}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Message or Specific Questions (Optional) */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Message or Specific Questions (Optional)
            </label>
            <textarea
              name="message"
              rows={compact ? 2 : 3}
              value={formData.message}
              onChange={handleChange}
              disabled={isSubmitting}
              placeholder="Ask about batch timings, classroom mode, or syllabus specifics..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 bg-slate-50/50 focus:bg-white transition-all focus:outline-none focus:ring-2 focus:border-blue-500 focus:ring-blue-500/20 resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <Button
              type="submit"
              variant="gradient"
              size="lg"
              className="w-full font-bold shadow-lg"
              disabled={isSubmitting}
              icon={
                isSubmitting ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )
              }
            >
              {isSubmitting ? "Submitting Your Enquiry..." : "Submit Enquiry"}
            </Button>
          </div>

          {/* Counselor Direct Contact note */}
          <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
            <div className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-blue-600" />
              <span>
                Counselor: <strong>{siteConfig.contactPerson}</strong> ({siteConfig.phone})
              </span>
            </div>
            <span className="text-[11px] text-slate-400">
              *Your information is completely confidential.
            </span>
          </div>
        </form>
      )}
    </div>
  );
}
