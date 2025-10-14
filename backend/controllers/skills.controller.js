// controllers/skills.controller.js
const mongoose = require('mongoose');
const Skill = require('../models/Skill');
const { cloudinary } = require('../services/cloudinary');
const { cld } = require('../utils/cdn'); // URL builder Cloudinary "safe"

// --- Helpers ---------------------------------------------------------------

/**
 * Renvoie un objet JS "propre" et ajoute une URL Cloudinary calculée sur chaque logo
 * selon les opts (w/h/fit…) présentes dans req.imageOpts (middleware optionnel).
 */
function mapSkill(doc, req) {
  const s = doc.toObject ? doc.toObject() : doc;
  const opts = req.imageOpts || {};
  s.logos = (s.logos || []).map((l) => ({
    ...l,
    url: cld(l.publicId, opts) || null,
  }));
  return s;
}

/**
 * Normalise un éventuel body stringifié (multipart) en vrai array d’objets.
 * Retourne toujours un array (éventuellement vide).
 */
function parseLogosFromBody(bodyValue) {
  if (!bodyValue) return [];
  if (Array.isArray(bodyValue)) return bodyValue;
  if (typeof bodyValue === 'string') {
    try { return JSON.parse(bodyValue); }
    catch { return []; }
  }
  return [];
}

/**
 * Construit la liste "finale" des logos, en tenant compte des existants.
 * Règles :
 *  - item avec _id → on conserve l’existant et on met à jour alt et/ou publicId
 *  - item sans _id mais avec publicId → nouveau logo
 *  - ordre = ordre du tableau fourni (réordonnancement géré implicitement)
 */
function buildNextLogos(currentLogos, inputLogos) {
  const byId = new Map((currentLogos || []).map((l) => [String(l._id), l]));
  const next = [];

  for (const it of inputLogos) {
    if (!it) continue;

    if (it._id) {
      const ex = byId.get(String(it._id));
      if (!ex) continue; // _id inconnu → on ignore

      const publicId = it.publicId ?? ex.publicId;
      const alt = it.alt ?? ex.alt ?? '';
      next.push({ _id: ex._id, publicId, alt });
      continue;
    }

    if (it.publicId) {
      const alt = it.alt || '';
      next.push({ publicId: it.publicId, alt });
    }
  }

  return next;
}

/**
 * Diff : retourne la liste des publicId présents avant mais absents après
 * (à supprimer sur Cloudinary).
 */
function diffPublicIds(prevLogos, nextLogos) {
  const prev = new Set((prevLogos || []).map((l) => l.publicId));
  const nxt  = new Set((nextLogos || []).map((l) => l.publicId));
  return [...prev].filter((pid) => !nxt.has(pid));
}

// --- Controllers -----------------------------------------------------------

/**
 * GET /api/skills
 * Liste des skills (tri desc par date) avec URLs Cloudinary calculées (si possible).
 */
async function listSkills(req, res, next) {
  try {
    const docs = await Skill.find().sort({ createdAt: -1 });
    const items = docs.map((d) => mapSkill(d, req));
    res.json(items);
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
    return res.json(mapSkill(doc, req));
  } catch (e) { next(e); }
}

/**
 * PUT /api/skills/:id
 * Met à jour un skill :
 *  - title/subtitle/description si fournis
 *  - logos : l’array fourni devient l’état final (ajout/suppression/remplacement/réordre)
 *    - item {_id, alt} → conserve l’image, met à jour l’alt
 *    - item {_id, publicId, alt} → remplace l’image
 *    - item {publicId, alt} → ajoute un nouveau logo
 *  - supprime sur Cloudinary les anciennes images qui ne sont plus dans la liste
 *
 * Payload accepté :
 *  - application/json (simple)
 *  - multipart/form-data (avec fichiers si tu as mis le middleware upload + uploadToCloudinary)
 *    - dans ce cas, `uploadToCloudinary` remplace les { fileKey } par { publicId } AVANT d’arriver ici.
 */
function asId(x) { try { return new mongoose.Types.ObjectId(String(x)); } catch { return null; } }

async function updateSkill(req, res, next) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.sendStatus(400);

    const skill = await Skill.findById(id);
    if (!skill) return res.sendStatus(404);

    // 1) champs simples
    ['title','subtitle','description'].forEach(k => {
      if (req.body[k] !== undefined) skill[k] = req.body[k];
    });

    // 2) mode de mise à jour des logos
    const requested = parseLogosFromBody(req.body.logos);
    const replaceAll = /^1|true$/i.test(String(req.query.replace || '')); // ?replace=1 pour forcer le remplacement total

    if (requested.length || replaceAll) {
      const current = skill.logos || [];

      // indexation actuelle par _id et par publicId
      const byId = new Map(current.map(l => [String(l._id), l]));
      const byPid = new Map(current.map(l => [l.publicId, l]));

      // construire la cible
      const next = [];
      for (const it of requested) {
        if (!it) continue;

        // 2.1 — MAJ d’un existant par _id OU par publicId
        if (it._id || it.publicId) {
          let existing = null;
          if (it._id && byId.has(String(it._id))) existing = byId.get(String(it._id));
          else if (it.publicId && byPid.has(it.publicId)) existing = byPid.get(it.publicId);

          if (existing) {
            next.push({
              _id: existing._id,
              publicId: it.publicId ?? existing.publicId,
              alt: (it.alt ?? existing.alt) || '',
            });
            continue;
          }
        }

        // 2.2 — NOUVEAU logo (publicId requis à ce stade)
        if (it.publicId) {
          next.push({ publicId: it.publicId, alt: it.alt || '' });
        }
      }

      if (replaceAll) {
        // mode remplacement total → on supprime ce qui disparaît
        const prevSet = new Set(current.map(l => l.publicId));
        const nextSet = new Set(next.map(l => l.publicId));
        const toDelete = [...prevSet].filter(pid => !nextSet.has(pid));

        skill.logos = next;
        await skill.save();

        if (process.env.SUPPRESS_CLOUDINARY_DELETE !== 'true') {
          for (const pid of toDelete) { try { await cloudinary.uploader.destroy(pid); } catch {} }
        }
      } else {
        // mode merge (par défaut) → on conserve ce qui n'est pas mentionné
        //  - met à jour/ajoute ce qui est envoyé
        //  - garde tous les autres logos existants
        const nextPidSet = new Set(next.map(l => l.publicId));
        const kept = current.filter(l => !nextPidSet.has(l.publicId)); // ceux non mentionnés
        skill.logos = [...kept, ...next]; // ordre: on garde les anciens puis on ajoute/maj à la fin
        await skill.save();
      }
    } else {
      // rien sur logos → juste save des champs simples
      await skill.save();
    }

    res.json(skill);
  } catch (e) { next(e); }
}

module.exports = {
  listSkills,
  updateSkill,
  getSkillById,
};
