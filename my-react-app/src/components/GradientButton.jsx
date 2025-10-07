function GradientButton({title, link}) {
    return ( 
        <button className="bg-gradient-to-b from-black to-yellow text-white py-2 px-4 rounded-full hover:font-bold">
            {title}
            {link}
        </button>
     );
}

export default GradientButton;