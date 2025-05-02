const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "more-projects",
      required: true,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "project-user",
      required: true,
    },
    priority: {
      type: String,
      enum: ["High", "Low", "Medium"],
      default: "Low",
    },
    status: {
      type: String,
      enum: ["To Do", "In Progress", "Completed", "Blocked"],
      default: "To Do",
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
