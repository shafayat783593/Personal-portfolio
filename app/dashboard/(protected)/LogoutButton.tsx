"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/dashboard/login");
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      className="focus-ring mt-auto flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-red-400 hover:bg-red-500/10"
    >
      <LogOut size={16} /> Log Out
    </button>
  );
}
