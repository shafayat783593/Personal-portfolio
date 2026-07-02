"use client";

import { motion } from "framer-motion";
import { GraduationCap, Briefcase } from "lucide-react";
import { education, experience } from "@/lib/data";

export default function EducationExperience() {
  return (
    <section id="education" className="relative py-24">
      <div className="section-shell grid grid-cols-1 gap-16 lg:grid-cols-2">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="eyebrow">Education</span>
            <h2 className="mt-3 font-display text-3xl font-bold">Academic background</h2>
          </motion.div>

          <div className="relative mt-10 space-y-8 border-l border-ink-900/10 pl-8 dark:border-mist-100/10">
            {education.map((e, i) => (
              <motion.div
                key={e.degree}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative"
              >
                <span className="absolute -left-[calc(2rem+1px)] flex h-8 w-8 items-center justify-center rounded-full bg-violet-500/15 text-violet-500 dark:text-violet-400">
                  <GraduationCap size={16} />
                </span>
                <p className="text-xs font-semibold uppercase tracking-wide text-violet-500 dark:text-violet-400">
                  {e.period}
                </p>
                <h3 className="mt-1 font-display text-lg font-semibold">{e.degree}</h3>
                <p className="text-sm font-medium text-ink-600 dark:text-mist-300">{e.institute}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-600/80 dark:text-mist-300/80">{e.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div id="experience">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="eyebrow">Experience</span>
            <h2 className="mt-3 font-display text-3xl font-bold">Where I&apos;ve worked</h2>
          </motion.div>

          {experience.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="card-surface mt-10 flex items-start gap-4 p-6"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/15 text-violet-500 dark:text-violet-400">
                <Briefcase size={18} />
              </span>
              <p className="text-sm leading-relaxed text-ink-600/85 dark:text-mist-300/85">
                Currently focused on independent projects like NovaShop and open to freelance and
                junior full-stack roles. Real, hands-on production experience — including OAuth,
                real-time chat, and payment integrations — comes through in the projects below.
              </p>
            </motion.div>
          ) : (
            <div className="relative mt-10 space-y-8 border-l border-ink-900/10 pl-8 dark:border-mist-100/10">
              {experience.map((e, i) => (
                <motion.div
                  key={`${e.role}-${e.company}`}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative"
                >
                  <span className="absolute -left-[calc(2rem+1px)] flex h-8 w-8 items-center justify-center rounded-full bg-violet-500/15 text-violet-500 dark:text-violet-400">
                    <Briefcase size={16} />
                  </span>
                  <p className="text-xs font-semibold uppercase tracking-wide text-violet-500 dark:text-violet-400">
                    {e.period}
                  </p>
                  <h3 className="mt-1 font-display text-lg font-semibold">{e.role}</h3>
                  <p className="text-sm font-medium text-ink-600 dark:text-mist-300">{e.company}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600/80 dark:text-mist-300/80">{e.detail}</p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
