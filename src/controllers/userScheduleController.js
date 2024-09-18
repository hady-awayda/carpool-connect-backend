import UserScheduleService from "../services/userScheduleService.js";

const UserScheduleController = {
  createUserSchedule: async (req, res) => {
    const { userId } = req.body;
    const { userScheduleData, preferencesData } = req.body;
    try {
      const newUserSchedule = await UserScheduleService.createUserSchedule(
        userId,
        userScheduleData,
        preferencesData
      );
      res.status(201).json(newUserSchedule);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getUserSchedulesByUserId: async (req, res) => {
    const { userId } = req.params;
    try {
      const userSchedules = await UserScheduleService.getUserSchedulesByUserId(
        parseInt(userId)
      );
      res.status(200).json(userSchedules);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateUserSchedule: async (req, res) => {
    const { id } = req.params;
    const { userScheduleData } = req.body;
    try {
      const updatedUserSchedule = await UserScheduleService.updateUserSchedule(
        parseInt(id),
        userScheduleData
      );
      res.status(200).json(updatedUserSchedule);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  updateSchedulePreferences: async (req, res) => {
    const { id } = req.params;
    const { preferencesData } = req.body;
    try {
      const updatedSchedulePreferences =
        await UserScheduleService.updateSchedulePreferences(
          parseInt(id),
          preferencesData
        );
      res.status(200).json(updatedSchedulePreferences);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Soft delete a user schedule and its preferences
  softDeleteUserScheduleAndPreferences: async (req, res) => {
    const { userScheduleId, schedulePreferencesId } = req.params;
    try {
      await UserScheduleService.softDeleteUserScheduleAndPreferences(
        parseInt(userScheduleId),
        parseInt(schedulePreferencesId)
      );
      res
        .status(200)
        .json({
          message: "User schedule and preferences soft deleted successfully",
        });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default UserScheduleController;
