"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import ProfileForm from "./ProfileForm";
import AddressForm from "./AddressForm";
import OrdersList from "./OrdersList";
import WishlistGrid from "./WishlistGrid";
import type { Profile, Order, Product } from "@/lib/types";

const TABS = [
  { key: "infos", label: "Informations" },
  { key: "adresse", label: "Adresse" },
  { key: "commandes", label: "Commandes" },
  { key: "favoris", label: "Favoris" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

export default function AccountTabs({
  initialTab,
  profile,
  email,
  orders,
  wishlistProducts,
}: {
  initialTab: string;
  profile: Profile | null;
  email: string;
  orders: Order[];
  wishlistProducts: Product[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const valid = TABS.map((t) => t.key) as string[];
  const [tab, setTab] = useState<TabKey>(
    (valid.includes(initialTab) ? initialTab : "infos") as TabKey
  );

  function changeTab(key: TabKey) {
    setTab(key);
    router.replace(`${pathname}?tab=${key}`, { scroll: false });
  }

  return (
    <div>
      <div className="flex gap-1 overflow-x-auto border-b border-hairline">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => changeTab(t.key)}
            className={clsx(
              "shrink-0 border-b-2 px-4 py-3 text-mono-label transition",
              tab === t.key
                ? "border-signal text-signal"
                : "border-transparent text-ink-muted hover:text-ink"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="pt-8"
        >
          {tab === "infos" && <ProfileForm profile={profile} email={email} />}
          {tab === "adresse" && <AddressForm profile={profile} />}
          {tab === "commandes" && <OrdersList orders={orders} />}
          {tab === "favoris" && <WishlistGrid products={wishlistProducts} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
