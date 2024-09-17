import prisma from "../../config/prisma_client.js";

const UserService = {
  getAllUsers: async () => {
    return await prisma.user.findMany({
      where: {
        id: parseInt(id),
      },
      select: {
        id: true,
        name: true,
        age: true,
        email: true,
        password: false,
        role: true,
        phoneNumber: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: null,
      },
    });
  },

  getUserById: async (id) => {
    return await prisma.user.findUnique({
      where: { id: parseInt(id) },
      select: {
        id: true,
        name: true,
        age: true,
        email: true,
        password: false,
        role: true,
        phoneNumber: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: null,
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
        age: true,
        email: true,
        password: false,
        role: true,
        phoneNumber: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: null,
      },
    });
  },

  deleteUser: async (id) => {
    return await prisma.user.delete({
      where: { id: parseInt(id), deletedAt: null },
      data: {
        deletedAt: new Date(),
      },
    });
  },
};

export default UserService;
