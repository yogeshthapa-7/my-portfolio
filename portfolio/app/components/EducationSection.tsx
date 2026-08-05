'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

type AccentColorKey = 'gold' | 'blue' | 'purple' | 'amber';

type AccentColorConfig = {
  border: string;
  hoverBorder: string;
  bg: string;
  icon: string;
  dot: string;
  title: string;
  glow: string;
};

interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
  gpa?: string;
  icon: string;
  type: 'degree' | 'certification';
  accentColor: AccentColorKey;
}

// Updated dataset matching your 4-card reference layout + central theme
const educationItems: EducationItem[] = [
  {
    id: 'school',
    degree: 'S.E.E',
    institution: 'Everest Academy',
    period: '2016 – 2017',
    location: 'Lalbandi, Sarlahi',
    description: 'Focused on learning algorithms, understanding data structures, and developing strong foundations in software engineering.',
highlights: ['Graduated with distinction', 'explored AI applications in problem-solving.'],
    icon: 'AcademicCapIcon',
    type: 'degree',
    accentColor: 'blue',
  },
  {
    id: 'intermediate',
    degree: '+2 (Science)',
    institution: 'Janajyoti Secondary School',
    period: '2017-2019',
    location: 'Lalbandi, Sarlahi',
   description: 'Studied science in +2 with foundational knowledge of computers and introductory programming skills.',
highlights: ['Explored basic programming languages during studies', 'Gained early understanding of computer systems and applications'],
    icon: 'CloudIcon',
    type: 'certification',
    accentColor: 'gold',
  },
  {
    id: 'College',
    degree: 'Bachelor in Information and Communication Technology',
    institution: 'Janajyoti Multiple Campus',
    period: '2020-2025',
    location: 'Lalbandi, Sarlahi',
    description: 'Bachelor’s in Information and Communication Technology Education (BICTE), with focus on software development and applied computing.',
highlights: ['Developed a Hotel Management System as a capstone project', 'Strengthened skills in programming, databases, and system design'],
    icon: 'CodeBracketIcon',
    type: 'certification',
    accentColor: 'amber',
  },
  {
    id: 'Training',
    degree: 'MERN Stack Training',
    institution: 'Broadway Infosys',
    period: 'Jan 2025 - Mar 2025',
    location: 'Tinkune, Kathmandu',
    description: 'Completed a 3‑month MERN stack training program, focusing on modern web development practices.',
highlights: ['Created an e‑commerce website as a major project', 'Developed several smaller applications to strengthen frontend and backend skills'],
    icon: 'StarIcon',
    type: 'certification',
    accentColor: 'purple',
  },
];

const accentColorMap: Record<AccentColorKey, AccentColorConfig> = {
  blue: { 
    border: 'border-cyan-500/20', 
    hoverBorder: 'group-hover:border-cyan-400/60',
    bg: 'bg-cyan-500/10', 
    icon: 'text-cyan-400', 
    dot: 'bg-cyan-400', 
    title: 'text-cyan-100 group-hover:text-cyan-300', 
    glow: 'hover:shadow-[0_0_40px_rgba(34,211,238,0.25)]' 
  },
  gold: { 
    border: 'border-amber-500/20', 
    hoverBorder: 'group-hover:border-amber-400/60',
    bg: 'bg-amber-500/10', 
    icon: 'text-amber-400', 
    dot: 'bg-amber-400', 
    title: 'text-amber-100 group-hover:text-amber-300', 
    glow: 'hover:shadow-[0_0_40px_rgba(245,158,11,0.25)]' 
  },
  amber: { 
    border: 'border-orange-500/20', 
    hoverBorder: 'group-hover:border-orange-400/60',
    bg: 'bg-orange-500/10', 
    icon: 'text-orange-400', 
    dot: 'bg-orange-400', 
    title: 'text-orange-100 group-hover:text-orange-300', 
    glow: 'hover:shadow-[0_0_40px_rgba(249,115,22,0.25)]' 
  },
  purple: { 
    border: 'border-purple-500/20', 
    hoverBorder: 'group-hover:border-purple-400/60',
    bg: 'bg-purple-500/10', 
    icon: 'text-purple-400', 
    dot: 'bg-purple-400', 
    title: 'text-purple-100 group-hover:text-purple-300', 
    glow: 'hover:shadow-[0_0_40px_rgba(168,85,247,0.25)]' 
  },
};

function EducationCard({ item, c }: { item: EducationItem; c: AccentColorConfig }) {
  return (
    <div className={`relative bg-gradient-to-b from-neutral-900/90 to-neutral-950/90 rounded-2xl p-6 border ${c.border} ${c.hoverBorder} group hover:-translate-y-1 transition-all duration-500 ${c.glow} backdrop-blur-md w-full`}>
      {/* Premium Metallic Shine Corner Accent */}
      <div className="absolute top-0 left-0 w-16 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:via-white/40 transition-all duration-500" />
      
      <div className="flex items-start gap-4">
        <div className={`w-10 h-10 rounded-xl ${c.bg} border ${c.border} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}>
          <Icon name={item.icon as any} size={20} className={c.icon} />
        </div>
        <div className="space-y-1 flex-1">
          <h3 className={`font-medium text-lg leading-snug transition-colors duration-300 ${c.title}`}>{item.degree}</h3>
          <p className="text-neutral-400 text-xs font-light tracking-wide">{item.institution} &nbsp;|&nbsp; {item.period}</p>
        </div>
      </div>
      
      <p className="text-sm text-neutral-400 mt-4 font-light leading-relaxed">{item.description}</p>
      
      <ul className="mt-4 space-y-2 text-xs text-neutral-400 font-light">
        {item.highlights.map((h, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <span className={`mt-1.5 w-1 h-1 rounded-full shrink-0 ${c.dot}`} />
            <span className="leading-normal">{h}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function EducationSection() {
  const [showCards, setShowCards] = useState(false);

  return (
    <section id="education" className="relative py-28 bg-[#0a0a0a] text-white overflow-hidden selection:bg-cyan-500/30">
      {/* Subtle background luxury mesh glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-radial-gradient from-neutral-900/40 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
        <span className="text-[10px] tracking-[0.25em] text-neutral-500 uppercase block mb-3 font-medium">Education &amp; Certifications</span>
        <h2 className="font-serif text-4xl md:text-5xl font-light tracking-wide text-neutral-200 mb-20">
          Knowledge &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-300 font-normal italic">Credentials</span>
        </h2>

        {/* Dynamic Connected Layout Container */}
        <div className="relative min-h-[600px] flex items-center justify-center">
          
          {/* Axis Connecting Lines */}
          {showCards && (
            <div className="absolute inset-0 hidden md:flex items-center justify-center pointer-events-none animate-fade-in">
              {/* Horizontal linking axis */}
              <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-neutral-800 to-transparent absolute" />
              {/* Vertical linking axis */}
              <div className="h-full w-[1px] bg-gradient-to-b from-transparent via-neutral-800 to-transparent absolute" />
              {/* Golden central intersection pulse */}
              <div className="w-2 h-2 rounded-full bg-amber-400/80 shadow-[0_0_12px_#fbbf24] z-20 animate-ping absolute" />
            </div>
          )}

          {/* Central Interactive Luxury Circle Button */}
          <div className="absolute z-30 transition-all duration-700 ease-in-out">
            <div
              onClick={() => setShowCards(!showCards)}
              className="group relative w-56 h-56 flex items-center justify-center cursor-pointer select-none"
            >
              {/* Dashed Animated Border Loop */}
              <div 
                className={`absolute inset-0 rounded-full border border-dashed transition-all duration-700 ${showCards ? 'border-cyan-400/70 scale-105' : 'border-neutral-700 group-hover:border-neutral-500'}`} 
                style={{ animation: showCards ? 'rotate 25s linear infinite' : 'none' }} 
              />
              
              {/* Core Dial Display */}
              <div className="w-44 h-44 rounded-full bg-gradient-to-br from-neutral-900 via-neutral-950 to-black border border-neutral-800/80 group-hover:border-cyan-500/40 flex items-center justify-center shadow-[0_0_50px_rgba(0,0,0,0.8)] group-hover:shadow-[0_0_50px_rgba(34,211,238,0.15)] transition-all duration-500">
                <div className="text-center px-4">
                  <div className="text-[9px] tracking-[0.2em] text-cyan-400/80 group-hover:text-cyan-300 mb-1 font-medium transition-colors">
                    {showCards ? 'CLICK TO CLOSE' : 'CLICK TO EXPLORE'}
                  </div>
                  <div className="text-xl font-light tracking-wide text-neutral-200 group-hover:text-white transition-colors">Qualifications</div>
                </div>
              </div>
            </div>
          </div>

          {/* 4-Corner Premium Responsive Grid Placement */}
          {showCards && (
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-y-16 gap-x-36 relative z-10 transition-all duration-500">
              
              {/* Top Left Card */}
              <div className="flex justify-end items-center md:pr-4 animate-slide-up-left">
                <EducationCard item={educationItems[0]} c={accentColorMap[educationItems[0].accentColor]} />
              </div>

              {/* Top Right Card */}
              <div className="flex justify-start items-center md:pl-4 animate-slide-up-right">
                <EducationCard item={educationItems[1]} c={accentColorMap[educationItems[1].accentColor]} />
              </div>

              {/* Bottom Left Card */}
              <div className="flex justify-end items-center md:pr-4 mt-0 md:mt-20 animate-slide-down-left">
                <EducationCard item={educationItems[2]} c={accentColorMap[educationItems[2].accentColor]} />
              </div>

              {/* Bottom Right Card */}
              <div className="flex justify-start items-center md:pl-4 mt-0 md:mt-20 animate-slide-down-right">
                <EducationCard item={educationItems[3]} c={accentColorMap[educationItems[3].accentColor]} />
              </div>

            </div>
          )}
        </div>
      </div>

      {/* Embedded Tailored Custom Keyframe Mechanics */}
      <style jsx global>{`
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
        @keyframes slideUpLeft {
          from { opacity: 0; transform: translate(-20px, -20px); }
          to { opacity: 1; transform: translate(0, 0); }
        }
        @keyframes slideUpRight {
          from { opacity: 0; transform: translate(20px, -20px); }
          to { opacity: 1; transform: translate(0, 0); }
        }
        @keyframes slideDownLeft {
          from { opacity: 0; transform: translate(-20px, 20px); }
          to { opacity: 1; transform: translate(0, 0); }
        }
        @keyframes slideDownRight {
          from { opacity: 0; transform: translate(20px, 20px); }
          to { opacity: 1; transform: translate(0, 0); }
        }
        .animate-slide-up-left { animation: slideUpLeft 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-slide-up-right { animation: slideUpRight 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-slide-down-left { animation: slideDownLeft 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-slide-down-right { animation: slideDownRight 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </section>
  );
}