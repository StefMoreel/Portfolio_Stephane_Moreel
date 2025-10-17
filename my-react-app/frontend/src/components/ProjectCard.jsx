import { useState } from "react";
import { IoIosArrowUp } from "react-icons/io";

function ProjectCard({ image, title, description, tags, url }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleCollapse = () => setIsCollapsed((v) => !v);
  const buttonText = isCollapsed ? "Moins de détails" : "Plus de détails";

  // Hauteur commune quand c'est ouvert (ajuste si besoin)
  const OPEN_H = 260; // px

  return (
    <div
      className="bg-transparent mx-10 md:mx-0 mt-8 rounded-lg text-center md:w-[500px] xl:w-[450px]"
      style={{ contain: "layout" }}
    >
      {/* Image + bouton overlay */}
      <div className="relative w-full overflow-hidden rounded-t-lg">
        <img
          src={image}
          alt={title}
          className="block w-full aspect-video object-cover"
          loading="lazy"
          decoding="async"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center z-10">
          <button
            type="button"
            onClick={toggleCollapse}
            aria-expanded={isCollapsed}
            className="pointer-events-auto inline-flex items-center gap-2 px-4 py-2 rounded-full shadow-lg bg-gradient-to-b from-yellow to-black text-white font-semibold"
          >
            <span className="text-sm lg:text-base">{buttonText}</span>
            <IoIosArrowUp
              className={`size-5 border border-white/60 rounded-full transition-transform duration-300 ${
                isCollapsed ? "" : "rotate-180"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Panneau repliable — CSS only (pas de scrollHeight) */}
      <div
        className={`
          flex flex-col items-center justify-center w-full rounded-b-lg
          transition-colors duration-300
          ${
            isCollapsed
              ? "bg-gradient-to-t from-black to-yellow"
              : "bg-transparent"
          }
        `}
      >
        <div
          className={`
            overflow-hidden
            transition-[max-height,opacity,visibility] duration-300 ease-in-out
            ${isCollapsed ? "opacity-100 visible" : "opacity-0 invisible"}
          `}
          style={{ maxHeight: isCollapsed ? OPEN_H : 0 }}
        >
          <div
            className="flex flex-col text-center text-black gap-2 p-2 lg:pb-4"
            style={{ height: OPEN_H, overflowY: "auto" }}
          >
            <h3 className="text-[18px] lg:text-[24px] font-bold mx-4">
              {title}
            </h3>
            <p className="font-semibold text-[12px] lg:text-[18px]">
              {description}
            </p>

            {Array.isArray(tags) && tags.length > 0 && (
              <ul className="mt-3 flex flex-wrap justify-center gap-2">
                {tags.map((t, i) => (
                  <li
                    key={`${t}-${i}`}
                    className="px-3 py-1 rounded-full text-xs lg:text-sm bg-black text-white"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            )}

            {url && (
              <div className="mt-4">
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center min-w-[250px] h-10 rounded-full bg-gradient-to-b from-black to-yellow text-white font-semibold text-[16px] lg:text-base hover:opacity-90 transition"
                >
                  Voir le projet
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
