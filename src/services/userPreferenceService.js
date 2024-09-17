import userPreferenceRepository from "../repositories/userPreferenceRepository.js";

const userPreferenceService = {
  getUserPreference: async (userId) => {
    let preference = await userPreferenceRepository.getUserPreference(userId);

    if (!preference) {
      // Create default preference if not exists
      preference = await userPreferenceRepository.createUserPreference(
        userId,
        {}
      );
    }

    return preference;
  },

  updateUserPreference: async (userId, data) => {
    return userPreferenceRepository.updateUserPreference(userId, data);
  },

  // Additional service methods as needed
};
