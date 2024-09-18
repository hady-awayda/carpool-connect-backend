import express from "express";
import ConversationController from "../controllers/conversationController.js";
import authentication from "../middlewares/authentication.js";

const router = express.Router();

router.post(
  "/createConversation",
  authentication,
  ConversationController.createConversation
);

router.get(
  "/findConversation/:userId2",
  authentication,
  ConversationController.findConversationByUserIds
);

router.get(
  "/userConversations",
  authentication,
  ConversationController.getUserConversations
);

router.get(
  "/getConversations/:conversationId",
  authentication,
  ConversationController.getConversationById
);

router.post(
  "/sendMessage/:conversationId",
  authentication,
  ConversationController.sendMessage
);
router.get(
  "/getMessages/:conversationId",
  authentication,
  ConversationController.getMessagesByConversationId
);
router.delete(
  "/deleteMessage/:messageId",
  authentication,
  ConversationController.softDeleteMessage
);
router.delete(
  "/deleteConversation/:conversationId",
  authentication,
  ConversationController.softDeleteConversation
);

export default router;
