const { Router } = require('express');
const { imageOptions } = require('../middlewares/imagesOptions');
const { listSkills } = require('../controllers/skills.controller');
const router = Router();

router.get('/', imageOptions, listSkills);

module.exports = router;
