const CsvFile = require("../models/csvFileModel");
const cloudinary = require("cloudinary").v2;

const createCsvFile = async (req, res) => {
  console.log("file", req.files);
  console.log("body", req.body);
  try {
    const { plans } = req.body;
    const file = req.files.file;
    if (!file || !plans) {
      return res.status(400).json({
        success: false,
        message: "Please upload a file and select at least one plan",
      });
    }

    // Upload file to Cloudinary
    // const result = await cloudinary.uploader.upload(file.path, {
    //   resource_type: "raw", // because it's a CSV file
    // });

    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: "raw",
    });

    if (!result) {
      return res
        .status(500)
        .json({ message: "Failed to upload image to Cloudinary." });
    }

    const parsedPlans = JSON.parse(plans);
    const newCsvFile = new CsvFile({
      filename: file.name,
      url: result.secure_url,
      plans: parsedPlans,
    });

    await newCsvFile.save();

    return res.status(201).json({
      success: true,
      message: "CSV file uploaded successfully",
      data: newCsvFile,
    });
  } catch (error) {
    console.error("Error uploading CSV file:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to upload CSV file",
      error: error.message,
    });
  }
};
const getAllFiles = async (req, res) => {
  try {
    const files = await CsvFile.find();
    res.status(200).json({
      success: true,
      data: files,
    });
  } catch (error) {
    console.error("Error fetching files:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch files",
      error: error.message,
    });
  }
};
module.exports = {
  createCsvFile,
  getAllFiles,
};
