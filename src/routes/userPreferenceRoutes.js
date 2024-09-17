import UserPreferenceController from "../controllers/userPreferenceController.js";
import { Router } from "express";

const router = Router();

router.post("", UserPreferenceController.createUserPreference);

router.get("/:id", UserPreferenceController.getUserPreference);

router.put("/:id", UserPreferenceController.updateUserPreference);

router.delete("/:id", UserPreferenceController.deleteUserPreference);

export default router;
