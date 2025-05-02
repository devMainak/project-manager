const express = require("express");
const {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/project.controller");
const authenticate = require("../middlewares/auth.middleware");
const router = express.Router();

router.get("/", authenticate, getProjects);
router.post("/", authenticate, createProject);
router.post("/:projectId", authenticate, updateProject);
router.delete("/:projectId", authenticate, deleteProject);

module.exports = router;
