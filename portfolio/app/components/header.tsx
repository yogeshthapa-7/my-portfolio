"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Sparkles, CircleUserRound } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      setScrollProgress(scrollPercent);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/#about" },
    { name: "Skills", href: "/#skills" },
    { name: "Projects", href: "/#projects" },
    { name: "Qualification", href: "/#qualification" },
    { name: "Contact", href: "/#contact" },
  ];

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const isHome = href === "/";
    if (isHome) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const targetId = href.replace("/#", "");
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <div
        className="fixed top-0 left-0 right-0 z-[100] h-0.5 bg-transparent pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-100"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-3 backdrop-blur-xl bg-black/80 border-b border-white/10"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="container">
          <nav className="flex items-center justify-between h-16 ml-10">
           <Link
            href="/"
            className="flex items-center gap-2 group"
            aria-label="Yogesh Thapa - Home"
            >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <CircleUserRound className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
                Y<span className="text-indigo-400">T</span>
            </span>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className="px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 text-white/70 hover:text-white hover:bg-white/10"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <a
                href="#contact"
                className="hidden md:inline-flex items-center justify-center px-6 py-2.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-sm font-semibold rounded-full hover:shadow-lg hover:shadow-indigo-500/25 hover:scale-105 transition-all duration-300"
              >
                Hire Me
              </a>

              <button
                onClick={() => setNavOpen(!navOpen)}
                className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-white"
                aria-label={navOpen ? "Close menu" : "Open menu"}
                aria-expanded={navOpen}
              >
                {navOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {navOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setNavOpen(false)}
            aria-hidden="true"
          />
          <div
            className="fixed top-20 left-4 right-4 p-6 bg-black/95 backdrop-blur-xl rounded-2xl border border-white/10 z-40 lg:hidden animate-fade-in"
            role="dialog"
            aria-label="Mobile navigation"
          >
            <nav className="flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => {
                    handleClick(null as any, link.href);
                    setNavOpen(false);
                  }}
                  className="py-3 px-5 text-lg font-medium rounded-xl transition-all text-white/70 hover:text-white hover:bg-white/10"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 border-t border-white/10 mt-2">
                <a
                  href="#contact"
                  onClick={() => setNavOpen(false)}
                  className="flex items-center justify-center gap-2 py-3 px-5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-center font-semibold rounded-xl"
                >
                  <span>Hire Me</span>
                </a>
              </div>
            </nav>
          </div>
        </>
      )}
    </>
  );
};

export default Header;
