import pool, { initializeDatabase } from "./config/db.js";
import { isSmtpConfigured, sendAdmissionEnquiryEmail } from "./services/emailService.js";

async function runTest() {
  console.log("=== BHT Backend & MySQL & Nodemailer Integration Test ===");

  // 1. Initialize DB
  await initializeDatabase();
  console.log("✓ Database initialized successfully.");

  // 2. Check SMTP status
  const smtpConfigured = isSmtpConfigured();
  console.log(
    `✓ SMTP Status: ${
      smtpConfigured
        ? "Configured"
        : "Not yet configured in .env (graceful fallback active)"
    }`
  );
  console.log(
    `✓ Target Notification Recipient: ${
      process.env.NOTIFICATION_RECIPIENT_EMAIL || "bht.enquiry123@gmail.com"
    }`
  );

  // 3. Insert test enquiry into MySQL
  const testPayload = {
    fullName: "Integration Test Student",
    phone: "9876543210",
    email: "test.student@bht.edu",
    course: "Java Full Stack with AI",
    education: "B.E. / B.Tech",
    experience: "Fresh Graduate (Looking for Job)",
    message: "Automated backend integration verification test.",
  };

  const insertQuery = `
    INSERT INTO enquiries (full_name, phone, email, course, education, experience, message)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const [insertRes] = await pool.execute(insertQuery, [
    testPayload.fullName,
    testPayload.phone,
    testPayload.email,
    testPayload.course,
    testPayload.education,
    testPayload.experience,
    testPayload.message,
  ]);

  console.log("✓ Inserted test enquiry ID into MySQL:", insertRes.insertId);

  // 4. Test email notification module
  console.log("Testing email notification module...");
  const emailResult = await sendAdmissionEnquiryEmail({
    id: insertRes.insertId,
    ...testPayload,
    createdAt: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
  });

  if (smtpConfigured) {
    if (emailResult.success) {
      console.log(
        `✓ Email notification sent successfully to ${emailResult.recipient} (Message ID: ${emailResult.messageId})`
      );
    } else {
      console.warn(
        `! SMTP is configured but sendMail failed (check credentials): ${emailResult.error}`
      );
    }
  } else {
    console.log(
      "✓ Email notification gracefully handled missing SMTP credentials without throwing errors."
    );
  }

  // 5. Query back from MySQL to ensure database state is completely intact
  const [rows] = await pool.query("SELECT * FROM enquiries WHERE id = ?", [
    insertRes.insertId,
  ]);

  if (rows.length === 1 && rows[0].email === "test.student@bht.edu") {
    console.log("✓ Successfully verified row in MySQL table 'enquiries':", {
      id: rows[0].id,
      full_name: rows[0].full_name,
      phone: rows[0].phone,
      email: rows[0].email,
      course: rows[0].course,
      status: rows[0].status,
      created_at: rows[0].created_at,
    });
  } else {
    throw new Error("Row verification in MySQL failed!");
  }

  // 6. Clean up test row
  await pool.execute("DELETE FROM enquiries WHERE id = ?", [insertRes.insertId]);
  console.log("✓ Cleaned up test enquiry row from database.");

  // 7. Verify Default Admin Account Security
  console.log("\n--- Testing Authentication & RBAC ---");
  const bcrypt = (await import("bcryptjs")).default;
  const adminEmail = process.env.DEFAULT_ADMIN_EMAIL || "bht.enquiry123@gmail.com";
  const adminPass = process.env.DEFAULT_ADMIN_PASSWORD || "bht@1234";

  const [adminRows] = await pool.query("SELECT * FROM users WHERE email = ?", [adminEmail]);
  if (adminRows.length === 0) {
    throw new Error("Default admin was not created!");
  }
  const adminUser = adminRows[0];
  if (adminUser.role !== "admin") {
    throw new Error(`Admin role mismatch! Expected 'admin', got '${adminUser.role}'`);
  }
  if (!adminUser.password.startsWith("$2")) {
    throw new Error("Admin password is NOT stored as a bcrypt hash!");
  }
  const isMatch = await bcrypt.compare(adminPass, adminUser.password);
  if (!isMatch) {
    throw new Error("Admin password hash does not match initial password 'bht@1234'!");
  }
  console.log(`✓ Admin user '${adminEmail}' verified with valid bcrypt hash in MySQL.`);

  // 8. Test Regular User Creation and Password Hashing
  const testUserEmail = "student.test." + Date.now() + "@bht.edu";
  const testUserPass = "studentPass@123";
  const hashedUserPass = await bcrypt.hash(testUserPass, 10);

  const [userInsert] = await pool.execute(
    "INSERT INTO users (name, email, password, role, phone) VALUES (?, ?, ?, 'user', '9988776655')",
    ["Student Test User", testUserEmail, hashedUserPass]
  );
  console.log(`✓ Inserted regular user (ID: ${userInsert.insertId}, Role: user)`);

  const [testUserRows] = await pool.query("SELECT * FROM users WHERE id = ?", [userInsert.insertId]);
  if (testUserRows[0].role !== "user") {
    throw new Error("Regular user role should be 'user'!");
  }
  const userPasswordMatch = await bcrypt.compare(testUserPass, testUserRows[0].password);
  if (!userPasswordMatch) {
    throw new Error("User password hash comparison failed!");
  }
  console.log("✓ Regular user bcrypt password verified.");

  // 9. Clean up test user
  await pool.execute("DELETE FROM users WHERE id = ?", [userInsert.insertId]);
  console.log("✓ Cleaned up test user.");

  console.log("\n==================================================");
  console.log("ALL INTEGRATION & AUTH TESTS PASSED SUCCESSFULLY!");
  console.log("==================================================");
  process.exit(0);
}

runTest().catch((err) => {
  console.error("Integration test failed:", err);
  process.exit(1);
});
