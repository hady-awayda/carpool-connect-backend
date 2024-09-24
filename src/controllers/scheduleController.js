import ScheduleService from "../services/scheduleService.js";

const ScheduleController = {
  findSchedules: async (req, res) => {
    const userId = req.user.id;
    const {
      scheduleId,
      departureTimeFlexibility = 30,
      departureDistanceFlexibility = 30,
      destinationTimeFlexibility = 30,
      destinationDistanceFlexibility = 30,
    } = req.query;

    try {
      const schedules = await ScheduleService.findSchedules(
        userId,
        parseInt(scheduleId),
        parseInt(departureTimeFlexibility),
        parseInt(departureDistanceFlexibility),
        parseInt(destinationTimeFlexibility),
        parseInt(destinationDistanceFlexibility)
      );
      res.status(200).json(schedules);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default ScheduleController;
