import RideScheduleService from "../services/rideScheduleService.js";

const RideScheduleController = {
  getRideSchedules: async (req, res) => {
    try {
      const schedules = await RideScheduleService.getRideSchedules();
      res.status(200).json(schedules);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createRideSchedule: async (req, res) => {
    try {
      const newSchedule = await RideScheduleService.createRideSchedule(
        req.body
      );
      res.status(201).json(newSchedule);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateRideSchedule: async (req, res) => {
    try {
      const updatedSchedule = await RideScheduleService.updateRideSchedule(
        req.params.id,
        req.body
      );
      res.status(200).json(updatedSchedule);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteRideSchedule: async (req, res) => {
    try {
      await RideScheduleService.deleteRideSchedule(req.params.id);
      res.status(200).json({ message: "Ride schedule deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default RideScheduleController;
