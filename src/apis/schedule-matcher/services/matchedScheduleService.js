import MatchedScheduleRepository from "../repositories/matchedScheduleRepository.js";

const MatchedScheduleService = {
  createMatchedSchedule: async (
    userScheduleId1,
    userScheduleId2,
    agreedDepartureTime,
    agreedArrivalTime,
    carDetails
  ) => {
    const data = {
      userScheduleId1,
      userScheduleId2,
      agreedDepartureTime,
      agreedArrivalTime,
      carDetails,
      user1AgreementStatus: "pending",
      user2AgreementStatus: "pending",
    };

    return await MatchedScheduleRepository.createMatchedSchedule(data);
  },

  getMatchedSchedulesByUserId: async (userId) => {
    return await MatchedScheduleRepository.getMatchedSchedulesByUserId(userId);
  },

  updateMatchedScheduleStatus: async (id, user1Status, user2Status) => {
    return await MatchedScheduleRepository.updateMatchedScheduleStatus(
      id,
      user1Status,
      user2Status
    );
  },

  softDeleteMatchedSchedule: async (id) => {
    return await MatchedScheduleRepository.softDeleteMatchedSchedule(id);
  },
};

export default MatchedScheduleService;
