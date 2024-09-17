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
      include: {
        user1: true,
        user2: true,
      },
    });
  },

  findConversationById: async (conversationId) => {
    return await prisma.conversation.findFirst({
      where: { id: conversationId, deletedAt: null },
      include: {
        user1: true,
        user2: true,
      },
    });
  },

  softDeleteConversation: async (conversationId) => {
    return await prisma.conversation.update({
      where: { id: conversationId },
      data: { deletedAt: new Date() },
    });
  },
};

export default ConversationRepository;
