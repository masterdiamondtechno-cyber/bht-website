import { motion } from "framer-motion";
import {
  BookOpenCheck,
  GraduationCap,
  Laptop,
  ClipboardCheck,
  Sparkles,
  Briefcase,
  Layers,
  Code2,
  Users,
  Target,
  FileCheck,
  Cpu,
} from "lucide-react";

export default function FeatureCard({
  feature,
  index = 0,
  icon,
  title,
  description,
  number,
  tag,
  color = "blue",
}) {
  const iconLookup = {
    BookOpenCheck,
    GraduationCap,
    Laptop,
    ClipboardCheck,
    Sparkles,
    Briefcase,
    Layers,
    Code2,
    Users,
    Target,
    FileCheck,
    Cpu,
  };

  const currentTitle = title || feature?.title;
  const currentDesc = description || feature?.description;
  const currentNum = number || feature?.number;
  const currentTag = tag || feature?.tag;
  const currentColor = color || feature?.color || "blue";

  const IconToRender =
    icon || (feature?.icon && iconLookup[feature.icon]) || Sparkles;

  const colorStyles = {
    blue: {
      iconBg: "bg-blue-100/80 text-blue-600 border-blue-200",
      tagBg: "bg-blue-50 text-blue-700 border-blue-200",
      hoverBorder: "hover:border-blue-300",
    },
    purple: {
      iconBg: "bg-purple-100/80 text-purple-600 border-purple-200",
      tagBg: "bg-purple-50 text-purple-700 border-purple-200",
      hoverBorder: "hover:border-purple-300",
    },
    orange: {
      iconBg: "bg-orange-100/80 text-orange-600 border-orange-200",
      tagBg: "bg-orange-50 text-orange-700 border-orange-200",
      hoverBorder: "hover:border-orange-300",
    },
    green: {
      iconBg: "bg-emerald-100/80 text-emerald-600 border-emerald-200",
      tagBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
      hoverBorder: "hover:border-emerald-300",
    },
    cyan: {
      iconBg: "bg-cyan-100/80 text-cyan-600 border-cyan-200",
      tagBg: "bg-cyan-50 text-cyan-700 border-cyan-200",
      hoverBorder: "hover:border-cyan-300",
    },
  };

  const style = colorStyles[currentColor] || colorStyles.blue;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className={`group relative bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between ${style.hoverBorder}`}
    >
      <div>
        <div className="flex items-center justify-between mb-5">
          <div
            className={`p-3 rounded-2xl border shadow-2xs transition-transform duration-300 group-hover:scale-110 ${style.iconBg}`}
          >
            <IconToRender className="w-6 h-6" />
          </div>

          {currentNum && (
            <span className="text-2xl font-extrabold text-slate-200 group-hover:text-slate-300 transition-colors font-mono">
              {currentNum}
            </span>
          )}
        </div>

        {currentTag && (
          <span
            className={`inline-block mb-2.5 px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider border ${style.tagBg}`}
          >
            {currentTag}
          </span>
        )}

        <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2.5 leading-snug">
          {currentTitle}
        </h3>

        <p className="text-sm text-slate-600 leading-relaxed font-normal">
          {currentDesc}
        </p>
      </div>
    </motion.div>
  );
}
