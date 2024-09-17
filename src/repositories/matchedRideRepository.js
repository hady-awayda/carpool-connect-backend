import prisma from "../../config/prisma_client.js";

const MatchedRideRepository = {
  createMatchedRide: async (data) => {
    return prisma.matchedRide.create({
      data,
    });
  },

  getMatchedRidesByUserId: async (userId) => {
    return prisma.matchedRide.findMany({
      where: {
        deletedAt: null,
        OR: [
          { rideSchedule1: { userId: userId } },
          { rideSchedule2: { userId: userId } },
        ],
      },
      include: {
        rideSchedule1: true,
        rideSchedule2: true,
      },
    });
  },

  updateMatchedRideStatus: async (id, user1Status, user2Status) => {
    return prisma.matchedRide.update({
      where: { id, deletedAt: null },
      data: {
        user1AgreementStatus: user1Status,
        user2AgreementStatus: user2Status,
      },
    });
  },

  softDeleteMatchedRide: async (id) => {
    return prisma.matchedRide.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  },
};

export default MatchedRideRepository;
