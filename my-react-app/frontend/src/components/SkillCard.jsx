function SkillCard({title, subtitle, description, icons}) {
    return ( 
        <div className="flex flex-col justify-center bg-gradient-to-b from-black to-grey md:bg-none md:bg-black p-3 mx-8 md:mx-0 rounded-lg shadow-lg text-center border-2 border-yellow hover:border-blue transition duration-300">
            <h3 className="text-[14px] font-semibold mb-2 lg:text-3xl lg:mb-6">{title}</h3>
            <h4 className="text-[12px] mb-2 text-yellow font-bold lg:text-xl lg:mb-6">{subtitle}</h4>
            <div className="flex justify-center">
                {icons.map((icon, index) => (
                    <img 
                        key={index} 
                        src={icon} 
                        alt={`Icone de compétence ${index + 1}`} 
                        className="size-10 lg:size-16"/>
                ))}
            </div>                
            <p className="text-[10px] italic lg:text-[18px] lg:mt-6">{description}</p>
        </div>
     );
}

export default SkillCard;
