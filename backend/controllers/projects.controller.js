// backend/controllers/projects.controller.js
const mongoose = require('mongoose');
const Project = require('../models/Project');
const { deleteViaDeleteUrl } = require('../services/imgbb');

function parseMaybeJSON(input) {
  if (Array.isArray(input) || (input && typeof input === 'object')) return input;
  if (typeof input !== 'string') return input;
  try { return JSON.parse(input); } catch { return input; }
}

// GET /api/projects
async function listProjects(req, res, next) {
  try {
    const docs = await Project.find().lean().sort({ createdAt: -1 });
    res.json(docs);
  } catch (e) { next(e); }
}

// GET /api/projects/:id
async function getProjectById(req, res, next) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.sendStatus(400);
    const doc = await Project.findById(id).lean();
    if (!doc) return res.sendStatus(404);
    res.json(doc);
  } catch (e) { next(e); }
}

// POST /api/projects
// - multipart: fields (title, description, tags, url) + file image
// - JSON: { title, description, tags:[...], url, image:{url,alt} }
async function createProject(req, res, next) {
  try {
    const body = parseMaybeJSON(req.body) || {};

    const tags = Array.isArray(body.tags)
      ? body.tags
      : (typeof body.tags === 'string'
          ? body.tags.split(',').map(s => s.trim()).filter(Boolean)
          : []);

    let image;
    if (req.uploadedImage) {
      image = { url: req.uploadedImage.url, deleteUrl: req.uploadedImage.deleteUrl || '', alt: body?.image?.alt || body.alt || '' };
    } else if (body?.image?.url) {
      image = { url: body.image.url, alt: body.image.alt || '' };
    }

    if (!image?.url) return res.status(400).json({ where: 'validation', field: 'image', message: 'Image requise' });

    const doc = await Project.create({
      image,
      title: body.title,
      description: body.description || '',
      tags,
      url: body.url
    });

    res.status(201).json(doc);
  } catch (e) { next(e); }
}

// PUT /api/projects/:id
// - remplace l’image si un fichier est uploadé (supprime l’ancienne via deleteUrl si dispo)
// - sinon met à jour title/description/tags/url/image.alt/image.url
async function updateProject(req, res, next) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.sendStatus(400);
    const doc = await Project.findById(id);
    if (!doc) return res.sendStatus(404);

    const body = parseMaybeJSON(req.body) || {};

    if (body.title !== undefined)       doc.title = body.title;
    if (body.description !== undefined) doc.description = body.description;
    if (body.url !== undefined)         doc.url = body.url;

    if (body.tags !== undefined) {
      doc.tags = Array.isArray(body.tags)
        ? body.tags
        : (typeof body.tags === 'string'
            ? body.tags.split(',').map(s => s.trim()).filter(Boolean)
            : []);
    }

    // image via upload (remplacement)
    if (req.uploadedImage) {
      const prevDelete = doc.image?.deleteUrl;
      doc.image = {
        url: req.uploadedImage.url,
        deleteUrl: req.uploadedImage.deleteUrl || '',
        alt: body?.image?.alt || body.alt || doc.image?.alt || ''
      };
      await doc.save();
      if (prevDelete) deleteViaDeleteUrl(prevDelete).catch(() => {});
      return res.json(doc);
    }

    // MAJ image via JSON
    if (body.image) {
      doc.image = {
        url: body.image.url || doc.image?.url,
        alt: body.image.alt || doc.image?.alt || '',
        deleteUrl: doc.image?.deleteUrl || ''
      };
    }

    await doc.save();
    res.json(doc);
  } catch (e) { next(e); }
}

// DELETE /api/projects/:id
async function deleteProject(req, res, next) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.sendStatus(400);
    const doc = await Project.findById(id);
    if (!doc) return res.sendStatus(404);

    const del = doc.image?.deleteUrl;
    await doc.deleteOne();
    if (del) deleteViaDeleteUrl(del).catch(() => {});
    res.sendStatus(204);
  } catch (e) { next(e); }
}

module.exports = {
  listProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};
