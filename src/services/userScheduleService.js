import UserScheduleRepository from "../repositories/userScheduleRepository.js";
import SchedulePreferencesRepository from "../repositories/schedulePreferencesRepository.js";

const handleScheduleRelations = (data) => {
  const { schedulePatternId, schedulePreferencesId, ...restData } = data;
  const relations = {};

  if (schedulePatternId) {
    relations.schedulePattern = { connect: { id: schedulePatternId } };
  }
  if (schedulePreferencesId) {
    relations.schedulePreference = { connect: { id: schedulePreferencesId } };
  }

  return { ...restData, ...relations };
};

const UserScheduleService = {
  createUserSchedule: async (userId, userScheduleData) => {
    await UserScheduleRepository.unsetDefaultSchedules(userId);

    // const schedulePreferences =
    // await SchedulePreferencesRepository.createSchedulePreferences({
    //   ...preferencesData,
    // });

    const processedData = handleScheduleRelations({
      ...userScheduleData,
      departureTime: new Date(userScheduleData.departureTime).toISOString(),
      arrivalTime: new Date(userScheduleData.arrivalTime).toISOString(),
    });

    return await UserScheduleRepository.createUserSchedule(
      userId,
      processedData
    );
  },

  getUserSchedulesByUserId: async (userId) => {
    const userSchedules = await UserScheduleRepository.getUserSchedulesByUserId(
      userId
    );

    // const userSchedulesWithPreferences = await Promise.all(
    //   userSchedules.map(async (userSchedule) => {
    //     const schedulePreferences =
    //       await SchedulePreferencesRepository.getSchedulePreferencesByUserScheduleId(
    //         userSchedule.schedulePreferencesId
    //       );
    //     return { ...userSchedule, schedulePreferences };
    //   })
    // );

    // return userSchedulesWithPreferences;
    return userSchedules;
  },

  getUserScheduleById: async (scheduleId) => {
    return await UserScheduleRepository.getUserScheduleById(scheduleId);
  },

  getDefaultUserSchedule: async (userId) => {
    return await UserScheduleRepository.getDefaultUserSchedule(userId);
  },

  setDefaultSchedule: async (userId, scheduleId) => {
    await UserScheduleRepository.unsetDefaultSchedules(userId);

    return await UserScheduleRepository.setDefaultSchedule(userId, scheduleId);
  },

  updateSchedulePreferences: async (id, preferencesData) => {
    return await SchedulePreferencesRepository.updateSchedulePreferences(
      id,
      preferencesData
    );
  },

  updateUserSchedule: async (id, userScheduleData) => {
    const processedData = handleScheduleRelations(userScheduleData);
    return await UserScheduleRepository.updateUserSchedule(
      userId,
      id,
      processedData
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
