import express from "express";
import UserMatchController from "../apis/user-matches/controllers/userMatchController.js";
import userAuthorization from "../middleware/userAuthorization.js";

const router = express.Router();

router.post(
  "/create",
  userAuthorization,
  UserMatchController.createMatchRequest
);
router.get("/", userAuthorization, UserMatchController.getUserMatches);
router.put(
  "/:matchId/respond",
  userAuthorization,
  UserMatchController.respondToMatchRequest
);

export default router;
