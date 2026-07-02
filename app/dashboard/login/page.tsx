"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Loader2 } from "lucide-react";

export default function DashboardLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Login failed");
      }
      router.push("/dashboard");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-950 px-4 py-24 text-mist-100">
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-mist-100/10 bg-ink-900/60 p-8 shadow-card backdrop-blur-xl"
      >
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-violet-500/15 text-violet-400">
          <Lock size={20} />
        </div>
        <h1 className="mt-4 text-center font-display text-xl font-bold">Admin Login</h1>
        <p className="mt-1 text-center text-sm text-mist-400">Only for the site owner</p>

        <div className="mt-6 space-y-4">
          <input
            required
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className="focus-ring w-full rounded-xl border border-mist-100/10 bg-transparent px-4 py-3 text-sm placeholder:text-mist-400/60"
          />
          <input
            required
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
            className="focus-ring w-full rounded-xl border border-mist-100/10 bg-transparent px-4 py-3 text-sm placeholder:text-mist-400/60"
          />
        </div>

        {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="focus-ring mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-violet-600 px-6 py-3 text-sm font-semibold text-white hover:bg-violet-500 disabled:opacity-70"
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : null}
          Sign In
        </button>
      </motion.form>
    </div>
  );
}
