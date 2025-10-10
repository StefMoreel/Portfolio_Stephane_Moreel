const SoftSkill = require('../models/SoftSkill');
async function listSoftSkills(_req, res) {

  try {
    const items = await SoftSkill.find().sort({ createdAt: -1 }).lean();
    res.json(items);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

module.exports = { listSoftSkills };
