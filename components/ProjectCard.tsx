"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export type ProjectCardData = {
  slug: string;
  name: string;
  image: string;
  summary: string;
  stack: string[];
};

export default function ProjectCard({ project, index }: { project: ProjectCardData; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.1 }}
      className="card-surface group flex flex-col overflow-hidden"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={project.image}
          alt={project.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-lg font-semibold">{project.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-600/80 dark:text-mist-300/80">
          {project.summary}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.stack.slice(0, 4).map((t) => (
            <span
              key={t}
              className="rounded-full bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-600 dark:text-violet-300"
            >
              {t}
            </span>
          ))}
        </div>

        <Link
          href={`/projects/${project.slug}`}
          className="focus-ring mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-violet-600 transition-colors hover:text-violet-500 dark:text-violet-400"
        >
          View Details
          <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </motion.div>
  );
}
