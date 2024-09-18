import UserScheduleRepository from "../repositories/userScheduleRepository.js";
import SchedulePreferencesRepository from "../repositories/schedulePreferencesRepository.js";

const UserScheduleService = {
  createUserSchedule: async (userId, userScheduleData) => {
    // const schedulePreferences =
    // await SchedulePreferencesRepository.createSchedulePreferences({
    //   ...preferencesData,
    // });

    return await UserScheduleRepository.createUserSchedule({
      userId,
      ...userScheduleData,
      // schedulePreferencesId: schedulePreferences.id,
    });
  },

  getUserSchedulesByUserId: async (userId) => {
    const userSchedules = await UserScheduleRepository.getUserSchedulesByUserId(
      userId
    );

    const userSchedulesWithPreferences = await Promise.all(
      userSchedules.map(async (userSchedule) => {
        const schedulePreferences =
          await SchedulePreferencesRepository.getSchedulePreferencesByUserScheduleId(
            userSchedule.schedulePreferencesId
          );
        return { ...userSchedule, schedulePreferences };
      })
    );

    return userSchedulesWithPreferences;
  },

  updateUserSchedule: async (id, userScheduleData) => {
    return await UserScheduleRepository.updateUserSchedule(
      id,
      userScheduleData
    );
  },

  updateSchedulePreferences: async (id, preferencesData) => {
    return await SchedulePreferencesRepository.updateSchedulePreferences(
      id,
      preferencesData
    );
  },

  softDeleteUserScheduleAndPreferences: async (
    userScheduleId,
    schedulePreferencesId
  ) => {
    await SchedulePreferencesRepository.softDeleteSchedulePreferences(
      schedulePreferencesId
    );

    return await UserScheduleRepository.softDeleteUserSchedule(userScheduleId);
  },
};

export default UserScheduleService;
