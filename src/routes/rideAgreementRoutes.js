import express from "express";
import RideAgreementController from "../controllers/rideAgreementController.js";

const router = express.Router();

router.post("/", RideAgreementController.createRideAgreement);
router.put("/:id", RideAgreementController.updateRideAgreement);
router.delete("/:id/:userId", RideAgreementController.softDeleteRideAgreement);

export default router;
