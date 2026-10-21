import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";

const JWT_SECRET = process.env.JWT_SECRET || "bht_secret_jwt_key_2026_super_secure_token_auth";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

/**
 * Generates signed JWT token
 */
function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

/**
 * Validates registration input
 */
function validateSignUpInput(data) {
  const errors = [];
  const name = (data.name || "").trim();
  const email = (data.email || "").trim().toLowerCase();
  const password = data.password || "";
  const phone = (data.phone || "").trim();

  if (!name) {
    errors.push("Full Name is required.");
  } else if (name.length < 2) {
    errors.push("Full Name must be at least 2 characters.");
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email) {
    errors.push("Email address is required.");
  } else if (!emailRegex.test(email)) {
    errors.push("Please provide a valid email address.");
  }

  if (!password) {
    errors.push("Password is required.");
  } else if (password.length < 6) {
    errors.push("Password must be at least 6 characters long.");
  }

  if (phone) {
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 15) {
      errors.push("Phone number should be between 10 and 15 digits.");
    }
  }

  return errors;
}

/**
 * POST /api/auth/signup
 * Public user registration is disabled
 */
export async function signUp(req, res) {
  return res.status(403).json({
    success: false,
    message: "Public user registration is disabled. Only administrators may log in.",
  });
}

/**
 * POST /api/auth/login
 * Authenticate administrator only
 */
export async function login(req, res, next) {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide both email and password.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Query user by email
    const [rows] = await pool.query(
      "SELECT id, name, email, password, role, phone, created_at FROM users WHERE email = ? LIMIT 1",
      [normalizedEmail]
    );

    if (rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const user = rows[0];

    // Verify bcrypt password hash
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Allow only authenticated administrators
    if (user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Only authenticated administrators can log in.",
      });
    }

    const userPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
    };

    const token = generateToken(userPayload);

    return res.status(200).json({
      success: true,
      message: `Welcome back, ${user.name}!`,
      token,
      user: userPayload,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/auth/me
 * Retrieve the current authenticated user's profile
 */
export async function getMe(req, res, next) {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const [rows] = await pool.query(
      "SELECT id, name, email, role, phone, created_at, updated_at FROM users WHERE id = ? LIMIT 1",
      [req.user.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(200).json({
      success: true,
      user: rows[0],
    });
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/auth/users
 * (Admin Only) List all registered users
 */
export async function getAllUsers(req, res, next) {
  try {
    const [rows] = await pool.query(
      "SELECT id, name, email, role, phone, created_at FROM users ORDER BY created_at DESC"
    );

    return res.status(200).json({
      success: true,
      count: rows.length,
      users: rows,
    });
  } catch (error) {
    next(error);
  }
}
