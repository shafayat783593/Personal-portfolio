"use client";

import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { skillCategories, levelToPercent } from "@/lib/data";

export default function Skills() {
  return (
    <section id="skills" className="relative py-24">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="eyebrow">Skills</span>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Tools I build with</h2>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          {skillCategories.map((cat, ci) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: ci * 0.1 }}
              className="card-surface p-6 sm:p-8"
            >
              <h3 className="font-display text-lg font-semibold text-violet-500 dark:text-violet-400">
                {cat.title}
              </h3>

              <div className="mt-6 space-y-5">
                {cat.skills.map((skill, i) => {
                  const Icon = (Icons as any)[skill.icon] ?? Icons.Code2;
                  const percent = levelToPercent[skill.level] ?? 60;
                  return (
                    <div key={skill.name}>
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2 font-medium">
                          <Icon size={16} className="text-violet-500 dark:text-violet-400" />
                          {skill.name}
                        </span>
                        <span className="text-xs text-ink-500 dark:text-mist-400">{skill.level}</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-ink-900/10 dark:bg-mist-100/10">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${percent}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.9, delay: 0.1 + i * 0.06, ease: "easeOut" }}
                          className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-400"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
