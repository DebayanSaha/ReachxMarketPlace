const projectModel = require("../models/projects.model");
const storageService = require("../services/storage.service");
const { v4: uuid } = require("uuid");

async function createProject(req, res) {
  console.log(req.body);
  console.log(req.file);

  const fileUpload = await storageService.uploadFile(req.file.buffer, uuid());

  const project = await projectModel.create({
    title: req.body.title,
    description: req.body.description,
    link: req.body.link,
    image: fileUpload.url,
    category: req.body.category,
  });

  res.status(201).json({
    message: "Project Uploaded",
    project,
  });
}

async function editProject(req, res) {
  try {
    const { id } = req.params;

    // Only allow specific fields
    const allowedUpdates = {
      title: req.body.title,
      description: req.body.description,
      link: req.body.link,
      category: req.body.category,
    };

    // Remove undefined fields (important)
    Object.keys(allowedUpdates).forEach(
      (key) => allowedUpdates[key] === undefined && delete allowedUpdates[key],
    );

    const updatedProject = await projectModel.findByIdAndUpdate(
      id,
      allowedUpdates,
      { new: true, runValidators: true },
    );

    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({
      message: "Project updated successfully",
      project: updatedProject,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
}

async function deleteProject(req, res) {
  try {
    const { id } = req.params;

    const deletedProject = await projectModel.findByIdAndDelete(id);

    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({
      message: "Project deleted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
}

async function getAllProjects(req, res) {
  try {
    const projects = await projectModel.find().sort({ createdAt: -1 });

    res.status(200).json({
      message: "Projects fetched successfully",
      projects,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
}

module.exports = {
  createProject,
  editProject,
  deleteProject,
  getAllProjects
};
