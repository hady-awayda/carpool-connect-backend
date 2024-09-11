import prisma from "../../config/prisma_client.js";

const UserMatchRepository = {
  // Create a new match request
  createMatchRequest: async (userId1, userId2, requestedBy) => {
    return prisma.userMatch.create({
      data: {
        userId1,
        userId2,
        status: 'requested',
        requestedBy,
      },
    });
  },

  // Get all match requests for a user
  getUserMatches: async (userId) => {
    return prisma.userMatch.findMany({
      where: {
        OR: [
          { userId1: userId },
          { userId2: userId },
        ],
      },
    });
  },

  // Approve or decline a match request
  updateMatchStatus: async (matchId, status, responseBy) => {
    return prisma.userMatch.update({
      where: { id: matchId },
      data: {
        status,
        responseBy,
        approvedAt: status === 'approved' ? new Date() : null,
      },
    });
  },
};

export default UserMatchRepository;
