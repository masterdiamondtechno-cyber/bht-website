import { motion } from "framer-motion";
import { Sparkles, Building2, ShieldAlert } from "lucide-react";
import { targetCompanies } from "../data/features";

export default function CompanyGrid({ showHeading = true }) {
  return (
    <section className="py-16 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showHeading && (
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Career Horizons
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Our Students Get Opportunities In
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3 max-w-2xl mx-auto">
              Our curriculum and interview training are benchmarked so students can prepare for opportunities across leading technology companies.
            </p>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {targetCompanies.map((company, idx) => (
            <motion.div
              key={company.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              whileHover={{ scale: 1.05, y: -4 }}
              className="group p-5 rounded-2xl bg-slate-50/70 hover:bg-white border border-slate-200/80 hover:border-blue-300 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center text-center h-28 cursor-default"
            >
              <Building2 className="w-6 h-6 text-slate-400 group-hover:text-blue-600 transition-colors mb-2" />
              <span className="font-bold text-slate-700 group-hover:text-slate-900 transition-colors text-sm sm:text-base tracking-tight">
                {company.name}
              </span>
              <span className="text-[10px] text-slate-400 group-hover:text-blue-600 transition-colors mt-0.5">
                Target Employer
              </span>
            </motion.div>
          ))}
        </div>

        {/* Disclaimer / Clarification Note */}
        <div className="mt-8 text-center">
          <p className="text-xs text-slate-400 max-w-xl mx-auto flex items-center justify-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
            <span>
              ...and many more high-growth startups and tech enterprises across India.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
