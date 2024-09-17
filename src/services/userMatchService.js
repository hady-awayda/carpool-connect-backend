import UserMatchRepository from "../repositories/userMatchRepository.js";

const UserMatchService = {
  createMatchRequest: async (userId1, userId2, requestedBy) => {
    const existingMatches = await UserMatchRepository.getUserMatches(userId1);
    const existingMatch = existingMatches.find(
      (match) => match.userId2 === userId2 && match.status !== "ended"
    );

    if (existingMatch) {
      throw new Error("Match already exists or is pending approval");
    }

    return UserMatchRepository.createMatchRequest(
      userId1,
      userId2,
      requestedBy
    );
  },

  getUserMatches: async (userId) => {
    return UserMatchRepository.getUserMatches(userId);
  },

  respondToMatchRequest: async (matchId, status, responseBy) => {
    if (!["approved", "declined"].includes(status)) {
      throw new Error("Invalid status");
    }

    return UserMatchRepository.updateMatchStatus(matchId, status, responseBy);
  },

  deleteUserMatch: async (matchId) => {
    return UserMatchRepository.deleteUserMatch(matchId);
  },
};

export default UserMatchService;
