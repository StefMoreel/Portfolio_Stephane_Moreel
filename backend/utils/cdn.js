// utils/cdn.js (CommonJS)

function isAbsUrl(x = "") {
  return /^https?:\/\//i.test(x);
}

/**
 * Fabrique une URL Cloudinary "image/upload" avec transformations.
 * - Ne jette pas : renvoie null si cloud/publicId manquants.
 * - Si on lui passe déjà une URL absolue, il la renvoie telle quelle.
 */
function cld(
  publicId,
  {
    w,
    h,
    fit = "fit",
    f = "auto",
    q = "auto",
    dpr = "auto",
    extra = [], // ex: ['g_face','r_8']
    secure = true, // http(s)
    resourceType = "image", // 'image' | 'video' | 'raw'
    deliveryType = "upload", // 'upload' | 'fetch' | ...
  } = {}
) {
  if (!publicId) return null;
  if (isAbsUrl(publicId)) return publicId; // déjà une URL complète : on la garde

  const cloud = process.env.CLOUDINARY_CLOUD_NAME;
  if (!cloud) return null; // ⚠️ soft-fail pour éviter de casser la route

  const t = [
    f && `f_${f}`,
    q && `q_${q}`,
    dpr && `dpr_${dpr}`,
    w && `w_${w}`,
    h && `h_${h}`,
    fit && `c_${fit}`,
    ...(Array.isArray(extra) ? extra : []),
  ]
    .filter(Boolean)
    .join(",");

  const proto = secure ? "https" : "http";
  // NB: on suppose un publicId “propre” (pas d’espaces). Si besoin, normaliser côté ingestion.
  return `${proto}://res.cloudinary.com/${cloud}/${resourceType}/${deliveryType}/${t}/${publicId}`;
}

module.exports = { cld, isAbsUrl };
