import ConversationService from "../services/conversationService.js";

const ConversationController = {
  getUserConversations: async (req, res) => {
    const userId = req.user.id;
    try {
      const conversations = await ConversationService.findUserConversations(
        userId
      );

      res.status(200).json(conversations);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  findConversationWithUserId2: async (req, res) => {
    const userId1 = req.user.id;
    const { userId2 } = req.params;

    try {
      const conversation =
        await ConversationService.findConversationWithUserId2(
          userId1,
          parseInt(userId2)
        );

      if (!conversation) {
        return res.status(404).json({ message: "Conversation not found" });
      }

      res.status(200).json(conversation);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getMessagesWithUserId2: async (req, res) => {
    const userId1 = req.user.id;
    const { userId2 } = req.params;

    try {
      const messages = await ConversationService.getMessagesWithUserId2(
        userId1,
        parseInt(userId2)
      );

      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  sendMessage: async (req, res) => {
    const userId = req.user.id;
    const { userId2 } = req.params;
    const { content } = req.body;

    try {
      if (userId === parseInt(userId2)) {
        return res
          .status(400)
          .json({ message: "Cannot send message to yourself" });
      }

      if (!content) {
        return res.status(400).json({ message: "Message content is required" });
      }

      const message = await ConversationService.sendMessage(
        userId,
        parseInt(userId2),
        content
      );

      res.status(201).json(message);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  softDeleteConversation: async (req, res) => {
    const { conversationId } = req.params;
    const userId = req.user.id;

    try {
      await ConversationService.softDeleteConversation(
        parseInt(conversationId),
        userId
      );

      res.status(200).json({ message: "Conversation soft-deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  softDeleteMessage: async (req, res) => {
    const { messageId } = req.params;
    const userId = req.user.id;

    try {
      await ConversationService.softDeleteMessage(parseInt(messageId), userId);

      res.status(200).json({ message: "Message soft-deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default ConversationController;
