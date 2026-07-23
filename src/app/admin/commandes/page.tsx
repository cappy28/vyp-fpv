import { createAdminClient } from "@/lib/supabase/admin";
import { formatPrice } from "@/lib/utils";
import OrderStatusSelect from "@/components/admin/OrderStatusSelect";
import type { OrderStatus } from "@/lib/types";

export const metadata = { title: "Commandes — Admin" };
export const dynamic = "force-dynamic";

export default async function AdminCommandesPage() {
  const supabase = createAdminClient();
  const { data: orders } = await supabase
    .from("orders")
    .select("*, order_items(*)")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="font-display text-3xl font-700 text-ink">Commandes</h1>

      <div className="mt-6 space-y-3">
        {(orders || []).length === 0 && (
          <p className="text-sm text-ink-muted">Aucune commande pour le moment.</p>
        )}
        {(orders || []).map((order) => (
          <div key={order.id} className="border border-hairline bg-carbon p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-mono text-xs text-ink-faint">
                  #{order.id.slice(0, 8).toUpperCase()}
                </p>
                <p className="text-sm text-ink-muted">
                  {new Date(order.created_at).toLocaleDateString("fr-FR")} — {formatPrice(order.total)}
                </p>
              </div>
              <OrderStatusSelect id={order.id} status={order.status as OrderStatus} />
            </div>
            {order.order_items && order.order_items.length > 0 && (
              <ul className="mt-3 space-y-1 border-t border-hairline pt-3 text-sm text-ink-muted">
                {order.order_items.map((item: { id: string; quantity: number; product_name: string; unit_price: number }) => (
                  <li key={item.id} className="flex justify-between">
                    <span>{item.quantity}x {item.product_name}</span>
                    <span className="font-mono">{formatPrice(item.unit_price * item.quantity)}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
