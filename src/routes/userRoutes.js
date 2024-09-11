import express from "express";
// import userAuth from "../middleware/userAuthorization.js";
// import adminAuth from "../middleware/adminAuthorization.js";
import UserController from "../controllers/userController.js";
// import { setUpdatedBy, setDeletedBy } from "../middleware/trackChanges.js";

const router = express.Router();

// User Routes Experimental v1
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         email:
 *           type: string
 */

/**
 * @swagger
 * /api/users/all:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get("/all", UserController.getUsers);
/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: The user data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */
router.get("/:id", UserController.getUser);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);

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
// router.get("/all", adminAuth, UserController.getUsers);
// router.get("/", userAuth, UserController.getUser);
// // router.get("/:id", userAuth, UserController.getLimitedUser);
// router.patch("/", userAuth, UserController.updateUser);
// router.delete("/", userAuth, UserController.deleteUser);

// User Routes v1
// router.get("/", UserController.getUsers);
// router.get("/:id", UserController.getUser);
// router.patch("/:id", setUpdatedBy, UserController.updateUser);
// router.delete("/:id", setDeletedBy, UserController.deleteUser);

export default router;
