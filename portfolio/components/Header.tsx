'use client';

import React, { useState, useEffect } from 'react';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';
import GenerateButton from './ui/GenerateButton';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ['about', 'skills', 'projects', 'education', 'contact'];
      let current = '';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'glass-strong py-3 shadow-lg shadow-black/30'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 group"
            aria-label="Scroll to top"
          >
            <AppLogo size={36} />
           
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`nav-link text-sm font-medium tracking-wide transition-colors duration-300 ${
                  activeSection === link.href.slice(1)
                    ? 'text-primary active' :'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-4">
            <GenerateButton
              onClick={() => handleNavClick('#contact')}
              className="hidden md:inline-flex btn-primary px-5 py-2.5 rounded-lg text-sm items-center gap-2"
            >
              Hire Me
              <Icon name="ArrowRightIcon" size={14} />
            </GenerateButton>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg glass text-foreground hover:text-primary transition-colors"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <Icon name={menuOpen ? 'XMarkIcon' : 'Bars3Icon'} size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 mobile-menu-overlay flex flex-col pt-24 px-6 pb-8 transition-all duration-500 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!menuOpen}
      >
        {/* Decorative blob */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-64 h-64 blob-gold pointer-events-none" />

        <nav className="flex flex-col gap-2 relative z-10" aria-label="Mobile navigation">
          {navLinks.map((link, i) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="flex items-center justify-between py-4 border-b border-border text-left group"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <span className="font-display text-2xl font-light text-foreground group-hover:text-primary transition-colors">
                {link.label}
              </span>
              <Icon name="ArrowRightIcon" size={18} className="text-muted-foreground group-hover:text-primary transition-colors group-hover:translate-x-1 transition-transform" />
            </button>
          ))}
        </nav>

        <div className="mt-auto relative z-10">
          <button
            onClick={() => handleNavClick('#contact')}
            className="btn-primary w-full py-4 rounded-xl text-base font-semibold"
          >
            Let&apos;s Work Together
          </button>
        </div>
      </div>
    </>
  );
}