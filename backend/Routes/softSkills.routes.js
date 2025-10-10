const { Router } = require('express');
const { imageOptions } = require('../middlewares/imagesOptions');
const { listSoftSkills } = require('../controllers/softSkills.controller.js');

const router = Router();

router.get('/', imageOptions, listSoftSkills);

module.exports = router;



