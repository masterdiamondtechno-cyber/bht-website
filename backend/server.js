import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { initializeDatabase } from "./config/db.js";
import enquiryRoutes from "./routes/enquiryRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import driveRoutes from "./routes/driveRoutes.js";
import { notFoundHandler, errorHandler } from "./middlewares/errorHandler.js";

// Load environment variables relative to backend directory
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, ".env") });

const app = express();
const PORT = parseInt(process.env.PORT || "5000", 10);

// CORS Configuration
const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim());

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, postman) or matching allowed origins
      if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes("*")) {
        callback(null, true);
      } else {
        callback(new Error(`CORS blocked for origin: ${origin}`));
      }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded documents statically with permissive CORS, inline disposition, and correct MIME types
app.use(
  "/uploads",
  express.static(path.resolve(__dirname, "uploads"), {
    setHeaders: (res, filePath) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS");
      res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
      const lower = filePath.toLowerCase();
      if (lower.endsWith(".pdf")) {
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "inline");
      } else if (lower.endsWith(".doc")) {
        res.setHeader("Content-Type", "application/msword");
      } else if (lower.endsWith(".docx")) {
        res.setHeader(
          "Content-Type",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        );
      }
    },
  })
);

// Health Check Endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "BHT Backend API",
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/campus-drives", driveRoutes);



// Error Handling
app.use(notFoundHandler);
app.use(errorHandler);

// Start Server
async function startServer() {
  try {
    await initializeDatabase();
    app.listen(PORT, () => {
      console.log(`BHT Backend Server running at http://localhost:${PORT}`);
      console.log(`API health check: http://localhost:${PORT}/api/health`);
      console.log(`Enquiries endpoint: http://localhost:${PORT}/api/enquiries`);
    });
  } catch (error) {
    console.error("Failed to start server due to database initialization failure:", error.message);
    process.exit(1);
  }
}

startServer();

export default app;
