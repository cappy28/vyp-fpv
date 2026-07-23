"use client";

import { motion } from "framer-motion";
import Stars from "@/components/ui/Stars";

const TESTIMONIALS = [
  {
    name: "Theo M.",
    handle: "@theo.freestyle",
    rating: 5,
    text: "La sangle LiPo premium ne bouge absolument pas, meme sur des crash violents. Livraison en 2 jours.",
  },
  {
    name: "Camille R.",
    handle: "@cam_racing",
    rating: 5,
    text: "L'etui pour mes DJI Goggles est parfaitement decoupe, tout rentre nickel avec le cable et les antennes.",
  },
  {
    name: "Yanis B.",
    handle: "@yanis.fpv",
    rating: 4,
    text: "Bon rapport qualite prix sur le kit de tournevis, je l'utilise a chaque session de reglage.",
  },
];

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
      <p className="text-mono-label">Retours pilotes</p>
      <h2 className="mt-2 font-display text-3xl font-700 text-ink md:text-4xl">
        Ce qu'en disent les pilotes
      </h2>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <motion.div
            key={t.handle}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="border border-hairline bg-carbon p-6"
          >
            <Stars rating={t.rating} />
            <p className="mt-4 text-sm leading-relaxed text-ink-muted">
              "{t.text}"
            </p>
            <div className="mt-5 border-t border-hairline pt-4">
              <p className="text-sm text-ink">{t.name}</p>
              <p className="font-mono text-[11px] text-ink-faint">{t.handle}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
