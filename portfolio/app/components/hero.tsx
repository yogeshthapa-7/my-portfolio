"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, FileText, Github, Linkedin, Mail, MapPin, Code2, Zap } from "lucide-react";

export default function Hero() {
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-pink-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-32 right-20 w-2 h-2 bg-indigo-400 rounded-full animate-float opacity-60" />
        <div className="absolute top-48 left-32 w-3 h-3 bg-purple-400 rounded-full animate-float opacity-40" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-40 right-40 w-2 h-2 bg-pink-400 rounded-full animate-float opacity-50" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-white rounded-full animate-float opacity-30" style={{ animationDelay: '0.5s' }} />
      </div>

      <div className="container relative z-10 px-6 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight"
            >
              <span className="text-white">Yogesh</span>
              <span className="block gradient-text animate-gradient">Thapa</span>
            </motion.h1>

            <div className="flex flex-wrap gap-3 mb-8 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
                <Code2 className="w-4 h-4 text-indigo-400" aria-hidden="true" />
                <span className="text-sm text-white/80">Full-Stack Developer</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
                <MapPin className="w-4 h-4 text-purple-400" aria-hidden="true" />
                <span className="text-sm text-white/80">Kathmandu, Nepal</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
                <Zap className="w-4 h-4 text-pink-400" aria-hidden="true" />
                <span className="text-sm text-white/80">AI Enthusiast</span>
              </div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-lg md:text-xl text-white/70 leading-relaxed mb-10 max-w-2xl"
            >
              Crafting exceptional digital experiences through clean code and thoughtful design. Specialized in building modern web applications that are both powerful and visually stunning.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <button
                onClick={() => scrollToSection("projects")}
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold rounded-full hover:shadow-xl hover:shadow-indigo-500/25 hover:scale-105 transition-all duration-300"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </button>

              <button
                onClick={() => scrollToSection("contact")}
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 border border-white/20 text-white font-semibold rounded-full hover:bg-white/20 hover:scale-105 transition-all duration-300"
              >
                <span>Get in Touch</span>
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex items-center gap-6 pt-8 border-t border-white/10"
            >
              <span className="text-xs font-semibold uppercase tracking-widest text-white/40">Connect</span>
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/yogeshthapa-7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:bg-indigo-500 hover:border-indigo-500 hover:text-white hover:scale-110 transition-all duration-300"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-5 h-5" aria-hidden="true" />
                </a>
                <a
                  href="https://www.linkedin.com/in/yogesh-thapa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:bg-purple-500 hover:border-purple-500 hover:text-white hover:scale-110 transition-all duration-300"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-5 h-5" aria-hidden="true" />
                </a>
                <a
                  href="mailto:yogsthapa@gmail.com"
                  className="group w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:bg-pink-500 hover:border-pink-500 hover:text-white hover:scale-110 transition-all duration-300"
                  aria-label="Send Email"
                >
                  <Mail className="w-5 h-5" aria-hidden="true" />
                </a>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-5 hidden lg:flex items-center justify-center" aria-hidden="true">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full blur-3xl opacity-20 animate-pulse" />
              <div className="relative w-80 h-80 rounded-full bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 border border-white/10 flex items-center justify-center backdrop-blur-sm">
                <div className="absolute inset-4 rounded-full bg-gradient-to-br from-indigo-500/30 via-purple-500/30 to-pink-500/30 border border-white/5" />
                <div className="absolute inset-8 rounded-full bg-gradient-to-br from-indigo-500/40 via-purple-500/40 to-pink-500/40 border border-white/10" />
                <div className="absolute inset-12 rounded-full bg-gradient-to-br from-indigo-500/50 via-purple-500/50 to-pink-500/50 border border-white/10 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mb-3 animate-pulse" />
                     <img 
          src="https://media.licdn.com/dms/image/v2/D5603AQHa9B73RlJrfw/profile-displayphoto-scale_400_400/B56ZvROYSkK8Ag-/0/1768741770049?e=1776902400&v=beta&t=5KOxiSV8JT-xvDnSjKtigpSLCTzzxcJJlt6rWcKjoPI" 
          alt="Creative Developer Portrait"
          className="w-full h-full object-cover rounded-full"
        />
                  </div>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center animate-float shadow-lg shadow-indigo-500/30">
                <Code2 className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center animate-float shadow-lg shadow-purple-500/30" style={{ animationDelay: '1s' }}>
                <Zap className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce" aria-hidden="true">
        <span className="text-xs text-white/40 uppercase tracking-widest">Scroll</span>
        <div className="w-5 h-8 rounded-full border-2 border-white/20 flex justify-center pt-1">
          <div className="w-1 h-2 bg-white/40 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
