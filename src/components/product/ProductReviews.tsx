"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import clsx from "clsx";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Stars from "@/components/ui/Stars";
import Button from "@/components/ui/Button";
import type { Review } from "@/lib/types";

export default function ProductReviews({
  productId,
  reviews,
}: {
  productId: string;
  reviews: Review[];
}) {
  const supabase = createClient();
  const router = useRouter();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/connexion");
      return;
    }

    const { error: insertError } = await supabase.from("reviews").insert({
      product_id: productId,
      user_id: user.id,
      author_name: user.user_metadata?.full_name || user.email?.split("@")[0] || "Pilote",
      rating,
      comment,
    });

    if (insertError) {
      setError("Impossible d'envoyer ton avis pour le moment.");
    } else {
      setComment("");
      router.refresh();
    }
    setSubmitting(false);
  }

  return (
    <div>
      <h2 className="font-display text-2xl font-700 text-ink">
        Avis ({reviews.length})
      </h2>

      <div className="mt-6 space-y-5">
        {reviews.length === 0 && (
          <p className="text-sm text-ink-muted">
            Aucun avis pour le moment. Sois le premier a donner ton retour.
          </p>
        )}
        {reviews.map((r) => (
          <div key={r.id} className="border-b border-hairline pb-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-ink">{r.author_name}</span>
              <Stars rating={r.rating} />
            </div>
            {r.comment && (
              <p className="mt-2 text-sm text-ink-muted">{r.comment}</p>
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-8 border border-hairline bg-carbon p-5">
        <p className="text-mono-label mb-3">Laisser un avis</p>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              type="button"
              key={n}
              onClick={() => setRating(n)}
              aria-label={`${n} etoiles`}
            >
              <Star
                className={clsx(
                  "h-5 w-5",
                  n <= rating ? "fill-copper text-copper" : "text-ink-faint"
                )}
              />
            </button>
          ))}
        </div>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Ton retour sur ce produit..."
          rows={3}
          className="mt-3 w-full border border-hairline bg-void px-3 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:border-signal/50"
        />
        {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
        <Button type="submit" variant="secondary" disabled={submitting} className="mt-3">
          {submitting ? "Envoi..." : "Publier l'avis"}
        </Button>
      </form>
    </div>
  );
}
