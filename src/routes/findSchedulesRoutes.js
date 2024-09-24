import express from "express";
import ScheduleController from "../controllers/scheduleController.js";
import userAuthorization from "../middleware/userAuthorization.js";

const router = express.Router();

router.get(
  "/find-schedules",
  userAuthorization,
  ScheduleController.findSchedules
);

export default router;
