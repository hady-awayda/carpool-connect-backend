import MatchedRideRepository from "../repositories/matchedRideRepository.js";

const MatchedRideService = {
  createMatchedRide: async (
    rideScheduleId1,
    rideScheduleId2,
    agreedDepartureTime,
    agreedArrivalTime,
    carDetails
  ) => {
    const data = {
      rideScheduleId1,
      rideScheduleId2,
      agreedDepartureTime,
      agreedArrivalTime,
      carDetails,
      user1AgreementStatus: "pending",
      user2AgreementStatus: "pending",
    };

    return MatchedRideRepository.createMatchedRide(data);
  },

  getMatchedRideById: async (id) => {
    return MatchedRideRepository.getMatchedRideById(id);
  },

  updateMatchedRideStatus: async (id, user1Status, user2Status) => {
    return MatchedRideRepository.updateMatchedRideStatus(
      id,
      user1Status,
      user2Status
    );
  },
};

export default MatchedRideService;
