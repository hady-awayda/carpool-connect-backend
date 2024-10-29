import express from "express";
import ConversationController from "../apis/conversations/controllers/conversationController.js";
import userAuthorization from "../middleware/userAuthorization.js";

const router = express.Router();

router.get("/", userAuthorization, ConversationController.getUserConversations);

router.get(
  "/:userId2",
  userAuthorization,
  ConversationController.findConversationByUserIds
);

router.get(
  "/messages/:userId2",
  userAuthorization,
  ConversationController.getMessagesWithUserId2
);

router.post("/:userId2", userAuthorization, ConversationController.sendMessage);

router.delete(
  "/message/:messageId",
  userAuthorization,
  ConversationController.softDeleteMessage
);

router.delete(
  "/conversation/:userId2",
  userAuthorization,
  ConversationController.softDeleteConversation
);

// router.post(
//   "/create",
//   userAuthorization,
//   ConversationController.createConversation
// );

// router.get(
//   "/getConversations/:conversationId",
//   userAuthorization,
//   ConversationController.getConversationById
// );

export default router;
