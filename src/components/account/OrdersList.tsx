import { formatPrice } from "@/lib/utils";
import type { Order } from "@/lib/types";

const STATUS_LABELS: Record<string, string> = {
  pending: "En attente",
  paid: "Payee",
  shipped: "Expediee",
  delivered: "Livree",
  cancelled: "Annulee",
};

export default function OrdersList({ orders }: { orders: Order[] }) {
  if (orders.length === 0) {
    return (
      <p className="text-sm text-ink-muted">
        Aucune commande pour le moment.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {orders.map((order) => (
        <div key={order.id} className="border border-hairline bg-carbon p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="font-mono text-xs text-ink-faint">
                #{order.id.slice(0, 8).toUpperCase()}
              </p>
              <p className="text-sm text-ink-muted">
                {new Date(order.created_at).toLocaleDateString("fr-FR")}
              </p>
            </div>
            <span className="border border-signal/30 bg-signal/10 px-2.5 py-1 font-mono text-[10px] text-signal">
              {STATUS_LABELS[order.status] || order.status}
            </span>
          </div>
          {order.order_items && order.order_items.length > 0 && (
            <ul className="mt-3 space-y-1 border-t border-hairline pt-3 text-sm text-ink-muted">
              {order.order_items.map((item) => (
                <li key={item.id} className="flex justify-between">
                  <span>{item.quantity}x {item.product_name}</span>
                  <span className="font-mono">{formatPrice(item.unit_price * item.quantity)}</span>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-3 flex justify-between border-t border-hairline pt-3 text-ink">
            <span className="text-sm">Total</span>
            <span className="font-mono text-sm">{formatPrice(order.total)}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
