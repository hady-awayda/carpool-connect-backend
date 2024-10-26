import SchedulePatternRepository from "../repositories/schedulePatternRepository.js";

const SchedulePatternService = {
  createSchedulePattern: async (userId, data) => {
    try {
      const schedulePattern =
        await SchedulePatternRepository.createSchedulePattern(userId, data);
      return schedulePattern;
    } catch (error) {
      throw new Error("Failed to create schedule pattern: " + error.message);
    }
  },

  getSchedulePatternById: async (id) => {
    try {
      const schedulePattern =
        await SchedulePatternRepository.getSchedulePatternById(id);
      if (!schedulePattern) {
        throw new Error("Schedule Pattern not found");
      }
      return schedulePattern;
    } catch (error) {
      throw new Error("Failed to get schedule pattern: " + error.message);
    }
  },

  getSchedulePatternsByUserId: async (userId) => {
    try {
      const schedulePatterns =
        await SchedulePatternRepository.getSchedulePatternsByUserId(userId);
      return schedulePatterns;
    } catch (error) {
      throw new Error("Failed to get schedule patterns: " + error.message);
    }
  },

  updateSchedulePattern: async (id, data) => {
    try {
      const updatedPattern =
        await SchedulePatternRepository.updateSchedulePattern(id, data);
      return updatedPattern;
    } catch (error) {
      throw new Error("Failed to update schedule pattern: " + error.message);
    }
  },

  deleteSchedulePattern: async (id) => {
    try {
      await SchedulePatternRepository.softDeleteSchedulePattern(id);
      return { message: "Schedule pattern successfully deleted" };
    } catch (error) {
      throw new Error("Failed to delete schedule pattern: " + error.message);
    }
  },
};

export default SchedulePatternService;
