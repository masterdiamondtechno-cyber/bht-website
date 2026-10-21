import { useState, useEffect } from "react";
import {
  Briefcase,
  Search,
  Filter,
  Building2,
  AlertCircle,
  GraduationCap,
  RefreshCw,
} from "lucide-react";
import PageHeader from "../components/PageHeader";
import CampusDriveCard from "../components/CampusDriveCard";
import DriveApplicationModal from "../components/DriveApplicationModal";
import { useAuth } from "../context/AuthContext";
import { fetchCampusDrives } from "../services/apiService";

export default function CampusDrives() {
  const { user, token, isAuthenticated } = useAuth();

  const [drives, setDrives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("active");
  const [batchFilter, setBatchFilter] = useState("all");

  // Selected drive for application modal
  const [selectedDriveForApply, setSelectedDriveForApply] = useState(null);

  // Load drives from backend
  const loadDrives = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetchCampusDrives({ status: "all" }, token);
      if (res.success) {
        setDrives(res.drives || []);
      } else {
        setError(res.error || "Failed to load campus drives.");
      }
    } catch {
      setError("Unable to connect to campus drives service.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Campus Drives & Hiring Events | Bachelor's Hub Technologies";
    loadDrives();
  }, [token]);

  const handleApplyClick = (drive) => {
    // Anyone can apply directly without login or sign up
    setSelectedDriveForApply(drive);
  };

  const handleApplicationSuccess = (appliedDriveId) => {
    setSelectedDriveForApply(null);
    // Update local drives state to reflect 'hasApplied'
    setDrives((prev) =>
      prev.map((d) => (d.id === appliedDriveId ? { ...d, hasApplied: true } : d))
    );
  };

  // Filtered drives
  const filteredDrives = drives.filter((drive) => {
    const matchesSearch =
      (drive.company_name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (drive.job_title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (drive.skills || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (drive.location || "").toLowerCase().includes(searchQuery.toLowerCase());

    const isExpired = drive.deadline
      ? new Date(drive.deadline) < new Date(new Date().setHours(0, 0, 0, 0))
      : false;

    let matchesStatus = true;
    if (statusFilter === "active") {
      matchesStatus = drive.status === "active" && !isExpired;
    } else if (statusFilter === "closed") {
      matchesStatus = drive.status === "closed" || isExpired;
    }

    let matchesBatch = true;
    if (batchFilter !== "all") {
      matchesBatch = (drive.batch || "").includes(batchFilter);
    }

    return matchesSearch && matchesStatus && matchesBatch;
  });

  return (
    <div>
      <PageHeader
        badge="Career Enablement"
        badgeColor="orange"
        title="Exclusive"
        highlight="Campus Hiring Drives"
        subtitle="Explore active on-campus and virtual IT placement drives hosted exclusively for Bachelor’s Hub Technologies students."
        breadcrumb={[{ label: "Placements", to: "/placements" }, { label: "Campus Drives" }]}
      />

      {/* Main Content Area */}
      <section className="py-12 bg-slate-50/70 min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Action Bar */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-2 p-1.5 bg-white rounded-2xl border border-slate-200/90 shadow-2xs">
              <div className="px-4 py-2 text-xs sm:text-sm font-bold rounded-xl bg-blue-600 text-white shadow-xs flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                Available Campus Drives ({drives.length})
              </div>
            </div>
          </div>

          {/* Search & Filters Card */}
          <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/90 shadow-xs mb-8 flex flex-col lg:flex-row gap-3.5 items-stretch lg:items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-grow max-w-xl">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by company, job title, skills (e.g. Java, Python), or city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-2 rounded-2xl text-xs">
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-slate-500 font-medium">Status:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-transparent font-bold text-slate-800 focus:outline-none cursor-pointer"
                >
                  <option value="active">Active Drives Only</option>
                  <option value="all">All Drives</option>
                  <option value="closed">Closed Drives</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-2 rounded-2xl text-xs">
                <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-slate-500 font-medium">Batch:</span>
                <select
                  value={batchFilter}
                  onChange={(e) => setBatchFilter(e.target.value)}
                  className="bg-transparent font-bold text-slate-800 focus:outline-none cursor-pointer"
                >
                  <option value="all">All Batches</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                </select>
              </div>

              <button
                type="button"
                onClick={loadDrives}
                className="p-2 text-slate-500 hover:text-blue-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                title="Refresh campus drives"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Drives Grid */}
          {loading ? (
            <div className="py-24 text-center">
              <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-sm font-medium text-slate-500">Loading campus drives...</p>
            </div>
          ) : error ? (
            <div className="p-8 bg-red-50 border border-red-200 rounded-3xl text-center max-w-lg mx-auto">
              <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <p className="text-sm font-bold text-red-800 mb-1">Failed to load drives</p>
              <p className="text-xs text-red-600 mb-4">{error}</p>
              <button
                onClick={loadDrives}
                className="px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-bold hover:bg-red-700 cursor-pointer"
              >
                Retry
              </button>
            </div>
          ) : filteredDrives.length === 0 ? (
            <div className="py-20 text-center bg-white rounded-3xl border border-slate-200 p-8">
              <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800 mb-1">
                No matching campus drives found
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Try clearing your search query or switching filters to "All Drives".
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {filteredDrives.map((drive) => (
                <CampusDriveCard
                  key={drive.id}
                  drive={drive}
                  isAuthenticated={isAuthenticated}
                  onApplyClick={handleApplyClick}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Application Modal */}
      {selectedDriveForApply && (
        <DriveApplicationModal
          drive={selectedDriveForApply}
          user={user}
          token={token}
          onClose={() => setSelectedDriveForApply(null)}
          onSuccess={handleApplicationSuccess}
        />
      )}
    </div>
  );
}
