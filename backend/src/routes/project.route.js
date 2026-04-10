const express = require('express');
const projectController = require('../controllers/project.controller')

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

router.post('/create', upload.single('image'), projectController.createProject);
// router.post('/edit', projectController.registerUser);
// router.post('/delete', projectController.loginUser);

module.exports = router