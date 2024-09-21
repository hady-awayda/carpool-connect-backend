import prisma from "../../config/prisma_client.js";

const UserScheduleRepository = {
  createUserSchedule: async (userId, data) => {
    return prisma.userSchedules.create({
      data: {
        user: { connect: { id: userId } },
        ...data,
      },
    });
  },

  getUserSchedulesByUserId: async (userId) => {
    return prisma.userSchedules.findMany({
      where: { userId, deletedAt: null },
      include: {
        schedulePreference: true,
        schedulePattern: true,
      },
    });
  },

  updateUserSchedule: async (id, data) => {
    return prisma.userSchedules.update({
      where: { id, deletedAt: null },
      data: { ...data },
    });
  },

  softDeleteUserSchedule: async (id) => {
    return prisma.userSchedules.update({
      where: { id, deletedAt: null },
      data: {
        deletedAt: new Date(),
      },
    });
  },
};

export default UserScheduleRepository;
