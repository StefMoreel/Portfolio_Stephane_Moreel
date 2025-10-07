import React from "react";

function SolfSkillCard({icon, title, description}) {
    return (
        <div className="flex justify-center items-center gap-3 w-[140px] h-[88px] flex-col bg-gradient-to-r from-black to-yellow p-3 rounded-lg shadow-lg text-center hover:border-2 border-blue transition duration-300">
            {icon && React.cloneElement(icon, { className: "size-6" })}
            <h3 className="text-[14px] font-semibold mb-2">{title}</h3>
            <p className="hidden text-[10px] italic">{description}</p>
        </div>
    );
}

export default SolfSkillCard;