import mariadb from "mariadb";
import dotenv from "dotenv";

dotenv.config();

const pool = mariadb.createPool({
  host:
    process.env.DB_HOST ||
    "carpool-dev.cruwuwwcyxr8.eu-central-1.rds.amazonaws.com",
  user: process.env.DB_USER || "admin",
  password: process.env.DB_PASSWORD || "sefactory",
  database: process.env.DB_NAME || "carpool_dev",
  port: process.env.DB_PORT || 3306,
  connectionLimit: 5,
});

export const dbConnection = async () => {
  let conn;
  try {
    conn = await pool.getConnection();
    console.log("Connected to the MariaDB database on RDS!");

    const rows = await conn.query("SELECT 1 + 1 AS solution");
    console.log("Query result:", rows[0]["solution"]);
  } catch (err) {
    console.error("Error connecting to the database:", err);
  } finally {
    if (conn) conn.release();
    console.log("Connection released");
  }
};

dbConnection();
