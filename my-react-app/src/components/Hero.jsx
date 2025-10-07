import HeroPhoto from '../assets/photo_sm_portfolio.png';
import { FaDownload } from 'react-icons/fa6';
import { HiMail } from 'react-icons/hi';
import { FaLinkedinIn } from 'react-icons/fa6';
import { FaGithub } from 'react-icons/fa6';
import Button from './HeroButtons.jsx';
import Links from './Links.jsx';


function Hero() {
    const pdfURL = '/public/CV_STEPHANE_MOREEL 092025 V2.pdf';

    return (
        <section>
            <div className='flex flex-col md:justify-around md:flex-row'>
                <div className='order-2 flex justify-center flex-col text-center md:order-1 text-[32px] md:text-[60px] m-8'>
                    <h1 className='font-bold'>Salut, je suis Stéphane</h1>
                    <h2 className='md:text-[32px] mt-4'>Développeur <span className='text-yellow'>Full-Stack</span></h2>
                    <p className='text-[18px] mt-5'>De la paie au code : après 20 ans en ressources humaines, je me reconvertis dans le développement full-stack pour allier rigueur et créativité.</p>
                    <p className='text-[14px] italic mt-5'>Développeur full-stack en devenir, je combine mon expérience en gestion de projets et mon sens du collectif pour créer des applications performantes et centrées utilisateur. Musicien et pâtissier amateur, je crois que la passion et la précision font la différence – même dans le code !</p>
                </div>
                <div className='order-1 flex justify-center'>
                    <img className='w-[91px] h-[118px] md:w-[324px] md:h-[435px] rounded-lg border-2 border-yellow'src={ HeroPhoto } alt="Photo de Stéphane Moreel" />
                </div>
            </div>
            <div>
                {/* Bouton pour télécharger/prévisualiser le CV */}
                <Button
                    pdfURL={pdfURL}
                    title="Télécharger mon CV"
                    icon={<FaDownload className='size-6' />}
                />

                {/* Bouton pour rediriger vers la section Contact */}
                <Button
                    link="#contact"
                    title="Contactez-moi"
                    icon={<HiMail className='size-6' />}
                />
            </div>
            <div className='flex justify-center gap-8 text-[32px] mt-10 text-yellow'>
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
