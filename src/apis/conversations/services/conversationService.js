import ConversationRepository from "../repositories/conversationRepository.js";

const ConversationService = {
  createConversation: async (userId1, userId2) => {
    return await ConversationRepository.createConversation(userId1, userId2);
  },

  findConversationWithUserId2: async (userId1, userId2) => {
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

  sendMessage: async (userId, userId2, content) => {
    let conversation = await ConversationRepository.findConversationByUserIds(
      userId,
      userId2
    );

    console.log(conversation);

    if (!conversation) {
      conversation = await ConversationRepository.createConversation(
        userId,
        userId2
      );
    }

    return await ConversationRepository.sendMessage(
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

    return await ConversationRepository.getMessagesByConversationId(
      conversation.id
    );
  },

  softDeleteConversation: async (conversationId, userId) => {
    const conversation =
      await ConversationRepository.findConversationsByIdEvenIfDeleted(
        conversationId
      );

    if (conversation.userId1 !== userId && conversation.userId2 !== userId) {
      throw new Error("Unauthorized");
    }

    if (conversation.deletedAt !== null) {
      throw new Error("Conversation already deleted");
    }

    return await ConversationRepository.softDeleteConversation(conversationId);
  },

  softDeleteMessage: async (messageId, userId) => {
    const message = await ConversationRepository.findMessageById(messageId);

    const conversation = await ConversationRepository.findConversationById(
      message.conversationId
    );

    if (conversation === null) {
      throw new Error("Conversation not found");
    }

    if (conversation.userId1 !== userId && conversation.userId2 !== userId) {
      throw new Error("Unauthorized");
    }

    if (conversation.deletedAt !== null) {
      throw new Error("Conversation already deleted");
    }

    if (message.deletedAt !== null) {
      throw new Error("Message already deleted");
    }

    return await ConversationRepository.softDeleteMessage(messageId);
  },
};

export default ConversationService;
