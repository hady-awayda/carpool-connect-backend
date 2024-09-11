import RideScheduleRepository from "../repositories/rideScheduleRepository.js";
import RidePreferencesRepository from "../repositories/ridePreferencesRepository.js";

const RideScheduleService = {
  createRideSchedule: async (userId, rideScheduleData, preferencesData) => {
    // Create ride preferences first
    const ridePreferences =
      await RidePreferencesRepository.createRidePreferences({
        ...preferencesData,
      });

    // Now create the ride schedule with reference to the preferences
    return RideScheduleRepository.createRideSchedule({
      ...rideScheduleData,
      userId,
      ridePreferencesId: ridePreferences.id,
    });
  },

  getRideSchedulesByUserId: async (userId) => {
    // Get all ride schedules for a user
    const rideSchedules = await RideScheduleRepository.getRideSchedulesByUserId(
      userId
    );

    // Retrieve ride preferences for each ride schedule and include them
    const rideSchedulesWithPreferences = await Promise.all(
      rideSchedules.map(async (rideSchedule) => {
        const ridePreferences =
          await RidePreferencesRepository.getRidePreferencesByRideScheduleId(
            rideSchedule.ridePreferencesId
          );
        return { ...rideSchedule, ridePreferences };
      })
    );

    return rideSchedulesWithPreferences;
  },

  updateRideSchedule: async (id, rideScheduleData) => {
    return RideScheduleRepository.updateRideSchedule(id, rideScheduleData);
  },

  updateRidePreferences: async (id, preferencesData) => {
    return RidePreferencesRepository.updateRidePreferences(id, preferencesData);
  },

  // Soft delete both the ride schedule and its associated preferences
  softDeleteRideScheduleAndPreferences: async (
    rideScheduleId,
    ridePreferencesId
  ) => {
    // Soft delete the ride preferences first
    await RidePreferencesRepository.softDeleteRidePreferences(
      ridePreferencesId
    );

    // Then soft delete the ride schedule
    return RideScheduleRepository.softDeleteRideSchedule(rideScheduleId);
  },
};

export default RideScheduleService;
