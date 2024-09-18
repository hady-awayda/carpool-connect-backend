import express from "express";
import UserScheduleController from "../controllers/userScheduleController.js";
import userAuthorization from "../middleware/userAuthorization.js";

const router = express.Router();

router.post("/", userAuthorization, UserScheduleController.createUserSchedule);

router.get(
  "/",
  userAuthorization,
  UserScheduleController.getUserSchedulesByUserId
);

router.put(
  "/schedule/:id",
  userAuthorization,
  UserScheduleController.updateUserSchedule
);
router.put(
  "/preferences/:id",
  userAuthorization,
  UserScheduleController.updateSchedulePreferences
);

router.delete(
  "/:userScheduleId/:schedulePreferencesId",
  userAuthorization,
  UserScheduleController.softDeleteUserScheduleAndPreferences
);

export default router;
