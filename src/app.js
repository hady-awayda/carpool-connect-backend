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
import findSchedulesRoutes from "./routes/findSchedulesRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use("/api/analytics", analyticsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/conversations", conversationRoutes);
app.use("/api/find-schedules", findSchedulesRoutes);
app.use("/api/matched-schedules", matchedScheduleRoutes);
app.use("/api/schedule-agreements", scheduleAgreementRoutes);
app.use("/api/user-schedules", userScheduleRoutes);
app.use("/api/schedule-patterns", schedulePatternRoutes);
app.use("/api/usermatches", userMatchRoutes);
app.use("/api/users-preferences", userPreferenceRoutes);
app.use("/api/users", userRoutes);

setupSwaggerUI(app);

app.get("/health", (req, res) => {
  res.status(200).send("OKi");
});

export default app;
