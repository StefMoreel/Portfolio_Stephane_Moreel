function SkillCard({title, subtitle, description, icon}) {
    return ( 
        <div className="bg-gradient-to-b from-black to-grey p-3 m-8 rounded-lg shadow-lg text-center border-2 border-yellow hover:border-blue transition duration-300">
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <h4 className="text-md font-medium mb-2 text-yellow" font-bold>{subtitle}</h4>
            <div className="mt-4">
                {icon}
            </div>
            <p className="text-sm italic">{description}</p>
        </div>
     );
}

export default SkillCard;
