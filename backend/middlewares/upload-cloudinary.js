const { cloudinary } = require("../services/cloudinary");

// Usage: uploadToCloudinary('logos', { folder: 'portfolio/logos' })
function uploadToCloudinary(
  field = "logos",
  { folder = "portfolio/logos" } = {}
) {
  return async (req, _res, next) => {
    try {
      let items = [];
      if (req.body[field]) {
        items =
          typeof req.body[field] === "string"
            ? JSON.parse(req.body[field])
            : req.body[field];
      }

      const fileByKey = Object.create(null);
      for (const f of req.files || []) fileByKey[f.fieldname] = f;

      for (const it of items) {
        if (it.fileKey && fileByKey[it.fileKey]) {
          const buf = fileByKey[it.fileKey].buffer;
          const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              {
                folder,
                resource_type: "image",
                use_filename: true,
                unique_filename: true,
                overwrite: false,
              },
              (err, resu) => (err ? reject(err) : resolve(resu))
            );
            stream.end(buf);
          });
          it.publicId = result.public_id; // on remplace fileKey par publicId
          delete it.fileKey;
        }
      }
      req.body[field] = items;
      next();
    } catch (e) {
      next(e);
    }
  };
}

module.exports = { uploadToCloudinary };
