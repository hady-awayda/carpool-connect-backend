import dotenv from "dotenv";
import express from "express";
import userRoutes from "./routes/userRoutes.js";
// import authRoutes from "./routes/auth.js";
import setupSwaggerUI from "../config/swagger.js"; // Import Swagger setup

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

setupSwaggerUI(app);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
