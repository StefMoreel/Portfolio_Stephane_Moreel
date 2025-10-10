const mongoose = require('mongoose');

const LogoSchema = new mongoose.Schema(
  { publicId: { type: String, required: true, trim: true },
    alt: { type: String, default: "", trim: true } },
  { _id: false }
);

const SkillSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  subtitle: { type: String, default: "", trim: true },
  description: { type: String, default: "", trim: true },
  logos: { type: [LogoSchema], default: [] }
}, { timestamps: true, collection: 'Skills' });

module.exports = mongoose.model('Skill', SkillSchema);
