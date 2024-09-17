import userPreferenceService from "../services/userPreferenceService.js";

const userPreferenceController = {
  createUserPreference: async (req, res) => {
    if (userPreferenceService.getUserPreference(req.user.id)) {
      return res.status(400).json({ error: "User preference already exists" });
    }

    try {
      const preference = await userPreferenceService.createUserPreference(
        req.user.id
      );
      res.json(preference);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getUserPreference: async (req, res) => {
    const userId = req.user.id;

    try {
      const preference = await userPreferenceService.getUserPreference(userId);
      res.json(preference);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateUserPreference: async (req, res) => {
    const userId = req.user.id;
    const data = req.body;

    try {
      const updatedPreference =
        await userPreferenceService.updateUserPreference(userId, data);
      res.json(updatedPreference);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteUserPreference: async (req, res) => {
    const userId = req.user.id;

    try {
      await userPreferenceService.deleteUserPreference(userId);
      res.json({ message: "User preference deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default userPreferenceController;
