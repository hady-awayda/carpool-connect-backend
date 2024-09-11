import prisma from "../../config/prisma_client.js";

const RideScheduleRepository = {
  getAllRideSchedules: async () => {
    return prisma.rideSchedule.findMany({ include: { user: true } });
  },

  createRideSchedule: async (data) => {
    return prisma.rideSchedule.create({ data });
  },

  updateRideSchedule: async (id, data) => {
    return prisma.rideSchedule.update({ where: { id }, data });
  },

  deleteRideSchedule: async (id) => {
    return prisma.rideSchedule.delete({ where: { id } });
  },
};

export default RideScheduleRepository;
