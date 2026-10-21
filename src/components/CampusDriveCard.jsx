import { useState } from "react";
import {
  Building2,
  MapPin,
  Calendar,
  GraduationCap,
  Clock,
  Briefcase,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Lock,
  ChevronDown,
  ChevronUp,
  Banknote,
  Users,
} from "lucide-react";

export default function CampusDriveCard({
  drive,
  onApplyClick,
  isAuthenticated,
}) {
  const [expanded, setExpanded] = useState(false);

  // Check if deadline has passed
  const isExpired = drive.deadline
    ? new Date(drive.deadline) < new Date(new Date().setHours(0, 0, 0, 0))
    : false;

  const isClosed = drive.status === "closed" || isExpired;

  // Split skills string into tags
  const skillsArray = drive.skills
    ? drive.skills.split(",").map((s) => s.trim()).filter(Boolean)
    : [];

  const formattedDeadline = drive.deadline
    ? new Date(drive.deadline).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Not specified";

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 hover:border-blue-300 shadow-xs hover:shadow-xl transition-all duration-300 p-6 sm:p-7 flex flex-col justify-between relative group overflow-hidden">
      {/* Top Accent Stripe */}
      <div
        className={`absolute top-0 left-0 right-0 h-1.5 ${
          drive.hasApplied
            ? "bg-emerald-500"
            : isClosed
            ? "bg-slate-300"
            : "bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500"
        }`}
      />

      <div>
        {/* Header: Company & Logo & Status */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3.5">
            {drive.company_logo ? (
              <img
                src={drive.company_logo}
                alt={drive.company_name}
                className="w-13 h-13 rounded-2xl object-cover border border-slate-100 shadow-2xs p-1 bg-white shrink-0"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
            ) : null}
            <div
              className={`w-13 h-13 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 font-extrabold text-base flex items-center justify-center shrink-0 shadow-2xs ${
                drive.company_logo ? "hidden" : "flex"
              }`}
            >
              {drive.company_name?.slice(0, 2).toUpperCase() || "CD"}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 text-sm sm:text-base leading-snug group-hover:text-blue-600 transition-colors">
                  {drive.company_name}
                </span>
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" title="Verified Campus Partner" />
              </div>
              <h3 className="font-extrabold text-slate-950 text-base sm:text-lg tracking-tight mt-0.5">
                {drive.job_title}
              </h3>
            </div>
          </div>

          {/* Status Badge */}
          {drive.hasApplied ? (
            <span className="shrink-0 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Applied
            </span>
          ) : isClosed ? (
            <span className="shrink-0 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-500 border border-slate-200">
              Closed
            </span>
          ) : (
            <span className="shrink-0 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              Active Drive
            </span>
          )}
        </div>

        {/* Badges / Quick Highlights */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-700">
            <MapPin className="w-3.5 h-3.5 text-slate-500" />
            {drive.location}
          </span>

          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-700">
            <Briefcase className="w-3.5 h-3.5 text-slate-500" />
            {drive.job_type || "Full Time"}
          </span>

          {drive.salary && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
              <Banknote className="w-3.5 h-3.5 text-emerald-600" />
              {drive.salary}
            </span>
          )}

          {drive.applicant_count !== undefined && (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium bg-purple-50 text-purple-700 border border-purple-100">
              <Users className="w-3 h-3 text-purple-600" />
              {drive.applicant_count} Applied
            </span>
          )}
        </div>

        {/* Detailed Grid: Eligibility & Batch & Deadline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 p-3.5 bg-slate-50/80 rounded-2xl border border-slate-100 text-xs mb-4">
          <div>
            <span className="text-slate-400 font-medium block">Eligibility:</span>
            <span className="font-semibold text-slate-800 line-clamp-1" title={drive.eligibility}>
              {drive.eligibility}
            </span>
          </div>

          <div>
            <span className="text-slate-400 font-medium block">Target Batch:</span>
            <span className="font-semibold text-slate-800 flex items-center gap-1">
              <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
              {drive.batch}
            </span>
          </div>

          <div className="sm:col-span-2 pt-1 border-t border-slate-200/50 flex items-center justify-between">
            <span className="text-slate-500 flex items-center gap-1 font-medium">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              Last Date to Apply:
            </span>
            <span
              className={`font-bold ${
                isExpired ? "text-red-500 line-through" : "text-amber-700"
              }`}
            >
              {formattedDeadline}
            </span>
          </div>
        </div>

        {/* Skills Required Tags */}
        {skillsArray.length > 0 && (
          <div className="mb-4">
            <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400 block mb-1.5">
              Key Skills Required
            </span>
            <div className="flex flex-wrap gap-1.5">
              {skillsArray.map((skill, i) => (
                <span
                  key={i}
                  className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-100"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Description / Overview (Expandable) */}
        {drive.description && (
          <div className="mb-5">
            <p
              className={`text-xs sm:text-sm text-slate-600 leading-relaxed ${
                expanded ? "" : "line-clamp-2"
              }`}
            >
              {drive.description}
            </p>
            {drive.description.length > 120 && (
              <button
                type="button"
                onClick={() => setExpanded(!expanded)}
                className="text-xs text-blue-600 font-semibold hover:underline mt-1 flex items-center gap-0.5"
              >
                {expanded ? (
                  <>
                    Show Less <ChevronUp className="w-3 h-3" />
                  </>
                ) : (
                  <>
                    Read Full Details <ChevronDown className="w-3 h-3" />
                  </>
                )}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Action Button: Apply / Applied / Closed / Login to Apply */}
      <div className="pt-3 border-t border-slate-100 mt-2">
        {drive.hasApplied ? (
          <div className="w-full py-2.5 px-4 rounded-xl text-center text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Application Submitted</span>
          </div>
        ) : isClosed ? (
          <button
            type="button"
            disabled
            className="w-full py-2.5 px-4 rounded-xl text-center text-xs font-bold bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed"
          >
            Applications Closed
          </button>
        ) : (
          <button
            type="button"
            onClick={() => onApplyClick(drive)}
            className="w-full py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 shadow-md shadow-blue-500/20 hover:shadow-lg transition-all transform active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Apply for Drive</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
