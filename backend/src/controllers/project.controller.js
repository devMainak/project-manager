const Project = require("../models/project.model");
const Task = require("../models/task.model");

// Function to add a new project
const addProject = async (newProject) => {
  try {
    const projectToSave = new Project(newProject);
    const savedProject = await projectToSave.save();
    return savedProject;
  } catch (error) {
    throw error;
  }
};

exports.createProject = async (req, res) => {
  const project = req.body;
  try {
    const ownerProjects = await Project.find({ owner: project.owner });
    if (ownerProjects.length === 4) {
      return res.status(400).json({ message: "Only four projects per user" });
    }

    const savedProject = await addProject(project);
    if (savedProject) {
      res
        .status(201)
        .json({ message: "Project added successfully", savedProject });
    } else {
      res.status(400).json({ message: "Failed to add project" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add project" });
  }
};

// Update projects
exports.updateProject = async (req, res) => {
  try {
    const project = req.body;
    const updatedProject = await Project.findByIdAndUpdate(
      project._id,
      project,
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "Project updated successfully", updatedProject });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Read all projects
const readProjects = async (userId) => {
  try {
    const projects = await Project.find({ owner: userId });
    return projects;
  } catch (error) {
    throw error;
  }
};

exports.getProjects = async (req, res) => {
  try {
    const { userId } = req.params;
    const projects = await readProjects(userId);
    if (projects.length > 0) {
      res
        .status(200)
        .json({ message: "Projects fetched successfully", projects });
    } else {
      res.status(400).json({ message: "Failed to fetch projects" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get projects" });
  }
};

// Delete project
exports.deleteProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const projetctTasks = await Task.find({ project: projectId });
    if (projetctTasks.length) {
      await Task.deleteMany({ project: projectId });
    }

    const deletedProject = await Project.findByIdAndDelete(projectId);
    return res
      .status(200)
      .json({ message: "Project deleted successfully", deletedProject });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete project" });
  }
};
