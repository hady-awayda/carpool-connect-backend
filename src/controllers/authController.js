import AuthService from "../services/authService.js";

const AuthController = {
  register: async (req, res) => {
    const { name, email, password, phoneNumber } = req.body;
    try {
      const { token, user } = await AuthService.registerUser(
        name,
        email,
        password,
        phoneNumber
      );
      res.status(201).json({ token, user });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const { token, user } = await AuthService.loginUser(email, password);
      res.status(200).json({ token, user });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
};

export default AuthController;
