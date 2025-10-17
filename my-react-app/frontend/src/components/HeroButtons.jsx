import React from "react";

function Button({ title, icon, pdfURL, link }) {
  return (
    <a
      className="
      bg-yellow
      text-black 
      font-montserrat 
      text-[18px] 
      font-bold 
      rounded-full 
      px-6 py-3 
      hover:bg-blue 
      hover:text-black 
      hover:font-bold 
      flex 
      gap-3 
      items-center 
      justify-center 
      md:w-[300px] 
      mx-10 
      mb-5"
      href={pdfURL || link} // Utilise pdfURL ou link selon ce qui est passé
      {...(pdfURL ? { target: "_blank", rel: "noopener noreferrer" } : {})} // Ajoute target="_blank" uniquement pour les PDF
    >
      {icon}
      {title}
    </a>
  );
}

export default Button;
