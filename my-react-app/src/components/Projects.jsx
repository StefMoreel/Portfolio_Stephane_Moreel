import ProjectCard from "./ProjectCard.jsx";
import KasaProject from '../assets/Kasa.png';


function Projects() {
    return (
        <section className="bg-black md:bg-gradient-black pt-10 md:py-10" id="projects"> 
            <div>
                <h2 className="text-[24px] font-bold md:text-[32px] mt-4">Mes <span className="text-yellow md:text-white">Projets</span></h2>
            </div >
            <div className="flex flex-wrap md:flex-nowrap justify-center gap-4 md:mx-16">
                <ProjectCard 
                    imgProject={KasaProject}
                    titleProject="Kasa"
                    descriptionProject="Application web de location immobilière"
                    tags="React"
                    urlProject="https://stefmoreel.github.io/Kasa/"
                    
                    />
                    <ProjectCard 
                    imgProject={KasaProject}
                    titleProject="Kasa"
                    descriptionProject="Application web de location immobilière"
                    tags="React"
                    urlProject="https://stefmoreel.github.io/Kasa/"
                    
                    />
                                        <ProjectCard 
                    imgProject={KasaProject}
                    titleProject="Kasa"
                    descriptionProject="Application web de location immobilière"
                    tags="React"
                    urlProject="https://stefmoreel.github.io/Kasa/"
                    
                    />
            </div>                
                             
                

            

        </section>
     );
}

export default Projects;