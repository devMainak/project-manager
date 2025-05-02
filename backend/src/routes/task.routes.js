const express = require("express");
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/task.controller");
const authenticate = require("../middlewares/auth.middleware");
const router = express.Router();

// Routes for Task
router.get("/:projectId", authenticate, getTasks);
router.post("/", authenticate, createTask);
router.post("/:taskId", authenticate, updateTask);
router.delete("/:taskId", authenticate, deleteTask);

module.exports = router;
