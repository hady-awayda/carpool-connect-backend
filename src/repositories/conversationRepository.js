import prisma from "../../config/prisma_client.js";

const ConversationRepository = {
  createConversation: async (userId1, userId2) => {
    const [firstUserId, secondUserId] =
      userId1 < userId2 ? [userId1, userId2] : [userId2, userId1];

    const existingConversation = await prisma.conversation.findUnique({
      where: {
        unique_conversation: {
          userId1: firstUserId,
          userId2: secondUserId,
        },
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

  getConversationsByUserId: async (userId) => {
    return prisma.conversation.findMany({
      where: {
        OR: [{ userId1: userId }, { userId2: userId }],
        deletedAt: null,
      },
      include: {
        user1: true,
        user2: true,
      },
    });
  },

  getConversationById: async (conversationId) => {
    return prisma.conversation.findUnique({
      where: { id: conversationId, deletedAt: null },
      include: {
        user1: true,
        user2: true,
      },
    });
  },

  deleteConversation: async (conversationId) => {
    return prisma.conversation.update({
      where: { id: conversationId },
      data: { deletedAt: new Date() },
    });
  },
};
