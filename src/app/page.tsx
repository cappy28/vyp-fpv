import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { formatPrice, averageRating } from "@/lib/utils";
import ProductGallery from "@/components/product/ProductGallery";
import AddToCartButton from "@/components/product/AddToCartButton";
import WishlistButton from "@/components/ui/WishlistButton";
import Stars from "@/components/ui/Stars";
import ProductReviews from "@/components/product/ProductReviews";
import RelatedProducts from "@/components/product/RelatedProducts";
import { Truck, ShieldCheck, Package } from "lucide-react";
import type { Product, Review } from "@/lib/types";

export const revalidate = 60;

async function getProduct(slug: string) {
  const supabase = createClient();
  const { data: product } = await supabase
    .from("products")
    .select("*, categories(*)")
    .eq("slug", slug)
    .single();

  if (!product) return null;

  const [{ data: reviews }, { data: related }] = await Promise.all([
    supabase
      .from("reviews")
      .select("*")
      .eq("product_id", product.id)
      .order("created_at", { ascending: false }),
    supabase
      .from("products")
      .select("*, categories(*)")
      .eq("category_id", product.category_id)
      .neq("id", product.id)
      .limit(4),
  ]);

  return {
    product: product as Product,
    reviews: (reviews || []) as Review[],
    related: (related || []) as Product[],
  };
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const data = await getProduct(params.slug);
  if (!data) return { title: "Produit introuvable" };

  return {
    title: data.product.name,
    description:
      data.product.short_description ||
      data.product.description?.slice(0, 155) ||
      undefined,
    openGraph: {
      title: data.product.name,
      description: data.product.short_description || undefined,
      images: data.product.images?.[0] ? [data.product.images[0]] : undefined,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const data = await getProduct(params.slug);
  if (!data) notFound();

  const { product, reviews, related } = data;
  const rating = averageRating(reviews.map((r) => r.rating));

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14">
      <div className="grid gap-10 lg:grid-cols-2">
        <ProductGallery images={product.images} name={product.name} />

        <div>
          {product.categories && (
            <p className="text-mono-label text-signal">
              {product.categories.name}
            </p>
          )}
          <h1 className="mt-2 font-display text-3xl font-700 text-ink md:text-4xl">
            {product.name}
          </h1>

          <div className="mt-3 flex items-center gap-3">
            <Stars rating={rating} />
            <span className="text-xs text-ink-muted">
              {reviews.length} avis
            </span>
          </div>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="font-mono text-2xl text-ink">
              {formatPrice(product.price)}
            </span>
            {product.compare_at_price && (
              <span className="font-mono text-base text-ink-faint line-through">
                {formatPrice(product.compare_at_price)}
              </span>
            )}
          </div>

          {product.short_description && (
            <p className="mt-4 text-ink-muted">{product.short_description}</p>
          )}

          <div className="mt-3 font-mono text-xs text-ink-faint">
            {product.stock > 0
              ? `STOCK: ${product.stock} disponibles`
              : "STOCK: rupture"}
            {product.sku && <span className="ml-4">SKU: {product.sku}</span>}
          </div>

          <div className="mt-6 flex items-center gap-3">
            <div className="flex-1">
              <AddToCartButton product={product} />
            </div>
            <WishlistButton productId={product.id} />
          </div>

          <div className="mt-8 grid grid-cols-3 gap-3 border-y border-hairline py-5 font-mono text-[11px] text-ink-muted">
            <div className="flex flex-col items-center gap-1.5 text-center">
              <Truck className="h-4 w-4 text-signal" />
              48-72H
            </div>
            <div className="flex flex-col items-center gap-1.5 text-center">
              <ShieldCheck className="h-4 w-4 text-signal" />
              PAIEMENT SECURISE
            </div>
            <div className="flex flex-col items-center gap-1.5 text-center">
              <Package className="h-4 w-4 text-signal" />
              RETOUR 14J
            </div>
          </div>

          {product.description && (
            <div className="mt-8">
              <p className="text-mono-label mb-2">Description</p>
              <p className="whitespace-pre-line text-sm leading-relaxed text-ink-muted">
                {product.description}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-16 border-t border-hairline pt-10">
        <ProductReviews productId={product.id} reviews={reviews} />
      </div>

      <RelatedProducts products={related} />
    </div>
  );
}
