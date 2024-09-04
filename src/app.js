import dotenv from "dotenv";
import express from "express";
import userRoutes from "./routes/user.js";
import authRoutes from "./routes/auth.js";
import fileRoutes from "./routes/file.js";
import courseRoutes from "./routes/course.js";
import dbConnection from "../config/connection.js";
import withdrawalRoutes from "./routes/withdrawal.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  dbConnection();
  console.log(`Server is running on http://localhost:${PORT}`);
});
