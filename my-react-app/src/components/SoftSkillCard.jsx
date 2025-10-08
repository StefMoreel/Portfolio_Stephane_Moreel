function SolfSkillCard({icon, title, description}) {
    return (
        <div className="flex flex-col items-center w-32 md:w-60 bg-gradient-to-r from-black to-yellow md:bg-none md:bg-black p-3 rounded-2xl shadow-lg text-center hover:border-2 border-blue transition duration-300">
            {icon}
            <h3 className="text-[14px] font-semibold mb-2">{title}</h3>
            <p className="hidden md:block text-[10px] italic">{description}</p>
        </div>
    );
}

export default SolfSkillCard;