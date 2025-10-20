import { useState } from "react";

function SoftSkillCard({ icon, title, description }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="w-full max-w-[250px] md:max-w-[385px]">
      <button
        type="button"
        onClick={() => setFlipped((v) => !v)}
        aria-pressed={flipped}
        aria-label={
          flipped
            ? `Masquer la description de ${title}`
            : `Afficher la description de ${title}`
        }
        className="group relative block w-full focus:outline-none [perspective:1000px]"
      >
        <div
          className={`
    relative h-56 w-full rounded-2xl transition-transform [transform-style:preserve-3d]
    ${flipped ? "[transform:rotateY(180deg)]" : ""}
    md:[transform:none] md:h-auto
    `}
        >
          {/* Face avant (mobile) / face unique (desktop) */}
          <div
            className="
              md:min-h-[250px]
              lg:min-h-[275px]
              xl:min-h-[300px]
              absolute inset-0 rounded-2xl
              bg-gradient-to-r from-black to-yellow md:bg-none md:bg-black
              p-4 shadow-lg text-center
              hover:border-2 border-blue transition duration-600
              grid place-items-center gap-3
              [backface-visibility:hidden]
              md:static md:[backface-visibility:visible]
            "
          >
            <div className="flex flex-col items-center justify-center gap-3">
              {icon}
              <h4 className="text-[16px] md:text-xl lg:text-2xl font-semibold mb-2 lg:my-6">
                {title}
              </h4>
              {/* Sur desktop : description visible */}
              <p className="hidden md:block text-[10px] md:text-[12px] lg:text-[14px] italic">
                {description}
              </p>
              {/* Indice d’action (mobile uniquement) */}
              <span className="md:hidden text-[11px] opacity-70">
                Touchez pour retourner
              </span>
            </div>
          </div>

          {/* Face arrière (mobile uniquement) */}
          <div
            className="
              absolute inset-0 rounded-2xl
              bg-gradient-to-r from-black to-yellow md:bg-none
              border-2 border-blue
              grid place-items-center gap-3
              [transform:rotateY(180deg)] [backface-visibility:hidden]
              md:hidden
            "
          >
            <h4 className="text-[20px] font-semibold p-3">{title}</h4>
            <p className="text-[12px] italic">{description}</p>
            <span className="text-[11px] opacity-70">Touchez pour revenir</span>
          </div>
        </div>
      </button>
    </div>
  );
}

export default SoftSkillCard;
