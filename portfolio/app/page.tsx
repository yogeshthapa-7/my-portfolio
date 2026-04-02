'use client'

import React from 'react'

import Header from './components/header'
import Footer from './components/footer'
import Hero from './components/hero'
import About from './components/about'
import Contact from './components/contact'
import Skills from './components/skills'
import Projects from './components/projects'
import Qualification from './components/qualification'

const home = () => {

return (

<>
  <Header />
  <Hero />
  <Skills />
  <Projects />
  <Qualification />
  <About />
  <Contact />
  <Footer />
</>

)

}

export default home
