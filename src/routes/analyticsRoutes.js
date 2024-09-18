import express from "express";
import analyticsController from "../controllers/analyticsController.js";
import adminAuthorization from "../middleware/adminAuthorization.js";

const router = express.Router();

router.get(
  "/admin/analytics",
  adminAuthorization,
  analyticsController.getAnalyticsData
);

export default router;
