import MatchedScheduleService from "../services/matchedScheduleService.js";

const MatchedScheduleController = {
  createMatchedSchedule: async (req, res) => {
    const {
      userScheduleId1,
      userScheduleId2,
      agreedDepartureTime,
      agreedArrivalTime,
      carDetails,
    } = req.body;

    try {
      const newMatchedSchedule = await MatchedScheduleService.createMatchedSchedule(
        userScheduleId1,
        userScheduleId2,
        agreedDepartureTime,
        agreedArrivalTime,
        carDetails
      );
      res.status(201).json(newMatchedSchedule);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getMatchedSchedulesByUserId: async (req, res) => {
    const { userId } = req.params;
    try {
      const matchedSchedules = await MatchedScheduleService.getMatchedSchedulesByUserId(
        parseInt(userId)
      );
      res.status(200).json(matchedSchedules);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Soft delete a matched user
  softDeleteMatchedSchedule: async (req, res) => {
    const { id } = req.params;
    try {
      await MatchedScheduleService.softDeleteMatchedSchedule(parseInt(id));
      res
        .status(200)
        .json({ message: "Matched user soft deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default MatchedScheduleController;
