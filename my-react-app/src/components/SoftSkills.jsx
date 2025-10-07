import SoftSkillsCard from './SoftSkillCard.jsx';
import softSkillsData from '../data/softSkillsData.json';

function SoftSkills() {
    return (
        <section>
            <div className="text-center mt-10 " id="softskills">
                <h2 className="text-[24px] font-bold md:text-[32px] mt-4">Soft <span className="text-yellow">Skills</span></h2>
                <p>Mon expérience en ressources humaines m’a appris à allier rigueur, écoute et collaboration, des qualités que j’applique aujourd’hui au développement full-stack.</p>
                <p>Voici ce que je peux apporter à votre équipe :</p>
            </div>
            <div className="flex justify-center flex-wrap gap-6 mx-8 md:mx-28 mt-8 mb-8">
                {softSkillsData.map((skill) => (
                    <SoftSkillsCard
                        key={skill.id}
                        title={skill.title}
                        icon={<img src={skill.icon} alt={skill.title} className="size-6" />}
                        description={skill.description}
                    />
                ))} 

            </div>
        </section>
     );
}

export default SoftSkills;