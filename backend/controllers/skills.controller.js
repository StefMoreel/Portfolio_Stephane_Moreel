const Skill = require('../models/Skill');
const { cld } = require('../utils/cloudinary');

exports.listSkills = async (req, res) => {
  const docs = await Skill.find().sort({ createdAt: -1 }).lean();
  const items = docs.map(s => ({
    ...s,
    logos: (s.logos || []).map(l => ({ ...l, url: cld(l.publicId, req.imageOptions) }))
  }));
  res.set('Cache-Control','public, max-age=60'); // optionnel
  res.json(items);
};


