const mongoose = require("mongoose");
const Skill = require("../models/Skill");
const { deleteViaDeleteUrl } = require("../services/imgbb");


function parseMaybeJSON(input) {
  if (Array.isArray(input) || (input && typeof input === "object")) return input;
  if (typeof input !== "string") return input;
  try {
    return JSON.parse(input);
  } catch {
    return input;
  }
}

/**
 * GET /api/skills

 */
async function listSkills(req, res, next) {
  try {
    const docs = await Skill.find().sort({ createdAt: -1 });
    res.json(docs);
  } catch (e) {
    next(e);
  }
}

async function getSkillById(req, res, next) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.sendStatus(400);
    const doc = await Skill.findById(id);
    if (!doc) return res.sendStatus(404);
    return res.json(doc);
  } catch (e) {
    next(e);
  }
}



async function createSkill(req, res, next) {
  try {
    const body = parseMaybeJSON(req.body) || {};
    const fromBody = toArray(body.logos)
      .map(x => (x?.url ? { url: x.url, alt: x.alt || '' } : null))
      .filter(Boolean);

    const uploaded = Array.isArray(req.uploadedImages)
      ? req.uploadedImages.map(x => ({ url: x.url, deleteUrl: x.deleteUrl, alt: '' }))
      : [];

    const doc = await Skill.create({
      title: body.title,
      subtitle: body.subtitle || '',
      description: body.description || '',
      logos: [...fromBody, ...uploaded],
    });
    res.status(201).json(doc);
  } catch (e) { next(e); }
}

// PUT /api/skills/:id
// combine: update champs, ajouter logos (fichiers + URLs), MAJ alt, supprimer certains logos
// Body JSON possible:
// { addLogos:[{url,alt}], updateAlts:[{_id,alt}], removeLogoIds:["...","..."] }
async function updateSkill(req, res, next) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.sendStatus(400);
    const doc = await Skill.findById(id);
    if (!doc) return res.sendStatus(404);

    const body = parseMaybeJSON(req.body) || {};

    // champs simples
    ['title','subtitle','description'].forEach(k => {
      if (body[k] !== undefined) doc[k] = body[k];
    });

    // ajouts via upload
    if (Array.isArray(req.uploadedImages) && req.uploadedImages.length) {
      const news = req.uploadedImages.map(x => ({
        url: x.url, deleteUrl: x.deleteUrl, alt: body.defaultAlt || ''
      }));
      doc.logos.push(...news);
    }

    // ajouts via URLs
    const addLogos = toArray(body.addLogos);
    addLogos.forEach(x => { if (x?.url) doc.logos.push({ url: x.url, alt: x.alt || '' }); });

    // MAJ alt par _id
    const updates = toArray(body.updateAlts);
    updates.forEach(u => {
      const item = doc.logos.id(u?._id);
      if (item && u.alt !== undefined) item.alt = u.alt;
    });

    // suppressions
    const removeIds = toArray(body.removeLogoIds);
    if (removeIds.length) {
      const toDel = [];
      doc.logos = doc.logos.filter(l => {
        if (removeIds.includes(String(l._id))) {
          if (l.deleteUrl) toDel.push(l.deleteUrl);
          return false;
        }
        return true;
      });
      toDel.forEach(u => deleteViaDeleteUrl(u).catch(() => {}));
    }

    await doc.save();
    res.json(doc);
  } catch (e) { next(e); }
}

// DELETE /api/skills/:id/logos/:logoId
async function deleteSkillLogo(req, res, next) {
  try {
    const { id, logoId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.sendStatus(400);
    const doc = await Skill.findById(id);
    if (!doc) return res.sendStatus(404);

    const l = doc.logos.id(logoId);
    if (!l) return res.sendStatus(404);

    const del = l.deleteUrl;
    l.deleteOne();
    await doc.save();

    if (del) deleteViaDeleteUrl(del).catch(() => {});
    res.sendStatus(204);
  } catch (e) { next(e); }
}

module.exports = { listSkills, getSkillById, createSkill, updateSkill, deleteSkillLogo };
