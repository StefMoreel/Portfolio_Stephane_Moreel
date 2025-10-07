import SoftSkillsCard from './SoftSkillCard.jsx';

function SoftSkills() {
    return (
        <section>
            <div className="text-center mt-10 mb-20>" id="softskills">
                <h2 className="text-[24px] font-bold md:text-[32px] mt-4">Soft <span className="text-yellow">Skills</span></h2>
                <p>Mon expérience en ressources humaines m’a appris à allier rigueur, écoute et collaboration, des qualités que j’applique aujourd’hui au développement full-stack.</p>
                <p>Voici ce que je peux apporter à votre équipe :</p>
            </div>
            <div className="flex flex-wrap justify-center gap-6 mt-8 mb-10 mx-8">
                <SoftSkillsCard
                    icon={<img src="https://img.icons8.com/ios-filled/50/000000/teamwork.png" alt="Teamwork Icon"/>}
                    title="Empathie"
                    description="Comprendre les besoins des utilisateurs et des équipes pour concevoir des solutions adaptées."
                />
                <SoftSkillsCard
                    icon={<img src="https://img.icons8.com/ios-filled/50/000000/teamwork.png" alt="Teamwork Icon"/>}
                    title="Empathie"
                    description="Comprendre les besoins des utilisateurs et des équipes pour concevoir des solutions adaptées."
                />
                <SoftSkillsCard
                    icon={<img src="https://img.icons8.com/ios-filled/50/000000/teamwork.png" alt="Teamwork Icon"/>}
                    title="Empathie"
                    description="Comprendre les besoins des utilisateurs et des équipes pour concevoir des solutions adaptées."
                />
            </div>
        </section>
     );
}

export default SoftSkills;