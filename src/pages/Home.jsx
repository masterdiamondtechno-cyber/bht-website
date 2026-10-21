import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Code2,
  Terminal,
  BarChart3,
  GraduationCap,
  Briefcase,
  Layers,
  Cpu,
  Clock,
  Laptop,
  Check,
  Building2,
  Calendar,
  ShieldCheck,
  Target,
} from "lucide-react";
import Button from "../components/Button";
import SectionHeading from "../components/SectionHeading";
import StatsSection from "../components/StatsSection";
import CourseCard from "../components/CourseCard";
import FeatureCard from "../components/FeatureCard";
import CTASection from "../components/CTASection";
import CompanyGrid from "../components/CompanyGrid";
import { courses } from "../data/courses";
import { whyBhtCards, learningStages, placementPillars, siteConfig } from "../data/features";

export default function Home() {
  useEffect(() => {
    document.title = "Bachelor’s Hub Technologies | IT Training & Career Programs";
  }, []);

  const introCards = [
    {
      title: "Industry-Relevant Learning",
      description: "Curriculum tailored around modern software architecture, enterprise best practices, and active tech stacks.",
      icon: "BookOpenCheck",
      color: "blue",
    },
    {
      title: "Hands-on Training",
      description: "Daily live coding exercises, debugging drills, and guided lab sessions under experienced mentor supervision.",
      icon: "Laptop",
      color: "purple",
    },
    {
      title: "Real-World Projects",
      description: "Engineer production-ready capstone systems that demonstrate your end-to-end coding capabilities.",
      icon: "Layers",
      color: "orange",
    },
    {
      title: "AI Tools Integration",
      description: "Master modern AI tools (ChatGPT, Gemini, LLM APIs) to accelerate coding speed, testing, and intelligent software.",
      icon: "Sparkles",
      color: "cyan",
    },
    {
      title: "Continuous Guidance",
      description: "One-on-one mentor code reviews, regular milestone assessments, and personalized career roadmaps.",
      icon: "Target",
      color: "green",
    },
    {
      title: "Career Preparation",
      description: "ATS-optimized resumes, LinkedIn personal branding, mock interviews, and access to recruitment opportunities.",
      icon: "Briefcase",
      color: "blue",
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* ============================================================
          1. HERO SECTION
          ============================================================ */}
      <section className="relative hero-gradient pt-12 pb-20 sm:pt-18 sm:pb-28 border-b border-slate-200/80">
        {/* Subtle Decorative Elements */}
        <div className="absolute top-12 left-10 w-72 h-72 bg-blue-400/15 rounded-full blur-3xl pointer-events-none animate-pulse-subtle" />
        <div className="absolute top-1/2 right-12 w-80 h-80 bg-cyan-400/15 rounded-full blur-3xl pointer-events-none animate-float-slow" />
        <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Heading & Copy */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="inline-block"
              >
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider bg-blue-100/90 text-blue-800 border border-blue-200/80 shadow-2xs">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  JOB-ORIENTED IT TRAINING
                </span>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]"
              >
                Transform Your Career with{" "}
                <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
                  In-Demand Skills
                </span>
              </motion.h1>

              {/* Tagline & Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
              >
                Job-oriented training in Software Development and Data Analytics with AI Integration. Build real projects, master cutting-edge tech, and prepare for high-growth IT careers.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2"
              >
                <Button
                  to="/courses"
                  variant="primary"
                  size="lg"
                  className="font-bold shadow-lg shadow-blue-500/25"
                  arrow
                >
                  Explore Courses
                </Button>
                <Button
                  to="/admissions"
                  variant="gradient"
                  size="lg"
                  className="font-bold shadow-lg"
                >
                  Enquire Now
                </Button>
              </motion.div>

              {/* Trust Checkmarks */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs sm:text-sm font-semibold text-slate-700"
              >
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Hands-on Learning</span>
                </div>
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Real-World Projects</span>
                </div>
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>AI Tools Integration</span>
                </div>
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Placement Assistance</span>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Interactive Light Student / Technology Showcase with Floating Cards */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              {/* Central Glowing Card Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200/90"
              >
                {/* Visual Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">
                        Bachelor’s Hub Technologies
                      </h4>
                      <p className="text-xs text-blue-600 font-semibold">
                        Career Acceleration Platform
                      </p>
                    </div>
                  </div>
                  <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                </div>

                {/* Main Visual Content */}
                <div className="space-y-3.5">
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50/60 border border-blue-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-blue-900">
                        Active Curriculum Tracks
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-200/70 text-blue-800">
                        6 Months / 120 Days
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 rounded-xl bg-white text-xs font-semibold text-slate-800 shadow-2xs">
                        <span className="flex items-center gap-2">
                          <Code2 className="w-4 h-4 text-orange-500" /> Java Full Stack + AI
                        </span>
                        <span className="text-[10px] text-emerald-600 font-bold">Live Batches</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-xl bg-white text-xs font-semibold text-slate-800 shadow-2xs">
                        <span className="flex items-center gap-2">
                          <Terminal className="w-4 h-4 text-blue-500" /> Python Full Stack + AI
                        </span>
                        <span className="text-[10px] text-emerald-600 font-bold">Live Batches</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-xl bg-white text-xs font-semibold text-slate-800 shadow-2xs">
                        <span className="flex items-center gap-2">
                          <BarChart3 className="w-4 h-4 text-purple-500" /> Data Analytics + AI
                        </span>
                        <span className="text-[10px] text-emerald-600 font-bold">Live Batches</span>
                      </div>
                    </div>
                  </div>

                  {/* Motto banner */}
                  <div className="p-3.5 rounded-2xl bg-slate-900 text-white text-center shadow-md">
                    <div className="text-xs font-semibold text-cyan-300 uppercase tracking-wider">
                      Institute Creed
                    </div>
                    <div className="text-sm font-bold mt-0.5">
                      “Learn. Build. Grow. Get Hired.”
                    </div>
                  </div>
                </div>

                {/* Floating Cards around the box */}
                <motion.div
                  className="absolute -top-5 -left-6 bg-white py-2 px-3.5 rounded-2xl shadow-lg border border-slate-200/80 flex items-center gap-2 animate-float"
                >
                  <div className="w-7 h-7 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-xs">
                    6M
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-slate-900">6 Months</div>
                    <div className="text-[10px] text-slate-500">Comprehensive</div>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute -top-5 -right-6 bg-white py-2 px-3.5 rounded-2xl shadow-lg border border-slate-200/80 flex items-center gap-2 animate-float-delayed"
                >
                  <div className="w-7 h-7 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                    120D
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-slate-900">120 Days</div>
                    <div className="text-[10px] text-slate-500">Daily Labs</div>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute -bottom-6 -left-6 bg-white py-2 px-3.5 rounded-2xl shadow-lg border border-slate-200/80 flex items-center gap-2 animate-float-slow"
                >
                  <div className="w-7 h-7 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-slate-900">AI Integration</div>
                    <div className="text-[10px] text-slate-500">LLMs &amp; APIs</div>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute -bottom-6 -right-6 bg-white py-2 px-3.5 rounded-2xl shadow-lg border border-slate-200/80 flex items-center gap-2 animate-float"
                >
                  <div className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-slate-900">Career Support</div>
                    <div className="text-[10px] text-slate-500">Mock &amp; Referrals</div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          2. STATS SECTION
          ============================================================ */}
      <StatsSection />

      {/* ============================================================
          3. INTRODUCTION SECTION
          ============================================================ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="About The Institute"
            badgeColor="blue"
            title="Learn Skills That Move Your"
            highlight="Career Forward"
            subtitle="Bachelor’s Hub Technologies is a job-oriented training institute focused on providing industry-relevant skills in software development and data analytics. We bridge the gap between academic learning and industry requirements through hands-on training, real-world projects and continuous guidance."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {introCards.map((card, idx) => (
              <FeatureCard key={card.title} feature={card} index={idx} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button to="/about" variant="outline" size="lg" arrow>
              Learn More About BHT
            </Button>
          </div>
        </div>
      </section>

      {/* ============================================================
          4. COURSES SECTION
          ============================================================ */}
      <section className="py-20 bg-slate-50/70 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Career Programs"
            badgeColor="orange"
            title="Our Career-Focused"
            highlight="Training Programs"
            subtitle="Build practical skills, work on real-world projects and prepare for your technology career with our 6-Month / 120-Day immersive curriculum."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, idx) => (
              <CourseCard key={course.id} course={course} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          5. WHY CHOOSE BHT SECTION (Soft Purple / Light Blue)
          ============================================================ */}
      <section className="py-20 bg-gradient-to-b from-[#F3E8FF]/40 via-[#EFF6FF]/50 to-white border-t border-purple-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Why Us"
            badgeColor="purple"
            title="Why Choose"
            highlight="Bachelor’s Hub Technologies?"
            subtitle="We provide an ecosystem focused strictly on practical competence, career readiness, and mentor-guided development."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyBhtCards.map((card, idx) => (
              <FeatureCard key={card.id} feature={card} index={idx} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button to="/about" variant="secondary" size="lg" arrow>
              Discover Our Edge &amp; Approach
            </Button>
          </div>
        </div>
      </section>

      {/* ============================================================
          6. LEARNING JOURNEY PREVIEW (5 Stages: Learn, Practice, Build, Grow, Get Hired)
          ============================================================ */}
      <section className="py-20 bg-gradient-to-b from-white via-blue-50/40 to-slate-50 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="5-Stage Roadmap"
            badgeColor="cyan"
            title="Your Learning Journey"
            highlight="From Basics to Job-Ready"
            subtitle="A structured pedagogical pathway engineered to take you from core programming fundamentals to production deployment and interview readiness."
          />

          {/* Timeline Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative">
            {learningStages.map((stage, idx) => (
              <motion.div
                key={stage.step}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-xs font-mono font-bold px-2.5 py-1 rounded-lg ${stage.lightBg} ${stage.textColor} border ${stage.border}`}
                    >
                      STAGE {stage.step}
                    </span>
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                  </div>

                  <h3 className="text-xl font-extrabold text-slate-900 mb-1">
                    {stage.phase}
                  </h3>
                  <div className={`text-xs font-bold ${stage.textColor} mb-3`}>
                    {stage.subtitle}
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {stage.whatStudentsDo}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-semibold text-slate-500">
                  ✓ {stage.expectedOutcome}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button to="/courses" variant="primary" size="lg" arrow>
              Explore All Courses &amp; Curriculum
            </Button>
          </div>
        </div>
      </section>

      {/* ============================================================
          7. PLACEMENT PREVIEW (Soft Orange / Light Blue Gradient)
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
            <Button to="/placements" variant="gradient" size="lg" arrow>
              Explore Placement Assistance
            </Button>
          </div>
        </div>
      </section>

      {/* ============================================================
          8. COMPANY OPPORTUNITIES SECTION
          ============================================================ */}
      <CompanyGrid />

      {/* ============================================================
          9. FINAL HOME CTA
          ============================================================ */}
      <CTASection />
    </div>
  );
}
