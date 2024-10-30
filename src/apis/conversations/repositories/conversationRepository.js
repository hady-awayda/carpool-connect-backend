import prisma from "../../../../config/prisma_client.js";

const ConversationRepository = {
  createConversation: async (userId1, userId2) => {
    const [firstUserId, secondUserId] =
      userId1 < userId2 ? [userId1, userId2] : [userId2, userId1];

    const existingConversation = await prisma.conversation.findFirst({
      where: {
        userId1: firstUserId,
        userId2: secondUserId,
        deletedAt: null,
      },
    });

    if (existingConversation) {
      return existingConversation;
    }

    return prisma.conversation.create({
      data: {
        userId1: firstUserId,
        userId2: secondUserId,
      },
    });
  },

  findConversationByUserIds: async (userId1, userId2) => {
    const [firstUserId, secondUserId] =
      userId1 < userId2 ? [userId1, userId2] : [userId2, userId1];

    return await prisma.conversation.findFirst({
      where: {
        userId1: firstUserId,
        userId2: secondUserId,
        deletedAt: null,
      },
    });
  },

  findUserConversations: async (userId) => {
    return await prisma.conversation.findMany({
      where: {
        OR: [{ userId1: userId }, { userId2: userId }],
        deletedAt: null,
      },
    });
  },

  findConversationById: async (conversationId) => {
    return await prisma.conversation.findFirst({
      where: { id: conversationId, deletedAt: null },
    });
  },

  findConversationsByIdEvenIfDeleted: async (conversationId) => {
    return await prisma.conversation.findFirst({
      where: { id: conversationId },
    });
  },

  softDeleteConversation: async (conversationId) => {
    return await prisma.conversation.update({
      where: { id: conversationId },
      data: { deletedAt: new Date() },
    });
  },

  sendMessage: async (conversationId, senderId, content) => {
    return await prisma.message.create({
      data: {
        conversationId,
        senderId,
        content,
      },
    });
  },

  getMessagesByConversationId: async (conversationId) => {
    return await prisma.message.findMany({
      where: {
        conversationId,
        deletedAt: null,
      },
    });
  },

  findMessageById: async (messageId) => {
    return await prisma.message.findFirst({
      where: { id: messageId },
    });
  },

  softDeleteMessage: async (messageId) => {
    return await prisma.message.update({
      where: { id: messageId },
      data: {
        deletedAt: new Date(),
      },
    });
  },
};

export default ConversationRepository;
