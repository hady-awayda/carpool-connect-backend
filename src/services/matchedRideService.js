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

    return await MatchedRideRepository.createMatchedRide(data);
  },

  getMatchedRidesByUserId: async (userId) => {
    return await MatchedRideRepository.getMatchedRidesByUserId(userId);
  },

  updateMatchedRideStatus: async (id, user1Status, user2Status) => {
    return await MatchedRideRepository.updateMatchedRideStatus(
      id,
      user1Status,
      user2Status
    );
  },

  softDeleteMatchedRide: async (id) => {
    return await MatchedRideRepository.softDeleteMatchedRide(id);
  },
};

export default MatchedRideService;
