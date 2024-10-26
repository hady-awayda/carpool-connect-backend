import AuthService from "../services/authService.js";

// Remove password hash from response

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
      user.password = undefined;
      res.status(201).json({ token, user });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const { token, user } = await AuthService.loginUser(email, password);
      user.password = undefined;
      res.status(200).json({ token, user });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
};

export default AuthController;
