'use client'
import { useEffect, useState, useRef, FormEvent } from 'react'

export default function Contact() {
    const [isVisible, setIsVisible] = useState(false)
    const [formData, setFormData] = useState({ name: '', email: '', message: '' })
    const [focusedField, setFocusedField] = useState<string | null>(null)
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                }
            },
            { threshold: 0.1 }
        )

        if (sectionRef.current) {
            observer.observe(sectionRef.current)
        }

        return () => observer.disconnect()
    }, [])

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        console.log('Form submitted:', formData)
        // Add toast or notification logic here
    }

    const socialLinks = [
        {
            name: 'GitHub',
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
            ),
            href: 'https://github.com/yogeshthapa-7',
            gradient: 'from-gray-600 to-gray-800',
            hoverColor: 'hover:border-gray-500'
        },
        {
            name: 'LinkedIn',
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
            ),
            href: 'https://www.linkedin.com/in/yogesh-thapa',
            gradient: 'from-blue-600 to-blue-800',
            hoverColor: 'hover:border-blue-500'
        },
        {
            name: 'Email',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            href: 'mailto:yogsthapa@gmail.com',
            gradient: 'from-purple-600 to-pink-600',
            hoverColor: 'hover:border-purple-500'
        }
    ]

    return (
        <section ref={sectionRef} id="contact" className="relative py-32 md:py-48 bg-gradient-to-b from-black via-zinc-900/50 to-black overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
            </div>

            <div className="container relative z-10">
                {/* Section Title */}
                <div className="text-center mb-24">
                    <div
                        className={`inline-block transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                            }`}
                    >
                        <p className="text-purple-400 text-sm tracking-widest mb-6 uppercase">Get In Touch</p>
                        <h2
                            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 text-gradient tracking-tight"
                        >
                            Let's Talk
                        </h2>
                        <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                            Have a project in mind or just want to chat? I'd love to hear from you.
                        </p>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
                    {/* Contact Form */}
                    <div
                        className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                            }`}
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name Input */}
                            <div className="relative group">
                                <input
                                    type="text"
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    onFocus={() => setFocusedField('name')}
                                    onBlur={() => setFocusedField(null)}
                                    className="w-full px-6 py-4 bg-white/5 backdrop-blur-sm border-2 border-white/10 rounded-2xl text-white text-lg placeholder-transparent focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all peer"
                                    placeholder="Your Name"
                                    required
                                />
                                <label
                                    htmlFor="name"
                                    className={`absolute left-6 transition-all duration-200 pointer-events-none ${focusedField === 'name' || formData.name
                                            ? '-top-3 text-sm bg-black px-2 text-purple-400'
                                            : 'top-4 text-gray-500 peer-focus:-top-3 peer-focus:text-sm peer-focus:bg-black peer-focus:px-2 peer-focus:text-purple-400'
                                        }`}
                                >
                                    Your Name
                                </label>
                            </div>

                            {/* Email Input */}
                            <div className="relative group">
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    onFocus={() => setFocusedField('email')}
                                    onBlur={() => setFocusedField(null)}
                                    className="w-full px-6 py-4 bg-white/5 backdrop-blur-sm border-2 border-white/10 rounded-2xl text-white text-lg placeholder-transparent focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all peer"
                                    placeholder="Your Email"
                                    required
                                />
                                <label
                                    htmlFor="email"
                                    className={`absolute left-6 transition-all duration-200 pointer-events-none ${focusedField === 'email' || formData.email
                                            ? '-top-3 text-sm bg-black px-2 text-purple-400'
                                            : 'top-4 text-gray-500 peer-focus:-top-3 peer-focus:text-sm peer-focus:bg-black peer-focus:px-2 peer-focus:text-purple-400'
                                        }`}
                                >
                                    Your Email
                                </label>
                            </div>

                            {/* Message Input */}
                            <div className="relative group">
                                <textarea
                                    id="message"
                                    rows={6}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    onFocus={() => setFocusedField('message')}
                                    onBlur={() => setFocusedField(null)}
                                    className="w-full px-6 py-4 bg-white/5 backdrop-blur-sm border-2 border-white/10 rounded-2xl text-white text-lg placeholder-transparent focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all resize-none peer"
                                    placeholder="Your Message"
                                    required
                                />
                                <label
                                    htmlFor="message"
                                    className={`absolute left-6 transition-all duration-200 pointer-events-none ${focusedField === 'message' || formData.message
                                            ? '-top-3 text-sm bg-black px-2 text-purple-400'
                                            : 'top-4 text-gray-500 peer-focus:-top-3 peer-focus:text-sm peer-focus:bg-black peer-focus:px-2 peer-focus:text-purple-400'
                                        }`}
                                >
                                    Your Message
                                </label>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="group relative w-full px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-lg font-semibold rounded-2xl overflow-hidden transition-all hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-[1.02] active:scale-[0.98]"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    Send Message
                                    <svg
                                        className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 transform translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                            </button>
                        </form>
                    </div>

                    {/* Contact Info & Social */}
                    <div
                        className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                            }`}
                    >
                        {/* Info Cards */}
                        <div className="space-y-6 mb-12">
                            {/* Location */}
                            <div className="glass-panel p-6 rounded-2xl hover:border-purple-500/30 transition-all group">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-purple-500/10 rounded-xl group-hover:bg-purple-500/20 transition-colors">
                                        <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-white text-lg font-semibold mb-1">Location</h3>
                                        <p className="text-gray-400 leading-relaxed">Tinkune, Kathmandu, Nepal</p>
                                    </div>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="glass-panel p-6 rounded-2xl hover:border-blue-500/30 transition-all group">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-blue-500/10 rounded-xl group-hover:bg-blue-500/20 transition-colors">
                                        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-white text-lg font-semibold mb-1">Email</h3>
                                        <a href="mailto: yogsthapa@gmail.com" className="text-gray-400 hover:text-blue-400 transition-colors">
                                            yogsthapa@gmail.com
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Availability */}
                            <div className="glass-panel p-6 rounded-2xl hover:border-emerald-500/30 transition-all group">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-emerald-500/10 rounded-xl group-hover:bg-emerald-500/20 transition-colors">
                                        <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-white text-lg font-semibold mb-1">Availability</h3>
                                        <p className="text-gray-400 leading-relaxed">Open to freelance & full-time opportunities</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div>
                            <h3 className="text-white text-2xl font-semibold mb-8">Connect With Me</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {socialLinks.map((social, index) => (
                                    <a
                                        key={social.name}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`group p-6 glass-panel border border-white/5 rounded-2xl ${social.hoverColor} transition-all hover:bg-white/5 hover:-translate-y-1`}
                                        style={{ animationDelay: `${index * 100}ms` }}
                                    >
                                        <div className={`w-12 h-12 bg-gradient-to-br ${social.gradient} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                                            <div className="text-white">
                                                {social.icon}
                                            </div>
                                        </div>
                                        <p className="text-gray-300 font-medium">{social.name}</p>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
