import { useState } from "react";
import {
  X,
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertCircle,
  Building2,
  MapPin,
  Calendar,
  Sparkles,
  Lock,
} from "lucide-react";
import { applyToCampusDrive } from "../services/apiService";

export default function DriveApplicationModal({
  drive,
  user,
  token,
  onClose,
  onSuccess,
}) {
  const [formData, setFormData] = useState({
    full_name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    degree: "B.E / B.Tech",
    branch: "Computer Science & Engineering",
    batch_year: "2025",
    cgpa_percentage: "",
    skills: "",
    note: "",
  });

  const [resumeFile, setResumeFile] = useState(null);
  const [fileError, setFileError] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    setServerError("");
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setFileError("");
    if (!file) {
      setResumeFile(null);
      return;
    }

    // Validate size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setFileError("File size exceeds 5MB limit. Please upload a smaller document.");
      setResumeFile(null);
      return;
    }

    // Validate extension
    const validExtensions = [".pdf", ".doc", ".docx"];
    const ext = "." + file.name.split(".").pop().toLowerCase();
    if (!validExtensions.includes(ext)) {
      setFileError("Invalid file type. Only PDF, DOC, and DOCX files are permitted.");
      setResumeFile(null);
      return;
    }

    setResumeFile(file);
  };

  const validate = () => {
    const errs = {};
    if (!formData.full_name.trim()) errs.full_name = "Full name is required.";
    if (!formData.email.trim()) errs.email = "Email address is required.";
    if (!formData.phone.trim()) errs.phone = "Mobile number is required.";
    if (!formData.degree.trim()) errs.degree = "Degree is required.";
    if (!formData.branch.trim()) errs.branch = "Branch is required.";
    if (!formData.batch_year.trim()) errs.batch_year = "Passing year is required.";
    if (!formData.cgpa_percentage.trim()) errs.cgpa_percentage = "CGPA or Percentage is required.";

    setErrors(errs);
    return Object.keys(errs).length === 0 && !fileError;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setServerError("");

    try {
      const data = new FormData();
      data.append("full_name", formData.full_name.trim());
      data.append("email", formData.email.trim());
      data.append("phone", formData.phone.trim());
      data.append("degree", formData.degree.trim());
      data.append("branch", formData.branch.trim());
      data.append("batch_year", formData.batch_year.trim());
      data.append("cgpa_percentage", formData.cgpa_percentage.trim());
      if (formData.skills.trim()) data.append("skills", formData.skills.trim());
      if (formData.note.trim()) data.append("note", formData.note.trim());
      if (resumeFile) data.append("resume", resumeFile);

      const res = await applyToCampusDrive(drive.id, data, token);

      if (res.success) {
        setIsSuccess(true);
        setTimeout(() => {
          onSuccess(drive.id);
        }, 1200);
      } else {
        setServerError(res.error || "Failed to submit application.");
      }
    } catch {
      setServerError("Network error while submitting application.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 my-auto relative animate-in fade-in zoom-in-95 duration-200 border border-slate-100 max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          disabled={isSubmitting}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-start gap-4 mb-6 pb-4 border-b border-slate-100">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg shrink-0">
            {drive.company_logo ? (
              <img
                src={drive.company_logo}
                alt=""
                className="w-full h-full object-cover rounded-2xl p-1"
              />
            ) : (
              <Building2 className="w-6 h-6" />
            )}
          </div>
          <div className="pr-8">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block">
              Campus Drive Application
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">
              {drive.job_title}
            </h2>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1 font-medium">
              <span className="font-semibold text-slate-800">{drive.company_name}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {drive.location}
              </span>
              <span>•</span>
              <span className="text-amber-600 font-semibold flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                Due: {new Date(drive.deadline).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}
              </span>
            </div>
          </div>
        </div>

        {/* Success View */}
        {isSuccess ? (
          <div className="py-12 text-center">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-200 animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Application Submitted!</h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Your profile and documents have been successfully sent to the placement recruitment team for{" "}
              <strong>{drive.company_name}</strong>.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Feedback Alerts */}
            {serverError && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-start gap-2.5">
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <span>{serverError}</span>
              </div>
            )}

            {/* Student Personal Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  placeholder="e.g. Rahul Sharma"
                  className={`w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                    errors.full_name ? "border-red-400" : "border-slate-200"
                  }`}
                />
                {errors.full_name && <p className="text-xs text-red-500 mt-0.5">{errors.full_name}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className={`w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                    errors.email ? "border-red-400" : "border-slate-200"
                  }`}
                />
                {errors.email && <p className="text-xs text-red-500 mt-0.5">{errors.email}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="9876543210"
                  className={`w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                    errors.phone ? "border-red-400" : "border-slate-200"
                  }`}
                />
                {errors.phone && <p className="text-xs text-red-500 mt-0.5">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                  Degree / Qualification <span className="text-red-500">*</span>
                </label>
                <select
                  name="degree"
                  value={formData.degree}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
                >
                  <option value="B.E / B.Tech">B.E / B.Tech</option>
                  <option value="MCA">MCA</option>
                  <option value="BCA">BCA</option>
                  <option value="B.Sc (IT / CS / Maths)">B.Sc (IT / CS / Maths)</option>
                  <option value="M.Tech">M.Tech</option>
                  <option value="Diploma / Others">Diploma / Others</option>
                </select>
              </div>
            </div>

            {/* Academic Details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                  Branch / Stream <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  placeholder="e.g. CS / IT / ECE"
                  className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
                {errors.branch && <p className="text-xs text-red-500 mt-0.5">{errors.branch}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                  Passing Batch Year <span className="text-red-500">*</span>
                </label>
                <select
                  name="batch_year"
                  value={formData.batch_year}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
                >
                  <option value="2024">2024 Batch</option>
                  <option value="2025">2025 Batch</option>
                  <option value="2026">2026 Batch</option>
                  <option value="2027">2027 Batch</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                  CGPA / Percentage <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="cgpa_percentage"
                  value={formData.cgpa_percentage}
                  onChange={handleChange}
                  placeholder="e.g. 7.8 CGPA or 76%"
                  className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
                {errors.cgpa_percentage && (
                  <p className="text-xs text-red-500 mt-0.5">{errors.cgpa_percentage}</p>
                )}
              </div>
            </div>

            {/* Skills */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Your Key Technical Skills
              </label>
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="e.g. Java, Spring Boot, MySQL, React, Git"
                className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            {/* Resume Upload Box */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Resume / CV Document <span className="text-slate-400 font-normal">(PDF, DOC, DOCX — Max 5MB)</span>
              </label>
              <div className="border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-2xl p-4 bg-slate-50/70 text-center transition-colors">
                <input
                  type="file"
                  id="resume-upload"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label
                  htmlFor="resume-upload"
                  className="cursor-pointer flex flex-col items-center justify-center gap-1.5"
                >
                  <UploadCloud className="w-6 h-6 text-blue-600" />
                  <div className="text-xs sm:text-sm font-semibold text-slate-700">
                    {resumeFile ? (
                      <span className="text-blue-600 flex items-center gap-1">
                        <FileText className="w-4 h-4" />
                        {resumeFile.name} ({(resumeFile.size / 1024 / 1024).toFixed(2)} MB)
                      </span>
                    ) : (
                      <>
                        <span className="text-blue-600 hover:underline">Click to upload resume</span> or drag and drop
                      </>
                    )}
                  </div>
                  <span className="text-[11px] text-slate-400">
                    Standard ATS format recommended (PDF/DOC)
                  </span>
                </label>
              </div>
              {fileError && <p className="text-xs text-red-500 mt-1">{fileError}</p>}
            </div>

            {/* Candidate Note */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Cover Note / Message <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <textarea
                name="note"
                rows="2"
                value={formData.note}
                onChange={handleChange}
                placeholder="Briefly state your projects, notice period, or why you are excited about this role..."
                className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
              />
            </div>

            {/* Modal Actions */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 shadow-md shadow-blue-500/20 hover:shadow-lg transition-all disabled:opacity-60 flex items-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Submitting Application...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm & Submit Application</span>
                    <Sparkles className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
