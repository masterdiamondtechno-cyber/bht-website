import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Compass, GraduationCap, ArrowRight, Phone } from "lucide-react";
import Button from "../components/Button";

export default function NotFound() {
  useEffect(() => {
    document.title = "404 - Page Not Found | Bachelor’s Hub Technologies";
  }, []);

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50/50 to-white">
      <div className="max-w-xl mx-auto text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex p-5 rounded-3xl bg-blue-100 text-blue-600 mb-2 shadow-inner"
        >
          <Compass className="w-14 h-14 animate-spin-slow" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl sm:text-7xl font-extrabold text-slate-900 tracking-tight font-mono"
        >
          404
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-2"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
            Page Not Found
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto">
            The page you are looking for might have been moved or does not exist. Explore our training programs or return to the homepage.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-3 pt-4"
        >
          <Button to="/" variant="primary" size="md" icon={<Home className="w-4 h-4" />}>
            Back to Homepage
          </Button>
          <Button to="/courses" variant="outline" size="md" icon={<GraduationCap className="w-4 h-4" />}>
            Explore Courses
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
