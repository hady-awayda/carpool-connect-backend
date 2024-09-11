import dotenv from "dotenv";
import express from "express";
import userRoutes from "./routes/userRoutes.js";
import rideScheduleRoutes from "./routes/rideScheduleRoutes.js";
// import authRoutes from "./routes/auth.js";
import setupSwaggerUI from "../config/swagger.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/ride-schedules", rideScheduleRoutes);

setupSwaggerUI(app);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
