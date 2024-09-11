import UserMatchRepository from '../repositories/userMatchRepository.js';

const UserMatchService = {
  // Create a match request
  createMatchRequest: async (userId1, userId2, requestedBy) => {
    // Check if a match already exists (optional check)
    const existingMatches = await UserMatchRepository.getUserMatches(userId1);
    const existingMatch = existingMatches.find(
      (match) => match.userId2 === userId2 && match.status !== 'ended'
    );

    if (existingMatch) {
      throw new Error('Match already exists or is pending approval');
    }

    return UserMatchRepository.createMatchRequest(userId1, userId2, requestedBy);
  },

  // Get all matches for a user
  getUserMatches: async (userId) => {
    return UserMatchRepository.getUserMatches(userId);
  },

  // Approve or decline a match request
  respondToMatchRequest: async (matchId, status, responseBy) => {
    if (!['approved', 'declined'].includes(status)) {
      throw new Error('Invalid status');
    }

    return UserMatchRepository.updateMatchStatus(matchId, status, responseBy);
  },
};

export default UserMatchService;
