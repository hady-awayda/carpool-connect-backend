import mariadb from "mariadb";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  connectionLimit: 5,
});

const dbConnection = async () => {
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

export default dbConnection;
