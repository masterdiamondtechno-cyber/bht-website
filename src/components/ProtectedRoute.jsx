import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ShieldAlert, ArrowLeft } from "lucide-react";
import Button from "./Button";

/**
 * Route protector supporting authenticated users and role-based checks (e.g. admin)
 */
export default function ProtectedRoute({ children, requiredRole }) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm font-medium text-slate-500">Verifying security credentials...</p>
      </div>
    );
  }

  // Not logged in -> redirect to login page with return url
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Role check (e.g. admin dashboard requires role === 'admin')
  if (requiredRole && user?.role !== requiredRole) {
    return (
      <div className="max-w-xl mx-auto my-16 p-8 bg-white rounded-2xl shadow-xl border border-red-100 text-center">
        <div className="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-red-200">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Access Restricted</h2>
        <p className="text-sm text-slate-600 mb-6 leading-relaxed">
          You are signed in as <strong className="text-slate-800">{user.email}</strong>, but your account does not have administrator privileges. Only BHT administrators can access this section.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button to="/" variant="secondary" icon={<ArrowLeft className="w-4 h-4" />}>
            Back to Home
          </Button>
          <Button to="/login" variant="gradient">
            Switch to Admin Account
          </Button>
        </div>
      </div>
    );
  }

  return children;
}
