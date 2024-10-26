import SchedulePatternService from "../services/schedulePatternService.js";

const SchedulePatternController = {
  create: async (req, res) => {
    const { userId } = req.body;
    try {
      const schedulePattern =
        await SchedulePatternService.createSchedulePattern(userId, req.body);
      res.status(201).json(schedulePattern);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getById: async (req, res) => {
    try {
      const schedulePattern =
        await SchedulePatternService.getSchedulePatternById(req.params.id);
      res.status(200).json(schedulePattern);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getByUserId: async (req, res) => {
    try {
      const schedulePatterns =
        await SchedulePatternService.getSchedulePatternsByUserId(
          req.params.userId
        );
      res.status(200).json(schedulePatterns);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  update: async (req, res) => {
    try {
      const updatedPattern = await SchedulePatternService.updateSchedulePattern(
        req.params.id,
        req.body
      );
      res.status(200).json(updatedPattern);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  delete: async (req, res) => {
    try {
      const result = await SchedulePatternService.deleteSchedulePattern(
        req.params.id
      );
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

export default SchedulePatternController;
