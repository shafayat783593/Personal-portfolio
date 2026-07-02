import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Github, Lightbulb, Wrench, ListChecks } from "lucide-react";
import { connectDB } from "@/lib/mongodb";
import Project from "@/lib/models/Project";
import { projectsSeed } from "@/lib/data";

async function getProject(slug: string) {
  try {
    await connectDB();
    const doc = await Project.findOne({ slug }).lean();
    if (doc) return doc as any;
  } catch {
    // fall through to seed data
  }
  return projectsSeed.find((p) => p.slug === slug) ?? null;
}

export async function generateStaticParams() {
  return projectsSeed.map((p) => ({ slug: p.slug }));
}

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = await getProject(params.slug);
  if (!project) return notFound();

  return (
    <article className="relative pb-24 pt-32 sm:pt-40">
      <div className="section-shell">
        <Link
          href="/#projects"
          className="focus-ring inline-flex items-center gap-2 text-sm font-medium text-ink-600 hover:text-violet-500 dark:text-mist-300"
        >
          <ArrowLeft size={16} /> Back to projects
        </Link>

        <div className="relative mt-6 aspect-[16/8] w-full overflow-hidden rounded-3xl border border-ink-900/10 dark:border-mist-100/10">
          <Image src={project.image} alt={project.name} fill sizes="100vw" className="object-cover" priority />
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold sm:text-4xl">{project.name}</h1>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.stack.map((t: string) => (
                <span key={t} className="rounded-full bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-600 dark:text-violet-300">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring inline-flex items-center gap-2 rounded-full bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-500"
              >
                <ExternalLink size={16} /> Live Site
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring inline-flex items-center gap-2 rounded-full border border-ink-900/15 px-5 py-2.5 text-sm font-semibold hover:border-violet-500/60 hover:text-violet-500 dark:border-mist-100/15"
              >
                <Github size={16} /> Client Code
              </a>
            )}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="font-display text-xl font-semibold">Overview</h2>
            <p className="mt-3 leading-relaxed text-ink-700/85 dark:text-mist-200/85">{project.description}</p>
          </div>

          <div className="space-y-6">
            <div className="card-surface p-5">
              <h3 className="flex items-center gap-2 font-semibold">
                <Wrench size={16} className="text-violet-500 dark:text-violet-400" /> Main Stack
              </h3>
              <ul className="mt-2 space-y-1 text-sm text-ink-600/85 dark:text-mist-300/85">
                {project.stack.map((t: string) => (
                  <li key={t}>• {t}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="card-surface p-6">
            <h3 className="flex items-center gap-2 font-display text-lg font-semibold">
              <Lightbulb size={18} className="text-amber-400" /> Challenges
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-700/85 dark:text-mist-200/85">{project.challenges}</p>
          </div>
          <div className="card-surface p-6">
            <h3 className="flex items-center gap-2 font-display text-lg font-semibold">
              <ListChecks size={18} className="text-emerald-500" /> Future Plans
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-700/85 dark:text-mist-200/85">{project.improvements}</p>
          </div>
        </div>
      </div>
    </article>
  );
}
