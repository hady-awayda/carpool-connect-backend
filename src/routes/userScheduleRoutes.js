import express from "express";
import UserScheduleController from "../controllers/userScheduleController.js";

const router = express.Router();

router.post("/", UserScheduleController.createUserSchedule);
router.get("/:userId", UserScheduleController.getUserSchedulesByUserId);

// Add routes for updating user schedule and user preferences
router.put("/schedule/:id", UserScheduleController.updateUserSchedule);
router.put("/preferences/:id", UserScheduleController.updateUserPreferences);

router.delete(
  "/:userScheduleId/:schedulePreferencesId",
  UserScheduleController.softDeleteUserScheduleAndPreferences
);

export default router;
