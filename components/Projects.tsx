import ProjectCard from "./ProjectCard";
import { connectDB } from "@/lib/mongodb";
import Project from "@/lib/models/Project";
import { projectsSeed } from "@/lib/data";

async function getProjects() {
  try {
    await connectDB();
    const docs = await Project.find({}).sort({ createdAt: -1 }).lean();
    if (docs.length === 0) return projectsSeed;
    return docs.map((d: any) => ({
      slug: d.slug,
      name: d.name,
      image: d.image,
      summary: d.summary,
      stack: d.stack,
    }));
  } catch {
    // DB not configured yet (e.g. first run without MONGODB_URI) — fall back to seed data
    return projectsSeed;
  }
}

export default async function Projects() {
  const projects = await getProjects();

  return (
    <section id="projects" className="relative py-24">
      <div className="section-shell">
        <div>
          <span className="eyebrow">Projects</span>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Selected work</h2>
          <p className="mt-3 max-w-xl text-ink-600/80 dark:text-mist-300/80">
            A few production builds that shaped how I think about real-time systems, auth, and clean UI.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
