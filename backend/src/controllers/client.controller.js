const clientModel = require("../models/client.model");
const storageService = require("../services/storage.service");
const { v4: uuid } = require("uuid");

async function createClient(req, res) {
  console.log(req.body);
  console.log(req.file);

  const fileUpload = await storageService.uploadFile(req.file.buffer, uuid());

  const client = await clientModel.create({
    title: req.body.title,
    description: req.body.description,
    link: req.body.link,
    image: fileUpload.url,
    category: req.body.category,
  });

  res.status(201).json({
    message: "Client Uploaded",
    client,
  });
}

async function deleteClient(req, res) {
  try {
    const { id } = req.params;

    const deletedClient = await clientModel.findByIdAndDelete(id);

    if (!deletedClient) {
      return res.status(404).json({ message: "Clients not found" });
    }

    res.status(200).json({
      message: "Client deleted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
}

async function getAllClients(req, res) {
  try {
    const clients = await clientModel.find().sort({ createdAt: -1 });

    res.status(200).json({
      message: "Clients fetched successfully",
      clients,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
}

module.exports = {
  createClient,
  deleteClient,
  getAllClients
};
