"use client";

import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";

export default function ProductGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [active, setActive] = useState(0);
  const list = images.length > 0 ? images : [];

  if (list.length === 0) {
    return (
      <div className="reticle flex aspect-square items-center justify-center border border-hairline bg-carbon font-mono text-xs text-ink-faint">
        NO SIGNAL
      </div>
    );
  }

  return (
    <div>
      <div className="reticle relative aspect-square overflow-hidden border border-hairline bg-carbon">
        <Image
          src={list[active]}
          alt={name}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
      {list.length > 1 && (
        <div className="mt-3 flex gap-2">
          {list.map((img, i) => (
            <button
              key={img + i}
              onClick={() => setActive(i)}
              className={clsx(
                "relative h-16 w-16 shrink-0 overflow-hidden border transition",
                active === i ? "border-signal" : "border-hairline opacity-70 hover:opacity-100"
              )}
            >
              <Image src={img} alt={`${name} ${i + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
