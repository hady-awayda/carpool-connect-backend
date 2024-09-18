import prisma from "../../config/prisma_client.js";

const UserScheduleRepository = {
  createUserSchedule: async (data) => {
    return prisma.userSchedule.create({
      data,
    });
  },

  getUserSchedulesByUserId: async (userId) => {
    return prisma.userSchedule.findMany({
      where: { userId, deletedAt: null },
      include: {
        schedulePreferences: true,
        schedulePattern: true,
      },
    });
  },

  updateUserSchedule: async (id, data) => {
    return prisma.userSchedule.update({
      where: { id, deletedAt: null },
      data: { ...data },
    });
  },

  softDeleteUserSchedule: async (id) => {
    return prisma.userSchedule.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  },
};

export default UserScheduleRepository;
