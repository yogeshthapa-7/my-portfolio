'use client'
import { useEffect, useState, useRef } from 'react'

interface Project {
    id: number
    title: string
    description: string
    tech: string[]
    gradient: string
    category: string
    year: string
    link?: string
}

export default function Projects() {
    const [isVisible, setIsVisible] = useState(false)
    const [hoveredCard, setHoveredCard] = useState<number | null>(null)
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

    const projects: Project[] = [
        {
            id: 1,
            title: "E-Commerce Platform",
            description: "A full-stack e-commerce solution with real-time inventory, payment processing, and admin dashboard. Built with modern technologies for optimal performance.",
            tech: ["Next.js", "Stripe", "MongoDB", "Tailwind"],
            gradient: "from-purple-500 to-pink-500",
            category: "Web App",
            year: "2024"
        },
        {
            id: 2,
            title: "Task Management System",
            description: "Collaborative task management platform with real-time updates, team collaboration features, and advanced analytics dashboard.",
            tech: ["React", "Node.js", "Socket.io", "PostgreSQL"],
            gradient: "from-blue-500 to-cyan-500",
            category: "SaaS",
            year: "2024"
        },
        {
            id: 3,
            title: "Portfolio Generator",
            description: "AI-powered portfolio generator that creates stunning, customizable portfolios in minutes. Features drag-and-drop interface and real-time preview.",
            tech: ["Next.js", "OpenAI", "Framer Motion", "Supabase"],
            gradient: "from-emerald-500 to-teal-500",
            category: "Tool",
            year: "2023"
        },
        {
            id: 4,
            title: "Social Media Dashboard",
            description: "Unified dashboard for managing multiple social media accounts. Schedule posts, track analytics, and engage with audience from one place.",
            tech: ["React", "Firebase", "Chart.js", "Material-UI"],
            gradient: "from-orange-500 to-red-500",
            category: "Dashboard",
            year: "2023"
        },
        {
            id: 5,
            title: "AI Chat Application",
            description: "Real-time chat application powered by AI for smart responses, language translation, and sentiment analysis.",
            tech: ["Next.js", "WebSocket", "TensorFlow", "Redis"],
            gradient: "from-violet-500 to-purple-500",
            category: "AI",
            year: "2024"
        },
        {
            id: 6,
            title: "Fitness Tracking App",
            description: "Mobile-first fitness app with workout plans, progress tracking, nutrition calculator, and community features.",
            tech: ["React Native", "Express", "MongoDB", "AWS"],
            gradient: "from-pink-500 to-rose-500",
            category: "Mobile",
            year: "2023"
        }
    ]

    return (
        <section ref={sectionRef} id="projects" className="relative py-32 md:py-48 bg-black overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
            </div>

            <div className="container relative z-10">
                {/* Section Title */}
                <div className="text-center mb-24">
                    <div
                        className={`inline-block transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                            }`}
                    >
                        <p className="text-purple-400 text-sm tracking-widest mb-6 uppercase">Portfolio</p>
                        <h2
                            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 text-gradient tracking-tight"
                        >
                            Featured Work
                        </h2>
                        <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                            A collection of projects that showcase my skills in design, development, and problem-solving
                        </p>
                    </div>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {projects.map((project, index) => (
                        <div
                            key={project.id}
                            className={`group relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                }`}
                            style={{ transitionDelay: `${index * 100}ms` }}
                            onMouseEnter={() => setHoveredCard(project.id)}
                            onMouseLeave={() => setHoveredCard(null)}
                        >
                            {/* Card */}
                            <div
                                className="relative h-full glass-panel rounded-3xl overflow-hidden transition-all duration-500 hover:border-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-2"
                            >
                                {/* Gradient overlay on hover */}
                                <div
                                    className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                                />

                                {/* Content */}
                                <div className="relative p-8 h-full flex flex-col">
                                    {/* Category badge */}
                                    <div className="flex items-center justify-between mb-8">
                                        <span className="px-3 py-1 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-xs text-gray-400 uppercase tracking-wider">
                                            {project.category}
                                        </span>
                                        <span className="text-gray-500 text-sm font-mono">{project.year}</span>
                                    </div>

                                    {/* Project number */}
                                    <div
                                        className={`text-6xl font-bold mb-6 bg-gradient-to-br ${project.gradient} bg-clip-text text-transparent opacity-20 group-hover:opacity-100 transition-opacity duration-500`}
                                    >
                                        0{project.id}
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-2xl font-bold text-white mb-4 leading-tight group-hover:text-purple-400 transition-colors">
                                        {project.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-grow">
                                        {project.description}
                                    </p>

                                    {/* Tech stack */}
                                    <div className="flex flex-wrap gap-2 mb-8">
                                        {project.tech.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-3 py-1 bg-white/5 backdrop-blur-sm rounded-lg text-xs text-gray-300 border border-white/10 group-hover:border-purple-500/20 transition-colors"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Links */}
                                    <div className="flex gap-4 mt-auto">
                                        <a
                                            href="#"
                                            className="flex-1 text-center px-4 py-3 text-sm bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white hover:bg-white/10 hover:border-purple-500/50 transition-all group/btn"
                                        >
                                            <span className="flex items-center justify-center gap-2">
                                                View Live
                                                <svg
                                                    className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                </svg>
                                            </span>
                                        </a>
                                        <a
                                            href="#"
                                            className="px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white hover:bg-white/10 hover:border-purple-500/50 transition-all"
                                            aria-label="View Source Code"
                                        >
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>

                                {/* Hover effect line */}
                                <div
                                    className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r ${project.gradient} transform origin-left transition-transform duration-500 ${hoveredCard === project.id ? 'scale-x-100' : 'scale-x-0'
                                        }`}
                                    style={{ width: '100%' }}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All Projects CTA */}
                <div
                    className={`text-center mt-20 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}
                >
                    <a
                        href="#"
                        className="inline-flex items-center gap-3 px-8 py-4 glass-panel border border-white/10 rounded-full hover:bg-white/10 hover:border-purple-500/50 transition-all group"
                    >
                        <span className="font-semibold text-white">View All Projects</span>
                        <svg
                            className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    )
}
