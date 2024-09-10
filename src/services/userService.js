import UserRepository from '../repositories/userRepository.js';

const UserService = {
  /**
   * Get all users.
   * @returns {Promise<User[]>} List of users.
   */
  getUsers: async () => {
    return UserRepository.findAll();
  },

  /**
   * Get a single user by ID.
   * @param {number} id - User ID.
   * @returns {Promise<User|null>} User or null if not found.
   */
  getUser: async (id) => {
    return UserRepository.findById(id);
  },

  /**
   * Create a new user.
   * @param {Object} data - User data.
   * @returns {Promise<User>} The created user.
   */
  createUser: async (data) => {
    return UserRepository.create(data);
  },

  /**
   * Update a user by ID.
   * @param {number} id - User ID.
   * @param {Object} data - Updated user data.
   * @returns {Promise<User|null>} The updated user or null if not found.
   */
  updateUser: async (id, data) => {
    return UserRepository.updateById(id, data);
  },

  /**
   * Delete a user by ID.
   * @param {number} id - User ID.
   * @returns {Promise<void>}
   */
  deleteUser: async (id) => {
    return UserRepository.deleteById(id);
  },
};

export default UserService;
