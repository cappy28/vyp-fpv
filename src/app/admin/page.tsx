import { createAdminClient } from "@/lib/supabase/admin";
import { formatPrice } from "@/lib/utils";

export const metadata = { title: "Admin" };
export const dynamic = "force-dynamic";

async function getStats() {
  const supabase = createAdminClient();

  const [{ count: productCount }, { count: orderCount }, { count: userCount }, { data: orders }] =
    await Promise.all([
      supabase.from("products").select("*", { count: "exact", head: true }),
      supabase.from("orders").select("*", { count: "exact", head: true }),
      supabase.from("profiles").select("*", { count: "exact", head: true }),
      supabase.from("orders").select("total").eq("status", "paid"),
    ]);

  const revenue = (orders || []).reduce((sum, o) => sum + Number(o.total), 0);

  return {
    productCount: productCount || 0,
    orderCount: orderCount || 0,
    userCount: userCount || 0,
    revenue,
  };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  const cards = [
    { label: "Produits", value: stats.productCount },
    { label: "Commandes", value: stats.orderCount },
    { label: "Utilisateurs", value: stats.userCount },
    { label: "Chiffre d'affaires", value: formatPrice(stats.revenue) },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl font-700 text-ink">Dashboard</h1>
      <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="border border-hairline bg-carbon p-5">
            <p className="text-mono-label">{c.label}</p>
            <p className="mt-2 font-mono text-2xl text-signal">{c.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
