const express = require('express');
const router = express.Router();

const {
  listSkills,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkillLogo,
} = require('../controllers/skills.controller');

const { upload, uploadManyToImgbb } = require('../middlewares/uploadImgbb');

// GET
router.get('/', listSkills);
router.get('/:id', getSkillById);

// POST (multipart OU JSON)
// multipart: field files = logos[]
router.post('/', upload.array('logos', 10), uploadManyToImgbb, createSkill);

// PUT (ajout/suppression/modif)
// multipart possible: logos[]
router.put('/:id', upload.array('logos', 10), uploadManyToImgbb, updateSkill);

// DELETE un logo précis
router.delete('/:id/logos/:logoId', deleteSkillLogo);

module.exports = router;
