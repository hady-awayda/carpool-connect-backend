import express from "express";
import ConversationController from "../apis/conversations/controllers/conversationController.js";
import userAuthorization from "../middleware/userAuthorization.js";

const router = express.Router();

// router.post(
//   "/create",
//   userAuthorization,
//   ConversationController.createConversation
// );

router.get("/", userAuthorization, ConversationController.getUserConversations);

router.get(
  "/find/:userId2",
  userAuthorization,
  ConversationController.findConversationByUserIds
);

router.get(
  "/messages/:conversationId",
  userAuthorization,
  ConversationController.getMessagesByConversationId
);

// router.get(
//   "/getConversations/:conversationId",
//   userAuthorization,
//   ConversationController.getConversationById
// );

router.post(
  "/message/:conversationId",
  userAuthorization,
  ConversationController.sendMessage
);

router.delete(
  "/message/:messageId",
  userAuthorization,
  ConversationController.softDeleteMessage
);

router.delete(
  "/conversation/:conversationId",
  userAuthorization,
  ConversationController.softDeleteConversation
);

export default router;
