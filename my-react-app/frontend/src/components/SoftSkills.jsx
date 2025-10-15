import { useEffect, useState, useMemo } from 'react';
import SoftSkillsCard from './SoftSkillCard.jsx';
import { API_ROUTES } from '../utils/constants';

function SoftSkills() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  // petit helper pour fabriquer une URL Cloudinary si le backend ne fournit pas logo.url
  const makeCldUrl = useMemo(() => {
    return (publicId, { w = 60, h = 60, fit = 'fit' } = {}) => {
      if (!publicId) return '';
      if (/^https?:\/\//i.test(publicId)) return publicId; // déjà une URL
      if (!CDN.CLOUD_NAME) return ''; // pas de fallback possible
      const t = [`f_auto`, `q_auto`, `dpr_auto`, `c_${fit}`, `w_${w}`, `h_${h}`].join(',');
      return `https://res.cloudinary.com/${CDN.CLOUD_NAME}/image/upload/${t}/${publicId}`;
    };
  }, []);

  useEffect(() => {
    const ac = new AbortController();
    (async () => {
      try {
        setLoading(true);
        setErr(null);
        // astuce : passe w/h/fit pour que le backend te renvoie des URLs prêtes (si tu as le middleware imageOpts)
        const res = await fetch(`${API_ROUTES.SOFT_SKILLS}?w=64&h=64&fit=fit`, { signal: ac.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setItems(Array.isArray(data) ? data : []);
      } catch (e) {
        if (e.name !== 'AbortError') setErr(e.message || 'Erreur inattendue');
      } finally {
        setLoading(false);
      }
    })();
    return () => ac.abort();
  }, []);

  return (
    <section className="bg-black md:bg-gradient-yellow pt-10 md:py-10">
      <div className="text-center" id="softskills">
        <h3 className="text-[24px] font-bold md:text-[32px] mt-4">
          Soft <span className="text-yellow md:text-white">Skills</span>
        </h3>
        <p className="text-[13px] md:text-xl lg:text font-semibold mt-5 mx-8 md:mx-48 lg:mx-50 xl:mx-100">
          Mon expérience en ressources humaines m’a appris à allier rigueur, écoute et collaboration, des qualités
          que j’applique aujourd’hui au développement full-stack.
        </p>
        <p className="text-[13px] md:text-xl lg:text font-semibold mt-5 mx-8 md:mx-48 lg:mx-50">
          Voici ce que je peux apporter à votre équipe :
        </p>
      </div>

      {/* état de chargement / erreur */}
      {loading && (
        <div className="
            mx-8 
            md:mx-14 
            lg:mx-60 
            mt-8 
            grid 
            gap-6 
            sm:grid-cols-2 
            lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="w-full max-w-[385px] h-[180px] animate-pulse rounded-lg bg-white/5" />
          ))}
        </div>
      )}
      {err && (
        <div className="text-center text-red-400 mt-8">
          Impossible de charger les soft skills : {err}
        </div>
      )}

      {!loading && !err && (
        <div
          className="
            mx-10
            md:mx-30
            lg:mx-20
            xl:mx-60
            mt-8 
            lg:my-20
            grid 
            gap-6 
            grid-cols-2
            lg:grid-cols-3
            items-stretch 
            justify-items-center"

        >
          {items.map((skill) => {
            const iconUrl =
              skill.logo?.url ||
              (skill.logo?.publicId ? makeCldUrl(skill.logo.publicId, { w: 48, h: 48 }) : '');

            return (
              <SoftSkillsCard
                key={skill._id}
                title={skill.title}
                description={skill.description}
                icon={
                  iconUrl ? (
                    <img src={iconUrl} alt={skill.logo?.alt || skill.title} className="size-6 md:size-8 lg:size-10 xl:size-12" />
                  ) : null
                }
              />
            );
          })}
          {items.length === 0 && (
            <div className="col-span-full text-center text-gray-400">
              Aucune donnée pour le moment.
            </div>
          )}
        </div>
      )}
    </section>
  );
}

export default SoftSkills;
