import { useState, useRef } from "react";
import { IoIosArrowUp } from 'react-icons/io';



function ProjectCard({imgProject, titleProject, descriptionProject, tags, urlProject}) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const contentRef = useRef(null);
    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    
    }
const buttonText = isCollapsed ? 'Moins de détails' : 'Plus de détails';
    return ( 
        <div className="bg-white mx-8 md:mx-0 mt-8 rounded-lg shadow-lg text-center">
            <div className="flex flex-col justify-center items-center w-full"> 
                <div className="w-full h-full overflow-hidden rounded-t-lg">
                    <img src={imgProject} alt="Photo du projet"/>
                </div>
                <div className="flex items-center justify-between bg-gradient-to-b from-yellow to-black p-3 px-4 rounded-full shadow-lg text-center w-32 h-5 lg:w-55 lg:h-10 mb-4">
                    <h3 className="text-[9px] lg:text-[18px] font-semibold">{buttonText}</h3>
                    <button onClick={toggleCollapse}>
                        <IoIosArrowUp className={`size-4 border-1 border-white rounded-full ${isCollapsed ? '' : 'transform rotate-180'}`} />
                    </button>
                </div>
            </div>
            <div className="bg-gradient-to-t from-black to-yellow flex flex-col items-center justify-center w-full rounded-b-lg">
                <div 
                    ref={contentRef}
                    style={{
                        maxHeight: isCollapsed ? `${contentRef.current.scrollHeight}px` : '0px',
                        overflow: 'hidden',
                        transition: 'max-height 0.3s ease',
                    }}
                >
                    <div className="flex flex-col text-center text-black gap-2 p-2 lg:pb-4">
                        <h2>{titleProject}</h2>
                        <p className="font-semibold text-[10px] lg:text-[18px]">{descriptionProject}</p>
                        <div className="flex justify-center gap-2 m-2">
                            <li className="text-white bg-black rounded-full text-[9px] lg:text-[16px] p-1 px-3 list-none">{tags}</li>
                            <li className="text-white bg-black rounded-full text-[9px] lg:text-[16px] p-1 px-3 list-none">Sass</li>
                        </div>
                        <a href={urlProject} className="flex justify-center items-center bg-gradient-to-b from-black to-yellow rounded-full text-white font-semibold text-[15px] lg:text-[18px] h-10">Voir le projet</a>
                    </div>
                </div>
            </div>

        </div>
     );
}

export default ProjectCard;