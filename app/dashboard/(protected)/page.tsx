import { FolderKanban, Mail, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { connectDB } from "@/lib/mongodb";
import Project from "@/lib/models/Project";
import Message from "@/lib/models/Message";

async function getStats() {
  try {
    await connectDB();
    const [projectCount, messageCount] = await Promise.all([
      Project.countDocuments(),
      Message.countDocuments(),
    ]);
    return { projectCount, messageCount };
  } catch {
    return { projectCount: 0, messageCount: 0 };
  }
}

export default async function DashboardOverview() {
  const { projectCount, messageCount } = await getStats();

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Overview</h1>
      <p className="mt-1 text-sm text-mist-400">Welcome back. Here&apos;s your site at a glance.</p>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="rounded-2xl border border-mist-100/10 bg-ink-900/50 p-6">
          <div className="flex items-center justify-between">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/15 text-violet-400">
              <FolderKanban size={18} />
            </span>
            <span className="text-3xl font-bold">{projectCount}</span>
          </div>
          <p className="mt-3 text-sm font-medium">Total Projects</p>
          <Link href="/dashboard/projects" className="focus-ring mt-3 inline-flex items-center gap-1 text-xs font-semibold text-violet-400 hover:text-violet-300">
            Manage projects <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="rounded-2xl border border-mist-100/10 bg-ink-900/50 p-6">
          <div className="flex items-center justify-between">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400/15 text-amber-400">
              <Mail size={18} />
            </span>
            <span className="text-3xl font-bold">{messageCount}</span>
          </div>
          <p className="mt-3 text-sm font-medium">Contact Messages</p>
          <p className="mt-3 text-xs text-mist-400">Sent to your inbox via email + saved here</p>
        </div>
      </div>

      <p className="mt-10 text-xs text-mist-500">
        Note: counts show 0 until <code className="rounded bg-mist-100/10 px-1.5 py-0.5">MONGODB_URI</code> is set in
        your environment.
      </p>
    </div>
  );
}
