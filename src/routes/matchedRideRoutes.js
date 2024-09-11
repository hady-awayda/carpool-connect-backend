import express from "express";
import MatchedRideController from "../controllers/matchedRideController.js";

const router = express.Router();

router.post("/create", MatchedRideController.createMatchedRide);
router.get("/:userId", MatchedRideController.getMatchedRidesByUserId);

// Soft delete a matched ride
router.delete("/delete/:id", MatchedRideController.softDeleteMatchedRide);

export default router;
