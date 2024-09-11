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

  getMatchedRidesByUserId: async (userId) => {
    return MatchedRideRepository.getMatchedRidesByUserId(userId);
  },

  updateMatchedRideStatus: async (id, user1Status, user2Status) => {
    return MatchedRideRepository.updateMatchedRideStatus(
      id,
      user1Status,
      user2Status
    );
  },

  // Soft delete a matched ride
  softDeleteMatchedRide: async (id) => {
    return MatchedRideRepository.softDeleteMatchedRide(id);
  },
};

export default MatchedRideService;
