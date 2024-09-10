import prisma from "../../config/prisma_client.js";

const UserRepository = {
  /**
   * Find a user by ID.
   * @param {number} id - User ID.
   * @returns {Promise<User|null>} The user or null if not found.
   */
  findById: async (id) => {
    return prisma.user.findUnique({
      where: { id },
    });
  },

  /**
   * Find all users.
   * @returns {Promise<User[]>} List of all users.
   */
  findAll: async () => {
    return prisma.user.findMany();
  },

  /**
   * Create a new user.
   * @param {Object} data - User data.
   * @returns {Promise<User>} The created user.
   */
  create: async (data) => {
    return prisma.user.create({
      data,
    });
  },

  /**
   * Update a user by ID.
   * @param {number} id - User ID.
   * @param {Object} data - Updated user data.
   * @returns {Promise<User|null>} The updated user or null if not found.
   */
  updateById: async (id, data) => {
    return prisma.user.update({
      where: { id },
      data,
    });
  },

  /**
   * Delete a user by ID.
   * @param {number} id - User ID.
   * @returns {Promise<User|null>} The deleted user or null if not found.
   */
  deleteById: async (id) => {
    return prisma.user.delete({
      where: { id },
    });
  },
};

export default UserRepository;
