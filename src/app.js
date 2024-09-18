import dotenv from "dotenv";
import express from "express";
import setupSwaggerUI from "../config/swagger.js";
import authRoutes from "./routes/authRoutes.js";
import conversationRoutes from "./routes/conversationRoutes.js";
import matchedScheduleRoutes from "./routes/matchedScheduleRoutes.js";
import scheduleAgreementRoutes from "./routes/scheduleAgreementRoutes.js";
import userScheduleRoutes from "./routes/userScheduleRoutes.js";
import schedulePatternRoutes from "./routes/schedulePatternRoutes.js";
import userMatchRoutes from "./routes/userMatchRoutes.js";
import userPreferenceRoutes from "./routes/userPreferenceRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/conversations", conversationRoutes);
app.use("/api/matchedSchedules", matchedScheduleRoutes);
app.use("/api/scheduleAgreements", scheduleAgreementRoutes);
app.use("/api/userSchedules", userScheduleRoutes);
app.use("/api/schedulePatterns", schedulePatternRoutes);
app.use("/api/userMatches", userMatchRoutes);
app.use("/api/usersPreferences", userPreferenceRoutes);
app.use("/api/users", userRoutes);
app.use("/api", analyticsRoutes);

setupSwaggerUI(app);

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

export default app;
