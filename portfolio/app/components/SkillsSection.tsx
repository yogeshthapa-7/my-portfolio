'use client';

import React, { useEffect, useRef, useState } from "react";
import AppIcon from "@/components/ui/AppIcon";

interface SkillItem {
  name: string;
  level: number;
}

interface SkillCard {
  id: string;
  title: string;
  icon: string;
  accent: "gold" | "blue" | "purple" | "green";
  skills: SkillItem[];
  description?: string;
}

const skillCards: SkillCard[] = [
  {
    id: "frontend",
    title: "Core Frontend",
    icon: "ComputerDesktopIcon",
    accent: "gold",
    skills: [
      { name: "React / Next.js (App Router)", level: 95 },
      { name: "TypeScript", level: 92 },
      { name: "JavaScript (ES6+)", level: 94 },
      { name: "HTML5 / CSS3", level: 95 },
    ],
    description: "Building pixel-perfect, performant, and dynamic web applications",
  },
  {
    id: "ui-design-systems",
    title: "UI Components & Systems",
    icon: "SparklesIcon",
    accent: "gold",
    skills: [
      { name: "Tailwind CSS", level: 95 },
      { name: "shadcn/ui", level: 92 },
      { name: "Ant Design", level: 88 },
      { name: "21st.dev Components", level: 85 },
    ],
    description: "Rapid, polished development using modern design systems",
  },
  {
    id: "backend-foundations",
    title: "Backend & APIs",
    icon: "ServerIcon",
    accent: "blue",
    skills: [
      { name: "Node.js / Express.js", level: 82 },
      { name: "RESTful APIs Integration", level: 88 },
      { name: "GraphQL Basics", level: 75 },
    ],
    description: "Solid foundation in MERN server-side fundamentals",
  },
  {
    id: "database",
    title: "Database Management",
    icon: "CircleStackIcon",
    accent: "purple",
    skills: [
      { name: "MongoDB Compass", level: 84 },
      { name: "MongoDB Atlas", level: 80 },
    ],
    description: "Data modeling and database interaction within the MERN stack",
  },
  {
    id: "deployment",
    title: "Deployment & Cloud",
    icon: "CloudIcon",
    accent: "green",
    skills: [
      { name: "Vercel", level: 90 },
      { name: "Netlify", level: 88 },
      { name: "Render", level: 82 },
    ],
    description: "Hosting applications and managing seamless live deployments",
  },
  {
    id: "tools",
    title: "Tools & Workflow",
    icon: "WrenchScrewdriverIcon",
    accent: "purple",
    skills: [
      { name: "Git / GitHub", level: 92 },
      { name: "Figma to Code", level: 85 },
      { name: "Chrome DevTools & Debugging", level: 88 },
    ],
    description: "Efficient development, version control, and precise layout extraction",
  },
];

const iconColorMap = {
  gold: "text-amber-300",
  blue: "text-sky-400",
  purple: "text-violet-400",
  green: "text-emerald-400",
} as const;

function SkillCardComponent({ card, index, isVisible }: { card: SkillCard; index: number; isVisible: boolean }) {
  return (
    /* The 3D Perspective Container viewport */
    <div 
      style={{ animationDelay: `${index * 100}ms` }}
      className={`card-3d-viewport group h-[340px] w-full min-w-[280px] bg-transparent ${
        isVisible ? "reveal-card-active" : "reveal-card-hidden"
      }`}
    >
      {/* The Actual Flipping Frame */}
      <div className="card-3d-flipper relative h-full w-full transition-transform duration-700 ease-out preserve-3d group-hover:rotate-y-180 group-hover:scale-105">
        
        {/* FRONT FACE OF THE CARD */}
        <div 
          style={{ boxShadow: "0 30px 60px -20px rgba(0, 0, 0, 0.85), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)" }}
          className="absolute inset-0 backface-hidden flex flex-col rounded-xl border border-neutral-800 bg-[#1D1D22] p-8"
        >
          <div className="flex h-full flex-col justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-neutral-800 bg-[#16161A] shadow-inner">
                <AppIcon name={card.icon} size={22} className={iconColorMap[card.accent]} />
              </div>
              <div>
                <h3 
                  className="text-lg font-extrabold tracking-wider uppercase text-neutral-100"
                  style={{ textShadow: "1px 1px 0px rgba(0,0,0,0.9)" }}
                >
                  {card.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-neutral-300 font-light tracking-wide">
                  {card.description}
                </p>
              </div>
            </div>

            {/* Hint indicator pointing out tactile feature */}
            <div className="mt-auto flex items-center justify-between border-t border-neutral-800/60 pt-4 text-xs font-semibold uppercase tracking-widest text-neutral-500">
              <span>MERN Framework Stack</span>
              <span className="animate-pulse text-neutral-400">Hover to Inspect →</span>
            </div>
          </div>
        </div>

        {/* BACK FACE OF THE CARD (Revealed on 180° Rotate) */}
        <div 
          style={{ boxShadow: "0 30px 60px -20px rgba(0, 0, 0, 0.85), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)" }}
          className="absolute inset-0 backface-hidden rotate-y-180 flex flex-col rounded-xl border border-neutral-700 bg-[#16161A] p-8"
        >
          <h4 className="text-xs font-black uppercase tracking-widest text-neutral-400 mb-5">
            Skill Breakdowns
          </h4>
          
          <div className="flex flex-col gap-5 justify-center h-full">
            {card.skills.map((skill, i) => (
              <div key={skill.name}>
                <div className="mb-2 flex items-center justify-between text-sm font-bold tracking-wide">
                  <span className="text-neutral-100">{skill.name}</span>
                  <span className="tabular-nums text-neutral-300 font-mono text-sm">{skill.level}%</span>
                </div>
                {/* Deep recessed dark progress track */}
                <div className="h-2.5 w-full bg-[#0E0E11] rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)] overflow-hidden border border-neutral-800/60">
                  <div
                    className="h-full bg-neutral-200 transition-[width] ease-out rounded-full shadow-[0_0_8px_rgba(255,255,255,0.1)]"
                    style={{
                      width: isVisible ? `${skill.level}%` : "0%",
                      transitionDuration: '1400ms',
                      transitionDelay: isVisible ? `${(index * 100) + (i * 80)}ms` : "0ms",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsVisible(true);
        });
      },
      { threshold: 0.05 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 overflow-hidden bg-[#141417]">
      {/* Absolute Injection for 3D Layout Rules, Flip Behaviors, and Text Embossing */}
      <style jsx global>{`
        /* Core CSS 3D Engine Hooks */
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        
        /* 3D Kinetic Text Depth Engine */
        .text-3d-embossed {
          transform-style: preserve-3d;
          transform: perspective(1000px) rotateX(12deg);
          text-shadow: 
            0 1px 0 #222, 0 2px 0 #1c1c1c, 0 3px 0 #181818, 0 4px 0 #141414,
            0 5px 0 #101010, 0 6px 1px rgba(0,0,0,0.8), 0 0 20px rgba(255,255,255,0.03);
        }
        .text-3d-subbed {
          transform: perspective(1000px) translateZ(20px);
        }

        /* Scroll Reveals */
        @keyframes headerCinematicReveal {
          0% {
            opacity: 0;
            filter: blur(10px);
            transform: perspective(1200px) rotateX(-35deg) scale(0.85) translateY(50px);
          }
          100% {
            opacity: 1;
            filter: blur(0px);
            transform: perspective(1200px) rotateX(0deg) scale(1) translateY(0px);
          }
        }
        @keyframes cardRevealUp {
          0% {
            opacity: 0;
            transform: translateY(60px) scale(0.94);
          }
          100% {
            opacity: 1;
            transform: translateY(0px) scale(1);
          }
        }
        .animate-header-3d {
          animation: headerCinematicReveal 1.3s cubic-bezier(0.19, 1, 0.22, 1) forwards;
        }
        .reveal-card-hidden {
          opacity: 0;
          transform: translateY(60px) scale(0.94);
        }
        .reveal-card-active {
          animation: cardRevealUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        
        /* High-End Metallic Sweeping Shimmer Loop Animation Trigger */
        @keyframes luxuryTextShine {
          0% { background-position: 0% center; }
          100% { background-position: 100% center; }
        }
      `}</style>

      <div className="mx-auto max-w-6xl px-8">
        {/* 3D Rigid Structural Header Container Block */}
        <div className={`mb-24 text-center [perspective:1200px] opacity-0 ${isVisible ? "animate-header-3d" : ""}`}>
          
          {/* 3D Subbed Badge with Shiny Reflected Base */}
          <span 
            className="inline-block rounded-md px-4 py-1.5 text-xs font-bold uppercase tracking-widest border border-neutral-800 text-neutral-200"
            style={{ 
              background: "linear-gradient(90deg, #1D1D22 0%, #2E2E38 50%, #1D1D22 100%)",
              backgroundSize: "200% auto",
              animation: "luxuryTextShine 4s ease-in-out infinite alternate",
              boxShadow: "inset 0 1px 0 0 rgba(255, 255, 255, 0.05), 0 10px 20px rgba(0,0,0,0.4)",
              transform: "perspective(1000px) translateZ(20px)"
            }}
          >
            Technical Stack
          </span>
          
          {/* 3D Embossed Heading — Extruded background depth shadow */}
          <h2 
            className="mt-7 text-5xl font-black tracking-widest uppercase sm:text-6xl text-transparent select-none"
            style={{ 
              transformStyle: "preserve-3d",
              transform: "perspective(1000px) rotateX(12deg)",
              textShadow: "0 1px 0 #222226, 0 2px 0 #1C1C1F, 0 3px 0 #18181A, 0 4px 0 #141416, 0 5px 0 #101012, 0 6px 1px rgba(0,0,0,0.95), 0 0 20px rgba(255,255,255,0.02)"
            }}
          >
            {/* Inner text mask layer isolates the moving chrome silver sheen overlay cleanly */}
            <span
              style={{
                background: "linear-gradient(90deg, #999999 0%, #E5E5E5 25%, #FFFFFF 50%, #E5E5E5 75%, #999999 100%)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "luxuryTextShine 5s ease-in-out infinite alternate",
              }}
            >
              My Tech 
            </span>
            
            <span 
              className="text-neutral-500/80 ml-4" 
              style={{ WebkitTextFillColor: "initial" }}
            >
              Arsenal
            </span>
          </h2>
          
          <p className="text-3d-subbed mx-auto mt-7 max-w-xl text-sm leading-relaxed tracking-wide text-neutral-300 font-light">
            A precise composition of clean client-side architectures, interface engineering mechanics, and essential modern runtimes.
          </p>
        </div>

        {/* Dynamic Card Architecture Grid Layout */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {skillCards.map((card, idx) => (
            <SkillCardComponent 
              key={card.id} 
              card={card} 
              index={idx} 
              isVisible={isVisible} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}