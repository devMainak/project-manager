const mongoose = require("mongoose");

// Project Schema
const projectSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "project-user",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

const Project = mongoose.model("more-projects", projectSchema);

module.exports = Project;
