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
                  <label htmlFor="firstName" className="sr-only">Prénom</label>
                  <input
                    id="firstName"
                    name="firstName"
                    placeholder="Prénom"
                    autoComplete="given-name"
                    required
                    value={state.firstName}
                    onChange={e => setState(s => ({ ...s, firstName: e.target.value }))}
                    className="font-bold border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue md:bg-black"
                  />

                  <label htmlFor="lastName" className="sr-only">Nom</label>
                  <input
                    id="lastName"
                    name="lastName"
                    placeholder="Nom"
                    autoComplete="family-name"
                    required
                    value={state.lastName}
                    onChange={e => setState(s => ({ ...s, lastName: e.target.value }))}
                    className="font-bold border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue md:bg-black"
                  />

                  <label htmlFor="email" className="sr-only">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Votre email"
                    autoComplete="email"
                    inputMode="email"
                    required
                    value={state.email}
                    onChange={e => setState(s => ({ ...s, email: e.target.value }))}
                    className="font-bold border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue md:bg-black"
                  />

                  <label htmlFor="message" className="sr-only">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    placeholder="Votre message"
                    required
                    value={state.message}
                    onChange={e => setState(s => ({ ...s, message: e.target.value }))}
                    className="font-bold border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue md:bg-black"
                  />

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="bg-gradient-to-b from-black to-yellow text-white text-xl py-2 px-4 rounded-full hover:font-bold lg:mx-50 h-[50px]"
                    aria-busy={status === 'loading'}
                  >
                    {status === 'loading' ? 'Envoi en cours…' : 'ENVOYER'}
                  </button>

                  {status === 'success' && (
                    <p className="text-green-400" role="status">Merci, votre message a bien été envoyé.</p>
                  )}
                  {status === 'error' && (
                    <p className="text-red-400" role="alert">Oups, une erreur est survenue.</p>
                  )}
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