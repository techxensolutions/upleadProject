const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
const cloudinary = require("cloudinary").v2;
exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, subscription } = req.body;
    let userEmail = await User.findOne({ email });

    if (userEmail) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    let user = await User.create({
      firstName,
      lastName,
      email,
      password,
      subscription,
    });

    const token = await user.generateAuthToken();

    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    // Omit the password field from the user object in the response
    const userWithoutPassword = { ...user._doc };
    delete userWithoutPassword.password;
    res.status(201).cookie("token", token, options).json({
      success: true,
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    console.log(error, "ERROR POSTING USER");
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Done
exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password",
      });
    }

    const token = await user.generateAuthToken();

    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    // Omit the password field from the user object in the response
    const userWithoutPassword = { ...user._doc };
    delete userWithoutPassword.password;
    delete userWithoutPassword.searchQueries;

    res.status(200).cookie("token", token, options).json({
      success: true,
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.saveSearchQuery = async (req, res) => {
  const { userId } = req.params;
  const { query } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.searchQueries.push({
      query,
      date: new Date(),
      _id: new mongoose.Types.ObjectId(),
    });
    await user.save();

    res.status(200).json({ message: "Search query saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to save search query", error });
  }
};

exports.fetchSearchQueries = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ searchQueries: user.searchQueries });
  } catch (error) {
    console.error("Error fetching user search queries:", error);
    res.status(500).json({ message: "Failed to fetch user search queries" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    const totalUsers = users.length;

    res.status(200).json({
      success: true,
      message: `Users fetched successfully. Total users: ${totalUsers}`,
      users: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.getSingleUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById({ _id: userId }).populate(
      "orderHistory.orderId"
    );
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Delete User

exports.deleteUser = async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);
  if (!user) return next(new ErrorHandler("Invalid Id", 400));
  await user.deleteOne();
  return res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updates = { ...req.body };

    if (req.files && req.files.photo) {
      const file = req.files.photo;
      const result = await cloudinary.uploader.upload(file.tempFilePath);

      if (!result) {
        return res.status(500).json({
          success: false,
          message: "Failed to upload image to Cloudinary.",
        });
      }

      updates.photo = result.secure_url;
    }

    const user = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const userWithoutPassword = { ...user._doc };
    delete userWithoutPassword.password;

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updatePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  console.log(
    "🚀 ~ exports.updatePassword= ~ currentPassword:",
    currentPassword
  );
  const userId = req.params.id;
  console.log("🚀 ~ exports.updatePassword= ~ userId:", userId);

  try {
    const user = await User.findById(userId).select("+password");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Current password is incorrect" });
    }

    user.password = newPassword;
    console.log("🚀 ~ exports.updatePassword= ~ user:", user);

    await user.save();
    res.json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.log("🚀 ~ exports.updatePassword= ~ error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Cancel Subscription
exports.cancelSubscription = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.subscription = "Free Trial";

    await user.save();

    res.status(200).json({
      success: true,
      message: "Subscription cancelled successfully",
      user: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
