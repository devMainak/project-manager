const mongoose = require("mongoose");

// Project Schema
const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "project-user",
      required: true,
    },
  },
  { timestamps: true }
);

const Project = mongoose.model("more-projects", projectSchema);

module.exports = Project;
