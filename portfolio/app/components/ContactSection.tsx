'use client';

import React, { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

type NeonThemeKey = 'gold' | 'red' | 'gray' | 'blue' | 'pink' | 'indigo';

interface InteractiveCard {
  id: string;
  initial: string;
  label: string;
  value: string;
  href: string | null;
  theme: NeonThemeKey;
  type: 'contact' | 'social';
}

const interactiveItems: InteractiveCard[] = [
  { id: 'gmail', initial: 'G', label: 'EMAIL', value: 'yogsthapa@gmail.com', href: 'mailto:yogsthapa@gmail.com', theme: 'red', type: 'contact' },
  { id: 'address', initial: 'A', label: 'LOCATION', value: 'Tinkune-32, Kathmandu, Nepal', href: null, theme: 'gold', type: 'contact' },
  { id: 'response', initial: 'R', label: 'RESPONSE TIME', value: 'Within 24 hours', href: null, theme: 'blue', type: 'contact' },
  { id: 'github', initial: 'H', label: 'GitHub', value: 'yogeshthapa-7', href: 'https://github.com/yogeshthapa-7', theme: 'gray', type: 'social' },
  { id: 'linkedin', initial: 'L', label: 'LinkedIn', value: 'in/yogesh-thapa', href: 'https://www.linkedin.com/in/yogesh-thapa/', theme: 'indigo', type: 'social' },
  { id: 'facebook', initial: 'F', label: 'Facebook', value: 'Yogesh Thapa', href: 'https://www.facebook.com/yogesh.thapa.73113', theme: 'blue', type: 'social' },
  { id: 'instagram', initial: 'I', label: 'Instagram', value: 'thapa_yo_gesh', href: 'https://www.instagram.com/thapa_yo_gesh/', theme: 'pink', type: 'social' },
];

const neonThemes: Record<NeonThemeKey, { shadow: string; border: string; text: string; glowBg: string }> = {
  gold: { shadow: 'shadow-[inset_0_1px_4px_rgba(251,191,36,0.2),0_0_12px_rgba(251,191,36,0.15)]', border: 'border-amber-500/30', text: 'text-amber-400', glowBg: 'bg-amber-500/10' },
  red: { shadow: 'shadow-[inset_0_1px_4px_rgba(239,68,68,0.2),0_0_12px_rgba(239,68,68,0.15)]', border: 'border-red-500/30', text: 'text-red-400', glowBg: 'bg-red-500/10' },
  gray: { shadow: 'shadow-[inset_0_1px_4px_rgba(255,255,255,0.1),0_0_12px_rgba(255,255,255,0.1)]', border: 'border-neutral-500/30', text: 'text-neutral-200', glowBg: 'bg-neutral-500/10' },
  blue: { shadow: 'shadow-[inset_0_1px_4px_rgba(59,130,246,0.2),0_0_12px_rgba(59,130,246,0.15)]', border: 'border-blue-500/30', text: 'text-blue-400', glowBg: 'bg-blue-500/10' },
  pink: { shadow: 'shadow-[inset_0_1px_4px_rgba(236,72,153,0.2),0_0_12px_rgba(236,72,153,0.15)]', border: 'border-pink-500/30', text: 'text-pink-400', glowBg: 'bg-pink-500/10' },
  indigo: { shadow: 'shadow-[inset_0_1px_4px_rgba(99,102,241,0.2),0_0_12px_rgba(99,102,241,0.15)]', border: 'border-indigo-500/30', text: 'text-indigo-400', glowBg: 'bg-indigo-500/10' },
};

export default function ContactSection() {
  const [activeBtn, setActiveBtn] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Tracking Visibility States
  const [visibleElements, setVisibleElements] = useState<Record<string, boolean>>({});
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -10% 0px', // Triggers slightly inside the viewport window for a cleaner aesthetic
      threshold: 0.05,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const targetId = entry.target.getAttribute('data-reveal-id');
        if (!targetId) return;

        if (entry.isIntersecting) {
          setVisibleElements((prev) => ({ ...prev, [targetId]: true }));
        } else {
          // Removes state when scrolled out, enabling the continuous repeating reveal feature
          setVisibleElements((prev) => ({ ...prev, [targetId]: false }));
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    if (sectionRef.current) {
      const elementsToObserve = sectionRef.current.querySelectorAll('[data-reveal-id]');
      elementsToObserve.forEach((el) => observer.observe(el));
    }

    return () => observer.disconnect();
  }, []);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="relative py-24 bg-[#070709] text-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Header Layout Component */}
        <div className="flex items-center gap-3 mb-4">
          <span className="h-px w-10 bg-amber-400" />
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-400">Get In Touch</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <h2 className="font-display text-5xl md:text-6xl font-light tracking-tight text-neutral-100">
            Let&apos;s build<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-300 font-semibold">something great</span>
          </h2>
          <p className="text-neutral-400 max-w-sm leading-relaxed text-sm font-light">
            Have a project in mind or just want to say hello? My inbox is always open. I typically respond within 24 hours.
          </p>
        </div>

        {/* Height-Matched 3D Container Matrix */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column Container */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Contact Information Group */}
            <div className="space-y-4 flex-1 flex flex-col justify-center">
              {interactiveItems.filter(item => item.type === 'contact').map((item, index) => {
                const isSelected = activeBtn === item.id;
                const theme = neonThemes[item.theme];
                const isVisible = visibleElements[item.id];

                return (
                  <div
                    key={item.id}
                    data-reveal-id={item.id}
                    onClick={() => setActiveBtn(isSelected ? null : item.id)}
                    style={{ transitionDelay: isVisible ? `${index * 80}ms` : '0ms' }}
                    className={`flex items-center gap-4 p-4 rounded-xl border transform-gpu cursor-pointer transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) ${
                      isVisible 
                        ? 'opacity-100 translate-y-0 filter blur-0' 
                        : 'opacity-0 translate-y-8 filter blur-[2px]'
                    } ${
                      isSelected 
                        ? `bg-[#131318] ${theme.border} ${theme.shadow} !translate-y-[-2px] shadow-[0_12px_24px_rgba(0,0,0,0.6)]` 
                        : 'bg-[#0f0f13] border-[#181822] hover:border-neutral-700 hover:translate-y-[-2px] shadow-[4px_6px_12px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.02)] hover:shadow-[0_12px_20px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.04)]'
                    }`}
                  >
                    <div className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 font-medium text-base transition-all duration-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)] ${
                      isSelected ? `${theme.glowBg} ${theme.text}` : 'text-neutral-400 bg-[#07070a]'
                    }`}>
                      {item.initial}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] text-neutral-500 font-semibold uppercase tracking-wider mb-0.5">
                        {item.label}
                      </div>
                      <div className="text-sm font-light text-neutral-200 truncate">
                        {item.value}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Social Links Group */}
            <div className="flex-1 flex flex-col justify-center">
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-neutral-500 mb-3 pl-1">Find me online</p>
              <div className="space-y-3">
                {interactiveItems.filter(item => item.type === 'social').map((item, index) => {
                  const isSelected = activeBtn === item.id;
                  const theme = neonThemes[item.theme];
                  const isVisible = visibleElements[item.id];

                  return (
                    <div
                      key={item.id}
                      data-reveal-id={item.id}
                      onClick={() => setActiveBtn(isSelected ? null : item.id)}
                      style={{ transitionDelay: isVisible ? `${(index + 3) * 80}ms` : '0ms' }}
                      className={`flex items-center justify-between p-3.5 rounded-xl border transform-gpu cursor-pointer transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) ${
                        isVisible 
                          ? 'opacity-100 translate-y-0 filter blur-0' 
                          : 'opacity-0 translate-y-8 filter blur-[2px]'
                      } ${
                        isSelected 
                          ? `bg-[#131318] ${theme.border} ${theme.shadow} !translate-y-[-2px] shadow-[0_10px_20px_rgba(0,0,0,0.6)]` 
                          : 'bg-[#0f0f13] border-[#181822] hover:border-neutral-700 hover:translate-y-[-2px] shadow-[3px_5px_10px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.02)] hover:shadow-[0_10px_16px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.04)]'
                      }`}
                    >
                      <div className="flex items-center gap-4 min-w-0 flex-1">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 font-medium text-sm transition-all duration-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)] ${
                          isSelected ? `${theme.glowBg} ${theme.text}` : 'text-neutral-400 bg-[#07070a]'
                        }`}>
                          {item.initial}
                        </div>
                        <div className="truncate">
                          <div className="text-sm font-medium text-neutral-200">{item.label}</div>
                          <div className="text-xs text-neutral-500 font-light">{item.value}</div>
                        </div>
                      </div>
                      {item.href && (
                        <a 
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-1 text-neutral-600 hover:text-amber-400 transition-colors pl-2"
                        >
                          <Icon name="ArrowTopRightOnSquareIcon" size={14} />
                        </a>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Employment Status Footer Badge */}
            <div 
              data-reveal-id="hire-badge"
              className={`p-5 rounded-2xl bg-gradient-to-b from-[#111115] to-[#0a0a0d] border border-[#16161f] shadow-[4px_6px_16px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.02)] transform-gpu transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) ${
                visibleElements['hire-badge'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <div className="flex items-center gap-2.5 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-sm font-medium text-neutral-200">Available for hire</span>
              </div>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                Currently open to full-time junior developer roles and interesting freelance projects. Prefer remote-first companies.
              </p>
            </div>
          </div>

          {/* Right Column: Main Form */}
          <div 
            data-reveal-id="contact-form-wrapper"
            style={{ transitionDelay: visibleElements['contact-form-wrapper'] ? '200ms' : '0ms' }}
            className={`lg:col-span-7 flex transform-gpu transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1) ${
              visibleElements['contact-form-wrapper'] ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-[0.98]'
            }`}
          >
            {submitted ? (
              <div className="w-full bg-[#101014] rounded-2xl border border-neutral-800 p-12 text-center shadow-[12px_24px_48px_rgba(0,0,0,0.7)] flex flex-col justify-center items-center">
                <div className="w-14 h-14 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-6 shadow-inner">
                  <Icon name="CheckCircleIcon" size={26} className="text-amber-400" />
                </div>
                <h3 className="font-serif text-2xl font-light text-neutral-200 mb-2">Message Sent!</h3>
                <p className="text-xs text-neutral-400 max-w-xs mx-auto font-light mb-6">
                  Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', subject: '', message: '' }); }}
                  className="text-xs tracking-widest text-amber-400 uppercase font-medium border border-amber-500/20 px-4 py-2 rounded-xl bg-amber-500/5 hover:bg-amber-500/10 transition-colors"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="w-full bg-gradient-to-b from-[#121216] to-[#0e0e11] rounded-2xl border border-[#1b1b24] p-8 space-y-6 shadow-[16px_28px_56px_rgba(0,0,0,0.75),inset_0_1px_1px_rgba(255,255,255,0.03)] flex flex-col justify-between"
              >
                <div className="space-y-6">
                  <h3 className="font-serif text-2xl font-light text-neutral-300 tracking-wide">Send a message</h3>

                  {/* Input Rows */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-[10px] font-semibold text-neutral-500 uppercase tracking-wider mb-2 pl-0.5">
                        Full Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Jordan Kim"
                        className={`w-full bg-[#08080a] text-sm font-light text-neutral-200 placeholder-neutral-700 px-4 py-3.5 rounded-xl border ${
                          errors.name ? 'border-red-500/40' : 'border-[#14141a] focus:border-amber-500/30'
                        } shadow-[inset_2px_3px_6px_rgba(0,0,0,0.85)] focus:shadow-[inset_3px_5px_8px_rgba(0,0,0,0.95)] focus:outline-none transition-all duration-300 ease-out`}
                      />
                      {errors.name && <p className="mt-1.5 text-xs text-red-400 font-light">{errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-[10px] font-semibold text-neutral-500 uppercase tracking-wider mb-2 pl-0.5">
                        Email Address
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="jordan@company.com"
                        className={`w-full bg-[#08080a] text-sm font-light text-neutral-200 placeholder-neutral-700 px-4 py-3.5 rounded-xl border ${
                          errors.email ? 'border-red-500/40' : 'border-[#14141a] focus:border-amber-500/30'
                        } shadow-[inset_2px_3px_6px_rgba(0,0,0,0.85)] focus:shadow-[inset_3px_5px_8px_rgba(0,0,0,0.95)] focus:outline-none transition-all duration-300 ease-out`}
                      />
                      {errors.email && <p className="mt-1.5 text-xs text-red-400 font-light">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Subject Input */}
                  <div>
                    <label htmlFor="subject" className="block text-[10px] font-semibold text-neutral-500 uppercase tracking-wider mb-2 pl-0.5">
                      Subject
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Senior Engineer role at Acme Corp"
                      className={`w-full bg-[#08080a] text-sm font-light text-neutral-200 placeholder-neutral-700 px-4 py-3.5 rounded-xl border ${
                        errors.subject ? 'border-red-500/40' : 'border-[#14141a] focus:border-amber-500/30'
                      } shadow-[inset_2px_3px_6px_rgba(0,0,0,0.85)] focus:shadow-[inset_3px_5px_8px_rgba(0,0,0,0.95)] focus:outline-none transition-all duration-300 ease-out`}
                    />
                    {errors.subject && <p className="mt-1.5 text-xs text-red-400 font-light">{errors.subject}</p>}
                  </div>

                  {/* Message Block */}
                  <div>
                    <label htmlFor="message" className="block text-[10px] font-semibold text-neutral-500 uppercase tracking-wider mb-2 pl-0.5">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project, timeline, and what you're looking to build..."
                      className={`w-full bg-[#08080a] text-sm font-light text-neutral-200 placeholder-neutral-700 p-4 rounded-xl border ${
                        errors.message ? 'border-red-500/40' : 'border-[#14141a] focus:border-amber-500/30'
                      } shadow-[inset_2px_3px_6px_rgba(0,0,0,0.85)] focus:shadow-[inset_3px_5px_8px_rgba(0,0,0,0.95)] focus:outline-none resize-none transition-all duration-300 ease-out`}
                    />
                    {errors.message && <p className="mt-1.5 text-xs text-red-400 font-light">{errors.message}</p>}
                  </div>
                </div>

                {/* Submitting Actions Panel */}
                <div className="space-y-4 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full relative bg-gradient-to-b from-[#2a2a33] to-[#1b1b22] border border-[#373747]/70 hover:border-amber-500/40 text-amber-200/90 font-light text-sm tracking-wider py-4 rounded-xl transition-all duration-300 shadow-[0_6px_16px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.06)] transform-gpu active:translate-y-[2px] active:shadow-[inset_0_4px_6px_rgba(0,0,0,0.6)] flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <div className="w-4 h-4 rounded-full border-2 border-amber-400/30 border-t-amber-400 animate-spin" />
                    ) : (
                      <>
                        <Icon name="PaperAirplaneIcon" size={16} />
                        Send Message
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-center text-neutral-600 font-light">
                    No spam, ever. I&apos;ll only use your email to respond to your message.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}