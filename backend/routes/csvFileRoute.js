const express = require("express");
const { Router } = express;
const catchAsync = require("../middlewares/catchAsync");
const authMiddleware = require("../middlewares/authentication");

const {
  createCsvFile,
  getAllFiles,
  createUserCsvFile,
  getFilesByPlan
} = require("../controllers/csvFileController");

const csvFileRoutes = Router();

csvFileRoutes.post("/create", catchAsync(createCsvFile));
csvFileRoutes.post("/createUserCsv", catchAsync(createUserCsvFile));
csvFileRoutes.get("/getAllFiles", catchAsync(getAllFiles));
csvFileRoutes.post("/by-plan", catchAsync(getFilesByPlan));

module.exports = { csvFileRoutes };
