import express from "express";
import ConversationController from "../controllers/conversationController.js";
import userAuthorization from "../middleware/userAuthorization.js";

const router = express.Router();

router.post(
  "/createConversation",
  userAuthorization,
  ConversationController.createConversation
);

router.get(
  "/findConversation/:userId2",
  userAuthorization,
  ConversationController.findConversationByUserIds
);

router.get(
  "/userConversations",
  userAuthorization,
  ConversationController.getUserConversations
);

router.get(
  "/getConversations/:conversationId",
  userAuthorization,
  ConversationController.getConversationById
);

router.post(
  "/sendMessage/:conversationId",
  userAuthorization,
  ConversationController.sendMessage
);
router.get(
  "/getMessages/:conversationId",
  userAuthorization,
  ConversationController.getMessagesByConversationId
);
router.delete(
  "/deleteMessage/:messageId",
  userAuthorization,
  ConversationController.softDeleteMessage
);
router.delete(
  "/deleteConversation/:conversationId",
  userAuthorization,
  ConversationController.softDeleteConversation
);

export default router;
