import ProjectCard from "./ProjectCard.jsx";
import { API_ROUTES } from "../utils/constants.js";
import { useEffect, useState } from "react";

function Projects() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    const ac = new AbortController();
    (async () => {
      try {
        setLoading(true);
        setErr(null);
        const res = await fetch(`${API_ROUTES.PROJECTS}`, {
          signal: ac.signal,
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setItems(Array.isArray(data) ? data : []);
      } catch (e) {
        if (e.name !== "AbortError") setErr(e.message || "Erreur inattendue");
      } finally {
        setLoading(false);
      }
    })();
    return () => ac.abort();
  }, []);

  return (
    <section
      className="bg-black md:bg-gradient-black pt-10 md:py-10"
      id="projects"
    >
      <div>
        <h3 className="text-[24px] font-bold mt-4">
          Mes <span className="text-yellow md:text-white">Projets</span>
        </h3>
      </div>
      <div className="flex flex-wrap lg:flex-nowrap justify-center gap-10 md:mx-16 mt-8 lg:my-10 lg:mx-20">
        {loading && (
          <div className="text-center text-gray-400">Chargement…</div>
        )}
        {err && <div className="text-center text-gray-400">{err}</div>}
        {items.map((p) => {
          const imageUrl =
            p.image?.url ?? null;

          return (
            <ProjectCard
              key={p._id}
              image={imageUrl}
              title={p.title}
              description={p.description}
              tags={(p.tags || []).map((tag) => tag)}
              url={p.url}
              alt={p.image?.alt || ''}
            />
          );
          
        })}
      </div>
    </section>
  );
}
export default Projects;
