import express from "express";
import MatchedScheduleController from "../controllers/matchedScheduleController.js";
import userAuthorization from "../middleware/userAuthorization.js";

const router = express.Router();

router.post(
  "/",
  userAuthorization,
  MatchedScheduleController.createMatchedSchedule
);

router.get(
  "/",
  userAuthorization,
  MatchedScheduleController.getMatchedSchedulesByUserId
);

router.delete(
  "/:id",
  userAuthorization,
  MatchedScheduleController.softDeleteMatchedSchedule
);

export default router;
