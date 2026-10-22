import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, ShieldCheck } from "lucide-react";
import { siteConfig } from "../data/features";

const footerEmail = "info@bachelorshubtech.com";
const footerAddress =
  "Bachelor's Hub Technologies, Lane No. 1, Near Warje Octroi Post, Datta Digambar Colony Road, Pune, Maharashtra 411052";

export default function Footer() {
  return (
    <footer className="bg-[#0F172A] text-slate-300 relative overflow-hidden py-8 sm:py-10 border-t border-slate-800">
      {/* Decorative Glows */}
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Grid: Brand info & Admissions Contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 pb-6 border-b border-slate-800">
          {/* Brand Info */}
          <div className="space-y-3">
            <Link to="/" className="inline-flex items-center gap-3 bg-white p-2 rounded-xl shadow-md border border-slate-700/50">
              <img
                src="/bht-logo.jpg"
                alt="Bachelor’s Hub Technologies"
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="text-xs sm:text-sm font-semibold text-cyan-400 tracking-wide">
              “{siteConfig.tagline}”
            </p>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md">
              Bachelor’s Hub Technologies is an elite job-oriented IT training institute in Pune dedicated to practical coding, real-world projects, and next-generation AI workflows.
            </p>
            <div className="pt-1 flex items-center gap-2 text-xs text-slate-400 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Job-Oriented Training • Real-World Projects • AI Integrated</span>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-white text-sm font-bold tracking-tight border-b border-slate-800 pb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Admissions Contact
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm">
              <a
                href={`tel:${siteConfig.phoneRaw}`}
                className="flex items-center gap-2.5 text-slate-300 hover:text-cyan-300 transition-colors p-2 rounded-lg bg-slate-800/40 hover:bg-slate-800 border border-slate-800/80"
              >
                <div className="p-1.5 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20 shrink-0">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <div className="overflow-hidden">
                  <div className="text-[10px] text-slate-400">Phone / WhatsApp</div>
                  <div className="font-medium text-white truncate text-xs">{siteConfig.phone}</div>
                </div>
              </a>

              <a
                href={`mailto:${footerEmail}`}
                className="flex items-center gap-2.5 text-slate-300 hover:text-cyan-300 transition-colors p-2 rounded-lg bg-slate-800/40 hover:bg-slate-800 border border-slate-800/80"
              >
                <div className="p-1.5 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <div className="overflow-hidden">
                  <div className="text-[10px] text-slate-400">Official Email</div>
                  <div className="font-medium text-white truncate text-xs">{footerEmail}</div>
                </div>
              </a>

              <div className="sm:col-span-2 flex items-start gap-2.5 text-slate-300 p-2 rounded-lg bg-slate-800/40 border border-slate-800/80">
                <div className="p-1.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400">Location</div>
                  <div className="font-medium text-white text-xs leading-relaxed">
                    {footerAddress}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 text-center sm:text-left">
          <div>
            © 2026 <span className="text-slate-300 font-semibold">{siteConfig.name}</span>. All Rights Reserved.
          </div>
          <div className="flex items-center gap-5">
            <span className="text-slate-400 font-medium hidden md:inline">“Skills Today for a Brighter Tomorrow”</span>
            <Link to="/faq" className="hover:text-slate-300 transition-colors">
              FAQ
            </Link>
            <Link to="/contact" className="hover:text-slate-300 transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
