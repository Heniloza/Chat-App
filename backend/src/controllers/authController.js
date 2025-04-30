import bcrypt from "bcryptjs";
import USER from "../models/userModel.js";
import { generateToken } from "../lib/utils.js";
import { json } from "express";
import cloudinary from "../lib/cloudinary.js";

export const signupController = async (req, res) => {
  const { email, name, password } = req.body;
  try {
    if (!email || !name || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (password.length <= 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const user = await USER.findOne({ email });
    if (user) return res.status(400).json({ message: "User alread exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPasword = await bcrypt.hash(password, salt);

    const newUser = new USER({
      email,
      name,
      password: hashedPasword,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullname: newUser.name,
        email: newUser.email,
        profilePic: newUser.profilePic,
        message: "User account created successfully.",
      });
    } else {
      return res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server error",
    });
  }
};

export const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    const user = await USER.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "Invalid creadentials",
      });
    }

    const matchPassowrd = await bcrypt.compare(password, user.password);

    if (!matchPassowrd) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    generateToken(user._id, res);

    return res.status(200).json({
      _id: user._id,
      fullname: user.name,
      email: user.email,
      profilePic: user.profilePic,
      message: "User logged in successfully.",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Internal Server error",
    });
  }
};

export const logoutController = async (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 0 }).status(200).json({
      message: "Logged out successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server error",
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    if (!userId) {
      return res.status(400).json({
        message: "Profile picture is required",
      });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic);

    const updatedUser = await USER.findByIdAndUpdate(
      userId,
      {
        profilePic: uploadResponse.secure_url,
      },
      { new: true }
    );

    res.status(200).json({
      message: "profile picture updated",
      updatedUser,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const checkAuth = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {}
  console.log(error.message);
  res.status(500).json({
    message: "Internal server error",
  });
};
