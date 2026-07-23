"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice } from "@/lib/utils";
import Button from "@/components/ui/Button";

export default function CartView() {
  const [mounted, setMounted] = useState(false);
  const items = useCartStore((s) => s.items);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const total = useCartStore((s) => s.total());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => setMounted(true), []);

  async function handleCheckout() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError("Impossible de lancer le paiement. Reessaie.");
      }
    } catch {
      setError("Impossible de lancer le paiement. Reessaie.");
    } finally {
      setLoading(false);
    }
  }

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div className="reticle border border-hairline bg-carbon px-6 py-16 text-center">
        <p className="text-mono-label text-copper">PANIER VIDE</p>
        <p className="mt-2 text-sm text-ink-muted">
          Aucun article pour le moment.
        </p>
        <Link
          href="/boutique"
          className="mt-6 inline-block border border-signal/40 bg-signal/10 px-6 py-3 text-mono-label text-signal hover:bg-signal/20"
        >
          Voir la boutique
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="space-y-3 lg:col-span-2">
        {items.map((item) => (
          <div
            key={item.productId}
            className="flex gap-4 border border-hairline bg-carbon p-4"
          >
            <div className="relative h-20 w-20 shrink-0 overflow-hidden bg-carbon2">
              {item.image && (
                <Image src={item.image} alt={item.name} fill className="object-cover" />
              )}
            </div>
            <div className="flex flex-1 flex-col justify-between">
              <div className="flex items-start justify-between gap-2">
                <Link
                  href={`/produit/${item.slug}`}
                  className="font-display text-sm font-600 text-ink hover:text-signal"
                >
                  {item.name}
                </Link>
                <button
                  onClick={() => removeItem(item.productId)}
                  aria-label="Supprimer"
                  className="text-ink-faint hover:text-red-400"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center border border-hairline">
                  <button
                    onClick={() => setQuantity(item.productId, item.quantity - 1)}
                    className="p-2 text-ink-muted hover:text-signal"
                    aria-label="Diminuer"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="w-7 text-center font-mono text-xs">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(item.productId, item.quantity + 1)}
                    className="p-2 text-ink-muted hover:text-signal"
                    aria-label="Augmenter"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
                <span className="font-mono text-sm text-ink">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="h-fit border border-hairline bg-carbon p-6">
        <p className="text-mono-label mb-4">Recapitulatif</p>
        <div className="flex justify-between text-sm text-ink-muted">
          <span>Sous-total</span>
          <span className="font-mono">{formatPrice(total)}</span>
        </div>
        <div className="mt-2 flex justify-between text-sm text-ink-muted">
          <span>Livraison</span>
          <span className="font-mono">Calculee a l'etape suivante</span>
        </div>
        <div className="mt-4 flex justify-between border-t border-hairline pt-4 text-ink">
          <span className="font-display font-600">Total</span>
          <span className="font-mono text-lg">{formatPrice(total)}</span>
        </div>

        {error && <p className="mt-3 text-xs text-red-400">{error}</p>}

        <Button
          onClick={handleCheckout}
          disabled={loading}
          variant="primary"
          className="mt-6 w-full"
        >
          {loading ? "Redirection..." : "Passer commande"}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
