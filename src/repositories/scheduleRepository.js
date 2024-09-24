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
};

export default ScheduleRepository;
