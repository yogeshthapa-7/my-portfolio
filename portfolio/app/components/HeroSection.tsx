'use client';

import React, { useEffect, useRef, useState } from 'react';

import Icon from '@/components/ui/AppIcon';
import GenerateButton from '@/components/ui/GenerateButton';

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

  const handleScrollDown = () => {
    const about = document.getElementById('about');
    if (about) about.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Subtle radial vignette: keeps the hero readable over the cinematic canvas */}
      <div
        className="absolute inset-0 pointer-events-none rounded-[inherit]"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 25%, rgba(0,0,0,0.55) 100%)',
        }}
      />

      {/* Scroll Indicator */}
      <button
        onClick={handleScrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
        aria-label="Scroll down"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em]">Scroll</span>
        <div className="w-5 h-8 rounded-full border border-current/30 flex items-start justify-center p-1 group-hover:border-foreground/50 transition-colors">
          <div className="w-1 h-2 rounded-full bg-current animate-bounce" />
        </div>
      </button>

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
          <GenerateButton
  hue={210} // Deep Blue glow effect
  onClick={() => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }}
  className="btn-primary px-8 py-4 rounded-xl text-base inline-flex items-center gap-2 min-w-[180px] justify-center"
>
  <Icon name="FolderOpenIcon" size={18} />
  View Projects
</GenerateButton>

<GenerateButton
  hue={140} // Emerald Green glow effect
  onClick={() => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }}
  className="btn-ghost px-8 py-4 rounded-xl text-base inline-flex items-center gap-2 min-w-[180px] justify-center"
>
  <Icon name="EnvelopeIcon" size={18} />
  Get In Touch
</GenerateButton>
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
    </section>
  );
}