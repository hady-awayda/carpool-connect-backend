import prisma from "../../config/prisma_client.js";

const ScheduleRepository = {
  findSchedulesWithinBoundsAndType: async (
    userId,
    scheduleType,
    departureBounds,
    destinationBounds
  ) => {
    return prisma.userSchedules.findMany({
      where: {
        userId: { not: userId },
        deletedAt: null,
        isActive: true,
        scheduleType,
        departureLat: {
          gte: departureBounds.minLat,
          lte: departureBounds.maxLat,
        },
        departureLng: {
          gte: departureBounds.minLng,
          lte: departureBounds.maxLng,
        },
        destinationLat: {
          gte: destinationBounds.minLat,
          lte: destinationBounds.maxLat,
        },
        destinationLng: {
          gte: destinationBounds.minLng,
          lte: destinationBounds.maxLng,
        },
      },
    });
  },

  getUserScheduleById: async (id) => {
    return prisma.userSchedules.findUnique({
      where: { id, deletedAt: null },
      include: {
        schedulePreference: true,
        schedulePattern: true,
      },
    });
  },

  getDefaultUserSchedule: async (userId) => {
    return prisma.userSchedules.findFirst({
      where: {
        userId,
        isDefault: true,
        deletedAt: null,
      },
      include: {
        schedulePreference: true,
        schedulePattern: true,
      },
    });
  },
};

export default ScheduleRepository;
