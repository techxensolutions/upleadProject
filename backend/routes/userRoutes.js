const express = require("express");
const { Router } = express;
const catchAsync = require("../middlewares/catchAsync");
const authMiddleware = require("../middlewares/authentication");
const upload = require("../middlewares/multerConfig");
const {
  register,
  getAllUsers,
  getSingleUser,
  login,
  deleteUser,
  updateUser,
  updatePassword,
  saveSearchQuery,
  fetchSearchQueries,
  cancelSubscription,
} = require("../controllers/userController");

const userRoutes = Router();

userRoutes.post("/register", catchAsync(register));
userRoutes.put("/:id", catchAsync(updateUser));
userRoutes.put("/cancel-subscription/:id", catchAsync(cancelSubscription));
userRoutes.get("/getAllUsers", catchAsync(getAllUsers));
userRoutes.post("/:userId/saveSearchQuery", catchAsync(saveSearchQuery));
userRoutes.get("/user-search-queries/:userId", catchAsync(fetchSearchQueries));
userRoutes.get("/getUser/:id", catchAsync(getSingleUser));
userRoutes.post("/login", catchAsync(login));
userRoutes.delete("/:id", catchAsync(deleteUser));
userRoutes.put("/update-password/:id", catchAsync(updatePassword));

module.exports = { userRoutes };
