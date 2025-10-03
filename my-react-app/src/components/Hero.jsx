import { Button } from '@headlessui/react';
import HeroPhoto from '../assets/photo_sm_portfolio.png';

function Hero() {
    return (
        <>
        <div className='bg-black text-white font-montserrat max-w-10xl mx-auto'>
            <div className='flex flex-col md:justify-around md:flex-row'>
                <div className='order-2 flex justify-center flex-col text-center md:order-1 text-[32px] md:text-[60px] m-8'>
                    <h1>Salut, je suis Stéphane</h1>
                    <h2 className='text-[24px] md:text-[32px] mt-4'>Développeur <span className='text-yellow'>Full-Stack</span></h2>
                    <p className='text-[18px] mt-5'>De la paie au code : après 20 ans en ressources humaines, je me reconvertis dans le développement full-stack pour allier rigueur et créativité.</p>
                    <p className='text-[14px] italic mt-5'>Développeur full-stack en devenir, je combine mon expérience en gestion de projets et mon sens du collectif pour créer des applications performantes et centrées utilisateur. Musicien et pâtissier amateur, je crois que la passion et la précision font la différence – même dans le code !</p>
                </div>
                <div className='order-1 flex justify-center'>
                    <img className='w-[91px] h-[118px] md:w-[324px] md:h-[435px] md:w-1/5 rounded-lg border-2 border-yellow'src={ HeroPhoto } alt="Photo de Stéphane Moreel" />
                </div>
            </div>
            <button className='flex justify-center w-screen'>
                <a href="#download" className='bg-yellow text-black font-montserrat text-[14px] rounded-full px-6 py-3 hover:bg-white hover:text-black hover:font-bold'>Télécharger mon CV</a>
            </button>
        </div>
        </>
      );
}

export default Hero
