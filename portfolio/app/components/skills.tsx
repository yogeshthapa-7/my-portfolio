'use client';
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Code2, Database, Cpu, Wrench } from "lucide-react";

const skillsData = {
  Frontend: [
    "HTML", "Version Control System (Git)", "CSS / Tailwind CSS", "JavaScript",
    "React JS", "Next.js", "Vite", "Client-side form validation (Yup)",
    "Form handling (Formik)", "UI Components / AI-based UI", "REST API Integration",
    "Axios", "GraphQL Basics",
    "Chart Libraries (Data Visualization)", "React Leaflet (Maps)"
  ],
  "AI Integrations": [
    "LLM Integration (Google Gemini)", "LLM Integration (ChatGPT APIs)",
    "Advanced Prompt Engineering", "Token Optimization",
     "Agents-based Development (Cursor)",
    "Agents-based Development (Codex)", "Agents-based Development (Antigravity)"
  ],
  Backend: [
    "Node.js", "Express.js", "NestJS", "REST API", "Axios",
    "Nodemailer", "MongoDB", "bcrypt", "JWT"
  ],
  Tools: [
    "VS Code", "GitHub", "Responsive Design", "Vercel",
    "Postman", "Render"
  ]
};

const tabIcons: Record<string, React.ReactNode> = {
  Frontend: <Code2 size={20} />,
  "AI Integrations": <Cpu size={20} />,
  Backend: <Database size={20} />,
  Tools: <Wrench size={20} />
};

const Skills = () => {
  const [activeTab, setActiveTab] = useState<string>("Frontend");
  const tabs = Object.keys(skillsData);

  return (
    <section id="skills" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="container relative z-10 px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">Expertise</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            My<br />
            <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            Technological stack and tools I use to build seamless digital experiences.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeTab === tab
                  ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg scale-105"
                  : "bg-white/5 text-white/70 hover:text-white hover:bg-white/10 border border-white/10"
              }`}
            >
              {tabIcons[tab]}
              {tab}
            </button>
          ))}
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {skillsData[activeTab as keyof typeof skillsData].map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="group bg-white/5 border border-white/10 p-4 rounded-xl hover:border-indigo-500/50 hover:bg-white/10 hover:scale-105 transition-all duration-300 text-center"
              >
                <span className="text-white/80 font-medium text-sm group-hover:text-white transition-colors">{skill}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
