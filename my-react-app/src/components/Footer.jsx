function Footer() {
    return ( 
        <section>
            <footer className="text-center p-4 border-t border-gray-700 mt-8">
                <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} Stéphane Moreel. Tous droits réservés.</p>
            </footer>
        </section> 
     );
}

export default Footer;