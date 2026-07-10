'use client';

import React, { useEffect, useRef, useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  imageAlt: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  featured?: boolean;
}

const projects: Project[] = [
  {
    id: 'ecommerce',
    title: 'Ecommerce',
    tagline: 'Real-time data pipeline orchestration',
    description: 'A distributed data pipeline platform handling 2M+ events/day. Distributed system architecture leveraging high-performance processing pipelines and a responsive unified observability platform.',
    image: '/project1.png',
    imageAlt: 'Dark server room with glowing blue network cables and rack-mounted servers, atmospheric low-key lighting, deep shadows',
    tags: ['Node.js', 'Kafka', 'React', 'PostgreSQL', 'Docker'],
    liveUrl: 'https://cloudflow.dev',
    githubUrl: 'https://github.com',
    featured: true
  },
  {
    id: 'AIhub',
    title: 'AI Hub',
    tagline: 'Collaborative code review platform',
    description: 'A GitHub-integrated code review tool that reduces PR cycle time by 60%. Features AI-assisted review suggestions, inline comments, and team analytics built with Next.js and Go.',
    image: "/project2_new.png",
    imageAlt: 'Code editor on dark screen showing colorful syntax highlighting in dimly lit workspace, moody dark atmosphere',
    tags: ['Next.js', 'Go', 'PostgreSQL', 'Redis', 'GitHub API'],
    liveUrl: 'https://devhub.io',
    githubUrl: 'https://github.com',
    featured: true
  },
  {
    id: 'portfolio_generator',
    title: 'Portfolio Generator',
    tagline: 'Open-source component library',
    description: 'A TypeScript-first React component library with 60+ accessible components. Zero runtime dependencies, 2.4k GitHub stars, and used by 180+ teams in production.',
    image: '/project3.png',
    imageAlt: 'Abstract dark digital interface with colorful geometric shapes and neon glows on black background',
    tags: ['React', 'TypeScript', 'Storybook', 'Radix UI', 'Vitest'],
    liveUrl: 'https://prism-ui.dev',
    githubUrl: 'https://github.com'
  },
  {
    id: 'fintrack',
    title: 'FinTrack',
    tagline: 'Personal finance intelligence dashboard',
    description: 'A full-stack finance tracker with ML-powered spending categorization, budget forecasting, and multi-account sync. Processes $12M+ in transactions monthly.',
    image: '/project4.png',
    imageAlt: 'Dark finance dashboard with glowing charts and graphs on monitor, dramatic low-key lighting',
    tags: ['Next.js', 'Python', 'FastAPI', 'TensorFlow', 'Plaid API'],
    liveUrl: 'https://fintrack.app',
    githubUrl: 'https://github.com'
  }
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);
  const isFeatured = project.featured;

  return (
    <div
      className={`reveal-up-hidden group relative flex flex-col rounded-3xl overflow-hidden h-full
        bg-gradient-to-br from-[#0F0F12] to-[#1A1A22] 
        border border-neutral-800/80
        transition-all duration-700 ease-out
        hover:border-[#22D3EE] 
        hover:shadow-[0_35px_80px_-15px_rgba(34,211,238,0.3)]`}
      style={{ 
        transitionDelay: `${index * 100}ms`,
        transform: hovered ? 'translateY(-16px)' : 'translateY(0)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image Area */}
      <div className="relative overflow-hidden aspect-[16/9] w-full bg-black">
        <AppImage
          src={project.image}
          alt={project.imageAlt}
          fill
          sizes="(max-w: 768px) 100vw, (max-w: 1200px) 50vw, 33vw"
          priority={index < 2}
          quality={95}
          className="object-cover"
          style={{
            transform: hovered ? 'scale(1.12)' : 'scale(1)',
            transition: 'transform 850ms cubic-bezier(0.4, 0, 0.2, 1)',
            filter: hovered ? 'brightness(1.15) saturate(1.2)' : 'brightness(0.9)',
          }}
        />

        {/* Gloss Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-40" />

        {/* Enhanced Shine on Hover */}
        <div 
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700"
          style={{
            background: 'linear-gradient(120deg, transparent 40%, rgba(255,255,255,0.4) 50%, transparent 60%)',
            transform: hovered ? 'translateX(110%)' : 'translateX(-110%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-7 transition-all duration-500"
           style={{
             transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
           }}>
        
        <h3 className="font-display text-xl font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-neutral-400 mb-5">{project.tagline}</p>

        <p className="text-neutral-400 text-[14.5px] leading-relaxed line-clamp-3 mb-7">
          {project.description}
        </p>

        {/* Luxury Carved Tags */}
        <div className="mt-auto flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-4 py-1.5 text-xs font-medium tracking-wide rounded-2xl 
                         bg-gradient-to-b from-[#1F1F25] to-[#0F0F12] 
                         border border-neutral-700/80 
                         shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),inset_0_-1px_0_0_rgba(0,0,0,0.6)]
                         text-neutral-300 hover:text-white
                         transition-all duration-300 active:scale-95
                         hover:border-neutral-500 hover:scale-105
                         hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Premium Glossy 3D Buttons */}
        <div className="flex gap-3 mt-8">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex-1 relative py-4 px-6 text-center text-sm font-semibold rounded-3xl 
                       overflow-hidden border border-neutral-700
                       bg-gradient-to-r from-[#1C1C22] via-[#2A2A34] to-[#1C1C22]
                       shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),inset_0_-4px_6px_rgba(0,0,0,0.8)]
                       hover:shadow-[inset_0_2px_6px_rgba(255,255,255,0.2)] transition-all duration-300
                       active:scale-[0.97]"
          >
            <div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent 
                         -skew-x-12 opacity-0 group-hover:opacity-100"
              style={{ backgroundSize: "200% 100%", animation: "shimmer 2.5s infinite linear" }}
            />
            <span className="relative z-10 text-white group-hover:text-cyan-100 transition-colors">
              Live Demo
            </span>
          </a>

          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex-1 relative py-4 px-6 text-center text-sm font-semibold rounded-3xl 
                       overflow-hidden border border-neutral-600/80
                       bg-gradient-to-r from-[#16161B] via-[#22222A] to-[#16161B]
                       shadow-[inset_0_2px_4px_rgba(255,255,255,0.08),inset_0_-4px_6px_rgba(0,0,0,0.75)]
                       hover:border-neutral-400 hover:shadow-[inset_0_2px_6px_rgba(255,255,255,0.15)]
                       transition-all duration-300 active:scale-[0.97]"
          >
            <div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent 
                         -skew-x-12 opacity-0 group-hover:opacity-100"
              style={{ backgroundSize: "200% 100%", animation: "shimmer 2.8s infinite linear" }}
            />
            <span className="relative z-10 text-neutral-200 group-hover:text-white transition-colors">
              Source Code
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal-up-hidden').forEach((el, i) => {
              setTimeout(() => el.classList.add('revealed'), i * 100);
            });
          }
        });
      },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-32 bg-[#050507] overflow-hidden"
    >
      {/* Deep Atmosphere Subdued Shadow Maps */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neutral-900/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-900 to-transparent" />

      <div className="max-w-6xl mx-auto px-8 relative z-10">
        
        {/* Minimalist Sub-Header Segment */}
        <div 
          className="reveal-up-hidden flex items-center justify-center md:justify-start gap-2.5 mb-6 [perspective:1000px]"
          style={{ transform: "perspective(1000px) translateZ(20px)" }}
        >
          <span 
            className="inline-block rounded-md px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] border border-neutral-900 text-neutral-400"
            style={{ 
              background: "linear-gradient(90deg, #111113 0%, #1D1D22 50%, #111113 100%)",
              backgroundSize: "200% auto",
              animation: "luxuryTextShine 4s ease-in-out infinite alternate",
              boxShadow: "inset 0 1px 0 0 rgba(255, 255, 255, 0.03), 0 8px 16px rgba(0,0,0,0.5)"
            }}
          >
            Selected Portfolio
          </span>
        </div>
        
        {/* Clean Corporate Structural Header Base Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 [perspective:1200px]">
          
          {/* 3D Embossed Heading */}
          <h2 
            className="reveal-up-hidden text-5xl font-black tracking-widest uppercase sm:text-6xl text-transparent select-none"
            style={{ 
              transformStyle: "preserve-3d",
              transform: "perspective(1000px) rotateX(10deg)",
              textShadow: "0 1px 0 #222226, 0 2px 0 #1C1C1F, 0 3px 0 #18181A, 0 4px 0 #141416, 0 5px 0 #101012, 0 6px 1px rgba(0,0,0,0.95), 0 0 25px rgba(255,255,255,0.01)"
            }}
          >
            <span
              className="block md:inline"
              style={{
                background: "linear-gradient(90deg, #888888 0%, #E5E5E5 25%, #FFFFFF 50%, #E5E5E5 75%, #888888 100%)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "luxuryTextShine 6s ease-in-out infinite alternate",
              }}
            >
              Projects That 
            </span>
            <span 
              className="block md:inline md:ml-4 text-neutral-600 font-black" 
              style={{ WebkitTextFillColor: "initial" }}
            >
              Ship
            </span>
          </h2>
          
          {/* Description Block */}
          <div 
            className="reveal-up-hidden delay-100 flex flex-col gap-4 max-w-xs border-l border-neutral-900 pl-5"
            style={{ transform: "perspective(1000px) translateZ(15px)" }}
          >
            <p className="text-neutral-400 font-light leading-relaxed text-sm tracking-wide">
              Real products, clean source structures, real impact. Engineered with production scalability constraints in mind.
            </p>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-300 hover:text-white transition-colors w-max group/btn"
            >
              <Icon name="CodeBracketSquareIcon" size={14} className="text-neutral-400 group-hover/btn:text-white transition-colors" />
              View Workspace Repos
              <Icon name="ArrowRightIcon" size={11} className="text-neutral-600 group-hover/btn:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* Interactive Responsive Grid Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>

      {/* Dynamic Global Shimmer Animation Registration Hook */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes luxuryTextShine {
          0% { background-position: 0% center; }
          100% { background-position: 100% center; }
        }
      `}} />
    </section>
  );
}