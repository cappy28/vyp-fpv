import Link from "next/link";
import { Plus } from "lucide-react";
import { createAdminClient } from "@/lib/supabase/admin";
import { formatPrice } from "@/lib/utils";
import DeleteProductButton from "@/components/admin/DeleteProductButton";

export const metadata = { title: "Produits — Admin" };
export const dynamic = "force-dynamic";

export default async function AdminProduitsPage() {
  const supabase = createAdminClient();
  const { data: products } = await supabase
    .from("products")
    .select("*, categories(name)")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-700 text-ink">Produits</h1>
        <Link
          href="/admin/produits/nouveau"
          className="inline-flex items-center gap-2 border border-signal/40 bg-signal/10 px-4 py-2.5 text-mono-label text-signal hover:bg-signal/20"
        >
          <Plus className="h-4 w-4" />
          Nouveau
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto border border-hairline">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-hairline text-mono-label">
            <tr>
              <th className="px-4 py-3">Produit</th>
              <th className="px-4 py-3">Categorie</th>
              <th className="px-4 py-3">Prix</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {(products || []).map((p) => (
              <tr key={p.id} className="border-b border-hairline last:border-0">
                <td className="px-4 py-3 text-ink">{p.name}</td>
                <td className="px-4 py-3 text-ink-muted">{p.categories?.name || "—"}</td>
                <td className="px-4 py-3 font-mono text-ink-muted">{formatPrice(p.price)}</td>
                <td className="px-4 py-3 font-mono text-ink-muted">{p.stock}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      href={`/admin/produits/${p.id}`}
                      className="px-2 py-1 font-mono text-xs text-signal hover:underline"
                    >
                      Modifier
                    </Link>
                    <DeleteProductButton id={p.id} name={p.name} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
