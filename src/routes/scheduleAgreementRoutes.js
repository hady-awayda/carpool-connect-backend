import express from "express";
import ScheduleAgreementController from "../controllers/scheduleAgreementController.js";
import userAuthorization from "../middleware/userAuthorization.js";

const router = express.Router();

router.post(
  "/",
  userAuthorization,
  ScheduleAgreementController.createScheduleAgreement
);
router.put(
  "/:id",
  userAuthorization,
  ScheduleAgreementController.updateScheduleAgreement
);
router.delete(
  "/:id",
  userAuthorization,
  ScheduleAgreementController.softDeleteScheduleAgreement
);

export default router;
