"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Search, Heart, ShoppingCart, User, Menu, Radio } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import MobileMenu from "./MobileMenu";

const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/boutique", label: "Boutique" },
];

export default function Header() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [mounted, setMounted] = useState(false);
  const count = useCartStore((s) => s.count());

  useEffect(() => setMounted(true), []);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!search.trim()) return;
    router.push(`/boutique?recherche=${encodeURIComponent(search.trim())}`);
    setMenuOpen(false);
  }

  return (
    <header className="glass sticky top-0 z-50 border-b border-hairline">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-8">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Radio className="h-5 w-5 text-signal" strokeWidth={1.75} />
          <span className="font-display text-xl font-700 tracking-[0.08em] text-ink">
            VYP<span className="text-signal">FPV</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-mono-label hover:text-signal transition"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <form
          onSubmit={handleSearch}
          className="relative hidden max-w-xs flex-1 items-center md:flex"
        >
          <Search className="pointer-events-none absolute left-3 h-4 w-4 text-ink-faint" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="search"
            placeholder="Rechercher un accessoire..."
            className="w-full border border-hairline bg-carbon py-2 pl-9 pr-3 text-sm text-ink placeholder:text-ink-faint focus:border-signal/50"
          />
        </form>

        <div className="flex items-center gap-1">
          <Link
            href="/compte"
            aria-label="Mon compte"
            className="hidden rounded-full p-2 text-ink-muted transition hover:bg-white/5 hover:text-signal md:inline-flex"
          >
            <User className="h-5 w-5" />
          </Link>
          <Link
            href="/compte?tab=favoris"
            aria-label="Mes favoris"
            className="hidden rounded-full p-2 text-ink-muted transition hover:bg-white/5 hover:text-signal md:inline-flex"
          >
            <Heart className="h-5 w-5" />
          </Link>
          <Link
            href="/panier"
            aria-label="Mon panier"
            className="relative rounded-full p-2 text-ink-muted transition hover:bg-white/5 hover:text-signal"
          >
            <ShoppingCart className="h-5 w-5" />
            {mounted && count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-signal px-1 font-mono text-[10px] font-bold text-void">
                {count}
              </span>
            )}
          </Link>
          <button
            aria-label="Ouvrir le menu"
            onClick={() => setMenuOpen(true)}
            className="rounded-full p-2 text-ink-muted transition hover:bg-white/5 hover:text-signal md:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
