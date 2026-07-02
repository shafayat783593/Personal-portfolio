import Link from "next/link";
import { Github, Mail, MessageCircle } from "lucide-react";
import { profile, navLinks } from "@/lib/data";

const iconMap: Record<string, any> = { Github, Mail, MessageCircle };

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink-900/10 bg-white/40 py-12 dark:border-mist-100/10 dark:bg-ink-900/40">
      <div className="section-shell flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <Link href="#home" className="font-display text-lg font-bold">
            <span className="gradient-text">{profile.brand}</span>
          </Link>
          <p className="mt-2 max-w-xs text-sm text-ink-600/70 dark:text-mist-300/70">
            {profile.designation} based in {profile.location}. Building fast, real-time web products.
          </p>
        </div>

        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-ink-600 dark:text-mist-300">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className="focus-ring hover:text-violet-500 dark:hover:text-violet-400">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href={`mailto:${profile.email}`} aria-label="Email" className="focus-ring rounded-full border border-ink-900/10 p-2.5 hover:border-violet-500/60 hover:text-violet-500 dark:border-mist-100/10">
            <Mail size={16} />
          </a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="focus-ring rounded-full border border-ink-900/10 p-2.5 hover:border-violet-500/60 hover:text-violet-500 dark:border-mist-100/10">
            <Github size={16} />
          </a>
          <a href={`https://wa.me/${profile.whatsapp}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="focus-ring rounded-full border border-ink-900/10 p-2.5 hover:border-violet-500/60 hover:text-violet-500 dark:border-mist-100/10">
            <MessageCircle size={16} />
          </a>
        </div>
      </div>

      <p className="section-shell mt-8 border-t border-ink-900/5 pt-6 text-center text-xs text-ink-500/70 dark:border-mist-100/5 dark:text-mist-400/70">
        © {year} {profile.name}. All rights reserved.
      </p>
    </footer>
  );
}
