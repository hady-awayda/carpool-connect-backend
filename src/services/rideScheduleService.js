import RideScheduleRepository from "../repositories/rideScheduleRepository.js";

const RideScheduleService = {
  getRideSchedules: async () => {
    return RideScheduleRepository.getAllRideSchedules();
  },

  createRideSchedule: async (data) => {
    return RideScheduleRepository.createRideSchedule(data);
  },

  updateRideSchedule: async (id, data) => {
    return RideScheduleRepository.updateRideSchedule(id, data);
  },

  deleteRideSchedule: async (id) => {
    return RideScheduleRepository.deleteRideSchedule(id);
  },
};

export default RideScheduleService;
