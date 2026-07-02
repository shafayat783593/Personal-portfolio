"use client";

import { motion } from "framer-motion";
import { Sparkles, Dumbbell, Code2 } from "lucide-react";
import { about } from "@/lib/data";

const highlights = [
  { icon: Code2, label: "Programming journey", detail: "From HTML/CSS to full-stack Next.js products" },
  { icon: Sparkles, label: "What I enjoy", detail: "Real-time systems, clean UI, solving production bugs" },
  { icon: Dumbbell, label: "Outside of code", detail: "Sports and staying physically active" },
];

export default function About() {
  return (
    <section id="about" className="relative py-24">
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-5 lg:col-span-3"
          >
            {about.paragraphs.map((p, i) => (
              <p key={i} className="text-base leading-relaxed text-ink-700/85 dark:text-mist-200/85">
                {p}
              </p>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 gap-4 lg:col-span-2">
            {highlights.map((h, i) => (
              <motion.div
                key={h.label}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
                className="card-surface flex items-start gap-4 p-5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/15 text-violet-500 dark:text-violet-400">
                  <h.icon size={20} />
                </div>
                <div>
                  <p className="font-semibold">{h.label}</p>
                  <p className="text-sm text-ink-600/80 dark:text-mist-300/80">{h.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
