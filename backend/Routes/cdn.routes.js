const express = require('express');
const https = require('node:https');

const router = express.Router();
const CLOUD = process.env.CLOUDINARY_CLOUD_NAME;

// /cdn?id=<publicId>&t=<transformations>
router.get('/cdn', (req, res, next) => {
  try {
    const publicId = req.query.id;            // ex: "folder/sub/image_xxx"
    const t = req.query.t || 'f_auto,q_auto,dpr_auto,c_fit,w_96,h_96';
    if (!CLOUD || !publicId) return res.sendStatus(400);

    // le front aura fait encodeURIComponent → on decode ici
    const decoded = decodeURIComponent(publicId);

    const url = `https://res.cloudinary.com/${CLOUD}/image/upload/${t}/${decoded}`;

    https.get(url, (up) => {
      res.setHeader('Content-Type', up.headers['content-type'] || 'image/jpeg');
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      up.on('error', next);
      up.pipe(res);
    }).on('error', next);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
