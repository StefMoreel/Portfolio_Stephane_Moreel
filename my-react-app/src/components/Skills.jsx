import SkillCard from "./SkillCard";
import HtmlLogo from '../assets/logos/icons8-html-5-48.png';



function Skills() {
    return ( 
        <section className="mt-10">
            <h2 className="text-[24px] font-bold md:text-[32px] mt-4 mb-10">Compétences <span className="text-yellow">Techniques</span></h2>
            <div className="flex flex-wrap md:flex-nowrap justify-center gap-8 md:mx-28">
            <SkillCard 
                title="Front-End & Intégration"
                subtitle="Des interfaces modernes, responsives et dynamiques."
                icons={[HtmlLogo, HtmlLogo, HtmlLogo]} // Remplacez par les vraies icônes
                description="Maîtrise des technologies pour créer des expériences utilisateur fluides et accessibles."/>
            <SkillCard 
                title="Front-End & Intégration"
                subtitle="Des interfaces modernes, responsives et dynamiques."
                icons={[HtmlLogo, HtmlLogo, HtmlLogo]} // Remplacez par les vraies icônes
                description="Maîtrise des technologies pour créer des expériences utilisateur fluides et accessibles."/>
                            <SkillCard 
                title="Front-End & Intégration"
                subtitle="Des interfaces modernes, responsives et dynamiques."
                icons={[HtmlLogo, HtmlLogo, HtmlLogo]} // Remplacez par les vraies icônes
                description="Maîtrise des technologies pour créer des expériences utilisateur fluides et accessibles."/>
            </div>
        </section>
     );
}

export default Skills;