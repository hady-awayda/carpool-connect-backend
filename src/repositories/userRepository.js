import prisma from "../../config/prisma_client.js";

const UserService = {
  getAllUsers: async () => {
    return await prisma.user.findMany({
      where: {
        id: parseInt(id),
        deletedAt: null,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        phoneNumber: true,
        createdAt: true,
        updatedAt: true,
        password: false,
      },
    });
  },

  getUserById: async (id) => {
    return await prisma.user.findUnique({
      where: { id: parseInt(id) },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        phoneNumber: true,
        createdAt: true,
        updatedAt: true,
        password: false,
      },
    });
  },

  updateUser: async (id, data) => {
    return await prisma.user.update({
      where: {
        id: parseInt(id),
        deletedAt: null,
      },
      data: { ...data },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        phoneNumber: true,
        createdAt: true,
        updatedAt: true,
        password: false,
      },
    });
  },

  deleteUser: async (id) => {
    return await prisma.user.delete({
      where: { id: parseInt(id) },
      data: {
        deletedAt: new Date(),
      },
    });
  },
};

export default UserService;
