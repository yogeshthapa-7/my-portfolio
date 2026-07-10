'use client';

import React, { useState, useEffect, useRef } from 'react';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';
import { 
  FaGithub, 
  FaTwitter, 
  FaLinkedinIn, 
  FaInstagram, 
  FaFacebookF, 
  FaEnvelope, 
  FaDiscord 
} from 'react-icons/fa6';

interface SocialKey {
  letter: string;
  label: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  href: string;
  brandBg: string;
  brandText: string;
}

const socialKeys: SocialKey[] = [
  { letter: 'C', label: 'GitHub', icon: FaGithub, href: 'https://github.com', brandBg: 'bg-white', brandText: 'text-black' },
  { letter: 'O', label: 'Twitter', icon: FaTwitter, href: 'https://twitter.com', brandBg: 'bg-white', brandText: 'text-[#1DA1F2]' },
  { letter: 'N', label: 'LinkedIn', icon: FaLinkedinIn, href: 'https://linkedin.com', brandBg: 'bg-white', brandText: 'text-[#0A66C2]' },
  { letter: 'T', label: 'Instagram', icon: FaInstagram, href: 'https://instagram.com', brandBg: 'bg-white', brandText: 'text-[#E1306C]' },
  { letter: 'A', label: 'Facebook', icon: FaFacebookF, href: 'https://facebook.com', brandBg: 'bg-white', brandText: 'text-[#1877F2]' },
  { letter: 'C', label: 'Email', icon: FaEnvelope, href: 'mailto:alex.morgan@dev.io', brandBg: 'bg-white', brandText: 'text-neutral-900' },
  { letter: 'T', label: 'Discord', icon: FaDiscord, href: 'https://discord.com', brandBg: 'bg-white', brandText: 'text-[#5865F2]' },
];

const footerLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const [year, setYear] = useState('');
  const footerRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear().toString());

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
    );

    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <footer 
      ref={footerRef} 
      className="relative bg-[#070709] text-white border-t border-[#14141a] overflow-hidden py-14 shadow-[0_-12px_40px_rgba(0,0,0,0.8)]"
    >
      {/* 3D Laser Horizon Glow Line */}
      <div className="absolute top-0 Harmoni-gradient left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-[12px] bg-gradient-to-b from-amber-500/5 to-transparent blur-sm pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          
          {/* Left Block: Interactive Scroll To Top Plate */}
          <div 
            style={{ transitionDelay: isVisible ? '50ms' : '0ms' }}
            className={`flex flex-wrap items-center justify-center lg:justify-start gap-6 transform-gpu transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-3 bg-[#0f0f13] border border-[#181822] px-4 py-2.5 rounded-xl shadow-[3px_4px_10px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.02)] hover:shadow-[0_8px_16px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.04)] hover:border-neutral-700 hover:-translate-y-0.5 active:translate-y-[1px] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] group transition-all duration-300"
              aria-label="Scroll to top"
            >
              <div className="p-1 bg-[#07070a] rounded-lg shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)] group-hover:text-amber-400 transition-colors">
                <AppLogo size={20} />
              </div>
              <span className="font-display text-xs tracking-wider uppercase font-semibold text-neutral-400 group-hover:text-neutral-200 transition-colors">
                PortfolioX
              </span>
            </button>

            <div className="hidden sm:block w-[1px] h-6 bg-neutral-800/60 shadow-r shadow-white/5" />

            <nav className="flex items-center gap-5" aria-label="Footer navigation">
              {footerLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-xs font-semibold uppercase tracking-widest text-neutral-500 hover:text-amber-400 hover:translate-y-[-1px] transform-gpu transition-all duration-300"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Right Block: Mechanical C-O-N-T-A-C-T Dock Grid */}
          <div 
            style={{ transitionDelay: isVisible ? '150ms' : '0ms' }}
            className={`flex flex-col sm:flex-row items-center gap-6 w-full lg:w-auto transform-gpu transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {/* The Unified Master Dock */}
            <div className="relative bg-[#09090c] border border-neutral-900 rounded-2xl p-2.5 flex items-center gap-2 shadow-[2px_4px_16px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.02)]">
              
              {socialKeys.map((key, idx) => {
                const isHovered = hoveredIndex === idx;

                return (
                  <div
                    key={idx}
                    className="relative [perspective:1000px]"
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    {/* Minimal Pixel-Perfect Tooltip Box */}
                    <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1 bg-white text-black font-semibold text-xs rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.5)] transition-all duration-300 pointer-events-none transform-gpu origin-bottom ${
                      isHovered ? 'opacity-100 translate-y-0 scale-100 font-medium' : 'opacity-0 translate-y-2 scale-90'
                    }`}>
                      {key.label}
                      {/* Tooltip Downward Arrow pointer */}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-2 h-2 bg-white rotate-45" />
                    </div>

                    {/* Flipping Key Switch */}
                    <a
                      href={key.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`relative w-11 h-11 block rounded-xl transition-all duration-500 [transform-style:preserve-3d] ${
                        isHovered ? '[transform:rotateX(180deg)] shadow-[0_0_15px_rgba(255,255,255,0.15)]' : 'shadow-[1px_2px_4px_rgba(0,0,0,0.5)]'
                      }`}
                    >
                      {/* Front Face: Dark Textured Letter Key */}
                      <div className="absolute inset-0 w-full h-full rounded-xl bg-[#121216] border border-neutral-800/60 flex items-center justify-center [backface-visibility:hidden] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
                        <span className="text-sm font-bold text-neutral-300 font-mono tracking-tight">
                          {key.letter}
                        </span>
                      </div>

                      {/* Back Face: Clean White Brand Square Card */}
                      <div className={`absolute inset-0 w-full h-full rounded-xl ${key.brandBg} ${key.brandText} flex items-center justify-center [backface-visibility:hidden] [transform:rotateX(180deg)] shadow-inner`}>
  {/* Assign to a capitalized variable so JSX treats it as a component */}
  {(() => {
    const BrandIcon = key.icon;
    return <BrandIcon size={20} />;
  })()}
</div>
                    </a>
                  </div>
                );
              })}
            </div>

            {/* Copyright Badge Alignment */}
          
          </div>
        </div>

        {/* Dynamic Inner Subfooter Segment */}
        <div 
          style={{ transitionDelay: isVisible ? '250ms' : '0ms' }}
          className={`mt-10 pt-6 border-t border-neutral-900 flex flex-wrap items-center justify-center gap-4 text-[10px] text-neutral-600 font-light tracking-wider transform-gpu transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) ${
            isVisible ? 'opacity-100 filter blur-0' : 'opacity-0 filter blur-[1px]'
          }`}
        >
         
          <span>·</span>
          <span className="bg-[#0b0b0f] px-3 py-1 rounded-full border border-neutral-900/60 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.5)]">
            Built with Next.js &amp; TypeScript 3D
          </span>
        </div>
      </div>
    </footer>
  );
}