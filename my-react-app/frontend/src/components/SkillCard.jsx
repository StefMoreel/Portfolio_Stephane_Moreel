function SkillCard({title, subtitle, description, icons}) {
    return ( 
        <div className=" 
                w-full 
                md:max-w-[400px] 
                lg:max-w-[385px]
                xl:max-w-[385px] 
                h-full 
                md:min-h-[400px] 
                lg:min-h-[450px]
                xl:min-h-[450px] 
                flex 
                flex-col 
                justify-between 
                bg-gradient-to-b from-black to-grey md:bg-none
                md:bg-black 
                p-3 
                mx-8 
                md:mx-0 
                rounded-lg 
                shadow-lg 
                text-center border-2
                border-yellow hover:border-blue transition duration-300">
            <h3 className="
                flex text-[14px] font-semibold mb-2
                justify-center items-center
                md:text-xl 
                md:mb-3
                lg:text-2xl 
                lg:mb-4
                xl:text-3xl 
                xl:mb-6">
                    {title}
            </h3>
            <h4 className="
                items-center 
                text-[12px]
                text-yellow 
                font-bold 
                md:text-[14px]
                lg:text-lg
                xl:text-xl">
                    {subtitle}
            </h4>
            <div className="flex-1 flex flex-wrap items-center justify-center gap-2 md:gap-4 lg:gap-6 xl:gap-6 p-4 md:p-0 lg:p-2 xl:p-4">
                {icons.map((icon, index) => (
                    <img 
                        key={index} 
                        src={icon} 
                        alt={`Icone de compétence ${index + 1}`} 
                        className="
                            size-10
                            md:size-10
                            lg:size-12
                            xl:size-16"
                        loading="lazy"
                        decoding="async"
                    />  
                ))}
            </div>                
            <p className="
                text-[10px] 
                italic
                md:text-[12px]
                lg:text-[14px] 
                xl:text-[18px]">
                    {description}
            </p>
        </div>
     );
}

export default SkillCard;
