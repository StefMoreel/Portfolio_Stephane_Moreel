const ALLOWED_FIT = new Set(["fit", "fill", "pad", "crop", "scale", "thumb"]);
const toInt = (v) => {
  const n = parseInt(v, 10);
  return Number.isFinite(n) && n > 0 ? n : undefined;
};

function imageOptions(req, _res, next) {
  const { w, h, fit, q, f, dpr } = req.query;
  req.imageOptions = {
    w: toInt(w),
    h: toInt(h),
    fit: fit && ALLOWED_FIT.has(fit) ? fit : "fit",
    q: q ?? "auto",
    f: f ?? "auto",
    dpr: dpr ?? "auto",
  };
  next();
}
module.exports = { imageOptions };
