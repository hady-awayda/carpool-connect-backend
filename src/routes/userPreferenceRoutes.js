import UserPreferenceController from "../controllers/userPreferenceController.js";
import { Router } from "express";
import userAuthorization from "../middleware/userAuthorization.js";

const router = Router();

router.post(
  "/",
  userAuthorization,
  UserPreferenceController.createUserPreference
);

router.get("/", userAuthorization, UserPreferenceController.getUserPreference);

router.put(
  "/",
  userAuthorization,
  UserPreferenceController.updateUserPreference
);

router.delete(
  "/",
  userAuthorization,
  UserPreferenceController.deleteUserPreference
);

export default router;
