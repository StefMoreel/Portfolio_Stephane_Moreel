const { Router } = require("express");
const router = Router();

const upload = require("../middlewares/upload");
const {
  uploadLogoToCloudinary,
} = require("../middlewares/upload-cloudinary-single");
const { imageOptions } = require("../middlewares/imagesOptions"); // si tu utilises w/h/fit sur GET
const {
  listSoftSkills,
  getSoftSkillById,
  updateSoftSkill,
  createSoftSkill,
} = require("../controllers/softSkills.controller");

router.get("/", imageOptions, listSoftSkills);
router.get("/:id", imageOptions, getSoftSkillById);

router.post(
  "/",
  upload,
  uploadLogoToCloudinary({ folder: "portfolio/softskills" }),
  createSoftSkill
);

router.put(
  "/:id",
  upload, // accepte multipart
  uploadLogoToCloudinary({ folder: "portfolio/softskills" }),
  updateSoftSkill
);

module.exports = router;
