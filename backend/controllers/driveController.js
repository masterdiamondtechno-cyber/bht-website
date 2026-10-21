import pool from "../config/db.js";
import XLSX from "xlsx";
import path from "path";
import fs from "fs";

/**
 * GET /api/campus-drives
 * List all campus drives (Public, with user application status if authenticated)
 */
export async function getCampusDrives(req, res, next) {
  try {
    const { status, search } = req.query;

    let query = `
      SELECT cd.*, 
        COUNT(da.id) AS applicant_count
      FROM campus_drives cd
      LEFT JOIN drive_applications da ON cd.id = da.drive_id
    `;
    const params = [];
    const conditions = [];

    if (status && status !== "all") {
      conditions.push("cd.status = ?");
      params.push(status);
    }

    if (search) {
      conditions.push(
        "(cd.company_name LIKE ? OR cd.job_title LIKE ? OR cd.location LIKE ? OR cd.skills LIKE ?)"
      );
      const searchPattern = `%${search}%`;
      params.push(searchPattern, searchPattern, searchPattern, searchPattern);
    }

    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    query += " GROUP BY cd.id ORDER BY cd.deadline ASC, cd.created_at DESC";

    const [drives] = await pool.query(query, params);

    // If user is authenticated, attach whether they already applied
    let userAppliedDriveIds = new Map();
    if (req.user && req.user.id) {
      const [userApps] = await pool.query(
        "SELECT drive_id, status FROM drive_applications WHERE user_id = ?",
        [req.user.id]
      );
      userAppliedDriveIds = new Map(userApps.map((a) => [a.drive_id, a.status]));
    }

    const drivesWithStatus = drives.map((d) => ({
      ...d,
      hasApplied: userAppliedDriveIds.has(d.id),
      userApplicationStatus: userAppliedDriveIds.get(d.id) || null,
    }));

    return res.status(200).json({
      success: true,
      count: drivesWithStatus.length,
      drives: drivesWithStatus,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/campus-drives/:id
 * Retrieve single campus drive by ID
 */
export async function getCampusDriveById(req, res, next) {
  try {
    const driveId = parseInt(req.params.id, 10);
    if (isNaN(driveId)) {
      return res.status(400).json({ success: false, message: "Invalid drive ID." });
    }

    const [rows] = await pool.query(
      `SELECT cd.*, COUNT(da.id) AS applicant_count
       FROM campus_drives cd
       LEFT JOIN drive_applications da ON cd.id = da.drive_id
       WHERE cd.id = ?
       GROUP BY cd.id`,
      [driveId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: "Campus drive not found." });
    }

    const drive = rows[0];

    // Check if authenticated user has applied
    let hasApplied = false;
    let applicationDetails = null;
    if (req.user && req.user.id) {
      const [userApps] = await pool.query(
        "SELECT * FROM drive_applications WHERE user_id = ? AND drive_id = ?",
        [req.user.id, driveId]
      );
      if (userApps.length > 0) {
        hasApplied = true;
        applicationDetails = userApps[0];
      }
    }

    return res.status(200).json({
      success: true,
      drive: {
        ...drive,
        hasApplied,
        applicationDetails,
      },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * POST /api/campus-drives
 * Create a new campus drive (Admin Only)
 */
export async function createCampusDrive(req, res, next) {
  try {
    const {
      company_name,
      company_logo,
      job_title,
      location,
      eligibility,
      skills,
      batch,
      job_type,
      salary,
      deadline,
      description,
      status,
    } = req.body || {};

    if (!company_name || !job_title || !location || !eligibility || !skills || !batch || !deadline || !description) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required drive details (Company, Title, Location, Eligibility, Skills, Batch, Deadline, Description).",
      });
    }

    const insertQuery = `
      INSERT INTO campus_drives (
        company_name, company_logo, job_title, location, eligibility, skills, batch,
        job_type, salary, deadline, description, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await pool.execute(insertQuery, [
      company_name.trim(),
      company_logo ? company_logo.trim() : null,
      job_title.trim(),
      location.trim(),
      eligibility.trim(),
      skills.trim(),
      batch.trim(),
      job_type ? job_type.trim() : "Full Time",
      salary ? salary.trim() : null,
      deadline,
      description.trim(),
      status || "active",
    ]);

    return res.status(201).json({
      success: true,
      message: "Campus drive created successfully.",
      driveId: result.insertId,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * PUT /api/campus-drives/:id
 * Edit an existing campus drive (Admin Only)
 */
export async function updateCampusDrive(req, res, next) {
  try {
    const driveId = parseInt(req.params.id, 10);
    if (isNaN(driveId)) {
      return res.status(400).json({ success: false, message: "Invalid drive ID." });
    }

    const {
      company_name,
      company_logo,
      job_title,
      location,
      eligibility,
      skills,
      batch,
      job_type,
      salary,
      deadline,
      description,
      status,
    } = req.body || {};

    const updateQuery = `
      UPDATE campus_drives SET
        company_name = ?,
        company_logo = ?,
        job_title = ?,
        location = ?,
        eligibility = ?,
        skills = ?,
        batch = ?,
        job_type = ?,
        salary = ?,
        deadline = ?,
        description = ?,
        status = ?
      WHERE id = ?
    `;

    const [result] = await pool.execute(updateQuery, [
      company_name.trim(),
      company_logo ? company_logo.trim() : null,
      job_title.trim(),
      location.trim(),
      eligibility.trim(),
      skills.trim(),
      batch.trim(),
      job_type ? job_type.trim() : "Full Time",
      salary ? salary.trim() : null,
      deadline,
      description.trim(),
      status || "active",
      driveId,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Campus drive not found." });
    }

    return res.status(200).json({
      success: true,
      message: "Campus drive updated successfully.",
    });
  } catch (error) {
    next(error);
  }
}

/**
 * DELETE /api/campus-drives/:id
 * Delete a campus drive (Admin Only)
 */
export async function deleteCampusDrive(req, res, next) {
  try {
    const driveId = parseInt(req.params.id, 10);
    if (isNaN(driveId)) {
      return res.status(400).json({ success: false, message: "Invalid drive ID." });
    }

    const [result] = await pool.execute("DELETE FROM campus_drives WHERE id = ?", [driveId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Campus drive not found." });
    }

    return res.status(200).json({
      success: true,
      message: "Campus drive and associated applications deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
}

/**
 * POST /api/campus-drives/:id/apply
 * Public application submission for a campus drive (No login required)
 */
export async function applyToDrive(req, res, next) {
  try {
    const driveId = parseInt(req.params.id, 10);
    const userId = req.user ? req.user.id : null;

    if (isNaN(driveId)) {
      return res.status(400).json({ success: false, message: "Invalid drive ID." });
    }

    // Verify drive exists and is active
    const [drives] = await pool.query(
      "SELECT id, company_name, job_title, deadline, status FROM campus_drives WHERE id = ? LIMIT 1",
      [driveId]
    );

    if (drives.length === 0) {
      return res.status(404).json({ success: false, message: "Campus drive not found." });
    }

    const drive = drives[0];
    if (drive.status === "closed") {
      return res.status(400).json({
        success: false,
        message: "This campus drive is currently closed for new applications.",
      });
    }

    // Extract form fields
    const {
      full_name,
      email,
      phone,
      degree,
      branch,
      batch_year,
      cgpa_percentage,
      skills,
      note,
    } = req.body || {};

    if (!full_name || !email || !phone || !degree || !branch || !batch_year || !cgpa_percentage) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required application fields (Name, Email, Mobile, Degree, Branch, Batch Year, and CGPA/Percentage).",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check for duplicate application by email for this drive
    const [existing] = await pool.query(
      "SELECT id FROM drive_applications WHERE email = ? AND drive_id = ? LIMIT 1",
      [normalizedEmail, driveId]
    );

    if (existing.length > 0) {
      return res.status(409).json({
        success: false,
        message: "You have already submitted an application with this email address for this campus drive. Duplicate applications are not allowed.",
      });
    }

    let resumeUrl = null;
    let resumeOriginalName = null;

    if (req.file) {
      resumeUrl = `/uploads/resumes/${req.file.filename}`;
      resumeOriginalName = req.file.originalname;
    }

    const insertQuery = `
      INSERT INTO drive_applications (
        drive_id, user_id, full_name, email, phone, degree, branch, batch_year,
        cgpa_percentage, skills, resume_url, resume_original_name, note, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'applied')
    `;

    const [result] = await pool.execute(insertQuery, [
      driveId,
      userId,
      full_name.trim(),
      normalizedEmail,
      phone.trim(),
      degree.trim(),
      branch.trim(),
      batch_year.trim(),
      cgpa_percentage.trim(),
      skills ? skills.trim() : null,
      resumeUrl,
      resumeOriginalName,
      note ? note.trim() : null,
    ]);

    return res.status(201).json({
      success: true,
      message: `Your application for ${drive.company_name} (${drive.job_title}) has been submitted successfully!`,
      applicationId: result.insertId,
    });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        success: false,
        message: "You have already applied for this campus drive.",
      });
    }
    next(error);
  }
}

/**
 * GET /api/campus-drives/user/my-applications
 * Student views their submitted applications
 */
export async function getMyApplications(req, res, next) {
  try {
    const userId = req.user.id;
    const [rows] = await pool.query(
      `SELECT da.*, cd.company_name, cd.company_logo, cd.job_title, cd.location, cd.deadline
       FROM drive_applications da
       JOIN campus_drives cd ON da.drive_id = cd.id
       WHERE da.user_id = ?
       ORDER BY da.applied_at DESC`,
      [userId]
    );

    return res.status(200).json({
      success: true,
      count: rows.length,
      applications: rows,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/campus-drives/:id/applications
 * Admin views all applications for a drive (or all drives if id === 'all')
 */
export async function getDriveApplications(req, res, next) {
  try {
    const driveId = req.params.id;
    let query = `
      SELECT da.*, cd.company_name, cd.job_title, cd.batch AS drive_batch, cd.location
      FROM drive_applications da
      JOIN campus_drives cd ON da.drive_id = cd.id
    `;
    const params = [];

    if (driveId && driveId !== "all") {
      query += " WHERE da.drive_id = ?";
      params.push(parseInt(driveId, 10));
    }

    query += " ORDER BY da.applied_at DESC";

    const [rows] = await pool.query(query, params);

    return res.status(200).json({
      success: true,
      count: rows.length,
      applications: rows,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * PATCH /api/campus-drives/applications/:id/status
 * Admin updates an application status
 */
export async function updateApplicationStatus(req, res, next) {
  try {
    const applicationId = parseInt(req.params.id, 10);
    const { status } = req.body || {};

    const validStatuses = ["applied", "shortlisted", "interviewing", "selected", "rejected"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Allowed values: ${validStatuses.join(", ")}`,
      });
    }

    const [result] = await pool.execute(
      "UPDATE drive_applications SET status = ? WHERE id = ?",
      [status, applicationId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Application not found." });
    }

    return res.status(200).json({
      success: true,
      message: `Application status updated to '${status}'.`,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/campus-drives/:id/export
 * Admin exports applications to Excel (.xlsx) file with clickable resume hyperlinks
 */
export async function exportApplicationsToExcel(req, res, next) {
  try {
    const driveId = req.params.id;
    let query = `
      SELECT 
        da.id,
        cd.company_name,
        cd.job_title,
        cd.batch AS drive_batch,
        da.full_name,
        da.email,
        da.phone,
        da.degree,
        da.branch,
        da.batch_year,
        da.cgpa_percentage,
        da.skills,
        da.resume_url,
        da.resume_original_name,
        da.status,
        da.note,
        DATE_FORMAT(da.applied_at, '%Y-%m-%d %H:%i') AS applied_at
      FROM drive_applications da
      JOIN campus_drives cd ON da.drive_id = cd.id
    `;
    const params = [];

    let fileSuffix = "All_Drives";
    if (driveId && driveId !== "all") {
      query += " WHERE da.drive_id = ?";
      params.push(parseInt(driveId, 10));
      fileSuffix = `Drive_${driveId}`;
    }

    query += " ORDER BY da.applied_at DESC";

    const [rows] = await pool.query(query, params);

    // Determine base URL dynamically from the incoming HTTP request
    const protocol = req.headers["x-forwarded-proto"] || req.protocol || "http";
    const host = req.get("host") || `localhost:${process.env.PORT || 5000}`;
    const baseUrl = process.env.BACKEND_URL || `${protocol}://${host}`;

    // Map each application to an Excel row object
    const exportRows = rows.map((app) => {
      let resumeDisplay = "No Resume Uploaded";
      if (app.resume_url) {
        resumeDisplay = app.resume_original_name || "View Resume PDF";
      }

      return {
        "Application ID": app.id,
        "Company Name": app.company_name,
        "Job Title": app.job_title,
        "Target Batch": app.drive_batch || "—",
        "Student Name": app.full_name,
        "Email Address": app.email,
        "Mobile Number": app.phone,
        "Degree": app.degree,
        "Branch / Stream": app.branch,
        "Passing Year": app.batch_year,
        "CGPA / %": app.cgpa_percentage,
        "Skills": app.skills || "—",
        "Resume": resumeDisplay,
        "Status": app.status,
        "Candidate Note": app.note || "—",
        "Applied Date": app.applied_at,
      };
    });

    // Create worksheet from row objects
    const worksheet = XLSX.utils.json_to_sheet(exportRows);

    // Find the Resume column index (0-indexed)
    const headerKeys = exportRows.length > 0 ? Object.keys(exportRows[0]) : [];
    const resumeColIndex = headerKeys.indexOf("Resume");

    // Add clickable hyperlinks for candidates with resumes
    if (resumeColIndex !== -1) {
      rows.forEach((app, index) => {
        if (app.resume_url) {
          const rawUrl = app.resume_url.trim();
          let fullResumeUrl = "";
          if (rawUrl.startsWith("http://") || rawUrl.startsWith("https://")) {
            fullResumeUrl = rawUrl;
          } else {
            const cleanPath = rawUrl.startsWith("/") ? rawUrl : `/${rawUrl}`;
            fullResumeUrl = `${baseUrl}${cleanPath}`;
          }

          // Properly encode URL for spaces and special characters
          const encodedUrl = encodeURI(fullResumeUrl);
          const cellRef = XLSX.utils.encode_cell({ c: resumeColIndex, r: index + 1 });
          const displayName = app.resume_original_name || "View Resume PDF";

          if (worksheet[cellRef]) {
            worksheet[cellRef].t = "s";
            worksheet[cellRef].v = displayName;
            worksheet[cellRef].l = {
              Target: encodedUrl,
              Tooltip: `Click to open candidate resume (${displayName})`,
            };
          }
        }
      });
    }

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Applications");

    // Auto-fit column widths
    const columnWidths = [
      { wch: 15 }, // ID
      { wch: 28 }, // Company
      { wch: 30 }, // Job Title
      { wch: 16 }, // Target Batch
      { wch: 22 }, // Student Name
      { wch: 28 }, // Email
      { wch: 16 }, // Phone
      { wch: 15 }, // Degree
      { wch: 20 }, // Branch
      { wch: 14 }, // Passing Year
      { wch: 12 }, // CGPA
      { wch: 30 }, // Skills
      { wch: 32 }, // Resume
      { wch: 15 }, // Status
      { wch: 30 }, // Note
      { wch: 18 }, // Applied Date
    ];
    worksheet["!cols"] = columnWidths;

    // Generate binary buffer
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });

    const filename = `BHT_Campus_Drive_Applications_${fileSuffix}_${new Date().toISOString().slice(0, 10)}.xlsx`;

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.setHeader("Access-Control-Expose-Headers", "Content-Disposition");

    return res.send(excelBuffer);
  } catch (error) {
    next(error);
  }
}
