import prisma from "../../config/prisma_client.js";

const SchedulePreferencesRepository = {
  createSchedulePreferences: async (data) => {
    return prisma.schedulePreferences.create({
      data,
    });
  },

  getSchedulePreferencesByUserScheduleId: async (schedulePreferencesId) => {
    return prisma.schedulePreferences.findMany({
      where: { id: schedulePreferencesId, deletedAt: null },
    });
  },

  updateSchedulePreferences: async (id, data) => {
    return prisma.schedulePreferences.update({
      where: { id, deletedAt: null },
      data,
    });
  },

  softDeleteSchedulePreferences: async (id) => {
    return prisma.schedulePreferences.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  },
};

export default SchedulePreferencesRepository;
