import express from "express";
import RideAgreementController from "../controllers/rideAgreementController.js";

const router = express.Router();

router.post("/create", RideAgreementController.createRideAgreement);
router.put("/update/:id", RideAgreementController.updateRideAgreement);
router.delete(
  "/soft-delete/:id/:userId",
  RideAgreementController.softDeleteRideAgreement
);

export default router;
