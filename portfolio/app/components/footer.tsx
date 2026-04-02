"use client";

import React from "react";
import { Github, Linkedin, Mail, ArrowUpRight, Sparkles, Heart } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Qualification", href: "#qualification" },
    { name: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    { name: "GitHub", href: "https://github.com/yogeshthapa-7", icon: Github },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/yogesh-thapa", icon: Linkedin },
    { name: "Email", href: "mailto:yogsthapa@gmail.com", icon: Mail },
  ];

  return (
    <footer className="relative overflow-hidden" role="contentinfo">
      <div className="absolute inset-0 bg-black" />
      <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/5 via-transparent to-transparent" />

      <div className="relative">
        <div className="container">
          <div className="py-16 lg:py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
              <div className="lg:col-span-5 space-y-6">
                <Link href="/" className="inline-flex items-center gap-3 group" aria-label="Yogesh Thapa - Home">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Sparkles className="w-6 h-6 text-white" aria-hidden="true" />
                  </div>
                  <span className="text-2xl font-bold text-white">
                    Yogesh<span className="text-indigo-400">.</span>
                  </span>
                </Link>

                <p className="text-white/60 leading-relaxed max-w-md text-lg">
                  Full-stack developer crafting digital experiences with precision and passion. Open to new opportunities and collaborations.
                </p>

                <a
                  href="mailto:yogsthapa@gmail.com"
                  className="group inline-flex items-center gap-2 text-lg font-medium text-white hover:text-indigo-400 transition-colors"
                >
                  <span>yogsthapa@gmail.com</span>
                  <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" aria-hidden="true" />
                </a>

                <div className="flex items-center gap-2 pt-2">
                  <div className="relative flex h-3 w-3">
                    
                   
                  </div>
                  
                </div>
              </div>

              <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold uppercase tracking-widest text-white/40">Navigation</h4>
                  <ul className="space-y-3">
                    {navLinks.map((link) => (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          className="text-white/60 hover:text-white transition-colors inline-flex items-center gap-2 group"
                        >
                          <span>{link.name}</span>
                          <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-semibold uppercase tracking-widest text-white/40">Connect</h4>
                  <div className="flex flex-col gap-3">
                    {socialLinks.map((link) => (
                      <a
                        key={link.name}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/60 hover:text-white transition-colors inline-flex items-center gap-2 group"
                      >
                        <link.icon className="w-5 h-5" aria-hidden="true" />
                        <span>{link.name}</span>
                      </a>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-semibold uppercase tracking-widest text-white/40">Location</h4>
                  <p className="text-white/60">
                    Kathmandu, Nepal
                  </p>
                  <p className="text-sm text-white/40">
                    UTC+5:45
                  </p>
                </div>
              </div>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4 flex-wrap">
                <span className="text-sm font-medium text-white/40">
                  © {currentYear} Yogesh Thapa
                </span>
                <span className="text-white/40 hidden sm:inline">•</span>
                <span className="text-sm text-white/40">
                  All rights reserved
                </span>
              </div>

              <div className="flex items-center gap-6">
                <span className="text-sm text-white/40 flex items-center gap-2">
                  Built with <Heart className="w-4 h-4 text-pink-500 animate-pulse" aria-hidden="true" /> using Next.js
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
      </div>
    </footer>
  );
};

export default Footer;
