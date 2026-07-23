"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const FAQS = [
  {
    q: "Quels sont les delais de livraison ?",
    a: "Les commandes sont expediees sous 24h et livrees en 48 a 72h en France metropolitaine.",
  },
  {
    q: "Les paiements sont-ils securises ?",
    a: "Oui, tous les paiements sont traites par Stripe. VYP FPV n'a jamais acces a tes coordonnees bancaires.",
  },
  {
    q: "Puis-je retourner un produit ?",
    a: "Tu disposes de 14 jours apres reception pour retourner un article non utilise, dans son emballage d'origine.",
  },
  {
    q: "Vendez-vous des drones complets ?",
    a: "Non, VYP FPV est specialise uniquement dans les accessoires (sangles, protections, antennes, outils, organisation).",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 md:px-8 md:py-24">
      <p className="text-mono-label">FAQ</p>
      <h2 className="mt-2 font-display text-3xl font-700 text-ink md:text-4xl">
        Questions frequentes
      </h2>

      <div className="mt-8 divide-y divide-hairline border-y border-hairline">
        {FAQS.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.q}>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between py-5 text-left"
                aria-expanded={isOpen}
              >
                <span className="font-display text-base font-600 text-ink">
                  {item.q}
                </span>
                <Plus
                  className={`h-4 w-4 shrink-0 text-signal transition-transform ${isOpen ? "rotate-45" : ""}`}
                />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 text-sm text-ink-muted">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
