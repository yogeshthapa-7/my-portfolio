'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Header() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navLinks = [
        { name: 'About', href: '#about' },
        { name: 'Projects', href: '#projects' },
        { name: 'Contact', href: '#contact' }
    ]

    return (
        <header
            className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled
                    ? 'bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-2xl'
                    : 'bg-transparent'
                }`}
        >
            <nav className="container py-4 md:py-5">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="group flex items-center gap-3"
                    >
                        <div className="relative">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center transform group-hover:rotate-180 transition-transform duration-500">
                                <span className="text-white font-bold text-xl">Y</span>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg blur opacity-50 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <span
                            className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 transition-all tracking-tight"
                        >
                            Yogesh Thapa
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="relative text-gray-300 hover:text-white transition-colors group text-sm font-medium tracking-wide"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-300" />
                            </a>
                        ))}

                        {/* CTA Button */}
                        <a
                            href="#contact"
                            className="relative px-6 py-2.5 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold text-sm rounded-lg overflow-hidden group shadow-lg shadow-purple-500/20"
                        >
                            <span className="relative z-10">Hire Me</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden relative w-10 h-10 text-white focus:outline-none"
                        aria-label="Toggle menu"
                    >
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <span
                                className={`block w-6 h-0.5 bg-white mb-1.5 transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                                    }`}
                            />
                            <span
                                className={`block w-6 h-0.5 bg-white mb-1.5 transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''
                                    }`}
                            />
                            <span
                                className={`block w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                                    }`}
                            />
                        </div>
                    </button>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`md:hidden overflow-hidden transition-all duration-500 ${mobileMenuOpen ? 'max-h-96 mt-4' : 'max-h-0'
                        }`}
                >
                    <div className="py-4 space-y-2 bg-zinc-900/90 backdrop-blur-lg rounded-2xl border border-white/10 px-4">
                        {navLinks.map((link, index) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="block p-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                                style={{ transitionDelay: `${index * 50}ms` }}
                            >
                                {link.name}
                            </a>
                        ))}
                        <a
                            href="#contact"
                            onClick={() => setMobileMenuOpen(false)}
                            className="block w-full mt-4 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-center font-semibold rounded-xl hover:shadow-lg transition-all"
                        >
                            Hire Me
                        </a>
                    </div>
                </div>
            </nav>
        </header>
    )
}
