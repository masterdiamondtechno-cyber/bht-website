import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import FloatingWhatsApp from "./components/FloatingWhatsApp";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Courses from "./pages/Courses";
import JavaFullStack from "./pages/JavaFullStack";
import PythonFullStack from "./pages/PythonFullStack";
import DataAnalytics from "./pages/DataAnalytics";
import Admissions from "./pages/Admissions";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A]">
      <ScrollToTop />
      <Navbar />

      <main className="flex-grow">
        <Routes>
          {/* Public Institution Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/java-full-stack-ai" element={<JavaFullStack />} />
          <Route path="/courses/python-full-stack-ai" element={<PythonFullStack />} />
          <Route path="/courses/data-analytics" element={<DataAnalytics />} />
          <Route path="/admissions" element={<Admissions />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
