import ConversationRepository from "../repositories/conversationRepository.js";

const ConversationService = {
  createConversation: async (userId1, userId2) => {
    return await conversationRepository.createConversation(userId1, userId2);
  },

  getUserConversations: async (userId) => {
    return await conversationRepository.getConversationsByUserId(userId);
  },

  getConversationById: async (conversationId) => {
    return await conversationRepository.getConversationById(conversationId);
  },
};

export default ConversationService;
