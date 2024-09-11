import UserMatchService from '../services/userMatchService.js';

const UserMatchController = {
  // Create a match request
  createMatchRequest: async (req, res) => {
    const { userId1, userId2, requestedBy } = req.body;
    try {
      const match = await UserMatchService.createMatchRequest(userId1, userId2, requestedBy);
      res.status(201).json(match);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Get all matches for a user
  getUserMatches: async (req, res) => {
    const { userId } = req.params;
    try {
      const matches = await UserMatchService.getUserMatches(parseInt(userId));
      res.status(200).json(matches);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Approve or decline a match request
  respondToMatchRequest: async (req, res) => {
    const { matchId } = req.params;
    const { status, responseBy } = req.body;
    try {
      const updatedMatch = await UserMatchService.respondToMatchRequest(
        parseInt(matchId),
        status,
        responseBy
      );
      res.status(200).json(updatedMatch);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};

export default UserMatchController;
