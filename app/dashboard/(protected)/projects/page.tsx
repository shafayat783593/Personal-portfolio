"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, X, Save, Loader2 } from "lucide-react";

type ProjectForm = {
  _id?: string;
  slug: string;
  name: string;
  image: string;
  summary: string;
  description: string;
  stack: string;
  liveUrl: string;
  githubUrl: string;
  challenges: string;
  improvements: string;
};

const emptyForm: ProjectForm = {
  slug: "",
  name: "",
  image: "",
  summary: "",
  description: "",
  stack: "",
  liveUrl: "",
  githubUrl: "",
  challenges: "",
  improvements: "",
};

export default function DashboardProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<ProjectForm>(emptyForm);

  const load = async () => {
    setLoading(true);
    const res = await fetch("/api/projects");
    const data = await res.json();
    setProjects(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const openNew = () => {
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (p: any) => {
    setForm({
      _id: p._id,
      slug: p.slug,
      name: p.name,
      image: p.image,
      summary: p.summary,
      description: p.description,
      stack: (p.stack || []).join(", "),
      liveUrl: p.liveUrl || "",
      githubUrl: p.githubUrl || "",
      challenges: p.challenges || "",
      improvements: p.improvements || "",
    });
    setShowForm(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...form,
      stack: form.stack.split(",").map((s) => s.trim()).filter(Boolean),
    };

    const isEdit = !!form._id;
    const url = isEdit ? `/api/projects/${form._id}` : "/api/projects";
    const method = isEdit ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setSaving(false);
    if (res.ok) {
      setShowForm(false);
      load();
    } else {
      const data = await res.json();
      alert(data.error || "Failed to save project");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this project? This cannot be undone.")) return;
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Projects</h1>
          <p className="mt-1 text-sm text-mist-400">Add, edit, or remove projects shown on your portfolio.</p>
        </div>
        <button
          onClick={openNew}
          className="focus-ring inline-flex items-center gap-2 rounded-full bg-violet-600 px-5 py-2.5 text-sm font-semibold hover:bg-violet-500"
        >
          <Plus size={16} /> New Project
        </button>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-mist-100/10">
        {loading ? (
          <div className="flex items-center justify-center gap-2 p-10 text-sm text-mist-400">
            <Loader2 size={16} className="animate-spin" /> Loading...
          </div>
        ) : projects.length === 0 ? (
          <p className="p-10 text-center text-sm text-mist-400">
            No projects in the database yet — the public site is showing sample data. Add your first project.
          </p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="bg-ink-900/60 text-xs uppercase text-mist-400">
              <tr>
                <th className="px-5 py-3">Name</th>
                <th className="hidden px-5 py-3 sm:table-cell">Slug</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p._id} className="border-t border-mist-100/10">
                  <td className="px-5 py-3.5 font-medium">{p.name}</td>
                  <td className="hidden px-5 py-3.5 text-mist-400 sm:table-cell">{p.slug}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => openEdit(p)} className="focus-ring rounded-lg p-2 hover:bg-mist-100/10" aria-label="Edit">
                        <Pencil size={15} />
                      </button>
                      <button onClick={() => handleDelete(p._id)} className="focus-ring rounded-lg p-2 text-red-400 hover:bg-red-500/10" aria-label="Delete">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
            onClick={() => setShowForm(false)}
          >
            <motion.form
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              onClick={(e) => e.stopPropagation()}
              onSubmit={handleSave}
              className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-mist-100/10 bg-ink-900 p-6 sm:p-8"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-display text-lg font-bold">{form._id ? "Edit Project" : "New Project"}</h2>
                <button type="button" onClick={() => setShowForm(false)} className="focus-ring rounded-lg p-1.5 hover:bg-mist-100/10">
                  <X size={18} />
                </button>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Project Name" value={form.name} onChange={(v) => setForm((f) => ({ ...f, name: v }))} required />
                <Field label="Slug (url-friendly)" value={form.slug} onChange={(v) => setForm((f) => ({ ...f, slug: v }))} required />
                <Field label="Image URL" value={form.image} onChange={(v) => setForm((f) => ({ ...f, image: v }))} required className="sm:col-span-2" />
                <Field label="Summary (short, for the card)" value={form.summary} onChange={(v) => setForm((f) => ({ ...f, summary: v }))} required className="sm:col-span-2" />
                <Field label="Full Description" value={form.description} onChange={(v) => setForm((f) => ({ ...f, description: v }))} textarea className="sm:col-span-2" />
                <Field label="Tech Stack (comma separated)" value={form.stack} onChange={(v) => setForm((f) => ({ ...f, stack: v }))} className="sm:col-span-2" />
                <Field label="Live URL" value={form.liveUrl} onChange={(v) => setForm((f) => ({ ...f, liveUrl: v }))} />
                <Field label="GitHub URL (client)" value={form.githubUrl} onChange={(v) => setForm((f) => ({ ...f, githubUrl: v }))} />
                <Field label="Challenges" value={form.challenges} onChange={(v) => setForm((f) => ({ ...f, challenges: v }))} textarea className="sm:col-span-2" />
                <Field label="Future Improvements" value={form.improvements} onChange={(v) => setForm((f) => ({ ...f, improvements: v }))} textarea className="sm:col-span-2" />
              </div>

              <button
                type="submit"
                disabled={saving}
                className="focus-ring mt-6 inline-flex items-center gap-2 rounded-full bg-violet-600 px-6 py-3 text-sm font-semibold hover:bg-violet-500 disabled:opacity-70"
              >
                {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                Save Project
              </button>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  required,
  textarea,
  className = "",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  textarea?: boolean;
  className?: string;
}) {
  return (
    <label className={`block text-sm ${className}`}>
      <span className="mb-1.5 block text-xs font-medium text-mist-400">{label}</span>
      {textarea ? (
        <textarea
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="focus-ring w-full resize-none rounded-xl border border-mist-100/10 bg-transparent px-3.5 py-2.5 text-sm"
        />
      ) : (
        <input
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="focus-ring w-full rounded-xl border border-mist-100/10 bg-transparent px-3.5 py-2.5 text-sm"
        />
      )}
    </label>
  );
}
