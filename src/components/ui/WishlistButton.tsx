"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import clsx from "clsx";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function WishlistButton({ productId }: { productId: string }) {
  const supabase = createClient();
  const router = useRouter();
  const [active, setActive] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function init() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;
      setUserId(user.id);
      const { data } = await supabase
        .from("wishlist")
        .select("id")
        .eq("user_id", user.id)
        .eq("product_id", productId)
        .maybeSingle();
      setActive(!!data);
    }
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  async function toggle() {
    if (!userId) {
      router.push("/connexion");
      return;
    }
    setLoading(true);
    if (active) {
      await supabase
        .from("wishlist")
        .delete()
        .eq("user_id", userId)
        .eq("product_id", productId);
      setActive(false);
    } else {
      await supabase
        .from("wishlist")
        .insert({ user_id: userId, product_id: productId });
      setActive(true);
    }
    setLoading(false);
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      aria-label="Ajouter aux favoris"
      className="rounded-full border border-hairline bg-carbon p-2.5 transition hover:border-copper/50"
    >
      <Heart
        className={clsx(
          "h-4 w-4 transition",
          active ? "fill-copper text-copper" : "text-ink-muted"
        )}
      />
    </button>
  );
}
