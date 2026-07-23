import { Star } from "lucide-react";
import clsx from "clsx";

export default function Stars({
  rating,
  size = 14,
}: {
  rating: number;
  size?: number;
}) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} sur 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          width={size}
          height={size}
          className={clsx(
            n <= Math.round(rating)
              ? "fill-copper text-copper"
              : "fill-transparent text-ink-faint"
          )}
        />
      ))}
    </div>
  );
}
