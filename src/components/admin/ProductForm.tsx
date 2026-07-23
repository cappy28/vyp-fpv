"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { X, Upload } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { slugify } from "@/lib/utils";
import Button from "@/components/ui/Button";
import type { Category, Product } from "@/lib/types";

export default function ProductForm({
  categories,
  product,
}: {
  categories: Category[];
  product?: Product;
}) {
  const supabase = createClient();
  const router = useRouter();
  const isEdit = !!product;

  const [form, setForm] = useState({
    name: product?.name || "",
    slug: product?.slug || "",
    category_id: product?.category_id || categories[0]?.id || "",
    short_description: product?.short_description || "",
    description: product?.description || "",
    price: product?.price?.toString() || "",
    compare_at_price: product?.compare_at_price?.toString() || "",
    stock: product?.stock?.toString() || "0",
    weight_g: product?.weight_g?.toString() || "",
    sku: product?.sku || "",
    featured: product?.featured || false,
  });
  const [images, setImages] = useState<string[]>(product?.images || []);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);

    const path = `${Date.now()}-${slugify(file.name)}`;
    const { error: uploadError } = await supabase.storage
      .from("product-images")
      .upload(path, file);

    if (uploadError) {
      setError("Echec de l'upload de l'image.");
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from("product-images").getPublicUrl(path);
    setImages((imgs) => [...imgs, data.publicUrl]);
    setUploading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = {
      name: form.name,
      slug: form.slug || slugify(form.name),
      category_id: form.category_id || null,
      short_description: form.short_description || null,
      description: form.description || null,
      price: parseFloat(form.price) || 0,
      compare_at_price: form.compare_at_price ? parseFloat(form.compare_at_price) : null,
      stock: parseInt(form.stock, 10) || 0,
      weight_g: form.weight_g ? parseInt(form.weight_g, 10) : null,
      sku: form.sku || null,
      featured: form.featured,
      images,
    };

    const res = await fetch("/api/admin/products", {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(isEdit ? { id: product!.id, ...payload } : payload),
    });

    setSaving(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Une erreur est survenue.");
      return;
    }

    router.push("/admin/produits");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="text-mono-label mb-2 block">Nom du produit</label>
          <input
            required
            value={form.name}
            onChange={(e) => {
              update("name", e.target.value);
              if (!isEdit) update("slug", slugify(e.target.value));
            }}
            className="w-full border border-hairline bg-carbon px-3 py-2.5 text-sm text-ink focus:border-signal/50"
          />
        </div>

        <div>
          <label className="text-mono-label mb-2 block">Slug (URL)</label>
          <input
            required
            value={form.slug}
            onChange={(e) => update("slug", e.target.value)}
            className="w-full border border-hairline bg-carbon px-3 py-2.5 text-sm text-ink focus:border-signal/50"
          />
        </div>

        <div>
          <label className="text-mono-label mb-2 block">Categorie</label>
          <select
            value={form.category_id}
            onChange={(e) => update("category_id", e.target.value)}
            className="w-full border border-hairline bg-carbon px-3 py-2.5 text-sm text-ink focus:border-signal/50"
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-mono-label mb-2 block">Prix (EUR)</label>
          <input
            required
            type="number"
            step="0.01"
            min="0"
            value={form.price}
            onChange={(e) => update("price", e.target.value)}
            className="w-full border border-hairline bg-carbon px-3 py-2.5 text-sm text-ink focus:border-signal/50"
          />
        </div>

        <div>
          <label className="text-mono-label mb-2 block">Prix barre (optionnel)</label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={form.compare_at_price}
            onChange={(e) => update("compare_at_price", e.target.value)}
            className="w-full border border-hairline bg-carbon px-3 py-2.5 text-sm text-ink focus:border-signal/50"
          />
        </div>

        <div>
          <label className="text-mono-label mb-2 block">Stock</label>
          <input
            required
            type="number"
            min="0"
            value={form.stock}
            onChange={(e) => update("stock", e.target.value)}
            className="w-full border border-hairline bg-carbon px-3 py-2.5 text-sm text-ink focus:border-signal/50"
          />
        </div>

        <div>
          <label className="text-mono-label mb-2 block">Poids (g)</label>
          <input
            type="number"
            min="0"
            value={form.weight_g}
            onChange={(e) => update("weight_g", e.target.value)}
            className="w-full border border-hairline bg-carbon px-3 py-2.5 text-sm text-ink focus:border-signal/50"
          />
        </div>

        <div>
          <label className="text-mono-label mb-2 block">SKU</label>
          <input
            value={form.sku}
            onChange={(e) => update("sku", e.target.value)}
            className="w-full border border-hairline bg-carbon px-3 py-2.5 text-sm text-ink focus:border-signal/50"
          />
        </div>
      </div>

      <div>
        <label className="text-mono-label mb-2 block">Description courte</label>
        <input
          value={form.short_description}
          onChange={(e) => update("short_description", e.target.value)}
          className="w-full border border-hairline bg-carbon px-3 py-2.5 text-sm text-ink focus:border-signal/50"
        />
      </div>

      <div>
        <label className="text-mono-label mb-2 block">Description detaillee</label>
        <textarea
          rows={4}
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
          className="w-full border border-hairline bg-carbon px-3 py-2.5 text-sm text-ink focus:border-signal/50"
        />
      </div>

      <div>
        <label className="text-mono-label mb-2 block">Images</label>
        <div className="flex flex-wrap gap-3">
          {images.map((img, i) => (
            <div key={img} className="relative h-20 w-20 overflow-hidden border border-hairline">
              <Image src={img} alt="" fill className="object-cover" />
              <button
                type="button"
                onClick={() => setImages((imgs) => imgs.filter((_, idx) => idx !== i))}
                className="absolute right-0.5 top-0.5 bg-void/80 p-0.5"
              >
                <X className="h-3 w-3 text-ink" />
              </button>
            </div>
          ))}
          <label className="flex h-20 w-20 cursor-pointer flex-col items-center justify-center gap-1 border border-dashed border-hairline text-ink-faint hover:border-signal/40 hover:text-signal">
            <Upload className="h-4 w-4" />
            <span className="font-mono text-[9px]">{uploading ? "..." : "AJOUTER"}</span>
            <input type="file" accept="image/*" onChange={handleUpload} className="hidden" disabled={uploading} />
          </label>
        </div>
        <p className="mt-2 text-xs text-ink-faint">
          Stockees dans le bucket Supabase "product-images".
        </p>
      </div>

      <label className="flex items-center gap-2 text-sm text-ink-muted">
        <input
          type="checkbox"
          checked={form.featured}
          onChange={(e) => update("featured", e.target.checked)}
          className="h-4 w-4 accent-signal"
        />
        Mettre en avant sur la page d'accueil
      </label>

      {error && <p className="text-xs text-red-400">{error}</p>}

      <Button type="submit" variant="primary" disabled={saving}>
        {saving ? "Enregistrement..." : isEdit ? "Mettre a jour" : "Creer le produit"}
      </Button>
    </form>
  );
}
