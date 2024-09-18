import prisma from "../../config/prisma_client.js";

const ScheduleAgreementRepository = {
  createScheduleAgreement: async (data) => {
    return prisma.scheduleAgreement.create({
      data,
    });
  },

  updateScheduleAgreement: async (id, data) => {
    return prisma.scheduleAgreement.update({
      where: { id, deletedAt: null },
      data,
    });
  },

  softDeleteScheduleAgreement: async (id) => {
    return prisma.scheduleAgreement.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  },

  getScheduleAgreementById: async (id) => {
    return prisma.scheduleAgreement.findUnique({
      where: { id, deletedAt: null },
    });
  },
};

export default ScheduleAgreementRepository;
