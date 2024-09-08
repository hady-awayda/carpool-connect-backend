// connection.js

import mariadb from "mariadb";
import dotenv from "dotenv";

// Load environment variables from .env
dotenv.config();

const pool = mariadb.createPool({
  host:
    process.env.DB_HOST ||
    "carpool-dev.c1q0i2yy63mz.us-west-2.rds.amazonaws.com", // RDS endpoint
  user: process.env.DB_USER || "admin", // RDS MariaDB username
  password: process.env.DB_PASSWORD || "sefactory", // RDS MariaDB password
  database: process.env.DB_NAME || "carpool_dev", // Your database name
  port: process.env.DB_PORT || 3306, // Default MariaDB/MySQL port
  connectionLimit: 5, // Limit the number of connections
  connectTimeout: 30000, // 30 seconds
  acquireTimeout: 30000,
});

export const connectToDatabase = async () => {
  let conn;
  try {
    // Get a connection from the pool
    conn = await pool.getConnection();
    console.log("Connected to the MariaDB database on RDS!");

    // Test a query to ensure the connection works
    const rows = await conn.query("SELECT 1 + 1 AS solution");
    console.log("Query result:", rows[0]["solution"]); // Should output "2"
  } catch (err) {
    console.error("Error connecting to the database:", err);
  } finally {
    if (conn) conn.release(); // Release the connection back to the pool
  }
};

connectToDatabase();
