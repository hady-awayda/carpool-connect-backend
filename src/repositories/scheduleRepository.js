import prisma from "../../config/prisma_client.js";

const ScheduleRepository = {
  findSchedulesWithinBounds: async (
    userId,
    departureBounds,
    destinationBounds
  ) => {
    return prisma.userSchedules.findMany({
      where: {
        userId: { not: userId },
        deletedAt: null,
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
        isActive: true,
      },
    });
  },
};

export default ScheduleRepository;
