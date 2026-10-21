import jwt from "jsonwebtoken";
import pool from "../config/db.js";

/**
 * Middleware to authenticate requests using JWT Bearer token
 */
export function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"] || req.headers["Authorization"];
  const token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Authentication required. Please provide a valid Bearer token.",
    });
  }

  const secret = process.env.JWT_SECRET || "bht_secret_jwt_key_2026_super_secure_token_auth";

  jwt.verify(token, secret, (err, decodedUser) => {
    if (err) {
      const isExpired = err.name === "TokenExpiredError";
      return res.status(403).json({
        success: false,
        message: isExpired
          ? "Your session has expired. Please log in again."
          : "Invalid or corrupted authentication token.",
      });
    }

    req.user = decodedUser;
    next();
  });
}

/**
 * Optional authentication: decodes user token if provided, but does not block unauthenticated users
 */
export function optionalAuth(req, res, next) {
  const authHeader = req.headers["authorization"] || req.headers["Authorization"];
  const token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

  if (!token) {
    return next();
  }

  const secret = process.env.JWT_SECRET || "bht_secret_jwt_key_2026_super_secure_token_auth";
  jwt.verify(token, secret, (err, decodedUser) => {
    if (!err && decodedUser) {
      req.user = decodedUser;
    }
    next();
  });
}


/**
 * Middleware to restrict access only to users with the 'admin' role
 */
export function requireAdmin(req, res, next) {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Authentication required.",
    });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Administrator privileges are required to perform this action.",
    });
  }

  next();
}
