"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, Github, Linkedin, MessageCircle, CheckCircle, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | '', message: string }>({ type: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setSubmitted(true);
        setForm({ name: "", email: "", message: "" });
        setStatus({ type: 'success', message: "Message sent successfully! I'll get back to you soon." });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setStatus({ type: 'error', message: 'Connection error. Please check your internet connection.' });
    } finally {
      setIsLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      label: 'Location',
      value: 'Kathmandu, Nepal',
      gradient: 'from-pink-500 to-rose-500',
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'yogsthapa@gmail.com',
      gradient: 'from-indigo-500 to-blue-500',
    },
    {
      icon: MessageCircle,
      label: 'Availability',
      value: 'Open for Projects',
      gradient: 'from-emerald-500 to-teal-500',
    },
  ];

  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/yogeshthapa-7', icon: Github },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/yogesh-thapa', icon: Linkedin },
  ];

  return (
    <section id="contact" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[120px]" />
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="container relative z-10 px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">Get in Touch</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Let&apos;s Work<br />
            <span className="gradient-text">Together</span>
          </h2>
          <p className="text-white/60 max-w-xl mx-auto text-lg">
            Have a project in mind? I&apos;d love to hear from you. Let&apos;s create something great together.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-4 space-y-6">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-6">Contact Info</p>
                <div className="space-y-4">
                  {contactInfo.map((info, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
                    >
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${info.gradient} flex items-center justify-center text-white shadow-lg`}>
                        <info.icon className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-xs font-medium uppercase tracking-widest text-white/40 mb-1">{info.label}</p>
                        <p className="text-white font-medium">{info.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-6">Connect</p>
                <div className="flex gap-3">
                  {socialLinks.map((link, i) => (
                    <a
                      key={i}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:bg-gradient-to-br hover:from-indigo-500 hover:to-purple-500 hover:text-white hover:border-transparent hover:scale-110 transition-all duration-300"
                      aria-label={`Visit ${link.name} profile`}
                    >
                      <link.icon className="w-5 h-5" aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-500/20">
                <div className="flex items-center gap-3 mb-3">
                  <MessageCircle className="w-6 h-6 text-indigo-400" aria-hidden="true" />
                  <span className="text-white font-semibold">Quick Response</span>
                </div>
                <p className="text-sm text-white/60">
                  I typically respond within 24 hours. For urgent projects, feel free to reach out directly via email.
                </p>
              </div>
            </div>

            <div className="lg:col-span-8">
              <form
                onSubmit={handleSubmit}
                className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-6"
                noValidate
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-white/80 uppercase tracking-wider">
                      Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-white/80 uppercase tracking-wider">
                      Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-semibold text-white/80 uppercase tracking-wider">
                    Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={6}
                    value={form.message}
                    onChange={handleChange}
                    className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                    placeholder="Tell me about your project, timeline, and budget..."
                  />
                </div>

                {status.message && (
                  <div
                    className={`p-4 rounded-xl flex items-center gap-3 ${
                      status.type === 'success'
                        ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                        : 'bg-red-500/10 border border-red-500/20 text-red-400'
                    }`}
                    role="alert"
                  >
                    {status.type === 'success' ? (
                      <CheckCircle className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                    ) : (
                      <AlertCircle className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                    )}
                    <span className="text-sm font-medium">{status.message}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full px-8 py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-indigo-500/25 hover:scale-[1.02] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-5 h-5" aria-hidden="true" />
                    </>
                  )}
                </button>

                <p className="text-xs text-center text-white/40">
                  By submitting this form, you agree to be contacted regarding your project inquiry.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
