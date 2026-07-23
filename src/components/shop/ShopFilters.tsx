"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import clsx from "clsx";
import type { Category } from "@/lib/types";

const SORT_OPTIONS = [
  { value: "populaire", label: "Popularite" },
  { value: "prix-asc", label: "Prix croissant" },
  { value: "prix-desc", label: "Prix decroissant" },
  { value: "recent", label: "Nouveautes" },
];

export default function ShopFilters({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [mobileOpen, setMobileOpen] = useState(false);

  const activeCategory = searchParams.get("categorie") || "";
  const activeSort = searchParams.get("tri") || "populaire";
  const inStockOnly = searchParams.get("stock") === "1";
  const minPrice = searchParams.get("min") || "";
  const maxPrice = searchParams.get("max") || "";

  function updateParam(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`${pathname}?${params.toString()}`);
  }

  const content = (
    <div className="space-y-8">
      <div>
        <p className="text-mono-label mb-3">Trier par</p>
        <select
          value={activeSort}
          onChange={(e) => updateParam("tri", e.target.value)}
          className="w-full border border-hairline bg-carbon px-3 py-2.5 text-sm text-ink focus:border-signal/50"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <p className="text-mono-label mb-3">Categorie</p>
        <div className="flex flex-col gap-1">
          <button
            onClick={() => updateParam("categorie", null)}
            className={clsx(
              "px-3 py-2 text-left text-sm transition",
              !activeCategory ? "bg-signal/10 text-signal" : "text-ink-muted hover:text-ink"
            )}
          >
            Toutes les categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => updateParam("categorie", cat.slug)}
              className={clsx(
                "px-3 py-2 text-left text-sm transition",
                activeCategory === cat.slug
                  ? "bg-signal/10 text-signal"
                  : "text-ink-muted hover:text-ink"
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-mono-label mb-3">Prix (EUR)</p>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min={0}
            placeholder="Min"
            defaultValue={minPrice}
            onBlur={(e) => updateParam("min", e.target.value || null)}
            className="w-full border border-hairline bg-carbon px-3 py-2 text-sm text-ink placeholder:text-ink-faint focus:border-signal/50"
          />
          <span className="text-ink-faint">-</span>
          <input
            type="number"
            min={0}
            placeholder="Max"
            defaultValue={maxPrice}
            onBlur={(e) => updateParam("max", e.target.value || null)}
            className="w-full border border-hairline bg-carbon px-3 py-2 text-sm text-ink placeholder:text-ink-faint focus:border-signal/50"
          />
        </div>
      </div>

      <label className="flex cursor-pointer items-center gap-2 text-sm text-ink-muted">
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => updateParam("stock", e.target.checked ? "1" : null)}
          className="h-4 w-4 accent-signal"
        />
        En stock uniquement
      </label>
    </div>
  );

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="mb-4 inline-flex items-center gap-2 border border-hairline px-4 py-2.5 text-mono-label lg:hidden"
      >
        <SlidersHorizontal className="h-4 w-4" />
        Filtres
      </button>

      <aside className="hidden w-64 shrink-0 lg:block">{content}</aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="absolute inset-0 bg-void/80 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative ml-auto h-full w-[82%] max-w-sm overflow-y-auto bg-carbon2 p-6">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-mono-label">Filtres</span>
              <button onClick={() => setMobileOpen(false)} aria-label="Fermer">
                <X className="h-5 w-5 text-ink-muted" />
              </button>
            </div>
            {content}
          </div>
        </div>
      )}
    </>
  );
}
