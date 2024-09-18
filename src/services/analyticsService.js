import prisma from "../../config/prisma_client.js";

const analyticsService = {
  getAnalyticsData: async () => {
    const totalUsers = await prisma.User.count();
    // const totalSchedules = await prisma.userSchedule.count();
    // const totalMessages = await prisma.message.count();
    // const totalConversations = await prisma.conversation.count();

    return {
      totalUsers,
      // totalSchedules,
      // totalMessages,
      // totalConversations,
    };
  },
};

export default analyticsService;
