import prisma from "../../config/prisma_client.js";

const RideAgreementRepository = {
  createRideAgreement: async (data) => {
    return prisma.rideAgreement.create({
      data,
    });
  },

  updateRideAgreement: async (id, data) => {
    return prisma.rideAgreement.update({
      where: { id },
      data,
    });
  },

  // Soft delete ride agreement
  softDeleteRideAgreement: async (id) => {
    return prisma.rideAgreement.update({
      where: { id },
      data: {
        deletedAt: new Date(), // Mark as deleted
      },
    });
  },

  getRideAgreementById: async (id) => {
    return prisma.rideAgreement.findUnique({
      where: { id, deletedAt: null }, // Fetch only non-deleted agreements
    });
  },
};

export default RideAgreementRepository;
