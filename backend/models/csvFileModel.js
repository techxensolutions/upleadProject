const mongoose = require("mongoose");

const csvFileSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    plans: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

const CsvFile = mongoose.model("CsvFile", csvFileSchema);

module.exports = CsvFile;
