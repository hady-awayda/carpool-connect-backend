import analyticsService from "../services/analyticsService.js";

const analyticsController = {
  getAnalyticsData: async (req, res) => {
    try {
      const data = await analyticsService.getAnalyticsData();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default analyticsController;
