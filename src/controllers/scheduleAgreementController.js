import ScheduleAgreementService from "../services/scheduleAgreementService.js";

const ScheduleAgreementController = {
  createScheduleAgreement: async (req, res) => {
    const { proposedBy } = req.user.id;
    const { matchedScheduleId, proposedData } = req.body;

    try {
      const scheduleAgreement =
        await ScheduleAgreementService.createScheduleAgreement(
          matchedScheduleId,
          proposedBy,
          proposedData
        );
      res.status(201).json(scheduleAgreement);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  updateScheduleAgreement: async (req, res) => {
    const { id } = req.params;
    const { data } = req.body;
    const { userId } = req.user.id;

    try {
      const updatedAgreement =
        await ScheduleAgreementService.updateScheduleAgreement(
          parseInt(id),
          data,
          userId
        );
      res.status(200).json(updatedAgreement);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  softDeleteScheduleAgreement: async (req, res) => {
    const { id } = req.params;
    const { userId } = req.user.id;

    try {
      await ScheduleAgreementService.softDeleteScheduleAgreement(
        parseInt(id),
        parseInt(userId)
      );
      res
        .status(200)
        .json({ message: "Schedule Agreement soft deleted successfully" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};

export default ScheduleAgreementController;
