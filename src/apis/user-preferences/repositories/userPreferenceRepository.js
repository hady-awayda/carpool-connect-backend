import prisma from "../../config/prisma_client.js";

const userPreferenceRepository = {
  createUserPreference: async (userId, data) => {
    return prisma.userPreferences.create({
      data: {
        userId,
        ...data,
      },
    });
  },

  getUserPreference: async (userId) => {
    return prisma.userPreferences.findUnique({
      where: { userId, deletedAt: null },
    });
  },

  updateUserPreference: async (userId, data) => {
    return prisma.userPreferences.update({
      where: { userId, deletedAt: null },
      data,
    });
  },

  deleteUserPreference: async (userId) => {
    return prisma.userPreferences.update({
      where: { userId, deletedAt: null },
      data: { deletedAt: new Date() },
    });
  },
};

export default userPreferenceRepository;
