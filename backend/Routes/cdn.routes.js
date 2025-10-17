const express = require('express');
const https = require('node:https');
const router = express.Router();
const CLOUD = process.env.CLOUDINARY_CLOUD_NAME;

// Route pour /cdn/<transformations>/<publicId>
router.get(/^\/cdn\/(.+?)\/(.+)/, (req, res, next) => {
  try {
    const transformations = req.params[0];
    const publicId = req.params[1];

    if (!CLOUD || !publicId) return res.sendStatus(400);

    const url = `https://res.cloudinary.com/${CLOUD}/image/upload/${transformations}/${publicId}`;

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
