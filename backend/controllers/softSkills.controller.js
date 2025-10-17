// backend/controllers/softSkills.controller.js
const mongoose = require("mongoose");
const SoftSkill = require("../models/SoftSkill");
const { cloudinary } = require("../services/cloudinary");
const { cld } = require("../utils/cdn"); // helper URL Cloudinary "safe"

// ---- helpers ----
function mapSoftSkill(doc, req) {
  const s = doc.toObject ? doc.toObject() : doc;
  const opts = req.imageOpts || {};
  if (s.logo?.publicId) {
    s.logo.url = cld(s.logo.publicId, opts) || null;
  }
  return s;
}

// ---- controllers ----

async function createSoftSkill(req, res, next) {
  try {
    const { title, description } = req.body;

    // logo: soit JSON direct, soit string JSON (multipart)
    let logo = req.body.logo;
    if (typeof logo === "string") {
      try {
        logo = JSON.parse(logo);
      } catch {
        logo = undefined;
      }
    }

    // si tu utilises un middleware upload single (fileKey -> publicId),
    // logo.publicId sera déjà rempli ici.
    const doc = await SoftSkill.create({
      title,
      description: description || "",
      logo: logo?.publicId
        ? { publicId: logo.publicId, alt: logo.alt || "" }
        : undefined,
    });

    return res.status(201).json(mapSoftSkill(doc, req));
  } catch (e) {
    next(e);
  }
}

async function listSoftSkills(req, res, next) {
  try {
    const docs = await SoftSkill.find().sort({ createdAt: -1 });
    res.json(docs.map((d) => mapSoftSkill(d, req)));
  } catch (e) {
    next(e);
  }
}

async function getSoftSkillById(req, res, next) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.sendStatus(400);
    const doc = await SoftSkill.findById(id);
    if (!doc) return res.sendStatus(404);
    res.json(mapSoftSkill(doc, req));
  } catch (e) {
    next(e);
  }
}

/**
 * PUT /api/softskills/:id
 * Body JSON:
 *   { "title"?, "description"?, "logo"?: { "publicId": "...", "alt"?: "..." } }
 * Multipart:
 *   logo (Text): {"fileKey":"logo","alt":"..."}
 *   logo (File): (fieldname "logo")  => middleware remplacera fileKey -> publicId
 */
async function updateSoftSkill(req, res, next) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.sendStatus(400);

    const ss = await SoftSkill.findById(id);
    if (!ss) return res.sendStatus(404);

    // champs simples
    for (const k of ["title", "description"]) {
      if (req.body[k] !== undefined) ss[k] = req.body[k];
    }

    // remplacement du logo si fourni
    if (req.body.logo !== undefined) {
      const incoming =
        typeof req.body.logo === "string"
          ? JSON.parse(req.body.logo)
          : req.body.logo;

      const prevPid = ss.logo?.publicId || null;

      if (incoming && incoming.publicId) {
        ss.logo = {
          publicId: incoming.publicId,
          alt: incoming.alt || ss.logo?.alt || "",
        };
      } else if (incoming === null) {
        ss.logo = undefined; // supprimer le logo si { "logo": null }
      }

      await ss.save();

      // nettoyage Cloudinary si on a réellement remplacé
      if (
        prevPid &&
        ss.logo?.publicId &&
        ss.logo.publicId !== prevPid &&
        process.env.SUPPRESS_CLOUDINARY_DELETE !== "true"
      ) {
        try {
          await cloudinary.uploader.destroy(prevPid);
        } catch (_) {}
      }

      return res.json(mapSoftSkill(ss, req));
    }

    await ss.save();
    return res.json(mapSoftSkill(ss, req));
  } catch (e) {
    next(e);
  }
}

module.exports = {
  createSoftSkill,
  listSoftSkills,
  getSoftSkillById,
  updateSoftSkill,
};
