"use client";

import React from "react";
import { Award, Briefcase, Headphones, Download, ArrowUpRight, Cpu, Globe, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const highlights = [
  
  { icon: Globe, text: '5+ Projects Built' },
 
]

const About = () => {

  return (
    <section id="about" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="container relative z-10 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-5">
            <div className="sticky top-32">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
                <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">About Me</span>
              </div>

              <h2
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-8 tracking-tight"
              >
                What I<br />
                <span className="gradient-text">Bring</span>
              </h2>

              <p className="text-base md:text-lg text-white/60 leading-relaxed mb-6">
                As a full-stack developer with a passion for clean design, I bridge the gap between complex logic and elegant aesthetics.
              </p>

              <p className="text-base md:text-lg text-white/60 leading-relaxed mb-10">
                Currently exploring the intersection of Agentic AI and 3D Web UX, I craft digital experiences that are both functional and beautiful. My approach combines technical expertise with creative problem-solving to deliver solutions that exceed expectations.
              </p>

              <div className="flex flex-wrap gap-4 mb-10">
                {highlights.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center text-indigo-400">
                      <item.icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <span className="text-sm font-medium text-white/80">{item.text}</span>
                  </div>
                ))}
              </div>

              <a
                href="#contact"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/20 text-white font-medium rounded-full hover:bg-white/10 hover:border-white/30 transition-all duration-300"
              >
                <span>Let&apos;s Work Together</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-12">
            <div className="grid grid-cols-1 gap-6">
              {[
                {
                  id: '01',
                  title: 'UI/UX Design',
                  description: 'Creating intuitive interfaces that prioritize user experience and elevate brand presence through thoughtful, clean design.',
                  gradient: 'from-pink-500 to-rose-500',
                  icon: '🎨'
                },
                {
                  id: '02',
                  title: 'Web Development',
                  description: 'Building high-performance, scalable applications with modern technologies like Next.js, React, and web standards.',
                  gradient: 'from-indigo-500 to-blue-500',
                  icon: '💻'
                },
                {
                  id: '03',
                  title: 'Mobile Solutions',
                  description: 'Developing responsive, cross-platform experiences with native-like performance across all devices.',
                  gradient: 'from-purple-500 to-violet-500',
                  icon: '📱'
                },
                {
                  id: '04',
                  title: 'AI Integration',
                  description: 'Exploring the intersection of Agentic AI and 3D Web UX to create intelligent, immersive digital experiences.',
                  gradient: 'from-cyan-500 to-teal-500',
                  icon: '🤖'
                },
              ].map((service, i) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-indigo-500/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-xl hover:shadow-indigo-500/5 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10 flex items-start justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <span className="text-2xl">{service.icon}</span>
                    </div>
                    <span className="text-5xl font-bold text-white/5 group-hover:text-white/10 transition-colors">
                      {service.id}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-white/60 transition-all duration-300">
                    {service.title}
                  </h3>
                  <p className="text-white/60 leading-relaxed group-hover:text-white/80 transition-colors">
                    {service.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
