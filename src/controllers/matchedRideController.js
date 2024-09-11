import MatchedRideService from "../services/matchedRideService.js";

const MatchedRideController = {
  createMatchedRide: async (req, res) => {
    const {
      rideScheduleId1,
      rideScheduleId2,
      agreedDepartureTime,
      agreedArrivalTime,
      carDetails,
    } = req.body;

    try {
      const newMatchedRide = await MatchedRideService.createMatchedRide(
        rideScheduleId1,
        rideScheduleId2,
        agreedDepartureTime,
        agreedArrivalTime,
        carDetails
      );
      res.status(201).json(newMatchedRide);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getMatchedRidesByUserId: async (req, res) => {
    const { userId } = req.params;
    try {
      const matchedRides = await MatchedRideService.getMatchedRidesByUserId(
        parseInt(userId)
      );
      res.status(200).json(matchedRides);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Soft delete a matched ride
  softDeleteMatchedRide: async (req, res) => {
    const { id } = req.params;
    try {
      await MatchedRideService.softDeleteMatchedRide(parseInt(id));
      res
        .status(200)
        .json({ message: "Matched ride soft deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default MatchedRideController;
