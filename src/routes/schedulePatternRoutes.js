import express from "express";
import SchedulePatternController from "../controllers/schedulePatternController.js";
import userAuthorization from "../middleware/userAuthorization.js";

const router = express.Router();

router.post("", userAuthorization, SchedulePatternController.create);
router.get("/:id", userAuthorization, SchedulePatternController.getById);
router.get(
  "/user/:userId",
  userAuthorization,
  SchedulePatternController.getByUserId
);
router.put("/:id", userAuthorization, SchedulePatternController.update);
router.delete("/:id", userAuthorization, SchedulePatternController.delete);

export default router;
