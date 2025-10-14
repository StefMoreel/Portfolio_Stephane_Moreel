function SolfSkillCard({icon, title, description}) {
    return (
        <div className="
            flex 
            flex-col 
            items-center
            justify-center
            gap-3
            w-full
            max-w-[250px]
            md:max-w-[385px]
            lg:max-w-[385px]
            xl:max-w-[385px]
            bg-gradient-to-r from-black to-yellow md:bg-none
            md:bg-black 
            p-4
            rounded-2xl 
            shadow-lg 
            text-center 
            hover:border-2 border-blue transition duration-300">
            {icon}
            <h3 className="
                text-[12px] 
                md:text-xl
                lg:text-2xl 
                font-semibold 
                mb-2 
                lg:my-6
                flex-1">
                    {title}
            </h3>
            <p className="
                hidden 
                md:block 
                text-[10px] 
                md:text-[12px]
                lg:text-[16px] 
                italic">
                    {description}
            </p>
        </div>
    );
}

export default SolfSkillCard;