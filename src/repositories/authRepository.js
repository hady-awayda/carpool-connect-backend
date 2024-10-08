import prisma from "../../config/prisma_client.js";

const AuthRepository = {
  findUserByEmail: async (email) => {
    return prisma.user.findFirst({
      where: {
        email: email,
        deletedAt: null,
      },
    });
  },

  createUser: async (data) => {
    return prisma.user.create({
      data,
    });
  },
};

export default AuthRepository;
