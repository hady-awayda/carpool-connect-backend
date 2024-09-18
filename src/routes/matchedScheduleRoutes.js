import express from "express";
import MatchedScheduleController from "../controllers/matchedScheduleController.js";

const router = express.Router();

router.post("/", MatchedScheduleController.createMatchedSchedule);
router.get("/:userId", MatchedScheduleController.getMatchedSchedulesByUserId);

router.delete("/:id", MatchedScheduleController.softDeleteMatchedSchedule);

export default router;
