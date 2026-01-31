'use client'
import { useEffect, useState, useRef } from 'react'

export default function About() {
    const [isVisible, setIsVisible] = useState(false)
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

    const skills = [
        { name: 'React', level: 95, color: 'from-cyan-400 to-blue-500' },
        { name: 'Next.js', level: 90, color: 'from-gray-700 to-gray-900' },
        { name: 'TypeScript', level: 85, color: 'from-blue-500 to-blue-700' },
        { name: 'Tailwind CSS', level: 92, color: 'from-cyan-300 to-teal-500' },
        { name: 'Node.js', level: 80, color: 'from-green-500 to-emerald-600' },
        { name: 'MongoDB', level: 75, color: 'from-green-400 to-green-600' },
    ]

    return (
        <section ref={sectionRef} id="about" className="relative py-32 md:py-48 bg-gradient-to-b from-black via-zinc-900/50 to-black overflow-hidden intro-section">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
            </div>

            <div className="container relative z-10">
                {/* Section Title */}
                <div className="text-center mb-24">
                    <h2
                        className={`text-5xl md:text-7xl lg:text-8xl font-bold mb-8 transition-all duration-1000 text-gradient tracking-tight ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                            }`}
                    >
                        About Me
                    </h2>
                    <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full" />
                </div>

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
                    {/* Large card - Bio */}
                    <div
                        className={`md:col-span-2 glass-panel p-8 md:p-12 rounded-3xl transition-all duration-1000 delay-100 hover:border-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/10 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                            }`}
                    >
                        <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-4">
                            <span className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-xl shadow-lg shadow-purple-500/20">
                                👋
                            </span>
                            Hi, I'm a Developer
                        </h3>
                        <p className="text-gray-300 text-lg leading-relaxed mb-6">
                            I'm a passionate full-stack developer with a keen eye for design and a love for creating
                            seamless digital experiences. My journey in web development started with a curiosity
                            about how things work behind the screen.
                        </p>
                        <p className="text-gray-300 text-lg leading-relaxed">
                            I specialize in building modern, responsive web applications using cutting-edge
                            technologies. When I'm not coding, you can find me exploring new design trends,
                            contributing to open-source projects, or learning something new.
                        </p>
                    </div>

                    {/* Stats card */}
                    <div
                        className={`glass-panel p-8 md:p-12 rounded-3xl transition-all duration-1000 delay-200 hover:border-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/10 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                            }`}
                    >
                        <div className="space-y-8">
                            <div>
                                <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                                    50+
                                </div>
                                <p className="text-gray-400 mt-2 font-medium">Projects Completed</p>
                            </div>
                            <div>
                                <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                                    3+
                                </div>
                                <p className="text-gray-400 mt-2 font-medium">Years Experience</p>
                            </div>
                            <div>
                                <div className="text-5xl font-bold bg-gradient-to-r from-emerald-400 to-purple-400 bg-clip-text text-transparent">
                                    100%
                                </div>
                                <p className="text-gray-400 mt-2 font-medium">Client Satisfaction</p>
                            </div>
                        </div>
                    </div>

                    {/* Skills card */}
                    <div
                        className={`md:col-span-3 glass-panel p-8 md:p-12 rounded-3xl transition-all duration-1000 delay-300 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/10 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                            }`}
                    >
                        <h3 className="text-3xl font-bold text-white mb-10">Technical Skills</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                            {skills.map((skill, index) => (
                                <div key={skill.name} className="group">
                                    <div className="flex justify-between mb-2">
                                        <span className="text-gray-300 font-semibold">{skill.name}</span>
                                        <span className="text-gray-500 text-sm font-mono">{skill.level}%</span>
                                    </div>
                                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out group-hover:scale-[1.02]`}
                                            style={{
                                                width: isVisible ? `${skill.level}%` : '0%',
                                                transitionDelay: `${index * 100}ms`
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Experience card */}
                    <div
                        className={`glass-panel p-8 md:p-10 rounded-3xl transition-all duration-1000 delay-400 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/10 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                            }`}
                    >
                        <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <span className="text-blue-400">🎓</span> Education
                        </h3>
                        <p className="text-gray-300 text-lg mb-2 font-medium">Bachelor's in Information and Communication Technology</p>
                        <p className="text-gray-500 text-sm">Janajyoti Multiple Campus, Nepal | 2020-2024</p>
                    </div>

                    {/* Location card */}
                    <div
                        className={`glass-panel p-8 md:p-10 rounded-3xl transition-all duration-1000 delay-500 hover:border-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/10 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                            }`}
                    >
                        <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <span className="text-emerald-400">📍</span> Location
                        </h3>
                        <p className="text-gray-300 text-lg mb-2 font-medium">Tinkune, Nepal</p>
                        <p className="text-emerald-400/80 text-sm py-1 px-3 bg-emerald-500/10 rounded-full inline-block border border-emerald-500/20">Open to remote work</p>
                    </div>

                    {/* Interests card */}
                    <div
                        className={`glass-panel p-8 md:p-10 rounded-3xl transition-all duration-1000 delay-600 hover:border-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/10 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                            }`}
                    >
                        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="text-purple-400">💡</span> Interests
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {['UI/UX Design', 'Open Source', 'AI/ML'].map((interest) => (
                                <span
                                    key={interest}
                                    className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-gray-300 text-sm hover:bg-white/10 transition-colors"
                                >
                                    {interest}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
