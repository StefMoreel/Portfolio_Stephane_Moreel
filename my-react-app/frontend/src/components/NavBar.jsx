import { useState } from "react";
import Links from "./Links.jsx";
import { HiMail } from "react-icons/hi";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const NavLinks = [
    { name: "Home", href: "#" },
    { name: "About", href: "#about" },
    { name: "Projets", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <section className="bg-black flex md:justify-between items-center md:px-20">
      <nav className="bg-black text-white p-5 md:p-10">
        {/* Desktop Menu */}
        <div className="hidden md:flex justify-between">
          <ul className="flex space-x-6">
            {NavLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  className="hover:text-yellow text-18 font-montserrat font-semibold"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none" aria-label="Toggle menu">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
            <span className="sr-only">Ouvrir/Fermer le menu</span>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4">
            <ul className="flex flex-col space-y-2">
              {NavLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="block px-2 py-1 hover:text-yellow text-18 font-montserrat"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
      <div className="hidden flex-col justify-center gap-8 text-[32px] text-yellow mx-20 md:flex md:flex-row">
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

export default NavBar;
