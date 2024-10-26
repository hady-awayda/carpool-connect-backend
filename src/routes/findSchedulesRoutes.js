import express from "express";
import ScheduleController from "../schedule-search/scheduleSearchController.js";
import userAuthorization from "../../middleware/userAuthorization.js";

const router = express.Router();

router.get("/", userAuthorization, ScheduleController.findSchedules);

export default router;
