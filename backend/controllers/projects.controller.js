const mongoose = require('mongoose');
const Project = require('../models/Project');
const { cloudinary } = require('../services/cloudinary'); // pour delete si on remplace l'image
const { cld } = require('../utils/cdn'); // helper Cloudinary URL "safe"

// Ajoute image.url calculée à partir de image.publicId
function mapProject(doc, req) {
  const p = doc.toObject ? doc.toObject() : doc;
  const opts = req.imageOpts || { w: 640, h: 360, fit: 'fill' };
  p.image = p.image || {};
  p.image.url = cld(p.image.publicId, opts) || null;
  return p;
}

// GET /api/projects
async function listProjects(req, res, next) {
  try {
    const docs = await Project.find().sort({ createdAt: -1 });
    res.json(docs.map(d => mapProject(d, req)));
  } catch (e) { next(e); }
}

// GET /api/projects/:id
async function getProjectById(req, res, next) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.sendStatus(400);
    const doc = await Project.findById(id);
    if (!doc) return res.sendStatus(404);
    res.json(mapProject(doc, req));
  } catch (e) { next(e); }
}

// POST /api/projects
async function createProject(req, res, next) {
  try {
    // protège req.body
    let body = req.body || {};
    if (typeof body === 'string') {
      try { body = JSON.parse(body); } catch { body = {}; }
    }

    // validations minimales
    if (!body.title)       return res.status(400).json({ where:'validation', field:'title', message:'title requis' });
    if (!body.url)         return res.status(400).json({ where:'validation', field:'url', message:'url requise' });
    if (!body.image?.publicId) return res.status(400).json({ where:'validation', field:'image.publicId', message:'publicId requis' });

    // normalisation tags (string ou array)
    const rawTags = body.tags;
    const tags = Array.isArray(rawTags)
      ? rawTags
      : (typeof rawTags === 'string' ? rawTags.split(',').map(s => s.trim()).filter(Boolean) : []);

    const doc = await Project.create({
      image: { publicId: body.image.publicId, alt: body.image.alt || '' },
      title: body.title.trim(),
      description: body.description || '',
      tags,
      url: body.url,
    });

    return res.status(201).json(mapProject(doc, req));
  } catch (e) { next(e); }
}

// PUT /api/projects/:id  (remplace l'image si on fournit un autre publicId)
async function updateProject(req, res, next) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.sendStatus(400);
    const doc = await Project.findById(id);
    if (!doc) return res.sendStatus(404);

    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

    // champs simples
    ['title','description','url'].forEach(k => {
      if (body[k] !== undefined) doc[k] = body[k];
    });

    // tags: si fourni, remplace entièrement
    if (body.tags !== undefined) {
      doc.tags = Array.isArray(body.tags)
        ? body.tags
        : (typeof body.tags === 'string' ? body.tags.split(',').map(s => s.trim()).filter(Boolean) : []);
    }

    // image: si fourni, remplace; option: supprimer l’ancienne de Cloudinary
    if (body.image?.publicId) {
      const prevPid = doc.image?.publicId;
      doc.image = { publicId: body.image.publicId, alt: body.image.alt || doc.image?.alt || '' };
      await doc.save();

      if (prevPid && prevPid !== doc.image.publicId && process.env.SUPPRESS_CLOUDINARY_DELETE !== 'true') {
        try { await cloudinary.uploader.destroy(prevPid); } catch (_) {}
      }
      return res.json(mapProject(doc, req));
    }

    await doc.save();
    res.json(mapProject(doc, req));
  } catch (e) { next(e); }
}

// POST /api/projects/bulk  (import en lot via Postman)
async function bulkInsertProjects(req, res, next) {
  try {
    const payload = Array.isArray(req.body) ? req.body : [];
    if (!payload.length) return res.status(400).json({ error: 'Array vide' });

    // normalise tags pour chaque item
    const normalized = payload.map(p => ({
      image: p.image,
      title: p.title,
      description: p.description || '',
      tags: Array.isArray(p.tags) ? p.tags :
            (typeof p.tags === 'string' ? p.tags.split(',').map(s => s.trim()).filter(Boolean) : []),
      url: p.url
    }));

    const docs = await Project.insertMany(normalized, { ordered: false });
    res.status(201).json(docs.map(d => mapProject(d, req)));
  } catch (e) { next(e); }
}

module.exports = {
  listProjects,
  getProjectById,
  createProject,
  updateProject,
  bulkInsertProjects,
};
