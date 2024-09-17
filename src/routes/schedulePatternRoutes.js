import express from "express";
import SchedulePatternController from "../controllers/schedulePatternController.js";

const router = express.Router();

router.post("", SchedulePatternController.create);
router.get("/:id", SchedulePatternController.getById);
router.get("/user/:userId", SchedulePatternController.getByUserId);
router.put("/:id", SchedulePatternController.update);
router.delete("/:id", SchedulePatternController.delete);

export default router;
