function SolfSkillCard({icon, title, description}) {
    return (
        <div className="flex flex-col items-center w-32 md:w-60 lg:w-96 bg-gradient-to-r from-black to-yellow md:bg-none md:bg-black p-3 rounded-2xl shadow-lg text-center hover:border-2 border-blue transition duration-300">
            {icon}
            <h3 className="text-[14px] lg:text-2xl font-semibold mb-2 lg:my-6">{title}</h3>
            <p className="hidden md:block text-[10px] lg:text-[16px] italic">{description}</p>
        </div>
    );
}

export default SolfSkillCard;