import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vyp-fpv.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, changeFrequency: "daily", priority: 1 },
    { url: `${siteUrl}/boutique`, changeFrequency: "daily", priority: 0.9 },
  ];

  try {
    const supabase = createClient();
    const { data: products } = await supabase
      .from("products")
      .select("slug, created_at");

    const productRoutes: MetadataRoute.Sitemap = (products || []).map((p) => ({
      url: `${siteUrl}/produit/${p.slug}`,
      lastModified: p.created_at,
      changeFrequency: "weekly",
      priority: 0.7,
    }));

    return [...staticRoutes, ...productRoutes];
  } catch {
    // Supabase pas encore configure -> sitemap statique uniquement.
    return staticRoutes;
  }
}
