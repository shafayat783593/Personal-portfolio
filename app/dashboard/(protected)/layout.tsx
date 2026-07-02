import Link from "next/link";
import { LayoutDashboard, FolderKanban, LogOut, ExternalLink } from "lucide-react";
import LogoutButton from "./LogoutButton";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-ink-950 text-mist-100">
      <aside className="hidden w-60 shrink-0 flex-col border-r border-mist-100/10 bg-ink-900/50 p-5 sm:flex">
        <Link href="/dashboard" className="font-display text-lg font-bold">
          <span className="gradient-text">SHAFAYAT.</span>
        </Link>
        <p className="mt-1 text-xs text-mist-400">Admin Dashboard</p>

        <nav className="mt-8 flex flex-1 flex-col gap-1">
          <Link href="/dashboard" className="focus-ring flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium hover:bg-mist-100/5">
            <LayoutDashboard size={16} /> Overview
          </Link>
          <Link href="/dashboard/projects" className="focus-ring flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium hover:bg-mist-100/5">
            <FolderKanban size={16} /> Projects
          </Link>
          <Link href="/" target="_blank" className="focus-ring flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium hover:bg-mist-100/5">
            <ExternalLink size={16} /> View Site
          </Link>
        </nav>

        <LogoutButton />
      </aside>

      <main className="flex-1 p-5 sm:p-10">{children}</main>
    </div>
  );
}
