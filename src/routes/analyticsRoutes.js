import express from "express";
import analyticsController from "../apis/analytics/adminAnalyticsController.js";
import adminAuthorization from "../../middleware/adminAuthorization.js";
import userAuthorization from "../../middleware/userAuthorization.js";

const router = express.Router();

router.get("/user", userAuthorization, analyticsController.getAnalyticsData);
router.get("/admin", adminAuthorization, analyticsController.getAnalyticsData);

export default router;
