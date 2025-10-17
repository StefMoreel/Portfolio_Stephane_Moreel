import { API_ROUTES, CDN } from "./constants";

export const USE_PROXY = import.meta.env.VITE_USE_IMAGE_PROXY === "true";

export function makeImgUrl(publicId, { w, h, fit = "fit", extra = [] } = {}) {
  if (!publicId) return "";
  if (/^https?:\/\//i.test(publicId)) return publicId; // déjà une URL complète

  const parts = ["f_auto","q_auto","dpr_auto",`c_${fit}`];
  if (w) parts.push(`w_${w}`);
  if (h) parts.push(`h_${h}`);
  if (extra.length) parts.push(...extra);
  const t = parts.join(",");

  return USE_PROXY
    ? API_ROUTES.CDN(publicId, t)
    : (CDN.CLOUD_NAME
        ? `https://res.cloudinary.com/${CDN.CLOUD_NAME}/image/upload/${t}/${publicId}`
        : "");
}
