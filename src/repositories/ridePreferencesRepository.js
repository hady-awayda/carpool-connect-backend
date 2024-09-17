import prisma from "../../config/prisma_client.js";

const RidePreferencesRepository = {
  createRidePreferences: async (data) => {
    return prisma.ridePreferences.create({
      data,
    });
  },

  getRidePreferencesByRideScheduleId: async (ridePreferencesId) => {
    return prisma.ridePreferences.findUnique({
      where: { id: ridePreferencesId, deletedAt: null },
    });
  },

  updateRidePreferences: async (id, data) => {
    return prisma.ridePreferences.update({
      where: { id, deletedAt: null },
      data,
    });
  },

  // Soft delete ride preferences
  softDeleteRidePreferences: async (id) => {
    return prisma.ridePreferences.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  },
};

export default RidePreferencesRepository;
