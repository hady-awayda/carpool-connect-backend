import express from "express";
import userAuth from "../middleware/userAuthorization.js";
import adminAuth from "../middleware/adminAuthorization.js";
import UserController from "../controllers/userController.js";
import { setUpdatedBy, setDeletedBy } from "../middleware/trackChanges.js";

const router = express.Router();
// User Routes v2
// router.get("/", authentication, adminAuth, UserController.getUsers);
// router.get("/:id", authentication, userAuth, UserController.getUser);
// router.patch(
//   "/:id",
//   authentication,
//   userAuth,
//   UserController.updateUser
// );
// router.delete(
//   "/:id",
//   authentication,
//   userAuth,
//   UserController.deleteUser
// );

// User Routes v3
router.get("/all", adminAuth, UserController.getUsers);
router.get("/", userAuth, UserController.getUser);
// router.get("/:id", userAuth, UserController.getLimitedUser);
router.patch("/", userAuth, UserController.updateUser);
router.delete("/", userAuth, UserController.deleteUser);

// User Routes v1
// router.get("/", UserController.getUsers);
// router.get("/:id", UserController.getUser);
// router.patch("/:id", setUpdatedBy, UserController.updateUser);
// router.delete("/:id", setDeletedBy, UserController.deleteUser);

export default router;
