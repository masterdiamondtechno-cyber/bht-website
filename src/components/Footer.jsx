import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  Sparkles,
  ArrowUpRight,
  MessageCircle,
  GraduationCap,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { siteConfig } from "../data/features";

export default function Footer() {
  const quickLinks = [
    { name: "Home", to: "/" },
    { name: "About Us", to: "/about" },
    { name: "All Courses", to: "/courses" },
    { name: "Placement Assistance", to: "/placements" },
    { name: "Admissions & Enquiry", to: "/admissions" },
    { name: "FAQ", to: "/faq" },
    { name: "Contact Us", to: "/contact" },
  ];

  const courseLinks = [
    {
      name: "Java Full Stack with AI",
      to: "/courses/java-full-stack-ai",
      duration: "6 Months / 120 Days",
    },
    {
      name: "Python Full Stack with AI",
      to: "/courses/python-full-stack-ai",
      duration: "6 Months / 120 Days",
    },
    {
      name: "Data Analytics",
      to: "/courses/data-analytics",
      duration: "6 Months / 120 Days",
    },
  ];

  return (
    <footer className="bg-[#0F172A] text-slate-300 relative overflow-hidden pt-16 pb-12 border-t border-slate-800">
      {/* Decorative Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Highlight Banner */}
        <div className="bg-gradient-to-r from-blue-900/60 via-slate-800 to-slate-900 border border-blue-500/20 rounded-2xl p-6 sm:p-8 mb-14 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-cyan-300 border border-blue-400/30 mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Next Batches Enrolling Now
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Start Your Journey with Bachelor’s Hub Technologies
            </h3>
            <p className="text-slate-400 text-sm mt-1">
              "Learn. Build. Grow. Get Hired." — Take the first step toward a high-growth tech career.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/admissions"
              className="px-6 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg hover:shadow-cyan-500/20 hover:scale-105"
            >
              Start Your Career Journey
            </Link>
            <a
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition-all shadow-lg hover:shadow-emerald-600/20 hover:scale-105"
            >
              <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-flex items-center gap-3 bg-white p-2.5 rounded-2xl shadow-md border border-slate-700/50">
              <img
                src="/bht-logo.jpg"
                alt="Bachelor’s Hub Technologies"
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-sm font-semibold text-cyan-400 tracking-wide">
              “{siteConfig.tagline}”
            </p>
            <p className="text-sm text-slate-400 leading-relaxed">
              Bachelor’s Hub Technologies is an elite job-oriented IT training institute in Pune dedicated to bridging the academic-industry gap through practical coding, real-world projects, and next-generation AI workflows.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-slate-400 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Job-Oriented Training • Real-World Projects • AI Integrated</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-white text-base font-bold tracking-tight border-b border-slate-800 pb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span> Quick Links
            </h4>
            <ul className="grid grid-cols-1 gap-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.to}
                    className="text-sm text-slate-400 hover:text-cyan-300 transition-colors flex items-center gap-1.5 group"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-cyan-400 transition-colors" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-white text-base font-bold tracking-tight border-b border-slate-800 pb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-500"></span> Programs
            </h4>
            <ul className="space-y-3">
              {courseLinks.map((course) => (
                <li key={course.name}>
                  <Link
                    to={course.to}
                    className="block group p-2 rounded-xl bg-slate-800/40 hover:bg-slate-800 border border-slate-800 hover:border-blue-500/40 transition-all"
                  >
                    <div className="text-sm font-semibold text-slate-200 group-hover:text-cyan-300 transition-colors">
                      {course.name}
                    </div>
                    <div className="text-xs text-slate-500 group-hover:text-slate-400">
                      {course.duration}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-white text-base font-bold tracking-tight border-b border-slate-800 pb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Admissions Contact
            </h4>
            <div className="space-y-3 text-sm">
              <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-400">Admissions &amp; Career Guidance</div>
                <div className="font-bold text-white text-sm mt-0.5">{siteConfig.contactPerson}</div>
              </div>

              <a
                href={`tel:${siteConfig.phoneRaw}`}
                className="flex items-center gap-3 text-slate-300 hover:text-cyan-300 transition-colors p-2 rounded-lg hover:bg-slate-800/60"
              >
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-slate-400">Phone / WhatsApp</div>
                  <div className="font-medium text-white">{siteConfig.phone}</div>
                </div>
              </a>

              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-3 text-slate-300 hover:text-cyan-300 transition-colors p-2 rounded-lg hover:bg-slate-800/60"
              >
                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs text-slate-400">Email</div>
                  <div className="font-medium text-white truncate text-xs">{siteConfig.email}</div>
                </div>
              </a>

              <div className="flex items-start gap-3 text-slate-300 p-2">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-slate-400">Location</div>
                  <div className="font-medium text-white">{siteConfig.location}</div>
                  <div className="text-[11px] text-slate-500 italic mt-0.5">{siteConfig.addressNote}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center sm:text-left">
          <div>
            © 2026 <span className="text-slate-300 font-semibold">{siteConfig.name}</span>. All Rights Reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="text-slate-400 font-medium">“Skills Today for a Brighter Tomorrow”</span>
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
