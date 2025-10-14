const { Router } = require('express');
const router = Router();

const { imageOptions } = require('../middlewares/imagesOptions'); // si tu passes w/h/fit dans la query
const {
  listProjects,
  getProjectById,
  createProject,
  updateProject,
  bulkInsertProjects,
} = require('../controllers/projects.controller');

router.get('/', imageOptions, listProjects);
router.get('/:id', imageOptions, getProjectById);
router.post('/', createProject);
router.put('/:id', updateProject);
router.post('/bulk', bulkInsertProjects);

module.exports = router;
