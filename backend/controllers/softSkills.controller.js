const mongoose = require('mongoose');
const SoftSkill = require('../models/SoftSkill');
const { deleteViaDeleteUrl } = require('../services/imgbb');

/** Parse JSON si string, sinon retourne tel quel */
function parseMaybeJSON(input) {
  if (Array.isArray(input) || (input && typeof input === 'object')) return input;
  if (typeof input !== 'string') return input;
  try { return JSON.parse(input); } catch { return input; }
}

/** GET /api/softskills */
async function listSoftSkills(req, res, next) {
  try {
    const docs = await SoftSkill.find().sort({ createdAt: -1 });
    // imgbb ne gère pas de transformations dynamiques → on renvoie tel quel
    res.json(docs);
  } catch (e) { next(e); }
}

/** GET /api/softskills/:id */
async function getSoftSkillById(req, res, next) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.sendStatus(400);
    const doc = await SoftSkill.findById(id);
    if (!doc) return res.sendStatus(404);
    res.json(doc);
  } catch (e) { next(e); }
}

/**
 * POST /api/softskills
 * - multipart: champ fichier "image" (géré par upload.single('image') + uploadToImgbb) → req.uploadedImage { url, deleteUrl }
 * - JSON: { title, description, logo: { url, alt } }
 */
async function createSoftSkill(req, res, next) {
  try {
    const body = parseMaybeJSON(req.body) || {};

    // Construire le logo suivant la présence d’un upload ou d’une URL
    let logo;
    if (req.uploadedImage) {
      logo = {
        url: req.uploadedImage.url,
        deleteUrl: req.uploadedImage.deleteUrl || '',
        alt: body?.logo?.alt || body?.alt || '',
      };
    } else if (body?.logo?.url) {
      logo = {
        url: body.logo.url,
        alt: body.logo.alt || '',
        // pas de deleteUrl si tu fournis toi-même une URL déjà hébergée
      };
    }

    const doc = await SoftSkill.create({
      title: body.title,
      description: body.description || '',
      ...(logo ? { logo } : {}),
    });

    res.status(201).json(doc);
  } catch (e) { next(e); }
}

/**
 * PUT /api/softskills/:id
 * - multipart possible (image) → remplace le logo et tente de supprimer l’ancien via deleteUrl (best-effort)
 * - sinon, permet de mettre à jour title/description/alt/url via JSON
 *   ex JSON:
 *   {
 *     "title": "...",
 *     "description": "...",
 *     "logo": { "url": "https://i.ibb.co/...", "alt": "..." }
 *   }
 */
async function updateSoftSkill(req, res, next) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.sendStatus(400);

    const doc = await SoftSkill.findById(id);
    if (!doc) return res.sendStatus(404);

    const body = parseMaybeJSON(req.body) || {};

    // Champs simples
    if (body.title !== undefined)       doc.title = body.title;
    if (body.description !== undefined) doc.description = body.description;

    // Remplacement du logo via upload fichier
    if (req.uploadedImage) {
      const prevDelete = doc.logo?.deleteUrl;
      doc.logo = {
        url: req.uploadedImage.url,
        deleteUrl: req.uploadedImage.deleteUrl || '',
        alt: body?.logo?.alt || body?.alt || doc.logo?.alt || '',
      };
      await doc.save();

      // Tentative de suppression de l’ancienne image
      if (prevDelete) deleteViaDeleteUrl(prevDelete).catch(() => {});
      return res.json(doc);
    }

    // Sinon, MAJ via JSON (alt / url)
    if (body.logo) {
      doc.logo = {
        url: body.logo.url || doc.logo?.url,
        alt: body.logo.alt || doc.logo?.alt || '',
        deleteUrl: doc.logo?.deleteUrl || '', // on conserve l’éventuel deleteUrl existant
      };
    }

    await doc.save();
    res.json(doc);
  } catch (e) { next(e); }
}

module.exports = {
  listSoftSkills,
  getSoftSkillById,
  createSoftSkill,
  updateSoftSkill,
};
