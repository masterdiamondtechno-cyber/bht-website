import pool from "../config/db.js";
import { sendAdmissionEnquiryEmail } from "../services/emailService.js";

/**
 * Validates enquiry submission payload
 * @param {Object} data
 * @returns {string[]} List of validation error messages
 */
function validateEnquiry(data) {
  const errors = [];

  const fullName = (data.fullName || data.full_name || "").trim();
  if (!fullName) {
    errors.push("Full Name is required.");
  } else if (fullName.length < 2) {
    errors.push("Full Name must be at least 2 characters.");
  }

  const phone = (data.phone || data.mobile || "").trim();
  const phoneDigits = phone.replace(/\D/g, "");
  if (!phone) {
    errors.push("Mobile Number is required.");
  } else if (phoneDigits.length < 10 || phoneDigits.length > 15) {
    errors.push("Valid mobile number (10 to 15 digits) is required.");
  }

  const email = (data.email || "").trim();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email) {
    errors.push("Email address is required.");
  } else if (!emailRegex.test(email)) {
    errors.push("Please provide a valid email address.");
  }

  const course = (data.course || "").trim();
  if (!course) {
    errors.push("Please select a course of interest.");
  }

  return errors;
}

/**
 * POST /api/enquiries
 * Creates a new admission enquiry in MySQL
 */
export async function createEnquiry(req, res, next) {
  try {
    const payload = req.body || {};

    // 1. Validation
    const validationErrors = validateEnquiry(payload);
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation failed.",
        errors: validationErrors,
      });
    }

    const fullName = (payload.fullName || payload.full_name).trim();
    const phone = (payload.phone || payload.mobile).trim();
    const email = payload.email.trim();
    const course = payload.course.trim();
    const education = payload.education ? payload.education.trim() : null;
    const experience = payload.experience ? payload.experience.trim() : null;
    const message = payload.message ? payload.message.trim() : null;

    // 2. Insert into MySQL using prepared statement
    const insertQuery = `
      INSERT INTO enquiries (full_name, phone, email, course, education, experience, message)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await pool.execute(insertQuery, [
      fullName,
      phone,
      email,
      course,
      education,
      experience,
      message,
    ]);

    const newEnquiryId = result.insertId;

    // 3. Send automatic email notification to bht.enquiry123@gmail.com
    const emailResult = await sendAdmissionEnquiryEmail({
      id: newEnquiryId,
      fullName,
      phone,
      email,
      course,
      education,
      experience,
      message,
      createdAt: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    });

    return res.status(201).json({
      success: true,
      message: "Admission enquiry received and saved successfully.",
      emailSent: emailResult.success,
      emailDetails: emailResult.success
        ? { recipient: emailResult.recipient, messageId: emailResult.messageId }
        : {
            status: emailResult.notConfigured ? "not_configured" : "failed",
            error: emailResult.error,
          },
      data: {
        id: newEnquiryId,
        fullName,
        phone,
        email,
        course,
        education,
        experience,
        message,
        createdAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/enquiries
 * Retrieves all enquiries (ordered by most recent first)
 */
export async function getEnquiries(req, res, next) {
  try {
    const limit = Math.min(parseInt(req.query.limit || "50", 10), 100);
    const offset = parseInt(req.query.offset || "0", 10);

    const [rows] = await pool.query(
      `SELECT id, full_name, phone, email, course, education, experience, message, status, created_at, updated_at
       FROM enquiries
       ORDER BY created_at DESC
       LIMIT ? OFFSET ?`,
      [limit, offset]
    );

    const [[countResult]] = await pool.query(
      "SELECT COUNT(*) AS total FROM enquiries"
    );

    return res.status(200).json({
      success: true,
      total: countResult.total,
      count: rows.length,
      data: rows,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/enquiries/:id
 * Retrieves a single enquiry by its ID
 */
export async function getEnquiryById(req, res, next) {
  try {
    const enquiryId = parseInt(req.params.id, 10);
    if (isNaN(enquiryId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid enquiry ID.",
      });
    }

    const [rows] = await pool.query(
      `SELECT id, full_name, phone, email, course, education, experience, message, status, created_at, updated_at
       FROM enquiries
       WHERE id = ?`,
      [enquiryId]
    );

    if (rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Enquiry not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: rows[0],
    });
  } catch (error) {
    next(error);
  }
}

/**
 * PATCH /api/enquiries/:id/status
 * Updates the status of an enquiry (Admin only)
 */
export async function updateEnquiryStatus(req, res, next) {
  try {
    const enquiryId = parseInt(req.params.id, 10);
    const { status } = req.body || {};

    const allowedStatuses = ["new", "contacted", "enrolled", "closed"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status value. Allowed: ${allowedStatuses.join(", ")}`,
      });
    }

    const [result] = await pool.execute(
      "UPDATE enquiries SET status = ? WHERE id = ?",
      [status, enquiryId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: `Enquiry #${enquiryId} status updated to '${status}'.`,
      status,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * DELETE /api/enquiries/:id
 * Deletes an enquiry (Admin only)
 */
export async function deleteEnquiry(req, res, next) {
  try {
    const enquiryId = parseInt(req.params.id, 10);
    if (isNaN(enquiryId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid enquiry ID.",
      });
    }

    const [result] = await pool.execute("DELETE FROM enquiries WHERE id = ?", [enquiryId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: `Enquiry #${enquiryId} deleted successfully.`,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/enquiries/stats/summary
 * Retrieves aggregated statistics for admin dashboard
 */
export async function getEnquiryStats(req, res, next) {
  try {
    const [[totalResult]] = await pool.query("SELECT COUNT(*) AS total FROM enquiries");
    const [[newResult]] = await pool.query("SELECT COUNT(*) AS count FROM enquiries WHERE status = 'new'");
    const [[contactedResult]] = await pool.query("SELECT COUNT(*) AS count FROM enquiries WHERE status = 'contacted'");
    const [[enrolledResult]] = await pool.query("SELECT COUNT(*) AS count FROM enquiries WHERE status = 'enrolled'");
    const [[closedResult]] = await pool.query("SELECT COUNT(*) AS count FROM enquiries WHERE status = 'closed'");
    const [[usersResult]] = await pool.query("SELECT COUNT(*) AS count FROM users");

    const [coursesBreakdown] = await pool.query(
      `SELECT course, COUNT(*) AS count FROM enquiries GROUP BY course ORDER BY count DESC`
    );

    return res.status(200).json({
      success: true,
      stats: {
        totalEnquiries: totalResult.total,
        newEnquiries: newResult.count,
        contactedEnquiries: contactedResult.count,
        enrolledEnquiries: enrolledResult.count,
        closedEnquiries: closedResult.count,
        totalUsers: usersResult.count,
        coursesBreakdown,
      },
    });
  } catch (error) {
    next(error);
  }
}

