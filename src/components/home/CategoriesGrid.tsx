"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Category } from "@/lib/types";

export default function CategoriesGrid({
  categories,
}: {
  categories: Category[];
}) {
  if (categories.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <p className="text-mono-label">Categories</p>
          <h2 className="mt-2 font-display text-3xl font-700 text-ink md:text-4xl">
            Trouve ton equipement
          </h2>
        </div>
        <Link href="/boutique" className="hidden text-mono-label text-signal hover:underline md:block">
          Tout voir
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: i * 0.04 }}
          >
            <Link
              href={`/boutique?categorie=${cat.slug}`}
              className="group block border border-hairline bg-carbon p-5 transition hover:border-signal/40 hover:bg-carbon2"
            >
              <span className="font-mono text-[11px] text-ink-faint">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display text-base font-600 text-ink group-hover:text-signal">
                {cat.name}
              </h3>
              {cat.description && (
                <p className="mt-1 line-clamp-2 text-xs text-ink-muted">
                  {cat.description}
                </p>
              )}
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
