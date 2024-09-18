import ScheduleAgreementRepository from "../repositories/scheduleAgreementRepository.js";

const ScheduleAgreementService = {
  createScheduleAgreement: async (matchedScheduleId, proposedBy, proposedData) => {
    const scheduleAgreementData = {
      matchedScheduleId,
      proposedBy,
      ...proposedData,
      status: "pending",
    };

    return await ScheduleAgreementRepository.createScheduleAgreement(scheduleAgreementData);
  },

  updateScheduleAgreement: async (id, data, userId) => {
    const scheduleAgreement = await ScheduleAgreementRepository.getScheduleAgreementById(
      id
    );

    if (!scheduleAgreement) {
      throw new Error("Schedule Agreement not found");
    }

    // If the user is the one who proposed, allow updates only if the status is pending and status is not included
    if (scheduleAgreement.proposedBy === userId) {
      if (scheduleAgreement.status !== "pending") {
        throw new Error(
          "Cannot modify agreement after it is accepted or rejected."
        );
      }

      if ("status" in data) {
        throw new Error("You cannot modify the status of the schedule agreement.");
      }

      // Allow modifying other fields as long as the status is pending
      return await ScheduleAgreementRepository.updateScheduleAgreement(id, data);
    }

    // If the user is not the proposer, allow only the status update
    if ("status" in data) {
      return await ScheduleAgreementRepository.updateScheduleAgreement(id, {
        status: data.status,
      });
    }

    throw new Error("Only the proposer can modify the agreement.");
  },

  // Soft delete the agreement only if the user is the proposer and status is pending
  softDeleteScheduleAgreement: async (id, userId) => {
    const scheduleAgreement = await ScheduleAgreementRepository.getScheduleAgreementById(
      id
    );

    if (!scheduleAgreement) {
      throw new Error("Schedule Agreement not found");
    }

    // Only the proposing user can soft delete, and only if the status is pending
    if (scheduleAgreement.proposedBy === userId) {
      if (scheduleAgreement.status !== "pending") {
        throw new Error(
          "Cannot delete the agreement after it is accepted or rejected."
        );
      }

      return await ScheduleAgreementRepository.softDeleteScheduleAgreement(id);
    }

    throw new Error("Only the user who proposed can delete the agreement.");
  },
};

export default ScheduleAgreementService;
