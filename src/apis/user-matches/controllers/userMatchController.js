import UserMatchService from "../services/userMatchService.js";

const UserMatchController = {
  createMatchRequest: async (req, res) => {
    const { userId1 } = req.user.id;
    const { userId2, requestedBy } = req.body;

    try {
      const match = await UserMatchService.createMatchRequest(
        userId1,
        userId2,
        requestedBy
      );
      res.status(201).json(match);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getUserMatches: async (req, res) => {
    const { userId } = req.user.id;

    try {
      const matches = await UserMatchService.getUserMatches(parseInt(userId));
      res.status(200).json(matches);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

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

  deleteMatchRequest: async (req, res) => {
    const { matchId } = req.params;

    try {
      await UserMatchService.deleteMatchRequest(parseInt(matchId));
      res.status(200).json({ message: "Match request deleted successfully" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};

export default UserMatchController;
