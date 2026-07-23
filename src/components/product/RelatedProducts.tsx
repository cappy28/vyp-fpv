import ProductCard from "@/components/shop/ProductCard";
import type { Product } from "@/lib/types";

export default function RelatedProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <section className="mt-16 border-t border-hairline pt-10">
      <p className="text-mono-label">Complete ton setup</p>
      <h2 className="mt-2 font-display text-2xl font-700 text-ink">
        Produits similaires
      </h2>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </section>
  );
}
