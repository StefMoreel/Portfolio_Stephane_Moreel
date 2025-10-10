function cld(publicId, { w, h, fit = 'fit', f = 'auto', q = 'auto', dpr = 'auto', extra = [] } = {}) {
  const cloud = process.env.CLOUDINARY_CLOUD_NAME;
  if (!cloud) throw new Error('CLOUDINARY_CLOUD_NAME manquant');
  const parts = [`f_${f}`, `q_${q}`, `dpr_${dpr}`];
  if (w) parts.push(`w_${w}`);
  if (h) parts.push(`h_${h}`);
  if (fit) parts.push(`c_${fit}`);
  if (extra?.length) parts.push(...extra);
  const t = parts.join(',');
  return `https://res.cloudinary.com/${cloud}/image/upload/${t}/${publicId}`;
}
module.exports = { cld };
