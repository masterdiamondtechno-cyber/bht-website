import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, CheckCircle2, Clock, Sparkles } from "lucide-react";

export default function CourseModule({ module, defaultOpen = false, accent = "blue" }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const accentStyles = {
    blue: {
      number: "text-blue-600 bg-blue-50 border-blue-200",
      activeBorder: "border-blue-300 ring-1 ring-blue-500/10",
      check: "text-blue-500",
    },
    orange: {
      number: "text-orange-600 bg-orange-50 border-orange-200",
      activeBorder: "border-orange-300 ring-1 ring-orange-500/10",
      check: "text-orange-500",
    },
    purple: {
      number: "text-purple-600 bg-purple-50 border-purple-200",
      activeBorder: "border-purple-300 ring-1 ring-purple-500/10",
      check: "text-purple-500",
    },
  };

  const style = accentStyles[accent] || accentStyles.blue;

  return (
    <div
      className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
        isOpen
          ? `shadow-md ${style.activeBorder}`
          : "border-slate-200 hover:border-slate-300 shadow-2xs"
      }`}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-5 sm:p-6 flex items-center justify-between text-left gap-4 focus:outline-none"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-4">
          <span
            className={`w-11 h-11 rounded-xl flex items-center justify-center font-mono font-bold text-sm border shrink-0 ${style.number}`}
          >
            {module.number}
          </span>
          <div>
            <div className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              {module.title}
            </div>
            {module.duration && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 mt-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {module.duration}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-block text-xs font-semibold text-slate-400">
            {module.topics?.length || 0} topics
          </span>
          <ChevronDown
            className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${
              isOpen ? "rotate-180 text-blue-600" : ""
            }`}
          />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-100 bg-slate-50/50">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Key Topics &amp; Practical Hands-on
              </div>
              <ul className="space-y-2.5">
                {module.topics?.map((topic, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700 font-normal">
                    <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${style.check}`} />
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
