"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingCart, Check } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import Button from "@/components/ui/Button";
import type { Product } from "@/lib/types";

export default function AddToCartButton({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const outOfStock = product.stock <= 0;

  function handleAdd() {
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images?.[0] || null,
      quantity: qty,
      stock: product.stock,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  if (outOfStock) {
    return (
      <Button variant="secondary" disabled className="w-full">
        Rupture de stock
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center border border-hairline">
        <button
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          className="p-3 text-ink-muted hover:text-signal"
          aria-label="Diminuer la quantite"
        >
          <Minus className="h-3.5 w-3.5" />
        </button>
        <span className="w-8 text-center font-mono text-sm">{qty}</span>
        <button
          onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
          className="p-3 text-ink-muted hover:text-signal"
          aria-label="Augmenter la quantite"
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>
      <Button onClick={handleAdd} variant="primary" className="flex-1">
        {added ? <Check className="h-4 w-4" /> : <ShoppingCart className="h-4 w-4" />}
        {added ? "Ajoute au panier" : "Ajouter au panier"}
      </Button>
    </div>
  );
}
