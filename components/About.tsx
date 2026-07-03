"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, Dumbbell, Code2 } from "lucide-react";
import { about, profile } from "@/lib/data";

const highlights = [
  { icon: Code2, label: "Programming journey", detail: "From HTML/CSS to full-stack Next.js products" },
  { icon: Sparkles, label: "What I enjoy", detail: "Real-time systems, clean UI, solving production bugs" },
  { icon: Dumbbell, label: "Outside of code", detail: "Sports and staying physically active" },
];

export default function About() {
  return (
    <section id="about" className="relative py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-1/3 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-amber-400/10 blur-3xl"
      />

      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="eyebrow">About Me</span>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">{about.heading}</h2>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-5">
          {/* Photo column */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative mx-auto w-full max-w-sm pb-6 lg:col-span-2 lg:mx-0"
          >
            <div className="absolute -inset-3 -z-10 rounded-[2rem] bg-gradient-to-br from-violet-500/40 via-fuchsia-400/30 to-amber-400/30 blur-xl" />
            <div className="absolute -bottom-2 -right-5 -z-10 h-full w-full rounded-[1.75rem] border-2 border-violet-500/30" />

            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.75rem] border border-white/10 shadow-glow">
              <Image
                src="/images/aboutPhoto.jpeg"
                alt={`${profile.name} — ${profile.designation}`}
                fill
                sizes="(max-width: 1024px) 90vw, 400px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 via-transparent to-transparent" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute -bottom-2 left-2/1 w-[85%] -translate-x-1/2 rounded-2xl border border-ink-900/10 bg-white/90 px-5 py-3 text-center shadow-card backdrop-blur-xl dark:border-mist-100/10 dark:bg-ink-800/90"
            >
              <p className="font-display  text-sm font-semibold">{profile.name}</p>
              <p className="text-xs text-violet-500 dark:text-violet-400">{profile.designation}</p>
            </motion.div>
          </motion.div>

          {/* Text column */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-5"
            >
              {about.paragraphs.map((p, i) => (
                <p key={i} className="text-base leading-relaxed text-ink-700/85 dark:text-mist-200/85">
                  {p}
                </p>
              ))}
            </motion.div>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {highlights.map((h, i) => (
                <motion.div
                  key={h.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className="card-surface flex flex-col items-start gap-3 p-5"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/15 text-violet-500 dark:text-violet-400">
                    <h.icon size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{h.label}</p>
                    <p className="mt-1 text-xs leading-relaxed text-ink-600/80 dark:text-mist-300/80">{h.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}