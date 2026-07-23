"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { OrderStatus } from "@/lib/types";

const STATUSES: OrderStatus[] = ["pending", "paid", "shipped", "delivered", "cancelled"];
const LABELS: Record<OrderStatus, string> = {
  pending: "En attente",
  paid: "Payee",
  shipped: "Expediee",
  delivered: "Livree",
  cancelled: "Annulee",
};

export default function OrderStatusSelect({ id, status }: { id: string; status: OrderStatus }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setLoading(true);
    await fetch("/api/admin/orders", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: e.target.value }),
    });
    setLoading(false);
    router.refresh();
  }

  return (
    <select
      defaultValue={status}
      onChange={handleChange}
      disabled={loading}
      className="border border-hairline bg-carbon px-2 py-1.5 font-mono text-xs text-ink focus:border-signal/50"
    >
      {STATUSES.map((s) => (
        <option key={s} value={s}>{LABELS[s]}</option>
      ))}
    </select>
  );
}
