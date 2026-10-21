import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Courses from "./pages/Courses";
import JavaFullStack from "./pages/JavaFullStack";
import PythonFullStack from "./pages/PythonFullStack";
import DataAnalytics from "./pages/DataAnalytics";
import Placements from "./pages/Placements";
import Admissions from "./pages/Admissions";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/AuthPage";
import AdminDashboard from "./pages/AdminDashboard";
import CampusDrives from "./pages/CampusDrives";

export default function App() {
  const { isAuthenticated, hasVisited, isLoading } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A]">
      <ScrollToTop />
      <Navbar />

      <main className="flex-grow">
        <Routes>
          {/* Public Home Page */}
          <Route path="/" element={<Home />} />

          {/* Admin Login Route */}
          <Route path="/login" element={<AuthPage />} />
          <Route path="/signup" element={<AuthPage />} />

          {/* Admin Dashboard - Protected: Only admin role can access */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Campus Hiring Drives Module */}
          <Route path="/campus-drives" element={<CampusDrives />} />

          {/* Public Institution Routes */}
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/java-full-stack-ai" element={<JavaFullStack />} />
          <Route path="/courses/python-full-stack-ai" element={<PythonFullStack />} />
          <Route path="/courses/data-analytics" element={<DataAnalytics />} />
          <Route path="/placements" element={<Placements />} />
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
