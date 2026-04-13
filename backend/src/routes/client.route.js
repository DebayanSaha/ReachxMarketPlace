const express = require('express');
const clientController = require('../controllers/client.controller')

const router = express.Router();
const multer = require('multer')

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only images allowed"), false);
    }
  },
});

router.post('/create', upload.single('image'), clientController.createClient);

router.delete('/delete/:id', clientController.deleteClient);

router.get('/get', clientController.getAllClients);

module.exports = router;