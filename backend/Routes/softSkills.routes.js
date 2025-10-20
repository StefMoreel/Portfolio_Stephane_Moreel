const { Router } = require("express");
const router = Router();

const { upload, uploadToImgbb } = require('../middlewares/uploadImgbb');
const {
  listSoftSkills,
  getSoftSkillById,
  updateSoftSkill,
  createSoftSkill,
} = require("../controllers/softSkills.controller");

router.get("/", listSoftSkills);
router.get("/:id", getSoftSkillById);

router.post("/", upload.single("image"), uploadToImgbb, createSoftSkill);

router.put("/:id", upload.single("image"), uploadToImgbb, updateSoftSkill);

module.exports = router;
