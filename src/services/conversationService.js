import ConversationRepository from "../repositories/conversationRepository.js";
import MessageRepository from "../repositories/messageRepository.js";

const ConversationService = {
  findConversationByUserIds: async (userId1, userId2) => {
    return await ConversationRepository.findConversationByUserIds(
      userId1,
      userId2
    );
  },

  findUserConversations: async (userId) => {
    return await ConversationRepository.findUserConversations(userId);
  },

  findConversationById: async (conversationId) => {
    return await ConversationRepository.findConversationById(conversationId);
  },

  sendMessage: async (userId, conversationId, content) => {
    const conversation = await ConversationRepository.findConversationById(
      conversationId
    );
    if (
      !conversation ||
      (conversation.userId1 !== userId && conversation.userId2 !== userId)
    ) {
      throw new Error("User not part of this conversation.");
    }
    return await MessageRepository.sendMessage(conversationId, userId, content);
  },

  getMessagesByConversationId: async (conversationId) => {
    return await MessageRepository.getMessagesByConversationId(conversationId);
  },

  softDeleteMessage: async (messageId) => {
    return await MessageRepository.softDeleteMessage(messageId);
  },

  createConversation: async (userId1, userId2) => {
    return await ConversationRepository.createConversation(userId1, userId2);
  },

  softDeleteConversation: async (conversationId) => {
    return await ConversationRepository.softDeleteConversation(conversationId);
  },
};

export default ConversationService;
