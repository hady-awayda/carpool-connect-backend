import userPreferenceRepository from "../repositories/userPreferenceRepository.js";

const userPreferenceService = {
  createUserPreference: async (userId, data) => {
    return await userPreferenceRepository.createUserPreference(userId, data);
  },

  getUserPreference: async (userId) => {
    let preference = await userPreferenceRepository.getUserPreference(userId);

    if (!preference) {
      preference = await userPreferenceRepository.createUserPreference(
        userId,
        {}
      );
    }

    return preference;
  },

  updateUserPreference: async (userId, data) => {
    return await userPreferenceRepository.updateUserPreference(userId, data);
  },

  deleteUserPreference: async (userId) => {
    return await userPreferenceRepository.deleteUserPreference(userId);
  },
};

export default userPreferenceService;
