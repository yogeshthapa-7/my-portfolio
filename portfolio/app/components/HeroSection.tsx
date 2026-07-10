'use client';

import React, { useEffect, useRef, useState } from 'react';

import Icon from '@/components/ui/AppIcon';

const ROLES = [
  'React Developer',
  'Frontend Engineer',
  'UI Engineer',
  'TypeScript Developer',
  'Next.js Developer',
];

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const typewriterRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Typewriter effect
  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    const speed = isDeleting ? 50 : 100;

    typewriterRef.current = setTimeout(() => {
      if (!isDeleting && displayText === currentRole) {
        setTimeout(() => setIsDeleting(true), 1800);
        return;
      }
      if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
        return;
      }
      setDisplayText((prev) =>
        isDeleting ? prev.slice(0, -1) : currentRole.slice(0, prev.length + 1)
      );
    }, speed);

    return () => {
      if (typewriterRef.current) clearTimeout(typewriterRef.current);
    };
  }, [displayText, isDeleting, roleIndex]);

  // Cursor parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      setMousePos({ x, y });
    };

    const el = heroRef.current;
    if (el) el.addEventListener('mousemove', handleMouseMove);
    return () => { if (el) el.removeEventListener('mousemove', handleMouseMove); };
  }, []);

  const handleScrollDown = () => {
    const about = document.getElementById('about');
    if (about) about.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden grid-bg"
      aria-label="Hero section"
    >
      {/* Background atmospheric layers */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ transform: `translate(${mousePos.x * -15}px, ${mousePos.y * -10}px)` }}
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 blob-gold opacity-60" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 blob-blue opacity-50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] blob-purple opacity-40" />
      </div>

      {/* Noise overlay */}
      <div className="absolute inset-0 bg-noise opacity-50 pointer-events-none mix-blend-overlay" />

      {/* 3D Floating Geometric Elements */}
      {/* Large sphere — parallax layer 1 */}
      <div
        className="absolute right-[8%] top-[15%] pointer-events-none hidden lg:block"
        style={{ transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 15}px)` }}
      >
        <div className="relative animate-float-slow">
          <div className="w-32 h-32 sphere-3d animate-pulse-glow" />
          {/* Orbit ring */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-48 h-48 rounded-full border border-primary/20 animate-spin-slow" style={{ borderStyle: 'dashed' }} />
          </div>
          {/* Orbiting dot */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="animate-orbit">
              <div className="w-3 h-3 rounded-full bg-primary shadow-lg" style={{ boxShadow: '0 0 12px rgba(200,150,90,0.8)' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Small blue sphere — parallax layer 2 */}
      <div
        className="absolute left-[6%] bottom-[25%] pointer-events-none hidden lg:block"
        style={{ transform: `translate(${mousePos.x * -25}px, ${mousePos.y * 20}px)` }}
      >
        <div className="animate-float-reverse">
          <div className="w-20 h-20 sphere-blue animate-pulse-glow-blue" />
        </div>
      </div>

      {/* Floating code snippet card */}
      <div
        className="absolute left-[4%] top-[20%] pointer-events-none hidden xl:block"
        style={{ transform: `translate(${mousePos.x * -18}px, ${mousePos.y * 12}px)` }}
      >
        <div className="animate-float glass rounded-xl p-4 w-52 glow-blue">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
            <span className="text-xs text-muted-foreground ml-1 font-mono">main.ts</span>
          </div>
          <div className="space-y-1.5 font-mono text-xs">
            <div><span className="text-accent">const</span> <span className="text-foreground">dev</span> <span className="text-muted-foreground">= {`{`}</span></div>
            <div className="pl-3"><span className="text-primary">name</span><span className="text-muted-foreground">:</span> <span className="text-green-400">&quot;Yogesh&quot;</span><span className="text-muted-foreground">,</span></div>
            <div className="pl-3"><span className="text-primary">level</span><span className="text-muted-foreground">:</span> <span className="text-green-400">&quot;Junior&quot;</span></div>
            <div className="text-muted-foreground">{`}`}</div>
          </div>
        </div>
      </div>

      {/* Floating stats card */}
      <div
        className="absolute right-[5%] bottom-[20%] pointer-events-none hidden xl:block"
        style={{ transform: `translate(${mousePos.x * 22}px, ${mousePos.y * -14}px)` }}
      >
        <div className="animate-float-slow glass rounded-xl p-4 w-44 glow-gold">
          <div className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wider">Projects</div>
          <div className="font-display text-3xl font-bold text-gradient-gold">4+</div>
          <div className="text-xs text-muted-foreground mt-1">Shipped to prod</div>
          <div className="mt-3 h-1.5 rounded-full bg-muted overflow-hidden">
            <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-primary to-accent" />
          </div>
        </div>
      </div>

      {/* Hexagon decoration */}
      <div
        className="absolute right-[18%] bottom-[35%] pointer-events-none hidden lg:block"
        style={{ transform: `translate(${mousePos.x * 10}px, ${mousePos.y * -8}px)` }}
      >
        <div className="animate-float w-12 h-12 hexagon bg-accent/20 border border-accent/30" style={{ animationDelay: '2s' }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-24 pb-16">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 mb-8 animate-fade-up">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Available for Work · 2026
          </span>
        </div>

        {/* Hero headline */}
        <h1 className="font-display text-hero font-light text-foreground mb-4">
          <span className="block opacity-90">Crafting</span>
          <span className="block text-gradient-gold font-semibold">Digital</span>
          <span className="block opacity-90">Experiences</span>
        </h1>

        {/* Typewriter role */}
        <div className="flex items-center justify-center gap-2 mt-6 mb-8 h-10">
          <span className="text-muted-foreground text-lg font-light">I&apos;m a</span>
          <span className="text-foreground text-lg font-semibold min-w-[220px] text-left">
            {displayText}
            <span className="cursor-blink text-primary">|</span>
          </span>
        </div>

        {/* Subheadline */}
        <p className="text-muted-foreground text-lg font-light max-w-2xl mx-auto leading-relaxed mb-12">
          I craft scalable, performant frontend applications with modern web technologies.
From pixel‑perfect UIs to seamless user experiences — I build interfaces that truly engage.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={() => {
              const el = document.getElementById('projects');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-primary px-8 py-4 rounded-xl text-base inline-flex items-center gap-2 min-w-[180px] justify-center"
          >
            <Icon name="FolderOpenIcon" size={18} />
            View Projects
          </button>
          <button
            onClick={() => {
              const el = document.getElementById('contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-ghost px-8 py-4 rounded-xl text-base inline-flex items-center gap-2 min-w-[180px] justify-center"
          >
            <Icon name="EnvelopeIcon" size={18} />
            Get In Touch
          </button>
        </div>

        {/* Tech stack pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Framer Motion', 'Vercel'].map((tech) => (
            <span
              key={tech}
              className="px-3 py-1.5 rounded-full text-xs font-medium text-muted-foreground border border-border hover:border-primary/40 hover:text-primary transition-all duration-300 glass cursor-default"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={handleScrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300 group"
        aria-label="Scroll down"
      >
        <span className="text-xs tracking-[0.3em] uppercase font-medium">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-primary/60 to-transparent relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-primary animate-bounce" />
        </div>
      </button>
    </section>
  );
}