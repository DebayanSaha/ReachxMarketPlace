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
router.put('/edit/:id', projectController.editProject);
router.delete('/delete/:id', projectController.deleteProject);

router.get('/', projectController.getAllProjects);

module.exports = router