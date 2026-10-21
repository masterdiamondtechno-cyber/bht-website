import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Sparkles,
  MessageCircle,
  CheckCircle2,
  Calendar,
  Clock,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import PageHeader from "../components/PageHeader";
import EnquiryForm from "../components/EnquiryForm";
import { siteConfig } from "../data/features";

export default function Admissions() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedCourse = searchParams.get("course") || "";

  useEffect(() => {
    document.title = "Admissions & Career Enquiry | Bachelor’s Hub Technologies";
  }, []);

  const admissionSteps = [
    {
      step: "01",
      title: "Submit Enquiry",
      desc: "Fill in the enquiry form with your contact details and course preference.",
    },
    {
      step: "02",
      title: "Counselor Consultation",
      desc: "Our counselor Satish Gadhave will discuss batch timings, fees, and syllabus details with you.",
    },
    {
      step: "03",
      title: "Enrollment & Onboarding",
      desc: "Reserve your seat, receive your course curriculum blueprint, and access pre-course setup guides.",
    },
    {
      step: "04",
      title: "Start 120-Day Training",
      desc: "Begin interactive classroom sessions, daily lab coding drills, and project development.",
    },
  ];

  return (
    <div>
      <PageHeader
        badge="Admissions Open • 6-Month Programs"
        badgeColor="orange"
        title="Start Your"
        highlight="Career Journey"
        subtitle="Take the decisive step toward an exciting tech career. Fill out the application form below or reach out directly to our admissions team."
        breadcrumb={[{ label: "Admissions" }]}
      />

      <section className="py-16 sm:py-20 bg-slate-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Counselor & Admission Guide */}
            <div className="lg:col-span-5 space-y-6">
              {/* Counselor Card */}
              <div className="bg-slate-900 text-white p-7 rounded-3xl shadow-xl border border-slate-800 space-y-5">
                <div className="flex items-center gap-3 bg-white/10 p-3 rounded-2xl border border-white/10">
                  <div className="w-12 h-12 rounded-xl bg-blue-500 text-white flex items-center justify-center font-bold text-lg">
                    <UserCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs text-cyan-300 font-semibold uppercase tracking-wider">
                      Admissions &amp; Career Guidance
                    </div>
                    <div className="text-base font-bold text-white">
                      {siteConfig.contactPerson}
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Have questions regarding eligibility, upcoming batch schedules, or fee structures? Connect directly with our counselor for personalized guidance.
                </p>

                <div className="space-y-3 pt-2">
                  <a
                    href={`tel:${siteConfig.phoneRaw}`}
                    className="flex items-center gap-3 p-3 rounded-xl bg-slate-800 hover:bg-slate-700/80 transition-colors border border-slate-700"
                  >
                    <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400">Phone Call</div>
                      <div className="text-sm font-bold text-white">{siteConfig.phone}</div>
                    </div>
                  </a>

                  <a
                    href={siteConfig.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/60 transition-colors border border-emerald-500/30"
                  >
                    <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                      <MessageCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs text-emerald-300">WhatsApp Instant Chat</div>
                      <div className="text-sm font-bold text-emerald-100">+91 95454 84931</div>
                    </div>
                  </a>

                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="flex items-center gap-3 p-3 rounded-xl bg-slate-800 hover:bg-slate-700/80 transition-colors border border-slate-700"
                  >
                    <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="overflow-hidden">
                      <div className="text-xs text-slate-400">Email Address</div>
                      <div className="text-xs font-bold text-white truncate">{siteConfig.email}</div>
                    </div>
                  </a>

                  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/40 border border-slate-700/60">
                    <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400">Location</div>
                      <div className="text-xs font-bold text-white">{siteConfig.location}</div>
                      <div className="text-[11px] text-slate-400 italic mt-0.5">{siteConfig.addressNote}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Admission Steps */}
              <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
                <h4 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
                  Admissions Process
                </h4>
                <div className="space-y-3">
                  {admissionSteps.map((s) => (
                    <div key={s.step} className="flex items-start gap-3">
                      <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {s.step}
                      </span>
                      <div>
                        <div className="text-xs font-bold text-slate-900">{s.title}</div>
                        <div className="text-xs text-slate-500 leading-snug mt-0.5">{s.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Admission / Enquiry Form */}
            <div className="lg:col-span-7">
              <EnquiryForm defaultCourse={selectedCourse} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
