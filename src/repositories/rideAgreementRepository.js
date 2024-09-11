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

  deleteRideAgreement: async (id) => {
    return prisma.rideAgreement.delete({
      where: { id },
    });
  },

  getRideAgreementById: async (id) => {
    return prisma.rideAgreement.findUnique({
      where: { id },
    });
  },
};

export default RideAgreementRepository;
