import prisma from "../../config/prisma_client.js";

const UserMatchRepository = {
  createMatchRequest: async (userId1, userId2, requestedBy) => {
    return prisma.userMatch.create({
      data: {
        userId1,
        userId2,
        status: "requested",
        requestedBy,
      },
    });
  },

  getUserMatches: async (userId) => {
    return prisma.userMatch.findMany({
      where: {
        OR: [{ userId1: userId }, { userId2: userId }],
        deletedAt: null,
      },
    });
  },

  updateMatchStatus: async (matchId, status, responseBy) => {
    return prisma.userMatch.update({
      where: { id: matchId, deletedAt: null },
      data: {
        status,
        responseBy,
        approvedAt: status === "approved" ? new Date() : null,
      },
    });
  },

  deleteUserMatch: async (matchId) => {
    return prisma.userMatch.update({
      where: { id: matchId, deletedAt: null },
      data: {
        deletedAt: new Date(),
      },
    });
  },
};

export default UserMatchRepository;
