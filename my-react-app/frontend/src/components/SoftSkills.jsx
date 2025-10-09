import SoftSkillsCard from './SoftSkillCard.jsx';
import softSkillsData from '../data/softSkillsData.json';

function SoftSkills() {
    return (
        <section className='bg-black md:bg-gradient-yellow pt-10 md:py-10'>
            <div className="text-center" id="softskills">
                <h2 className="text-[24px] font-bold md:text-[32px] mt-4">Soft <span className="text-yellow md:text-white">Skills</span></h2>
                <p className='text-[13px] md:text-xl lg:text font-semibold mt-5 mx-8 md:mx-48 lg:mx-72'>Mon expérience en ressources humaines m’a appris à allier rigueur, écoute et collaboration, des qualités que j’applique aujourd’hui au développement full-stack.</p>
                <p className='text-[13px] md:text-xl lg:text font-semibold mt-5 mx-8 md:mx-48 lg:mx-72'>Voici ce que je peux apporter à votre équipe :</p>
            </div>
            <div className="flex justify-center flex-wrap gap-6 mx-8 md:mx-14 lg:mx-60 mt-8 lg:my-20">
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