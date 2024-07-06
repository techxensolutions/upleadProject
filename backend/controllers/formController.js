const FormSubmission = require("../models/formModel");

const createFormSubmission = async (req, res) => {
  try {
    const newFormSubmission = new FormSubmission(req.body);
    await newFormSubmission.save();
    return res.status(201).json({
      success: true,
      message: "Form submitted successfully",
      data: newFormSubmission,
    });
  } catch (error) {
    console.error("Error creating form submission:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to submit form",
      error: error.message,
    });
  }
};
const getAllFormSubmissions = async (req, res) => {
  try {
    const formSubmissions = await FormSubmission.find({});
    return res.status(200).json({
      success: true,
      data: formSubmissions,
    });
  } catch (error) {
    console.error("Error retrieving form submissions:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve form submissions",
      error: error.message,
    });
  }
};

const deleteFormSubmission = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFormSubmission = await FormSubmission.findByIdAndDelete(id);

    if (!deletedFormSubmission) {
      return res.status(404).json({
        success: false,
        message: "Form submission not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Form submission deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting form submission:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete form submission",
      error: error.message,
    });
  }
};
module.exports = {
  createFormSubmission,
  getAllFormSubmissions,
  deleteFormSubmission,
};
