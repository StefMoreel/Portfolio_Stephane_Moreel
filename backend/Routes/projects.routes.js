// backend/Routes/Projects.routes.js
const express = require('express');
const router = express.Router();

const {
  listProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/projects.controller');

const { upload, uploadToImgbb } = require('../middlewares/uploadImgbb');

// GET
router.get('/', listProjects);
router.get('/:id', getProjectById);

// POST (multipart OU JSON)
// multipart: field file = image
router.post('/', upload.single('image'), uploadToImgbb, createProject);

// PUT (remplacement image si fichier, ou mise à jour JSON)
router.put('/:id', upload.single('image'), uploadToImgbb, updateProject);

// DELETE projet + tentative suppression image imgbb
router.delete('/:id', deleteProject);

module.exports = router;
