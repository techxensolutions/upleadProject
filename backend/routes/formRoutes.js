const express = require("express");
const { Router } = express;
const {
  createFormSubmission,
  getAllFormSubmissions,
  deleteFormSubmission,
} = require("../controllers/formController");

const formRoutes = Router();

formRoutes.post("/submit-form", createFormSubmission);
formRoutes.get("/form-submissions", getAllFormSubmissions);
formRoutes.delete("/:id", deleteFormSubmission);

module.exports = formRoutes;
