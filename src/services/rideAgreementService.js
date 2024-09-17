import RideAgreementRepository from "../repositories/rideAgreementRepository.js";

const RideAgreementService = {
  createRideAgreement: async (matchedRideId, proposedBy, proposedData) => {
    const rideAgreementData = {
      matchedRideId,
      proposedBy,
      ...proposedData,
      status: "pending",
    };

    return await RideAgreementRepository.createRideAgreement(rideAgreementData);
  },

  updateRideAgreement: async (id, data, userId) => {
    const rideAgreement = await RideAgreementRepository.getRideAgreementById(
      id
    );

    if (!rideAgreement) {
      throw new Error("Ride Agreement not found");
    }

    // If the user is the one who proposed, allow updates only if the status is pending and status is not included
    if (rideAgreement.proposedBy === userId) {
      if (rideAgreement.status !== "pending") {
        throw new Error(
          "Cannot modify agreement after it is accepted or rejected."
        );
      }

      if ("status" in data) {
        throw new Error("You cannot modify the status of the ride agreement.");
      }

      // Allow modifying other fields as long as the status is pending
      return await RideAgreementRepository.updateRideAgreement(id, data);
    }

    // If the user is not the proposer, allow only the status update
    if ("status" in data) {
      return await RideAgreementRepository.updateRideAgreement(id, {
        status: data.status,
      });
    }

    throw new Error("Only the proposer can modify the agreement.");
  },

  // Soft delete the agreement only if the user is the proposer and status is pending
  softDeleteRideAgreement: async (id, userId) => {
    const rideAgreement = await RideAgreementRepository.getRideAgreementById(
      id
    );

    if (!rideAgreement) {
      throw new Error("Ride Agreement not found");
    }

    // Only the proposing user can soft delete, and only if the status is pending
    if (rideAgreement.proposedBy === userId) {
      if (rideAgreement.status !== "pending") {
        throw new Error(
          "Cannot delete the agreement after it is accepted or rejected."
        );
      }

      return await RideAgreementRepository.softDeleteRideAgreement(id);
    }

    throw new Error("Only the user who proposed can delete the agreement.");
  },
};

export default RideAgreementService;
