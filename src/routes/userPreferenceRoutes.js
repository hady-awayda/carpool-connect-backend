import UserPreferenceController from "../controllers/userPreferenceController.js";
import { Router } from "express";
import userAuthorization from "../middleware/userAuthorization.js";

const router = Router();

router.post(
  "/",
  userAuthorization,
  UserPreferenceController.createUserPreference
);

router.get(
  "/:id",
  userAuthorization,
  UserPreferenceController.getUserPreference
);

router.put(
  "/:id",
  userAuthorization,
  UserPreferenceController.updateUserPreference
);

router.delete(
  "/:id",
  userAuthorization,
  UserPreferenceController.deleteUserPreference
);

export default router;
