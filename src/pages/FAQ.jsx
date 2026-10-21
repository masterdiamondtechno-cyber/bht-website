import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HelpCircle, Sparkles, MessageCircle, Phone } from "lucide-react";
import PageHeader from "../components/PageHeader";
import FAQAccordion from "../components/FAQAccordion";
import CTASection from "../components/CTASection";
import Button from "../components/Button";
import { faqs } from "../data/faq";
import { siteConfig } from "../data/features";

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    document.title = "Frequently Asked Questions | Bachelor’s Hub Technologies";
  }, []);

  // Flatten questions or filter by category
  const allQuestions = faqs.flatMap((cat) => cat.questions);

  const displayedQuestions =
    activeCategory === "all"
      ? allQuestions
      : faqs.find((cat) => cat.category === activeCategory)?.questions || [];

  return (
    <div>
      <PageHeader
        badge="Clarifications &amp; Details"
        badgeColor="cyan"
        title="Frequently Asked"
        highlight="Questions"
        subtitle="Find answers regarding our courses, syllabus, AI integration, admissions process, and placement support."
        breadcrumb={[{ label: "FAQ" }]}
      />

      {/* Category Tabs */}
      <section className="py-8 bg-white border-b border-slate-200/80 sticky top-18 z-20 shadow-2xs backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeCategory === "all"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              All Questions ({allQuestions.length})
            </button>
            {faqs.map((cat) => (
              <button
                key={cat.category}
                onClick={() => setActiveCategory(cat.category)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeCategory === cat.category
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {cat.category} ({cat.questions.length})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ List */}
      <section className="py-16 sm:py-20 bg-slate-50/70">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={displayedQuestions} />

          {/* Need more info box */}
          <div className="mt-14 bg-white p-6 sm:p-8 rounded-3xl border border-blue-200 text-center shadow-md max-w-2xl mx-auto">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <HelpCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1">
              Have a question not covered here?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mb-5">
              Please contact our admissions team for the latest details regarding batch start dates, customized roadmaps, and classroom schedules.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button to="/contact" variant="primary" size="sm">
                Contact Admissions Team
              </Button>
              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-all"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp Quick Chat
              </a>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
