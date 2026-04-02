"use client";

import React from "react";
import { MoveRight, Github, ExternalLink, ArrowRight, Eye } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const projects = [
  {
    title: "AI Tools Directory",
    description: "A comprehensive directory of AI tools with advanced filtering and local bookmarking capabilities for power users.",
    fullDescription: "Built a full-featured AI tools directory with sophisticated filtering system allowing users to search by category, pricing model, and functionality.",
    tags: ["Next.js", "React", "TypeScript", "LocalStorage API"],
    category: "Web App",
    year: "2025",
    color: "from-indigo-500 via-purple-500 to-pink-500",
    demo: "https://ai-tools-ptmxjoxbt-yogsthapa-gmailcoms-projects.vercel.app",
    image: "projects/ai_tools.png",
    code: "https://github.com/yogeshthapa-7/ai-tools-directory",
  },
  {
    title: "Portfolio Generator",
    description: "AI-powered portfolio generator featuring drag-and-drop interface and real-time preview.",
    fullDescription: "Created a SaaS-style portfolio generator that leverages AI to help users create stunning portfolios in minutes.",
    tags: ["Next.js", "OpenAI API", "Framer Motion", "Tailwind"],
    category: "SaaS Tool",
    year: "2025",
    color: "from-cyan-500 via-blue-500 to-indigo-500",
    image: "projects/home.png",
    demo: "https://portfolios-generator-kohl.vercel.app",
    code: "https://github.com/yogeshthapa-7/portfolios-generator",
  },
  {
    title: "React Mini Projects",
    description: "A curated collection of interactive React projects showcasing modern patterns.",
    fullDescription: "Developed an extensive collection of React mini-projects demonstrating modern development patterns including hooks, context API, and performance optimizations.",
    tags: ["Next.js", "React", "Tailwind", "React Hooks"],
    category: "Web App",
    year: "2025",
    color: "from-emerald-500 via-teal-500 to-cyan-500",
    image: "projects/mini_projects.png",
    demo: "https://mini-projects-lsd4j9a38-yogsthapa-gmailcoms-projects.vercel.app",
    code: "https://github.com/yogeshthapa-7/mini-projects",
  },
];

const Projects = () => {

  return (
    <section id="projects" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="container relative z-10 px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">Portfolio</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
              Selected<br />
              <span className="gradient-text">Works</span>
            </h2>
          </div>

          <p className="text-white/60 max-w-md md:text-right">
            A showcase of my recent projects, featuring web applications and design solutions that demonstrate my expertise in modern development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group relative rounded-3xl bg-white/5 border border-white/10 overflow-hidden hover:border-indigo-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/5 hover:-translate-y-1"
            >
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20 group-hover:opacity-30 transition-opacity duration-500`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 z-10" />

                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />

                <div className="absolute top-4 left-4 z-20 flex gap-2">
                  <span className="px-3 py-1.5 bg-black/50 backdrop-blur-sm text-xs font-semibold text-white/80 rounded-full border border-white/20">
                    {project.category}
                  </span>
                </div>

                <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
                  <a
                    href={project.demo}
                    className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 hover:scale-110"
                    aria-label={`View ${project.title} live`}
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                  <a
                    href={project.code}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 hover:scale-110"
                    aria-label={`View ${project.title} on GitHub`}
                  >
                    <Github className="w-5 h-5" />
                  </a>
                </div>
              </div>

              <div className="p-6 relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-white/40">{project.year}</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-white/60 transition-all duration-300">
                  {project.title}
                </h3>

                <p className="text-white/60 text-sm leading-relaxed mb-5 line-clamp-2">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.slice(0, 3).map((tag, j) => (
                    <span
                      key={j}
                      className="text-xs font-medium px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/60 group-hover:border-white/20 group-hover:text-white/80 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href={project.code}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white group-hover:gap-3 transition-all duration-300"
                >
                  <span className="relative">
                    View Details
                    <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 group-hover:w-full transition-all duration-300" />
                  </span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>

              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            </motion.article>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a
            href="https://github.com/yogeshthapa-7"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-full hover:bg-white/10 hover:border-white/20 transition-all duration-300"
          >
            <Github className="w-5 h-5" aria-hidden="true" />
            <span>View Full Archive</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
