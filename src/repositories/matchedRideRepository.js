import prisma from "../../config/prisma_client.js";

const MatchedRideRepository = {
  createMatchedRide: async (data) => {
    return prisma.matchedRide.create({
      data,
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

  getMatchedRideById: async (id) => {
    return prisma.matchedRide.findUnique({
      where: { id },
    });
  },
};

export default MatchedRideRepository;
