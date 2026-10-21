import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import {
  fetchEnquiries,
  fetchEnquiryStats,
  updateEnquiryStatus,
  deleteEnquiry,
  fetchAllUsers,
  fetchCampusDrives,
  createCampusDrive,
  updateCampusDrive,
  deleteCampusDrive,
  fetchDriveApplications,
  updateDriveApplicationStatus,
  downloadApplicationsExcel,
} from "../services/apiService";
import {
  Shield,
  Users,
  Inbox,
  Clock,
  PhoneCall,
  GraduationCap,
  CheckCircle,
  Search,
  Filter,
  RefreshCw,
  Trash2,
  Eye,
  LogOut,
  ChevronDown,
  X,
  Calendar,
  Mail,
  Phone,
  BookOpen,
  Briefcase,
  Layers,
  Sparkles,
  Download,
  Plus,
  Edit3,
  FileSpreadsheet,
  ExternalLink,
  FileText,
  Building2,
  MapPin,
  Banknote,
  CheckCircle2,
} from "lucide-react";

export default function AdminDashboard() {
  const { user, token, logout } = useAuth();

  const [activeTab, setActiveTab] = useState("drives"); // 'drives' | 'enquiries' | 'users'
  const [stats, setStats] = useState(null);
  const [enquiries, setEnquiries] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [drivesList, setDrivesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [courseFilter, setCourseFilter] = useState("all");

  // Detail Modal for Enquiries
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);

  // Campus Drive Create/Edit Modal State
  const [isDriveModalOpen, setIsDriveModalOpen] = useState(false);
  const [driveForm, setDriveForm] = useState({
    id: null,
    company_name: "",
    company_logo: "",
    job_title: "",
    location: "Pune / Hybrid",
    eligibility: "B.E / B.Tech / MCA (Min 60%)",
    skills: "Java, Spring Boot, MySQL",
    batch: "2025 / 2026 Batch",
    job_type: "Full Time",
    salary: "5.0 - 7.5 LPA",
    deadline: "",
    description: "",
    status: "active",
  });
  const [driveSubmitting, setDriveSubmitting] = useState(false);

  // Drive Applications Viewer Modal State
  const [selectedDriveForApps, setSelectedDriveForApps] = useState(null);
  const [driveApps, setDriveApps] = useState([]);
  const [loadingApps, setLoadingApps] = useState(false);
  const [exportingExcel, setExportingExcel] = useState(false);

  // Load Data
  const loadDashboardData = async (isManual = false) => {
    if (isManual) setRefreshing(true);
    else setLoading(true);
    setErrorMessage("");

    try {
      const [statsRes, enquiriesRes, usersRes, drivesRes] = await Promise.all([
        fetchEnquiryStats(token),
        fetchEnquiries({ limit: 100 }, token),
        fetchAllUsers(token),
        fetchCampusDrives({ status: "all" }, token),
      ]);

      if (statsRes.success) setStats(statsRes.stats);
      if (enquiriesRes.success) setEnquiries(enquiriesRes.data || []);
      if (usersRes.success) setUsersList(usersRes.users || []);
      if (drivesRes.success) setDrivesList(drivesRes.drives || []);

      if (!statsRes.success && !enquiriesRes.success && !drivesRes.success) {
        setErrorMessage("Failed to load some dashboard data. Check MySQL backend connection.");
      }
    } catch {
      setErrorMessage("Network error while connecting to backend API.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, [token]);

  // Handle Enquiry status update
  const handleStatusChange = async (enquiryId, newStatus) => {
    try {
      const res = await updateEnquiryStatus(enquiryId, newStatus, token);
      if (res.success) {
        setSuccessMessage(`Updated status to '${newStatus}'`);
        setEnquiries((prev) =>
          prev.map((e) => (e.id === enquiryId ? { ...e, status: newStatus } : e))
        );
        if (selectedEnquiry && selectedEnquiry.id === enquiryId) {
          setSelectedEnquiry((prev) => ({ ...prev, status: newStatus }));
        }
        fetchEnquiryStats(token).then((r) => r.success && setStats(r.stats));
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        setErrorMessage(res.error || "Failed to update status.");
      }
    } catch {
      setErrorMessage("Error updating status.");
    }
  };

  // Handle delete enquiry
  const handleDelete = async (enquiryId) => {
    if (!window.confirm(`Are you sure you want to delete enquiry #${enquiryId}?`)) return;

    try {
      const res = await deleteEnquiry(enquiryId, token);
      if (res.success) {
        setEnquiries((prev) => prev.filter((e) => e.id !== enquiryId));
        if (selectedEnquiry?.id === enquiryId) setSelectedEnquiry(null);
        setSuccessMessage("Enquiry deleted successfully.");
        fetchEnquiryStats(token).then((r) => r.success && setStats(r.stats));
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        setErrorMessage(res.error || "Failed to delete enquiry.");
      }
    } catch {
      setErrorMessage("Error deleting enquiry.");
    }
  };

  // Open Drive Form (Create or Edit)
  const openDriveForm = (drive = null) => {
    if (drive) {
      setDriveForm({
        id: drive.id,
        company_name: drive.company_name,
        company_logo: drive.company_logo || "",
        job_title: drive.job_title,
        location: drive.location,
        eligibility: drive.eligibility,
        skills: drive.skills,
        batch: drive.batch,
        job_type: drive.job_type,
        salary: drive.salary || "",
        deadline: drive.deadline ? drive.deadline.slice(0, 10) : "",
        description: drive.description,
        status: drive.status,
      });
    } else {
      const defaultDate = new Date();
      defaultDate.setDate(defaultDate.getDate() + 20);
      setDriveForm({
        id: null,
        company_name: "",
        company_logo: "",
        job_title: "",
        location: "Pune / Hybrid",
        eligibility: "B.E / B.Tech / MCA (Min 60%)",
        skills: "Java, Spring Boot, MySQL",
        batch: "2025 / 2026 Batch",
        job_type: "Full Time",
        salary: "5.0 - 7.5 LPA",
        deadline: defaultDate.toISOString().slice(0, 10),
        description: "",
        status: "active",
      });
    }
    setIsDriveModalOpen(true);
  };

  // Submit Drive Form (Save or Update)
  const handleDriveFormSubmit = async (e) => {
    e.preventDefault();
    setDriveSubmitting(true);
    setErrorMessage("");

    try {
      if (driveForm.id) {
        const res = await updateCampusDrive(driveForm.id, driveForm, token);
        if (res.success) {
          setSuccessMessage("Campus drive updated successfully.");
          setIsDriveModalOpen(false);
          loadDashboardData(true);
        } else {
          setErrorMessage(res.error || "Failed to update drive.");
        }
      } else {
        const res = await createCampusDrive(driveForm, token);
        if (res.success) {
          setSuccessMessage("Campus drive created successfully.");
          setIsDriveModalOpen(false);
          loadDashboardData(true);
        } else {
          setErrorMessage(res.error || "Failed to create drive.");
        }
      }
    } catch {
      setErrorMessage("Network error saving campus drive.");
    } finally {
      setDriveSubmitting(false);
      setTimeout(() => setSuccessMessage(""), 3500);
    }
  };

  // Delete Drive
  const handleDeleteDrive = async (driveId, companyName) => {
    if (!window.confirm(`Are you sure you want to delete the campus drive for "${companyName}"? All student applications for this drive will also be permanently deleted.`)) {
      return;
    }

    try {
      const res = await deleteCampusDrive(driveId, token);
      if (res.success) {
        setSuccessMessage("Campus drive deleted successfully.");
        setDrivesList((prev) => prev.filter((d) => d.id !== driveId));
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        setErrorMessage(res.error || "Failed to delete drive.");
      }
    } catch {
      setErrorMessage("Error deleting campus drive.");
    }
  };

  // View Applications for a drive
  const openApplicationsViewer = async (drive) => {
    setSelectedDriveForApps(drive);
    setLoadingApps(true);
    try {
      const res = await fetchDriveApplications(drive.id, token);
      if (res.success) {
        setDriveApps(res.applications || []);
      }
    } catch {
      setErrorMessage("Failed to load applications for drive.");
    } finally {
      setLoadingApps(false);
    }
  };

  // Update Application Status
  const handleAppStatusChange = async (appId, newStatus) => {
    try {
      const res = await updateDriveApplicationStatus(appId, newStatus, token);
      if (res.success) {
        setDriveApps((prev) =>
          prev.map((a) => (a.id === appId ? { ...a, status: newStatus } : a))
        );
        setSuccessMessage(`Applicant status updated to '${newStatus}'.`);
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch {
      setErrorMessage("Error updating applicant status.");
    }
  };

  // Export Excel
  const handleExportExcel = async (driveId = "all") => {
    setExportingExcel(true);
    try {
      const res = await downloadApplicationsExcel(driveId, token);
      if (res.success) {
        setSuccessMessage(`Exported: ${res.filename}`);
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        setErrorMessage(res.error || "Export failed.");
      }
    } catch {
      setErrorMessage("Error generating Excel file.");
    } finally {
      setExportingExcel(false);
    }
  };

  // Filtered Enquiries
  const filteredEnquiries = enquiries.filter((item) => {
    const matchesSearch =
      (item.full_name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.email || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.phone || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.course || "").toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    const matchesCourse = courseFilter === "all" || item.course === courseFilter;

    return matchesSearch && matchesStatus && matchesCourse;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "new":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "contacted":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "enrolled":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "closed":
        return "bg-slate-100 text-slate-700 border-slate-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/60 pb-16">
      {/* Top Banner / Navbar */}
      <div className="bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-600 rounded-xl text-white shadow-md shadow-blue-500/20">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                    BHT Admin Portal
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30">
                    Administrator
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Logged in as <span className="text-slate-200 font-medium">{user?.email}</span> ({user?.name})
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 self-end sm:self-auto">
              <button
                type="button"
                onClick={() => loadDashboardData(true)}
                disabled={refreshing}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
                title="Refresh latest data"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin text-blue-400" : ""}`} />
                <span>Refresh</span>
              </button>

              <button
                type="button"
                onClick={logout}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-red-600/20 hover:bg-red-600 text-red-200 hover:text-white border border-red-500/30 transition-colors cursor-pointer"
                title="Sign out of Admin Portal"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Alerts */}
        {errorMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center justify-between">
            <span>{errorMessage}</span>
            <button onClick={() => setErrorMessage("")} className="text-red-500 hover:text-red-700">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
        {successMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center justify-between">
            <span>{successMessage}</span>
            <button onClick={() => setSuccessMessage("")} className="text-emerald-500 hover:text-emerald-700">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-white p-4.5 rounded-2xl border border-blue-200/80 shadow-xs bg-gradient-to-br from-white to-blue-50/40">
            <div className="flex items-center justify-between text-blue-700 text-xs font-semibold mb-2">
              <span>Campus Drives</span>
              <Briefcase className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-blue-900">{drivesList.length}</div>
            <div className="text-[11px] text-blue-600 mt-1">
              {drivesList.filter((d) => d.status === "active").length} Active hiring drives
            </div>
          </div>

          <div className="bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-2">
              <span>Total Enquiries</span>
              <Inbox className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-slate-900">
              {stats?.totalEnquiries ?? enquiries.length}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">All time received</div>
          </div>
        </div>


        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center gap-2 mb-6 border-b border-slate-200 pb-3">
          <button
            type="button"
            onClick={() => setActiveTab("drives")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "drives"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <Briefcase className="w-4 h-4" />
            Campus Drives Management ({drivesList.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("enquiries")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "enquiries"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <Inbox className="w-4 h-4" />
            Admission Enquiries ({enquiries.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("users")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "users"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <Users className="w-4 h-4" />
            Registered Accounts ({usersList.length})
          </button>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: CAMPUS DRIVES MANAGEMENT */}
        {/* ========================================================================= */}
        {activeTab === "drives" && (
          <div className="space-y-6">
            {/* Top Toolbar */}
            <div className="bg-white p-4 sm:p-5 rounded-3xl shadow-sm border border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">Campus Drives & Hiring Events</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Publish, update, and manage job openings. Export applications to Excel spreadsheet.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => handleExportExcel("all")}
                  disabled={exportingExcel}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors shadow-2xs cursor-pointer disabled:opacity-50"
                  title="Download all applications across all campus drives as Excel (.xlsx)"
                >
                  <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                  <span>{exportingExcel ? "Exporting..." : "Export All to Excel (.xlsx)"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => openDriveForm()}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Campus Drive</span>
                </button>
              </div>
            </div>

            {/* Drives Table */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 uppercase text-[11px] tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Company & Job Title</th>
                      <th className="py-3 px-4">Location</th>
                      <th className="py-3 px-4">Eligibility & Batch</th>
                      <th className="py-3 px-4">Deadline</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Applicants</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {drivesList.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="py-12 text-center text-slate-500">
                          <Briefcase className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                          <p className="font-semibold text-slate-700">No campus drives created yet</p>
                          <button
                            onClick={() => openDriveForm()}
                            className="mt-3 px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl"
                          >
                            Add First Drive
                          </button>
                        </td>
                      </tr>
                    ) : (
                      drivesList.map((drive) => (
                        <tr key={drive.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-2.5">
                              {drive.company_logo ? (
                                <img
                                  src={drive.company_logo}
                                  alt=""
                                  className="w-9 h-9 rounded-xl object-cover border border-slate-200 p-0.5"
                                  onError={(e) => { e.target.style.display = "none"; }}
                                />
                              ) : null}
                              <div>
                                <div className="font-bold text-slate-900">{drive.company_name}</div>
                                <div className="text-xs text-blue-600 font-semibold">{drive.job_title}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-slate-600">{drive.location}</td>
                          <td className="py-3.5 px-4 text-xs">
                            <div className="text-slate-800 font-medium">{drive.batch}</div>
                            <div className="text-slate-500 truncate max-w-[180px]">{drive.eligibility}</div>
                          </td>
                          <td className="py-3.5 px-4 text-xs whitespace-nowrap text-slate-600">
                            {new Date(drive.deadline).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </td>
                          <td className="py-3.5 px-4">
                            <span
                              className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                                drive.status === "active"
                                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                  : drive.status === "upcoming"
                                  ? "bg-blue-50 text-blue-700 border border-blue-200"
                                  : "bg-slate-100 text-slate-600 border border-slate-200"
                              }`}
                            >
                              {drive.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <button
                              type="button"
                              onClick={() => openApplicationsViewer(drive)}
                              className="px-2.5 py-1 rounded-xl text-xs font-bold bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition-colors inline-flex items-center gap-1 cursor-pointer"
                              title="View applicants"
                            >
                              <Users className="w-3.5 h-3.5" />
                              <span>{drive.applicant_count || 0} Applicants</span>
                            </button>
                          </td>
                          <td className="py-3.5 px-4 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                type="button"
                                onClick={() => handleExportExcel(drive.id)}
                                className="p-1.5 text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                                title="Export drive applications to Excel (.xlsx)"
                              >
                                <FileSpreadsheet className="w-4 h-4" />
                              </button>
                              <button
                                type="button"
                                onClick={() => openDriveForm(drive)}
                                className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                                title="Edit Campus Drive"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteDrive(drive.id, drive.company_name)}
                                className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                title="Delete Campus Drive"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: ADMISSION ENQUIRIES */}
        {/* ========================================================================= */}
        {activeTab === "enquiries" && (
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200/90 overflow-hidden">
            {/* Filter Bar */}
            <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
              {/* Search input */}
              <div className="relative flex-grow max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search student name, email, phone, or course..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>

              {/* Status and Course Filters */}
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1.5 rounded-xl text-xs">
                  <Filter className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-slate-500 font-medium">Status:</span>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-transparent font-semibold text-slate-800 focus:outline-none cursor-pointer"
                  >
                    <option value="all">All ({enquiries.length})</option>
                    <option value="new">New Leads</option>
                    <option value="contacted">Contacted</option>
                    <option value="enrolled">Enrolled</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>

                <div className="flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1.5 rounded-xl text-xs">
                  <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-slate-500 font-medium">Course:</span>
                  <select
                    value={courseFilter}
                    onChange={(e) => setCourseFilter(e.target.value)}
                    className="bg-transparent font-semibold text-slate-800 focus:outline-none cursor-pointer max-w-[150px] truncate"
                  >
                    <option value="all">All Courses</option>
                    <option value="Java Full Stack with AI">Java Full Stack</option>
                    <option value="Python Full Stack with AI">Python Full Stack</option>
                    <option value="Data Analytics">Data Analytics</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              {loading ? (
                <div className="py-20 text-center text-slate-500">
                  <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                  <p className="text-sm">Loading enquiries from MySQL...</p>
                </div>
              ) : filteredEnquiries.length === 0 ? (
                <div className="py-16 text-center text-slate-500">
                  <Inbox className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-base font-semibold text-slate-700">No enquiries found</p>
                  <p className="text-xs text-slate-400 mt-1">
                    {searchQuery || statusFilter !== "all" || courseFilter !== "all"
                      ? "Try adjusting your search query or filters."
                      : "New enquiries submitted through the website will appear here in real time."}
                  </p>
                </div>
              ) : (
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 uppercase text-[11px] tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Student</th>
                      <th className="py-3 px-4">Contact</th>
                      <th className="py-3 px-4">Course</th>
                      <th className="py-3 px-4">Submitted</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredEnquiries.map((enquiry) => (
                      <tr key={enquiry.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-slate-900">{enquiry.full_name}</div>
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            {enquiry.education || "Education not specified"}
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-xs">
                          <div className="text-slate-800 font-medium flex items-center gap-1">
                            <Mail className="w-3 h-3 text-slate-400" />
                            {enquiry.email}
                          </div>
                          <div className="text-slate-600 mt-0.5 flex items-center gap-1">
                            <Phone className="w-3 h-3 text-slate-400" />
                            {enquiry.phone}
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="inline-block px-2.5 py-1 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                            {enquiry.course}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-xs text-slate-500 whitespace-nowrap">
                          {new Date(enquiry.created_at).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </td>
                        <td className="py-3.5 px-4">
                          <select
                            value={enquiry.status || "new"}
                            onChange={(e) => handleStatusChange(enquiry.id, e.target.value)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-semibold border focus:outline-none cursor-pointer ${getStatusBadge(
                              enquiry.status
                            )}`}
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="enrolled">Enrolled</option>
                            <option value="closed">Closed</option>
                          </select>
                        </td>
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => setSelectedEnquiry(enquiry)}
                              className="p-1.5 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                              title="View enquiry details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(enquiry.id)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                              title="Delete enquiry"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: REGISTERED USERS */}
        {/* ========================================================================= */}
        {activeTab === "users" && (
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200/90 overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Registered Users & Roles</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Accounts stored securely in MySQL with bcrypt password hashing
                </p>
              </div>
              <span className="text-xs font-semibold px-3 py-1 bg-indigo-50 text-indigo-700 rounded-xl border border-indigo-100">
                {usersList.length} Accounts
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 uppercase text-[11px] tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Phone</th>
                    <th className="py-3 px-4">Role</th>
                    <th className="py-3 px-4">Registered On</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {usersList.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-slate-900">
                        {u.name}
                        {u.email === "bht.enquiry123@gmail.com" && (
                          <span className="ml-2 text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded font-bold">
                            Default Admin
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-slate-700">{u.email}</td>
                      <td className="py-3.5 px-4 text-slate-600">{u.phone || "—"}</td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider ${
                            u.role === "admin"
                              ? "bg-purple-100 text-purple-800 border border-purple-200"
                              : "bg-slate-100 text-slate-700 border border-slate-200"
                          }`}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-500 text-xs">
                        {new Date(u.created_at).toLocaleString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* MODAL 1: CREATE / EDIT CAMPUS DRIVE */}
      {/* ========================================================================= */}
      {isDriveModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 my-auto relative max-h-[92vh] overflow-y-auto border border-slate-100 animate-in fade-in zoom-in-95 duration-150">
            <button
              type="button"
              onClick={() => setIsDriveModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {driveForm.id ? "Edit Campus Drive" : "Create New Campus Drive"}
                </h3>
                <p className="text-xs text-slate-500">
                  Fill in job specifications and candidate criteria for students
                </p>
              </div>
            </div>

            <form onSubmit={handleDriveFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={driveForm.company_name}
                    onChange={(e) => setDriveForm({ ...driveForm, company_name: e.target.value })}
                    placeholder="e.g. Cognizant Technology Solutions"
                    className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                    Job Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={driveForm.job_title}
                    onChange={(e) => setDriveForm({ ...driveForm, job_title: e.target.value })}
                    placeholder="e.g. Associate Software Engineer"
                    className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                  Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={driveForm.location}
                  onChange={(e) => setDriveForm({ ...driveForm, location: e.target.value })}
                  placeholder="e.g. Pune / Bengaluru / Remote"
                  className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                    Target Batch <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={driveForm.batch}
                    onChange={(e) => setDriveForm({ ...driveForm, batch: e.target.value })}
                    placeholder="e.g. 2025 / 2026 Batch"
                    className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                    Salary / Package
                  </label>
                  <input
                    type="text"
                    value={driveForm.salary}
                    onChange={(e) => setDriveForm({ ...driveForm, salary: e.target.value })}
                    placeholder="e.g. 6.5 - 8.5 LPA"
                    className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                    Last Date to Apply <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={driveForm.deadline}
                    onChange={(e) => setDriveForm({ ...driveForm, deadline: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                    Eligibility Criteria <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={driveForm.eligibility}
                    onChange={(e) => setDriveForm({ ...driveForm, eligibility: e.target.value })}
                    placeholder="e.g. B.E / B.Tech / MCA (Min 60% with no backlogs)"
                    className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                    Drive Status
                  </label>
                  <select
                    value={driveForm.status}
                    onChange={(e) => setDriveForm({ ...driveForm, status: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  >
                    <option value="active">Active (Accepting Applications)</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                  Required Skills <span className="text-red-500">*</span> <span className="text-slate-400 font-normal">(Comma separated)</span>
                </label>
                <input
                  type="text"
                  required
                  value={driveForm.skills}
                  onChange={(e) => setDriveForm({ ...driveForm, skills: e.target.value })}
                  placeholder="e.g. Java, Spring Boot, Microservices, MySQL, REST APIs"
                  className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                  Job Description / Role Overview <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows="3"
                  value={driveForm.description}
                  onChange={(e) => setDriveForm({ ...driveForm, description: e.target.value })}
                  placeholder="Describe interview stages, day-to-day responsibilities, training details..."
                  className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsDriveModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={driveSubmitting}
                  className="px-6 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 disabled:opacity-60 cursor-pointer"
                >
                  {driveSubmitting
                    ? "Saving Drive..."
                    : driveForm.id
                    ? "Update Campus Drive"
                    : "Publish Campus Drive"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: DRIVE APPLICATIONS VIEWER & EXCEL EXPORT */}
      {/* ========================================================================= */}
      {selectedDriveForApps && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full p-6 sm:p-8 my-auto relative max-h-[92vh] overflow-y-auto border border-slate-100 animate-in fade-in zoom-in-95 duration-150">
            <button
              type="button"
              onClick={() => setSelectedDriveForApps(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100 pr-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  Campus Drive Applicants
                </span>
                <h3 className="text-xl font-bold text-slate-900">
                  {selectedDriveForApps.company_name} — {selectedDriveForApps.job_title}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Target Batch: {selectedDriveForApps.batch} • Location: {selectedDriveForApps.location}
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleExportExcel(selectedDriveForApps.id)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors shadow-2xs cursor-pointer"
                title="Download applications for this drive as an Excel spreadsheet"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                <span>Export Drive (.xlsx)</span>
              </button>
            </div>

            {loadingApps ? (
              <div className="py-16 text-center text-slate-500">
                <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                <p className="text-xs font-medium">Fetching registered applications...</p>
              </div>
            ) : driveApps.length === 0 ? (
              <div className="py-16 text-center text-slate-500">
                <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-base font-bold text-slate-700">No applications received yet</p>
                <p className="text-xs text-slate-400 mt-1">
                  When students apply for this drive, their profiles and resumes will appear here.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 uppercase text-[11px] tracking-wider">
                    <tr>
                      <th className="py-2.5 px-3">Student Name</th>
                      <th className="py-2.5 px-3">Contact</th>
                      <th className="py-2.5 px-3">Academics</th>
                      <th className="py-2.5 px-3">Resume</th>
                      <th className="py-2.5 px-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {driveApps.map((app) => (
                      <tr key={app.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-3">
                          <div className="font-bold text-slate-900">{app.full_name}</div>
                          <div className="text-[11px] text-slate-500">Passing: {app.batch_year}</div>
                        </td>
                        <td className="py-3 px-3 text-xs">
                          <div className="text-slate-800 font-medium">{app.email}</div>
                          <div className="text-slate-500">{app.phone}</div>
                        </td>
                        <td className="py-3 px-3 text-xs">
                          <div className="font-semibold text-slate-800">{app.degree}</div>
                          <div className="text-slate-600">{app.branch} ({app.cgpa_percentage})</div>
                        </td>
                        <td className="py-3 px-3">
                          {app.resume_url ? (
                            <a
                              href={app.resume_url}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition-colors"
                            >
                              <FileText className="w-3.5 h-3.5" />
                              <span>View CV</span>
                              <ExternalLink className="w-3 h-3 text-blue-500" />
                            </a>
                          ) : (
                            <span className="text-xs text-slate-400">No CV</span>
                          )}
                        </td>
                        <td className="py-3 px-3">
                          <select
                            value={app.status || "applied"}
                            onChange={(e) => handleAppStatusChange(app.id, e.target.value)}
                            className="px-2 py-1 rounded-lg text-xs font-semibold border border-slate-200 bg-white focus:outline-none cursor-pointer"
                          >
                            <option value="applied">Applied</option>
                            <option value="shortlisted">Shortlisted</option>
                            <option value="interviewing">Interviewing</option>
                            <option value="selected">Selected</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: ENQUIRY DETAILS MODAL */}
      {/* ========================================================================= */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto relative animate-in fade-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => setSelectedEnquiry(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Enquiry #{selectedEnquiry.id}</h3>
                <p className="text-xs text-slate-500">
                  Received on {new Date(selectedEnquiry.created_at).toLocaleString("en-IN")}
                </p>
              </div>
            </div>

            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-xs text-slate-500 block mb-1">Student Full Name</span>
                  <span className="font-semibold text-slate-900">{selectedEnquiry.full_name}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-xs text-slate-500 block mb-1">Target Course</span>
                  <span className="font-semibold text-blue-600">{selectedEnquiry.course}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-xs text-slate-500 block mb-1">Email Address</span>
                  <a
                    href={`mailto:${selectedEnquiry.email}`}
                    className="font-medium text-slate-800 hover:text-blue-600 break-all"
                  >
                    {selectedEnquiry.email}
                  </a>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-xs text-slate-500 block mb-1">Phone Number</span>
                  <a
                    href={`tel:${selectedEnquiry.phone}`}
                    className="font-medium text-slate-800 hover:text-blue-600"
                  >
                    {selectedEnquiry.phone}
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-xs text-slate-500 block mb-1">Educational Background</span>
                  <span className="text-slate-800">{selectedEnquiry.education || "Not specified"}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-xs text-slate-500 block mb-1">Experience Level</span>
                  <span className="text-slate-800">{selectedEnquiry.experience || "Not specified"}</span>
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl">
                <span className="text-xs text-slate-500 block mb-1 font-semibold uppercase tracking-wider">
                  Student Message / Questions
                </span>
                <p className="text-slate-700 whitespace-pre-wrap leading-relaxed mt-1">
                  {selectedEnquiry.message || "No specific message provided."}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-slate-600">Update Status:</span>
                  <select
                    value={selectedEnquiry.status || "new"}
                    onChange={(e) => handleStatusChange(selectedEnquiry.id, e.target.value)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border focus:outline-none cursor-pointer ${getStatusBadge(
                      selectedEnquiry.status
                    )}`}
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="enrolled">Enrolled</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedEnquiry(null)}
                  className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
