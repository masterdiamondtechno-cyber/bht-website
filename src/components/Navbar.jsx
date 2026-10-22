import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  Sparkles,
  GraduationCap,
  ArrowRight,
} from "lucide-react";
import Button from "./Button";
import { JavaIcon, PythonIcon, DataAnalyticsIcon } from "./CourseIcons";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [coursesDropdown, setCoursesDropdown] = useState(false);
  const [mobileCoursesOpen, setMobileCoursesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsOpen(false);
    setCoursesDropdown(false);
    setMobileCoursesOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", to: "/" },
    { name: "About", to: "/about" },
    {
      name: "Courses",
      to: "/courses",
      hasDropdown: true,
    },
    { name: "FAQ", to: "/faq" },
    { name: "Contact", to: "/contact" },
  ];



  const courseItems = [
    {
      title: "Java Full Stack with AI",
      duration: "6 Months",
      to: "/courses/java-full-stack-ai",
      desc: "Core Java, Spring Boot, MySQL, Frontend & AI Tools",
      icon: JavaIcon,
      accent: "bg-white border-orange-200/80 shadow-2xs",
    },
    {
      title: "Python Full Stack with AI",
      duration: "6 Months",
      to: "/courses/python-full-stack-ai",
      desc: "Python, Django, DRF, FastAPI, AI & LangChain",
      icon: PythonIcon,
      accent: "bg-white border-blue-200/80 shadow-2xs",
    },
    {
      title: "Data Analytics",
      duration: "6 Months",
      to: "/courses/data-analytics",
      desc: "Excel, SQL, Python, Power BI, Statistics & AI",
      icon: DataAnalyticsIcon,
      accent: "bg-white border-amber-200/80 shadow-2xs",
    },
  ];

  const isCoursesActive = location.pathname.startsWith("/courses");

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200/80 py-2.5"
          : "bg-white/90 backdrop-blur-sm border-b border-slate-100 py-3.5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Institute Name */}
          <Link to="/" className="flex items-center gap-4 group focus:outline-none">
            <div className="relative flex items-center justify-center p-1 bg-white rounded-xl shadow-2xs border border-slate-100 transition-transform group-hover:scale-105">
              <img
                src="/bht-logo.jpg"
                alt="Bachelor’s Hub Technologies Logo"
                className="h-12 sm:h-14 w-auto object-contain"
              />
            </div>
            <div className="flex flex-col items-center text-center">
              <span className="font-extrabold text-slate-900 text-lg sm:text-xl tracking-tight leading-tight group-hover:text-blue-600 transition-colors">
                Bachelor’s Hub
              </span>
              <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-blue-600">
                Technologies
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => {
              if (link.hasDropdown) {
                return (
                  <div
                    key={link.name}
                    className="relative"
                    onMouseEnter={() => setCoursesDropdown(true)}
                    onMouseLeave={() => setCoursesDropdown(false)}
                  >
                    <NavLink
                      to={link.to}
                      className={`flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isCoursesActive
                          ? "text-blue-600 bg-blue-50/80 font-semibold"
                          : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
                      }`}
                    >
                      {link.name}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          coursesDropdown ? "rotate-180 text-blue-600" : "text-slate-400"
                        }`}
                      />
                    </NavLink>

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {coursesDropdown && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.98 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 w-80 p-2 mt-1 bg-white rounded-2xl shadow-xl border border-slate-100 ring-1 ring-black/5"
                        >
                          <div className="p-2 border-b border-slate-100 flex items-center justify-between mb-1">
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                              Career Programs (6 Months)
                            </span>
                            <Link
                              to="/courses"
                              className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-0.5"
                            >
                              All <ArrowRight className="w-3 h-3" />
                            </Link>
                          </div>
                          <div className="space-y-1">
                            {courseItems.map((item) => {
                              const IconComponent = item.icon;
                              return (
                                <Link
                                  key={item.to}
                                  to={item.to}
                                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                                >
                                  <div
                                    className={`w-9 h-9 rounded-xl border shrink-0 flex items-center justify-center p-1.5 transition-transform group-hover:scale-110 ${item.accent}`}
                                  >
                                    <IconComponent className="w-5 h-5" />
                                  </div>
                                  <div>
                                    <div className="text-sm font-semibold text-slate-800 group-hover:text-blue-600 transition-colors flex items-center gap-1.5">
                                      {item.title}
                                    </div>
                                    <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                                      {item.desc}
                                    </p>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <NavLink
                  key={link.name}
                  to={link.to}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? "text-blue-600 bg-blue-50/80 font-semibold"
                        : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              );
            })}

          </nav>

          {/* Right Action CTA */}
          <div className="hidden sm:flex items-center gap-2.5">
            <Button
              to="/admissions"
              variant="gradient"
              size="sm"
              icon={<Sparkles className="w-4 h-4" />}
            >
              Enquire Now
            </Button>
          </div>


          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 xl:hidden">
            <Link
              to="/admissions"
              className="sm:hidden px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-xs"
            >
              Enquire
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              aria-label="Toggle navigation menu"
              className="p-2 rounded-xl text-slate-700 hover:text-blue-600 hover:bg-slate-100 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="xl:hidden bg-white border-b border-slate-200 overflow-hidden shadow-xl"
          >
            <div className="px-4 pt-3 pb-6 space-y-1.5 max-h-[80vh] overflow-y-auto">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `block px-3.5 py-2.5 rounded-xl text-sm font-medium ${
                    isActive
                      ? "text-blue-600 bg-blue-50 font-semibold"
                      : "text-slate-700 hover:bg-slate-50"
                  }`
                }
              >
                Home
              </NavLink>

              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `block px-3.5 py-2.5 rounded-xl text-sm font-medium ${
                    isActive
                      ? "text-blue-600 bg-blue-50 font-semibold"
                      : "text-slate-700 hover:bg-slate-50"
                  }`
                }
              >
                About Us
              </NavLink>

              {/* Mobile Courses Accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => setMobileCoursesOpen(!mobileCoursesOpen)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium ${
                    isCoursesActive
                      ? "text-blue-600 bg-blue-50 font-semibold"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-blue-600" />
                    Courses
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      mobileCoursesOpen ? "rotate-180 text-blue-600" : "text-slate-400"
                    }`}
                  />
                </button>

                {mobileCoursesOpen && (
                  <div className="pl-4 pr-2 py-2 space-y-1 bg-slate-50/70 rounded-xl my-1 border border-slate-100">
                    <Link
                      to="/courses"
                      className="block px-3 py-1.5 text-xs font-bold text-blue-600 hover:underline"
                    >
                      → View All Courses Overview
                    </Link>
                    {courseItems.map((item) => {
                      const IconComponent = item.icon;
                      return (
                        <Link
                          key={item.to}
                          to={item.to}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-white hover:text-blue-600 transition-colors"
                        >
                          <div className={`w-7 h-7 rounded-lg border flex items-center justify-center p-1 shrink-0 ${item.accent}`}>
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900">{item.title}</div>
                            <div className="text-[11px] text-slate-500">{item.duration}</div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              <NavLink
                to="/faq"
                className={({ isActive }) =>
                  `block px-3.5 py-2.5 rounded-xl text-sm font-medium ${
                    isActive
                      ? "text-blue-600 bg-blue-50 font-semibold"
                      : "text-slate-700 hover:bg-slate-50"
                  }`
                }
              >
                FAQ
              </NavLink>

              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `block px-3.5 py-2.5 rounded-xl text-sm font-medium ${
                    isActive
                      ? "text-blue-600 bg-blue-50 font-semibold"
                      : "text-slate-700 hover:bg-slate-50"
                  }`
                }
              >
                Contact Us
              </NavLink>

              <div className="pt-4 border-t border-slate-100">
                <Button to="/admissions" variant="gradient" size="md" className="w-full">
                  Apply / Enquire Now
                </Button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
