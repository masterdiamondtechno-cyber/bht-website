import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, Sparkles, Home } from "lucide-react";

export default function PageHeader({
  badge,
  badgeColor = "blue",
  title,
  highlight,
  subtitle,
  breadcrumb = [],
}) {
  const badgeColors = {
    blue: "bg-blue-100/70 text-blue-700 border-blue-200",
    purple: "bg-purple-100/70 text-purple-700 border-purple-200",
    orange: "bg-orange-100/70 text-orange-700 border-orange-200",
    green: "bg-emerald-100/70 text-emerald-700 border-emerald-200",
    cyan: "bg-cyan-100/70 text-cyan-700 border-cyan-200",
  };

  return (
    <section className="relative bg-gradient-to-b from-blue-50/70 via-slate-50/50 to-white py-14 sm:py-18 border-b border-slate-200/80 overflow-hidden">
      {/* Subtle decorative glow */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-60 h-60 bg-cyan-200/25 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Breadcrumb */}
        {breadcrumb.length > 0 && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 text-xs font-medium text-slate-500 mb-6"
            aria-label="Breadcrumb"
          >
            <Link
              to="/"
              className="hover:text-blue-600 transition-colors flex items-center gap-1"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            {breadcrumb.map((crumb, idx) => (
              <span key={idx} className="flex items-center gap-2">
                <ChevronRight className="w-3 h-3 text-slate-400" />
                {crumb.to ? (
                  <Link
                    to={crumb.to}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-slate-800 font-semibold">{crumb.label}</span>
                )}
              </span>
            ))}
          </motion.nav>
        )}

        {/* Badge */}
        {badge && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="inline-block mb-3.5"
          >
            <span
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase border shadow-2xs ${
                badgeColors[badgeColor] || badgeColors.blue
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              {badge}
            </span>
          </motion.div>
        )}

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight max-w-4xl mx-auto mb-4"
        >
          {title}{" "}
          {highlight && (
            <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
              {highlight}
            </span>
          )}
        </motion.h1>

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
