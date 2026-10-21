import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Clock,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Layers,
  Briefcase,
  Users,
} from "lucide-react";
import PageHeader from "../components/PageHeader";
import SectionHeading from "../components/SectionHeading";
import Button from "../components/Button";
import { courses } from "../data/courses";
import { getCourseIcon } from "../components/CourseIcons";

export default function Courses() {
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    document.title = "IT Courses | Java, Python & Data Analytics | Bachelor’s Hub Technologies";
  }, []);

  const filteredCourses = courses.filter((course) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "fullstack")
      return course.id.includes("full-stack");
    if (activeFilter === "data") return course.id.includes("data");
    return true;
  });

  return (
    <div>
      <PageHeader
        badge="Career Programs"
        badgeColor="blue"
        title="Explore Our"
        highlight="Career-Focused Courses"
        subtitle="Industry-focused programs designed to take learners from fundamentals to job readiness with hands-on projects and AI integration."
        breadcrumb={[{ label: "Courses" }]}
      />

      {/* Course Filter Tabs */}
      <section className="py-8 bg-white border-b border-slate-200/80 sticky top-18 z-20 shadow-2xs backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { id: "all", label: "All Career Programs (3)" },
              { id: "fullstack", label: "Full Stack Development (2)" },
              { id: "data", label: "Data & Analytics (1)" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeFilter === tab.id
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20 scale-105"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Courses List Section */}
      <section className="py-16 sm:py-20 bg-slate-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {filteredCourses.map((course, idx) => {
            const IconComponent = getCourseIcon(course.id);
            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Top Accent Stripe */}
                <div
                  className={`h-2 bg-gradient-to-r ${course.colorScheme.gradient}`}
                />

                <div className="p-6 sm:p-8 lg:p-10">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Details */}
                    <div className="lg:col-span-8 space-y-6">
                      <div className="flex flex-wrap items-center gap-3">
                        <span
                          className={`px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${course.colorScheme.badgeBg}`}
                        >
                          <Sparkles className="w-3 h-3 inline-block mr-1" />
                          {course.badge}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          {course.duration}
                        </span>
                        <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                          ✓ 100% Practical &amp; AI Integrated
                        </span>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-center justify-center p-2.5 shrink-0">
                          <IconComponent className="w-9 h-9" />
                        </div>
                        <div>
                          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-1">
                            <Link
                              to={`/courses/${course.slug}`}
                              className="hover:text-blue-600 transition-colors"
                            >
                              {course.title}
                            </Link>
                          </h2>
                          <p className="text-sm sm:text-base font-semibold text-blue-600">
                            {course.subtitle}
                          </p>
                        </div>
                      </div>

                      <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                        {course.fullDescription}
                      </p>

                      {/* Who It Is For */}
                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-2 flex items-center gap-1.5">
                          <Users className="w-4 h-4 text-blue-600" /> Who Should Enroll:
                        </div>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                          {course.whoShouldJoin.slice(0, 4).map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Skill Tags */}
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                          Core Skills &amp; Frameworks:
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {course.skills.map((skill) => (
                            <span
                              key={skill}
                              className={`text-xs px-2.5 py-1 rounded-lg border font-medium ${course.colorScheme.chip}`}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Summary Box */}
                    <div className="lg:col-span-4 bg-slate-50 p-6 rounded-2xl border border-slate-200/80 space-y-5">
                      <div className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-3 flex items-center justify-between">
                        <span>Career Target Roles</span>
                        <Briefcase className="w-4 h-4 text-blue-600" />
                      </div>

                      <div className="space-y-2">
                        {course.careerOpportunities.slice(0, 4).map((career, i) => (
                          <div
                            key={i}
                            className="p-2.5 rounded-xl bg-white border border-slate-200/60 shadow-2xs"
                          >
                            <div className="text-xs font-bold text-slate-900">
                              {career.role}
                            </div>
                            <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                              {career.desc}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* AI Feature Pill */}
                      <div className="p-3 rounded-xl bg-blue-100/70 border border-blue-200 text-xs text-blue-950 font-medium">
                        <div className="font-bold flex items-center gap-1.5 mb-1 text-blue-900">
                          <Cpu className="w-4 h-4 text-blue-700" /> AI Tools Integration
                        </div>
                        Learn ChatGPT, Gemini, and LLM APIs for coding acceleration.
                      </div>

                      {/* Action Buttons */}
                      <div className="pt-2 space-y-2.5">
                        <Button
                          to={`/courses/${course.slug}`}
                          variant="primary"
                          size="md"
                          className="w-full font-bold shadow-md"
                          arrow
                        >
                          View Full Syllabus ({course.modules.length} Modules)
                        </Button>
                        <Button
                          to={`/admissions?course=${encodeURIComponent(course.title)}`}
                          variant="gradient"
                          size="md"
                          className="w-full font-semibold"
                        >
                          Enquire About Next Batch
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
