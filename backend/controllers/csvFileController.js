const CsvFile = require("../models/csvFileModel");
const cloudinary = require("cloudinary").v2;
const User = require("../models/userModel");
const createCsvFile = async (req, res) => {
  try {
    const { plans } = req.body;
    const file = req.files.file;
    if (!file || !plans) {
      return res.status(400).json({
        success: false,
        message: "Please upload a file and select at least one plan",
      });
    }
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

const createUserCsvFile = async (req, res) => {
  try {
    const { queryId, userId } = req.body;

    if (!queryId || !userId) {
      return res.status(400).json({
        success: false,
        message: "Query ID or User ID not provided",
      });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const file = req.files.file;
    if (!file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a Csv file ",
      });
    }
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: "raw",
    });

    if (!result) {
      return res
        .status(500)
        .json({ message: "Failed to upload image to Cloudinary." });
    }

    const newCsvFile = new CsvFile({
      filename: file.name,
      url: result.secure_url,
    });

    await newCsvFile.save();

    const updatedUser = await User.findOneAndUpdate(
      {
        _id: userId,
        "searchQueries._id": queryId,
      },
      {
        $set: {
          "searchQueries.$.url": result.secure_url,
          "searchQueries.$.csvId": newCsvFile._id,
        },
      },
      {
        new: true, 
      }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "Query not found in user's search history",
      });
    }
    return res.status(201).json({
      success: true,
      message: "CSV file uploaded successfully",
      data: newCsvFile,
    });
  } catch (error) {
    console.error("Error creating CSV file:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create CSV file",
      error: error.message,
    });
  }
};



const getFilesByPlan = async (req, res) => {
  const { plan, userId } = req.body;
  try {
    const user = await User.findById(userId)
      .populate("searchQueries.csvId")
      .exec();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const files = await CsvFile.find({ plans: { $in: [plan] } });
    const userCsvFiles = user.searchQueries
      .map((query) => query.csvId)
      .filter(Boolean);

    const mergedFiles = [...files, ...userCsvFiles];

    res.status(200).json({
      success: true,
      data: mergedFiles,
    });
  } catch (error) {
    console.error("Error fetching files by plan:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch files by plan",
      error: error.message,
    });
  }
};
module.exports = {
  createCsvFile,
  getAllFiles,
  createUserCsvFile,
  getFilesByPlan,
};
