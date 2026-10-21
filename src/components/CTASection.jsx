import { motion } from "framer-motion";
import { Sparkles, ArrowRight, MessageCircle } from "lucide-react";
import Button from "./Button";
import { siteConfig } from "../data/features";

export default function CTASection({
  title = "Ready to Build Your IT Career?",
  description = "Learn industry-relevant skills, build real projects and prepare for your career with Bachelor’s Hub Technologies.",
  primaryBtnText = "Enquire Now",
  primaryBtnLink = "/admissions",
  secondaryBtnText = "Explore Courses",
  secondaryBtnLink = "/courses",
}) {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 rounded-3xl p-8 sm:p-12 lg:p-16 text-white text-center shadow-2xl overflow-hidden"
        >
          {/* Subtle animated background shapes */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none animate-pulse-subtle" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-cyan-300/15 rounded-full blur-2xl pointer-events-none animate-float" />
          <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-white text-xs sm:text-sm font-semibold mb-6 border border-white/20"
            >
              <Sparkles className="w-4 h-4 text-cyan-200" />
              <span>Skills Today for a Brighter Tomorrow</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-5"
            >
              {title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg text-blue-50 max-w-2xl mx-auto leading-relaxed mb-8 font-normal"
            >
              {description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              <Button
                to={primaryBtnLink}
                variant="white"
                size="lg"
                className="font-bold shadow-xl text-blue-700"
                arrow
              >
                {primaryBtnText}
              </Button>

              <Button
                to={secondaryBtnLink}
                variant="outlineWhite"
                size="lg"
                className="font-semibold"
              >
                {secondaryBtnText}
              </Button>

              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg transition-all hover:scale-105"
              >
                <MessageCircle className="w-5 h-5" /> Chat on WhatsApp
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
