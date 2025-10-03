import { useState } from "react";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

const NavLinks = [
    { name: 'Home', href: '#' },
    { name: 'A Propos', href: '#about' },
    { name: 'Projets', href: '#projects' },
    { name: 'Contact', href: '#contact' },
];



    return (
    <nav className="bg-black text-white p-10 pb-2 max-w-10xl">
      {/* Desktop Menu */}
      <div className="hidden md:flex justify-between items-center">
        <ul className="flex space-x-6">
            {NavLinks.map((link, index) => (
            <li key={index}>
                <a href={link.href} className="hover:text-yellow text-18 font-montserrat">{link.name}</a>
            </li>

          ))}
        </ul>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button onClick={toggleMenu} className="focus:outline-none">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4">
          <ul className="flex flex-col space-y-2">
            {NavLinks.map((link, index) => (
              <li key={index}>
                <a href={link.href} className="block px-2 py-1 hover:text-yellow text-18 font-montserrat">{link.name}</a>
              </li>
            ))}
          </ul>
        </div>
        )}
    </nav>
    );
}

export default NavBar;