import MatchedRideService from '../services/matchedRideService.js';

const MatchedRideController = {
  createMatchedRide: async (req, res) => {
    const { rideScheduleId1, rideScheduleId2, agreedDepartureTime, agreedArrivalTime, carDetails } = req.body;

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

  getMatchedRideById: async (req, res) => {
    const { id } = req.params;
    try {
      const matchedRide = await MatchedRideService.getMatchedRideById(parseInt(id));
      res.status(200).json(matchedRide);
    } catch (error) {
      res.status(404).json({ message: 'Matched Ride not found' });
    }
  },
};

export default MatchedRideController;
