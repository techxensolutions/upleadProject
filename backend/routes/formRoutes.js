const express = require("express");
const { Router } = express;
const {
  createFormSubmission,
  getAllFormSubmissions,
} = require("../controllers/formController");

const formRoutes = Router();

formRoutes.post("/submit-form", createFormSubmission);
formRoutes.get("/form-submissions", getAllFormSubmissions);

module.exports = formRoutes;
