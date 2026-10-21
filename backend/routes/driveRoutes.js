import express from "express";
import {
  getCampusDrives,
  getCampusDriveById,
  createCampusDrive,
  updateCampusDrive,
  deleteCampusDrive,
  applyToDrive,
  getMyApplications,
  getDriveApplications,
  updateApplicationStatus,
  exportApplicationsToExcel,
} from "../controllers/driveController.js";
import {
  authenticateToken,
  requireAdmin,
  optionalAuth,
} from "../middlewares/authMiddleware.js";
import { uploadResume } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

// -------------------------------------------------------------
// Public / Student Campus Drive Routes
// -------------------------------------------------------------

// List campus drives (Public, detects authenticated user status if logged in)
router.get("/", optionalAuth, getCampusDrives);

// Student: View submitted applications (Requires Authentication)
router.get("/user/my-applications", authenticateToken, getMyApplications);

// Single campus drive details
router.get("/:id", optionalAuth, getCampusDriveById);

// Public: Submit application with resume upload (Open to everyone without login)
router.post("/:id/apply", optionalAuth, uploadResume.single("resume"), applyToDrive);

// -------------------------------------------------------------
// Admin-Only Routes (Requires Admin Role)
// -------------------------------------------------------------

// Admin: Create a new campus drive
router.post("/", authenticateToken, requireAdmin, createCampusDrive);

// Admin: Export applications to Excel (.xlsx)
router.get("/:id/export", authenticateToken, requireAdmin, exportApplicationsToExcel);

// Admin: View all applications for a drive (or 'all')
router.get("/:id/applications", authenticateToken, requireAdmin, getDriveApplications);

// Admin: Edit a campus drive
router.put("/:id", authenticateToken, requireAdmin, updateCampusDrive);

// Admin: Delete a campus drive
router.delete("/:id", authenticateToken, requireAdmin, deleteCampusDrive);

// Admin: Update application status
router.patch("/applications/:id/status", authenticateToken, requireAdmin, updateApplicationStatus);

export default router;
