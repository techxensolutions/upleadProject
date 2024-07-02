const express = require("express");
const { Router } = express;
const catchAsync = require("../middlewares/catchAsync");
const authMiddleware = require("../middlewares/authentication");

const {
  createCsvFile,
  getAllFiles,
} = require("../controllers/csvFileController");

const csvFileRoutes = Router();

csvFileRoutes.post("/create", catchAsync(createCsvFile));
csvFileRoutes.get("/getAllFiles", catchAsync(getAllFiles));

module.exports = { csvFileRoutes };
