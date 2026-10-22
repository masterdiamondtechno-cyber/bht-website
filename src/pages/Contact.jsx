import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Sparkles,
  MessageCircle,
  Clock,
  Send,
  UserCheck,
  ShieldCheck,
  Building,
} from "lucide-react";
import PageHeader from "../components/PageHeader";
import EnquiryForm from "../components/EnquiryForm";
import { siteConfig } from "../data/features";

export default function Contact() {
  useEffect(() => {
    document.title = "Contact Bachelor’s Hub Technologies | Pune, Maharashtra";
  }, []);

  return (
    <div>
      <PageHeader
        badge="Get in Touch"
        badgeColor="blue"
        title="Let's Talk About Your"
        highlight="Technology Career"
        subtitle="Have questions about courses, syllabus, or upcoming batches? Reach out to our admissions counselor or visit our Pune center."
        breadcrumb={[{ label: "Contact Us" }]}
      />

      <section className="py-16 sm:py-20 bg-gradient-to-b from-blue-50/50 via-slate-50 to-white relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-10 right-10 w-80 h-80 bg-blue-300/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-cyan-300/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Contact Information */}
            <div className="lg:col-span-5 space-y-6">
              {/* Header Box */}
              <div className="bg-white p-7 sm:p-8 rounded-3xl border border-slate-200 shadow-lg space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block mb-1">
                    Admissions Center
                  </span>
                  <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                    Bachelor’s Hub Technologies
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    “Skills Today for a Brighter Tomorrow”
                  </p>
                </div>

                {/* Counselor Info Card */}
                <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                    <UserCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">
                      Admissions &amp; Career Guidance
                    </div>
                    <div className="text-base font-bold text-slate-900">
                      {siteConfig.contactPerson}
                    </div>
                  </div>
                </div>

                {/* Contact List */}
                <div className="space-y-4 text-sm">
                  {/* Phone */}
                  <a
                    href={`tel:${siteConfig.phoneRaw}`}
                    className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-50 hover:bg-blue-50/60 border border-slate-200 hover:border-blue-200 transition-all group"
                  >
                    <div className="p-2.5 rounded-xl bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-medium">Phone &amp; Direct Call</div>
                      <div className="text-sm font-bold text-slate-900">{siteConfig.phone}</div>
                    </div>
                  </a>

                  {/* WhatsApp */}
                  <a
                    href={siteConfig.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-emerald-50/80 hover:bg-emerald-100/80 border border-emerald-200 transition-all group"
                  >
                    <div className="p-2.5 rounded-xl bg-emerald-600 text-white shadow-xs">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-emerald-700 font-medium">WhatsApp Direct Chat</div>
                      <div className="text-sm font-bold text-emerald-900">+91 95454 84931</div>
                    </div>
                  </a>

                  {/* Email */}
                  <a
                    href={`mailto:${siteConfig.publicEmail}`}
                    className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-50 hover:bg-cyan-50/60 border border-slate-200 hover:border-cyan-200 transition-all group"
                  >
                    <div className="p-2.5 rounded-xl bg-cyan-100 text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white transition-colors">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="overflow-hidden">
                      <div className="text-xs text-slate-500 font-medium">Official Email</div>
                      <div className="text-xs font-bold text-slate-900 truncate">
                        {siteConfig.publicEmail}
                      </div>
                    </div>
                  </a>

                  {/* Location */}
                  <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="p-2.5 rounded-xl bg-purple-100 text-purple-600 shrink-0 mt-0.5">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-medium">Institute Location</div>
                      <div className="text-sm font-bold text-slate-900">{siteConfig.fullAddress}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Working Hours & Counseling Note */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 text-xs text-slate-600 space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <Clock className="w-4 h-4 text-blue-600" /> Counseling Support Hours
                </div>
                <p>
                  Monday – Saturday: 9:00 AM – 7:30 PM (IST)
                </p>
                <p className="text-slate-500">
                  Sunday: Prior appointment / WhatsApp enquiries only.
                </p>
              </div>
            </div>

            {/* Right Contact Form */}
            <div className="lg:col-span-7">
              <EnquiryForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
