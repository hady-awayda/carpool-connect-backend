import RideAgreementRepository from "../repositories/rideAgreementRepository.js";

const RideAgreementService = {
  createRideAgreement: async (matchedRideId, proposedBy, proposedData) => {
    const rideAgreementData = {
      matchedRideId,
      proposedBy,
      ...proposedData,
      status: "pending",
    };

    return RideAgreementRepository.createRideAgreement(rideAgreementData);
  },

  updateRideAgreement: async (id, data, userId) => {
    const rideAgreement = await RideAgreementRepository.getRideAgreementById(
      id
    );

    if (!rideAgreement) {
      throw new Error("Ride Agreement not found");
    }

    if (rideAgreement.proposedBy === userId) {
      throw new Error("You cannot accept/reject your own proposal.");
    }

    return RideAgreementRepository.updateRideAgreement(id, data);
  },

  deleteRideAgreement: async (id, userId) => {
    const rideAgreement = await RideAgreementRepository.getRideAgreementById(
      id
    );

    if (rideAgreement.proposedBy !== userId) {
      throw new Error("Only the user who proposed can delete the agreement.");
    }

    return RideAgreementRepository.deleteRideAgreement(id);
  },
};

export default RideAgreementService;
