import prisma from "../../config/prisma_client.js";

const MessageRepository = {
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
      include: {
        sender: true,
      },
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

export default MessageRepository;
