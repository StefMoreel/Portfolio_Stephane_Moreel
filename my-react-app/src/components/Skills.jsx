import SkillCard from "./SkillCard";
import { SiRender } from 'react-icons/si';
import { SiVercel } from 'react-icons/si';
import HtmlLogo from '../assets/logos/icons8-html-5-48.png';



function Skills() {
    return ( 
        <section className="mt-10">
            <h2 className="text-[24px] font-bold md:text-[32px] mt-4 mb-10">Compétences <span className="text-yellow">techniques</span></h2>
            <SkillCard 
                title="Front-End & Intégration"
                subtitle="Des interfaces modernes, responsives et dynamiques."
                icon={<img src={HtmlLogo} alt="HTML5 Logo" className="w-12 h-12 mx-auto mb-4" />}
                description="Maîtrise des technologies pour créer des expériences utilisateur fluides et accessibles."/>

        </section>
     );
}

export default Skills;