import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  FileText,
  Share2,
  Code2,
  UserCheck,
  MessageSquare,
  Users,
  Building2,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Target,
} from "lucide-react";
import PageHeader from "../components/PageHeader";
import SectionHeading from "../components/SectionHeading";
import Button from "../components/Button";
import CTASection from "../components/CTASection";
import CompanyGrid from "../components/CompanyGrid";
import { placementPillars } from "../data/features";

export default function Placements() {
  useEffect(() => {
    document.title = "Placement Assistance | Bachelor’s Hub Technologies";
  }, []);

  const roadmapSteps = [
    {
      number: "01",
      title: "ATS Resume Engineering",
      desc: "Tailoring keyword-optimized resumes that spotlight GitHub repositories, capstone architecture, and tech proficiencies.",
      icon: FileText,
      color: "bg-blue-500",
    },
    {
      number: "02",
      title: "LinkedIn & Portfolio Branding",
      desc: "Creating high-impact LinkedIn profiles and deployed portfolio sites that attract IT talent acquisition teams.",
      icon: Share2,
      color: "bg-cyan-500",
    },
    {
      number: "03",
      title: "Technical Mastery & DSA Prep",
      desc: "Deep-dive live coding rounds, system design fundamentals, SQL queries, and algorithmic problem-solving drills.",
      icon: Code2,
      color: "bg-purple-500",
    },
    {
      number: "04",
      title: "1-on-1 Mock Interviews",
      desc: "Realistic technical and HR simulation interviews with recorded feedback to eliminate nervousness and refine articulation.",
      icon: MessageSquare,
      color: "bg-orange-500",
    },
    {
      number: "05",
      title: "Group Discussions & Soft Skills",
      desc: "Interactive GD sessions focusing on clear articulation, active listening, structured debate, and leadership presence.",
      icon: Users,
      color: "bg-indigo-500",
    },
    {
      number: "06",
      title: "Drives & Referral Opportunities",
      desc: "Direct access to regular job notifications, corporate referral programs, and verified IT vacancy updates.",
      icon: Briefcase,
      color: "bg-emerald-500",
    },
  ];

  return (
    <div>
      <PageHeader
        badge="Career & Placement Support"
        badgeColor="orange"
        title="Comprehensive"
        highlight="Placement Assistance"
        subtitle="“We support you until you get placed!” — A rigorous career enablement program designed to make you technically confident and interview-ready."
        breadcrumb={[{ label: "Placements" }]}
      />

      {/* Notice / Commitment Box (Accurate, Ethical Messaging) */}
      <section className="bg-orange-50/70 border-b border-orange-200/80 py-6">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-3 bg-white p-4 sm:p-5 rounded-2xl border border-orange-200 shadow-2xs">
            <ShieldCheck className="w-6 h-6 text-orange-600 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-slate-700">
              <strong className="text-slate-900 block mb-0.5 font-bold">
                Our Ethical Placement Promise:
              </strong>
              At Bachelor’s Hub Technologies, we believe in genuine skills rather than misleading claims. We provide complete, continuous placement assistance, personalized interview preparation, and referral support until you land your role.
            </div>
          </div>
        </div>
      </section>

      {/* Placement Pillars Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Pillars of Support"
            badgeColor="blue"
            title="Everything You Need to"
            highlight="Ace Your IT Interviews"
            subtitle="Our placement cell works hand-in-hand with every student across 7 essential preparation dimensions."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {placementPillars.map((pillar, idx) => (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="bg-slate-50/70 hover:bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 hover:border-blue-300 shadow-2xs hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold mb-5 shadow-2xs">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {pillar.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {pillar.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Roadmap Flow */}
      <section className="py-20 bg-gradient-to-b from-[#FFF7ED]/50 via-[#EFF6FF]/60 to-white border-y border-orange-100/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Step-by-Step Roadmap"
            badgeColor="orange"
            title="Your 6-Step"
            highlight="Placement Pathway"
            subtitle="From the moment you complete module assessments to your final offer letter discussion."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {roadmapSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-2xs hover:shadow-xl transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                        STEP {step.number}
                      </span>
                      <div className={`p-2 rounded-xl text-white ${step.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Company Targets Section */}
      <CompanyGrid />

      {/* CTA */}
      <CTASection
        title="Ready to Start Your Career Journey?"
        description="Join BHT today and prepare thoroughly with our mentors for upcoming hiring drives and interviews."
      />
    </div>
  );
}
