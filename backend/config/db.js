import mysql from "mysql2/promise";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// Create connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "3306", 10),
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "bht_db",
  waitForConnections: true,
  connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT || "10", 10),
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000,
});

/**
 * Verifies connection and ensures the enquiries table exists.
 */
export async function initializeDatabase() {
  try {
    const connection = await pool.getConnection();
    console.log("Connected to MySQL Database:", process.env.DB_NAME || "bht_db");

    // Ensure enquiries table exists
    const createEnquiriesTableQuery = `
      CREATE TABLE IF NOT EXISTS enquiries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        phone VARCHAR(25) NOT NULL,
        email VARCHAR(255) NOT NULL,
        course VARCHAR(100) NOT NULL,
        education VARCHAR(150) DEFAULT NULL,
        experience VARCHAR(150) DEFAULT NULL,
        message TEXT DEFAULT NULL,
        status ENUM('new', 'contacted', 'enrolled', 'closed') DEFAULT 'new',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_created_at (created_at),
        INDEX idx_course (course),
        INDEX idx_status (status)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `;
    await connection.query(createEnquiriesTableQuery);
    console.log("MySQL 'enquiries' table verified and ready.");

    // Ensure users table exists
    const createUsersTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role ENUM('admin', 'user') NOT NULL DEFAULT 'user',
        phone VARCHAR(25) DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_email (email),
        INDEX idx_role (role)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `;
    await connection.query(createUsersTableQuery);
    console.log("MySQL 'users' table verified and ready.");

    // Ensure campus_drives table exists
    const createCampusDrivesTableQuery = `
      CREATE TABLE IF NOT EXISTS campus_drives (
        id INT AUTO_INCREMENT PRIMARY KEY,
        company_name VARCHAR(255) NOT NULL,
        company_logo VARCHAR(500) DEFAULT NULL,
        job_title VARCHAR(255) NOT NULL,
        location VARCHAR(150) NOT NULL,
        eligibility VARCHAR(255) NOT NULL,
        skills VARCHAR(500) NOT NULL,
        batch VARCHAR(100) NOT NULL,
        job_type VARCHAR(100) NOT NULL DEFAULT 'Full Time',
        salary VARCHAR(100) DEFAULT NULL,
        deadline DATE NOT NULL,
        description TEXT NOT NULL,
        status ENUM('active', 'closed', 'upcoming') DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_status (status),
        INDEX idx_deadline (deadline)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `;
    await connection.query(createCampusDrivesTableQuery);
    console.log("MySQL 'campus_drives' table verified and ready.");

    // Ensure drive_applications table exists
    const createApplicationsTableQuery = `
      CREATE TABLE IF NOT EXISTS drive_applications (
        id INT AUTO_INCREMENT PRIMARY KEY,
        drive_id INT NOT NULL,
        user_id INT NULL DEFAULT NULL,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(25) NOT NULL,
        degree VARCHAR(150) NOT NULL,
        branch VARCHAR(150) NOT NULL,
        batch_year VARCHAR(10) NOT NULL,
        cgpa_percentage VARCHAR(20) NOT NULL,
        skills TEXT DEFAULT NULL,
        resume_url VARCHAR(500) DEFAULT NULL,
        resume_original_name VARCHAR(255) DEFAULT NULL,
        note TEXT DEFAULT NULL,
        status ENUM('applied', 'shortlisted', 'interviewing', 'selected', 'rejected') DEFAULT 'applied',
        applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE KEY uk_email_drive (email, drive_id),
        INDEX idx_drive (drive_id),
        INDEX idx_user (user_id),
        INDEX idx_status (status)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `;
    await connection.query(createApplicationsTableQuery);

    // Apply migration for public applications if table already exists
    try {
      await connection.query("ALTER TABLE drive_applications MODIFY user_id INT NULL DEFAULT NULL");
    } catch {
      // already nullable
    }
    try {
      await connection.query("ALTER TABLE drive_applications DROP INDEX uk_user_drive");
    } catch {
      // index already dropped or not present
    }
    try {
      await connection.query("ALTER TABLE drive_applications ADD UNIQUE KEY uk_email_drive (email, drive_id)");
    } catch {
      // index already exists
    }

    console.log("MySQL 'drive_applications' table verified and ready.");

    // Seed default admin account if not already present
    await seedDefaultAdmin(connection);

    // Seed initial sample campus drives if none exist
    await seedInitialDrives(connection);

    connection.release();
  } catch (error) {
    console.error("MySQL Database Connection Failed:", error.message);
    throw error;
  }
}

/**
 * Seeds the default administrator account securely using bcrypt.
 * Never stores plain text passwords.
 */
async function seedDefaultAdmin(connection) {
  const adminEmail = (process.env.DEFAULT_ADMIN_EMAIL || "bht.enquiry123@gmail.com").trim().toLowerCase();
  const adminPassword = process.env.DEFAULT_ADMIN_PASSWORD || "bht@1234";
  const adminName = (process.env.DEFAULT_ADMIN_NAME || "BHT Administrator").trim();

  // Check if admin already exists
  const [existing] = await connection.query(
    "SELECT id, email, role FROM users WHERE email = ? LIMIT 1",
    [adminEmail]
  );

  if (existing.length === 0) {
    const bcrypt = await import("bcryptjs");
    const saltRounds = 10;
    const hashedPassword = await bcrypt.default.hash(adminPassword, saltRounds);

    await connection.query(
      `INSERT INTO users (name, email, password, role, phone)
       VALUES (?, ?, ?, 'admin', '9876543210')`,
      [adminName, adminEmail, hashedPassword]
    );

    console.log(`✓ Default admin account successfully seeded into MySQL: ${adminEmail} (Role: admin, bcrypt encrypted)`);
  } else {
    // If user exists, make sure they have role 'admin'
    if (existing[0].role !== "admin") {
      await connection.query(
        "UPDATE users SET role = 'admin' WHERE id = ?",
        [existing[0].id]
      );
      console.log(`✓ Updated existing account ${adminEmail} to admin role.`);
    } else {
      console.log(`✓ Default admin account verified: ${adminEmail} (Role: admin).`);
    }
  }
}

/**
 * Seeds initial campus drives if the table is empty
 */
async function seedInitialDrives(connection) {
  try {
    const [[countResult]] = await connection.query("SELECT COUNT(*) as count FROM campus_drives");
    if (countResult.count > 0) {
      return;
    }

    const futureDate1 = new Date();
    futureDate1.setDate(futureDate1.getDate() + 25);
    const futureDate2 = new Date();
    futureDate2.setDate(futureDate2.getDate() + 18);
    const futureDate3 = new Date();
    futureDate3.setDate(futureDate3.getDate() + 35);
    const futureDate4 = new Date();
    futureDate4.setDate(futureDate4.getDate() + 14);

    const initialDrives = [
      {
        company_name: "Cognizant Technology Solutions",
        company_logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=150&auto=format&fit=crop&q=80",
        job_title: "GenC Next Developer - Java & AI",
        location: "Pune / Bengaluru / Hyderabad",
        eligibility: "B.E / B.Tech / MCA (Min 60% with no standing arrears)",
        skills: "Java, Spring Boot, Microservices, MySQL, REST APIs",
        batch: "2024 / 2025 / 2026 Batch",
        job_type: "Full Time",
        salary: "6.75 - 9.2 LPA",
        deadline: futureDate1.toISOString().split("T")[0],
        description: "Join Cognizant's GenC Next elite engineering team working on modern microservices architecture, cloud-native deployments, and AI integrations. Training & onboarding in Pune campus.",
        status: "active",
      },
      {
        company_name: "Accenture Solutions",
        company_logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=150&auto=format&fit=crop&q=80",
        job_title: "Associate Software Engineer (ASE)",
        location: "Pune / Mumbai / Hybrid",
        eligibility: "B.E / B.Tech / MCA (Min 65% aggregate)",
        skills: "Python, Django, FastAPI, SQL, Docker, React.js",
        batch: "2025 / 2026 Batch",
        job_type: "Full Time",
        salary: "4.5 - 6.5 LPA",
        deadline: futureDate2.toISOString().split("T")[0],
        description: "Accenture Technology is hiring dynamic software associates to build resilient enterprise cloud solutions and modern backend services. Comprehensive mentor support provided.",
        status: "active",
      },
      {
        company_name: "TCS (Tata Consultancy Services)",
        company_logo: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=150&auto=format&fit=crop&q=80",
        job_title: "System Engineer - Digital Cadre",
        location: "Pune / Chennai / Pan India",
        eligibility: "B.Tech / M.Tech / MCA (Min 60% throughout)",
        skills: "Data Structures, Algorithms, SQL, Java/Python, Git",
        batch: "2024 / 2025 Batch",
        job_type: "Full Time",
        salary: "7.0 - 9.0 LPA",
        deadline: futureDate3.toISOString().split("T")[0],
        description: "TCS Digital invites high-potential engineering graduates to develop cutting-edge digital transformation platforms for Fortune 500 global clients.",
        status: "active",
      },
      {
        company_name: "Deloitte US-India",
        company_logo: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=150&auto=format&fit=crop&q=80",
        job_title: "Analyst - Business Technology & Data Analytics",
        location: "Hyderabad / Bengaluru / Pune",
        eligibility: "B.Tech / MCA / M.Sc (Analytics, IT, Math, CS)",
        skills: "SQL, Power BI, Python, Excel, Predictive Analytics",
        batch: "2024 / 2025 / 2026 Batch",
        job_type: "Full Time",
        salary: "7.6 - 8.8 LPA",
        deadline: futureDate4.toISOString().split("T")[0],
        description: "Deloitte is seeking forward-thinking Data Analysts to generate high-value predictive insights, BI dashboards, and automation workflows for global strategic initiatives.",
        status: "active",
      },
    ];

    for (const drive of initialDrives) {
      await connection.query(
        `INSERT INTO campus_drives (company_name, company_logo, job_title, location, eligibility, skills, batch, job_type, salary, deadline, description, status)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          drive.company_name,
          drive.company_logo,
          drive.job_title,
          drive.location,
          drive.eligibility,
          drive.skills,
          drive.batch,
          drive.job_type,
          drive.salary,
          drive.deadline,
          drive.description,
          drive.status,
        ]
      );
    }
    console.log("✓ Initial campus drives successfully seeded into MySQL.");
  } catch (err) {
    console.warn("Notice: Failed to seed sample campus drives:", err.message);
  }
}

export default pool;
