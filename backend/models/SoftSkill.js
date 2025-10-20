const mongoose = require("mongoose");

const LogoSchema = new mongoose.Schema(
  {
    url: { type: String, required: true, trim: true },
    alt: { type: String, default: "", trim: true },
    deleteUrl: { type: String, default: "", trim: true },
  },
  { _id: false }
);

const SoftSkillSchema = new mongoose.Schema(
  {
    logo: { type: LogoSchema, required: false }, // ← UN SEUL logo
    title: { type: String, required: true, trim: true, minlength: 2 },
    description: { type: String, default: "", trim: true },
  },
  {
    timestamps: true,
    collection: "SoftSkills", // garde le nom que tu utilises déjà
    versionKey: false,
  }
);

module.exports = mongoose.model("SoftSkill", SoftSkillSchema);
