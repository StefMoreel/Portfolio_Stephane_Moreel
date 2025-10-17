// frontend/src/utils/constants.js
const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

export const API_ROUTES = {
  SKILLS: `${API_URL}/api/skills`,
  PROJECTS: `${API_URL}/api/projects`,
  SOFT_SKILLS: `${API_URL}/api/softskills`,
  CONTACT: `${API_URL}/api/contact`,
  CDN: (publicId, t) => `${API_URL}/cdn/${t}/${publicId}`,
};
export const CDN = {
  CLOUD_NAME: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '',
};