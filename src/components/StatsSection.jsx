import { motion } from "framer-motion";
import {
  Calendar,
  Layers,
  Sparkles,
  Briefcase,
} from "lucide-react";

export default function StatsSection() {
  const stats = [
    {
      value: "6",
      unit: "Months",
      label: "Training Programs",
      desc: "Full-scale comprehensive career curriculum",
      icon: Calendar,
      color: "text-blue-600 bg-blue-100/70",
    },
    {
      value: "Real-World",
      unit: "Projects",
      label: "Production Portfolio",
      desc: "Deployable full-stack & analytics apps",
      icon: Layers,
      color: "text-purple-600 bg-purple-100/70",
    },
    {
      value: "AI",
      unit: "Integration",
      label: "Next-Gen Tools",
      desc: "ChatGPT, Gemini, LLM APIs & LangChain",
      icon: Sparkles,
      color: "text-orange-600 bg-orange-100/70",
    },
    {
      value: "Placement",
      unit: "Assistance",
      label: "Career Support",
      desc: "Resume, mock interviews & referrals",
      icon: Briefcase,
      color: "text-emerald-600 bg-emerald-100/70",
    },
  ];

  return (
    <section className="bg-gradient-to-b from-[#EFF6FF] via-[#F1F5F9] to-white py-14 border-y border-slate-200/70 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 dot-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-white/90 backdrop-blur-sm p-5 rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-md transition-all text-center flex flex-col items-center justify-between"
              >
                <div className={`p-2.5 rounded-xl mb-3 ${stat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>

                <div className="flex items-baseline justify-center gap-1 mb-1">
                  <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    {stat.value}
                  </span>
                  {stat.unit && (
                    <span className="text-xs sm:text-sm font-bold text-blue-600">
                      {stat.unit}
                    </span>
                  )}
                </div>

                <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                  {stat.label}
                </div>

                <p className="text-[11px] text-slate-500 leading-tight">
                  {stat.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
