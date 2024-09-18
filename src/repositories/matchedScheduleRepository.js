import prisma from "../../config/prisma_client.js";

const MatchedScheduleRepository = {
  createMatchedSchedule: async (data) => {
    return prisma.matchedSchedule.create({
      data,
    });
  },

  getMatchedSchedulesByUserId: async (userId) => {
    return prisma.matchedSchedule.findMany({
      where: {
        deletedAt: null,
        OR: [
          { userSchedule1: { userId: userId } },
          { userSchedule2: { userId: userId } },
        ],
      },
      include: {
        userSchedule1: true,
        userSchedule2: true,
      },
    });
  },

  updateMatchedScheduleStatus: async (id, user1Status, user2Status) => {
    return prisma.matchedSchedule.update({
      where: { id, deletedAt: null },
      data: {
        user1AgreementStatus: user1Status,
        user2AgreementStatus: user2Status,
      },
    });
  },

  softDeleteMatchedSchedule: async (id) => {
    return prisma.matchedSchedule.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  },
};

export default MatchedScheduleRepository;
