import UserService from "../services/userService.js";

const UserController = {
  getUsers: async (req, res) => {
    try {
      const users = await UserService.getUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getUser: async (req, res) => {
    try {
      const user = await UserService.getUser(parseInt(req.params.id));
      if (!user) return res.status(404).json({ message: "User not found" });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateUser: async (req, res) => {
    try {
      const updatedUser = await UserService.updateUser(
        parseInt(req.params.id),
        req.body
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteUser: async (req, res) => {
    try {
      await UserService.deleteUser(parseInt(req.params.id));
      res.status(200).json({ message: "User deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default UserController;
