"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X, Search, User, Heart, Package } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/boutique", label: "Boutique" },
  { href: "/compte", label: "Mon compte", icon: User },
  { href: "/compte?tab=favoris", label: "Favoris", icon: Heart },
  { href: "/compte?tab=commandes", label: "Commandes", icon: Package },
];

export default function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!search.trim()) return;
    router.push(`/boutique?recherche=${encodeURIComponent(search.trim())}`);
    onClose();
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-void/80 backdrop-blur-sm md:hidden"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.25, ease: "easeOut" }}
            className="fixed right-0 top-0 z-50 flex h-full w-[82%] max-w-sm flex-col bg-carbon2 p-6 md:hidden"
          >
            <div className="flex items-center justify-between">
              <span className="text-mono-label">Navigation</span>
              <button
                onClick={onClose}
                aria-label="Fermer le menu"
                className="rounded-full p-2 text-ink-muted hover:bg-white/5"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSearch} className="relative mt-6">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="search"
                placeholder="Rechercher..."
                className="w-full border border-hairline bg-void py-2.5 pl-9 pr-3 text-sm text-ink placeholder:text-ink-faint focus:border-signal/50"
              />
            </form>

            <nav className="mt-8 flex flex-col gap-1">
              {LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={onClose}
                  className="flex items-center gap-3 border-b border-hairline py-4 font-display text-lg text-ink transition hover:text-signal"
                >
                  {link.icon && <link.icon className="h-4 w-4" />}
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
