import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Clock,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Cpu,
} from "lucide-react";
import Button from "./Button";
import { JavaIcon, PythonIcon, DataAnalyticsIcon } from "./CourseIcons";

export default function CourseCard({ course, index = 0 }) {
  const iconMap = {
    "java-full-stack-ai": JavaIcon,
    "python-full-stack-ai": PythonIcon,
    "data-analytics": DataAnalyticsIcon,
  };

  const IconComponent = iconMap[course.id] || JavaIcon;

  // Custom accent themes based on course
  const themes = {
    "java-full-stack-ai": {
      borderColor: "hover:border-orange-300",
      iconBg: "bg-white border border-orange-200/80 shadow-md shadow-orange-500/10",
      badge: "bg-orange-50 text-orange-700 border-orange-200",
      topHighlight: "from-orange-500 to-blue-500",
      skillBg: "bg-orange-50 text-slate-700 hover:bg-orange-100 border-orange-100",
      btnHighlight: "hover:border-orange-500 text-orange-600",
    },
    "python-full-stack-ai": {
      borderColor: "hover:border-cyan-300",
      iconBg: "bg-white border border-blue-200/80 shadow-md shadow-blue-500/10",
      badge: "bg-blue-50 text-blue-700 border-blue-200",
      topHighlight: "from-blue-600 to-cyan-500",
      skillBg: "bg-blue-50 text-slate-700 hover:bg-blue-100 border-blue-100",
      btnHighlight: "hover:border-blue-500 text-blue-600",
    },
    "data-analytics": {
      borderColor: "hover:border-amber-300",
      iconBg: "bg-white border border-amber-200/80 shadow-md shadow-amber-500/10",
      badge: "bg-purple-50 text-purple-700 border-purple-200",
      topHighlight: "from-amber-500 to-indigo-500",
      skillBg: "bg-purple-50 text-slate-700 hover:bg-purple-100 border-purple-100",
      btnHighlight: "hover:border-purple-500 text-purple-600",
    },
  };

  const currentTheme = themes[course.id] || themes["java-full-stack-ai"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      whileHover={{ y: -8 }}
      className={`group relative bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden ${currentTheme.borderColor}`}
    >
      {/* Subtle top color highlight stripe */}
      <div
        className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${currentTheme.topHighlight} opacity-90`}
      />

      <div>
        {/* Top Header Row */}
        <div className="flex items-start justify-between gap-4 mb-5">
          <div
            className={`w-14 h-14 rounded-2xl ${currentTheme.iconBg} flex items-center justify-center p-2.5 shadow-md shadow-slate-100 transition-transform duration-300 group-hover:scale-110`}
          >
            <IconComponent className="w-8 h-8" />
          </div>

          <div className="flex flex-col items-end gap-1.5">
            <span
              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${currentTheme.badge}`}
            >
              <Sparkles className="w-3 h-3" /> {course.badge}
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
              <Clock className="w-3 h-3 text-slate-400" /> {course.duration}
            </span>
          </div>
        </div>

        {/* Title & Subtitle */}
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">
          <Link to={`/courses/${course.slug}`}>{course.title}</Link>
        </h3>
        <p className="text-xs sm:text-sm font-medium text-slate-500 mb-3">
          {course.subtitle}
        </p>
        <p className="text-sm text-slate-600 leading-relaxed mb-6">
          {course.shortDescription}
        </p>

        {/* AI Integration Highlight Pill */}
        <div className="mb-6 p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-2.5">
          <div className="p-1 rounded-lg bg-blue-100 text-blue-700 shrink-0 mt-0.5">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900">AI Integration Included</div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              Hands-on prompt workflows, LLM APIs &amp; developer productivity tools.
            </div>
          </div>
        </div>

        {/* Key Skills Tags */}
        <div className="mb-8">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
            Core Technologies &amp; Skills
          </div>
          <div className="flex flex-wrap gap-1.5">
            {course.skills.slice(0, 7).map((skill) => (
              <span
                key={skill}
                className={`text-xs px-2.5 py-1 rounded-lg border font-medium transition-colors ${currentTheme.skillBg}`}
              >
                {skill}
              </span>
            ))}
            {course.skills.length > 7 && (
              <span className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 font-medium border border-slate-200">
                +{course.skills.length - 7} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-5 border-t border-slate-100 grid grid-cols-2 gap-3">
        <Button
          to={`/courses/${course.slug}`}
          variant="outline"
          size="sm"
          className="w-full text-xs font-semibold"
          arrow
        >
          View Course
        </Button>
        <Button
          to={`/admissions?course=${encodeURIComponent(course.title)}`}
          variant="gradient"
          size="sm"
          className="w-full text-xs font-semibold"
        >
          Enquire Now
        </Button>
      </div>
    </motion.div>
  );
}
