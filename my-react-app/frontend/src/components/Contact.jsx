import Links from "./Links.jsx";
import { HiMail } from 'react-icons/hi';
import { FaLinkedinIn } from 'react-icons/fa6';
import { FaGithub } from 'react-icons/fa6';
import { useState } from "react";

function Contact() {
    const [state, setState] = useState({ firstName:'', lastName:'', email:'', message:'' });
    const [status, setStatus] = useState(null);

  async function onSubmit(e) {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify(state),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus('success');
      setState({ firstName:'', lastName:'', email:'', message:'' });
    } catch (err) {
      setStatus('error');
    }
  }
    return ( 
        <section className="bg-black md:bg-gradient-yellow py-10" id="contact">
            <div>
                <h2 className="text-[24px] font-bold md:text-[32px] ">Contactez- <span className="text-yellow md:text-white">Moi</span></h2>
            </div>
            <div className="mt-10 mx-8 md:mx-50 lg:mx-[500px]">
                <form onSubmit={onSubmit} className="flex flex-col gap-4">
                      <label hidden id="firstNameLabel" htmlFor="firstName">Prénom</label>
                        <input aria-labelledby="firstNameLabel" value={state.firstName} onChange={e=>setState(s=>({...s, firstName:e.target.value}))} name="firstName" placeholder="Prénom" required className="font-bold border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue md:bg-black"/>
                      <label hidden id="lastNameLabel" htmlFor="lastName">Nom</label>  
                        <input aria-labelledby="lastNameLabel" value={state.lastName}  onChange={e=>setState(s=>({...s, lastName:e.target.value}))}  name="lastName"  placeholder="Nom" required className="font-bold border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue md:bg-black" />
                      <label id="emailLabel" hidden htmlFor="email">email</label>  
                        <input aria-labelledby="emailLabel" value={state.email}     onChange={e=>setState(s=>({...s, email:e.target.value}))}     name="email"     type="email" placeholder="Votre email" required className="font-bold border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue md:bg-black" />
                      <label id="messageLabel" hidden htmlFor="message">message</label>
                        <textarea aria-labelledby="messageLabel" value={state.message} onChange={e=>setState(s=>({...s, message:e.target.value}))} name="message" rows="5" placeholder="Votre message" required className="font-bold border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue md:bg-black" />
                    <button type="submit" disabled={status==='loading'} className="bg-gradient-to-b from-black to-yellow text-white text-xl py-2 px-4 rounded-full hover:font-bold lg:mx-50 h-[50px]">
                        {status === 'loading' && <span>Envoi en cours...</span>}ENVOYER
                    </button>
                    {status === 'success' && <p className="text-green-400">Merci, votre message a bien été envoyé.</p>}
                    {status === 'error'   && <p className="text-red-400">Oups, une erreur est survenue.</p>}
                </form>
            </div>
            <h2 className="text-center text-[16px] lg:text-2xl font-bold m-4 lg:m-10">Ou contactez-<span className="text-yellow">moi </span>sur</h2>
            <div className='flex justify-center gap-8 text-[32px] lg:text-6xl text-white'>
                <Links 
                    link="https://www.linkedin.com/in/stéphane-moreel-0a85a2119/"
                    ariaLabel="Lien vers mon profil LinkedIn"
                    icon={<FaLinkedinIn />}
                />
                <Links  
                    link="https://www.github.com/StefMoreel/"
                    ariaLabel="Lien vers mon profil GitHub"
                    icon={<FaGithub />}
                />
                <Links  
                    link="mailto:stef.ksp@gmail.com"
                    ariaLabel="Lien pour m'envoyer un email"
                    icon={<HiMail />}
                />
            </div>
        </section>
     );
}

export default Contact;