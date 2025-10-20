// backend/middlewares/uploadImgbb.js
const multer = require('multer');
const { uploadBufferToImgbb } = require('../services/imgbb');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

// Pour 1 fichier (champ "image")
async function uploadToImgbb(req, res, next) {
  try {
    if (!req.file) return next();
    req.uploadedImage = await uploadBufferToImgbb(req.file.buffer, req.file.originalname);
    next();
  } catch (e) { next(e); }
}

// Pour plusieurs fichiers (champ "logos")
async function uploadManyToImgbb(req, res, next) {
  try {
    if (!req.files || !req.files.length) return next();
    const uploads = await Promise.all(
      req.files.map(f => uploadBufferToImgbb(f.buffer, f.originalname))
    );
    req.uploadedImages = uploads; // [{ url, deleteUrl, id, size }, ...]
    next();
  } catch (e) { next(e); }
}

module.exports = {
  upload,             
  uploadToImgbb,      
  uploadManyToImgbb,  
};
