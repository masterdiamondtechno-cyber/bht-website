import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Terminal,
  Clock,
  Sparkles,
  CheckCircle2,
  Cpu,
  Layers,
  Briefcase,
  Users,
  Server,
  Database,
  Globe,
  Zap,
} from "lucide-react";
import PageHeader from "../components/PageHeader";
import SectionHeading from "../components/SectionHeading";
import CourseModule from "../components/CourseModule";
import Button from "../components/Button";
import CTASection from "../components/CTASection";
import EnquiryForm from "../components/EnquiryForm";
import { courses } from "../data/courses";

export default function PythonFullStack() {
  const course = courses.find((c) => c.id === "python-full-stack-ai");

  useEffect(() => {
    document.title = "Python Full Stack with AI | Bachelor’s Hub Technologies";
  }, []);

  if (!course) return null;

  return (
    <div>
      <PageHeader
        badge="Career Program • 6 Months / 120 Days"
        badgeColor="cyan"
        title="Python Full Stack with"
        highlight="AI Integration"
        subtitle="Develop High-Speed, Modern Applications with Python, Django, FastAPI, LangChain, and Generative AI tool integration."
        breadcrumb={[
          { label: "Courses", to: "/courses" },
          { label: "Python Full Stack with AI" },
        ]}
      />

      {/* Highlights bar */}
      <section className="bg-white border-b border-slate-200/80 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-3 rounded-2xl bg-blue-50/60 border border-blue-100">
              <div className="text-xs font-bold text-slate-500">Duration</div>
              <div className="text-base sm:text-lg font-extrabold text-blue-600 mt-0.5">
                6 Months / 120 Days
              </div>
            </div>
            <div className="p-3 rounded-2xl bg-cyan-50/60 border border-cyan-100">
              <div className="text-xs font-bold text-slate-500">Key Frameworks</div>
              <div className="text-base sm:text-lg font-extrabold text-cyan-600 mt-0.5">
                Django &amp; FastAPI
              </div>
            </div>
            <div className="p-3 rounded-2xl bg-purple-50/60 border border-purple-100">
              <div className="text-xs font-bold text-slate-500">GenAI &amp; LLMs</div>
              <div className="text-base sm:text-lg font-extrabold text-purple-600 mt-0.5">
                LangChain &amp; APIs
              </div>
            </div>
            <div className="p-3 rounded-2xl bg-emerald-50/60 border border-emerald-100">
              <div className="text-xs font-bold text-slate-500">Job Readiness</div>
              <div className="text-base sm:text-lg font-extrabold text-emerald-600 mt-0.5">
                100% Practical Labs
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Overview & Target Roles */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 mb-2 block">
                  Course Overview
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
                  The Power of Python Combined with Next-Gen AI
                </h2>
                <p className="text-base text-slate-600 leading-relaxed">
                  {course.fullDescription}
                </p>
              </div>

              {/* AI Integration Highlight Box */}
              <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-indigo-500/10 border border-cyan-200/80">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-sm">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">
                    AI &amp; LangChain Integration Highlights
                  </h3>
                </div>
                <ul className="space-y-2 text-sm text-slate-700">
                  {course.aiIntegrationHighlights.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <Sparkles className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Who Should Join */}
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" /> Who Should Enroll in this Program?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {course.whoShouldJoin.map((item, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Complete Skills Grid */}
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-cyan-500" /> Technologies &amp; Skills Covered
                </h3>
                <div className="flex flex-wrap gap-2">
                  {course.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs sm:text-sm px-3.5 py-1.5 rounded-xl bg-blue-50 text-blue-900 font-semibold border border-blue-200/80 shadow-2xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sticky Sidebar */}
            <div className="lg:col-span-4 sticky top-28 space-y-6">
              <div className="bg-slate-900 text-white p-6 sm:p-7 rounded-3xl shadow-xl border border-slate-800 space-y-5">
                <div className="border-b border-slate-800 pb-4">
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                    Target Job Roles
                  </span>
                  <h4 className="text-lg font-bold text-white mt-1">
                    Career Opportunities
                  </h4>
                </div>

                <div className="space-y-3">
                  {course.careerOpportunities.map((career, i) => (
                    <div key={i} className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
                      <div className="text-sm font-bold text-cyan-300">
                        {career.role}
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5 leading-snug">
                        {career.desc}
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  to="/admissions?course=Python%20Full%20Stack%20with%20AI"
                  variant="gradient"
                  size="md"
                  className="w-full font-bold shadow-lg"
                >
                  Apply for Python Full Stack Batch
                </Button>
              </div>

              {/* Tools & Environment */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-3">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Server className="w-4 h-4 text-cyan-500" /> Developer Tools &amp; Ecosystem
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {course.toolsAndTechnologies.map((tool) => (
                    <span
                      key={tool}
                      className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Structured Modules & Syllabus */}
      <section className="py-20 bg-slate-50/70 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Curriculum Blueprint"
            badgeColor="cyan"
            title="Comprehensive 8-Module"
            highlight="Python &amp; AI Syllabus"
            subtitle="Explore the week-by-week technical modules designed to turn you into a versatile Python & AI Web Engineer."
          />

          <div className="space-y-4 max-w-4xl mx-auto">
            {course.modules.map((module, idx) => (
              <CourseModule
                key={module.number}
                module={module}
                defaultOpen={idx === 0}
                accent="blue"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Practical Capstone Projects Showcase */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Hands-on Portfolio"
            badgeColor="cyan"
            title="Real-World Capstone"
            highlight="Projects You Will Build"
            subtitle="Graduate with real-world Python, Django, and FastAPI projects that demonstrate API performance and AI capabilities."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {course.projects.map((project, idx) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-slate-50/70 rounded-3xl p-6 sm:p-7 border border-slate-200/80 hover:border-cyan-300 shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-cyan-100 text-cyan-600 flex items-center justify-center font-bold mb-4">
                    <Layers className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2.5">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    {project.desc}
                  </p>
                </div>

                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Tech Stack:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700 font-semibold"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Enquiry Section */}
      <section className="py-20 bg-gradient-to-b from-cyan-50/40 via-blue-50/30 to-white border-t border-cyan-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-cyan-100 text-cyan-800 border border-cyan-200 mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Direct Admissions Fast-Track
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Enquire for Python Full Stack with AI
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Connect with Satish Gadhave (+91 95454 84931) for batch timings and curriculum details.
            </p>
          </div>

          <EnquiryForm defaultCourse="Python Full Stack with AI" />
        </div>
      </section>
    </div>
  );
}
