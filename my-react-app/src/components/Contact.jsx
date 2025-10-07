import Links from "./Links.jsx";
import { HiMail } from 'react-icons/hi';
import { FaLinkedinIn } from 'react-icons/fa6';
import { FaGithub } from 'react-icons/fa6';

function Contact() {
    return ( 
        <section>
            <div>
                <h2 className="text-[24px] font-bold md:text-[32px] mt-4">Contactez- <span className="text-yellow">Moi</span></h2>
            </div>
            <div className="mt-4 mx-8">
                <form action="https://formspree.io/f/mayvlrdo" method="POST" className="flex flex-col gap-4">
                    <input type="text" name="name" placeholder="Votre nom" className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow" required />
                    <input type="email" name="email" placeholder="Votre email" className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow" required />
                    <textarea name="message" rows="5" placeholder="Votre message" className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow" required></textarea>
                    <button type="submit" className="bg-gradient-to-b from-black to-yellow text-white py-2 px-4 rounded-full hover:font-bold">Envoyer</button>
                </form>
            </div>
            <p className="text-center text-[16px] font-bold m-4">Ou contactez-<span className="text-yellow">moi </span>sur</p>
            <div className='flex justify-center gap-8 text-[32px] text-white'>
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

export default Contact;