import ConversationService from "../services/conversationService.js";

const ConversationController = {
  createConversation: async (req, res) => {
    const { userId1, userId2 } = req.body;
    try {
      const conversation = await ConversationService.createConversation(
        userId1,
        userId2
      );
      res.status(201).json(conversation);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  findConversationByUserIds: async (req, res) => {
    const { userId1, userId2 } = req.body;
    try {
      const conversation = await ConversationService.findConversationByUserIds(
        userId1,
        userId2
      );
      if (!conversation) {
        return res.status(404).json({ message: "Conversation not found" });
      }
      res.status(200).json(conversation);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

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

  getConversationById: async (req, res) => {
    const { conversationId } = req.params;
    try {
      const conversation = await ConversationService.findConversationById(
        conversationId
      );
      if (!conversation) {
        return res.status(404).json({ message: "Conversation not found" });
      }
      res.status(200).json(conversation);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  sendMessage: async (req, res) => {
    const { conversationId } = req.params;
    const { content } = req.body;
    const userId = req.user.id;

    try {
      const message = await ConversationService.sendMessage(
        userId,
        conversationId,
        content
      );
      res.status(201).json(message);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getMessagesByConversationId: async (req, res) => {
    const { conversationId } = req.params;
    try {
      const messages = await ConversationService.getMessagesByConversationId(
        conversationId
      );
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  softDeleteMessage: async (req, res) => {
    const { messageId } = req.params;
    try {
      await ConversationService.softDeleteMessage(messageId);
      res.status(200).json({ message: "Message soft-deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  softDeleteConversation: async (req, res) => {
    const { conversationId } = req.params;
    try {
      await ConversationService.softDeleteConversation(conversationId);
      res.status(200).json({ message: "Conversation soft-deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default ConversationController;
