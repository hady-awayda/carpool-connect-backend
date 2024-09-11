import RideScheduleService from "../services/rideScheduleService.js";

const RideScheduleController = {
  createRideSchedule: async (req, res) => {
    const { userId } = req.body;
    const { rideScheduleData, preferencesData } = req.body;
    try {
      const newRideSchedule = await RideScheduleService.createRideSchedule(
        userId,
        rideScheduleData,
        preferencesData
      );
      res.status(201).json(newRideSchedule);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getRideSchedulesByUserId: async (req, res) => {
    const { userId } = req.params;
    try {
      const rideSchedules = await RideScheduleService.getRideSchedulesByUserId(
        parseInt(userId)
      );
      res.status(200).json(rideSchedules);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateRideSchedule: async (req, res) => {
    const { id } = req.params;
    const { rideScheduleData } = req.body;
    try {
      const updatedRideSchedule = await RideScheduleService.updateRideSchedule(
        parseInt(id),
        rideScheduleData
      );
      res.status(200).json(updatedRideSchedule);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  updateRidePreferences: async (req, res) => {
    const { id } = req.params;
    const { preferencesData } = req.body;
    try {
      const updatedRidePreferences =
        await RideScheduleService.updateRidePreferences(
          parseInt(id),
          preferencesData
        );
      res.status(200).json(updatedRidePreferences);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Soft delete a ride schedule and its preferences
  softDeleteRideScheduleAndPreferences: async (req, res) => {
    const { rideScheduleId, ridePreferencesId } = req.params;
    try {
      await RideScheduleService.softDeleteRideScheduleAndPreferences(
        parseInt(rideScheduleId),
        parseInt(ridePreferencesId)
      );
      res
        .status(200)
        .json({
          message: "Ride schedule and preferences soft deleted successfully",
        });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default RideScheduleController;
