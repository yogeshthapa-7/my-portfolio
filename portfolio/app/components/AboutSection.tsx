'use client';

import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface StatItem {
  value: string;
  label: string;
  icon: string;
}

function StatCard({ stat, index }: { stat: StatItem; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(600px) rotateX(${-y * 14}deg) rotateY(${x * 14}deg) translateY(-8px) scale(1.04)`;
  };

  const handleMouseLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)';
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="glass rounded-2xl p-6 text-center card-glare card-border-glow card-border-glow-gold group"
      style={{
        transitionDelay: `${index * 80}ms`,
        transformStyle: 'preserve-3d',
        transition: 'transform 0.15s ease, box-shadow 0.3s ease',
      }}
    >
      <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 mb-3 group-hover:bg-primary/20 transition-colors" style={{ transform: 'translateZ(12px)' }}>
        <Icon name={stat.icon as Parameters<typeof Icon>[0]['name']} size={18} className="text-primary" />
      </div>
      <div className="font-display text-3xl font-bold text-gradient-gold mb-1" style={{ transform: 'translateZ(8px)' }}>{stat.value}</div>
      <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{stat.label}</div>
    </div>
  );
}

const stats: StatItem[] = [
{ value: '1+', label: 'Years Experience', icon: 'CalendarDaysIcon' },
{ value: '4+', label: 'Projects Shipped', icon: 'RocketLaunchIcon' },
{ value: '10+', label: 'Happy Clients', icon: 'UsersIcon' },
{ value: '90%', label: 'Uptime Record', icon: 'SignalIcon' }];


const highlights = [
  'Specializing in React, Next.js, and modern frontend ecosystems',
  'Building pixel‑perfect, responsive UIs with Tailwind CSS and Framer Motion',
  'Contributor to open‑source UI libraries and frontend communities',
  'Focused on performance, accessibility, and seamless user experiences',
];


export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal-up-hidden').forEach((el, i) => {
              setTimeout(() => el.classList.add('revealed'), i * 120);
            });
            entry.target.querySelectorAll('.reveal-left-hidden').forEach((el, i) => {
              setTimeout(() => el.classList.add('revealed'), i * 100);
            });
            entry.target.querySelectorAll('.reveal-right-hidden').forEach((el, i) => {
              setTimeout(() => el.classList.add('revealed'), i * 100);
            });
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 bg-secondary overflow-hidden">
      
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 blob-gold opacity-30 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 blob-blue opacity-20 pointer-events-none" />
      <div className="divider-glow absolute top-0 left-0 right-0" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section label */}
        <div className="reveal-up-hidden flex items-center gap-3 mb-4">
          <span className="h-px w-10 bg-primary" />
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">About Me</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image + decorative */}
          <div className="reveal-left-hidden relative">
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              {/* Main image frame */}
              <div className="relative rounded-2xl overflow-hidden glass glow-gold aspect-[4/5]">
                <AppImage
                  src="/portfolio.png"
                  alt="Alex Morgan software engineer seated at desk in dimly lit modern office, focused expression, dark background with monitor glow"
                  fill
                  className="object-cover"
                  priority />
               
              </div>

              {/* Floating experience card */}
              <div className="absolute -right-6 top-12 glass rounded-xl p-4 glow-gold animate-float hidden md:block">
                <div className="font-display text-3xl font-bold text-gradient-gold">1+</div>
                <div className="text-xs text-muted-foreground font-medium">Years of<br />Experience</div>
              </div>

              
            </div>
          </div>

          {/* Right: Content */}
          <div className="space-y-8">
            <div>
              <h2 className="reveal-up-hidden font-display text-section font-light text-foreground mb-4">
                Building the web,<br />
                <span className="text-gradient-gold font-semibold italic">one commit</span> at a time
              </h2>
              <p className="reveal-up-hidden text-muted-foreground text-lg font-light leading-relaxed delay-100">
                Hey, I&apos;m Yogesh — a frontend developer with 1+ years of experience turning complex problems into elegant solutions. I thrive at the intersection of performance engineering and beautiful design.
              </p>
              <p className="reveal-up-hidden text-muted-foreground leading-relaxed mt-4 delay-200">
                I completed my Bachelor’s Degree in Information and Communication Technology from Tribhuvan University affiliated Janajyoti Multiple Campus.
After graduation, I pursued a 3‑month MERN stack training at Broadway Infosys, Kathmandu, which gave me a strong foundation in modern web development.
Along the way, I discovered my passion for frontend development — crafting engaging user interfaces and seamless experiences.
This led me to join Upcode Nepal in Kathmandu as a React Frontend Developer, where I continue to grow by building scalable, performant applications with modern tools.
              </p>
            </div>

            {/* Highlights */}
            <ul className="space-y-3">
              {highlights.map((item, i) =>
              <li
                key={i}
                className="reveal-up-hidden flex items-start gap-3"
                style={{ transitionDelay: `${(i + 3) * 100}ms` }}>
                
                  <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center">
                    <Icon name="CheckIcon" size={10} className="text-primary" />
                  </span>
                  <span className="text-sm text-muted-foreground">{item}</span>
                </li>
              )}
            </ul>

            {/* CTA row */}
            <div className="reveal-up-hidden flex flex-wrap gap-4 delay-500">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm">
                
                <Icon name="ArrowDownTrayIcon" size={16} />
                Download CV
              </a>
              <button
                onClick={() => {
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-ghost inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm">
                
                <Icon name="ChatBubbleLeftRightIcon" size={16} />
                Let&apos;s Talk
              </button>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="reveal-up-hidden grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 delay-300">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>);

}