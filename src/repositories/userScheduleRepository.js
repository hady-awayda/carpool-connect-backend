import prisma from "../../config/prisma_client.js";

const UserScheduleRepository = {
  createUserSchedule: async (data) => {
    return prisma.userSchedules.create({
      data: {
        userId: data.userId,
        scheduleType: data.scheduleType,
        departureLat: data.departureLat,
        departureLng: data.departureLng,
        destinationLat: data.destinationLat,
        destinationLng: data.destinationLng,
        departureTime: data.departureTime,
        arrivalTime: data.arrivalTime,
        selectedCar: data.selectedCar,
        isDefault: data.isDefault,
        schedulePatternId: data.schedulePatternId,
        schedulePreferencesId: data.schedulePreferencesId,
        isActive: data.isActive,
      },
    });
  },

  getUserSchedulesByUserId: async (userId) => {
    return prisma.userSchedules.findMany({
      where: { userId, deletedAt: null },
      include: {
        schedulePreferences: true,
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
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  },
};

export default UserScheduleRepository;
