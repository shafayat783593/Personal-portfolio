"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Download, Github, Mail, MessageCircle, Linkedin, Twitter, Facebook, ArrowDown } from "lucide-react";
import { profile, socials } from "@/lib/data";

const iconMap: Record<string, any> = {
  Github,
  Mail,
  MessageCircle,
  Linkedin,
  Twitter,
  Facebook,
};

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pb-24 pt-40 sm:pt-48">
      {/* Aurora background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-aurora" />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-24 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-violet-500/20 blur-3xl animate-drift sm:h-96 sm:w-96"
      />

      <div className="section-shell grid grid-cols-1 items-center gap-14 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="eyebrow">Hello, I&apos;m {profile.shortName}</span>

          <h1 className="mt-4 font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            <span className="gradient-text">{profile.designation}</span>
            <br />
            building products that feel alive.
          </h1>

          <p className="mt-6 max-w-md text-base text-ink-700/80 dark:text-mist-200/80 sm:text-lg">
            {profile.tagline} Next.js, real-time systems, and clean, purposeful interfaces are my daily tools.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={profile.resumeUrl}
              download
              className="focus-ring group inline-flex items-center gap-2 rounded-full bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-glow transition-transform hover:-translate-y-0.5 hover:bg-violet-500"
            >
              <Download size={16} className="transition-transform group-hover:translate-y-0.5" />
              Download Resume
            </a>
            <a
              href="#contact"
              className="focus-ring inline-flex items-center gap-2 rounded-full border border-ink-900/15 px-6 py-3 text-sm font-semibold text-ink-800 transition-colors hover:border-violet-500/60 hover:text-violet-500 dark:border-mist-100/15 dark:text-mist-100"
            >
              Let&apos;s Talk
            </a>
          </div>

          <div className="mt-8 flex items-center gap-3">
            {socials.map((s) => {
              const Icon = iconMap[s.icon] ?? Mail;
              return (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="focus-ring flex h-11 w-11 items-center justify-center rounded-full border border-ink-900/10 text-ink-700 transition-all hover:-translate-y-1 hover:border-violet-500/60 hover:text-violet-500 dark:border-mist-100/10 dark:text-mist-200"
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          className="relative mx-auto aspect-square w-64 sm:w-80 md:w-full md:max-w-sm"
        >
          {/* rotating dashed ring */}
          <motion.div
            aria-hidden
            animate={{ rotate: 360 }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-4 rounded-full border-2 border-dashed border-violet-500/30"
          />

          {/* soft glow behind the circle */}
          <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-violet-500 via-fuchsia-400 to-amber-400 opacity-70 blur-2xl" />

          {/* gradient ring + circular photo */}
          <div className="absolute inset-2 animate-float rounded-full bg-gradient-to-tr from-violet-500 via-fuchsia-400 to-amber-400 p-[6px] shadow-glow">
            <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-ink-950/80 dark:border-ink-950">
              <Image
                src="/images/shafayat-pic.jpg"
                alt={profile.name}
                fill
                sizes="(max-width: 768px) 320px, 400px"
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* floating designation badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-ink-900/10 bg-white/90 px-5 py-2 text-xs font-semibold shadow-card backdrop-blur-xl dark:border-mist-100/10 dark:bg-ink-800/90"
          >
            <span className="gradient-text">{profile.designation}</span>
          </motion.div>

          {/* small orbiting accent dots */}
          <motion.span
            aria-hidden
            className="absolute -right-1 top-6 h-4 w-4 rounded-full bg-amber-400 shadow-glow sm:h-5 sm:w-5"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.span
            aria-hidden
            className="absolute -left-2 bottom-16 h-3 w-3 rounded-full bg-fuchsia-400 shadow-glow"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />
        </motion.div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to about section"
        className="focus-ring absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center justify-center rounded-full border border-ink-900/10 p-2 text-ink-500 dark:border-mist-100/10 sm:flex"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <ArrowDown size={16} />
      </motion.a>
    </section>
  );
}