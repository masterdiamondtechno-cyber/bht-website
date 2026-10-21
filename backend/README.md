# Bachelor's Hub Technologies (BHT) - Backend API

Node.js + Express.js + MySQL backend service for storing and managing student admission enquiries submitted through the BHT website.

---

## Architecture Overview

- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Database**: MySQL 8.0+
- **Database Driver**: `mysql2/promise` (connection pooling & parameterized prepared statements)
- **Security**: CORS protection, payload validation, environment variables for all secrets

---

## Directory Structure

```
backend/
├── config/
│   └── db.js               # MySQL connection pool & automatic table initialization
├── controllers/
│   └── enquiryController.js# Request validation, SQL insert & retrieval handlers
├── middlewares/
│   └── errorHandler.js     # Global JSON error handling and 404 route handler
├── routes/
│   └── enquiryRoutes.js    # API routing (/api/enquiries)
├── .env                    # Local environment secrets (ignored by git)
├── .env.example            # Configuration template
├── package.json            # Backend dependencies & npm scripts
├── schema.sql              # MySQL database and table schema definition
├── server.js               # Main Express entry point
└── test.js                 # Database connection & integration test
```

---

## Prerequisites

1. **Node.js** (v18.0.0 or higher)
2. **MySQL Server** (v8.0+ running locally or in the cloud)

---

## Setup & Configuration

### 1. Environment Variables
Copy `.env.example` to `.env` inside the `backend` folder:

```bash
cp .env.example .env
```

Edit `backend/.env` with your actual MySQL database credentials:

```env
PORT=5000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=bht_db
DB_CONNECTION_LIMIT=10

CORS_ORIGIN=http://localhost:5173

# Email Notification (Nodemailer & SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_16_char_app_password
NOTIFICATION_RECIPIENT_EMAIL=bht.enquiry123@gmail.com
```

### 2. SMTP Setup Instructions (Gmail Example)
To send automatic email notifications to `bht.enquiry123@gmail.com` via Gmail SMTP:
1. Go to your Google Account: [https://myaccount.google.com/security](https://myaccount.google.com/security)
2. Ensure **2-Step Verification** is turned **ON**.
3. Search for or navigate to **App passwords**: [https://myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
4. Create a new App Password (e.g. named `BHT Website`).
5. Google will provide a **16-character password** (e.g. `abcd efgh ijkl mnop`).
6. Set `SMTP_USER` to your Gmail address and `SMTP_PASS` to the 16-character app password in `backend/.env`.
7. `NOTIFICATION_RECIPIENT_EMAIL` is preset to `bht.enquiry123@gmail.com`.

> **Note**: If `SMTP_USER` or `SMTP_PASS` is not yet configured, the system gracefully saves the enquiry into MySQL without failing, logging an informative notice.

### 3. Database Initialization
The server automatically checks and creates the `enquiries` table on startup.
If you prefer to initialize it manually in MySQL Workbench or CLI, run `backend/schema.sql`:

```sql
CREATE DATABASE IF NOT EXISTS bht_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE bht_db;

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
```

---

## Running the Servers

### 1. Start the Backend API (Port 5000)
From the project root:
```bash
npm run backend
```
Or from inside the `backend/` folder:
```bash
cd backend
npm start
# Or with auto-reload during development:
npm run dev
```

### 2. Start the Frontend (Port 5173)
From the project root:
```bash
npm run dev
```

The frontend Vite server is pre-configured with a proxy at `/api` forwarding requests to `http://localhost:5000`.

---

## API Endpoints Reference

### 1. Health Check
- **Endpoint**: `GET /api/health`
- **Response**:
```json
{
  "status": "ok",
  "service": "BHT Backend API",
  "timestamp": "2026-10-14T15:20:00.000Z"
}
```

### 2. Submit Admission Enquiry
- **Endpoint**: `POST /api/enquiries`
- **Content-Type**: `application/json`
- **Request Body**:
```json
{
  "fullName": "Rahul Sharma",
  "phone": "9876543210",
  "email": "rahul.sharma@example.com",
  "course": "Java Full Stack with AI",
  "education": "B.E. / B.Tech (CS / IT / ECE / Others)",
  "experience": "Fresh Graduate (Looking for Job)",
  "message": "When does the next classroom batch start in Pune?"
}
```
- **Success Response (201 Created)**:
```json
{
  "success": true,
  "message": "Admission enquiry received and saved successfully.",
  "data": {
    "id": 1,
    "fullName": "Rahul Sharma",
    "phone": "9876543210",
    "email": "rahul.sharma@example.com",
    "course": "Java Full Stack with AI",
    "education": "B.E. / B.Tech (CS / IT / ECE / Others)",
    "experience": "Fresh Graduate (Looking for Job)",
    "message": "When does the next classroom batch start in Pune?",
    "createdAt": "2026-10-14T15:20:00.000Z"
  }
}
```
- **Validation Failure Response (400 Bad Request)**:
```json
{
  "success": false,
  "message": "Validation failed.",
  "errors": [
    "Full Name must be at least 2 characters.",
    "Valid mobile number (10 to 15 digits) is required."
  ]
}
```

### 3. List All Enquiries (Admin / Staff)
- **Endpoint**: `GET /api/enquiries?limit=50&offset=0`
- **Success Response (200 OK)**:
```json
{
  "success": true,
  "total": 1,
  "count": 1,
  "data": [ ... ]
}
```

### 4. Get Enquiry by ID
- **Endpoint**: `GET /api/enquiries/:id`
- **Success Response (200 OK)**:
```json
{
  "success": true,
  "data": { ... }
}
```

---

## Verification & Testing

You can run the built-in database integration test at any time:
```bash
cd backend
npm test
```
This tests database connectivity, inserts a test record into MySQL, verifies it via query, and safely cleans up.
