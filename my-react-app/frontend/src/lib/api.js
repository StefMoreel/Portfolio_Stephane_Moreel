export async function getSkills({ w = 60, h = 60, fit = 'fit' } = {}) {
  const base = import.meta.env.VITE_API_URL
  const url = `${base}/api/skills?w=${w}&h=${h}&fit=${fit}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`API skills: ${res.status}`)
  return res.json()
}
