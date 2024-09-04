import User from "../models/user.js";

const UserController = {
  /**
   * Retrieves all users from the database and sends them as a JSON response.
   *
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @return {Promise<void>} - A promise that resolves when the users are sent as a JSON response.
   */
  getUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  /**
   * Retrieves a user by their ID and sends the user as a JSON response.
   *
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @return {Promise<void>} - A promise that resolves when the user is sent as a JSON response.
   */
  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  /**
   * Updates a user with the given ID using the request body.
   *
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @return {Promise<void>} A promise that resolves when the user is updated.
   */
  updateUser: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.user.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  /**
   * Delete a user by ID
   * @async
   * @param {Object} req - Express request object
   * @param {Object} req.params - The request parameters
   * @param {string} req.params.id - User ID
   * @param {Object} res - Express response object
   * @returns {Promise<void>}
   */
  deleteUser: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.user.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "User marked as deleted" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

export default UserController;
