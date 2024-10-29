import ConversationRepository from "../repositories/conversationRepository.js";
import MessageRepository from "../repositories/messageRepository.js";

const ConversationService = {
  createConversation: async (userId1, userId2) => {
    return await ConversationRepository.createConversation(userId1, userId2);
  },

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

  softDeleteConversation: async (conversationId) => {
    return await ConversationRepository.softDeleteConversation(conversationId);
  },

  sendMessage: async (userId, userId2, content) => {
    let conversation = await ConversationRepository.findConversationByUserIds(
      userId,
      userId2
    );

    if (!conversation) {
      conversation = await ConversationRepository.createConversation(
        userId,
        userId2
      );
    }

    return await MessageRepository.sendMessage(
      conversation.id,
      userId,
      content
    );
  },

  getMessagesWithUserId2: async (userId, userId2) => {
    const conversation = await ConversationRepository.findConversationByUserIds(
      userId,
      userId2
    );

    return await MessageRepository.getMessagesByConversationId(conversation.id);
  },

  softDeleteMessage: async (messageId) => {
    return await MessageRepository.softDeleteMessage(messageId);
  },
};

export default ConversationService;
