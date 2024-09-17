import express from "express";
import MatchedRideController from "../controllers/matchedRideController.js";

const router = express.Router();

router.post("/", MatchedRideController.createMatchedRide);
router.get("/:userId", MatchedRideController.getMatchedRidesByUserId);

router.delete("/:id", MatchedRideController.softDeleteMatchedRide);

export default router;
