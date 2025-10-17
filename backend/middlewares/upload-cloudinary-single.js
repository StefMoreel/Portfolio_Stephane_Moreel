const { cloudinary } = require("../services/cloudinary");

// Parse req.body.logo et uploade si fileKey = "logo" (field fichier "logo")
function uploadLogoToCloudinary({ folder = "portfolio/softskills" } = {}) {
  return async (req, _res, next) => {
    try {
      if (!req.body.logo) return next();

      const parsed =
        typeof req.body.logo === "string"
          ? JSON.parse(req.body.logo)
          : req.body.logo;

      const files = Object.fromEntries(
        (req.files || []).map((f) => [f.fieldname, f])
      );
      if (parsed?.fileKey && files[parsed.fileKey]) {
        const buf = files[parsed.fileKey].buffer;
        const result = await new Promise((resolve, reject) => {
          const s = cloudinary.uploader.upload_stream(
            {
              folder,
              resource_type: "image",
              use_filename: true,
              unique_filename: true,
              overwrite: false,
            },
            (err, r) => (err ? reject(err) : resolve(r))
          );
          s.end(buf);
        });
        parsed.publicId = result.public_id;
        delete parsed.fileKey;
        req.body.logo = parsed;
      }
      next();
    } catch (e) {
      next(e);
    }
  };
}

module.exports = { uploadLogoToCloudinary };
