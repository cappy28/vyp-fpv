"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";

export default function UserRoleSelect({ id, role }: { id: string; role: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function toggle() {
    setLoading(true);
    const nextRole = role === "admin" ? "customer" : "admin";
    await fetch("/api/admin/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, role: nextRole }),
    });
    setLoading(false);
    router.refresh();
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={clsx(
        "border px-2.5 py-1 font-mono text-[10px] uppercase transition",
        role === "admin"
          ? "border-copper/40 bg-copper/10 text-copper"
          : "border-hairline text-ink-muted hover:border-signal/40 hover:text-signal"
      )}
    >
      {role === "admin" ? "Admin" : "Client"}
    </button>
  );
}
