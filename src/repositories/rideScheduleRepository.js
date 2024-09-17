import prisma from "../../config/prisma_client.js";

const RideScheduleRepository = {
  createRideSchedule: async (data) => {
    return prisma.rideSchedule.create({
      data,
    });
  },

  getRideSchedulesByUserId: async (userId) => {
    return prisma.rideSchedule.findMany({
      where: { userId, deletedAt: null },
      include: {
        ridePreferences: true,
      },
    });
  },

  updateRideSchedule: async (id, data) => {
    return prisma.rideSchedule.update({
      where: { id, deletedAt: null },
      data,
    });
  },

  softDeleteRideSchedule: async (id) => {
    return prisma.rideSchedule.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  },
};

export default RideScheduleRepository;
