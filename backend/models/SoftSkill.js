const mongoose = require('mongoose');

const SoftSkillSchema = new mongoose.Schema({
  logoUrl: { type: String, required: true },
  title:   { type: String, required: true },
  description: { type: String, default: "" }
}, { timestamps: true });

module.exports = mongoose.model('SoftSkill', SoftSkillSchema);