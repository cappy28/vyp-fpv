"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/lib/types";

export default function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  const image = product.images?.[0];
  const outOfStock = product.stock <= 0;
  const lowStock = product.stock > 0 && product.stock <= 5;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, delay: (index % 8) * 0.04 }}
    >
      <Link
        href={`/produit/${product.slug}`}
        className="group reticle relative block overflow-hidden border border-hairline bg-carbon transition hover:border-signal/40"
      >
        <div className="relative aspect-square overflow-hidden bg-carbon2">
          {image ? (
            <Image
              src={image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center font-mono text-xs text-ink-faint">
              NO SIGNAL
            </div>
          )}

          {product.compare_at_price && (
            <span className="absolute left-2 top-2 border border-copper/40 bg-void/80 px-2 py-1 font-mono text-[10px] text-copper">
              PROMO
            </span>
          )}
          {outOfStock && (
            <span className="absolute right-2 top-2 border border-hairline bg-void/80 px-2 py-1 font-mono text-[10px] text-ink-muted">
              RUPTURE
            </span>
          )}
        </div>

        <div className="p-3.5">
          <p className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">
            {product.categories?.name || "VYP FPV"}
          </p>
          <h3 className="mt-1 line-clamp-1 font-display text-sm font-600 text-ink group-hover:text-signal">
            {product.name}
          </h3>
          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-sm text-ink">
                {formatPrice(product.price)}
              </span>
              {product.compare_at_price && (
                <span className="font-mono text-xs text-ink-faint line-through">
                  {formatPrice(product.compare_at_price)}
                </span>
              )}
            </div>
            {lowStock && (
              <span className="font-mono text-[10px] text-copper">
                {product.stock} restants
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
