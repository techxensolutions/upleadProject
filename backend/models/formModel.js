const mongoose = require("mongoose");

const formSubmissionSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },

  message: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const FormSubmission = mongoose.model("FormSubmission", formSubmissionSchema);

module.exports = FormSubmission;
