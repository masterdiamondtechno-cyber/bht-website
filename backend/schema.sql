-- ==============================================================================
-- Bachelor's Hub Technologies (BHT) - Database Schema
-- Database: MySQL 8.0+
-- ==============================================================================

-- 1. Create Database
CREATE DATABASE IF NOT EXISTS bht_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE bht_db;

-- 2. Create Enquiries Table
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

-- 3. Create Users Table (for Authentication & Role-Based Access Control)
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

-- 4. Create Campus Drives Table
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

-- 5. Create Drive Applications Table (with duplicate prevention)
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


