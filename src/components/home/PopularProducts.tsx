import Link from "next/link";
import ProductCard from "@/components/shop/ProductCard";
import type { Product } from "@/lib/types";

export default function PopularProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <section className="border-t border-hairline bg-carbon/30">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-mono-label">Selection</p>
            <h2 className="mt-2 font-display text-3xl font-700 text-ink md:text-4xl">
              Produits populaires
            </h2>
          </div>
          <Link href="/boutique?tri=populaire" className="hidden text-mono-label text-signal hover:underline md:block">
            Tout voir
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
