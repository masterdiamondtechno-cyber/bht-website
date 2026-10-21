/**
 * BHT Backend API Service
 * Handles communication between the frontend and the Express.js + MySQL backend.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || "";

/**
 * Helper to build auth headers
 */
function getAuthHeaders(token) {
  const authToken = token || localStorage.getItem("bht_auth_token");
  const headers = {
    "Content-Type": "application/json",
  };
  if (authToken) {
    headers["Authorization"] = `Bearer ${authToken}`;
  }
  return headers;
}

/**
 * Logs in a user or administrator
 * @param {string} email
 * @param {string} password
 */
export async function loginUser(email, password) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json().catch(() => ({}));

    if (res.ok && data.success) {
      return {
        success: true,
        token: data.token,
        user: data.user,
        message: data.message,
      };
    }

    return {
      success: false,
      error: data.message || "Invalid credentials. Please try again.",
    };
  } catch (err) {
    return {
      success: false,
      error: err.message || "Unable to reach server. Please ensure backend is running.",
    };
  }
}

/**
 * Registers a new user account
 * @param {Object} userData
 * @param {string} userData.name
 * @param {string} userData.email
 * @param {string} userData.password
 * @param {string} [userData.phone]
 */
export async function signupUser(userData) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const data = await res.json().catch(() => ({}));

    if (res.ok && data.success) {
      return {
        success: true,
        token: data.token,
        user: data.user,
        message: data.message,
      };
    }

    return {
      success: false,
      error: data.message || "Registration failed. Please check your inputs.",
    };
  } catch (err) {
    return {
      success: false,
      error: err.message || "Unable to reach server. Please ensure backend is running.",
    };
  }
}

/**
 * Fetches the currently authenticated user's profile
 * @param {string} [token]
 */
export async function fetchCurrentUser(token) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
      headers: getAuthHeaders(token),
    });

    const data = await res.json().catch(() => ({}));
    if (res.ok && data.success) {
      return { success: true, user: data.user };
    }
    return { success: false, error: data.message || "Session invalid or expired" };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/**
 * Admin Only: Retrieves all registered users
 * @param {string} [token]
 */
export async function fetchAllUsers(token) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/users`, {
      headers: getAuthHeaders(token),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.success) {
      return { success: true, users: data.users };
    }
    return { success: false, error: data.message || "Failed to load users" };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/**
 * Submits an admission enquiry to the Express + MySQL backend.
 *
 * @param {Object} data
 * @param {string} data.fullName
 * @param {string} data.phone
 * @param {string} data.email
 * @param {string} data.course
 * @param {string} [data.education]
 * @param {string} [data.experience]
 * @param {string} [data.message]
 * @returns {Promise<{ success: boolean, message?: string, data?: Object, error?: string }>}
 */
export async function submitEnquiryToBackend(data) {
  const endpoint = `${API_BASE_URL}/api/enquiries`;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: data.fullName,
        phone: data.phone,
        email: data.email,
        course: data.course,
        education: data.education,
        experience: data.experience,
        message: data.message,
      }),
    });

    const result = await response.json().catch(() => ({}));

    if (response.ok && result.success) {
      return {
        success: true,
        message: result.message || "Enquiry submitted and saved successfully.",
        data: result.data,
        emailSent: result.emailSent,
        emailDetails: result.emailDetails,
      };
    }

    const errorMessage =
      result.message ||
      (Array.isArray(result.errors) ? result.errors.join(", ") : null) ||
      `Server responded with error status ${response.status}.`;

    return {
      success: false,
      error: errorMessage,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error.message ||
        "Unable to connect to the backend server. Please verify the backend is running.",
    };
  }
}

/**
 * Admin Only: Retrieves all admission enquiries
 * @param {Object} [params]
 * @param {number} [params.limit]
 * @param {number} [params.offset]
 * @param {string} [token]
 */
export async function fetchEnquiries(params = {}, token) {
  try {
    const limit = params.limit || 50;
    const offset = params.offset || 0;
    const res = await fetch(`${API_BASE_URL}/api/enquiries?limit=${limit}&offset=${offset}`, {
      headers: getAuthHeaders(token),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.success) {
      return { success: true, data: data.data, total: data.total };
    }
    return { success: false, error: data.message || "Failed to load enquiries" };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/**
 * Admin Only: Retrieves dashboard summary stats
 * @param {string} [token]
 */
export async function fetchEnquiryStats(token) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/enquiries/stats/summary`, {
      headers: getAuthHeaders(token),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.success) {
      return { success: true, stats: data.stats };
    }
    return { success: false, error: data.message || "Failed to load stats" };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/**
 * Admin Only: Updates the status of an enquiry
 * @param {number|string} id
 * @param {'new'|'contacted'|'enrolled'|'closed'} status
 * @param {string} [token]
 */
export async function updateEnquiryStatus(id, status, token) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/enquiries/${id}/status`, {
      method: "PATCH",
      headers: getAuthHeaders(token),
      body: JSON.stringify({ status }),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.success) {
      return { success: true, message: data.message };
    }
    return { success: false, error: data.message || "Failed to update status" };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/**
 * Admin Only: Deletes an enquiry
 * @param {number|string} id
 * @param {string} [token]
 */
export async function deleteEnquiry(id, token) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/enquiries/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(token),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.success) {
      return { success: true, message: data.message };
    }
    return { success: false, error: data.message || "Failed to delete enquiry" };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/**
 * Health check endpoint for the backend API
 * @returns {Promise<boolean>}
 */
export async function checkBackendHealth() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/health`);
    const data = await res.json();
    return data.status === "ok";
  } catch {
    return false;
  }
}

// =============================================================================
// Campus Drive API Endpoints
// =============================================================================

/**
 * Retrieves all campus drives (Public or with user status if token provided)
 */
export async function fetchCampusDrives(params = {}, token) {
  try {
    const queryParams = new URLSearchParams();
    if (params.status) queryParams.append("status", params.status);
    if (params.search) queryParams.append("search", params.search);

    const url = `${API_BASE_URL}/api/campus-drives?${queryParams.toString()}`;
    const res = await fetch(url, {
      headers: getAuthHeaders(token),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.success) {
      return { success: true, drives: data.drives, count: data.count };
    }
    return { success: false, error: data.message || "Failed to load campus drives." };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/**
 * Retrieves single campus drive by ID
 */
export async function fetchCampusDriveById(id, token) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/campus-drives/${id}`, {
      headers: getAuthHeaders(token),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.success) {
      return { success: true, drive: data.drive };
    }
    return { success: false, error: data.message || "Failed to load drive details." };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/**
 * Admin Only: Creates a new campus drive
 */
export async function createCampusDrive(driveData, token) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/campus-drives`, {
      method: "POST",
      headers: getAuthHeaders(token),
      body: JSON.stringify(driveData),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.success) {
      return { success: true, message: data.message, driveId: data.driveId };
    }
    return { success: false, error: data.message || "Failed to create campus drive." };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/**
 * Admin Only: Updates an existing campus drive
 */
export async function updateCampusDrive(id, driveData, token) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/campus-drives/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(token),
      body: JSON.stringify(driveData),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.success) {
      return { success: true, message: data.message };
    }
    return { success: false, error: data.message || "Failed to update campus drive." };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/**
 * Admin Only: Deletes a campus drive
 */
export async function deleteCampusDrive(id, token) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/campus-drives/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(token),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.success) {
      return { success: true, message: data.message };
    }
    return { success: false, error: data.message || "Failed to delete campus drive." };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/**
 * Student Only: Submits an application for a drive (multipart/form-data for file upload)
 */
export async function applyToCampusDrive(driveId, formData, token) {
  try {
    const authToken = token || localStorage.getItem("bht_auth_token");
    const headers = {};
    if (authToken) {
      headers["Authorization"] = `Bearer ${authToken}`;
    }

    const res = await fetch(`${API_BASE_URL}/api/campus-drives/${driveId}/apply`, {
      method: "POST",
      headers, // Multer requires fetch to set boundary automatically
      body: formData,
    });

    const data = await res.json().catch(() => ({}));
    if (res.ok && data.success) {
      return { success: true, message: data.message, applicationId: data.applicationId };
    }
    return {
      success: false,
      error: data.message || "Failed to submit application. Please check inputs.",
    };
  } catch (err) {
    return { success: false, error: err.message || "Network error submitting application." };
  }
}

/**
 * Student Only: Fetches submitted applications
 */
export async function fetchMyApplications(token) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/campus-drives/user/my-applications`, {
      headers: getAuthHeaders(token),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.success) {
      return { success: true, applications: data.applications };
    }
    return { success: false, error: data.message || "Failed to load applications." };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/**
 * Admin Only: Fetches all applications for a drive (or 'all')
 */
export async function fetchDriveApplications(driveId = "all", token) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/campus-drives/${driveId}/applications`, {
      headers: getAuthHeaders(token),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.success) {
      return { success: true, applications: data.applications, count: data.count };
    }
    return { success: false, error: data.message || "Failed to load applications." };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/**
 * Admin Only: Updates drive application status
 */
export async function updateDriveApplicationStatus(id, status, token) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/campus-drives/applications/${id}/status`, {
      method: "PATCH",
      headers: getAuthHeaders(token),
      body: JSON.stringify({ status }),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.success) {
      return { success: true, message: data.message };
    }
    return { success: false, error: data.message || "Failed to update status." };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/**
 * Admin Only: Downloads applications as Excel (.xlsx) spreadsheet
 */
export async function downloadApplicationsExcel(driveId = "all", token) {
  try {
    const authToken = token || localStorage.getItem("bht_auth_token");
    const headers = {};
    if (authToken) {
      headers["Authorization"] = `Bearer ${authToken}`;
    }

    const res = await fetch(`${API_BASE_URL}/api/campus-drives/${driveId}/export`, {
      headers,
    });

    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      return {
        success: false,
        error: errJson.message || "Failed to generate Excel export.",
      };
    }

    const blob = await res.blob();
    const disposition = res.headers.get("Content-Disposition");
    let filename = `BHT_Campus_Drives_${Date.now()}.xlsx`;
    if (disposition && disposition.includes("filename=")) {
      const match = disposition.match(/filename="?([^"]+)"?/);
      if (match && match[1]) filename = match[1];
    }

    // Trigger browser download
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);

    return { success: true, filename };
  } catch (err) {
    return { success: false, error: err.message || "Error exporting Excel." };
  }
}

