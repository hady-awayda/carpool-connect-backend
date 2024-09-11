import express from "express";
import RideScheduleController from "../controllers/rideScheduleController.js";

const router = express.Router();

router.post("/create", RideScheduleController.createRideSchedule);
router.get("/:userId", RideScheduleController.getRideSchedulesByUserId);

// Add routes for updating ride schedule and ride preferences
router.put("/update/schedule/:id", RideScheduleController.updateRideSchedule);
router.put(
  "/update/preferences/:id",
  RideScheduleController.updateRidePreferences
);

router.delete(
  "/delete/:rideScheduleId/:ridePreferencesId",
  RideScheduleController.softDeleteRideScheduleAndPreferences
);

export default router;
