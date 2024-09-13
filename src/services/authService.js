import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import AuthRepository from "../repositories/authRepository.js";

dotenv.config();

const generateJWT = (user) => {
  const payload = {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2y" });
};

const AuthService = {
  registerUser: async (name, email, password, phoneNumber) => {
    const existingUser = await AuthRepository.findUserByEmail(email);
    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await AuthRepository.createUser({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
    });

    const token = generateJWT(newUser);
    return { token, user: newUser };
  },

  loginUser: async (email, password) => {
    const user = await AuthRepository.findUserByEmail(email);
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    const token = generateJWT(user);
    return { token, user };
  },
};

export default AuthService;
