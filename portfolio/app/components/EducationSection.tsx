'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

function EducationCard({ item, c, index }: { item: EducationItem; c: AccentColorConfig; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
      className={`relative bg-gradient-to-b from-neutral-900/90 to-neutral-950/90 rounded-2xl p-6 border ${c.border} ${c.hoverBorder} group hover:-translate-y-1 transition-all duration-500 ${c.glow} backdrop-blur-md w-full`}
    >
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
    </motion.div>
  );
}

export default function EducationSection() {
  const [showCards, setShowCards] = useState(false);

  return (
    <section id="education" className="relative py-28 text-white overflow-hidden bg-transparent">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-radial-gradient from-neutral-900/40 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 text-center relative z-10 glass rounded-3xl p-8">
        <span className="text-[10px] tracking-[0.25em] text-neutral-500 uppercase block mb-3 font-medium">Education &amp; Certifications</span>
        <h2 className="font-serif text-4xl md:text-5xl font-light tracking-wide text-neutral-200 mb-20">
          Knowledge &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-300 font-normal italic">Credentials</span>
        </h2>

        <div className="relative min-h-[600px] flex items-center justify-center">

          <AnimatePresence>
            {showCards && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 hidden md:flex items-center justify-center pointer-events-none"
              >
                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-neutral-800 to-transparent absolute" />
                <div className="h-full w-[1px] bg-gradient-to-b from-transparent via-neutral-800 to-transparent absolute" />
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="w-2 h-2 rounded-full bg-amber-400/80 shadow-[0_0_12px_#fbbf24] z-20 absolute"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            animate={{ scale: showCards ? 0.7 : 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute z-30"
          >
            <div
              onClick={() => setShowCards(!showCards)}
              className="group relative w-40 h-40 sm:w-56 sm:h-56 flex items-center justify-center cursor-pointer select-none"
            >
              <motion.div
                animate={{ rotate: showCards ? 360 : 0, scale: showCards ? 1.05 : 1 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className={`absolute inset-0 rounded-full border border-dashed transition-all duration-700 ${showCards ? 'border-cyan-400/70' : 'border-neutral-700 group-hover:border-neutral-500'}`}
                style={{ animation: showCards ? 'rotate 25s linear infinite' : 'none' }}
              />

              <motion.div
                animate={{ scale: showCards ? 0.9 : 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="w-32 h-32 sm:w-44 sm:h-44 rounded-full bg-gradient-to-br from-neutral-900 via-neutral-950 to-black border border-neutral-800/80 group-hover:border-cyan-500/40 flex items-center justify-center shadow-[0_0_50px_rgba(0,0,0,0.8)] group-hover:shadow-[0_0_50px_rgba(34,211,238,0.15)] transition-all duration-500"
              >
                <div className="text-center px-4">
                  <motion.div
                    animate={{ opacity: showCards ? 0.6 : 1 }}
                    transition={{ duration: 0.3 }}
                    className="text-[9px] tracking-[0.2em] text-cyan-400/80 group-hover:text-cyan-300 mb-1 font-medium transition-colors"
                  >
                    {showCards ? 'CLICK TO CLOSE' : 'CLICK TO EXPLORE'}
                  </motion.div>
                  <div className="text-xl font-light tracking-wide text-neutral-200 group-hover:text-white transition-colors">Qualifications</div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <AnimatePresence>
            {showCards && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full grid grid-cols-1 md:grid-cols-2 gap-y-20 gap-x-8 md:gap-x-36 relative z-10"
              >
                <motion.div
                  initial={{ opacity: 0, x: -30, y: -30 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  exit={{ opacity: 0, x: -30, y: -30 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  className="flex justify-end items-center md:pr-4"
                >
                  <EducationCard item={educationItems[0]} c={accentColorMap[educationItems[0].accentColor]} index={0} />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30, y: -30 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  exit={{ opacity: 0, x: 30, y: -30 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                  className="flex justify-start items-center md:pl-4"
                >
                  <EducationCard item={educationItems[1]} c={accentColorMap[educationItems[1].accentColor]} index={1} />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -30, y: 30 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  exit={{ opacity: 0, x: -30, y: 30 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                  className="flex justify-end items-center md:pr-4 md:mt-20"
                >
                  <EducationCard item={educationItems[2]} c={accentColorMap[educationItems[2].accentColor]} index={2} />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30, y: 30 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  exit={{ opacity: 0, x: 30, y: 30 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
                  className="flex justify-start items-center md:pl-4 md:mt-20"
                >
                  <EducationCard item={educationItems[3]} c={accentColorMap[educationItems[3].accentColor]} index={3} />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <style jsx global>{`
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
