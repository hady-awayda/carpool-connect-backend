import prisma from "../../config/prisma_client.js";

const userPreferenceRepository = {
  createUserPreference: async (userId, data) => {
    return prisma.userPreference.create({
      data: {
        userId,
        ...data,
      },
    });
  },

  getUserPreference: async (userId) => {
    return prisma.userPreference.findUnique({
      where: { userId, deletedAt: null },
    });
  },

  updateUserPreference: async (userId, data) => {
    return prisma.userPreference.update({
      where: { userId, deletedAt: null },
      data,
    });
  },

  deleteUserPreference: async (userId) => {
    return prisma.userPreference.update({
      where: { userId, deletedAt: null },
      data: { deletedAt: new Date() },
    });
  },
};

export default userPreferenceRepository;
