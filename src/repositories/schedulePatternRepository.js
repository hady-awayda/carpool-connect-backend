import prisma from "../../config/prisma_client.js";

const SchedulePatternRepository = {
  createSchedulePattern: async (userId, data) => {
    return await prisma.schedulePattern.create({
      data: {
        userId,
        ...data,
      },
    });
  },

  getSchedulePatternById: async (id) => {
    return await prisma.schedulePattern.findUnique({
      where: { id: parseInt(id), deletedAt: null },
    });
  },

  getSchedulePatternsByUserId: async (userId) => {
    return await prisma.schedulePattern.findMany({
      where: { userId: parseInt(userId), deletedAt: null },
    });
  },

  updateSchedulePattern: async (id, data) => {
    return await prisma.schedulePattern.update({
      where: { id: parseInt(id), deletedAt: null },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });
  },

  softDeleteSchedulePattern: async (id) => {
    return await prisma.schedulePattern.update({
      where: { id: parseInt(id), deletedAt: null },
      data: {
        deletedAt: new Date(),
      },
    });
  },
};
export default SchedulePatternRepository;
