import { BiSolidUpArrowAlt } from 'react-icons/bi';

function Footer() {
  return (
    <section className="bg-black">
      <footer className="mx-auto max-w-7xl flex items-center justify-between p-4">
        <p className="text-sm lg:text-lg text-gray-400">
          &copy; {new Date().getFullYear()} Stéphane Moreel. Tous droits réservés.
        </p>

        <a
          href="#top"
          aria-label="Revenir en haut"
          className="inline-flex items-center justify-center p-2 ring-1 ring-inset ring-yellow text-gray-200 hover:bg-white/10 focus:outline-2 focus:outline-offset-2"
          title="Haut de page"
        >
          <BiSolidUpArrowAlt className="size-5 lg:size-10" aria-hidden="true" />
        </a>
      </footer>
    </section>
  )
}

export default Footer
