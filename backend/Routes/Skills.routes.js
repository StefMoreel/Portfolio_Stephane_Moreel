const { Router } = require("express");
const router = Router();

const upload = require("../middlewares/upload"); // multer.any()
const { uploadToCloudinary } = require("../middlewares/upload-cloudinary");
const {
  listSkills,
  updateSkill,
  getSkillById,
} = require("../controllers/skills.controller");

// GET (liste)
router.get("/", listSkills);

router.get("/:id", getSkillById);

// PUT (update complet + Cloudinary)
router.put(
  "/:id",
  upload, // si multipart
  uploadToCloudinary("logos", { folder: "portfolio/logos" }),
  updateSkill
);

module.exports = router;
