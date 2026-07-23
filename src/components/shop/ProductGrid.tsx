import ProductCard from "./ProductCard";
import type { Product } from "@/lib/types";

export default function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="reticle border border-hairline bg-carbon px-6 py-16 text-center">
        <p className="text-mono-label text-copper">AUCUN RESULTAT</p>
        <p className="mt-2 text-sm text-ink-muted">
          Essaie d'elargir tes filtres ou ta recherche.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
      {products.map((p, i) => (
        <ProductCard key={p.id} product={p} index={i} />
      ))}
    </div>
  );
}
