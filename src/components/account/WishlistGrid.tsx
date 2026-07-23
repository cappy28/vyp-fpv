import ProductCard from "@/components/shop/ProductCard";
import type { Product } from "@/lib/types";

export default function WishlistGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <p className="text-sm text-ink-muted">
        Aucun favori. Clique sur le coeur d'un produit pour l'ajouter ici.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {products.map((p, i) => (
        <ProductCard key={p.id} product={p} index={i} />
      ))}
    </div>
  );
}
