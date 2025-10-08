import React from 'react'
import NavBar from './components/NavBar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import SoftSkills from './components/SoftSkills.jsx'
import Projects from './components/Projects.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'



function App() {
 return (
   <div className='text-white font-montserrat max-w-10xl mx-auto'>
    <NavBar />
    <Hero />
    <About />
    <Skills />
    <SoftSkills />
    <Projects />
    <Contact />
    <Footer />
    </div>
 )
}
     
export default App
