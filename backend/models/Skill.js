const mongoose = require("mongoose");

const LogoSchema = new mongoose.Schema({
  url: { type: String, required: true, trim: true },
  alt: { type: String, default: "", trim: true },
  deleteUrl: { type: String, default: "", trim: true },
});

const SkillSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    subtitle: { type: String, default: "", trim: true },
    description: { type: String, default: "", trim: true },
    logos: { type: [LogoSchema], default: [] },
  },
  { timestamps: true, collection: "Skills" }
);

module.exports = mongoose.model("Skill", SkillSchema);
