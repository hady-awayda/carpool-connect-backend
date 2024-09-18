import dotenv from "dotenv";
import express from "express";
import setupSwaggerUI from "../config/swagger.js";
import authRoutes from "./routes/authRoutes.js";
import conversationRoutes from "./routes/conversationRoutes.js";
import matchedScheduleRoutes from "./routes/matchedScheduleRoutes.js";
import rideAgreementRoutes from "./routes/rideAgreementRoutes.js";
import rideScheduleRoutes from "./routes/rideScheduleRoutes.js";
import schedulePatternRoutes from "./routes/schedulePatternRoutes.js";
import userMatchRoutes from "./routes/userMatchRoutes.js";
import userPreferenceRoutes from "./routes/userPreferenceRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/conversations", conversationRoutes);
app.use("/api/matched-schedules", matchedScheduleRoutes);
app.use("/api/ride-agreements", rideAgreementRoutes);
app.use("/api/ride-schedules", rideScheduleRoutes);
app.use("/api/schedule-patterns", schedulePatternRoutes);
app.use("/api/user-matches", userMatchRoutes);
app.use("/api/usersPreferences", userPreferenceRoutes);
app.use("/api/users", userRoutes);

setupSwaggerUI(app);

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
