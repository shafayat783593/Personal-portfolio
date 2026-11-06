"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MailOpen, Trash2, X, Loader2, RefreshCw } from "lucide-react";

type MessageItem = {
  _id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  read?: boolean;
  createdAt?: string;
};

export default function DashboardMessagesPage() {
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
  const [selected, setSelected] = useState<MessageItem | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/messages");
      const data = await res.json();
      setMessages(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const markRead = async (id: string, read: boolean) => {
    try {
      const res = await fetch(`/api/messages/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read }),
      });
      if (res.ok) {
        setMessages((prev) =>
          prev.map((m) => (m._id === id ? { ...m, read } : m))
        );
        if (selected?._id === id) setSelected((s) => (s ? { ...s, read } : s));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this message? This cannot be undone.")) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/messages/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMessages((prev) => prev.filter((m) => m._id !== id));
        if (selected?._id === id) setSelected(null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setDeleting(null);
    }
  };

  const openMessage = (m: MessageItem) => {
    setSelected(m);
    if (!m.read) markRead(m._id, true);
  };

  const filtered = messages.filter((m) => {
    if (filter === "unread") return !m.read;
    if (filter === "read") return !!m.read;
    return true;
  });

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold">Messages</h1>
          <p className="mt-1 text-sm text-mist-400">
            Inbox from your portfolio contact form. {unreadCount} unread.
          </p>
        </div>
        <button
          onClick={load}
          className="focus-ring inline-flex items-center gap-2 rounded-full border border-mist-100/10 px-4 py-2 text-sm font-medium hover:bg-mist-100/5"
        >
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      <div className="mt-6 flex gap-2">
        {(["all", "unread", "read"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`focus-ring rounded-full px-4 py-1.5 text-xs font-medium capitalize transition ${
              filter === f
                ? "bg-violet-600 text-white"
                : "border border-mist-100/10 text-mist-300 hover:bg-mist-100/5"
            }`}
          >
            {f}{" "}
            {f === "unread" && unreadCount > 0 && `(${unreadCount})`}
          </button>
        ))}
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-mist-100/10">
        {loading ? (
          <div className="flex items-center justify-center gap-2 p-10 text-sm text-mist-400">
            <Loader2 size={16} className="animate-spin" /> Loading...
          </div>
        ) : filtered.length === 0 ? (
          <p className="p-10 text-center text-sm text-mist-400">
            {filter === "unread"
              ? "No unread messages."
              : filter === "read"
              ? "No read messages."
              : "No messages yet."}
          </p>
        ) : (
          <ul className="divide-y divide-mist-100/10">
            {filtered.map((m) => (
              <li
                key={m._id}
                className={`cursor-pointer px-5 py-4 transition hover:bg-mist-100/5 ${
                  m.read ? "" : "bg-violet-500/5"
                }`}
                onClick={() => openMessage(m)}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      {m.read ? (
                        <MailOpen size={14} className="shrink-0 text-mist-500" />
                      ) : (
                        <Mail size={14} className="shrink-0 text-violet-400" />
                      )}
                      <p className="truncate text-sm font-semibold">{m.name}</p>
                      <span className="truncate text-xs text-mist-500">{m.email}</span>
                    </div>
                    <p className="mt-1 truncate text-sm text-mist-300">
                      {m.subject || "New portfolio message"}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-mist-500">
                      {m.message}
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-2">
                    <span className="text-[11px] text-mist-500">
                      {m.createdAt
                        ? new Date(m.createdAt).toLocaleDateString()
                        : ""}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(m._id);
                      }}
                      disabled={deleting === m._id}
                      className="focus-ring rounded-lg p-1.5 text-red-400 hover:bg-red-500/10 disabled:opacity-50"
                      aria-label="Delete"
                    >
                      {deleting === m._id ? (
                        <Loader2 size={14} className="animate-spin" />
                      ) : (
                        <Trash2 size={14} />
                      )}
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-mist-100/10 bg-ink-900 p-6 sm:p-8"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-display text-lg font-bold">{selected.name}</h2>
                  <a
                    href={`mailto:${selected.email}`}
                    className="text-sm text-violet-400 hover:underline"
                  >
                    {selected.email}
                  </a>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="focus-ring rounded-lg p-1.5 hover:bg-mist-100/10"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>

              <p className="mt-4 text-sm font-medium text-mist-300">
                Subject: {selected.subject || "New portfolio message"}
              </p>
              <p className="mt-1 text-xs text-mist-500">
                {selected.createdAt
                  ? new Date(selected.createdAt).toLocaleString()
                  : ""}
              </p>

              <div className="mt-5 whitespace-pre-wrap rounded-xl border border-mist-100/10 bg-ink-950/40 p-4 text-sm leading-relaxed text-mist-200">
                {selected.message}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(
                    selected.subject || "New portfolio message"
                  )}`}
                  className="focus-ring inline-flex items-center gap-2 rounded-full bg-violet-600 px-5 py-2.5 text-sm font-semibold hover:bg-violet-500"
                >
                  Reply via Email
                </a>
                <button
                  onClick={() => markRead(selected._id, !selected.read)}
                  className="focus-ring inline-flex items-center gap-2 rounded-full border border-mist-100/10 px-5 py-2.5 text-sm font-medium hover:bg-mist-100/5"
                >
                  Mark as {selected.read ? "Unread" : "Read"}
                </button>
                <button
                  onClick={() => handleDelete(selected._id)}
                  className="focus-ring inline-flex items-center gap-2 rounded-full border border-red-500/30 px-5 py-2.5 text-sm font-medium text-red-400 hover:bg-red-500/10"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}