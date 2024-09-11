import RideAgreementService from '../services/rideAgreementService.js';

const RideAgreementController = {
  createRideAgreement: async (req, res) => {
    const { matchedRideId, proposedBy, proposedData } = req.body;
    try {
      const rideAgreement = await RideAgreementService.createRideAgreement(
        matchedRideId,
        proposedBy,
        proposedData
      );
      res.status(201).json(rideAgreement);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  updateRideAgreement: async (req, res) => {
    const { id } = req.params;
    const { data, userId } = req.body;
    try {
      const updatedAgreement = await RideAgreementService.updateRideAgreement(parseInt(id), data, userId);
      res.status(200).json(updatedAgreement);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteRideAgreement: async (req, res) => {
    const { id, userId } = req.params;
    try {
      await RideAgreementService.deleteRideAgreement(parseInt(id), userId);
      res.status(200).json({ message: 'Ride Agreement deleted successfully' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};

export default RideAgreementController;
