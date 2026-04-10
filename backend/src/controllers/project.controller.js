const projectModel = require('../models/projects.model');
const storageService = require('../services/storage.service')
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

module.exports = {
    createProject
}