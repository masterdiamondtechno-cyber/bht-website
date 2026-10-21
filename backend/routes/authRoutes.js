import express from "express";
import {
  signUp,
  login,
  getMe,
  getAllUsers,
} from "../controllers/authController.js";
import { authenticateToken, requireAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public Authentication Routes
router.post("/signup", signUp);
router.post("/login", login);

// Authenticated User Profile
router.get("/me", authenticateToken, getMe);

// Admin-Only Routes
router.get("/users", authenticateToken, requireAdmin, getAllUsers);

export default router;
