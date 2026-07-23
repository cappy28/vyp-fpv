"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, Signal } from "lucide-react";

const DroneScene = dynamic(() => import("@/components/three/DroneScene"), {
  ssr: false,
});

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-hairline bg-carbon-weave">
      <div className="absolute inset-0 bg-signal-glow" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 md:px-8 md:py-32 lg:grid-cols-2 lg:items-center lg:gap-8">
      <div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-center gap-2 text-mono-label text-signal"
        >
          <Signal className="h-3.5 w-3.5 animate-blink" />
          <span>LIAISON ETABLIE — EQUIPEMENT FPV</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="mt-6 max-w-2xl font-display text-5xl font-700 leading-[1.05] text-ink md:text-7xl"
        >
          Vole plus loin.
          <br />
          <span className="text-signal">Equipe-toi mieux.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="mt-6 max-w-md text-ink-muted"
        >
          Sangles, protections, antennes et outils selectionnes pour les
          pilotes FPV qui ne transigent pas sur la fiabilite.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <Link
            href="/boutique"
            className="reticle inline-flex items-center gap-2 border border-signal/50 bg-signal/10 px-6 py-3.5 text-mono-label text-signal transition hover:bg-signal/20"
          >
            Explorer la boutique
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/boutique?tri=populaire"
            className="inline-flex items-center gap-2 border border-hairline px-6 py-3.5 text-mono-label text-ink-muted transition hover:text-ink"
          >
            Best-sellers
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 grid max-w-lg grid-cols-3 divide-x divide-hairline border-y border-hairline font-mono text-xs text-ink-muted"
        >
          <div className="px-4 py-3">
            <div className="text-ink text-lg">48-72H</div>
            LIVRAISON FR
          </div>
          <div className="px-4 py-3">
            <div className="text-ink text-lg">9</div>
            CATEGORIES
          </div>
          <div className="px-4 py-3">
            <div className="text-ink text-lg">100%</div>
            TESTE EN VOL
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        className="reticle relative order-first h-[280px] border border-hairline bg-carbon2/60 sm:h-[360px] lg:order-none lg:h-[440px]"
      >
        <div className="pointer-events-none absolute left-3 top-3 z-10 font-mono text-[10px] uppercase tracking-widest text-signal/80">
          Apercu 3D — VYP-01
        </div>
        <div className="pointer-events-none absolute bottom-3 right-3 z-10 flex items-center gap-1.5 font-mono text-[10px] text-ink-faint">
          <span className="h-1.5 w-1.5 animate-blink rounded-full bg-signal" />
          RENDU TEMPS REEL
        </div>
        <DroneScene />
      </motion.div>
      </div>
    </section>
  );
}
