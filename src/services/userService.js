import UserRepository from "../repositories/userRepository.js";

const UserService = {
  getUsers: async () => {
    return UserRepository.getAllUsers();
  },

  getUser: async (id) => {
    return UserRepository.getUserById(id);
  },

  createUser: async (data) => {
    return UserRepository.createUser(data);
  },

  updateUser: async (id, data) => {
    return UserRepository.updateUser(id, data);
  },

  deleteUser: async (id) => {
    return UserRepository.deleteUser(id);
  },
};

export default UserService;
