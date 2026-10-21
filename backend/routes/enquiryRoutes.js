import express from "express";
import {
  createEnquiry,
  getEnquiries,
  getEnquiryById,
  updateEnquiryStatus,
  deleteEnquiry,
  getEnquiryStats,
} from "../controllers/enquiryController.js";
import { authenticateToken, requireAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public: Submit new enquiry (prospective students)
router.post("/", createEnquiry);

// Admin-Only: Aggregated statistics for dashboard
router.get("/stats/summary", authenticateToken, requireAdmin, getEnquiryStats);

// Admin-Only: List all enquiries
router.get("/", authenticateToken, requireAdmin, getEnquiries);

// Admin-Only: Get enquiry by ID
router.get("/:id", authenticateToken, requireAdmin, getEnquiryById);

// Admin-Only: Update enquiry status (new, contacted, enrolled, closed)
router.patch("/:id/status", authenticateToken, requireAdmin, updateEnquiryStatus);

// Admin-Only: Delete enquiry
router.delete("/:id", authenticateToken, requireAdmin, deleteEnquiry);

export default router;

