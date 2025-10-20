import { useEffect, useState } from "react";
import SkillCard from "./SkillCard";
import { API_ROUTES } from "../utils/constants";

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // On demande des logos à la bonne taille (48x48 ici)
    const url = `${API_ROUTES.SKILLS}?w=48&h=48&fit=fit`;
    fetch(url)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.statusText)))
      .then(setSkills)
      .catch((e) => setError(String(e)))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <section className="py-10 text-center text-gray-400">Chargement…</section>
    );
  if (error)
    return (
      <section className="py-10 text-center text-red-400">
        Erreur: {error}
      </section>
    );

  return (
    <section className="bg-black md:bg-gradient-black pt-10 md:py-10 lg:py-20">
      <h3 className="text-[24px] font-bold md:text-[32px] mt-4 mb-10">
        Compétences{" "}
        <span className="text-yellow md:text-white">Techniques</span>
      </h3>

      <div className="flex flex-wrap md:flex-nowrap justify-center gap-8 md:mx-20 xl:mx-30">
        {skills.map((s) => (
          <SkillCard
            key={s._id}
            title={s.title}
            subtitle={s.subtitle}
            description={s.description}
            icons={(s.logos ?? []).map((l) => l.url)}
          />
        ))}
      </div>
    </section>
  );
}
