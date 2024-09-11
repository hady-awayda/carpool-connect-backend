import prisma from "../../config/prisma_client.js";

const MatchedRideRepository = {
  createMatchedRide: async (data) => {
    return prisma.matchedRide.create({
      data,
    });
  },

  getMatchedRidesByUserId: async (userId) => {
    // Retrieve matched rides where the user is either in rideScheduleId1 or rideScheduleId2 and not soft deleted
    return prisma.matchedRide.findMany({
      where: {
        deletedAt: null, // Exclude soft-deleted matched rides
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
      where: { id },
      data: {
        user1AgreementStatus: user1Status,
        user2AgreementStatus: user2Status,
      },
    });
  },

  // Soft delete a matched ride
  softDeleteMatchedRide: async (id) => {
    return prisma.matchedRide.update({
      where: { id },
      data: {
        deletedAt: new Date(), // Mark as deleted
      },
    });
  },
};

export default MatchedRideRepository;
