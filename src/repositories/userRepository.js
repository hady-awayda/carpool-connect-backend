import prisma from "../../config/prisma_client.js";

const UserRepository = {
  getAllUsers: async () => {
    return prisma.user.findMany();
  },

  getUserById: async (id) => {
    return prisma.user.findUnique({ where: { id } });
  },

  createUser: async (data) => {
    return prisma.user.create({ data });
  },

  updateUser: async (id, data) => {
    return prisma.user.update({ where: { id }, data });
  },

  deleteUser: async (id) => {
    return prisma.user.delete({ where: { id } });
  },
};

export default UserRepository;
