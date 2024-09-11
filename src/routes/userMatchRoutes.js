import express from "express";
import UserMatchController from "../controllers/userMatchController.js";

const router = express.Router();

// Route to create a match request
router.post("/create", UserMatchController.createMatchRequest);

// Route to get all matches for a user
router.get("/:userId", UserMatchController.getUserMatches);

// Route to approve or decline a match request
router.put("/:matchId/respond", UserMatchController.respondToMatchRequest);

export default router;
