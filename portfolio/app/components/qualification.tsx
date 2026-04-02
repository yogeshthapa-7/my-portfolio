"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Award, BookOpen } from "lucide-react";

const Qualification = () => {

  const qualifications = [
    {
      title: "Bachelor in Information Communication and Technology",
      institution: "Janajyoti Multiple Campus",
      location: "Sarlahi, Lalbandi",
      status: "Completed",
      icon: GraduationCap,
      gradient: "from-indigo-500 to-blue-500",
    },
    {
      title: "+2 Level",
      institution: "Janajyoti Multiple Campus, Science Faculty",
      location: "Sarlahi, Lalbandi",
      status: "Completed",
      icon: Award,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "School Level (SEE)",
      institution: "Everest Secondary Academy",
      location: "Sarlahi, Lalbandi",
      status: "Completed",
      icon: BookOpen,
      gradient: "from-pink-500 to-rose-500",
    },
  ];

  return (
    <section id="qualification" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="container relative z-10 px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">Journey</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            My<br />
            <span className="gradient-text">Qualifications</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            My educational background and continuous learning journey in the field of technology.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {qualifications.map((qual, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="relative group"
              >
                <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />

                <div className="pl-12 relative">
                  <div className={`absolute left-0 -translate-x-1/2 w-12 h-12 rounded-xl bg-gradient-to-br ${qual.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <qual.icon className="w-5 h-5" aria-hidden="true" />
                  </div>

                  <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                        {qual.status}
                      </span>
                    </div>

                    <h3 className="text-xl lg:text-2xl font-bold text-white mb-2">
                      {qual.title}
                    </h3>

                    <p className="text-lg font-medium text-indigo-400 mb-1">
                      {qual.institution}
                    </p>

                    <p className="text-white/50">
                      {qual.location}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Qualification;
