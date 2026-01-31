import Header from './components/header'
import Hero from './components/hero'
import About from './components/about'
import Projects from './components/projects'
import Contact from './components/contact'
import Footer from './components/footer'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Your Name - Creative Developer Portfolio',
    description: 'Full-stack developer specializing in modern web technologies. Creating digital experiences that blend aesthetics with functionality.',
    keywords: ['Next.js', 'React', 'Web Developer', 'Portfolio', 'Full Stack Developer'],
}

export default function Home() {
    return (
        <>
            <Header />
            <main className="overflow-x-hidden">
                <Hero />
                <About />
                <Projects />
                <Contact />
            </main>
            <Footer />
        </>
    )
}
