const { request } = require('undici');

const API = 'https://api.imgbb.com/1/upload';
const KEY = process.env.IMGBB_API_KEY;

async function uploadBufferToImgbb(buffer, filename = 'image') {
  if (!KEY) throw new Error('IMGBB_API_KEY manquant');

  const b64 = buffer.toString('base64');
  const form = new URLSearchParams();
  form.set('key', KEY);
  form.set('image', b64);
  // garder un name simple, sans espace/extension
  form.set('name', filename.replace(/\.[^.]+$/, '').replace(/\s+/g, '_'));

  const res = await request(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: form.toString(),
  });

  const payload = await res.body.json();
  if (!payload?.success) {
    const msg = payload?.error?.message || 'imgbb upload failed';
    throw new Error(msg);
  }

  const d = payload.data || {};
  // d.display_url (i.ibb.co/....), d.delete_url (GET -> supprime)
  return {
    url: d.display_url || d.url,
    deleteUrl: d.delete_url || '',
    id: d.id || '',
    size: d.size || 0,
  };
}

async function deleteViaDeleteUrl(deleteUrl) {
  if (!deleteUrl) return false;
  try {
    const r = await request(deleteUrl, { method: 'GET' });
    return r.statusCode === 200;
  } catch {
    return false;
  }
}

module.exports = { uploadBufferToImgbb, deleteViaDeleteUrl };
