import express from "express";
import RideScheduleController from "../controllers/rideScheduleController.js";

const router = express.Router();

router.post("/", RideScheduleController.createRideSchedule);
router.get("/:userId", RideScheduleController.getRideSchedulesByUserId);

// Add routes for updating ride schedule and ride preferences
router.put("/schedule/:id", RideScheduleController.updateRideSchedule);
router.put("/preferences/:id", RideScheduleController.updateRidePreferences);

router.delete(
  "/:rideScheduleId/:ridePreferencesId",
  RideScheduleController.softDeleteRideScheduleAndPreferences
);

export default router;
