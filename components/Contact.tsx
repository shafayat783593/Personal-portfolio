"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MessageCircle, Send, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { profile } from "@/lib/data";

type Status = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative py-24">
      <div className="section-shell grid grid-cols-1 gap-12 lg:grid-cols-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-2"
        >
          <span className="eyebrow">Contact</span>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Let&apos;s work together</h2>
          <p className="mt-4 text-ink-600/80 dark:text-mist-300/80">
            Have a project in mind or just want to say hi? My inbox is always open.
          </p>

          <div className="mt-8 space-y-4">
            <a href={`mailto:${profile.email}`} className="focus-ring flex items-center gap-3 rounded-xl p-2 text-sm hover:text-violet-500">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/15 text-violet-500 dark:text-violet-400">
                <Mail size={18} />
              </span>
              {profile.email}
            </a>
            <a href={`tel:${profile.phone}`} className="focus-ring flex items-center gap-3 rounded-xl p-2 text-sm hover:text-violet-500">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/15 text-violet-500 dark:text-violet-400">
                <Phone size={18} />
              </span>
              {profile.phone}
            </a>
            <a href={`https://wa.me/${profile.whatsapp}`} target="_blank" rel="noopener noreferrer" className="focus-ring flex items-center gap-3 rounded-xl p-2 text-sm hover:text-violet-500">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/15 text-violet-500 dark:text-violet-400">
                <MessageCircle size={18} />
              </span>
              WhatsApp: {profile.phone}
            </a>
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          onSubmit={handleSubmit}
          className="card-surface space-y-4 p-6 sm:p-8 lg:col-span-3"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input
              required
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              className="focus-ring rounded-xl border border-ink-900/10 bg-transparent px-4 py-3 text-sm placeholder:text-ink-500/60 dark:border-mist-100/10 dark:placeholder:text-mist-400/60"
            />
            <input
              required
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your email"
              className="focus-ring rounded-xl border border-ink-900/10 bg-transparent px-4 py-3 text-sm placeholder:text-ink-500/60 dark:border-mist-100/10 dark:placeholder:text-mist-400/60"
            />
          </div>
          <input
            name="subject"
            value={form.subject}
            onChange={handleChange}
            placeholder="Subject"
            className="focus-ring w-full rounded-xl border border-ink-900/10 bg-transparent px-4 py-3 text-sm placeholder:text-ink-500/60 dark:border-mist-100/10 dark:placeholder:text-mist-400/60"
          />
          <textarea
            required
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={5}
            placeholder="Tell me about your project..."
            className="focus-ring w-full resize-none rounded-xl border border-ink-900/10 bg-transparent px-4 py-3 text-sm placeholder:text-ink-500/60 dark:border-mist-100/10 dark:placeholder:text-mist-400/60"
          />

          <button
            type="submit"
            disabled={status === "loading"}
            className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-full bg-violet-600 px-6 py-3.5 text-sm font-semibold text-white shadow-glow transition-transform hover:-translate-y-0.5 hover:bg-violet-500 disabled:opacity-70 sm:w-auto"
          >
            {status === "loading" ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Sending...
              </>
            ) : (
              <>
                <Send size={16} /> Send Message
              </>
            )}
          </button>

          {status === "success" && (
            <p className="flex items-center gap-2 text-sm text-emerald-500">
              <CheckCircle2 size={16} /> Message sent — I&apos;ll get back to you soon.
            </p>
          )}
          {status === "error" && (
            <p className="flex items-center gap-2 text-sm text-red-500">
              <XCircle size={16} /> Something went wrong. Please email me directly.
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
}
