import User from "../models/user.model.js";
import createError from "http-errors";
import { generateToken } from "../utils/jwt.js";

export const registerUser = async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;

    const user = await User.create({ fullName, email, password });

    res.status(201).json({
      message: "User registered successfully",
      data: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        createdAt: user.createdAt
      }
    });
  } catch (err) {
    next(err);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) throw createError(401, "Invalid email or password");

    const valid = await user.comparePassword(password);
    if (!valid) throw createError(401, "Invalid email or password");

    const token = generateToken(user._id);

    res.json({
      message: "Login successful",
      data: {
        token,
        id: user._id,
        fullName: user.fullName,
        email: user.email
      }
    });
  } catch (err) {
    next(err);
  }
};

export const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");

    if (!user) throw createError(404, "User not found");

    res.json({
      message: "User fetched successfully",
      data: user
    });
  } catch (err) {
    next(err);
  }
};