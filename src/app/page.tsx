import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import ShopFilters from "@/components/shop/ShopFilters";
import ProductGrid from "@/components/shop/ProductGrid";
import type { Category, Product } from "@/lib/types";

export const metadata: Metadata = {
  title: "Boutique",
  description:
    "Toute la gamme d'accessoires FPV VYP FPV : sangles, protections, antennes, outils et organisation.",
};

export const revalidate = 60;

type SearchParams = {
  categorie?: string;
  tri?: string;
  recherche?: string;
  stock?: string;
  min?: string;
  max?: string;
};

async function getShopData(searchParams: SearchParams) {
  const supabase = createClient();

  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  let query = supabase.from("products").select("*, categories(*)");

  if (searchParams.categorie) {
    const cat = (categories || []).find((c) => c.slug === searchParams.categorie);
    if (cat) query = query.eq("category_id", cat.id);
  }
  if (searchParams.recherche) {
    query = query.or(
      `name.ilike.%${searchParams.recherche}%,description.ilike.%${searchParams.recherche}%`
    );
  }
  if (searchParams.stock === "1") {
    query = query.gt("stock", 0);
  }
  if (searchParams.min) {
    query = query.gte("price", Number(searchParams.min));
  }
  if (searchParams.max) {
    query = query.lte("price", Number(searchParams.max));
  }

  switch (searchParams.tri) {
    case "prix-asc":
      query = query.order("price", { ascending: true });
      break;
    case "prix-desc":
      query = query.order("price", { ascending: false });
      break;
    case "recent":
      query = query.order("created_at", { ascending: false });
      break;
    default:
      query = query.order("featured", { ascending: false }).order("created_at", { ascending: false });
  }

  const { data: products } = await query;

  return {
    categories: (categories || []) as Category[],
    products: (products || []) as Product[],
  };
}

export default async function BoutiquePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { categories, products } = await getShopData(searchParams);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14">
      <div className="mb-8">
        <p className="text-mono-label">Boutique</p>
        <h1 className="mt-2 font-display text-4xl font-700 text-ink">
          Accessoires FPV
        </h1>
        {searchParams.recherche && (
          <p className="mt-2 text-sm text-ink-muted">
            Resultats pour "{searchParams.recherche}" — {products.length} produit(s)
          </p>
        )}
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        <ShopFilters categories={categories} />
        <div className="flex-1">
          <ProductGrid products={products} />
        </div>
      </div>
    </div>
  );
}
