import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  Target,
  Eye,
  Sparkles,
  BookOpen,
  Code2,
  TrendingUp,
  CheckCircle2,
  Building,
  GraduationCap,
  ShieldCheck,
} from "lucide-react";
import PageHeader from "../components/PageHeader";
import SectionHeading from "../components/SectionHeading";
import Button from "../components/Button";
import { siteConfig, placementPillars } from "../data/features";

export default function About() {
  useEffect(() => {
    document.title = "About Bachelor’s Hub Technologies | IT Training & Career Programs";
  }, []);

  const coreValues = [
    {
      title: "Continuous Learning",
      desc: "We instill an agile mindset of curiosity, continuous upskilling, and adaptability to evolving technologies.",
      icon: BookOpen,
      color: "bg-blue-100 text-blue-600 border-blue-200",
    },
    {
      title: "Uncompromising Practicality",
      desc: "Theory is only valuable when applied. Every line of code written in our labs serves a concrete real-world purpose.",
      icon: Code2,
      color: "bg-cyan-100 text-cyan-600 border-cyan-200",
    },
    {
      title: "Daily Consistency",
      desc: "Skill excellence is the outcome of dedicated daily practice across our structured learning calendar.",
      icon: ShieldCheck,
      color: "bg-purple-100 text-purple-600 border-purple-200",
    },
    {
      title: "Innovation & AI",
      desc: "We embrace cutting-edge AI developer tools, generative models, and modern industry workflows proactively.",
      icon: Sparkles,
      color: "bg-orange-100 text-orange-600 border-orange-200",
    },
    {
      title: "Career Growth & Impact",
      desc: "Our ultimate benchmark of success is empowering our students to achieve meaningful, rewarding technology careers.",
      icon: TrendingUp,
      color: "bg-emerald-100 text-emerald-600 border-emerald-200",
    },
  ];

  return (
    <div>
      <PageHeader
        badge="About Us"
        badgeColor="purple"
        title="About Bachelor’s Hub"
        highlight="Technologies"
        subtitle="“Skills Today for a Brighter Tomorrow” — Empowering the next generation of software engineers and data analysts with job-oriented training and next-gen AI skills."
        breadcrumb={[{ label: "About Us" }]}
      />

      {/* ============================================================
          WHO WE ARE & BRAND IDENTITY
          ============================================================ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200">
                <Building className="w-3.5 h-3.5" /> Who We Are
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Bridging Academic Learning with{" "}
                <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  Industry Excellence
                </span>
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                <strong>Bachelor’s Hub Technologies (BHT)</strong> is a premier job-oriented IT training institute headquartered in Pune, Maharashtra. We were founded with a singular purpose: to transform eager learners into job-ready software development and data analytics professionals.
              </p>
              <p className="text-base text-slate-600 leading-relaxed">
                Traditional higher education often leaves students with strong theoretical definitions but minimal hands-on coding experience or insight into corporate tech stacks. At BHT, we completely reimagine this process through a 100% practical, project-driven methodology where students spend their time architecting applications, querying databases, integrating AI tools, and resolving live bugs.
              </p>

              <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 flex items-center gap-4">
                <div className="p-3 rounded-xl bg-blue-600 text-white shadow-md">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">
                    Core Philosophy: “Learn. Practice. Build. Grow. Get Hired.”
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">
                    A holistic path combining deep technical fundamentals with continuous interview mentorship.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Card Showcase */}
            <div className="lg:col-span-6">
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 sm:p-10 text-white shadow-2xl relative overflow-hidden border border-slate-700">
                <div className="absolute top-0 right-0 -mr-10 -mt-10 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 space-y-6">
                  <div className="flex items-center gap-3 bg-white/10 p-3 rounded-2xl backdrop-blur-sm border border-white/10">
                    <img
                      src="/bht-logo.jpg"
                      alt="BHT Official Logo"
                      className="h-12 w-auto bg-white p-1 rounded-xl"
                    />
                    <div>
                      <div className="text-sm font-bold text-white">
                        Bachelor’s Hub Technologies
                      </div>
                      <div className="text-xs text-cyan-400">
                        Pune, Maharashtra
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 text-sm text-slate-300">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                      <span><strong>6 Months:</strong> Immersive structured learning programs designed for career transition.</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                      <span><strong>AI Tools Integrated:</strong> Hands-on ChatGPT, Gemini, LangChain, and LLM APIs built directly into coding workflows.</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                      <span><strong>Personalized Guidance:</strong> Led by experienced mentors with one-on-one code reviews and mock interviews.</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-700/80 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-slate-400">Admissions Counselor</div>
                      <div className="text-sm font-bold text-white">{siteConfig.contactPerson}</div>
                    </div>
                    <Button to="/admissions" variant="gradient" size="sm">
                      Enquire Today
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          MISSION & VISION SECTION
          ============================================================ */}
      <section className="py-20 bg-slate-50/70 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 sm:p-10 rounded-3xl border border-blue-200/80 shadow-sm hover:shadow-xl transition-all relative overflow-hidden"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6 shadow-sm">
                <Target className="w-7 h-7" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Our Purpose
              </span>
              <h3 className="text-2xl font-bold text-slate-900 mt-1 mb-4">
                Our Mission
              </h3>
              <p className="text-base sm:text-lg text-slate-700 font-medium leading-relaxed italic border-l-4 border-blue-500 pl-4 py-1 mb-4 bg-blue-50/50 rounded-r-xl">
                “Our mission is to make students industry-ready and help them build successful careers in the IT field.”
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                We accomplish this through rigorous hands-on coding, production-grade project development, AI tool proficiency, and holistic interview preparation that turns theoretical knowledge into marketable corporate capability.
              </p>
            </motion.div>

            {/* Vision Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white p-8 sm:p-10 rounded-3xl border border-purple-200/80 shadow-sm hover:shadow-xl transition-all relative overflow-hidden"
            >
              <div className="w-14 h-14 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center mb-6 shadow-sm">
                <Eye className="w-7 h-7" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
                Our Future
              </span>
              <h3 className="text-2xl font-bold text-slate-900 mt-1 mb-4">
                Our Vision
              </h3>
              <p className="text-base sm:text-lg text-slate-700 font-medium leading-relaxed italic border-l-4 border-purple-500 pl-4 py-1 mb-4 bg-purple-50/50 rounded-r-xl">
                “To become the most trusted career launchpad for aspiring tech professionals, recognized for practical mastery, ethical mentorship, and industry alignment.”
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                We envision a world where any passionate student—regardless of academic background—can master modern software engineering and data analytics through structured mentorship, practical projects, and personalized career support.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================
          OUR CORE VALUES
          ============================================================ */}
      <section className="py-20 bg-gradient-to-b from-[#EFF6FF]/60 via-slate-50 to-white border-t border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Guiding Principles"
            badgeColor="blue"
            title="Our Core"
            highlight="Values"
            subtitle="The foundational values that guide our curriculum design, mentorship interactions, and student commitments."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
            {coreValues.map((val, idx) => {
              const Icon = val.icon;
              const centeredLastRow =
                idx === 3
                  ? "lg:col-span-2 lg:col-start-2"
                  : idx === 4
                    ? "lg:col-span-2 lg:col-start-4"
                    : "lg:col-span-2";

              return (
                <motion.div
                  key={val.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className={`bg-white p-7 rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between ${centeredLastRow}`}
                >
                  <div>
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 border ${val.color}`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      {val.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {val.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================
          PLACEMENT ASSISTANCE
          ============================================================ */}
      <section className="py-20 bg-gradient-to-b from-[#FFF7ED]/50 via-[#EFF6FF]/60 to-white border-t border-orange-100/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Placement Assistance"
            badgeColor="orange"
            title="Your Career Doesn't End"
            highlight="With Training"
            subtitle="We support your career preparation with dedicated guidance, interview preparation, portfolio optimization, and placement-focused activities until you secure your role."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {placementPillars.slice(0, 4).map((pillar, idx) => (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold mb-4">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {pillar.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button to="/admissions" variant="gradient" size="lg" arrow>
              Start Your Career Journey
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}
