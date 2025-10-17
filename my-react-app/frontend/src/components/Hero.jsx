import { FaDownload } from "react-icons/fa6";
import { HiMail } from "react-icons/hi";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";
import Button from "./HeroButtons.jsx";
import Links from "./Links.jsx";

import { API_ROUTES, CDN } from "../utils/constants";

function Hero() {
  const pdfURL = "/CV_STEPHANE_MOREEL 092025 V2.pdf";

  // le chemin Cloudinary (avec la version) devient le "publicId" pour le proxy
  const photoPublicId = "photo_sm_portfolio_ztg9oc_k3ssqm";

  const USE_PROXY = import.meta.env.VITE_USE_IMAGE_PROXY === "true";

  const photoURL = USE_PROXY
    ? API_ROUTES.CDN(photoPublicId, "f_auto,q_auto,dpr_auto,c_fill,w_234,h_317")
    : `https://res.cloudinary.com/${CDN.CLOUD_NAME}/image/upload/f_auto,q_auto,dpr_auto,c_fill,w_234,h_317/${photoPublicId}`;


  return (
    <section className="bg-black pb-10">
      <div className="flex flex-col md:justify-around lg:flex-row md:mx-20">
        <div className="order-2 flex justify-center flex-col text-center lg:text-left lg:order-1 m-8">
          <h1 className="font-semibold text-4xl md:text-5xl xl:text-6xl">Salut, je suis Stéphane</h1>
          <h2 className="font-semibold text-2xl md:text-4xl mt-4">
            Développeur <span className="text-yellow">Full-Stack</span>
          </h2>
          <p className="text-[18px] md:text-2xl mt-5">
            De la paie au code : après 20 ans en ressources humaines, je me
            reconvertis dans le développement full-stack pour allier rigueur et
            créativité.
          </p>
          <p className="text-[14px] md:text-[18px] italic mt-5">
            Développeur full-stack en devenir, je combine mon expérience en
            gestion de projets et mon sens du collectif pour créer des
            applications performantes et centrées utilisateur. Musicien et
            pâtissier amateur, je crois que la passion et la précision font la
            différence – même dans le code !
          </p>
        </div>
        <div className="order-1 flex justify-center xl:p-30 md:p-10">
          <img
            className="md:min-w-[234px] md:h-[317px] rounded-xl border-2 border-yellow"
            src={photoURL}
            alt="Photo de Stéphane Moreel"
            width="91"
            height="118"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </div>
      </div>
      <div className="md:flex md:justify-center mt-4">
        {/* Bouton pour télécharger/prévisualiser le CV */}
        <Button
          pdfURL={pdfURL}
          title="Télécharger mon CV"
          icon={<FaDownload className="size-6" />}
        />

        {/* Bouton pour rediriger vers la section Contact */}
        <Button
          link="#contact"
          title="Contactez-moi"
          icon={<HiMail className="size-6" />}
        />
      </div>
      <div className="flex justify-center gap-8 text-[32px] mt-10 text-yellow md:hidden">
        <Links
          link="https://www.linkedin.com/in/stéphane-moreel-0a85a2119/"
          ariaLabel="Lien vers mon profil LinkedIn"
          icon={<FaLinkedinIn />}
        />
        <Links
          link="https://www.github.com/StefMoreel/"
          ariaLabel="Lien vers mon profil GitHub"
          icon={<FaGithub />}
        />
        <Links
          link="mailto:stef.ksp@gmail.com"
          ariaLabel="Lien pour m'envoyer un email"
          icon={<HiMail />}
        />
      </div>
    </section>
  );
}

export default Hero;
