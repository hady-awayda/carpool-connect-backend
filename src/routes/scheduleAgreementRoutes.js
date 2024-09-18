import express from "express";
import ScheduleAgreementController from "../controllers/scheduleAgreementController.js";

const router = express.Router();

router.post("/", ScheduleAgreementController.createScheduleAgreement);
router.put("/:id", ScheduleAgreementController.updateScheduleAgreement);
router.delete(
  "/:id/:userId",
  ScheduleAgreementController.softDeleteScheduleAgreement
);

export default router;
