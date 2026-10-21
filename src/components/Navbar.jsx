import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Code2,
  Terminal,
  BarChart3,
  GraduationCap,
  ArrowRight,
  Shield,
  LogOut,
  User,
} from "lucide-react";
import Button from "./Button";
import { useAuth } from "../context/AuthContext";



export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [coursesDropdown, setCoursesDropdown] = useState(false);
  const [mobileCoursesOpen, setMobileCoursesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();


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
    { name: "Placements", to: "/placements" },
    { name: "Campus Drives", to: "/campus-drives" },
    { name: "FAQ", to: "/faq" },
    { name: "Contact", to: "/contact" },
  ];



  const courseItems = [
    {
      title: "Java Full Stack with AI",
      duration: "6 Months / 120 Days",
      to: "/courses/java-full-stack-ai",
      desc: "Core Java, Spring Boot, MySQL, Frontend & AI Tools",
      icon: Code2,
      accent: "text-orange-600 bg-orange-50 border-orange-200",
    },
    {
      title: "Python Full Stack with AI",
      duration: "6 Months / 120 Days",
      to: "/courses/python-full-stack-ai",
      desc: "Python, Django, DRF, FastAPI, AI & LangChain",
      icon: Terminal,
      accent: "text-blue-600 bg-blue-50 border-blue-200",
    },
    {
      title: "Data Analytics",
      duration: "6 Months / 120 Days",
      to: "/courses/data-analytics",
      desc: "Excel, SQL, Python, Power BI, Statistics & AI",
      icon: BarChart3,
      accent: "text-purple-600 bg-purple-50 border-purple-200",
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
          <Link to="/" className="flex items-center gap-3 group focus:outline-none">
            <div className="relative flex items-center justify-center p-1 bg-white rounded-xl shadow-2xs border border-slate-100 transition-transform group-hover:scale-105">
              <img
                src="/bht-logo.jpg"
                alt="Bachelor’s Hub Technologies Logo"
                className="h-10 sm:h-12 w-auto object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-slate-900 text-base sm:text-lg tracking-tight leading-tight group-hover:text-blue-600 transition-colors">
                Bachelor’s Hub
              </span>
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-blue-600">
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
                              Career Programs (6M / 120D)
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
                                    className={`p-2 rounded-lg border shrink-0 transition-transform group-hover:scale-110 ${item.accent}`}
                                  >
                                    <IconComponent className="w-4 h-4" />
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


            {/* Auth Buttons / User Pill */}
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100 transition-colors shadow-2xs"
                    title="Open Administrator Portal"
                  >
                    <Shield className="w-3.5 h-3.5 text-purple-600" />
                    <span>Admin Portal</span>
                  </Link>
                )}

                <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-100 rounded-lg text-xs font-medium text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
                    {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </div>
                  <span className="max-w-[100px] truncate">{user?.name?.split(" ")[0]}</span>
                </div>

                <button
                  type="button"
                  onClick={logout}
                  className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:text-blue-600 hover:bg-slate-50 transition-colors border border-slate-200"
              >
                <Shield className="w-3.5 h-3.5 text-slate-500" />
                <span>Admin Login</span>
              </Link>
            )}

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
                    {courseItems.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        className="block px-3 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-white hover:text-blue-600"
                      >
                        <div className="font-semibold text-slate-900">{item.title}</div>
                        <div className="text-[11px] text-slate-500">{item.duration}</div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <NavLink
                to="/placements"
                className={({ isActive }) =>
                  `block px-3.5 py-2.5 rounded-xl text-sm font-medium ${
                    isActive
                      ? "text-blue-600 bg-blue-50 font-semibold"
                      : "text-slate-700 hover:bg-slate-50"
                  }`
                }
              >
                Placement Assistance
              </NavLink>

              <NavLink
                to="/campus-drives"
                className={({ isActive }) =>
                  `block px-3.5 py-2.5 rounded-xl text-sm font-medium ${
                    isActive
                      ? "text-blue-600 bg-blue-50 font-semibold"
                      : "text-slate-700 hover:bg-slate-50"
                  }`
                }
              >
                Campus Drives
              </NavLink>

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

              <div className="pt-4 border-t border-slate-100 space-y-2">
                {isAuthenticated ? (
                  <div className="p-3 bg-slate-50 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                          {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900 leading-tight">
                            {user?.name}
                          </div>
                          <div className="text-[11px] text-slate-500">{user?.email}</div>
                        </div>
                      </div>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-700">
                        {user?.role}
                      </span>
                    </div>

                    {isAdmin && (
                      <Link
                        to="/admin"
                        className="flex items-center justify-center gap-1.5 w-full py-2 text-xs font-bold bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                      >
                        <Shield className="w-3.5 h-3.5" />
                        Administrator Portal
                      </Link>
                    )}

                    <button
                      type="button"
                      onClick={logout}
                      className="flex items-center justify-center gap-1.5 w-full py-2 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div>
                    <Link
                      to="/login"
                      className="flex items-center justify-center gap-1.5 w-full py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                    >
                      <Shield className="w-3.5 h-3.5 text-slate-600" />
                      <span>Admin Login</span>
                    </Link>
                  </div>
                )}

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
