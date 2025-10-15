// frontend/src/utils/constants.js
const API_URL = import.meta.env.VITE_API_URL ?? 'https://portfolio-stephane-moreel.onrender.com';

export const API_ROUTES = {
  SKILLS: `${API_URL}/api/skills`,
  PROJECTS: `${API_URL}/api/projects`,
  SOFT_SKILLS: `${API_URL}/api/softskills`,
  CONTACT: `${API_URL}/api/contact`,
};
