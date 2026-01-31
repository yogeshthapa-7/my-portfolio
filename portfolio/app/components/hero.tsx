'use client'
import { useEffect, useState } from 'react'

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
    
    // Type the event properly
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Animated gradient background */}
      <div 
        className="absolute inset-0 opacity-40 transition-opacity duration-1000"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
            rgba(139, 92, 246, 0.3) 0%, 
            rgba(59, 130, 246, 0.2) 25%, 
            rgba(16, 185, 129, 0.1) 50%, 
            transparent 70%)`
        }}
      />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />

      {/* Floating orbs */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float-delayed" />
      <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl animate-pulse-slow" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-7xl mx-auto px-6 md:px-12">
        {/* Glitch effect name */}
        <div className="mb-12 relative glitch-text">
          <h1 
            className={`text-7xl md:text-8xl lg:text-9xl font-bold mb-4 transition-all duration-1000 text-gradient tracking-tight ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{
              textShadow: '0 0 80px rgba(139, 92, 246, 0.5)'
            }}
          >
            YOGESH THAPA
          </h1>
          {/* Glitch layers */}
          <h1 
            className="glitch-layer glitch-layer-1 text-7xl md:text-8xl lg:text-9xl font-bold"
            aria-hidden="true"
          >
            YOGESH THAPA
          </h1>
          <h1 
            className="glitch-layer glitch-layer-2 text-7xl md:text-8xl lg:text-9xl font-bold"
            aria-hidden="true"
          >
            YOGESH THAPA
          </h1>
        </div>

        {/* Animated subtitle */}
        <div className="relative mb-16 overflow-hidden">
          <p 
            className={`text-2xl md:text-3xl lg:text-4xl text-gray-300 font-light tracking-widest transition-all duration-1000 delay-300 ${
              isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <span className="inline-block animate-slide-in">CREATIVE</span>
            <span className="inline-block mx-4 md:mx-6 text-purple-400">×</span>
            <span className="inline-block animate-slide-in-delayed">DEVELOPER</span>
          </p>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-pulse" />
        </div>

        {/* Description with typewriter effect */}
        <p 
          className={`text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-16 leading-relaxed px-4 transition-all duration-1000 delay-500 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          Crafting digital experiences that blend aesthetics with functionality.
          Specializing in modern web technologies and interactive design.
        </p>

        {/* CTA Buttons */}
        <div 
          className={`flex flex-wrap gap-6 md:gap-8 justify-center transition-all duration-1000 delay-700 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <button className="group relative px-10 py-5 bg-white text-black font-semibold text-lg overflow-hidden transition-all hover:scale-105 rounded-full">
            <span className="relative z-10">View My Work</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="absolute inset-0 z-10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              View My Work
            </span>
          </button>
          
          <button className="relative px-10 py-5 font-semibold text-lg border-2 border-white text-white overflow-hidden group rounded-full">
            <span className="relative z-10">Get In Touch</span>
            <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
            <span className="absolute inset-0 z-10 flex items-center justify-center text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Get In Touch
            </span>
          </button>
        </div>

        {/* Scroll indicator */}
        <div 
          className={`absolute bottom-10 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-1000 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="flex flex-col items-center gap-2 animate-bounce-slow">
            <span className="text-gray-500 text-sm tracking-widest">SCROLL</span>
            <div className="w-[2px] h-12 bg-gradient-to-b from-gray-500 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  )
}
