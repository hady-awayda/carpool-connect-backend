import express from "express";
import SchedulePatternController from "../controllers/schedulePatternController.js";

const router = express.Router();

router.post("/schedule-pattern", SchedulePatternController.create);
router.get("/schedule-pattern/:id", SchedulePatternController.getById);
router.get(
  "/schedule-pattern/user/:userId",
  SchedulePatternController.getByUserId
);
router.put("/schedule-pattern/:id", SchedulePatternController.update);
router.delete("/schedule-pattern/:id", SchedulePatternController.delete);

export default router;
